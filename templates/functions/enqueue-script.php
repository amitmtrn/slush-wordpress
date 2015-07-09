///////////////////////////////////////////////////////
// Enqueue <%= name %> //
///////////////////////////////////////////////////////
function <%= noSpaceName %>_enqueue() {

<% if(deregister) { %>
	wp_deregister_script( '<%= name %>' );
<% } %>
	wp_register_script( '<%= name %>', <%= localScript %>'<%= url %>', array( <%= dependecies %> ), '<%= version %>', <%= footer %> );
<% if(enqueue) { %>
	wp_enqueue_script( '<%= name %>' );
<% } %>
}

add_action( 'wp_enqueue_scripts', '<%= noSpaceName %>_enqueue' );

///////////////////////////////////////////////
