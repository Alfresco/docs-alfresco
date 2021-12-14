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

It is also possible to retrieve and update content properties in a Content Services repository as well as invoking content actions as part of a process using the following BPMN elements:

* Publish to Alfresco
* Retrieve Alfresco properties
* Update Alfresco properties
* Call Alfresco Action

There are three ways to configure a connection to Content Services:

* [Using the Identity Service to configure Single Sign On (SSO)](configure-a-connection-using-single-sign-on)
* [Using basic authentication](#configure-a-connection-using-basic-authentication)
* [Using the Share Connector]({% link process-services/2.0/using/share-connector.md %})

### Configure a connection using Single Sign On

A Content Services connection to Process Services can be created using the Identity Service so that communication between the two systems is achieved using tokens instead of stored credentials. You need the following:

* Content Services version 6.1.1 or later.
* The Identity Service configured between Process Services and Content Services.
* The properties are configured in `activiti-identity-service.properties` for SSO.

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
    |Alfresco version|The version of Content Services to connect to. This must be version 6.1.1 or later to use SSO.|
    |Authentication type|The authentication type of the connection. Select **Identity Service authentication** to use SSO.|

Authenticate users for Alfresco Repository communication:

After a repository connection has been configured to use SSO users need to authorize their Content Services credentials for use by Process Services by doing the following:

1. Sign into Process Services.
2. Navigate to **Identity Management > Personal**
3. Select the **Authorize** button against the **Alfresco Repository** configured for SSO.

>**Note:** If a repository **Authentication type** is changed then users are required to reauthorize their credentials for it.

>**Note**: If a user's authorization token expires whilst they have Content Services tasks assigned to them they will stay in a pending state until the user reauthorizes against the repository.

The following properties need to be set in the `activiti-identity-service.properties` file to connect to Content Services using SSO:

>**Note:** Many of the following properties to configure SSO with Content Services use [Identity Service properties]({% link process-services/2.0/config/authenticate.md %}#identity-service) as their default values.

|Property|Description|
|--------|-----------|
|alfresco.content.sso.enabled|Sets whether SSO is enabled between Process Services and Content Services. For example `${keycloak.enabled}`. |
|alfresco.content.sso.client_id|The **Client ID** within the realm that points to Process Services. For example `${keycloak.resource}`. |
|alfresco.content.sso.client_secret|The secret key for the Process Services client. For example `${keycloak.credentials.secret}`. |
|alfresco.content.sso.realm|The realm that is configured for the Content Services and Process Services clients. For example `${keycloak.realm}`. |
|alfresco.content.sso.scope|Sets the duration that tokens are valid for. For example using the value`offline_access` a token is valid even after a user logs out as long as the token is used at least once every 30 days. See the [Keycloak documentation](https://www.keycloak.org/docs/latest/server_admin/#_offline-access){:target="_blank"} for further information. |
|alfresco.content.sso.javascript_origins|The base URL for the Javascript origins of the Process Services instance. For example `http://localhost:9999`. |
|alfresco.content.sso.auth_uri|The authorization URL. For example `${keycloak-auth-server-url}/realms/${alfresco.content.sso.realm}/protocol/openid-connect/auth`. |
|alfresco.content.sso.token_uri|The authorization token URL. For example `${keycloak-auth-server-url}/realms/${alfresco.content.sso.realm}/protocol/openid-connect/token`. |
|alfresco.content.sso.redirect_uri|The redirect URI for authorization. The value in the example column needs to be updated with the correct base URL for the Process Services instance. For example `http://localhost:9999/activiti-app/rest/integration/sso/confirm-auth-request`. |

### Configure a connection using basic authentication

A Content Services connection to Process Services can be created using basic authentication. A user's credentials for Content Services will be stored encrypted in Process Services.

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
    |Authentication type|The authentication type of the connection. Select **Default authentication** to use basic authentication.|

Authenticate users for Alfresco Repository communication:

After a repository connection has been configured for basic authentication, users need to enter their Content Services credentials for use by Process Services by doing the following:

1. Sign into Process Services.
2. Navigate to **Identity Management > Personal**
3. Click the **Alfresco Repository** configured for basic authentication.
4. Enter their Alfresco Content Services user name and password.

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
|googledrive.web.disabled|Set this to `true` to enable Google Drive connections to be configured in forms and processes. |
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
