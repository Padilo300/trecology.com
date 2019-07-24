<?php
/**
 * Template Name: Связаться с нами
 */
get_header(); ?>

<?php /**The main template file ...*/?>

<style>
    .rd-navbar{
        background-color: #212121!important;
    }
</style>

    <section class="section-150">
        <div class="rd-map-wrap">
            <div class="shell text-sm-left">
                <div class="range">
                    <div class="cell-sm-1 cell-lg-1"></div>
                    <div class="cell-sm-5 cell-lg-4 cell-xl-3 section-100">
                        <h2><?php the_field('contact_us_text_1') ?>   </h2>
                        <ul class="list offset-top-20 list-lg-middle text-left">
                            <li>
                                <div class="unit unit-horizontal unit-spacing-md">
                                    <div class="unit-left"><span class="icon icon-primary fa-map-marker"></span></div>
                                    <div class="unit-body">
                                        <h6><a class="text-darker" href="contacts.html#"><?php the_field('contact_us_address') ?></a></h6>
                                    </div>
                                </div>
                            </li>
                            <li>
                                <div class="unit unit-horizontal unit-spacing-md">
                                    <div class="unit-left"><span class="icon icon-primary fa-phone"></span></div>
                                    <div class="unit-body">
                                        <h6><a class="text-darker" href="tel:#"><?php the_field('contact_us_phone') ?></a></h6>
                                    </div>
                                </div>
                            </li>
                            <li>
                                <div class="unit unit-horizontal unit-spacing-md">
                                    <div class="unit-left"><span class="icon icon-primary fa-envelope"></span></div>
                                    <div class="unit-body">
                                        <h6><a class="text-primary" href="../cdn-cgi/l/email-protection.html#d2f1"><span class="__cf_email__" data-cfemail="472a262e2b0723222a282b2e292c69283520"><?php the_field('contact_us_mail') ?></span></a></h6>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <div class="cell-sm-6 cell-lg-preffix-1 cell-lg-5 cell-xl-preffix-2 cell-xl-6">
                        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d19269.635445657754!2d35.0292604631116!3d48.461417466436636!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40dbe2e2e3825de1%3A0xe3b587aedc3e5162!2z0L_RgNC-0YHQvy4g0JDQu9C10LrRgdCw0L3QtNGA0LAg0J_QvtC70Y8sIDEvOSwg0JTQvdC40L_RgNC-LCDQlNC90LXQv9GA0L7Qv9C10YLRgNC-0LLRgdC60LDRjyDQvtCx0LvQsNGB0YLRjCwgNDkwMDA!5e0!3m2!1sru!2sua!4v1560727325142!5m2!1sru!2sua" width="600" height="450" frameborder="0" style="border:0" allowfullscreen></iframe>
                    </div>
                </div>
            </div>
        </div>
    </section>

<?php echo do_shortcode( '[contact-form-7 id="156" title="Контактная форма 1"]' ); ?>

<?php get_footer(); ?>