const gulp = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");
const assets = require("postcss-assets");
const flexBugsFixes = require("postcss-flexbugs-fixes");
const imagemin = require("gulp-imagemin");
const imageminPngquant = require("imagemin-pngquant");
const browserSync = require("browser-sync").create();
const ftp = require("vinyl-ftp");
const fancyLog = require("fancy-log");
const ejs = require("gulp-ejs");
const rename = require("gulp-rename");
const fs = require("fs");
const sourcemaps = require("gulp-sourcemaps");
const plumber = require("gulp-plumber");
const notify = require("gulp-notify");
const cssdeclsort = require("css-declaration-sorter");
const mqpacker = require("css-mqpacker");

// JSONファイルの読み込みと変換
const configJsonData = fs.readFileSync("./src/data/config.json");
const configObj = JSON.parse(configJsonData);

// ejsのデータ読み込み設定
const ejsDataOption = {
  config: configObj,
};

// ejsのコンパイル設定用のオブジェクト
const ejsSettingOption = {
  ext: ".html",
};

// ブラウザオプション
const browserSyncOption = {
  server: "./dist",
  //  {
  //   baseDir: "./",
  //   index: "index.html",
  //   directory: true,
  // },
};

gulp.task("serve", (done) => {
  browserSync.init(browserSyncOption);
  done();
});

const imageminOption = [
  imageminPngquant({
    quality: [0.65, 0.8],
    speed: 1,
  }),
  imagemin.gifsicle(),
  imagemin.mozjpeg({
    quality: 70,
    progressive: true,
  }),
  imagemin.optipng(),
  imagemin.svgo(),
];

const autoprefixerOption = {
  grid: true,
};

// PostCSSオプション
const postcssOption = [
  flexBugsFixes,
  autoprefixer(
    ["last 3 versions", "ie >= 8", "Android >= 4", "iOS >= 8"],
    autoprefixerOption
  ),
  cssdeclsort({ order: "smacss" }),
  // [mqpacker()]
];

// Sassをコンパイルする設定
gulp.task("sass", () => {
  return gulp
    .src("./src/sass/common.scss")
    .pipe(
      plumber({ errorHandler: notify.onError("Error: <%= error.message %>") })
    )
    .pipe(sourcemaps.init())
    .pipe(sass({ outputStyle: "expanded" }))
    .pipe(postcss(postcssOption))
    .pipe(postcss([assets({ loadPaths: ["./dist/images/"], relative: true })]))
    .pipe(postcss([mqpacker()]))
    .pipe(sourcemaps.write("./"))
    .pipe(gulp.dest("./dist/css"));
});

// 画像圧縮する設定
gulp.task("imagemin", () => {
  return gulp
    .src("./src/images/*")
    .pipe(imagemin(imageminOption))
    .pipe(gulp.dest("./dist/images"));
});

// ローカルサーバー起動、自動更新用タスク
gulp.task("browser-sync", (done) => {
  browserSync.init(browserSyncOption);
  done();
});
gulp.task("browser-reload", (done) => {
  browserSync.reload();
  done();
});

// FTPアップロードの自動化
gulp.task("ftp", () => {
  const ftpConfig = {
    host: "gulp.gulp.jp",
    user: "gulp",
    password: "gulp",
    log: fancyLog,
  };
  const connect = ftp.create(ftpConfig);
  const ftpUploadFiles = "./dist/**/*";
  const ftpUploadConfig = {
    buffer: false,
  };
  const remoteDisDir = "public_html";

  return gulp
    .src(ftpUploadFiles, ftpUploadConfig)
    .pipe(connect.newer(remoteDisDir))
    .pipe(connect.dest(remoteDisDir));
});

// ejsをコンパイルするタスク src/*.ejsを*.htmlに変換するタスク
gulp.task("ejs", () => {
  return gulp
    .src("./src/ejs/*.ejs")
    .pipe(ejs(ejsDataOption, {}, ejsSettingOption))
    .pipe(rename({ extname: ".html" }))
    .pipe(gulp.dest("./dist/html"));
});

// 監視ファイル
gulp.task("watch-files", (done) => {
  gulp.watch("./dist/html/*.html", gulp.task("browser-reload"));
  gulp.watch("./dist/css/*.css", gulp.task("browser-reload"));
  gulp.watch("./dist/js/*.js", gulp.task("browser-reload"));
  gulp.watch("./src/ejs/_partial/*.ejs", gulp.task("ejs"));
  gulp.watch("./src/ejs/*.ejs", gulp.task("ejs"));
  gulp.watch("./src/sass/*.scss", gulp.task("sass"));
  gulp.watch("./src/images/*", gulp.task("imagemin"));
  done();
});

// タスク実行
gulp.task(
  "default",
  gulp.series(
    gulp.parallel("watch-files", "browser-sync", "ejs", "sass", "imagemin"),
    (done) => {
      done();
    }
  )
);
