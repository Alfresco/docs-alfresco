---
author: Alfresco Documentation
---

# Invoking a web script using cURL

When exploring or developing web scripts, a web browser can be limiting as a client. For example, it cannot perform any HTTP method other than GET without coding. You can use an alternative client called cURL, a command line tool that supports common protocols such as FTP and HTTP. cURL is a valuable web script debugging and testing tool.

This task describes how to invoke a web script using [cURL](http://curl.haxx.se/).

1.  Install cURL.

    If using Linux or Mac OS X, you can install cURL through apt-get or Macports. If running Microsoft Windows, you can install cURL through Cygwin.

2.  Once installed, type the following in the command line to invoke an index of web scripts available:

    `curl -uadmin:admin "http://localhost:8080/alfresco/service/index"`

    This tells cURL to invoke the URL defined associated with the index web script, which returns in a categorized list of web scripts being returned.


**Parent topic:**[Web Script Tutorials](../tasks/ws-tutorials.md)

**Related information**  


[Creating a Hello World web script](ws-hello-world-create.md)

