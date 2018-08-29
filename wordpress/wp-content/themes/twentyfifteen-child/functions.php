<?php

/* function add_role_viajero(){
    remove_role('viajero');
    add_role(
        'viajero',
        'Viajero',
        [
            'read'                  => true,
            'edit_post'             => true,
            'upload_files'          => true,
            'publish_posts'         => true,
            // 'delete_posts'          => true,
            'edit_published_posts'  => true,
        ]
        );
}

add_action( 'init', 'add_role_viajero' ); */


function nuevos_init() {
  $labels = array(
    'name'              => _x( 'Nuevos', 'post type general name', 'your-plugin-textdomain' ),
    'singular_name'     => _x( 'Nuevos', 'post type general name', 'your-plugin-textdomain' ),
    'menu_name'         => _x( 'Carros nuevos', 'admin menu', 'your-plugin-textdomain' ),
    'name_admin_bar'    => _x( 'Nuevos', 'add new on admin bar', 'your-plugin-textdomain' ),
    'add_new'           => _x( 'Añadir carro', 'carro', 'your-plugin-textdomain' ),
    'add_new_item'      => __( 'Añadir carro nuevo', 'your-plugin-textdomain' ),
    'new_item'          => __( 'Carro nuevo', 'your-plugin-textdomain' ),
    'edit_item'         => __( 'Editar carro', 'your-plugin-textdomain' ),
    'view_item'         => __( 'Ver carro', 'your-plugin-textdomain' ),
    'all_items'         => __( 'Todos los carros', 'your-plugin-textdomain' ),
    'search_items'      => __( 'Buscar carros', 'your-plugin-textdomain' ),
    'parent_item_colon' => __( 'Carros padre', 'your-plugin-textdomain' ),
    'not_found'         => __( 'No hemos encontrado carros.', 'your-plugin-textdomain' ),
    'not_found_in_trash'=> __( 'No hemos encontrado carros en la papelera', 'your-plugin-textdomain' ),
  );

  $args = array(
    'labels'            => $labels,
    'description'       => __('Description', 'your-plugin-textdomain'),
    'taxonomies'        => array('category'),
    'public'            => true,
    'public_queryable'  => true,
    'show_ui'           => true,
    'show_in_menu'      => true,
    'query_var'         => true,
    'rewrite'           => array( 'slug' => 'nuevos' ),
    'capability_type'   => 'post',
    'has_archive'       => true,
    'hierarchical'      => false,
    'menu_position'     => null,
    'show_in_rest'      => true,
    'menu_icon'         => 'dashicons-welcome-add-page',
    'supports'          => array( 'title', 'editor', 'author', 'thumbnail' )
  );

  register_post_type( 'nuevos', $args );
}

add_action( 'init', 'nuevos_init' );

function usados_init() {
  $labels = array(
    'name'              => _x( 'Usados', 'post type general name', 'your-plugin-textdomain' ),
    'singular_name'     => _x( 'Usados', 'post type general name', 'your-plugin-textdomain' ),
    'menu_name'         => _x( 'Carros usados', 'admin menu', 'your-plugin-textdomain' ),
    'name_admin_bar'    => _x( 'Usados', 'add new on admin bar', 'your-plugin-textdomain' ),
    'add_new'           => _x( 'Añadir carro', 'carro', 'your-plugin-textdomain' ),
    'add_new_item'      => __( 'Añadir carro usado', 'your-plugin-textdomain' ),
    'new_item'          => __( 'Carro usado', 'your-plugin-textdomain' ),
    'edit_item'         => __( 'Editar carro', 'your-plugin-textdomain' ),
    'view_item'         => __( 'Ver carro', 'your-plugin-textdomain' ),
    'all_items'         => __( 'Todos los carros', 'your-plugin-textdomain' ),
    'search_items'      => __( 'Buscar carros', 'your-plugin-textdomain' ),
    'parent_item_colon' => __( 'Carros padre', 'your-plugin-textdomain' ),
    'not_found'         => __( 'No hemos encontrado carros.', 'your-plugin-textdomain' ),
    'not_found_in_trash'=> __( 'No hemos encontrado carros en la papelera', 'your-plugin-textdomain' ),
  );

  $args = array(
    'labels'            => $labels,
    'description'       => __('Description', 'your-plugin-textdomain'),
    'taxonomies'        => array('category'),
    'public'            => true,
    'public_queryable'  => true,
    'show_ui'           => true,
    'show_in_menu'      => true,
    'query_var'         => true,
    'rewrite'           => array( 'slug' => 'usados' ),
    'capability_type'   => 'post',
    'has_archive'       => true,
    'hierarchical'      => false,
    'menu_position'     => null,
    'show_in_rest'      => true,
    'menu_icon'         => 'dashicons-welcome-write-blog',
    'supports'          => array( 'title', 'editor', 'author', 'thumbnail' )
  );

  register_post_type( 'usados', $args );
}

add_action( 'init', 'usados_init' );
