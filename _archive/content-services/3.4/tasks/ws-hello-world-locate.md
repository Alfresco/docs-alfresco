---
author: [Alfresco Documentation, Alfresco Documentation]
source: Professional Alfresco Book
audience: 
category: [Administration, Book]
option: 
---

# Locating the Hello World example

One of the most useful uses of the index is to determine if a web script actually exists. To walk through this process, you can locate the newly created Hello World example.

To locate the Hello World sample web script, navigate to the Web Scripts Home page \(http://localhost:8080/alfresco/service/index\). If prompted, log in with the user name admin and password admin.

When invoking a web script URI, the Web Script Framework may respond with a Not Found error. This can be due to an incorrectly formed URI or because the web script is not registered at all. To determine which, navigate the index to see if the Web Script Framework knows of it.

**Note:** Notice that the web script index URI starts with /alfresco/service. This is correct: the web script index is itself just another web script. The index is a series of web scripts each providing a different navigation of the index at the following URIs:

-   http://localhost:8080/alfresco/service/index/uri/
-   http://localhost:8080/alfresco/service/index/package/

1.  On the Web Scripts Home page, select the **Browse by Web Script URI** link.

2.  Use the web browser search feature to locate `/hello` within the page.

3.  Once found, click the `/hello` link to display the full description of the Hello World web script.


**Parent topic:**[Developing a Hello World web script](../tasks/ws-hello-world-create.md)

**Related information**  


[Listing the pre-built web scripts](ws-prebuilt-list.md)

