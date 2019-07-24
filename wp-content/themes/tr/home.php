<?php
/**
 * Template Name: Главная
 */
get_header(); ?>

<?php /**The main template file ...*/?>
    <div class="page text-center text-md-left">
<!--    <div class="swiper-container swiper-slider swiper-absolute" data-height="100vh" data-min-height="300px">-->
        <div class="swiper-container swiper-absolute" data-height="100vh" data-min-height="300px" style="background: url('http://кубаньэкопродукт.рф/images/2017/11/26/utilizaciya-shin-krasnodar.jpg');    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;">
        <div class="shell text-center">
            <div class="range section-100-vh range-xs-middle section-video">
                <div class="cell-md-12">
                    <style>
                        @media screen and (max-width: 768px){
                            body > div > div.page.text-center.text-md-left > div.swiper-container.swiper-absolute > div.shell.text-center > div > div > p{
                                font-size: 1em !important;
                                padding: 0 0 0 30px;
                            }
                        }

                    </style>
                    <div class="latters-bg-vide-wrap"><img src="images/logo-729x239.png" alt="" width="729" height="239">
                        <div class="latters-bg-vide">
                            <link href="https://fonts.googleapis.com/css?family=Source+Serif+Pro:400,600,700&display=swap" rel="stylesheet">
                            <svg>
                                <defs>

                                    <clipPath id="clip-00" clipPathUnits="objectBoundingBox" transform="scale(0.0014084507, 0.00460829493)">
                                        <text x="182" y="230" font-family="Source Serif Pro" font-weight="bold" font-size="20em">TR</text>
                                    </clipPath>
                                </defs>
                            </svg>
                            <div class="bg-vide" data-vide-bg="video/video-bg-letters" data-vide-options="posterType: jpg" style="position: relative;">
                                <style>
                                    .chrome .latters-bg-vide .bg-vide > div{
                                        opacity: 1 !important;
                                    }
                                </style>
                                <div style="position: absolute; z-index: 0; top: 0px; left: 0px; bottom: 0px; right: 0px; overflow: hidden; background-size: cover; background-color: transparent; background-repeat: no-repeat; background-position: 50% 50%; background-image: none;">
                                    <video autoplay="" loop="" muted="" style="    margin: auto;
    position: absolute;
    z-index: -1;
    top: 142px;
    left: 386px;
    transform: translate(-50%, -50%);
    visibility: visible;
    width: 600px;
    height: auto;
    opacity: 0.53;">
                                        <source src="/video-bg-letters.mp4" type="video/mp4">
                                    </video>
                                </div>
                            </div>
                        </div>
                    </div>
                    <p class="h6 offset-top-30 text-white textDes"><?php the_field('slider_text') ?></p><a class="btn btn-default btn-default-white offset-top-55" href="index.html#"><?php the_field('slider_button_text') ?></a>
                </div>
            </div>
        </div>

        <div class="swiper-wrapper text-center">
<!--            <div class="swiper-slide" data-slide-bg="http://alfaspk.ru/d/985368/d/priyem_shin_na_utilizatsiyu_0.jpg "></div>-->
            <div class="swiper-slide" data-slide-bg="http://кубаньэкопродукт.рф/images/2017/11/26/utilizaciya-shin-krasnodar.jpg"></div>
        </div>
        <div class="custom-way-point custom-way-point-swiper animated" data-custom-scroll-to="custom-way-point"><?php the_field('scroll_down') ?></div>
    </div>


    

    <!-- our services-->
    <section class="section-75 section-md-120 section-lg-120 section-xl-150 bg-table">
        <div class="shell text-center">
            <div class="range range-sm-center">
                <div class="cell-lg-10 cell-xl-8">
                    <h2><span class="small"><?php the_field('text_third_page_home') ?></span><?php the_field('text_2_third_page_home') ?></h2>
                    <h6><?php the_field('text_3_third_page_home') ?></h6>
                </div>
            </div>
            <div class="shell">
                <div class="range">
                    <div class="cell-sm-6 cell-lg-4 cell-xl-4 offset-top-50 offset-sm-top-0 cell-xl-preffix-1">
                        <div class="novi-icon icon icon-primary icon-xl linearicons-rocket"></div>
                        <h5><a href="single-service.html"><?php the_field('bot_prod_text_1') ?></a></h5>
                        <p class="text-justify"><?php the_field('bot_prod_desc_1') ?></p>
                    </div>
                    <div class="cell-sm-6 cell-lg-4 cell-xl-4 offset-top-50 offset-sm-top-0 cell-xl-preffix-2">
                        <div class="novi-icon icon icon-primary icon-xl linearicons-pie-chart"></div>
                        <h5><a class="postfix-xl-right--25" href="single-service.html"><?php the_field('bot_prod_text_2') ?></a></h5>
                        <p class="text-justify"><?php the_field('bot_prod_desc_2') ?></p>
                    </div>
                    <div class="cell-sm-6 cell-lg-4 cell-xl-4 offset-top-50 offset-lg-top-0 cell-xl-preffix-1">
                        <div class="novi-icon icon icon-primary icon-xl linearicons-lamp"></div>
                        <h5><a href="single-service.html"><?php the_field('bot_prod_text_3') ?></a></h5>
                        <p class="text-justify"><?php the_field('bot_prod_desc_3') ?></p>
                    </div>
                    <div class="cell-sm-6 cell-lg-4 cell-xl-4 offset-top-50 offset-lg-top-0 cell-xl-preffix-2">
                        <div class="novi-icon icon icon-primary icon-xl linearicons-archery"></div>
                        <h5><a href="single-service.html"><?php the_field('bot_prod_text_4') ?></a></h5>
                        <p class="text-justify"><?php the_field('bot_prod_desc_4') ?></p>
                    </div>
                </div>
            </div>
        </div>
    </section>
    <!-- High quality guaranteed-->
    <section class="section-75 section-md-120 section-lg-120 section-xl-150" id="custom-way-point">
        <div class="shell text-center">
            <div class="range range-sm-center">
                <div class="cell-lg-10 cell-xl-8">
                    <h2><span class="small"><?php the_field('text_second_1') ?></span><?php the_field('text_second_2') ?></h2>
                    <p><?php the_field('text_second_3') ?></p>
                </div>
            </div>
            <div class="range spacing-55">
                <div class="cell-md-6 cell-sm-6 cell-lg-6">
                    <div class="progress-bar-circle" data-value="0.<?php the_field('counter_1') ?>" data-gradient="#02ad88, #02ad88" data-empty-fill="rgba(255,255,255, 0)" data-size="176" data-thickness="2"><span></span></div>
                    <p><span class="small text-medium text-darker"><?php the_field('counter_text_1') ?></span></p>
                </div>
                <div class="cell-md-6 cell-sm-6 cell-lg-6">
                    <div class="progress-bar-circle" data-value="0.<?php the_field('counter_2') ?>" data-gradient="#02ad88, #02ad88" data-empty-fill="rgba(255,255,255, 0)" data-size="176" data-thickness="2"><span></span></div>
                    <p><span class="small text-medium text-darker"><?php the_field('counter_text_2') ?></span></p>
                </div>
                <!--                <div class="cell-md-3 cell-sm-6 cell-lg-3">-->
                <!--                    <div class="progress-bar-circle" data-value="0.265" data-gradient="#02ad88, #02ad88" data-empty-fill="rgba(255,255,255, 0)" data-size="176" data-thickness="2"><span></span></div>-->
                <!--                    <p><span class="small text-medium text-darker">QUALIFIED Experts</span></p>-->
                <!--                </div>-->
                <!--                <div class="cell-md-3 cell-sm-6 cell-lg-3">-->
                <!--                    <div class="progress-bar-circle" data-value="0.168" data-gradient="#02ad88, #02ad88" data-empty-fill="rgba(255,255,255, 0)" data-size="176" data-thickness="2"><span></span></div>-->
                <!--                    <p><span class="small text-medium text-darker">partners</span></p>-->
                <!--                </div>-->
                <?php
                    $link = '';
                    if(get_locale() == 'ru_ru'){
                        $link = '/?page_id=92';
                    }elseif (get_locale() == 'en_US'){
                        $link = '/?page_id=298';
                    }elseif (get_locale() == 'uk'){
                        $link = '/?page_id=277';
                    }
                ?>
            </div><a class="btn btn-darker btn-icon btn-icon-right"   href="<?php echo $link;?>"><?php the_field('more_about_us_home') ?><span class="icon material-icons-arrow_forward"></span></a>
        </div>
    </section>


<?php get_footer(); ?>
