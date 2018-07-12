#!/bin/bash

# This script will checkout from origin/master any files that differ only in whitespace changes.

REPO_ROOT=$(git rev-parse --show-toplevel)
WIN_STYLE_PWD=$(pwd -W)

if [[ "$REPO_ROOT" != "$WIN_STYLE_PWD" ]]; then
    echo "You must be in the root of the Git repository when you run this script ($REPO_ROOT)"
    exit 1
fi

git diff origin/master --name-only | while read -r f; do
    if [[ $(git diff origin/master -w "$f") == "" ]]; then
        echo Restoring $f
        git checkout origin/master -- "$f"
    fi
done
