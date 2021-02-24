---
author: Alfresco Documentation
---

# Site membership requests

A site membership request describes a request for a person to join a site in Alfresco. There are API calls for getting a list of a user's site membership requests, for joining a site, for modifying a request to join a site, and for deleting a site membership request.

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

-   **[Get a list of site membership requests](../../../pra/1/concepts/pra-sitereq-get-sitereqs.md)**  
 Use this to get a list of site membership requests for a specific person.
-   **[Join a site](../../../pra/1/concepts/pra-sitereq-post-sitereq.md)**  
 Use this to join a site. If the site is public, the request is implicitly approved and the user is then a member of the site. If the site is moderated, then a site membership request is created, awaiting action by the site manager.
-   **[Modifying a site membership request](../../../pra/1/concepts/pra-sitereq-put-sitereq.md)**  
 Use this to modify an existing request to join a site. For example, if a user requested access to a site but the site manager has not yet acted on the request, the user can update the request with a message providing more details on why access was needed or to remind the site manager that a request is pending. The modifiedAt property records the modification date and time.
-   **[Delete a site membership request](../../../pra/1/concepts/pra-sitereq-delete-sitereq.md)**  
Use this to remove a site membership request.

**Parent topic:**[API Reference](../../../pra/1/concepts/pra-resources.md)

