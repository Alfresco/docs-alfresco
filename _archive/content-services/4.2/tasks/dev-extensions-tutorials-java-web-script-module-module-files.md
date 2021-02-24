---
author: Alfresco Documentation
---

# Adding the module files

In this task you add the necessary files that make up the module. Every module includes a module.properties file that contains key information about the module, such as its module ID and version number. This example also requires a module-context.xml file, which contains the Spring bean configuration for the Java-backed web script.

1.  In the config folder, in the `alfresco.module.javadir` package, create a new XML file called module-context.xml with the following contents:

    ```
    
                            
    ﻿<?xml version="1.0" encoding="UTF-8"?>
    <!DOCTYPE beans PUBLIC '-//SPRING//DTD BEAN//EN' 'http://www.springframework.org/dtd/spring-beans.dtd'>
    <beans>
    
    	<!--  Spring bean -->
    	<bean id="webscript.com.alfresco.tutorials.javadir.get" class="com.alfresco.tutorials.JavaDir"
    		parent="webscript">
    		<property name="repository" ref="repositoryHelper" />
    	</bean>
    
    </beans>
                            
                            
                        
    ```

    First note that this package is of the structure `alfresco.module.module_id`, as per the standard module layout. In this case the module ID is `javadir`.

    **Note:** Note the Java-backed web script is added in this case as a simple Spring bean. The bean id starts with “`webscript.`” to identify it as a web script.

2.  In the same package, `alfresco.module.javadir`, create a new file module.properties with the following contents:

    ```
    
                            
    ﻿module.id=javadir
    module.aliases=javadir_module
    module.version=1.0
    module.title=JavaDir Folder Listing Module
    module.description=A simple Java-backed web script module to list folders in a site
    
    # Optional
    module.repo.version.min=4.0
    module.repo.version.max=4.2                        
                            
                        
    ```

    This file contains key information about the module such as version number and module ID.


At this point you have added the web script and module files. The next task is to fix the compile errors that are currently showing.

**Parent topic:**[Creating a Java-backed web script module with Ant](../tasks/dev-extensions-tutorials-java-web-script-module.md)

