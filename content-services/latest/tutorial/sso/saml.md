---
title: SAML
---

The configuration for SAML authentication allows users to access Alfresco products in a single browser session by entering their credentials only once and authenticating against a SAML identity provider. An LDAP directory is used for user and group management.

The following diagram illustrates the components and authentication flow for a SAML setup:

![SAML authentication diagram]({% link content-services/images/keycloak-saml.png %})

As shown in the diagram, a connection to the SAML identity provider is configured within Keycloak in order to authenticate Alfresco Share, Alfresco Digital Workspace, and Alfresco Process Services. This also includes setting up a service provider within the SAML identity provider for Keycloak.

Alfresco Content Services and Alfresco Process Services are configured directly to the Keycloak instance so that the Keycloak can authenticate a user when it is contacted by the respective web application.

The LDAP directory is used for user and group management and is configured to synchronize users to the Keycloak, Alfresco Content Services and Alfresco Process Services individually.

## Prerequisites

The following are the prerequisites needed to configure SSO with SAML:

* The Keycloak is installed.
* A SAML identity provider
* An LDAP directory
* Administrator access to all systems

## Configuration

There are thirteen steps to configuring SSO using a SAML identity provider with Alfresco products. The following are the host names used as examples throughout the configuration:

* Alfresco Content Services: `repo.example.com`
* Alfresco Share: `share.example.com`
* Alfresco Digital Workspace: `adw.example.com`
* Alfresco Process Services: `aps.example.com`
* Keycloak: `keycloak.example.com`
* SAML Identity Provider: `saml.example.com`
  * PingFederate was used for testing purposes.
* LDAP Directory: `ldap.example.com`
  * OpenLDAP was used for testing purposes.

It is also assumed that certificates are correctly set up for each host and that each host exposes its service solely via TLS on the default port (443).

## Step 1: Configure a realm and clients

A realm and client need to be configured in the Keycloak for the Alfresco products to sit under. A single realm is required, however multiple clients may be used instead of the single one used in this example.

A separate client always needs to be created and configured for Desktop Sync if it is used. The configuration steps for this additional client can be ignored if Desktop Sync is not used.

1. Sign into the Keycloak Administration Console (Keycloak Admin Console).
2. Select the default realm, `Alfresco` or create a new realm to use that the Alfresco products will be accessed through. Note down the **Name** for later use. The realm `Alfresco` will be used in this example.
3. Select **Tokens** and set a timeout period in the **Realm Settings** for the realm `Alfresco`.
4. Use the default client under the `Alfresco` realm or create a new client and configure it. Make sure that at least the following are set:
    * The client is **Enabled**.
    * A **Client ID** is set.
    * **Implicit Flow Enabled** is switched on.
    * A wildcard `*` is entered for **Valid Redirect URIs**.
5. To configure single logout for Process Services add the following URL into the **Admin URL**: `aps.example.com/activiti-app`.

6. Create a new client for Alfresco Share under the `Alfresco` realm or the realm you created, setting at least the following:

    In the **Settings** tab:

    * **Client ID** is set to a valid value, for example `share`.
    * **Enabled** must be set to true.
    * **Client Protocol** is set to `openid-connect`.
    * **Access Type** is set to public.
    * **Standard Flow** is enabled.
    * **Valid Redirect URIs** is set to `*`.

7. Create a new client for Desktop Sync under the `Alfresco` realm or the realm you created setting at least the following :

    In the **Settings** tab:

    * A unique and identifiable **Client ID** .
    * The **Valid Redirect URI** must be set to `http://127.0.0.1*, http://localhost*`.
    * **Implicit Flow Enabled** is switched off.

## Step 2: Configure LDAP synchronization

An LDAP directory needs to be synchronized with the Keycloak, Alfresco Content Services (ACS) and Alfresco Process Services (APS). The following steps detail the synchronization with the Keycloak, whilst the configuration to ACS and APS is covered in later steps.

1. Sign into the Keycloak Administration Console (Keycloak Admin Console) and select the `Alfresco` realm.
2. Select **User Federation** and **Add Ldap providers**.
3. Choosing a **Vendor** will auto-populate many of the fields.
4. Enter the **Connection URL** for the LDAP instance in the format:
    * `ldap//ldap.example.com:389` or
    * `ldaps//ldap.example.com:636` for SSL-enabled installations
5. Set the **Batch Size** and whether to use **Full Sync** and/or **Period Changed Users Sync** followed by the associated **Sync Periods**.
6. Save the configuration.

## Step 3: Configure a service provider for the Keycloak

A Service provider needs to be set up in the SAML identity provider for the Keycloak using a certificate generated by the Keycloak API.

1. Use the Keycloak certificate descriptor API. The URL of the API is `https://keycloak.example.com/auth/realms/alfresco/protocol/saml/descriptor`.
2. Copy the value of `<dsig:X509Certificate>`.
3. Paste the value of `<dsig:X509Certificate>` into a new text file between the `-----BEGIN CERTIFICATE-----` and `-----END CERTIFICATE-----` commands. The following is an example of a completed text file:

    ```bash
    -----BEGIN CERTIFICATE-----
    MIICnzCCAYcCBgFkqEAQCDANBgkqhkiG9w0BAQsFADATMREwDwYDVQQDDAhhbGZyZXNjbzA
    -----END CERTIFICATE-----
    ```

4. Save the file with the file extension `.cert`.
5. Sign into the SAML identity provider as an administrator and configure a new service provider:

    * The base URL to use is: `https://keycloak.example.com/`.
    * Use the certificate created in the previous step.
    * The redirect URI to use will be in the format `https://keycloak.example.com/auth/realms/alfresco/broker/saml/endpoint`.

    > **Note:** The alfresco part of the URL is the name of the realm configured in [step 1](#step-1-configure-a-realm-and-clients). Make sure this is changed if you used a different realm name.

6. Export or note down the details of the newly created service provider to import into the Keycloak in the following step.

## Step 4: Configure a service provider connection

The Keycloak needs to have a connection to the SAML identity provider configured. This can be setup manually or by importing connection details from an external file.

1. Sign into the Keycloak Administration Console (Keycloak Admin Console) and select the `Alfresco` realm.
2. Select **Identity Providers** and **Add provider...** then choose **SAML v2.0**.
3. Enter an **Alias** for the provider.

    > **Note:** The **Alias** will appear on the sign in page to users when they first sign in to an Alfresco application.

4. Manually configure the connection settings in the Keycloak to match the SAML provider or use the import function to import the settings from a file.
5. Set the **NameID Policy Format** to `Unspecified`.
6. Save the configuration.

## Step 5: (Optional) Enforcing SAML

Enforcing SAML removes the option for users to sign into Alfresco products with basic authentication and only displays the option for a SAML sign in.

1. Sign into the Keycloak Administration Console (Keycloak Admin Console) and select the `Alfresco` realm.
2. Select **Authentication** and navigate to the **Flows** tab.
3. `Browser` in the dropdown list and select **Action** > **Config** for the **Identity Provider Redirector** row.
4. Fill in the resulting form with the details of the SAML identity provider configured in [step 4](#step-4-configure-a-service-provider-connection).

    > **Important:** The **Alias** and **Default Identity Provider** need to match the values configured in [step 4](#step-4-configure-a-service-provider-connection).

## Step 6: Configure Alfresco Content Services properties

The properties listed that need to be set for Alfresco Content Services (ACS) are only those that are required for setting up SSO. They include the synchronization with an LDAP directory and updating the Alfresco Share configuration file to enable SSO. A timeout period can also be set for Share.

1. Use the following configuration parameters either in an `alfresco-global.properties` file, via the repository config map in Kubernetes or as environment variables in a docker-compose file:

    | Property | Description |
    | -------- | ----------- |
    | authentication.chain | The authentication chain needs to be set for the Keycloak and LDAP synchronization, for example `keycloak-1:keycloak,alfrescoNtlm-1:alfrescoNtlm,ldap-1:ldap`|
    |keycloak.auth-server-url|The base URL of the Keycloak, for example `https://keycloak.example.com/auth`|
    |keycloak.enable-basic-auth | Sets whether basic authentication is also supported by the Keycloak, for example `true`|
    |keycloak.realm | The realm name configured in the Keycloak for the Alfresco applications, for example `alfresco`|
    |keycloak.resource|The **Client ID** set up in the Keycloak for Alfresco Content Services. The client needs to exist underneath the realm set for `keycloak.realm`, for example `alfresco`|
    |ldap.authentication.active | Sets whether LDAP authentication is enabled or not. This needs to be set to `false` to use SAML authentication via the Keycloak, for example `false`|
    |ldap.synchronization.active|Sets whether LDAP synchronization is enabled or not. This needs to be set to `true` to sync users with the repository, for example `true`|
    |ldap.synchronization.java.naming. security.authentication | The mechanism to use to authenticate with the LDAP server, for example `simple`|
    |ldap.synchronization.java.naming. security.principal|The user principal name (UPN) of the account used to retrieve account details for all users and groups, for example `alfresco@domain.com`|
    |ldap.synchronization.java.naming.security.credentials | The password for the account set in `ldap.synchronization.java.naming.security.principal`, for example `secret`|
    |ldap.*|There are several optional [configuration]({% link content-services/latest/admin/auth-sync.md %}#ldapconfprops) and [synchronization]({% link content-services/latest/admin/auth-sync.md %}#synchronization-configuration-properties) properties|
    |csrf.filter.referer | The referer value of ACS to prevent Cross Site Request Forgery (CSRF), for example `https://repo.example.com`|
    |csrf.filter.origin | The origin value of ACS to prevent Cross Site Request Forgery (CSRF), for example `https://repo.example.com/*`|

2. Update the `share-config-custom.xml` file located by default in `$ALFRESCO_HOME/tomcat/shared/classes/alfresco/web-extension/`:

    * Set the `CSRFPolicy` to true as in the following example:

        ```xml
        <config evaluator="string-compare" condition="CSRFPolicy" replace="true">
        ```

3. Set a session timeout in both `web.xml` files located by default in `$ALFRESCO_HOME/tomcat/webapps/share/WEB-INF` and `$ALFRESCO_HOME/tomcat/webapps/alfresco/WEB-INF`. This should match the value [configured for the realm](#step-1-configure-a-realm-and-clients).

    The following is an example of the property to add:

    ```xml
    <session-config>
        <session-timeout>720</session-timeout>
    </session-config>
    ```

    > **Note:** This example sets a session time of 12 hours.

4. Sign in to the administrator console of ACS as an administrator. The URL of the administrator console is `https://repo.example.com:443/alfresco/service/enterprise/admin`.
5. Navigate to **Directories** > **Directory Management** and click **Run Synchronize** to perform a manual LDAP sync.
6. Sign into Share as an administrator. The URL for Share is `https://share.example.com/share`.
7. Navigate to **Admin Tools** > **Users** to verify that all user accounts have been synchronized correctly.

## Step 7: Configure Alfresco Digital Workspace

Alfresco Digital Workspace only requires its properties to be updated to enable SSO. For manual deployments these can be updated in the `app.config.json` file and for Docker and Kubernetes deployments using environment variables.

| Property                       | Environment variable                         | Description                                                                                                                                                                                                                                                  |
|--------------------------------|----------------------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| authType                       | APP_CONFIG_AUTH_TYPE                         | The authentication type. Must be set to `OAUTH`                                                                                                                                                                                                              |
| oauth2.host                    | APP_CONFIG_OAUTH2_HOST                       | The address of the Keycloak including the realm name configured in [step 1](#step-1-configure-a-realm-and-clients). In the example the realm name is *Alfresco*                                                                                      |
| oauth2.clientId                | APP_CONFIG_OAUTH2_CLIENTID                   | The name of the client configured in [step 1](#step-1-configure-a-realm-and-clients) for Digital Workspace                                                                                                                                                   |
| oauth2.implicitFlow            | APP_CONFIG_OAUTH2_IMPLICIT_FLOW              |                                                                                                                                                                                                                                                              |
| oauth2.silentLogin             | APP_CONFIG_OAUTH2_SILENT_LOGIN               | Setting `silentLogin` to true removes a login page from displaying if a user is already authenticated. Setting the value to `false` will display a sign in page even though a user needs to only select the **Sign in** option and not enter any credentials |
| oauth2.redirectSilentIframeUri | APP_CONFIG_OAUTH2_REDIRECT_SILENT_IFRAME_URI | The address that Digital Workspace uses to refresh authorization tokens                                                                                                                                                                                      |
| oauth2.redirectUri             | APP_CONFIG_OAUTH2_REDIRECT_LOGIN             | The URL to redirect to after a user is successfully authenticated                                                                                                                                                                                            |
| oauth2.redirectUriLogout       | APP_CONFIG_OAUTH2_REDIRECT_LOGOUT            | The URL to redirect to after a user successfully signs out                                                                                                                                                                                                   |

> **Note:** If `implicitFlow` is set to `false` the grant type `password` will be used instead.

The following is an example `app.config.json` file excerpt. By default this file is located in the `/src` directory.

```json
"authType": "OAUTH",
"oauth2": {
        "host": "https://keycloak.example.com/auth/realms/alfresco",
        "clientId": "alfresco",        
        "scope": "openid",
        "implicitFlow": true,
        "silentLogin": true,
        "redirectSilentIframeUri": "https://adw.example.com/workspace/assets/silent-refresh.html",
        "redirectUri": "/workspace/",
        "redirectUriLogout": "/workspace/logout"
        }
```

## Step 8: Configure Alfresco Share properties

The properties listed that need to be set for Alfresco Share are only those that are required for setting up SSO.

Use the following configuration parameters either in the `share-config.properties` file, using the share config map in Kubernetes, or as environment variables in a Docker Compose file:

|Property|Description|
|--------|-----------|
| aims.enabled | Enables or disables Keycloak, for example `true`. |
| aims.realm | The name of the realm, for example `alfresco`. |
| aims.resource | The Client ID of the application, for example `share`. |
| aims.authServerUrl | The base URL of the Keycloak, for example `https://keycloak.example.com` |
| aims.publicClient | If set to `true`, the adapter will not send credentials for the client to Keycloak. |

## Step 9: (Optional) Configure Alfresco Sync Service

If Alfresco Sync Service is used and a client has been created for it in [step 1](#step-1-configure-a-realm-and-clients) then the following properties need to be set in the `sync/service-sync/config.yml`:

| Property | Description |
| -------- | ----------- |
| keycloak.auth-server-url |The base URL of the Keycloak, for example `https://keycloak.example.com/auth`|
| keycloak.realm |The realm name configured in the Keycloak for the Alfresco application, for example `alfresco`|
| keycloak.resource |The **Client ID** set up in the Desktop Sync for Alfresco Content Services. The client needs to exist underneath the realm set for `keycloak.realm`, for example `desktop-sync`|
| keycloak.public-client |The adapter will not send credentials for the client to the Keycloak if this is set to true, for example `true`|
| keycloak.credentials.secret |The secret key for this client if the access type is not set to public.|

## Step 10: Configure Alfresco Process Services

Alfresco Process Services (APS) has two sets of properties that need to be configured to setup SSO. One set synchronizes APS with an LDAP directory and the other set configure with the Keycloak.

1. Configuration for LDAP synchronization can be achieved manually for WAR file deployments using the `activiti-ldap-properties` file or reference an external file for Docker and Kubernetes deployments:

    | Property | Description |
    | -------- | ----------- |
    | ldap.authentication.enabled |Sets whether LDAP authentication is enabled. This needs to be `false` as LDAP is only being used for user synchronization, for example `false`|
    | ldap.authentication.java.naming.provider.url |The URL of the LDAP instance, for example `ldaps://ldap.example.com:636`|
    | ldap.synchronization.java.naming.security.principal |The user used to access the LDAP directory to perform the synchronization, for example `uid=admin,ou=system`|
    | ldap.synchronization.java.naming.security.credentials |The password for the user set in `ldap.synchronization.java.naming.security.principal`, for example `secret`|
    | ldap.synchronization.full.enabled | Sets whether full LDAP synchronization is enabled or not, for example `true`|
    | ldap.synchronization.full.cronExpression |The cron expression describing how often the full synchronization should run, for example `0 0 0 * * ?`|
    | ldap.synchronization.differential.enabled |Sets whether differential LDAP synchronization is enabled or not, for example `true`|
    | ldap.synchronization.differential.cronExpression |The cron expression describing how often the differential synchronization should run, for example `0 0 */4 * * ?`|
    | ldap.synchronization.userSearchBase |The section of the LDAP directory to restrict user synchronization to, for example `ou=users,dc=alfresco,dc=com`|
    | ldap.synchronization.groupSearchBase |The section of the LDAP directory to restrict group synchronization to, for example `ou=groups,dc=alfresco,dc=com`|

2. Configuration with the Alfresco Process Services can be achieved manually for WAR file deployments using the `activiti-keycloak.properties` or reference an external file for Docker and Kubernetes deployments:

    | Property | Description |
    | -------- | ----------- |
    | keycloak.enabled |Sets whether Process Services will use the Keycloak to authenticate against, for example `true`|
    | keycloak.realm |The realm name configured in the Keycloak for the Alfresco applications, for example `alfresco`|
    | keycloak.auth-server-url |The base URL of the Keycloak, for example `https://keycloak.example.com/auth`|
    | keycloak.ssl-required |Sets whether SSL is mandatory for access or not, for example `all`|
    | keycloak.resource |The **Client ID** set up in the Keycloak for Process Services. The client needs to exist underneath the realm set for `keycloak.realm` or `KEYCLOAK_REALM`, for example `alfresco`|
    | keycloak.principal-attribute |The attribute to identify users by for authentication. This needs to be set to `email` for Process Services, for example `email`|
    | keycloak.public-client |The adapter will not send credentials for the client to the Keycloak if this is set to `true`, for example `true`|
    | keycloak.always-refresh-token |Sets whether a token should be refreshed for every request or not, for example `true`|
    | keycloak.autodetect-bearer-only |This should be set to true to serve both a web application and web services, for example `true`|
    | keycloak.token-store |The location of where account information token should be stored, for example `cookie`|
    | keycloak.enable-basic-auth |Sets whether basic authentication is also supported by the Keycloak, for example `true`|

## Step 11: (Optional) Configure a connection between Process Services and Content Services

An SSO connection can be configured between Process Services and Content Services so that communication between the two systems is achieved using tokens instead of stored credentials when executing processes.

1. Set these additional properties in `activiti-keycloak.properties`:

    | Property | Description |
    | -------- | ----------- |
    | alfresco.content.sso.enabled |Sets whether SSO is enabled between Process Services and Content Services, for example `${keycloak.enabled}`|
    | alfresco.content.sso.client_id |The **Client ID** within the realm that points to Process Services, for example `${keycloak.resource}`|
    | alfresco.content.sso.client_secret |The secret key for the Process Services client, for example `${keycloak.credentials.secret}`|
    | alfresco.content.sso.realm |The realm that is configured for the Content Services and Process Services clients, for example `${keycloak.realm}`|
    | alfresco.content.sso.scope |Sets the duration that tokens are valid for. For example using the value `offline_access` a token is valid even after a user logs out as long as the token is used at least once every 30 days. See the [Keycloak documentation](https://www.keycloak.org/docs/21.1.2/server_admin/#_offline-access){:target="_blank"} for further information, for example `offline_access`|
    | alfresco.content.sso.javascript_origins |The base URL for the Javascript origins of the Process Services instance, for example `https://aps.example.com`|
    | alfresco.content.sso.auth_uri |The authorization URL, for example `https://keycloak.example.com/realms/alfresco/protocol/openid-connect/auth`|
    | alfresco.content.sso.token_uri |The authorization token URL, for example `https://keycloak.example.com/realms/alfresco/protocol/openid-connect/token`|
    | alfresco.content.sso.redirect_uri |The redirect URI for authorization. The value in the example column needs to be updated with the correct base URL for the Process Services instance, for example`https://aps.example.com/activiti-app/rest/integration/sso/confirm-auth-request`|

2. Sign into Process Services as an administrator.
3. Navigate to **Identity Management** > **Tenants** > **Alfresco Repositories**.
4. Add a new repository or edit an existing connection.
5. Configure the following settings for the repository connection:

    |Setting|Description|
    |-------|-----------|
    |Name|A name for the repository connection.|
    |Alfresco tenant|The tenant to create the repository under.|
    |Repository base URL|The base URL of the repository instance to connect to.|
    |Share base URL|The base URL of Share for the repository instance to connect to.|
    |Alfresco version|The version of Content Services to connect to.|
    |Authentication type|Select **Identity Service authentication** to use SSO.|

## Step 12: (Optional) Configure a mobile client for Process Services

If Process Services for mobile is required then a client needs to be created for it in the Keycloak to enable SSO capability. The redirect URI is preconfigured for the mobile application using the operating system it is installed on, which means that the **Valid Redirect URIs** value in the Keycloak must match this value.

1. Sign into the Keycloak Administration Console (Keycloak Admin Console).
2. Create a new client for the mobile application under the `Alfresco` realm or the realm you created in [step 1](#step-1-configure-a-realm-and-clients) and set at least the following in the **Settings** tab:

    **iOS**

    * A unique and identifiable **Client ID**. The default value is `alfresco-ios-aps-app`.
    * The **Valid Redirect URI** must be set to `iosapsapp://aims/auth`.
    * **Implicit Flow Enabled** is switched off.

    **Android**

    * A unique and identifiable **Client ID**. The default value is `alfresco-android-aps-app`.
    * The **Valid Redirect URI** must be set to `androidapsapp://aims/auth`.
    * **Implicit Flow Enabled** is switched off.

## Step 13: (Optional) Configure a client for Content Services for iOS

If Content Services for iOS is required then a client needs to be created for it in the Keycloak to enable SSO capability. The redirect URI is preconfigured for the mobile application using the operating system it is installed on, which means that the **Valid Redirect URIs** value in the Keycloak must match this value.

1. Sign into the Keycloak Administration Console (Keycloak Admin Console).
2. Create a new client for the mobile application under the `Alfresco` realm or the realm you created in [step 1](#step-1-configure-a-realm-and-clients) and set at least the following in the **Settings** tab:

    * A unique and identifiable **Client ID**. The default value is `alfresco-ios-acs-app`.
    * The **Valid Redirect URI** must be set to `iosacsapp://aims/auth`.
    * **Implicit Flow Enabled** is switched off.

## Verify the configuration

After configuring SSO using SAML, the following is an example sequence to follow to verify that SSO works correctly:

1. Open a new browser session and navigate to Alfresco Digital Workspace at the URL `http://adw.example.com/workspace`. Sign in to the SAML provider when redirected.
2. Create a new tab in the same browser session and navigate to Alfresco Share at the URL `http://share.example.com/share` and there should be no additional sign in step required.
3. Create a new tab in the same browser session and navigate to Alfresco Process Services at the URL `http://aps.example.com/activiti-app` and there should be no additional sign in step required.

> **Note:** If timeout is configured using the same value for the Keycloak and ACS, accessing any of the applications after the specified time will prompt a user to sign in again.
