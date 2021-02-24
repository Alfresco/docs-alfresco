---
author: [Alfresco Documentation, Alfresco Documentation]
audience: 
category: [Installation, Alfresco Server]
keyword: [Share, port]
---

# Configuring the Share default port

This section describes how to configure the default port configuration for Alfresco Share.

1.  Open the <web-extension\>/share-config-custom.xml file.

2.  Uncomment the following section by removing the begin comment `<--` and end comment `-->` lines surrounding this section.

    ```
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
             <id>alfresco</id>
             <name>Alfresco - user access</name>
             <description>Access to Alfresco Repository WebScripts that require user authentication</description>
             <connector-id>alfresco</connector-id>
             <endpoint-url>http://localhost:8080/alfresco/s</endpoint-url>
             <identity>user</identity>
          </endpoint>
    
          <endpoint>
             <id>alfresco-feed</id>
             <name>Alfresco Feed</name>
             <description>Alfresco Feed - supports basic HTTP authentication via the EndPointProxyServlet</description>
             <connector-id>http</connector-id>
             <endpoint-url>http://localhost:8080/alfresco/s</endpoint-url>
             <basic-auth>true</basic-auth>
             <identity>user</identity>
          </endpoint>
       </remote>
    </config>
    ```

3.  Uncomment the following section if you are using NTLM, Kerberos, or external SSO, or an HTTP load balancer.

    ```
    
     <config evaluator="string-compare" condition="Remote"> 
          <remote> 
            <keystore> 
                 <path>alfresco/web-extension/alfresco-system.p12</path> 
                 <type>pkcs12</type> 
                 <password>alfresco-system</password> 
             </keystore> 
              
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
    
              
    ```

4.  Replace all instances of 8080 with the desired port number.

5.  Save the file.


**Parent topic:**[Customizing Alfresco Share configuration items](../tasks/share-customize.md)

