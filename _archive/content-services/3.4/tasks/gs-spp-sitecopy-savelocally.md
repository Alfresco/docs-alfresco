---
author: [Alfresco Documentation, Alfresco Documentation]
audience: 
category: Tutorial
option: 
---

# Save an updatable copy locally

You \(User A\) have the original copy of the document local.docx on your desktop. The **Save Updatable Copy** feature in Word enables other site members to obtain a copy of this document to reside on their own machines.

**Important:** You can perform this task only if you have access to a second machine that uses Internet Explorer as the default browser and has your Alfresco server as a Trusted Site.

To save an updatable copy of a Document Workspace file:

1.  On another machine, open Word. Click the Microsoft Office button and select **Open**.

2.  Enter http://<Alfresco server URL:7070\>/alfresco.

3.  At the login page, log in as User B \(userB, userB\).

4.  Browse to /SPP/documentLibrary and open local.docx.

    You \(User B\) now have the Document Workspace copy of the document local.docx open.

5.  On the Document Management task pane, select the Documents tab.

    The document local.docx is highlighted in the **Documents** list.

6.  Position your cursor over the document name, open the menu that becomes active, and select **Save Updatable Copy**.

7.  Save the document locally when the Save As dialog box appears.

    **Note:** If prompted, log in as User B.

    User B now has a local copy of local.docx, just as User A does. This copy, like the original document on your own machine, is linked to local.docx in the Document Workspace.

8.  Make some changes to local.docx, save the document, and upload it to the Document Workspace, just as you did in [Update the Document Workspace copy](gs-spp-sitecopy-update.md) as User A.

9.  Close local.docx and exit Word.


**Parent topic:**[Work with a Document Workspace document locally](../concepts/gs-spp-work-locally.md)

