---
title: Configure Content Services for Mobile
---

Use this information to configure the [Content Services for Mobile]({% link content-mobile/latest/index.md %}) app for end users.

Items such as views, menus, actions and themes can be customized. For example, a profile can be configured for a sales team, so that when they use the mobile app they can easily find price lists and sales tools without having to search for them. Another profile might give an IT team quick access to any outstanding support tasks.

You can create multiple different configurations and assign each one to a profile. You can then choose whether to assign a profile to users, or to let them select from a range of profiles.

All customization uses a JSON file and does not require any code modifications. The configuration file is stored in Content Services.

> **Note:** Content Services for Mobile retrieves details from the file using its configuration service. The service typically retrieves the configuration from the server the app is currently attached to. It can also accept configuration from other sources, for example, a client application may provide user configuration options that allow individual users to customize their app.

## Configuration file

A custom configuration file will override the default configurations. The default configuration files are:

* [Android](https://github.com/Alfresco/alfresco-android-app/blob/master/alfresco-mobile-android/src/main/assets/Configuration/embedded_config.json){:target="_blank"}
* [iOS](https://github.com/Alfresco/alfresco-ios-app/blob/master/AlfrescoApp/Supporting%20Files/configuration.json){:target="_blank"}

To customize the mobile app, create a file called `configuration.json` and place it in the `/Company Home/Data Dictionary/Mobile/` directory of Content Services.

> **Note:** The configuration file can be modified from the mobile app by browsing to it in the repository. Whenever an update is made to the file, it will be replicated to all users the next time they start a new session.

The configuration file is made up of configurable JSON objects:

```json
{
   "info": {},
   "repository": {},
   "features": [],
   "profiles": {},
   "view-groups": [],
   "views": {}
 }
```

Each object controls the configuration of a different part of the app.

> **Note:** You can also associate a [localization file](#localize-the-configuration-file) with the configuration file.

### Example file

This example configuration file shows how you can customize the file.

All IDs are user-defined, so it's recommended that you set up a system for using consistent IDs. Views and features also use types, which are predefined.

```json
{
  "info": {
    "schema-version": 0.1
  },
  "repository": {
    "share-url": "https://hostname:port/share"
  },
  "features":[
    {
      "id": "feature-analytics-default",
      "type": "org.alfresco.client.feature.analytics",
      "enable": false
    }
  ],
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

## Info

The `info` object is used to ensure backwards compatibility and configuration versioning.

Add the schema version into the object:

```json
"info": {
   "schema-version": 0.2
}
```

> **Note:** If using Content Services for Mobile on Android, versions 1.5 and earlier only support version `0.1`.

## Repository

The `repository` object is used to store the repository configuration details.

Enter the URL for Alfresco Share of the Content Services installation to connect to:

```json
"repository":{
   "share-url": "https://hostname:port/share"
}
```

## Features

The `features` object is used to switch features of the mobile app on and off.

Currently the only feature type available is analytics, which uses the type `org.alfresco.client.feature.analytics`.

For example, to turn analytics off:

```json
"features":[
    {
      "id": "feature-analytics-default",
      "type": "org.alfresco.client.feature.analytics",
      "enable": false
    }
  ],
```

## Profiles

The `profiles` object is used to store multiple configurations in a single configuration file.

This means that you can set up different configurations for different users or situations.

> **Note:** You need to add at least one profile to a configuration file.

For example, to create a default profile:

```json
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

For example, to create a profile for a sales team:

```json
 {
   "<sales>":
   {
      "label-id": "Sales",
      "description-id": "Sales Dashboard",
      "root-view-id": "views-menu-sales"
   }
}
```

### Profile availability

By default, profiles are available to all users. Evaluators can be attributed to a profile to set which users can see the profile.

> **Note:** Evaluators are based on user names and not user groups.

 The evaluator value should be added to a profile, for example the evaluator `isSalesUser` to the profile `sales`:

```json
"profiles":  {
   "sales":
   {
      "label-id": "Sales",
      "description-id": "Sales Dashboard",
      "root-view-id": "views-menu-sales",
      "evaluator": "isSalesUser"
      }
    }
```

The evaluator `isSalesUser` is then described with the type `org.alfresco.client.evaluator.isUser` and an array of users the evaluator represents:

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

## Views

The `views` object is used to define the menu options in the mobile app.

Multiple views can be set up that contain different combinations of options, sites, searches or individual files and folders.

All views must use a type that is specific to the menu item to display and a set of IDs. For example, the activities in the mobile app uses the type `org.alfresco.client.view.activities`, so an example of configuring a menu item that links to the activities for the site `SalesTeam` is:

```json
 "views" : {
   "<view-activities-sales>":
   {
      "label-id": "<Activities>",
      "type": "org.alfresco.client.view.activities",
      "params": {
         "siteShortName": "SalesTeam"
   }
}
```

> **Note:** The `label-id` is displayed in the mobile app.

The views that can be configured are:

* [Activities](#activities)
* [Sites](#sites)
* [Nodes](#nodes)
* [Favorites](#favorites)
* [Tasks](#tasks)
* [Users](#users)
* [Local files](#local-files)
* [Search](#search)
* [Sync](#sync)

Most views support pagination to customize the number of items displayed, for example:

```json
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

### Activities

Create an activity view to display a menu item for the activities of a specific user or site.

The type for an activity view is `org.alfresco.client.view.activities`.

The parameters for an activity view are:

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| userName | String | *Optional.* The user to display an activity stream for. |
| siteShortName | String | *Optional.* The site to display an activity stream for. |

An example of a menu item showing the activity stream for the site `SalesTeam` is:

```json
 "views" : {
   "<view-activities-sales>":
   {
      "label-id": "<Activities>",
      "type": "org.alfresco.client.view.activities",
      "params": {
         "siteShortName": "SalesTeam"
   }
}
```

### Sites

Create a sites view to display a menu item for a list of sites.

The type for a sites view is `org.alfresco.client.view.sites`.

The parameters for a sites view are:

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| show | String | *Optional.* The sites list to show. Possible values are `favorites`, `my` or `all`. The default is `all`. |

An example of a menu item showing favorite sites is:

```json
 "views" : {
   "<view-sites-favorites>":
   {
      "label-id": "<Favorite Sites>",
      "type": "org.alfresco.client.view.sites",
      "params": {
         "show": "favorites"
   }
}
```

### Nodes

Create a nodes view to display a menu item for a file, folder or specific search result.

#### Files or folders

The type for a file or folders node view is `org.alfresco.client.view.node-details`.

The parameters for a file node view are:

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| path | String | *Exclusive.* The files or folders to display using an absolute path. |
| nodeRef | String | *Exclusive.* The files folders to display using a node ID. |

An example of a menu item displaying a specific file such as a price list is:

```json
 "views" : {
   "<view-price-list>":
   {
      "label-id": "<Price List>",
      "type": "org.alfresco.client.view.node-details",
      "params": {
         "nodeRef": "workspace://SpacesStore/e1db8fed-ded7-45eg-ap30-02abcd1a1a20"
   }
}
```

#### Folders

The type for a folder node view is `org.alfresco.client.view.repository`.

The parameters for a folder nodes view are:

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| path | String | *Exclusive.* The folder to display using its absolute path. |
| nodeRef | String | *Exclusive.* The folder to display using its node ID. |
| siteShortName | String | *Exclusive.* The document library folder of a named site. |
| folderTypeId | String | *Exclusive.* The system shared or user home folder. This is the default value. |

An example of a menu item showing the document library folder of the site `SalesTeam` is:

```json
 "views" : {
   "<view-sales-files>":
   {
      "label-id": "<Sales Files>",
      "type": "org.alfresco.client.view.repository",
      "params": {
         "siteShortName": "SalesTeam"
   }
}
```

#### Search result

The type for a search results node view is `org.alfresco.client.view.repository-search`.

The parameters for a search results node view are:

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| statement | String | *Requires one.* The CMIS query to use for the list. |
| keywords | String | *Requires one.* Use keywords to search. |
| isExact | String | *Exclusive*. The exact match to search. Only works with `keywords`. |
| fullText | String | *Exclusive*. The full text to search. Only works with `keywords`. |
| searchFolderOnly | String | *Exclusive*. The results will only display folders from the search item. Only works with `keywords`. |

An example of a menu item showing all files containing the word `Alfresco` is:

```json
 "views" : {
   "<view-alfresco-files>":
   {
      "label-id": "<Alfresco Files>",
      "type": "org.alfresco.client.view.repository-search",
      "params": {
         "fullText": "Alfresco"
   }
}
```

### Favorites

Create a favorites view to display a menu item for a list of favorite files or folders.

The type for a favorites view is `org.alfresco.client.view.favorites`.

The parameters for a favorites view are:

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| filters | Object | *Required.*  A filter object. |
| mode | String | *Optional.* The favorites to display in the list. Possible values are `all`, `files` or `folders`. |

An example of a menu item showing all favorite files is:

```json
 "views" : {
   "<view-favorite-files>":
   {
      "label-id": "<Favorite Files>",
      "type": "org.alfresco.client.view.favorites",
      "params": {
          "filters": {  
             "mode": "files"
   }
}
```

### Tasks

Create a tasks view to display a menu item for a list of tasks.

The type for a tasks view is `org.alfresco.client.view.tasks`.

The parameters for a tasks view are:

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| filters | Object | *Required.*  A filter object. |
| status | String | *Optional.* The status of tasks to display in the list. Possible values are `any`, `active` and `complete`. |
| due | String | *Optional.* The due date of tasks to display in the list. Possible values are `today`, `tomorrow`, `week`, `overdue` and `none`. |
| priority | String | *Optional.* The priority level of tasks to display in the list. Possible values are `low`, `medium` and `high`. |
| assignee | String | *Optional.* The assignees of tasks to display in the list. Possible values are `me`, `unassigned`, `all` and `none`. |

> **Note:** My Tasks will display if no parameters are entered.

An example of a menu item showing tasks that are overdue, active and high priority is:

```json
 "views" : {
   "<view-tasks-overdue>":
   {
      "label-id": "<Overdue Tasks>",
      "type": "org.alfresco.client.view.tasks",
      "params": {
         "filters": {
           "Status": "active",
           "due": "overdue",
           "priority": "high",
           "assignee": "all",
   }
}
```

### Users

Create a users view to display a menu item for one, or a list of, user profiles.

#### User list

The type for a user list view is `org.alfresco.client.view.people`.

The parameters for a user list view are:

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| keywords | String | *Exclusive.* The keywords to match the user list from, for example `User jobtitle:admin`
| siteShortName | String | *Exclusive.* The site name to display the list of members for. |

An example of a menu item showing the members of the site `SalesTeam` is:

```json
 "views" : {
   "<view-sales-team>":
   {
      "label-id": "<Sales Team>",
      "type": "org.alfresco.client.view.people",
      "params": {
         "siteShortName": "SalesTeam"
   }
}
```

#### Single user

The type for a user list view is `org.alfresco.client.view.person-profile`.

The parameters for a single user view are:

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| userName| String | *Optional.* The username of the user profile to display. If empty, then the currently logged in user will be displayed. |

An example of a menu item showing the user profile of `John Newton` is:

```json
 "views" : {
   "<view-profile-johnnewton>":
   {
      "label-id": "<John Newton>",
      "type": "org.alfresco.client.view.person-profile",
      "params": {
         "userName": "JohnNewton"
   }
}
```

### Local files

Create a local files view to display a menu item for the local files on a device or from Alfresco Share.

#### Device local files

The type for a local files on a device view is `org.alfresco.client.view.local`.

An example of a menu item showing the local files on a device is:

```json
 "views" : {
   "<view-local-folder-device>":
   {
      "label-id": "<Local Folder>",
      "type": "org.alfresco.client.view.local"
   }
}
```

#### Share local files

The type for a local files on Share view is `org.alfresco.client.view.person-profile`.

The parameters for a local files on Share view are:

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| path | String | *Optional.* The folder to display as an absolute path. |

> **Note:** If you don't enter any parameters then the Alfresco Share Local Files folder will be displayed.

### Search

Create a search view to display a menu item for the search screen.

#### Display search

The type for a search view is `org.alfresco.client.view.search`.

An example of a menu item showing the search screen is:

```json
 "views" : {
   "<view-search>":
   {
      "label-id": "<Search>",
      "type": "org.alfresco.client.view.search"
   }
}
```

#### Display advanced search

The type for an advanced search view is `org.alfresco.client.view.search-advanced`.

The parameters for an advanced search view are:

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| type | String | *Required.* The search type to display. Possible values are `person`, `document` or `folder`. |

An example of a menu item showing the advanced search for users is:

```json
 "views" : {
   "<view-search-person>":
   {
      "label-id": "<Find People>",
      "type": "org.alfresco.client.view.search-advanced",
      "params": {
         "type": "person"
   }
}
```

### Sync

Create a sync view to display a menu item for a list of synced files.

The type for a sync view is `org.alfresco.client.view.sync`.

An example of a menu item showing a list of synced content is:

```json
 "views" : {
   "<view-sync-files>":
   {
      "label-id": "<Synced Files>",
      "type": "org.alfresco.client.view.sync"
   }
}
```

## View groups

The `view-groups` object is used to store [views](#views) in their own view to avoid duplication.

An example of a view group is:

```json
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
              "siteShortName": "salesTeam"
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
              "path": "/sites/salesteam/documentLibrary"
            }
          }
        }
      ]
    }
  ]
```

## Localize the configuration file

The contents of the [configuration file](#configuration-file) can be localized into languages supported by the mobile app.

> **Note:** This feature is only available to Android devices.

The localization strings are stored in separate property files within the `/Company Home/Data Dictionary/Mobile/Messages/` directory. The file names must represent the language they are localizing, for example:

* English: `strings.properties`
* French: `strings_fr.properties`
* Spanish: `strings_es.properties`
* Italian: `strings_it.properties`
* German: `strings_de.properties`
* Japanese: `strings_ja.properties`

The contents of the files refer to the strings within the configuration file, for example:

In English:

```bash
profile.default.title=Default
profile.default.summary=Default profile
home.menu.header=Views
view.properties.title=General
view.properties.description=Default Properties,
```

In French:

```bash
profile.default.title=D\u00e9faut
profile.default.summary=Profile par d\u00e9faut
home.menu.header=Vues par d\u00e9faut
view.properties.title=General
view.properties.description=Description,
```

> **Note:** The localized strings can be modified from the mobile app by browsing to it in the repository. Whenever an update is made to the file, it will be replicated to all users the next time they start a new session.
