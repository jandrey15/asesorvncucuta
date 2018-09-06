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

function articulo_init() {
  $labels = array(
    'name'              => _x( 'Artículos', 'post type general name', 'your-plugin-textdomain' ),
    'singular_name'     => _x( 'Artículos', 'post type general name', 'your-plugin-textdomain' ),
    'menu_name'         => _x( 'Artículos', 'admin menu', 'your-plugin-textdomain' ),
    'name_admin_bar'    => _x( 'Artículos', 'add new on admin bar', 'your-plugin-textdomain' ),
    'add_new'           => _x( 'Añadir artículo', 'artículo', 'your-plugin-textdomain' ),
    'add_new_item'      => __( 'Añadir artículo usado', 'your-plugin-textdomain' ),
    'new_item'          => __( 'Nuevo artículo', 'your-plugin-textdomain' ),
    'edit_item'         => __( 'Editar artículo', 'your-plugin-textdomain' ),
    'view_item'         => __( 'Ver artículo', 'your-plugin-textdomain' ),
    'all_items'         => __( 'Todos los artículos', 'your-plugin-textdomain' ),
    'search_items'      => __( 'Buscar artículos', 'your-plugin-textdomain' ),
    'parent_item_colon' => __( 'Artículos padre', 'your-plugin-textdomain' ),
    'not_found'         => __( 'No hemos encontrado artículos.', 'your-plugin-textdomain' ),
    'not_found_in_trash'=> __( 'No hemos encontrado artículos en la papelera', 'your-plugin-textdomain' ),
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
    'rewrite'           => array( 'slug' => 'articulo' ),
    'capability_type'   => 'post',
    'map_meta_cap'      => true,
    'has_archive'       => true,
    'hierarchical'      => false,
    'menu_position'     => null,
    'show_in_rest'      => true,
    'menu_icon'         => 'dashicons-welcome-write-blog',
    'supports'          => array( 'title', 'editor', 'author', 'thumbnail', 'excerpt', 'post-formats' )
  );

  register_post_type( 'articulo', $args );
}

add_action( 'init', 'articulo_init' );


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

// Función para crear una taxonomía
function ciudades() {

  // Definimos un array para las traducciones de la taxonomía
  $etiquetas = array(
      'name' => __( 'Ciudad' ),
      'singular_name' => __( 'Ciudad' ),
      'search_items' =>  __( 'Buscar ciudad' ),
      'all_items' => __( 'Todos las ciudades' ),
    //   'parent_item' => __( 'Año padre' ),
    //   'parent_item_colon' => __( 'Año padre:' ),
      'edit_item' => __( 'Editar ciudad' ), 
      'update_item' => __( 'Actualizar ciudad' ),
      'add_new_item' => __( 'Agregar un nueva ciudad' ),
      'menu_name' => __( 'Ciudad' ),
  ); 

  // Función WordPress para registrar la taxonomía
  register_taxonomy(
      'ciudades',
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
add_action( 'init', 'ciudades', 0 );

// custom fields 
add_action('rest_api_init', 'register_custom_fields');

function register_custom_fields() {
    register_rest_field('post', 'placa',
        array( 'get_callback' => 'show_fields')
    );

    register_rest_field('post', 'combustible',
        array( 'get_callback' => 'show_fields')
    );

    register_rest_field('post', 'recorrido',
        array( 'get_callback' => 'show_fields')
    );

    register_rest_field('post', 'único_dueño',
        array( 'get_callback' => 'show_fields')
    );

    register_rest_field('post', 'version',
        array( 'get_callback' => 'show_fields')
    );

    register_rest_field('post', 'direccion',
        array( 'get_callback' => 'show_fields')
    );

    register_rest_field('post', 'doy_financiamiento',
        array( 'get_callback' => 'show_fields')
    );

    register_rest_field('post', 'motor',
        array( 'get_callback' => 'show_fields')
    );
    register_rest_field('post', 'transmision',
        array( 'get_callback' => 'show_fields')
    );
    register_rest_field('post', 'exterior',
        array( 'get_callback' => 'show_fields')
    );
    register_rest_field('post', 'seguridad',
        array( 'get_callback' => 'show_fields')
    );
    register_rest_field('post', 'equipamiento',
        array( 'get_callback' => 'show_fields')
    );
    register_rest_field('post', 'ubicacion_del_vehiculos',
        array( 'get_callback' => 'show_fields')
    );
    register_rest_field('post', 'precio',
        array( 'get_callback' => 'show_fields')
    );
    register_rest_field('post', 'galeria',
        array( 'get_callback' => 'show_fields')
    );
    register_rest_field('post', 'tipo',
        array( 'get_callback' => 'show_fields')
    );
    register_rest_field('post', 'telefono',
        array( 'get_callback' => 'show_fields')
    );
    register_rest_field('post', 'nombre',
        array( 'get_callback' => 'show_fields')
    );
    register_rest_field('post', 'nombre_concesionario',
        array( 'get_callback' => 'show_fields')
    );
}

function show_fields( $object, $field_name, $request ) {
    return get_post_meta( $object[ 'id' ], $field_name, true );
}

