---
author: Alfresco Documentation
---

# CMIS configuration settings

It is possible to configure the way that CMIS requests are processed by adding property settings in the alfresco-global.properties file.

**Change the default file limit**

The default limit for the length of a file to upload is 4GB \(4096MB\).

To change this limit, for example to 5GB \(5120MB\), add the following property in alfresco-global.properties file:

```
opencmis.maxContentSizeMB=5120
```

To ignore the size check, use the following property setting:

```
opencmis.maxContentSizeMB=-1
```

**Change the memory threshold**

The default threshold for memory is 4MB \(4096KB\). This sets the size threshold for content kept in memory. Documents bigger than this threshold will be cached in a temporary directory.

To change threshold, for example to 5MB \(5120KB\), add the following property in alfresco-global.properties file:

```
opencmis.memoryThresholdKB=5120
```

To ignore the memory threshold, use the following property setting:

```
opencmis.memoryThresholdKB=-1
```

**Parent topic:**[Getting Started](../../../pra/1/concepts/cmis-getting-started.md)

