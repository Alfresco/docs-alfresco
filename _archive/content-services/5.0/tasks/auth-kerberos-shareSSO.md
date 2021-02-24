---
author: [Alfresco Documentation, Alfresco Documentation]
audience: 
category: [Authentication and Security, Authentication, Administration]
keyword: [configuration, Kerberos, authentication, SSO, Active Directory]
---

# Configuring Share Kerberos SSO

You can configure the Share server and Active Directory server to work with Kerberos Single Sign On \(SSO\).

1.  Configure the Alfresco server.

2.  Configure Share.

    1.  Go to the Share <web-extension\> directory.

    2.  Open the share-config-custom.xml file.

    3.  Replace the `realm` and `endpoint-spn` options with the correct values for the AlfrescoHTTP user \(used to create the keytab files\). The `realm` value should be capitalized.

    4.  Uncomment both the `<config evaluator="string-compare" condition="Remote">` sections.

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
                 
              </remote>
           </config>
         
        
           <!-- 
                Overriding endpoints to reference an Alfresco server with external SSO enabled
                 
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
              </remote>
           </config>
           
                                    
        ```

    5.  Locate the `<!-- Kerberos settings -->` section and replace `condition=KerberosDisabled` with `condition=Kerberos`.

        ```
        <!-- Kerberos settings -->
           <!-- To enaable kerberos rename this condition to "Kerberos" -->
           <config evaluator="string-compare" condition="Kerberos" replace="true">
              <kerberos>
        ```

    6.  In the \(Oracle Java\) jre/lib/security/java.login.config file, add a new section:

        ```
        ShareHTTP {
           com.sun.security.auth.module.Krb5LoginModule required
           storeKey=true
           useKeyTab=true
           keyTab="/etc/keys/alfrescohttp.keytab"
           principal="HTTP/madona.example.foo";
        };
        ```

    7.  Restart the Alfresco server.

3.  Configure Active Directory.

    1.  Modify the `alfrescohttp` user created during the Alfresco Kerberos setup.

    2.  In the user **Delegation** tab, tick the **Trust this user for delegation to any service \(Kerberos only\)** check box.

        If you do not see the delegation tab, follow the `Allow a user to be trusted for delegation for specific services` instruction on the Microsoft [http://technet.microsoft.com](http://technet.microsoft.com) website.

    3.  If you cannot see the **Delegation** tab, do one or both of the following:

        -   Register a Service Principal Name \(SPN\) for the user account with the Setspn utility in the support tools on your CD. Delegation is only intended to be used by service accounts, which should have registered SPNs, as opposed to a regular user account which typically does not have SPNs.
        -   Raise the functional level of your domain to Windows Server 2012 R2 x64.
        To raise the domain functional level:

        1.  Open **Active Directory Domains and Trusts**.
        2.  In the console tree, right-click the domain for which you want to raise functionality, and then click **Raise Domain Functional Level**.
        3.  In **Select an available domain functional level**, click **Windows Server 2012**, and then click **Raise**.
4.  Configure the client. See [Kerberos client configuration](../concepts/auth-kerberos-clientconfig.md).


**Parent topic:**[Configuring Kerberos](../concepts/auth-kerberos-intro.md)

**Related information**  


[Kerberos client configuration](../concepts/auth-kerberos-clientconfig.md)

