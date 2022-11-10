#!/bin/bash -l

# a file to run jekyll in docker

export LANG="C.UTF-8"
export LC_ALL="C.UTF-8"
export LANGUAGE="C.UTF-8"

if [ ! -f "Gemfile.lock" ]; then
  bundle install
fi

bundle exec jekyll serve --host 0.0.0.0 --port 4000 --incremental --livereload --livereload-port 4001