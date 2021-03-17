---
author: [Alfresco Documentation, Alfresco Documentation]
audience: 
category: 
option: 
---

# Creating the configuration file

Use the configuration file to customize Alfresco Mobile for your users.

The configuration file is a JSON file which you create and add to your repository. It must be named *configuration.json*. It's made up of six JSON objects, five of which are configurable.

```
{
   "info": {},
   "repository": {},
   "features": [],
   "profiles": {},
   "view-groups": [],
   "views": {}
 }
```

Each of these objects controls the configuration of a different part of the app. The **Info** object is used for versioning.

**Note:** You can also associate a localization file with the configuration file.

-   **[Sample configuration file](../references/mobile-config-file.md)**  
This sample Alfresco Mobile configuration file shows how you can customize the file.
-   **[Selecting an Alfresco Mobile version](../references/mobile-config-info.md)**  
Use the Info object to ensure backwards compatibility and configuration versioning.
-   **[Selecting a repository](../references/mobile-config-repository.md)**  
The Repository object contains repository configuration details.
-   **[Turning Alfresco Mobile features on and off](../references/mobile-config-features.md)**  
Use the Features object to turn Alfresco Mobile features on and off.
-   **[Creating Alfresco Mobile profiles](../references/mobile-config-profiles.md)**  
Use the Profiles object to store multiple configurations in a single configuration file.
-   **[Setting profile availability](../references/mobile-config-access.md)**  
When you create a new mobile profile it's available to all of your users by default.
-   **[Creating Alfresco Mobile user menus](../references/mobile-config-views.md)**  
Use the View object to define Alfresco Mobile user menu options.
-   **[Creating user menu groups](../references/mobile-config-view-groups.md)**  
The view-groups object is a type of view in which you can store other views.

**Parent topic:**[Configuring Alfresco Mobile](../topics/mobile-config.md)

