---
author: Alfresco Documentation
---

# Site membership requests

A site membership request describes a request for a person to join a site in Alfresco. There are API calls for getting a list of a user's site membership requests, for joining a site, for modifying a request to join a site, and for deleting a site membership request.

To see documentation for methods on this entity, and to try them out on our online REST API explorer, go to [https://api-explorer.alfresco.com/api-explorer/\#/sites](https://api-explorer.alfresco.com/api-explorer/#/sites). If you have the REST API explorer running locally, then go to [http://localhost:8080/api-explorer\#/sites](http://localhost:8080/api-explorer/#/sites).

## Site membership request object

|Property|Type|JSON Type|Description|
|--------|----|---------|-----------|
|id|string|string|The site id.|
|site|object|object|The target site.|
|message|string|string|An optional message from the requester explaining why access is being requested.|
|createdAt|date time|string|The time this site membership request was made.|
|modifiedAt|date time|string|The time this site membership request was modified.|

## Example of a site membership request object

```
 
{                                            
   "entry": {                                
     "id" : "the-secret-site",
     "createdAt" : "2012-07-20T21:46:09.659+0000",
     "modifiedAt" : "2012-07-20T21:46:09.659+0000",
     "message" : "I need this access for national security reasons!",
     "site": {
         "id" : "the-secret-site",
         "guid" : "8ac18731-601b-4bb4-be1a-cd5d252cce3f",
         "title" : "The Company’s Secret Site",
         "visibility" : "MODERATED",
         "description" : "The Company’s Secret Site"               
         }
     }
 } 
```

## List order

Lists of these entities are returned ordered by ascending site `title`.

**Parent topic:**[Entity reference](../../../pra/1/concepts/pra-resources.md)

