---
author: [Alfresco Documentation, Alfresco Documentation]
---

# Configuring Share to remove persistent cookies

Use this information to turn off cookies that store a user name after a session expires.

By default, a cookie is stored that allows you to repopulate the user name after a user logs out, or the session expires. Follow these instructions if you do not want this user name stored.

1.  Open the following file:

    tomcat/shared/classes/alfresco/web-extension/share-config-custom.xml

2.  Set the `enableCookie` property to `false`.

    ```
    <config evaluator="string-compare" condition="Cookie" replace="true">
      <cookie>
           <enableCookie>false</enableCookie>
      </cookie>
    </config>
    
    ```

    and disable the login cookie:

    ```
    <config evaluator="string-compare" condition="WebFramework">
      <web-framework>
          <defaults>
             <login-cookies-enabled>false</login-cookies-enabled>
          </defaults>
      </web-framework>
    </config>
    ```

3.  Save the edited file.

4.  Restart Alfresco.


**Parent topic:**[Configuring Alfresco Share](../concepts/share-configuring-intro.md)

