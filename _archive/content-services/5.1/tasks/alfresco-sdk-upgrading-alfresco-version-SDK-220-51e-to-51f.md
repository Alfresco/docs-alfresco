---
author: Alfresco Documentation
---

# Upgrading SDK 2.2.0 projects from Community 5.1.e to 5.1.\[f\|g\]

These instructions will walk through what is needed when upgrading an SDK 2.2.0 project from using Alfresco Community version 5.1.e to using Community version 5.1.f. These instructions also apply when upgrading to version 5.1.g.

This task assumes that you have an SDK 2.2.0 project to work with, see [creating a project](../concepts/alfresco-sdk-tutorials-archetypes.md).

You will learn how to set a new version in all the different kinds of SDK project types.

1.  **Upgrading Alfresco version for a Repository AMP project.**
2.  Set new version.

    In the IDE, open up the Repository AMP project that you are working on. Then open the project file for it, for example alfresco-extensions/component-a-repo/pom.xml. Scroll down so you see the `properties` section:

    ```
    <properties>
        <!-- The following are default values for data location and Alfresco Community version.
             Uncomment if you need to change (Note. current default version for Enterprise edition is 5.1) -->
        <alfresco.version>5.1.f</alfresco.version>
        <!--<alfresco.data.location>/absolute/path/to/alf_data_dev</alfresco.data.location> -->
    ```

    What you need to do here is uncomment the `alfresco.version` property, and then update the version to desired latest version \(e.g. 5.1.f or 5.1.g\). In this case we are upgrading to a newer Community Edition \(default is 5.1.e\).

3.  Clean metadata and content.

    After setting a newer Alfresco version you will need to clean out current database \(with metadata\), content files, and indexes. It currently does not work to do an incremental upgrade with the SDK and the H2 database. You can clean the DB and content files by running the following command: alfresco-extensions/component-a-repo/mvn clean -Ppurge

4.  **Upgrading Alfresco version for a Share AMP project.**
5.  Set new version.

    In the IDE, open up the Share AMP project that you are working on. Then open the project file for it, for example alfresco-extensions/component-a-share/pom.xml. Scroll down so you see the `properties` section:

    ```
    <properties>
        <!-- The following are default values for data location and Alfresco version.
             Uncomment if you need to change -->
        <alfresco.version>5.1.f</alfresco.version> 
    ...
    ```

    What you need to do here is uncomment the `alfresco.version` property, and then update the version to desired latest version \(e.g. 5.1.f or 5.1.g\). In this case we are upgrading to a newer Community Edition \(default is 5.1.e\).

6.  Update spring surf API dependency

    In the same POM file update the Surf dependency so it looks like:

    ```
    <dependency>
        <groupId>org.alfresco.surf</groupId>
        <artifactId>spring-surf-api</artifactId>
        <version>${dependency.surf.version}</version>
        <scope>provided</scope>
    </dependency>
    ```

    Surf is no longer a Spring Framework project but instead an Alfresco managed project.

7.  Clean metadata and content

    When upgrading the Alfresco Share AMP it is not necessary to clean out a database or clean content because these are related to the Alfresco Repository application \(alfresco.war\) and not the Share Application \(share.war\).

8.  Run

    When running we need to specify what Surf version that should be used: `mvn clean install -Ddependency.surf.version=6.3 -Pamp-to-war` Alfresco Surf is now released independently from Alfresco Share.

9.  **Upgrading Alfresco version for an All-in-One \(AIO\) project.**
10. Set new version.

    In the IDE, open up the All-in-One project that you are working on. Then open the project file for it, for example alfresco-extensions/all-in-one/pom.xml. Scroll down so you see the `properties` section:

    ```
    <properties>
        <!-- The following are default values for data location, Alfresco Community version, and Records Management Module version.
             Uncomment if you need to change (Note. current default version for Enterprise edition is 5.1) -->
        <alfresco.version>5.1.f</alfresco.version>
        <alfresco.rm.version>2.4.b</alfresco.rm.version>
        <!-- <alfresco.data.location>/absolute/path/to/alf_data_dev</alfresco.data.location> --> 
    ...       
    ```

    What you need to do here is uncomment the `alfresco.version` property, and then update the version to desired latest version \(e.g. 5.1.f or 5.1.g\). In this case we are upgrading to a newer Community edition \(default is 5.1.e\). Note also that in this case I'm using the Records Management module and I am updating the version for it at the same time by uncommenting the `alfresco.rm.version` property and setting new version \(for information about how to enable RM in an All-In-One project see [this article](alfresco-sdk-advanced-link-alf-amps-aio.md)\).

11. Update spring surf API dependency in Share AMP

    In the alfresco-extensions/all-in-one/share-amp/pom.xml update the dependency it looks like:

    ```
    <dependency>
        <groupId>org.alfresco.surf</groupId>
        <artifactId>spring-surf-api</artifactId>
        <version>${dependency.surf.version}</version>
        <scope>provided</scope>
    </dependency>
    ```

    Surf is no longer a Spring Framework project but instead an Alfresco managed project.

12. Clean metadata and content

    After setting a newer Alfresco version you will need to clean out current database \(with metadata\), content files, and indexes. It currently does not work to do an incremental upgrade with the SDK and the H2 database. You can clean the DB and content files by running the following command: alfresco-extensions/all-in-one/mvn clean -Ppurge

13. Run

    When running we need to specify what Surf version that should be used: `mvn clean install -Ddependency.surf.version=6.3 -Prun` Alfresco Surf is now released independently from Alfresco Share.


You have now seen how to upgrade the Alfresco Community version to 5.1.f \(or for example 5.1.g\) for the different types of SDK projects and how to clean the database, index, and content before starting with the new version.

**Parent topic:**[Upgrading Alfresco version for an extension project](../concepts/alfresco-sdk-upgrading-alfresco-version.md)

