---
author: [Alfresco Documentation, Alfresco Documentation]
audience: 
category: [Installation, Alfresco Server]
keyword: [Share, port]
---

# Configuring the Share default port

Use this information to configure the default port configuration for Share.

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
                
          <endpoint>
             <id>alfresco-api</id>
             <parent-id>alfresco</parent-id>
             <name>Alfresco Public API - user access</name>
             <description>Access to Alfresco Repository Public API that require user authentication.
               This makes use of the authentication that is provided by parent 'alfresco' endpoint.</description>
             <connector-id>alfresco</connector-id>
             <endpoint-url>http://localhost:8080/alfresco/api</endpoint-url>
             <identity>user</identity>
          </endpoint>
       </remote>
    </config>
    
    ```

3.  Uncomment the following section if you are using NTLM, Kerberos, or external SSO, or an HTTP load balancer.

    ```
    
     <config evaluator="string-compare" condition="Remote"> 
          <remote> 
            <ssl-config>
                 <keystore-path>alfresco/web-extension/alfresco-system.p12</keystore-path>
                 <keystore-type>pkcs12</keystore-type>
                 <keystore-password> alfresco-system</keystore-password>
    
                 <truststore-path> alfresco/web-extension/ssl-truststore</truststore-path>
                 <truststore-type>JCEKS</truststore-type>
                 <truststore-password>password</truststore-password>
    
                 <verify-hostname>true</verify-hostname>
             </ssl-config>
              
             <connector> 
                <id>alfrescoCookie</id> 
                <name>Alfresco Connector</name> 
                <description>Connects to an Alfresco instance using cookie-based authentication</description> 
                <class>org.alfresco.web.site.servlet.SlingshotAlfrescoConnector</class> 
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
                
             <endpoint>
                <id>alfresco-api</id>
                <parent-id>alfresco</parent-id>
                <name>Alfresco Public API - user access</name>
                <description>Access to Alfresco Repository Public API that require user authentication.
                  This makes use of the authentication that is provided by parent 'alfresco' endpoint.</description>
                <connector-id>alfresco</connector-id>
                <endpoint-url>http://localhost:8080/alfresco/api</endpoint-url>
                <identity>user</identity>
                <external-auth>true</external-auth>
             </endpoint> 
          </remote> 
       </config> 
    
              
    ```

4.  Replace all instances of 8080 with the required port number.

5.  Save the file.


**Parent topic:**[Configuring Alfresco Share](../concepts/share-configuring-intro.md)

