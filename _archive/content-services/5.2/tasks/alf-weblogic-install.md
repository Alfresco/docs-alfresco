---
author: [Alfresco Documentation, Alfresco]
audience: 
category: Installation
keyword: [WebLogic, Oracle, WAR]
---

# Installing Alfresco Content Services on WebLogic

Use this information to install Alfresco Content Services as an Enterprise Archive format \(EAR\) into Oracle WebLogic.

Before you start:

-   Install OpenOffice and ensure that the ooo.exe property is set in the alfresco-global.properties file.
-   Create an Alfresco Content Services database and user with appropriate permissions.
-   [Install WebLogic 12.2.1](http://www.oracle.com/technetwork/middleware/weblogic/downloads/index.html) without creating any domains or servers. For more information, see [Installing and Configuring Oracle WebLogic Server and Coherence](http://docs.oracle.com/middleware/1212/core/WLSIG/install_gui.htm) documentation.
-   Ensure that the installation environment meets the system requirements.
-   Install the appropriate Java 8 version according to [Oracle Fusion Middleware Supported System Configurations](http://www.oracle.com/technetwork/middleware/ias/downloads/fusion-certification-100350.html) for WebLogic 12.2.1 and relevant OS. For details, see [Verifying Certification and System Requirements](http://docs.oracle.com/middleware/1212/core/ASINS/preparing.htm#ASINS325).

**Note:** Certain components of Alfresco Content Services require access to the EAR file contents as files. These instructions require that you expand the .ear into exploded format, as described in the WebLogic documentation. The Alfresco Content Services WebLogic deployment solution makes use of a Filter Classloader, configured in the weblogic-application.xml file, to ensure that the unmodified contents of the Alfresco Content Services web module will run in WebLogic.

The following instructions use <Oracle\_Home\> to refer to the Oracle home directory where WebLogic is installed on your system.

1.  Browse to the Support Portal.

    [http://support.alfresco.com](http://support.alfresco.com)

2.  Download and extract the Enterprise EAR file alfresco-content-services-ear-distribution-5.2.7.zip.

3.  Obtain the license \(.lic\) file.

4.  For Windows OS \(except **Windows 10**\), copy the Win32NetBIOS.dll, Win32NetBIOSx64.dll, Win32Utils.dll, and Win32Utilsx64.dll files from the alfresco-content-services-ear-distribution-5.2.7.zip\\bin directory to C:\\WINDOWS\\system32 directory.

5.  Create a directory in the WebLogic user's home directory to host the exploded EAR file and copy the alfresco-content-services.ear file to that directory.

6.  Run the following commands in the new directory to explode the EAR file:

    1.  `mkdir alfresco`

    2.  `cd alfresco`

    3.  `jar xvf ../alfresco-content-services.ear`

    4.  `mv alfresco.war alfresco.war.tmp`

    5.  `mv share.war share.war.tmp`

    6.  `mkdir alfresco.war`

    7.  `mkdir share.war`

    8.  `cd alfresco.war`

    9.  `jar xvf ../alfresco.war.tmp`

    10. `cd ../share.war`

    11. `jar xvf ../share.war.tmp`

7.  Create the WebLogic domain for Alfresco Content Services using the WebLogic Configuration Wizard.

    On Unix, use the following command to start the configuration wizard and create a new domain called `alf_domain` using the blank template:

    ```
    <ORACLE_HOME>/oracle_common/common/bin/config.sh
    ```

    This task assumes that the domain location is <Oracle\_Home\>/user\_projects/domains/alf\_domain.

    For more information, see Oracle Fusion Middleware documentation on [Creating and Configuring a WebLogic Domain](http://docs.oracle.com/middleware/1212/core/WLSIG/create_domain.htm#WLSIG284).

8.  Copy the share-config-custom.xml file from alfresco-content-services-ear-distribution-5.2.7.zip/web-server/classpath/alfresco/web-extension to <DOMAINS\>/alf\_domain/alfresco/web-extension.

9.  Create a directory for the license file.

    For example, in Linux, use the following command:

    ```
    mkdir -p <Oracle_Home>/user_projects/domains/alf_domain/alfresco/extension/license
    ```

10. Move the license .lic file into the license directory.

11. In the <Oracle\_Home\>/user\_projects/domains/alf\_domain directory, create the alfresco-global.properties file.

    Modify the file in the same way you would for global properties configuration.

12. Add the following line to the alfresco-global.properties file.

    ```
    db.pool.statements.enable=false
    ```

    This property setting is required to make the DBCP connection pool work on WebLogic.

13. Configure the Oracle JDBC driver.

    1.  Download the appropriate Oracle Instant Client package for your operating system from [Oracle Database Instant Client](http://www.oracle.com/technetwork/database/features/instant-client/index-100365.html).

    2.  Unzip the package to a local directory.

        Ensure that the path to the driver is on the WebLogic server's classpath.

        For example, to configure Oracle Thin Driver ojdbc6.jar that is located in /opt/oracle/config, follow the steps below:

        1.  Add the following lines to the setDomainEnv.sh file that is located in <Oracle\_Home\>/user\_projects/domains/alf\_domain/bin directory.

            ```
            LD_LIBRARY_PATH=/opt/oracle/config
            export LD_LIBRARY_PATH
            EXT_PRE_CLASSPATH=$LD_LIBRARY_PATH/ojdbc6.jar
            export EXT_PRE_CLASSPATH
            ```

        2.  Add the following line to the alfresco-global.properties file: 

            ```
            db.url=jdbc:oracle:thin:@${db.host}:1521:${db.name}
            ```

14. Update the setDomainEnv.sh file for the following parameters:

    1.  Heap size parameter

        ```
        WLS_MEM_ARGS_64BIT=-Xmx2048m
        WLS_MEM_ARGS_32BIT=-Xmx1024m
        ```

        We recommend that you set this parameter.

    2.  `JAVA_OPTIONS` parameter

        -   Use the `-Dweblogic.disableMBeanAuthorization` system property to disable servicing of Platform MbeanServer with the WLS security infrastructure.
        -   The JAXBContext provider is used by the JAXB provider for the JAXB-related tasks. To configure the JAXB providers, set the Java system property, `-Djavax.xml.bind.JAXBContext` to `com.sun.xml.bind.v2.ContextFactory`.
        ```
        JAVA_OPTIONS=”${JAVA_OPTIONS} -Dweblogic.disableMBeanAuthorization=true”
        JAVA_OPTIONS=”${JAVA_OPTIONS} -Djavax.xml.bind.JAXBContext=com.sun.xml.bind.v2.ContextFactory"
        ```

        This modification will allow Alfresco Content Services MBeans to co-exist with WebLogic MBeans.

    3.  `alf_domain` location

        Ensure that `alf_domain` is in the global classpath.

        ```
        PRE_CLASSPATH="<Oracle_Home>/user_projects/domains/alf_domain"
        export PRE_CLASSPATH
        ```

15. Edit the <Oracle\_Home\>/user\_projects/domains/alf\_domain/config/config.xml file and add the following before the end of the `</security-configuration>` section:

    ```
    <enforce-valid-basic-auth-credentials>false</enforce-valid-basic-auth-credentials>
    ```

16. Open the <Oracle\_Home\>/user\_projects/domains/alf\_domain/nodemanager/nodemanager.properties file, and then edit the settings so that the `setDomainEnv` settings are passed on to the Alfresco Content Services server by the node manager.

    ```
    StartScriptEnabled=true
    ```

    If the Node Manager type is set as `Plain (non SSL)` when creating a new machine in Step 19\(e\), then the `NodeManager` should be configured with the `SecureListener=false` property.

17. Start the domain admin server and node manager.

    For example:

    ```
    <Oracle_Home>/user_projects/domains/alf_domain/bin/startWebLogic.sh
    <Oracle_Home>/user_projects/domains/alf_domain/bin/startNodeManager.sh
    ```

18. Open a web browser and log in to the admin server \(for example, at http://localhost:7001/console\) with the credentials that you specified while configuring WebLogic domain.

19. Create a new `Machine` and a `Server` for running Alfresco Content Services. This will allow you to stop and start Alfresco Content Services without having to restart WebLogic.

    1.  In the left pane of the Administration Console under `alf_domain`, open up the Environment section and then click **Machines**.

    2.  In the right pane, click **New**.

    3.  Optionally, change the **Name and Machine OS**.

    4.  Click **Next**.

    5.  Depending on how the Node manager is configured, you may need to change the default **Type** from `SSL` to say `Plan`.

    6.  Click **Finish**.

    7.  In the left pane, click **Servers**.

    8.  In the right pane, click **New**.

    9.  Change the **Server Name** to `AlfrescoServer`.

    10. Choose a unique **Server Listen Port**. A good port number to choose is `8080` because it is preconfigured in Share.

    11. You can leave the host name blank if you want it to listen on all network adapters.

    12. Click **Finish**.

    13. Click on `AlfrescoServer` and change the **Machine** to be the one just created.

    14. Click **Save**.

20. Deploy the war files to the `AlfrescoServer`.

    1.  In the left pane of the Administration Console under `alf_domain`, click **Deployments**.

    2.  In the right pane, click **Install**.

    3.  Locate and select the directory of your exploded EAR file \(created in Step 5\). It should contain the alfresco.war and share.war.

    4.  Click **Next**.

    5.  Check **Install this deployment as an application**.

    6.  Click **Next**.

    7.  Select `AlfrescoServer`.

    8.  Click **Next**.

    9.  Click **Finish**. The page refresh will take a few seconds and there should be a message indicating the deployment was successful.

    10. In the left pane under **alf\_domain** and **Environment**, click **Servers**.

    11. In the right pane, click the **Control** tab.

    12. Check **AlfrescoServer**.

    13. Click **Start**. There should be a message to indicate a request has been sent to the Node Manager to start the selected server.

21. To enable JMX functionality, enable the Platform MBean server and then restart the AdminServer:

    1.  In the left pane of Administration Console, click the domain name link, for example, `alf_domain`.

    2.  In the General Configuration tab in the right pane, expand the **Advanced** options group.

    3.  Check the **Platform MBean Server Enabled** checkbox.

    4.  Ensure that the **Platform MBean Server Used** checkbox is checked.

    5.  Click **Save**.

    6.  In the left pane under `alf_domain` and **Environment**, click **Servers**.

    7.  In the right pane, click the **Control** tab.

    8.  Check the **AlfrescoServer\(admin\)** checkbox.

    9.  Select **Force shutdown now** from the **Shutdown** control.

    10. Once it has shutdown, run the starWebLogic.sh script again as shown in Step 17.

22. Log in to Alfresco Share at http://localhost:8080/share.


**Note:** If Alfresco Content Services finds a JDBC data source with JNDI path \(`java:comp/env/jdbc/dataSource`\), it uses this data source instead of the embedded data source. To set up the embedded data source in WebLogic,

1.  Define a new global data source, for example, `AlfrescoDataSource`. See the WebLogic documentation for more information
2.  Map `AlfrescoDataSource` into Alfresco Content Services by updating the WEB-INF/weblogic.xml file in alfresco.war containing the following resources:

```
<!DOCTYPE weblogic-web-app PUBLIC "-//BEA Systems, Inc.//DTD WebApplication 8.1//EN"
"http://www.bea.com/servers/wls810/dtd/weblogic810-web-jar.dtd">
<weblogic-web-app>
   <resource-description>
      <res-ref-name>AlfrescoDataSource</res-ref-name>
      <jndi-name>jdbc/dataSource</jndi-name>
   </resource-description>
</weblogic-web-app>
```

-   **[Configuring Solr 4 with Alfresco Content Services running on WebLogic](../tasks/alf-weblogic-solr-config.md)**  
These instructions describe how to configure Solr 4 to communicate with Alfresco Content Services deployed on WebLogic.
-   **[Enabling Google Docs with Alfresco Content Services deployed on WebLogic](../tasks/googledocs-Weblogic-solr-publishing.md)**  
Follow these steps to enable Google Docs for Alfresco Content Services running on WebLogic.

**Parent topic:**[Installing Alfresco Content Services on other web applications](../concepts/other-apps-install.md)

**Related information**  


[Modifying the global properties file](global-props-config.md)

[Configuring databases](../concepts/intro-db-setup.md)

