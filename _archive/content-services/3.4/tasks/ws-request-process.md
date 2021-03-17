---
author: [Alfresco Documentation, Alfresco Documentation]
source: Professional Alfresco Book
audience: 
category: [Web Script, API/Script]
keyword: [web script, forms]
---

# Creating request processing web scripts

When performing an HTTP POST to a web script, the posted request body often contains content that needs processing by the web script. To allow access to the request body, the Web Script Framework provides a special root object named `requestbody` that represents the content of the request. The `requestbody` is a `ScriptContent` object allowing access to the request content either as a string or as a content stream.

This task demonstrates request processing by creating a web script, which simply responds with the content of the HTTP request.

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

    4.  Navigate to **Company Home \> Data Dictionary \> Web Scripts Extensions \> org \> example**.

5.  Create a web script description document for your request body sample:

    1.  In the Create menu, click **Create Content**.

    2.  Enter the name for the web script in the Name field as: requestbody.post.desc.xml

    3.  In the Content Type list, select **XML**.

    4.  Click **Next**.

    5.  Type the following in the Enter Content box:

        ```
        <webscript>
          <shortname>Request Body Sample</shortname>
          <description>Render the request body in the response</description>
          <url>/requestbody</url>
          <authentication>user</authentication>
        </webscript>
        ```

    6.  Click **Next**, click **Finish**, and then click **OK**.

6.  Create a controller script for your request body sample:

    1.  In the Create menu, click **Create Content**.

    2.  Enter the name in the Name field, such as: requestbody.post.js

    3.  In the Content Type list, select **Plain Text**.

    4.  Click **Next**.

    5.  Type the following in the Enter Content box:

        ```
        model.requestcontent = requestbody.content;
        ```

    6.  Click **Next**, click **Finish**, and then click **OK**.

7.  Create an HTML response template for your request body sample:

    1.  In the Create menu, click **Create Content**.

    2.  Enter the name in the Name field, such as: requestbody.post.html.ftl

    3.  In the Content Type list, select **Plain Text**.

    4.  Click **Next**.

    5.  Type the following in the Enter Content box:

        ```
        $\{requestcontent\}
        ```

8.  Register the web scripts with Alfresco.

    1.  In a web browser, enter the URL: `http://localhost:8080/alfresco/service/index`

    2.  If prompted, log in with the user name admin and password admin.

    3.  Click **Refresh Web Scripts**.

    A message indicates there is an additional web script.

    Your example consists of just two lines of code. The controller script extracts the request content from the `requestbody` root object and places it into the Web script model under the name `requestcontent`. The response template simply outputs the model value into the response.

9.  Test this web script with cURL by typing the following in your command line:

    ```
    curl -uadmin:admin -H "Content-Type: application/json" --data-binary "\{\\"request\\":
    \\"body\\"\}" "http://localhost:8080/alfresco/service/requestbody"
    ```

    This posts a request body of `{"request": "body"}` to your web script, which in turn responds with: `{"request": "body"}`


Often the content posted in a request is structured using data formats such as XML or JSON, which the web script has to parse. Parser code is generally painful to develop, so the Web Script Framework provides a mechanism known as a Format Reader that parses a request of a given MIME type into an object that represents the request content. The object is then supplied to the controller script, which can interrogate the object to extract request content.

-   **[Extending the request processing web script](../tasks/ws-request-process-extend.md)**  
You can extend the request processing web script example by adding a new controller script that uses the `json` root object provided by the Web Script Framework.

**Parent topic:**[Forms and web scripts](../concepts/ws-forms-about.md)

