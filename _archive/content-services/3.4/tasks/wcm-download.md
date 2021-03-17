---
author: [Alfresco Documentation, Alfresco Documentation]
source: 
audience: 
category: Installation
option: install AVM
---

# Installing AVM to an existing instance of Alfresco

This task describes how to install AVM to an existing instance of Alfresco.

1.  Browse to the Alfresco Enterprise download area.

2.  Select the following file:

    alfresco-enterprise-avm-3.4.14.zip

3.  Download and extract the file into the Alfresco home directory. For example:

    -   \(Windows\) C:\\Alfresco
    -   \(Linux\) /opt/alfresco
4.  Browse to the Alfresco home directory, and unzip the downloaded file.

    If your unzip program asks about existing directories, allow this because no existing files will be overwritten.

5.  In the root of the Alfresco home directory, copy the file wcm-bootstrap-context.xml to the <extension\> directory.

6.  Restart the Alfresco server.

    This ensures that the Alfresco server starts to use the installed components. To restart the Alfresco server, see [Starting the Alfresco server.](alfresco-start.md)


WCM is installed and configured.

**Parent topic:**[Installing AVM](../concepts/wcm-install-intro.md)

