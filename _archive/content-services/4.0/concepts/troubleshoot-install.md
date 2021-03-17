---
author: [Alfresco Documentation, Alfresco Documentation]
source: 
audience: 
category: Administration
option: troubleshooting error messages
---

# Error messages

This section lists possible issues you may encounter when installing Alfresco and suggests possible remedies.

**ImageMagick**

Error message on the console:

```
ERROR [AbstractImageMagickContentTransformer]
JMagickContentTransformer not available:
ERROR [AbstractImageMagickContentTransformer]
ImageMagickContentTransformer not available:
Failed to execute command: imconvert ... 
```

These issues will not cause the server to fail. Alfresco is reporting that external document transformation engines are not available for use by the server. You can remove the transformation references if they are not required.

**JAVA\_HOME**

Make sure the `JAVA_HOME` variable is set correctly for your Java installation.

**FTP Socket**

Error message on server startup:

```
ERROR [protocol] FTP Socket error
```

```
java.net.BindException: Address already in use: 
JVM_Bind at
```

```
java.net.PlainSocketImpl.socketBind(Native Method)
```

Check to see if you have any services running against port 8080 for the Alfresco server or port 21 for the Alfresco FTP integration.

**Parent topic:**[Troubleshooting](../concepts/ch-troubleshoot.md)

