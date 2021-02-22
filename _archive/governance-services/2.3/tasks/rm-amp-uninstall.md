---
audience: 
---

# Uninstalling the Records Management AMP files

The Records Management AMP files can be uninstalled using the Module Management Tool \(MMT\).

Records Management \(RM\) consists of two AMP files, which are applied during installation. One of the AMP files, representing the core RM functionality, is applied to the Alfresco WAR file, and the other, representing the RM Share UI component is applied to the Share WAR file. Both of the AMPs need to be removed in order to uninstall RM. This is achieved using the Module Management Tool \(MMT\). For uninstalling a module the usage is as follows:

```
usage: uninstall <ModuleId> <WARFileLocation>
```

1.  Change into the root of the Alfresco installation directory.

2.  Change into the .\\bin directory of your Alfresco installation.

    This is where the Module Management Tool \(MMT\) is located.

3.  Establish the presence of the core RM AMP file, and make a note of its Module ID, using the following command:

    ```
    
    java -jar alfresco-mmt.jar list ..\tomcat\webapps\alfresco.war
              
    ```

    This shows the core RM component:

    ```
    Module 'org_alfresco_module_rm' installed in '..\tomcat\webapps\alfresco.war'
       -    Title:        Records Management
       -    Version:      2.3
       -    Install Date: Mon November 10 12:04:49 BST 2014
       -    Description:   Alfresco Record Management Extension                     
    ```

    You need to know the Module ID in order to uninstall the AMP file.

4.  Establish the presence of the RM Share UI AMP file, and make a note of its Module ID, using the following command:

    ```
    
    java -jar alfresco-mmt.jar list ..\tomcat\webapps\share.war
            
    ```

    This shows the Share UI component:

    ```
    
    Module 'org_alfresco_module_rm_share' installed in '..\tomcat\webapps\share.war'
     -    Title:        Alfresco Record Management Share Extension
     -    Version:      2.3
     -    Install Date: Mon November 10 12:05:24 BST 2014
     -    Description:   Alfresco Record Management Share Extension           
              
    ```

    You need to know the Module ID in order to uninstall the AMP file.

5.  To uninstall the RM core AMP file, type the following command:

    ```
    
    java -jar alfresco-mmt.jar uninstall org_alfresco_module_rm ..\tomcat\webapps\alfresco.war            
              
    ```

6.  To uninstall the RM Share AMP file, type the following command:

    ```
    
    java -jar alfresco-mmt.jar uninstall org_alfresco_module_rm_share ..\tomcat\webapps\share.war            
              
    ```


Records Management has now been uninstalled.

**Parent topic:**[Installing Records Management](../tasks/rm-install-proc.md)

