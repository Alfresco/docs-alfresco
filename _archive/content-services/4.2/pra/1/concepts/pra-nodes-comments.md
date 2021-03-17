---
author: [Alfresco Documentation, Alfresco Documentation]
audience: 
category: api
option: api
---

# Comments

A person can comment on folders and individual items to give other users information or notes specific to that content. API methods exist to get a list of comments, get a specific comment, and add a comment to a node.

## Comment object

|Property|Type|JSON Type|Description|
|--------|----|---------|-----------|
|edited|boolean|boolean|True if the comment has been edited since it was first created|
|content|string|string|The comment itself|
|id|id|string|A unique opaque string id|
|modifiedAt|Date Time|string|The date time that the comment was last modified|
|createdBy|[person](pra-people.md)|object|An embedded [person entity](pra-people.md) describing the person who created this comment|
|canDelete|boolean|boolean|True if this comment can be deleted by the current authenticated user. False if not, or if the node that is being commented upon is either a working copy or locked.|
|modifiedBy|[person](pra-people.md)|object|An embedded [person entity](pra-people.md) describing the person who last modified this comment|
|createdAt|Date Time|string|The date time that the comment was created|
|canEdit|boolean|boolean|True if this comment can be edited by the current authenticated user. False if not, or if the node that is being commented upon is either a working copy or locked.|

## Example of a comment object

```

"edited" : false,
"content" : "<p>comment 13</p>",
"id" : "e1f349fb-79ee-4604-a563-16af8b78aa3c",
"modifiedAt" : "2012-07-20T21:46:09.659+0000",
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
"createdAt" : "2012-07-20T21:46:09.659+0000",
"canEdit" : true
```

-   **[Get a list of a node's comments](../../../pra/1/concepts/pra-nodes-comments-get-comments.md)**  
Use this to get a list of all comments on a specific node.
-   **[Create a comment](../../../pra/1/concepts/pra-nodes-comments-post-comment.md)**  
Use this to create a new comment or comments on a specific node.
-   **[Update a comment](../../../pra/1/concepts/pra-nodes-comments-put-comment.md)**  
Use this to update an existing comment on a specific node.
-   **[Remove a comment](../../../pra/1/concepts/pra-nodes-comments-delete-comment.md)**  
Use this to remove a comment.

**Parent topic:**[Nodes](../../../pra/1/concepts/pra-nodes.md)

