---
author: [Alfresco Documentation, Alfresco Documentation]
audience: 
---

# Opening Alfresco files from Windows Explorer \(Windows users\)

You can open files stored in Alfresco directly from Windows Explorer.

You can do this by either [mapping a network drive to Alfresco](aos-map-drive.md) or by entering a modified URL into the Windows Explorer address bar.

All you need is to have an internet connection and the Alfresco URL where the file is stored.

1.  Open Windows Explorer and enter the Alfresco address in the address bar.

    This needs to be entered in a different way to when you're mapping a network drive or opening a file from Microsoft Office. There are two ways to enter this depending on if you're connecting to Alfresco server or Alfresco Cloud; check with your Alfresco administrator if you need more information.

    **Alfresco server**

    If your Alfresco address is

    *https://mycompany.com*

    then you'd enter

    *\\\\mycompany.com@SSL\\DavWWWRoot\\alfresco\\aos*

    **Alfresco Cloud**

    If you Alfresco address is

    *https://my.alfresco.com/mycompany.com/sitename/*

    then you'd enter

    *\\\\sp.alfresco.com@SSL\\DavWWWRoot\\mycompany.com\\sitename*

    For Alfresco Cloud you always need to enter a site name. For both Alfresco server and Alfresco Cloud you can enter URLs that are specific to a site, folder, or file, for example, *\\\\mycompany.com\\DavWWWRoot\\alfresco\\aos\\Sites\\sitename\\documentLibrary\\foldername\\filename* for Alfresco server and *\\\\sp.alfresco.com@SSL\\DavWWWRoot\\mycompany.com\\sitename\\foldername\\filename* for Alfresco Cloud.

    -   Site or folder-specific URL - browse through the site or folder to find the file you want
    -   File-specific URL - open the file directly
2.  If prompted enter your Alfresco user name and password.


You can now browse Alfresco and work with files through Windows Explorer without the need to access Alfresco through Chrome, Firefox, or another web browser.

**Parent topic:**[Using Alfresco from Microsoft Office](../concepts/aos-user.md)

