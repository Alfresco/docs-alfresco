---
author: Alfresco Documentation
---

# Members

Members are the people who collaborate on a site. There are API calls for getting a list of the members of the site, getting the site membership information for a person, adding a person to a site, and updating a person's site membership information.

To see documentation for methods on this entity, and to try them out on our online REST API explorer, go to [https://api-explorer.alfresco.com/api-explorer/\#/sites](https://api-explorer.alfresco.com/api-explorer/#/sites). If you have the REST API explorer running locally, then go to [http://localhost:8080/api-explorer\#/sites](http://localhost:8080/api-explorer/#/sites).

## Member object

|Property|Type|JSON Type|Description|
|--------|----|---------|-----------|
|role|enumerated string|string|The member's role. Possible values are `SiteManager`, `SiteContributor`, and `SiteCollaborator`.|
|id|email id|string|The person's personId - the email address with which the person registered|
|[person](pra-people.md)|person object|object|An embedded person object describing this member.|

## Example of a member object

```

{
      "role":"SiteManager",
      "id":"fred.bloggs@yourcompany.com",
      "person":{
            "enabled":true,
            "lastName":"Bloggs",
            "location":"Somewhere",
            "avatarId":"6be34757-5764-4a4b-a86c-f5f0878b9700",
            "instantMessageId":"fred",
            "googleId":"fred@google.com",
            "id":"fred.bloggs@yourcompany.com",
            "skypeId":"fredbloggs",
            "email":"fred.bloggs@yourcompany.com",
            "description":"a person",
            "company":{
               "organization":"alfresco",
               "address1":"somewhere",
               "postcode":"fff fff",
               "telephone":"01234 456789",
               "fax":"01234 456789",
               "email":"info@yourcompany.com"
            },
            "firstName":"Fred",
            "telephone":"01234 99229922",
            "jobTitle":"Chief Bottle Washer",
            "mobile":"07777 012345"
      }
  }
```

## List order

Lists of these entities are returned ordered by ascending \( `lastName`, `firstName`, `role` \).

**Parent topic:**[Sites](../../../pra/1/concepts/pra-sites.md)

