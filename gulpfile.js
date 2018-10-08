let gulp = require('gulp');
let babel = require('gulp-babel');
let minifyCss = require('gulp-minify-css');
let imagemin = require('gulp-imagemin');
let uglify = require('gulp-uglify');


gulp.task('js', ()=>{
    gulp.src('./dev/js/*.js')
    .pipe(babel({
        presets:['@babel/env']
    }))
    .pipe(gulp.dest('dist/js'))
})

gulp.task('css',()=>{
    gulp.src('./dev/css/*.css')
    .pipe(minifyCss())
    .pipe(gulp.dest('dist/css'))
})
gulp.task('img',()=>{
    gulp.src('./dev/img/*.*')
    .pipe(imagemin())
    .pipe(gulp.dest('dist/img'))
})

gulp.task('default',()=>{
    gulp.watch('./dev/js/*.js',['js'])
    gulp.watch('./dev/css/*.css',['css'])
    gulp.watch('./dev/img/*.*',['img'])
})