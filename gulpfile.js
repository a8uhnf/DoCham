/* eslint-disable func-names */

/* REQUIRES */
const gulp = require('gulp');

// Helper libraries
const _ = require('lodash');
const del = require('del');
const gutil = require('gulp-util');
const runSequence = require('run-sequence');
const exec = require('child_process').exec;

// Linting
const eslint = require('gulp-eslint');
const sassLint = require('gulp-sass-lint');

// Browser sync
const browserSync = require('browser-sync').create();

// File I/O
const sass = require('gulp-sass');
const uglify = require('gulp-uglify');
// const replace = require('gulp-replace');
const htmlreplace = require('gulp-html-replace');
// Browserify
const buffer = require('vinyl-buffer');
const source = require('vinyl-source-stream');
const babelify = require('babelify');
const watchify = require('watchify');
const streamify = require('gulp-streamify');
const browserify = require('browserify');
const aliasify = require('aliasify');
const sourcemaps = require('gulp-sourcemaps');
const nunjucks = require('gulp-nunjucks');
const concat = require('gulp-concat');
const cleanCSS = require('gulp-clean-css');
const merge = require('merge-stream');
const glob = require('glob');
const globalShim = require('browserify-global-shim').configure({
    'jquery': '$'
});
const paths = {
    html: {
        files: 'index.html',
        srcDir: '.',
        destDir: 'dist/'
    },
    dist: {

    },
    js: {
        apps: 'js/app.js',
        files: ['js/**/*.js'],
        srcDir: 'js',
        destDir: 'dist/assets/js'
    },
    templates: {
        files: ['templates/**/*.html'],
        srcDir: 'templates',
        destDir: 'dist/assets/templates'
    },
    scss: {
        files: ['scss/**/*.scss'],
        srcDir: 'scss',
        destDir: 'dist/assets/css'
    }
};

gulp.task('templates', function() {
    return gulp.src(paths.templates.files)
        .pipe(nunjucks())
        .pipe(concat('templates.min.js'))
        .pipe(streamify(uglify()))
        .pipe(gulp.dest(paths.templates.destDir));
});
gulp.task('html:prod', function() {
    gulp.src('index.html')
        .pipe(gulp.dest('dist/index.html'));
});

// Compile Our Sass
gulp.task('sass', function() {
    return gulp.src('scss/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('dist/css'));
});


//clean dist folder
gulp.task('clean', function() {
    console.log('cleaning distribution folder');
    return del('dist');
});
gulp.task('serve', function() {
    browserSync.init({
        port: 5990,
        open: false,
        server: {
            baseDir: 'dist/index.html'
        }
    });
});

gulp.task('html:dev', function() {
    return gulp.src('./index.html')
        .pipe(htmlreplace({
            'app_js': './assets/js/app.js'
        }))
        .pipe(gulp.dest('dist'));
});

gulp.task('scss', function() {
    const scssStream = gulp.src(paths.scss.files)
        .pipe(sass({
            'outputStyle': 'compressed',
            'errLogToConsole': true
        }))
        .pipe(concat('scss-files.scss'));

    const cssextStream = gulp.src(paths.css_ext.files)
        .pipe(concat('css-ext-files.css'));

    return merge(scssStream, cssextStream)
        .pipe(concat('style.min.css'))
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(gulp.dest(paths.scss.destDir));
});

/* Helper which bundles the JS files and copies the bundle into the distribution file (dev) */
function bundle(b, name) {
    return b
        .bundle()
        .pipe(source(name))
        .pipe(buffer())
        .pipe(sourcemaps.init({ loadMaps: true }))
        .on('error', function(error) {
            gutil.log(gutil.colors.red('Error bundling distribution files:'), error.message);
        })
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest(paths.js.destDir));
}

/* Browserifies the JS files and copies the bundle into the distribution file (dev) */
gulp.task('js:dev', function() {
    glob(paths.js.apps, null, function(err, files) {
        _.each(files, function(file) {
            const name = file.substring(file.lastIndexOf('/') + 1);
            const b = browserify({
                plugin: [watchify],
                cache: {},
                debug: true,
                fullPaths: true,
                packageCache: {}
            })
                .transform(aliasify, {
                    aliases: {
                        'underscore': 'lodash'
                    },
                    verbose: true,
                    global: true
                })
                .transform(babelify, {
                    presets: ['es2015']
                })
                .transform(globalShim)
                .add(file);

            // Re-bundle the distribution file every time a source JS file changes
            b.on('update', function() {
                gutil.log('Re-bundling distribution files');
                bundle(b, name);
            });

            // Log a message and reload the browser once the bundling is complete
            b.on('log', function(message) {
                gutil.log('Distribution files re-bundled:', message);
                runSequence('lint:js', 'reload');
            });
            return bundle(b, name);
        });
    });
});

/* TASKS */
/* Lints the CSS files */
gulp.task('lint:css', function() {
    gulp.src(paths.scss.files)
        .pipe(sassLint())
        .pipe(sassLint.format())
        .pipe(sassLint.failOnError());
});

/* Lints the JS files */
gulp.task('lint:js', function() {
    return gulp.src(paths.js.files)
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failAfterError());
});

/* Compiles SCSS files into CSS files and copies them to the distribution directory */
gulp.task('scss', function() {
    const scssStream = gulp.src(paths.scss.files)
        .pipe(sass({
            'outputStyle': 'compressed',
            'errLogToConsole': true
        }))
        .pipe(concat('scss-files.scss'));

    const cssextStream = gulp.src(paths.css_ext.files)
        .pipe(concat('css-ext-files.css'));

    return merge(scssStream, cssextStream)
        .pipe(concat('style.min.css'))
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(gulp.dest(paths.scss.destDir));
});

/* Development css task */
gulp.task('css:dev', function() {
    runSequence('lint:css', 'scss');
});

// Watch Files For Changes
gulp.task('watch', function() {
    const fileTypesToWatch = {
        // scss: 'css:dev',
        html: 'html:dev',
        // fonts: 'fonts',
        // images: 'images',
        templates: 'templates'
    };
    _.forEach(fileTypesToWatch, function(taskToRun, fileType) {
        gulp.watch(paths[fileType].files, function() {
            runSequence(taskToRun, 'reload');
        });
    });
});

/* Reloads the browser */
gulp.task('reload', function() {
    browserSync.reload();
});
gulp.task('build:dev', ['html:dev', 'templates', 'js:dev', 'sass', 'watch']);
// Default Task
gulp.task('default', function(done) {
    runSequence('clean', 'build:dev', 'serve', function(error) {
        done(error && error.err);
    });
});