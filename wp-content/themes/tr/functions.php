<?php
/**
 * TR functions and definitions
 *
 * @link https://developer.wordpress.org/themes/basics/theme-functions/
 *
 * @package TR
 */

if (!function_exists('tr_setup')) :
    /**
     * Sets up theme defaults and registers support for various WordPress features.
     *
     * Note that this function is hooked into the after_setup_theme hook, which
     * runs before the init hook. The init hook is too late for some features, such
     * as indicating support for post thumbnails.
     */
//attach our function to the wp_pagenavi filter
    add_filter('wp_pagenavi', 'ik_pagination', 10, 2);

//customize the PageNavi HTML before it is output
    function ik_pagination($html)
    {
        $out = '';

        //wrap a's and span's in li's
        $out = str_replace("<div", "", $html);
        $out = str_replace("class='wp-pagenavi'>", "", $out);
        $out = str_replace("<a", "<li><a", $out);
        $out = str_replace("</a>", "</a></li>", $out);
        $out = str_replace("<span", "<li><span", $out);
        $out = str_replace("</span>", "</span></li>", $out);
        $out = str_replace("</div>", "", $out);

        return '<ul class="pagination pagination-centered">' . $out . '</ul>';
    }

    add_filter('pll_get_post_types', 'fixwp_add_acf_pll', 10, 2);
    function fixwp_add_acf_pll($post_types, $is_settings)
    {
        $post_types[] = 'acf';
        return $post_types;
    }

    if( function_exists('acf_add_options_page') ) {

        acf_add_options_page();
        acf_add_options_sub_page('footer');
    }

        function tr_setup() {
            /*
             * Make theme available for translation.
             * Translations can be filed in the /languages/ directory.
             * If you're building a theme based on TR, use a find and replace
             * to change 'tr' to the name of your theme in all the template files.
             */
            load_theme_textdomain('tr', get_template_directory() . '/languages');

            // Add default posts and comments RSS feed links to head.
            add_theme_support('automatic-feed-links');

            /*
             * Let WordPress manage the document title.
             * By adding theme support, we declare that this theme does not use a
             * hard-coded <title> tag in the document head, and expect WordPress to
             * provide it for us.
             */
            add_theme_support('title-tag');

            /*
             * Enable support for Post Thumbnails on posts and pages.
             *
             * @link https://developer.wordpress.org/themes/functionality/featured-images-post-thumbnails/
             */
            add_theme_support('post-thumbnails');

            // This theme uses wp_nav_menu() in one location.
            register_nav_menus(array(
                'menu' => esc_html__('Primary', 'tr'),
            ));

            /*
             * Switch default core markup for search form, comment form, and comments
             * to output valid HTML5.
             */
            add_theme_support('html5', array(
                'search-form',
                'comment-form',
                'comment-list',
                'gallery',
                'caption',
            ));

            // Set up the WordPress core custom background feature.
            add_theme_support('custom-background', apply_filters('tr_custom_background_args', array(
                'default-color' => 'ffffff',
                'default-image' => '',
            )));

            // Add theme support for selective refresh for widgets.
            add_theme_support('customize-selective-refresh-widgets');

            /**
             * Add support for core custom logo.
             *
             * @link https://codex.wordpress.org/Theme_Logo
             */
            add_theme_support('custom-logo', array(
                'height' => 250,
                'width' => 250,
                'flex-width' => true,
                'flex-height' => true,
            ));
        }
endif;
add_action('after_setup_theme', 'tr_setup');

/**
 * Set the content width in pixels, based on the theme's design and stylesheet.
 *
 * Priority 0 to make it available to lower priority callbacks.
 *
 * @global int $content_width
 */
function tr_content_width()
{
    // This variable is intended to be overruled from themes.
    // Open WPCS issue: {@link https://github.com/WordPress-Coding-Standards/WordPress-Coding-Standards/issues/1043}.
    // phpcs:ignore WordPress.NamingConventions.PrefixAllGlobals.NonPrefixedVariableFound
    $GLOBALS['content_width'] = apply_filters('tr_content_width', 640);
}

add_action('after_setup_theme', 'tr_content_width', 0);

/**
 * Register widget area.
 *
 * @link https://developer.wordpress.org/themes/functionality/sidebars/#registering-a-sidebar
 */
function tr_widgets_init()
{
    register_sidebar(array(
        'name' => esc_html__('Sidebar', 'tr'),
        'id' => 'sidebar-1',
        'description' => esc_html__('Add widgets here.', 'tr'),
        'before_widget' => '<section id="%1$s" class="widget %2$s">',
        'after_widget' => '</section>',
        'before_title' => '<h2 class="widget-title">',
        'after_title' => '</h2>',
    ));
}

add_action('widgets_init', 'tr_widgets_init');

/**
 * Enqueue scripts and styles.
 */
function tr_scripts()
{
    wp_enqueue_style('tr-style', get_stylesheet_uri());


    wp_enqueue_script('tr-navigation', get_template_directory_uri() . '/js/navigation.js', array(), '20151215', true);

    wp_enqueue_script('tr-skip-link-focus-fix', get_template_directory_uri('/js/core.min.js') . '/js/skip-link-focus-fix.js', array(), '20151215', true);

    wp_enqueue_script('script-js', get_template_directory_uri() . '/js/script.js', array(), '12062019', true);


    if (is_singular() && comments_open() && get_option('thread_comments')) {
        wp_enqueue_script('comment-reply');
    }
}

add_action('wp_enqueue_scripts', 'tr_scripts');

/**
 * Implement the Custom Header feature.
 */
require get_template_directory() . '/inc/custom-header.php';

/**
 * Custom template tags for this theme.
 */
require get_template_directory() . '/inc/template-tags.php';

/**
 * Functions which enhance the theme by hooking into WordPress.
 */
require get_template_directory() . '/inc/template-functions.php';

/**
 * Customizer additions.
 */
require get_template_directory() . '/inc/customizer.php';

/**
 * Load Jetpack compatibility file.
 */
if (defined('JETPACK__VERSION')) {
    require get_template_directory() . '/inc/jetpack.php';
}

function sydney_custom_styles()
{
    wp_register_style('custom_style', get_template_directory_uri() . '/style/fonts.css', array(), '1', 'all');
    wp_register_style('style-css', get_template_directory_uri() . '/style/style.css', array(), '1', 'all');
    wp_enqueue_style('custom_style');
    wp_enqueue_style('style-css');
}

add_action('wp_enqueue_scripts', 'sydney_custom_styles');

//JS

function sydney_custom_scripts()
{
    wp_register_script('style-css', get_template_directory_uri() . '/js/script.js', array(), '1', 'all');
    wp_register_script('custom_style', get_template_directory_uri() . '/js/customizer.js', array(), '1', 'all');
    wp_enqueue_script('script-js');
    wp_enqueue_script('customizer_js');
}

add_action('wp_enqueue_scripts', 'sydney_custom_styles');


