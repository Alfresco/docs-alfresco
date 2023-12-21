---
title: SAML Module for Alfresco Content Services
---

> **Important:** It is recommended to use the SAML Module in conjunction with the [Identity Service single sign on (SSO) guide]({% link identity-service/1.8/tutorial/sso-v1/saml.md %}) when setting up SAML authentication and SSO capabilities. Check the compatibility of your installed products as the SAML configuration has changed since Alfresco Content Services 7.3:
>
> * [Supported platforms for SAML Module]({% link saml-module/latest/support/index.md %})
> * [Supported platforms for Identity Service]({% link identity-service/1.8/support/index.md %})

You can use Security Assertion Markup Language (SAML) with Alfresco to support SAML authentication for Content Services.

SAML standards define an XML-based framework for describing and exchanging security information between an identity provider (IdP) and service provider (SP).

Security information is expressed in the form of portable SAML assertions that applications working across security boundaries can trust.

Alfresco Share uses Web Browser SSO and Single-Logout (SLO) profiles, using the HTTP Post Binding only.

SAML is based on a trust relationship between an IdP (for example, PingFederate or AD FS) and an SP (for example, Alfresco Share) who agree to share authentication information; for example, metadata and configuration information that is required to access services.

Alfresco uses SAML 2.0. See [OASIS SAML v2.0](https://wiki.oasis-open.org/security/FrontPage){: target="_blank"} for more information on SAML specifications.

> **Note:** The SAML Module for Alfresco Content Services 1.2 can be applied to Alfresco Content Services 6.2 - 7.0 only.

This diagram explains the exchange of information between the service provider (in this case, Alfresco Share), and the identity provider (in this case, PingFederate):

![An overview of SAML information exchange]({% link saml-module/images/overview.png %})
