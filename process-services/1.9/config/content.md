---
title: Configure content systems
---

You can connect Process Services to external content systems and publish content as part of a process. With Alfresco Content Services it is also possible to retrieve and update content, as well as invoke certain repository actions.

Process Services can connect to the following content systems:

* [Alfresco Content Services](#content-services)
* [Box](#box)
* [Google Drive](#google-drive)

Content that is uploaded as part of a task or process can be stored in a [file system](#file-system) or [Amazon S3](#amazon-s3).

## Content Services

An Alfresco Content Services connection allows for content to be uploaded to a Content Services repository as part of a Process Services form or using a Publish to Alfresco task in a process.

A Content Services connection to Process Services can be created using basic authentication. A user's credentials for Content Services will be stored encrypted in Process Services. Alternatively, the [Share Connector]({% link process-services/1.9/using/share-connector.md %}) can be used.

The following properties need to be set in `activiti-app.properties` to encrypt Content Services user credentials:

|Property|Description|
|--------|-----------|
|security.encryption.ivspec|A 128-bit initialization vector to encrypt credentials using AES/CBC/PKCS5PADDING. This will be 16 characters long.|
|security.encryption.secret|A 128-bit secret key to encrypt credentials using AES/CBC/PKCS5PADDING. This will be 16 characters long.|

Configuring the Alfresco Repository location:

1. Sign into Process Services as an administrator.
2. Navigate to **Identity Management > Tenants > Alfresco Repositories**.
3. Add a new repository or edit an existing connection.
4. Configure the following settings for the repository connection:

    |Setting|Description|
    |-------|-----------|
    |Name|A name for the repository connection.|
    |Alfresco tenant|The tenant to create the repository under.|
    |Repository base URL|The base URL of the repository instance to connect to.|
    |Share base URL|The base URL of Share for the repository instance to connect to.|
    |Alfresco version|The version of Alfresco Content Services to connect to.|

## Box

A Box connection allows for content to be uploaded to Box as part of a Process Services form or using a Publish to Box task in a process.

A [Box developer account](https://developers.box.com){:target="_blank"} is required to setup a connection to Box.

The following properties need to be set in the `activiti-app.properties` file to enable Box connections to be used in Process Services:

|Property|Description|
|--------|-----------|
|box.disabled|Set this to `true` to enable Box connections to be configured in forms and processes. |
|box.web.auth_uri|Set this to the value provided in the example column to configure the Box authentication URI. For example `https://app.box.com/api/oauth2/authorize`. |
|box.web.token_uri|Set this to the value provided in the example column to configure the Box token URI. For example `https://app.box.com/api/oauth2/token`. |
|box.web.redirect_uris|Update the base of the URL provided in the example column to reflect your Process Services installation. For example `http://localhost:8080/activiti-app/app/rest/integration/box/confirm-auth-request`. |
|box.web.javascript_origins|Sets the base URL of Javascript origins. For example `http://localhost:8080/activiti-app`.|
|box.web.client_id|The client ID obtained from your Box developer account.|
|box.web.client_secret|The client secret obtained from your Box developer account.|

## Google Drive

A Google Drive connection allows for content to be uploaded to Google Drive as part of a Process Services form or using a publish to Google Drive task in a process.

A [Google developer account](https://developers.google.com/drive/v2/reference/){:target="_blank"} is required to setup a connection to Google Drive.

The following properties need to be set in the `activiti-app.properties` file to enable Google Drive connections to be used in Process Services:

|Property|Description|
|--------|-----------|
|googledrive.web.disabled|Set this to `false` to enable Google Drive connections to be configured in forms and processes. |
|googledrive.web.auth_uri|Set this to the value provided in the example column to configure the Google Drive authentication URI. For example `https://accounts.google.com/o/oauth2/auth`. |
|googledrive.web.token_uri|Set this to the value provided in the example column to configure the Google Drive token URI. For example `https://accounts.google.com/o/oauth2/token`. |
|googledrive.web.auth_provider_x509_cert_url|Set this to the value provided in the example column to configure the Google Drive x509 certificate URL. For example `https://www.googleapis.com/oauth2/v1/certs`. |
|googledrive.web.redirect_uris|Update the base of the URL provided in the example column to reflect your Process Services installation. For example `http://localhost:8080/activiti-app/app/rest/integration/google-drive/confirm-auth-request`. |
|googledrive.web.javascript_origins|Sets the base URL of Javascript origins. For example `http://localhost:8080/activiti-app`. |
|googledrive.web.client_id|The client ID obtained from your Google developer account.|
|googledrive.web.client_secret|The client secret obtained from your Google developer account.|
|googledrive.web.client_email|The client email associated to your Google developer account.|
|googledrive.web.client_x509_cert_url|The client x509 certificate URL obtained from your Google developer account.|

## Content storage

Process Services enables you to upload content, such as attaching a file to a task or a form.

Content can be stored locally by setting the property below to `fs`. Alternatively, you can use Amazon S3 for 
content storage by setting it to `s3`.

```text
contentstorage.type
```

### File system

To configure file system for content storage, set the following properties in the `activiti-app.properties` file:

>**Note:** Please note that the property file located at `tomcat/lib/activiti-app.properties` has priority over the one found at `/tomcat/webapps/activiti-app/WEB-INF/classes/META-INF/activiti-app.properties`.

|Property|Description|
|--------|-----------|
|contentstorage.fs.rootFolder|Name and location of the root folder. **Important:** When using multiple instances of the application, make sure that this path references a shared network drive. This is so that all nodes are able to access all content as the application is stateless and any server can handle any request. For example `/data`. |
|contentstorage.fs.createRoot|Sets whether the root folder is created by default. For example `true`. |
|contentstorage.fs.depth|Depth of the folder tree. For example `4`. |
|contentstorage.fs.blockSize|Maximum number of files in a single folder. For example `1024`.|

### Amazon S3

To configure Amazon S3 for content storage, set the following properties in the `activiti-app.properties` file:

|Property|Description|
|--------|-----------|
|`contentstorage.s3.accessKey`|Set to the S3 access key. The access key is required to identify the Amazon Web Services account and can be obtained from the Amazon Web Services site [AWS Credentials](http://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSGettingStartedGuide/AWSCredentials.html).|
|`contentstorage.s3.secretKey`|Set to the S3 secret key.The secret key is required to identify the Amazon Web Services account and can be obtained from the Amazon Web Services site [AWS Credentials](http://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSGettingStartedGuide/AWSCredentials.html).|
|`contentstorage.s3.bucketName`|Set to the S3 bucket name.The bucket name must be unique among all Amazon Web Services users globally. If the bucket does not already exist, it will be created, but the name must not have already been taken by another user. See [S3 bucket restrictions](http://docs.aws.amazon.com/AmazonS3/latest/dev/BucketRestrictions.html) for more information on bucket naming.|
|`contentstorage.s3.objectKeyPrefix`|Set to your AWS object prefix.|
