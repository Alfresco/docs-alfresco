---
author: [Alfresco Documentation, Alfresco Documentation]
source: Professional Alfresco Book
audience: 
category: [Web Script, API/Script]
keyword: [web script, cache]
---

# Creating a web script using cache controls

Caching is an important aspect of web scripts and is often required to support high-load applications such as Internet websites backed by the Alfresco content application server. You should consider caching when developing web scripts.

This task demonstrates cache controls by creating a sample web script that sets the last modified date.

1.  Log in to Alfresco Explorer:

    1.  Open a web browser and enter the URL: `http://localhost:8080/alfresco`

    2.  If prompted, log in with the user name admin and password admin.

2.  Navigate to **Company Home \> Data Dictionary \> Web Scripts Extensions**.

3.  Create a folder to represent the top-level package structure \(skip this step if the org space already exists\):

    1.  In the Create menu, click **Create Space**.

    2.  Enter the name for the folder in the Name field, such as: org

    3.  Click **Create Space**.

4.  Create a sub-package \(skip this step if the `example` space already exists\):

    1.  Navigate to **Company Home \> Data Dictionary \> Web Scripts Extensions \> org**.

    2.  In the Create menu, click **Create Space**.

    3.  Enter the name for the folder in the Name field, such as: example

    4.  Navigate to **Company Home \> Data Dictionary \> Web Scripts Extensions \> org \> example**.

5.  Create a web script description document for your cache sample:

    1.  In the Create menu, click **Create Content**.

    2.  Enter the name for the web script in the Name field as: cache.get.desc.xml

    3.  In the Content Type list, select **XML**.

    4.  Click **Next**.

    5.  Type the following in the Enter Content box:

        ```
        <webscript>
          <shortname>Cache example</shortname>
          <description>Demonstrate cache controls</description>
          <url>/cache</url>
          <authentication>user</authentication>
          <cache>
            <never>false</never>
            <mustrevalidate/>
          </cache>
        </webscript>
        ```

    6.  Click **Next**, click **Finish**, and then click **OK**.

6.  Create a controller script for your cache sample:

    1.  In the Create menu, click **Create Content**.

    2.  Enter the name in the Name field, such as: cache.get.html.ftl

    3.  In the Content Type list, select **Plain Text**.

    4.  Click **Next**.

    5.  Type the following in the Enter Content box:

        Cached response

7.  Register the web script with Alfresco.

    1.  In a web browser, enter the URL: `http://localhost:8080/alfresco/service/index`

    2.  If prompted, log in with the user name admin and password admin.

    3.  Click **Refresh Web Scripts**.

    A message indicates there is an additional web script.

    **Remember:** The Web Script Framework does not perform any caching of its own. It ensures correct HTTP headers are transmitted based on the web script cache controls for an external cache to interpret.

8.  Test your cache sample with cURL by typing the following in your command line:

    curl -uadmin:admin -v "http://localhost:8080/alfresco/service/cache"

    The returned response is similar to the following, where the Cache-Control and Last-Modified headers are present:

    ```
    * About to connect() to localhost port 8080 (#0)
    * Trying ::1... connected
    * Connected to localhost (::1) port 8080 (#0)
    * Server auth using Basic with user ‘admin’
    > GET /alfresco/service/cache HTTP/1.1
    > Authorization: Basic YWRtaW46YWRtaW4=
    > Host: localhost:8080
    > Accept: */*
    >
    < HTTP/1.1 200 OK
    < Server: Apache-Coyote/1.1
    < Cache-Control: must-revalidate
    < Last-Modified: Tue, 02 Feb 2010 09:07:05 GMT
    < Content-Type: text/html;charset=UTF-8
    < Content-Length: 16
    < Date: Tue, 02 Feb 2010 09:07:05 GMT
    ```


**Parent topic:**[Caching](../concepts/ws-caching-about.md)

