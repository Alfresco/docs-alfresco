---
author: [Alfresco Documentation, Alfresco Documentation]
source: Professional Alfresco Book
audience: 
category: [JavaScript, Services, API/Script]
keyword: [JavaScript API, create content]
---

# Using the JavaScript API to create new content

This example uses the JavaScript API to create new content.

This example creates a new document called myDoc.txt in the home space of a user. The content for the new document is set to `doc.content` and the document is saved to commit your changes.

-   The following code \(`createContentNode.java`\) creates a file in a user's home folder.

    ```
    // create file in the user's home folder 
    var doc = userhome.createFile("myDoc.txt"); 
    doc.content = "This is some content.";
    doc.save();
    ```


**Parent topic:**[Using Embedded APIs](../concepts/serv-api-embedded-about.md)

**Related information**  


[Using Embedded APIs](../concepts/serv-api-embedded-about.md)

