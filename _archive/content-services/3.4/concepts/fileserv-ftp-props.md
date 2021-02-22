---
author: [Alfresco Documentation, Alfresco Documentation]
source: 
audience: 
category: Administration
option: file servers subsystem FTP
---

# FTP file server properties

The following properties can be configured for the FTP server.

-   **ftp.enabled**

    Enables or disables the FTP server.

-   **ftp.port**

    Specifies the port that the FTP server listens for incoming connections on. Defaults to port 21. On some platforms ports below 1024 require the server to be run under a privileged account.

-   **ftp.dataPortFrom**

    Limits the data ports to a specific range of ports. This property sets the lower limit.

-   **ftp.dataPortTo**

    Limits the data ports to a specific range of ports. This property sets the upper limit.

-   **ftp.keyStore**

    Specifies the path to the keystore file for FTPS support.

-   **ftp.trustStore**

    Specifies the path to the truststore file for FTPS support.

-   **ftp.passphrase**

    Specifies the passphrase for the keystore and truststore files.

-   **ftp.requireSecureSession**

    Specifies whether only secure FTPS sessions will be allowed to log in to the FTP server. To force all connections to use FTPS, set `ftp.requireSecureSession=true`.

-   **ftp.sslEngineDebug**

    Enables additional debug output from the Java SSLEngine class.


If you have IPv6 enabled on your system, Alfresco automatically uses IPv6.

The FTPS support runs over the same socket as normal connections; the connection is switched into SSL mode at the request of the client, usually before the user name and password is sent. The client can switch the socket back to plain text mode using the `CCC` command.

The `ftp.keyStore`, `ftp.trustStore`, and `ftp.passphrase` values must all be specified to enable FTPS support. Only explicit FTP over SSL/TLS mode is supported. Encrypted data sessions are not supported.

To setup the keystore and truststore files, follow the instructions from the Java6 JSSE Reference Guide. This will provide the values required for the `ftp.keyStore`, `ftp.trustStore` and `ftp.passphrase` values.

Enable debug output by setting the `SSL` debug flag using `ftp.sessionDebug=SSL`, and also by enabling the `log4j.logger.org.alfresco.fileserver=debug` log4j output.

**Parent topic:**[Configuring the FTP file server](../concepts/fileserv-ftp-intro.md)

