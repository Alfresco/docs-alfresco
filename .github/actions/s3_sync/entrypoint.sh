#!/bin/bash

set -e

aws s3 sync _site s3://$BUCKET_NAME --delete