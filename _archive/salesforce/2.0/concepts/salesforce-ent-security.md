---
author: Alfresco Documentation
audience: 
---

# Search considerations in Salesforce and Alfresco

Consider how you want to structure your information based on whether you need to restrict access.

There are a number of ways in Salesforce that you can search for content, and the results returned depend on the method. You can search:

1.  In a Salesforce record.

    If you search for information \(for example, an account\) in a Salesforce record, only accounts that are linked to that particular Salesforce record are returned.  Content might exist in multiple places, but that content is returned only if it is linked with the record.

2.  In the Alfresco Repository tab that is displayed in Salesforce.

    If you search for content in the Alfresco Repository tab, all results that you have permission to see are returned from the Alfresco repository. The user can then link the file to one or more Salesforce records.

    If metadata synchronization is enabled, this synchronization happens when a user views a Salesforce record that contains the Alfresco canvas app. The app checks whether a folder for that record exists in Alfresco, and creates a new folder if it does not exist. The app then adds the mapped property values from the Salesforce record to the parent record folder in Alfresco.  If a user searches for that metadata directly in Alfresco \(for example, using the Share application\), the results are returned successfully.


There is certain content, and associated metadata, that you might want only certain users to see; for example, Human Resources \(HR\) personnel data. Use a private site for this record type. See [Creating sites](http://docs.alfresco.com/5.2/concepts/sites-intro.html) for more information about the different site types.

You can map an specific object \(and therefore all records associated with that object\) to a named site in Share. See [step 4 of Adding the Alfresco site and canvas app in Salesforce](../tasks/salesforce-ent-add-app.md#step4) for instructions on how to do this.

**Parent topic:**[Alfresco Content Connector for Salesforce](../concepts/salesforce-ent-overview.md)

