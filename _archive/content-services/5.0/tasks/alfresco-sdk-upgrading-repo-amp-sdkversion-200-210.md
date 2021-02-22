---
author: Alfresco Documentation
---

# Upgrading a Repository AMP project from SDK 2.0.0 to 2.1.0

These instructions will walk through what is needed when upgrading a Repository AMP project from using SDK version 2.0.0 to using SDK version 2.1.0.

There are multiple ways to go about an SDK upgrade. These instructions assume that you have a Repository AMP project where the source code is managed by a Software Configuration Management \(SCM\) system such as Git or Subversion. And you cannot just through away the history of this project, you need to upgrade "in-place". On the other hand, if your project is small, and you don't mind starting with a new project in the SCM, it might be easier to just [generate a new project](alfresco-sdk-tutorials-amp-archetype.md) from the Repository AMP 2.1.0 SDK archetype and move the code and other changes over to it from the SDK 2.0.0 project, but this method is not covered in this article.

**Note:** In the following instructions the `REPO_AMP_PROJECT_PATH` variable denotes the path to where you have your Repository AMP project folder. So, for example, if your Repository AMP project was generated in the C:\\alfresco-extensions\\acme-repo-amp directory, then this directory path is the value of this variable.

**Important:** Make sure you have made a complete backup of your project before you start the upgrade process!

1.  Setting the SDK Version to 2.1.0.

    In the IDE, open up the \{REPO\_AMP\_PROJECT\_PATH\}/pom.xml project file. Scroll down so you see the `parent` section. Then update it to look as follows:

    ```
    
    <parent>
        <groupId>org.alfresco.maven</groupId>
        <artifactId>alfresco-sdk-parent</artifactId>
        <version>2.1.0</version>
    </parent>
    ```

2.  Remove the property used to specify the webapp path for Alfresco Repository web application.

    In the project file \{REPO\_AMP\_PROJECT\_PATH\}/pom.xml scroll down to the `properties` section. Then remove the property called `alfresco.client.contextPath`. This property is already set to `/alfresco` in the SDK parent POM so no need to set it here.

3.  Add the `amp-to-war` profile with rad dependency.

    In the IDE, open up the \{REPO\_AMP\_PROJECT\_PATH\}/pom.xml project file. Scroll down so you see the `profiles` section. Then add the following profile to it:

    ```
    
        <!--
            If the 'amp-to-war' profile is enabled then make sure to bring in the alfresco-rad module,
            which has the H2 scripts and other RAD features.
            -->
        <profile>
            <id>amp-to-war</id>
            <dependencies>
                <dependency>
                    <groupId>org.alfresco.maven</groupId>
                    <artifactId>alfresco-rad</artifactId>
                    <version>${maven.alfresco.version}</version>
                </dependency>
            </dependencies>
        </profile>
    ```

4.  Update the Tomcat virtual webapp context file.

    Open the \{REPO\_AMP\_PROJECT\_PATH\}/tomcat/context.xml file. Change it to look like this for best RAD experience:

    ```
    
    <?xml version="1.0" encoding="UTF-8"?>
    <!-- ===================================================================================================================
        This context file is used only in a development IDE for rapid development,
        it is never released with the Alfresco.war
        =================================================================================================================-->
    
    <!-- Setup docBase to something like repo-amp/target/repo-amp-war
         and path to /alfresco
         The Alfresco.war 5.0 does not have a webapp (it used to have Alfresco Explorer but not anymore)
         that we will access, so this docBase might not be needed
    -->
    <Context docBase="${app.amp.client.war.folder}" path="${alfresco.client.contextPath}">
    
      <Resources className="org.apache.naming.resources.VirtualDirContext"
                 extraResourcePaths="/=${project.build.directory}/${project.build.finalName}/web" />
    
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

5.  Replace run scripts.

    Version 2.1.0 of the SDK have changes to the Linux run scripts and have new run scripts for Windows. So it make sense to take the new scripts from a newly generated 2.1.0 Repository AMP project and replace the 2.0.0 scripts with them. So follow [these instructions](alfresco-sdk-tutorials-amp-archetype.md) to generate a Repository AMP project based on the 2.1.0 archetype. Then just copy over the \{newly generated 2.1.0 Repo AMP\}/run.\* scripts to the \{REPO\_AMP\_PROJECT\_PATH\} directory, overwriting the `run.sh` script.


Your Repository AMP project should now be fully updated to use the 2.1.0 version of the SDK.

**Parent topic:**[Upgrading SDK version from 2.0.0 to 2.1.0](../concepts/alfresco-sdk-upgrading-sdkversion-200-210.md)

