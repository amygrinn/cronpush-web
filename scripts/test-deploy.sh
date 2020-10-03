#!/bin/sh

if [ -n "$TRAVIS_PULL_REQUEST_BRANCH" ]; then
  path=reports/$TRAVIS_PULL_REQUEST_BRANCH
else
  path=reports/$TRAVIS_BRANCH
fi

ssh cron-push@cron-push.tygr.info mkdir -p cron-push/$path
rsync --recursive --delete reports/* cron-push@cronpush.tygr.info:cron-push/$path
echo build-report.html and test-report.html saved to https://cronpush.tygr.info/$path
echo They will be preserved for 2 weeks
