---
author: [Alfresco Documentation, Alfresco Documentation]
---

# Installing Alfresco on WebSphere

Use this information to install Alfresco on WebSphere 8.5.5.

Before you start:

-   These instructions are valid for installing on Linux \(SUSE 11.3 and SUSE 12\) and Windows 2008
-   See the [Support Portal](http://support.alfresco.com) for the currently required Service Pack to ensure that both the application server and JDK components are applied
-   Install IBM WebSphere 8.5.5

1.  Download the Enterprise EAR file alfresco-one-ear-distribution-5.1.5.zip from the Support Portal and extract it to an empty directory.

    This embeds Alfresco Explorer and Share, plus the necessary WebSphere configuration to use the myfaces1\_1 shared library with parent-last loading order.

2.  Create a new folder for your shared library; for example:

    ```
    $(WAS_INSTALL_ROOT)/httpcore
    ```

    Due to library conflicts with WebSphere, this must be an isolated shared library with classes used by Share.

3.  From the directory where you extracted Enterprise EAR \(alfresco-enterprise.ear\\share.war\\WEB-INF\\lib\\\), copy the httpclient-<version\>.jar and httpcore-<version\>.jar files to your new shared library folder, $\(WAS\_INSTALL\_ROOT\)/httpcore.

4.  Create a Myfaces v1.1 shared library.

    Because neither of the versions of JSF that ship with WebSphere are compatible with Alfresco, you must define a new isolated shared library in WebSphere that contains a compatible implementation. This is documented in the Configuring JavaServer Faces implementation section of the WebSphere documentation. The Alfresco Enterprise .ear file embeds an appropriate shared library definition in `META-INF/ibmconfig`, so it is only necessary to prepare WebSphere.

    Copy and extract the myfaces1\_1-websphere-shared-lib-version.zip file to the root WebSphere installation directory. This creates a myfaces1\_1 directory containing all the .jars required by the `myfaces1_1` shared library on WebSphere. For example, on Windows:

    ```
    cd /d "C:\Program Files\IBM\WebSphere\AppServer"
    java\bin\jar xvf myfaces1_1-websphere-shared-lib.zip
    ```

5.  If you are using Windows, copy the `Win32NetBIOS.dll`, `Win32NetBIOSx64.dll`,`Win32Utils.dll` and `Win32Utilsx64.dll` files from the alfresco-one-ear-distribution-5.1.5.zip\\bin directory to the C:\\WINDOWS\\system32 directory.

6.  Enable Xalan as the standard JAXP transformer.

    1.  Copy the $WAS\_INSTALL\_ROOT/java/jre/lib/jaxp.properties.sample file \(for example, C:\\Program Files\\IBM\\WebSphere\\AppServer\\java\\jre\\lib\\jaxp.properties.sample\) to $WAS\_INSTALL\_ROOT/java/jre/lib/jaxp.properties.

    2.  Edit the jaxp.properties file as follows:

        ```
        
        javax.xml.transform.TransformerFactory=org.apache.xalan.processor.TransformerFactoryImpl 
        javax.xml.parsers.DocumentBuilderFactory=org.apache.xerces.jaxp.DocumentBuilderFactoryImpl
                    
        ```

7.  Configure Share to point to the WebSphere default HTTP port 9080 \(or another number that you wish to specify\).

    1.  Locate the /web-server/classpath/alfresco/web-extension/share-config-custom.xml.sample file from the extracted alfresco-one-ear-distribution-5.1.5.zip file.

    2.  Copy the share-config-custom.xml.sample file to $WAS\_INSTALL\_ROOT/lib/alfresco/web-extension/share-config-custom.xml \(For example, C:\\Program Files\\IBM\\WebSphere\\AppServer\\lib\\alfresco\\web-extension\\share-config-custom.xml\).

    3.  Uncomment this section by removing the begin comment `<--` and end comment `-->` lines surrounding this section.

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

    4.  Edit the file, replacing all instances of 8080 with 9080 \(or the port number that you specify\) and all instances of `yourserver` with localhost \(or a different host running Alfresco\).

    5.  In certain environments, an HTTP request originating from Flash cannot be authenticated using an existing session. For these cases, it is useful to disable the Flash-based uploader for Share Document Libraries.

        To disable the Flash uploader, add the following lines to the Document Library config section:

        ```
        <!-- Document Library config section --> 
           <config evaluator="string-compare" condition="DocumentLibrary" replace="true"> 
              <!-- 
                 File upload configuration 
              --> 
              <file-upload> 
                 <adobe-flash-enabled>false</adobe-flash-enabled> 
              </file-upload> 
           </config>
        ```

    6.  Save the file.

8.  In the web.xml file from the alfresco.war,  remove the `<dispatcher>REQUEST</dispatcher>` parameter from the Global Localization Filter configuration section.

9.  Install a license.

    If you have been issued with a .lic license file for this version of Alfresco, copy it to a $WAS\_INSTALL\_ROOT/lib/alfresco/extension/license directory \(for example, C:\\Program Files\\IBM\\WebSphere\\AppServer\\lib\\alfresco\\extension\\license\\mylicense.lic\).

10. Define the environment information using the extension classpath mechanism and the alfresco-global.properties file.

    1.  Locate the /web-server/classpath/alfresco-global.properties.sample file from the extracted alfresco-one-ear-distribution-5.1.5.zip file.

    2.  Copy the alfresco-global.properties.sample file to $WAS\_INSTALL\_ROOT/lib, removing the .sample extension.

        For example, C:\\Program Files\\IBM\\WebSphere\\AppServer\\lib\\alfresco-global.properties.

    3.  Disable the `mbean` server lookup by adding the following property `mbean.server.locateExistingServerIfPossible=false`.

    4.  Uncomment and edit the lines appropriate for your database type.

11. Copy the JDBC driver jar to the $\{WAS\_INSTALL\_ROOT\}/lib directory. 

    For example, C:\\ProgramFiles\\IBM\\WebSphere\\AppServer\\lib.

12. Install the EAR file.

    1.  Log on to the WebSphere Administrative console.

        For example, http://localhost:9060/ibm/console/

    2.  Navigate to **Application servers \> server1 \> Process definition \> Java Virtual Machine**, and then set the Maximum heap size to 2048 MB.

    3.  Navigate to **Application servers \> server1 \> Container Settings \>Web Container Settings \>Web container transport chains**.

        -   Click **HttpQueueInboundDefault \(where port is 9080\)**.
        -   Click**HTTP inbound channel \(HTTP\_2\) Custom properties**.
        -   Create a new property with the name `CookiesConfigureNoCache` and set the value to false.
    4.  Navigate to **Applications \> New Application \> New Enterprise Application**.

    5.  Browse to alfresco-enterprise-5.1.5.ear on the local file system, and then click **Next**.

    6.  Select **Detailed - Show all installation options and parameters**, and then click **Next**.

    7.  Jump to the **Map resource references to resources** step, which is highlighted with a \(**+**\).

    8.  Under **Target Resource JNDI Name**, type `jdbc/dummy`, and then click **Next**.

        This step is recommended to force Alfresco to use its built in DBCP connection pool rather than a WebSphere data source. 

    9.  Jump to the **Map environment entries for Web modules** step.

    10. For `properties/dir.root`, specify an absolute file system path where you would like Alfresco file data to be stored.

        For example, C:\\alf\_data.

    11. Leave the Hibernate properties blank, unless you want to override the default behavior, where they will be auto-detected.

    12. Click **Next** and **Finish**.

    13. Save your profile changes to the master repository.

    14. To configure the new shared library, login to the WebSphere Administrative console.

        For example, http://localhost:9060/ibm/console/.

    15. Navigate to Environment \> Shared libraries.

    16. Choose server with Alfresco application for scope and create a new shared library.

    17. Specify the name for the new shared library \(for example, httpcore\).

    18. Specify the folder name \(for example, $\(WAS\_INSTALL\_ROOT\)/httpcore\) in the classpath.

    19. Check **Use an isolated class loader for this shared library**.

    20. Click Apply and Save.

    21. Navigate to Applications\>Application Types\>WebSphere Enterprise applications\>Alfresco\>References\>Shared library references.

    22. Check **Alfresco Project Slingshot module**.

        Do not check **Alfresco** application.

    23. Click **Reference shared libraries**.

    24. Add httpcore shared library \(or your specified shared library name\) to the selected column.

    25. Click **OK** and save changes to the master configuration.

    26. Restart the WebSphere server.

        Alfresco starts with the WebSphere server.

13. Remove the SQL warning messages from log file.

    WebSphere shows warnings in the log file, similar to the following:

    ```
    [12/7/10 17:24:42:206 EET] 0000003a JDBCException W org.hibernate.util.JDBCExceptionReporter logWarnings SQL Warning: 4474, SQLState: 01000 
    [12/7/10 17:24:42:208 EET] 0000003a JDBCException W org.hibernate.util.JDBCExceptionReporter logWarnings [jcc][t4][10217][10310][4.8.87] 
    Connection read-only mode is not enforceable after the connection has been established. 
    To enforce a read only connection, set the read-only data source or connection property. ERRORCODE=4474, SQLSTATE=01000
    ```

    The current driver implementation will display these warnings, however, they have no impact on the operation of Alfresco. You can either choose to ignore these warnings, or you can configure the logging to stop them displaying.

    1.  Open WebSphere Administrative Console.

    2.  Navigate to **Troubleshooting \> Logs** and **trace- Server - Change Log Detail Levels**.

    3.  Search for the `org.hibernate.util.*` component.

    4.  Set `org.hibernate.util.JDBCExceptionReporter` class logger - Messages and Trace Levels to `severe` or `fatal`.

14. Log in to Alfresco:

    -   Alfresco Share at http://localhost:9080/share
    -   Alfresco Explorer at http://localhost:9080/alfresco

-   **[Configuring Solr with Alfresco running on WebSphere](../tasks/alf-websphere-solr-config.md)**  
Use this information to configure Solr to communicate with Alfresco deployed on WebSphere.
-   **[Configuring Enterprise to Cloud Sync for Alfresco on WebSphere](../tasks/alf-websphere-enterprise-sync-config.md)**  
Use this information to configure Enterprise to Cloud Sync for Alfresco deployed on WebSphere.
-   **[Enabling Google Docs with Alfresco deployed on WebSphere](../tasks/Websphere-channel-publishing.md)**  
Use this information to enable Google Docs with Alfresco deployed on WebSphere.

**Parent topic:**[Installing Alfresco on other web applications](../concepts/other-apps-install.md)

**Related information**  


[Configuring databases](../concepts/intro-db-setup.md)

[Modifying the global properties file](global-props-config.md)

