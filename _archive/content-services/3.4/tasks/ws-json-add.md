---
author: [Alfresco Documentation, Alfresco Documentation]
source: Professional Alfresco Book
audience: 
category: [Web Script, API/Script]
keyword: [web script, multiple response template]
---

# Creating multiple response templates

A web script may support multiple response formats to allow it to be used by a variety of clients. For example, it may render an HTML response for human consumption in a web browser, and a JSON response for machine consumption by other clients.

This task adds support for JSON to the Folder Listing web script, in addition to HTML.

1.  Log in to Alfresco Explorer:

    1.  In your browser, enter: http://localhost:8080/alfresco

    2.  If prompted, log in with the user name admin and password admin.

2.  Navigate to **Company Home \> Data Dictionary \> Web Scripts Extensions \> org \> example**.

3.  Create a JSON response template for your Folder Listing example:

    1.  In the Create menu, click **Create Content**.

    2.  Enter the name for the web script in the Name field as follows: dir.get.json.ftl

    3.  In the Content Type list, select **Plain Text**.

    4.  Click **Next**.

    5.  Type the following in the Enter Content box:

        ```
        { 
          "server" : "Alfresco ${server.edition} Edition v${server.version}",
          "folder" :
          {
            "path" : "${folder.displayPath}",
            "name" : "${folder.name}" 
          },
          "children" : [
            <#list folder.children as child>
            {
                "isfolder" : <#if child.isContainer>true<#else>false</#if>,
                <#if verbose>
                "modifier" : "${child.properties.modifier}",
                "size" : <#if child.isDocument>
                  ${child.properties.content.size?c}<#else>null</#if>,
                "modified" : "${child.properties.modified?date}",
                </#if>
                "name" : "${child.name}"
            }<#if child_has_next>,</#if>
          </#list>
          ]
        }
        ```

    6.  Click **Next**.

    7.  Click **Finish**.

4.  Register the web script again:

    1.  In your browser, enter: http://localhost:8080/alfresco

    2.  If prompted, log in with the user name admin and password admin.

    3.  Click **Refresh Web Scripts**. A message indicates all web scripts have refreshed.

5.  Test your response template:

    1.  Type the following in your command line:

        curl -uadmin:admin "http://localhost:8080/alfresco/service/dir/Company%20Home.json"

    2.  If you see the contents of the Company Home folder, your response template is working.

    Each web script supports an unlimited number of response templates; however, there can only be one response template for each format. This is enforced by the naming convention for response templates. Your Folder Listing web script now supports two formats: HTML and JSON.

6.  Type the following in your command line to request the contents of a folder that does not exist in JSON format:

    curl -uadmin:admin "http://localhost:8080/alfresco/service/dir/doesnotexist.json"

    The web script responds with an error response, but in JSON format, as the client requested.

    **Note:** Whenever you change a web script implementation, including adding and removing response templates, you must re-register the web script via the web script index.


-   **[Adding a response status code template](../tasks/ws-responseCode-add.md)**  
 You can add a custom response status code template that renders a human readable message when the folder cannot be found.

**Parent topic:**[Developing a Folder Listing web script](../concepts/ws-folderListing-intro.md)

