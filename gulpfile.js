// Инициализируем плагины
var gulp        = require('gulp'),                  // Собственно Gulp JS
    watch       = require('gulp-watch'),
    newer       = require('gulp-newer'),            // Passing through only those source files that are newer than corresponding destination files
    concat      = require('gulp-concat'),           // Склейка файлов
    notify      = require('gulp-notify');           // Нотификатор
    plumber     = require('gulp-plumber'),          // Перехватчик ошибок
    wrapper     = require('gulp-wrapper'),          // Добавляет к файлу текстовую шапку и/или подвал
    rename      = require('gulp-rename'),
    Pageres     = require('pageres'),

    inlineCss   = require('gulp-inline-css'),
    htmlhint    = require('gulp-htmlhint'),
    gutil       = require('gulp-util'),
    gulpif      = require('gulp-if'),

    nano        = require('gulp-cssnano'),
    sass        = require('gulp-sass'),             // Препроцессор для компиляции в css
    uncss       = require('gulp-uncss'),            // Плагин оставляет только используемые стили
    pixrem      = require('gulp-pixrem'),           // Переводит пиксели в ремы
    prefixer    = require('gulp-autoprefixer'),     // Присваивает префиксы
    csscomb     = require('gulp-csscomb'),

    uglify      = require('gulp-uglify'),           // Минификация JS
    
    webserver   = require('gulp-webserver'),

    imagemin    = require('gulp-imagemin'),         // Минификация изображений
    svgmin      = require('gulp-svgmin'),
    prettify    = require('gulp-prettify'),
    fileinclude = require('gulp-file-include'),
    del         = require('del');                   // Удаление файлов и папок

/**
 * Обработчик ошибок.
 * @param err
 */
var errorHandler = function(err) {
    try {
        // console.error('Error in plugin "' + err.plugin + '"');
        // console.error('   "' + err.message + '"');
        // console.error('   In file "' + err.fileName + '", line "' + err.lineNumber + '".');
        // console.log('--------------------------------------');
        // console.log(err);

        gutil.log(gutil.colors.cyan('FileName:'), gutil.colors.blue(err.fileName));
        gutil.log(gutil.colors.cyan.bold('Error:'), gutil.colors.red(err.message));
        gutil.log(gutil.colors.cyan('lineNumber:'), gutil.colors.magenta(err.lineNumber));
        gutil.log(gutil.colors.cyan('Plugin:'), gutil.colors.green(err.plugin));
    }
    catch(e) {}
}

var is_build = false,
    is_email = false,
    is_watch = false;

// Очищаем папку с компилированным проектом
function clean(path, build)
{
    if (build === true) {
        del([path + '*']);
    }
}

// Пути к файлам
var app = './dist/',
    src = './assets/',
    path = {
        build: {
            html:       app,
            scripts:    app + 'js',
            styles:     app + 'css',
            images:     app + 'images',
            fonts:      app + 'fonts',
            json:       app + 'json'
        },
        assets: {
            html:           [src + 'template/*.html'],
            scripts:        [src + 'scripts/_jquery.js', src + 'scripts/**/*.js'],
            styles:         [src + 'styles/*.scss'],
            images:         {   
                                gif: [src + 'images/**/*.gif'],
                                svg: [src + 'images/**/*.svg'],
                                any: [src + 'images/**/*.jpg', src + 'images/**/*.jpeg', src + 'images/**/*.png']
                            },
            fonts:          [src + 'fonts/**/*.*'],
            json:           [src + 'json/**/*.json']
        },
        watch: {
            html:           [src + 'template/*.html', src + 'template/**/*.html'],
            scripts:        [src + 'scripts/**/*.js'],
            styles:         [src + 'styles/**/*.scss'],
            images:         [src + 'images/**/*.*'],
            fonts:          [src + 'fonts/**/*.*'],
            json:           [src + 'json/**/*.json']
        },
        extras: ['favicon.ico', 'humans.txt', 'robots.txt'],
        modernizr: [src + 'modernizr.js']
    };

gulp.task('webserver', function() {
    gulp.src(app)
        .pipe(webserver({
            livereload: {
                enable: false,
                filter: function(filename) {
                    return true;
                }
            },
            port: 8000,
            fallback: 'index.html'
        }));
});

// Копируем html
gulp.task('html', function() {
    
    gulp.src(path.assets.html)
        .pipe(plumber({errorHandler: errorHandler}))
        
        .pipe(fileinclude({
            prefix: '@@',
            basepath: '@file'
        }))

        .pipe(gulpif(
            is_email,
            inlineCss({
                applyStyleTags: true,
                applyLinkTags: true,
                removeStyleTags: true,
                removeLinkTags: true
           })
        ))

        .pipe(gulpif(
            is_build,
            prettify({
                indent_size: 4,
                indent_char: ' ',
                brace_style: 'expand',
                indent_handlebars: false,
                indent_inner_html: false,
                preserve_newlines: false,
                max_preserve_newlines: 1,
                unformatted: ['pre', 'code']
            })
        ))

        .pipe(gulpif(
            is_watch,
            htmlhint({
                "attr-value-double-quotes": false,
                "tagname-lowercase": false,
                "attr-lowercase": false,
                "doctype-first": false,
                "id-unique": true,
                "tag-pair": false,
                "attr-no-duplication": true,
                "spec-char-escape": true,
                "src-not-empty": false
            })
        ))

        .pipe(gulpif(
            is_watch,
            htmlhint.reporter()
        ))

        .pipe(gulp.dest(path.build.html))

        .pipe(notify({ message: 'Update HTML' }));
});

// Собираем Sass
gulp.task('styles', function() {
    clean(path.build.styles, is_build);

    gulp.src(path.assets.styles)
        .pipe(plumber({errorHandler: errorHandler}))
        
        .pipe(sass())
        .pipe(concat('main.css'))

        // .pipe(gulpif(
        //     is_build,
        //     uncss({
        //         html: [path.build.html + '*.html', path.build.html + '**/*.html']
        //     })
        // ))

        .pipe(prefixer({
            browsers: ['last 15 versions'],
            cascade: false
        }))

        .pipe(pixrem())
        
        .pipe(gulpif(
            is_build,
            csscomb({
                "tab-size": 4,
                "color-shorthand": true,
                "space-after-colon": 1,
                "space-after-combinator": 1,
                "space-before-opening-brace": 1,
                "sort-order": [
                    [
                        "content", "position", "left", "right", "top", "bottom", "z-index"
                    ],
                    [
                        "width", "height", "margin", "padding"
                    ],
                    [
                        "background", "background-color", "background-image", "background-repeat", "background-position", "background-attachment", "background-size", "border"
                    ]
                ]
            })
        ))

        .pipe(gulp.dest(path.build.styles))

        .pipe(gulpif(
            is_build,
            nano({
                zindex: false,
                autoprefixer: false,
                normalizeCharset: true,
                convertValues: { length: false },
                colormin: true
            })
        ))

        .pipe(rename({suffix: '.min'}))
        
        .pipe(gulp.dest(path.build.styles))

        .pipe(notify({ message: 'Update css complete', onLast: true }));
});

// Собираем JS
gulp.task('scripts', function() {
    clean(path.build.scripts, is_build);

    gulp.src(path.assets.scripts)
        .pipe(plumber({errorHandler: errorHandler}))
        
        .pipe(wrapper({
            header: '\n// ${filename}\n\n',
            footer: '\n'
        }))
        
        .pipe(concat('main.js'))
        .pipe(gulp.dest(path.build.scripts))

        .pipe(rename({suffix: '.min'}))

        .pipe(gulpif(
            is_build,
            uglify()
        ))
        
        .pipe(gulp.dest(path.build.scripts))
        
        .pipe(notify({ message: 'Update scripts complete', onLast: true }));
});

// Копируем и минимизируем изображения

gulp.task('images_any', function() {
    gulp.src(path.assets.images.any)
        .pipe(newer(path.build.images))
        .pipe(gulpif(
            is_build,
            imagemin({
                optimizationLevel: 3,
                progressive: true,
                interlaced: true
            })
        ))
        .pipe(gulp.dest(path.build.images));
});

gulp.task('images_gif', function() {
    gulp.src(path.assets.images.gif)
        .pipe(newer(path.build.images))
        .pipe(gulp.dest(path.build.images));
});

gulp.task('images_svg', function () {
    gulp.src(path.assets.images.svg)
        .pipe(newer(path.build.images))
        .pipe(gulpif(
            is_build,
            svgmin({
                plugins: [
                    {
                        removeTitle: true
                    },
                    {
                        removeDesc: true
                    },
                    {
                        removeUselessDefs: true
                    },
                    {
                        removeViewBox: true
                    },
                    {
                        removeMetadata: true
                    },
                    {
                        removeDoctype: true
                    },
                    {
                        removeXMLProcInst: true
                    },
                    {
                        removeComments: true
                    },
                    {
                        removeDimensions: false
                    },
                    {
                        convertColors: {
                            names2hex: true,
                            rgb2hex: true
                        }
                    }
                ]
            })
        ))
        .pipe(gulp.dest(path.build.images));
});

gulp.task('images', function() {
    clean(path.build.images, is_build);

    gulp.start('images_any');
    gulp.start('images_svg');
    gulp.start('images_gif');
});

// Копируем json
gulp.task('json', function() {
    clean(path.build.json, is_build);

    gulp.src(path.assets.json)
        .pipe(plumber({errorHandler: errorHandler}))

        .pipe(gulp.dest(path.build.json))

        .pipe(notify({ message: 'Json task complete', onLast: true }));
});

// Копируем шрифты
gulp.task('fonts', function () {
    clean(path.build.fonts, is_build);
    
    gulp.src(path.assets.fonts)
        .pipe(plumber({errorHandler: errorHandler}))
        .pipe(newer(path.build.fonts))
        .pipe(gulp.dest(path.build.fonts))
        .pipe(notify({ message: 'Fonts task complete', onLast: true }));
});

// Делаем скриншот
gulp.task('shot', function () {
    var pageres = new Pageres({delay: 2})
        .src('yeoman.io', ['480x320', '1024x768', 'iphone 5s'], { crop: true })
        .src('todomvc.com', ['1280x1024', '1920x1080'])
        .dest(app);

    pageres.run(function (err) {
        console.log('done');
    });
});

gulp.task('modernizr', function() {
    gulp.src(path.modernizr)
        .pipe(plumber({errorHandler: errorHandler}))
        .pipe(gulp.dest(path.build.scripts));
});

gulp.task('extras', function() {

    gulp.src(path.extras, {cwd: src})
        .pipe(plumber({errorHandler: errorHandler}))
        .pipe(gulp.dest(app));

});

// Запуск слежки за изминениями в проекте (gulp watch)
gulp.task('watch', function () {
    is_watch = true;

    var x;
    for (x in path.watch)
    {
        (function(key){
            watch(path.watch[key], function() {
                gulp.start(key);
            });
        })(x);
    }
});

// Сборка проекта
gulp.task('build', function() {
    is_build = true;
    
    gulp.start('html');
    gulp.start('styles');
    gulp.start('scripts');
    gulp.start('images');
    gulp.start('fonts');
    gulp.start('json');
    gulp.start('extras');
});

// Запускаем слежку по умолчанию
gulp.task('default', ['watch']); //'webserver', 