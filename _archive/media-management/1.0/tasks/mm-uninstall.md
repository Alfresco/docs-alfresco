---
author: Alfresco Documentation
source: 
audience: [, ]
---

# Uninstalling Media Management

To uninstall Media Management, you need to use the Module Management Tool \(MMT\) and reinstate certain files.

1.  Stop the Alfresco server.

2.  Use the topic, [Uninstall an AMP file](http://docs.alfresco.com/5.2/tasks/uninstall-amp.html), to uninstall the module.

3.  In [step 5](mm-install.md#step5) and [step 7](mm-install.md#step7) of the Media Management installation, you kept a copy of a number of files and tomcat/webapps/alfresco.war<numbers\>.bak.

    1.  If you have made no changes that will affect alfresco.war, rename tomcat/webapps/alfresco.war<numbers\>.bak to alfresco.war and copy it over to your tomcat/webapps directory.

    2.  Alternatively, copy only the files that were overwritten by the Media Management installation:

        -   /WEB-INF/lib/gytheio-commons-x.x.jar
        -   /WEB-INF/lib/gytheio-health-commons-x.x.jar
        -   /WEB-INF/lib/gytheio-messaging-camel-x.x.jar
        -   /WEB-INF/lib/gytheio-messaging-commons-x.x.jar
        -   /WEB-INF/classes/alfresco/templates/webscripts/org/alfresco/repository/comments/comment.lib.ftl
        -   /WEB-INF/classes/alfresco/templates/webscripts/org/alfresco/repository/comments/comment.put.json.js
        -   /WEB-INF/classes/alfresco/templates/webscripts/org/alfresco/repository/publishing/authform.get.html.ftl
        where x.x is the current version number.

4.  If you have used a Media Management content model like IPTC or PBCore, you must clean out your database before restarting Alfresco. See [Step 8 of Deleting a content model](http://docs.alfresco.com/5.2/tasks/deploy-dynamic.html#deploy-dynamic/delete) for more information.

5.  Restart the Alfresco server.


**Parent topic:**[Installing and configuring Media Management](../concepts/mm-install-overview.md)

