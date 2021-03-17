---
author: Alfresco Documentation
---

# Override Share sign in page

This tutorial demonstrates how to override the default Alfresco Share sign in page.

Surf applications can define a sign in page by configuring the `login` page-type mapping to reference a specific Page object. In Share this definition can be found in the surf.xml configuration file which sets the `login` page-type to map to the `slingshot-login` page.

1.  This tutorial assumes you have generated an [All-In-One SDK 3.0 Project](../concepts/sdk-getting-started.md).

2.  In the aio/aio-share-jar/src/main/resources/META-INF/share-config-custom.xml file, add the following contents:

    ```
    
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
                            
    ```

3.  In the folder aio/aio-share-jar/src/main/resources/alfresco/web-extension/site-data/pages, create the referenced page as tutorials-login.xml with the following contents:

    ```
    
    <page>
       <template-instance>tutorials-login</template-instance>
       <authentication>none</authentication>
    </page>
                        
    ```

    **Attention:** Note that the page definition sets the authentication level to `none`. This is necessary otherwise the user would be required to be authenticated, that is logged in, before the login page is displayed.

4.  In the folder aio/aio-share-jar/src/main/resources/alfresco/web-extension/site-data/template-instances create another file also called tutorials-login.xml with the following content:

    ```
    
    <template-instance>
       <template-type>tutorials/tutorials-login</template-type>
    </template-instance>                 
                        
    ```

    This file creates the mapping between the Template-Instance object and the FreeMarker template that will actually render your new sign in page.

5.  In the aio/aio-share-jar/src/main/resources/alfresco/web-extension/templates/tutorials folder, create the new sign in page in the file tutorials-login.ftl, with the following content:

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

6.  The implementation of this sample is now done, build and start the application server as follows:

    ```
    /all-in-one$ mvn clean install alfresco:run
    ```

7.  View the page `http://localhost:8080/share`.

    **Attention:** Note that you might find that you are logged in automatically without being prompted for user name and password. This is because your validation might be cached in cookies. To resolve this simply remove cookies for your localhost and attempt to access `http://localhost:8080/share` again. This time you will see your custom login page.

    The new sign in page will be displayed.


**Parent topic:**[Pages](../concepts/dev-extensions-share-tutorials-pages.md)

