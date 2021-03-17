---
author: Alfresco Documentation
---

# Configuring SAML SSO

Use this information to configure SAML SSO between Alfresco and your identity provider.

This involves setting up the exchange of metadata between the identity provider \(IdP\) and the service provider \(SP\). The IdP metadata includes the required IdP URLs and the certificate.

Out-of-the-box, the SAML SSO for Alfresco Content Services provides the following service providers:

-   Share
-   REST API
-   AOS

Irrespective of the service provider you are using, configure your connection in this order:

1.  Configure your IdP. Alfresco should work with any IdP that supports SAML 2.0, however detailed instructions for configuring PingFederate and AD FS only are explained in these topics.
2.  Download your IdP certificate from your IdP.
3.  Configure SAML SSO in Alfresco. You can set the Alfresco settings in one of the following ways:
    -   Using the Alfresco Admin Console
    -   In configuration files, such as alfresco-global.properties and other subsystem configuration files
    -   Dynamically, using JMX, if enabled

**Note:** Ensure that users are created in Alfresco before attempting to log on using SAML. Users that are disabled or deauthorized can't log in.

Depending on whether SAML is enabled and/or enforced, SAML may or may not be enabled and enforced. The following table shows how the user is authenticated in different SAML enabled and enforced states.

|SAML enabled|SAML enforced|Action|
|------------|-------------|------|
|Yes|Yes|SAML is enabled and enforced.User is authenticated through SAML and is redirected to the IdP login page.

|
|No|Yes|SAML is disabled.User is authenticated using either using Share login or basic authentication.

|
|Yes|No|User can choose either to use Share login or to login using the IdP.|
|No|No|SAML is disabled.User is authenticated using either using Share login or basic authentication.

|

Make sure that you configure the components in the order specified.

-   **[Step 1. Configuring the identity provider](../concepts/config-IdP.md)**  
Use this information to configure your identity provider.
-   **[Step 2. Configure SAML SSO in Alfresco](../concepts/config-SP.md)**  
Use this information to configure SAML SSO in Alfresco for different SPs, such as Share, REST API, or AOS.

**Parent topic:**[SAML Single Sign-On \(SSO\) for Alfresco Content Services 1.0.3](../concepts/saml-overview.md)

