#!/bin/bash

set -e

mkdir ~/.aws
touch ~/.aws/config
echo '[profile crossaccount]

role_arn='$RUNNER_ROLE'
external_id='$RUNNER_EXTERNAL_ID'
credential_source=Ec2InstanceMetadata' > ~/.aws/config
