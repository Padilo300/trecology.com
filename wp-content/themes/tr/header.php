<!DOCTYPE html>
<head>
    <title><?php bloginfo('name'); ?> <?php wp_title(); ?></title>
    
    <meta http-equiv="Content-Type" content="text/html; charset=<?php bloginfo('charset'); ?>">

    <link rel="stylesheet" href="<?php bloginfo('stylesheet_url'); ?>" type="text/css" media="screen">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.8.2/css/all.css">
    <link rel="alternate" type="application/rss+xml" title="<?php bloginfo('name'); ?> RSS Feed" href="<?php bloginfo('rss2_url'); ?>" />
    <link rel="alternate" type="application/atom+xml" title="<?php bloginfo('name'); ?> Atom Feed" href="<?php bloginfo('atom_url'); ?>" />
    <link rel="pingback" href="<?php bloginfo('pingback_url'); ?>" />

    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <script type="application/ld+json">
        {
            "@context": "https://schema.org",
            "@type": "Organization",
            "url": "http://www.example.com",
            "name": "Unlimited Ball Bearings Corp.",
            "contactPoint": {
                "@type": "ContactPoint",
                "telephone": "+1-401-555-1212",
                "contactType": "Customer service"
            }
        }
    </script>



    <span itemprop="address" itemscope itemtype="http://schema.org/PostalAddress">
            <meta itemprop="addressLocality" 	content="город, страна"		/>
            <meta itemprop="postalCode" 		content="индекс"			/>
            <meta itemprop="streetAddress" 		content="улица номер дома"	/>
        </span>

    <?php wp_head(); ?>
</head>

<body>


<div class="page text-center text-md-left">
<!--    <div class="page-loader">-->
<!--        <div>-->
<!--            <div class="page-loader-body">-->
<!--                <div class="cssload-loader">-->
<!--                    <div class="cssload-inner cssload-one"></div>-->
<!--                    <div class="cssload-inner cssload-two"></div>-->
<!--                    <div class="cssload-inner cssload-three"></div>-->
<!--                </div>-->
<!--            </div>-->
<!--        </div>-->
<!--    </div>-->
    <style>
        .preloaderWpap{
            position: fixed;
            width: 100%;
            height: 100vh;
            background: #fff;
            z-index: 99999;
            display: flex;
            justify-content: center;
            align-items: center;
        }
        @media screen and (max-width: 1199px){
            .rd-navbar-brand .brand-name{
                margin-bottom: 50px;
            }
        }

        @media screen and (max-width: 992px){
            .rd-navbar-brand .brand-name{
                display: none !important;
            }
        }
    </style>
    <div class="preloaderWpap" id="pa_loader">
        <img src="/loader.gif" alt="loader" style="    max-width: 200px;">
    </div>
    <header class="page-head page-head-secondary">
        <!-- RD Navbar-->
        <div class="rd-navbar-wrap">
            <nav class="rd-navbar rd-navbar-classic" data-stick-up-clone="false" data-layout="rd-navbar-fixed" data-md-layout="rd-navbar-static" data-md-device-layout="rd-navbar-fixed" data-lg-layout="rd-navbar-static" data-lg-device-layout="rd-navbar-static" data-md-stick-up-offset="10px" data-lg-stick-up-offset="40px">
                <div class="rd-navbar-inner">
                    <!-- RD Navbar Panel-->
                    <div class="rd-navbar-panel">
                        <!-- RD Navbar Toggle-->
                        <button class="rd-navbar-toggle" data-rd-navbar-toggle=".rd-navbar-nav-wrap"><span></span></button>
                        <!-- RD Navbar Brand-->
                        <div class="rd-navbar-brand">
                            <a class="brand-name" href="/" style="
                                                                    width: 100px;
                                                                    height: 50px;
                                                                    display: flex;
                                                                    justify-content: center;
                                                                    align-items: center;
                                                                    align-content: center;">
                                <img src="/logo.png" alt="TR Ecologi" style="    max-width: 260px;object-fit: cover; margin-top: -45px;"/>
                            </a>
                        </div>
                    </div>
                    <div class="rd-navbar-nav-wrap">
                        <!-- RD Navbar Nav-->
                        <?php wp_nav_menu(array('items_wrap'      => '<ul  class="rd-navbar-nav">%3$s</ul>' )); ?>
                    </div>
                </div>
            </nav>
        </div>
    </header>