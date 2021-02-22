---
author: [Alfresco Documentation, Alfresco Documentation]
source: 
audience: 
category: Administration
option: file servers subsystem SMB CIFS
---

# CIFS file server properties

The following properties can be configured for the SMB/CIFS server.

-   **cifs.enabled**

    Enables or disables the CIFS server.

-   **cifs.serverName**

    Specifies the host name for the Alfresco CIFS server. If Alfresco is installed on a Windows server, the name of the machine must not exceed 14 characters and must be unique on the network. Use the special token `${localname}` in place of the local server's host name and you can generate a unique name by prepending/appending to it. The combined `${localname}` value must not exceed 15 characters.

    On Windows systems, the value of this property must be different from the server's host name, it should resolve to the same IP address as the server, and must be different from any other host name on the network.

-   **cifs.domain**

    An optional property. When it is not empty, it specifies the domain or workgroup to which the server belongs. It defaults to the domain or workgroup of the server, if not specified.

-   **cifs.hostannounce**

    Enables the announcement of the CIFS server to the local domain or workgroup, which makes the CIFS server available to the network.

-   **cifs.sessionTimeout**

    Specifies the CIFS session timeout value in seconds. The default session timeout is 15 minutes. If no Input/Output occurs on the session within this time then the session will be closed by the server. Windows clients send keep-alive requests, usually within 15 minutes.

-   **cifs.pseudoFiles.enabled**

    Controls whether URL shortcuts or desktop actions are displayed on CIFS.

-   **cifs.pseudoFiles.explorerURL.enabled**

    Controls whether URL the shortcut for Alfresco Explorer is shown.

-   **cifs.pseudoFiles.explorerURL.fileName**

    Specifies the name of the CIFS URL for Alfresco Explorer.

-   **cifs.pseudoFiles.shareURL.enabled**

    Controls whether the URL shortcut for Alfresco Share is shown.

-   **cifs.pseudoFiles.shareURL.fileName**

    Specifies the name of the CIFS URL for Alfresco Share.

-   **cifs.maximumVirtualCircuitsPerSession**

    Specifies the maximum number of virtual circuits allowed per session/socket connection to the CIFS server. This value should only be changed for Terminal Service clients where each log on uses a virtual circuit on the same session.


**Parent topic:**[Configuring SMB/CIFS server](../concepts/fileserv-subsystem-CIFS.md)

