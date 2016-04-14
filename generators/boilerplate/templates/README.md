# <%= projectName %>

> <%= projectDescription %>

## To get started

```sh
$ gulp [--prod]
```

And you'll have a new Jekyll site generated for you and displayed in your
browser. Neato. If you want to run it with production settings, just add
`--prod`.

## Usage

```sh
$ gulp build [--prod]
```

```sh
$ gulp deploy
```

## Install
If you have cloned this repo or want to reinstall, make sure there's no
`node_modules` or `Gemfile.lock` folder/file and then run `npm install` and
`bundle install`.

#### Update
To update: `npm update generator-jekyllized -g`, then run `yo jekyllized:gulp
[--rsync|amazon|pages]` in this directory. Note that this will overwrite any
local changes, so back it up.

## Github
For more information on how to use your new project, please refer to the [README
on Github](https://github.com/sondr3/generator-jekyllized).

## Owner

> [<%= authorName %>](<%= projectURL %>)
