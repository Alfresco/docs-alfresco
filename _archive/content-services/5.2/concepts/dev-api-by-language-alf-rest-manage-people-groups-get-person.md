---
author: [Alfresco Documentation, Alfresco Documentation]
---

# Get person metadata

Get the metadata \(i.e. properties\) for a person, including preferences and avatar.

|API Call|GET /people/\{id\} GET /people/\{id\}/preferences

GET /people/\{id\}/preferences/\{id\}

GET /people/\{id\}/avatar

|
|--------|---------------------------------------------------------------------------------------------------------------------|
|API Explorer URL|[http://localhost:8080/api-explorer/\#!/people/getPerson](http://localhost:8080/api-explorer/#!/people/getPerson) [http://localhost:8080/api-explorer/\#!/preferences/listPreferences](http://localhost:8080/api-explorer/#!/preferences/listPreferences) [http://localhost:8080/api-explorer/\#!/preferences/getPreference](http://localhost:8080/api-explorer/#!/preferences/getPreference) [http://localhost:8080/api-explorer/\#!/people/getAvatarImage](http://localhost:8080/api-explorer/#!/people/getAvatarImage)|
|See also|[How to get the groups that a person is a member of](dev-api-by-language-alf-rest-manage-people-groups-list-person-group-membership.md)|
|Repository Info|[Concepts](dev-repository-concepts.md) [Glossary](dev-glossary.md)|

Getting the metadata \(i.e. properties\) for a person \(user\) is done with the following GET call:

**http://localhost:8080/alfresco/api/-default-/public/alfresco/versions/1/people/\{id\}**

The identifier for the person we want to get metadata for is specified with the `{id}` parameter.

To get metadata for a person with id `test` make the following call:

```
$ curl -X GET -H 'Accept: application/json' -H 'Authorization: Basic VElDS0VUXzA4ZWI3ZTJlMmMxNzk2NGNhNTFmMGYzMzE4NmNjMmZjOWQ1NmQ1OTM=' 'http://localhost:8080/alfresco/api/-default-/public/alfresco/versions/1/people/test' | jq
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
100   266    0   266    0     0   1112      0 --:--:-- --:--:-- --:--:--  1108
{
  "entry": {
    "firstName": "Testing",
    "lastName": "User number 1",
    "capabilities": {
      "isGuest": false,
      "isAdmin": false,
      "isMutable": true
    },
    "displayName": "Testing User number 1",
    "emailNotificationsEnabled": true,
    "company": {},
    "id": "test",
    "enabled": false,
    "email": "test@alfresco.com"
  }
}
```

All the properties that are set are returned by default. For example, the `abeecher` user has more properties from the `cm:person` object set, here is how the call looks like for this user:

```
$ curl -X GET -H 'Accept: application/json' -H 'Authorization: Basic VElDS0VUXzA4ZWI3ZTJlMmMxNzk2NGNhNTFmMGYzMzE4NmNjMmZjOWQ1NmQ1OTM=' 'http://localhost:8080/alfresco/api/-default-/public/alfresco/versions/1/people/abeecher' | jq
 % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                Dload  Upload   Total   Spent    Left  Speed
100   766    0   766    0     0  40315      0 --:--:-- --:--:-- --:--:-- 40315
{
 "entry": {
   "lastName": "Beecher",
   "userStatus": "Helping to design the look and feel of the new web site",
   "capabilities": {
     "isGuest": false,
     "isAdmin": false,
     "isMutable": true
   },
   "displayName": "Alice Beecher",
   "jobTitle": "Graphic Designer",
   "statusUpdatedAt": "2011-02-15T20:20:13.432+0000",
   "mobile": "0112211001100",
   "emailNotificationsEnabled": true,
   "description": "Alice is a demo user for the sample Alfresco Team site.",
   "telephone": "0112211001100",
   "enabled": false,
   "firstName": "Alice",
   "skypeId": "abeecher",
   "avatarId": "198500fc-1e99-4f5f-8926-248cea433366",
   "location": "Tilbury, UK",
   "company": {
     "organization": "Moresby, Garland and Wedge",
     "address1": "200 Butterwick Street",
     "address2": "Tilbury",
     "address3": "UK",
     "postcode": "ALF1 SAM1"
   },
   "id": "abeecher",
   "email": "abeecher@example.com"
 }
}
```

If you don't want all properties returned you can control that with the `fields` parameter as follows:

```
$ curl -X GET -H 'Accept: application/json' -H 'Authorization: Basic VElDS0VUXzA4ZWI3ZTJlMmMxNzk2NGNhNTFmMGYzMzE4NmNjMmZjOWQ1NmQ1OTM=' 'http://localhost:8080/alfresco/api/-default-/public/alfresco/versions/1/people/abeecher?fields=id,displayName' | jq
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
100    57    0    57    0     0   4071      0 --:--:-- --:--:-- --:--:--  4071
{
  "entry": {
    "displayName": "Alice Beecher",
    "id": "abeecher"
  }
}
```

Custom content model properties are not returned by default, use the `include` parameter to have them returned and set it to `include=propertiers` parameter.

To get the configured preferences for a person \(user\) use the following GET call:

**http://localhost:8080/alfresco/api/-default-/public/alfresco/versions/1/people/\{id\}/preferences**

The identifier for the person we want to get preferences for is specified with the `{id}` parameter.

To get preferences for a person with id `abeecher` make the following call:

```
$ curl -X GET -H 'Accept: application/json' -H 'Authorization: Basic VElDS0VUXzA4ZWI3ZTJlMmMxNzk2NGNhNTFmMGYzMzE4NmNjMmZjOWQ1NmQ1OTM=' 'http://localhost:8080/alfresco/api/-default-/public/alfresco/versions/1/people/abeecher/preferences' | jq
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
100   995    0   995    0     0  21170      0 --:--:-- --:--:-- --:--:-- 21170
{
  "list": {
    "pagination": {
      "count": 7,
      "hasMoreItems": false,
      "totalItems": 7,
      "skipCount": 0,
      "maxItems": 100
    },
    "entries": [
      {
        "entry": {
          "id": "org.alfresco.share.documentList.showFolders",
          "value": true
        }
      },
      {
        "entry": {
          "id": "org.alfresco.share.documentList.simpleView",
          "value": false
        }
      },
      {
        "entry": {
          "id": "org.alfresco.share.documentList.sortField",
          "value": "cm:name"
        }
      },
      {
        "entry": {
          "id": "org.alfresco.share.documents.favourites",
          "value": "workspace://SpacesStore/7c7bca1d-b65d-4444-9378-805b459fb74d,workspace://SpacesStore/b2f21ddd-0b0e-449f-bea9-a0be73e7d67b,workspace://SpacesStore/2cf35860-6705-42c3-b123-c4d6b39997b4,workspace://SpacesStore/7d90c94c-fcf7-4f79-9273-bd1352bbb612,workspace://SpacesStore/05dedd34-9d9d-48d9-9af6-c81b555541c9"
        }
      },
      {
        "entry": {
          "id": "org.alfresco.share.sites.favourites.test",
          "value": true
        }
      },
      {
        "entry": {
          "id": "org.alfresco.share.sites.recent._0",
          "value": "swsdp"
        }
      },
      {
        "entry": {
          "id": "org.alfresco.share.twisters.collapsed",
          "value": "DocumentPermissions,DocumentWorkflows,DocumentLinks,DocumentActions"
        }
      }
    ]
  }
}
```

You can get a single preference for a person by the preference `id` as follows:

```
$ curl -X GET -H 'Accept: application/json' -H 'Authorization: Basic VElDS0VUXzA4ZWI3ZTJlMmMxNzk2NGNhNTFmMGYzMzE4NmNjMmZjOWQ1NmQ1OTM=' 'http://localhost:8080/alfresco/api/-default-/public/alfresco/versions/1/people/abeecher/preferences/org.alfresco.share.documents.favourites' | jq
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
100   373    0   373    0     0  46625      0 --:--:-- --:--:-- --:--:-- 46625
{
  "entry": {
    "id": "org.alfresco.share.documents.favourites",
    "value": "workspace://SpacesStore/7c7bca1d-b65d-4444-9378-805b459fb74d,workspace://SpacesStore/b2f21ddd-0b0e-449f-bea9-a0be73e7d67b,workspace://SpacesStore/2cf35860-6705-42c3-b123-c4d6b39997b4,workspace://SpacesStore/7d90c94c-fcf7-4f79-9273-bd1352bbb612,workspace://SpacesStore/05dedd34-9d9d-48d9-9af6-c81b555541c9"
  }
}

```

**Parent topic:**[Managing People and Groups](../concepts/dev-api-by-language-alf-rest-manage-people-groups-intro.md)

