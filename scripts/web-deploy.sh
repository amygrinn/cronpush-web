#!/bin/sh

rsync --recursive --delete $TRAVIS_BUILD_DIR/dist cron-push@cronpush.tygr.info:cron-push
