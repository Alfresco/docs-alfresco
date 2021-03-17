---
author: [Alfresco Documentation, Alfresco Documentation]
source: 
audience: 
category: [Installation, Alfresco Server, Customer Care]
keyword: [license, .lic]
---

# Installing a new license

The Alfresco license file must be installed before you can use Alfresco.

You must have installed Alfresco before you can install the license. This is because you use a license directory within the installed product.

1.  Copy the license file to your machine.

    The license file has a file extension of .lic.

2.  Ensure that the Alfresco server is not running.

3.  From your Alfresco installation directory, browse to the <extension\> directory, for example for Tomcat on Windows, this is:

    C:\\Alfresco\\tomcat\\shared\\classes\\alfresco\\extension

4.  Create the license directory.

5.  Move the .lic file into the license directory.


You have installed the Alfresco license file.

When you run Alfresco, the server detects the existence of the .lic file and installs your license. If the license is valid, Alfresco renames the file to <license-name\>.lic.INSTALLED and you can begin to use the terms of your license immediately.

**Parent topic:**[Installing Alfresco](../concepts/ch-install.md)

**Related information**  


[System paths](../reuse/conv-syspaths.md)

