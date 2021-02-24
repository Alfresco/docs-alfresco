---
author: Alfresco Documentation
---

# Creating content with JavaScript

With the example content model defined, you can create articles in the content repository that adhere to the model. This example demonstrates this by developing some JavaScript code that uses the Alfresco JavaScript API to create knowledge articles.

1.  Log in to Alfresco Explorer using the URL http://localhost:8080/alfresco. If requested, log in with the user name admin and password admin.

2.  Navigate to Company Home \> Data Dictionary \> Scripts.

3.  Create a JavaScript file:

    1.  In the Create menu, click **Create Content**.

    2.  Enter the name for the JavaScript in the Name field, such as: kb.js

    3.  In the Content Type list, select **Plain Text**.

    4.  Click **Next**.

    5.  Type the following in the Enter Content box:

        ```
        var article = companyhome.createNode("article", "cm:content");
        article.addAspect("kb:article");
        article.properties["cm:name"] = "How to Create Content Models";
        article.properties["kb:articletype"] = "FAQ";
        article.properties["wordcount"] = 7000;
        article.content = "The attached tutorial provides an overview of how to...";
        article.save();
        var attachment = article.createNode("attachment", "kb:attachment",
        "kb:artifacts");
        attachment.properties["cm:name"] = "Content Modeling Tutorial";
        attachment.properties["kb:attachmenttype"] = "Documentation";
        attachment.content = "Content modeling is a fundamental building block...";
        attachment.save();
        var relatedarticle = companyhome.createNode("relatedarticle", "cm:content");
        relatedarticle.addAspect("kb:article");
        relatedarticle.properties["cm:name"] = "Model Schema Reference";
        article.createAssociation(relatedarticle, "kb:related");
        relatedarticle.save();
        ```

    6.  Click **Next**.

    7.  Click **Finish**.

        The **Modify Content Properties** dialog will be displayed.

    8.  From the **Content Type** drop-down list select **Java Script**.

    9.  Click **OK**.

4.  Execute the JavaScript:

    1.  In the More Actions menu, click **View Details**.

    2.  Click **Run Action**.

    3.  In the Select Action list, select **Execute a script**.

    4.  Click **Set Values and Add**.

    5.  In the Select a Script to Execute list, select **kb.js**.

    6.  Click **OK**.

    7.  Click **Finish**.

    8.  Click **Close**.

5.  Test the JavaScript by navigating to Company Home and viewing the contents.

    If you see two content items, one named How To Create Content Model and the other named Model Schema Reference, your JavaScript is working.


**Parent topic:**[Content modeling](../concepts/content-modeling-about.md)

