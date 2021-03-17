---
author: [Alfresco Documentation, Alfresco Documentation]
source: Professional Alfresco Book
audience: 
category: [Web Script, API/Script]
keyword: [web script, cURL]
---

# Invoking a web script using cURL

When exploring or developing web scripts, a web browser can be limiting as a client. For example, it cannot perform any HTTP method other than GET without coding. You can use an alternative client called cURL \(http://curl.haxx.se/\), a command line tool that supports common protocols such as FTP and HTTP. cURL is a valuable web script debugging and testing tool.

This task describes how to invoke a web script using cURL.

1.  Install cURL.

    If using Linux or Mac OS X, you can install cURL through apt-get or Macports. If running Microsoft Windows, you can install cURL through Cygwin.

2.  Once installed, type the following in the command line to invoke a previously created web script called Hello World:

    curl "http://localhost:8080/alfresco/service/hello"

    This tells cURL to invoke the URL defined by the Hello World web script, which returns `Hello World`.


**Parent topic:**[Invoking web scripts](../concepts/ws-invoke-where.md)

**Related information**  


[Creating a Hello World web script](ws-hello-world-create.md)

