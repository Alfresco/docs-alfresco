---
author: [Alfresco Documentation, Alfresco Documentation]
audience: 
category: 
option: 
---

# Localizing the configuration file

You can create additional files to localize the Alfresco Mobile configuration file.

**Important:** This feature is currently only available for Alfresco Mobile for Android.

These localization files are stored in a Messages folder. The files in this folder contain all the localised strings referenced in the configuration file.

The file names must reflect the locale they represent, for example:

-   English - strings.properties
-   French - strings\_fr.properties
-   Spanish - strings\_es.properties
-   Italian - strings\_it.properties
-   German - strings\_de.properties
-   Japanese - strings\_ja.properties

**Note:** Only include localization files for languages that are currently available in Alfresco Mobile.

1.  Create a new folder named **Messages** at */Company Home/Data Dictionary/Mobile/* in your repository.

2.  Create as many localization files as you require, following the examples below:

    **English = strings.properties**

    ```
    profile.default.title=Default
    profile.default.summary=Default profile
    home.menu.header=Views
    view.properties.title=General
    view.properties.description=Default Properties,
    ```

    **French = strings\_fr.properties**

    ```
    profile.default.title=D\u00e9faut
    profile.default.summary=Profile par d\u00e9faut
    home.menu.header=Vues par d\u00e9faut
    view.properties.title=General
    view.properties.description=Description,
    ```

3.  Add the files to*/Company Home/Data Dictionary/Mobile/Messages* in your repository.

    Once the files are added they're automatically applied to all localized Alfresco Mobile for Android connections to your server the next time the user starts a new session. You can make changes and updates to the file, and add new localization files, whenever you need to.


**Parent topic:**[Configuring Alfresco Mobile](../topics/mobile-config.md)

