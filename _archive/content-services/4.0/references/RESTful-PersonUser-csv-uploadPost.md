---
author: [Alfresco Documentation, Alfresco Documentation]
source: Enterprise web scripts
audience: 
category: API
option: RESTful reference
---

# Create Users via uploading of a CSV

Allows an administrator to upload a CSV describing new users, who will then have accounts created for them.

`POST /alfresco/service/api/people/upload`

Note - if the CSV is uploaded OK, but there was a problem with the contents or creating the users, you will receive a 200 status code along with details of the problem.

The web script description document specifies the following options:

|`json`|The default response format|
|`admin`|The authentication access|
|`none`|The transaction level|
|`any`|The format style|

**Parent topic:**[Person](../references/RESTful-Person.md)

