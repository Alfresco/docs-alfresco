---
author: Alfresco Documentation
---

# Maven Alfresco SDK Quick Start

Demonstrates how to get up and running with the Maven Alfresco SDK, build a simple AMP project.

This task assumes you have Maven installed. You must also set your [`MAVEN_OPTS` environment variable](dev-extensions-maven-sdk-maven-opts.md).

The Maven Alfresco SDK provides a comprehensive and convenient solution for Alfresco developers. With a single command it is possible to build and run an instance of your Alfresco project on an application server.

1.  Create a directory where you will store all your Maven projects, called maven\_projects and change into it.

2.  To create a project using the Maven Alfresco SDK:

    ```
    
            
    mvn archetype:generate -DarchetypeCatalog=https://artifacts.alfresco.com/nexus/content/groups/public/archetype-catalog.xml -Dfilter=org.alfresco.maven.archetype:
    
          
    ```

    You will then be prompted to enter your choice of archetype to create:

    ```
    
            
    ﻿﻿Choose archetype:
    1: https://artifacts.alfresco.com/nexus/content/groups/public/archetype-catalog.xml -> \
    org.alfresco.maven.archetype:alfresco-amp-archetype (Sample project with full support for \
    lifecycle and rapid development of AMPs (Alfresco Module Packages))
    2: https://artifacts.alfresco.com/nexus/content/groups/public/archetype-catalog.xml -> \
    org.alfresco.maven.archetype:alfresco-allinone-archetype \
    (Sample multi-module project for All-in-One development on the Alfresco plaftorm. \ 
    Includes modules for: Repository, AMP, Share, Solr, Web Quick Start and embedded Tomcat run)
    Choose a number or apply filter (format: [groupId:]artifactId, case sensitive contains): :
    
          
    ```

3.  Enter a number to select the type of project you want to create. In this case you will enter 1, to select the `alfresco-amp-archetype`.

    The Alfresco AMP Archetype is a sample fully-featured project to manage AMP \(Alfresco Module Package\) projects. This archetype can be used for both Alfresco Repository and Alfresco Share AMPs. The Alfresco All-in-One Archetype is a multi-module project, leveraging Maven Alfresco SDK's powerful capabilities to customize and run the full Alfresco platform embedded and all its components. The archetype does not require additional download and provides a perfect starting point for full-blown Alfresco projects. In summary, if you are intending to customize and run the complete Alfresco platform, select the All-in-One archetype, while if you just want to develop a single AMP, then choose the AMP archetype.

4.  You will be prompted for the archetype `version`. Hit Enter to accept the default, which will be the latest version of the archetype.

    The `version` is the archetype version to use - the default value is the most recent version of the archetype.

5.  You will be prompted for the `groupId`. Enter the value: `com.alfresco.tutorials`.

    If thinking in Java terms the `groupId` would be the package name, typically using reverse domain name format.

6.  You will be prompted for the `artifactId`. Enter `quick-start-project`.

    The `artifactId` can be thought of as the project name.

7.  You will be prompted for the Alfresco target version to use in your project. Hit Enter to accept the default, which will be the latest Community version.

    The Alfresco version by default will be the most recent version, but you can select another supported version if required. You can find out more about the naming conventions for these parameters in the [Maven documentation](http://maven.apache.org/guides/mini/guide-naming-conventions.html).

    **Attention:** The Maven Alfresco SDK is compatible with various Community versions and Enterprise versions of Alfresco One. Information on the Community artifacts can be found in the [Alfresco wiki](https://wiki.alfresco.com/wiki/Alfresco_Artifacts_Repository), and information on Alfresco One \(Enterprise\) artifacts can be found on the Alfresco support portal.

    This will create a new project directory with the same name as `artifactId`.

8.  Change into the new directory, quick-start-project and then type `mvn install` to build your new project.

    **Note:** Maven will ensure that all requirements are downloaded. This make take some time.

9.  Now run your project using:

    ```
    mvn integration-test -Pamp-to-war
    ```

10. You will see the Java application server \(Tomcat is used by default\) load and various tests run.

    **Attention:** If you see PermGen space errors you will need to increase the size of memory allocated to Alfresco and Tomcat via your `MAVEN_OPTS` environment variable.

11. You can test Alfresco is running correctly by pointing your web browser at `http://localhost:8080/alfresco` and logging in with a username `admin` and a password of `admin`.


**Parent topic:**[Maven Alfresco SDK](../concepts/dev-extensions-maven-sdk-intro.md)

