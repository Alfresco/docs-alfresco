---
author: Alfresco Documentation
---

# Troubleshooting and FAQs

Here are the answers to some frequently asked questions.

-   [When attempting to login a problem with CORS is reported.](troubleshooting.md#1)
-   [Can I customise the Digital Workspace?](troubleshooting.md#2)
-   [I have installed an extension and the Digital Workspace does not work.](troubleshooting.md#3)
-   [Does the Digital Workspace work with Alfresco Governance Services?](troubleshooting.md#4)
-   [Does the Digital Workspace support Smart Folders?](troubleshooting.md#5)
-   [What authentication methods are supported?](troubleshooting.md#6)
-   [Does the Digital Workspace work with the Single Sign-On \(SSO\) for Alfresco Content Services?](troubleshooting.md#7)
-   [How do I setup SSL?](troubleshooting.md#8)
-   [What browsers does the Digital Workspace support?](troubleshooting.md#9)

![](../images/hr.png)

**When attempting to login a problem with CORS is reported.**

Refer to [Cross Origin Resource Sharing \(CORS\) filters](https://docs.alfresco.com/6.1/tasks/enable-cors.html) and [Cross-Origin Resource Sharing \(CORS\)](https://enable-cors.org/).

[back to top](troubleshooting.md#top)

![](../images/hr.png)

**Can I customize the Digital Workspace?**

Yes, there are a number of customizations available that can be configured in ../digital-workspace/app.config.json. See [Configuring the Digital Workspace](../concepts/configuration.md) for more details. The application can also be extended using the ADF Extension framework. See [Extending](https://alfresco-content-app.netlify.com/#/extending/).

[back to top](troubleshooting.md#top)

![](../images/hr.png)

**I have installed an extension and the Digital Workspace does not work.**

First disable the extension and check the Digital Workspace works correctly. If this resolves the issue contact the extension developer for assistance.

[back to top](troubleshooting.md#top)

![](../images/hr.png)

**Does the Digital Workspace work with Alfresco Governance Services?**

The Digital Workspace is supported where Alfresco Governance Services \(AGS\) is installed, however it does not provide any Governance Services capabilities. Users with permission to access the Records Management File Plan will be able to browse, and view those files. Classified Files cannot be viewed by users who do not have the appropriate permissions.

[back to top](troubleshooting.md#top)

![](../images/hr.png)

**Does the Digital Workspace support Smart Folders?**

Smart Folder access is supported but Smart Folders cannot be created in this application.

[back to top](troubleshooting.md#top)

![](../images/hr.png)

**What authentication methods are supported?**

Currently the Digital Workspace only supports basic authentication with Alfresco Content Services. In the future support will be provided for SSO authentication.

[back to top](troubleshooting.md#top)

![](../images/hr.png)

**Does the Digital Workspace work with the Single Sign-On \(SSO\) for Alfresco Content Services?**

The Digital Workspace does not provide support for SAML SSO. Users can login with their credentials using basic authentication, but SAML authentication must not be enforced. See [Configuring SAML SSO settings for REST API using the Admin Console](http://docs.alfresco.com/saml/tasks/saml-restapi-console.html).

[back to top](troubleshooting.md#top)

![](../images/hr.png)

**How do I setup SSL?**

SSL configurations differ from one installation to the next. Here is one approach to the setup of NGINX using SSL, see [https://nginx.org/en/docs/http/configuring\_https\_servers.html](https://nginx.org/en/docs/http/configuring_https_servers.html).

For information on generating self-trusted certificates for local testing and development purposes, see [https://letsencrypt.org/docs/certificates-for-localhost/](https://letsencrypt.org/docs/certificates-for-localhost/).

[back to top](troubleshooting.md#top)

![](../images/hr.png)

**What browsers does the Digital Workspace support?**

The Digital Workspace supports the following Evergreen browsers:

-   Apple Safari
-   Google Chrome
-   Microsoft Edge
-   Mozilla Firefox

[back to top](troubleshooting.md#top)

**Parent topic:**[Alfresco Digital Workspace](../concepts/welcome-adw.md)

