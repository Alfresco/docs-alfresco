---
author: [Alfresco Documentation, Alfresco]
audience: 
category: Installation
keyword: [WebLogic, Oracle, WAR]
---

# Installing Alfresco on WebLogic

This section describes how to install Alfresco as an Enterprise ARchive format \(EAR\) into Oracle WebLogic.

Before you start:

-   Install OpenOffice and ensure that the ooo.exe property is set in the alfresco-global.properties file
-   Create an `alfresco` database and user with appropriate permissions
-   Install WebLogic 10.3.3 \(11g rel 1\) without creating any domains or servers

**Note:** Certain components of Alfresco require access to the EAR file contents as files. These instructions require that you expand the .ear into exploded format, as described in the WebLogic documentation. The Alfresco WebLogic deployment solution makes use of a Filter Classloader, configured in the weblogic-application.xml file, to ensure that the unmodified contents of the Alfresco web module will run in WebLogic.

1.  Browse to the Alfresco Support Portal.

    [http://support.alfresco.com](http://support.alfresco.com)

2.  Download and extract the alfresco-enterprise-ear-4.0.2.zip file.

3.  Obtain the license \(.lic\) file.

4.  Create a directory in the WebLogic user's home directory to host the exploded EAR file and copy the alfresco-enterprise-4.0.2.ear file to that directory.

5.  Run the following commands in the new directory to explode the EAR file:

    1.  `mkdir alfresco`

    2.  `cd alfresco`

    3.  `jar xvf ../alfresco-enterprise-4.0.2.ear`

    4.  `mv alfresco.war alfresco.war.tmp`

    5.  `mv share.war share.war.tmp`

    6.  `mkdir alfresco.war`

    7.  `mkdir share.war`

    8.  `cd alfresco.war`

    9.  `jar xvf ../alfresco.war.tmp`

    10. `cd ../share.war`

    11. `jar xvf ../share.war.tmp`

6.  Open the WebLogic Configuration Wizard.

    For example, on Unix, use the following command to create a new domain, `alf_domain`:

    ```
    <Weblogic_HOME>/common/bin/config.sh
    ```

7.  Create a directory for the license file.

    For example, in Linux, use the following command:

    ```
    mkdir -p <Weblogic_HOME>/user_projects/domains/alf_domain/alfresco/extension/license
    ```

8.  Move the license .lic file into the license directory.

9.  In the <Weblogic\_HOME\>/user\_projects/domains/alf\_domain directory, create the alfresco-global.properties file.

    Modify the file in the same way you would for global properties configuration.

10. Add the following line to the alfresco-global.properties file.

    ```
    db.pool.statements.enable=false
    ```

    This property setting is required to make the DBCP connection pool work on WebLogic.

11. Configure the Oracle JDBC OCI driver.

    1.  Download the appropriate Oracle Instant Client package for your operating system from [Oracle Database Instant Client](http://www.oracle.com/technetwork/database/features/instant-client/index-100365.html).

    2.  Unzip the package to a local directory.

        For example: /data/instantclient\_11\_2.

    3.  Optionally, delete the previously used JDBC driver \(for example, ojdbc6.jar\) from WebLogic.

    4.  Add the following line to the alfresco-global.properties file.

        ```
        db.url=jdbc:oracle:oci:@${db.host}:1521:${db.name}
        ```

    5.  Locate the setDomainEnv.sh file. This file is located in the <Weblogic\_HOME\>/user\_projects/domains/<Domain\_name\>/bin directory.

        For example: /opt/weblogic/user\_projects/domains/alf\_domain/bin.

    6.  Add the following lines to the setDomainEnv.sh file:

        ```
        LD_LIBRARY_PATH="/data/instantclient_11_2" 
        export LD_LIBRARY_PATH
        EXT_PRE_CLASSPATH=$LD_LIBRARY_PATH/ojdbc6.jar 
        export EXT_PRE_CLASSPATH
        ```

12. In the setDomainEnv.sh file, edit all of the lines prefixed with `MEM_MAX_PERM_SIZE` to increase the PermGen space.

    ```
    MEM_MAX_PERM_SIZE="-XX:MaxPermSize=256m"
    MEM_MAX_PERM_SIZE_64BIT="-XX:MaxPermSize=512m"
    MEM_MAX_PERM_SIZE_32BIT="-XX:MaxPermSize=256m" 
    ```

    **Note:** This setting may need to be increased further in accordance with the number of deployed applications. You may see different combinations of these lines, depending on whether you have installed on a 64 or 32-bit platform.

13. In the setDomainEnv.sh file, set the heap size parameter appropriately. The following setting is a recommendation:

    ```
    WLS_MEM_ARGS="-Xmx2048m"
    ```

14. After the JAVA\_OPTIONS parameter, to disable servicing of Platform MbeanServer with the WLS security infrastructure \(in the setDomainEnv.sh file\), use the `-Dweblogic.disableMBeanAuthorization` system property:

    ```
    JAVA_OPTIONS=”${JAVA_OPTIONS} -Dweblogic.disableMBeanAuthorization=true” 
    ```

    This modification will allow Alfresco MBeans to co-exist with WebLogic MBeans.

15. The following extra edit is required in the setDomainEnv.sh file, to ensure that `alf_domain` is in the global classpath.

    ```
    WL_HOME="/opt/weblogic/wlserver_10.3"
    export WL_HOME
      
    PRE_CLASSPATH="/opt/weblogic/user_projects/domains/alf_domain"
    export PRE_CLASSPATH
    ```

16. Edit the <Weblogic Home\>/user\_projects/domains/alf\_domain/config/config.xml file and add the following before the end of the `</security-configuration>` section:

    ```
    <enforce-valid-basic-auth-credentials>false</enforce-valid-basic-auth-credentials>  
    ```

17. Open the <Weblogic Home\>/wlserver\_10.3/common/nodemanager/nodemanager.properties file, and then edit the settings so that the PermGen settings are passed on to the Alfresco server by the node manager.

    ```
    StartScriptEnabled=true 
    ```

18. Start the domain admin server.

    For example:

    ```
    <Weblogic_HOME>/user_projects/domains/alf_domain/startWebLogic.sh
    ```

19. Open a web browser and log in to the admin server \(for example, at http://localhost:7001/console\) with the credentials that you specified while installing Weblogic.

20. To enable automatic control of your Alfresco server:

    1.  Create a machine with the details of the machine running the domain. This will allow the node manager to control servers on that machine.

    2.  Create a server called AlfrescoServer within the new machine.

        Note that you have to choose a unique port number. A good port number to choose is 8080 because it is preconfigured in Share. You can leave the host name blank if you want it to listen on all network adapters.

    3.  Ensure that the node manager is running \(for example, <Weblogic\_HOME\>/wlserver\_10.3/server/bin/startNodeManager.sh\).

        You will be able to use the admin server **Change Center** panel to start and stop the Alfresco server.

    Refer to the WebLogic documentation to find out how to create a machine and new server within the machine.

21. To enable Alfresco JMX functionality with Platform MBean server: 

    1.  In the left pane of Administration Console, click the domain name link, for example `alf_domain`.

    2.  In the **Settings for alf\_domain** section, select the **Configuration** tab, and then the **General** tab.

    3.  On the **General** tab, expand the **Advanced** options group.

    4.  Enable the **Platform MBean Server Enabled** option.

    5.  Ensure that the **Platform MBean Server Used** option is enabled.

    6.  Click **Save** on the **General** tab.

    7.  Restart the domain admin server.

22. In the left pane of the Administration Console, click **Deployments**.

23. In the right pane, click **Install**.

24. In the **Install Application Assistant**, locate and select the directory of your exploded EAR file.

    Use the location that you created in step 5. It should contain the alfresco.war and share.war.

25. Click **Next**.

26. Check **Install this deployment as an application** radio button, and click **Next**.

27. Click **Finish**.

28. Click **Activate Changes**.

29. Using the **Change Center** panel, restart AlfrescoServer.

30. Log in to Alfresco:

    -   Alfresco Share at http://localhost:8080/share
    -   Alfresco Explorer at http://localhost:8080/alfresco

**Note:** If the Alfresco finds a JDBC data source with JNDI path \(`java:comp/env/jdbc/dataSource`\), it will use that rather than the embedded data source. To set that up in WebLogic you need to define a new global data source, for example, `AlfrescoDataSource`. See the WebLogic documentation for more information. Then, map `AlfrescoDataSource` in to Alfresco by adding the WEB-INF/weblogic.xml file into alfresco.war containing the following:

```
<! DOCTYPE weblogic-web-app PUBLIC "-//BEA Systems, Inc.//DTD Web
Application 8.1//EN"

"http://www.bea.com/servers/wls810/dtd/weblogic810-web-jar.dtd" >
< weblogic-web-app >
< reference-descriptor >
< resource-description >
< res-ref-name > jdbc /dataSource </ res-ref-name >
< jndi-name > AlfrescoDataSource </ jndi-name >
</ resource-description >
</ reference-descriptor >
</ weblogic-web-app > 
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

