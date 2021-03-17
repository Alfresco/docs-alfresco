# Alfresco Content Services configuration

Alfresco Content Services can be used to:

-   Upload or link related content \(for example, for a task\)

-   Upload or link content in a form


The connection for an Alfresco Content Services installation is created by an administrator through the user interface. Accounts for connecting to an Alfresco Content Services installation are created by the users themselves.

Passwords are stored encrypted in the database. An `init` vector and secret key are used for the encryption. These keys can be changed from the default values as follows:

```
# Passwords for non-OAuth services (eg. on-premise alfresco) are encrypted using AES/CBC/PKCS5PADDING
# It needs a 128-bit initialization vector (http://en.wikipedia.org/wiki/Initialization_vector) and a 128-bit secret key
# represented as 16 ascii characters below
security.encryption.ivspec=9kje56fqwX8lk1Z0
security.encryption.secret=wTy53pl09aN4iOkL
```

**Note:** When the connector installed on your Alfresco Content Services server you will be able to use the Task application from Share.

-   **[LDAP settings in Alfresco Content Services](../topics/ldap_settings.md)**  
You must set up LDAP in Alfresco Content Services.
-   **[Deploying AMPs](../topics/deploying_amps.md)**  
The Share Connector is applied to an installation using two AMP files.

**Parent topic:**[Setting up the Share Connector](../topics/production_setup.md)

