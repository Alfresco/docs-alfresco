#!/bin/bash

set -e

bundle install
bundle exec jekyll build --trace --config $JEKYLL_CONFIG