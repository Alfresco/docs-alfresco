---
author: [Alfresco Documentation, Alfresco Documentation]
audience: 
---

# Enabling file servers

Alfresco Content Services supports access using the CIFS and FTP protocols. Use File Servers in the Admin Console to enable, configure, and disable these services.

1.  Open the Admin Console.

2.  In the Virtual File Systems section, click **File Servers**.

    You see the File Servers page.

3.  Set the File Systems properties:

    |File Systems property|Example setting|What is it?|
    |---------------------|---------------|-----------|
    |**File System Name**|Alfresco|The name given to the file system when using CIFS, WebDAV, or FTP.|

4.  Set the CIFS properties:

    |CIFS property|Example setting|What is it?|
    |-------------|---------------|-----------|
    |**CIFS Enabled**|Yes|This enables or disables the CIFS server.|
    |**Server Name**|$\{localname\}A|The CIFS server host name. This can be a maximum of 16 characters and must be unique on the network. You can use the special token $\{localname\} in place of the local server's host name and generate a unique name by prepending/appending to it.|
    |**Host Announce**|True|Enables the announcement of the CIFS server to the local domain/workgroup so that it shows up in the Network Places/Network Neighborhood.|
    |**Session Timeout \(seconds\)**|900|The default CIFS session timeout is 15 minutes. If no I/O occurs on the session within this time then the session will be closed by the server. Windows clients send keep-alive requests, usually within 15 minutes.|
    |**Domain**| |The domain or workgroup to which the server belongs. If not specified then the domain/workgroup of the server is used.|

5.  Set the FTP properties:

    |FTP property|Example setting|What is it?|
    |------------|---------------|-----------|
    |**FTP Enabled**|Yes|This enables or disables the FTP server.|
    |**Port**|2121|This specifies the port on which the FTP server listens for connections.|
    |**Dataport From**| |This specifies the lower limit of the range of data ports.|
    |**Dataport To**| |This specifies the upper limit of the range of data ports.|

6.  Click **Save** to apply the changes you have made to the properties.

    If you do not want to save the changes, click **Cancel**.


**Parent topic:**[Configuring file servers](../concepts/fileserv-subsystem-intro.md)

**Related information**  


[Launching the Admin Console](adminconsole-open.md)

