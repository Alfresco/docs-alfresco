---
author: [Alfresco Documentation, Alfresco Documentation]
source: 
audience: 
category: Troubleshooting
option: inbound email StartTLS
---

# Troubleshooting SMTP inbound email using StartTLS

For StartTLS support to work for inbound email, you must configure SSL for Java.

To identify whether you are having this problem, enable `DEBUG` logging for the class `org.subethamail` in your log4j.properties file.

```
startTLS() failed: no cipher suites in common
```

Also, to enable efficient inbound mail server logging in debug mode, you need a log4j option that allows you to track mails, including the sender details, recipient details, subject and the reason for rejection/acceptance. To do so, enable `DEBUG` logging for the class org.subethamail.smtp.server.ConnectionHandler as shown below:

```
log4j.logger.org.subethamail.smtp.server.ConnectionHandler=debug  
```

The following process outlines one methodology for creation of a self-signed certificate. However, this may differ between JVM vendors, so consult your JVM documentation for more information.

1.  Create a suitable key and certificate:

    ```
    keytool -genkey -keystore mySrvKeystore -keyalg RSA
    ```

2.  Add the following somewhere in your Tomcat configuration. In RHEL 5, this file would be located at `/etc/tomcat5/tomcat5.conf`. For example:

    ```
    JAVA_OPTS="$JAVA_OPTS -Djavax.net.ssl.keyStore=mySrvKeystore -Djavax.net.ssl.keyStorePassword=123456"
    ```


**Note:** This methodology explains how to create a self-signed certificate only. SSL vendors can provide certificates signed by an authority and may be more suitable for production use.

**Parent topic:**[Troubleshooting](../concepts/ch-troubleshoot.md)

