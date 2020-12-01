#!/bin/bash

set -e

aws s3 --profile crossaccount sync --acl public-read _site s3://$BUCKET_NAME --delete
aws cloudfront --profile crossaccount create-invalidation --distribution-id $DISTRIBUTION_ID --paths "/*"

