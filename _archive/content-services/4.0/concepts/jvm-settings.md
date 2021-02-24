---
author: [Alfresco Documentation, Alfresco Documentation, Alfresco Documentation]
source: 
audience: 
category: Customization
option: core services JVM
---

# JVM settings

Alfresco generates a high proportion of temporary objects, both in client threads as well as in the background processes. To reduce the number of temporary objects that spill into the OldGen portion of the heap, you need to set the NewSize option as large as possible.

The following settings reduce the garbage collections and reveal \(with GC printing and JMX tracing\) that the OldGen was not growing noticeably over and above the permanent space allocated for caches. Cache sizes are still estimated top out around 520M. So, for a typical 32 bit installation with at least 2GB available for the VM, you can use the following settings:

```
JAVA_OPTS=  
-Xss1024K 
-Xms1G 
-Xmx2G 
-XX:MaxPermSize=128M 
```

**Note:** For JVMs that don't automatically run in server mode, add the -server option. The default behaviour of the JVMs depends on the your operating system and the version of Java on your machine.

-   **[Low end machines](../concepts/jvm-lowend.md)**  
This section applies if you have less than 2GB available.
-   **[Effects of NewSize](../concepts/jvm-newsize.md)**  
This section describes the settings for OldGen.

**Parent topic:**[Tuning the JVM](../concepts/jvm-tuning.md)

