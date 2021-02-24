---
author: Alfresco Documentation
---

# Create a comment

Use this to create a new comment or comments on a specific node.

## Method

Using the HTTP POST method:-

```
nodes/<nodeId>/comments
```

## Example request URL

```
https://api.alfresco.com/yourcompany.com/public/alfresco/versions/1/nodes/159d7f5d-680f-4504-b9ee-8687d9fd1e82/comments
```

## POST body

|Property|Type|JSON Type|Description|
|--------|----|---------|-----------|
|content|string|string|The comment text. Note that you can provide an array of comments.|

## Example POST body

Creating a single comment:

```

{
    “content”: “This is a comment”
}
```

Creating more than one comment:

```

[
{
    “content”: “This is a comment”
},
{
    “content”: “This is another comment”
}
]
```

## Response

-   If the nodeId does not exist in this network, an HTTP `Not Found` \(status 404\) is returned.
-   If the request is successful an HTTP CREATED response \(status 201\) is returned.

## Example response body

Creating a single comment:

```

{
  "entry" : {
    "edited" : false,
    "content" : "<p>This is a comment</p>",
    "id" : "9f1618c4-84b1-4fac-9393-c3869e58ff7c",
    "modifiedAt" : "2012-07-30T17:18:48.921+0000",
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

Creating more than one comment:

```

[ {
  "id" : "7ca79723-fcfb-4c64-86c5-0fe18dc3575b",
  "content" : "This is a comment",
  "createdAt" : "2012-09-16T18:20:17.841+0000",
  "createdBy" : "fred.bloggs@yourcompany.com",
  "modifiedAt" : "2012-09-16T18:20:17.841+0000",
  "modifiedBy" : "fred.bloggs@yourcompany.com",
  "edited" : false,
  "canEdit" : true,
  "canDelete" : true
}, {
  "id" : "7b2ead2f-efc7-4405-83de-b1d7ceff3f23",
  "content" : "This is another comment",
  "createdAt" : "2012-09-16T18:20:17.883+0000",
  "createdBy" : "fred.bloggs@yourcompany.com",
  "modifiedAt" : "2012-09-16T18:20:17.883+0000",
  "modifiedBy" : "fred.bloggs@yourcompany.com",
  "edited" : false,
  "canEdit" : true,
  "canDelete" : true
} ]
```

**Parent topic:**[Comments](../../../pra/1/concepts/pra-nodes-comments.md)

