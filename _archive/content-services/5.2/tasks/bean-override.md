---
author: [Alfresco Documentation, Alfresco Documentation]
audience: 
category: Customization
option: core services JVM system global properties
---

# Mixing global properties and system property settings

You can use a combination of global properties and system properties for certain customizations. For example, if you wish to distribute a system that has a core set of properties overridden but need to customize the last few for each installation.

1.  Activate the properties in the <classpathRoot\>/alfresco-global.properties file.

2.  Set all common defaults for your system.

3.  On each installation, add the final configuration values. For example:

    ```
    -Ddb.username=alfresco
    -Ddb.password=alfresco 
    -Dindex.tracking.cronExpression='0/5 * * * * ?' 
    -Dindex.recovery.mode=AUTO 
    -Dalfresco.cluster.name=ALFRESCO\_DEV
    ```


**Parent topic:**[Command line configuration](../concepts/cmd-line-config.md)

