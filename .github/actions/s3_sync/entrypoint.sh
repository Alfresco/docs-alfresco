#!/bin/bash

set -e

mkdir ~/.aws
touch ~/.aws/config
echo '[profile crossaccount]

role_arn='$RUNNER_ROLE'
credential_source=Ec2InstanceMetadata' > ~/.aws/config
aws s3 --profile crossaccount sync --acl public-read _site s3://$BUCKET_NAME --delete