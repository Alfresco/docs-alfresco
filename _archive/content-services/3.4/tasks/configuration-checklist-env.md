---
author: [Alfresco Documentation, Alfresco Documentation]
source: 
audience: 
category: [Alfresco Server, Installation]
keyword: [install, check list, architecture, environment, validation]
---

# Validating the environment

The following environment-specific items must be validated prior to installing Alfresco.

**Note:** An Environment Validation tool is also available that can validate most of the following requirements. This tool is available from the Alfresco Support Portal in **Online Resources \> Knowledge base** [http://support.alfresco.com](http://support.alfresco.com).

1.  Validate that the host name of the server can be resolved in DNS.

    This is required if Alfresco is going to be configured in a cluster.

2.  Validate that the user Alfresco will run as can open sufficient file descriptors \(4096 or more\).

3.  Validate that the ports on which Alfresco listens are available:

    **Note:** The ports listed in the following table are the defaults. If you are planning to reconfigure Alfresco to use different ports, or wish to enable additional protocols \(such as HTTPS, SMTP, IMAP or NFS\), update this list with those port numbers.

    |Protocol|Port number|Notes|
    |--------|-----------|-----|
    |FTP|TCP 21|On Unix-like operating systems that offer so-called “privileged ports”, Alfresco will normally be unable to bind to this port, unless it is run as the root user \(which is not recommended\). In this case, even if this port is available, Alfresco will still fail to bind to it, however for FTP services, this is a non-fatal error. The Alfresco FTP functionality will be disabled in the repository.|
    |SMTP|TCP 25|SMTP is not enabled by default.|
    |SMB/NetBT:|UDP 137,138||
    |SMB/NetBT:|TCP 139,445|On Unix-like operating systems that offer so‐called “privileged ports”, Alfresco will normally be unable to bind to this port, unless it is run as the root user \(which is not recommended\). In this case, even if this port is available, Alfresco will still fail to bind to it, however for CIFS services, this is a non-fatal error. The Alfresco CIFS functionality will be disabled in the repository.|
    |IMAP|TCP 143|IMAP is not enabled by default.|
    |SharePoint Protocol|TCP 7070|This port is only required if you install support for the SharePoint Protocol.|
    |Tomcat Administration|TCP 8005||
    |HTTP|TCP 8080||
    |RMI|TCP 50500||

4.  Validate that the installed JVM is Sun version 1.6.

5.  Validate that the directory in which the JVM is installed does not contain spaces.

6.  Validate that the directory in which Alfresco is installed does not contain spaces.

7.  Validate that the directory Alfresco will use for the repository \(typically called alf\_data\) is both readable and writeable by the operating system user that the Alfresco process will run as.

8.  Validate that you can connect to the database as the Alfresco database user, from the Alfresco server.

    Ensure that you install the database vendor's client tools on the Alfresco server.

9.  Validate that the character encoding for the Alfresco database is UTF-8.

10. \(MySQL only\) Validate that the storage engine for the Alfresco database is InnoDB.

11. Validate that the following third-party software is installed and the correct versions:

    1.  OpenOffice v3.1 or newer

    2.  ImageMagick v6.2 or newer

12. \(RHEL and Solaris only\) Validate that OpenOffice is able to run in headless mode.


**Parent topic:**[Production environment checklist](../concepts/configuration-checklist.md)

