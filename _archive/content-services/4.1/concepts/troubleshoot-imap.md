---
author: [Alfresco Documentation, Alfresco Documentation]
source: 
audience: 
category: Administration
option: troubleshooting error messages
---

# Troubleshooting IMAP

This section outlines the steps needed to troubleshoot IMAP server error.

**IMAP server error message**

```
Exception in thread "Thread-53" java.lang.RuntimeException:
java.net.BindException: Cannot assign requested address:
JVM_Bind at com.icegreen.greenmail.imap.ImapServer.run(ImapServer.java:53) 
Caused by: java.net.BindException:
Cannot assign requested address: JVM_Bind 
```

This error message is related to the IP address or hostname that has been provided for binding. To resolve this issue:

-   Check that the IP address or hostname you provided is correct for your `imap.server.host` setting.
-   Check that the port you are using is not blocked. The default port to use is 143.
-   Check that firewalls are not blocking this IP address or hostname.
-   Use the command line tool Netstat to check your network connections.

    **Note:** You should not use localhost as the imap.server.host - update this value with the IP address \(or corresponding DNS address\) of your external IP interface. A value of 0.0.0.0 in Unix will make it listen on the specified port on all IP interfaces.


**Parent topic:**[Troubleshooting](../concepts/ch-troubleshoot.md)

