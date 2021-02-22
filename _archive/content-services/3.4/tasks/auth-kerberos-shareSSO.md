---
author: [Alfresco Documentation, Alfresco Documentation]
source: 
audience: 
category: [Authentication and Security, Authentication, Administration]
keyword: [configuration, Kerberos, authentication, SSO, Active Directory]
---

# Configuring Share Kerberos SSO

This section describes how to configure the Share server and Active Directory server to work with Kerberos Single Sign On \(SSO\).

To configure Share, follow the steps below:

1.  Open the Share <web-extension\> directory.

2.  Copy or rename the share-config-custom.xml.sample file to be called share-config-custom.xml.

3.  Uncomment both the `<config evaluator="string-compare" condition="Remote">` sections.

    ```
    
       <!-- example port config used to access remote Alfresco server (default is 8080) -->
       
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
                <id>activiti-admin</id>
                <name>Activiti Admin UI - user access</name>
                <description>Access to Activiti Admin UI, that requires user authentication</description>
                <connector-id>activiti-admin-connector</connector-id>
                <endpoint-url>http://localhost:8080/alfresco/activiti-admin</endpoint-url>
                <identity>user</identity>
             </endpoint>
          </remote>
       </config>
     
    
       <!-- 
            Overriding endpoints to reference an Alfresco server with external SSO enabled
            NOTE: If utilising a load balancer between web-tier and repository cluster, the "sticky
                  sessions" feature of your load balancer must be used.
            NOTE: If alfresco server location is not localhost:8080 then also combine changes from the
                  "example port config" section below.
            *Optional* keystore contains SSL client certificate + trusted CAs.
            Used to authenticate share to an external SSO system such as CAS
            Remove the keystore section if not required i.e. for NTLM.
            
            NOTE: For Kerberos SSO rename the "KerberosDisabled" condition above to "Kerberos"
            
            NOTE: For external SSO, switch the endpoint connector to "AlfrescoHeader" and set
                  the userHeader to the name of the HTTP header that the external SSO
                  uses to provide the authenticated user name.
       -->
       
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
                <class>org.alfresco.web.site.servlet.SlingshotAlfrescoConnector</class>
             </connector>
             
             <connector>
                <id>alfrescoHeader</id>
                <name>Alfresco Connector</name>
                <description>Connects to an Alfresco instance using header and cookie-based authentication</description>
                <class>org.alfresco.web.site.servlet.SlingshotAlfrescoConnector</class>
                <userHeader>SsoUserHeader</userHeader>
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

4.  Locate the `<!-- Kerberos settings -->` section and replace `condition=KerberosDisabled` with `condition=Kerberos`.

    ```
    <!-- Kerberos settings -->
       <!-- To enaable kerberos rename this condition to "Kerberos" -->
       <config evaluator="string-compare" condition="Kerberos" replace="true">
          <kerberos>
    ```

5.  Edit the `password`, `realm`, and `endpoint-spn` settings to match your environment. The `realm` value should be capitalized. On an Active Directory environment, these settings should match the parameters of the `ktpass` command used to generate the http<host\>.keytab file.

6.  Restart the Alfresco server.


**Parent topic:**[Configuring Kerberos](../concepts/auth-kerberos-intro.md)

**Related information**  


[Kerberos client configuration](auth-kerberos-clientconfig.md)

