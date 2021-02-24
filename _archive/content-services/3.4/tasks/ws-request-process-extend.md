---
author: [Alfresco Documentation, Alfresco Documentation]
source: Professional Alfresco Book
audience: 
category: [Web Script, API/Script]
keyword: [web script, forms]
---

# Extending the request processing web script

You can extend the request processing web script example by adding a new controller script that uses the `json` root object provided by the Web Script Framework.

This task demonstrates request how to extend the request processing web script.

1.  Log in to Alfresco Explorer:

    1.  Open a web browser and enter the URL: `http://localhost:8080/alfresco`

    2.  If prompted, log in with the user name admin and password admin.

2.  Navigate to **Company Home \> Data Dictionary \> Web Scripts Extensions \> org \> example**.

3.  Create an additional controller script for your request body sample:

    1.  In the Create menu, click **Create Content**.

    2.  Enter the name in the Name field, such as: requestbody.post.json.js

    3.  In the Content Type list, select **Plain Text**.

    4.  Click **Next**.

    5.  Type the following in the Enter Content box:

        ```
        model.requestcontent = json.get\("request"\);
        ```

    6.  Click **Next**, click **Finish**, and then click **OK**.

4.  Re-register the web script with Alfresco.

    1.  In a web browser, enter the URL: `http://localhost:8080/alfresco/service/index`

    2.  If prompted, log in with the user name admin and password admin.

    3.  Click **Refresh Web Scripts**.

    Format Readers are not invoked automatically. You have to ask the Web Script Framework to convert the response and provide the resulting object to the controller script. You can do this by creating a controller script with an alternate naming convention:

    `<web script id>.<http method>.<format>.js`

    The difference here is that the controller script file name also contains the `<format>` segment, indicating to the Web Script Framework that requests of the specified format are handled by this controller and require the converted root object.

    In the example, you create a new controller script named requestbody.post.json.js to handle JSON posted requests. This controller now has access to the json root object, as provided by the JSON Format Reader, and can extract values directly from the JSON document.

    ```
    ...
    model.requestcontent = json.get("request");
    ...
    ```

5.  Test the updated web script with cURL by typing the following in your command line:

    ```
    curl -uadmin:admin -H "Content-Type: application/json" --data-binary
    "\{\\"request\\": \\"body\\"\}" "http://localhost:8080/alfresco/service/requestbody"
    ```

    This posts a request body of `{"request": "body"}` to your web script, which in turn responds with: `body`

    Instead of echoing the complete request as before, the updated controller script extracts the value named request from the JSON document and places it into the web script model, which in this case is the value `body`.


**Parent topic:**[Creating request processing web scripts](../tasks/ws-request-process.md)

