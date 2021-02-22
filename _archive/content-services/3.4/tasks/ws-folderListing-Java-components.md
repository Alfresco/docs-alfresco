---
author: Alfresco Documentation
---

# Creating the scripted components of a Folder Listing web script

The first task in creating a Folder Listing web script is to create the scripted components.

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

    4.  Click **Create Space**.

5.  Create a web script description document for the Java Folder Listing example:

    1.  In the Create menu, click **Create Content**.

    2.  Enter the name for the web script in the Name field, such as: javadir.get.desc.xml

    3.  In the Content Type list, select **XML**.

    4.  Click **Next**.

    5.  Type the following in the Enter Content box:

        ```
        <webscript>
          <shortname>Folder Listing Utility</shortname>
          <description>Java-backed implementation of listing folder contents
          </description>
          <url>/javadir/{folderpath}?verbose={verbose?}</url>
          <authentication>user</authentication>
        </webscript>
        ```

    6.  Click **Next**, click **Finish**, and then click **OK**.

6.  Create a web script response template for your Java Folder Listing example:

    1.  In the Create menu, click **Create Content**.

    2.  Enter the name for the web script in the Name field, such as: javadir.get.html.ftl

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


The web script description specifies a URI template containing the tokens `{folderpath}` and `{verbose?}`. The `folderpath` token represents the folder to list and the `verbose` URI argument specifies whether a verbose listing is required or not. The HTML response template renders the contents of the specified folder, taking into account the `verbose` flag. It does this by accessing the web script model values named `folder` and `verbose`.

The web script is not yet complete, as it is still missing its controller. The controller must parse the URI to extract the token values, interact with the Alfresco content repository to locate the specified folder, and populate the model for subsequent rendering by the HTML response template.

**Parent topic:**[Creating a Folder Listing Java-backed web script](../tasks/ws-folderListing-Java-scripting.md)

