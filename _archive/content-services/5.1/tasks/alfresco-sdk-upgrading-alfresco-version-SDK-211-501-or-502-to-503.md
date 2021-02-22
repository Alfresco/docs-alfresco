---
author: Alfresco Documentation
---

# Upgrading SDK 2.1.1 projects from Enterprise 5.0.1 \(or 5.0.2\) to 5.0.3

These instructions will walk through what is needed when upgrading an SDK 2.1.1 project from using Alfresco Enterprise version 5.0.1 \(or 5.0.2\) to using Enterprise version 5.0.3. There are a couple of changes in the 5.0.3 code base, such as new database scripts, that are not automatically handled by SDK 2.1.1. There is also a problem running with Spring Loaded because of some new security checks in the repository layer.

This task assumes that you have an SDK 2.1.1 project to work with, see [creating a project](../concepts/alfresco-sdk-tutorials-archetypes.md).

You will learn how to set a new version in all the different kinds of SDK project types.

1.  **Upgrading Alfresco version for a Repository AMP project.**
2.  Set new version.

    In the IDE, open up the Repository AMP project that you are working on. Then open the project file for it, for example alfresco-extensions/component-a-repo/pom.xml. Scroll down so you see the `properties` section:

    ```
    
    <properties>
        <!-- The following are default values for data location and Alfresco Community version.
             Uncomment if you need to change (Note. current default version for Enterprise edition is 5.0.1) -->
          <alfresco.version>5.0.3</alfresco.version>
          <!--<alfresco.data.location>alf_data_dev</alfresco.data.location> -->
    
    ```

    What you need to do here is uncomment the `alfresco.version` property, and then update the version to desired latest version \(e.g. 5.0.3\). In this case we are upgrading to a newer Enterprise Edition \(default is 5.0.1\).

3.  Add H2 scripts dependency and plug-in repository.

    In the same POM file add the following:

    ```
    <build>
        <plugins>
            <plugin>
                <groupId>org.apache.tomcat.maven</groupId>
                <artifactId>tomcat7-maven-plugin</artifactId>
                <version>${maven.tomcat.version}</version>
                <dependencies>
                    <dependency>
                        <groupId>org.alfresco</groupId>
                        <artifactId>alfresco-repository</artifactId>
                        <version>${alfresco.version}</version>
                        <classifier>h2scripts</classifier>
                        <exclusions>
                            <exclusion>
                                <groupId>*</groupId>
                                <artifactId>*</artifactId>
                            </exclusion>
                        </exclusions>
                    </dependency>
                </dependencies>
            </plugin>
        </plugins>
    </build>
    
    <pluginRepositories>
        <pluginRepository>
            <id>alfresco-private-repository</id>
            <url>https://artifacts.alfresco.com/nexus/content/groups/private</url>
        </pluginRepository>
    </pluginRepositories>
    ```

    When we run \(via `mvn clean install -Pamp-to-war,enterprise`\) the Tomcat plug-in is going to need the H2 scripts the first time we start and create the database and the repository. These scripts are usually available in the special SDK dependency `alfresco-rad`, but this file is only updated during new SDK releases. So when a new patch release of Alfresco contains a new script, it is not available in the SDK. Instead we now keep the scripts in this alfresco-repository `h2scripts` dependency. As this dependency is released with each Alfresco version. The `h2scripts` dependency is a plug-in dependency so we need to also set up the private Alfresco Enterprise maven repository as a plug-in repository.

4.  Make sure Spring Loaded is not enabled.

    The new security check on the repository side in version 5.0.3 will not work with Spring Loaded \(used for hot reloading\). Make sure the **run.sh** or **run.bat** scripts are not enabling Spring Loaded. Also check the environment variable `MAVEN_OPTS` so it is not specifying Spring Loaded as Java agent.

5.  Clean metadata and content.

    After setting a newer Alfresco version you will need to clean out current database \(with metadata\), content files, and indexes. It currently does not work to do an incremental upgrade with the SDK and the H2 database. You can clean the DB and content files by running the following command: alfresco-extensions/component-a-repo/mvn clean -Ppurge

6.  **Upgrading Alfresco version for a Share AMP project.**
7.  Set new version.

    In the IDE, open up the Share AMP project that you are working on. Then open the project file for it, for example alfresco-extensions/component-a-share/pom.xml. Scroll down so you see the `properties` section:

    ```
    
     <properties>
            <!-- The following are default values for data location and Alfresco version.
                 Uncomment if you need to change-->
          <alfresco.version>5.0.3</alfresco.version>
    ...
    
    ```

    What you need to do here is uncomment the `alfresco.version` property, and then update the version to desired latest version \(e.g. 5.0.3\). In this case we are upgrading to a newer Enterprise Edition \(default is 5.0.1\).

8.  Clean metadata and content

    When upgrading the Alfresco Share AMP it is not necessary to clean out a database or clean content because these are related to the Alfresco Repository application \(alfresco.war\) and not the Share Application \(share.war\).

9.  **Upgrading Alfresco version for an All-in-One \(AIO\) project.**
10. Set new version.

    In the IDE, open up the All-in-One project that you are working on. Then open the project file for it, for example alfresco-extensions/all-in-one/pom.xml. Scroll down so you see the `properties` section:

    ```
    <properties>
        <!-- The following are default values for data location, Alfresco Community version, and Records Management Module version.
             Uncomment if you need to change (Note. current default version for Enterprise edition is 5.0.1) -->
          <alfresco.version>5.0.3</alfresco.version>
          <alfresco.rm.version>2.3.b</alfresco.rm.version>                    
    ```

    What you need to do here is uncomment the `alfresco.version` property, and then update the version to desired latest version \(e.g. 5.0.3\). In this case we are upgrading to a newer Enterprise Edition \(default is 5.0.1\). Note also that in this case I'm using the Records Management module and I am updating the version for it at the same time by uncommenting the `alfresco.rm.version` property and setting new version.

11. Add H2 scripts dependency and plug-in repository.

    In the Runner project POM file \(alfresco-extensions/all-in-one/runner/pom.xml. \), add the following:

    ```
    . . .
    <pluginRepositories>
        <pluginRepository>
            <id>alfresco-private-repository</id>
            <url>https://artifacts.alfresco.com/nexus/content/groups/private</url>
        </pluginRepository>
    </pluginRepositories>
    
    <profiles>
        <profile>
            <id>run</id>
            ...
            <build>
                <plugins>
                ...
                    <!-- Run Tomcat 7 embedded with Alfresco.war and Share.war contexts.
                         The solr4.war is fetched directly from the Maven repo, it is not built like the other WARs.
                         Plugin version is picked up from alfresco-sdk-parent.pom pluginManagement definition,
                         which also brings in the H2 database lib -->
                    <plugin>
                        <groupId>org.apache.tomcat.maven</groupId>
                        <artifactId>tomcat7-maven-plugin</artifactId>
                        <dependencies>
                            <dependency>
                                <groupId>org.alfresco</groupId>
                                <artifactId>alfresco-repository</artifactId>
                                <version>${alfresco.version}</version>
                                <classifier>h2scripts</classifier>
                                <exclusions>
                                    <exclusion>
                                        <groupId>*</groupId>
                                        <artifactId>*</artifactId>
                                    </exclusion>
                                </exclusions>
                            </dependency>
                        </dependencies>
                        <executions>
                        ...
    ```

    When we run \(via `mvn clean install -Prun,enterprise`\) the Tomcat plug-in is going to need the H2 scripts the first time we start and create the database and the repository. These scripts are usually available in the special SDK dependency `alfresco-rad`, but this file is only updated during new SDK releases. So when a new patch release of Alfresco contains a new script, it is not available in the SDK. Instead we now keep the scripts in this alfresco-repository `h2scripts` dependency. As this dependency is released with each Alfresco version. The `h2scripts` dependency is a plug-in dependency so we need to also set up the private Alfresco Enterprise maven repository as a plug-in repository.

12. Make sure Spring Loaded is not enabled.

    The new security check on the repository side in version 5.0.3 will not work with Spring Loaded \(used for hot reloading\). Make sure the **run.sh** or **run.bat** scripts are not enabling Spring Loaded. Also check the environment variable `MAVEN_OPTS` so it is not specifying Spring Loaded as Java agent.

13. Clean metadata and content

    After setting a newer Alfresco version you will need to clean out current database \(with metadata\), content files, and indexes. It currently does not work to do an incremental upgrade with the SDK and the H2 database. You can clean the DB and content files by running the following command: alfresco-extensions/all-in-one/mvn clean -Ppurge


You have now seen how to upgrade the Alfresco Enterprise version to 5.0.3 for the different types of SDK projects, and how to clean the database, index, and content before starting with the new version.

**Parent topic:**[Upgrading Alfresco version for an extension project](../concepts/alfresco-sdk-upgrading-alfresco-version.md)

