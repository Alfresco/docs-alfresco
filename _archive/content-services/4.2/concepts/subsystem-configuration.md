---
author: [Alfresco Documentation, Alfresco Documentation]
source: 
audience: 
category: Customization
option: subsystem configuration
---

# Subsystem configuration files

The prepackaged subsystem configuration files form part of the core product and should not be edited.

The prepackaged subsystems are found in the <configRoot\>/classes/alfresco/subsystems directory.

Each subsystem directory should contain one or more Spring XML bean definition metadata files, with names matching the \*-context.xml pattern. These files are loaded by the child application context that belongs to the subsystem instance.

The XML bean definitions may contain place holders for properties that correspond to configuration parameters of the subsystem. As per standard Spring conventions, these place holders begin with `${`and end with `}`. In the following example, the value of the `ooo.user` configuration parameter will be substituted into the bean definition when it is loaded:

```
<bean id="userInstallationURI" class="org.alfresco.util.OpenOfficeURI">
      <constructor-arg>
         <value>${ooo.user}</value>
      </constructor-arg>
   </bean>
```

There is no need to declare a `PropertyPlaceholderConfigurer` bean. An appropriate one is added into the application context automatically.

**Parent topic:**[Configuring Alfresco subsystems](../concepts/subsystem-intro.md)

