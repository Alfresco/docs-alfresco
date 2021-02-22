---
author: [Alfresco Documentation, Alfresco Documentation]
---

# Get and Set permissions for a folder or file

Get and set permissions for a user or group on a folder or file node.

|API Call|PUT nodes/\{id\}|
|--------|----------------|
|API Explorer URL|[http://localhost:8080/api-explorer/\#!/nodes/updateNode](http://localhost:8080/api-explorer/#!/nodes/updateNode)|
|See also|[How to update a folder or file](dev-api-by-language-alf-rest-update-node-metadata.md), [how to add aspects](dev-api-by-language-alf-rest-add-aspects-to-node.md) and [how to remove aspects](dev-api-by-language-alf-rest-remove-aspects-from-node.md)|
|Repository Info|[Concepts](dev-repository-concepts.md) [Glossary](dev-glossary.md)|

In most Alfresco solutions it's a requirement to set permissions on folders and files for different groups and users. Groups, users, and group memberships are usually synced/imported from an LDAP directory in a production environment. It's common to configure permissions for groups on folders so we will look at that and at the same time show also how to set permissions on nodes for users.

Permissions are set on nodes \(i.e. folders and files\) by updating the metadata for the node.

The following HTTP PUT call is used:

**http://localhost:8080/alfresco/api/-default-/public/alfresco/versions/1/nodes/\{id\}**

The Node Identifier for the folder or file node to configure permissions for is specified with the `{id}` parameter. Then a body is created with all the data that makes up the permission update.

Here is how the PUT body looks like:

```
{
  "permissions":
    {
      "isInheritanceEnabled": [true = inherit permissions from parent folder | false = don't inherit any permission settings from parent],
      "locallySet": - array of permissions set locally on the folder
        [
          { "authorityId": "group id or user id",
            "name": "permission role - see below",
            "accessStatus":"[ALLOWED = permission role is allowed| DENIED = permission role is denied]"},
          ...
          }
        ]
    }
}
```

The following list explains the practical meanings of the different high level permission roles:

-   *Consumer* - Can read/access folders and files.
-   *Contributor* - Consumer + permission to add folders and files.
-   *Editor* - Consumer + permission to update folders and files.
-   *Collaborator* - Contributor + Editor + permission to update folders and files created by other users.
-   *Coordinator* - Full rights, similar to an admin.

There are also more low level permission roles, such as *Read* and *Write*.

If you want to add or remove locally set permissions, then you must first use the GET **/nodes/\{id\}?include=permissions** call to get the complete set of the already locally set permissions. And then update this list of locally set permissions to match what you want, you cannot just set a new permission and then expect it to be merged with existing local permissions on the server side, this have to be done on the client side.

Let's assume we have a folder called "Engineering" that is created directly under "/Company Home". To get currently set local permissions for this folder use the following call:

```
$ curl -X GET -H 'Accept: application/json' -H 'Authorization: Basic VElDS0VUXzA4ZWI3ZTJlMmMxNzk2NGNhNTFmMGYzMzE4NmNjMmZjOWQ1NmQ1OTM=' 'http://localhost:8080/alfresco/api/-default-/public/alfresco/versions/1/nodes/-root-?relativePath=/Engineering&include=permissions' | jq
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
100   643    0   643    0     0   3632      0 --:--:-- --:--:-- --:--:--  3653
{
  "entry": {
    "aspectNames": [
      "cm:titled",
      "cm:auditable"
    ],
    "createdAt": "2019-12-02T07:54:35.401+0000",
    "isFolder": true,
    "isFile": false,
    "createdByUser": {
      "id": "admin",
      "displayName": "Administrator"
    },
    "modifiedAt": "2019-12-02T07:54:35.401+0000",
    "permissions": {
      "inherited": [
        {
          "authorityId": "GROUP_EVERYONE",
          "name": "Consumer",
          "accessStatus": "ALLOWED"
        }
      ],
      "settable": [
        "Contributor",
        "Collaborator",
        "Coordinator",
        "Editor",
        "Consumer"
      ],
      "isInheritanceEnabled": true
    },
    "modifiedByUser": {
      "id": "admin",
      "displayName": "Administrator"
    },
    "name": "Engineering",
    "id": "d9cb3cf4-d7fc-4240-acd4-2483c4ca932c",
    "nodeType": "cm:folder",
    "parentId": "32d4ff8a-7f5e-4c90-99d5-e4ac54855b35"
  }
}
```

The `permissions` property contains all the information about what permissions that have been set locally on the folder and what permissions that have been inherited from parent folders. In this case there are no locally set permissions, just the inherited *Consumer* role permission for group "EVERYONE".

When we get the permissions for a node we also get back a list of permission roles, in the `settable` property, that can be set on the node \(depends on the node type\).

Let's also look at a the permissions for a public Share site, we can get the document library node information for the out-of-the-box site with id `swsdp` as follows:

```
$ curl -X GET -H 'Accept: application/json' -H 'Authorization: Basic VElDS0VUXzA4ZWI3ZTJlMmMxNzk2NGNhNTFmMGYzMzE4NmNjMmZjOWQ1NmQ1OTM=' 'http://localhost:8080/alfresco/api/-default-/public/alfresco/versions/1/nodes/-root-?relativePath=/Sites/swsdp/documentLibrary&include=permissions' | jq
 % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                Dload  Upload   Total   Spent    Left  Speed
100  1665    0  1665    0     0   108k      0 --:--:-- --:--:-- --:--:--  116k
{
 "entry": {
   "isFile": false,
   "createdByUser": {
     "id": "mjackson",
     "displayName": "Mike Jackson"
   },
   "modifiedAt": "2011-02-15T20:16:28.292+0000",
   "nodeType": "cm:folder",
   "parentId": "b4cff62a-664d-4d45-9302-98723eac1319",
   "aspectNames": [
     "cm:tagscope",
     "st:siteContainer",
     "cm:ownable",
     "cm:titled",
     "cm:auditable"
   ],
   "createdAt": "2011-02-15T20:16:28.292+0000",
   "isFolder": true,
   "permissions": {
     "inherited": [
       {
         "authorityId": "GROUP_site_swsdp_SiteContributor",
         "name": "SiteContributor",
         "accessStatus": "ALLOWED"
       },
       {
         "authorityId": "GROUP_site_swsdp_SiteConsumer",
         "name": "SiteConsumer",
         "accessStatus": "ALLOWED"
       },
       {
         "authorityId": "GROUP_site_swsdp_SiteManager",
         "name": "SiteManager",
         "accessStatus": "ALLOWED"
       },
       {
         "authorityId": "GROUP_site_swsdp_SiteCollaborator",
         "name": "SiteCollaborator",
         "accessStatus": "ALLOWED"
       },
       {
         "authorityId": "GROUP_EVERYONE",
         "name": "SiteConsumer",
         "accessStatus": "ALLOWED"
       },
       {
         "authorityId": "GROUP_EVERYONE",
         "name": "ReadPermissions",
         "accessStatus": "ALLOWED"
       }
     ],
     "settable": [
       "Contributor",
       "Collaborator",
       "Coordinator",
       "Editor",
       "Consumer"
     ],
     "isInheritanceEnabled": true
   },
   "modifiedByUser": {
     "id": "mjackson",
     "displayName": "Mike Jackson"
   },
   "name": "documentLibrary",
   "id": "8f2105b4-daaf-4874-9e8a-2152569d109b",
   "properties": {
     "cm:tagScopeCache": {
       "contentUrl": "store://2019/1/16/15/53/ff4d2006-ec20-4877-b6a3-acc5c44d6410.bin",
       "mimetype": "text/plain",
       "size": 0,
       "encoding": "UTF-8",
       "locale": "en_GB",
       "id": 155,
       "infoUrl": "contentUrl=store://2019/1/16/15/53/ff4d2006-ec20-4877-b6a3-acc5c44d6410.bin|mimetype=text/plain|size=0|encoding=UTF-8|locale=en_GB_"
     },
     "cm:tagScopeSummary": [],
     "cm:owner": {
       "id": "admin",
       "displayName": "Administrator"
     },
     "st:componentId": "documentLibrary",
     "cm:description": "Document Library"
   }
 }
}
```

Here we have a few more inherited permission settings that have been automatically set up when the site was created. When you create a site four new groups are also created automatically and default permissions are set up for those. Note that the permission role names \(`SiteConsumer`, `SiteContributor`, `SiteCollaborator`, and `SiteManager`\) are slightly different from the ones used when setting local permissions \(i.e. `settable`\).

Now, let's look at an example of how to update the permissions for the "Engineering" folder node. It should be straight forward as we know that this folder doesn't have any locally set permissions.

We will use the following POST body to set new permissions for a group and a user:

```
{
  "permissions":
    {
      "isInheritanceEnabled": true,
      "locallySet":
        [
          {"authorityId": "GROUP_engineering", "name": "Collaborator", "accessStatus":"ALLOWED"},
          {"authorityId": "test", "name": "Contributor", "accessStatus":"ALLOWED"}
        ]
    }
}
```

In this case we are giving a group with identifier `engineering` *Collaborator* permissions on the "/Company Home/Engineering" folder. Note that group identifiers have to be prefixed with `GROUP_`. At the same time we also give the user identified with username `test` *Contributor* permissions on the "Engineering" folder.

And here is the call, note that we cannot use the `relativePath` parameter here, instead we have to use the Node Identifier for the "Engineering" folder, which we know from the GET call above:

```
$ curl -X PUT -H 'Content-Type: application/json' -H 'Accept: application/json' -H 'Authorization: Basic VElDS0VUXzA4ZWI3ZTJlMmMxNzk2NGNhNTFmMGYzMzE4NmNjMmZjOWQ1NmQ1OTM=' -d '{ "permissions": { "isInheritanceEnabled": true, "locallySet": [ {"authorityId": "GROUP_engineering", "name": "Collaborator", "accessStatus":"ALLOWED"},{"authorityId": "test", "name": "Contributor", "accessStatus":"ALLOWED"} ] } }' 'http://localhost:8080/alfresco/api/-default-/public/alfresco/versions/1/nodes/d9cb3cf4-d7fc-4240-acd4-2483c4ca932c?include=permissions'  | jq
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
100  1099    0   869  100   230  39500  10454 --:--:-- --:--:-- --:--:-- 52333
{
  "entry": {
    "aspectNames": [
      "cm:titled",
      "cm:auditable"
    ],
    "createdAt": "2019-12-02T08:50:11.922+0000",
    "isFolder": true,
    "isFile": false,
    "createdByUser": {
      "id": "admin",
      "displayName": "Administrator"
    },
    "modifiedAt": "2019-12-02T09:20:03.409+0000",
    "permissions": {
      "inherited": [
        {
          "authorityId": "GROUP_EVERYONE",
          "name": "Read",
          "accessStatus": "ALLOWED"
        },
        {
          "authorityId": "guest",
          "name": "Read",
          "accessStatus": "ALLOWED"
        }
      ],
      "locallySet": [
        {
          "authorityId": "test",
          "name": "Contributor",
          "accessStatus": "ALLOWED"
        },
        {
          "authorityId": "GROUP_engineering",
          "name": "Collaborator",
          "accessStatus": "ALLOWED"
        }
      ],
      "settable": [
        "Contributor",
        "Collaborator",
        "Coordinator",
        "Editor",
        "Consumer"
      ],
      "isInheritanceEnabled": true
    },
    "modifiedByUser": {
      "id": "admin",
      "displayName": "Administrator"
    },
    "name": "Engineering",
    "id": "d0ec1a36-0bda-40b9-8602-804b787f800e",
    "nodeType": "cm:folder",
    "parentId": "209d2313-f9e8-4075-b778-08d9d4725cd2"
  }
}
```

Note that by using the **/nodes/d9cb3cf4-d7fc-4240-acd4-2483c4ca932c?include=permissions** PUT call the new permission configuration \(i.e. the `permissions` property\) is returned in the response, so we can see immediately that the new local permissions have been set properly in the `locallySet` property.

If you now wanted to update the locally set permissions for the "Engineering" folder again, then you would have to include the permissions we just set, and if you don't know them use the **GET /nodes/-root-?relativePath=/Engineering&include=permissions** call to fetch them, otherwise they would be removed:

```
{
  "permissions":
    {
      "isInheritanceEnabled": true,
      "locallySet":
        [
          {"authorityId": "GROUP_engineering", "name": "Collaborator", "accessStatus":"ALLOWED"}, -- permission already set that we want to keep
          {"authorityId": "test", "name": "Contributor", "accessStatus":"ALLOWED"},               -- permission already set that we want to keep
          {"authorityId": more new permission settings here...},
          ...
        ]
    }
}
```

If you wanted to remove all locally set permissions for a node, then you could use the following body in the call:

```
{
  "permissions": {
    "isInheritanceEnabled": true,
    "locallySet": [ ]
    }
}
```

**Parent topic:**[Managing Folders and Files](../concepts/dev-api-by-language-alf-rest-mng-folders-files.md)

