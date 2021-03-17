---
author: Alfresco Documentation
---

# Configuring SAML SSO settings for AOS using properties files

Administrators can enable and configure SAML SSO authentication for AOS using the <classpathRoot\>/alfresco-global.properties file and a combination of subsystem properties files. Use this as an alternative to configuring SAML SSO using the Admin Console.

To configure AOS, create the properties file in the following folder structure:

```
<classpathRoot>/alfresco/extension/subsystems/SAML/repository/aos/my-custom-aos-sp.properties
```

The default saml.properties file for `repository` type can be found in the <TOMCAT\_HOME\>/webapps/alfresco/WEB-INF/classes/alfresco/subsystems/SAML/repository directory. Use this file to copy the SAML settings into your <classpathRoot\>/alfresco/extension/subsystems/SAML/repository/aos/my-custom-aos-sp.properties file, as an alternative to setting these in the Admin Console.

**Note:** Changes to <classpathRoot\>/alfresco-global.properties, are applicable in a single service provider scenario only.

If you use multiple service providers, use subsystem extensions for type and instance. For example, for the AOS service provider, create a my-custom-aos-sp.properties file with the following classpath:

```
<TOMCAT_HOME>/shared/classes/alfresco/extension/subsystems/SAML/repository/
aos/my-custom-aos-sp.properties
```

1.  Locate the <TOMCAT\_HOME\>/webapps/alfresco/WEB-INF/classes/alfresco/subsystems/SAML/repository/saml.properties file.

    These are the settings:

    ```
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
    
    # TODO will be used for user provisioning (SAML-175)
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

2.  To enable SAML, use these settings in your <classpathRoot\>/alfresco/extension/subsystems/SAML/repository/aos/my-custom-aos-sp.properties file:

    ```
    saml.sp.isEnabled=true
    saml.sp.isEnforced=false
    saml.sp.idp.description=<Identity Provider>
    ```

    where:

    `saml.sp.isEnabled` specifies whether or not SAML is enabled for the service provider.

    `saml.sp.isEnforced` accepts a boolean value and specifies whether or not SAML login is enforced. If set to `false`, SAML login is not enforced.

    `saml.sp.idp.description` accepts a string value and specifies the IdP description at the login screen if you choose to not enforce SAML login.

3.  Set the Identity Provider \(IdP\) settings:

    -   `saml.sp.idp.sso.request.url`: The address where the authentication request is sent. This redirects you to the identity provider login page.
    -   `saml.sp.idp.slo.request.url`: The address where the logout request is sent when logging out of Alfresco. This logs you out of Alfresco and any other applications that use your SSO setup.
    -   `saml.sp.idp.slo.response.url`: The address where the logout response is sent when the identity provider gets a logout request.
    -   `saml.sp.idp.spIssuer`: Some IdPs use the issuer to determine which service provider connection to use.
    -   `saml.sp.user.mapping.id`: The SAML attribute that maps to an Alfresco User ID. The SAML attribute is the `Subject/NameID` specified for the SAML subject `NameID`.
4.  Enter a path to the certificate: `saml.sp.idp.certificatePath`

    **Note:** If SAML is enabled, Alfresco always checks for a existing certificate.

5.  Review the other SAML settings in the saml.properties file to understand if they apply to your setup.

6.  Save and close all the properties files, and restart Alfresco to apply your changes.


You have configured the SAML settings for AOS.

You can also configure your settings dynamically using JMX. Remote JMX connectivity is disabled by default in Alfresco. See [Using a JMX client to change settings dynamically](http://docs.alfresco.com/5.1/concepts/jmx-intro-config.html) for more information about JMX.

**Parent topic:**[Configuring SAML SSO for AOS](../concepts/config-saml-aos.md)

