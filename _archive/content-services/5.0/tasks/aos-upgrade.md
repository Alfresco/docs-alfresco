---
author: [Alfresco Documentation, Alfresco Documentation]
source: 
audience: 
---

# Upgrading Alfresco Office Services from a previous version of Alfresco

AOS replaces the Microsoft SharePoint Protocol Support that was delivered as a separate AMP file in previous versions of Alfresco. Use this information if you are a previous user of Microsoft SharePoint Protocol Support and need to upgrade.

AOS is delivered as part of the standard Alfresco installation.

1.  Upgrade Alfresco, as described in [Upgrading Alfresco general procedure](upgrade-process.md).

    **Note:** If you are not using the installer, it is very important that you install the ROOT.war and \_vti\_bin.war files that are required for AOS. See [Installing the Alfresco WARs](alf-war-install.md) for information on how to do this.

2.  Launch Alfresco Share.

    Test that you can edit your Microsoft Office documents by using the right-click Edit online option on any Office document in Alfresco Share.

3.  Alternatively, open a Microsoft Office application \(for example, Word\) and select the File tab and Open. Enter the Alfresco server address in the File name field in the format: http://servername:portnumber/alfresco/aos and browse to a folder to edit an Office document.

    Any version history from the previous version of Alfresco will not be available in Microsoft Office, but is available in Alfresco Share.


**Parent topic:**[Installing and configuring Alfresco Office Services](../concepts/aos-intro.md)

