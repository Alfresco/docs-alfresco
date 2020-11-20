#!/bin/python3

import os
import re
import json
import boto3

ADDED_FILES = "files_added.json"
MODIFIED_FILES = "files_modified.json"
BUCKET = os.environ.get("BUCKET_NAME", None)


if __name__ == '__main__':
    session = boto3.Session(profile_name='crossaccount')
    client = session.client('s3')

    redirects = [os.path.join(r, file) for r, d, f in os.walk("redirects")
                 for file in f]

    for filename in redirects:
        try:
            url = get_url_from_file(filename)
            key = re.search('redirects/(.*)', filename).group(1)

            response = client.put_object(
                Bucket=BUCKET,
                Key=key,
                WebsiteRedirectLocation=url
            )
            print(f"Uploaded: {key} -> {url}")
        except Exception as e:
            print(f"Error uploading redirect: {str(e)}")
            print(f"Key: {key}\nUrl: {url}")

    print("Redirects Uploaded")


def get_json_from_file(filename):
    with open(filename, "r") as f:
        data = json.load(f)
    return data


def get_url_from_file(filename):
    with open(filename, "r") as f:
        url = f.readline()
    return url
