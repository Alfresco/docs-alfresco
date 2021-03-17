---
author: Alfresco Documentation
---

# Override Alfresco Share login page

This tutorial demonstrates how to override the default Alfresco Share login page.

Alfresco Surf applications can define a login page by configuring the `login` page-type mapping to reference a specific Page object. In Alfresco Share this definition can be found in the surf.xml configuration file which sets the `login` page-type to map to the `slingshot-login` page.

1.  In the folder alfresco/web-extension, create the file share-config-custom.xml, with the following contents:

    ```
    
    
    <alfresco-config>
       <config evaluator="string-compare" condition="WebFramework">
          <web-framework>
             <defaults>
                <page-type>
                   <id>login</id>
                   <page-instance-id>tutorials-login</page-instance-id>
                </page-type>
             </defaults>
          </web-framework>
       </config>
    </alfresco-config>                        
    
                            
    ```

2.  In the folder alfresco/site-data/pages, create the referenced page as tutorials-login.xml with the following contents:

    ```
    
    
    <page>
       <template-instance>tutorials-login</template-instance>
       <authentication>none</authentication>
    </page>
    
                        
    ```

    **Attention:** Note that the page definition sets the authentication level to `none`. This is necessary otherwise the user would be required to be authenticated, that is logged in, before the login page is displayed.

3.  In the folder alfresco/site-data/template-instances create another file also called tutorials-login.xml with the following content:

    ```
    
    
    <template-instance>
       <template-type>tutorials/tutorials-login</template-type>
    </template-instance>                 
    
                        
    ```

    This file creates the mapping between the Template-Instance object and the FreeMarker template that will actually render your new login page.

4.  In the alfresco/templates/tutorials folder, create the new login page in the file tutorials-login.ftl, with the following content:

    ```
    
    
    <html>
       <head>
          <title>Tutorials Login</title>
       </head>
       <body>
          <h2>Tutorials Login</h2>  
          <form id="loginform" accept-charset="UTF-8" method="post" action="${url.context}/page/dologin">
             Username: <input type="text" id="username" name="username"/><br>
             Password: <input type="password" id="password" name="password"/><br>
             <input type="submit" id="btn-login" />
          </form>
       </body>
    </html>                        
    
                        
    ```

5.  Build the project.

6.  Restart the application server.

7.  View the page `http://localhost:8080/share`.

    **Attention:** Note that you might find that you are logged in automatically without being prompted for user name and password. This is because your validation might be cached in cookies. To resolve this simply remove cookies for your localhost and attempt to access `http://localhost:8080/share` again. This time you will see your custom login page.

    The new login page will be displayed.


**Parent topic:**[Pages](../concepts/dev-extensions-share-tutorials-pages.md)

