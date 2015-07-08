///////////////////////////////////////////////////////
// Register Custom post type: <%= labelName %>  //
///////////////////////////////////////////////////////

function custom_<%= name %>() {

	$labels = array(
		'name'                => _x( '<%= labelName %>s', '<%= labelName %> General Name', '<%= text_domain %>' ),
		'singular_name'       => _x( '<%= labelName %>', '<%= labelName %> Singular Name', '<%= text_domain %>' ),
		'menu_name'           => __( '<%= labelName %>', '<%= text_domain %>' ),
		'name_admin_bar'      => __( '<%= labelName %>', '<%= text_domain %>' ),
		'parent_item_colon'   => __( 'Parent <%= labelName %>:', '<%= text_domain %>' ),
		'all_items'           => __( 'All <%= labelName %>s', '<%= text_domain %>' ),
		'add_new_item'        => __( 'Add New <%= labelName %>', '<%= text_domain %>' ),
		'add_new'             => __( 'Add New', '<%= text_domain %>' ),
		'new_item'            => __( 'New <%= labelName %>', '<%= text_domain %>' ),
		'edit_item'           => __( 'Edit <%= labelName %>', '<%= text_domain %>' ),
		'update_item'         => __( 'Update <%= labelName %>', '<%= text_domain %>' ),
		'view_item'           => __( 'View <%= labelName %>', '<%= text_domain %>' ),
		'search_items'        => __( 'Search <%= labelName %>', '<%= text_domain %>' ),
		'not_found'           => __( 'Not found', '<%= text_domain %>' ),
		'not_found_in_trash'  => __( 'Not found in Trash', '<%= text_domain %>' ),
	);
	$args = array(
		'label'               => __( '<%= name %>', '<%= text_domain %>' ),
		'description'         => __( '<%= labelName %> Description', '<%= text_domain %>' ),
		'labels'              => $labels,
		'supports'            => array( <% _.forEach(supports, function(support) { %>'<%- support %>',<% }); %> ),
		'taxonomies'          => array( <% _.forEach(taxonomies, function(taxonomy) { %>'<%- taxonomy %>',<% }); %> ),
		'hierarchical'        => <%= hierarchical %>,
		'public'              => <%= public %>,
		'show_ui'             => <%= show_ui %>,
		'show_in_menu'        => <%= show_in_menu %>,
		'menu_position'       => <%= menu_position %>,
		'show_in_admin_bar'   => <%= show_in_admin_bar %>,
		'show_in_nav_menus'   => <%= show_in_nav_menus %>,
		'can_export'          => <%= can_export %>,
		'has_archive'         => <%= has_archive %>,
		'exclude_from_search' => <%= exclude_from_search %>,
		'publicly_queryable'  => <%= publicly_queryable %>,
		'capability_type'     => '<%= capability_type %>'
	);
	register_<%= name %>( '<%= name %>', $args );

}

// Hook into the 'init' action
add_action( 'init', 'custom_<%= name %>', 0 );

///////////////////////////////////////////////////////////
