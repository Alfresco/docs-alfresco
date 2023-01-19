---
title: SAML Module for Alfresco Content Services
---

> **Important**: Starting from ACS 7.3 the module is no more required, SAML support is delegated to Alfresco Identity Service configuration. Please refer to [Identity Service single sign on (SSO) guide]({% link identity-service/latest/tutorial/sso/saml.md %}) when setting up SAML authentication and SSO capabilities. A [SAML SSO guide](https://docs.alfresco.com/identity-service/latest/tutorial/sso-v1/saml/) can be also found for 7.2 and older versions of Alfresco. 

You can use Security Assertion Markup Language (SAML) with Alfresco to support SAML authentication for Content Services.

SAML standards define an XML-based framework for describing and exchanging security information between an identity provider (IdP) and service provider (SP).

Security information is expressed in the form of portable SAML assertions that applications working across security boundaries can trust.

Alfresco Share uses Web Browser SSO and Single-Logout (SLO) profiles, using the HTTP Post Binding only.

SAML is based on a trust relationship between an IdP (for example, PingFederate or AD FS) and an SP (for example, Alfresco Share) who agree to share authentication information; for example, metadata and configuration information that is required to access services.

Alfresco uses SAML 2.0. See [OASIS SAML v2.0](https://wiki.oasis-open.org/security/FrontPage){: target="_blank"} for more information on SAML specifications.

This diagram explains the exchange of information between the service provider (in this case, Alfresco Share), and the identity provider (in this case, PingFederate):

![An overview of SAML information exchange]({% link saml-module/images/overview.png %})
