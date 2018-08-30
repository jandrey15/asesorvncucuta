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


// function nuevos_init() {
//   $labels = array(
//     'name'              => _x( 'Nuevos', 'post type general name', 'your-plugin-textdomain' ),
//     'singular_name'     => _x( 'Nuevos', 'post type general name', 'your-plugin-textdomain' ),
//     'menu_name'         => _x( 'Carros nuevos', 'admin menu', 'your-plugin-textdomain' ),
//     'name_admin_bar'    => _x( 'Nuevos', 'add new on admin bar', 'your-plugin-textdomain' ),
//     'add_new'           => _x( 'Añadir carro', 'carro', 'your-plugin-textdomain' ),
//     'add_new_item'      => __( 'Añadir carro nuevo', 'your-plugin-textdomain' ),
//     'new_item'          => __( 'Carro nuevo', 'your-plugin-textdomain' ),
//     'edit_item'         => __( 'Editar carro', 'your-plugin-textdomain' ),
//     'view_item'         => __( 'Ver carro', 'your-plugin-textdomain' ),
//     'all_items'         => __( 'Todos los carros', 'your-plugin-textdomain' ),
//     'search_items'      => __( 'Buscar carros', 'your-plugin-textdomain' ),
//     'parent_item_colon' => __( 'Carros padre', 'your-plugin-textdomain' ),
//     'not_found'         => __( 'No hemos encontrado carros.', 'your-plugin-textdomain' ),
//     'not_found_in_trash'=> __( 'No hemos encontrado carros en la papelera', 'your-plugin-textdomain' ),
//   );

//   $args = array(
//     'labels'            => $labels,
//     'description'       => __('Description', 'your-plugin-textdomain'),
//     'taxonomies'        => array('category'),
//     'public'            => true,
//     'public_queryable'  => true,
//     'show_ui'           => true,
//     'show_in_menu'      => true,
//     'query_var'         => true,
//     'rewrite'           => array( 'slug' => 'nuevos' ),
//     'capability_type'   => 'post',
//     'has_archive'       => true,
//     'hierarchical'      => false,
//     'menu_position'     => null,
//     'show_in_rest'      => true,
//     'menu_icon'         => 'dashicons-welcome-add-page',
//     'supports'          => array( 'title', 'editor', 'author', 'thumbnail' )
//   );

//   register_post_type( 'nuevos', $args );
// }

// add_action( 'init', 'nuevos_init' );

// function usados_init() {
//   $labels = array(
//     'name'              => _x( 'Usados', 'post type general name', 'your-plugin-textdomain' ),
//     'singular_name'     => _x( 'Usados', 'post type general name', 'your-plugin-textdomain' ),
//     'menu_name'         => _x( 'Carros usados', 'admin menu', 'your-plugin-textdomain' ),
//     'name_admin_bar'    => _x( 'Usados', 'add new on admin bar', 'your-plugin-textdomain' ),
//     'add_new'           => _x( 'Añadir carro', 'carro', 'your-plugin-textdomain' ),
//     'add_new_item'      => __( 'Añadir carro usado', 'your-plugin-textdomain' ),
//     'new_item'          => __( 'Carro usado', 'your-plugin-textdomain' ),
//     'edit_item'         => __( 'Editar carro', 'your-plugin-textdomain' ),
//     'view_item'         => __( 'Ver carro', 'your-plugin-textdomain' ),
//     'all_items'         => __( 'Todos los carros', 'your-plugin-textdomain' ),
//     'search_items'      => __( 'Buscar carros', 'your-plugin-textdomain' ),
//     'parent_item_colon' => __( 'Carros padre', 'your-plugin-textdomain' ),
//     'not_found'         => __( 'No hemos encontrado carros.', 'your-plugin-textdomain' ),
//     'not_found_in_trash'=> __( 'No hemos encontrado carros en la papelera', 'your-plugin-textdomain' ),
//   );

//   $args = array(
//     'labels'            => $labels,
//     'description'       => __('Description', 'your-plugin-textdomain'),
//     'taxonomies'        => array('category'),
//     'public'            => true,
//     'public_queryable'  => true,
//     'show_ui'           => true,
//     'show_in_menu'      => true,
//     'query_var'         => true,
//     'rewrite'           => array( 'slug' => 'usados' ),
//     'capability_type'   => 'post',
//     'has_archive'       => true,
//     'hierarchical'      => false,
//     'menu_position'     => null,
//     'show_in_rest'      => true,
//     'menu_icon'         => 'dashicons-welcome-write-blog',
//     'supports'          => array( 'title', 'editor', 'author', 'thumbnail' )
//   );

//   register_post_type( 'usados', $args );
// }

// add_action( 'init', 'usados_init' );


// Función para crear una taxonomía
function marcas() {

  // Definimos un array para las traducciones de la taxonomía
  $etiquetas = array(
      'name' => __( 'Marca y Modelo' ),
      'singular_name' => __( 'Marca' ),
      'search_items' =>  __( 'Buscar marca' ),
      'all_items' => __( 'Todos los marcas' ),
      'parent_item' => __( 'Marca padre' ),
      'parent_item_colon' => __( 'Marca padre:' ),
      'edit_item' => __( 'Editar marca' ), 
      'update_item' => __( 'Actualizar marca' ),
      'add_new_item' => __( 'Agregar una nueva marca' ),
      'menu_name' => __( 'Marca y Modelo' ),
  ); 	


  // Función WordPress para registrar la taxonomía
  register_taxonomy(
      'marcas',
      array('post'), // Tipos de Post a los que asociaremos la taxonomía
      array(
          'hierarchical' => true, // True para taxonomías del tipo "Categoría" y false para el tipo "Etiquetas"
          'labels' => $etiquetas, // La variable con las traducciones de las etiquetas
          'show_ui' => true,
          'show_admin_column' => true,
          'query_var' => true,
          'show_in_rest'      => true,
          'rewrite' => array( 'slug' => '.', 'hierarchical' => true ),
      )
  );

}
add_action( 'init', 'marcas', 0 );


// Función para crear una taxonomía
function anos() {

  // Definimos un array para las traducciones de la taxonomía
  $etiquetas = array(
      'name' => __( 'Año' ),
      'singular_name' => __( 'Año' ),
      'search_items' =>  __( 'Buscar año' ),
      'all_items' => __( 'Todos los años' ),
    //   'parent_item' => __( 'Año padre' ),
    //   'parent_item_colon' => __( 'Año padre:' ),
      'edit_item' => __( 'Editar año' ), 
      'update_item' => __( 'Actualizar año' ),
      'add_new_item' => __( 'Agregar un nuevo año' ),
      'menu_name' => __( 'Año' ),
  ); 

  // Función WordPress para registrar la taxonomía
  register_taxonomy(
      'anos',
      array('post'), // Tipos de Post a los que asociaremos la taxonomía
      array(
          'hierarchical' => false, // True para taxonomías del tipo "Categoría" y false para el tipo "Etiquetas"
          'labels' => $etiquetas, // La variable con las traducciones de las etiquetas
          'show_ui' => true,
          'show_admin_column' => true,
          'query_var' => true,
          'show_in_rest'      => true,
          'rewrite' => array( 'slug' => '.', 'hierarchical' => true )
      )
  );

}
add_action( 'init', 'anos', 0 );

// Función para crear una taxonomía
function condicion() {

  // Definimos un array para las traducciones de la taxonomía
  $etiquetas = array(
      'name' => __( 'Condición' ),
      'singular_name' => __( 'Condición' ),
      'search_items' =>  __( 'Buscar condicion' ),
      'all_items' => __( 'Todos las condiciones' ),
    //   'parent_item' => __( 'Año padre' ),
    //   'parent_item_colon' => __( 'Año padre:' ),
      'edit_item' => __( 'Editar condición' ), 
      'update_item' => __( 'Actualizar condicion' ),
      'add_new_item' => __( 'Agregar un nueva condición' ),
      'menu_name' => __( 'Condición' ),
  ); 

  // Función WordPress para registrar la taxonomía
  register_taxonomy(
      'condicion',
      array('post'), // Tipos de Post a los que asociaremos la taxonomía
      array(
          'hierarchical' => false, // True para taxonomías del tipo "Categoría" y false para el tipo "Etiquetas"
          'labels' => $etiquetas, // La variable con las traducciones de las etiquetas
          'show_ui' => true,
          'show_admin_column' => true,
          'query_var' => true,
          'show_in_rest'      => true,
          'rewrite' => array( 'slug' => '.', 'hierarchical' => true )
      )
  );

}
add_action( 'init', 'condicion', 0 );


// Función para crear una taxonomía
function color() {

  // Definimos un array para las traducciones de la taxonomía
  $etiquetas = array(
      'name' => __( 'Color' ),
      'singular_name' => __( 'Color' ),
      'search_items' =>  __( 'Buscar color' ),
      'all_items' => __( 'Todos las colores' ),
    //   'parent_item' => __( 'Año padre' ),
    //   'parent_item_colon' => __( 'Año padre:' ),
      'edit_item' => __( 'Editar color' ), 
      'update_item' => __( 'Actualizar color' ),
      'add_new_item' => __( 'Agregar un nuevo color' ),
      'menu_name' => __( 'Color' ),
  ); 

  // Función WordPress para registrar la taxonomía
  register_taxonomy(
      'color',
      array('post'), // Tipos de Post a los que asociaremos la taxonomía
      array(
          'hierarchical' => false, // True para taxonomías del tipo "Categoría" y false para el tipo "Etiquetas"
          'labels' => $etiquetas, // La variable con las traducciones de las etiquetas
          'show_ui' => true,
          'show_admin_column' => true,
          'query_var' => true,
          'show_in_rest'      => true,
          'rewrite' => array( 'slug' => '.', 'hierarchical' => true )
      )
  );

}
add_action( 'init', 'color', 0 );

