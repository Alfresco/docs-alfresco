---
author: [Alfresco Documentation, Alfresco Documentation]
source: 
audience: 
category: Customization
option: subsystem
---

# Configuring Alfresco subsystems

An Alfresco subsystem is a configurable module responsible for a sub-part of Alfresco functionality. Typically, a subsystem wraps an optional functional area, such as IMAP bindings, or one with several alternative implementations, such as authentication.

A subsystem can be thought of as miniature Alfresco server embedded within the main server. A subsystem can be started, stopped, and configured independently, and it has its own isolated Spring application context and configuration.

The application context is a child of the main context, therefore, it can reference all the beans in the main application context. However, the subsystem's beans cannot be seen by the main application context and communication with the subsystem must be through explicitly imported interfaces. The main features of subsystems are:

-   **Multiple ‘instances’ of the same type**

    The same template spring configuration can be initialized with different parameters in different instances. This enables, for example, the chaining of multiple authentication subsystems through property file edits.

-   **Dynamic existence**

    JMX-based server configuration capabilities in Alfresco Enterprise releases.

-   **Own bean namespace**

    There is no problem of bean name uniqueness if you need multiple instances of the same subsystem. Again, this vastly simplifies the problem of building an authentication chain as there is no need to edit any template Spring configuration.

-   **Clearly defined interfaces with the rest of the system**

    A subsystem's interfaces must be 'imported' in order to be used anywhere else in the system. This is done by mounting them as dynamic proxies.

-   **Hidden implementation specifics**

    Implementation specifics are not visible because all of its beans are hidden in a private container.

-   **Swapping of alternative implementations**

    To switch over from native Alfresco authentication to NTLM passthru authentication, you switch to a passthru authentication subsystem and the correct components are swapped in.

-   **Separate product from configuration**

    A subsystem binds its configuration settings to properties and can even do this for composite data. There is no longer a need to edit or extend prepackaged Spring configuration in order to configure a subsystem for your own needs.


-   **[Subsystem categories](../concepts/subsystem-categories.md)**  
Every subsystem has a category and a type.
-   **[Subsystem configuration files](../concepts/subsystem-configuration.md)**  
The prepackaged subsystem configuration files form part of the core product and should not be edited.
-   **[Subsystem properties](../concepts/subsystem-props.md)**  
A subsystem declares default values for all the properties it requires in one or more .properties files in its subsystem directory.
-   **[Mounting a subsystem](../tasks/subsystem-mount.md)**  
A subsystem can be mounted, that is, its existence can be declared to the main server. To mount a subsystem, use the `ChildApplicationContextFactory` bean. This is an object that wraps the Spring application context that owns the subsystem and its beans. It initializes its application context as a child of the main Alfresco context with an appropriate `PropertyPlaceholderConfigurer` that will expand its configuration parameters.
-   **[Mounting a subsystem with composite properties](../tasks/subsystem-mount-comp.md)**  
A subsystem is limited to flat property sets for its configuration, therefore it is difficult to allow structured data in this configuration. A composite property is a special property whose value is a list of beans.
-   **[Extension classpath](../tasks/subsystem-classpath.md)**  
The alfresco-global.properties file can only be used to define properties that are global to the whole system. You can also control the properties of subsystems that may have multiple instances, for example, the Authentication subsystems. To do this, you need to target different values for the same properties, to each subsystem instance. You can use the extension classpath mechanism.

**Parent topic:**[Administering](../concepts/ch-administering.md)

