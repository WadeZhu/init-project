var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('autoprefixer');
var minifycss = require('gulp-minify-css');
var minifycss = require('gulp-clean-css');
var tingpng = require('gulp-tinypng');
var rename = require('gulp-rename');
var clean = require('gulp-clean');
var notify = require('gulp-notify');
var livereload = require('gulp-livereload');
var changed = require('gulp-changed');
var jscs = require('gulp-jscs');
var uglify = require('gulp-uglify');
var postcss = require('gulp-postcss');
var sourcemaps = require('gulp-sourcemaps');
var lazypipe = require('lazypipe');
var mqpacker = require('css-mqpacker');
var webpack = require("webpack");
var path = require('path');
var fs= require('fs') ;
var dist = 'build_ok/';
//var dist = 'build_ok2/';
var src = 'src/' ;  
//var src = 'src2/' ;  
var cache = require('gulp-cache');
var useref = require('gulp-useref'),
		gulpif = require('gulp-if');
gulp.task('dev-style', function() { 
  var processors = [
    require('postcss-import')(),
    mqpacker,
    require('postcss-url')(),
    autoprefixer({ browsers: ['last 2 versions', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4', 'FireFox >= 16', '> 1%'] })
  ];
  return gulp.src(src+'/**/*.scss')
    .pipe(sourcemaps.init({loadMaps: true}))
    .pipe(sass().on('error', sass.logError)) 
    .pipe(postcss(processors))
    //.pipe(sourcemaps.write('maps')) 
    .pipe(gulp.dest(src))
    .pipe(notify({ message: 'Sass Styles task complete' }));

});
gulp.task('dev-js', function() { 
  return gulp.src(src+'/js/**/*.js')
    .pipe(changed(dest))
    .pipe(gulp.dest(dest+'js/'))   
    .pipe(notify({ message: 'Scripts task complete' }));
});
gulp.task('dist-img', function() { 
  return gulp.src(src+'/images/**/*')
    .pipe(cache(tingpng('ig93GtlHOl8sE4XaFXV6VSxOpSy8veyQ')))
    .pipe(gulp.dest(dist+'/images'))
});

gulp.task('dist-html', function() { 
	return gulp.src(src+'/*.html')
    .pipe(useref())
    .pipe(gulpif('*.js', uglify()))
    .pipe(gulpif('*.css', minifycss()))
    .pipe(gulp.dest(dist))
});
gulp.task('clean', function() { 
  return gulp.src([dist+'*'], {read: false})
    .pipe(clean());
});
gulp.task('cleanCash', function (done) {  
    return cache.clearAll(done);  
});  
//测试
gulp.task('dev', function() {
  gulp.watch(src+'/**/*.scss', ['dev-style']);
});


//上线包
gulp.task('html', ['dist-html']);
gulp.task('img', ['dist-img']);
gulp.task('dist', ['dist-img','dist-html']);//,'dist-style'