<?php
/**
 * Template part for displaying posts
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/
 *
 * @package TR
 */

?>
<style>
    .rd-navbar{
        background-color: #212121!important;
    }
</style>

<section class="section-75 section-md-100 section-lg-150">
    <div class="shell text-sm-left">
        <div class="blog-post">
            <div class="range">

<article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>
    <script type="application/ld+json">
        {
            "@context": "https://schema.org",
            "@type": "NewsArticle",
            "mainEntityOfPage": {
                "@type": "WebPage",
                "@id": "https://google.com/article"
            },
            "headline": "<?php the_title();?>",
         "datePublished": "2019-05-05T08:00:00+08:00",
          "dateModified": "2019-06-05T09:20:00+08:00",
            "image":
                        "https://<?php echo $_SERVER['SERVER_NAME']?>/article.jpg",
            "author": {
                "@type": "Person",
                "name": "Дмитрий"
            },
            "publisher": {
                "@type": "Organization",
                "name": "TR",
                "logo": {
                    "@type": "ImageObject",
                    "url": "https://google.com/logo.jpg"
                }
            },
            "description": "Рекомендуем к знакомству!"
        }
    </script>

    <header class="entry-header">
        <?php
        if ( is_singular() ) :
            the_title( '<h1 class="entry-title">', '</h1>' );
        else :
            the_title( '<h2 class="entry-title"><a href="' . esc_url( get_permalink() ) . '" rel="bookmark">', '</a></h2>' );
        endif;

        if ( 'post' === get_post_type() ) :
            ?>

        <?php endif; ?>
    </header><!-- .entry-header -->

    <?php tr_post_thumbnail(); ?>

    <div class="entry-content">
        <?php
        the_content( sprintf(
            wp_kses(
            /* translators: %s: Name of current post. Only visible to screen readers */
                __( 'Continue reading<span class="screen-reader-text"> "%s"</span>', 'tr' ),
                array(
                    'span' => array(
                        'class' => array(),
                    ),
                )
            ),
            get_the_title()
        ) );

        wp_link_pages( array(
            'before' => '<div class="page-links">' . esc_html__( 'Pages:', 'tr' ),
            'after'  => '</div>',
        ) );
        ?>
        <div class="entry-meta">
            <?php
            tr_posted_on();
            tr_posted_by();
            ?>
        </div><!-- .entry-meta -->
    </div><!-- .entry-content -->
    <br>
    <footer class="entry-footer">
        <?php tr_entry_footer(); ?>
    </footer><!-- .entry-footer -->
</article><!-- #post-<?php the_ID(); ?> -->


            </div>
        </div>
    </div>
</section>