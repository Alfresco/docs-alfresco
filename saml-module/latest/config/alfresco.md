---
title: Configure Alfresco products
---

After configuring an identity provider such as [Active Directory]({% link saml-module/latest/config/adfs.md %}) or [PingFederate]({%link saml-module/latest/config/ping.md %}), service providers need to be configured for the features of Alfresco in which you want to enable SAML: Alfresco Share, the REST API and Alfresco Office Services.

The configuration can be done in any of three ways:

* Using the Alfresco Admin Console
* In configuration files, such as `alfresco-global.properties`
* Dynamically, using JMX if enabled

## Alfresco Share

{% capture share-admin %}

### Configure Alfresco Share using the Admin Console

Administrators can enable and configure SAML authentication for Alfresco Share using the Admin Console.

1. Log on to the SAML page of the Alfresco Admin Console with your user credentials: `http://localhost:8080/alfresco/service/enterprise/admin/admin-saml`

2. Select the **Share** tab.

3. Select **Enable SAML (SSO) Authentication**.

    **SAML Status** shows whether SAML is currently enabled or disabled.

4. (Optional) Deselect **Enforce SAML Login**.

    This option is selected by default and all logins to this service provider must use the Identity Provider (IdP). If you do not enforce the SAML login, the user can decide to use either the Alfresco Share login or login using the IdP link.

5. Specify the **Identity Provider (IdP) Description**.

    This description is shown to users as an alternate login option when **Enforce SAML Login** is deactivated. If no description is provided, the text displayed on the Alfresco login screen would read **your single sign-on provider**. Clicking on this description will redirect you to the IdP.

6. Enter the IdP settings:

    | Setting | Description |
    | ------- | ----------- |
    | IdP Authentication Request Service URL | The address where the authentication request is sent. This redirects you to the identity provider login page. For example: `https://pingfederate.alfresco.me:9031/idp/SSO.saml2` |
    | IdP Single Logout Request Service URL | The address where the logout request is sent when logging out of Alfresco Share. This logs you out of Alfresco Share and any other applications that use your SSO setup. For example: `https://pingfederate.alfresco.me:9031/idp/SLO.saml2` |
    | IdP Single Logout Response Service URL | The address where the logout response is sent when the identity provider gets a logout request. For example: `https://pingfederate.alfresco.me:9031/idp/SLO.saml2` |
    | Entity Identification (Issuer) | Some IdPs use the issuer to determine which service provider connection to use. If you are using ADFS, this is the Base URL, for example: `http://localhost:8080/share`. |
    | User ID Mapping | The SAML attribute that maps to an Alfresco User ID. For PingFederate, this maps to `PersonImmutableID`. For ADFS, the SAML attribute is the `Subject/NameID` specified for the SAML subject `NameID`. |

7. Click **Upload IdP Certificate** to browse to and upload the IdP certificate that you downloaded from your identity provider during configuration.

    **IdP Certificate Status** shows whether the certificate is valid, and the expiry date of the current certificate.

    > **Note**: Alfresco Content Services does not allow you to upload an expired certificate.

    > **Note:** If SAML is enabled, Alfresco always checks for an existing certificate.

8. Click **Download SP Certificate** to download the certificate required by your IdP.

    This is a copy of your self-signed certificate. You should have already downloaded this information when setting up your connections in the IdP.

9. Click **Download SP Metadata** if you need to download the service provider signature verification certificate.

    This is required for ADFS configuration, if you are using ADFS as your IdP.

10. Click **Save**.

You can disable these settings by deselecting **Enable SAML (SSO) Authentication**.

{% endcapture %}

{% capture share-properties %}

### Configure Alfresco Share using the `alfresco-global.properties` file

Administrators can enable and configure SAML authentication for Share using the `alfresco-global.properties` file and a combination of subsystem properties files.

The SAML module uses subsystems to control, configure, and extend the service providers that are supported, therefore it is recommended to use this approach when configuring the subsystems. The SAML subsystems can be configured like any other Alfresco subsystem. For more information, see [Extension classpath]({% link content-services/latest/config/subsystems.md %}#extension-classpath).

> **Note:** Properties set in the `alfresco-global.properties file` apply to the entire SAML module, including all the SAML subsystem instances, such as Alfresco Share, REST API, and Alfresco Office Services.

To configure Alfresco Share, create the properties file in the `<classpathRoot>/alfresco/extension/subsystems/SAML/share/share/my-custom-share-sp.properties` directory:

The default `saml.properties` file for Alfresco Share can be found in the `<TOMCAT_HOME>/webapps/alfresco/WEB-INF/classes/alfresco/subsystems/SAML/share` directory. Use this file to copy the SAML settings into your `<classpathRoot>/alfresco/extension/subsystems/SAML/share/share/my-custom-share-sp.properties` file.

**Note:** Changes to `<classpathRoot>/alfresco-global.properties` are applicable in a single service provider scenario only.

If you use multiple service providers, use subsystem extensions for type and instance. For example, for the Alfresco Share service provider, create a `my-custom-share-sp.properties` file with the classpath: `<TOMCAT_HOME>/shared/classes/alfresco/extension/subsystems/SAML/share/share/my-custom-share-sp.properties`.

1. Locate the `<TOMCAT_HOME>/webapps/alfresco/WEB-INF/classes/alfresco/subsystems/SAML/share/saml.properties` file.

    These are the settings:

    ```bash
    #SAML key store configuration
    saml.keystore.location=classpath:alfresco/keystore/saml.keystore
    saml.keystore.keyMetaData.location=classpath:alfresco/keystore/saml-keystore-passwords.properties
    saml.keystore.provider=
    saml.keystore.type=JCEKS

    # Time, in milliseconds, that message state is valid
    # 300000 = 5 minutes
    saml.message.state.duration.in.millis=300000
    # Clock skew - the number of seconds before a lower time bound, or after an upper time bound, to consider still acceptable.
    saml.issueInstantRule.check.clock.skew.in.seconds=60
    # Number of seconds after a message issue instant after which the message is considered expired  expires
    saml.issueInstantRule.check.expiration.in.seconds=30

    # It is RECOMMENDED that a system entity use a URL containing its own domain name to identify itself
    saml.sp.idp.spIssuer.namePrefix=

    # The SAML attribute (or 'Subject/NameID' for SAML subject NameID) to map to the Alfresco user's ID
    saml.sp.user.mapping.id=Subject/NameID

    # The SAML attribute to map to the Alfresco user's email
    saml.sp.user.mapping.email=Email

    # The SAML attribute to map to the Alfresco user's first name
    saml.sp.user.mapping.firstName=GivenName

    # The SAML attribute to map to the Alfresco user's last name
    saml.sp.user.mapping.lastName=Surname

    # Whether or not SAML is enabled for the service provider
    saml.sp.isEnabled=false

    # Whether or not SAML login is enforced
    saml.sp.isEnforced=true

    # IdP description if you choose to enforce SAML login
    saml.sp.idp.description=

    # IdP URL to which the Authentication Request from Alfresco is posted for the service provider
    saml.sp.idp.sso.request.url=

    # IdP URL to which a logout *request* from Alfresco is posted when logging out from the service provider
    saml.sp.idp.slo.request.url=

    # IdP URL to which a logout *response* from Alfresco is posted when receiving a logout request from your IdP for the service provider
    saml.sp.idp.slo.response.url=

    # Path to the certificate used to validate the requests and responses from the IdP
    saml.sp.idp.certificatePath=

    # Entity identification (issuer) for the service provider.  Some IdPs may use this to determine which SP connection to use.
    saml.sp.idp.spIssuer=

    # Some IdPs, like LemonLDAP, may require a specific format for NameID section of the logout request.
    saml.sp.slo.request.nameid.format=
    ```

2. To enable SAML, use these settings in your `<classpathRoot>/alfresco/extension/subsystems/SAML/share/share/my-custom-share-sp.properties` file:

    ```bash
    saml.sp.isEnabled=true
    saml.sp.isEnforced=false
    saml.sp.idp.description=<Identity Provider>
    ```

    * `saml.sp.isEnabled` specifies whether or not SAML is enabled for the service provider.

    * `saml.sp.isEnforced` accepts a boolean value and specifies whether or not SAML login is enforced. If set to `false`, SAML login is not enforced.

    * `saml.sp.idp.description` accepts a string value and specifies the IdP description at the login screen if you choose to not enforce SAML login.

3. Set the Identity Provider (IdP) settings:

    * `saml.sp.idp.sso.request.url`: The address where the authentication request is sent. This redirects you to the identity provider login page.
    * `saml.sp.idp.slo.request.url`: The address where the logout request is sent when logging out of Alfresco. This logs you out of Alfresco and any other applications that use your SSO setup.
    * `saml.sp.idp.slo.response.url`: The address where the logout response is sent when the identity provider gets a logout request.
    * `saml.sp.idp.spIssuer`: Some IdPs use the issuer to determine which service provider connection to use.
    * `saml.sp.user.mapping.id`: The SAML attribute that maps to an Alfresco User ID. The SAML attribute is the `Subject/NameID` specified for the SAML subject `NameID`.

4. Enter a path to the certificate: `saml.sp.idp.certificatePath`

    > **Note:** If SAML is enabled, Alfresco always checks for an existing certificate.

5. Review the other SAML settings in the `saml.properties` file to understand if they apply to your setup.

6. Save and close all the properties files, and restart Alfresco to apply your changes.

{% endcapture %}

{% capture share-jmx %}

### Configure Alfresco Share using JMX

JMX values (Managed Bean or MBean attributes) are exposed in the Alfresco Admin Console and with internal tools (Alfresco JMX Dump) or external tools like JConsole. The SAML Module beans are described here with their default values.

> **Note**: Example values are given. Always check the values in your own system as these can vary depending on the install method or operating system.

> **Important**: Be aware that any changes you make to attributes in the live system are written to the database. The next time that Alfresco starts, these values will take precedence over any values specified in properties files.

The following are the attributes available for `Alfresco:Type=Configuration, Category=SAML, Object Type=SAML$managed$share`:

|Attribute |Example|
|--------------|-------------|
|$type|`share`|
|idpCertificateExpiryDate| |
|idpCertificateSerialNumber| |
|idpCertificateStatus|`missing`|
|idpCertificateSubject| |
|instancePath|`[managed, share]`|
|saml.issueInstantRule.check.clock.skew.in.seconds|`60`|
|saml.issueInstantRule.check.expiration.in.seconds|`30`|
|saml.keystore.keyMetaData.location|`classpath:alfresco/keystore/saml-keystore-passwords.properties`|
|saml.keystore.location|`classpath:alfresco/keystore/saml.keystore`|
|saml.keystore.provider| |
|saml.keystore.type|`JCEKS`|
|saml.message.state.duration.in.millis|`300000`|
|saml.share.spSloRequestURLSuffix|`/saml-logoutrequest`|
|saml.share.spSloResponseURLSuffix|`/saml-logoutresponse`|
|saml.share.spSsoURLSuffix|`/saml-authnresponse`|
|saml.sp.idp.certificatePath|Set the path to the certificate you require|
|saml.sp.idp.slo.request.url| |
|saml.sp.idp.slo.response.url| |
|saml.sp.idp.spIssuer| |
|saml.sp.idp.spIssuer.namePrefix| |
|saml.sp.idp.sso.request.url| |
|saml.sp.isEnabled|`false`|
|saml.sp.isEnforced|`true`|
|saml.sp.idp.description|`<Identity Provider>`|
|saml.sp.user.mapping.email|`Email`|
|saml.sp.user.mapping.firstName|`GivenName`|
|saml.sp.user.mapping.id|`Subject/NameID`|
|saml.sp.user.mapping.lastName|`Surname`|
|spSigningCredentialStatus|`missing`|
|saml.sp.slo.request.nameid.format| |

The following is the attribute available for `Alfresco:Type=Configuration, Category=SAML, Object Type=SAML$manager`:

|Attribute|Example|
|--------------|-------------|
|chain|`share:share,rest-api:repository,aos:repository`|

A [complete list of of Alfresco MBeans]({% link content-services/latest/admin/jmx-reference.md %}) is also available.

{% endcapture %}

{% include tabs.html tableid="share" opt1="Admin Console" content1= share-admin opt2="Properties" content2=share-properties opt3="JMX" content3=share-jmx %}

### Authenticate users for Alfresco Share

After configuring SAML in Alfresco for Share, you can test that everything is set up correctly by doing the following:

1. Verify that the administrator email address is configured correctly in the identity provider.

2. Login to Alfresco Share as the administrator: `http://localhost:8080/share`

    You should get redirected to the login page for the identtiy provider.

3. Enter the administrator's credentials.

    You should get redirected to Alfresco Share.

4. Log out of Alfresco Share.

    If you navigate to your identity provider page, you should also be logged out.

## Alfresco REST API

> **Note**: When SAML is enforced for the REST API any web script authentication calls to the repository will be rejected. A valid authentication ticket can only be [obtained via SAML](#authenticate-users-for-the-rest-api), or an administrator can log into the Admin Console using basic authentication.

{% capture rest-admin %}

### Configure the REST API using the Admin Console

Administrators can enable and configure SAML authentication for the REST API using the Admin Console.

> **Important:** If you enable and enforce SAML for the REST API, all applications using the REST API (such as Alfresco Share) will use SAML as well. This means that Alfresco Share must also have SAML enabled and enforced if the REST API is. The enforce option is ignored if SAML is disabled for the REST API.

1. Log on to the SAML page of the Alfresco Admin Console with your user credentials: `http://localhost:8080/alfresco/service/enterprise/admin/admin-saml`

2. Select the **REST API** tab.

3. Select **Enable SAML (SSO) Authentication**.

4. (Optional) Select **Enforce SAML Login**.

    If this option is selected by default then all logins to this service provider must use the Identity Provider (IdP). If you do not enforce the SAML login, the user can decide to use either the Alfresco login or login using the IdP link.

5. Specify the **Identity Provider (IdP) Description**.

    This description is shown to users as an alternate login option when **Enforce SAML Login** is deactivated. If no description is provided, the text will read **your single sign-on provider**. Clicking on this description will redirect you to the IdP.

6. Enter the IdP settings:

    | Setting | Description |
    | ------- | ----------- |
    | IdP Authentication Request Service URL | The address where the authentication request is sent. This redirects you to the identity provider login page. For example: `https://pingfederate.alfresco.me:9031/idp/SSO.saml2` |
    | IdP Single Logout Request Service URL | The address where the logout request is sent when logging out of Alfresco. This logs you out of Alfresco and any other applications that use your SSO setup. For example: `https://pingfederate.alfresco.me:9031/idp/SLO.saml2` |
    | IdP Single Logout Response Service URL | The address where the logout response is sent when the identity provider gets a logout request. For example: `https://pingfederate.alfresco.me:9031/idp/SLO.saml2` |
    | Entity Identification (Issuer) | Some IdPs use the issuer to determine which service provider connection to use. If you are using ADFS, this is the Base URL, for example: `http://localhost:8080/share`. |
    | User ID Mapping | The SAML attribute that maps to an Alfresco User ID. For PingFederate, this maps to `PersonImmutableID`. For ADFS, the SAML attribute is the `Subject/NameID` specified for the SAML subject `NameID`. |

7. Click **Upload IdP Certificate** to browse to and upload the IdP certificate that you downloaded from your identity provider during configuration.

    **IdP Certificate Status** shows whether the certificate is valid, and the expiry date of the current certificate.

    > **Note**: Alfresco Content Services does not allow you to upload an expired certificate.

    > **Note:** If SAML is enabled, Alfresco always checks for an existing certificate.

8. Click **Download SP Certificate** to download the certificate required by your IdP.

    This is a copy of your self-signed certificate. You should have already downloaded this information when setting up your connections in the IdP.

9. Click **Download SP Metadata** if you need to download the service provider signature verification certificate.

    This is required for ADFS configuration, if you are using ADFS as your IdP.

10. Click **Save**.

You can disable these settings by deselecting **Enable SAML (SSO) Authentication**.

If you want to check if SAML is enabled (or enforced) in your Alfresco server, make a call to:

```http
http://localhost:8080/alfresco/service/saml/-default-/rest-api/enabled
```

where:`-default-` is the tenant name and `rest-api` is the id of the SAML REST API service provider

This will return a JSON response with the information about the REST API service provider, for example:

```json
{
    "entry":
    { 
      "isSamlEnabled": true,
      "isSamlEnforced": true,
      "idpDescription": ".....",
      "tenantDomain": "...."
    }
}
```
{% endcapture %}

{% capture rest-properties %}

### Configure the REST API using the `alfresco-global.properties` file

Administrators can enable and configure SAML authentication for the REST API using the `<classpathRoot>/alfresco-global.properties` file and a combination of subsystem properties files. Use this as an alternative to configuring SAML using the Admin Console.

To configure the REST API, create the properties file in the` <classpathRoot>/alfresco/extension/subsystems/SAML/repository/rest-api/my-custom-rest-api-sp.properties` directory.

The default `saml.properties` file can be found in the `<TOMCAT_HOME>/webapps/alfresco/WEB-INF/classes/alfresco/subsystems/SAML/repository` directory. Use this file to copy the SAML settings into your `<classpathRoot>/alfresco/extension/subsystems/SAML/repository/rest-api/my-custom-rest-api-sp.properties` file.

**Note:** Changes to `<classpathRoot>/alfresco-global.properties` are applicable in a single service provider scenario only.

If you use multiple service providers, use subsystem extensions for type and instance. For example, for the REST API service provider, create a `my-custom-rest-api-sp.properties` file with the classpath: `<TOMCAT_HOME>/shared/classes/alfresco/extension/subsystems/SAML/repository/rest-api/my-custom-rest-api-sp.properties`.

1. Locate the `<TOMCAT_HOME>/webapps/alfresco/WEB-INF/classes/alfresco/subsystems/SAML/repository/saml.properties` file.

    These are the settings:

    ```bash
    #SAML key store configuration
    saml.keystore.location=classpath:alfresco/keystore/saml.keystore
    saml.keystore.keyMetaData.location=classpath:alfresco/keystore/saml-keystore-passwords.properties
    saml.keystore.provider=
    saml.keystore.type=JCEKS

    # Time, in milliseconds, that message state is valid
    # 300000 = 5 minutes
    saml.message.state.duration.in.millis=300000
    # Clock skew - the number of seconds before a lower time bound, or after an upper time bound, to consider still acceptable.
    saml.issueInstantRule.check.clock.skew.in.seconds=60
    # Number of seconds after a message issue instant after which the message is considered expired  expires
    saml.issueInstantRule.check.expiration.in.seconds=30

    # It is RECOMMENDED that a system entity use a URL containing its own domain name to identify itself
    saml.sp.idp.spIssuer.namePrefix=

    # The SAML attribute (or 'Subject/NameID' for SAML subject NameID) to map to the Alfresco user's ID
    saml.sp.user.mapping.id=Subject/NameID

    # The SAML attribute to map to the Alfresco user's email
    saml.sp.user.mapping.email=Email

    # The SAML attribute to map to the Alfresco user's first name
    saml.sp.user.mapping.firstName=GivenName

    # The SAML attribute to map to the Alfresco user's last name
    saml.sp.user.mapping.lastName=Surname

    # Whether or not SAML is enabled for the service provider
    saml.sp.isEnabled=false

    # Whether or not SAML login is enforced
    saml.sp.isEnforced=false

    # IdP description if you choose to enforce SAML login
    saml.sp.idp.description=

    # IdP URL to which the Authentication Request from Alfresco is posted for the service provider
    saml.sp.idp.sso.request.url=

    # IdP URL to which a logout *request* from Alfresco is posted when logging out from the service provider
    saml.sp.idp.slo.request.url=

    # IdP URL to which a logout *response* from Alfresco is posted when receiving a logout request from your IdP for the service provider
    saml.sp.idp.slo.response.url=

    # Path to the certificate used to validate the requests and responses from the IdP
    saml.sp.idp.certificatePath=

    # Entity identification (issuer) for the service provider.  Some IdPs may use this to determine which SP connection to use.
    saml.sp.idp.spIssuer=

    # Provide a ticket to the user after authentication
    saml.sp.outcome.provideTicket=true

    # Establish a session after authentication
    saml.sp.outcome.establishSession=true

    # Some IdPs, like LemonLDAP, may require a specific format for NameID section of the logout request.
    saml.sp.slo.request.nameid.format=
    ```

2. To enable SAML, use these settings in your `<classpathRoot>/alfresco/extension/subsystems/SAML/repository/rest-api/my-custom-rest-api-sp.properties` file:

    ```bash
    saml.sp.isEnabled=true
    saml.sp.isEnforced=false
    saml.sp.idp.description=<Identity Provider>
    ```

    * `saml.sp.isEnabled` specifies whether or not SAML is enabled for the service provider.

    * `saml.sp.isEnforced` accepts a boolean value and specifies whether or not SAML login is enforced. If set to `false`, SAML login is not enforced.

    * `saml.sp.idp.description` accepts a string value and specifies the IdP description at the login screen if you choose to not enforce SAML login.

3. Set the Identity Provider (IdP) settings:

    * `saml.sp.idp.sso.request.url`: The address where the authentication request is sent. This redirects you to the identity provider login page.
    * `saml.sp.idp.slo.request.url`: The address where the logout request is sent when logging out of Alfresco. This logs you out of Alfresco and any other applications that use your SSO setup.
    * `saml.sp.idp.slo.response.url`: The address where the logout response is sent when the identity provider gets a logout request.
    * `saml.sp.idp.spIssuer`: Some IdPs use the issuer to determine which service provider connection to use.
    * `saml.sp.user.mapping.id`: The SAML attribute that maps to an Alfresco User ID. The SAML attribute is the `Subject/NameID` specified for the SAML subject `NameID`.

4. Enter a path to the certificate: `saml.sp.idp.certificatePath`

    > **Note:** If SAML is enabled, Alfresco always checks for a existing certificate.

5. Review the other SAML settings in the saml.properties file to understand if they apply to your setup.

6. Save and close all the properties files, and restart Alfresco to apply your changes.

{% endcapture %}

{% capture rest-jmx %}

### Configure the REST API using JMX

JMX values (Managed Bean or MBean attributes) are exposed in the Alfresco Admin Console and with internal tools (Alfresco JMX Dump) or external tools like JConsole. The SAML Module beans are described here with their default values.

> **Note**: Example values are given. Always check the values in your own system as these can vary depending on the install method or operating system.

> **Important**: Be aware that any changes you make to attributes in the live system are written to the database. The next time that Alfresco starts, these values will take precedence over any values specified in properties files.

The following are the attributes available for `Alfresco:Type=Configuration, Category=SAML, Object Type=SAML$managed$rest-api`:

|Attribute |Example|
|--------------|-------------|
|$type|`repository`|
|idpCertificateExpiryDate| |
|idpCertificateSerialNumber| |
|idpCertificateStatus|`missing`|
|idpCertificateSubject| |
|instancePath|`[managed, rest-api]`|
|saml.issueInstantRule.check.clock.skew.in.seconds|`60`|
|saml.issueInstantRule.check.expiration.in.seconds|`30`|
|saml.keystore.keyMetaData.location|`classpath:alfresco/keystore/saml-keystore-passwords.properties`|
|saml.keystore.location|`classpath:alfresco/keystore/saml.keystore`|
|saml.keystore.provider| |
|saml.keystore.type|`JCEKS`|
|saml.message.state.duration.in.millis|`300000`|
|saml.share.spSloRequestURLSuffix|`/saml-logoutrequest`|
|saml.share.spSloResponseURLSuffix|`/saml-logoutresponse`|
|saml.share.spSsoURLSuffix|`/saml-authnresponse`|
|saml.sp.idp.certificatePath|Set the path to the certificate you require|
|saml.sp.idp.slo.request.url| |
|saml.sp.idp.slo.response.url| |
|saml.sp.idp.spIssuer| |
|saml.sp.idp.spIssuer.namePrefix| |
|saml.sp.idp.sso.request.url| |
|saml.sp.isEnabled|`false`|
|saml.sp.isEnforced|`true`|
|saml.sp.idp.description|`<Identity Provider>`|
|saml.sp.user.mapping.email|`Email`|
|saml.sp.user.mapping.firstName|`GivenName`|
|saml.sp.user.mapping.id|`Subject/NameID`|
|saml.sp.user.mapping.lastName|`Surname`|
|spSigningCredentialStatus|`missing`|
|saml.sp.slo.request.nameid.format| |

The following is the attribute available for `Alfresco:Type=Configuration, Category=SAML, Object Type=SAML$manager`:

|Attribute|Example|
|--------------|-------------|
|chain|`share:share,rest-api:repository,aos:repository`|

A [complete list of of Alfresco MBeans]({% link content-services/latest/admin/jmx-reference.md %}) is also available.

{% endcapture %}

{% include tabs.html tableid="rest" opt1="Admin Console" content1= rest-admin opt2="Properties" content2=rest-properties opt3="JMX" content3=rest-jmx %}

### Authenticate users for the REST API

After configuring SAML for REST API requests in Alfresco users need to be authenticated via SAML before making any REST API requests.

Without authenticating the user, if you try to access any of the SAML-protected URLs, for example: `https://localhost:8443/alfresco/api/-default-/public/alfresco/versions/1/sites`

An 401 unauthorized response will be returned, for example:

```json
{
    "status" :
  {
    "code" : 401,
    "name" : "Unauthorized",
    "description" : "The request requires HTTP authentication."
  }, 
  
  "message" : "02210007 Authentication failed for Web Script org\/alfresco\/api\/ResourceWebScript.get", 
  "exception" : "org.springframework.extensions.webscripts.WebScriptException - 02210007 Authentication failed for Web Script org\/alfresco\/api\/ResourceWebScript.get",
 
  "callstack" :
  [
          ""      ,"org.springframework.extensions.webscripts.WebScriptException: 02210007 Authentication failed for Web Script org\/alfresco\/api\/ResourceWebScript.get"
      ,"org.alfresco.repo.web.scripts.RepositoryContainer.executeScriptInternal(RepositoryContainer.java:404)"
      ,"org.alfresco.repo.web.scripts.RepositoryContainer.executeScript(RepositoryContainer.java:281)"
      ...
      ,"org.apache.tomcat.util.net.JIoEndpoint$SocketProcessor.run(JIoEndpoint.java:310)"
      ,"java.util.concurrent.ThreadPoolExecutor.runWorker(ThreadPoolExecutor.java:1142)"
      ,"java.util.concurrent.ThreadPoolExecutor$Worker.run(ThreadPoolExecutor.java:617)"
      ,"java.lang.Thread.run(Thread.java:745)"
  ],
 
  "server" : "Enterprise v5.0.3 (r122151-b84) schema 8 040",
  "time" : "21 mars 2017 11:45:44"
}
```

Use the following to authenticate a user via SAML:

1. Navigate to `https://localhost:8443/alfresco/service/saml/-default-/rest-api/authenticate` in a browser. This can either be a webview component in a mobile or desktop application or within an iframe in a web application.

    You will be redirected to your identity provider's login page.

2. Enter your login credentials.

    If the identity provider has accepted the credentials, the browser will be redirected to `https://localhost:8443/alfresco/service/saml/-default-/rest-api/authenticate-response`.

3. Start making authenticated requests. You have two ways to make requests to the repository:

    * Use the `alf_ticket` contained in the JSON file returned by the `/authenticate-response`. A desktop or mobile application that is running the SAML authentication in a webview can access the content of this webview and grab the `alf_ticket` from the JSON file. This can then be used to make requests, such as `curl https://localhost:8443/alfresco/api/-default-/public/alfresco/versions/1/sites?alf_ticket=TICKET_ed6db2aca17e94864799c9849780f66c0a738e9b`

    * Use the authentication cookie. A web application has typically no access to the content of an iframe. So you are not able to read the `alf_ticket` from the `/authenticate-response`.

To logout from using REST API, use the following `/logout-request`:

```http
https://localhost:8443/alfresco/service/saml/-default-/rest-api/logout-request?alf_ticket=TICKET_17196d7019fc1704ed29a270bf4f54598393abdc
```

with a response of:

```json
{"entry":{}}
```

The SAML ticket is now invalid and the user can no longer access Alfresco.

## Alfresco Office Services (AOS)

{% capture aos-admin %}

### Configure AOS using the Admin Console

Administrators can enable and configure SAML authentication using the Alfresco Admin Console.

1. Log in to the SAML page of the Alfresco Admin Console with your user credentials: `http://localhost:8080/alfresco/service/enterprise/admin/admin-saml`

2. Select the **AOS** tab.

3. Select **Enable SAML (SSO) Authentication**.

    SAML Status shows whether SAML is currently enabled or disabled.

4. Specify the **Identity Provider (IdP) Description**.

5. Enter the IdP settings:

    | Setting | Description |
    | ------- | ----------- |
    | IdP Authentication Request Service URL | The address where the authentication request is sent. This redirects you to the identity provider login page. For example: `https://pingfederate.alfresco.me:9031/idp/SSO.saml2` |
    | IdP Single Logout Request Service URL | The address where the logout request is sent when logging out of Alfresco. This logs you out of Alfresco and any other applications that use your SSO setup. For example: `https://pingfederate.alfresco.me:9031/idp/SLO.saml2` |
    | IdP Single Logout Response Service URL | The address where the logout response is sent when the identity provider gets a logout request. For example: `https://pingfederate.alfresco.me:9031/idp/SLO.saml2` |
    | Entity Identification (Issuer) | Some IdPs use the issuer to determine which service provider connection to use. If you are using ADFS, this is the Base URL, for example: `http://localhost:8080/share`. |
    | User ID Mapping | The SAML attribute that maps to an Alfresco User ID. For PingFederate, this maps to `PersonImmutableID`. For ADFS, the SAML attribute is the `Subject/NameID` specified for the SAML subject `NameID`. |

6. Click **Upload IdP Certificate** to browse to and upload the IdP certificate that you downloaded from your identity provider during configuration.

    **IdP Certificate Status** shows whether the certificate is valid, and the expiry date of the current certificate.

    > **Note**: Alfresco Content Services does not allow you to upload an expired certificate.

    > **Note:** If SAML is enabled, Alfresco always checks for an existing certificate.

7. Click **Download SP Certificate** to download the certificate required by your IdP.

    This is a copy of your self-signed certificate. You should have already downloaded this information when setting up your connections in the IdP.

8. Click **Download SP Metadata** if you need to download the service provider signature verification certificate.

    This is required for AD S configuration, if you are using ADFS as your IdP.

9. Click **Save**.

You can disable these settings by deselecting **Enable SAML (SSO) Authentication**.

{% endcapture %}

{% capture aos-properties %}

### Configure AOS using the `alfresco-global.properties` file

Administrators can enable and configure SAML authentication for AOS using the `<classpathRoot>/alfresco-global.properties` file and a combination of subsystem properties files. Use this as an alternative to configuring SAML using the Admin Console.

To configure AOS, create the properties file in the` <classpathRoot>/alfresco/extension/subsystems/SAML/repository/aos/my-custom-aos-sp.properties` directory.

The default `saml.properties` file can be found in the `<TOMCAT_HOME>/webapps/alfresco/WEB-INF/classes/alfresco/subsystems/SAML/repository` directory. Use this file to copy the SAML settings into your `<classpathRoot>/alfresco/extension/subsystems/SAML/repository/aos/my-custom-aos-sp.properties` file.

**Note:** Changes to `<classpathRoot>/alfresco-global.properties` are applicable in a single service provider scenario only.

If you use multiple service providers, use subsystem extensions for type and instance. For example, for the REST API service provider, create a `my-custom-aos-sp.properties` file with the classpath: `<TOMCAT_HOME>/shared/classes/alfresco/extension/subsystems/SAML/repository/aos/my-custom-aos-sp.properties`.

1. Locate the `<TOMCAT_HOME>/webapps/alfresco/WEB-INF/classes/alfresco/subsystems/SAML/repository/saml.properties` file.

    These are the settings:

    ```bash
    #SAML key store configuration
    saml.keystore.location=classpath:alfresco/keystore/saml.keystore
    saml.keystore.keyMetaData.location=classpath:alfresco/keystore/saml-keystore-passwords.properties
    saml.keystore.provider=
    saml.keystore.type=JCEKS

    # Time, in milliseconds, that message state is valid
    # 300000 = 5 minutes
    saml.message.state.duration.in.millis=300000
    # Clock skew - the number of seconds before a lower time bound, or after an upper time bound, to consider still acceptable.
    saml.issueInstantRule.check.clock.skew.in.seconds=60
    # Number of seconds after a message issue instant after which the message is considered expired  expires
    saml.issueInstantRule.check.expiration.in.seconds=30

    # It is RECOMMENDED that a system entity use a URL containing its own domain name to identify itself
    saml.sp.idp.spIssuer.namePrefix=

    # The SAML attribute (or 'Subject/NameID' for SAML subject NameID) to map to the Alfresco user's ID
    saml.sp.user.mapping.id=Subject/NameID

    # The SAML attribute to map to the Alfresco user's email
    saml.sp.user.mapping.email=Email

    # The SAML attribute to map to the Alfresco user's first name
    saml.sp.user.mapping.firstName=GivenName

    # The SAML attribute to map to the Alfresco user's last name
    saml.sp.user.mapping.lastName=Surname

    # Whether or not SAML is enabled for the service provider
    saml.sp.isEnabled=false

    # Whether or not SAML login is enforced
    saml.sp.isEnforced=false

    # IdP description if you choose to enforce SAML login
    saml.sp.idp.description=

    # IdP URL to which the Authentication Request from Alfresco is posted for the service provider
    saml.sp.idp.sso.request.url=

    # IdP URL to which a logout *request* from Alfresco is posted when logging out from the service provider
    saml.sp.idp.slo.request.url=

    # IdP URL to which a logout *response* from Alfresco is posted when receiving a logout request from your IdP for the service provider
    saml.sp.idp.slo.response.url=

    # Path to the certificate used to validate the requests and responses from the IdP
    saml.sp.idp.certificatePath=

    # Entity identification (issuer) for the service provider.  Some IdPs may use this to determine which SP connection to use.
    saml.sp.idp.spIssuer=

    # Provide a ticket to the user after authentication
    saml.sp.outcome.provideTicket=true

    # Establish a session after authentication
    saml.sp.outcome.establishSession=true

    # Some IdPs, like LemonLDAP, may require a specific format for NameID section of the logout request.
    saml.sp.slo.request.nameid.format=
    ```

2. To enable SAML, use these settings in your `<classpathRoot>/alfresco/extension/subsystems/SAML/repository/aos/my-custom-aos-sp.properties` file:

    ```bash
    saml.sp.isEnabled=true
    saml.sp.isEnforced=false
    saml.sp.idp.description=<Identity Provider>
    ```

    * `saml.sp.isEnabled` specifies whether or not SAML is enabled for the service provider.

    * `saml.sp.isEnforced` accepts a boolean value and specifies whether or not SAML login is enforced. If set to `false`, SAML login is not enforced.

    * `saml.sp.idp.description` accepts a string value and specifies the IdP description at the login screen if you choose to not enforce SAML login.

3. Set the Identity Provider (IdP) settings:

    * `saml.sp.idp.sso.request.url`: The address where the authentication request is sent. This redirects you to the identity provider login page.
    * `saml.sp.idp.slo.request.url`: The address where the logout request is sent when logging out of Alfresco. This logs you out of Alfresco and any other applications that use your SSO setup.
    * `saml.sp.idp.slo.response.url`: The address where the logout response is sent when the identity provider gets a logout request.
    * `saml.sp.idp.spIssuer`: Some IdPs use the issuer to determine which service provider connection to use.
    * `saml.sp.user.mapping.id`: The SAML attribute that maps to an Alfresco User ID. The SAML attribute is the `Subject/NameID` specified for the SAML subject `NameID`.

4. Enter a path to the certificate: `saml.sp.idp.certificatePath`

    > **Note:** If SAML is enabled, Alfresco always checks for a existing certificate.

5. Review the other SAML settings in the `saml.properties` file to understand if they apply to your setup.

6. Save and close all the properties files, and restart Alfresco to apply your changes.

{% endcapture %}

{% capture aos-jmx %}

### Configure AOS using JMX

JMX values (Managed Bean or MBean attributes) are exposed in the Alfresco Admin Console and with internal tools (Alfresco JMX Dump) or external tools like JConsole. The SAML Module beans are described here with their default values.

> **Note**: Example values are given. Always check the values in your own system as these can vary depending on the install method or operating system.

> **Important**: Be aware that any changes you make to attributes in the live system are written to the database. The next time that Alfresco starts, these values will take precedence over any values specified in properties files.

The following are the attributes available for `Alfresco:Type=Configuration, Category=SAML, Object Type=SAML$managed$aos`:

|Attribute |Example|
|--------------|-------------|
|$type|`repository`|
|idpCertificateExpiryDate| |
|idpCertificateSerialNumber| |
|idpCertificateStatus|`missing`|
|idpCertificateSubject| |
|instancePath|`[managed, aos]`|
|saml.issueInstantRule.check.clock.skew.in.seconds|`60`|
|saml.issueInstantRule.check.expiration.in.seconds|`30`|
|saml.keystore.keyMetaData.location|`classpath:alfresco/keystore/saml-keystore-passwords.properties`|
|saml.keystore.location|`classpath:alfresco/keystore/saml.keystore`|
|saml.keystore.provider| |
|saml.keystore.type|`JCEKS`|
|saml.message.state.duration.in.millis|`300000`|
|saml.share.spSloRequestURLSuffix|`/saml-logoutrequest`|
|saml.share.spSloResponseURLSuffix|`/saml-logoutresponse`|
|saml.share.spSsoURLSuffix|`/saml-authnresponse`|
|saml.sp.idp.certificatePath|Set the path to the certificate you require|
|saml.sp.idp.slo.request.url| |
|saml.sp.idp.slo.response.url| |
|saml.sp.idp.spIssuer| |
|saml.sp.idp.spIssuer.namePrefix| |
|saml.sp.idp.sso.request.url| |
|saml.sp.isEnabled|`false`|
|saml.sp.isEnforced|`true`|
|saml.sp.idp.description|`<Identity Provider>`|
|saml.sp.user.mapping.email|`Email`|
|saml.sp.user.mapping.firstName|`GivenName`|
|saml.sp.user.mapping.id|`Subject/NameID`|
|saml.sp.user.mapping.lastName|`Surname`|
|spSigningCredentialStatus|`missing`|
|saml.sp.slo.request.nameid.format| |

The following is the attribute available for `Alfresco:Type=Configuration, Category=SAML, Object Type=SAML$manager`:

|Attribute|Example|
|--------------|-------------|
|chain|`share:share,rest-api:repository,aos:repository`|

A [complete list of of Alfresco MBeans]({% link content-services/latest/admin/jmx-reference.md %}) is also available.

{% endcapture %}

{% include tabs.html tableid="aos" opt1="Admin Console" content1= aos-admin opt2="Properties" content2=aos-properties opt3="JMX" content3=aos-jmx %}

### Authenticate users for AOS

After configuring SAML for AOS, you can test that everything is set up correctly.

1. Verify that the administrator email address is configured correctly in the IdP.

2. Login to Share as the administrator: `http://localhost:8080/share`

    You should get redirected to the identity provider login page.

3. Enter your user credentials.

    You should be redirected to Alfresco Share.

4. For a given site, go to the Document Library.

5. Hover over a file you want to edit and click **More** then **Edit in Microsoft Office**.

6. The MS Office file opens the IdP login page in a separate window.

7. Enter your user credentials again.

8. The file is now open and you can edit it, as needed.

9. Additionally, you can also map the AOS network drive in Windows Explorer or Finder. You will be presented with a repository to browse.

10. Log out of Alfresco Share.

    If you go back to your IdP page, you should also be logged out.

    > **Note**: After logging out of Alfresco Share, you won't be able to access the recent history in Office files or map to the AOS network drive.
