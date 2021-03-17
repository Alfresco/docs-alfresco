---
author: Alfresco Documentation
---

# Get a list of a node's comments

Use this to get a list of all comments on a specific node.

## Method

Using the HTTP GET method:

```

nodes/<nodeId>/comments
```

## Example request URL

```

https://api.alfresco.com/yourcompany.com/public/alfresco/versions/1/nodes/159d7f5d-680f-4504-b9ee-8687d9fd1e82/comments
```

## Response

-   If the nodeId does not exist an HTTP `Not Found` is returned \(status 404\).
-   If the nodeId exists, but does not identify a folder or a document, an HTTP `Bad Request` is returned \(status 400\).
-   If the request is successful an HTTP OK is returned \(status 200\).

## Example response body

```
{
{
  "list" : {
    "pagination" : {
      "count" : 2,
      "hasMoreItems" : false,
      "totalItems" : 2,
      "skipCount" : 0,
      "maxItems" : 100
    },
    "entries" : [ {
      "entry" : {
        "edited" : false,
        "content" : "<p>A second test comment</p>",
        "id" : "3ae53d3f-63d6-4065-a7bf-68921a5ba08d",
        "modifiedAt" : "2012-07-30T17:05:28.617+0000",
        "createdBy" : {
          "enabled" : true,
          "lastName" : "Bloggs",
          "location" : "Somewhere",
          "avatarId" : "85d45e64-eb02-44e1-b989-dbf571ab0704",
          "instantMessageId" : "fredb",
          "googleId" : "fredb@gmail.com",
          "id" : "fred.bloggs@yourcompany.com",
          "skypeId" : "fredb",
          "email" : "fred.bloggs@yourcompany.com",
          "description" : "Been with company for n years",
          "company" : {
            "organization" : "Your Company",
            "address1" : "Some place",
            "address2" : "Somewhere",
            "postcode" : "Z99 9Z9",
            "telephone" : "01234 123456",
            "fax" : "01234 123457",
            "email" : "info@yourcompany.com"
          },
          "firstName" : "Fred",
          "telephone" : "01234 567890",
          "jobTitle" : "VP of something",
          "mobile" : "07777 567890"
        },
        "canDelete" : true,
        "modifiedBy" : {
          "enabled" : true,
          "lastName" : "Bloggs",
          "location" : "Somewhere",
          "avatarId" : "85d45e64-eb02-44e1-b989-dbf571ab0704",
          "instantMessageId" : "fredb",
          "googleId" : "fredb@gmail.com",
          "id" : "fred.bloggs@yourcompany.com",
          "skypeId" : "fredb",
          "email" : "fred.bloggs@yourcompany.com",
          "description" : "Been with company for n years",
          "company" : {
            "organization" : "Your Company",
            "address1" : "Some place",
            "address2" : "Somewhere",
            "postcode" : "Z99 9Z9",
            "telephone" : "01234 123456",
            "fax" : "01234 123457",
            "email" : "info@yourcompany.com"
          },
        "createdAt" : "2012-07-30T17:05:28.617+0000",
        "canEdit" : true
      }
    }, {
      "entry" : {
        "edited" : false,
        "content" : "<p>A test comment</p>",
        "id" : "7749ea0e-583f-4fbe-a3c0-82a604d7151a",
        "modifiedAt" : "2012-07-30T17:05:15.153+0000",
        "createdBy" : {
          "enabled" : true,
          "lastName" : "Bloggs",
          "location" : "Somewhere",
          "avatarId" : "85d45e64-eb02-44e1-b989-dbf571ab0704",
          "instantMessageId" : "fredb",
          "googleId" : "fredb@gmail.com",
          "id" : "fred.bloggs@yourcompany.com",
          "skypeId" : "fredb",
          "email" : "fred.bloggs@yourcompany.com",
          "description" : "Been with company for n years",
          "company" : {
            "organization" : "Your Company",
            "address1" : "Some place",
            "address2" : "Somewhere",
            "postcode" : "Z99 9Z9",
            "telephone" : "01234 123456",
            "fax" : "01234 123457",
            "email" : "info@yourcompany.com"
          },
          "firstName" : "Fred",
          "telephone" : "01234 567890",
          "jobTitle" : "VP of something",
          "mobile" : "07777 567890"
        },
        "canDelete" : true,
        "modifiedBy" : {
          "enabled" : true,
          "lastName" : "Bloggs",
          "location" : "Somewhere",
          "avatarId" : "85d45e64-eb02-44e1-b989-dbf571ab0704",
          "instantMessageId" : "fredb",
          "googleId" : "fredb@gmail.com",
          "id" : "fred.bloggs@yourcompany.com",
          "skypeId" : "fredb",
          "email" : "fred.bloggs@yourcompany.com",
          "description" : "Been with company for n years",
          "company" : {
            "organization" : "Your Company",
            "address1" : "Some place",
            "address2" : "Somewhere",
            "postcode" : "Z99 9Z9",
            "telephone" : "01234 123456",
            "fax" : "01234 123457",
            "email" : "info@yourcompany.com"
          },
        "createdAt" : "2012-07-30T17:05:15.153+0000",
        "canEdit" : true
      }
    } ]
  }
}
```

**Parent topic:**[Comments](../../../pra/1/concepts/pra-nodes-comments.md)

