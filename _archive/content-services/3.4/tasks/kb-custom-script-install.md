---
author: Alfresco Documentation
---

# Adding a script to the Data Dictionary

You can place your custom script files, such as your custom server-side JavaScript file in the Data Dictionary in the Alfresco repository.

This code adds a custom JavaScript file that uses the Alfresco Tagging Service to apply tags to your document. Tags are universal throughout the repository for discovering relevant information. Applying lifecycle tags to your documents makes it easier for other people to locate knowledge in the Knowledge Base.

1.  Copy the following code into a text file and save it as "add-and-update-knowledge-base-tags.js.

    add-and-update-knowledge-base-tags.js

    ```
    if (document.type != "{http://www.alfresco.org/model/content/1.0}thumbnail" &&
    document.type != "{http://www.alfresco.org/model/content/1.0}folder")
    {
     // All Knowledge Base status ids
     var kbStatusIds = ["draft", "pending", "current", "archived"];
    
     // Remove all previous status tags so you only have the latest one added
     document.removeTags(kbStatusIds);
    
     // Add a tag to reflect the status
     switch (document.properties["kb:status"])
     {
    case "Draft":
     document.addTag("draft");
     break;
    
    case "Pending Approval":
     document.addTag("pending");
     break;
    
    case "Current":
    document.addTag("current");
    break;
    
    case "Archived":
     document.addTag("archived");
     break;
    
    default:
     }
    
     // Save changes
     document.save();
     
    ```

2.  In Alfresco Explorer, click Company Home to go to the root space of the repository.

3.  In the Navigator view on the left, click the arrow next to **Data Dictionary** and expand the subspace Scripts.

4.  In the Scripts space, click Add Content to open the Add Content dialog box.

5.  In the Add Content dialog box, click Browse and select add-and-update-knowledge-base-tags.js for uploading.

6.  In the Other Properties area, clear the check box.

7.  Click OK to upload the file.

8.  Click OK again to complete the installation.

    Your file appears in the Scripts folder with the rest of the out-of-the-box scripts.


**Parent topic:**[Getting started](../concepts/kb-about.md)

