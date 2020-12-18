---
title: Managing People and Groups
---

This section walks through how to manage people and groups via the ReST API.

Being able to manage people and groups remotely is useful in different test scenarios, development environments and, 
for example, when group permissions should be set up on folders.

However, it should be noted that in a production environment Alfresco is usually connected to an LDAP system and users 
(people) and groups are then synchronized (imported) from the LDAP system, including group memberships.

## List people (users)

List people (i.e. users) in the repository.

**API Explorer URL:** [http://localhost:8080/api-explorer/#!/people/listPeople](http://localhost:8080/api-explorer/#!/people/listPeople){:target="_blank"}

**See also:**

* [How to list group membership for people](#listpersongroupmembership)
* [how to find people by term]({% link content-services/latest/develop/rest-api-guide/searching.md %}#findpeoplebyterm)
* [How to search for people]({% link content-services/latest/develop/rest-api-guide/searching.md %}#searchbyquery)

A useful feature is to be able to list people in the repository. The following GET request is used:

`http://localhost:8080/alfresco/api/-default-/public/alfresco/versions/1/people`

Here is how to make the call:

```bash
$ curl -X GET -H 'Accept: application/json' -H 'Authorization: Basic VElDS0VUXzA4ZWI3ZTJlMmMxNzk2NGNhNTFmMGYzMzE4NmNjMmZjOWQ1NmQ1OTM=' 'http://localhost:8080/alfresco/api/-default-/public/alfresco/versions/1/people' | jq
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
100  1686  100  1686    0     0   4052      0 --:--:-- --:--:-- --:--:--  4052
{
  "list": {
    "pagination": {
      "count": 4,
      "hasMoreItems": false,
      "totalItems": 4,
      "skipCount": 0,
      "maxItems": 100
    },
    "entries": [
      {
        "entry": {
          "lastName": "Beecher",
          "userStatus": "Helping to design the look and feel of the new web site",
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
      },
      {
        "entry": {
          "firstName": "Administrator",
          "emailNotificationsEnabled": true,
          "company": {},
          "id": "admin",
          "enabled": true,
          "email": "admin@alfresco.com"
        }
      },
      {
        "entry": {
          "firstName": "Guest",
          "emailNotificationsEnabled": true,
          "company": {},
          "id": "guest",
          "enabled": false
        }
      },
      {
        "entry": {
          "lastName": "Jackson",
          "userStatus": "Working on a new web design for the corporate site",
          "jobTitle": "Web Site Manager",
          "statusUpdatedAt": "2011-02-15T20:13:09.649+0000",
          "mobile": "012211331100",
          "emailNotificationsEnabled": true,
          "description": "Mike is a demo user for the sample Alfresco Team site.",
          "telephone": "012211331100",
          "enabled": false,
          "firstName": "Mike",
          "skypeId": "mjackson",
          "avatarId": "3fbde500-298b-4e80-ae50-e65a5cbc2c4d",
          "location": "Threepwood, UK",
          "company": {
            "organization": "Green Energy",
            "address1": "100 Cavendish Street",
            "address2": "Threepwood",
            "address3": "UK",
            "postcode": "ALF1 SAM1"
          },
          "id": "mjackson",
          "email": "mjackson@example.com"
        }
      }
    ]
  }
}
```

You may know that in the `/nodes` API, the properties and aspect names are not present by default but can be included 
via the `include` query parameter, the same holds true here as well. If you want to see any custom properties or aspects 
applied you can add `include=properties,aspectNames` to the URL. The results can also be sorted by `id` (username), 
`firstName` and `lastName`.

Unfortunately, there is no way of filtering the output, which can be a problem when you have loads of users. However, the 
`/queries/people` endpoint or the `/search` endpoint can be used to look for people and achieve the same thing.

## Create a person {#createperson}

Creating a person (user) in the repository.

**API Explorer URL:** [http://localhost:8080/api-explorer/#!/people/createPerson](http://localhost:8080/api-explorer/#!/people/createPerson){:target="_blank"}

**See also:** [How to update a person](#updateperson)

Creating a person (i.e. user) is done with the following POST call:

`http://localhost:8080/alfresco/api/-default-/public/alfresco/versions/1/people`

The POST body for a person create call looks like this, you can use any of the properties defined in the out-of-the-box 
`cm:person` type:

```json
{
    "id": "string",
    "firstName": "string",
    "lastName": "string",
    "description": "string",
    "email": "string",
    "skypeId": "string",
    "googleId": "string",
    "instantMessageId": "string",
    "jobTitle": "string",
    "location": "string",
    "company": {
        "organization": "string",
        "address1": "string",
        "address2": "string",
        "address3": "string",
        "postcode": "string",
        "telephone": "string",
        "fax": "string",
        "email": "string"
    },
    "mobile": "string",
    "telephone": "string",
    "userStatus": "string",
    "enabled": true,
    "emailNotificationsEnabled": true,
    "password": "string",
    "aspectNames": [
        "string"
    ],
    "properties": {}
}
```

To create a person you must have admin rights. What this means is that the user that is making the ReST call must be a 
member of the `ALFRESCO_ADMINISTRATORS` group.

When creating the user the `enabled` property can be used to configure if the user should have access to Alfresco or not, 
if not specified the user has access by default.

Let's create a user with id `test` and set minimal data for the user with the following POST body:

```json
{
    "id": "test",
    "firstName": "Test",
    "lastName": "User",
    "password": "test",
    "email": "test@alfresco.com"
}
```

The call looks like this:

```bash
$ curl -X POST -H 'Content-Type: application/json' -H 'Accept: application/json' -H 'Authorization: Basic VElDS0VUXzA4ZWI3ZTJlMmMxNzk2NGNhNTFmMGYzMzE4NmNjMmZjOWQ1NmQ1OTM=' -d '{ "id": "test", "firstName": "Test", "lastName": "User", "password": "test", "email": "test@alfresco.com"}' 'http://localhost:8080/alfresco/api/-default-/public/alfresco/versions/1/people' | jq
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
100   347    0   241  100   106    607    267 --:--:-- --:--:-- --:--:-* 871
{
  "entry": {
    "firstName": "Test",
    "lastName": "User",
    "capabilities": {
      "isGuest": false,
      "isAdmin": false,
      "isMutable": true
    },
    "displayName": "Test User",
    "emailNotificationsEnabled": true,
    "company": {},
    "id": "test",
    "enabled": true,
    "email": "test@alfresco.com"
  }
}
```

Many Alfresco customers extend the out-of-the-box `cm:person` object, so support for custom properties have been added 
to this endpoint. For example, to create a person with a custom property called `acme:employeeId` the following POST 
body could be used (presuming the property has been defined in a custom content model).

The `properties` POST data property is used for this:

```json
{
    "id": "test2",
    "firstName": "Test 2",
    "lastName": "User",
    "password": "test",
    "email": "test2@alfresco.com",
    "properties": {
        "acme:employeeId": "abc-123"
    }
}
```

To add an avatar image to a newly created person see the [update person](#updateperson) page.

>**Note**. in a production environment the users and groups are usually synched / imported from an LDAP environment, and not created manually like this. However, it can be useful to create users remotely like this for testing purpose and in a developer environment.

## Get person metadata

Get the metadata (i.e. properties) for a person, including preferences and avatar.

**API Explorer URL:** 

* [http://localhost:8080/api-explorer/#!/people/getPerson](http://localhost:8080/api-explorer/#!/people/getPerson){:target="_blank"} 
* [http://localhost:8080/api-explorer/#!/preferences/listPreferences](http://localhost:8080/api-explorer/#!/preferences/listPreferences){:target="_blank"} 
* [http://localhost:8080/api-explorer/#!/preferences/getPreference](http://localhost:8080/api-explorer/#!/preferences/getPreference){:target="_blank"}
* [http://localhost:8080/api-explorer/#!/people/getAvatarImage](http://localhost:8080/api-explorer/#!/people/getAvatarImage){:target="_blank"}

**See also:** [How to get the groups that a person is a member of](#listpersongroupmembership)

Getting the metadata (i.e. properties) for a person (user) is done with the following GET call:

`http://localhost:8080/alfresco/api/-default-/public/alfresco/versions/1/people/{id}`

The identifier for the person we want to get metadata for is specified with the `{id}` parameter.

To get metadata for a person with id `test` make the following call:

```bash
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

All the properties that are set are returned by default. For example, the `abeecher` user has more properties from the 
`cm:person` object set, here is how the call looks like for this user:

```bash
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

```bash
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

Custom content model properties are not returned by default, use the `include` parameter to have them returned and set 
it to `include=propertiers` parameter.

To get the configured preferences for a person (user) use the following GET call:

`http://localhost:8080/alfresco/api/-default-/public/alfresco/versions/1/people/{id}/preferences`

The identifier for the person we want to get preferences for is specified with the `{id}` parameter.

To get preferences for a person with id `abeecher` make the following call:

```bash
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

```bash
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

## Update a person {#updateperson}

Updating the metadata for a person (user) in the repository.

**API Explorer URL:**

* [http://localhost:8080/api-explorer/#!/people/updatePerson](http://localhost:8080/api-explorer/#!/people/updatePerson){:target="_blank"}
* [http://localhost:8080/api-explorer/#!/people/updateAvatarImage](http://localhost:8080/api-explorer/#!/people/updateAvatarImage){:target="_blank"}

**See also:** [How to create a person](#createperson)

It’s possible to update the person (user) metadata, which means updating the properties and the avatar for a person.

The following PUT call is used to update the properties:

`http://localhost:8080/alfresco/api/-default-/public/alfresco/versions/1/people/{id}`

The identifier for the person to be updated is specified with the `{id}` parameter.

To update a person you must have admin rights. What this means is that the user that is making the ReST call must be a 
member of the `ALFRESCO_ADMINISTRATORS` group.

The PUT body for a person properties update call looks like this:

```json
{
"entry": {
    "id": "string",
    "firstName": "string",
    "lastName": "string",
    "displayName": "string",
    "description": "string",
    "avatarId": "string",
    "email": "string",
    "skypeId": "string",
    "googleId": "string",
    "instantMessageId": "string",
    "jobTitle": "string",
    "location": "string",
    "company": {
        "organization": "string",
        "address1": "string",
        "address2": "string",
        "address3": "string",
        "postcode": "string",
        "telephone": "string",
        "fax": "string",
        "email": "string"
    },
    "mobile": "string",
    "telephone": "string",
    "statusUpdatedAt": "2019-11-25T09:07:31.388Z",
    "userStatus": "string",
    "enabled": true,
    "emailNotificationsEnabled": true,
    "aspectNames": [
        "string"
    ],
    "properties": {},
    "capabilities": {}
}
```

Let's assume we have a user in the repository with id `test` that we want to update the first name and last name for. 
This is then the PUT body we need to send:

```json
{
    "firstName": "Testing",
    "lastName": "User number 1"
}
```

Here is the call:

```bash
$ curl -X PUT -H 'Content-Type: application/json' -H 'Accept: application/json' -H 'Authorization: Basic VElDS0VUXzA4ZWI3ZTJlMmMxNzk2NGNhNTFmMGYzMzE4NmNjMmZjOWQ1NmQ1OTM=' -d '{ "firstName": "Testing", "lastName": "User number 1"}' 'http://localhost:8080/alfresco/api/-default-/public/alfresco/versions/1/people/test' | jq
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
100   319    0   265  100    54   1003    204 --:--:-- --:--:-- --:--:--  1212
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
    "enabled": true,
    "email": "test@alfresco.com"
  }
}
```

It's common to have to disable access for users. This can be done with this call as well. The following PUT body is used:

```json
{
    "enabled": false
}
```

Here is the call to disable access to Alfresco for the `test` user:

```bash
$ curl -X PUT -H 'Content-Type: application/json' -H 'Accept: application/json' -H 'Authorization: Basic VElDS0VUXzA4ZWI3ZTJlMmMxNzk2NGNhNTFmMGYzMzE4NmNjMmZjOWQ1NmQ1OTM=' -d '{ "enabled": false }' 'http://localhost:8080/alfresco/api/-default-/public/alfresco/versions/1/people/test' | jq
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
100   286    0   266  100    20   6650    500 --:--:-- --:--:-- --:--:--  7150
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

If the `test` user now tries to login that will not work and an error message will be displayed.

Similarly, if you want to enable access for a user you would just post `{ "enabled": true }`.

To update the avatar image (photo) for a person the following PUT call is used:

`http://localhost:8080/alfresco/api/-default-/public/alfresco/versions/1/people/{id}/avatar`

Let's say we have a PNG image called `test_user_photo.png` that we want to set as avatar for the `test` user.

Here is the call to do that:

```bash
$ curl -X PUT -H 'Content-Type: image/png' -H 'Accept: application/json' -H 'Authorization: Basic VElDS0VUXzA4ZWI3ZTJlMmMxNzk2NGNhNTFmMGYzMzE4NmNjMmZjOWQ1NmQ1OTM=' --data-binary '@test_user_photo.png' 'http://localhost:8080/alfresco/api/-default-/public/alfresco/versions/1/people/test/avatar' | jq
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
100 14998  100   199  100 14799    210  15676 --:--:-- --:--:-- --:--:-- 15870
{
  "entry": {
    "firstName": "Test",
    "lastName": "User",
    "avatarId": "8c2494ab-110c-4846-b2b4-0764bb24f578",
    "emailNotificationsEnabled": true,
    "company": {},
    "id": "test",
    "enabled": true,
    "email": "test@alfresco.com"
  }
}

```

Note the `avatarId` property in the response, which is the identifier for the uploaded and transformed avatar image.

If you are running an SDK Project you will most likely get the following type of response:

```json
{
  "error": {
    "errorKey": "Unable to create thumbnail 'avatar' for image/png as no transformer is currently available.",
    "statusCode": 400,
    "briefSummary": "10250023 Unable to create thumbnail 'avatar' for image/png as no transformer is currently available.",
    "stackTrace": "For security reasons the stack trace is no longer displayed, but the property is kept for previous versions",
    "descriptionURL": "https://api-explorer.alfresco.com"
  }
}
```

An Alfresco SDK project doesn't have all the image transformers configured so this avatar image upload does not work in 
this situation.

## Request password reset for a person

Requesting a password reset for a a person (user) in the repository.

**API Explorer URL:**

* [http://localhost:8080/api-explorer/#!/people/requestPasswordReset](http://localhost:8080/api-explorer/#!/people/requestPasswordReset){:target="_blank"} 
* [http://localhost:8080/api-explorer/#!/people/resetPassword](http://localhost:8080/api-explorer/#!/people/resetPassword){:target="_blank"}

**See also:** [How to create a person](#createperson)

It’s possible to request a reset of the password for a person (user). An email will be sent to the user with information 
on how to reset the password via a link to a specific UI client. The POST body specifies what client that should be used 
to reset the password:

```json
{
  "client": "my client"
}
```

Currently only the Alfresco Share UI client is registered with the Alfresco Repository server. So you would POST the 
following:

```json
{
  "client": "share"
}
```

Use the following POST call:

`http://localhost:8080/alfresco/api/-default-/public/alfresco/versions/1/people/{id}/request-password-reset`

The identifier for the person that requests a password reset is specified with the `{id}` parameter.

To request a password reset via the Alfresco Share UI client for a person with id `test` make the following call:

```bash
$ curl -X POST -H 'Content-Type: application/json' -H 'Accept: application/json' -d '{ "client": "share" }' 'http://localhost:8080/alfresco/api/-default-/public/alfresco/versions/1/people/test/request-password-reset' | jq
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
100    21    0     0  100    21      0   1500 --:--:-- --:--:-- --:--:--  1500
```

An email is now sent by the server to the email address that is stored for the `test` user. So to test this you would 
need to configure an SMTP server that the Alfresco repository server can talk to and send the email.

## List groups a person is a member of {#listpersongroupmembership}

List all the groups that a person is a member of.

**API Explorer URL:** [http://localhost:8080/api-explorer/#!/groups/listGroupMembershipsForPerson](http://localhost:8080/api-explorer/#!/groups/listGroupMembershipsForPerson){:target="_blank"}

**See also:** [How to list all members (people and groups) of a group](#listmembersofgroup)

You might know how to list members of a group but you can also list all groups that a person is a member of.

The following call is used for that:

`http://localhost:8080/alfresco/api/-default-/public/alfresco/versions/1/people/{id}/groups`

The identifier for the person we want to list group memberships for is specified with the `{id}` parameter.

Here is how to get all group memberships for a user with id `abeecher`:

```bash
$ curl -X GET -H 'Accept: application/json' -H 'Authorization: Basic VElDS0VUXzA4ZWI3ZTJlMmMxNzk2NGNhNTFmMGYzMzE4NmNjMmZjOWQ1NmQ1OTM=' 'http://localhost:8080/alfresco/api/-default-/public/alfresco/versions/1/people/abeecher/groups' | jq
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
100   350    0   350    0     0  12500      0 --:--:-- --:--:-- --:--:-- 12500
{
  "list": {
    "pagination": {
      "count": 3,
      "hasMoreItems": false,
      "totalItems": 3,
      "skipCount": 0,
      "maxItems": 100
    },
    "entries": [
      {
        "entry": {
          "isRoot": false,
          "id": "GROUP_EVERYONE"
        }
      },
      {
        "entry": {
          "isRoot": true,
          "displayName": "site_swsdp",
          "id": "GROUP_site_swsdp"
        }
      },
      {
        "entry": {
          "isRoot": false,
          "displayName": "site_swsdp_SiteCollaborator",
          "id": "GROUP_site_swsdp_SiteCollaborator"
        }
      }
    ]
  }
}
```

## List groups

List groups in the repository.

**API Explorer URL:** [http://localhost:8080/api-explorer/#!/groups/listGroups](http://localhost:8080/api-explorer/#!/groups/listGroups){:target="_blank"}

**See also:** [How to list members (people and groups) of a group.](#listmembersofgroup)

To list groups in the repository use the following GET call:

`http://localhost:8080/alfresco/api/-default-/public/alfresco/versions/1/groups`

Here is how to make the call:

```bash
$ curl -X GET -H 'Accept: application/json' -H 'Authorization: Basic VElDS0VUXzA4ZWI3ZTJlMmMxNzk2NGNhNTFmMGYzMzE4NmNjMmZjOWQ1NmQ1OTM=' 'http://localhost:8080/alfresco/api/-default-/public/alfresco/versions/1/groups' | jq
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
100  1321    0  1321    0     0   4316      0 --:--:-- --:--:-- --:--:--  4316
{
  "list": {
    "pagination": {
      "count": 12,
      "hasMoreItems": false,
      "totalItems": 12,
      "skipCount": 0,
      "maxItems": 100
    },
    "entries": [
      {
        "entry": {
          "isRoot": true,
          "displayName": "Engineering UPDATED",
          "id": "GROUP_engineering"
        }
      },
      {
        "entry": {
          "isRoot": true,
          "displayName": "ALFRESCO_ADMINISTRATORS",
          "id": "GROUP_ALFRESCO_ADMINISTRATORS"
        }
      },
      {
        "entry": {
          "isRoot": true,
          "displayName": "ALFRESCO_MODEL_ADMINISTRATORS",
          "id": "GROUP_ALFRESCO_MODEL_ADMINISTRATORS"
        }
      },
      {
        "entry": {
          "isRoot": true,
          "displayName": "ALFRESCO_SEARCH_ADMINISTRATORS",
          "id": "GROUP_ALFRESCO_SEARCH_ADMINISTRATORS"
        }
      },
      {
        "entry": {
          "isRoot": true,
          "displayName": "EMAIL_CONTRIBUTORS",
          "id": "GROUP_EMAIL_CONTRIBUTORS"
        }
      },
      {
        "entry": {
          "isRoot": true,
          "displayName": "SITE_ADMINISTRATORS",
          "id": "GROUP_SITE_ADMINISTRATORS"
        }
      },
      {
        "entry": {
          "isRoot": true,
          "displayName": "site_swsdp",
          "id": "GROUP_site_swsdp"
        }
      },
      {
        "entry": {
          "isRoot": false,
          "displayName": "site_swsdp_SiteCollaborator",
          "id": "GROUP_site_swsdp_SiteCollaborator"
        }
      },
      {
        "entry": {
          "isRoot": false,
          "displayName": "site_swsdp_SiteConsumer",
          "id": "GROUP_site_swsdp_SiteConsumer"
        }
      },
      {
        "entry": {
          "isRoot": false,
          "displayName": "site_swsdp_SiteContributor",
          "id": "GROUP_site_swsdp_SiteContributor"
        }
      },
      {
        "entry": {
          "isRoot": false,
          "displayName": "site_swsdp_SiteManager",
          "id": "GROUP_site_swsdp_SiteManager"
        }
      },
      {
        "entry": {
          "isRoot": false,
          "displayName": "System Architects",
          "id": "GROUP_system-architects"
        }
      }
    ]
  }
}
```

This can return a lot of groups, by default it will return up to 100. Use the `maxItems` parameter to limit the number of groups returned:

```bash
$ curl -X GET -H 'Accept: application/json' -H 'Authorization: Basic VElDS0VUXzA4ZWI3ZTJlMmMxNzk2NGNhNTFmMGYzMzE4NmNjMmZjOWQ1NmQ1OTM=' 'http://localhost:8080/alfresco/api/-default-/public/alfresco/versions/1/groups?fields=id&maxItems=5' | jq
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
100   351    0   351    0     0  23400      0 --:--:-- --:--:-- --:--:-- 23400
{
  "list": {
    "pagination": {
      "count": 5,
      "hasMoreItems": true,
      "totalItems": 12,
      "skipCount": 0,
      "maxItems": 5
    },
    "entries": [
      {
        "entry": {
          "id": "GROUP_engineering"
        }
      },
      {
        "entry": {
          "id": "GROUP_ALFRESCO_ADMINISTRATORS"
        }
      },
      {
        "entry": {
          "id": "GROUP_ALFRESCO_MODEL_ADMINISTRATORS"
        }
      },
      {
        "entry": {
          "id": "GROUP_ALFRESCO_SEARCH_ADMINISTRATORS"
        }
      },
      {
        "entry": {
          "id": "GROUP_EMAIL_CONTRIBUTORS"
        }
      }
    ]
  }
}
```

Here we have also used the `fields` parameter to only include the `id` property in the response.

You can also filter groups with the `where` clause, the `isRoot` and `zones` properties can be used. For example, to 
return only root groups use the following call:

```bash
$ curl -X GET -H 'Accept: application/json' -H 'Authorization: Basic VElDS0VUXzA4ZWI3ZTJlMmMxNzk2NGNhNTFmMGYzMzE4NmNjMmZjOWQ1NmQ1OTM=' 'http://localhost:8080/alfresco/api/-default-/public/alfresco/versions/1/groups?where=(isRoot=true)' | jq
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
100   799    0   799    0     0   7198      0 --:--:-- --:--:-- --:--:--  7198
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
          "isRoot": true,
          "displayName": "Engineering UPDATED",
          "id": "GROUP_engineering"
        }
      },
      {
        "entry": {
          "isRoot": true,
          "displayName": "ALFRESCO_ADMINISTRATORS",
          "id": "GROUP_ALFRESCO_ADMINISTRATORS"
        }
      },
      {
        "entry": {
          "isRoot": true,
          "displayName": "ALFRESCO_MODEL_ADMINISTRATORS",
          "id": "GROUP_ALFRESCO_MODEL_ADMINISTRATORS"
        }
      },
      {
        "entry": {
          "isRoot": true,
          "displayName": "ALFRESCO_SEARCH_ADMINISTRATORS",
          "id": "GROUP_ALFRESCO_SEARCH_ADMINISTRATORS"
        }
      },
      {
        "entry": {
          "isRoot": true,
          "displayName": "EMAIL_CONTRIBUTORS",
          "id": "GROUP_EMAIL_CONTRIBUTORS"
        }
      },
      {
        "entry": {
          "isRoot": true,
          "displayName": "SITE_ADMINISTRATORS",
          "id": "GROUP_SITE_ADMINISTRATORS"
        }
      },
      {
        "entry": {
          "isRoot": true,
          "displayName": "site_swsdp",
          "id": "GROUP_site_swsdp"
        }
      }
    ]
  }
}
```

## Create a group {#creategroup}

Creating a group in the repository.

**API Explorer URL:** [http://localhost:8080/api-explorer/#!/groups/createGroup](http://localhost:8080/api-explorer/#!/groups/createGroup){:target="_blank"}

**See also:** 

* [How to update a group](#updategroup) 
* [How to add members to a group](#addtogroup)

To create a group you must have admin rights. What this means is that the user that is making the ReST call must be a 
member of the `ALFRESCO_ADMINISTRATORS` group.

Creating a group is done with the following POST call:

`http://localhost:8080/alfresco/api/-default-/public/alfresco/versions/1/groups`

The POST body for a group create call looks like this:

```json
{
"entry": {
    "id": "string",
    "displayName": "string",
    "isRoot": true,
    "parentIds": [
        "string"
    ],
    "zones": [
        "string"
    ]
    }
}
```

You don't need to pass in all these properties. For example, to create a group called **Engineering** with id 
`engineering`, use the following POST body:

```json
{
   "id": "engineering",
   "displayName": "Engineering"
}
```

The call looks like this:

```bash
$ curl -X POST -H 'Content-Type: application/json' -H 'Accept: application/json' -H 'Authorization: Basic VElDS0VUXzA4ZWI3ZTJlMmMxNzk2NGNhNTFmMGYzMzE4NmNjMmZjOWQ1NmQ1OTM=' -d '{ "id": "engineering", "displayName": "Engineering" }' 'http://localhost:8080/alfresco/api/-default-/public/alfresco/versions/1/groups' | jq
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
100   131    0    78  100    53   1098    746 --:--:-- --:--:-- --:--:--  1819
{
  "entry": {
    "isRoot": true,
    "displayName": "Engineering",
    "id": "GROUP_engineering"
  }
}
```

The group id always starts with `GROUP_`. If this is omitted, as in this case, it will be added automatically. This 
format is also returned when listing groups or group memberships.

## Get group metadata

Get the metadata (i.e. properties) for a group in the repository.

**API Explorer URL:** [http://localhost:8080/api-explorer/#!/groups/getGroup](http://localhost:8080/api-explorer/#!/groups/getGroup){:target="_blank"}

**See also:** [How to get the members (people and groups) of a group](#listmembersofgroup)

Getting the metadata (i.e. properties) for a group is done with the following GET call:

`http://localhost:8080/alfresco/api/-default-/public/alfresco/versions/1/groups/{id}`

The identifier for the group we want to get metadata for is specified with the `{id}` parameter.

To get metadata for a group with id `engineering` make the following call:

```bash
$ curl -X GET -H 'Accept: application/json' -H 'Authorization: Basic VElDS0VUXzA4ZWI3ZTJlMmMxNzk2NGNhNTFmMGYzMzE4NmNjMmZjOWQ1NmQ1OTM=' 'http://localhost:8080/alfresco/api/-default-/public/alfresco/versions/1/groups/GROUP_engineering' | jq
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
100    86    0    86    0     0  10750      0 --:--:-- --:--:-- --:--:-- 10750
{
  "entry": {
    "isRoot": true,
    "displayName": "Engineering UPDATED",
    "id": "GROUP_engineering"
  }
}
```

Note that the group `id` has to be prefixed with `GROUP_`.

The `include` parameter can be used to return `parentIds` and `zones`:

```bash
$ curl -X GET -H 'Accept: application/json' -H 'Authorization: Basic VElDS0VUXzA4ZWI3ZTJlMmMxNzk2NGNhNTFmMGYzMzE4NmNjMmZjOWQ1NmQ1OTM=' 'http://localhost:8080/alfresco/api/-default-/public/alfresco/versions/1/groups/GROUP_engineering?include=parentIds,zones' | jq
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
100   136    0   136    0     0  11333      0 --:--:-- --:--:-- --:--:-- 11333
{
  "entry": {
    "isRoot": true,
    "displayName": "Engineering UPDATED",
    "parentIds": [],
    "id": "GROUP_engineering",
    "zones": [
      "APP.DEFAULT",
      "AUTH.ALF"
    ]
  }
}
```

## Update a group {#updategroup}

Updating the metadata (i.e. properties) for a group in the repository.

**API Explorer URL:** [http://localhost:8080/api-explorer/#!/groups/updateGroup](http://localhost:8080/api-explorer/#!/groups/updateGroup){:target="_blank"}

**See also:**

* [How to create a group](#creategroup)
* [How to add members (people and groups) to a group](#addtogroup)

To update a group you must have admin rights. What this means is that the user that is making the ReST call must be a 
member of the `ALFRESCO_ADMINISTRATORS` group.

It’s possible to update the group's `displayName`. Use the following PUT call:

`http://localhost:8080/alfresco/api/-default-/public/alfresco/versions/1//groups/{id}`

The identifier for the group to be updated is specified with the `{id}` parameter.

The body for a group update call looks like this:

```json
{
    "displayName": "string"
}
```

To update the display name for a group with the id `engineering` make the following call:

```bash
$ curl -X PUT -H 'Content-Type: application/json' -H 'Accept: application/json' -H 'Authorization: Basic VElDS0VUXzA4ZWI3ZTJlMmMxNzk2NGNhNTFmMGYzMzE4NmNjMmZjOWQ1NmQ1OTM=' -d '{ "displayName": "Engineering UPDATED" }' 'http://localhost:8080/alfresco/api/-default-/public/alfresco/versions/1/groups/GROUP_engineering' | jq
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
100   126    0    86  100    40   1755    816 --:--:-- --:--:-- --:--:--  2571
{
  "entry": {
    "isRoot": true,
    "displayName": "Engineering UPDATED",
    "id": "GROUP_engineering"
  }
}
```

Note that you have to prefix the group id with `GROUP_`.

## List all people and groups in a group {#listmembersofgroup}

## Adding people and groups to a group {#addtogroup}
## Delete a person or group from a group
## Setting permissions for a group
