---
author: [Alfresco Documentation, Alfresco Documentation]
audience: 
category: Customization
---

# Configuration overview

Alfresco is preconfigured with a set of system configuration parameters. Many of the system configuration parameters are completely exposed as properties, which you can extend or override.

The system configuration parameters are found in the following files:

-   <configRoot\>/classes/alfresco/repository.properties
-   <configRoot\>/classes/alfresco/subsystems/<category\>/<type\>/\*.properties

It is not recommended that you edit these files directly but that you should extend or override them using the following methods:

-   Alfresco Admin Console
-   Editing the global properties \(alfresco-global.properties\) file
-   Using a JMX client, such as JConsole

**Alfresco Admin Console**

The Alfresco Admin Console is a tool that gives a quick and easy way to manage Alfresco configuration. For more information, see [Alfresco Admin Console](at-adminconsole.md).

**Global properties files**

The global properties file is used by Alfresco to detect the extended properties. For example, when you install Alfresco, many of the installation settings are saved in the global properties file. You can continue to use the global properties to do all your property extensions; however, whenever you make a change, you must restart the Alfresco server.

**JMX client**

The JMX client allows you to edit the settings while the system is running. The settings you change are automatically persisted in the database and synchronized across a cluster. When you start up Alfresco, the system initially uses the alfresco-global.properties file to set the properties within the JMX client, but then any changes you make in the JMX client persist in the database but are not reflected back into the alfresco-global.properties file.

There are two types of property that you can edit:

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

-   **[Disabling Alfresco features](../concepts/maincomponents-disable.md)**  
You can disable common product components if you do not require them for your Alfresco instance. This summary gives the example property settings for disabling the main components.
-   **[Runtime administration with a JMX client](../concepts/jmx-intro-config.md)**  
By default, you can reconfigure Alfresco by shutting down the server, editing the relevant property in the configuration files, and then restarting the server.
-   **[About the alfresco-global.properties file](../concepts/global-props-intro.md)**  
The global properties alfresco-global.properties file contains the customizations for extending Alfresco.
-   **[Java command line settings](../concepts/java-commandline.md)**  
All the Alfresco properties can be set using the standard alfresco-global.properties configuration file. There may be circumstances where it is more convenient to change properties on the fly. The Java command line provides an alternative method of setting the properties.
-   **[Modifying Spring bean definition files](../tasks/ext-file-config.md)**  
For advanced configuration, you can also extend or override the Spring bean definitions that control the Alfresco Java classes.
-   **[Modifying system configuration files](../tasks/systemfiles-modify.md)**  
This section describes the recommended method for modifications to the system configuration files.
-   **[Customizing individual configuration items](../concepts/default-files-config.md)**  
This section provides information about the types of configuration files available in Alfresco, and how to configure them.
-   **[Modify Alfresco applications](../concepts/modify-alf-apps.md)**  
You can configure Alfresco by modifying, adding, or deleting properties and attributes in the properties files. This topic describes the different properties files you can modify to apply configuration changes to Alfresco.

**Parent topic:**[Configuring Alfresco](../concepts/ch-configuration.md)

