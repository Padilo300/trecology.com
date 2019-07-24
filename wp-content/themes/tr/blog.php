<?php
/*
 * Template name: Блог
 */
get_header(); ?>

<?php /**The main template file ...*/ ?>

    <style>
        .rd-navbar {
            background-color: #212121 !important;
        }
    </style>

<?php
$current_page = (get_query_var('paged')) ? get_query_var('paged') : 1; // определяем текущую страницу блога
$args = array(
    'posts_per_page' => 6, // значение по умолчанию берётся из настроек, но вы можете использовать и собственное
    'paged' => $current_page // текущая страница
);
query_posts($args);

$wp_query->is_archive = true;
$wp_query->is_home = false;
?>
    <section class="section-75 section-md-100 section-lg-150">
        <div class="shell text-sm-left">
            <div class="range range-sm-center range-md-left">
                <div class="cell-lg-6 cell-md-8 cell-sm-10">
                    <h1>Блог</h1>
                </div>
            </div>
            <div class="range blog range-sm-center range-md-left">
                <? while (have_posts()): the_post();
                    ?>


                    <div class="cell-md-6 cell-xl-6 cell-sm-10">
                        <article class="blog-grid"><a style="max-height: 250px;" class="blog-grid-image"
                                                      href="<?php the_permalink() ?>"><?php echo get_the_post_thumbnail() ?>
                            </a>
                            <div class="blog-grid-content">
                                <h5><a class="text-primary"
                                       href="<?php the_permalink() ?>"><?php the_title() /* заголовок */ ?></a></h5>
                                <p><?php the_excerpt() /* содержимое поста */ ?></p>
                                <p class="text-darker">
                                    <time datetime="2018"><?php the_date() /* содержимое поста */ ?></time>
                                </p>
                            </div>
                        </article>
                    </div>
                <?php
                endwhile;
                ?>




                <div class="range blog range-sm-center range-md-center">
                    <div class="pagination-block">

                        <?php
                        if (function_exists('wp_pagenavi')) wp_pagenavi(array(
                            'before' => '',
                            'after' => '',
                            'wrapper_tag' => 'ul',
                            'wrapper_class' => '',
                            'options' => array( ),
                            'query' => $GLOBALS['wp_query'],
                            'type' => 'posts',
                            'echo' => true
                        ));
                        ?>

                    </div>
                </div>





            </div>
        </div>
    </section>


<?php

get_footer();

?>