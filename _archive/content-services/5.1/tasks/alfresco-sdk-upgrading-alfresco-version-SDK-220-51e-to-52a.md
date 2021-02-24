---
author: Alfresco Documentation
---

# Upgrading SDK 2.2.0 projects from Community 5.1.e to 5.2.a

These instructions will walk through what is needed when upgrading an SDK 2.2.0 project from using Alfresco Community version 5.1.e to using Community version 5.2.a. In fact, we are upgrading to Alfresco Platform version 5.2.a and Alfresco Share version 5.1.g. Note that from now on the alfresco.war is no longer available using the `alfresco` artifactId. Now we have to use `alfresco-platform`.

This task assumes that you have an SDK 2.2.0 project to work with, see [creating a project](../concepts/alfresco-sdk-tutorials-archetypes.md).

You will learn how to set a new version in all the different kinds of SDK project types.

1.  **Upgrading Alfresco version for a Repository AMP project.**
2.  Set new version and artifactId.

    In the IDE, open up the Repository AMP project that you are working on. Then open the project file for it, for example alfresco-extensions/component-a-repo/pom.xml. Scroll down so you see the `properties` section:

    ```
    <properties>
        <!-- The following are default values for data location and Alfresco Community version.
             Uncomment if you need to change (Note. current default version for Enterprise edition is 5.1) -->
         <alfresco.version>5.2.a-EA</alfresco.version>
         <alfresco.repo.artifactId>alfresco-platform</alfresco.repo.artifactId> <!-- new name for platform/repository war -->
        <!--<alfresco.data.location>/absolute/path/to/alf_data_dev</alfresco.data.location> -->
    ```

    What you need to do here is uncomment the `alfresco.version` property, and then update the version to desired latest version \(e.g. 5.2.a-EA\). In this case we are upgrading to a newer Platform Community Edition \(default is 5.1.e\). We also need to tell the project about the new artifactId for the alfresco.war using the `alfresco.repo.artifactId` property.

3.  Clean metadata and content.

    After setting a newer Alfresco version you will need to clean out current database \(with metadata\), content files, and indexes. It currently does not work to do an incremental upgrade with the SDK and the H2 database. You can clean the DB and content files by running the following command: alfresco-extensions/component-a-repo/mvn clean -Ppurge

4.  **Upgrading Alfresco version for a Share AMP project.**
5.  Set new version.

    In the IDE, open up the Share AMP project that you are working on. Then open the project file for it, for example alfresco-extensions/component-a-share/pom.xml. Scroll down so you see the `properties` section:

    ```
    <properties>
        <!-- The following are default values for data location and Alfresco version.
             Uncomment if you need to change -->
        <alfresco.version>5.1.g</alfresco.version> 
    ...
    ```

    What you need to do here is uncomment the `alfresco.version` property, and then update the version to desired latest version \(e.g. 5.1.g\). In this case we are upgrading to a newer Community Edition \(default is 5.1.e\). **Note** that the Platform and Share have different version numbers.

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
10. Set new version and artifactId

    In the IDE, open up the All-in-One project that you are working on. Then open the project file for it, for example alfresco-extensions/all-in-one/pom.xml. Scroll down so you see the `properties` section:

    ```
    <properties>
        <!-- The following are default values for data location, Alfresco Community version, and Records Management Module version.
             Uncomment if you need to change (Note. current default version for Enterprise edition is 5.1) -->
          <alfresco.version>5.2.a-EA</alfresco.version>
          <alfresco.repo.artifactId>alfresco-platform</alfresco.repo.artifactId> <!-- new name for platform/repository war -->
          <share.version>5.1.g</share.version> <!-- new property for separate share version -->
          <surf.version>6.3</surf.version>
        <!-- <alfresco.data.location>/absolute/path/to/alf_data_dev</alfresco.data.location> --> 
    ...       
    ```

    What you need to do here is uncomment the `alfresco.version` property, and then update the version to desired latest version \(e.g. 5.2.a-EA\). In this case we are upgrading to a newer Platform Community Edition \(default is 5.1.e\). We also need to tell the project about the new artifactId for the alfresco.war using the `alfresco.repo.artifactId` property. Share now has its own version so setting that with a new property called `share.version`. We also specifically add the surf version here via the `surf.version` property, it will be used when re-defining some of the dependencies and there will be no need to pass surf version on the mvn command line.

    Note also that in this case I'm using the Records Management module and I am updating the version for it at the same time by uncommenting the `alfresco.rm.version` property and setting new version \(for information about how to enable RM in an All-In-One project see [this article](alfresco-sdk-advanced-link-alf-amps-aio.md)\).

11. Replace the dependencyManagement section

    In the same AIO parent pom file replace the `dependencyManagement` section so it looks like:

    ```
     <dependencyManagement>
            <dependencies>
                <dependency>
                    <groupId>${alfresco.groupId}</groupId>
                    <artifactId>alfresco-platform-distribution</artifactId>
                    <version>${alfresco.version}</version>
                    <type>pom</type>
                    <scope>import</scope>
                </dependency>
    
                <!-- Redefine the following Share dependencies as they have different version numbers than platform.
                    They are defined in alfresco-platform-distribution... -->
                <dependency>
                    <groupId>${alfresco.groupId}</groupId>
                    <artifactId>share</artifactId>
                    <version>${share.version}</version>
                    <type>war</type>
                    <scope>provided</scope>
                </dependency>
                <dependency>
                    <groupId>${alfresco.groupId}</groupId>
                    <artifactId>share</artifactId>
                    <version>${share.version}</version>
                    <classifier>classes</classifier>
                    <scope>provided</scope>
                </dependency>
                <dependency>
                    <groupId>${alfresco.groupId}</groupId>
                    <artifactId>alfresco-web-framework-commons</artifactId>
                    <version>${share.version}</version>
                    <classifier>classes</classifier>
                    <scope>provided</scope>
                </dependency>
    
                <!-- Redefine the following surf dependencies as they have no resolvable version in the
                     alfresco-platform-distribution artifact -->
                <dependency>
                    <groupId>org.alfresco.surf</groupId>
                    <artifactId>spring-surf</artifactId>
                    <version>${surf.version}</version>
                    <scope>provided</scope>
                </dependency>
                <dependency>
                    <groupId>org.alfresco.surf</groupId>
                    <artifactId>spring-surf-api</artifactId>
                    <version>${surf.version}</version>
                    <scope>provided</scope>
                </dependency>
            </dependencies>
        </dependencyManagement>
    ```

    We need to re-define some of the dependencies as the Platform and Surf applications now have different version numbers. Also, Surf is no longer a Spring Framework project but instead an Alfresco managed project.

12. Update the dependencies section in Share AMP

    In the alfresco-extensions/all-in-one/share-amp/pom.xml update the dependencies to look like:

    ```
    <dependencies>
    
            <dependency>
                <groupId>${alfresco.groupId}</groupId>
                <artifactId>share</artifactId>
                <version>${share.version}</version>   <!-- use new share version -->
                <classifier>classes</classifier>
                <scope>provided</scope>
            </dependency>
            <dependency>
                <groupId>org.alfresco.surf</groupId>  <!-- Surf now maintained by Alfresco --> 
                <artifactId>spring-surf-api</artifactId>
            </dependency>
            <dependency>
                <groupId>${alfresco.groupId}</groupId>
                <artifactId>share-po</artifactId>
                <version>${share.version}</version>   <!-- use new share version -->
                <scope>test</scope>
            </dependency>
            <dependency>
                <groupId>${alfresco.groupId}</groupId>
                <artifactId>share-po</artifactId>
                <version>${share.version}</version>   <!-- use new share version -->
                <classifier>tests</classifier>
                <scope>test</scope>
                <exclusions>
                    <exclusion>
                        <groupId>org.seleniumhq.selenium</groupId>
                        <artifactId>selenium-java</artifactId>
                    </exclusion>
                    <exclusion>
                        <groupId>org.seleniumhq.selenium</groupId>
                        <artifactId>selenium-server</artifactId>
                    </exclusion>
                </exclusions>
            </dependency>
            <!-- Test NG is defined with test scope in share-po, so need it here too -->
            <!-- Alfresco code creates a wrapper around Test NG -->
            <dependency>
                <groupId>org.alfresco.test</groupId>
                <artifactId>alfresco-testng</artifactId>
                <version>1.1</version>
                <scope>test</scope>
                <exclusions>
                    <exclusion>
                        <groupId>org.hamcrest</groupId>
                        <artifactId>hamcrest-core</artifactId>
                    </exclusion>
                </exclusions>
            </dependency>
        </dependencies>
    ```

    Here we now use the new `share.version`. Also, Surf is no longer a Spring Framework project but instead an Alfresco managed project.

13. Add alfresco-share-services AMP to Platform WAR

    In the alfresco-extensions/all-in-one/repo/pom.xml add the following AMP dependency and overlay:

    ```
    <dependencies>
            . . .               
    
            <!-- We need Share Services on the platform for Share UI to work properly -->
            <dependency>
                <groupId>${alfresco.groupId}</groupId>
                <artifactId>alfresco-share-services</artifactId>
                <version>${share.version}</version>
                <type>amp</type>
            </dependency>
    
        </dependencies>
        <overlays>
            . . .
    
            <!-- We need Share Services on the platform for Share UI to work properly -->
            <overlay>
                <groupId>${alfresco.groupId}</groupId>
                <artifactId>alfresco-share-services</artifactId>
                <type>amp</type>
            </overlay>
        </overlays>
    ```

    Here we now use the new `share.version`.

14. Change version property for Share WAR

    In the alfresco-extensions/all-in-one/share/pom.xml change the version property used for the Share WAR artifact as it now has separate versioning from the Platform:

    ```
    <dependencies>
            <dependency>
                <groupId>${alfresco.groupId}</groupId>
                <artifactId>${alfresco.share.artifactId}</artifactId>
                <version>${share.version}</version>   <!-- New separate share version prop -->
                <type>war</type>
            </dependency>
            . . .               
            
        </dependencies>
    ```

    Here we now use the new `share.version`.

15. Clean metadata and content

    After setting a newer Alfresco version you will need to clean out current database \(with metadata\), content files, and indexes. It currently does not work to do an incremental upgrade with the SDK and the H2 database. You can clean the DB and content files by running the following command: alfresco-extensions/all-in-one/mvn clean -Ppurge

16. Run

    Run with the usual command: `mvn clean install -Prun`


You have now seen how to upgrade the Alfresco Platform Community version to 5.2.a and Alfresco Share version to 5.1.g for the different types of SDK projects, and also seen how to clean the database, index, and content before starting with the new version.

**Parent topic:**[Upgrading Alfresco version for an extension project](../concepts/alfresco-sdk-upgrading-alfresco-version.md)

