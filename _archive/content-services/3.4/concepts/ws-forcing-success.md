---
author: [Alfresco Documentation, Alfresco Documentation]
source: Professional Alfresco Book
audience: 
category: [Web Script, API/Script]
option: [web script, HTTP client]
---

# Forcing success response status

Not all clients can gracefully handle non-success HTTP response codes, such as the Adobe Flash runtime player, which is the runtime for Adobe Flex applications.

In this situation, web scripts provide a mechanism to force an HTTP response to indicate success in its response header; however, the response body will still represent the content as if a non-success status had occurred, allowing a client to interrogate error codes and messages, if provided by the web script.

To force success, the `alf-force-success-response` header is set on the HTTP request whose value is always set to `true`. For example, to force a success response status for a request to retrieve children of a folder that does not exist, you would type the following in the command line:

-   `curl -uadmin:admin -v -H "alf-force-success-response:true" "http://localhost:8080/alfresco/s/cmis/p/doesnotexist"`

Although the response status code is 200 \(which means Success\), the body of the response will still represent a failure and include details such as the real status code \(in this case, 404, which means Not Found\) and an error message.

**Parent topic:**[Working with client limitations](../concepts/ws-client-limitations.md)

