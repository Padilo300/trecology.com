<?php
/**
 * The base configuration for WordPress
 *
 * The wp-config.php creation script uses this file during the
 * installation. You don't have to use the web site, you can
 * copy this file to "wp-config.php" and fill in the values.
 *
 * This file contains the following configurations:
 *
 * * MySQL settings
 * * Secret keys
 * * Database table prefix
 * * ABSPATH
 *
 * @link https://codex.wordpress.org/Editing_wp-config.php
 *
 * @package WordPress
 */

// ** MySQL settings - You can get this info from your web host ** //
/** The name of the database for WordPress */
define('DB_NAME', 'padilo00_tr');

/** MySQL database username */
define('DB_USER', 'padilo00_tr');

/** MySQL database password */
define('DB_PASSWORD', 'DX-0r89dm~');

/** MySQL hostname */
define('DB_HOST', 'padilo00.mysql.tools');

/** Database Charset to use in creating database tables. */
define('DB_CHARSET', 'utf8');

/** The Database Collate type. Don't change this if in doubt. */
define('DB_COLLATE', '');

/**#@+
 * Authentication Unique Keys and Salts.
 *
 * Change these to different unique phrases!
 * You can generate these using the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}
 * You can change these at any point in time to invalidate all existing cookies. This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define('AUTH_KEY',         '#Oq0XY0MQ^Y8#jKnCu6IL)tRohxssN9Li4zsYj)JQw3w7v%!eO%vlJR3ye89fzqh');
define('SECURE_AUTH_KEY',  'uG^Niumvm8@hj9c36sDV!6Do&RD(QIz900tM5B%tHNiLMEW(ryZI@DrAcjcs*(Yq');
define('LOGGED_IN_KEY',    'Heu(9wspnzzi8TuzHpE84cYl6rm&%9kPgQxEDFgI1s)4L#oH0#erI@np5DK!e)t9');
define('NONCE_KEY',        '&EvDRQ)rlpJbi!^OI9G@FG5dO51!ZjTuzogrlqJXEWS8K!A%1eyrUt9Ob*weI&sy');
define('AUTH_SALT',        'SBa6Dc2nxVua4tU34%JPKunmdgARO7nt7Mb^U50)%XGAhFs7@n2pzaexNcxnSd5T');
define('SECURE_AUTH_SALT', 'fo(VJzh9*hsZn5No^Uwa2WB2OT!LE1n1JNcu6%AvgW)9*Bse4H1mUCFzE2fKudvt');
define('LOGGED_IN_SALT',   'C#bR1Zx7ummtRQ68yRX%YGYOErzm13VTySv!6rkXrzgqnjAn8xPeDZkw0Tel)I5v');
define('NONCE_SALT',       'OBKXlMqu3SLRerGBMxO5ftQMz^w6u7YbTf@qd*Evi%e!drseORkQGZJ0WBSC)E*V');
/**#@-*/

/**
 * WordPress Database Table prefix.
 *
 * You can have multiple installations in one database if you give each
 * a unique prefix. Only numbers, letters, and underscores please!
 */
$table_prefix  = 'wp_';

/**
 * For developers: WordPress debugging mode.
 *
 * Change this to true to enable the display of notices during development.
 * It is strongly recommended that plugin and theme developers use WP_DEBUG
 * in their development environments.
 *
 * For information on other constants that can be used for debugging,
 * visit the Codex.
 *
 * @link https://codex.wordpress.org/Debugging_in_WordPress
 */
define('WP_DEBUG', false);

/* That's all, stop editing! Happy blogging. */

/** Absolute path to the WordPress directory. */
if ( !defined('ABSPATH') )
	define('ABSPATH', dirname(__FILE__) . '/');

/** Sets up WordPress vars and included files. */
require_once(ABSPATH . 'wp-settings.php');

define( 'WP_ALLOW_MULTISITE', true );

define ('FS_METHOD', 'direct');
