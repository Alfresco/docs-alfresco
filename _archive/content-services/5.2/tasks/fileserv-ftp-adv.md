---
author: [Alfresco Documentation, Alfresco Documentation]
---

# FTP advanced Spring overrides

The FTP server beans are declared in the file-servers-context.xml file.

Using the subsystem extension classpath mechanism, site specific customization of these default values can be placed in a Spring bean file. Create a file called custom-file-servers-context.xml and place it in a folder with the path <extension\>\\subsystems\\fileServers\\default\\default\\custom-file-servers-context.xml \(note that the default\\default part of the path is intentional\).

The following properties can be overridden on the `ftpServerConfig` bean.

-   **bindTo**

    Specifies the address the FTP server binds to, if not specified the server will bind to all available addresses.


1.  The `debugFlags` property enables debug output levels for FTP server debugging. The value should be a comma-separated list of flag names from the following table:

    |**Flag**|**Description**|
    |--------|---------------|
    |`State`|Session state changes|
    |`Search`|Folder searches|
    |`Info`|File information requests|
    |`File`|File open/close|
    |`FileIO`|File read/write|
    |`Error`|Errors|
    |`Pkttype`|Received packet type|
    |`Timing`|Time packet processing|
    |`Dataport`|Data port|
    |`Directory`|Directory commands|

2.  Configure logging levels for the FTP server in $ALF\_HOME/tomcat/webapps/alfresco/WEB-INF/classes/log4j.properties using:

    ```
    log4j.logger.org.alfresco.ftp.protocol=debug
    log4j.logger.org.alfresco.ftp.server=debug
    ```


**Parent topic:**[Configuring the FTP file server](../concepts/fileserv-ftp-intro.md)

