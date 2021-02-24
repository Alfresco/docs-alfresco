---
author: Alfresco Documentation
---

# Add a new page to Alfresco Share

This tutorial demonstrates how to add a new page to Alfresco Share.

In this tutorial you will see how to add a new page to Alfresco Share. In the following tutorial you will see how to make this new page the default landing page.

Adding a new page into Alfresco Share requires a minimum of three files:

-   A Page definition file
-   A Template-Instance definition file
-   A FreeMarker template file

1.  In the Eclipse Package Explorer, create a new folder called `pages` in config/alfresco/site-data/.

2.  In the pages folder create a new file called home-page.xml with the following contents:

    ```
    
                            
    <page>
        <template-instance>home-page</template-instance>
        <authentication>user</authentication>
    </page>                        
                            
                        
    ```

    This is the page definition file. This defines the page name \(which is the file name\) and a mapping to a Template-Instance that contains the content. It also defines the level of authentication required to view the page.

3.  In the Package Explorer, in config/alfresco/site-data, create another new folder called `template-instances`.

4.  In the newly created `template-instances` folder, create a new file, also called `home-page.xml` with the following contents:

    ```
    
    
    <template-instance>
        <template-type>tutorials/home-page</template-type>
    </template-instance>
                         
                        
    ```

    This is the Template-Instance definition. This creates a mapping to the actual FreeMarker template that contains the content for the page.

5.  Create a new file in config/alfresco/templates/tutorials called home-page.ftl with the following contents:

    ```
    
    
    <html>
        <head>
            <title>Tutorials Application</title>
        </head>
        <body>
            Welcome To Extreme Share Customization!
        </body>
    </html>                    
    
                        
    ```

    This is the FreeMarker template file. This contains the actual page content. The example shown here is trivial but this could also contain regions for binding Spring Surf components if required.

6.  Build your project using the Ant build script as done in previous tutorials.

7.  Restart the application server.

8.  In your web browser open the following location `http://localhost:8080/share/page/home-page`.

    You will be prompted with the standard Alfresco Share login screen.

    You are asked to log in because in the page definition file you set the authentication level to be `user`, that is the page is accessible to all logged in users. To create a page that can only be accessed by administrators using an authentication level of `admin`. To create a page that can be accessed by any user, including those who are not logged in, set the authentication level to `none`.

9.  Log in using your credentials.

    After logging in your new home page will be displayed.

    Note that the FreeMarker template for the new page can contain any HTML/JavaScript/CSS code necessary. You are not restricted to using YUI2 code as is used in the implementation of Alfresco Share. It is possible to implement the new page in JQuery, Dojo, pure HTML, or any other valid code.

    As well as being able to re-use the standard Alfresco Share authentication mechanism you are also able to access all the web scripts available on both the Web and Repository tiers. This means you can build your own UI around existing Alfresco functionality.

    **Note:** When using resources such as images, JavaScript and CSS files, it is important to remember that they should be located under the META-INF folder in your JAR file. Also, it is necessary to use the `/res` prefix on subsequent requests to the resources. For example, to request the file META-INF/tutorials/example.css, the URL /share/res/tutorials/example.css would be used.


**Parent topic:**[Tutorials](../concepts/dev-extensions-share-tutorials.md)

