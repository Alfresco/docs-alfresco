---
author: Alfresco Documentation
---

# 9. Override Alfresco Share login page

This tutorial demonstrates how to override the default Alfresco Share login page.

Spring Surf applications can define a login page by configuring the `login` page-type mapping to reference a specific Page object. In Alfresco Share this definition can be found in the surf.xml configuration file which sets the `login` page-type to map to the `slingshot-login` page.

1.  Add the following content to your file share-config-custom.xml file, created in the preceding tutorial, and save the file into the directory alfresco/web-extension.

    ```
    
    
    <alfresco-config>
       <config evaluator="string-compare" condition="WebFramework">
          <web-framework>
             <defaults>
                <page-type>
                   <id>login</id>
                   <page-instance-id>blog-login</page-instance-id>
                </page-type>
             </defaults>
          </web-framework>
       </config>
    </alfresco-config>                        
    
                            
    ```

2.  Create the referenced page as blog-login.xml with the following content and save into the directory alfresco/site-data/pages.

    ```
    
    
    <page>
       <template-instance>blog-login</template-instance>
       <authentication>none</authentication>
    </page>
    
                        
    ```

    **Note:** Note that the page definition sets the authentication level to `none`. This is necessary otherwise the user would be required to be authenticated, that is logged in, before the login page is displayed.

3.  Now create another file also called blog-login.xml with the following content, and save it to the directory alfresco/site-data/template-instances.

    ```
    
                        
    <template-instance>
       <template-type>blog/demo/blog-login</template-type>
    </template-instance>                 
                        
                        
    ```

    This file creates the mapping between the Template-Instance object and the FreeMarker template that will actually render your new login page.

4.  Create the new login page in the file blog-login.ftl, with the following contents, and place it in the alfresco/templates/blog/demo directory.

    ```
    
                            
    <html>
       <head>
          <title>Blog Application Login</title>
       </head>
       <body>
          <form id="loginform" accept-charset="UTF-8" method="post" action="${url.context}/page/dologin">
             Username: <input type="text" id="username" name="username"/><br>
             Password: <input type="password" id="password" name="password"/><br>
             <input type="submit" id="btn-login" />
          </form>
       </body>
    </html>                        
                            
                        
    ```

5.  Build the JAR file and copy it to /webapps/share/WEB-INF/lib.

6.  Restart the server.

7.  View the page `http://localhost:8080/share` \(this assumes you are running a local server and using the default port\).

    The new login page will be displayed.


**Parent topic:**[Tutorials](../concepts/surf_share_v4-tutorials.md)

