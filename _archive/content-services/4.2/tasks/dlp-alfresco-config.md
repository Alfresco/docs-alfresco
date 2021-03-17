---
author: [Alfresco Documentation, Alfresco Documentation]
audience: 
category: DocLib Portlets
keyword: [DocLib Portlets, Liferay, installing, configuring]
---

# Configuring Alfresco

This task describes how to configure Alfresco for Doclib Portlets.

1.  Browse to <ALFRESCO\_HOME\>/tomcat/shared/classes/alfresco/.

2.  Open the file alfresco-global.properties.

3.  Add the following:

    ```
    authentication.chain=alfrescoNtlm1:alfrescoNtlm,external1:external
    external.authentication.proxyUserName=
    ```

4.  Save the file.


**Parent topic:**[Installing and configuring Alfresco DocLib Portlets](../tasks/dlp-install-config.md)

