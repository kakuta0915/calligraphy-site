$(function () {
    $("html,body").animate({ scrollTop: 0 }, "1");

  /* トップページ読み込み時のアニメーション =============================== */
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

  /* スクロールダウンボタン ======================================= */
  $(function () {
    $(".index-top-btn").click(function () {
      $("html, body").animate(
        { scrollTop: $(".wrapper").offset().top },
        "slow"
      );
      return false;
    });
  });

  /* ギャラリーに画像表示する機能 ==================================== */
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
        maxWidth: "90%",
        maxHeight: "95%",
        title: function () {
          return $(this).find(".inner").html();
        },
      });
    });
  });

  /* HEADER CLONE ===================================== */
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

  /* スクロール時のフェード機能 ===================================== */
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

  /* ページトップに戻る機能 ======================================= */
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
      easing: "swing",
      speed: 1000,
    });
  });
});
