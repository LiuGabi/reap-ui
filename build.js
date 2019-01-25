const gulp = require('gulp');
const del = require('del');
const uglify = require('gulp-uglify');

const less = require('gulp-less');
const cssmin = require('gulp-clean-css');
const rename = require('gulp-rename');

let path = {
	clean: {
		dest: 'example/dist/'
	},
	style: {
		src: ['src/**/*.less', '!src/style/_*.less'],
		dest: 'example/dist/'
	},
	js: {
		src: 'src/**/*.js',
		dest: 'example/dist/'
	},
	json: {
		src: 'src/**/*.json',
		dest: 'example/dist/'
	},
	wxml: {
		src: 'src/**/*.wxml',
		dest: 'example/dist/'
	}
};

const clean = () => {
	return del(path.clean.dest);
};

const style = () => {
	return gulp.src(path.style.src).pipe(less()).pipe(cssmin()).pipe(rename(path => {
		path.extname = '.wxss';
	})).pipe(gulp.dest(path.style.dest));
};

const js = () => {
	return gulp.src(path.js.src).pipe(uglify()).pipe(gulp.dest(path.js.dest));
};

const json = () => {
	return gulp.src(path.json.src).pipe(gulp.dest(path.json.dest));
};

const wxml = () => {
	return gulp.src(path.wxml.src).pipe(gulp.dest(path.wxml.dest));
};

const auto = () => {
	gulp.watch(path.style.dest, style);
	gulp.watch(path.js.dest, js);
	gulp.watch(path.json.dest, json);
	gulp.watch(path.wxml.dest, wxml);
};

if(process.env.NODE_ENV === 'DEV') {
	exports.default = gulp.series(style, gulp.parallel(js, json, wxml, auto));
} else {
	exports.default = gulp.series(clean, gulp.parallel(style, js, json, wxml));
}

