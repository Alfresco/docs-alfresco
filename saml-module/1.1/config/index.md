---
title: Overview of the SAML Module configuration
---

To use SAML for Alfresco Content Services an identity provider and service providers need to be setup and configured. Three service providers exist on startup of SAML: Alfresco Share, Alfresco Office Services and the REST API.

Irrespective of the service provider you are using, configure your connection in this order:

1. Configure an identity provider.

    >**Note**: Alfresco should work with any identity provider that supports SAML 2.0, however example instructions for configuring PingFederate or ADFS are provided.

2. Download your identity provider certificate from the identity provider.
3. Configure SAML in Alfresco in one of the following ways:
    * Using the Alfresco Admin Console
    * In configuration files, such as `alfresco-global.properties`
    * Dynamically, using JMX if enabled

> **Note:** Ensure that users are created in Alfresco before attempting to log on using SAML. Users that are disabled or de-authorized can't log in.

User authentication is handled differently depending on whether SAML is enforced, enabled or both:

| Enabled | Enforced | Action |
| ------- | -------- | ------ |
|Yes|Yes|SAML is enabled and enforced. User is authenticated through SAML and is redirected to the identity provider login page.|
|No|Yes|SAML is disabled. User is authenticated either using Share login or basic authentication.|
|Yes|No|User can choose either to use Share login or to login using the identity provider.|
|No|No|SAML is disabled. User is authenticated either using Share login or basic authentication.|
