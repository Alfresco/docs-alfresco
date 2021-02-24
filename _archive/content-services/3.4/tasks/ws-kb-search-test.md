---
author: [Alfresco Documentation, Alfresco Documentation]
source: Professional Alfresco Book
audience: 
category: [Web Script, API/Script]
keyword: [web script, knowledge base search, test]
---

# Testing Knowledge Base Search

Before testing the Knowledge Base Search web script, you must have knowledge articles to search for. To create knowledge articles you can develop another web script.

This script builds an Alfresco Share site with a document library and then adds a knowledge article into the document library. You can execute the web script repeatedly to create more knowledge articles.

1.  Log in to Alfresco Explorer:

    1.  Open a web browser and enter the URL: `http://localhost:8080/alfresco`

    2.  If prompted, log in with the user name admin and password admin.

2.  Navigate to **Company Home \> Data Dictionary \> Web Scripts Extensions**.

3.  Create a folder to represent the top-level package structure \(skip this step if the **org** space already exists\):

    1.  In the Create menu, click **Create Space**.

    2.  Enter the name for the folder in the Name field, such as: org

    3.  Click **Create Space**.

4.  Create a sub-package \(skip this step if the **example** space already exists\):

    1.  Navigate to **Company Home \> Data Dictionary \> Web Scripts Extensions \> org**.

    2.  In the Create menu, click **Create Space**.

    3.  Enter the name for the folder in the Name field, such as: example

5.  Create a web script description document for your Knowledge Base web script:

    1.  In the Create menu, click **Create Content**.

    2.  Enter the name for the web script in the Name field, such as: kb-create.get.desc.xml

    3.  In the Content Type list, select **XML**.

    4.  Click **Next**.

    5.  Type the following in the Enter Content box:

        ```
        <webscript>
           <shortname>Create Knowledge Base</shortname>
           <description>Create knowledge base article for testing</description>
           <url>/slingshot/knowledgebase/create</url>
           <authentication>user</authentication>
        </webscript
        ```

    6.  Click **Next**, click **Finish**, and then click **OK**.

6.  Create a controller script for your Knowledge Base web script:

    1.  In the Create menu, click **Create Content**.

    2.  Enter the name in the Name field, such as: kb-create.get.js

    3.  In the Content Type list, select **Plain Text**.

    4.  Click **Next**.

    5.  Enter the following in the Enter Content box:

        ```
        // establish site with document library
        var doclib = null;
        var site = siteService.getSite("kbtest");
        if (site == null) {
           site = siteService.createSite(null, "kbtest", "KB Search Test", 
             "KB Search Test", siteService.PUBLIC_SITE);
           doclib = site.createContainer("documentLibrary");
           site.save();
           doclib.save();
        } else {
           doclib = site.getContainer("documentLibrary");
        }
        
        // create knowledge article
        var article = doclib.createNode("article", "cm:content");
        article.addAspect("kb:article");
        article.properties["cm:name"] = "article" + doclib.children.length;
        article.properties["kb:articletype"] = "FAQ";
        article.content = "The attached tutorial...";
        article.save();
        
        // create model
        model.article = article;
        ```

    6.  Click **Next**, click **Finish**, and then click **OK**.

7.  Create a response template for your Knowledge Base Create web script:

    1.  In the Create menu, click **Create Content**.

    2.  Enter the name in the Name field, such as: kb-create.get.html.ftl

    3.  In the Content Type list, select **Plain Text**.

    4.  Click **Next**.

    5.  Enter the following in the Enter Content box:

        ```
        Created ${article.name} within site 'kbtest'.
        ```

    6.  Click **Next**, click **Finish**, and then click **OK**.

8.  Register the Knowledge Base Create web script with Alfresco.

    1.  In a web browser, enter: `http://localhost:8080/alfresco/service/index`

    2.  If prompted, log in with the user name admin and password admin.

    3.  Click **Refresh Web Scripts**. A message indicates there is one additional web script.

    You can now create some test data for the Knowledge Base Search web script.

9.  Type the following in your command line to create the Alfresco Share site named `kbtest` and an initial knowledge article:

    `curl -uadmin:admin "http://localhost:8080/alfresco/service/slingshot/knowledgebase/create"`

    If successful, the response is similar to the following, where each knowledge article is represented in JSON.

    ```
    {
      "items":
      [
        {
          "nodeRef": 
            "workspace:\/\/SpacesStore\/1016b656-6288-4e17-be30-787138d1693b",
          "type": "cm:content",
          "name": "How to Create Content Models",
          "title": "",
          "description": "",
          "modifiedOn": "2010-01-29T10:57:59.608Z",
          "modifiedByUser": "admin",
          "modifiedBy": "Administrator ",
          "createdOn": "2010-01-29T10:57:59.451Z",
          "createdByUser": "admin",
          "createdBy": "Administrator",
          "author": "",
          "nodeDBID": "614",
          "properties":
            {
              "kb_articletype": "FAQ",
              "kb_status": "Draft"
            }
        }
      ]
    }
    ```


You have completed your first set of web scripts that interact with the Alfresco content application server. You can use these to build the Knowledge Base application in Alfresco Share.

**Parent topic:**[Creating a Knowledge Base Search web script](../tasks/ws-kb-search-create.md)

