---
author: [Alfresco Documentation, Alfresco Documentation]
audience: 
category: [Alfresco Server, Installation]
---

# Validating the environment

The following environment-specific items must be validated prior to installing Alfresco Content Services.

**Note:** An Environment Validation tool is also available that can validate most of the following requirements. This tool is available from the [Support Portal](http://support.alfresco.com). All versions are also available on the Nexus server at [https://artifacts.alfresco.com/nexus/index.html\#nexus-search;quick~alfresco-environment-validation](https://artifacts.alfresco.com/nexus/index.html#nexus-search;quick~alfresco-environment-validation).

1.  Validate that the host name of the server can be resolved in DNS.

    This is required if you're configuring in a cluster.

    **Note:** Using an incorrect host name or a host name that no longer resolves to its own IP address can give an internal error, such as `ObjID already in use`. You can get more information about this error by adding the following line into the log4j.properties file:

    ```
    log4j.logger.org.springframework.remoting.rmi.RmiServiceExporter=debug
    ```

    To resolve this error, you can either:

    -   Validate that the IP address and the host name of the server are correctly set in the /etc/hosts file. For example, if you set the IP address as `10.20.30.40` and the host name as `ip-10-20-30-40`, the content of the /etc/hosts file should contain the following entry:

        ```
        10.20.30.40 ip-10-20-30-40 
        ```

    -   Specify the correct IP address in the alfresco-global.properties file as shown:

        ```
        alfresco.rmi.services.host=10.20.30.40
        ```

2.  Validate that the user Alfresco Content Services will run as can open sufficient file descriptors \(4096 or more\).

3.  Validate that the ports on which Alfresco Content Services listens are available:

    **Note:** The ports listed in the following table are the defaults. If you are planning to reconfigure to use different ports, or wish to enable additional protocols \(such as HTTPS, SMTP, or IMAP\), update this list with those port numbers.

    |Protocol|Port number|Notes|
    |--------|-----------|-----|
    |FTP|TCP 21|On Unix-like operating systems that offer so-called “privileged ports”, Alfresco Content Services will normally be unable to bind to this port, unless it is run as the root user \(which is not recommended\). In this case, even if this port is available, Alfresco Content Services will still fail to bind to it, however for FTP services, this is a non-fatal error. The FTP functionality will be disabled in the repository.|
    |SMTP|TCP 25|SMTP is not enabled by default.|
    |SMB/NetBT:|UDP 137,138||
    |SMB/NetBT:|TCP 139,445|On Unix-like operating systems that offer so‐called “privileged ports”, Alfresco Content Services will normally be unable to bind to this port, unless it is run as the root user \(which is not recommended\). In this case, even if this port is available, Alfresco Content Services will still fail to bind to it, however for CIFS services, this is a non-fatal error. The CIFS functionality will be disabled in the repository.|
    |IMAP|TCP 143|IMAP is not enabled by default.|
    |Tomcat Administration|TCP 8005||
    |HTTP|TCP 8080||
    |RMI|TCP 50500||

4.  Validate that the installed Oracle JVM is version 1.7 or 1.8.

5.  Validate that the directory in which the JVM is installed does not contain spaces.

6.  Validate that the installation directory does not contain spaces.

7.  Validate that the directory to be used for the repository \(typically called alf\_data\) is both readable and writeable by the operating system user that the process will run as.

8.  Validate that you can connect to the database as the Alfresco Content Services database user, from the server.

    Ensure that you install the database vendor's client tools on the server.

9.  Validate that the character encoding for the database is UTF-8.

10. \(MySQL only\) Validate that the storage engine for the database is InnoDB.

11. Validate that the following third-party software is installed and the correct versions:

    1.  ImageMagick v6.2 or newer

12. \(RHEL and Solaris only\) Validate that LibreOffice is able to run in headless mode.


**What to do next:**

[Go to the installing  flowchart](../concepts/install-singleinstance.md)

[Go to upgrading  flowchart](../concepts/upgrade-singleinstance.md)

**Parent topic:**[Environment checklist](../concepts/configuration-checklist.md)

