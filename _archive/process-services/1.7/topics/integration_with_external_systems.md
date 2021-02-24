# Integration with external systems

You can integrate Alfresco Process Services with external systems.

**Alfresco One**

The Alfresco One \(on premise\) integration can be used to:

-   Upload or link related content \(e.g. for a task\)

-   Upload or link content in a form


The connection for an Alfresco installation is created by an administrator through the user interface. Accounts for connecting to an Alfresco installation are created by the users themselves.

Passwords are stored encrypted in the database. An init vector and secret key are used for the encryption. These keys can be changed from the default values as follows:

```
# Passwords for non-OAuth services (eg. on-premise alfresco) are encrypted using AES/CBC/PKCS5PADDING
# It needs a 128-bit initialization vector (http://en.wikipedia.org/wiki/Initialization_vector) and a 128-bit secret key
# represented as 16 ascii characters below
security.encryption.ivspec=9kje56fqwX8lk1Z0
security.encryption.secret=wTy53pl09aN4iOkL
```

**Note:** See the *Alfresco Activiti Connector Guide* for more information about integrating Alfresco Activiti with Alfresco One. With the connector installed on your Alfresco One server you will be able to use the Alfresco Activiti’s Task application from Alfresco Share. If you are using Alfresco Activiti 1.3.2 with the Activiti Connector, you don’t need to have your users create the Alfresco accounts in Activiti \(as mentioned above\) because an SSO connection is established between the systems by default.

**Alfresco in the Cloud**

The Alfresco Cloud integration can be used to:

-   Upload or link related content \(eg. for a task\)

-   Upload or link content in a form


To integrate with Alfresco Cloud, you must have an account and be able to access to the API. To create an account, [click here](http://www.alfresco.com/develop/cloud).

Set the following properties and copy *app/rest/integration/alfresco-cloud/confirm-auth-request* as-is:

```
alfresco.cloud.clientId=abc
alfresco.cloud.secret=abc
alfresco.cloud.redirectUri=http://localhost:8080/activiti-app/app/rest/integration/alfresco-cloud/confirm-auth-request
```

Note: The *redirectUri* must match the host on which Alfresco Activiti is running.

By default, the Alfresco Cloud support is disabled so that it won’t show up in the upload widget. To enable Alfresco Cloud support change the alfresco.cloud.disabled property.

```
alfresco.cloud.disabled=false
```

**Google Drive**

The Google Drive integration can be used to:

-   Upload related content \(eg. for a task\)

-   Upload content in a form


To integrate Google Drive, you must have a valid development account to access the [API](https://developers.google.com/drive/v2/reference/). See [this link](https://developers.google.com/drive/v3/web/quickstart/java#step_1_Turn_on_the_drive_api) for more information.

In addition, you will need a secret key, x509 certificate URL, and a client Id. These settings are provided by the Google Drive Dev Account.

```
# No need to change these properties
googledrive.web.auth_uri=https://accounts.google.com/o/oauth2/auth
googledrive.web.token_uri=https://accounts.google.com/o/oauth2/token
googledrive.web.auth_provider_x509_cert_url=https://www.googleapis.com/oauth2/v1/certs

# Following properties need to be changed to map to the correct url
googledrive.web.redirect_uris=http://localhost:8080/activiti-app/app/rest/integration/google-drive/confirm-auth-request
googledrive.web.javascript_origins=http://localhost:8080/activiti-app

# Following properties are provided by Google
googledrive.web.client_secret=aabbcc
googledrive.web.client_email=bla
googledrive.web.client_x509_cert_url=bla
googledrive.web.client_id=bla
```

By default, the Google Drive support is disabled so that it won’t show up in the upload widget. To enable Google Drive support, change the following property.

```
googledrive.web.disabled=false
```

**Box**

The Box integration can be used to:

-   Upload related content \(for example, for a task\)

-   Upload content in a form


To integrate Box, you must have access to [https://developers.box.com](https://developers.box.com), the secret key, authentication urls, and client Id. These settings are provided by the Box Dev Account.

```
# No need to change these properties
box.web.auth_uri=https://app.box.com/api/oauth2/authorize
box.web.token_uri=https://app.box.com/api/oauth2/token

# Following properties need to be changed to map to the correct url
box.web.redirect_uris=http://localhost:8080/activiti-app/app/rest/integration/box/confirm-auth-request
box.web.javascript_origins=http://localhost:8080

# Following properties are provided by Box
box.web.client_id=RegisterWithBoxForYourClientId
box.web.client_secret=RegisterWithBoxForYourSecret
```

By default, the Box support is disabled so that it won’t show up in the upload widget. To enable Box support, change the following property:

```
box.disabled=false
```

**Parent topic:**[Configuring Alfresco Process Services](../topics/administration_application_config.md)

