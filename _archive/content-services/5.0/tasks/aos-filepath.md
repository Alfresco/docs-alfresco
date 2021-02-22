---
author: [Alfresco Documentation, Alfresco Documentation]
source: 
audience: 
---

# Setting up a global filepath to access Alfresco

In Windows Explorer, you can set up a Group Policy to manage Favorites on client machines, or share a .lnk file in your Links folder. This can be useful if you want to preconfigure the folder that users will need to access the Alfresco repository from Microsoft Office \(http://servername:port/alfresco/aos\).

On a Windows 7 machine, the contents of Favorites in Windows Explorer is assembled from the .lnk files in C:\\Users\\username\\Links. You can create a .lnk file in your Links folder and distribute this to the Links folder of other users, or preferably, you can use a Group Policy to manage Favorites on user machines. Follow these steps to use a Group Policy:

1.  In the Group Policy Management Console, navigate to User Configuration\\Preferences\\Window Settings\\Shortcuts.

2.  Create a new shortcut \(Group Policy Object\) to a folder \(not a link to a URL\) with the following UNC target path:

    ```
    \\\\servername@SSL\\DavWWWRoot\\alfresco\\aos
    ```

    Alternatively, you can specify @port instead of @SSL, but not both. If you use SSL, it must use the default port of `443`.

    For more information, see [Configure a Shortcut Item](http://technet.microsoft.com/en-gb/library/cc753580.aspx).


**Parent topic:**[Configuring Alfresco Office Services](../concepts/aos-config.md)

