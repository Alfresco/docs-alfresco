---
author: Alfresco Documentation
---

# Prerequisites for using SAML SSO with Alfresco

There are a number of requirements when using SAML SSO with Alfresco.

**Software requirements**

Alfresco should work with any identify provider \(IdP\) that supports SAML 2.0, however the following IdPs have been specifically tested with Alfresco:

-   Microsoft Active Directory Federation Services \(AD FS\) 3.0 for Microsoft Windows 2012 R2 and above
-   PingIdentity PingFederate 7.0 and later

Make sure that you have the public key of the certificate from your chosen IdP. You also need the SSO request, SLO request, and SLO response URLs.

**Alfresco requirements**

Alfresco One 5.0.3 or later

**Application servers**

SAML is supported on the following application servers:

-   Tomcat
-   WebLogic \(**Known issue:** If you use SAML on Alfresco Content Services 5.2 with WebLogic, an extra manual installation step is required. See [SAML known issues and workarounds](saml-known-issues.md) for more information.\)

**SAML level**

Alfresco uses SAML 2.0. See [OASIS SAML v2.0](https://wiki.oasis-open.org/security/FrontPage) for more information on SAML specifications.

**Microsoft Office**

The SAML module has been tested and certified to work with Office 2013 and 2016. Other versions of Office have different authentication mechanisms and are unsupported for use with SAML.

**Authentication chain**

SAML is not a part of the authentication chain. It is used as a replacement for the authentication chain, although basic authentication in Share is supported alongside SAML.

Other authentication methods specified in your authentication chain \(Kerberos SSO, External Auth, alfresco Ntlm, pass-through\) will not work alongside SAML. See [Configuring SAML SSO](../tasks/saml-config.md#saml).

**Parent topic:**[Installing SAML SSO in Alfresco](../concepts/saml-config-overview.md)

