---
title: Uninstalling the Governance Services AMP files
---

The Governance Services AMP files can be uninstalled using the Module Management Tool (MMT).

Governance Services consists of two AMP files, which are applied during installation. One of the AMP files, 
representing the core Governance Services functionality, is applied to the Alfresco Repository WAR file, and the other, 
representing the Governance Services UI component is applied to the Alfresco Share WAR file. 

Both of the AMP files need to be removed in order to uninstall Governance Services. 
Use the Module Management Tool (MMT) to do this. For more information on the tool, 
see [Module Management Tool (MMT)]({% link content-services/latest/develop/extension-packaging.md %}#using-the-module-management-tool-mmt)

The MMT is a command line tool. The syntax for uninstalling an AMP file using MMT is:

```bash
$ java -jar bin\alfresco-mmt.jar uninstall <ModuleId> <WARFileLocation>
```

> **Note:** The `apply_amps` command does not uninstall AMP files (even if you remove the AMP files manually from the `amps` and `amps_share` directories). Use `apply_amps` to install AMP files only.

1. Change into the root of the Alfresco installation directory.

2. Find the core Governance Services AMP file using the following command:

    ```bash
    $ java -jar bin\alfresco-mmt.jar list tomcat\webapps\alfresco.war                                  
    ```

    This shows the core RM components:

    ```bash
    Module 'org_alfresco_module_rm' installed in 'webapps/alfresco'
       -    Title:        AGS Repo
       -    Version:      7.3
       -    Install Date: null
       -    Description:   Alfresco Governance Services Repository Extension
    Module 'alfresco-rm-enterprise-repo' installed in 'webapps/alfresco'
       -    Title:        AGS Enterprise Repo
       -    Version:      7.3
       -    Install Date: Tue Nov 18 08:50:15 UTC 2022
       -    Description:   Alfresco Governance Services Enterprise Repository Extension    
   ```

    To uninstall the AMP file, you'll need the Enterprise Module ID `alfresco-rm-enterprise-repo`.

3. Find the Share RM AMP file using the following command:

    ```bash
    $ java -jar bin\alfresco-mmt.jar list tomcat\webapps\share.war                        
    ```

    This shows the Share RM component:

    ```bash
    Module 'alfresco-rm-enterprise-share' installed in 'tomcat\webapps\share.war'
    -    Title:        Alfresco Record Management Share Extension
    -    Version:      7.3
    -    Install Date: Tue Nov 18 08:50:15 UTC 2022
    -    Description:   Alfresco Record Management Share Extension              
    ```

    To uninstall the AMP file, you'll need the Enterprise Module ID `alfresco-rm-enterprise-share`.

4. Use these commands to uninstall the AMP files:

    ```bash
    $ java -jar bin\alfresco-mmt.jar uninstall alfresco-rm-enterprise-repo tomcat\webapps\alfresco.war            
    ```

    ```bash
    $ java -jar bin\alfresco-mmt.jar uninstall alfresco-rm-enterprise-share tomcat\webapps\share.war            
    ```

5. You can check that the AMP files have been removed by rerunning the commands:

    ```bash
    $ java -jar bin\alfresco-mmt.jar list tomcat\webapps\alfresco.war                        
    ```

    and

    ```bash
    $ java -jar bin\alfresco-mmt.jar list tomcat\webapps\share.war                                      
    ```

6. Delete the `tomcat\webapps\alfresco` and `tomcat\webapps\share` folders in the Alfresco installation directory.

    Deleting these directories forces Tomcat to read the edited WAR files when Alfresco is restarted.

7. Restart Alfresco to see your changes.
