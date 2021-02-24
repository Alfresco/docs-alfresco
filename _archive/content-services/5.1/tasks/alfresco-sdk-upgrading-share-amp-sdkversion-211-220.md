---
author: Alfresco Documentation
---

# Upgrading a Share AMP project from SDK 2.1.1 to 2.2.0

These instructions will walk through what is needed when upgrading a Share AMP project from using SDK version 2.1.1 to using SDK version 2.2.0.

There are multiple ways to go about an SDK upgrade. These instructions assume that you have a Share AMP project where the source code is managed by a Software Configuration Management \(SCM\) system such as Git or Subversion. And you cannot just through away the history of this project, you need to upgrade "in-place". On the other hand, if your project is small, and you don't mind starting with a new project in the SCM, it might be easier to just [generate a new project](alfresco-sdk-tutorials-share-amp-archetype.md) from the Share AMP 2.2.0 SDK archetype and move the code and other changes over to it from the SDK 2.1.1 project, but this method is not covered in this article.

**Note:** In the following instructions the `SHARE_AMP_PROJECT_PATH` variable denotes the path to where you have your Share AMP project folder. So, for example, if your Share AMP project was generated in the C:\\alfresco-extensions\\acme-share-amp directory, then this directory path is the value of this variable.

**Important:** Make sure you have made a complete backup of your project before you start the upgrade process!

1.  Setting the SDK Version to 2.2.0.

    In the IDE, open up the \{SHARE\_AMP\_PROJECT\_PATH\}/pom.xml project file. Scroll down so you see the `parent` section. Then update it to look as follows:

    ```
    
    <parent>
        <groupId>org.alfresco.maven</groupId>
        <artifactId>alfresco-sdk-parent</artifactId>
        <version>2.2.0</version>
    </parent>
    ```

2.  Remove the Enterprise profile dependency.

    This is not needed any more. In the same project file **remove** the following profile and dependency:

    ```
    <profiles>
            <!--
                Brings in the extra Enterprise specific share classes,
                if the 'enterprise' profile has been activated, needs to be activated manually. -->
            <profile>
                <id>enterprise</id>
                <dependencies>
                    <dependency>
                        <groupId>${alfresco.groupId}</groupId>
                        <artifactId>share-enterprise</artifactId>
                        <version>${alfresco.version}</version>
                        <classifier>classes</classifier>
                        <scope>provided</scope>
                    </dependency>
                </dependencies>
            </profile>
        </profiles>
    ```

3.  Update the Virtual Webapp Context for Share \(share.war\).

    Update the virtual webapp context to reflect new directory names and the change so resources can be overridden \(it is used when running with -Pamp-to-war\). Open the \{SHARE\_AMP\_PROJECT\_PATH\}/tomcat/context.xml file and update it so it looks like this:

    ```
    <?xml version="1.0" encoding="UTF-8"?>
    <!-- ===================================================================================================================
        This context file is used only in a development IDE for rapid development,
        it is never released with the Alfresco.war
        =================================================================================================================-->
    
    <!-- Setup a virtual context for the /share webapp by specifying this as path for Context.
         The amp-to-war profile uses the tomcat7-maven-plugin to kick off the webapp.
         This profile is used for both the repo and share AMP archetypes, and has no config for path or resources,
         so we need to specify here both the context path and where the webapp resources can be found.
    
         The webapp resources are located in the {share-amp-dir}/target/amp-war directory, However, we
         cannot just set this up as the docBase attribute for the Context as it would always be read
         before any paths in the extraResourcePaths. So to allow for customizations to override
         stuff in the share.war webapp, such as the /favicon.ico, we add the webapp resource
         path last in the extraResourcePaths.
    
         Note. most of the UI customizations for Share are done via custom themes.
    -->
    <Context path="${share.client.contextPath}">
      <Resources className="org.apache.naming.resources.VirtualDirContext"
        extraResourcePaths="/=${project.build.directory}/amp/web,${app.amp.client.war.folder}" />
    
      <!-- Configure where the Share (share.war) web application can load classes, test classes, and config -->
      <!-- Setup the virtual class path like this:
           1) target/classes
           2) target/amp/config
           3) target/test-classes
    
           This way mvn compile can be invoked and all changes will be picked up
      -->
      <Loader searchVirtualFirst="true"
              className="org.apache.catalina.loader.VirtualWebappLoader"
              virtualClasspath="${project.build.outputDirectory};${project.build.directory}/amp/config;${project.build.testOutputDirectory}" />
    
      <!-- This enables hot reloading of web resources from uncompressed jars (while in prod they would be loaded from  WEB-INF/lib/{\*.jar}/META-INF/resources -->
      <JarScanner scanAllDirectories="true" />
      
    </Context>
    ```

4.  Update the AMP module version to align with Maven Artifact version.

    Open the \{SHARE\_AMP\_PROJECT\_PATH\}/src/main/amp/module.properties file and update the version property:

    ```
    module.version=${project.version}
    ```


Your Share AMP project should now be fully updated to use the 2.2.0 version of the SDK.

**Parent topic:**[Upgrading SDK version from 2.1.1 to 2.2.0](../concepts/alfresco-sdk-upgrading-sdkversion-211-220.md)

