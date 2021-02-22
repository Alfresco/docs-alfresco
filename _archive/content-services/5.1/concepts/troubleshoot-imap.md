---
author: [Alfresco Documentation, Alfresco Documentation]
source: 
audience: 
category: Administration
option: troubleshooting error messages
---

# Troubleshooting IMAP

Use this information to troubleshoot IMAP problems.

## IMAP scale limitations

If you mount more than 5000 folders or mailbox folders, depending on the IMAP client that you are using, you might not be able to view more than the first 5000 folders.

In order to avoid this situation, you should limit the number of folders that are being mounted. For example:

-   Do not mount from the company root space if you know that you have a very large folder structure. Choose a specific site to reduce the number of folders being mounted.
-   Do not extract attachments to a separate folder \(`imap.attachments.mode=SEPARATE`\), particularly for large repositories. When you specify `imap.attachments.mode`, choose one of the following settings:
    -   `imap.attachments.mode=COMMON`: all attachments for all emails are extracted to one folder
    -   `imap.attachments.mode=SAME`: attachments are extracted to the same folder as the original message

## IMAP server error message

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

