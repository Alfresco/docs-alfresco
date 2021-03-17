---
author: Alfresco Documentation
source: 
audience: 
---

# Installing the Alfresco Outlook Client in Microsoft Outlook

Inside the Alfresco Outlook Integration zip is another zip file, which installs the Alfresco Outlook Client into Microsoft Outlook.

You might need local administrator rights to install .NET 3.5 and Microsoft VS Tools for Office Runtime. Ensure you have already installed the required AMP files in your Alfresco instance. See [Installing Alfresco Outlook Integration](Outlook-amp_v2.md) for more information.

**Note:** If you are distributing Alfresco Outlook Client across an organization, see [Installing the Alfresco Outlook Client in unattended mode](Outlook-install-unattended.md) for guidance on installing in unattended mode.

1.  Extract the contents of the alfresco-outlook-client-2.1.0.zip file using a standard unzip tool.

2.  Navigate to the directory containing the unzipped content and double click the install.bat file.

    The Alfresco Outlook Client installer checks whether the required components already exist on the system. The required files are installed and the Alfresco Outlook Client installer wizard opens.

3.  Read the copyright information and click **Next**.

4.  Specify the folder where you would like the Outlook Client to be installed and click **Next**.

    Alternatively, accept the default path specified.

5.  Click **Next** to confirm that the installation can start.

6.  Select your preferred language, and click **Continue**.

    Microsoft Office Primary Interop Assemblies are also installed, if they do not already exist in your version of Microsoft Office.

7.  Click **Close** to complete the installation.

8.  Open Microsoft Outlook.

    You will see an Alfresco Client tab on the toolbar. Click this tab to view options for configuring the Alfresco Outlook Client.

    If you did not enter a client license key in Alfresco Share, you must enter one when you open Microsoft Outlook. Navigate to Alfresco Client \> Configure \> License to enter your key.


-   **[Installing the Alfresco Outlook Client in unattended mode](../tasks/Outlook-install-unattended.md)**  
You can automate the Alfresco Outlook Client installation by using the msiexec command.

**Parent topic:**[Installing Alfresco Outlook Integration](../tasks/Outlook-amp_v2.md)

