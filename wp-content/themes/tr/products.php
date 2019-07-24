<?php
/**
 * Template Name: Продукция
 */
get_header(); ?>

<?php /**The main template file ...*/?>

    <style>
        .rd-navbar{
            background-color: #212121!important;
        }
    </style>


    <section class="section-75 section-md-100 section-lg-150">
        <div class="shell">
            <div class="range range-sm-center">
                <div class="cell-md-8 cell-lg-12 cell-sm-9">
                    <div class="range">
                        <div class="cell-lg-7 cell-xl-6 cell-md-8">
                            <h1><?php the_field('prod_text_1') ?></h1>
                            <p><?php the_field('prod_text_2') ?></p>
                        </div>
                    </div>
                    <div class="range range-lg-middle">
                        <div class="cell-lg-7 cell-xl-6">
                            <div class="inset-lg-right-30 inset-xl-right-0">
                                <h3><span class="small"><?php the_field('text_after_title_1') ?></span><?php the_field('text_after_title_2') ?></h3>
                                <p><?php the_field('text_after_title_3') ?></p>
                            </div>
                        </div>
                        <div class="cell-lg-5 cell-xl-preffix-1"><img class="img-responsive" src="<?php the_field('img_prod_right') ?>" alt="" width="610" height="390"/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    <section class="section-30">
                    <div class="range spacing-40">
                        <div class="cell-sm-6 cell-md-4 height-fill">
                            <div class="box-info" style="background-image: url(<?php the_field('img_left_home') ?>);">
                                <div class="novi-icon icon icon-primary icon-xxl mdi mdi-account-multiple-outline"></div>
                                <h5><a href="single-service.html"><?php the_field('text_top_img_left_home') ?></a></h5>
                                        <p><?php the_field('text_bot_img_left_home') ?></p>
                                    </div>
                                </div>
                                <div class="cell-sm-6 cell-md-4 height-fill">
                                    <div class="box-info" style="background-image: url(<?php the_field('img_middle_home') ?>    );">
                                        <div class="novi-icon icon icon-primary icon-xxl mdi mdi-comment-multiple-outline"></div>
                                        <h5><a href="single-service.html"><?php the_field('text_top_img_middle_home') ?></a></h5>
                                                <p><?php the_field('text_bot_img_middle_home') ?></p>
                                            </div>
                                        </div>
                                        <div class="cell-sm-6 cell-md-4 height-fill">
                                            <div class="box-info" style="background-image: url(<?php the_field('img_right_home') ?>);">
                                               <div class="novi-icon icon icon-primary icon-xxl mdi mdi-chart-arc"></div>
                                                <h5><a href="single-service.html"><?php the_field('text_top_img_right_home') ?></a></h5>
                                                        <p><?php the_field('text_bot_img_right_home') ?></p>
                                                    </div>
                                                </div>
                                            </div>
        <div class="section-75 section-md-75 section-lg-75"></div>
    </section>

            <?php echo do_shortcode( '[contact-form-7 id="156" title="Контактная форма 1"]' ); ?>

   

<?php get_footer(); ?>