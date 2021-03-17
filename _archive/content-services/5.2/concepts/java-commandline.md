---
author: [Alfresco Documentation, Alfresco Documentation]
audience: 
category: Customization
---

# Using the Java command line to change settings dynamically

All Alfresco Content Services properties can be set using the standard alfresco-global.properties configuration file. There might be circumstances where it is more convenient to change properties on the fly. The Java command line provides an alternative method of setting the properties.

The most common use of the Java command line is in a multiple-machine environment where the basic, common customizations are set using standard properties and the machine-specific values are set using command line options.

For example, an administrator is likely to configure all installs to behave similarly by setting properties in the configuration files, but will use the Java command line to vary settings like the database connection, Content Store locations, and CIFS domain name.

You can use the `-D` options for setting properties on the Java command line. Add a `-Dprop=value` to `JAVA_OPTS`, or for anything that is sent to the Java command line, for example:

```
-Ddir.root=/alfresco/data -Ddb.url=xxxx
```

**Parent topic:**[Configuration overview](../concepts/configuration-overview.md)

