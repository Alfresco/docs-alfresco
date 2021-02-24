---
author: Alfresco Documentation
---

# Test your module

In this task you test your module. You have created a Java-backed web script and packaged it up as an AMP for deployment. You will now test the web script as you would any other web script.

In the previous task you installed the AMP file using the `update-war` target.

1.  Restart Alfresco.

2.  Invoke Alfresco Share and create a test folder in the Repository \(Company Home\), called test.

3.  Upload a number of files into the test directory.

4.  Create several test directories in the test folder.

5.  In your web browser navigate to the address:

    ```
    
    ﻿http://127.0.0.1:8080/alfresco/service/javadir/Company%20Home/test                        
                        
    ```

    The browser will return a list of files and directories, the directories will be prepended with a “d”.


You have now tested your web script. The AMP format provides a convenient way to distribute this extension to the wider community.

**Parent topic:**[Creating a Java-backed web script module with Ant](../tasks/dev-extensions-tutorials-java-web-script-module.md)

