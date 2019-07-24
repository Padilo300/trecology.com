
<script type='text/javascript' src='http://tr.padilo.pro/wp-content/themes/tr/js/core.min.js'></script>
<script>
    $(document).ready(function () {
        $('#pa_loader').hide();
        var str = "<li class='menu-item-type-post_type' data-toggle='modal' data-target='#exampleModal'><a class='customItem'>Утилизация</a> </li>";
        var a   = $('ul .menu-item-type-post_type').last().after(str);
    });
</script>
<?php wp_footer(); ?>
<div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">Сдать резиновое изделие на утилизацию</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <style>
                .fillPererabotka{
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;
                }
                #pererabotka_name{
                    color: #666;
                    border: 1px solid #ccc;
                    border-radius: 3px;
                    padding: 3px;
                }
                #peperabotka_submit{
                    display: block;
                    width: 100px;
                    font-size: 15px;
                    margin: 0 auto;
                }
                #exampleModal {
                    margin-top: 100px;
                }
                #exampleModal .modal-body{
                    display: flex;
                    justify-content: space-around;
                    flex-direction: column;
                    max-width: 400px;
                    margin: 0 auto;
                    height: 350px;
                }
            </style>
            <div class="modal-body">
                <?php echo do_shortcode('[contact-form-7 id="358" title="Без названия"] ');?>
            </div>

        </div>
    </div>
</div>
<style>
    .textDes{
        letter-spacing: 25px;
        font-weight: 900;
        padding-left: 36px;
        font-size: 50px !important;
        margin-top: 13px !important;
    }
    .customItem{
        color: #0f0 !important;
        font-weight: 900 !important;
        font-size: 15px !important;
        cursor: pointer;
    }
    .chrome .latters-bg-vide{
        left: -45px;
    }
    body > div > div.page.text-center.text-md-left > div.swiper-container.swiper-absolute > div.shell.text-center > div > div > a{
        background: #338955;
        border-color: #338955;
    }
</style>

<script>
    $(document).ready(function () {

    });
</script>
<style>
    .modal-backdrop.in{
        display: none!important;
    }

</style>

<footer class="page-footer page-footer-secondary">
    <section class="section-75 section-sm-80 section-md-100 section-xl-150">
        <div class="shell">

            <div class="range text-sm-left spacing-55">
                <div class="cell-lg-1"></div>
                <div class="cell-sm-6 cell-lg-4"><a href="index.html"><img class="img-responsive" src="images/brand-white-132x51.png" alt="" width="132" height="51"/></a>
                    <p class="offset-top-20 offset-md-top-35"><?php

                        if($_GET['lang']==='en') {
                            the_field('text_info_short_en', 'option');
                        }
                        elseif($_GET['lang']==='uk') {
                            the_field('text_info_short_ua', 'option');
                        }else{
                            the_field('text_info_short_ru', 'option');
                        }
                        ?></p>
                </div>
                <div class="cell-lg-1"></div>
                <div class="cell-sm-6 cell-lg-4">
                    <div class="inset-lg-right-30"><span class="small text-spacing-340 text-white text-uppercase text-bold">
                            <?php


                              if($_GET['lang']==='en') {
                                  the_field('contact_info_en', 'option');
                              }
                              elseif($_GET['lang']==='uk') {
                                  the_field('contact_info_ua', 'option');
                              }else{
                                  the_field('contact_info_ru', 'option');
                              }


                            ?>

                        </span>
                        <ul class="list offset-top-20 text-left">
                            <li>
                                <div class="unit unit-horizontal unit-spacing-xs">
                                    <div class="unit-left"><span class="icon icon-primary fa-map-marker"></span></div>
                                    <div class="unit-body"><a class="text-white" href="index.html#"><?php

                                            if($_GET['lang']==='en') {
                                                the_field('contact_address_info_en', 'option');
                                            }
                                            elseif($_GET['lang']==='uk') {
                                                the_field('contact_address_info_ua', 'option');
                                            }else{
                                                the_field('contact_address_info', 'option');
                                            }
                        ?>



                                        </a></div>
                                </div>
                            </li>
                            <li>
                                <div class="unit unit-horizontal unit-spacing-xs">
                                    <div class="unit-left"><span class="icon icon-primary fa-phone"></span></div>
                                    <div class="unit-body"><a class="text-white" href="tel:#"><?php the_field('contact_phone_info', 'option') ?></a></div>
                                </div>
                            </li>
                            <li>
                                <div class="unit unit-horizontal unit-spacing-xs">
                                    <div class="unit-left"><span class="icon icon-primary fa-envelope"></span></div>
                                    <div class="unit-body"><a class="text-white" href="mailto:<?php the_field('contact_email_info', 'option') ?>"><span class="__cf_email__" data-cfemail="670a060e0b2703020a080b0e090c49081500"><?php the_field('contact_email_info', 'option') ?></span></a></div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </section>
</footer>
</div>

</body>
</html>