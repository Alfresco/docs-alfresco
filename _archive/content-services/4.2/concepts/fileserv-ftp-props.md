---
author: [Alfresco Documentation, Alfresco Documentation]
audience: 
---

# FTP file server properties

The following properties can be configured for the FTP server.

-   **ftp.enabled**

    Enables or disables the FTP server.

-   **ftp.port**

    Specifies the port that the FTP server listens for incoming connections on. Defaults to port 21. On some platforms ports below 1024 require the server to be run under a privileged account.

-   **ftp.bindto**

    Specifies the network adapter to bind with. If the network adapter is not specified, the server will bind to all the available adapters/addresses.

-   **ftp.sessionDebug**

    Enable debug output by setting the `SSL` debug flag using `ftp.sessionDebug=SSL`, and also by enabling the `log4j.logger.org.alfresco.fileserver=debug` log4j output.

-   **ftp.dataPortFrom**

    Limits the data ports to a specific range of ports. This property sets the lower limit.

-   **ftp.dataPortTo**

    Limits the data ports to a specific range of ports. This property sets the upper limit.

-   **ftp.keyStore**

    Specifies the path to the keystore file for FTPS support.

-   **ftp.keyStoreType**

    Specifies the file type of the keystore file. The default is JKS.

-   **ftp.keyStorePassphrase**

    Specifies the passphrase for the keystore file.

-   **ftp.trustStore**

    Specifies the path to the truststore file for FTPS support.

-   **ftp.trustStoreType**

    Specifies the file type of the truststore file. The default is JKS.

-   **ftp.trustStorePassphrase**

    Specifies the passphrase for the truststore file.

-   **ftp.requireSecureSession**

    Specifies whether only secure FTPS sessions will be allowed to log in to the FTP server. To force all connections to use FTPS, set `ftp.requireSecureSession=true`.

-   **ftp.sslEngineDebug**

    Specifies the FTP session debug flags, which enables additional debug output from the Java SSLEngine class. The list of values can be STATE, RXDATA, TXDATA, DUMPDATA, SEARCH, INFO, FILE, FILEIO, ERROR, PKTTYPE, TIMING, DATAPORT, DIRECTORY, SSL.


If you have IPv6 enabled on your system, Alfresco automatically uses IPv6.

The FTPS support runs over the same socket as normal connections; the connection is switched into SSL mode at the request of the client, usually before the user name and password is sent. The client can switch the socket back to plain text mode using the `CCC` command.

The `ftp.keyStore`, `ftp.trustStore`, and respective `ftp.keyStorePassphrase` and `ftp.trustStorePassphrase` values must all be specified to enable FTPS support. Only explicit FTP over SSL/TLS mode is supported. Encrypted data sessions are not supported.

To setup the keystore and truststore files, follow the instructions from the Java6 JSSE Reference Guide. This will provide the values required for the `ftp.keyStore`, `ftp.trustStore`, `ftp.keyStorePassphrase` and `ftp.trustStorePassphrase` values.

**Parent topic:**[Configuring the FTP file server](../concepts/fileserv-ftp-intro.md)

