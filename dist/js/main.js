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
        $(".top-text").addClass("top-text-animation"),
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
    $(".scroll-down-btn").click(function () {
      $("html, body").animate(
        { scrollTop: $(".slideshow").offset().top },
        "slow"
      );
      return false;
    });
  });

  /*
   * Slideshow ============================================================================
   */

  $(".slideshow").each(function () {
    // 変数宣言
    var $container = $(this),
      $slideGroup = $container.find(".slideshow-slides"),
      $slides = $slideGroup.find(".slide"),
      $nav = $container.find(".slideshow-nav"),
      $indicator = $container.find(".slideshow-indicator"),
      slideCount = $slides.length,
      indicatorHTML = "",
      currentIndex = 0,
      duration = 500,
      easing = "easeInOutExpo",
      interval = 5000,
      timer;

    // HTML要素の配置、生成、挿入
    $slides.each(function (i) {
      $(this).css({ left: 100 * i + "%" });
      indicatorHTML += '<a href="#">' + (i + 1) + "</a>";
    });
    $indicator.html(indicatorHTML);

    // スライドを表示する関数
    function goToSlide(index) {
      $slideGroup.animate({ left: -100 * index + "%" }, duration, easing);
      currentIndex = index;
      updateNav();
    }

    // スライドの状態に応じてナビとインジケーターを更新する関数
    function updateNav() {
      var $navPrev = $nav.find(".prev"),
        $navNext = $nav.find(".next");
      if (currentIndex === 0) {
        $navPrev.addClass("disabled");
      } else {
        $navPrev.removeClass("disabled");
      }
      if (currentIndex === slideCount - 1) {
        $navNext.addClass("disabled");
      } else {
        $navNext.removeClass("disabled");
      }
      $indicator
        .find("a")
        .removeClass("active")
        .eq(currentIndex)
        .addClass("active");
    }

    // タイマー開始の関数
    function startTimer() {
      timer = setInterval(function () {
        var nextIndex = (currentIndex + 1) % slideCount;
        goToSlide(nextIndex);
      }, interval);
    }

    // タイマー停止の関数
    function stopTimer() {
      clearInterval(timer);
    }

    // イベント登録
    $nav.on("click", "a", function (event) {
      event.preventDefault();
      if ($(this).hasClass("prev")) {
        goToSlide(currentIndex - 1);
      } else {
        goToSlide(currentIndex + 1);
      }
    });

    // インジケーターがクリックされたらスライドを表示
    $indicator.on("click", "a", function (event) {
      event.preventDefault();
      if (!$(this).hasClass("active")) {
        goToSlide($(this).index());
      }
    });

    // マウスが乗ったらタイマーを停止、外れたら開始
    $container.on({
      mouseenter: stopTimer,
      mouseleave: startTimer,
    });

    // 最初のスライドを表示
    goToSlide(currentIndex);

    // タイマースタート
    startTimer();
  });

  /*
   * Gallery ===============================================================================
   */
  $("#gallery").each(function () {
    var $container = $(this);

    /*
        Masonry
        */
    $container.masonry({
      columnWidth: 230,
      itemSelector: ".gallery-item",
      gutter: 120,
    });

    // JSONを取得
    $.getJSON("../../src/data/content.json", function (data) {
      var elements = [];
      $.each(data, function (i, item) {
        var itemHTML =
          '<li class="gallery-item is-loading scroll-fadeup">' +
          '<a href="' +
          item.images.large +
          '">' +
          '<img src="' +
          item.images.small +
          '" alt="">' +
          '<span class="caption">' +
          '<span class="inner">' +
          '<b class="gallery-title">' +
          item.title +
          "</b>" +
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
   * nav ==============================================================================
   */
  var duration = 300;
  $("#nav a").on("mouseover", function () {
    $(this).stop(true).animate(
      {
        backgroundColor: "#610B0B",
        color: "#fff",
      },
      duration
    );
    $(this).children().stop(true).animate(
      {
        backgroundColor: "#610B0B",
        color: "#BDBDBD",
      },
      duration
    );
  });
  $("#nav a").on("mouseout", function () {
    $(this).stop(true).animate(
      {
        backgroundColor: "#000",
        color: "#fff",
      },
      duration
    );
    $(this).children().stop(true).animate(
      {
        backgroundColor: "#000",
        color: "#696969",
      },
      duration
    );
  });

  /*
    header-link ホバー時のエフェクト
    */
  $(".header-link a").on("mouseover", function () {
    $(this).stop(true).animate(
      {
        backgroundColor: "#610B0B",
        color: "#fff",
      },
      duration
    );
  });
  $(".header-link a").on("mouseout", function () {
    $(this).stop(true).animate(
      {
        backgroundColor: "#000",
        color: "#fff",
      },
      duration
    );
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

  $(".page-header").each(function () {
    var $window = $(window),
      $header = $(this),
      $headerClone = $header.contents().clone(),
      $headerCloneContainer = $('<div class="page-header-clone"></div>'),
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
  $(".page-header-clone a").on("mouseover", function () {
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
    $(".scroll-fadeup").each(function () {
      var elementOffsetTop = $(this).offset().top,
        scroll = $(window).scrollTop(),
        windowHeight = $(window).height();

      if (scroll > elementOffsetTop - windowHeight + 80) {
        $(this).addClass("scrollin");
      }
    });
  });
  $(window).scroll(function () {
    $(".scroll-fadedown").each(function () {
      var elementOffsetTop = $(this).offset().top,
        scroll = $(window).scrollTop(),
        windowHeight = $(window).height();

      if (scroll > elementOffsetTop - windowHeight + 80) {
        $(this).addClass("scrollin");
      }
    });
  });
  $(window).scroll(function () {
    $(".scroll-fadeleft").each(function () {
      var elementOffsetTop = $(this).offset().top,
        scroll = $(window).scrollTop(),
        windowHeight = $(window).height();

      if (scroll > elementOffsetTop - windowHeight + 80) {
        $(this).addClass("scrollin");
      }
    });
  });
  $(window).scroll(function () {
    $(".scroll-faderight").each(function () {
      var elementOffsetTop = $(this).offset().top,
        scroll = $(window).scrollTop(),
        windowHeight = $(window).height();

      if (scroll > elementOffsetTop - windowHeight + 80) {
        $(this).addClass("scrollin");
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
