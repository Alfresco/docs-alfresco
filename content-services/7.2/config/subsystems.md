---
title: Configure subsystems
---

A subsystem is a configurable module responsible for a sub-part of Content Services functionality. Typically, a subsystem wraps an optional functional area, such as IMAP bindings, or one with several alternative implementations, such as authentication.

A subsystem can be considered as a server embedded within the main server. A subsystem can be started, stopped, and configured independently, and it has its own isolated Spring application context and configuration.

The application context is a child of the main context. This means that it can reference all the beans in the main application context. However, the subsystem beans can't be seen by the main application context and communication with the subsystem must be through explicitly imported interfaces. The main features of subsystems are:

* **Multiple 'instances' of the same type**

    The same template Spring configuration can be used with different parameters in different instances. For example, this allows you to chain, or combine functions of more than one subsystem, through property file edits.

* **Dynamic existence**

    The subsystem has JMX-based server configuration capabilities.

* **Own bean namespace**

    You don't need unique bean names if you use multiple instances of the same subsystem. This simplifies the problem of building an authentication chain, as there's no need to edit a template Spring configuration.

* **Clearly defined interfaces with the rest of the system**

    The subsystem interfaces must be imported to be used anywhere else in the system. This is done by mounting them as dynamic proxies.

* **Hidden implementation specifics**

    Implementation specifics are not visible because beans are hidden in a private container.

* **Swapping of alternative implementations**

    To switch from native Content Services authentication to [Kerberos PAC Validation](https://docs.microsoft.com/en-us/openspecs/windows_protocols/ms-apds/1d1f2b0c-8e8a-4d2a-8665-508d04976f84?redirectedfrom=MSDN){:target="_blank"}, you switch to a `Kerberos` authentication subsystem and the correct components are swapped in.

* **Separate product from configuration**

    A subsystem binds its configuration settings to properties. There's no need to edit or extend a prepackaged Spring configuration to configure a subsystem for your own needs.

## Subsystem categories

Every subsystem has a category and a type.

* Category is a broad description of the subsystem's function, for example, Authentication.
* Type is a name for the particular flavor of implementation, where multiple alternative implementations exist, for example, `ldap`. Where a subsystem has only one implementation, you can use the default type name of `default`.

The supplied subsystem categories are:

| Subsystem name | Functional area |
| -------------- | --------------- |
| [ActivitiesFeed]({% link content-services/7.2/config/email.md %}#configure-activities-feed) | Activities notifications |
| [Audit]({% link content-services/7.2/admin/audit.md %}) | Audit related functions |
| [Authentication]({% link content-services/7.2/admin/auth-sync.md %}) | Authentication related functions |
| [ContentStore]({% link content-services/7.2/admin/content-stores.md %}) | Properties for the encrypted and non-encrypted Content Stores |
| [email]({% link content-services/7.2/config/email.md %}) | Outbound and inbound SMTP property settings |
| [fileServers]({% link content-services/7.2/config/file-servers.md %}) | Properties for the FTP servers |
| [googledocs]({% link google-drive/latest/index.md %}) | Properties for Google Docs integration |
| [imap]({% link content-services/7.2/config/email.md %}#configure-imap) | Properties for the IMAP service |
| [Replication]({% link content-services/7.2/admin/replication.md %}) | Settings for the replication jobs tool |
| [Search]({% link search-services/latest/index.md %}) | Search mechanism |
| [Subscriptions]({% link content-services/7.2/config/email.md %}#enable-subscription-service) | Settings for the activities feeds |
| [Synchronization]({% link content-services/7.2/admin/auth-sync.md %}#configuring-synchronization) | Synchronization of local user and group information with the user registry exporters (usually LDAP directories) in the authentication chain |
| [sysAdmin]({% link content-services/7.2/config/repository.md %}#sysadmin) | Properties for server administration |
| thirdparty | Properties for third-party software |
| [Transformers]({% link content-services/7.2/admin/transformations.md %}) | Properties for the transformation server |
| [wcm_deployment_receiver]({% link content-services/7.2/admin/workflows.md %}#workflowconsole) | Properties for WCM Deployment Receiver |

## Subsystem configuration files

The prepackaged subsystem configuration files form part of the core product and shouldn't be edited.

The prepackaged subsystems are in the `<configRoot>/classes/alfresco/subsystems` directory.

Each subsystem directory should contain one or more Spring XML bean definition metadata files, with names matching the `*-context.xml` pattern. These files are loaded by the child application context that belongs to the subsystem instance.

The XML bean definitions can contain placeholders for properties that correspond to configuration parameters of the subsystem. As per standard Spring conventions, these place holders begin with `${` and end with `}`. In the following example, the value of the `ooo.user` configuration parameter will be substituted into the bean definition when it's loaded:

```xml
<bean id="userInstallationURI" class="org.alfresco.util.OpenOfficeURI">
  <constructor-arg>
      <value>${ooo.user}</value>
  </constructor-arg>
</bean>
```

There's no need to declare a `PropertyPlaceholderConfigurer` bean. An appropriate one is added into the application context automatically.

## Subsystem properties

A subsystem declares default values for all the properties it requires in one or more `.properties` files in its subsystem directory.

For example, there could be a `mysubsystem.properties` file, containing the following:

```bash
ooo.user=${dir.root}/oouser
```

Placeholders are used for system-wide properties, such as `dir.root` in the `-context.xml` and `.properties` files, as the child application context will recursively expand placeholders for its own properties and all the placeholders recognized by its parent.

Properties files in the subsystem directory declare the configuration parameters, and provide default values where these haven't been supplied elsewhere. These files shouldn't be edited in order to configure the subsystem.

Use the following methods to modify the subsystem properties:

* JConsole `Alfresco:Type=Configuration` tree shows the subsystems and all their composite properties
* See [Modify global properties]({% link content-services/7.2/config/index.md %}#modify-global-props) for more information on how to configure a prepackaged subsystem.
* Use `-D` options

## Mounting a subsystem

A subsystem can be mounted, that is, its existence can be declared to the main server. To mount a subsystem, use the `ChildApplicationContextFactory` bean. This is an object that wraps the Spring application context that owns the subsystem and its beans. It initializes its application context as a child of the main Content Services context with an appropriate `PropertyPlaceholderConfigurer` that will expand its configuration parameters.

> **Note:** Any instances that you define should extend the `abstractPropertyBackedBean` definition. The identifier that you define for the bean automatically becomes the subsystem category and defines where the factory will look for configuration files, in the search paths.

1. Open the core bootstrap-context.xml file (the file that controls the startup of beans and their order).

2. Locate the following bean definition:

    ```xml
    <!--  Third party transformer Subsystem -->
    <bean id="thirdparty" class="org.alfresco.repo.management.subsystems.ChildApplicationContextFactory" parent="abstractPropertyBackedBean">
      <property name="autoStart">
        <value>true</value>
      </property>
    </bean>
    ```

    The `autoStart` property is set to true, meaning that the child application context will be refreshed when the server boots up, activating the beans it contains. For subsystems containing background processes or daemons (for example, the file server subsystem), it's very important to set this property, otherwise the subsystem will never activate.

3. Save your file.

## Mounting a subsystem with composite properties

A subsystem is limited to flat property sets for its configuration, therefore it is difficult to allow structured data in this configuration. A composite property is a special property whose value is a list of beans.

### Example: IMAP subsystem

The IMAP subsystem is mounted as:

```xml
<!-- IMAP Subsystem -->
<bean id="imap" class="org.alfresco.repo.management.subsystems.ChildApplicationContextFactory" parent="abstractPropertyBackedBean">
    <property name="autoStart">
        <value>true</value>
    </property>
    <property name="compositePropertyTypes">
        <map>
            <entry key="imap.server.mountPoints">
                <value>org.alfresco.repo.imap.config.ImapConfigMountPointsBean</value>
            </entry>
        </map>
    </property>
</bean>
```

The subsystem declares a single composite property called `imap.server.mountPoints` with component type `org.alfresco.repo.imap.config.ImapConfigMountPointsBean`.

The configured value of this composite property is materialized in the child application context as a `ListFactoryBean`. The bean's ID should match the name of the composite property. So, for example, in the IMAP subsystem configuration:

```xml
<!--The configurable list of mount points - actually a post-processed composite property! -->
  <bean id="imap.server.mountPoints" class="org.springframework.beans.factory.config.ListFactoryBean">
      <property name="sourceList">
          <list>
              <!-- Anything declared in here will actually be ignored and replaced by the configured composite propery value, resolved on initialization -->
              <bean id="Repository_virtual" class="org.alfresco.repo.imap.config.ImapConfigMountPointsBean">
                  <property name="mode">
                      <value>virtual</value>
                  </property>
                  <property name="store">
                      <value>${spaces.store}</value>
                  </property>
                  <property name="path">
                      <value>/${spaces.company_home.childname}</value>
                  </property>
              </bean>
              <bean id="Repository_archive" class="org.alfresco.repo.imap.config.ImapConfigMountPointsBean">
                  <property name="mode">
                      <value>archive</value>
                  </property>
                  <property name="store">
                      <value>${spaces.store}</value>
                  </property>
                  <property name="path">
                      <value>/${spaces.company_home.childname}</value>
                  </property>
              </bean>
          </list>
      </property>
  </bean>
```

Other beans in the subsystem application context can use `imap.server.mountPoints` as though it were a regular list of `ImapConfigMountPointsBeans`.

## Extension classpath

The `alfresco-global.properties` file can only be used to define properties that are global to the whole system. You can also control the properties of subsystems that have multiple instances, for example, the Authentication subsystems. To do this, you need to target different values for the same properties, to each subsystem instance. You can use the extension classpath mechanism.

1. Add a property file to your application server's global classpath.

    For example, under `$TOMCAT_HOME/shared/classes`.

2. Create the path to match the following pattern to override specific properties of a subsystem instance:

    ```bash
    alfresco/extension/subsystems/<category>/<type>/<id>/*.properties
    ```

    The `<id>` is the subsystem instance identifier, which will be default for single instance subsystems, or the provided identifier for chained subsystems.

For example, if your authentication chain looked like this:

```bash
authentication.chain=alfrescoNtlm1:alfrescoNtlm,ldap1:ldap
```

Then you could put property overrides for `alfrescoNtlm1` in the following file:

```bash
alfresco/extension/subsystems/Authentication/alfrescoNtlm/alfrescoNtlm1/mychanges.properties
```

The default type and ID of non-chained subsystems is default, so you could put overrides for file server properties in the following file:

```bash
alfresco/extension/subsystems/fileServers/default/default/mychanges.properties
```
