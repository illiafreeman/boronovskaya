const { series, parallel, src, dest, task } = require('gulp');

const sass      = require('gulp-sass'),
    plumber     = require('gulp-plumber'),
    browserSync = require('browser-sync'),
    concat      = require('gulp-concat'),
    uglify      = require('gulp-uglifyjs'),
    cssnano     = require('gulp-cssnano'),
    rename      = require('gulp-rename'),
    del         = require('del'),
    imagemin    = require('gulp-imagemin'),
    pngquant    = require('imagemin-pngquant'),
    autoprefixer= require('gulp-autoprefixer'),
    watch       = require('gulp-watch'),
    sourcemaps  = require('gulp-sourcemaps');

function browserSyncServ() {
    'use strict';
    return new Promise((resolve, reject) => {
        try {
            browserSync({
                server: { baseDir: 'app' },
                notify: false
            });
            resolve();
        }
        catch (err) {
            reject('moveAsset error:' + err);
        }
    });
}

function sassBuild() {
    'use strict';
    var files = ['app/sass/**/*.scss'];
    return new Promise((resolve, reject) => {
        src(files)
            .pipe(plumber())
            .on('error', (err) => reject('moveAsset error:' + err))
            .pipe(sass({ outputStyle: 'expanded' }))
            //.pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], {cascade: true}))
            .pipe(sourcemaps.write())
            .pipe(dest('app/css'))
            //.pipe(browserSync.reload({ stream: true }))
            .on('end', resolve);
    });
}

function sassMinimize() {
    'use strict';
    var files = ['app/sass/**/*.scss'];
    return new Promise((resolve, reject) => {
        src(files)
            .pipe(plumber())
            .on('error', (err) => reject('moveAsset error:' + err))
            .pipe(sass({ outputStyle: 'expanded' }))
            .pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true }))
            .pipe(cssnano())
            .pipe(rename({ suffix: '.min' }))
            .pipe(dest('app/css'))
            //.pipe(browserSync.reload({ stream: true }))
            .on('end', resolve);
    });
}

function scripts() {
    'use strict';
    var files = ['plugins/jquery_2.1.1.min.js'];
    return new Promise((resolve, reject) => {
        src(files)
            .pipe(plumber())
            .on('error', (err) => reject('moveAsset error:' + err))
            .pipe(concat('main.min.js'))
            .pipe(uglify())
            .pipe(dest('app/js/'))
            //.pipe(browserSync.reload({ stream: true }))
            .on('end', resolve);
    });
}

function clean() {
    'use strict';
    return new Promise((resolve, reject) => {
        try{
            del.sync('dist');
        } catch(err) {
            reject(err);
        }
        resolve();
    });
}

function img() {
    'use strict';
    var files = ['app/img/**/*'];
    return new Promise((resolve, reject) => {
        try {
        src(files)
            .pipe(plumber())
            .pipe(imagemin({
                interlaced: true,
                progressive: true,
                svgoPlugins: [{removeViewBox: false}],
                use: [pngquant()]
            }))
            .pipe(dest('dist/img'))
            .on('end', resolve);
        } catch(err) {
            reject(err.message)
        }
    });
}

function moveAsset(blob, destination) {
    return new Promise((resolve, reject) => {
        src(blob)
            .on('error', (err) => reject('moveAsset error:' + err))
            .pipe(dest(destination))
            .on('end', resolve);
    });
}

function moveAssets() {
    return Promise.all([
        moveAsset('app/css/**/*', 'dist/css'),
        moveAsset('app/fonts/**/*', 'dist/fonts'),
        moveAsset('app/js/*.js', 'dist/js'),
        moveAsset('app/*.html', 'dist/')
    ]);
}

function rebuild(type = 'sass') {
    if (type === 'sass') {
        sassBuild();
    } else if (type === 'scripts') {
        scripts();
    }
    return browserSync.reload();
}

function setWatcher(globs, type) {

    let options = {
        ignoreInitial: true,
        read: false,
        //readDelay: 50
        ignorePermissionErrors: true,
        // This option probably soved a bug "EBUSY: resource busy or locked"
        // when copied a file outside working directory to watched dirs
        usePolling: true
    };

    let watcher = watch(globs, options);

    watcher.on('unlink', filename => {
        console.log(`Unlinked ${filename}`);
        rebuild(type);
    });

    watcher.on('change', filename => {
        console.log(`Changed ${filename}`);
        rebuild(type);
    });

    watcher.on('add', filename => {
        console.log(`Added ${filename}`);
        rebuild(type);
    });

    return watcher;
}

function setWatchers() {
    setWatcher('app/sass/**/*.scss', 'sass');
    setWatcher('app/*.html', 'html');
    setWatcher('app/js/**/*.js', 'js');
    setWatcher('plugins/**/*.js', 'jsPlugins');
    return true;
}

exports.build = series(clean, img, sassBuild, sassMinimize, scripts, moveAssets);
exports.watcher = series(browserSyncServ, sassBuild, scripts, setWatchers);
exports.default = exports.watcher;