---
author: Alfresco Documentation
---

# 8. Add a new page to Alfresco Share

This tutorial demonstrates how to add a new page to Alfresco Share and then make it the landing page.

In the first part of this tutorial you will see how to add a new page to Alfresco Share. In the second part you will see how to make the new page the default landing page.

1.  Add a new page to Share.

    Adding a new page into Alfresco Share requires a minimum of three files:

    -   A Page definition file
    -   A Template-Instance definition file
    -   A FreeMarker template file
    Examples of minimal implementation for these files are given in the following code snippets:

    -   home-page.xml - Page definition. This file defines the page to name \(which is the file name\) and a mapping to a Template-Instance that contains the content. It also defines the level of authentication required to view the page.

        ```
        
                            
                            <page>
                                <template-instance>home-page</template-instance>
                                <authentication>user</authentication>
                            </page>
                            
                            
        ```

    -   home-page.xml - Template-Instance definition. This creates a mapping to the actual FreeMarker template that contains the content for the page.

        ```
        
                            
                            <template-instance>
                                <template-type>blog/demo/home-page</template-type>
                            </template-instance>
                            
                            
        ```

    -   home-page.ftl - FreeMarker template file. This contains the actual page content. The example shown here is trivial but this could also contain regions for binding Spring Surf components if required.

        ```
        
                            
                            <html>
                                <head>
                                    <title>Blog Application</title>
                                </head>
                                <body>
                                    Welcome To Extreme Share Customization!
                                </body>
                            </html>                    
                            
                            
        ```

    1.  Create the preceding files.

    2.  Build the files into a JAR file with the following structure:

        -   /alfresco/site-data/pages/home-page.xml
        -   /alfresco/site-data/template-instances/home-page.xml
        -   /alfresco/templates/blog/demo/home-page.ftl
    3.  Assuming you are using Tomcat, copy the JAR file into the directory webapps/share/WEB-INF/lib.

    4.  Restart your web server and then open the following location in your browser `http://localhost:8080/share/page/home-page`. This assumes you are running a local server and using the default ports.

        You will be prompted with the standard Alfresco Share login screen.

        You are asked to log in because in the page definition file you set the authentication level to be `user`, that is the page is accessible to all logged in users. To create a page that can only be accessed by administrators using an authentication level of `admin`. To create a page that can be accessed by any user, including those who are not logged in, set the authentication level to `none`.

    5.  Log in using your credentials.

        After logging in your new home page will be displayed.

        Note that the FreeMarker template for the new page can contain any HTML/JavaScript/CSS code necessary. You are not restricted to using YUI2 code as is used in the implementation of Alfresco Share. It is possible to implement the new page in JQuery, Dojo, pure HTML, or any other valid code.

        As well as being able to re-use the standard Alfresco Share authentication mechanism you are also able to access all the web scripts available on both the Web and Repository tiers. This means you can build your own UI around existing Alfresco functionality.

        **Note:** When using resources such as images, JavaScript and CSS files, it is important to remember that they should be located under the META-INF folder in your JAR file. Also, it is necessary to use the `/res` prefix on subsequent requests to the resources. For example, to request the file META-INF/blog/demo/example.css, the URL /share/res/blog/demo/example.css would be used.

2.  Make the new page the default landing page.

    Spring Surf supports the notion of a default page which is defined in the configuration for the entire web site. By default the landing page is site-index.jsp, which redirects to the authenticated user's dashboard page. The site default landing page will be rendered when a request is mapped to the Spring MVC RequestDispatcher \(which by default is at /page and /p\) but no page is included in the request, for example, /share/page. This is also configured as the welcome-file in the Share web.xml file.

    In order to change the landing page for the application you can override the default site configuration for Alfresco Share. The site configuration used is defined in surf.xml and is set to slingshot.site.configuration by default.

    1.  Create a file called slingshot.site.configuration.xml

        The file should contain the following code:

        ```
        
                                        
                                    <configuration>
                                        <source-id>site</source-id>
                                        <properties>
                                            <root-page>home-page</root-page>
                                        </properties>
                                    </configuration>
                                    
                                    
        ```

    2.  Build slingshot.site.configuration.xml into a JAR file at the location /alfresco/web-extension/site-data/configurations.

        Note that the file is located on the web-extension path so that it is resolved before the Alfresco Share default.

    3.  Copy the JAR file to webapps/share/WEB-INF/lib.

    4.  Restart the Tomcat server \(or other web server you are using\).

    5.  Load the page `http://localhost:8080/share`, assuming you are running the server locally and using the default port.

        After logging in your new landing page will be displayed.


**Parent topic:**[Tutorials](../concepts/surf_share_v4-tutorials.md)

