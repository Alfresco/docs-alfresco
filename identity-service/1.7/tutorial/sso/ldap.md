---
title: LDAP
---

The configuration for LDAP authentication will allow users to access Alfresco products in a single browser session by entering their credentials only once and authenticating against an LDAP directory.

The following diagram illustrates the components and authentication flow for an LDAP setup:

![LDAP authentication diagram]({% link identity-service/images/1-5-ldap.png %})

As shown in the diagram, the Identity Service is used to authenticate the Alfresco Digital Workspace, Alfresco Share, and Alfresco Process Services.

Alfresco Share is configured to authenticate against the Identity Service using a SAML connection, however this does not require a SAML identity provider to be used.

Alfresco Content Services and Alfresco Process Services are configured directly to the Identity Service instance so that the Identity Service can authenticate a user when it is contacted by the respective web application.

The LDAP directory is used for user and group management and is configured to synchronize users to the Identity Service, Alfresco Content Services and Alfresco Process Services individually.

## Prerequisites

The following are the prerequisites needed to configure SSO with LDAP:

* The [correct product versions]({% link identity-service/1.7/support/index.md %}) of the Alfresco software you are using.
* The Identity Service is installed.
* The SAML Module for Content Services 1.2 is installed into Alfresco Content Services.
* An LDAP directory.
* Administrator access to all systems.

## Configuration

There are twelve steps to configuring SSO using an LDAP directory with Alfresco products. The following are the host names used as examples throughout the configuration:

* Alfresco Content Services: `repo.example.com`
* Alfresco Share: `share.example.com`
* Alfresco Digital Workspace: `adw.example.com`
* Alfresco Office Services: `repo.example.com/alfresco/aos`
* Alfresco Process Services: `aps.example.com`
* Identity Service: `ids.example.com`
* LDAP Directory: `ldap.example.com`
  * OpenLDAP was used for testing purposes.

It is also assumed that certificates are correctly set up for each host and that each host exposes its service solely via TLS on the default port (443).

## Step 1: Configure a realm and clients

A realm and client need to be configured in the Identity Service for the Alfresco products to sit under. A single realm is required and the client will be used for all services other than Alfresco Share and Alfresco Office Services (AOS).

1. Sign in to the administrator console of the Identity Service as an administrator. The URL of the Identity Service administrator console is `https://ids.example.com/auth/admin`.

2. Select the default realm, `Alfresco` or create a new realm to use that the Alfresco products will be accessed through. Note down the **Name** for later use. The realm `Alfresco` will be used in this example.

3. Select **Tokens** and set a timeout period in the **Realm Settings** for the realm `Alfresco`.

4. Use the default client under the `Alfresco` realm or create a new client and configure it. Make sure that at least the following are set:

    * The client is **Enabled**.
    * A **Client ID** is set.
    * **Implicit Flow Enabled** is switched on.
    * A wildcard `*` is entered for **Valid Redirect URIs**.

5. To configure single logout for Process Services add the following URL into the **Admin URL**: `aps.example.com/activiti-app`.

6. Create a new client for Alfresco Share under the `Alfresco` realm or the realm you created, setting at least the following:

    * **Client ID** is set to a valid value (for example, `share`).
    * **Enabled** is set to true.
    * **Client Protocol** is set to `openid-connect`.
    * **Access Type** is set to `public`.
    * **Standard Flow** is enabled.
    * **Valid Redirect URIs** is set to `*`.

## Step 2: Configure clients for Alfresco Content Services

Clients need to be created and configured for Alfresco Office Services (AOS) and Desktop Sync if they are used. The configuration steps for these additional clients can be ignored if they are not used.

1. Sign in to the administrator console of ACS as an administrator. The URL of the administrator console is `https://repo.example.com:443/alfresco/service/enterprise/admin`.
2. Navigate to **Directories** > **Single Sign-On (SAML)** and download the service provider certificate using the **Download SP Certificate** button.
3. Run the following command on the downloaded certificate using Terminal or the Command Line:

    ```bash
    keytool -keystore idp.jks -storepass password -alias idpCert -import -file <path to>/alfrescoSamlSpPublicCert.cer
    ```

4. Sign in to the administrator console of the Identity Service as an administrator. The URL of the Identity Service administrator console is `https://ids.example.com/auth/admin`.
5. Create a new client for AOS under the `Alfresco` realm or the realm you created in [step 1](#step-1-configure-a-realm-and-clients) setting the following:

    In the **Settings** tab:

    * A unique and identifiable **Client ID**.
    * A **Client Protocol** of `SAML`
    * A valid **Base URL**, for example: `https://repo.example.com/alfresco`
    * An identifiable **Name** that will be displayed.
    * The **Login Theme** is set to `Alfresco`
    * Set the **Valid Redirect URIs** using a wildcard `*`, for example: `https://repo.example.com/alfresco/*` and `https://ids.example.com/*`
    * Set **Master SAML Processing URL** and **IDP Initiated SSO URL Name** to the same value that you used for **Client ID**.
    * Set **Logout Service POST Binding URL**: `https://repo.example.com/alfresco/service/saml/-default-/aos/logout-request`
    * Make sure that the **Front Channel Logout** property is off.
    * **Save** the settings.

    In the **SAML Keys** tab:

    * Click the **Import** button:
        * Set **Key Alias** to `idpCert`
        * Set **Store Password** to `password`
        * Select the file `idp.jks` generated in step 3 of this section as the **Import File**.
        * **Import** the certificate.

    In the **Mappers** tab:

    * Click the **Add Builtin** button and add `X500 email`, `X500 givenName` and `X500 surname`.
    * **Edit** each mapper and set **SAML Attribute Name** to match the value of **Property** and set **SAML Attribute NameFormat** to `Basic`.
    * **Save** the edits.

6. Create a new client for Desktop Sync under the `Alfresco` realm or the realm you created in [step 1](#step-1-configure-a-realm-and-clients) setting at least the following :

    In the **Settings** tab:

    * A unique and identifiable **Client ID** .
    * The **Valid Redirect URI** must be set to `http://127.0.0.1*, http://localhost*`.
    * **Implicit Flow Enabled** is switched off.

## Step 3: Configure LDAP synchronization

An LDAP directory needs to be synchronized with the Identity Service, Alfresco Content Services (ACS) and Alfresco Process Services (APS). The following steps detail the synchronization with the Identity Service, whilst the configuration to ACS and APS is covered in later steps.

1. Sign in to the administrator console of the Identity Service as an administrator. The URL of the Identity Service administrator console is `https://ids.example.com/auth/admin`.

2. Select **User Federation** and **Add provider...** then choose **ldap**.

3. Choosing a **Vendor** will auto-populate many of the fields.

4. Enter the **Connection URL** for the LDAP instance in the format:
    * `ldap//ldap.example.com:389` or
    * `ldaps//ldap.example.com:636` for SSL-enabled installations

5. Set the **Batch Size** and whether to use **Full Sync** and/or **Period Changed Users Sync** followed by the associated **Sync Periods**.

6. Save the configuration.

## Step 4: Configure Alfresco Content Service properties

The properties listed that need to be set for Alfresco Content Services (ACS) are only those that are required for setting up SSO. They include the synchronization with an LDAP directory and the location of a SAML keystore. The Alfresco Share configuration file also requires updating to enable SSO.

1. Use the following configuration parameters either in an `alfresco-global.properties` file, via the repository config map in Kubernetes or as environment variables in a docker-compose file:

    | Property | Description |
    | -------- | ----------- |
    | authentication.chain | The authentication chain needs to be set for the Identity Service and LDAP synchronization, for example `identity-service-1:identity-service,alfrescoNtlm-1:alfrescoNtlm,ldap-1:ldap`|
    |identity-service.auth-server-url|The base URL of the Identity Service, for example `https://ids.example.com/auth`|
    |identity-service.enable-basic-auth | Sets whether basic authentication is also supported by the Identity Service, for example `true`|
    |identity-service.realm | The realm name configured in the Identity Service for the Alfresco applications, for example `alfresco`|
    |identity-service.resource|The **Client ID** set up in the Identity Service for Alfresco Content Services. The client needs to exist underneath the realm set for `identity-service.realm`, for example `alfresco`|
    |saml.keystore.location | The location of the SAML keystore self-signed certificate. This file needs to be accessible to the repository and has the file type `.keystore`. This file is generated as part of configuring the SAML Module AMP, for example `/path/to/saml.keystore`|
    |saml.keystore.keyMetaData.location | The location of the SAML keystore metadata. This file needs to be accessible to the repository and has the file type `.properties`. This file is generated as part of configuring the SAML Module AMP, for example `/path/to/saml-keystore-passwords.properties`|
    |ldap.authentication.active | Sets whether LDAP authentication is enabled or not. This needs to be set to `false` to use SAML authentication via the Identity Service, for example `false`|
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

    * Add the following two rules to allow for signing out via SAML:

        ```xml
        <rule>
          <request>
            <method>GET</method>
            <path>/res/.*</path>
          </request>
        </rule>
        ```

        ```xml
        <rule>
          <request>
            <method>POST</method>
            <path>/page/saml-authnresponse|/page/saml-logoutresponse|/page/saml-logoutrequest</path>
          </request>
        </rule>
        ```

        > **Note**: Incoming public GET requests will be caught avoiding them being evaluated by other rules. Incoming POST requests from identity providers do not need a token.

3. Sign in to the administrator console of ACS as an administrator. The URL of the administrator console is `https://repo.example.com:443/alfresco/service/enterprise/admin`.

4. Navigate to **Directories** > **Directory Management** and click **Run Synchronize** to perform a manual LDAP sync.

5. Sign into Share as an administrator. The URL for Share is `https://share.example.com/share`.

6. Navigate to **Admin Tools** > **Users** to verify that all user accounts have been synchronized correctly.

## Step 5: Configure the SAML connection for Alfresco Content Services

The administration console in Alfresco Content Services (ACS) needs updating for Alfresco Office Services to use the SAML connection and certificate that was configured in the Identity Service.

The configuration steps can be ignored if AOS is not used.

1. Sign in to the administrator console of the Identity Service as an administrator. The URL of the Identity Service administrator console is `https://ids.example.com/auth/admin`.

2. Select one of the clients configured in [step 2](#step-2-configure-clients-for-alfresco-content-services) and navigate to its **Installation** tab.

3. Select `SAML Metadata IDPSSODescriptor` from the **Format Option** dropdown and click **Download**.

4. Open the downloaded file and copy the value of `<dsig:X509Certificate>`.

5. Paste the value of `<dsig:X509Certificate>` into a new text file between the `-----BEGIN CERTIFICATE-----` and `-----END CERTIFICATE-----` commands. The following is an example of a completed text file:

    ```bash
    -----BEGIN CERTIFICATE-----
    MIICnzCCAYcCBgFkqEAQCDANBgkqhkiG9w0BAQsFADATMREwDwYDVQQDDAhhbGZyZXNjbzA
    -----END CERTIFICATE-----
    ```

6. Save the file with the file extension `.cert`.

7. Sign in to the administrator console of ACS as an administrator. The URL of the administrator console is `https://repo.example.com:443/alfresco/service/enterprise/admin`.

8. Navigate to **Directories** > **Single Sign-On (SAML)** and upload the certificate generated from the Identity Service in the **Share** and **AOS** tabs.

9. Set the value of **Authentication Request Service URL**, **Logout Request Service URL** and **Logout Response Service URL** to `https://ids.example.com/auth/realms/alfresco/protocol/saml` on the **Share** and **AOS** tabs.

10. Set the value of **Entity Identification (Issuer)** to **Share** or **AOS** client name from [step 2](#step-2-configure-clients-for-alfresco-content-services).

11. Ensure that **Enable SAML(SSO) Authentication** and **Enforce SAML Login** are checked for the **Share** tab and that **Enable SAML(SSO) Authentication** is checked for the **AOS** tab.

## Step 6: Configure Alfresco Digital Workspace

Alfresco Digital Workspace only requires its properties to be updated to enable SSO. For manual deployments these can be updated in the `app.config.json` file and for Docker and Kubernetes deployments using environment variables.

| Property | Environment variable | Description |
| -------- | -------------------- | ----------- |
| authType | APP_CONFIG_AUTH_TYPE |The authentication type. Must be set to `OAUTH`|
| host | APP_CONFIG_OAUTH2_HOST |The address of the Identity Service including the realm name configured in [step 1](#step-1-configure-a-realm-and-clients). In the example the realm name is *Alfresco*|
| clientId | APP_CONFIG_OAUTH2_CLIENTID |The name of the client configured in [step 1](#step-1-configure-a-realm-and-clients) for Digital Workspace|
| implicitFlow | APP_CONFIG_OAUTH2_IMPLICIT_FLOW | |
| silentLogin | APP_CONFIG_OAUTH2_SILENT_LOGIN |Setting `silentLogin` to true removes a login page from displaying if a user is already authenticated. Setting the value to `false` will display a sign in page even though a user needs to only select the **Sign in** option and not enter any credentials|
| redirectSilentIframeUri | APP_CONFIG_OAUTH2_REDIRECT_SILENT_IFRAME_URI |The address that Digital Workspace uses to refresh authorization tokens|
| redirectUri | APP_CONFIG_OAUTH2_REDIRECT_LOGIN |The URL to redirect to after a user is successfully authenticated|
| redirectUriLogout | APP_CONFIG_OAUTH2_REDIRECT_LOGOUT |The URL to redirect to after a user successfully signs out|

> **Note**: If `implicitFlow` is set to `false` the grant type `password` will be used instead.

The following is an example `app.config.json` file excerpt. By default this file is located in the `/src` directory.

```json
"authType": "OAUTH",
"oauth2": {
        "host": "https://ids.example.com/auth/realms/alfresco",
        "clientId": "alfresco",        
        "scope": "openid",
        "secret": "",
        "implicitFlow": true,
        "silentLogin": true,
        "redirectSilentIframeUri": "https://adw.example.com/workspace/assets/silent-refresh.html",
        "redirectUri": "/workspace/",
        "redirectUriLogout": "/workspace/logout"
        }
```

## Step 7: Configure Alfresco Share properties

The properties listed that need to be set for Alfresco Share are only those that are required for setting up SSO.

Use the following configuration parameters either in the `share-config.properties` file, using the share config map in Kubernetes, or as environment variables in a Docker Compose file:

|Property|Description|
|--------|-----------|
| aims.enabled | Enables or disables Identity Service, for example `true`. |
| aims.realm | The name of the realm, for example `alfresco`. |
| aims.resource | The Client ID of the application, for example `share`. |
| aims.authServerUrl | The base URL of the Identity Service, for example `https://ids.example.com` |
| aims.publicClient | If set to `true`, the adapter will not send credentials for the client to Identity Service. |

## Step 8: (Optional) Configure Alfresco Sync Service

If Alfresco Sync Service is used and a client has been created for it in [step 2](#step-2-configure-clients-for-alfresco-content-services) then the following properties need to be set in the `sync/service-sync/config.yml`:

| Property | Description |
| -------- | ----------- |
| identity-service.auth-server-url |The base URL of the Identity Service, for example `https://ids.example.com/auth`|
| identity-service.realm |The realm name configured in the Identity Service for the Alfresco application, for example `alfresco`|
| identity-service.resource |The **Client ID** set up in the Desktop Sync for Alfresco Content Services. The client needs to exist underneath the realm set for `identity-service.realm`, for example `desktop-sync`|
| identity-service.public-client |The adapter will not send credentials for the client to the Identity Service if this is set to true, for example `true`|
| identity-service.credentials.secret |The secret key for this client if the access type is not set to public.|

## Step 9: Configure Alfresco Process Services

Alfresco Process Services (APS) has two sets of properties that need to be configured to setup SSO. One set synchronizes APS with an LDAP directory and the other set configure with the Identity Service.

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

2. Configuration with the Alfresco Process Services can be achieved manually for WAR file deployments using the `activiti-identity-service.properties` or reference an external file for Docker and Kubernetes deployments:

    | Property | Description |
    | -------- | ----------- |
    | keycloak.enabled |Sets whether Process Services will use the Identity Service to authenticate against, for example `true`|
    | keycloak.realm |The realm name configured in the Identity Service for the Alfresco applications, for example `alfresco`|
    | keycloak.auth-server-url |The base URL of the Identity Service, for example `https://ids.example.com/auth`|
    | keycloak.ssl-required |Sets whether SSL is mandatory for access or not, for example `all`|
    | keycloak.resource |The **Client ID** set up in the Identity Service for Process Services. The client needs to exist underneath the realm set for `keycloak.realm` or `IDENTITY_SERVICE_REALM`, for example `alfresco`|
    | keycloak.principal-attribute |The attribute to identify users by for authentication. This needs to be set to `email` for Process Services, for example `email`|
    | keycloak.public-client |The adapter will not send credentials for the client to the Identity Service if this is set to `true`, for example `true`|
    | keycloak.always-refresh-token |Sets whether a token should be refreshed for every request or not, for example `true`|
    | keycloak.autodetect-bearer-only |This should be set to true to serve both a web application and web services, for example `true`|
    | keycloak.token-store |The location of where account information token should be stored, for example `cookie`|
    | keycloak.enable-basic-auth |Sets whether basic authentication is also supported by the Identity Service, for example `true`|

## Step 10: (Optional) Configure a connection between Process Services and Content Services

An SSO connection can be configured between Process Services and Content Services so that communication between the two systems is achieved using tokens instead of stored credentials when executing processes.

1. Set these additional properties in `activiti-identity-service.properties`:

    | Property | Description |
    | -------- | ----------- |
    | alfresco.content.sso.enabled |Sets whether SSO is enabled between Process Services and Content Services, for example `${keycloak.enabled}`|
    | alfresco.content.sso.client_id |The **Client ID** within the realm that points to Process Services, for example `${keycloak.resource}`|
    | alfresco.content.sso.client_secret |The secret key for the Process Services client, for example `${keycloak.credentials.secret}`|
    | alfresco.content.sso.realm |The realm that is configured for the Content Services and Process Services clients, for example `${keycloak.realm}`|
    | alfresco.content.sso.scope |Sets the duration that tokens are valid for. For example using the value `offline_access` a token is valid even after a user logs out as long as the token is used at least once every 30 days. See the [Keycloak documentation](https://www.keycloak.org/docs/16.1/server_admin/#_offline-access){:target="_blank"} for further information, for example `offline_access`|
    | alfresco.content.sso.javascript_origins |The base URL for the Javascript origins of the Process Services instance, for example `https://aps.example.com`|
    | alfresco.content.sso.auth_uri |The authorization URL, for example `https://ids.example.com/realms/alfresco/protocol/openid-connect/auth`|
    | alfresco.content.sso.token_uri |The authorization token URL, for example `https://ids.example.com/realms/alfresco/protocol/openid-connect/token`|
    | alfresco.content.sso.redirect_uri |The redirect URI for authorization. The value in the example column needs to be updated with the correct base URL for the Process Services instance, for example`https://aps.example.com/activiti-app/rest/integration/sso/confirm-auth-request`|

2. Sign into Process Services as an administrator.

3. Navigate to **Identity Management** > **Tenants** > **Alfresco Repositories**.

4. Add a new repository or edit an existing connection.

5. Configure the following settings for the repository connection:

    | Setting | Description |
    | ------- | ----------- |
    |Name|A name for the repository connection.|
    |Alfresco tenant|The tenant to create the repository under.|
    |Repository base URL|The base URL of the repository instance to connect to.|
    |Share base URL|The base URL of Share for the repository instance to connect to.|
    |Alfresco version|The version of Content Services to connect to.|
    |Authentication type|Select **Identity Service authentication** to use SSO.|

## Step 11: (Optional) Configure a mobile client for Process Services

If Process Services for mobile is required then a client needs to be created for it in the Identity Service to enable SSO capability. The redirect URI is preconfigured for the mobile application using the operating system it is installed on, which means that the **Valid Redirect URIs** value in the Identity Service must match this value.

1. Sign in to the administrator console of the Identity Service as an administrator. The URL of the Identity Service administrator console is `https://ids.example.com/auth/admin`.

2. Create a new client for the mobile application under the `Alfresco` realm or the realm you created in [step 1](#step-1-configure-a-realm-and-clients) and set at least the following in the **Settings** tab:

    **iOS**

    * A unique and identifiable **Client ID**. The default value is `alfresco-ios-aps-app`.
    * The **Valid Redirect URI** must be set to `iosapsapp://aims/auth`.
    * **Implicit Flow Enabled** is switched off.

    **Android**

    * A unique and identifiable **Client ID**. The default value is `alfresco-android-aps-app`.
    * The **Valid Redirect URI** must be set to `androidapsapp://aims/auth`.
    * **Implicit Flow Enabled** is switched off.

## Step 12: (Optional) Configure a client for Content Services for iOS

If Content Services for iOS is required then a client needs to be created for it in the Identity Service to enable SSO capability. The redirect URI is preconfigured for the mobile application using the operating system it is installed on, which means that the **Valid Redirect URIs** value in the Identity Service must match this value.

1. Sign in to the administrator console of the Identity Service as an administrator. The URL of the Identity Service administrator console is `https://ids.example.com/auth/admin`.

2. Create a new client for the mobile application under the `Alfresco` realm or the realm you created in [step 1](#step-1-configure-a-realm-and-clients) and set at least the following in the **Settings** tab:

    * A unique and identifiable **Client ID**. The default value is `alfresco-ios-acs-app`.
    * The **Valid Redirect URI** must be set to `iosacsapp://aims/auth`.
    * **Implicit Flow Enabled** is switched off.

## Verify the configuration

After configuring SSO with an LDAP directory, the following is an example sequence to follow to verify that SSO works correctly:

1. Open a new browser session and navigate to Alfresco Digital Workspace at the URL `http://adw.example.com/workspace`. Sign in to the SAML provider when redirected.

2. Create a new tab in the same browser session and navigate to Alfresco Share at the URL `http://share.example.com/share` and there should be no additional sign in step required.

3. Create a new tab in the same browser session and navigate to Alfresco Process Services at the URL `http://aps.example.com/activiti-app` and there should be no additional sign in step required.

> **Note**: If timeout is configured in the [Identity Service](#step-1-configure-a-realm-and-clients) accessing any of the applications after the specified time will prompt a user to sign in again.
