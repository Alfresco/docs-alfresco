---
title: SAML Module for Alfresco Content Services
---

> **Important**: It is recommended to use the SAML Module in conjunction with the [Identity Service](LINK) when setting up SAML authentication.

You can use Security Assertion Markup Language (SAML) with Alfresco to support SAML authentication for Content Services.

SAML standards define an XML-based framework for describing and exchanging security information between an identity provider (IdP) and service provider (SP).

Security information is expressed in the form of portable SAML assertions that applications working across security boundaries can trust.

Alfresco Share uses Web Browser SSO and Single-Logout (SLO) profiles, using the HTTP Post Binding only.

SAML is based on a trust relationship between an IdP (for example, PingFederate or AD FS) and an SP (for example, Alfresco Share) who agree to share authentication information; for example, metadata and configuration information that is required to access services.

Alfresco uses SAML 2.0. See [OASIS SAML v2.0](https://wiki.oasis-open.org/security/FrontPage){: target="_blank"} for more information on SAML specifications.

This diagram explains the exchange of information between the service provider (in this case, Alfresco Share), and the identity provider (in this case, PingFederate):

![An overview of SAML SSO information exchange]({% link saml-module/images/overview.png %})
