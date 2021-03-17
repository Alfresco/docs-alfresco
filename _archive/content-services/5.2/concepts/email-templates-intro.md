---
author: [Alfresco Documentation, Alfresco Documentation]
audience: 
category: Customization
---

# Configuring email templates using v1 REST APIs

Use this information to configure customized email templates for your registered applications using the v1 REST APIs.

Alfresco Content Services provides a number of new properties for configuring customized email templates when using the v1 REST APIs. Once you have developed your custom application, add the required properties in the global properties file \(alfresco-global.properties\) to register your application. In this file you can also set the path to each email template and any linked assets \(such as images and company logo\) to use your own branding.

The `shared-links` and `request-password-reset` APIs provide a way to send email notifications. To view these APIs, navigate to [https://api-explorer.alfresco.com/api-explorer/\#!/shared-links/emailSharedLink](https://api-explorer.alfresco.com/api-explorer/#!/shared-links/emailSharedLink) and [https://api-explorer.alfresco.com/api-explorer/\#!/people/requestPasswordReset](https://api-explorer.alfresco.com/api-explorer/#/people) in your web browser. One of the mandatory properties in the request body of these APIs, `client`, sets the name of your registered client application. Registering a client means you can create a unique email template for each client, and configure the required email template and assets using different properties.

The client registration is based on a predefined naming convention loaded from properties files. The naming convention must conform to the format:

```
repo.client-app.<client-name>.<propertyName>
```

**Note:** The client name \(`<client-name>`\) and property name \(`<propertyName>`\) must not contain a dot \('.'\).

An example implementation is provided in this release where Alfresco Share is registered as the default client for the `shared-links` and `request-password-reset` APIs. These properties are defined in alfresco/client/config/repo-clients-apps.properties but you can override them in `alfresco-global.properties`:

```
 repo.client-app.share.templateAssetsUrl=${shareUrl}/res/components/images/
 # shared-link (quickShare) base url
 repo.client-app.share.sharedLinkBaseUrl=${shareUrl}/s
 # shared-link email template path
 repo.client-app.share.sharedLinkTemplatePath=
 # reset password request email template path
 repo.client-app.share.requestResetPasswordTemplatePath=
 # reset password UI page url
 repo.client-app.share.resetPasswordPageUrl=${shareUrl}/page/reset-password
 # reset password confirmation email template path
 repo.client-app.share.confirmResetPasswordTemplatePath=
```

**Note:** Any property without a value is ignored, however, a client can't be registered if all the properties of that client have no values.

For more information, see [Configuring customized email templates](../tasks/email-templates-config.md).

-   **[Configuring customized email templates](../tasks/email-templates-config.md)**  
In Alfresco Content Services you can customize the emails that are sent by the v1 REST API when users share links to content and request a password change.

**Parent topic:**[Configuring](../concepts/ch-configuration.md)

