---
author: Alfresco Documentation
---

# Customize Alfresco Share FreeMarker templates

In this tutorial you see how to add content to a page by using the `<@region>` directive extension.

You will need to identify the template file being used to display the page. Once this file has been identified using SurfBug, you can create customization that uses the `<@region>` directive to insert content, replace content or remove content.

1.  Enable **SurfBug** and click on the footer. Note the **Template Type** property, which in this case is **org/alfresco/dashboard**. This means that the file that you need to extend is dashboard.ftl in the `org.alfresco` package.

2.  Update the extension-modules.xml file to add the following module definition:

    ```
    
    
    <module>
      <id>Module  (Add Region) </id>
      <customizations>
        <customization>
              <targetPackageRoot>org.alfresco</targetPackageRoot>
              <sourcePackageRoot>tutorials.customization</sourcePackageRoot>
         </customization>
        </customizations>
    </module>
    
    
    ```

3.  In the Eclipse Package Explorer create a new folder structure `alfresco.templates.tutorials.customization`.

4.  In the newly created customization folder, create a file called dashboard.ftl with the following contents:

    ```
    
                                
    <@region id="additional-content" target="footer" action="before" scope="global" />
    
    
    ```

    **Note:**

    The package you have added the file to is prefixed by `alfresco.templates`. This is the source package at which Spring Surf Class Loader starts looking for template files. It is critical to include this prefix to your package or your extension will not be found.

    Next, you create a new Component to bind to your new Region. You will use the legacy configuration style \(although you could use the new style, this way is shorter and suitable for our purposes\).

5.  In the Eclipse Package Explorer create a new folder called `components` under config/alfresco/site-data.

6.  In the newly created `config/alfresco/site-data/components` folder, create a file called `global.additional-content.xml` with the following contents:

    ```
    
    
    <component>
       <region-id>additional-content</region-id>
       <source-id>global</source-id>
       <scope>global</scope>
       <uri>/tutorials/new-content</uri>
       </component>
    
    
    ```

    CAUTION:

    You are reusing the same web script \(`new-content.get.html.ftl`\) created in the [Add Content to an Alfresco Share Page](dev-extensions-share-tutorials-add-content.md) tutorial. If you have not completed that tutorial, then the Component will not find the web script specified by the `<uri>` element.

7.  In the Package Explorer locate the file config/alfresco/site-webscripts/new-content.get.html.ftl.

8.  Load the file into the editor and make the following minor change \(to help ensure that the web script is running as expected\):

    ```
    
                            
    ﻿<div>
      Hello World - add region!
    </div>
                            
                        
    ```

9.  Run your build script

10. Restart the application server.

11. Deploy the module in Share.

12. If you want to test out the other customization operations, you can update the dashboard.ftl file as follows:

    -   To place the new content *after* the footer:`<@region id="additional-content" target="footer" action="after" scope="global"/>`
    -   To *replace* the content of the footer with the new content:`<@region id= "additional-content" target= "footer" action= "replace" scope= "global"/>`
    -   To *remove* the footer region completely:`<@region id="additional-content" target="footer" action="remove"/>`

-   **[About FreeMarker extensibility directives](../concepts/dev-extensions-share-tutorials-fm-models-about.md)**  
Extensibility directives provide a way of dynamically editing HTML through configuration.

**Parent topic:**[Tutorials](../concepts/dev-extensions-share-tutorials.md)

