---
author: [Alfresco Documentation, Alfresco Documentation]
---

# Step 3. Configuring Alfresco Share Kerberos SSO

You can configure the Alfresco Share server and Active Directory server to work with Kerberos Single Sign On \(SSO\).

1.  Configure the Alfresco Content Services server.

2.  Configure Share.

    1.  Go to the Share <web-extension\> directory.

    2.  Open the share-config-custom.xml file.

    3.  Replace the `realm` and `endpoint-spn` options with the correct values for the AlfrescoHTTP user \(used to create the keytab files\). The `realm` value should be capitalized.

    4.  Uncomment both the `<config evaluator="string-compare" condition="Remote">` sections.

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

        **Note:** To make sure the XML code looks correct, use an XML validator before saving the file.

    5.  Locate the `<!-- Kerberos settings -->` section and replace `condition=KerberosDisabled` with `condition=Kerberos`.

        ```
        <!-- Kerberos settings -->
           <!-- To enable kerberos rename this condition to "Kerberos" -->
           <config evaluator="string-compare" condition="Kerberos" replace="true">
              <kerberos>
        ```

    6.  Make sure you have set up the Java login configuration file for Share to work, as shown in [Configuring Kerberos on Alfresco server](kerberos-alfresco-config.md#2).

    7.  Restart the Alfresco Content Services server.

3.  Make sure you have configure Active Directory. See [Configuring Kerberos with Active Directory](kerberos-AD-config.md).

4.  Configure the Kerberos client. See [Kerberos client configuration](../concepts/auth-kerberos-clientconfig.md).


**Parent topic:**[Enabling Kerberos authentication](../tasks/auth-kerberos-ADconfig.md)

**Related information**  


[Step 4. Kerberos client configuration](../concepts/auth-kerberos-clientconfig.md)

