---
author: [Alfresco Documentation, Alfresco Documentation]
source: 
audience: 
category: Customization
keyword: [configuration, global, properties, extension, web-extension]
---

# Configuration overview

Alfresco is preconfigured with a set of system configuration parameters. Many of the system configuration parameters are completely exposed as properties, which you can extend or override.

The system configuration parameters are found in the following files:

-   <configRoot\>/alfresco/repository.properties
-   <configRoot\>/alfresco/hibernate-cfg.properties
-   <configRoot\>/alfresco/subsystems/<category\>/<type\>/\*.properties

There are two methods of extending the properties:

-   Editing the global properties \(alfresco-global.properties\) file
-   Using a JMX client, such as JConsole

The global properties file is used by Alfresco to detect the extended properties. For example, when you install Alfresco, many of the installation settings are saved in the global properties file. You can continue to use the global properties to do all your property extensions; however, whenever you make a change, you must restart the Alfresco server.

The JMX client allows you to edit the settings while the system is running. The settings you change are automatically persisted in the database and synchronized across a cluster. When you start up Alfresco, the system initially uses the alfresco-global.properties file to set the properties within the JMX client, but then any changes you make in the JMX client persist in the database but are not reflected back into the alfresco-global.properties file.

There are two types of property that you may need to edit:

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

In a new Alfresco installation, none of these properties are stored in the database. If you set a property using the JMX interface, Alfresco stores the value of the property in the database. If you never use JMX to set the value of a property, you can continue using the alfresco-global.properties file to set the value of the property. Once you change the property setting using JMX, and it is therefore stored in the DB, you cannot use the properties files to change the value of that property.

**Note:** For advanced configuration, you can also extend or override the Spring bean definitions that control Alfresco’s Java classes. To do so, add or copy a Spring bean file named \*-context.xml to the <extension\> directory, or <web-extension\> directory to extend Share. For examples of the Spring bean extensions, download the sample extension files.

**Parent topic:**[Configuring Alfresco](../concepts/ch-configuration.md)

