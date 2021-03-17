---
author: [Alfresco Documentation, Alfresco Documentation]
---

# Troubleshooting

Help for diagnosing and resolving any Alfresco Content Services issues that you might encounter.

For additional help, refer to the following:

-   Support Portal \([https://support.alfresco.com](https://support.alfresco.com)\)
-   Alfresco Hub \([https://hub.alfresco.com/](https://hub.alfresco.com/)\)
-   **Admin Console**: see [Launching the Admin Console](../tasks/adminconsole-open.md) for more information
-   **Admin Tools** in Alfresco Share to view various installation and setup information

-   **[Setting log levels](../tasks/log-levels-set.md)**  
The log4j.properties file lets you configure logging levels to provide debugging information when troubleshooting. To set up logging policies, you must prepend `log4j.logger` to the class name you want to log to, and set the logging level. You can set the log level dynamically using the JMX client.
-   **[Error messages](../concepts/troubleshoot-install.md)**  
Use this information to help troubleshoot your installation.
-   **[Using the Node Browser](../tasks/adminconsole-nodebrowser.md)**  
Use Node Browser in the Admin Console or in Share Admin Tools as an debugging aid to browse the raw repository structure. This feature is intended for developers responsible for customizing the application.
-   **[Debugging an installation](../tasks/debug-installation.md)**  
When developing add-ins, fixing bugs, or changing Alfresco Content Services from the source code, it is helpful to debug an instance running on a standard application server. You can configure Alfresco Content Services and Eclipse to provide a real-time view of the server and to troubleshoot issues by stepping through the code line by line.
-   **[Troubleshooting an upgrade](../tasks/troubleshoot-upgrade.md)**  
Use these tips for diagnosing and resolving any issues that might arise as a result of an upgrade.
-   **[Troubleshooting rules and actions](../concepts/troubleshooting-type.md)**  
Use these troubleshooting tips when working with rules and actions.
-   **[Troubleshooting clustering](../concepts/troubleshooting-conf.md)**  
Use these troubleshooting tips when testing cache clustering.
-   **[Troubleshooting LibreOffice subsystems](../tasks/troubleshoot-openoffice.md)**  
Use these tips for troubleshooting the LibreOffice subsystems.
-   **[Troubleshooting the JMX Dumper](../concepts/troubleshoot-JMXdumper.md)**  
Use this information if you need to troubleshoot the JMX Dumper.
-   **[Troubleshooting CIFS](../concepts/troubleshoot-cifs.md)**  
Use this information for diagnosing and resolving any issues when configuring CIFS.
-   **[Troubleshooting NTLM](../tasks/troubleshoot-ntlm.md)**  
Use this information for diagnosing and resolving any issues that might arise when configuring NTLM.
-   **[Troubleshooting WebDAV](../concepts/troubleshoot-webdav.md)**  
Diagnose and resolve issues that might arise when configuring WebDAV.
-   **[OpenLDAP tips](../concepts/auth-ldap-openldaptips.md)**  
Use these tips when working with OpenLDAP.
-   **[Active Directory tips](../concepts/auth-ldap-ADtips.md)**  
Tips for using Active Directory with the LDAP synchronization.
-   **[Troubleshooting SMTP inbound email using StartTLS](../concepts/troubleshoot-inboundemail.md)**  
For StartTLS support to work for inbound email, you must configure SSL for Java.
-   **[Handling a higher rate of outbound TCP connections](../tasks/alf-win-regedit.md)**  
If you are using the Web Services API on a Windows client and frequently see errors such as `java.net.BindException: Address already in use: connect` in the client application, you might need to tune the client operating system parameters so that it can handle a higher rate of outbound TCP connections.
-   **[Troubleshooting IMAP](../concepts/troubleshoot-imap.md)**  
Use this information to troubleshoot IMAP problems.
-   **[Troubleshooting schema-related problems](../concepts/schema-diff-tool-intro.md)**  
The Schema Difference Tool provides a way of identifying and troubleshooting problems in database schemas.

**Parent topic:**[Alfresco Content Services](../concepts/welcome.md)

