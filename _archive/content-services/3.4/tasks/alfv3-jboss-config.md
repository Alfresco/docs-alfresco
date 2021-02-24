---
author: [Alfresco Documentation, Alfresco Documentation]
source: Wiki
audience: 
category: [Installation, Alfresco Server]
keyword: JBoss
---

# Configuring JBoss for Alfresco

This section describes how to configure an Alfresco installation on JBoss.

1.  Configure the database. This example assumes you are using a PostgreSQL database.

    1.  Copy the PostgreSQL driver JAR to <JBOSS\_HOME\>/server/default/lib.

    2.  Follow the instructions for configuring the PostgreSQL database.

2.  Configure UTF-8 support.

    1.  Edit the following files:

        -   <JBOSS\_HOME\>/server/default/deploy/jbossweb.sar/server.xml
        -   <JBOSS\_HOME\>/server/all/deploy/jbossweb.sar/server.xml
    2.  Add `URIEncoding="UTF-8"` to the following section:

        ```
        <Connector protocol="HTTP/1.1" port="8080" URIEncoding="UTF-8" address="${jboss.bind.address}" 
                             connectionTimeout="20000" redirectPort="8443" /> 
        
        <!-- A AJP 1.3 Connector on port 8009 --> 
        <Connector protocol="AJP/1.3" port="8009" URIEncoding="UTF-8" address="${jboss.bind.address}" redirectPort="8443" />
        ```

3.  Configure logging.

    1.  Edit the <JBOSS\_HOME\>/server/default/conf/jboss-log4j.xml file to reduce the huge debug log output.

        For example:

        ```
        <root>
             <priority value="INFO" />
             <appender-ref ref="CONSOLE"/>
             <appender-ref ref="FILE"/>
          </root>
        ```

    2.  \(Optional\) The logging configuration that is set reduces the debug output but there will still be a lot of output sent to the console. To reduce it further, adding the following to the <JBOSS\_HOME\>/server/default/conf/jboss-log4j.xml file:

        ```
         <category name="org.jboss.logging.Log4jService$URLWatchTimerTask">
             <priority value="INFO"/>
          </category>
          <category name="org.jboss.system.server.Server">
             <priority value="INFO"/>
          </category>
          <category name="org.jboss">
             <priority value="WARN"/>
          </category>
          <category name="net">
             <priority value="WARN"/>
          </category>
          <category name="org.alfresco">
             <priority value="WARN"/>
          </category>
          <category name="org.alfresco.repo.policy">
             <priority value="WARN"/>
          </category>
          <category name="org.springframework">
             <priority value="WARN"/>
          </category>
          <category name="org.hibernate">
             <priority value="WARN"/>
          </category>
          <category name="org.hibernate.cache.ReadWriteCache">
             <priority value="ERROR"/>
          </category>
          <category name="org.hibernate.cache.EhCacheProvider">
             <priority value="ERROR"/>
          </category>
          <category name="org.hibernate.engine.StatefulPersistenceContext.ProxyWarnLog">
             <priority value="ERROR"/>
          </category>
          <category name="org.apache.myfaces">
             <priority value="ERROR"/>
          </category>
          <category name="org.jbpm.jpdl.xml.JpdlXmlReader">
             <priority value="ERROR"/>
          </category>
        ```

4.  Configure Hibernate.

    1.  Edit the <JBOSS\_HOME\>/server/default/deployers/ejb3.deployer/META-INF/jpa-deployers-jboss-beans.xml file, and then change the hibernate.bytecode.provider=javassist line to hibernate.bytecode.provider=cglib.

        For example:

        ```
        <entry>
          <key>hibernate.bytecode.provider</key>
          <value>cglib</value>
        </entry>
        ```

5.  Open the <JBOSS\_HOME\>/bin/run.conf file.

    1.  Ensure that the <JBOSS\_HOME\>/bin/run.conf file specifies appropriate JVM memory parameters in JAVA\_OPTS.

        For example, the following are minimums:

        ```
        -Xms128m -Xmx1024m -XX:MaxPermSize=256m
        ```

    2.  Enable JMX monitoring and automatic discovery of Alfresco by the Hyperic plugin by ensuring that JAVA\_OPTS contains the following parameters:

        ```
        -Dcom.sun.management.jmxremote -Dalfresco.home=.
        ```

    3.  For running Alfresco on Windows 2003 Server with OpenOffice 3.2, ensure that the JAVA\_OPTS contains the following parameters:

        ```
        -Djboss.server.temp.dir.overrideJavaTmpDir=true
        ```

    4.  Save the run.conf file.

6.  Edit the filtered packages list.

    1.  Open the <JBOSS\_HOME\>/server/default/deployers/jbossweb.deployer/META-INF/war-deployers-jboss-beans.xml file, and then locate the `filteredPackages` property of the `WarClassLoaderDeployer` bean.

    2.  Open the <extension\>\\war-deployers-jboss-beans.xml.fragment.sample file.

        This sample file contains a `WarClassLoaderDeployer` bean definition fragment for use when configuring JBoss.

    3.  Copy the full `WarClassLoaderDeployer` bean from the sample file.

    4.  In the war-deployers-jboss-beans.xml file, paste the sample bean fragment over the `WarClassLoaderDeployer` bean.

        The bean definition contains the `filteredPackages` list that is required for Alfresco. This list is on one line and must not contain any breaks.

    5.  Save the <JBOSS\_HOME\>/server/default/deployers/jbossweb.deployer/META-INF/war-deployers-jboss-beans.xml file.

    This setting avoids collisions between the JVM bootstrap classes and those embedded in the war.

7.  Execute the <JBOSS\_HOME\>/bin/run.sh file.

    **Note:** By default JBoss will only listen on the `localhost` network adapter, rather than the adapter with a real IP address connected to the outside world. To override this, start JBoss with the `-b addr` option, specifying the IP address of the network adapter you want to listen on or `0.0.0.0` to listen on all adapters. For example:

    ```
    run.sh -b 0.0.0.0
    ```

    **Note:** The following warning message will appear in the log but can be ignored, since Alfresco disables the faces RI with a special parameter in web.xml:

    \[STDOUT\] 16:59:43,814 ERROR \[shared\_impl.config.MyfacesConfig\] Both MyFaces and the RI are on your classpath. Please make sure to use only one of the two JSF-implementations.

8.  Start the Alfresco server.


**Parent topic:**[Installing Alfresco on JBoss](../tasks/alfv3-jboss-install.md)

**Related information**  


[Configuring a PostgreSQL database](postgresql-config.md)

