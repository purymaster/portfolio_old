const gulp = require('gulp'),
	run = require('run-sequence'),
	clean = require('gulp-clean'),
	cache = require('gulp-cached'),
	sync = require('browser-sync').create(),
	include = require('gulp-file-include'),
	sass = require('gulp-sass'),
	prefix = require('gulp-autoprefixer'),
	pretty = require('gulp-pretty-html'),
	beautify = require('gulp-beautify'),
	sourcemap = require('gulp-sourcemaps'),
	imagemin = require('gulp-imagemin'),
	config = require('./config.js'),
	removeline = require('gulp-remove-empty-lines'),
	combConfig = require('./csscomb.json');
sass.compiler = require('node-sass');

// Clean
gulp.task('clean', () => {
	return gulp
		.src(config.dev)
		.pipe(clean());
});

// HTML
gulp.task('html', () => {
	return gulp
		.src(config.srcPath.html)
		.pipe(cache('html'))
		.pipe(include({
			prefix: '@@',
			basepath: config.srcPath.include
		}))
		.pipe(pretty({
			indent_with_tabs: true,
			unformatted: []
		}))
		// .pipe(removeline())
		.pipe(gulp.dest(config.devPath.html))
		.pipe(
			sync.reload({
				stream: true
			})
		);
});

// SASS
gulp.task('scss', () => {
	return gulp
		.src(config.srcPath.scss)
		.pipe(sourcemap.init())
		.pipe(sass({
			outputStyle: 'expanded',
			indentWidth: 1,
			indentType: 'tab',
		}).on('error', sass.logError))
		.pipe(prefix({
			overrideBrowserslist: ['last 2 versions'],
			cascade: false
		}))
		.pipe(sourcemap.write('./'))
		.pipe(gulp.dest(config.devPath.css))
		.pipe(
			sync.reload({
				stream: true
			})
		);
});

// Fonts
gulp.task('font', () => {
	return gulp
		.src(config.srcPath.font)
		.pipe(cache('font'))
		.pipe(gulp.dest(config.devPath.font))
		.pipe(
			sync.reload({
				stream: true
			})
		);
});

// JS
gulp.task('js', () => {
	return gulp
		.src(config.srcPath.js)
		.pipe(cache('js'))
		.pipe(beautify())
		.pipe(gulp.dest(config.devPath.js))
		.pipe(
			sync.reload({
				stream: true
			})
		);
});

// Image
gulp.task('img', () => {
	return gulp
		.src(config.srcPath.img)
		.pipe(cache('img'))
		.pipe(imagemin({
			progressive: true,
			interlaced: true,
			optimizationLevel: 7,
			svgoPlugins: [{ removeViewBox: false }],
			verbose: true,
			use: []
		}))
		.pipe(gulp.dest(config.devPath.img))
		.pipe(
			sync.reload({
				stream: true
			})
		);
});

// Sync
gulp.task('sync', ['html'], () => {
	sync.init({
		port: 8080,
		server: {
			baseDir: './dev',
			index: 'index.html'
		},
		browser: ['google chrome', 'chrome']
		// browser: ['google chrome', 'firefox', 'iexplore', 'opera', 'safari']
	});
});

// Watch
gulp.task('watch', () => {
	gulp.watch([config.srcPath.html, config.srcPath.include], ['html']);
	gulp.watch(config.srcPath.scss, ['scss']);
	gulp.watch(config.srcPath.font, ['font']);
	gulp.watch(config.srcPath.js, ['js']);
	gulp.watch(config.srcPath.img, ['img']);
});

// Default
gulp.task('default', () => {
	run('clean', [
		'html',
		'scss',
		'js',
		'font',
		'img',
		'sync',
		'watch'
	]);
});