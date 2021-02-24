---
author: [Alfresco Documentation, Alfresco Documentation]
audience: 
---

# Controlling JVM system properties

Use these techniques to control JVM system properties.

In a standard Linux/Unix installation, system properties can be specified in `-Dname=value` format \(separated by spaces\) in the JAVA\_OPTS variable set by the script:

```
tomcat/scripts/ctl.sh 
```

In a standard Windows installation, system properties can be listed in `-Dname=value` format \(separated by semicolons\) before `;-Dalfresco.home` in:

```
tomcat/bin/service.bat
```

Once edited, the following commands must be run to re-register the service with the new options:

```
tomcat/scripts/serviceinstall.bat REMOVE
tomcat/scripts/serviceinstall.bat INSTALL
```

**Parent topic:**[Configuring the repository](../concepts/intro-core.md)

