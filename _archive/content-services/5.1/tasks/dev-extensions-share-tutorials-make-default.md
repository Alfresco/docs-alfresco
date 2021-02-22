---
author: Alfresco Documentation
---

# Making the new page the default

This tutorial demonstrates how to make the new page you created in the previous tutorial the default landing page.

In this tutorial you will see how to make a page the default landing page.

Alfresco Surf supports the notion of a default page which is defined in the configuration for the entire web site. By default the landing page is site-index.jsp, which redirects to the authenticated user's dashboard page. The site default landing page will be rendered when a request is mapped to the Spring MVC RequestDispatcher \(which by default is at /page and /p\) but no page is included in the request, for example, /share/page. This is also configured as the welcome-file in the Share web.xml file.

In order to change the landing page for the application you can override the default site configuration for Alfresco Share. The site configuration used is defined in surf.xml and is set to slingshot.site.configuration by default.

1.  Create a new folder called `web-extension` in config/alfresco.

2.  Create another new folder called `site-data` in config/alfresco/web-extension.

3.  Create another new folder called `configurations` in config/alfresco/web-extension/site-data

4.  In the folder config/alfresco/web-extension/site-data/configurations create a file called slingshot.site.configuration.xml, with the following contents:

    ```
    
    
    <configuration>
        <source-id>site</source-id>
        <properties>
            <root-page>home-page</root-page>
        </properties>
    </configuration>
    
                                
    ```

    **Attention:** Note that the file is located on the web-extension path so that it is resolved before the Alfresco Share default.

5.  Run the project build script to build the project.

6.  Restart the application server.

7.  Load the page `http://localhost:8080/share`.

    After logging in your new landing page will be displayed.


**Parent topic:**[Pages](../concepts/dev-extensions-share-tutorials-pages.md)

