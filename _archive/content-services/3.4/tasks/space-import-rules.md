---
author: [Alfresco Documentation, Alfresco Documentation]
audience: 
category: Administration
option: import space rules ACP
---

# Using rules to import to a space

You can use a rule in a space to import a file to the same space or to another space in which you have permissions.

1.  Browse to the space into which you want to import.

2.  Click **More Actions**.

3.  In the menu, click **Manage Content Rules**.

4.  Click **Create Rule** to open the Create Rule Wizard.

5.  In the Select Condition menu, click **Items which contain a specific value in its name**.

6.  Click **Set Values and Add**.

7.  In File name pattern, type \*.acp.

8.  Click **OK**, and then click **Next**.

9.  In Select Action, click **Import an Alfresco content package**.

10. Click **Set Values and Add**.

11. In Import To, click the space to which you want to import.

12. Click **OK** twice, and then click **Next** to open the Enter Details pane.

13. In the Type menu, click **Inbound**.

14. In Title, type a meaningful name for the rule to identify the rule from any other rules that might apply in the space.

15. In Description, type a meaningful description that allows other users to understand what the rule does.

16. Deselect **Apply rule to sub spaces**.

17. Check **Run rule in background**.

18. Click **Next**, and then click **Finish**.


Test the rule by inserting an ACP file in the space that corresponds to space containing the import rule. The import process starts and places the items held in the ACP file into the destination folder specified with "Import To".

The import will be initiated regardless of how the ACP file was placed into the folder. For example, the import will initiate if the ACP file was placed there using CIFS, FTP, WebDAV, Explorer, or API. This is particularly powerful for system to system data integration.

**Parent topic:**[Exporting and importing](../concepts/import-export.md)

