---
title: Configuring Alfresco Mobile
---

Alfresco Content Services Administrators can easily define the experience for their Alfresco Mobile users by choosing what each user sees in the Alfresco Mobile menu.

For example you could set up a profile for your Sales team, so that when they use Alfresco Mobile they can drill straight into pricelists and sales tools without having to search for them. Another profile might give your IT team quick access to any outstanding Support tasks they have.

You can create multiple different configurations and assign each one to a profile. You can then choose whether to assign a profile to users, or to let them select from a range of profiles.

You don't need to do any code modification or customization of the Alfresco Mobile app to set up profiles. You just add a configuration file to your Alfresco Content Services server and Alfresco Mobile does the rest.

From Alfresco Mobile for Android 1.5 onwards, the mobile app has included the option to set up a configuration file where you can modify and customize objects such as views, actions, themes, URLs, and more. This file is created by a developer or administrator using JSON formatting and conventions. See [Creating the configuration file](#creating-the-configuration-file) for more.

> **Note:** Alfresco Mobile retrieves details from the file using its configuration service. The service typically retrieves the configuration from the server the app is currently attached to. It can also accept configuration from other sources, for example, a client application may provide user configuration options that allow individual users to customize their app.

You can modify the configuration file directly from Alfresco Mobile by browsing to it in the repository. Whenever an update is made to the file, it will be replicated in your users Alfresco Mobile apps the next time they start a new session.

> **Note:** You can also [localize the Alfresco Mobile configuration file](#localizing-the-configuration-file).

-   **[Installing the configuration file](#installing-the-configuration-file)**  
The Alfresco Mobile configuration file that you create needs to be stored on the Alfresco Content Services server.
-   **[Creating the configuration file](#creating-the-configuration-file)**  
Use the configuration file to customize Alfresco Mobile for your users.
-   **[Localizing the configuration file](#localizing-the-configuration-file)**  
You can create additional files to localize the Alfresco Mobile configuration file.

## Installing the configuration file {#installing-the-configuration-file}

The Alfresco Mobile configuration file that you create needs to be stored on the Alfresco Content Services server.

The file you create overrides the configuration file that's built into the app giving the default menu structure. You can view the built in configuration files for reference for both [iOS](https://github.com/Alfresco/alfresco-ios-app/blob/master/AlfrescoApp/Supporting%20Files/configuration.json) and [Android](https://github.com/Alfresco/alfresco-android-app/blob/master/alfresco-mobile-android/src/main/assets/Configuration/embedded_config.json).

1.  Create the JSON configuration file following the instructions and examples in [Alfresco Mobile configuration file](#creating-the-configuration-file) and related topics.

2.  Add the file to */Company Home/Data Dictionary/Mobile/* in your repository.

    Once the file is added it's automatically applied to all Alfresco Mobile for Android connections to your server the next time the user starts a new session. You can make changes and updates to the file whenever you need to.


## Creating the configuration file {#creating-the-configuration-file}

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

> **Note:** You can also associate a localization file with the configuration file.

-   **[Sample configuration file](#sample-configuration-file)**  
This sample Alfresco Mobile configuration file shows how you can customize the file.
-   **[Selecting an Alfresco Mobile version](#selecting-an-alfresco-mobile-version)**  
Use the Info object to ensure backwards compatibility and configuration versioning.
-   **[Selecting a repository](#selecting-a-repository)**  
The Repository object contains repository configuration details.
-   **[Turning Alfresco Mobile features on and off](#turning-alfresco-mobile-features-on-and-off)**  
Use the Features object to turn Alfresco Mobile features on and off.
-   **[Creating Alfresco Mobile profiles](#creating-alfresco-mobile-profiles)**  
Use the Profiles object to store multiple configurations in a single configuration file.
-   **[Setting profile availability](#setting-profile-availability)**  
When you create a new mobile profile it's available to all of your users by default.
-   **[Creating Alfresco Mobile user menus](#creating-alfresco-mobile-user-menus)**  
Use the View object to define Alfresco Mobile user menu options.
-   **[Creating user menu groups](#creating-user-menu-groups)**  
The view-groups object is a type of view in which you can store other views.

### Sample configuration file {#sample-configuration-file}

This sample Alfresco Mobile configuration file shows how you can customize the file.

All IDs are user-defined, so it's recommended that you set up a system for using consistent IDs. Views and features also use types, which are pre-defined types.

For more information on how to create a configuration file, see the related object topics.

```

{
  "info": {
    "schema-version": 0.1
  },
  "repository": {
    "share-url": "https://hostname:port/share"
  },
  "profiles": {
    "default": {
      "default": true,
      "label-id": "Default Profile",
      "description-id": "Description of the Default Profile",
      "root-view-id": "views-menu-default"
    },
    "sample": {
      "label-id": "profile.sample.title",
      "description-id": "profile.sample.summary",
      "root-view-id": "views-sample"
    }
  },
  "view-groups": [
    {
      "id": "views-menu-default",
      "label-id": "Default Menu",
      "items": [
        {
          "item-type": "view-id",
          "view-id": "view-activities-default"
        },
        {
          "item-type": "view-id",
          "view-id": "view-repository-default"
        }
      ]
    },
    {
      "id": "views-sample",
      "items": [
        {
          "item-type": "view-group-id",
          "view-group-id": "views-sample-project"
        }
      ]
    },
    {
      "id": "views-sample-project",
      "label-id": "Sample Project",
      "items": [
        {
          "item-type": "view",
          "view": {
            "id": "activities",
            "type": "org.alfresco.client.view.activities",
            "label-id": "Project Activities",
            "params": {
              "siteShortName": "swsdp"
            }
          }
        },
        {
          "item-type": "view",
          "view": {
            "id": "site",
            "type": "org.alfresco.client.view.repository",
            "label-id": "Sample Site",
            "params": {
              "path": "/sites/swsdp/documentLibrary"
            }
          }
        }
      ]
    }
  ],
  "views": {
    "view-activities-default": {
      "type": "org.alfresco.client.view.activities"
    },
    "view-repository-default": {
      "type": "org.alfresco.client.view.repository"
    }
  }
}
}
```

### Selecting an Alfresco Mobile version {#selecting-an-alfresco-mobile-version}

Use the Info object to ensure backwards compatibility and configuration versioning.

You need to add one of the two schema-versions to the info code block.

-   Alfresco Mobile for Android 1.5 supports only schema-version 0.1
-   Alfresco Mobile for Android 1.6 and later supports schema-version 0.1 and 0.2

If you're using 1.6 or later it's recommended to use version 0.2, as 0.1 doesn't give full support.

```
"info": {
   "schema-version": 0.2
}
```

### Selecting a repository {#selecting-a-repository}

The Repository object contains repository configuration details.

Enter the Alfresco Share url for your Alfresco Content Services installation.

```
"repository":{
   "share-url": "https://hostname:port/share"
}
```

### Turning Alfresco Mobile features on and off {#turning-alfresco-mobile-features-on-and-off}

Use the Features object to turn Alfresco Mobile features on and off.

> **Note:** All IDs are user-defined, so it's recommended that you set up a system for using consistent IDs. Views and features also use types, which are pre-defined.

```
"features":[
    {
      "id": "<feature-id>",
      "type": "<feature-type>",
      "enable": true|false
    }
  ],
```

Currently the only feature type available is Analytics, which uses the type:

```
org.alfresco.client.feature.analytics
```

You can use this to turn Alfresco Mobile analytics on and off. The following example shows how it would look when turned off.

```
"features":[
    {
      "id": "feature-analytics-default",
      "type": "org.alfresco.client.feature.analytics",
      "enable": false
    }
  ],
```

### Creating Alfresco Mobile profiles {#creating-alfresco-mobile-profiles}

Use the Profiles object to store multiple configurations in a single configuration file.

This means that you can set up different configurations for different users or situations. You need to add at least one profile to a configuration file.

> **Note:** All IDs are user-defined, so it's recommended that you set up a system for using consistent IDs. Views and features also use types, which are pre-defined.

```
 {
   "<profile-id>":
   {
      "default": true,
      "label-id": "<label-id>",
      "description-id": "<description-id>",
      "root-view-id": "<view-id> or <view-group-id>"
   }
}
```

The following example shows how your default profile might look.

```
 {
   "<default>":
   {
      "default": true,
      "label-id": "Default Profile",
      "description-id": "Description of the Default Profile",
      "root-view-id": "views-menu-default"
   }
}
```

And this is how a profile set up for your Sales team could look.

```
 {
   "<sales>":
   {
      "label-id": "Sales",
      "description-id": "Sales Dashboard",
      "root-view-id": "views-menu-sales"
   }
}
```

### Setting profile availability {#setting-profile-availability}

When you create a new mobile profile it's available to all of your users by default.

You can add evaluators to a profile and configure it so that the profile is only available for specified users.

> **Note:** This feature is based on user name and not user groups.

The evaluator is *isUser* and is added directly to the profile that you want to restrict availability for. In the example below the profile is only available to members of the Sales Team.

```
"profiles":  {
   "sales":
   {
      "label-id": "Sales",
      "description-id": "Sales Dashboard",
      "root-view-id": "views-menu-sales"
      "evaluator": "isSalesUser"
      }
    }
```

In the configuration file you specify the users the evaluator applies to.

```
"evaluators": {
    "isSalesUser": {
      "type": "org.alfresco.client.evaluator.isUser",
      "params": {
        "users": [
          "JohnNewton",
          "HelenMullally",
          "MikeHatfield"
        ]
      }
    }
  }
```

Only users that you specify will have the profile available in Alfresco Mobile.

### Creating Alfresco Mobile user menus {#creating-alfresco-mobile-user-menus}

Use the View object to define Alfresco Mobile user menu options.

You can set up a range of menus, each one containing various options (or view types), from specific sites or searches through to individual files or folders.

For example you could set up a profile for your Sales team, so that when they use Alfresco Mobile they can drill straight into pricelists and sales tools without having to search for them. Another profile might give your IT team quick access to any outstanding Support tasks they have.

> **Note:** All IDs are user-defined, so it's recommended that you set up a system for using consistent IDs. Views and features also use types, which are pre-defined.

-   view-id = required and user-defined
-   label-id = optional and used for display in the Alfresco Mobile menu
-   description-id = optional
-   type = required and pre-defined

```
 "views" : {
   "<view-id>":
   {
      "label-id": "<label-id>",
      "description-id": "<description-id>",
      "type": "<view-type>"
      "params": {
   }
}
```

So for example, you could create an Activities menu item that links straight to the activities on your Sales team site.

```
 "views" : {
   "<view-activities-sales>":
   {
      "label-id": "<Activities>",
      "type": "org.alfresco.client.view.activities"
      "params": {
         "siteShortName": "SalesTeam"
   }
}
```

See below for more details on the menu items you can add, and examples of how you could implement them.

-   [Activities](#activities-menu-items)
-   [Sites](#sites-menu-items)
-   [Nodes](#nodes-menu-items)
-   [Favorites](#favorites-menu-items)
-   [Tasks and Workflows](#tasks-menu-items)
-   [Users](#users-menu-items)
-   [Local Files](#local-files-menu-items)
-   [Search](#search-menu-items)
-   [Sync](#sync-menu-items)

Most of these support pagination so that you can customize the number of items displayed. Sync doesn't support pagination.

```
 "views" : {
            "<view-id>": {
            "type": "<view-type>",
            "params": {
               "pagination": {
                  "maxItems": 1,
                  "skipCount": 1
            }
          }
       }
    }
```

-   **[Activities menu items](#activities-menu-items)**  
Create menu items to display the activities for a specific user or site.
-   **[Sites menu items](#sites-menu-items)**  
Create menu items to display all sites or a list of selected sites.
-   **[Nodes menu items](#nodes-menu-items)**  
Create a menu item to display a link to a file, folder, or search results.
-   **[Favorites menu items](#favorites-menu-items)**  
Create menu items to display a list of favorite files or folders.
-   **[Tasks menu items](#tasks-menu-items)**  
Create menu items to display a list of tasks.
-   **[Users menu items](#users-menu-items)**  
You can create menu items to display the profiles of one or more users.
-   **[Local Files menu items](#local-files-menu-items)**  
Create menu items to display your device or Alfresco Share Local files.
-   **[Search menu items](#search-menu-items)**  
Create menu items to display a link to the search screen.
-   **[Sync menu items](#sync-menu-items)**  
Create menu items to display your synced files.

#### Activities menu items {#activities-menu-items}

Create menu items to display the activities for a specific user or site.

Use the type **org.alfresco.client.view.activities** and then select from the follow parameters:

|params|Description|String|Required|
|------|-----------|------|--------|
|userName|Displays activities stream for a specific user|String|No|
|siteShortName|Displays activities stream for a specific site.|String|No|

So for example, you could create an Activities menu item that links straight to the activities on your Sales team site.

```
 "views" : {
   "<view-activities-sales>":
   {
      "label-id": "<Activities>",
      "type": "org.alfresco.client.view.activities"
      "params": {
         "siteShortName": "SalesTeam"
   }
}
```

#### Sites menu items {#sites-menu-items}

Create menu items to display all sites or a list of selected sites.

Use the type **org.alfresco.client.view.sites** and then select from the follow parameters:

|params|Description|String|Required|
|------|-----------|------|--------|
|show|values available : favorites|my|all|String|No|

> **Note:** If you don't enter a parameter then all sites will be shown by default.

So for example, you could create a Site menu item that links straight to your favorite sites.

```
 "views" : {
   "<view-sites-favorites>":
   {
      "label-id": "<Favorite Sites>",
      "type": "org.alfresco.client.view.sites"
      "params": {
         "show": "favorites"
   }
}
```

#### Nodes menu items {#nodes-menu-items}

Create a menu item to display a link to a file, folder, or search results.

There are three different parameter options available that you can use.

**Display a folder**

Use the type **org.alfresco.client.view.repository** and then select from the follow parameters:

|params|Description|String|Required|
|------|-----------|------|--------|
|path|Displays a folder defined by its absolute path|String|No (exclusive)|
|nodeRef|Displays a folder retrieved by its nodeRef|String|No (exclusive)|
|siteShortName|Displays the document library folder associated to the specified site|String|No (exclusive)|
|folderTypeId|Displays the system folder shared|userhome|String|No (exclusive)|

> **Note:** If you don't enter a parameter then the Company Home folder will be displayed by default.

So for example, you could create an menu item that links straight to the document library of your Sales team site.

```
 "views" : {
   "<view-sales-files>":
   {
      "label-id": "<Sales Files>",
      "type": "org.alfresco.client.view.repository"
      "params": {
         "siteShortName": "SalesTeam"
   }
}
```

**Display search results**

Use the type **org.alfresco.client.view.repository-search** and then select from the follow parameters:

|params|Description|String|Required|
|------|-----------|------|--------|
|keywords|keywords to search|String|Yes (exclusive)|
|isExact|Exact search. Requires : keywords|String|No (exclusive)|
|fullText|Fulltext search. Requires : keywords|String|No (exclusive)|
|searchFolderOnly|Display a list of folders. Requires : keywords|String|No (exclusive)|
|statement|CMIS query|String|Yes (exclusive)|

> **Note:** By default a list of files is displayed.

So for example, you could create a menu item that links to all files containing the word Alfresco.

```
 "views" : {
   "<view-alfresco-files>":
   {
      "label-id": "<Alfresco Files>",
      "type": "org.alfresco.client.view.repository-search"
      "params": {
         "fullText": "Alfresco"
   }
}
```

**Display file or folder**

Use the type **org.alfresco.client.view.node-details** and then select from the follow parameters:

|params|Description|String|Required|
|------|-----------|------|--------|
|path|Displays a file or folder defined by its absolute path|String|Yes (exclusive)|
|nodeRef|Displays a file or folder retrieved by its nodeRef|String|No (exclusive)|

> **Note:** By default a list of files is displayed.

So for example, you could create a menu item that links straight to your price list.

```
 "views" : {
   "<view-price-list>":
   {
      "label-id": "<Price List>",
      "type": "org.alfresco.client.view.node-details"
      "params": {
         "nodeRef": "workspace://SpacesStore/e1db8fed-ded7-45eg-ap30-02abcd1a1a20"
   }
}
```

#### Favorites menu items {#favorites-menu-items}

Create menu items to display a list of favorite files or folders.

Use the type **org.alfresco.client.view.favorites** and then select from the follow parameters:

|params|Description|String|Required|
|------|-----------|------|--------|
|filters|Enable a filter object|Object|No|
|filters/mode|Values : all|folders|files|String|No|

So for example, you could create a Favorites menu item that links straight all your favorite files.

```
 "views" : {
   "<view-favorite-files>":
   {
      "label-id": "<Favorite Files>",
      "type": "org.alfresco.client.view.favorites"
      "params": {
          "filters": {  
             "filters/mode": "files"
   }
}
```

#### Tasks menu items {#tasks-menu-items}

Create menu items to display a list of tasks.

Use the type **org.alfresco.client.view.tasks** and then select from the follow parameters:

|params|Description|String|Required|
|------|-----------|------|--------|
|filters|Enable a filter object|Object|No|
|filters/status|Values : any|active|complete|String|No|
|filters/due|Values : today|tomorrow|week|overdue|none|String|No|
|filters/priority|Values : low|medium|high|String|No|
|filters/assignee|Values : me|unassigned|all|none|String|No|

> **Note:** If you don't enter a parameter then your My Tasks will be displayed by default.

So for example, you could create a Tasks menu item that links to all overdue, active high-priority tasks.

```
 "views" : {
   "<view-tasks-overdue>":
   {
      "label-id": "<Overdue Tasks>",
      "type": "org.alfresco.client.view.tasks"
      "params": {
         "filters": {
           "Status": "active",
           "due": "overdue",
           "priority": "high",
           "assignee": "all",
   }
}
```

#### Users menu items {#users-menu-items}

You can create menu items to display the profiles of one or more users.

There are two different parameter options available that you can use.

**Display a list of users**

Use the type **org.alfresco.client.view.people** and then select from the follow parameters:

|params|Description|String|Required|
|------|-----------|------|--------|
|keywords|Displays a list of users who match the keywords. For Alfresco Server the keywords can use a query such as "User jobtitle:admin".|String|Yes (exclusive)|
|siteShortName|Displays a a list of members for the specific site.|String|Yes (exclusive)|

So for example, you could create an menu item that links to all members of your Sales team site.

```
 "views" : {
   "<view-sales-team>":
   {
      "label-id": "<Sales Team>",
      "type": "org.alfresco.client.view.people"
      "params": {
         "siteShortName": "SalesTeam"
   }
}
```

**Display a single user**

Use the type **org.alfresco.client.view.person-profile** and then select from the follow parameters:

|params|Description|String|Required|
|------|-----------|------|--------|
|userName|Displays the profile for the specified username.|String|No|

> **Note:** If you don't enter any parameters then the currently logged in users profile will be displayed.

So for example, you could create a menu item that links to John Newton's profile.

```
 "views" : {
   "<view-profile-johnnewton>":
   {
      "label-id": "<John Newton>",
      "type": "org.alfresco.client.view.person-profile"
      "params": {
         "userName": "JohnNewton"
   }
}
```

#### Local Files menu items {#local-files-menu-items}

Create menu items to display your device or Alfresco Share Local files.

There are two different parameter options available that you can use.

**Display your device's Local Files**

Use the type **org.alfresco.client.view.local**, no parameters are required.

With this you could create a menu item that links to your device's Local Folder.

```
 "views" : {
   "<view-local-folder-device>":
   {
      "label-id": "<Local Folder>",
      "type": "org.alfresco.client.view.local"
   }
}
```

**Display Alfresco Share Local Files**

Use the type **org.alfresco.client.view.person-profile** and then select from the follow parameters:

|params|Description|String|Required|
|------|-----------|------|--------|
|path|Absolute path to the specified folder.|String|No|

> **Note:** If you don't enter any parameters then the Alfresco Share Local Files folder will be displayed.

#### Search menu items {#search-menu-items}

Create menu items to display a link to the search screen.

There are two different parameter options available that you can use.

**Display the search**

Use the type **org.alfresco.client.view.search**, no parameters are required.

With this you could create a menu item that links to the search.

```
 "views" : {
   "<view-search>":
   {
      "label-id": "<Search>",
      "type": "org.alfresco.client.view.search"
   }
}
```

**Display an advanced search**

Use the type **org.alfresco.client.view.search-advanced** and then select from the follow parameters:

|params|Description|String|Required|
|------|-----------|------|--------|
|type|values available : person|document|folder|String|Yes|

So for example, you could create a menu item that links to the search for users.

```
 "views" : {
   "<view-search-person>":
   {
      "label-id": "<Find People>",
      "type": "org.alfresco.client.view.search-advanced"
      "params": {
         "type": "person"
   }
}
```

#### Sync menu items {#sync-menu-items}

Create menu items to display your synced files.

Use the type **org.alfresco.client.view.sync**, no parameters are required.

With this you could create a menu item that shows all your synced content.

```
 "views" : {
   "<view-sync-files>":
   {
      "label-id": "<Synced Files>",
      "type": "org.alfresco.client.view.sync"
   }
}
```

### Creating user menu groups {#creating-user-menu-groups}

The view-groups object is a type of view in which you can store other views.

Store views in a view-group to avoid duplication.

```
"view-groups": [
    {
      "id": "<view-group-id>",
      "label-id": "<label-id>",
      "description-id": "<description-id>",
      "items": [
        {
          "item-type": "view-id",
          "view-id": "<view-id>"
        },
        {
          "item-type": "view-group-id",
          "view-group-id": "<view-group-id>"
        },
        {
          "item-type": "view",
          "view": {
            "label-id": "<label-id>",
            "description-id": "<description-id>",
            "type": "<view-type>",
            "form-id": "<form-id>",
            "params": {
              "<param-name>": "<param-value>"
            }
          }
        }
      ]
    }
  ]
```

The following example shows how you might set up a view-group.

```
 "view-groups": [
    {
      "id": "views-menu-default",
      "label-id": "Default Menu",
      "items": [
        {
          "item-type": "view-id",
          "view-id": "view-activities-default"
        },
        {
          "item-type": "view-id",
          "view-id": "view-repository-default"
        }
      ]
    },
    {
      "id": "views-sample",
      "items": [
        {
          "item-type": "view-group-id",
          "view-group-id": "views-sample-project"
        }
      ]
    },
    {
      "id": "views-sample-project",
      "label-id": "Sample Project",
      "items": [
        {
          "item-type": "view",
          "view": {
            "id": "activities",
            "type": "org.alfresco.client.view.activities",
            "label-id": "Project Activities",
            "params": {
              "siteShortName": "swsdp"
            }
          }
        },
        {
          "item-type": "view",
          "view": {
            "id": "site",
            "type": "org.alfresco.client.view.repository",
            "label-id": "Sample Site",
            "params": {
              "path": "/sites/swsdp/documentLibrary"
            }
          }
        }
      ]
    }
  ]
```

## Localizing the configuration file {#localizing-the-configuration-file}

You can create additional files to localize the Alfresco Mobile configuration file.

> **Important:** This feature is currently only available for Alfresco Mobile for Android.

These localization files are stored in a Messages folder. The files in this folder contain all the localised strings referenced in the configuration file.

The file names must reflect the locale they represent, for example:

-   English - strings.properties
-   French - strings_fr.properties
-   Spanish - strings_es.properties
-   Italian - strings_it.properties
-   German - strings_de.properties
-   Japanese - strings_ja.properties

> **Note:** Only include localization files for languages that are currently available in Alfresco Mobile.

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

    **French = strings_fr.properties**

    ```
    profile.default.title=D\u00e9faut
    profile.default.summary=Profile par d\u00e9faut
    home.menu.header=Vues par d\u00e9faut
    view.properties.title=General
    view.properties.description=Description,
    ```

3.  Add the files to*/Company Home/Data Dictionary/Mobile/Messages* in your repository.

    Once the files are added they're automatically applied to all localized Alfresco Mobile for Android connections to your server the next time the user starts a new session. You can make changes and updates to the file, and add new localization files, whenever you need to.
