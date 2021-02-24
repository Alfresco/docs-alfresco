---
author: Alfresco Documentation
---

# Troubleshooting IMAP

This error message relates to the IP address or hostname that has been supplied for binding.

**IMAP server error message**

```
Exception in thread "Thread-53" java.lang.RuntimeException:
java.net.BindException: Cannot assign requested address:
JVM_Bind at com.icegreen.greenmail.imap.ImapServer.run(ImapServer.java:53) 
Caused by: java.net.BindException:
Cannot assign requested address: JVM_Bind 
```

1.  Check the IP or hostname is correct for your `imap.server.host` setting.

    **Note:** Do not use `localhost` as the `imap.server.host`. Update this value with the IP address \(or corresponding DNS address\) of your external IP interface. A value of 0.0.0.0 will make it listen on the specified port on all IP interfaces.

2.  Check that the port you are using is not blocked.

    The default port to use is 143.

3.  Check that firewalls are not blocking this IP address or hostname.

4.  Use the command line tool Netstat to check your network connections.


**Parent topic:**[Troubleshooting](../concepts/ch-troubleshoot.md)

