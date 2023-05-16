---
title: Security Controls
---

You can add Security Controls to files and folders so that only users with the required security level can view or access them.
These security controls are created and configured using the Control Center and are applied to your files or folders from within the Digital Workspace. The Security Controls you create are made up of Controls created in the Control Center which are in turn made up of one or more Security Marks. You can create as many Security Marks that you require within the different Controls. The names of the Controls and Security Marks you create will be unique to your organization.

There are three different ways you can configure your Controls:

* **All** = Users must have all Security Marks from the group that are applied to a file to see that file.

    Example: A Security Group named Training contains Security Marks of Media and Data Handling. To see a file marked as both Media or Data Handling, a user must have both Media and Data Handling clearance.

* **Any** = Users must have at least one of the Security Marks from the group that are applied to a file to see that file.

    Example: A Security Group named Nationality contains Security Marks of UK, US, and Aus. To see a file marked as UK and US, a user must have UK and / or US clearance.

* **Hierarchical** = Security Marks are ranked in the order they're created. The mark created first in a security group has the greatest clearance, the one created last the least clearance.

    Example: The predefined Classification group has marks of Top Secret, Secret, and Classified. To see a file classified as Secret, the user must have Secret or Top Secret clearance.

## Security Controls in the Control Center

Use this example to create an **All** Control in the Control Center called Training that has three Security Marks, **Media**, **Data handling**, and **Backend management**.

> **Important:** All Security Marks you create are visible to all users within the Digital Workspace.

### Create Controls and Security Marks

Use the Control Center to create Controls.

1. Log into the Control Center as an administrator.

2. Expand the **Security** entry in the left pane and then click **Security Controls**.

    You can view and edit all of your Controls from here.

3. Click **Create New Control**.

4. Enter `Training` in the **Control Name** field.

5. Select **All** from the **Configuration** drop-down list.

    You can see from the example diagram the user has `Mark 2` security rights. When **All** is selected from the **Configuration** drop-down list it means they can only access files or directories that only have `Mark 2` Security Marks assigned to them.

6. Click the **+** symbol next to Security Marks.

7. Enter `Media` into the new row.

8. Click the **+** symbol again next to Security Marks.

9. Enter `Data handling` into the new row.

10. Click the **+** symbol again next to Security Marks.

11. Enter `Backend management` into the new row and then click **Save**.

You have created a new Control called Training that has three Security Marks. The Security Marks will be visible and useable within the Digital Workspace.

![security-controls]({% link digital-workspace/images/security-controls.png %})

## Security Marks in the Digital Workspace

Use the Digital Workspace to assign Security Marks to files and folders. Doing this limits their accessibility from users that do not have the correct user rights.

1. Sign into the Digital Workspace.

2. Right click on the file or folder you want to add Security Marks to and select **Security Marks**.

    You will see all the Security Marks that are available.

3. Select which Security Marks you want assigned to the file or folder and click **Save**.

![security-marks]({% link digital-workspace/images/security-marks.png %})

Once you have saved the Security Marks for the file or folder the ones you have selected will be visible in the Security Marks column.

> **Note:** If you have more than can be displayed in the column you can click the **Display all** button.
