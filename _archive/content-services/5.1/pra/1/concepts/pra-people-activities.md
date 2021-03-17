---
author: Alfresco Documentation
---

# Activities

Activities describe any past activity in a site, for example creating an item of content, commenting on a node, liking an item of content.

To see documentation for methods on this entity, and to try them out on our online REST API explorer, go to [https://api-explorer.alfresco.com/api-explorer/\#/people](https://api-explorer.alfresco.com/api-explorer/#/people). If you have the REST API explorer running locally, then go to [http://localhost:8080/api-explorer\#/people](http://localhost:8080/api-explorer/#/people).

## Activity object

|Property|Type|JSON Type|Description|
|--------|----|---------|-----------|
|postPersonId|email id|string|The id of the person who performed the activity|
|id|id|string|The unique id of the activity|
|siteId|id|string|The unique id of the site on which the activity was performed|
|postedAt|Date Time|string|The date time at which the activity was performed|
|feedPersonId|email id|string|The feed on which this activity was posted|
|activitySummary|object|object|An object summarizing the activity|
|activityType|enumerated string|string|The type of activity. The following are the possible values:- -   org.alfresco.comments.comment-created
-   org.alfresco.comments.comment-updated
-   org.alfresco.comments.comment-deleted
-   org.alfresco.documentlibrary.files-added
-   org.alfresco.documentlibrary.files-updated
-   org.alfresco.documentlibrary.files-deleted
-   org.alfresco.documentlibrary.file-added
-   org.alfresco.documentlibrary.file-created
-   org.alfresco.documentlibrary.file-deleted
-   org.alfresco.documentlibrary.file-downloaded
-   org.alfresco.documentlibrary.file-liked
-   org.alfresco.documentlibrary.file-previewed
-   org.alfresco.documentlibrary.inline-edit
-   org.alfresco.documentlibrary.folder-liked
-   org.alfresco.site.user-joined
-   org.alfresco.site.user-left
-   org.alfresco.site.user-role-changed
-   org.alfresco.site.group-added
-   org.alfresco.site.group-removed
-   org.alfresco.site.group-role-changed
-   org.alfresco.discussions.reply-created
-   org.alfresco.subscriptions.followed
-   org.alfresco.subscriptions.subscribed

|

## Example of a network object

```

        "postPersonId" : "fred.bloggs@yourcompany.com",
        "id" : 554,
        "siteId" : "fred-bloggs-yourcompany-com",
        "networkId" : "yourcompany.com",
        "feedPersonId" : "fred.bloggs@yourcompany.com",
        "activitySummary" : {
          "lastName" : "Bloggs",
          "title" : "testing",
          "objectId" : "e8680e58-0701-4b64-950d-66cce277fbc7",
          "firstName" : "Fred",
        },
        "activityType" : "org.alfresco.comments.comment-deleted",
        "postedAt" : "2012-08-22T19:45:00.000+0000"
```

## List order

Lists of these entities are returned ordered by descending `postedAt`.

**Parent topic:**[People](../../../pra/1/concepts/pra-people.md)

