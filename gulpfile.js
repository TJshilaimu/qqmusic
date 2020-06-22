const {
	series,
	src,
	dest,
	watch
} = require('gulp');

const uglify = require('gulp-uglify')
const babel = require('gulp-babel')
const cssClean = require('gulp-clean-css')
const htmlClean = require('gulp-htmlclean')

const stripDebug = require('gulp-strip-debug')
// const less = require('gulp-less')
const sass = require('gulp-sass')
const connect = require('gulp-connect')


let fold = {
	src: 'src/',
	dest: 'dist/'
}


function js() {
	return src(fold.src + 'js/*.js')
	.pipe(stripDebug())
	.pipe(babel({
		presets: ['@babel/env']
	}))
	.pipe(uglify())
		.pipe(dest(fold.dest + 'js/'))
		.pipe(connect.reload())

}

function css() {
	return src(fold.src + 'css/*')
	.pipe(sass())
	.pipe(cssClean())
		.pipe(dest(fold.dest + 'css/'))
		.pipe(connect.reload())

}

function html() {
	return src(fold.src + 'html/*.html')
	.pipe(htmlClean())
		.pipe(dest(fold.dest + 'html/'))
		.pipe(connect.reload())
}

function img() {
	return src(fold.src + 'images/*')
		.pipe(dest(fold.dest + 'images/'))
}

function server(cb){
connect.server({
	port:12311,
	livereload:true
})
cb();
}


watch(fold.src + 'html/*',function(cb){
	html();
	cb()
})

watch(fold.src + 'css/*',function(cb){
	css();
	cb()
})

watch(fold.src + 'js/*',function(cb){
	js();
	cb()
})



exports.default = series(html, css, js, img,server)