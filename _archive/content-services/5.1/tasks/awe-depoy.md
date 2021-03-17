---
author: [Alfresco Documentation, Alfresco Documentation]
audience: 
---

# Deploying the Alfresco Web Editor

The Alfresco Web Editor distribution consists of a single zip file named alfresco-webeditor-5.1.5.zip.

1.  Shut down your Alfresco server.

2.  Browse to the Alfresco download area.

3.  Download the alfresco-webeditor-5.1.5.zip file.

4.  Deploy the awe.war file into the same application server instance as the Alfresco repository.

5.  Copy the alfresco-webeditor-taglib.jar file to the WEB-INF/lib folder of your application.

6.  To include the tag library in your application, add the following tag library declaration to your JSP page:

    `<%@ taglib uri="http://www.alfresco.org/tags/awe" prefix="awe" %>`

    Once the tag library is declared, you can use the startTemplate, endTemplate and markContent tags within your application.

7.  Restart your Alfresco server.


**Parent topic:**[Alfresco Web Editor deployment](../concepts/awe-deploy-overview.md)

