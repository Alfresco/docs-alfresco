---
title: Configure file servers

---

The **File Server** subsystem allows access to the Content Services data stores through the FTP protocol. This allows you to browse to the repository using an FTP client.

> **Note:** We recommend that you implement an allowed authentication mechanism relative to the file server you are using. For more information on the different types of authentication subsystems and their use, see [Authentication subsystem types]({% link content-services/7.2/admin/auth-sync.md %}#authsubsystypes).

As with other Content Services subsystems, the File Server subsystem exposes all of its configuration options as properties that can be controlled through a JMX interface or the global properties file.

## Enabling file servers

Content Services supports access using the FTP protocol. Use File Servers in the Admin Console to enable, configure, and disable these services.

1. Open the Admin Console.

2. In the **Virtual File Systems** section, click **File Servers** to open the File Servers page.

3. Set the File Systems properties:

    | Property | Description |
    | -------- | ------------|
    | File System Name | The name given to the file system when using WebDAV, or FTP, for example `Alfresco`. |

4. Set the FTP properties:

    | Property | Description |
    | -------- | ------------|
    | FTP Enabled | Enables or disables the FTP server, for example `Yes` (i.e. enabled). This is disabled by default. |
    | Port | Specifies the port on which the FTP server listens for connections, for example `2121`. |
    | Dataport From | Specifies the lower limit of the range of data ports (blank by default). |
    | Dataport To | Specifies the upper limit of the range of data ports (blank by default). |

5. Click **Save** to apply the changes you have made to the properties.

## Configuring the FTP file server

Use this information to configure the FTP file server.

### FTP file server properties

The following properties can be configured for the FTP server.

| Property | Description |
| -------- | ------------|
| ftp.enabled | Enables or disables the FTP server. |
| ftp.port | Specifies the port that the FTP server listens for incoming connections on. Defaults to port `21`. On some platforms ports below `1024` require the server to be run under a privileged account. |
| ftp.bindto | Specifies the network adapter to bind with. If the network adapter isn't specified, the server will bind to all the available adapters/addresses. |
| ftp.sessionDebug | Enable debug output by setting the `SSL` debug flag using `ftp.sessionDebug=SSL`, and also by enabling the `log4j.logger.org.alfresco.fileserver=debug` log4j output. |
| ftp.dataPortFrom | Limits the data ports to a specific range of ports. This property sets the lower limit. |
| ftp.dataPortTo | Limits the data ports to a specific range of ports. This property sets the upper limit. |
| ftp.keyStore | Specifies the path to the keystore file for FTPS support. |
| ftp.keyStoreType | Specifies the file type of the keystore file. The default is `JKS`. |
| ftp.keyStorePassphrase | Specifies the passphrase for the keystore file. |
| ftp.trustStore | Specifies the path to the truststore file for FTPS support. |
| ftp.trustStoreType | Specifies the file type of the truststore file. The default is `JKS`. |
| ftp.trustStorePassphrase | Specifies the passphrase for the truststore file. |
| ftp.requireSecureSession | Specifies whether only secure FTPS sessions will be allowed to log in to the FTP server. To force all connections to use FTPS, set `ftp.requireSecureSession=true`. |
| ftp.sslEngineDebug | Specifies the FTP session debug flags, which enables additional debug output from the Java SSLEngine class. The list of values can be `STATE`, `RXDATA`, `TXDATA`, `DUMPDATA`, `SEARCH`, `INFO`, `FILE`, `FILEIO`, `ERROR`, `PKTTYPE`, `TIMING`, `DATAPORT`, `DIRECTORY`, `SSL`. |
| ftp.externalAddress | Specifies the FTP external IP address - the IP address as seen by FTP clients. This is useful for NAT or proxy setup where the proxy or NAT device can't track FTP sessions by itself, either because it doesn't know FTP or because the FTP session is encrypted (this includes most load-balancing scenarios). |

If you've enabled IPv6 on your system, Content Services automatically uses IPv6.

The FTPS support runs over the same socket as normal connections; the connection is switched into SSL mode at the request of the client, usually before the user name and password is sent. The client can switch the socket back to plain text mode using the `CCC` command.

The `ftp.keyStore`, `ftp.trustStore`, and respective `ftp.keyStorePassphrase` and `ftp.trustStorePassphrase` values must all be specified to enable FTPS support. Only explicit FTP over SSL/TLS mode is supported. Encrypted data sessions are not supported.

To setup the keystore and truststore files, follow the instructions from the Java6 JSSE Reference Guide. This will provide the values required for the `ftp.keyStore`, `ftp.trustStore`, `ftp.keyStorePassphrase` and `ftp.trustStorePassphrase` values.

### FTP advanced Spring overrides

The FTP server beans are declared in the `file-servers-context.xml` file.

Using the subsystem extension classpath mechanism, you can place site specific customization of these default values in a Spring bean file. Create a file `custom-file-servers-context.xml` and place it in a folder with the path `<extension>\subsystems\fileServers\default\default\custom-file-servers-context.xml`.

> **Note:** The `default\default` part of the path is intentional.

The following properties can be overridden on the `ftpServerConfig` bean.

* bindTo**

  Specifies the address the FTP server binds to. If it's not specified, the server binds to all available addresses.

1. The `debugFlags` property enables debug output levels for FTP server debugging. The value should be a comma-separated list of flag names from the following table:

    | Flag | Description |
    | ---- | ----------- |
    | State | Session state changes |
    | Search | Folder searches |
    | Info | File information requests |
    | File | File open/close |
    | FileIO | File read/write |
    | Error | Errors |
    | Pkttype | Received packet type |
    | Timing | Time packet processing |
    | Dataport | Data port |
    | Directory | Directory commands |

2. Configure logging levels for the FTP server in `$ALF_HOME/tomcat/webapps/alfresco/WEB-INF/classes/log4j.properties` using:

    ```bash
    log4j.logger.org.alfresco.ftp.protocol=debug
    log4j.logger.org.alfresco.ftp.server=debug
    ```
