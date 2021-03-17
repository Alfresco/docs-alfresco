---
author: [Alfresco Documentation, Alfresco Documentation]
---

# Multipart upload overview

The S3 Connector supports multipart uploads where files larger than 20MB are split.

The multipart upload enables you to upload large files in parts, and is triggered when you upload a file larger than 20 MB. Amazon S3 stores these parts, but it creates the file from the parts only after you upload all of them and send a successful request to complete the multipart upload. Upon receiving the complete multipart upload request, AWS S3 constructs the file from the uploaded parts and you can then access the file just as you would any other file in your bucket. The number of attempts to write to the S3 bucket is configurable. The default setting is 2:

```
s3.maxMultipartUploadRetries=2
```

**Abort incomplete multipart upload**

If you don't send the complete multipart upload request successfully, AWS S3 will not assemble the parts and will not create any file. So the parts remain in S3. As best practice, we recommend you configure a lifecycle rule. See [Aborting Incomplete Multipart Uploads Using a Bucket Lifecycle Policy](http://docs.aws.amazon.com/AmazonS3/latest/dev/mpuoverview.html#mpu-abort-incomplete-mpu-lifecycle-config) for more details.

We create the bucket and a global lifecycle rule to enforce the abort and deletion of incomplete uploads automatically only if the bucket name configured in the global properties file doesn't exist in S3. In this case, you can configure the number of days that S3 should keep the files before marking it for deletion. The default setting is 1 day:

```
s3.abortIncompleteMultipartUploadDays=1
```

When a file reaches the end of its lifetime, S3 queues it for removal and removes it asynchronously. There may be a delay between the expiration date and the date when S3 removes a file.

See [AWS Multipart Upload Overview](http://docs.aws.amazon.com/AmazonS3/latest/dev/mpuoverview.html) for more details.

**Parent topic:**[Configuring the S3 Connector](../tasks/s3-contentstore-config.md)

