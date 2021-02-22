---
author: [Alfresco Documentation, Alfresco Documentation]
source: 
audience: 
---

# Installing the Alfresco Outlook Client in Microsoft Outlook

Inside the Alfresco Outlook Integration zip is another zip file, which installs the Alfresco Outlook Client into Microsoft Outlook.

You might need local administrator rights to install .NET 3.5 and Microsoft VS Tools for Office Runtime. Ensure you have already installed the required AMP files in your Alfresco instance. See [Installing Alfresco Outlook Integration](Outlook-amp.md) for more information.

1.  Extract the contents of the alfresco-outlook-client-1.1.2-alfresco41.zip file using a standard unzip tool.

2.  Navigate to the directory containing the unzipped content and double click the install.bat file.

    The Alfresco Outlook Client installer checks whether the required components already exist on the system. The required files are installed and the Alfresco Outlook Client installer wizard opens.

3.  Read the copyright information and click **Next**.

4.  Specify the folder where you would like Alfresco to be installed and click **Next**.

    Alternatively, accept the default path specified.

5.  Specify the folder where you would like to store user specific settings, and click **Next**.

    Settings are stored in the default user profile folder if you do not specify a folder.

6.  Click **Next** to confirm that the installation can start.

7.  Select your preferred language, and click **Continue**.

8.  Click **Close** to complete the installation.

9.  Open Microsoft Outlook.

    There is a new Alfresco Client tab on the toolbar. Click this tab to see new options for configuring the Alfresco Outlook Client.

    If you did not enter a client license key in Alfresco Share, you must enter one when you open Microsoft Outlook. Navigate to Alfresco Client \> Configure \> License to enter your key.


Microsoft Outlook now includes the Alfresco Outlook Client.

**Parent topic:**[Installing Alfresco Outlook Integration](../tasks/Outlook-amp.md)

