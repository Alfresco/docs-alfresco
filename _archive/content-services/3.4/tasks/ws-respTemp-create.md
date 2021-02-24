---
author: [Alfresco Documentation, Alfresco Documentation]
source: Professional Alfresco Book
audience: 
category: [Web Script, API/Script]
keyword: [web script, response template]
---

# Creating a response template

The final stage of web script execution is to render a response back to the initiating client in an appropriate format based on the client's preference. A response template written in FreeMarker is responsible for rendering each format provided by the web script.

The Folder Listing web script provides a response in HTML for rendering to a web browser, and one in JSON for consumption by other clients. The response lists all the documents and folders contained within the folder retrieved by the controller script as specified in the Folder Listing web script URL.

1.  Log in to Alfresco Explorer:

    1.  Open a web browser and enter the URL: `http://localhost:8080/alfresco`

    2.  If prompted, log in with the user name admin and password admin.

2.  Navigate to **Company Home \> Data Dictionary \> Web Scripts Extensions \> org \> example**.

3.  Create a web script response template for your Folder Listing example:

    1.  In the Create menu, click **Create Content**.

    2.  Enter the name for the web script in the Name field, such as: dir.get.html.ftl

    3.  In the Content Type list, select **Plain Text**.

    4.  Click **Next**.

    5.  Type the following in the Enter Content box:

        ```
        <html>
          <head>
            <title>Folder ${folder.displayPath}/${folder.name}</title>
          </head>
          <body>
             Alfresco ${server.edition} Edition v${server.version} : dir
            <p>
            Contents of folder ${folder.displayPath}/${folder.name}
            <p>
            <table>
            <#list folder.children as child>
               <tr>
                   <td><#if child.isContainer>d</#if></td>
                   <#if verbose>
                      <td>${child.properties.modifier}</td>
                      <td><#if child.isDocument>
                         ${child.properties.content.size}</#if></td>
                      <td>${child.properties.modified?date}</td>
                   </#if>
                   <td>${child.name}</td>
               </tr>
            </#list>
            </table>
          </body>
        </html>
        ```

    6.  Click **Next**, click **Finish**, and then click **OK**.

    The component script file name`dir.get.html.ftl`, adheres to the naming convention defined by the Web Script Framework. All response template file names must end with `.ftl`. The `<web script id>` identifies the web script and must be the same as the web script ID defined in the file name of the associated web script description document. The `<http method>` specifies which HTTP method will initiate the web script and again must be the same as the associated web script description document. The format rendered by the response template is represented by `<format>`, the Web Script Framework abbreviation for a MIME type.


Your Folder Listing example now has the following three component files:

1.  /org/example/dir.get.desc.xml
2.  /org/example/dir.get.js
3.  /org/example/dir.get.html.ftl

    The Web Script Framework knows that all of these files are related to the same web script as they share web script package, web script ID, and HTTP method.


-   **[Accessing the model](../concepts/ws-respTemp-model.md)**  
Response templates have access to the model created by the controller script. Each named value added to the model is accessible as a template root object by its respective model name.
-   **[Accessing Alfresco services](../concepts/ws-respTemp-services.md)**  
As well as model root objects, response templates have access to services provided by the Alfresco content application server, allowing a response template to directly query or navigate parts of the content repository or access the context within which the web script is executing, such as the currently authenticated user.

**Parent topic:**[Developing a Folder Listing web script](../concepts/ws-folderListing-intro.md)

