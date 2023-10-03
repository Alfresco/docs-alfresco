---
title: Using the Document Transformation Engine Web Console
---

The Document Transformation Engine is used when you upload files to Alfresco Content Services, and you can see results in the Alfresco Share preview.

Administrators can view information about the engine and transformation errors using the Web Console which shows:

* The status of the engine
* A historical view of all the transformations completed
* The number of successful and failed transformations

**Note:** Only Administrators can access and use the Document Transformation Engine Web Console.

1. To view the Document Transformation Engine Web Console, open a browser and navigate to `http://<transformation-host>:</port>/transformation-server/`, or `https://` if you are using SSL.

    The **Server Status** view is the default view when you open the Web Console. This displays an overview of the health and the memory use of the Document Transformation Engine.

2. Click **History** view.

    Alternatively, you can go directly to the **History** view by navigating to `http://transformation-server/#/history`.

    The **History** view shows the details of the document transformations. It provides a number of search functions that allow administrators to find transformation problems for specific documents.

3. You can query the transformation history using the following parameters:

    * Date-time From and To
    * File name
    * Status
    * User name
    * Document type From and To

4. To investigate errors, set the **Outcome** field to **Error**. Hover over the warning sign to view an indication of the problem with the file.
