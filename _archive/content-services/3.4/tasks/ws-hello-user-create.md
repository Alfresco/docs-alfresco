---
author: [Alfresco Documentation, Alfresco Documentation]
source: Professional Alfresco Book
audience: 
category: [Web Script, API/Script]
keyword: [web script, Hello User]
---

# Creating a Hello User web script with authentication

To see authentication in action, you can make a slightly more interesting Hello World example named Hello User that requires authenticated access and responds with a personalized greeting.

1.  Log in to Alfresco Explorer.

    1.  Type http://localhost:8080/alfresco in the web browser.

    2.  If prompted, log in with the user name admin and password admin.

    3.  Navigate to **Company Home \> Data Dictionary \> Web Scripts Extensions**.

2.  Create a web script description document for the Hello User example.

    1.  In the Create menu, click **Create Content**.

    2.  Enter hellouser.get.desc.xml as the web script name in the Name field.

    3.  In the Content Type list, select **XML**.

    4.  Click **Next**.

    5.  Enter the following in the Enter Content box:

        ```
        <webscript>
          <shortname>Hello User</shortname>
          <description>Personalized greeting</description>
          <url>/hellouser</url>
          <authentication>user</authentication>
          <negotiate accept="text/html">html</negotiate>
          <negotiate accept="application/json">json</negotiate>
        </webscript>
        
        ```

    6.  Click **Next**.

    7.  Click **Finish**.

    8.  Click **OK**.

3.  Create a web script response template to render the Hello User greeting.

    1.  In the Create menu, click **Create Content**.

    2.  Enter hellouser.get.html.ftl as the template name in the Name field.

    3.  In the Content Type list, select **Plain Text**.

    4.  Click Next.

    5.  Type Hello $\{person.properties.userName\} in the Enter Content box.

    6.  Click **Next**.

    7.  Click **Finish**.

    8.  Click **OK**.

4.  Register the Hello User web script with Alfresco.

    1.  Type http://localhost:8080/alfresco/service/index in the web browser.

    2.  If prompted, log in with the user name admin and password admin.

    3.  Click **Refresh Web Scripts**.

        A message indicates there is one additional web script.

5.  Type http://localhost:8080/alfresco/service/hellouser in the web browser to test the new web script.

    A Hello admin message displays indicating your web script is working.


-   **[Returning a JSON response format](../tasks/ws-response-format.md)**  
While a web script that returns HTML \(such as the Hello World sample web script\) is fine for rendering a user interface, it is not so good for a data web script that needs to returns a format that is machine-readable, such as JSON. \(JSON, short for JavaScript Object Notation, is a lightweight data interchange format, often used for transmitting structured data over a network connection.\)
-   **[Selecting a response format](../tasks/ws-response-format-select.md)**  
There are several ways for a client to explicitly select a response format: URL extension, URL query parameter, and Accept header.
-   **[How Hello User works](../concepts/ws-hello-user-explain.md)**  
The sample web script required user level authentication in its hellouser.get.desc.xml descriptor file. This indicated to the Web Script Framework that prior to invoking the web script, a user has to first log in.

**Parent topic:**[Working with Alfresco web scripts](../concepts/ws-architecture.md)

