---
title: Upgrade Outlook Integration
---

If you are upgrading to a new release of Outlook Integration, uninstall the previous Alfresco AMPs and Outlook zip file.

These instructions show you how to upgrade your instance of Outlook Integration.

1. Stop the Alfresco server.

2. Back up any custom folders and files that you have created.

3. Uninstall the Outlook Integration AMP files, using MMT (Module Management Tool).

    See [Uninstall Outlook Integration]({% link microsoft-outlook/latest/install/index.md %}#uninstall) for instructions on how to uninstall the AMP files.

    Delete the `tomcat/webapps/alfresco` and `tomcat/webapps/share` folders before restarting Alfresco in step 6 to ensure that the new war files are exploded.

4. Download, extract and install the new Outlook Integration files.

    You do not need to uninstall a previous version of Alfresco Outlook Client. You can install the new client and all settings are transferred to the new version. See [Install Outlook Integration]({% link microsoft-outlook/latest/install/index.md %}) for instructions on how to do this.

5. Restart the Alfresco server and open Microsoft Outlook.

    Test that you can connect successfully to the Alfresco repository from Microsoft Outlook.

6. If you used custom types in a previous version of Alfresco Outlook, you can optionally run an upgrading model script.

    Later versions of Alfresco Outlook use `cm:content` instead of a custom type to store email-related objects. All emails archived from version 2.0 onwards use the `cm:content` model. You need to run the script only if you want to align all emails to the same model.

    1. Enter the URL: `http://localhost:8080/alfresco/service/wps/mail/bulkmailmodelupdate` where `localhost:8080` is your Alfresco host and port number.

    2. Select **Test** to run the script in test mode, to understand how many files might change.

    3. Select **Model Update** to change your archived content to use the `cm:content` model.

7. Starting from Outlook Integration 2.10 and with the deprecation of Alfresco SAML Module, the authentication protocol has changed to OpenId Connect.

    If the previous version of the Outlook Integration is configured to use SAML as the authentication type, you'll need to configure OpenId Connect related parameters in the **Connection** tab of the **Alfresco Client**.

    See [Using SAML SSO with Outlook Integration]({% link microsoft-outlook/latest/admin/index.md %}) for the client-side configuration details.
