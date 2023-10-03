---
title: Overview
---

Community Edition is pre-configured with a set of system configuration parameters.

Many of the system configuration parameters are completely exposed as properties, which you can extend or override either in the `alfresco-global.properties` file or by using **Admin Tools** in Share.

The global properties file is used to detect the extended properties. You can use the global properties to set all your property settings; whenever you make a change, you must restart the server to apply those changes.

Admin Tools in Alfresco Share is an alternative way of making changes to some configurations.

> **Note:** For advanced configuration, you can also extend or override the Spring bean definitions that control Java classes. Add or copy a Spring bean file named `*-context.xml` to the `<extension>` directory, or `<web-extension>` directory to extend Share. For examples of the Spring bean extensions, download the sample extension files.

## Using `alfresco-global.properties`

The global properties `alfresco-global.properties` file contains the customizations for extending Community Edition.

If you install manually using the WAR file, you can modify properties in the `alfresco-global.properties` file.

A sample global properties file is supplied with the installation. By default, the file contains sample settings for running Community Edition, for example, the location of the content and index data, the database connection properties, the location of third-party software, and database driver properties.

### Modify global properties file {#modify-global-props}

> **Important:** For edits to the `alfresco-global.properties` file, when specifying paths for Windows systems, you must replace the Windows path separator characters with either the `\\` separator or the forward slash `/` Unix path separator.

If you're installing manually, then you can use the `alfresco-global.properties.sample` file. This sample file contains some of the common properties required for setting up Community Edition.

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

    You can set additional database properties, such as `db.port` and `db.host`. See [Advanced configuration properties]({% link content-services/community/config/databases.md %}#advanced-configuration-properties) for more properties that can be set.

4. Configure your supported database for use. See [Configuring databases]({% link content-services/community/config/databases.md %}).

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

## Using the Java command line to change settings dynamically

All Community Edition properties can be set using the standard `alfresco-global.properties` configuration file. There might be circumstances where it is more convenient to change properties on the fly. The Java command line provides an alternative method of setting the properties.

The most common use of the Java command line is in a multiple-machine environment where the basic, common customizations are set using standard properties and the machine-specific values are set using command line options.

For example, an administrator is likely to configure all installs to behave similarly by setting properties in the configuration files, but will use the Java command line to vary settings like the database connection and Content Store locations.

You can use the `-D` options for setting properties on the Java command line. Add a `-Dprop=value` to `JAVA_OPTS`, or for anything that is sent to the Java command line, for example:

```java
-Ddir.root=/alfresco/data -Ddb.url=xxxx
```

## Customize applications

You can make basic configuration updates to customize Community Edition, or modify properties files to apply configuration changes.

* Updating system configuration parameters

  You can configure Community Edition for your specific environment by editing the `alfresco-global.properties` file.

* [Configuring Alfresco Share]({% link content-services/latest/develop/share-ext-points/index.md %})

  A number of options are available to customize Share. To configure Share, use the configuration file, `share-config-custom.xml` .

* [Solr configuration]({% link search-services/latest/config/index.md %}#solr-configuration-files)

  When you install Alfresco Search Services, several Solr-related configuration files are made available to you. To configure Solr, use the configuration file, `solrcore.properties`.

> **Note:** Remember not to use the default user names, URLs, or passwords with different environments.

> **Note:** You can customize or scale up to meet your login and security requirements. See [Setting up authentication and security]({% link content-services/community/admin/security.md %}) for more information.

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

    > **Note:** Any configuration within a section marked this way completely replaces any configuration found in the Community Edition maintained files.

    **Modify one property**

    The attribute `replace` completely replaces the configuration. To modify one property, add the changed piece.

3. Save your customized file.

### Modify Spring bean definition files

For advanced configuration, you can also extend or override the Spring bean definitions that control the Community Edition Java classes.

The Spring bean definitions are within configuration files in the following directories:

* The `<extension>` directory contains the configuration files for extending Community Edition.
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

### Using mutual TLS

Content Services can be configured using mutual TLS for zero-trust security. Please see [Mutual TLS]({% link content-services/latest/config/mtls.md %}) for more information in the Enterprise documentation.
