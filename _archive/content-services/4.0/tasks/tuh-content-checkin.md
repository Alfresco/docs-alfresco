---
author: [Alfresco Documentation, Alfresco Documentation]
audience: 
category: 
option: 
---

# Checking in content

When you complete edits on a checked out content item, you must check in the working copy to update the original.

If you are not yet finished with the item, you can check in the content while keeping the item itself checked out. You can only check in a file that was previously checked out by you.

1.  Navigate to the space containing the working copy of the file you want to check in. This may or may not be located in the same space as the original content item.

2.  In the Content Items pane, click ![Check In](../images/im-checkin.png) **\(Check In\)** for the working copy of the item you want to check in.

3.  Check **Minor Change** to increment the minor version number upon check in. This is optional.

    When selected, checking out version 3.4 of a file results in the versioning being updated to 3.5 upon check-in. Without this option selected, the version number after check-in would be 4.0. If versioning is not enabled, a version number is not assigned.

4.  Check **Check in changes and keep file checked out** if you want to update the working copy in the repository without checking in the file.

    This is a useful option if you intend to continue working on the file. You can continually mirror your changes from the working copy to the locked copy. This means that if another user wants to look at the file, they will see an up-to-date copy. Otherwise, users cannot view the updated file until you check it in.

5.  Select one of the following options in the **Working copy location** section:

    1.  **Use copy in current space**: Select this option if you performed an online edit on the content item listed in the space header. Proceed to step 8.

    2.  **Use copy uploaded from my computer**: Select this option to update the original file with the specified working copy from your computer.

6.  Click **Browse**.

7.  Locate the file on your computer that you want to check in and click **Open**.

    The name of the file to be uploaded appears in this pane.

8.  Click **Check In**.

    The date and time details for the original file indicate it has been updated. The working copy is removed from the repository.


**Parent topic:**[Understanding working copies](../concepts/cuh-content-workingcopy.md)

**Related information**  


[Adding versioning to content](tuh-content-version.md)

