---
author: [Alfresco Documentation, Alfresco Documentation]
audience: 
category: Extensions/Third Party
---

# Installing the Standalone Document Transformation Server

This section describes how to install the Standalone Document Transformation Server.

Before you start the installation, verify that you have:

-   Installed and activated the correct software \(see [Standalone Document Transformation Server prerequisites](../concepts/transerv-standalone.md)\)
-   Logged on to the Windows Server as a user with administrator rights

1.  Double click the MSI installer package alfresco-5.0-documenttransformationserver-server.msi.

    The Welcome screen opens. 

2.  Click **Next**.

    The license information screen displays. 

3.  Click **Next**.

4.  Select an installation folder or accept the default folder, and then click **Next**.

5.  Click **Next** to start the installation. 

    You see a progress bar and a command line window during the installation. The installer will show a confirmation when the installation is finished.

6.  In the Cluster Settings window, specify the log database host and cluster node name if you have more than one Document Transformation Server. If you have only one Document Transformation Server, select the relevant radio button. Click **OK** to continue.

7.  Click **Close** to complete the installation.

8.  9.  Verify that the installation has completed successfully.

    1.  Check the Windows Services in the management console. 

    2.  Locate the new service called **Document Transformation Server**, and check that it is **Started**.


**Note:** Each time a file is transformed in Alfresco, the .NET program starts and Microsoft Office tries to check for a Certificate Revocation List \(CRL\).

Depending on the access that the Document Transformation Server has to the Internet when transforming a file, this check can delay the operation for up to two minutes, and will therefore, delay transformation of the file.

To prevent this, use the Windows server firewall to block internet access for all office binaries.

**Parent topic:**[Installing the Document Transformation Server](../concepts/transerv-installing.md)

