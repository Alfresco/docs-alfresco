---
author: [Alfresco Documentation, Alfresco Documentation]
audience: 
category: 
option: 
---

# Attaching files to records

You can attach files to opportunities, accounts, cases, or contracts.

When one of these record types has been created you'll see an Alfresco Documents section when you view the record.

**Note:** This is only available where your Salesforce Administrator has set up Alfresco for Salesforce against that record type and for the user profile that you belong to.

1.  Find the record you want to attach a file to and scroll down to the **Alfresco Documents** section.

2.  Click **Attach file**.

3.  Click **Choose file** and select the file you want to attach.

4.  Enter a document name or leave the default name \(this is the same as the file name of the attachment\).

5.  Select a **Document Type** for the attachment.

6.  Click **Save**.

    Your file is now uploaded to and stored in Alfresco \(with a version number of 1.1\) and attached to the record in Salesforce. The record details are captured as metadata by Alfresco and stored with the attachment.

    By default when attachments are added to a record, a new folder is created in Alfresco with the same name as the record, and the attachment is stored there.

    -   In Alfresco you can view the attachment \(and modify it if you have the required permissions\) and create tasks based around the document, such as review assignments.
    -   In Salesforce you can edit the name and document type, click on the attachment name to view document details, or delete the attachment.
    -   A Chatter feed is also created when you attach a file. All the usual options such as commenting and liking are available and the attachment can also be downloaded from here.
    **Note:** Each record can support up to 100 attachments.


This video shows you how to attach files to records.

  

**Parent topic:**[Using Alfresco for Salesforce](../concepts/salesforce_using.md)

