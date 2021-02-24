---
author: [Alfresco Documentation, Alfresco Documentation]
audience: 
category: [Installation, Alfresco Server]
keyword: WebSphere
---

# Installing Alfresco on WebSphere

This section describes how to install Alfresco on WebSphere 7.0. These instructions are valid for installing on Windows 2008.

See the [Support Portal](http://support.alfresco.com) for the currently required Fix Pack level. It is important that both the application server and JDK fix pack components are applied.

Alfresco does not support CIFS Kerberos authentication on WebSphere. This is because Alfresco relies on Sun JDK internal classes.

1.  Download the Enterprise EAR file alfresco-enterprise-ear-3.4.14.zip from the Support Portal and extract it to an empty directory.

    This embeds Alfresco Explorer and Share, plus the necessary WebSphere configuration to use the myfaces1\_1 shared library with parent-last loading order.

2.  Create a Myfaces v1.1 shared library.

    Because neither of the versions of JSF that ship with WebSphere 7 are compatible with Alfresco, you must define a new isolated shared library in WebSphere that contains a compatible implementation. This is documented in the Configuring JavaServer Faces implementation section of the WebSphere 7 manual. The Alfresco Enterprise .ear file embeds an appropriate shared library definition in `META-INF/ibmconfig`, so it is only necessary to prepare WebSphere.

    Copy and extract the myfaces1\_1-websphere-shared-lib-version.zip file to the root WebSphere installation directory. This creates a myfaces1\_1 directory containing all the .jars required by the `myfaces1_1` shared library on WebSphere. For example, on Windows:

    ```
    cd /d "C:\Program Files\IBM\WebSphere\AppServer"
    java\bin\jar xvf myfaces1_1-websphere-shared-lib.zip
    ```

3.  Enable Xalan as the standard JAXP Transformer.

    Copy the file $WAS\_INSTALL\_ROOT/java/jre/lib/jaxp.properties.sample \(for example, C:\\Program Files\\IBM\\WebSphere\\AppServer\\java\\jre\\lib\\jaxp.properties.sample\) to $WAS\_INSTALL\_ROOT/java/jre/lib/jaxp.properties.

    Edit the jaxp.properties file and change the following line: `#javax.xml.transform.TransformerFactory=com.ibm.xtq.xslt.jaxp.compiler.TransformerFactoryImpl` to read:

    ```
    javax.xml.transform.TransformerFactory=org.apache.xalan.
    ```

    ```
    processor.TransformerFactoryImpl
    ```

    Also, add the following line:

    ```
    javax.xml.parsers.DocumentBuilderFactory=org.apache.xerces.
    ```

    ```
    jaxp.DocumentBuilderFactoryImpl 
    ```

4.  Configure Share to point to the WebSphere default HTTP port 9080 \(or another number that you wish to specify\).

    1.  Locate the /web-server/classpath/alfresco/web-extension/share-config-custom.xml.sample file from the extracted alfresco-enterprise-ear-3.4.14.zip file.

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

5.  Install a license.

    If you have been issued with a .lic license file for this version of Alfresco, copy it to a $WAS\_INSTALL\_ROOT/lib/alfresco/extension/license directory \(for example, C:\\Program Files\\IBM\\WebSphere\\AppServer\\lib\\alfresco\\extension\\license\\mylicense.lic\).

6.  \(Optional\) Enable WCM.

    You need the WCM bootstrap context on the class path.

    Download the wcm-bootstrap-context.xml file and copy it to the $WAS\_INSTALL\_ROOT/lib/alfresco/extension directory \(for example, C:\\Program Files\\IBM\\WebSphere\\AppServer\\lib\\alfresco\\extension\).

7.  Define the environment information using the extension classpath mechanism and the alfresco-global.properties file.

    1.  Locate the /web-server/classpath/alfresco-global.properties.sample file from the extracted alfresco-enterprise-ear-3.4.14.zip file.

    2.  Copy the alfresco-global.properties.sample file to $WAS\_INSTALL\_ROOT/lib, removing the .sample extension.

        For example, C:\\Program Files\\IBM\\WebSphere\\AppServer\\lib\\alfresco-global.properties.

    3.  Disable the `mbean` server lookup by adding the following property `mbean.server.locateExistingServerIfPossible=false`.

    4.  Add the following property `lucene.indexer.useNioMemoryMapping=false`.

        If this property is true, it uses the nio native buffering for accessing the index information file. Set this property to false to enable writes to a byte buffer.

    5.  Uncomment and edit the lines appropriate for your database type.

8.  Copy the JDBC driver jar to the $\{WAS\_INSTALL\_ROOT\}/lib directory. 

    For example, C:\\ProgramFiles\\IBM\\WebSphere\\AppServer\\lib.

9.  Install the EAR file.

    1.  Log on to the WebSphere Administrative console.

        For example, http://localhost:9060/ibm/console/.

    2.  Navigate to **Application servers \> server1 \> Process definition \> Java Virtual Machine**, and then set the Maximum heap size to 2048 MB.

    3.  Navigate to **Applications \> New Application \> New Enterprise Application**.

    4.  Browse to alfresco-enterprise-3.4.14.ear on the local file system, and then click **Next**.

    5.  Select **Detailed - Show all installation options and parameters**, and then click **Next**.

    6.  Under **Target Resource JNDI Name**, type `jdbc/dummy`, and then click **Next**.

        This step is recommended to force Alfresco to use its built in DBCP connection pool rather than a WebSphere data source. 

    7.  Jump to the **Map environment entries for Web modules** step.

    8.  For `properties/dir.root`, specify an absolute file system path where you would like Alfresco file data to be stored.

        For example, C:\\alf\_data.

    9.  Leave the Hibernate properties blank, unless you want to override the default behavior, where they will be auto-detected.

    10. Click **Next** and **Finish**.

    11. Save your profile changes to the master repository.

    12. Restart the WebSphere server.

        Alfresco starts with the WebSphere server.

10. Remove the SQL warning messages from log file.

    WebSphere shows warnings in the log file, similar to the following:

    ```
    [12/7/10 17:24:42:206 EET] 0000003a JDBCException W org.hibernate.util.JDBCExceptionReporter logWarnings SQL Warning: 4474, SQLState: 01000 
    [12/7/10 17:24:42:208 EET] 0000003a JDBCException W org.hibernate.util.JDBCExceptionReporter logWarnings [jcc][t4][10217][10310][4.8.87] 
    Connection read-only mode is not enforceable after the connection has been established. 
    To enforce a read only connection, set the read-only data source or connection property. ERRORCODE=4474, SQLSTATE=01000
    ```

    The current driver implementation will display these warnings, however, they have no impact on the operation of Alfresco. You can either choose to ignore these warnings, or you can configure the logging to stop them displaying.

    1.  Open WebSphere Administrative console.

    2.  Navigate to **Troubleshooting \> Logs** and **trace- Server - Change Log Detail Levels**.

    3.  Search for the `org.hibernate.util.*` component.

    4.  Set `org.hibernate.util.JDBCExceptionReporter` class logger - Messages and Trace Levels to `severe` or `fatal`.

11. Log in to Alfresco:

    -   Alfresco Share at http://localhost:9080/share
    -   Alfresco Explorer at http://localhost:9080/alfresco

-   **[Enabling Google Docs with Alfresco \(Lucene enabled\) deployed on WebSphere](../tasks/googledocs-Websphere-integration.md)**  
This section describes how to enable Google Docs on Alfresco deployed within WebSphere and using the Lucene search engine.
-   **[Enabling YouTube with Alfresco \(Lucene enabled\) deployed on WebSphere](../tasks/Youtube-Websphere-integration-Lucene.md)**  
This section describes how to enable YouTube for Alfresco deployed within WebSphere and using the Lucene search engine.
-   **[Enabling SlideShare with Alfresco \(Lucene enabled\) deployed on WebSphere](../tasks/Slideshare-Websphere-integration_lucene.md)**  
This section describes how to enable SlideShare for Alfresco deployed on WebSphere and using the Lucene search engine.

**Parent topic:**[Installing Alfresco](../concepts/ch-install.md)

**Related information**  


[Configuring databases](../concepts/intro-db-setup.md)

[Modifying the global properties file](global-props-config.md)

