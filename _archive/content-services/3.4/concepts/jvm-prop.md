---
author: [Alfresco Documentation, Alfresco Documentation]
source: 
audience: 
category: [Alfresco Server, Administration, Configuration]
keyword: [solr, search, lucene]
---

# Controlling JVM system properties

This topic describes how to control JVM system properties.

In a standard Linux/Unix installation, system properties can be specified in `-Dname=value` format \(separated by spaces\) in the JAVA\_OPTS variable set by the script:

```
tomcat/scripts/ctl.sh 
```

In a standard Windows installation, system properties can be listed in `-Dname=value` format \(separated by semicolons\) before `;-Dalfresco.home` in:

```
tomcat/bin/service.bat
```

Once edited, the commands:

```
tomcat/scripts/serviceinstall.bat REMOVE
tomcat/scripts/serviceinstall.bat INSTALL
```

must be run to re-register the Alfresco service with the new options.

**Parent topic:**[Configuring the repository](../concepts/intro-core.md)

