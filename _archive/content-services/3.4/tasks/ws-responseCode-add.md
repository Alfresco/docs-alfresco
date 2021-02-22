---
author: [Alfresco Documentation, Alfresco Documentation]
source: Professional Alfresco Book
audience: 
category: [Web Script, API/Script]
keyword: [web script, response status code template]
---

# Adding a response status code template

Response status code templates allow a web script to render a custom response for a given status code. This is useful for providing unique information about a status code or to render a custom human readable interface. Your Folder Listing web script returns a 404 \(Not Found\) status code if the requested folder to list does not exist in the content repository. By default, the web script responds with a generic response that provides details about the status including its descriptive message. This is useful for diagnosis but may not be consumable by the typical user of the web script. You can add a custom response status code template that renders a human readable message when the folder cannot be found.

1.  Log in to Alfresco Explorer:

    1.  In your browser, enter: http://localhost:8080/alfresco

    2.  If prompted, log in with the user name admin and password admin.

2.  Navigate to **Company Home \> Data Dictionary \> Web Scripts Extensions \> org \> example**.

3.  Create the response status code template:

    1.  In the Create menu, click Create Content.

    2.  Enter the name for the web script in the Name field as follows: dir.get.html.404.ftl

    3.  In the Content Type list, select **Plain Text**.

    4.  Click **Next**.

    5.  Type the following in the Enter Content box:

        ```
        <html>
           <body>
             Alfresco ${server.edition} Edition v${server.version} : dir
             <p>
             Folder <b>${url.templateArgs.folderpath}</b> not found.
           </body>
        </html>
        ```

    6.  Click **Next**.

    7.  Click **Finish**.

4.  Register the web script again:

    1.  In your browser, enter:http://localhost:8080/alfresco/service/index

    2.  If prompted, log in with the user name admin and password admin.

    3.  Click **Refresh Web Scripts**. A message indicates all web scripts refreshed.

5.  Test your response code template:

    1.  Type the following in your web browser:

        http://localhost:8080/alfresco/service/dir/doesnotexist

    2.  If you see the custom message, your response status code template is working.

    As with all web script component files, response status code template file names adhere to a naming convention as defined by the Web Script Framework.


Response status code templates have access to the same root objects as normal web script response templates except the default templates `<code>.ftl` and `status.ftl` only have access to the root objects `url`, `status`, `server`, and `date`.

When developing web scripts, leave the implementation of response status code templates until the end as they are not essential to their execution. You can test without custom response status code templates, as the Web Script Framework will always eventually find the default template `status.ftl` in the root package.

As with all other response templates, adding and removing a response status code template requires you to re-register the web script.

**Parent topic:**[Creating multiple response templates](../tasks/ws-json-add.md)

