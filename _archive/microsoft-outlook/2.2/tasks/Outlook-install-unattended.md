---
author: Alfresco Documentation
source: 
audience: 
---

# Installing the Alfresco Outlook Client in unattended mode

You can automate the Alfresco Outlook Client installation by using the msiexec command.

You might need local administrator rights to install .NET 3.5 and Microsoft VS Tools for Office Runtime. Ensure you have already installed the required AMP files in your Alfresco instance. See [Installing Alfresco Outlook Integration](Outlook-amp_v2.md) for more information.

1.  Extract the contents of the alfresco-outlook-client-2.2.0.zip file using a standard unzip tool.

2.  Locate x64/AlfrescoOutlookClient\_x64\_2.2.0.msi or x86/AlfrescoOutlookClient\_x86\_2.2.0.msi, depending on whether you are running a 64-bit or 32-bit version of Windows.

3.  From a command line, navigate to the x64 or x86 directory, and run the msiexec command. For example:

    ```
    msiexec /i AlfrescoOutlookClient\_x86\_2.2.0.msi HOST=127.0.0.1:8080 AUTH=basic
    ```

    for an interactive installation, or:

    ```
    msiexec /i AlfrescoOutlookClient\_x86\_2.2.0.msi HOST=127.0.0.1:8080 AUTH=basic /quiet
    ```

    for an installation with no interaction.

    **Note:** Microsoft Office Primary Interop Assemblies are also installed, if they do not already exist in your version of Microsoft Office.

    Here is a full list of parameters that can be used with the `msiexec` command:

    |Parameter|Values|Description|
    |---------|------|-----------|
    |`HOST`|Format: `<http|https>://<hostname>:<port>`|Sets the Alfresco server URL. Port is optional.|
    |`SHARE`|Default: `share`|Sets context to Alfresco Share.|
    |`ALFRESCO`|Default: `alfresco`|Sets context to the Alfresco repository.|
    |`CULTURE`|`en|de|es|it|fr|ja|ru|zh-cn|pt-br|nl|nb-no` Default: `en`|Sets language for Alfresco Outlook Client.|
    |`SHAREALT`|No default|Sets alternative URL for Alfresco Share.|
    |`AUTH`|`basic|windows|saml`|Sets authentication type.|
    |`APPTITLE`|Default: Alfresco Outlook Plugin|Sets a custom title for Alfresco Outlook Client. Format: `"My Custom Title"`|

4.  Verify that Alfresco Outlook Client has installed in Microsoft Outlook.

    You will see an Alfresco Client tab on the toolbar. Click this tab to view options for configuring the Alfresco Outlook Client.

    If you did not enter a client license key in Alfresco Share, you must enter one when you open Microsoft Outlook. Navigate to Alfresco Client \> Configure \> License to enter your key.


**Parent topic:**[Installing the Alfresco Outlook Client in Microsoft Outlook](../tasks/Outlook-install_v2.md)

