---
author: Alfresco Documentation
---

# Processing complex HTTP requests

Content negotiation makes it possible to serve different versions of a document at a given URI so that a client can specify which version best fits its capabilities. For example, a web browser can specify which type of image is preferred, such as GIF or PNG, for display purposes.

A client uses an Accept header to specify a prioritized list of preferred MIME types for the response. When the Web Script Framework receives an HTTP request with an Accept header, it responds with the web script response format that most closely matches the highest-priority MIME type preference.

By default, content negotiation is disabled; however, each web script can enable content negotiation by declaring its requirements in its descriptor document. This involves mapping an incoming Accept header MIME type preference to one of its response formats.

1.  Log in to Alfresco Share:

    1.  Open a web browser and enter the URL: `http://localhost:8080/share`

    2.  If prompted, log in with the user name `admin` and password `admin`.

2.  Click the Repository link in the Share header.

3.  Navigate to **Data Dictionary \> Web Scripts Extensions**.

4.  Create a folder to represent the top-level package structure \(skip this step if the **org** space already exists\):

    1.  In the Create menu, select **Create Folder**.

    2.  Enter the name for the folder in the Name field: `org`

    3.  Click **Save**.

    4.  Navigate to the freshly created org folder.

5.  Create a sub-package \(skip this step if the **example** space already exists\):

    1.  In the Create menu, select **Create Folder**.

    2.  Enter the name for the folder in the Name field: `example`

    3.  Click Save.

    4.  Navigate to **Data Dictionary \> Web Scripts Extensions \> org \> example**.

6.  Create a web script description document for your content negotiation sample:

    1.  In the Create menu, select **XML**.

    2.  Enter the name for the web script in the Name field as: `negotiate.get.desc.xml`

    3.  Type the following in the content box:

        ```
        
        <webscript>
          <shortname>Negotiation Sample</shortname>
          <description>Response format driven by content negotiation</description>
          <url>/negotiate</url>
          <negotiate accept="text/html">html</negotiate>
          <negotiate accept="application/json">json</negotiate>
        </webscript>
        ```

    4.  Click **Create**.

    5.  Navigate back to the org/example folder using the breadcrumb trail.

7.  Create an HTML response template for your content negotiation sample:

    1.  In the Create menu, select **Plain Text**.

    2.  Enter the name in the Name field: `negotiate.get.html.ftl`

    3.  Type the following in the content box:

        ```
        <html>
          <body>HTML response.</body>
        </html>
        ```

    4.  Click **Create**.

    5.  Navigate back to the org/example folder

8.  Create a JSON response template for your content negotiation sample:

    1.  In the Create menu, select **Plain Text**.

    2.  Enter the name in the Name field: `negotiate.get.json.ftl`

    3.  Type the following in the content box:

        ```
        {"response": "json"}
        ```

    4.  Click **Create**.

9.  Register the web script with Alfresco Content Services.

    1.  Open a new tab in the web browser.

    2.  In the new tab, enter the URL: `http://localhost:8080/alfresco/service/index`

    3.  If prompted, log in with the user name `admin` and password `admin`.

    4.  Click **Refresh Web Scripts**. \(The number of web scripts will increase.\)

    Content negotiation is declared by listing the mappings between an incoming preferred MIME type and a web script response format. In your sample, the HTML and JSON response formats are mapped to the text/html and application/json MIME types, respectively:

    ```
    ...
    <negotiate accept="text/html">html</negotiate>
    <negotiate accept="application/json">json</negotiate>
    ...
    ```

10. Type the following in your command line to test that your sample web script responds appropriately to content negotiation by explicitly requesting JSON:

    ```
    curl -H "Accept: application/json" "http://localhost:8080/alfresco/service/negotiate"
    ```

    The response is:

    ```
    {"response": "json"}
    ```

11. Type the following in your command line to test that the best response format is chosen:

    ```
    curl -H "Accept: text/xml,text/*" "http://localhost:8080/alfresco/service/negotiate"
    ```

    This time the response is:

    ```
    <html><body>HTML response.</body></html>
    ```


Your sample web script does not provide an XML response format so cannot respond to the preferred text/xml MIME type; however, it can respond with the HTML response format that matches the second preference of text/\*.

**Parent topic:**[Web Script tutorials](../tasks/ws-tutorials.md)

