---
author: [Alfresco Documentation, Alfresco Documentation]
audience: 
category: DocLib Portlets
keyword: [DocLib Portlets, Liferay, installing, configuring]
---

# Configuring Liferay

If you are running Liferay and Alfresco on the same machine, you need to change the port numbers used by the Liferay Tomcat server to prevent conflicts.

1.  Open the <LIFERAY\_HOME\>/tomcat-6.0.18/conf/server.xml file.

2.  Locate the following lines and update the port numbers as shown:

    ```
     <Server port="8105" shutdown="SHUTDOWN">
    
         <Connector port="8180" protocol="HTTP/1.1" 
                   connectionTimeout="20000" 
                   redirectPort="8443" URIEncoding="UTF-8" />
    
         <Connector port="8109" protocol="AJP/1.3" redirectPort="8443" URIEncoding="UTF-8" />
    ```

3.  Save the file.


**Parent topic:**[Installing and configuring Alfresco DocLib Portlets](../tasks/dlp-install-config.md)

