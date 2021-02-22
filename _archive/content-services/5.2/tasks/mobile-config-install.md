---
author: [Alfresco Documentation, Alfresco Documentation]
audience: 
category: 
option: 
---

# Installing the configuration file

The Alfresco Mobile configuration file that you create needs to be stored on the Alfresco Content Services server.

The file you create overrides the configuration file that's built into the app giving the default menu structure. You can view the built in configuration files for reference for both [iOS](https://github.com/Alfresco/alfresco-ios-app/blob/master/AlfrescoApp/Supporting%20Files/configuration.json) and [Android](https://github.com/Alfresco/alfresco-android-app/blob/master/alfresco-mobile-android/src/main/assets/Configuration/embedded_config.json).

1.  Create the JSON configuration file following the instructions and examples in [Alfresco Mobile configuration file](../concepts/mobile-config-overview.md) and related topics.

2.  Add the file to */Company Home/Data Dictionary/Mobile/* in your repository.

    Once the file is added it's automatically applied to all Alfresco Mobile for Android connections to your server the next time the user starts a new session. You can make changes and updates to the file whenever you need to.


**Parent topic:**[Configuring Alfresco Mobile](../topics/mobile-config.md)

