#!/bin/bash

set -e

aws s3 sync --acl public-read _site s3://$BUCKET_NAME --delete