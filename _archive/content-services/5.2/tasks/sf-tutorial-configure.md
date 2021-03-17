---
author: [Alfresco Documentation, Alfresco Documentation]
audience: 
category: 
option: 
---

# 2. Configuring claims management

To configure the claims framework, add the sample template to the Data Dictionary and enable the claims aspect.

The example data model that you imported in the previous task contains the `clex:claimFolder` aspect. This aspect defines the metadata for a claim, and also marks a folder as being used to contain claim information. Make sure that you have downloaded the [Smart Folders tutorial files](https://github.com/vhemmert/smartfolders/tree/master/tutorial) before proceeding with this task.

1.  Stop Alfresco Content Services, and edit your alfresco-global.properties file to specify the following settings:

    ```
    smart.folders.enabled=true
    smart.folders.config.type.templates.qname.filter=clex:claimFolder
    ```

    The `smart.folders.config.type.templates.qname.filter` property specifies the custom type or aspect of the contents of the Smart Folder Template.

2.  Restart Alfresco Content Services.

3.  Browse to smartfolders-master/tutorials in your Downloads directory, and locate the `clex_claimFolder.json` file.

    This is the Smart Folder Template.

    This file matches the `clex:claimFolder` aspect, so that any folder type with the `clex:claimFolder` aspect applied to it should use the `clex_claimFolder.json` Smart Folder Template for its folder structure.

    Adding this aspect and Smart Folder Template means that you are using Type-based Smart Folders.

4.  In Alfresco Share, click Repository then Data Dictionary, and copy `clex_claimFolder.json` into the Smart Folder Templates folder.

    You'll see the default `smartFoldersExample.json` Smart Folder Template is already in this folder.

    **Note:** You need system administrator rights to upload this file.


You are now ready to create a new claim.

**Parent topic:**[Smart Folders tutorial](../tasks/sf-tutorial.md)

