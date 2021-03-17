---
author: Alfresco Documentation
---

# Forms and web scripts

Applications use HTML forms to create and update data. Content applications use forms to upload files from a user's local file system. HTML forms allow data to be submitted in one of two content types: URL-encoded \(`application-x-www-form-urlencoded`\) and multipart form data \(`multipart/form-data`\).

Web scripts can handle URL-encoded submissions as other requests, where the web script parses the URI to extract the form data. However, the URL-encoded approach is inefficient for sending large quantities of binary data or text containing non-ASCII characters.

To submit forms containing files, non-ASCII, and binary data, the multipart form data content type must be used; however, this type of request is not as simple to parse for the server. Given the common requirement to submit files to the repository, the Web Script Framework provides explicit support for handling multipart form data submissions by hiding the complexity of request parsing from the developer of the web script.

**Related tasks:**

[Multipart forms tutorial](../tasks/ws-forms-process.md)

**Parent topic:**[Repository-tier web scripts](../concepts/ws-overview.md)

