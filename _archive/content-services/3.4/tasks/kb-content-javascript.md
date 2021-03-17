---
author: [Alfresco Documentation, Alfresco Documentation]
source: Professional Alfresco Book
audience: 
category: Content Modeling
keyword: [content model, JavaScript model]
---

# Creating articles using JavaScript

Once you have defined a content model, you can create articles within the Alfresco content repository that adhere to your model. This example uses the Alfresco JavaScript API to create knowledge articles, and assumes you have created a content model.

1.  Log in to Alfresco Explorer.

    1.  Open a web browser, and type `http://localhost:8080/alfresco`

    2.  Log in with the user name admin and password admin if requested:

2.  Create a JavaScript file:

    1.  In the Create menu, click **Create Content**.

    2.  Enter the name for the JavaScript in the Name field, such as: kb.js

    3.  In the Content Type list, select **Plain Text**.

    4.  Click Next.

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

    7.  Click **Finish**, and then click **OK**.

3.  Execute the JavaScript:

    1.  In the More Actions menu, click **View Details**.

    2.  Click **Run Action**.

    3.  In the Select Action list, select **Execute a script**.

    4.  Click **Set Values and Add**.

    5.  In the Select a Script to Execute list, select **kb.js**.

    6.  Click **OK**.

    7.  Click **Finish**, and then click **Close**.

4.  Test the JavaScript:

    1.  Navigate to **Company Home**.

    2.  Your JavaScript is working if you see two content items: “How To Create Content Model” and “Model Schema Reference”.


**Parent topic:**[Customizing Alfresco Share \(advanced\)](../concepts/kb-share-customize-adv.md)

## Defining additional properties with JavaScript

Define additional properties with Javascript.

1.  Create a node of a given type from the model, and then attach an aspect from the model at runtime.

    ```
    var article = companyhome.createNode("article", "cm:content");
    article.addAspect("kb:article");
    ```

    All nodes have a parent \(except for the system root node\), so implicit child association is created between the new node and its chosen parent. By default, the JavaScript `createNode` method creates a `cm:contains` child association as defined in the ECM domain model. Access to the content repository Company Home folder is provided, so your article can be created as a child of this folder.

2.  Set property values for property definitions as specified by the types and aspects from the model.

    ```
    article.properties["cm:name"] = "How to Create Content Models";
    article.properties["kb:articletype"] = "FAQ";
    ```

    **Note:**

    Some of the properties, such as `cm:name`, are inherited. Default values are applied to properties that have not been set.

3.  Set properties that do not have an associated property definition, \(residual properties\).

    ```
    article.properties["wordcount"] = 7000;
    ```

4.  Override the default `cm:contains` child association by specifying the name of the custom child association to use.

    ```
    var attachment = article.createNode("attachment", "kb:attachment", "kb:artifacts");
    attachment.properties["cm:name"] = "Content Modeling Tutorial";
    attachment.properties["kb:attachmenttype"] = "Documentation";
    attachment.content = "Content modeling is a fundamental building block...";
    ```

5.  Establish peer associations between nodes via the JavaScript `createAssocation` method, specifying the target node and association name.

    ```
    var relatedarticle = companyhome.createNode("relatedarticle", "cm:content");
    relatedarticle.addAspect("kb:article");
    relatedarticle.properties["cm:name"] = "Model Schema Reference";
    article.createAssociation(relatedarticle, "kb:related");
    ```


The nodes are saved and the transaction is committed. If any of the property values violate an associated constraint and the constraint is enforced, the transaction will not commit and raise an error. Otherwise, the transaction commits and the nodes are persisted in the content repository.

