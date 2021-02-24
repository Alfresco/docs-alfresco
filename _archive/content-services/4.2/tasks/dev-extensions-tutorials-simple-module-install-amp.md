---
author: Alfresco Documentation
---

# Installing the AMP file

In this task you will learn how to install the AMP file using the simple Ant script you created earlier in this tutorial. An AMP file is installed using the Module Management Tool. This tool applies the AMP file to the target WAR file and also provides the ability to uninstall the module, and list currently installed modules.

In the previous task you built and located the AMP file in the amps directory of the Alfresco installation. You now need to complete the installation of the AMP file. The AMP file can be installed in one of two ways:

-   Using the Module Management Tool \(MMT\) bin/alfresco-mmt.jar directly
-   Using the “apply amps” script bin/apply\_amps.sh

This tutorial looks at using the MMT directly. The script apply\_amps.sh is simply a convenience script that wraps the MMT.

1.  Change into the root of your Alfresco installation.

2.  First, run the MMT to display its help:

    ```
    
                            
    java -jar bin/alfresco-mmt.jar                        
                            
                        
    ```

    This displays the following information:

    ```
    
                            
    ﻿Module managment tool available commands:
    -----------------------------------------------------------
    
    install: Installs a AMP file(s) into an Alfresco WAR file, updates if an older version is already installed.
    usage:   install <AMPFileLocation> <WARFileLocation> [options]
    valid options: 
       -verbose   : enable verbose output
       -directory : indicates that the amp file location specified is a directory.
                    All amp files found in the directory and its sub directories are installed.
       -force     : forces installation of AMP regardless of currently installed module version
       -preview   : previews installation of AMP without modifying WAR file
       -nobackup  : indicates that no backup should be made of the WAR
    
    -----------------------------------------------------------
    
    list:  Lists all the modules currently installed in an Alfresco WAR file.
    usage: list <WARFileLocation>
    
    -----------------------------------------------------------
    
    uninstall:  Uninstalls a module from the Alfresco WAR file.
    usage: uninstall <ModuleId> <WARFileLocation>
    
    -----------------------------------------------------------
                            
                            
                        
    ```

3.  Before installing the AMP it is wise to first preview any changes that might be made, without actually installing the module. This can be done with the preview option:

    ```
    
                            
    ﻿java -jar bin/alfresco-mmt.jar install amps/com_alfresco_tutorials_photo_search.amp tomcat/webapps/alfresco -preview
    
                        
    ```

    This generates the following output:

    ```
    
                            
    Installing AMP 'amps/com_alfresco_tutorials_photo_search.amp' into WAR 'tomcat/webapps/alfresco'
    Adding files relating to version '1.0' of module 'com_alfresco_tutorials_photo_search'
       - File '/WEB-INF/classes/alfresco/extension/templates/webscripts/photo-search.get.desc.xml' added to war from amp
       - File '/WEB-INF/classes/alfresco/extension/templates/webscripts/photo-search.get.html.ftl' added to war from amp
       - File '/WEB-INF/classes/alfresco/extension/templates/webscripts/photo-search.get.js' added to war from amp
       - Directory '/WEB-INF/classes/alfresco/extension/templates/webscripts' added to war
       - Directory '/WEB-INF/classes/alfresco/extension/templates' added to war
       - Directory '/WEB-INF/classes/alfresco/extension' added to war                        
                            
                        
    ```

    By viewing this output you can see where the files will be copied to within the WAR file.

4.  Now install the AMP:

    ```
    
                            
    java -jar bin/alfresco-mmt.jar install amps/com_alfresco_tutorials_photo_search.amp tomcat/webapps/alfresco.war                        
                            
                        
    ```

5.  Now list the installed modules in the alfresco.war file:

    ```
    
                            
    ﻿java -jar bin/alfresco-mmt.jar list tomcat/webapps/alfresco.war
                            
                        
    ```

    You will see the following information displayed:

    ```
    
                            
    Module 'com_alfresco_tutorials_photo_search' installed in 'tomcat/webapps/alfresco'
       -    Title:        Photo Search Module
       -    Version:      1.0
       -    Install Date: Tue Jun 25 16:12:15 BST 2013
       -    Description:   A simple module that contains web scripts to do a photo search                                                
                            
                        
    ```

6.  You can now test the installed web scripts. You can create a site called `sample-site` and upload some photos and other documents to its document library using Share. Then use `﻿http://127.0.0.1:8080/alfresco/service/photo-search/sample-site` to obtain a list of photos, along with some EXIF data. If you are not sure how to do this refer to [this tutorial](ws-photo-search.md) for full details on testing the web script.


You have installed and tested a simple module. In the next task you will see how to uninstall it.

**Parent topic:**[Creating a simple module with Ant](../tasks/dev-extensions-tutorials-simple-module.md)

