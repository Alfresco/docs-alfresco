---
title: Using the Document Transformation Engine
---

The Document Transformation Engine is used when you upload files to Alfresco Content Services, and you can see results in the Alfresco Share preview.

Administrators can view information about the engine and transformation errors using the Web Console.

## Using the Document Transformation Engine Web Console

Use the Document Transformation Engine Web Console to view information about the engine and transformation errors. The console provides the status of the engine, a historical view of all the transformations completed, and the number of successful and failed transformations.

Only Administrators can access and use the Document Transformation Engine Web Console.

1. To open the Document Transformation Engine Web Console, open a browser, and then navigate to `http://<transformation-host\>:</port\>:/transformation-server/`, or `https://` if you are using SSL.

    The **Server Status** view is the default view when you open the Document Transformation Engine Web Console. The **Server Status** view shows an overview of the health and the memory use of the Document Transformation Engine. Ensure that you have the flash plug-in to see the **Active Threads** and **Memory Usage** graphics.

2. Click **History** view.

    Alternatively, you can go directly to the **History** view by navigating to `http://<transformation-host\>:<port\>:/transformation-server/transformations`

    The **History** view shows the details of the document transformations. It provides a number of search functions that allow administrators to find transformation problems for specific documents.

3. You can query the transformation history using the following parameters:

    * Date-time From and To
    * File name
    * Status
    * User name

4. To investigate errors, set the **Outcome** field to **Error**. Hover over the warning sign to view an indication of the problem with the file.

5. Click the **Statistics** view.

    Alternatively, you can go directly to the **Statistics** view by navigating to `http://<transformation-host\>:<port\>:/transformation-server/stats`

    The **Statistics** view indicates the number of transformations, and the success or failed ratio.

6. Click the reset link to reset the counter.
