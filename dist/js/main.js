$(function () {
  /*
   * リロード時、ページトップに移動する
   */
  $(function () {
    $("html,body").animate({ scrollTop: 0 }, "1");
  });

  /*
   * トップページ読み込み時のアニメーション ====================================================
   */

  $(".line").animate({ width: "100%" }, 1500, function () {
    $(".line").css("right", 0);
    $(".line").animate({ width: "0%" }, 500, function () {
      $(".top").animate({ height: "0%" });
      $(".bottom").animate({ height: "0%" }, 500, function () {
        $(".index-top-text").addClass("index-top-text-bg"),
          $(".page-load").addClass("page-loaded"),
          $(".load-down").addClass("load-downed"),
          $(".load-up").addClass("load-uped");
      });
    });
  });

  /*
   * スクロールダウンボタン ==================================================================
   */

  $(function () {
    $(".index-top-btn").click(function () {
      $("html, body").animate(
        { scrollTop: $(".wrapper").offset().top },
        "slow"
      );
      return false;
    });
  });

  /*
   * Gallery ===============================================================================
   */
  $("#gallery").each(function () {
    var $container = $(this);

    // JSONを取得
    $.getJSON("../../src/data/content.json", function (data) {
      var elements = [];
      $.each(data, function (i, item) {
        var itemHTML =
          '<li class="gallery-item is-loading scroll-fadeUp">' +
          '<a href="' +
          item.images.large +
          '">' +
          '<img src="' +
          item.images.small +
          '" alt="">' +
          '<span class="caption">' +
          '<span class="inner">' +
          "<span>" + // id="cboxTitle"
          item.title +
          "</span>" +
          "</span>" +
          "</span>" +
          "</a>" +
          "</li>";
        elements.push($(itemHTML).get(0));
      });
      $container.append(elements);
      $container.imagesLoaded(function () {
        $(elements).removeClass("is-loading");
        $container.masonry("appended", elements);
      });
      $container.find("a").colorbox({
        maxWidth: "970px",
        maxHeight: "95%",
        title: function () {
          return $(this).find(".inner").html();
        },
      });
    });
  });

  /*
    footer-link ホバー時のエフェクト
    */
  $(".footer-link a").on("mouseover", function () {
    $(this).stop(true).animate(
      {
        backgroundColor: "#610B0B",
        color: "#fff",
      },
      duration
    );
  });
  $(".footer-link a").on("mouseout", function () {
    $(this).stop(true).animate(
      {
        backgroundColor: "#000",
        color: "#fff",
      },
      duration
    );
  });

  /*
   * Sticky header =====================================================================
   */

  $("header").each(function () {
    var $window = $(window),
      $header = $(this),
      $headerClone = $header.contents().clone(),
      $headerCloneContainer = $('<div class="header-clone"></div>'),
      threshold = $header.offset().top + $header.outerHeight();

    $headerCloneContainer.append($headerClone);
    $headerCloneContainer.appendTo("body");

    $window.on(
      "scroll",
      $.throttle(1000 / 15, function () {
        if ($window.scrollTop() > threshold) {
          $headerCloneContainer.addClass("visible");
        } else {
          $headerCloneContainer.removeClass("visible");
        }
      })
    );
  });

  /*
   * hoverしたときの設定
   */
  $(".header-clone a").on("mouseover", function () {
    $(this).stop(true).animate(
      {
        backgroundColor: "#610B0B",
        color: "#fff",
      },
      duration
    );
  });
  $(".page-header-clone a").on("mouseout", function () {
    $(this).stop(true).animate(
      {
        backgroundColor: "#000",
        color: "#fff",
      },
      duration
    );
  });

  /*
   * スクロール時のフェード機能 ===============================================================
   */
  $(window).scroll(function () {
    $(".scroll-fadeUp").each(function () {
      var elementOffsetTop = $(this).offset().top,
        scroll = $(window).scrollTop(),
        windowHeight = $(window).height();

      if (scroll > elementOffsetTop - windowHeight + 80) {
        $(this).addClass("scrollIn");
      }
    });
  });
  $(window).scroll(function () {
    $(".scroll-fadeDown").each(function () {
      var elementOffsetTop = $(this).offset().top,
        scroll = $(window).scrollTop(),
        windowHeight = $(window).height();

      if (scroll > elementOffsetTop - windowHeight + 80) {
        $(this).addClass("scrollIn");
      }
    });
  });
  $(window).scroll(function () {
    $(".scroll-fadeLeft").each(function () {
      var elementOffsetTop = $(this).offset().top,
        scroll = $(window).scrollTop(),
        windowHeight = $(window).height();

      if (scroll > elementOffsetTop - windowHeight + 80) {
        $(this).addClass("scrollIn");
      }
    });
  });
  $(window).scroll(function () {
    $(".scroll-fadeRight").each(function () {
      var elementOffsetTop = $(this).offset().top,
        scroll = $(window).scrollTop(),
        windowHeight = $(window).height();

      if (scroll > elementOffsetTop - windowHeight + 80) {
        $(this).addClass("scrollIn");
      }
    });
  });

  /*
   * トップページの画像をホバーした時のエフェクト変更 =========================================
   */
  $(".grid-gallery").on("mouseover", function () {
    $(this).find(".opacity").stop(true).animate({ opacity: 1 }, 300);
  });
  $(".grid-gallery").on("mouseout", function () {
    $(this).find(".opacity").stop(true).animate({ opacity: 0 }, 300);
  });

  /*
   * policy マウスホバー時のエフェクト ======================================================
   */
  $("#policy").on("mouseover", function () {
    $(this).stop(true).animate(
      {
        backgroundColor: "#0B3B0B",
      },
      duration
    );
  });
  $("#policy").on("mouseout", function () {
    $(this).stop(true).animate(
      {
        backgroundColor: "#000",
      },
      duration
    );
  });

  /*
   *  トップに戻る機能 ===================================================================
   */
  $(document).ready(function () {
    var pageTop = $(".back-to-top");
    pageTop.hide();
    $(window).scroll(function () {
      if ($(this).scrollTop() > 600) {
        pageTop.fadeIn();
      } else {
        pageTop.fadeOut();
      }
    });
  });
  $(".back-to-top").on("click", function () {
    // Smooth Scroll プラグインを実行
    $.smoothScroll({
      easing: "swing", // イージングの種類
      speed: 1000, // 所要時間
    });
  });

  /* ホバー時のエフェクト */
  $(".back-to-top").on("mouseover", function () {
    $(this).stop(true).animate(
      {
        backgroundColor: "#0B3B0B",
      },
      duration
    );
  });
  $(".back-to-top").on("mouseout", function () {
    $(this).stop(true).animate(
      {
        backgroundColor: "#000",
      },
      duration
    );
  });

  /*===============================================================================================
    * タブレット版 メニュー表示機能 ======================================================================
    =============================================================================================== */
  if (window.matchMedia("(max-width: 960px)").matches) {
    /* メニューボタン機能 */
    $(".open-btn").on("click", function () {
      $(this).toggleClass("active");
      $(".page-header-content").toggleClass("open-menu");
    });

    /* Sticky Header */
    $(".page-header").each(function () {
      var $window = $(window),
        $header = $(this),
        headerOffsetTop = $header.offset().top;

      $window.on("scroll", function () {
        if ($window.scrollTop() > headerOffsetTop) {
          $header.addClass("sticky");
        } else {
          $header.removeClass("sticky");
        }
        console.log("1");
      });
      $window.trigger("scroll");
    });
  }

  /* =============================================================================================
    * モバイル版 メニュー表示機能 ======================================================================
    =============================================================================================== */
  if (window.matchMedia("(max-width: 520px)").matches) {
  }
});
