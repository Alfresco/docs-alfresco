---
author: Alfresco Documentation
---

# Favorites

A favorite describes an Alfresco entity that a person has marked as a favorite. There are API calls for getting a list of a user's favorites, for getting a specific favorite, for adding a favorite, and for deleting a favorite.

## Favorite object

|Property|Type|JSON Type|Description|
|--------|----|---------|-----------|
|targetGuid|id|string|The guid of the object that is a favorite.|
|createdAt|date time|string|The time the object was made a favorite.|
|target|object|object|The object that is a favorite. This can be a site, a folder, or a file.|

## Example of a favorite object

```
 
{                              
      "targetGuid" : "54a924c0-d437-4482-8cbc-78c2995c83ae",
      "createdAt" : "2012-07-20T21:46:09.659+0000",
      "target": {
           "file" : {
           "id" : "54a924c0-d437-4482-8cbc-78c2995c83ae",
           "guid" : "54a924c0-d437-4482-8cbc-78c2995c83ae",
           "name" : "fred.txt",
           "title" : "Fred Bloggs's Document",
           "description" : "This is Fred’s resume",
           "createdAt" : "2013-01-09T13:23:07.894-05:00",
           "modifiedAt" : "2013-01-16T15:41:35.265-05:00",
           "createdBy" : "fred.bloggs@yourcompany.com", 
           "modifiedBy" : "wilma.bloggs@yourcompany.com", 
           "mimeType" : "text/plain",
           "sizeInBytes" : "1024",
           "versionLabel" : "1.0"
      }
}       
         
```

## List order

Lists of these entities are returned ordered by ascending `target/type`, and then by descending `createdAt` date.

-   **[Get a list of favorites](../../../pra/1/concepts/pra-favorites-get-favorites.md)**  
 Use this to get a list of favorites for a specific person. You can tailor the information returned by providing the **WHERE** HTML parameter.
-   **[Get a favorite](../../../pra/1/concepts/pra-favorites-get-favorite.md)**  
 Use this to get a specific favorite for a specific person.
-   **[Add a favorite](../../../pra/1/concepts/pra-favorites-post-favorite.md)**  
 Use this to add a favorite for a specific person.
-   **[Delete a favorite](../../../pra/1/concepts/pra-favorites-delete-favorite.md)**  
Use this to remove a favorite of a specific person.

**Parent topic:**[API reference](../../../pra/1/concepts/pra-resources.md)

