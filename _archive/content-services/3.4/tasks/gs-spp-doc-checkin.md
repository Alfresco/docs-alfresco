---
author: [Alfresco Documentation, Alfresco Documentation]
audience: 
category: Tutorial
option: 
---

# Check in the document

When you finish editing a checked out document, you must check it in to update the original in the Document Workspace. This removes the lock so the updated version is available for other users.

To edit and check in the document:

1.  Make some changes to your open document \(local.docx\) and save the document.

2.  On the Status tab of the Document Management task pane, click **Check in** \(or click the Microsoft Office button and select **Server**, then **Check In**\).

3.  Enter an appropriate comment on the **Check In**dialog box and click **OK**.

    **Note:** The option **Keep the document checked out after checking in this version** enables you to update the content while keeping the document checked out to you. For the purpose of this tutorial, do not select this option.

    The Status tab in the task pane is cleared, indicating the document is now checked back into the site. The SPP site in Share no longer displays the lock icon previously associated with the file local.docx.

4.  \(Optional\) To verify the check-in in Share:

    1.  Open Share in any browser \(http://<Alfresco Share URL:8080\>/share/\) and log in as User A \(userA, userA\).

    2.  Click the site name, **SPP**, on your My Sites dashlet.

    3.  Click **Document Library**.

        The file local.docx no longer displays the message.

    4.  Log out of Share and close the browser.


**Parent topic:**[Edit a Document Workspace document](../tasks/gs-spp-doc-edit.md)

