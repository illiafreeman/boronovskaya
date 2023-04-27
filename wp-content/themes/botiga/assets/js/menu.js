jQuery(document).ready(function() {
    
    jQuery(".botiga-offcanvas-menu .botiga-dropdown .menu-item-has-children a, .dropdown-symbol").click(function(e){
        e.preventDefault();
        //jQuery(".sub-menu").toggleClass('toggled');
        //alert("The paragraph was clicked.");
    });
    jQuery(".menu-item.menu-item-type-post_type.menu-item-object-page.menu-item-has-children").click(function(e){
        jQuery(".sub-menu").toggleClass('toggled');
        jQuery(".botiga-offcanvas-menu").toggleClass('sub');
    }); 
    jQuery("#primary-menu .dropdown-symbol").click(function(e){
        //alert("The paragraph was clicked.");
        //jQuery(".botiga-offcanvas-menu").toggleClass('sub');
        
    }); 

});






























