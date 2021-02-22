---
author: [Alfresco Documentation, Alfresco Documentation]
audience: 
category: 
option: 
---

# Applying a Smart Folder Template

You can apply a Smart Folder structure to a physical folder by using aspects.

1.  In a site, select Document Library.

2.  Click Create, then Folder to create a new folder. Enter the folder name and Save.

    Alternatively, select an existing physical folder. A physical folder is one that you have created: ![Physical folder icon](../images/folder.png)

3.  Hover over the folder and from the menu, select More, then Manage Aspects.

4.  In the Select Aspects window, add one or more of the predefined Smart Folder aspects \(System Smart Folder or Custom Smart Folder depending on the templates added by your organization\), and Save.

    Ask your business analyst or system adminstrator whether System or Custom Smart Folders are set up for your organization.

5.  Hover again over the new folder and from the menu, select Edit Properties, and All Properties. Select the Smart Folder Template that you want, and Save.

    If your system administrator has created templates for your organization, you can find these by drilling down to Data Dictionary/Smart Folder Templates.

    System administrators can find more information about the templates here: [Enabling Smart Folders](sf-config-examples.md).

    The physical folder that you selected now has a Smart Folder structure under it, containing files that apply to the search criteria in the Smart Folders Template. For example, if you apply the standard smartFoldersExample.json template, you have a number of folders:

    -   My Content: every file in the repository, containing:
    -   All site content \(Documents and Multimedia Files, filed according to type\)
    -   This folder's content \(Documents and Multimedia Files, filed according to type\)
    -   Contributions
    -   My content modified by other users
    -   User home
    -   Tagged 'Confidential'
    Folders contain files according to what files you have in your site. For example, if you have created audio files in the site, you will see these if you drill down to All site content/Multimedia Files/Audio content and any specific to this physical folder in This folder's content/Multimedia Files/Audio content. Any of your files that are marked as Confidential in the metadata appear in the Tagged 'Confidential' folder.


**Parent topic:**[Using Smart Folders](../concepts/sf-using-intro.md)

