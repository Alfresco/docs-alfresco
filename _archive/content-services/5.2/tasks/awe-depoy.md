---
author: [Alfresco Documentation, Alfresco Documentation]
audience: 
---

# Deploying the Web Editor

The Web Editor distribution consists of a single zip file named alfresco-webeditor-5.2.7.zip.

1.  Shut down your server.

2.  Browse to the Alfresco Content Services download area.

3.  Download the alfresco-webeditor-5.2.7.zip file.

4.  Deploy the awe.war file into the same application server instance as the repository.

5.  Copy the alfresco-webeditor-taglib.jar file to the WEB-INF/lib folder of your application.

6.  To include the tag library in your application, add the following tag library declaration to your JSP page:

    `<%@ taglib uri="http://www.alfresco.org/tags/awe" prefix="awe" %>`

    Once the tag library is declared, you can use the startTemplate, endTemplate and markContent tags within your application.

7.  Restart your server.


**Parent topic:**[Web Editor deployment](../concepts/awe-deploy-overview.md)

