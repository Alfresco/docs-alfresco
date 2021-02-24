---
author: [Alfresco Documentation, Alfresco Documentation]
source: Professional Alfresco Book
audience: 
category: [Web Script, API/Script]
keyword: [web script, test]
---

# Registering and testing web scripts

The web script index provides some administration of web scripts, in particular, for those developers creating new web scripts.

With a complete Folder Listing web script implementation, you can register and test your web script.

1.  Register the web script with Alfresco:

    1.  In your browser, enter: http://localhost:8080/alfresco/service/index

    2.  If prompted, log in with the user name admin and password admin.

2.  Click **Refresh Web Scripts** on the Web Scripts Home page.

    The Web Script Framework find all web scripts and registers them with Alfresco. When there is a problem registering a web script, the index provides a list of web scripts that failed registration along with the reason for the failure.

3.  Perform your first test:

    1.  In your browser, enter: http://localhost:8080/alfresco/service/dir/Company%20Home

    2.  If you see the contents of the Company Home folder listed, your web script is working.

4.  Check the verbose flag:

    1.  In your browser, enter: http://localhost:8080/alfresco/service/dir/Company%20Home?verbose=true

    2.  If you see the contents of the Company Home folder listed in verbose form, your web script is working.

5.  Check the error handling of a folder that does not exist:

    1.  In your browser, enter: http://localhost:8080/alfresco/service/dir/doesnotexist

    2.  If you see an error page detailing a 404 status response, your web script is working.

    When testing status response codes, it is useful to test with the cURL client to access to the status code sent on the HTTP response. For example, to repeat the 'folder does not exist' test with cURL, type the following in your command line:

    `curl -uadmin:admin -v "http://localhost:8080/alfresco/service/dir/doesnotexist"`

    The returned response is similar to the following where the 404 status code is explicitly logged:

    ```
    * About to connect() to localhost port 8080 (#0)
    *   Trying ::1... connected
    * Connected to localhost (::1) port 8080 (#0)
    * Server auth using Basic with user 'admin'
    > GET /alfresco/service/dir/doesnotexist HTTP/1.1
    > Authorization: Basic YWRtaW46YWRtaW4=
    > Host: localhost:8080
    > Accept: */*
    > 
    < HTTP/1.1 404 Not Found
    < Server: Apache-Coyote/1.1
    < Cache-Control: no-cache
    < Pragma: no-cache
    < Content-Type: text/html;charset=UTF-8
    < Content-Length: 1487
    < Date: Tue, 26 Jan 2010 10:28:28 GMT
    ```


You have registered and tested a web script implementation. Each time a web script component file is modified, you must register the web script again via the web script index page.

**Parent topic:**[Developing a Folder Listing web script](../concepts/ws-folderListing-intro.md)

