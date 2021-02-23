---
author: Alfresco Documentation
---

# Improving your Ant script

In this task you will learn how to improve your Ant script to help automate full installation and uninstallation of the AMP file using the ModuleManagement Tool \(MMT\).Now that you have seen how you can use the MMT to install and uninstall an AMP, you could complete your basic Ant script by adding the facility to do this automatically.

During the development process it can be convenient to have Ant install your AMP for you, and also uninstall it when you clean up. While the [Alfresco SDK](http://wiki.alfresco.com/wiki/Alfresco_SDK) and [Alfresco Maven SDK](https://artifacts.alfresco.com/nexus/content/repositories/alfresco-docs/alfresco-lifecycle-aggregator/latest/index.html) provides facilities to do this housekeeping for you, it can be instructive to see how this is done. For simple modules you may only need a very simple Ant script.

1.  In your project root directory, create a new build file called build2.xml, with the following contents:

    ```
    
                            
    ﻿﻿<?xml version="1.0" ?>
    <project default="main">
    
      <!-- NOTE: Make sure install path is set correctly before use -->
      <property name="alfresco.install.path" value="/home/tony/alfresco-4.1.5" />
    
      <!-- NOTE: Set path to WAR file to be modified and Module ID here -->
      <property name="war.path" value="${alfresco.install.path}/tomcat/webapps/alfresco" />
      <property name="module.id" value="com_alfresco_tutorials_photo_search" />
    
      <property name="amp.path" value="${alfresco.install.path}/amps" />
      <property name="dist.path" value="dist" />
      <property name="mmt.path" value="${alfresco.install.path}/bin/alfresco-mmt.jar" />
      
      <property name="mmt.install" 
                value="install ${amp.path}/${module.id}.amp ${war.path} -verbose" />
    
      <property name="mmt.uninstall" 
                value="uninstall ${module.id} ${war.path}" />
    
      <!-- Main task -->
        <target name="main" 
              depends="mkdirs, create-amp, install-amp"
              description="This is the default build target to build and locate the AMP">
        <echo>Running on JVM ${ant.java.version}</echo>
        <echo>Java user home ${user.home}</echo>
      </target>
    
      <!-- init directory structure for module -->
      <!-- NOTE: Change/add here as required for your project -->
      <target name="mkdirs" description="Creates module directory structure">
        <mkdir dir="${dist.path}"/>
        <mkdir dir="config/alfresco/extension/templates/webscripts"/>
        <mkdir dir="config/alfresco/web-extension/templates/webscripts"/>
        <mkdir dir="config/alfresco/module/${module.id}"/>
      </target>
    
      <!-- Create AMP -->
      <target name="create-amp" depends="mkdirs" description="Creates the AMP file">
        <zip destfile="${dist.path}/${module.id}.amp" 
             basedir="./" 
             includes="**/*"
             excludes="${dist.path}, ${dist.path}/${module.id}, ${ant.file}, build*.xml"/>
      </target>
    
    
      <!-- Install AMP -->
      <target name="install-amp" depends="create-amp" description="Copy AMP file to amps directory">
        <copy file="${dist.path}/${module.id}.amp"
              todir="${amp.path}"/>
        <java jar="${mmt.path}" fork="true" failonerror="true">
          <arg line="${mmt.install}"/>
        </java>
      </target>
    
      <!-- Delete AMP -->
      <target name="clean" description="Deletes *.amp  files">
        <delete verbose="true" includeEmptyDirs="true">
          <fileset dir="${dist.path}">
            <include name="${module.id}.amp"/>
          </fileset>
          <fileset dir="${amp.path}">
            <include name="${module.id}.amp"/>
          </fileset>
        </delete>
    
        <java jar="${mmt.path}" fork="true" failonerror="true">
          <arg line="${mmt.uninstall}"/>
        </java>
      </target>
      
    </project>
                            
                            
    ```

    There are several improvements over the previous very basic Ant script. The script will now invoke the MMT to install the AMP file. Also, when the `clean` target is run the AMP file will be uninstalled automatically. This saves having to type an extra \(long\) commands, and speed the development cycle.

2.  Build and install the AMP file by typing:

    ```
    
                            
    ant -f build2.xml                        
                            
                        
    ```

3.  Test the script by typing \(in your project root\):

    ```
    
                            
    ant -f build2.xml clean                        
                            
                        
    ```

    This will clean out the old AMP file from the dist directory and uninstall the currently installed AMP using the MMT. If you had previously installed the module you will be informed that the module is no longer installed.


You now have a basic Ant script that can help you package up, install and uninstall a module's AMP file.

**Parent topic:**[Creating a simple module with Ant](../tasks/dev-extensions-tutorials-simple-module.md)

