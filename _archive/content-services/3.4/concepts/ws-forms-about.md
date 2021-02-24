---
author: [Alfresco Documentation, Alfresco Documentation]
source: Professional Alfresco Book
audience: 
category: [Web Script, API/Script]
option: [web script, I18N]
---

# Forms and web scripts

Applications use HTML forms to create and update data. Content applications use forms to upload files from a user’s local file system. HTML forms allow data to be submitted in one of two content types: URL-encoded \(`application-x-www-form-urlencoded`\) and multipart form data \(`multipart/form-data`\).

Web scripts can handle URL-encoded submissions as other requests, where the web script parses the URI to extract the form data. However, the URL-encoded approach is inefficient for sending large quantities of binary data or text containing non-ASCII characters.

To submit forms containing files, non-ASCII, and binary data, the multipart form data content type must be used; however, this type of request is not as simple to parse for the server. Given the common requirement to submit files to the Alfresco content repository, the Web Script Framework provides explicit support for handling multipart form data submissions by hiding the complexity of request parsing from the developer of the web script.

-   **[Processing multipart forms](../tasks/ws-forms-process.md)**  
This task demonstrates how to handle multipart/form-data form submits by creating two web scripts for the following functions:
-   **[Testing the upload web script](../tasks/ws-forms-test.md)**  
This task demonstrates how to test an upload web script.
-   **[Creating request processing web scripts](../tasks/ws-request-process.md)**  
When performing an HTTP POST to a web script, the posted request body often contains content that needs processing by the web script. To allow access to the request body, the Web Script Framework provides a special root object named `requestbody` that represents the content of the request. The `requestbody` is a `ScriptContent` object allowing access to the request content either as a string or as a content stream.

**Parent topic:**[Working with Alfresco web scripts](../concepts/ws-architecture.md)

