---
author: [Alfresco Documentation, Alfresco Documentation]
---

# Update a person

Updating the metadata for a person \(user\) in the repository.

|API Call|PUT /people/\{id\} PUT /people/\{id\}/avatar

|
|--------|----------------------------------------------|
|API Explorer URL|[http://localhost:8080/api-explorer/\#!/people/updatePerson](http://localhost:8080/api-explorer/#!/people/updatePerson) and [http://localhost:8080/api-explorer/\#!/people/updateAvatarImage](http://localhost:8080/api-explorer/#!/people/updateAvatarImage)|
|See also|[How to create a person](dev-api-by-language-alf-rest-manage-people-groups-create-person.md)|
|Repository Info|[Concepts](dev-repository-concepts.md) [Glossary](dev-glossary.md)|

It’s possible to update the person \(user\) metadata, which means updating the properties and the avatar for a person.

The following PUT call is used to update the properties:

**http://localhost:8080/alfresco/api/-default-/public/alfresco/versions/1/people/\{id\}**

The identifier for the person to be updated is specified with the `{id}` parameter.

To update a person you must have admin rights. What this means is that the user that is making the ReST call must be a member of the `ALFRESCO_ADMINISTRATORS` group.

The PUT body for a person properties update call looks like this:

```
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

Let's assume we have a user in the repository with id `test` that we want to update the first name and last name for. This is then the PUT body we need to send:

```
{
    "firstName": "Testing",
    "lastName": "User number 1"
}
```

Here is the call:

```
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

```
{
    "enabled": false
}
```

Here is the call to disable access to Alfresco for the `test` user:

```
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

To update the avatar image \(photo\) for a person the following PUT call is used:

**http://localhost:8080/alfresco/api/-default-/public/alfresco/versions/1/people/\{id\}/avatar**

Let's say we have a PNG image called test\_user\_photo.png that we want to set as avatar for the `test` user.

Here is the call to do that:

```
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

```
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

An Alfresco SDK project doesn't have all the image transformers configured so this avatar image upload does not work in this situation.

**Parent topic:**[Managing People and Groups](../concepts/dev-api-by-language-alf-rest-manage-people-groups-intro.md)

