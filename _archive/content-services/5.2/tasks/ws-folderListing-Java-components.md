---
author: Alfresco Documentation
---

# Creating the scripted components of a Folder Listing web script

The first task in creating a Folder Listing web script is to create the scripted components.

1.  Log in to Alfresco Share:

    1.  Open a web browser and enter the URL: `http://localhost:8080/share`

    2.  If prompted, log in with the user name `admin` and password `admin`.

2.  Click the Repository link in the Share header.

3.  Navigate to **Data Dictionary \> Web Scripts Extensions \> org \> example**.

4.  Create a web script description document for the Java Folder Listing example:

    1.  In the Create menu, select **XML**.

    2.  Enter the name for the web script in the Name field: `javadir.get.desc.xml`

    3.  Type the following in the content box:

        ```
        
        
        <webscript>
          <shortname>Folder Listing Utility</shortname>
          <description>Java-backed implementation of listing folder contents
          </description>
          <url>/javadir/{folderpath}?verbose={verbose?}</url>
          <authentication>user</authentication>
        </webscript>
        
        
        ```

    4.  Click **Create**.

    5.  Navigate back to the org/example folder using the breadcrumb trail.

5.  Create a web script response template for your Java Folder Listing example:

    1.  In the Create menu, select **Plain Text**.

    2.  Enter the name for the web script in the Name field: `javadir.get.html.ftl`

    3.  Type the following in the content box:

        ```
        
        
        <html>
         <head>
          <title>Folder ${folder.displayPath}/${folder.name}</title>
          </head>
         <body>
           <p>Alfresco ${server.edition} Edition v${server.version} : dir</p>
          <p>Contents of folder ${folder.displayPath}/${folder.name}</p>
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

    4.  Click **Create**.

    5.  Navigate back to the org/example folder using the breadcrumb trail.


The web script description specifies a URI template containing the tokens `{folderpath}` and `{verbose?}`. The `folderpath` token represents the folder to list and the `verbose` URI argument specifies whether a verbose listing is required or not. The HTML response template renders the contents of the specified folder, taking into account the `verbose` flag. It does this by accessing the web script model values named `folder` and `verbose`.

The web script is not yet complete, as it is still missing its controller. The controller must parse the URI to extract the token values, interact with the repository to locate the specified folder, and populate the model for subsequent rendering by the HTML response template.

**Note:** It is also possible to create these files as stand-alone files using an external text editor. Once these files are created you could locate them as follows:

```

./tomcat/shared/classes/alfresco/extension/templates/webscripts/org/example/javadir.get.desc.xml
./tomcat/shared/classes/alfresco/extension/templates/webscripts/org/example/javadir.get.html.ftl      
    
```

**Parent topic:**[Creating a Folder Listing Java-backed web script](../tasks/ws-folderListing-Java-scripting.md)

