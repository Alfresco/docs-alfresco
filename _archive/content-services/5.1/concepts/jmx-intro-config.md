---
author: [Alfresco Documentation, Alfresco Documentation]
---

# Using a JMX client to change settings dynamically

You can reconfigure Alfresco by shutting down the server, editing the relevant property in the configuration files, and then restarting the server. If you have installed the Oracle Java SE Development Kit \(JDK\), and have enabled JMX in your configuration files, there are some support operations that can be performed at runtime without needing to restart the server.

The Java Management Extension \(JMX\) interface allows you to access Alfresco through a standard JMX console that supports JMX Remoting \(JSR-160\). This lets you:

-   Manage Alfresco subsystems
-   Change log levels
-   Enable or disable file servers \(FTP/CIFS\)
-   Set server read-only mode
-   Set server single-user mode
-   Set server maximum user limit, including ability to prevent further logins
-   Count user sessions/tickets
-   User session/ticket invalidation

CAUTION:

Restrict JMX RMI connections to an internal administration group, due to security vulnerabilities. JMX/RMI deserializes data from a client before authentication, which means that password protection does not provide adequate security.

Example consoles include:

-   JConsole \(supplied with Java SE 5.0 and higher\)
-   MC4J
-   JManage

Some of these consoles also provide basic graphs and/or alerts for monitoring JMX-managed attributes.

There are two types of property that you can edit using a JMX interface:

-   **Type 1: Properties specified directly in XML files**

    For example:

    ```
    <bean id="wcm_deployment_receiver"
    class="org.alfresco.repo.management.subsystems.ChildApplicationContextFactory"
            <parent="abstractPropertyBackedBean">
            <property name="autoStart">
                    <value>true</value>
            </property>
    </bean>
    
    ```

    The value for the property `autoStart` is set to true directly in the wcm-bootstrap-context.xml file.

-   **Type 2: Properties set by variables in XML files**

    For example:

    ```
    <bean id="userInstallationURI" class="org.alfresco.util.OpenOfficeURI">
          <constructor-arg>
             <value>${ooo.user}</value>
          </constructor-arg>
       </bean>
    
    ```

    The value for the property `constructor-arg` is replaced with a variable `${ooo.user}`.


When Alfresco starts up, type 1 properties are read from the XML file; type 2 properties get their values read from all the various property files. Then, the database is checked to see if there are any property values set there, and if any property has been changed, this value is used instead.

Some of the type 2 properties can be viewed and changed by the JMX console, some cannot. For example. `ooo.exe` can be viewed and changed using the JMX client; `index.recovery.mode` cannot be viewed or changed using the JMX client.

In a new Alfresco installation, none of these properties are stored in the database. If you set a property using the JMX interface, Alfresco stores the value of the property in the database. If you never use JMX to set the value of a property, you can continue using the alfresco-global.properties file to set the value of the property. Once you change the property setting using JMX, and it is therefore stored in the database, you cannot use the properties files to change the value of that property.

**Note:** For advanced configuration, you can also extend or override the Spring bean definitions that control the Alfresco Java classes. To do so, add or copy a Spring bean file named \*-context.xml to the <extension\> directory, or <web-extension\> directory to extend Share. For examples of the Spring bean extensions, download the sample extension files.

-   **[Connecting to Alfresco through JMX](../tasks/jmx-access.md)**  
Remote JMX functionality is disabled by default in Alfresco. You can connect to the Alfresco MBean server through a JMX client that supports JSR-160 by editing your Alfresco settings.
-   **[Configuring Alfresco with JConsole](../tasks/jmx-jconsole-example.md)**  
If you have installed the Oracle Java SE Development Kit \(JDK\), you can use the JMX client, JConsole, for Alfresco runtime administration.

**Parent topic:**[Configuration overview](../concepts/configuration-overview.md)

