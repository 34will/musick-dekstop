var embedTemplates = require("gulp-angular-embed-templates");
var gulp = require("gulp");
var plumber = require("gulp-plumber");
var sass = require("gulp-sass");
var tsc = require("gulp-typescript");
var watch = require("gulp-watch");

var pathBuild = "build";
var pathStyles = "styles";
var pathSource = "app";

var tsProject = tsc.createProject("tsconfig.json");

function handleError(err) {
	console.log(err.toString());
	this.emit('end');
}

function compileAngular() {
	var options = {
		basePath: "./",
		minimize: { quotes: true },
		sourceType: "ts"
	};

	return gulp.src(pathSource + "/**/*.ts", { base: "./" + pathSource + "/" })
		.pipe(plumber({ errorHandler: handleError }))
		.pipe(embedTemplates(options))
		.pipe(tsProject())
		.pipe(gulp.dest("./" + pathBuild + "/"));
}

gulp.task("angular.compile", compileAngular);

gulp.task("angular.watch", function () {
	return watch(["./" + pathSource + "/**/*.html", "./" + pathSource + "/**/*.ts"], { read: false }, function () { gulp.start("angular.compile"); });
});

function compileSCSS() {
	return gulp.src("./" + pathStyles + "/main.scss")
		.pipe(plumber({ errorHandler: handleError }))
		.pipe(sass().on("error", sass.logError))
		.pipe(gulp.dest("./" + pathStyles + "/"));
}

gulp.task("scss.compile", compileSCSS);

gulp.task("scss.watch", function () {
	return watch("./" + pathStyles + "/**/*.scss", { read: false }, function () { gulp.start("scss.compile"); });
});
