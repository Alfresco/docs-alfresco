---
author: Alfresco Documentation
---

# Upgrading a Repository AMP project from SDK 2.1.1 to 2.2.0

These instructions will walk through what is needed when upgrading a Repository AMP project from using SDK version 2.1.1 to using SDK version 2.2.0.

There are multiple ways to go about an SDK upgrade. These instructions assume that you have a Repository AMP project where the source code is managed by a Software Configuration Management \(SCM\) system such as Git or Subversion. And you cannot just through away the history of this project, you need to upgrade "in-place". On the other hand, if your project is small, and you don't mind starting with a new project in the SCM, it might be easier to just [generate a new project](alfresco-sdk-tutorials-amp-archetype.md) from the Repository AMP 2.2.0 SDK archetype and move the code and other changes over to it from the SDK 2.1.1 project, but this method is not covered in this article.

**Note:** In the following instructions the `REPO_AMP_PROJECT_PATH` variable denotes the path to where you have your Repository AMP project folder. So, for example, if your Repository AMP project was generated in the C:\\alfresco-extensions\\acme-repo-amp directory, then this directory path is the value of this variable.

**Important:** Make sure you have made a complete backup of your project before you start the upgrade process!

1.  Setting the SDK Version to 2.2.0.

    In the IDE, open up the \{REPO\_AMP\_PROJECT\_PATH\}/pom.xml project file. Scroll down so you see the `parent` section. Then update it to look as follows:

    ```
    
    <parent>
        <groupId>org.alfresco.maven</groupId>
        <artifactId>alfresco-sdk-parent</artifactId>
        <version>2.2.0</version>
    </parent> 
    ```

2.  Add dependency for H2 database scripts.

    In the same project file add the following dependency:

    ```
    <!-- If we are running tests then make the H2 Scripts available
             Note. tests are skipped when you are running -Pamp-to-war -->
        <dependency>
            <groupId>${alfresco.groupId}</groupId>
            <artifactId>alfresco-repository</artifactId>
            <version>${alfresco.version}</version>
            <classifier>h2scripts</classifier>
            <scope>test</scope>
            <exclusions>
                <exclusion>
                    <groupId>*</groupId>
                    <artifactId>*</artifactId>
                </exclusion>
            </exclusions>
        </dependency>
    ```

3.  Remove `alfresco-rad` dependency.

    This artifact previously contained the H2 database scripts but they are now available separately. In the same project file **remove** the following profile and dependency:

    ```
    <!--
            If the 'amp-to-war' profile is enabled then make sure to bring in the alfresco-rad module,
            which has the H2 scripts and other RAD features.
    
            TODO: TO INVESTIGATE: This dependency is already defined in the parent SDK pom in the 'amp-to-war' profile
                  but this does not work, it is not include...
    
        <profile>
            <id>amp-to-war</id>
            <dependencies>
                <dependency>
                    <groupId>org.alfresco.maven</groupId>
                    <artifactId>alfresco-rad</artifactId>
                    <version>${maven.alfresco.version}</version>
                </dependency>
            </dependencies>
        </profile> -->
    ```

4.  Remove Spring Loaded configuration from run scripts.

    Spring Loaded currently blocks the Repository \(Platform\) from starting. Update the \{REPO\_AMP\_PROJECT\_PATH\}/run.sh and run.bat so they don't use Spring Loaded, change the `MAVEN_OPTS` so it looks like this:

    ```
    run.sh: MAVEN_OPTS="-Xms256m -Xmx2G" mvn integration-test -Pamp-to-war
    run.bat: set MAVEN_OPTS=-Xms256m -Xmx2G
    ```

5.  Update the Virtual Webapp Context for Repository \(alfresco.war\).

    Update the virtual webapp context to reflect new directory names and the change so resources can be overridden \(it is used when running with `-Pamp-to-war`\). Open the \{REPO\_AMP\_PROJECT\_PATH\}/tomcat/context.xml file and update it so it looks like this:

    ```
    <?xml version="1.0" encoding="UTF-8"?>
    <!-- ===================================================================================================================
        This context file is used only in a development IDE for rapid development,
        it is never released with the Alfresco.war
        =================================================================================================================-->
    
    <!-- Setup a virtual context for the /alfresco webapp by specifying this as path for Context.
         The amp-to-war profile uses the tomcat7-maven-plugin to kick off the webapp.
         This profile is used for both the repo and share AMP archetypes, and has no config for path or resources,
         so we need to specify here both the context path and where the webapp resources can be found.
    
         The webapp resources are located in the {repo-amp-dir}/target/amp-war directory, However, we
         cannot just set this up as the docBase attribute for the Context as it would always be read
         before any paths in the extraResourcePaths. So to allow for customizations to override
         stuff in the alfresco.war webapp, such as the /images/logo/logo.png, we add the webapp resource
         path last in the extraResourcePaths.
    
         Note. Alfresco.war 5.0 does not have a webapp, just an index page, the Alfresco Explorer webapp is no longer available.
    -->
    <Context path="${alfresco.client.contextPath}">
        <Resources className="org.apache.naming.resources.VirtualDirContext"
                   extraResourcePaths="/=${project.build.directory}/amp/web,${app.amp.client.war.folder}" />
    
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

6.  Update the AMP module Spring context load order.

    Open the \{REPO\_AMP\_PROJECT\_PATH\}/src/main/amp/config/alfresco/module/<module-id\>/module-context.xml file and update it so it looks like this:

    ```
    <beans>
    	<!-- This is filtered by Maven at build time, so that module name is single sourced. -->
    	<!-- Note. The bootstrap-context.xml file has to be loaded first.
    		    Otherwise your custom models are not yet loaded when your service beans are instantiated and you
    		    cannot for example register policies on them. -->
            <import resource="classpath:alfresco/module/${project.artifactId}/context/bootstrap-context.xml" />
            <import resource="classpath:alfresco/module/${project.artifactId}/context/service-context.xml" />
            <import resource="classpath:alfresco/module/${project.artifactId}/context/webscript-context.xml" />
    </beans>
    ```

7.  Update the AMP module version to align with Maven Artifact version.

    Open the \{REPO\_AMP\_PROJECT\_PATH\}/src/main/amp/module.properties file and update the version property:

    ```
    module.version=${project.version}
    ```

8.  Finally remove current alf\_data\_dev directory with previous database.

    Remove the \{REPO\_AMP\_PROJECT\_PATH\}/alf\_data\_dev directory. This is needed as the H2 script artifact does not currently contain upgrade scripts.


Your Repository AMP project should now be fully updated to use the 2.2.0 version of the SDK.

**Parent topic:**[Upgrading SDK version from 2.1.1 to 2.2.0](../concepts/alfresco-sdk-upgrading-sdkversion-211-220.md)

