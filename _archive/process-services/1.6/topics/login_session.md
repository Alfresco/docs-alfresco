---
author: Alfresco Documentation
---

# Login Session

To invalidate the current APS app login session when you close the web browser, do the following:

1.  Open the <InstallLocation\>/tomcat/lib/activiti-app.properties file.
2.  Locate and set `security.use-http-session` to true.

    ```
    security.use-http-session=true
    ```

    Set this property to false if you do not wish to enable this behaviour. By default, closing the web browser will maintain the session cookie and will keep the current login session open.


**Parent topic:**[Configuring Alfresco Process Services](../topics/administration_application_config.md)

