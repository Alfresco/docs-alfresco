---
author: Alfresco Documentation
---

# Uninstalling an AMP file

Use the Module Management Tool \(MMT\) to uninstall one or more AMP files.

The MMT program, `alfresco-mmt.jar`, is available in the bin directory of the Alfresco installation. MMT uninstalls an AMP file by removing content from the `alfresco.war` and `share.war` files. For more information on the tool, see [Using the Module Management Tool \(MMT\)](../concepts/dev-extensions-modules-management-tool.md).

MMT is a command line tool. The syntax for uninstalling an AMP file using MMT is:

```

java -jar bin/alfresco-mmt.jar ﻿uninstall <ModuleId> <WARFileLocation>
            
```

**Note:** The `apply_amps` command does not uninstall AMP files \(even if you remove the AMP files manually from the amps and amps\_share directories\). Use `apply_amps` to install AMP files only.

For each integration, there is always at least one AMP file to remove from the `alfresco.war` and `share.war` files. AMP files that are applied to `alfresco.war` usually reside in the amps directory, and AMP files that are applied to `share.war` usually reside in the amps\_share directory.

1.  Open a command prompt and change into the root directory of your Alfresco installation.

2.  Check for the presence of the module you wish to delete by typing in the following command:

    ```
    
    ﻿ java -jar bin/alfresco-mmt.jar list tomcat/webapps/alfresco.war                        
                        
    ```

    for `alfresco.war` AMP files, and

    ```
    
    ﻿ java -jar bin/alfresco-mmt.jar list tomcat/webapps/share.war                        
                        
    ```

    for `share.war` AMP files.

    This displays a list of installed modules. Make a note of the module ID of the module you wish to uninstall, for example, `﻿org.alfresco.integrations.google.docs` in the amps directory, and `org.alfresco.integrations.share.google.docs` in the amps\_share directory.

3.  Uninstall the module by entering the following command:

    ```
    
    java -jar bin/alfresco-mmt.jar uninstall ﻿org.alfresco.integrations.google.docs tomcat/webapps/alfresco.war                       
                        
    ```

    and

    ```
    
    java -jar bin/alfresco-mmt.jar uninstall ﻿org.alfresco.integrations.share.google.docs tomcat/webapps/share.war                       
                        
    ```

4.  You can check that the AMP files have been removed by rerunning the command:

    ```
    
    ﻿ java -jar bin/alfresco-mmt.jar list tomcat/webapps/alfresco.war                        
                        
    ```

    and

    ```
    
    ﻿ java -jar bin/alfresco-mmt.jar list tomcat/webapps/share.war                        
                        
    ```

5.  Delete the tomcat/webapps/alfresco and tomcat/webapps/share folders in the Alfresco installation directory.

    Deleting these directories forces Tomcat to read the edited WAR files when Alfresco is restarted.

6.  Restart Alfresco to see your changes.


**Parent topic:**[Uninstalling Alfresco](../concepts/uninstall-overview.md)

