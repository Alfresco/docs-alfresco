---
author: Alfresco Documentation
---

# Upgrading SDK 2.1.1 projects from Enterprise 5.0.1 to 5.0.2

These instructions will walk through what is needed when upgrading an SDK 2.1.1 project from using Alfresco Enterprise version 5.0.1 to using Enterprise version 5.0.2.

This task assumes that you have an SDK 2.1.1 project to work with, see [creating a project](../concepts/alfresco-sdk-tutorials-archetypes.md).

You will learn how to set a new version in all the different kinds of SDK project types.

1.  **Upgrading Alfresco version for a Repository AMP project.**
2.  Set new version.

    In the IDE, open up the Repository AMP project that you are working on. Then open the project file for it, for example alfresco-extensions/component-a-repo/pom.xml. Scroll down so you see the `properties` section:

    ```
    
    <properties>
        <!-- The following are default values for data location and Alfresco Community version.
             Uncomment if you need to change (Note. current default version for Enterprise edition is 5.0.1) -->
          <alfresco.version>5.0.2</alfresco.version>
          <!--<alfresco.data.location>alf_data_dev</alfresco.data.location> -->
    
    ```

    What you need to do here is uncomment the `alfresco.version` property, and then update the version to desired latest version \(e.g. 5.0.2\). In this case we are upgrading to a newer Enterprise Edition \(default is 5.0.1\).

3.  Clean metadata and content.

    After setting a newer Alfresco version you will need to clean out current database \(with metadata\), content files, and indexes. It currently does not work to do an incremental upgrade with the SDK and the H2 database. You can clean the DB and content files by running the following command: alfresco-extensions/component-a-repo/mvn clean -Ppurge

4.  **Upgrading Alfresco version for a Share AMP project.**
5.  Set new version.

    In the IDE, open up the Share AMP project that you are working on. Then open the project file for it, for example alfresco-extensions/component-a-share/pom.xml. Scroll down so you see the `properties` section:

    ```
    
     <properties>
            <!-- The following are default values for data location and Alfresco version.
                 Uncomment if you need to change-->
          <alfresco.version>5.0.2</alfresco.version>
    ...
    
    ```

    What you need to do here is uncomment the `alfresco.version` property, and then update the version to desired latest version \(e.g. 5.0.2\). In this case we are upgrading to a newer Enterprise Edition \(default is 5.0.1\).

6.  Clean metadata and content

    When upgrading the Alfresco Share AMP it is not necessary to clean out a database or clean content because these are related to the Alfresco Repository application \(alfresco.war\) and not the Share Application \(share.war\).

7.  **Upgrading Alfresco version for an All-in-One \(AIO\) project.**
8.  Set new version.

    In the IDE, open up the All-in-One project that you are working on. Then open the project file for it, for example alfresco-extensions/all-in-one/pom.xml. Scroll down so you see the `properties` section:

    ```
    
    <properties>
        <!-- The following are default values for data location, Alfresco Community version, and Records Management Module version.
             Uncomment if you need to change (Note. current default version for Enterprise edition is 5.0.1) -->
          <alfresco.version>5.0.2</alfresco.version>
          <alfresco.rm.version>2.3.c</alfresco.rm.version>
              
                        
    ```

    What you need to do here is uncomment the `alfresco.version` property, and then update the version to desired latest version \(e.g. 5.0.2\). In this case we are upgrading to a newer Enterprise Edition \(default is 5.0.1\). Note also that in this case I'm using the Records Management module and I am updating the version for it at the same time by uncommenting the `alfresco.rm.version` property and setting new version \(note that for RM to be installed you need to also uncomment the dependencies in the alfresco-extensions/all-in-one/repo/pom.xml and alfresco-extensions/all-in-one/share/pom.xml WAR projects\).

9.  Clean metadata and content

    After setting a newer Alfresco version you will need to clean out current database \(with metadata\), content files, and indexes. It currently does not work to do an incremental upgrade with the SDK and the H2 database. You can clean the DB and content files by running the following command: alfresco-extensions/all-in-one/mvn clean -Ppurge


You have now seen how to upgrade the Alfresco Enterprise version to 5.0.2 for the different types of SDK projects and how to clean the database, index, and content before starting with the new version.

**Parent topic:**[Upgrading Alfresco version for an extension project](../concepts/alfresco-sdk-upgrading-alfresco-version.md)

