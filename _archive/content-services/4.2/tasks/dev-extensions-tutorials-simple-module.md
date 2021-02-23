---
author: Alfresco Documentation
---

# Creating a simple module with Ant

In this tutorial you learn how to create a simple module from scratch. In this tutorial you learn how to create a simple module consisting of a web script. You will learn how to create an Ant script to help build your module. You will also learn how to install, list and uninstall your module using the Module Management Tool \(MMT\).

It is helpful if you already have an understanding of web scripts. In this task you will use the web script that was developed as part of [this](ws-photo-search.md) task. This task also assumes you have installed a local copy of Alfresco for development purposes.

The purpose of this task is to show you how to create a simple module to package up a web script. You then deploy the module using the available tools. You will also learn how to uninstall a module. You will learn how much of the housekeeping work, such as creating directories for the module and building the module can be handled by a simple Ant script.

1.  Create a directory to contain your project in a convenient location such as your home directory. For the purposes of this tutorial the directory will be called “project”:

    ```
    
                            
    mkdir project
                            
                        
    ```

2.  Change into this newly created directory.

3.  Using your editor of choice create an Ant build script to help automate the directory structure required by the module. This will be useful for future tutorials.

    ```
    
                            
    ﻿<?xml version="1.0" ?>
    <project default="main">
    
      <!-- NOTE: Make sure these are set correctly before use -->
      <property name="amp.path" value="/home/tony/alfresco-4.1.5/amps" />
      <property name="dist.path" value="dist" />
      <property name="module.id" value="com_alfresco_tutorials_photo_search" />
    
      <!-- Main task -->
        <target name="main" 
              depends="mkdirs, create-amp, install-amp"
              description="This is the default build target to build and locate the AMP">
        <echo>Running on JVM ${ant.java.version}</echo>
        <echo>Java user home ${user.home}</echo>
      </target>
    
      <!-- init directory structure for module -->
      <!-- NOTE: modify folders according to project requirements -->
      <target name="mkdirs" description="Creates module directory structure">
        <mkdir dir="${dist.path}"/>
        <mkdir dir="config/alfresco/extension/templates/webscripts"/>
        <mkdir dir="config/alfresco/web-extension/templates/webscripts"/>
        <mkdir dir="config/alfresco/module/${module.id}"/>
        <!-- NOTE: Add here as required for your project -->
      </target>
    
      <!-- Create AMP -->
      <target name="create-amp" depends="mkdirs" description="Creates the AMP file">
        <zip destfile="${dist.path}/${module.id}.amp" 
             basedir="./" 
             includes="**/*"
             excludes="${dist.path}, ${dist.path}/${module.id}, ${ant.file}, build*.xml"/>
      </target>
    
    
      <!-- Install AMP -->
      <target name="install-amp" depends="mkdirs, create-amp" description="Copy AMP file to amps directory">
        <copy file="${dist.path}/${module.id}.amp"
              todir="${amp.path}"/>
      </target>
    
      <!-- Delete AMP -->
      <target name="clean" description="Deletes *.amp  files">
        <delete verbose="true" includeEmptyDirs="true">
          <fileset dir="${dist.path}">
            <include name="*.amp"/>
          </fileset>
          <fileset dir="${amp.path}">
            <include name="*.amp"/>
          </fileset>
        </delete>
      </target>
      
    </project>
                            
                            
                        
    ```

    **Attention:** The Alfresco SDK and Maven Alfresco SDK provide a range of utilities to aid you in the creation of modules. The scripts developed here are purely to illustrate a possible approach.

4.  Edit the `amp.path` property to reflect the location where you have Alfresco installed.

5.  Save this file as `build.xml` in your project directory.

6.  You will now create the directory structure for your module.

    The part of the Ant script to create the required directory structure for this module is:

    ```
    
                            
      <target name="mkdirs" description="Creates module directory structure">
        <mkdir dir="${dist.path}"/>
        <mkdir dir="config/alfresco/extension/templates/webscripts"/>
        <mkdir dir="config/alfresco/web-extension/templates/webscripts"/>
        <mkdir dir="config/alfresco/module/${module.id}"/>
        <!-- NOTE: Add here as required for your project -->
      </target>
      
                        
    ```

    Note that this directory structure will need to be extended for more complex modules.

7.  Now run the Ant script to build the required directories. In your project directory type:

    ```
    
    ant mkdirs
                
    ```

    This will run the `mkdirs` target and create the required directories. You are now ready to start populating the directory structure with the necessary files.


-   **[Creating the module.properties file](../tasks/dev-extensions-tutorials-simple-module-module-properties.md)**  
In this task you will learn how to create the module.properties file. Every module requires this file.
-   **[Creating the web script files](../tasks/dev-extensions-tutorials-simple-module-web-script-files.md)**  
In this task you will learn how to locate the web script files in your module directory structure.
-   **[Building the AMP file](../tasks/dev-extensions-tutorials-simple-module-build-amp.md)**  
In this task you will learn how to build the AMP file using the simple Ant script you created earlier in this tutorial.
-   **[Installing the AMP file](../tasks/dev-extensions-tutorials-simple-module-install-amp.md)**  
In this task you will learn how to install the AMP file using the simple Ant script you created earlier in this tutorial.
-   **[Uninstall an AMP file](../tasks/dev-extensions-tutorials-simple-module-uninstall-amp.md)**  
This information helps you to uninstall your AMP file.
-   **[Improving your Ant script](../tasks/dev-extensions-tutorials-simple-module-improving-ant-script.md)**  
In this task you will learn how to improve your Ant script to help automate full installation and uninstallation of the AMP file using the ModuleManagement Tool \(MMT\).

**Parent topic:**[Module Tutorials](../concepts/dev-extensions-modules-tutorials.md)

