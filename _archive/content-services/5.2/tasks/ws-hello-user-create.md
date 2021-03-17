---
author: Alfresco Documentation
---

# Creating a Hello User web script with authentication

To see authentication in action, you can make a slightly more interesting Hello World example named Hello User that requires authenticated access and responds with a personalized greeting.

1.  Log in to Alfresco Share.

    1.  Type `http://localhost:8080/share` in the web browser.

    2.  If prompted, log in with the user name `admin` and password `admin`.

    3.  Click the Repository link in the Share header.

    4.  Navigate to **Data Dictionary \> Web Scripts Extensions**.

2.  Create a web script description document for the Hello User example.

    1.  In the Create menu, select **XML**.

    2.  Enter `hellouser.get.desc.xml` as the web script name in the Name field.

    3.  Enter the following in the content box:

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

    4.  Click **Create**.

    5.  Click the Web Scripts Extensions directory again to return to the folder.

3.  Create a web script response template to render the Hello User greeting.

    1.  In the Create menu, select Plain Text.

    2.  Enter `hellouser.get.html.ftl` as the template name in the Name field.

    3.  Type `Hello ${person.properties.userName}` in the content box.

    4.  Click **Create**.

    5.  Again, navigate back to the Web Scripts Extensions folder by clicking on it in the breadcrumb trail.

4.  Register the Hello User web script with Alfresco Content Services.

    1.  Open a new browser tab.

    2.  Type `http://localhost:8080/alfresco/service/index` in the web browser.

    3.  If prompted, log in with the user name `admin` and password `admin`.

    4.  Click **Refresh Web Scripts**.

        A message indicates there is one additional web script.

5.  Type `http://localhost:8080/alfresco/service/hellouser` in the web browser to test the new web script.

    A Hello admin message displays indicating your web script is working.


-   **[Returning a JSON response format](../tasks/ws-response-format.md)**  
While a web script that returns HTML \(such as the Hello World sample web script\) is fine for rendering a user interface, it is not so good for a data web script that needs to returns a format that is machine-readable, such as JSON. \(JSON, short for JavaScript Object Notation, is a lightweight data interchange format, often used for transmitting structured data over a network connection.\)
-   **[Selecting a response format](../tasks/ws-response-format-select.md)**  
There are several ways for a client to explicitly select a response format: URL extension, URL query parameter, and Accept header.
-   **[How Hello User works](../concepts/ws-hello-user-explain.md)**  
The sample web script required user level authentication in its hellouser.get.desc.xml descriptor file. This indicated to the Web Script Framework that prior to invoking the web script, a user has to first log in.
-   **[Specifying user identity](../tasks/ws-specify-user-identity.md)**  
There are several options for specifying the user with which to invoke a web script: HTTP Basic authentication, ticket, or as a Guest.
-   **[Using the JSON callback](../tasks/ws-json-callbacks-using.md)**  
Creating a callback example involves creating an HTML page that invokes the Hello User web script with a callback that displays the JSON response in an alert box.
-   **[Understanding how the JSON callback works](../tasks/ws-json-callbacks-explain.md)**  
The easiest way to understand the callback example is to invoke the Hello User web script directly and interrogate the response.

**Parent topic:**[Web Script tutorials](../tasks/ws-tutorials.md)

