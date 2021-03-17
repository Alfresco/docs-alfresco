---
author: Alfresco Documentation
---

# Troubleshooting and FAQs

Here are the answers to some frequently asked questions.

-   [When attempting to login a problem with CORS is reported.](troubleshooting.md#1)
-   [Can I customise Alfresco Digital Workspace?](troubleshooting.md#2)
-   [I have installed an extension and Alfresco Digital Workspace does not work.](troubleshooting.md#3)
-   [Does Alfresco Digital Workspace work with Alfresco Governance Services?](troubleshooting.md#4)
-   [Does Alfresco Digital Workspace support Smart Folders?](troubleshooting.md#5)
-   [How do I setup SSL?](troubleshooting.md#8)
-   [What browsers does Alfresco Digital Workspace support?](troubleshooting.md#9)
-   [Is Single Sign-on supported with Alfresco Digital Workspace?](troubleshooting.md#10)

![](../images/hr.png)

**When attempting to login a problem with CORS is reported.**

Refer to [Cross Origin Resource Sharing \(CORS\) filters](https://docs.alfresco.com/6.1/tasks/enable-cors.html) and [Cross-Origin Resource Sharing \(CORS\)](https://enable-cors.org/).

[back to top](troubleshooting.md#top)

![](../images/hr.png)

**Can I customize Alfresco Digital Workspace?**

Yes, there are a number of customizations available that can be configured in ../digital-workspace/app.config.json. See [Configuring Alfresco Digital Workspace](../concepts/configuration.md) for more details. The application can also be extended using the ADF Extension framework. See [Extending](https://alfresco-content-app.netlify.com/#/extending/).

[back to top](troubleshooting.md#top)

![](../images/hr.png)

**I have installed an extension and Alfresco Digital Workspace does not work.**

First disable the extension and check Alfresco Digital Workspace works correctly. If this resolves the issue contact the extension developer for assistance.

[back to top](troubleshooting.md#top)

![](../images/hr.png)

**Does Alfresco Digital Workspace work with Alfresco Governance Services?**

Yes the Alfresco Digital Workspace supports Alfresco Governance Services. See [Alfresco Governance Services](../concepts/governance-adw.md).

[back to top](troubleshooting.md#top)

![](../images/hr.png)

**Does Alfresco Digital Workspace support Smart Folders?**

Smart Folder access is supported but Smart Folders cannot be created in this application.

[back to top](troubleshooting.md#top)

![](../images/hr.png)

**How do I setup SSL?**

SSL configurations differ from one installation to the next. Here is one approach to the setup of NGINX using SSL, see [https://nginx.org/en/docs/http/configuring\_https\_servers.html](https://nginx.org/en/docs/http/configuring_https_servers.html).

For information on generating self-trusted certificates for local testing and development purposes, see [https://letsencrypt.org/docs/certificates-for-localhost/](https://letsencrypt.org/docs/certificates-for-localhost/).

[back to top](troubleshooting.md#top)

![](../images/hr.png)

**What browsers does Alfresco Digital Workspace support?**

Alfresco Digital Workspace supports the following Evergreen browsers:

-   Apple Safari
-   Google Chrome
-   Microsoft Edge
-   Mozilla Firefox

[back to top](troubleshooting.md#top)

![](../images/hr.png)

**Is Single Sign-On \(SSO\) supported with Alfresco Digital Workspace?**

Yes, Digital Workspace supports Single Sign-On with the Identity Service. See [Identity Service 1.0](https://docs.alfresco.com/identity1.0/concepts/identity-overview.html) and [Single Sign-On](https://alfresco-content-app.netlify.com/#/getting-started/sso) for more details.

The Alfresco Digital Workspace does not support SAML Single Sign-On \(SSO\) for Alfresco Content Services. Users can login with their credentials using basic authentication, but SAML authentication must not be enforced. See [SAML Single Sign-On \(SSO\) for Alfresco Content Services 1.1](https://docs.alfresco.com/saml/concepts/saml-overview.html) and [Configuring SAML \(SSO\) settings for REST API using the Admin Console](http://docs.alfresco.com/saml/tasks/saml-restapi-console.html).

[back to top](troubleshooting.md#top)

**Parent topic:**[Alfresco Digital Workspace 1.2](../concepts/welcome-adw.md)

