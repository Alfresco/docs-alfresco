---
author: Alfresco Documentation
---

# Configuring Alfresco Mobile

Alfresco Content Services Administrators can easily define the experience for their Alfresco Mobile users by choosing what each user sees in the Alfresco Mobile menu.

For example you could set up a profile for your Sales team, so that when they use Alfresco Mobile they can drill straight into pricelists and sales tools without having to search for them. Another profile might give your IT team quick access to any outstanding Support tasks they have.

You can create multiple different configurations and assign each one to a profile. You can then choose whether to assign a profile to users, or to let them select from a range of profiles.

You don't need to do any code modification or customization of the Alfresco Mobile app to set up profiles. You just add a configuration file to your Alfresco Content Services server and Alfresco Mobile does the rest.

From Alfresco Mobile for Android 1.5 onwards, the mobile app has included the option to set up a configuration file where you can modify and customize objects such as views, actions, themes, URLs, and more. This file is created by a developer or administrator using JSON formatting and conventions. See [Creating the configuration file](../concepts/mobile-config-overview.md) for more.

**Note:** Alfresco Mobile retrieves details from the file using its configuration service. The service typically retrieves the configuration from the server the app is currently attached to. It can also accept configuration from other sources, for example, a client application may provide user configuration options that allow individual users to customise their app.

You can modify the configuration file directly from Alfresco Mobile by browsing to it in the repository. Whenever an update is made to the file, it will be replicated in your users Alfresco Mobile apps the next time they start a new session.

**Note:** You can also [localize the Alfresco Mobile configuration file](../tasks/mobile-config-locale.md).

-   **[Installing the configuration file](../tasks/mobile-config-install.md)**  
The Alfresco Mobile configuration file that you create needs to be stored on the Alfresco Content Services server.
-   **[Creating the configuration file](../concepts/mobile-config-overview.md)**  
Use the configuration file to customize Alfresco Mobile for your users.
-   **[Localizing the configuration file](../tasks/mobile-config-locale.md)**  
You can create additional files to localize the Alfresco Mobile configuration file.

**Parent topic:**[Configuring](../concepts/ch-configuration.md)

