---
author: [Alfresco Documentation, Alfresco Documentation]
source: Professional Alfresco Book
audience: 
category: [Administration, Web Script]
option: Hello World
---

# Developing a Hello World web script

Building a Hello World web script is the best way to gain an understanding of the Web Script Framework. This example is simple enough to build and execute within a few minutes.

The Hello World web script consists of one web script description document and one FreeMarker response template, both created via Alfresco Explorer.

1.  Log in to Alfresco Explorer.

    1.  Type http://localhost:8080/alfresco in the web browser.

    2.  If prompted, log in with the user name admin and password admin.

    3.  Navigate to **Company Home \> Data Dictionary \> Web Scripts Extensions**.

2.  Create a web script description document for the Hello World example.

    1.  In the Create menu, click **Create Content**.

    2.  Enter hello.get.desc.xml as the web script name in the **Name** field.

    3.  In the Content Type list, select **XML**.

    4.  Click **Next**.

    5.  Enter the following in the **Enter Content** box:

        ```
        <webscript>
           <shortname>Hello</shortname>
           <description>Polite greeting</description>
           <url>/hello</url>
        </webscript>
        ```

    6.  Click **Next**.

    7.  Click **Finish**.

    8.  Click **OK**.

3.  Create a web script response template to render the Hello World greeting.

    1.  In the Create menu, click **Create Content**.

    2.  Enter hello.get.html.ftl as the template name in the **Name** field.

    3.  In the Content Type list, select **Plain Text**.

    4.  Click **Next**.

    5.  Type Hello World in the Enter Content box.

    6.  Click **Next**.

    7.  Click **Finish**.

    8.  Click **OK**.

4.  Register the Hello World web script with Alfresco.

    1.  Type http://localhost:8080/alfresco/service/index in the web browser.

    2.  If prompted, log in with the user name admin and password admin.

    3.  Click **Refresh Web Scripts**.

    A message indicates there is one additional web script.

5.  Type http://localhost:8080/alfresco/service/hello in the web browser to test the new web script.

    A Hello World message displays indicating your web script is working.


-   **[Locating the Hello World example](../tasks/ws-hello-world-locate.md)**  
One of the most useful uses of the index is to determine if a web script actually exists. To walk through this process, you can locate the newly created Hello World example.
-   **[How Hello World works](../concepts/ws-hello-world-explain.md)**  
After creating the sample Hello World web script you typed the URL in the web browser to test it. This caused the Alfresco Web Script Framework to kick into action. It is triggered whenever a URL starting with `/alfresco/service` is invoked.

**Parent topic:**[Working with Alfresco web scripts](../concepts/ws-architecture.md)

