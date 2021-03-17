---
author: Alfresco Documentation
---

# Using the Alfresco AMP archetype

The Maven Alfresco SDK Alfresco AMP archetype can be used to create an AMP-based project. This is used for simple, single module applications.

If you have not set your `MAVEN_OPTS` environment variable you should do so at this point, following the necessary [procedure](dev-extensions-maven-sdk-maven-opts.md).

This task shows how you can use the AMP archetype of the Maven Alfresco SDK to build a simple module containing a web script.

1.  Create a suitable directory in which to store all your Maven projects \(if you have not already done so\), such as maven\_projects.

2.  Change into your maven\_projects directory.

3.  Run the following command:

    ```
            
    mvn archetype:generate -DarchetypeCatalog=https://artifacts.alfresco.com/nexus/content/groups/public/archetype-catalog.xml -Dfilter=org.alfresco.maven.archetype: 
        
    ```

    You will be prompted to choose an archetype:

    ```
    Choose archetype:
    1: https://artifacts.alfresco.com/nexus/content/groups/public/archetype-catalog.xml -> \
    org.alfresco.maven.archetype:alfresco-amp-archetype (Sample project with full support \
    for lifecycle and rapid development of AMPs (Alfresco Module Packages))
    2: https://artifacts.alfresco.com/nexus/content/groups/public/archetype-catalog.xml -> \
    org.alfresco.maven.archetype:alfresco-allinone-archetype (Sample multi-module project \
    for All-in-One development on the Alfresco plaftorm. Includes modules for: \
    Repository, AMP, Share, Solr, Web Quick Start and embedded Tomcat run)
    Choose a number or apply filter (format: [groupId:]artifactId, case sensitive contains): :                    
    
    
    ```

4.  Enter 1 to have the Maven SDK create an Alfresco Module Package \(AMP\) project.

    The detailed documentation for this archetype can be found [here](https://artifacts.alfresco.com/nexus/content/repositories/alfresco-docs/alfresco-lifecycle-aggregator/latest/archetypes/alfresco-amp-archetype/index.html).

5.  You will be prompted to choose an archetype version:

    ```
    
                            
    ﻿Choose org.alfresco.maven.archetype:alfresco-amp-archetype version: 
    1: 1.0
    2: 1.0.1
    3: 1.0.2
    4: 1.1.0
    5: 1.1.1
    Choose a number: 5:                         
                            
                        
    ```

    Press enter to select the default, which is 5: in this case, giving you an archetype version of 1.1.1.

6.  You will then be prompted to enter a value for the property `groupId`. Enter `com.alfresco.tutorials` for the `groupId` \(this can be thought of as the package name\).

7.  You will then be prompted to enter a value for the `artifactId`. Enter `simple-module-project` as the `artifactId`. This can be thought of as the project name. Note, hyphens are typically used in project names.

8.  You will then be prompted to enter a value for the Alfresco version you wish to test against \(currently the default is 4.2.e\). Hit the enter key to accept the default value.

    A new project directory containing a number of sub-directories and support files for the AMP will be created in the directory simple-module-project.

9.  Change into the freshly created simple-module-project directory and browse the various files and directories to see what has been created.

    The following directory structure has been created for you:

    ```
    
    ﻿
        pom.xml
        src/main/amp
          |-> module.properties
          |-> file-mapping.properties (optional)
          |-> config/
          |-> web/
          |-> licenses/
        src/main/java //Java classes to be packaged in the AMP embedded JAR)
        src/main/resources //resources to the packaged in the AMP embedded JAR)
        src/test/java // Unit tests
        src/test/resources // Unit test resources
        src/test/properties/<env> // Environment aware alfresco-global.properties. By default <env>=local                         
    
    
    ```

    Look in the directory ﻿./src/main/amp. Notice important files, such as the module.properties file, have been created for you.

10. At this point, before you have made any changes, you can build the project by typing:

    ```
    
                            
    mvn install                        
                            
                        
    ```

    **Note:** Maven will ensure that all requirements are downloaded. This may take some time.

    Other common usage supported by this archetype includes the following:

    |Command|Description|
    |-------|-----------|
    |﻿mvn package|Runs unit tests and packages AMP in $\{project.build.directory\}/$\{project.build.finalName\}.amp|
    |mvn install|Like mvn package but also installs AMP in local Maven repository to be depended upon|
    |mvn test|Runs unit tests|
    |mvn install -DskipTests=true|Like mvn install but skips unit tests|
    |mvn package -Pamp-to-war|Like mvn package but also installs the AMP into an Alfresco WAR.|
    |mvn integration-test -Pamp-to-war|Like mvn package -Pamp-to-war but also runs the resulting WAR+AMP in Tomcat + H2 embedded for integration testing|
    |mvn integration-test -Pamp-to-war -Dalfresco.client.war=share|Like mvn integration-test -Pamp-to-war but installs the AMP and runs on the Share WAR in embedded Tomcat.|
    |mvn clean -Ppurge|Removes DB, alf\_data, indexes and log files. Useful to purge the development repo \(by default self contained in $\{project.basedir\}/alf\_data\_dev. **Note:** This is an important command to use if you change significant settings in your project - for example you change the Alfresco edition from Community to Enterprise. It is important to purge databases and other data that might otherwise be persisted.

|
    |mvn install -Pamp-to-war,rad|Similar to `mvn install -Pamp-to-war` but also adds support for remote JUnit running and for hot reloading with JRebel \(requires appropriate `MAVEN_OPTS` configuration\).|

    The project will return with the message `BUILD SUCCESS`.

11. You can build, run integration tests, and run your project by typing:

    ```
    
                            
    ﻿mvn integration-test -Pamp-to-war                      
                            
                        
    ```


**Parent topic:**[Maven Tutorials](../concepts/dev-extensions-maven-sdk-tutorials.md)

