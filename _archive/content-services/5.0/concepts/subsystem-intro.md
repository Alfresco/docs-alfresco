---
author: [Alfresco Documentation, Alfresco Documentation]
audience: 
---

# Configuring Alfresco subsystems

An Alfresco subsystem is a configurable module responsible for a sub-part of Alfresco functionality. Typically, a subsystem wraps an optional functional area, such as IMAP bindings, or one with several alternative implementations, such as authentication.

A subsystem can be considered as an Alfresco server embedded within the main server. A subsystem can be started, stopped, and configured independently, and it has its own isolated Spring application context and configuration.

The application context is a child of the main context. This means that it can reference all the beans in the main application context. However, the subsystem beans cannot be seen by the main application context and communication with the subsystem must be through explicitly imported interfaces. The main features of subsystems are:

-   **Multiple ‘instances’ of the same type**

    The same template spring configuration can be used with different parameters in different instances. For example, this allows you to chain, or combine functions of more than one subsystem, through property file edits.

-   **Dynamic existence**

    The subsystem has JMX-based server configuration capabilities.

-   **Own bean namespace**

    You do not need unique bean names if you use multiple instances of the same subsystem. This simplifies the problem of building an authentication chain as there is no need to edit a template Spring configuration.

-   **Clearly defined interfaces with the rest of the system**

    The subsystem interfaces must be imported to be used anywhere else in the system. This is done by mounting them as dynamic proxies.

-   **Hidden implementation specifics**

    Implementation specifics are not visible because beans are hidden in a private container.

-   **Swapping of alternative implementations**

    To switch from native Alfresco authentication to [NTLM pass-through authentication](https://msdn.microsoft.com/en-us/library/cc224019.aspx), you switch to an Alfresco `passthru` authentication subsystem and the correct components are swapped in.

-   **Separate product from configuration**

    A subsystem binds its configuration settings to properties. There is no need to edit or extend a prepackaged Spring configuration to configure a subsystem for your own needs.


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
The alfresco-global.properties file can only be used to define properties that are global to the whole system. You can also control the properties of subsystems that have multiple instances, for example, the Authentication subsystems. To do this, you need to target different values for the same properties, to each subsystem instance. You can use the extension classpath mechanism.

**Parent topic:**[Configuring Alfresco](../concepts/ch-configuration.md)

