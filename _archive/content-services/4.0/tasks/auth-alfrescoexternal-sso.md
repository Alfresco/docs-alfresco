---
author: [Alfresco Documentation, Alfresco Documentation]
audience: 
---

# Configuring Alfresco Share to use an external SSO

Alfresco Share can be configured to accept a user name from an HTTP header provided by an external authentication system for Single Sign on \(SSO\).

1.  Open the Share <web-extension\> directory.

2.  Copy or rename the share-config-custom.xml.sample file to be called share-config-custom.xml.

3.  Uncomment the second `<config evaluator="string-compare" condition="Remote">` section.

4.  Change the connector used by the endpoint in the second section to use `alfrescoHeader` rather than `alfrescoCookie`.

5.  Set the name of the header used by the external SSO in the `userHeader` element of the `alfrescoHeader` connector.

6.  Change the `endpoint-url` value to point to your Alfresco Server location.

    ```
      <!-- 
            Overriding endpoints to reference an Alfresco server with external SSO
            enabled
            NOTE: If utilising a load balancer between web-tier and repository 
            cluster,the "sticky sessions" feature of your load balancer must be used.
                  
            NOTE: If alfresco server location is not localhost:8080 then also combine   
            changes from the"example port config" section below.
            *Optional* keystore contains SSL client certificate + trusted CAs.
            Used to authenticate share to an external SSO system such as CAS
            Remove the keystore section if not required i.e. for NTLM.
            
            NOTE: For Kerberos SSO rename the "KerberosDisabled" condition above to 
            "Kerberos"
            
            NOTE: For external SSO, switch the endpoint connector to "AlfrescoHeader" 
                  and set the userHeader to the name of the HTTP header 
                  that the external SSO uses to provide the authenticated user name.
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
                <description>Connects to an Alfresco instance using cookie-based 
                              authentication
                </description>
                <class>org.springframework.extensions.webscripts.connector.AlfrescoConnector</class>
             </connector>
             
             <connector>
                <id>alfrescoHeader</id>
                <name>Alfresco Connector</name>
                <description>Connects to an Alfresco instance using header and 
                 cookie-based authentication
                </description>
                <class>org.springframework.extensions.webscripts.connector.AlfrescoConnector</class>
                <userHeader>**SsoUserHeader**</userHeader>
             </connector>
    
             <endpoint>
                <id>alfresco</id>
                <name>Alfresco - user access</name>
                <description>Access to Alfresco Repository WebScripts that require user
                 authentication
                </description>
                <connector-id>**alfrescoHeader**</connector-id>
                <endpoint-url>**http://localhost:8080/alfresco/wcs**</endpoint-url>
                <identity>user</identity>
                <external-auth>true</external-auth>
             </endpoint>
          </remote>
       </config>
       
                                
    ```

7.  Set the `external.authentication.proxyHeader` property to the same value as the `userHeader` value.

    This configures both Share and the repository to use the same HTTP header value.

    ```
    external.authentication.proxyHeader=SsoUserHeader   
    ```

8.  Save the file and then restart Share.

    Activating external authentication makes Alfresco accept external authentication tokens. Ensure that no untrusted direct access to Alfresco's HTTP or AJP ports is allowed.


You have now configured Alfresco Share to use an external SSO.

**Parent topic:**[Configuring authentication](../concepts/auth-config-examples.md)

