const gulp = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");
const assets = require("postcss-assets");
const flexBugsFixes = require("postcss-flexbugs-fixes");
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
  server: {
    baseDir: "./",
    index: "index.html",
    directory: true,
  },
};

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

gulp.task("sass", () => {
  return gulp
    .src("./src/sass/**/*.scss")
    .pipe(
      plumber({
        errorHandler: notify.onError("Error: <%= error.message %>"),
      })
    )
    .pipe(sourcemaps.init())
    .pipe(sass({ outputStyle: "expanded" }))
    .pipe(postcss(postcssOption))
    .pipe(postcss([assets({ loadPaths: ["./dist/images/"], relative: true })]))
    .pipe(postcss([mqpacker()]))
    .pipe(sourcemaps.write("./"))
    .pipe(gulp.dest("./dist/css"))
    .pipe(browserSync.stream());
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
  gulp.watch("./dist/**/*", gulp.task("browser-reload"));
  gulp.watch("./src/ejs/_partial/*.ejs", gulp.task("ejs"));
  gulp.watch("./src/ejs/*.ejs", gulp.task("ejs"));
  gulp.watch("./src/sass/*.scss", gulp.task("sass"));
  done();
});

// ビルドタスク
gulp.task("build", gulp.parallel("ejs", "sass"));

// デフォルトタスク実行
gulp.task(
  "default",
  gulp.series("build", gulp.parallel("watch-files", "browser-sync"))
);

// デプロイ
gulp.task(
  "dist",
  gulp.series("build", "ftp", (done) => {
    fancyLog("公開が実行されました");
    done();
  })
);
