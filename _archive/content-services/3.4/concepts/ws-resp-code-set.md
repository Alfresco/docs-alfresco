---
author: [Alfresco Documentation, Alfresco Documentation]
source: Professional Alfresco Book
audience: 
category: [Web Script, API/Script]
keyword: [web script, response status code]
---

# Response status codes

A web script uses a response status code to inform the calling client of its execution outcome.

The following scenarios may use status codes:

-   To inform the client of an error situation, such as an item not found in the Alfresco content repository.
-   To inform the client of an occurrence of an event, such as a new item has been created.
-   To instruct the client to perform a follow-up request, such as to ask for user name and password credentials.
-   To inform the client of success.

For example, the Folder Listing web script validates that the provided folder path actually exists in the Alfresco content repository using the following JavaScript in the controller script:

```
...
if (folder == undefined || !folder.isContainer) {
  status.code = 404;
  status.message = "Folder " + folderpath + " not found.";
  status.redirect = true;
}
...
```

The `status` root object is a special object provided to all controller scripts by the Web Script Framework. It allows a web script to specify the response status code along with an associated status message. Typically, the value of the status code is set to a standard HTTP status code.

It is useful when reporting error status codes to provide additional information about the error in the response, such as the cause of the error. To support this, the Web Script Framework allows for a custom status response template to be rendered, but this happens only if the `status.redirect` value is set to true. A default status response template is provided by the Web Script Framework, which renders everything known about the status, so it is not necessary to develop your own; however, you can create a custom status response template. If the value of `status.redirect` is set to false, the status code is set on the response, but the response template for the requested format is rendered anyway.

**Parent topic:**[Response status code templates](../concepts/ws-resp-code-template.md)

