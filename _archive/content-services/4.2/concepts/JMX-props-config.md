---
author: [Alfresco Documentation, Alfresco Documentation]
source: 
audience: 
category: Reference
option: JMX properties
---

# Properties available in a JMX client

This section contains a summary of the properties that can be viewed and changed in a JMX client.

-   **`alfresco.authentication.allowGuestLogin`**

    Specifies whether to allow guest access to Alfresco.

-   **`alfresco.authentication.authenticateCIFS`**

    A Boolean that when true enables Alfresco-internal authentication for the CIFS server. When false and no other members of the authentication chain support CIFS authentication, the CIFS server will be disabled.

-   **`ntlm.authentication.mapUnknownUserToGuest`**

    Specifies whether unknown users are automatically logged on as the Alfresco guest user during Single Sign-On \(SSO\).

-   **`ntlm.authentication.sso.enabled`**

    A Boolean that when true enables NTLM based Single Sign On \(SSO\) functionality in the Web clients. When false and no other members of the authentication chain support SSO, password-based login will be used.

-   **`authentication.chain`**

    Specifies the authentication chain.

-   **`synchronization.autoCreatePeopleOnLogin`**

    Specifies whether to create a user with default properties when a user is successfully authenticated, who does not yet exist in Alfresco, and was not returned by a differential sync \(if enabled with the property above\). The default is true. Setting this to false allows you to restrict Alfresco to a subset of those users who could be authenticated by LDAP; only those created by synchronization are allowed to log in. You can control the set of users in this more restricted set by overriding the user query properties of the LDAP authentication subsystem

-   **`synchronization.import.cron`**

    Specifies a cron expression defining when the scheduled synchronization job should run, by default at midnight every day.

-   **`synchronization.loggingInterval`**

    Specifies the number of user or group entries the synchronization subsystem will process before logging progress at INFO level. If you have the following default entry in log4j.properties:

    `log4j.logger.org.alfresco.repo.security.sync=info`. The default is 100.

-   **`synchronization.syncOnStartup`**

    Specifies whether to trigger a differential sync when the subsystem starts up. The default is true. This ensures that when user registries are first configured, the bulk of the synchronization work is done on server startup, rather than on the first login.

-   **`synchronization.syncWhenMissingPeopleLogIn`**

    Specifies whether to trigger a differential sync when a user is successfully authenticated who does not yet exist in Alfresco. The default is true.

-   **`synchronization.synchronizeChangesOnly`**

    Specifies if the scheduled synchronization job is run in differential mode. The default is false, which means that the scheduled sync job is run in full mode. Regardless of this setting a differential sync may still be triggered when a user is successfully authenticated who does not yet exist in Alfresco.

-   **`synchronization.workerThreads`**

    Specifies the number of worker threads. For example, 2.

-   **`cifs.WINS.autoDetectEnabled`**

    When true causes the cifs.WINS.primary and cifs.WINS.secondary properties to be ignored.

-   **`cifs.WINS.primary`**

    Specifies a primary WINS server with which to register the server name.

-   **`cifs.WINS.secondary`**

    Specifies a secondary WINS server with which to register the server name.

-   **`cifs.bindto`**

    Specifies the network adapter to which to bind. If not specified, the server will bind to all available adapters/addresses.

-   **`cifs.disableNIO`**

    Disables the new NIO-based CIFS server code and reverts to using the older socket based code.

-   **`cifs.disableNativeCode`**

    When true, switches off the use of any JNI calls and JNI-based CIFS implementations.

-   **`cifs.domain`**

    An optional property. When not empty, specifies the domain or workgroup to which the server belongs. This defaults to the domain/workgroup of the server, if not specified.

-   **`cifs.enabled`**

    Enables or disables the CIFS server.

-   **`cifs.hostannounce`**

    Enables announcement of the CIFS server to the local domain/workgroup so that it shows up in Network Places/Network Neighborhood.

-   **`cifs.ipv6.enabled`**

    Enables the use of IP v6 in addition to IP v4 for native SMB. When true, the server will listen for incoming connections on IPv6 and IPv4 sockets.

-   **`cifs.netBIOSSMB.datagramPort`**

    Controls the NetBIOS datagram port. The default is 138.

-   **`cifs.netBIOSSMB.namePort`**

    Controls the NetBIOS name server port on which to listen. The default is 137.

-   **`cifs.netBIOSSMB.sessionPort`**

    Controls the NetBIOS session port on which to listen for incoming session requests. The default is 139.

-   **`cifs.serverName`**

    Specifies the host name for the Alfresco CIFS server. This can be a maximum of 16 characters and must be unique on the network. The special token \{localname\} can be used in place of the local server's host name and a unique name can be generated by prepending/ appending to it.

-   **`cifs.sessionTimeout`**

    Specifies the CIFS session timeout value in seconds. The default session timeout is 15 minutes. If no I/O occurs on the session within this time then the session will be closed by the server. Windows clients send keep-alive requests, usually within 15 minutes.

-   **`cifs.tcpipSMB.port`**

    Controls the port used to listen for the SMB over TCP/IP protocol \(or native SMB\), supported by Win2000 and above clients. The default port is 445.

-   **`cifs.urlfile.prefix`**

    An absolute URL against which all desktop actions and URL files resolve their folder URL. The special token \{localname\} can be used in place of the local server's host name.

-   **`filesystem.acl.global.defaultAccessLevel`**

    Specifies the default access level. Directly names the access control level \(None, Read or Write\) that applies to requests that are not in scope of any other access control. Note that it is not valid to use the value None without defining other access controls.

-   **`filesystem.acl.global.domainAccessControls`**

    Specifies the set of access controls with domain scope. This is a composite property whose value should be a comma-separated list of domain names. To define the access level for one of the listed domains, use the property filesystem.acl.global.domainAccessControls. value.Domain.accessType.

-   **`filesystem.acl.global.protocolAccessControls`**

    Specifies the set of access controls with protocol scope. This is a composite property whose value should be a comma-separated list of access control names.

-   **`filesystem.acl.global.userAccessControls`**

    Specifies the set of access controls with user scope. This is a composite property whose value should be a comma-separated list of user names.

-   **`filesystem.domainMappings`**

    Specifies the domain mapping rules that are used when the client does not supply its domain in the NTLM request.

-   **`filesystem.name`**

    Specifies the name given to the repository file system mount exposed through the CIFS server. For example, Alfresco.

-   **`ftp.enabled`**

    Enables or disables the FTP server.

-   **`ftp.ipv6.enabled`**

    Enables or disables the IPv6 FTP server.

-   **`ftp.port`**

    Specifies the port that the FTP server listens for incoming connections on. Defaults to port 21.

-   **`nfs.enabled`**

    Enables or disables the NFS server.

-   **`nfs.user.mappings`**

    A composite property that configures the user ID/group ID to the Alfresco user name mappings that are used by the current RPC authentication implementation.

-   **`nfs.user.mappings.default.gid`**

    The Group Identifier \(GID\) for NFS user mappings.

-   **`nfs.user.mappings.default.uid`**

    The User Identifier \(UID\) for NFS user mappings.

-   **`imap.config.home.folderPath`**

    Specifies the default locations for the IMAP mount point. For example, `Imap Home`.

-   **`imap.config.home.rootPath`**

    Specifies the default location for the IMAP mount point. For example, `/${spaces.company_home.childname}`.

-   **`imap.config.home.store`**

    Specifies the default location for the IMAP mount point. For example, `${spaces.store}`.

-   **`imap.config.ignore.extraction`**

    Defines whether or not attachments are extracted.

-   **`imap.config.server.mountPoints`**

    Specifies the list of mount points. For example, `AlfrescoIMAP`.

-   **`imap.server.enabled`**

    Enables or disables the IMAP server. This is set to false, by default.

-   **`imap.server.host`**

    Specifies the host for the IMAP server.

-   **`imap.server.port`**

    Specifies the port number for the IMAP server. For example, 143.

-   **`imap.config.server.mountPoints.value.AlfrescoIMAP.modeName`**

    Specifies the `AlfrescoIMAP` mount point access mode name. For example, `MIXED`.

-   **`imap.config.server.mountPoints.default.rootPath`**

    Specifies the root path for the mount point.

-   **`imap.config.server.mountPoints.value.AlfrescoIMAP.mountPointName`**

    Specifies the mount point name.

-   **`imap.config.server.mountPoints.default.store`**

    Specifies the default store for the mount point.

-   **`server.allowedusers`**

    A comma-separated list of users who are allowed to log in. Leave empty if all users are allowed to log in.

-   **`server.maxusers`**

    The maximum number of users who are allowed to log in or -1 if there is no limit.

-   **`server.transaction.allow-writes`**

    A Boolean property that when true indicates that the repository will allow write operations \(provided that the license is valid\). When false the repository is in read-only mode.

-   **`img.dyn`**

    Points to the directory containing the ImageMagick shared library \(Unix\) or DLL files \(Windows\). For example, \(Windows\) `img.dyn=${img.root}`; \(Linux\) `img.dyn=${img.root}/lib`.

-   **`img.exe`**

    Points to the ImageMagick executable file name.

-   **`img.root`**

    Points to the ImageMagick root directory.

-   **`swf.exe`**

    Points to the SWF Tools executable file name.

-   **`wcm-deployment-receiver.poll.delay`**

    Specifies how long to wait before polling. For example, 5000.

-   **`wcm-deployment-receiver.rmi.service.port`**

    Specifies the port number for the RMI service. For example, 44101


**Parent topic:**[Reference](../concepts/ch-reference.md)

