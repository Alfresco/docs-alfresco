---
author: Alfresco Documentation
---

# Upgrading a Share AMP project from SDK 2.0.0 to 2.1.0

These instructions will walk through what is needed when upgrading a Share AMP project from using SDK version 2.0.0 to using SDK version 2.1.0.

There are multiple ways to go about an SDK upgrade. These instructions assume that you have a Share AMP project where the source code is managed by a Software Configuration Management \(SCM\) system such as Git or Subversion. And you cannot just through away the history of this project, you need to upgrade "in-place". On the other hand, if your project is small, and you don't mind starting with a new project in the SCM, it might be easier to just [generate a new project](alfresco-sdk-tutorials-share-amp-archetype.md) from the Share AMP 2.1.0 SDK archetype and move the code and other changes over to it from the SDK 2.0.0 project, but this method is not covered in this article.

**Note:** In the following instructions the `SHARE_AMP_PROJECT_PATH` variable denotes the path to where you have your Share AMP project folder. So, for example, if your Share AMP project was generated in the C:\\alfresco-extensions\\acme-share-amp directory, then this directory path is the value of this variable.

**Important:** Make sure you have made a complete backup of your project before you start the upgrade process!

1.  Setting the SDK Version to 2.1.0.

    In the IDE, open up the \{SHARE\_AMP\_PROJECT\_PATH\}/pom.xml project file. Scroll down so you see the `parent` section. Then update it to look as follows:

    ```
    
    <parent>
        <groupId>org.alfresco.maven</groupId>
        <artifactId>alfresco-sdk-parent</artifactId>
        <version>2.1.0</version>
    </parent>
    ```

2.  Remove the property used to specify the webapp path for the Alfresco Share web application.

    In the project file \{SHARE\_AMP\_PROJECT\_PATH\}/pom.xml scroll down to the `properties` section. Then **remove** the property called `alfresco.client.contextPath`. This property is now called `share.client.contextPath`, and it is already set to `/share` in the SDK parent POM, so no need to set it here.

3.  Update the name of the property specifying Share Webapp aritifact ID.

    In the project file \{SHARE\_AMP\_PROJECT\_PATH\}/pom.xml scroll down to the `properties` section. Then change the name of the property called `alfresco.client.war` to `app.amp.client.war.artifactId`.

4.  Add a `build` section to enable the JS Compression plugin.

    In the same project file \{SHARE\_AMP\_PROJECT\_PATH\}/pom.xml scroll down to the `dependencies` end tag. Then add the following `build` section after it with the `yuicompressor-maven-plugin` to enable JS compression:

    ```
    
    . . .                        
    </dependencies>
    
    <build>
        <plugins>
            <!-- Compress JavaScript files and store as *-min.js -->
            <plugin>
                <groupId>net.alchim31.maven</groupId>
                <artifactId>yuicompressor-maven-plugin</artifactId>
            </plugin>
        </plugins>
    </build>
    ```

5.  Update `share-config-custom.xml` to enable better RAD.

    Open the \{SHARE\_AMP\_PROJECT\_PATH\}/src/test/resources/alfresco/web-extension/share-config-custom.xml file and update the `web-framework` configuration so it looks like this:

    ```
    
    <web-framework>
        <autowire>
            <!-- Changing this to 'development' currently breaks the Admin Console.
                 Instead we make a POST to clear Share dependency caches, see 'clear-caches-refresh-ws' profile. -->
            <mode>production</mode> <!-- not really need in the long run, used for YUI - deprecate -->
        </autowire>
    
        <!--
             We don't need to do this when we have the new refresh mojos in the Alfresco plug-in.
    
             If resource caching has been disabled then all the dependency caches will be cleared
             before processing the Aikau jsonModel request...
                (i.e. this.dojoDependencyHandler.clearCaches() )
    
             For more information see the Aikau source code: https://github.com/Alfresco/Aikau
        -->
        <disable-resource-caching>false</disable-resource-caching>
    </web-framework>
    
    ```

6.  Update the Tomcat virtual webapp context file.

    Open the \{SHARE\_AMP\_PROJECT\_PATH\}/tomcat/context.xml file. Change it to look like this for best RAD experience:

    ```
    
    <?xml version="1.0" encoding="UTF-8"?>
    <!-- ===================================================================================================================
        This context file is used only in a development IDE for rapid development,
        it is never released with the Alfresco.war
        =================================================================================================================-->
    
    <!-- Setup docBase to something like share-amp/target/share-amp-war
         and path to /share -->
    <Context docBase="${app.amp.client.war.folder}" path="${share.client.contextPath}">
    
      <Resources className="org.apache.naming.resources.VirtualDirContext"
        extraResourcePaths="/=${project.build.directory}/${project.build.finalName}/web" />
    
      <!-- Configure where the Share (share.war) web application can load classes, test classes, and config -->
      <!-- Setup the virtual class path like this:
           1) target/classes
           2) target/${project.build.finalName}/config
           3) target/test-classes
    
           This way mvn compile can be invoked and all changes will be picked up
      -->
      <Loader searchVirtualFirst="true"
              className="org.apache.catalina.loader.VirtualWebappLoader"
              virtualClasspath="${project.build.outputDirectory};${project.build.directory}/${project.build.finalName}/config;${project.build.testOutputDirectory}" />
    
      <!-- This enables hot reloading of web resources from uncompressed jars (while in prod they would be loaded from  WEB-INF/lib/{\*.jar}/META-INF/resources -->
      <JarScanner scanAllDirectories="true" />
      
    </Context>
    
    ```

7.  Replace run scripts.

    Version 2.1.0 of the SDK have changes to the Linux run scripts and have new run scripts for Windows. So it make sense to take the new scripts from a newly generated 2.1.0 Share AMP project and replace the 2.0.0 scripts with them. So follow [these instructions](alfresco-sdk-tutorials-share-amp-archetype.md) to generate a Share AMP project based on the 2.1.0 archetype. Then just copy over the \{newly generated 2.1.0 Share AMP\}/run.\* scripts to the \{SHARE\_AMP\_PROJECT\_PATH\} directory, overwriting the `run.sh` script.


Your Share AMP project should now be fully updated to use the 2.1.0 version of the SDK.

**Parent topic:**[Upgrading SDK version from 2.0.0 to 2.1.0](../concepts/alfresco-sdk-upgrading-sdkversion-200-210.md)

