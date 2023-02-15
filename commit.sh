#! /bin/bash

commitMsg=$1
date=$2

git add .
git commit --date="$date" -m "$commitMsg"