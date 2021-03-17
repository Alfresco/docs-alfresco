---
author: [Alfresco Documentation, Alfresco Documentation]
audience: 
category: 
option: 
---

# 3. \(Optional\) Creating a rule to define your Smart Folder structure

You can create a simple folder rule to add an aspect automatically to your folder structure.

To simplify the creation of a claim folder, you can create a folder rule to add the clex:claimFolder aspect automatically to any new claim folder.

1.  Upload the `addAspect_claimsFolder.js` file from smartfolders-master/tutorials in your Downloads directory to the Repository/Data Dictionary/Scripts directory in Alfresco Content Services.

    This file provides additional function that is not available in the standard aspect and property settings.

2.  Click the site Document Library and drill down to the Smart Folders Tutorial/Claims Application folder.

    It's important that you create the rule for the Claims folder so that all sub folders will have the aspect that marks them as a claim.

3.  Click the Claims folder and from the menu, click More then Manage Rules, and Create Rules.

4.  Give the rule a name \(Add Claims Folder aspect\) and a description \(Adds clex:claimFolder aspect and converts folder to a claim structure\). Use the following options for the remaining fields:

    -   Select Define Rule When: and Items are created or enter this folder
    -   Check If all criteria are met: and select Content of type or sub-type is folder
    -   Select Perform Action: and Execute script, and select the `addAspect_claimsFolder.js` file
    **Note:** Make sure that these options are not selected:

    -   Rule applies to subfolders
    -   Run rule in background
5.  When you are done, click Create.


**Parent topic:**[Smart Folders tutorial](../tasks/sf-tutorial.md)

