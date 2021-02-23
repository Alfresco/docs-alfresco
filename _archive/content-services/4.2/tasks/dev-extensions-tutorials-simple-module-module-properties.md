---
author: Alfresco Documentation
---

# Creating the module.properties file

In this task you will learn how to create the module.properties file. Every module requires this file. The module.properties file contains important information about the module. The information present in this file is used to enable some of the important features of modules, including the ability to install and uninstall modules, find module dependencies, and check for a suitable version of Alfresco. In this task you create a simple module.properties file with the most commonly used information.

1.  Change into the root of your project directory if you are not located there.

2.  Using your favorite editor create the file module.properties with the following content:

    ```
    
                            
    ﻿module.id=com_alfresco_tutorials_photo_search
    module.aliases=photo_search_module
    module.version=1.0
    module.title=Photo Search Module
    module.description=A simple module that contains web scripts to do a photo search
    
    # Optional
    module.repo.version.min=4.0
    module.repo.version.max=4.2
                            
                        
    ```

3.  Save your changes.


**Parent topic:**[Creating a simple module with Ant](../tasks/dev-extensions-tutorials-simple-module.md)

