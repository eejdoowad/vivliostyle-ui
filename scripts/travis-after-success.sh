#!/bin/bash
set -ev

if [ "${TRAVIS_PULL_REQUEST}" = "false" -a "${TRAVIS_BRANCH}" = "master" ]; then
    scripts/deploy-viewer-to-gh-pages.sh
fi