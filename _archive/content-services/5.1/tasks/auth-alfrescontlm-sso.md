---
author: [Alfresco Documentation, Alfresco Documentation]
audience: 
category: [Authentication and Security, Authentication, Administration]
keyword: [SSO, NTLM, configuration, authentication]
---

# Configuring Alfresco Share SSO to use NTLM

Use this information to configure NTLM with Alfresco Share SSO.

Alfresco Share exists as a separate web application to the main Alfresco repository WAR file. It can run in the same application server instance on the same machine as the main web application, or it can run on a completely separate application server instance on a different machine. Share uses HTTP\(S\) to communicate with the configured Alfresco repository.

1.  Locate the following configuration file:

    <web-extension\>\\share-config-custom.xml

2.  Edit the file, and then uncomment the following section:

    ```
     <!-- 
            SSO authentication config for Share
            NOTE: change localhost:8080 below to appropriate alfresco server location if required
       -->
       <config evaluator="string-compare" condition="Remote">
          <remote>
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
          </remote>
       </config>
    ```

    From Alfresco One 5.1.5 onwards, the RSS feed URLs no longer use the `alfresco` endpoint. To make the RSS feed work, add one of the following to the above code.

    -   To use the RSS feeds authenticated through SSO, add the following:

        ```
        <endpoint>
        <id>alfresco-feed</id>
        <parent-id>alfresco</parent-id> 
        <name>Alfresco Feed</name>
        <description>Override Alfresco Feed - supports basic HTTP authentication via the EndPointProxyServlet</description> 
        <connector-id>alfrescoCookie</connector-id>
        <endpoint-url>http://localhost:8080/alfresco/wcs</endpoint-url>
        <identity>user</identity>
        <external-auth>true</external-auth>
        </endpoint>
        ```

    -   To use the RSS feeds with basic authentication \( or with older RSS feed readers\) user, add the following:

        ```
        <endpoint>
        <id>alfresco-feed</id>
        <parent-id>alfresco</parent-id> 
        <name>Alfresco Feed</name>
        <description>Override Alfresco Feed - supports basic HTTP authentication via the EndPointProxyServlet</description> 
        <connector-id>alfresco</connector-id> 
        <endpoint-url>http://localhost:8080/alfresco/wcs</endpoint-url>
        <identity>user</identity>
        <basic-auth>true</basic-auth>
        <external-auth>false</external-auth>
        </endpoint>
        ```

        **Note:** SSO for RSS links only works if the user is first logged into Alfresco Share in the same browser session.

3.  Change the `<endpoint-url>http://localhost:8080/alfresco/wcs</endpoint-url>` value to point to your Alfresco server location.

4.  Set the `maxThreads` option in the <TOMCAT\_HOME\>/conf/server.xml file.

    ```
    <Connector port="8080" protocol="HTTP/1.1" 
                   connectionTimeout="20000" 
                   redirectPort="8443" 
                   maxThreads="200" 
     />
    ```

    **Note:** If Share and Alfresco are installed on the same Tomcat, it is important to set the `maxThreads` option to 2\*\(expected number of concurrent requests\). This is because each Share request spawns an Alfresco request.

5.  Restart Share.


If you have configured alfrescoNtlm or `passthru` in your Alfresco authentication chain and enabled SSO, NTLM will be the active authentication mechanism.

**Parent topic:**[Configuring alfrescoNtlm](../concepts/auth-alfrescontlm-intro.md)

