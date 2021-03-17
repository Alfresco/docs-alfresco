---
author: [Alfresco Documentation, Alfresco Documentation]
audience: 
category: 
option: 
---

# 6. Applying multiple templates

You can use multiple Smart Folder Templates at the same time, to help you find your content more easily.

You can add System or Custom Smart Folders to your structure to use alongside the Type-based Smart Folders that you have already applied.

1.  In Alfresco Share, click Repository and Data Dictionary, and copy `claimsApplication.json` from [Smart Folders tutorial files](https://github.com/vhemmert/smartfolders/tree/master/tutorial) into the Data Dictionary/Smart Folder Templates folder.

    You'll see the `smartFoldersExample.json` sample file \(and any other templates you have added\) already in this folder.

2.  Select the `claimsApplication.json` file. In Document Actions select Change Type and select `Smart Folder Template` as the new type, and OK.

3.  Click the site Document Library and drill down to the Smart Folders Tutorial folder.

4.  Hover over the Claims Application folder and from the menu select More then Manage Aspects. Add the System Smart Folder \(smf:systemConfigSmartFolder\) aspect, and Save.

    Adding this aspect allows you to select a Smart Folder Template that is in the Data Dictionary/Smart Folder Templates directory.

    Alternatively, select the Custom Smart Folder \(smf:custom-ConfigSmartFolder\) and select a template from anywhere in your repository.

    **Note:** You can add a single template only to a folder. If you select both the System Smart Folder \(smf:systemConfigSmartFolder\) and Custom Smart Folder \(smf:customConfigSmartFolder\) aspects, the system aspect overrides the custom aspect.

5.  Hover over the Claims Application folder and from the menu select Edit Properties and All Properties.

6.  In the Smart Folder Template field, select the `claimsApplication.json` Smart Folder Template.

    If you need to navigate to the template, it lives in Repository/Data Dictionary/Smart Folder Templates.

7.  In the site Document Library, click the Claims Application folder.

    You'll see the new folder hierarchy displayed, showing Claims by type, My open claims, and Policy documents. These Smart Folders are displayed in addition to the Smart Folders we set up under the Claims Application folder.


**Parent topic:**[Smart Folders tutorial](../tasks/sf-tutorial.md)

