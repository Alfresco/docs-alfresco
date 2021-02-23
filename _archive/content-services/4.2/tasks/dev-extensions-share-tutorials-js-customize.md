---
author: Alfresco Documentation
---

# Customize Alfresco Share JavaScript controllers

Extension module `customizations` elements can be used to override behaviour of components. This tutorial uses customizations to override the behaviour of the WebView dashlet.

This tutorial demonstrates how to provide an extension to the JavaScript controller file for the web script behind the Web View dashlet. This changes the behaviour of Web View so that the `www.alfresco.com` website is displayed by default.

1.  First, add the **Web View** dashlet to the User Dashboard:

    1.  Log in to Alfresco Share.

    2.  Click the **Customize Dashboard** button \(This is the small gear icon next to Administrator Dashboard if you've logged in as Administrator\).

    3.  Click **Add Dashlets**.

    4.  Drag the **Web View** dashlet from the available list and drop it into one of the dashboard columns.

    5.  Click **OK**.

    Initially, the dashlet displays the message **No web page to display** as it has not yet been configured.



2.  First enable SurfBug, using the page `http://localhost:8080/share/page/surfBugStatus`.

3.  Click on the **Web View** dashlet to find the Web Script URI that renders it.

    The web script URI is `/components/dashlets/webview`.

4.  Browse for Web Scripts by URI \(http://localhost:8080/share/page/index/uri/\) and click `Id:` to display all the necessary information \(including the source of the JavaScript controller\) that you will need.

    By inspecting the source of both the controller and the template, you can work out what model properties the template is using. This allows you to determine whether or not you can update the model after the base controller but before the template to create the desired result.

    Having identified that the dashlet is rendered by a web script using the controller  **webview.get.js** in the **org.alfresco.components.dashlets** package, you can define a new module with a customization to apply to it.

5.  In Eclipse, edit the extension-modules.xml file and add the following module configuration:

    ```
    
                                
    <module>
      <id>Module  (Web View JavaScript controller change) </id>
      <customizations>
        <customization>
            <targetPackageRoot>org.alfresco.components.dashlets</targetPackageRoot>
            <sourcePackageRoot>tutorials.customization</sourcePackageRoot>
         </customization>
        </customizations>
    </module>
    
    
    ```

    The target package can be mapped into the source package `tutorials.customization`.

6.  In the Eclipse Package Explorer locate the folder `webscripts.tutorials.customization` and create a file called **webview.get.js** that contains the following:

    ```
    
    
    if (model.isDefault == true)
    {
        model.widgets[0].options.webviewTitle = "Alfresco!";
        model.widgets[0].options.webviewURI = "http://www.alfresco.com";
        model.widgets[0].options.isDefault = false;
    }
    
    
                            
    ```

7.  Run the build script.

8.  Restart the application server.

9.  Log into Share and deploy the new module.

10. Reload your dashboard.

    You will see that the Web View dashlet now displays the `www.alfresco.com` website.


The custom JavaScript is executed after the original. The original JavaScript sets up an initial model object which the default FreeMarker template can use to render content, but controller extensions have the opportunity to change that model and thus change the rendered output. Using this approach is dependent upon the template making use of the changed model content - just adding content to the model will have no effect unless the template is also updated to make use of the additional model data.

It may not always be possible to use this approach to customize existing components, as it depends on how the JavaScript controller and template are implemented, but the approach is worth exploring.

**Parent topic:**[Tutorials](../concepts/dev-extensions-share-tutorials.md)

