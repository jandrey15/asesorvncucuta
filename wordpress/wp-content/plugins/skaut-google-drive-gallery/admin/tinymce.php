<?php
namespace Sgdg\Admin\TinyMCE;

if ( ! is_admin() ) {
	return;
}

function register() {
	add_action( 'media_buttons', '\\Sgdg\\Admin\\TinyMCE\\add' );
	add_action( 'wp_enqueue_media', '\\Sgdg\\Admin\\TinyMCE\\register_scripts_styles' );
	add_action( 'wp_ajax_list_gallery_dir', '\\Sgdg\\Admin\\TinyMCE\\handle_ajax' );
}

function add() {
	if ( ( ! current_user_can( 'edit_posts' ) && ! current_user_can( 'edit_pages' ) ) || 'true' !== get_user_option( 'rich_editing' ) ) {
		return;
	}
	echo( '<a href="#" id="sgdg-tinymce-button" class="button"><img class="sgdg-tinymce-button-icon" src="' . esc_attr( plugins_url( '/skaut-google-drive-gallery/admin/icon.png' ) ) . '">' . esc_html__( 'Google Drive gallery', 'skaut-google-drive-gallery' ) . '</a>' );
	add_thickbox();
}

function register_scripts_styles() {
	if ( ( ! current_user_can( 'edit_posts' ) && ! current_user_can( 'edit_pages' ) ) || 'true' !== get_user_option( 'rich_editing' ) ) {
		return;
	}
	\Sgdg\enqueue_style( 'sgdg_tinymce', '/admin/css/tinymce.css' );
	\Sgdg\enqueue_script( 'sgdg_tinymce', '/admin/js/tinymce.js' );
	wp_localize_script( 'sgdg_tinymce', 'sgdgTinymceLocalize', [
		'dialog_title'  => esc_html__( 'Google Drive gallery', 'skaut-google-drive-gallery' ),
		'root_name'     => esc_html__( 'Google Drive gallery', 'skaut-google-drive-gallery' ),
		'insert_button' => esc_html__( 'Insert', 'skaut-google-drive-gallery' ),
		'ajax_url'      => admin_url( 'admin-ajax.php' ),
		'nonce'         => wp_create_nonce( 'sgdg_editor_plugin' ),
	]);
}

function handle_ajax() {
	check_ajax_referer( 'sgdg_editor_plugin' );
	if ( ! current_user_can( 'edit_posts' ) && ! current_user_can( 'edit_pages' ) ) {
		return;
	}
	if ( ! get_option( 'sgdg_access_token' ) ) {
		// translators: 1: Start of link to the settings 2: End of link to the settings
		wp_send_json( [ 'error' => sprintf( esc_html__( 'Google Drive gallery hasn\'t been granted permissions yet. Please %1$sconfigure%2$s the plugin and try again.', 'skaut-google-drive-gallery' ), '<a href="' . esc_url( admin_url( 'admin.php?page=sgdg_basic' ) ) . '">', '</a>' ) ] );
	}

	$client = \Sgdg\Frontend\GoogleAPILib\get_drive_client();

	$path = isset( $_GET['path'] ) ? $_GET['path'] : [];
	$ret  = walk_path( $client, $path );

	wp_send_json( [ 'response' => $ret ] );
}

function walk_path( $client, array $path, $root = null ) {
	if ( ! isset( $root ) ) {
		$root_path = \Sgdg\Options::$root_path->get();
		$root      = end( $root_path );
	}
	if ( 0 === count( $path ) ) {
		return list_files( $client, $root );
	}
	$page_token = null;
	do {
		$params   = [
			'q'                     => '"' . $root . '" in parents and mimeType = "application/vnd.google-apps.folder" and trashed = false',
			'supportsTeamDrives'    => true,
			'includeTeamDriveItems' => true,
			'pageToken'             => $page_token,
			'pageSize'              => 1000,
			'fields'                => 'nextPageToken, files(id, name)',
		];
		$response = $client->files->listFiles( $params );
		foreach ( $response->getFiles() as $file ) {
			if ( $file->getName() === $path[0] ) {
				array_shift( $path );
				return walk_path( $client, $path, $file->getId() );
			}
		}
	} while ( null !== $page_token );
}

function list_files( $client, $root ) {
	$ret        = [];
	$page_token = null;
	do {
		$params   = [
			'q'                     => '"' . $root . '" in parents and mimeType = "application/vnd.google-apps.folder" and trashed = false',
			'supportsTeamDrives'    => true,
			'includeTeamDriveItems' => true,
			'pageToken'             => $page_token,
			'pageSize'              => 1000,
			'fields'                => 'nextPageToken, files(id, name)',
		];
		$response = $client->files->listFiles( $params );
		foreach ( $response->getFiles() as $file ) {
			$ret[] = $file->getName();
		}
		$page_token = $response->getNextPageToken();
	} while ( null !== $page_token );
	return $ret;
}
