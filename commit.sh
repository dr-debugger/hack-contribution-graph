#! /bin/bash

dir=$1
commitMsg=$2
branch=$3
date=$4

cd /
cd $dir

git add .
git commit --date=$date -m $commitMsg