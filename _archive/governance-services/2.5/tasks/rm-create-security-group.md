---
author: Alfresco Documentation
source: 
audience: [, ]
category: [User Help, Getting Started]
option: Records Management
---

# Creating a security group

Each security group is made up of one or more security marks.

These marks can then be assigned to users and content to control which users can see which content.

For example, the predefined security group is Classification and contains the marks Top Secret, Secret, and Confidential. Only users assigned to the Top Secret mark can see files that have been marked as Top Secret. This works in the same way for any additional security groups that you set up.

You can set up additional security groups to match your company requirements, for example, security groups for nationality and job role.

1.  Click **Admin Tools** and then click **Security Controls \> Configure**.

2.  Click **Create Security Group**.

3.  Enter a name for the security group.

4.  Select how security clearance will be applied for this group:

    -   **All security marks applied to the content**= Users must have all security marks from the group that are applied to a file to see that file.

        Example: A Security Group named Training contains security marks of Media and Data Handling. To see a file marked as both Media or Data Handling, then a user must have both Media and Data Handling clearance.

    -   **One or more marks applied to the content** = Users must have at least one of the security marks from the group that are applied to a file to see that file.

        Example: A Security Group named Nationality contains security marks of UK, US, and Aus. To see a file classified as UK and US, then a user must have UK and / or US clearance.

    -   **The same or greater clearance than that of the content** = Security marks are ranked in the order they're created. The mark created first in a security group has the greatest clearance, the one created last the least clearance.

        Example: The predefined Classification group has marks of Top Secret, Secret, and Classified. To see a file classified as Secret, then the user must have Secret or Top Secret clearance.

5.  Click **Create**.

    Once you've created a security group you can:

    -   Click on the group to [add security marks to it](rm-add-marks.md)
    -   Click ![Edit group](../images/ico-configure.png) to edit the group name.
    -   Click ![Delete group](../images/ico-trashcan.png) to delete the group. You can't delete a group if it contains marks that are assigned to content.

        **Note:** No-one else can access a security group until you add security marks to it.

        Once marks are added to the group, only users who have been assigned one of the marks can see the group.


**Parent topic:**[Security controls](../concepts/rm-security.md)

