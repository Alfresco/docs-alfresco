---
author: [Alfresco Documentation, Alfresco Documentation]
source: 
audience: 
category: Administration
option: file servers subsystem FTP
---

# FTP advanced Spring overrides

The FTP server beans are declared in the file-servers-context.xml file in <configRoot\>\\classes\\alfresco\\subsystems\\fileServers\\default.

When using the subsystem extension classpath mechanism, create a Spring bean override file called <extension\>\\subsystems\\fileServers\\default\\default\\file-servers-context.xml \(note that the you need to include the default\\default part of the path, which is intentional\). Add the site-specific customization of these default values to the override file.

The following properties can be overridden on the `ftpServerConfig` bean.

-   **bindTo**

    Specifies the address the FTP server binds to, if not specified the server will bind to all available addresses.

-   **rootDirectory**

    Specifies the path of the root directory as an FTP format path, that is, using forward slashes. The first part of the path should be the file system name, optionally followed by one or more folder names, for example:

    ```
    /Alfresco/myfolder/
    ```

-   **charSet**

    Specifies the character set to be used. The character set name should be a valid Java character set, see the Java `CharSet` class for more information.


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

