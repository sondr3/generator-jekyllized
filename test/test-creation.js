/*global describe, beforeEach, it*/
'use strict';

var path    = require('path');
var fs      = require('fs');
var yeoman  = require('yeoman-generator');
var helpers = yeoman.test;

describe('Jekyllized generator test', function () {
    this.timeout(15000);
    beforeEach(function (done) {
        helpers.testDirectory(path.join(__dirname, './temp'), function (err) {
            if (err) {
                return done(err);
            }

            this.jekyllized = helpers.createGenerator('jekyllized:app', [
                '../../app', [
                helpers.createDummyGenerator(),
                'mocha:app'
                ]
            ]);
            this.jekyllized.options['skip-install'] = true;

            done();
        }.bind(this));
    });

    it('the generator can be required without throwing', function () {
        this.app = require('../app');
    });

    it('creates expected files', function (done) {
        var expected = [
            'bower.json',
            'package.json',
            'gulpfile.js',
            'src/index.html',
            'src/robots.txt',
            'src/assets/favicon.ico',
            'src/assets/scss/style.scss',
            'aws-credentials.json'
        ];

        helpers.mockPrompt(this.jekyllized, {
            projectName: ['Mocha Test'],
            projectDescription: ['Mocha tests for Jekyllized'],
            projectTagline: ['Better hope this doesn\'t blow up'],
            projectUrl: ['testing.com'],
            ownerName: ['Ola Nordmann'],
            ownerEmail: ['ola.nordmann@email.com'],
            ownerBio: ['Just your average Norwegian'],
            ownerTwitter: ['olanordmann123123'],
            jekyllPermalinks: ['pretty'],
            jekyllPaginate: ['10'],
            uploadChoices: ['amazonCloudfrontS3'],
            amazonKey: ['123123123123123'],
            amazonSecret: ['14141414141414'],
            amazonBucket: ['135135135135135']
        });

        this.jekyllized.run({}, function () {
            helpers.assertFile(expected); 
            done();
        });
    });
});
