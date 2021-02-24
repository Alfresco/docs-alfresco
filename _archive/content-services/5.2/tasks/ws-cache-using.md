---
author: Alfresco Documentation
---

# Creating a web script using cache controls

Caching is an important aspect of web scripts and is often required to support high-load applications such as websites backed by Alfresco Content Services. You should consider caching when developing web scripts.

This task demonstrates cache controls by creating a sample web script that sets the last modified date.

1.  Log in to Alfresco Share:

    1.  Open a web browser and enter the URL: `http://localhost:8080/share`

    2.  If prompted, log in with the user name `admin` and password `admin`.

2.  Navigate to **Data Dictionary \> Web Scripts Extensions \> org \> example**.

3.  Create a web script description document for your cache sample:

    1.  In the Create menu, select **XML**.

    2.  Enter the name for the web script in the Name field:

        ```
        cache.get.desc.xml
        ```

    3.  Type the following in the content box:

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

    4.  Click **Create**.

    5.  Navigate back to the org/example folder using the breadcrumb trail.

4.  Create a controller script for your cache sample:

    1.  In the Create menu, select **Plain Text**.

    2.  Enter the name in the Name field:

        ```
        cache.get.html.ftl
        ```

    3.  Type the following in the content box:

        ```
        Cached response
        ```

    4.  Click **Create**.

    5.  Navigate back to the org/example folder using the breadcrumb trail.

5.  Register the web script with Alfresco Content Services.

    1.  Create a new browser tab.

    2.  In the browser tab, enter the URL: `http://localhost:8080/alfresco/service/index`

    3.  If prompted, log in with the user name `admin` and password `admin`.

    4.  Click **Refresh Web Scripts**.

    A message indicates there is an additional web script.

    **Remember:** The Web Script Framework does not perform any caching of its own. It ensures correct HTTP headers are transmitted based on the web script cache controls for an external cache to interpret.

6.  Test your cache sample with cURL by typing the following in your command line:

    ```
    curl -uadmin:admin -v "http://localhost:8080/alfresco/service/cache"
    ```

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


**Parent topic:**[Web Script tutorials](../tasks/ws-tutorials.md)

