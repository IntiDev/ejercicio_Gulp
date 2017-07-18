var gulp = require("gulp");
var uglify = require('gulp-uglify');
var sass = require('gulp-sass');
var obfuscate = require('gulp-obfuscate'); //Cambia nombre de funciones en el código
var browserSync = require('browser-sync').create();
var filesExist = require('files-exist');
// var ruta = 'js/*.js';

var rutas = {
	rutaJS: './assets/js/*.js',
	// Ejemplos
	rutaSCSS: './assets/scss/*.scss',
	principal: 'public'
};

// var opcionesSASS = {
// 	outputStyle: 'mensaje',
// 	error: 'mensaje'
// };

// TAREAS
gulp.task('probandoJS', function () {
	// gulp.src('./js/miGranJS.js')
	gulp.src(filesExist(rutas.rutaJS))
	.pipe(uglify())
	.pipe(obfuscate())
	.pipe(gulp.dest(rutas.principal + '/jsMinificado/'))//crea rchivos con base a la carpeta indicada en la ruta
});

gulp.task('prepararSCSS', function () {
	gulp.src(filesExist(rutas.rutaSCSS)) // con return al principio de la linea  la ejecución se vuelve ASINCRONA
	.pipe(sass({
		outputStyle: 'compressed'
	})
		.on('error', sass.logError))//parte del pipe anterior
	.pipe(gulp.dest(rutas.principal+'/css/'))
});

gulp.task('sass-watch', ['prepararSCSS'], function () {//se ejecutan la tarea sass-watch & prepararSCSS
	browserSync.reload();
})

gulp.task('cargandoJS', function () {
	gulp.src(rutas.rutaJS)
	.pipe(gulp.dest(rutas.principal + 'jsMinificado/' ))
});

gulp.task('js-watch', ['cargandoJS'], function () {
	browserSync.reload();
});

gulp.task('watchChanges', function () {
	// Se conecta prueba con el servidor
	browserSync.init({
		server: {
			baseDir: rutas.principal
		}
	});

	gulp.watch(rutas.rutaSCSS, ['sass-watch']);//Ejecuta en tiempo real los cambios realizados en el archivo .scss
	gulp.watch(rutas.rutaJS, ['js-watch']);
});
