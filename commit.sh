#! /bin/bash

commitMsg=$1
branch=$2
date=$3

git add .
git commit --date=$date -m $commitMsg