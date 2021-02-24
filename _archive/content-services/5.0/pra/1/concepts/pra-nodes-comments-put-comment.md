---
author: Alfresco Documentation
---

# Update a comment

Use this to update an existing comment on a specific node.

## Method

Using the HTTP PUT method:

```
nodes/<nodeId>/comments/<commentId>
```

## Example request URL

```
https://api.alfresco.com/yourcompany.com/public/alfresco/versions/1/nodes/159d7f5d-680f-4504-b92e-8687d9fd1e82/comments/159d7f5d-680f-4524-b9ee-8687d9221e22
```

## PUT body

|Property|Type|JSON Type|Description|
|--------|----|---------|-----------|
|content|string|string|The new comment text|

## Example PUT body

```

{
    "content": "This is an updated comment"
}
```

## Response

-   If the nodeId or commentId does not exist in this network, an HTTP `Not Found` \(status 404\) is returned.
-   If the request is successful an HTTP OK response \(status 200\) is returned.

## Example response body

```

{
  "entry" : {
    "edited" : true,
    "content" : "<p>This is an updated comment</p>",
    "id" : "9f1618c4-84b1-4fac-9393-c3869e58ff7c",
    "modifiedAt" : "2012-07-31T17:18:48.921+0000",
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
    "createdAt" : "2012-07-30T17:18:48.921+0000",
    "canEdit" : true
  }
}
```

**Parent topic:**[Comments](../../../pra/1/concepts/pra-nodes-comments.md)

