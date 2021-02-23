---
author: [Alfresco Documentation, Alfresco Documentation]
source: 
audience: 
category: Customization
option: subsystem mount composite properties
---

# Extension classpath

The alfresco-global.properties file can only be used to define properties that are global to the whole system. You can also control the properties of subsystems that may have multiple instances, for example, the Authentication subsystems. To do this, you need to target different values for the same properties, to each subsystem instance. You can use the extension classpath mechanism.

1.  Add a property file to your application server's global classpath.

    For example, under $TOMCAT\_HOME/shared/classes.

2.  Create the path to match the following pattern to override specific properties of a subsystem instance:

    ```
    alfresco/extension/subsystems/<category>/<type>/<id>/*.properties
    ```

    The <id\> is the subsystem instance identifier, which will be default for single instance subsystems, or the provided identifier for chained subsystems.


For example, if your authentication chain looked like this:

```
authentication.chain=alfrescoNtlm1:alfrescoNtlm,ldap1:ldap
```

Then you could put property overrides for alfrescoNtlm1 in the following file:

alfresco/extension/subsystems/Authentication/alfrescoNtlm/alfrescoNtlm1/mychanges.properties

The default type and ID of non-chained subsystems is default, so you could put overrides for file server properties in the following file:

alfresco/extension/subsystems/fileServers/default/default/mychanges.properties

**Parent topic:**[Configuring Alfresco subsystems](../concepts/subsystem-intro.md)

