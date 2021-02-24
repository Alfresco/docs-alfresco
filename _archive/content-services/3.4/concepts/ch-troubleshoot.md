---
author: [Alfresco Documentation, Alfresco Documentation]
source: 
audience: 
category: Administration
option: troubleshooting
---

# Troubleshooting

This section provides help for diagnosing and resolving any Alfresco issues you may encounter.

For additional help, refer to the following:

-   Alfresco Support Portal \([http://support.alfresco.com](http://support.alfresco.com)\)
-   **Admin Console** in Alfresco Explorer to view various installation and setup information
-   Alfresco Installation forum \([http://forums.alfresco.com/](http://forums.alfresco.com/)\)

-   **[Debugging an Alfresco installation](../tasks/debug-installation.md)**  
When developing add-ins, fixing bugs, or changing Alfresco from the source code, it is helpful to debug an instance of Alfresco running on a standard application server. This section outlines the steps needed to configure Alfresco and Eclipse to provide a real-time view of the server and to troubleshoot issues by stepping through the code line by line.
-   **[Debugging an upgrade](../tasks/debug-upgrade.md)**  
The startup log is important to help Alfresco Support diagnose any issues that might arise as a result of the upgrade.
-   **[Setting log levels](../tasks/log-levels-set.md)**  
The log4j.properties file lets you configure logging levels to provide debugging information when troubleshooting. To set up logging policies, you must prepend `log4.logger` to the class name you want to log to, and set the logging level. You can set the log level dynamically using the JMX client.
-   **[Adding swap space in Linux](../tasks/swap-space-lin.md)**  
When running Alfresco in a Linux environment, in some circumstances, it may be necessary to add extra swap space.
-   **[Testing and debugging links](../tasks/links-testing.md)**  
The <configRoot\>/log4j.properties file lets you set the level of logging based on the amount of information you need.
-   **[Error messages](../concepts/troubleshoot-install.md)**  
This section lists issues that you may encounter when installing Alfresco and suggests possible remedies.
-   **[Troubleshooting an upgrade](../tasks/troubleshoot-upgrade.md)**  
This section provides help for diagnosing and resolving any issues that might arise as a result of an upgrade.
-   **[Troubleshooting clustering](../concepts/troubleshooting-conf.md)**  
This topic provides additional troubleshooting tips for testing cache clustering.
-   **[Troubleshooting OpenOffice subsystems](../tasks/troubleshoot-openoffice.md)**  
This section provides help for troubleshooting the OpenOffice subsystems.
-   **[Troubleshooting the JMX Dumper](../concepts/troubleshoot-JMXdumper.md)**  
This section provides help for troubleshooting the JMX Dumper.
-   **[Troubleshooting NFS](../concepts/troubleshoot-nfs.md)**  
This section provides help for diagnosing and resolving any issues that might arise when configuring NFS.
-   **[Troubleshooting CIFS](../concepts/troubleshoot-cifs.md)**  
This section provides help for diagnosing and resolving any issues that might arise when configuring CIFS.
-   **[Troubleshooting NTLM](../tasks/troubleshoot-ntlm.md)**  
This section provides help for diagnosing and resolving any issues that might arise when configuring NTLM.
-   **[Troubleshooting WebDAV](../concepts/troubleshoot-webdav.md)**  
This section provides help for diagnosing and resolving any issues that might arise when configuring WebDAV.
-   **[OpenLDAP tips](../concepts/auth-ldap-openldaptips.md)**  
This section shows a sample configuration file.
-   **[Active Directory tips](../concepts/auth-ldap-ADtips.md)**  
This section describes the tips for using Active Directory with the LDAP synchronization.
-   **[Troubleshooting SMTP inbound email using StartTLS](../concepts/troubleshoot-inboundemail.md)**  
For StartTLS support to work for inbound email, you must configure SSL for Java.
-   **[Handling a higher rate of outbound TCP connections](../tasks/alf-win-regedit.md)**  
If you are using the Alfresco Web Services API on a Windows client and frequently see errors such as `java.net.BindException: Address already in use: connect` in the client application, you may need to tune the client operating system parameters so that it can handle a higher rate of outbound TCP connections.
-   **[Troubleshooting IMAP](../tasks/troubleshooting-imap.md)**  
This error message relates to the IP address or hostname that has been supplied for binding.

**Parent topic:**[Welcome](../concepts/welcome-infocenter.md)

