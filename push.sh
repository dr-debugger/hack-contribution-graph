#! /bin/bash

pwd=$(pwd)
cd $pwd
branch=$1
echo $branch
git push origin $branch 