---
author: [Alfresco Documentation, Alfresco Documentation]
---

# Authenticating Google accounts with Alfresco Content Services

In Enterprise-only releases, you can register a custom Google configuration for API access.

When this configuration is added to the Google Docs Integration, you can define the OAuth flow by creating your own web application configuration in the Google API Manager.

1.  Place [google-auth-return.html](https://raw.githubusercontent.com/Alfresco/googledrive/master/google-auth-return.html) on a web server that's accessible by all users.

    This file lets users authenticate their Google account with Alfresco Content Services.

2.  Register the Google Docs Integration from the Google API Manager: [https://console.developers.google.com](https://console.developers.google.com).

    Check that you have enabled the Google Drive API.

3.  Click Library in the left-hand navigation, select **Drive API**, and then **Enable**.

    This allows your registered application to access the Drive API.

4.  Click Credentials, select **Create Credentials**, and then pick **OAuth client ID** from the list.

5.  Click **Configure consent screen**, complete the required fields, and then select **Save**.

6.  Select **Web Application** as the application type.

7.  Enter a name for your application.

    This is what the application will be known as in your users Google Account.

8.  Enter a path in the **Authorized redirect URIs** field.

    This is the path to the google-auth-return.html page.

9.  Click **Create**.

    You may be see a popup showing your Client ID and Secret. If so, click **OK**.

10. Navigate to your registered application by selecting the name.

11. Click **Download JSON**.

    Next, use the Repository Administration Console to add your custom configuration.

12. Open Alfresco Share, and click Admin Tools on the toolbar, then select **Repository Administration Console**.

13. In the Consoles section, click **Google Docs Console**.

14. Copy the content of the JSON file into the **Google Docs OAuth Config** field.

15. Click Save.

    **Important:** Before completing these steps, be aware that:

    -   If there are files currently being edited in Google Docs when changing this configuration, it will cause users to lose the ability to use the **Check in** action to bring those files back into Alfresco Content Services. We recommend that all files are checked back into Alfresco Content Services before switching the configuration.
    -   Switching the integration repeatedly between different configurations can corrupt the Google authentication store in Alfresco Content Services for your users. If this happens, users will need to remove access to the integration from their Google Account so that their connection can be set up again.

**Parent topic:**[Configuring Google Docs Integration](../concepts/googledocs-configuration.md)

