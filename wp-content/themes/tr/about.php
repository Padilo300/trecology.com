<?php
/**
 * Template Name: О нас
 */
get_header(); ?>

<?php /**The main template file ...*/?>

    <style>
        .rd-navbar{
            background-color: #212121!important;
        }
    </style>




    <section class="section-50 section-sm-top-80 section-md-top-100 section-lg-top-150 bg-image bg-revail-lg bg-top-right" style="background-image: url()">
        <div class="shell">
            <div class="range">
                <div class="cell-lg-6">
                    <h1><?php the_field('page_name_about') ?></h1>
                    <h2><?php the_field('text_long_about') ?></h2>
                    <p><?php the_field('description_about_us') ?></p>
                    <p><?php the_field('description_about_us_2') ?></p>
                    <div class="unit unit-horizontal unit-middle unit-spacing-xl text-left unit-align-center unit-md-align-left">
                    <div class="unit-body">
                        <h6><?php the_field('description_about_us_names') ?></h6><span class="small"><?php the_field('description_about_position') ?></span>
                    </div>
                    </div>
                </div>
                <div class="cell-lg-6">
                    <img src="<?php the_field('img_about_us') ?>" alt="">

                </div>
            </div>
        </div>
    </section>

    <section class="section-50 section-sm-top-80 section-md-top-100 section-lg-top-150 bg-image bg-revail-lg bg-top-right" style="background-image: url()">
        <div class="shell">
            <div class="range">
                <div class="cell-lg-12 ">
                    <h2 class="text-center"><?php the_field('our_values_about') ?></h2>
                    <p><?php the_field('our_values_about_full') ?></p>
                </div>

            </div>
        </div>
    </section>



    <section class="section-75 section-md-100 section-lg-150">
        <div class="shell range-offset-1">
            <div class="range">
                <div class="cell-lg-12 text-center">
                    <h2><?php the_field('text_1_about') ?></h2>
                    <h6><?php the_field('text_2_about') ?></h6>
                </div>
            </div>
            <div class="range">
                <div class="cell-lg-6 cell-sm-6 cell-md-12 offset-top-60 offset-lg-top-0 offset-sm-top-0 offset-md-top-60">
                    <div class="range range-sm-middle">
                        <div class="cell-md-6"><img class="img-responsive" src="<?php the_field('team_photo_1') ?>" alt="" width="360" height="404"/>
                        </div>
                        <div class="cell-md-6">
                            <div class="inset-xl-right-70 inset-xl-left-70 inset-left-15 inset-right-15">
                                <h6 class="h6-with-small"><a href="team-member.html"><h6><?php the_field('team_name_1') ?></h6></a><span class="small text-silver-chalice"><?php the_field('team_post_1') ?></span></h6>
                                <p><?php the_field('team_desc_1') ?></p>

                            </div>
                        </div>
                    </div>
                </div>
                <div class="cell-lg-6 cell-sm-6 cell-md-12">
                    <div class="range range-sm-middle">
                        <div class="cell-md-6"><img class="img-responsive" src="<?php the_field('team_photo_2') ?>" alt="" width="360" height="404"/>
                        </div>
                        <div class="cell-md-6">
                            <div class="inset-xl-right-70 inset-xl-left-70 inset-left-15 inset-right-15">
                                <h6 class="h6-with-small"><a href="team-member.html"><?php the_field('team_name_2') ?></a><span class="small text-silver-chalice"><?php the_field('team_post_2') ?></span></h6>
                                <p><?php the_field('team_desc_2') ?></p>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="range">
                <div class="cell-lg-6 cell-sm-6 cell-md-12">
                    <div class="range range-sm-middle">
                        <div class="cell-md-6"><img class="img-responsive" src="<?php the_field('team_photo_3') ?>" alt="" width="360" height="404"/>
                        </div>
                        <div class="cell-md-6">
                            <div class="inset-xl-right-70 inset-xl-left-70 inset-left-15 inset-right-15">
                                <h6 class="h6-with-small"><a href="team-member.html"><?php the_field('team_name_3') ?></a><span class="small text-silver-chalice"><?php the_field('team_post_3') ?></span></h6>
                                <p><?php the_field('team_desc_3') ?></p>

                            </div>
                        </div>
                    </div>
                </div>
                <div class="cell-lg-6 cell-sm-6 cell-md-12 offset-top-60 offset-lg-top-0 offset-sm-top-0 offset-md-top-60">
                    <div class="range range-sm-middle">
                        <div class="cell-md-6"><img class="img-responsive" src="<?php the_field('team_photo_4') ?>" alt="" width="360" height="404"/>
                        </div>
                        <div class="cell-md-6">
                            <div class="inset-xl-right-70 inset-xl-left-70 inset-left-15 inset-right-15">
                                <h6 class="h6-with-small"><a href="team-member.html"><?php the_field('team_name_4') ?></a><span class="small text-silver-chalice"><?php the_field('team_post_4') ?></span></h6>
                                <p><?php the_field('team_desc_4') ?></p>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
<?php get_footer(); ?>