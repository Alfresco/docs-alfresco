---
author: [Alfresco Documentation, Alfresco Documentation]
---

# Create a person

Creating a person \(user\) in the repository.

|API Call|POST /people|
|--------|------------|
|API Explorer URL|[http://localhost:8080/api-explorer/\#!/people/createPerson](http://localhost:8080/api-explorer/#!/people/createPerson)|
|See also|[How to update a person](dev-api-by-language-alf-rest-manage-people-groups-update-person.md)|
|Repository Info|[Concepts](dev-repository-concepts.md) [Glossary](dev-glossary.md)|

Creating a person \(i.e. user\) is done with the following POST call:

**http://localhost:8080/alfresco/api/-default-/public/alfresco/versions/1/people**

The POST body for a person create call looks like this, you can use any of the properties defined in the out-of-the-box `cm:person` type:

```
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

To create a person you must have admin rights. What this means is that the user that is making the ReST call must be a member of the `ALFRESCO_ADMINISTRATORS` group.

When creating the user the `enabled` property can be used to configure if the user should have access to Alfresco or not, if not specified the user has access by default.

Let's create a user with id `test` and set minimal data for the user with the following POST body:

```
{
    "id": "test",
    "firstName": "Test",
    "lastName": "User",
    "password": "test",
    "email": "test@alfresco.com"
}
```

The call looks like this:

```
$ curl -X POST -H 'Content-Type: application/json' -H 'Accept: application/json' -H 'Authorization: Basic VElDS0VUXzA4ZWI3ZTJlMmMxNzk2NGNhNTFmMGYzMzE4NmNjMmZjOWQ1NmQ1OTM=' -d '{ "id": "test", "firstName": "Test", "lastName": "User", "password": "test", "email": "test@alfresco.com"}' 'http://localhost:8080/alfresco/api/-default-/public/alfresco/versions/1/people' | jq
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
100   347    0   241  100   106    607    267 --:--:-- --:--:-- --:--:--   871
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

Many Alfresco customers extend the out-of-the-box `cm:person` object, so support for custom properties have been added to this endpoint. For example, to create a person with a custom property called `acme:employeeId` the following POST body could be used \(presuming the property has been defined in a custom content model\).

The `properties` POST data property is used for this:

```
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

To add an avatar image to a newly created person see the [update person](dev-api-by-language-alf-rest-manage-people-groups-update-person.md) page.

**Note**. in a production environment the users and groups are usually synched / imported from an LDAP environment, and not created manually like this. However, it can be useful to create users remotely like this for testing purpose and in a developer environment.

**Parent topic:**[Managing People and Groups](../concepts/dev-api-by-language-alf-rest-manage-people-groups-intro.md)

