---
title: Overview
---

Content Services is pre-configured with a set of system configuration parameters. Many of the system configuration parameters are completely exposed as properties, which you can configure for your specific environment requirements.

If you're configuring other services, integrations or modules, look in the **Configure** section of each product listed in the [Docs home page]({% link index.markdown %}).

Use the following methods to configure Content Services:

* Admin Console
* Share Admin Tools
* Edit the global properties
* Use a JMX client (such as JConsole)

> **CAUTION:** If you use multiple configuration methods, updates made using a JMX client will override any other settings, and updates in the Admin Console and Admin Tools override settings in `alfresco-global.properties`. These settings also persist in the database, and are not reflected back into the `alfresco-global.properties` file.

* **Admin Console**

  The Admin Console is an administrator's tool to manage your configuration. You can run the Admin Console from a browser without having to start Alfresco Share. See [Using the Admin Console]({% link content-services/7.2/admin/admin-console.md %}) for more information.

* **Share Admin Tools**

  Share Admin Tools is an administrator's tool to create and manage users and groups from Alfresco Share, set application preferences, manage categories and tags, and browse the system information in the node browser. See [Using the Alfresco Share Admin Tools]({% link content-services/7.2/admin/share-admin-tools.md %}) for more information.

* **Global properties file**

  The global properties file (`alfresco-global.properties`) is used to detect extended properties. For example, when you install Content Services, many of the installation settings are saved in the global properties file. The global properties file is used to detect the extended properties. You can use the global properties to set all your property settings; whenever you make a change, you must restart the server to apply those changes. See [Using the `alfresco-global.properties` file]({% link content-services/7.2/config/index.md %}#using-alfresco-globalproperties) for more information.

* **JMX client**

  The JMX client allows you to edit the settings while the system is running. The settings you change are automatically persisted in the database and synchronized across a cluster. When you start up Content Services, the system initially uses the `alfresco-global.properties` file to set the properties in the JMX client, but then any changes you make in the JMX client persist in the database but are not reflected back into the `alfresco-global.properties` file. See [Using a JMX client to change settings dynamically]({% link content-services/7.2/config/index.md %}#using-jmx-client-to-change-settings-dynamically) for more information.

## Using `alfresco-global.properties`

The global properties `alfresco-global.properties` file contains the customizations for extending Content Services.

If you install manually using the WAR file, you can modify properties in the `alfresco-global.properties` file.

A sample global properties file is supplied with the installation. By default, the file contains sample settings for running Content Services, for example, the location of the content and index data, the database connection properties, the location of third-party software, and database driver properties.

### Modify global properties file {#modify-global-props}

> **Important:** For edits to the `alfresco-global.properties` file, when specifying paths for Windows systems, you must replace the Windows path separator characters with either the `\\` separator or the forward slash `/` Unix path separator.

If you're installing manually, then you can use the `alfresco-global.properties.sample` file. This sample file contains some of the common properties required for setting up Content Services.

1. Locate and open the `alfresco-global.properties.sample` file.

    For example, for Tomcat, browse to the `$TOMCAT_HOME/shared/classes/` directory.

    This file contains sample configuration settings. To enable or modify a setting, remove the comment (#) character. Comment out all the properties you don't want to modify by adding the “#” character.

2. Ensure that the `dir.root=` property points to a root location for the storage of content binaries and index files.

    For example: `dir.root=/var/data/alfresco/alf_data`

    > **Note:** It's strongly recommended that you always set this value to an absolute file system path as shown above. This ensures that no matter how the instance is started, it will always find the directories where content has previously been written.

3. Set the database connection properties.

    | Property | Description |
    | -------- | ------------|
    | db.username=alfresco | Specifies the name of the main database user. This name is used to authenticate with the database. |
    | db.password=alfresco | Specifies the password for the database user. This password is used to authenticate with the database. |

    You can set additional database properties, such as `db.port` and `db.host`. See [Advanced configuration properties]({% link content-services/7.2/config/databases.md %}#advanced-configuration-properties) for more properties that can be set.

4. Configure your supported database for use. See [Configuring databases]({% link content-services/7.2/config/databases.md %}).

5. Select a JDBC driver used with each connection type.

6. Add your global custom configurations.

    > **Note:** Ensure that you use single-byte character sets (ISO-8859-1 Latin 1) in your `alfresco-global.properties` settings, particularly the `system.webdav.rootPath` setting. If you require other characters, you can use Unicode equivalents. For example, if your root path in Cyrillic was `фолдер`, which means folder in English, a valid value would be:

    ```bash
    system.webdav.rootPath=/app:company_home/cm:\u0444\u043E\u043B\u0434\u0435\u0440
    ```

7. Save your file without the `.sample` extension.

You need to restart the server for the configuration changes to take effect.

### Set composite properties in global properties file

The `imap.server.mountPoints` property is used as an example for setting composite properties.

The `ImapConfigMountPointsBean` class that holds the component beans has four properties of its own:

* `beanName`
* `store`
* `rootPath`
* `mode`

1. Open the `<classpathRoot>/alfresco-global.properties` file.

2. To set some overall defaults for all component instances, use the format:

    ```bash
    <property>.default.<component property>
    ```

    These values would show up, for example, when you added a new component instance but didn't specify its properties.

    For example:

    ```bash
    imap.server.mountPoints.default.store=${spaces.store}
    imap.server.mountPoints.default.rootPath=/${spaces.company_home.childname}
    imap.server.mountPoints.default.mode=virtual
    ```

    This example doesn't define a default for `beanName` because there's a way of populating it for each instance.

3. To set up the `imap.server.mountPoints` with a composite value, set the master composite property using a comma-separated list.

    For example:

    ```bash
    imap.server.mountPoints=Repository_virtual,Repository_archive
    ```

    This defines that the property contains two `ImapConfigMountPointsBean` instances, named `Repository_virtual` and `Repository_archive`. Because `ImapConfigMountPointsBean` implements the `BeanNameAware` Spring interface and has a `beanName` property, these instance names are automatically set as the bean names.

4. To define component properties specific to each component instance, use the format:

    ```bash
    <property>.value.<component instance name>.<component property>
    ```

    For example:

    ```bash
    imap.server.mountPoints.value.Repository_virtual.mode=virtual
    imap.server.mountPoints.value.Repository_archive.mode=archive
    ```

## Disable Content Services features

You can disable common product components, if you don't require them for your Content Services instance. This summary gives the example property settings for disabling the main components.

> **Note:** If you're unsure of the effect of disabling a feature, contact [Alfresco Support for recommendations.

Add the following property settings to the `alfresco-global.properties` file:

| Property | Description |
| -------- | ------------|
| system.usages.enabled=false | Disables quotas or user usages. |
| audit.enabled=false | Specifies a way to globally enable or disable the auditing framework. |
| sync.mode=OFF | Use this property to disable synchronization permanently. |
| audit.alfresco-access.enabled=false | Disables generation of audit data. |
| home.folder.creation.eager=false | Use this property to create home folders (unless it's disabled using the `home.folder.creation.disabled=true` property) when people are created (true) or created lazily (false).<br><br>Lazy creation (false) means that the home folder will not be created when the user is created. |
| home.folder.creation.disabled=true | Disables the creation of home folders. |
| db.schema.update=false | Specifies whether the system bootstrap should create or upgrade the database schema automatically. |
| activities.feed.notifier.enabled=false | Disables the Share Activities email notification. |

> **Note:** The `system.workflow.engine.activiti.enabled` property is no longer available.

## Using JMX client to change settings dynamically

You can reconfigure Content Services by shutting down the server, editing the relevant property in the configuration files, and then restarting the server. If you've installed the Oracle Java SE Development Kit (JDK), and have enabled JMX in your configuration files, there are some support operations that can be performed at runtime without needing to restart the server.

The Java Management Extension (JMX) interface allows you to access Content Services through a standard JMX console that supports JMX Remoting (JSR-160). This lets you:

* Manage subsystems
* Change log levels
* Enable or disable file servers (FTP)
* Set server read-only mode
* Set server single-user mode
* Set server maximum user limit (including ability to prevent further logins)
* Count user sessions/tickets
* User session/ticket invalidation

> **CAUTION:** Restrict JMX RMI connections to an internal administration group, due to security vulnerabilities. JMX/RMI deserializes data from a client before authentication, which means that password protection does not provide adequate security.

Example consoles include:

* JConsole (supplied with Java SE 5.0 and higher)
* MC4J
* JManage

Some of these consoles also provide basic graphs and/or alerts for monitoring JMX-managed attributes.

There are two types of property that you can edit using a JMX interface:

* **Type 1: Properties specified directly in XML files**

    For example:

    ```xml
    <bean id="wcm_deployment_receiver"
    class="org.alfresco.repo.management.subsystems.ChildApplicationContextFactory"
            <parent="abstractPropertyBackedBean">
            <property name="autoStart">
                    <value>true</value>
            </property>
    </bean>
    ```

    The value for the property `autoStart` is set to true directly in the `wcm-bootstrap-context.xml` file.

* **Type 2: Properties set by variables in XML files**

    For example:

    ```xml
    <bean id="googledocsService"
          class="org.alfresco.integrations.google.docs.service.GoogleDocsServiceImpl" init-method="init">
        ...
        <property name="enabled">
            <value>${googledocs.enabled}</value>
        </property>
        ...
    </bean>
    ```

    The value for the property `enabled` is replaced with a variable `${googledocs.enabled}`.

When Content Services starts up:

* Type 1 properties are read from the XML file.
* Type 2 properties get their values read from all the various property files.
* **IMPORTANT!** Then, the database is checked to see if there are any property values set there, and if any property has been changed, this value is used instead.

Some of the type 2 properties can be viewed and changed by the JMX console, but some can't. For example, `googledocs.enabled` can be viewed and changed using the JMX client; `index.recovery.mode` can't be viewed or changed using the JMX client.

In a new installation, none of these properties are stored in the database. If you set a property using the JMX interface, Content Services stores the value of the property in the database. If you never use JMX to set the value of a property, you can continue using the `alfresco-global.properties` file to set the value of the property. Once you change the property setting using JMX, and it's stored in the database, and you can't use the properties files to change the value of that property.

> **Note:** For advanced configuration, you can also extend or override the Spring bean definitions that control the Java classes. To do so, add or copy a Spring bean file named `*-context.xml` to the `<extension>` directory, or `<web-extension>` directory to extend Alfresco Share. For examples of the Spring bean extensions, download the sample extension files.

### Connect through JMX {#connectthrujmx}

Remote JMX functionality is disabled by default. You can connect to the Content Services MBean server through a JMX client that supports JSR-160 by editing your settings.

> **CAUTION:** Restrict JMX RMI connections to an internal administration group, due to security vulnerabilities. JMX/RMI deserializes data from a client before authentication, which means that password protection does not provide adequate security.

1. Ensure that you have this setting in your `java_opts` file:

    ```java
    -Dcom.sun.management.jmxremote
    ```

    This tells the running JVM to start the JMX service.

2. Ensure that you have the following properties set in the `alfresco-global.properties` file:

    ```bash
    alfresco.jmx.connector.enabled=true
    alfresco.rmi.services.port=50500
    alfresco.rmi.services.host=<hostname>
    ```

    Check that the `<hostname>` can be resolved from where you're running the JMX client.

3. Open a JMX client that supports JMX Remoting (JSR-160).

4. Connect to the JMX URL:

    ```java
    service:jmx:rmi:///jndi/rmi://<hostname\>:50500/alfresco/jmxrmi
    ```

    where `<hostname>` is the name of a reachable domain name or an IP address. If you're running this on the local server, you can use `localhost`.

5. Enter the default JMX user name: controlRole

6. Enter the default JMX password: `change_asap`

    > **Important:** You must change the default JMX password as soon as possible.

    The user `controlRole` is the default user name used to access and configure with a JMX client.

    The user `monitorRole` is the default user name used within monitoring tools, for example, Nagios or Hyperic.

7. Change the default JMX password as soon as possible. You can set a new password in override configuration files.

    Create two new files called:

    ```bash
    alfresco-jmxrmi.password
    alfresco-jmxrmi.access
    ```

    Copy the files to a location of your choice and then add the `alfresco.jmx.dir=` property to the `alfresco-global.properties` file to specify the directory path of the configuration files. For example:

    ```bash
    alfresco.jmx.dir=/etc/alfresco/config
    ```

    You can also set this on the command line:

    ```java
    -Dalfresco.jmx.dir=/etc/alfresco/config
    ```

8. Open the `alfresco-jmxrmi.password` file and add the following properties for the `monitorRole` and `controlRole` users, where `new_pw` is your preferred password.

    ```bash
    monitorRole  new_pw
    controlRole  new_pw
    ```

9. Save the file.

10. Open the `alfresco-jmxrmi.access` file and add the following properties for the read-only or read/write access levels of each user.

    ```bash
    monitorRole   readonly
    controlRole   readwrite
    ```

11. Save the file.

> **Note:** It's possible to set the JVM (Oracle/Sun JVM-specific) arguments directly:

```java
-Dcom.sun.management.jmxremote
-Dcom.sun.management.jmxremote.ssl=false
-Dcom.sun.management.jmxremote.access.file=/etc/alfresco/config/jmxremote.access
-Dcom.sun.management.jmxremote.password.file=/etc/alfresco/config/jmxremote.password
-Dcom.sun.management.jmxremote.authenticate=true
```

### Configure with JConsole

If you've installed the Oracle Java SE Development Kit (JDK), you can use the JMX client, JConsole, for runtime administration.

The initial configuration that displays in JConsole is set from the `alfresco-global.properties` file.

1. Open a command console.

2. Locate your JDK installation directory.

    For example, the JDK directory is often `java/bin`.

3. Enter the following command:

    ```bash
    jconsole
    ```

    The JConsole New Connection window displays.

4. Double-click on the Content Services Java process.

    For Tomcat, this the Java process is usually labelled as **org.apache.catalina.startup.Bootstrap start**.

    JConsole connects to the managed bean (or MBean) server hosting the subsystems.

5. Select the MBeans tab.

    The available managed beans display in JConsole.

6. Navigate to **Alfresco > Configuration**.

    The available subsystems display in an expandable tree structure. When you select a subsystem, the **Attributes** and **Operations** display below it in the tree.

7. Select **Attributes** and set the required subsystem attribute values.

    Values that can be edited are shown with blue text.

    When you change a configuration setting, the subsystem automatically stops.

8. Restart the subsystem:

    1. Navigate to the subsystem.

    2. Select **Operations**.

    3. Click **Start**.

9. To stop the subsystem without editing any properties:

    1. Navigate to the subsystem.

    2. Select **Operations**.

    3. Click **Stop**.

10. To revert back to all the previous edits of the subsystem and restores the default settings:

    1. Navigate to the subsystem.

    2. Select **Operations**.

    3. Click **Revert**.

11. Click **Connection > Close**.

The settings that you change in a JMX client, like JConsole, are persisted in the database. When you make a dynamic edit to a subsystem:

1. When a subsystem that's currently running is stopped, its resources are released and it stops actively listening for events. This action is like a sub-part of the server being brought down. This ‘stop’ event is broadcast across the cluster so that the subsystem is brought down simultaneously in all nodes.
2. The new value for the property is persisted to the database.

There are two ways to trigger a subsystem to start:

* The start operation
* An event that requires the subsystem

### JMX monitoring and management extensions

The monitoring and management extensions can be subdivided into three categories:

* **Read-only monitoring beans**

  Expose a variety of real-time metrics for monitoring health and throughput of your server.

* **Configuration beans**

  Provide an easily navigable view of key system configuration for support and diagnostic purposes.

* **Management beans**

  Allow control over various subsystems.

For more information on these categories of bean, refer to the reference section [JMX bean categories]({% link content-services/7.2/admin/jmx-reference.md %}).

You can also manage JMX settings in the [Admin Console JMX Settings]({% link content-services/7.2/admin/support-tools.md %}#jmxsettings).

#### Coexistence with other MBeans

If there's an MBean server already running on the Java Virtual Machine (JVM) that Content Services is running on, Content Services will export its MBeans to that server. Otherwise, Content Services will start up its own MBean server. This means that, for example, on Tomcat, the Content Services beans will complement those provided by the application server and will be navigable in the same context with a suitable JMX client.

#### Activate Oracle JMX agent and local JMX connectivity

When using Tomcat and an Oracle JVM together for monitoring, you can configure Content Services and Tomcat to share the JVM's own platform MBean server. The pre-registered **MXBeans** give a detailed view of the JVM's health, usage and throughput; in areas including class loading, hot spot compilation, garbage collection, and thread activity.

Oracle's MBean server also provides a convenient local connection method, allowing the process to be automatically 'discovered' by a JMX client such as JConsole without manual configuration of connection details.

The Oracle JMX agent can also be activated in remote mode (where a connection is made through an RMI lookup). However, since Content Services is always pre-configured to allow a secure remote JMX connection on any JVM, it is most likely that you will choose to activate the Oracle JMX agent in local mode. This means the platform MBean Server is shared by Content Services and still be available for remote connections through the RMI connector.

> **CAUTION:** Restrict JMX RMI connections to an internal administration group, due to security vulnerabilities. JMX/RMI de-serializes data from a client before authentication, which means that password protection does not provide adequate security.

* To activate the Oracle JMX agent in local mode, ensure that the following system property is set:

    ```bash
    com.sun.management.jmxremote
    ```

    For example, in your Tomcat startup script, you could use the following line:

    ```bash
    export JAVA_OPTS="${JAVA_OPTS} -Dcom.sun.management.jmxremote"
    ```

* Refer to the Oracle documentation for more information on all the possible configuration options.

## Using the Java command line to change settings dynamically

All Content Services properties can be set using the standard `alfresco-global.properties` configuration file. There might be circumstances where it is more convenient to change properties on the fly. The Java command line provides an alternative method of setting the properties.

The most common use of the Java command line is in a multiple-machine environment where the basic, common customizations are set using standard properties and the machine-specific values are set using command line options.

For example, an administrator is likely to configure all installs to behave similarly by setting properties in the configuration files, but will use the Java command line to vary settings like the database connection and Content Store locations.

You can use the `-D` options for setting properties on the Java command line. Add a `-Dprop=value` to `JAVA_OPTS`, or for anything that is sent to the Java command line, for example:

```java
-Ddir.root=/alfresco/data -Ddb.url=xxxx
```

## Customize applications

You can make basic configuration updates to customize Content Services, or modify properties files to apply configuration changes.

* Updating system configuration parameters

  You can configure Content Services for your specific environment either by using the Admin Console, editing the `alfresco-global.properties` file, or using a JMX client (as described at the start of this page).

* [Configuring Alfresco Share]({% link content-services/7.2/develop/share-ext-points/index.md %})

  A number of options are available to customize Share. To configure Share, use the configuration file, `share-config-custom.xml` .

* [Solr configuration]({% link search-services/latest/config/index.md %}#solr-configuration-files)

  When you install Alfresco Search Services, several Solr-related configuration files are made available to you. To configure Solr, use the configuration file, `solrcore.properties`.

> **Note:** Remember not to use the default user names, URLs, or passwords with different environments.

> **Note:** You can customize or scale up to meet your login and security requirements. See [Setting up authentication and security]({% link content-services/7.2/admin/security.md %}) for more information.

## Customize individual configuration items

Configuration is implemented using three types of files:

* Extension files
* Bean files
* Spring bean definitions

### Customize extension files

Extension files end with the extension `.xml`, and define `<config>` tags. A typical configuration file is `<web-extension>/share-config-custom.xml`.

A configuration file contains `<alfresco-config>` tags outside the `<config>` tags. You must preserve these tags in your customized file.

1. Open the configuration file that you want to customize.

2. Edit each pair of `<config>...</config>` tags that you want to modify.

    **Replace a configuration**

    To replace the configuration, add a `replace=“true”` attribute to the configuration element. For example:

    ```bash
    <config evaluator="xx" condition=“yy” replace="true">
    ```

    > **Note:** Any configuration within a section marked this way completely replaces any configuration found in the Content Services maintained files.

    **Modify one property**

    The attribute `replace` completely replaces the configuration. To modify one property, add the changed piece.

3. Save your customized file.

### Modify Spring bean definition files

For advanced configuration, you can also extend or override the Spring bean definitions that control the Content Services Java classes.

The Spring bean definitions are within configuration files in the following directories:

* The `<extension>` directory contains the configuration files for extending Content Services.
* The `<web-extension>` directory contains the configuration files for extending Alfresco Share.

1. Browse to the `<extension>` directory. For example, for Tomcat:

    * (Windows) `C:\Alfresco\tomcat\shared\classes\alfresco\extension`
    * (Linux) `tomcat/shared/classes/alfresco/extension`

    Each file has a copy with a `.sample` extension.

2. Open the configuration file with the `.sample` extension.

3. Add your configuration to the file.

4. Save the file without the `.sample` extension.

### Customize Activity Email Summary

The Activity Email Summary ignores certain activity types by default. Use this information to override the Spring bean definition to include these activity types.

The Spring bean definition for the ActivitiesFeed subsystem is called `activities-feed-context.xml` and can be downloaded from the Alfresco SVN: [`activities-feed-context.xml`](https://github.com/Alfresco/alfresco-community-repo/blob/release/7.0.0/repository/src/main/resources/alfresco/subsystems/ActivitiesFeed/default/activities-feed-context.xml){:target="_blank"}.

1. Download the file and save to the `<subsystems/ActivitiesFeed/default>` directory.

    The file contains the following bean override for the `file-previewed` and `file-downloaded` values:

    ```xml
    <?xml version='1.0' encoding='UTF-8'?>
    <beans xmlns="http://www.springframework.org/schema/beans"
     xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
     xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans-3.0.xsd">
      <bean id="feedModelBuilderPrototype" class="org.alfresco.repo.activities.feed.DefaultActivitiesFeedModelBuilder" scope="prototype">
        <property name="ignoredActivityTypes">
          <set>
            <value>org.alfresco.documentlibrary.file-previewed</value>
            <value>org.alfresco.documentlibrary.file-downloaded</value>
          </set>
        </property>
      </bean>
    </beans>
    ```

2. Remove or comment out the following lines to include the `file-previewed` and `file-downloaded` entries in your Activity Email Summary:

    ```xml
    <property name="ignoredActivityTypes">
      <set>
        <value>org.alfresco.documentlibrary.file-previewed</value>
        <value>org.alfresco.documentlibrary.file-downloaded</value>
      </set>
    </property>
    ```

3. Save your file.

### Customize bean files

Bean files end with the extension `.xml` and contain `<bean>` tags. You can modify `<bean>` tags to define properties or point to customized files.

There are two common uses of beans:

* To define properties
* To point to one or more of your customized files

A typical bean file is `<extension>/custom-repository-context.xml`. A bean file contains `<?xml>` and `<!DOCTYPE>` headers, and `<beans>` tags outside the `<bean>` tags. You must preserve these items in your customized file.

> **Important:** When you override a `<bean>`, the entire effects of the original bean are lost. The effect is the same as if you had overridden a `<config>` by using `replace="true"`. Therefore, the overriding `<bean>` must contain any information from the default bean that you want to keep, as well as any additional information.

For example, if a core bean has four values, and you want to modify a single value, the resultant bean must still have four values. However, if you want to add a value, then the resultant bean must have five values - the original four values plus the added value.

1. Open the bean file that you want to customize.

    For example, the following `<bean>` is from `<configRoot>/classes/alfresco/action-services-context.xml`:

    ```xml
    <bean id="mail" class="org.alfresco.repo.action.executer.MailActionExecuter" parent="action-executer">
       <property name="publicAction">
          <value>true</value> <!-- setting to true -->
       </property>
       <property name="mailService">
          <ref bean="mailService"></ref>
       </property>
    </bean>
    ```

2. Delete each pair of `<bean>...</bean>` tags that you don't want to modify.

3. Modify the contents of the remaining `<bean>` tags.

    For example, the following overrides the `publicAction` property from the previous example:

    ```xml
    <bean id="mail" class="org.alfresco.repo.action.executer.MailActionExecuter" parent="action-executer">
       <property name="publicAction">
          <value>false</value> <!-- setting to false -->
       </property>
       <property name="mailService">
          <ref bean="mailService"></ref>
       </property>
    </bean>
    ```

4. Save the file.
