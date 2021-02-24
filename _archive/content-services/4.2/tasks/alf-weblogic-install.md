---
author: [Alfresco Documentation, Alfresco]
audience: 
category: Installation
keyword: [WebLogic, Oracle, WAR]
---

# Installing Alfresco on WebLogic

This section describes how to install Alfresco as an Enterprise ARchive format \(EAR\) into Oracle WebLogic.

Before you start:

-   Install OpenOffice and ensure that the ooo.exe property is set in the alfresco-global.properties file.
-   Create an `alfresco` database and user with appropriate permissions.
-   [Install WebLogic 12.1.2](http://www.oracle.com/technetwork/middleware/weblogic/downloads/index.html) without creating any domains or servers. For more information, see [Installing and Configuring Oracle WebLogic Server and Coherence](http://docs.oracle.com/middleware/1212/core/WLSIG/install_gui.htm) documentation.
-   Ensure that the installation environment meets the system requirements.
-   Install the appropriate Java 7 version according to [Oracle Fusion Middleware Supported System Configurations](http://www.oracle.com/technetwork/middleware/ias/downloads/fusion-certification-100350.html) for WebLogic 12.1.2 and relevant OS. For details, see [Verifying Certification and System Requirements](http://docs.oracle.com/middleware/1212/core/ASINS/preparing.htm#ASINS325).

**Note:** Certain components of Alfresco require access to the EAR file contents as files. These instructions require that you expand the .ear into exploded format, as described in the WebLogic documentation. The Alfresco WebLogic deployment solution makes use of a Filter Classloader, configured in the weblogic-application.xml file, to ensure that the unmodified contents of the Alfresco web module will run in WebLogic.

If you are using Alfresco 4.2.4.6, you must add the following parameter to the <prefer-application-packages\> section of the weblogic-application.xml file to allow Weblogic to deploy:

```
<package-name>com.sun.xml.bind.*</package-name>
```

The following instructions use <Oracle\_Home\> to refer to the Oracle home directory where WebLogic is installed on your system.

1.  Browse to the Alfresco Support Portal.

    [http://support.alfresco.com](http://support.alfresco.com)

2.  Download and extract the alfresco-enterprise-ear-4.2.8.zip file.

3.  Obtain the license \(.lic\) file.

4.  On a Windows system, copy the Win32NetBIOS.dll, Win32NetBIOSx64.dll, Win32Utils.dll, and Win32Utilsx64.dll files from the alfresco-enterprise-ear-4.2.8.zip\\bin directory to C:\\WINDOWS\\system32 directory.

5.  Create a directory in the WebLogic user's home directory to host the exploded EAR file and copy the alfresco-enterprise-4.2.7.ear file to that directory.

6.  Run the following commands in the new directory to explode the EAR file:

    1.  `mkdir alfresco`

    2.  `cd alfresco`

    3.  `jar xvf ../alfresco-enterprise-4.2.7.ear`

    4.  `mv alfresco.war alfresco.war.tmp`

    5.  `mv share.war share.war.tmp`

    6.  `mkdir alfresco.war`

    7.  `mkdir share.war`

    8.  `cd alfresco.war`

    9.  `jar xvf ../alfresco.war.tmp`

    10. `cd ../share.war`

    11. `jar xvf ../share.war.tmp`

7.  Create the WebLogic domain for Alfresco using the WebLogic Configuration Wizard.

    On Unix, use the following command to start the configuration wizard and create a new domain, `alf_domain`:

    ```
    <ORACLE_HOME>/oracle_common/common/bin/config.sh
    ```

    Assume that alf\_domain has been created and its location is <Oracle\_Home\>/user\_projects/domains/alf\_domain.

    For more information, see Oracle Fusion Middleware documentation on [Creating and Configuring a WebLogic Domain](http://docs.oracle.com/middleware/1212/core/WLSIG/create_domain.htm#WLSIG284).

8.  Copy the share-config-custom.xml file from alfresco-enterprise-ear-4.2.8.zip/web-server/classpath/alfresco/web-extension to <DOMAINS\>/alf\_domain/alfresco/web-extension.

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

14. In the setDomainEnv.sh file, edit the `MEM_MAX_PERM_SIZE_64BIT` and `MEM_MAX_PERM_SIZE_32BIT` parameters to increase the PermGen space.

    ```
    MEM_MAX_PERM_SIZE_64BIT="-XX:MaxPermSize=512m"
    MEM_MAX_PERM_SIZE_32BIT="-XX:MaxPermSize=256m"
    ```

    **Note:** This setting may need to be increased further in accordance with the number of deployed applications. You may see different combinations of these lines, depending on whether you have installed on a 64 or 32-bit platform.

15. In the setDomainEnv.sh file, set the heap size parameter appropriately. The following setting is a recommendation:

    ```
    WLS_MEM_ARGS_64BIT=-Xmx2048m
    WLS_MEM_ARGS_32BIT=-Xmx1024m
    ```

16. Edit the `JAVA_OPTIONS` parameter.

    -   Use the `-Dweblogic.disableMBeanAuthorization` system property to disable servicing of Platform MbeanServer with the WLS security infrastructure \(in the setDomainEnv.sh file\).
    -   The JAXBContext provider is used by the JAXB provider for the JAXB-related tasks. To configure the JAXB providers, set the Java system property, `-Djavax.xml.bind.JAXBContext` to `com.sun.xml.bind.v2.ContextFactory`.
    -   Use the Java Service Provider Interface \(SPI\) file, -Dcom.sun.xml.ws.spi.db.BindingContextFactory, to configure data binding and JAXB providers. Set the java system property, `-Dcom.sun.xml.ws.spi.db.BindingContextFactory` to `com.sun.xml.ws.db.glassfish.JAXBRIContextFactory`.
    ```
    JAVA_OPTIONS=”${JAVA_OPTIONS} -Dweblogic.disableMBeanAuthorization=true”
    JAVA_OPTIONS=”${JAVA_OPTIONS} -Djavax.xml.bind.JAXBContext=com.sun.xml.bind.v2.ContextFactory"
    JAVA_OPTIONS="${JAVA_OPTIONS} -Dcom.sun.xml.ws.spi.db.BindingContextFactory=com.sun.xml.ws.db.glassfish.JAXBRIContextFactory”
    ```

    This modification will allow Alfresco MBeans to co-exist with WebLogic MBeans.

17. Ensure that `alf_domain` is in the global classpath in the setDomainEnv.sh file.

    ```
    PRE_CLASSPATH="<Oracle_Home>/user_projects/domains/alf_domain"
    export PRE_CLASSPATH
    ```

18. Edit the <Oracle\_Home\>/user\_projects/domains/alf\_domain/config/config.xml file and add the following before the end of the `</security-configuration>` section:

    ```
    <enforce-valid-basic-auth-credentials>false</enforce-valid-basic-auth-credentials>
    ```

19. Open the <Oracle\_Home\>/user\_projects/domains/alf\_domain/nodemanager/nodemanager.properties file, and then edit the settings so that the PermGen settings are passed on to the Alfresco server by the node manager.

    ```
    StartScriptEnabled=true
    ```

    If the Node Manager type is set as `Plain` when creating a new machine in step 22\(a\), then the `NodeManager` should be configured with the `SecureListener=true` property.

20. Start the domain admin server.

    For example:

    ```
    <Oracle_Home>/user_projects/domains/alf_domain/startWebLogic.sh
    ```

21. Open a web browser and log in to the admin server \(for example, at http://localhost:7001/console\) with the credentials that you specified while configuring WebLogic domain.

22. To enable automatic control of your Alfresco server:

    1.  Create a machine with the details of the machine running the domain. This will allow the node manager to control servers on that machine.

    2.  Create a server called AlfrescoServer within the new machine.

        Note that you have to choose a unique port number. A good port number to choose is 8080 because it is preconfigured in Share. You can leave the host name blank if you want it to listen on all network adapters.

    3.  Ensure that the node manager is running.

        For example, in Linux, use the following command:

        ```
        <Oracle_Home>/user_projects/domains/alf_domain/bin/startNodeManager.sh
        ```

        You will be able to use the admin server **Change Center** panel to start and stop the Alfresco server.

    Refer to the [WebLogic documentation](http://docs.oracle.com/middleware/1212/core/WLSIG/create_domain.htm) to find out how to create a machine and new server within the machine.

23. To enable Alfresco JMX functionality with Platform MBean server: 

    1.  In the left pane of Administration Console, click the domain name link, for example `alf_domain`.

    2.  In the **Settings for alf\_domain** section, select the **Configuration** tab, and then the **General** tab.

    3.  On the **General** tab, expand the **Advanced** options group.

    4.  Enable the **Platform MBean Server Enabled** option.

    5.  Ensure that the **Platform MBean Server Used** option is enabled.

    6.  Click **Save** on the **General** tab.

    7.  Restart the domain admin server.

24. In the left pane of the Administration Console, click **Deployments**.

25. In the right pane, click **Install**.

26. In the **Install Application Assistant**, locate and select the directory of your exploded EAR file.

    Use the location that you created in step 5. It should contain the alfresco.war and share.war.

27. Click **Next**.

28. Check **Install this deployment as an application** radio button, and click **Next**.

29. Select **AlfrescoServer** and click **Next**.

30. Click **Finish**.

31. Click **Activate Changes**.

32. Using the **Change Center** panel, restart AlfrescoServer.

33. Log in to Alfresco:

    -   Alfresco Share at http://localhost:8080/share
    -   Alfresco Explorer at http://localhost:8080/alfresco

**Note:** If the Alfresco finds a JDBC data source with JNDI path \(`java:comp/env/jdbc/dataSource`\), it will use that rather than the embedded data source. To set that up in WebLogic you need to define a new global data source, for example, `AlfrescoDataSource`. See the WebLogic documentation for more information. Then, map `AlfrescoDataSource` in to Alfresco by updating the WEB-INF/weblogic.xml file into alfresco.war containing the following:

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

-   **[Configuring Solr with Alfresco running on WebLogic](../tasks/alf-weblogic-solr-config.md)**  
These instructions describe how to configure Solr to communicate with Alfresco deployed on WebLogic 11g Rel1 \(10.3.5\).
-   **[Publishing to YouTube with Alfresco \(Lucene enabled\) deployed on WebLogic](../tasks/Youtube-Weblogic-integration-Lucene.md)**  
In an Alfresco environment deployed on WebLogic and with the Lucene search engine enabled, to enable the publish to YouTube feature requires additional steps in the WebLogic Administration Console.
-   **[Enabling publishing to YouTube with Alfresco \(Solr enabled\) deployed on WebLogic](../tasks/Youtube-Weblogic-Solr-publishing.md)**  
In an Alfresco environment deployed on WebLogic and with the Solr search engine enabled, to enable the publish to YouTube feature requires additional steps.
-   **[Enabling Google Docs with WebLogic](../concepts/Slideshare-Weblogic-integration_overview.md)**  
This section describes how to enable Google Docs for an instance of Alfresco running on WebLogic.

**Parent topic:**[Installing Alfresco Enterprise](../concepts/ch-install.md)

**Related information**  


[Modifying the global properties file](global-props-config.md)

[Configuring databases](../concepts/intro-db-setup.md)

