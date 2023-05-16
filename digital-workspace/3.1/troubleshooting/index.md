---
title: Troubleshooting
---
Here are the answers to some frequently asked questions.

### When attempting to login a problem with CORS is reported

Refer to [Cross Origin Resource Sharing (CORS) filters]({% link content-services/latest/config/repository.md %}#cors-configuration}) and [Cross-Origin Resource Sharing (CORS)](https://enable-cors.org/){:target="_blank"}.

### Can I customize the Digital Workspace

Yes, there are a number of customizations available that can be configured in `../digital-workspace/app.config.json`. See [Configure Digital Workspace]({% link digital-workspace/3.1/config/index.md %}) for more details. The application can also be extended using the ADF Extension framework. See [Extending](https://alfresco-content-app.netlify.com/#/extending/).

### I have installed an extension and the Digital Workspace does not work

First disable the extension and check the Digital Workspace works correctly. If this resolves the issue contact the extension developer for assistance.

### Does the Digital Workspace work with Alfresco Governance Services

Yes, the Digital Workspace supports Alfresco Governance Services. See [Governance Services]({% link digital-workspace/3.1/governance/index.md %}).

### Does the Digital Workspace support Smart Folders

Smart Folder access is supported but Smart Folders cannot be created in this application.

### How do I setup SSL

SSL configurations differ from one installation to the next. Here is one approach to the setup of NGINX using SSL, see [https://nginx.org/en/docs/http/configuring_https_servers.html](https://nginx.org/en/docs/http/configuring_https_servers.html){:target="_blank"}.

For information on generating self-trusted certificates for local testing and development purposes, see [https://letsencrypt.org/docs/certificates-for-localhost/](https://letsencrypt.org/docs/certificates-for-localhost/){:target="_blank"}.

### What browsers does the Digital Workspace support

The Digital Workspace supports the following Evergreen browsers:

* Apple Safari
* Google Chrome
* Microsoft Edge
* Mozilla Firefox

### Is Single Sign-On (SSO) supported with the Digital Workspace

Yes, the Digital Workspace supports Single Sign-On with the Identity Service. See [Alfresco SSO Guide]({% link identity-service/latest/tutorial/sso/index.md %}) for more details.

The Digital Workspace does not support SAML Single Sign-On (SSO) for Alfresco Content Services. Users can login with their credentials using basic authentication, but SAML authentication must not be enforced.

See [SAML Single Sign-On (SSO) Module for Alfresco Content Services]({% link saml-module/latest/index.md %}) for more information.

### How can I change my profile in the Digital Workspace

To change your profile, locate the Profile menu item on the top right and click the profile image, and then click **My Profile**.

You can edit the **General** and **Company details** sections by clicking **Edit**. Once you have made the required changes, click **Save**.
