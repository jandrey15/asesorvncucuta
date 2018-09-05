<?php
namespace Sgdg\Admin\GoogleAPILib;

if ( ! is_admin() ) {
	return;
}

function oauth_grant() {
	$client   = \Sgdg\Frontend\GoogleAPILib\get_raw_client();
	$auth_url = $client->createAuthUrl();
	header( 'Location: ' . esc_url_raw( $auth_url ) );
}

function oauth_redirect() {
	// phpcs:ignore WordPress.Security.NonceVerification.NoNonceVerification
	if ( ! isset( $_GET['code'] ) ) {
		add_settings_error( 'general', 'oauth_failed', esc_html__( 'Google API hasn\'t returned an authentication code. Please try again.', 'skaut-google-drive-gallery' ), 'error' );
	}
	if ( count( get_settings_errors() ) === 0 && ! get_option( 'sgdg_access_token' ) ) {
		$client = \Sgdg\Frontend\GoogleAPILib\get_raw_client();
		// phpcs:ignore WordPress.Security.NonceVerification.NoNonceVerification
		$client->authenticate( $_GET['code'] );
		$access_token = $client->getAccessToken();

		$drive_client = new \Sgdg\Vendor\Google_Service_Drive( $client );
		try {
			\Sgdg\Admin\AdminPages\Basic\RootSelection\list_teamdrives( $drive_client );
			update_option( 'sgdg_access_token', $access_token );
		} catch ( \Sgdg\Vendor\Google_Service_Exception $e ) {
			if ( 'accessNotConfigured' === $e->getErrors()[0]['reason'] ) {
				// translators: %s: Link to the Google developers console
				add_settings_error( 'general', 'oauth_failed', sprintf( esc_html__( 'Google Drive API is not enabled. Please enable it at %s and try again after a while.', 'skaut-google-drive-gallery' ), '<a href="https://console.developers.google.com/apis/library/drive.googleapis.com" target="_blank">https://console.developers.google.com/apis/library/drive.googleapis.com</a>' ), 'error' );
			} else {
				add_settings_error( 'general', 'oauth_failed', esc_html__( 'An unknown error has been encountered:', 'skaut-google-drive-gallery' ) . ' ' . $e->getErrors()[0]['message'], 'error' );
			}
		}
	}
	if ( count( get_settings_errors() ) === 0 ) {
		add_settings_error( 'general', 'oauth_updated', esc_html__( 'Permission granted.', 'skaut-google-drive-gallery' ), 'updated' );
	}
	set_transient( 'settings_errors', get_settings_errors(), 30 );
	header( 'Location: ' . esc_url_raw( admin_url( 'admin.php?page=sgdg_basic&settings-updated=true' ) ) );
}

function oauth_revoke() {
	$client = \Sgdg\Frontend\GoogleAPILib\get_raw_client();
	$client->revokeToken();
	delete_option( 'sgdg_access_token' );
	add_settings_error( 'general', 'oauth_updated', __( 'Permission revoked.', 'skaut-google-drive-gallery' ), 'updated' );
	set_transient( 'settings_errors', get_settings_errors(), 30 );
	header( 'Location: ' . esc_url_raw( admin_url( 'admin.php?page=sgdg_basic&settings-updated=true' ) ) );
}
