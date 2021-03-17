---
author: Alfresco Documentation
---

# Troubleshooting JavaScript Debugger

If starting the JavaScript Debugger on **Microsoft Windows** generates an exception, you can provide a batch file to start Alfresco as a service to work around the issue.

An exception is generated when trying to launch the JavaScript debugger on Windows when Alfresco is running as a service, using the webscript:

```
http://<host>:<port>/alfresco/service/api/javascript/debugger
```

A workaround is to create your own .bat file to start Alfresco.

1.  Finding the actual command line which is run by the service is not obvious, but Tomcat provides some tooling for that. You can run this:

    ```
    
            tomcat\bin\tomcat7w //ES//alfrescoTomcatnum19
            
    ```

    Here `alfrescoTomcatnum19` is the identifier of the service, which can be found in the properties.ini file at the root of the installation.

    This will start a small utility, and in the Java tab you will find all options passed to the JVM.


**Parent topic:**[Troubleshooting](../concepts/ch-troubleshoot.md)

