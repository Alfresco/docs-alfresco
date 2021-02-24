---
audience: 
---

# Uninstalling the Records Management AMP files

The Records Management AMP files can be uninstalled using the Module Management Tool \(MMT\).

Records Management \(RM\) consists of two AMP files, which are applied during installation. One of the AMP files, representing the core RM functionality, is applied to the Alfresco WAR file, and the other, representing the RM Share UI component is applied to the Share WAR file. Both of the AMP files need to be removed in order to uninstall RM. Use the Module Management Tool \(MMT\) to do this. For more information on the tool, see [Module Management Tool \(MMT\)](http://docs.alfresco.com/5.2/concepts/dev-extensions-modules-management-tool.html)

MMT is a command line tool. The syntax for uninstalling an AMP file using MMT is:

```

          java -jar bin\alfresco-mmt.jar ﻿uninstall <ModuleId> <WARFileLocation>
        
```

**Note:** The `apply_amps` command does not uninstall AMP files \(even if you remove the AMP files manually from the amps and amps\_share directories\). Use `apply_amps` to install AMP files only.

1.  Change into the root of the Alfresco installation directory.

2.  Find the core RM AMP file using the following command:

    ```
    
                ﻿ java -jar bin\alfresco-mmt.jar list tomcat\webapps\alfresco.war                        
              
    ```

    This shows the core RM component:

    ```
    Module 'org_alfresco_module_rm' installed in 'tomcat\webapps\alfresco.war'
                -    Title:        Records Management
                -    Version:      2.7
                -    Install Date: Sun May 6 12:04:49 BST 2018
                -    Description:   Alfresco Record Management Extension
    ```

    ```
    Module 'alfresco-rm-enterprise-repo' installed in 'tomcat\webapps\alfresco.war'
                -    Title:        Records Management
                -    Version:      2.7
                -    Install Date: Sun May 6 12:04:49 BST 2018
                -    Description:   Alfresco Record Management Extension
    ```

    You'll need the Module ID, `org_alfresco_module_rm``alfresco-rm-enterprise-repo`, to uninstall the AMP file.

3.  Find the Share RM AMP file using the following command:

    ```
    
                ﻿ java -jar bin\alfresco-mmt.jar list tomcat\webapps\share.war                        
              
    ```

    This shows the Share RM component:

    ```
    
                Module 'org_alfresco_module_rm_share' installed in 'tomcat\webapps\share.war'
                -    Title:        Alfresco Record Management Share Extension
                -    Version:      2.7
                -    Install Date: Sun May 6 12:05:24 BST 2018
                -    Description:   Alfresco Record Management Share Extension           
              
    ```

    ```
    
                Module 'alfresco-rm-enterprise-share' installed in 'tomcat\webapps\share.war'
                -    Title:        Alfresco Record Management Share Extension
                -    Version:      2.7
                -    Install Date: Sun May 6 12:05:24 BST 2018
                -    Description:   Alfresco Record Management Share Extension           
              
    ```

    You'll need the Module ID, `org_alfresco_module_rm_share` `alfresco-rm-enterprise-share`, to uninstall the AMP file.

4.  Use these commands to uninstall the AMP files:

    ```
    
                java -jar bin\alfresco-mmt.jar uninstall org_alfresco_module_rm tomcat\webapps\alfresco.war            
              
    ```

    ```
    
                java -jar bin\alfresco-mmt.jar uninstall org_alfresco_module_rm_share tomcat\webapps\share.war            
              
    ```

5.  Use these commands to uninstall the AMP files:

    ```
    
                java -jar bin\alfresco-mmt.jar uninstall alfresco-rm-enterprise-repo tomcat\webapps\alfresco.war            
              
    ```

    ```
    
                java -jar bin\alfresco-mmt.jar uninstall alfresco-rm-enterprise-share tomcat\webapps\share.war            
              
    ```

6.  You can check that the AMP files have been removed by rerunning the commands:

    ```
    
              ﻿ java -jar bin\alfresco-mmt.jar list tomcat\webapps\alfresco.war                        
            
    ```

    and

    ```
    
                ﻿ java -jar bin\alfresco-mmt.jar list tomcat\webapps\share.war                        
              
    ```

7.  Delete the tomcat\\webapps\\alfresco and tomcat\\webapps\\share folders in the Alfresco installation directory.

    Deleting these directories forces Tomcat to read the edited WAR files when Alfresco is restarted.

8.  Restart Alfresco to see your changes.


**Parent topic:**[Installing](../tasks/rm-install-proc.md)

