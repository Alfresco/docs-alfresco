---
author: [Alfresco Documentation, Alfresco Documentation]
audience: 
category: Administration
option: export content administration console
---

# Exporting a space and its contents

The Export function in the Administration Console enables you to copy an Alfresco space and its contents.

Exporting a space differs from copying a space in that the export function bundles all rules, workflow, properties, and metadata associated with the space into an Alfresco Content Package \(ACP\). You can import the ACP to a different space within Alfresco or into another Alfresco repository altogether.

1.  Navigate to the space you want to export.

    The space header displays the name and details of the space.

2.  In the toolbar, click ![Administration Console](../images/im-adminconsole.png) **\(Administration Console\)**.

3.  Click **Export**.

    The space header indicates the space selected for export.

4.  On the Export page, type a name for the export package \(ACP\).

5.  Select a destination location to store the resulting ACP file.

6.  Select **Current Space** as what you would like to export from.

    1.  Check **Include Children** if you want to export sub spaces.

    2.  Check **Include this Space**if you want to export the selected space as well as the children.

7.  Check **Run export in background**if you want the export to occur while you are still working.

8.  Click **OK**.

    The ACP file is created and stored in the destination location.

9.  Click **Close** to return to the current space.


**Parent topic:**[Administering Explorer from the Administration Console](../topics/guh-hdg-administration.md)

