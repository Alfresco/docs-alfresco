---
author: Alfresco Documentation
---

# Developing a Hello World web script

Building a Hello World web script is the best way to gain an understanding of the Web Script Framework. This example is simple enough to build and execute within a few minutes.

The Hello World web script consists of one web script description document and one FreeMarker response template, both created by using Alfresco Share.

1.  Log in to Alfresco Share.

    1.  Type `http://localhost:8080/share` in the web browser.

    2.  If prompted, log in with the user name `admin` and password `admin`.

    3.  Click the **Repository** link on the Share header.

    4.  Navigate to **Data Dictionary \> Web Scripts Extensions**.

2.  Create a web script description document for the Hello World example.

    1.  Click the Create menu item, and select **XML** to create a new XML file.

    2.  Enter `hello.get.desc.xml` as the web script name in the **Name** field.

    3.  Enter the following in the content box:

        ```
        
        
        <webscript>
          <shortname>Hello</shortname>
          <description>Polite greeting</description>
          <url>/hello</url>
        </webscript>
        
        
        ```

    4.  Click **Create**.

    5.  Click Web Scripts Extensions folder again.

3.  Create a web script response template to render the Hello World greeting.

    1.  In the Create menu, create a Plain Text file.

    2.  Enter `hello.get.html.ftl` as the template name in the **Name** field.

    3.  Type `Hello World` in the Enter Content box.

    4.  Click **Create**.

4.  Register the Hello World web script with Alfresco Content Services.

    1.  Open a new browser tab.

    2.  In the new tab, type `http://localhost:8080/alfresco/service/index`.

    3.  If prompted, log in with the user name `admin` and password `admin`.

    4.  Click **Refresh Web Scripts**.

    A message indicates there is one additional web script.

5.  Type `http://localhost:8080/alfresco/service/hello` in the web browser to test the new web script.

    A Hello World message is displayed, indicating your web script is working.


-   **[Locating the Hello World example](../tasks/ws-hello-world-locate.md)**  
One of the most useful uses of the index is to determine if a web script actually exists. To walk through this process, you can locate the newly created Hello World example.
-   **[How Hello World works](../concepts/ws-hello-world-explain.md)**  
After creating the sample Hello World web script you typed the URL in the web browser to test it. This caused the Web Script Framework to kick into action. It is triggered whenever a URL starting with `/alfresco/service` is invoked.

**Parent topic:**[Web Script tutorials](../tasks/ws-tutorials.md)

