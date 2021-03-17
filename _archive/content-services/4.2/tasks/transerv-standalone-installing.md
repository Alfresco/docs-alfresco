---
author: [Alfresco Documentation, Alfresco Documentation]
audience: 
category: Extensions/Third Party
---

# Installing the standalone Document Transformation Server

This section describes how to install the standalone Document Transformation Server.

Before you start the installation, verify that you have:

-   installed and activated Windows 2008 Server
-   installed and activated Microsoft Office 2010
-   logged on to the Windows Server as a user with administrator rights

1.  Double click the MSI installer package alfresco-documenttransformationserverserver.msi.

    The Welcome screen opens. 

2.  Click **Next**.

    The license information screen displays. 

3.  Click **Next**.

4.  Select an installation folder or accept the default folder, and then click **Next**.

5.  Select the TCP/IP ports used by the Document Transformation Server. 

    The default values are 8080 \(HTTP\) and 8443 \(HTTPS\) but you can also use the standard ports 80 and 443 \(or any other port\) if this fits better into your network infrastructure.

6.  Click **Next** to start the installation. 

    You see a progress bar and a command line window during the installation. The installer will show a confirmation when the installation is finished.

7.  Click **Next** to finish the installation.

8.  Verify that the installation has completed successfully.

    1.  Check the Windows Services in the management console. 

    2.  Locate the new service called **Transformation Service**, and check that it is **Started**.


**Note:** Each time a file is transformed in Alfresco, the .NET program starts and Microsoft Office tries to check for a Certificate Revocation List \(CRL\).

Depending on the access that the Document Transformation Server has to the Internet when transforming a file, this check can delay the operation for up to two minutes, and will therefore, delay transformation of the file.

To prevent this, use the Windows server firewall to block internet access for all office binaries.

**Parent topic:**[Installing the Document Transformation Server](../concepts/transerv-installing.md)

