---
author: [Alfresco Documentation, Alfresco Documentation]
source: 
---

# Configuring customized email templates

In Alfresco Content Services you can customize the emails that are sent by the v1 REST API when users share links to content and request a password change.

To customize an email template for your application, register the application as a new client, then create new email templates using your own branding by adding them to the Data Dictionary.

1.  Open Share, and click Repository on the toolbar.

2.  Click **Data Dictionary** then **Email Templates**.

    You can create a folder to store your customized email templates here.

3.  Add the required properties to `alfresco-global.properties`.

    Here is an example implementation for the default Share client that uses the v1 REST APIs.

    ```
    repo.client-app.share.templateAssetsUrl=${shareUrl}/res/components/images/
    repo.client-app.share.sharedLinkBaseUrl=${shareUrl}/s
    repo.client-app.share.sharedLinkTemplatePath=
    repo.client-app.share.requestResetPasswordTemplatePath=
    repo.client-app.share.resetPasswordPageUrl=${shareUrl}/page/reset-password
    repo.client-app.share.confirmResetPasswordTemplatePath=
    ```

    **Note:** Any property without a value is ignored, however, a client can't be registered if all the properties for that client have no values.

    Here is the full list of property settings that you can configure. Note that the expected format of the email template paths \(`*TemplatePath`\) are similar:

    |Property|Description|Value|
    |--------|-----------|-----|
    |`sharedLinkTemplatePath``requestResetPasswordTemplatePath`

`confirmResetPasswordTemplatePath`

|Define the template path as an XPATH, NodeRef or classpath.|Example: XPATH: `app:company_home/app:dictionary/app: email_templates/cm:example-email.ftl`

NodeRef: `workspace://SpacesStore/a371fc59-d5ea-4849-a45c-b00c0c0d00ab`

Class path: `alfresco/templates/quickshare-email-templates/ myapp-template.ftl`

|
    |`templateAssetsUrl`|The URL of the assets for the email template, such as images and logos, used in the HTML template.

|Example: `${shareUrl}/res/components/images/`

|
    |`sharedLinkBaseUrl`|The base URL of a page where the registered application displays the shared content.

|Example: `${shareUrl}/s`

|

    For example, to register the application `myapp` to send customized `shared-link` emails, add the following properties to `alfresco-global.properties`:

    ```
    repo.client-app.myapp.sharedLinkTemplatePath=myapp email template path
    repo.client-app.myapp.templateAssetsUrl=myapp email template assets url
    repo.client-app.myapp.sharedLinkBaseUrl=myapp url
    ```

    **Note:** If the template path isn't a valid `nodeRef` or `template`, the fallback template for Share is used.

4.  Restart the Alfresco server.


You can view your registered clients by using a JMX client, located under the ClientsAppsConfigInformation MBean.

**Parent topic:**[Configuring email templates using v1 REST APIs](../concepts/email-templates-intro.md)

