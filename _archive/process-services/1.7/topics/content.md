# Content

Content such as documents and other files can be attached to process instances and tasks.

To retrieve the content attached to a process instance:

```
GET api/enterprise/process-instances/{processInstanceId}/content
```

By default, this will return all content: The related content \(for example content uploaded via the UI in the "related content" section of the task detail page\) and the field content \(content uploaded as part of a form\).

To only return the related content, add *?isRelatedContent=true* to the url. Similarly, add *?isRelatedContent=false* when the return response should include only field content.

Similarly, for a task:

```
GET api/enterprise/tasks/{taskId}/content
```

By default, this will return all content: The related content \(for example content uploaded via the UI in the "related content" section of the task detail page\) and the field content \(content uploaded as part of a form\).

To only return the *related content*, add *?isRelatedContent=true'* to the url. Similarly, add *?isRelatedContent=false* when the return response should include only field content.

**Example response:**

```
{
  "size": 5,
  "total": 5,
  "start": 0,
  "data": [
    {
      "id": 4000,
      "name": "tasks.PNG",
      "created": "2015-01-01T01:01:01.000+0000",
      "createdBy": {
        "id": 1,
        "firstName": "null",
        "lastName": "Admin",
        "email": "admin@app.activiti.com",
        "pictureId": 5
      },
      "relatedContent": true,
      "contentAvailable": true,
      "link": false,
      "mimeType": "image/png",
      "simpleType": "image",
      "previewStatus": "queued",
      "thumbnailStatus": "queued"
    }
        ]
}
```

To get content metadata:

```
GET api/enterprise/content/{contentId}
```

To delete content:

```
DELETE api/enterprise/content/{contentId}
```

To get the actual bytes for content:

```
GET api/enterprise/content/{contentId}/raw
```

To upload content to a process instance:

```
POST api/enterprise/process-instances/{processInstanceId}/raw-content
```

where the body contains a *multipart file*. Add the *isRelatedContent* parameter to the url to set whether the content is *related* or not. For a process instance, this currently won’t have any influence on what is visible in the UI. Note that the default value for this parameter is *false*.

To upload content to a task:

```
POST api/enterprise/tasks/{taskId}/raw-content
```

where the body contains a *multipart file*. Add the *isRelatedContent* parameter to the url to set whether the content is *related* or not. If *true*, the content will show up in the "related content" section of the task details. Note that the default value for this parameter is *false*.

To relate content \(eg from Alfresco\) to a process instance:

```
POST api/enterprise/process-instances/{processInstanceId}/content
```

where the json body contains following properties:

-   name

-   link \(boolean\)

-   source

-   sourceId

-   mimeType

-   linkUrl


Add the *isRelatedContent* parameter to the url to set whether the content is related or not. If *true*, the content will show up in the "related content" section of the task details. Note that the default value for this parameter is true \(different from the call above with regular content!\).

**Example body \(from Alfresco OnPremise\):**

```
{
   "name":"Image.png",
   "link":true,
   "source":"alfresco-1",
   "sourceId":"30358280-88de-436e-9d4d-8baa9dc44f17@swsdp",
   "mimeType":"image/png"
}
```

To upload content for a task:

```
POST api/enterprise/process-instances/{taskId}/content
```

Where the json body contains following properties:

-   name

-   link \(boolean\)

-   source

-   sourceId

-   mimeType

-   linkUrl


In case of a start form with content fields, there is no task or process instance to relate to.

Following REST endpoints can be used:

```
POST api/enterprise/content/raw
```

**Parent topic:**[Historic processes and tasks](../topics/history.md)

