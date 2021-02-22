---
author: [Alfresco Documentation, Alfresco Documentation]
audience: 
category: DocLib Portlets
keyword: [DocLib Portlets, Liferay, installing, configuring]
---

# Configuring the Liferay Share web application

This task describes how to deploy the web application.

1.  Deploy the Share web application to Liferay by copying the share.war file from your Alfresco Tomcat instance into Liferay's deploy folder.

2.  Locate the <LIFERAY\_HOME\>/tomcat-6.0.18/conf/catalina.properties file and open it in an editor.

3.  Locate the `shared.loader` property and set it to the following value:

    `shared.loader=${catalina.home}/shared/classes,${catalina.home}/shared/lib/*.jar`

4.  Create the directory <LIFERAY\_HOME\>/tomcat-6.0.18/shared/classes/alfresco/web-extension/.

5.  Add the following configuration to a new file called share-config-custom.xml.

    **Note:** If your Alfresco Tomcat instance is running on another host or a non-standard port, you must modify the endpoint-url parameters to point to the correct location of your repository. For example:

    ```
    <alfresco-config>
       <!-- Overriding endpoints to reference a remote Alfresco server -->
       <config evaluator="string-compare" condition="Remote">
         <remote>
     
           <endpoint>
             <id>alfresco-noauth</id>
             <name>Alfresco - unauthenticated access</name>
             <description>Access to Alfresco Repository WebScripts that do not require authentication</description>
             <connector-id>alfresco</connector-id>
             <endpoint-url>http://localhost:8080/alfresco/s</endpoint-url>
             <identity>none</identity>
           </endpoint>
     
           <endpoint>
             <id>alfresco-feed</id>
             <name>Alfresco Feed</name>
             <description>Alfresco Feed - supports basic HTTP authentication</description>
             <connector-id>http</connector-id>
             <endpoint-url>http://localhost:8080/alfresco/s</endpoint-url>
             <basic-auth>true</basic-auth>
             <identity>user</identity>
           </endpoint>
     
           <connector>
             <id>alfrescoCookie</id>
             <name>Alfresco Connector</name>
             <description>Connects to an Alfresco instance using cookie-based authentication</description>
             <class>org.springframework.extensions.webscripts.connector.AlfrescoConnector</class>
           </connector>
     
           <endpoint>
             <id>alfresco</id>
             <name>Alfresco - user access</name>
             <description>Access to Alfresco Repository WebScripts that require user authentication</description>
             <connector-id>alfrescoCookie</connector-id>
             <endpoint-url>http://localhost:8080/alfresco/wcs</endpoint-url>
             <identity>user</identity>
             <external-auth>true</external-auth>
           </endpoint>
     
         </remote>
       </config>
     
     </alfresco-config>
    ```


**Parent topic:**[Installing and configuring Alfresco DocLib Portlets](../tasks/dlp-install-config.md)

