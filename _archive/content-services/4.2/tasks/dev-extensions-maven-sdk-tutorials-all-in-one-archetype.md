---
author: Alfresco Documentation
---

# Using the Alfresco All-in-One archetype

The All-in-One archetype of the Maven Alfresco SDK can be used to create a comprehensive multi-module project.

If you have not set your `MAVEN_OPTS` environment variable you should do so at this point, following the necessary [procedure](dev-extensions-maven-sdk-maven-opts.md).

This task shows how you can use the Maven Alfresco SDK to build a multi-module project for Alfresco development, using the All-in-One archetype.

1.  Create a suitable directory in which to store your Maven projects \(if you have not already done so\), such as maven\_projects.

2.  Change into your maven\_projects directory.

3.  Run the following command:

    ```
    
    
    ﻿﻿mvn archetype:generate -DarchetypeCatalog=https://artifacts.alfresco.com/nexus/content/groups/public/archetype-catalog.xml -Dfilter=org.alfresco.maven.archetype:
    
            
    ```

    You will be prompted to choose an archetype:

    ```
    
    
    ﻿Choose archetype:
    1: https://artifacts.alfresco.com/nexus/content/groups/public/archetype-catalog.xml -> \
    org.alfresco.maven.archetype:alfresco-amp-archetype (Sample project with full support \
    for lifecycle and rapid development of AMPs (Alfresco Module Packages))
    2: https://artifacts.alfresco.com/nexus/content/groups/public/archetype-catalog.xml -> \
    org.alfresco.maven.archetype:alfresco-allinone-archetype (Sample multi-module project \
    for All-in-One development on the Alfresco plaftorm. Includes modules for: \
    Repository, AMP, Share, Solr, Web Quick Start and embedded Tomcat run)
    Choose a number or apply filter (format: [groupId:]artifactId, case sensitive contains): :
    
    
    ```

4.  Enter 2 to have the Maven Alfresco SDK create an Alfresco All-in-One Archetype project.

    The detailed documentation for this archetype can be found [here](https://artifacts.alfresco.com/nexus/content/repositories/alfresco-docs/alfresco-lifecycle-aggregator/latest/archetypes/alfresco-allinone-archetype/index.html).

5.  You will be prompted to choose an archetype version:

    ```
    
    
    Choose org.alfresco.maven.archetype:alfresco-amp-archetype version:
    1: 1.0
    2: 1.0.1
    3: 1.0.2
    4: 1.1.0
    5: 1.1.1
    Choose a number: 5:
    
                        
    ```

    Hit enter to select the default, which is 5: in this case, giving you an archetype version of 1.1.1.

6.  You will then be prompted to enter a value for the property `groupId`. Enter `com.alfresco.tutorials` for the `groupId` \(this can be thought of as the package name\).

7.  You will then be prompted to enter a value for the `artifactId`. Enter `allinone-project` as the `artifactId`.

8.  You will then be prompted to enter a value for the Alfresco version you wish to test against. Currently the default is 4.2.e \(Alfresco Community\). Hit the enter key to accept the default value.

    A new project directory containing a number of sub-directories and support files for the AMP will be created in the directory `allinone-project`.

9.  Change into the freshly created allinone-project directory and browse the various files and directories to see what has been created.

    The following directory has been created for you:

    ```
    
    ﻿
    ﻿pom.xml
       |-> amp
       |-> alfresco
       |-> share
       |-> solr
       |-> wcmqs (Alfresco Web Quick Start)
       |-> runner (a Tomcat embedded runner / integration test runner)
    
    
    ```

    Look in the directory ﻿./amp/src/main/amp. Notice important files, such as the module.properties file, have been created for you.

10. At this point, before you have made any changes, you can build the project by typing:

    ```
    
    
    mvn install
    
                        
    ```

    **Note:** Maven will ensure that all requirements are downloaded. This make take some time.

    Other common usage supported by this archetype includes the following:

    |Command|Description|
    |-------|-----------|
    |﻿mvn package|Runs unit tests and packages AMP in $\{project.build.directory\}/$\{project.build.finalName\}.amp|
    |mvn install|Like mvn package but also installs AMP in local Maven repository to be depended upon|
    |mvn test|Runs unit tests|
    |mvn install -DskipTests=true|Like mvn install but skips unit tests|
    |﻿mvn install -Prun|﻿ Like mvn install but also triggers the runner project to run Alfresco, Share, Solr and Web Quick Start in Tomcat \(with H2 embedded database\)|
    |mvn clean -Ppurge|Removes DB, alf\_data, indexes and log files. Useful to purge the development repo \(by default self contained in $\{project.basedir\}/alf\_data\_dev.**Note:** This is an important command to use if you change significant settings in your project - for example you change the Alfresco edition from Community to Enterprise. It is important to purge databases and other data that might otherwise be persisted.

|
    |mvn install -Pamp-to-war,rad|Similar to `mvn install -Pamp-to-war` but also adds support for remote JUnit running and for hot reloading with JRebel \(requires appropriate `MAVEN_OPTS` configuration\).|

    The project will return with the message `BUILD SUCCESS`.

11. Run your newly created project by typing:

    ```
    
    
    mvn install -Prun
    
            
    ```

12. Direct your web browser to:

    ```
    http://localhost:8080/share
    ```

    You can login using a username of `admin` and a password of `admin`.


**Parent topic:**[Maven Tutorials](../concepts/dev-extensions-maven-sdk-tutorials.md)

