---
author: [Alfresco Documentation, Alfresco Documentation]
audience: 
---

# Deploying the Alfresco Web Editor

The Alfresco Web Editor distribution consists of a single zip file named alfresco-enterprise-webeditor-5.0.5.zip.

1.  Shut down your Alfresco server.

2.  Browse to the Alfresco download area.

3.  Browse to the Alfresco Community download area.

4.  Download the alfresco-enterprise-webeditor-5.0.5.zip file.

5.  Deploy the awe.war file into the same application server instance as the Alfresco repository.

6.  Copy the alfresco-webeditor-taglib.jar file to the WEB-INF/lib folder of your application.

7.  To include the tag library in your application, add the following tag library declaration to your JSP page:

    `<%@ taglib uri="http://www.alfresco.org/tags/awe" prefix="awe" %>`

    Once the tag library is declared, you can use the startTemplate, endTemplate and markContent tags within your application.

8.  Restart your Alfresco server.


**Parent topic:**[Alfresco Web Editor deployment](../concepts/awe-deploy-overview.md)

