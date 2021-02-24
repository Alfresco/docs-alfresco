---
author: Alfresco Documentation
---

# CMIS 1.1

CMIS 1.1 introduces a number of new concepts that are supported by Alfresco. You can now use the new browser binding to simplify flows for web applications, use Alfresco aspects, and use the append data support to manage large items of content.

-   **[The Browser binding](../../../pra/1/concepts/cmis-1.1-browser-binding.md)**  
In addition to the existing XML-based AtomPub and Web services bindings, CMIS 1.1 provides a simpler JSON-based binding. The browser binding is designed for web applications and is easy to use just with HTML and JavaScript. It uses just two verbs, GET and POST, and resources are referenced using simple and predictable URLs.
-   **[Using aspects](../../../pra/1/concepts/cmis-1.1-using-aspects.md)**  
Alfresco aspects are exposed as secondary types in CMIS 1.1. You can dynamically add aspects to an Alfresco object using the API.
-   **[Appending content](../../../pra/1/concepts/cmis-1.1-appending-content.md)**  
 In some applications such as journaling, or when using very large files, you want to upload a file in chunks. You might have large files that time out during an upload, or fail because of a bad connection. You can use the CMIS 1.1 `append` parameter in these situations
-   **[cmis:item support](../../../pra/1/concepts/cmis-1.1-item-support.md)**  
 You can use `cmis:item` to query some Alfresco object types and your own custom types that are outside the CMIS definitions of document, folder, relationship, or policy.

**Parent topic:**[Alfresco CMIS API](../../../pra/1/topics/cmis-welcome.md)

**Related information**  


[OpenCMIS Client API Developer's Guide](http://chemistry.apache.org/java/developing/guide.html)

[Apache Chemistry](http://chemistry.apache.org/)

[Public Alfresco CMIS Server](http://cmis.alfresco.com)

[The CMIS 1.1 specification](http://docs.oasis-open.org/cmis/CMIS/v1.1/cs01/CMIS-v1.1-cs01.html)

