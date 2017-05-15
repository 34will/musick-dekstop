var embedTemplates = require("gulp-angular-embed-templates");
var exec = require("child_process").exec;
var gulp = require("gulp");
var plumber = require("gulp-plumber");
var sass = require("gulp-sass");
var sequence = require('run-sequence');
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

gulp.task("angular.compile", function () {
	var options = {
		basePath: "./",
		minimize: { quotes: true },
		sourceType: "ts"
	};

	return tsProject.src()
		.pipe(plumber({ errorHandler: handleError }))
		.pipe(embedTemplates(options))
		.pipe(tsProject())
		.pipe(gulp.dest("./" + pathBuild + "/"));
});

gulp.task("angular.watch", ["angular.compile"], function () {
	return watch(["./" + pathSource + "/**/*.html", "./" + pathSource + "/**/*.ts"], { read: false }, function () { gulp.start("angular.compile"); });
});

gulp.task("angular.ngc", function (cb) {
	return exec("node_modules/.bin/ngc -p tsconfig-aot.json", function (err, stdout, stderr) {
		console.log(stdout);
		console.log(stderr);
		cb(err);
	});
});

gulp.task("angular.rollup", function (cb) {
	return exec("node_modules/.bin/rollup -c rollup-config.js", function (err, stdout, stderr) {
		console.log(stdout);
		console.log(stderr);
		cb(err);
	});
});

gulp.task("angular.aot-compile", function () {
	return sequence("angular.ngc", "angular.rollup");
});

gulp.task("font-awesome.move", function () {
	return gulp.src("./node_modules/font-awesome/fonts/*.*")
		.pipe(gulp.dest("./fonts"));
});

gulp.task("scss.compile", function () {
	return gulp.src("./" + pathStyles + "/main.scss")
		.pipe(plumber({ errorHandler: handleError }))
		.pipe(sass().on("error", sass.logError))
		.pipe(gulp.dest("./" + pathStyles + "/"));
});

gulp.task("scss.watch", ["scss.compile", "font-awesome.move"], function () {
	return watch("./" + pathStyles + "/**/*.scss", { read: false }, function () { gulp.start("scss.compile"); });
});

gulp.task("watch", ["angular.watch", "scss.watch"]);
