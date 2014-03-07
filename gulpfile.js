'use strict';

// Require all the plugins needed for bumping and changelogging
// aww jizz, automation
var gulp = require('gulp');
var bump = require('gulp-bump');
var changelog = require('conventional-changelog');
var pkg = require('./package.json');
var fs = require('fs');

// Updates the changelog automagically, huzzah
gulp.task('changelog', function(callback) {
	changelog({
		version: pkg.version,
		repository: 'https://github.com/sondr3/generator-jekyllized'
	}, function(err, log) {
		if (err) throw new Error(err);
		fs.writeFileSync('CHANGELOG.md', log);
	});
	callback;
});

// Increments the version by a patched version (major.minor.PATCH)
gulp.task('patch', function() {
	gulp.src('./package.json')
	  .pipe(bump({ type: 'patch' }))
	  .pipe(gulp.dest('./'));
});

// Increments the version by a minor version (major.MINOR.patch)
gulp.task('minor', function() {
	gulp.src('./package.json')
	  .pipe(bump({ type: 'minor' }))
	  .pipe(gulp.dest('./'));
});

// Increments the version by a major release (MAJOR.minor.patch)
gulp.task('major', function() {
	gulp.src('./package.json')
	  .pipe(bump({ type: 'major' }))
	  .pipe(gulp.dest('./'));
});