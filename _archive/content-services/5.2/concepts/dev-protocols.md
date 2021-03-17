---
author: Alfresco Documentation
---

# Access protocols

Alfresco Content Services supports a number of different protocols for accessing the content repository. Their availability extends the options available to developers, when building their own applications and extensions.

Protocols provide developers with another possible avenue for building their own applications and extensions. For example, if you are building a client application to connect with multiple repositories from multiple vendors, including Alfresco Content Services, then CMIS is a consideration. If you are building a client to connect via the SharePoint Protocol, then use the Alfresco Office Services \(AOS\). Protocols provide a resource for developers, in addition to the numerous other extension points and APIs built into Alfresco.

When any of these protocols are used to access or upload content to the repository, access control is always enforced based on configured permissions, regardless of what protocol that is used.

The following table list some of the main protocols supported by Alfresco Content Services and links to more detailed documentation.

|Protocol|Description|Support Status|
|--------|-----------|--------------|
|HTTP|The main protocol used to access the repository via for example the REST APIs.|Standard in Alfresco Content Services and Community Edition.|
|[WebDAV](troubleshoot-webdav.md)|Web-based Distributed Authoring and Versioning is a set of HTTP extensions that lets you manage files collaboratively on web servers.|Standard in Alfresco Content Servicesand Community Edition.|
|[FTP](fileserv-ftp-intro.md)|File Transfer Protocol - standard network protocol for file upload, download and manipulation. Useful for bulk uploads and downloads.|Standard in Alfresco Content Services and Community.|
|[CIFS](fileserv-subsystem-CIFS.md)|Common Internet File System - allows the projection of Alfresco Content Services as a native shared drive. Any client that can read or write to file drives can read and write to Alfresco Content Services, allowing the commonly used shared file drive to be replaced with an ECM system, without users knowing.|Standard in Alfresco Content Servicesand Community Edition.|
|[SPP](aos-intro.md)|Enables Alfresco Content Services to act as a Microsoft SharePoint Server. Allows Microsoft Office users to access documents within the Alfresco repository.|Supported as part of Alfresco Office Services \(AOS\). Community versions have support for the older SharePoint Protocol Support.|
|[Alfresco Office Services](aos-intro.md)|Alfresco Office Services \(AOS\) allow you to access Alfresco Content Services directly from all your Microsoft Office applications.|Standard in Alfresco Content Services and Community Edition.|
|[CMIS](../pra/1/topics/cmis-welcome.md)|Alfresco fully implements both the [CMIS](https://www.oasis-open.org/committees/tc_home.php?wg_abbrev=cmis) 1.0 and 1.1 standards to allow your application to manage content and metadata in an on-premise repository.|Standard in Alfresco Content Services and Community Edition.|
|[IMAP](imap-intro.md)|Internet Message Access Protocol - allows access to email on a remote server. Alfresco Content Services can present itself as an email server, allowing clients such as Microsoft Outlook, Thunderbird, Apple Mail and other email clients to access the content repository, and manipulate folders and files contained there.|Standard in Alfresco Content Services and Community Edition.|
|[SMTP](email-intro.md)|It is possible to email content into the repository \(InboundSMTP\). A folder can be dedicated as an email target.|Standard in Alfresco Content Services and Community Edition.|

**Parent topic:**[Alfresco Content Services architecture](../concepts/dev-arch-overview.md)

