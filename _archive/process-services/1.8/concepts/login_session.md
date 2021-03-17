---
author: Alfresco Documentation
---

# Login session

It is possible to invalidate the current Process Services app login session when you close the web browser. By default, closing the web browser will maintain the session cookie and will keep the current login session open.

To invalidate the login session, do the following:

1.  Open the <InstallLocation\>/tomcat/lib/activiti-app.properties file.
2.  Locate and set `security.use-http-session` to true.

    ```
    security.use-http-session=true
    ```

    Set this property to false if you do not wish to enable this behavior.


**Parent topic:**[Configuring Alfresco Process Services](../topics/administration_application_config.md)

