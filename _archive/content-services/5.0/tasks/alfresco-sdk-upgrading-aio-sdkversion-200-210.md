---
author: Alfresco Documentation
---

# Upgrading an All-in-One \(AIO\) project from SDK 2.0.0 to 2.1.0

These instructions will walk through what is needed when upgrading an AIO project from using SDK version 2.0.0 to using SDK version 2.1.0.

There are multiple ways to go about an SDK upgrade. These instructions assume that you have an All-in-One project where the source code is managed by a Software Configuration Management \(SCM\) system such as Git or Subversion. You cannot just throw away the history of this project; you need to upgrade "in-place". On the other hand, if your project is small, and you don't mind starting with a new project in the SCM, it might be easier to [generate a new project](alfresco-sdk-tutorials-all-in-one-archetype.md) from the AIO 2.1.0 SDK archetype and move the code and other changes over to it from the SDK 2.0.0 project.

**Note:** In the following instructions the `AIO_PROJECT_PATH` variable denotes the path to where you have your All-in-One top project folder. So, for example, if your All-in-One project was generated in the C:\\alfresco-extensions\\acme-poc directory, then this directory path is the value of this variable.

**Important:** Make sure you have made a complete backup of your project before you start the upgrade process.

1.  Update the top AIO project file.
2.  Setting the SDK Version to 2.1.0.

    In the IDE, open up the \{AIO\_PROJECT\_PATH\}/pom.xml project file. Scroll down so you see the `parent` section. Then update it to look as follows:

    ```
    
    <parent>
        <groupId>org.alfresco.maven</groupId>
        <artifactId>alfresco-sdk-parent</artifactId>
        <version>2.1.0</version>
    </parent>
    ```

3.  Add a new property for the Alfresco Share Webapp location.

    In the same project file \{AIO\_PROJECT\_PATH\}/pom.xml scroll down to the `properties` section. Then update it with this extra property:

    ```
    
    <properties>
    . . .
        <!-- The Alfresco Share web application is accessible via this URL -->
        <share.client.url>http://localhost:8080/share</share.client.url>
            
    ```

4.  Add a new property for the Alfresco RM Module version \(**OPTIONAL**\).

    If the Records Management \(RM\) module is used then add a property specifying the RM version that should be used. In the `properties` section add this extra property:

    ```
    
    <properties>
    . . .
        <alfresco.rm.version>2.3</alfresco.rm.version>
            
    ```

5.  Add a `build` section to enable some plugins.

    In the same project file \{AIO\_PROJECT\_PATH\}/pom.xml scroll down to the `dependencyManagement` end tag. Then add the following `build` section after it with the `yuicompressor-maven-plugin` to enable JS compression and the `alfresco-maven-plugin` to enable webapp RAD development:

    ```
    
    . . .                        
    </dependencyManagement>
    
    <build>
        <plugins>
            <!-- Compress JavaScript files and store as *-min.js -->
            <plugin>
                <groupId>net.alchim31.maven</groupId>
                <artifactId>yuicompressor-maven-plugin</artifactId>
            </plugin>
            <plugin>
                <groupId>org.alfresco.maven.plugin</groupId>
                <artifactId>alfresco-maven-plugin</artifactId>
            </plugin>
        </plugins>
    </build>
    ```

6.  Remove the Records Management \(RM\) profile.

    In the same project file \{AIO\_PROJECT\_PATH\}/pom.xml scroll down to the `profiles` section. Then remove the profile with the `rm` id \(identifier\). The RM module is added via the \{AIO\_PROJECT\_PATH\}/repo/pom.xml and the \{AIO\_PROJECT\_PATH\}/share/pom.xml project files. See further down in these instructions for more information.

7.  Update the name of the Solr module.

    SDK version 2.1.0 comes with support for Solr4, which is deployed directly from the maven artefact. The maven module just contains Solr 4 configuration information and because of this has changed name from `solr` to `solr-config`, so we need to update to the new name. In the same project file \{AIO\_PROJECT\_PATH\}/pom.xml scroll down to the `modules` section. Update it so it looks like this:

    ```
    
    . . .                        
    <modules>
        <module>repo-amp</module>
        <module>share-amp</module>
        <module>repo</module>
        <module>solr-config</module>
        <module>share</module>
        <module>runner</module>
    </modules>
    ```

    **Note**. You might have added extra modules that are not part of the AIO artefact, don't remove these modules from the definition.

8.  Update the Repository Webapp \(alfresco.war\) Project file
9.  Remove the Records Management \(RM\) profile.

    In the project file \{AIO\_PROJECT\_PATH\}/repo/pom.xml scroll down to the `profiles` section. Then remove the profile with the `rm` id \(identifier\). The RM module is now instead added permanently as a dependency and overlay.

10. Add a Records Management \(RM\) Module Dependency to Repository WAR \(**OPTIONAL**\)

    If the RM module is used, then it is now added permanently to the project instead of via profile activation. Add a dependency for it as follows. In the IDE, open up the \{AIO\_PROJECT\_PATH\}/repo/pom.xml project file. Scroll down so you see the `dependencies` section. Then add the following dependency:

    ```
    
    <dependencies>
    . . . 
        <dependency>
            <groupId>${alfresco.groupId}</groupId>
            <artifactId>alfresco-rm</artifactId>
            <version>${alfresco.rm.version}</version>
            <type>amp</type>
        </dependency>
    ```

11. Add a Records Management \(RM\) Module Overlay Repository WAR \(**OPTIONAL**\)

    If the RM module is used, then it is now added permanently to the project instead of via profile activation. Add an overlay configuration as follows. In the \{AIO\_PROJECT\_PATH\}/repo/pom.xml project file scroll down so you see the `overlays` section. Then add the following overlay at the end:

    ```
    
    <overlays>
    . . . 
        <overlay>
            <groupId>${alfresco.groupId}</groupId>
            <artifactId>alfresco-rm</artifactId>
            <type>amp</type>
        </overlay>
    </overlays>
    ```

12. Make sure the Repository is using the Solr4 subsystem

    When running all the web applictions during testing the repository webapp \(alfresco.war\) is reading its configuration from the \{AIO\_PROJECT\_PATH\}/repo/src/main/properties/local/alfresco-global.properties file. We need to update it so it uses Solr4, the following properties should be changed:

    ```
    
    index.subsystem.name=solr4
    solr.backup.alfresco.remoteBackupLocation=${dir.root}/solr4Backup/alfresco
    solr.backup.archive.remoteBackupLocation=${dir.root}/solr4Backup/archive
    
    ```

13. Update the Repository AMP Project file
14. Remove the property used to specify the artifact ID for the Alfresco WAR.

    In the project file \{AIO\_PROJECT\_PATH\}/repo-amp/pom.xml scroll down to the `properties` section. Then remove the property called `alfresco.client.war`. This property is now called `app.amp.client.war.artifactId` and defaults to `alfresco`, so no need to set it in the repo-amp project file. This property is used when you run with the `-Pamp-to-war` profile.

15. Add a Records Management \(RM\) classes Dependency \(**OPTIONAL**\)

    If the RM module is used, then it is now added permanently to the project instead of via profile activation. So to get access to the RM classes add a dependency as follows. In the \{AIO\_PROJECT\_PATH\}/repo-amp/pom.xml project file scroll down so you see the `dependencies` section. Then add the following dependency:

    ```
    
    <dependencies>
    . . . 
        <dependency>
            <groupId>${alfresco.groupId}</groupId>
            <artifactId>alfresco-rm</artifactId>
            <version>${alfresco.rm.version}</version>
            <classifier>classes</classifier>
        </dependency>
    ```

16. Remove the Records Management \(RM\) profile.

    In the project file \{AIO\_PROJECT\_PATH\}/repo-amp/pom.xml scroll down to the `profiles` section. Then remove the profile with the `rm` id \(identifier\). The RM classes are now instead added permanently as a dependency.

17. Update the Share Webapp \(share.war\) Project file
18. Add a properties section with a new property for the Alfresco Repository location.

    In the project file \{AIO\_PROJECT\_PATH\}/share/pom.xml add the following `properties` section just after the `parent` section:

    ```
    
    . . .
    </parent>
    
    <properties>
       <!-- Used in share-config-custom.xml when testing.
            By default points to standard location (local) of Alfresco Repository -->
       <alfresco.repo.url>http://localhost:8080/alfresco</alfresco.repo.url>
    </properties>
    ```

19. Move `share-config-custom.xml` from `share-amp` to `share`.

    The share configuration file has moved from the share AMP sub project to the share WAR project. This is because it contains generic configuration such as where the Repository is running and RAD related configuration. Move the \{AIO\_PROJECT\_PATH\}/share-amp/src/test/resources/alfresco/web-extension/share-config-custom.xml file to the \{AIO\_PROJECT\_PATH\}/share/src/main/resources/alfresco/web-extension location. Then update the `web-framework` configuration so it looks like this:

    ```
    
    <web-framework>
        <autowire>
            <!-- Changing this to 'development' currently breaks the Admin Console.
            Instead we make a POST to clear Share dependency caches, see 'clear-caches-refresh-ws' profile. -->
            <mode>production</mode> <!-- not really need in the long run, used for YUI - deprecate -->
        </autowire>
        
        <!--
            We don't need to do this when we have the new refresh mojos in the Alfresco plug-in.
            
            If resource caching has been disabled then all the dependency caches will be cleared
            before processing the Aikau jsonModel request...
            (i.e. this.dojoDependencyHandler.clearCaches() )
            
            For more information see the Aikau source code: https://github.com/Alfresco/Aikau
        -->
        <disable-resource-caching>false</disable-resource-caching>
    </web-framework>
    
    ```

20. Remove the Records Management \(RM\) profile.

    In the project file \{AIO\_PROJECT\_PATH\}/share/pom.xml scroll down to the `profiles` section. Then remove the profile with the `rm` id \(identifier\). The RM module is now instead added permanently as a dependency and overlay.

21. Add a Records Management \(RM\) Module Dependency to Share WAR \(**OPTIONAL**\)

    If the RM module is used, then it is now added permanently to the project instead of via profile activation. Add a dependency for it as follows. In the IDE, open up the \{AIO\_PROJECT\_PATH\}/share/pom.xml project file. Scroll down so you see the `dependencies` section. Then add the following dependency:

    ```
    
    <dependencies>
    . . . 
        <dependency>
            <groupId>${alfresco.groupId}</groupId>
            <artifactId>alfresco-rm-share</artifactId>
            <version>${alfresco.rm.version}</version>
            <type>amp</type>
        </dependency>
    ```

22. Add a Records Management \(RM\) Module Overlay to Share WAR \(**OPTIONAL**\)

    If the RM module is used, then it is now added permanently to the project instead of via profile activation. Add an overlay configuration as follows. In the \{AIO\_PROJECT\_PATH\}/share/pom.xml project file scroll down so you see the `overlays` section. Then add the following overlay at the end:

    ```
    
    <overlays>
    . . . 
        <overlay>
            <groupId>${alfresco.groupId}</groupId>
            <artifactId>alfresco-rm-share</artifactId>
            <type>amp</type>
        </overlay>
    </overlays>
    ```

23. Update the Share AMP Project file
24. Change the name of the property used to specify the artifact ID for the Share WAR.

    In the project file \{AIO\_PROJECT\_PATH\}/share-amp/pom.xml scroll down to the `properties` section. Then change the name of property called `alfresco.client.war` to its new name `app.amp.client.war.artifactId`. It defaults to `alfresco` so we need to override it here with the value `share`. This property is used when you run with the `-Pamp-to-war` profile.

25. Remove the property used to specify the location of the Alfresco Repository Webapp.

    In the project file \{AIO\_PROJECT\_PATH\}/share-amp/pom.xml scroll down to the `properties` section. Then remove the property called `alfresco.repo.url`. This property is only used by the \{AIO\_PROJECT\_PATH\}/share/pom.xml project in an All-in-One extension project.

26. Remove the property used to specify the port number for embedded Tomcat.

    In the project file \{AIO\_PROJECT\_PATH\}/share-amp/pom.xml scroll down to the `properties` section. Then remove the property called `maven.tomcat.port`. This property is only used by the \{AIO\_PROJECT\_PATH\}/runner/pom.xml project when starting an embeeded Tomcat instance. Default port number is configured to 8080 in the parent SDK pom.

27. Add dependencies for TestNG and Share Page Object classes.

    In version 2.1.0 of the SDK there are two new profiles called `regression-testing` and `functional-testing` that uses Page Objects \(PO\) to do functional testing of the Share Web application. We need to add all dependencies needed for these tests. In the \{AIO\_PROJECT\_PATH\}/share-amp/pom.xml project file scroll down so you see the `dependencies` section. Then add the following dependencies:

    ```
    
    <dependencies>
    . . . 
         <!--===============================================================
            The following dependencies are needed to be able to compile the
            custom functional tests that are based on Page Objects (PO)
            ===============================================================-->
    
        <!-- Bring in the Share Page Objects (PO) used in our functional tests.
             It contains page objects such as LoginPage -->
        <dependency>
            <groupId>${alfresco.groupId}</groupId>
            <artifactId>share-po</artifactId>
            <version>${alfresco.version}</version>
            <scope>test</scope>
        </dependency>
        <!-- Bring in the Share Page Object (PO) Tests that comes with Alfresco. It has
             the org.alfresco.po.share.AbstractTest class that our custom tests extend. -->
        <dependency>
            <groupId>${alfresco.groupId}</groupId>
            <artifactId>share-po</artifactId>
            <version>${alfresco.version}</version>
            <classifier>tests</classifier>
            <scope>test</scope>
    
            <!-- Exclude version 2.39.0 of selenium that does not work with latest FF browsers, we include
               version 2.45 later on here -->
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
        <!-- Bring in newer selenium version -->
        <dependency>
            <groupId>org.seleniumhq.selenium</groupId>
            <artifactId>selenium-java</artifactId>
            <version>2.45.0-alfresco</version>
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

28. Replace Modules and Scripts
29. Replace the `runner` module.

    The project configuration for the `runner` module has changed quite a bit in version 2.1.0 of the SDK. And there should not be much custom configuration done to it. So it make sense to take the `runner` module from a newly generated 2.1.0 AIO project and replace the 2.0.0 `runner` module with it. So follow [these instructions](alfresco-sdk-tutorials-all-in-one-archetype.md) to generate an AIO project based on the 2.1.0 archetype. Then delete the \{AIO\_PROJECT\_PATH\}/runner module/directory from the All-in-One project. Now copy the \{newly generated 2.1.0 AIO\}/runner module into the \{AIO\_PROJECT\_PATH\}/runner location.

    The new `runner` module probably does not have the same parent configuration as your \{AIO\_PROJECT\_PATH\} project. So open up the \{AIO\_PROJECT\_PATH\}/runner/pom.xml file and make sure the `parent` section is correct.

    If you have made changes to the virtual web application context because you have added more AMPs to the AIO project, then see [these instructions](alfresco-sdk-advanced-add-custom-amps-aio.md) for how to update the 2.1.0 runner context.

30. Replace the `solr` module.

    The project configuration for the `solr` module has changed completely from bringing in the complete Solr 1.4 web application to just bringing in the Solr4 configuration. So it make sense to take the `solr-config` module from a newly generated 2.1.0 AIO project and replace the 2.0.0 `solr` module with it. So follow [these instructions](alfresco-sdk-tutorials-all-in-one-archetype.md) to generate an AIO project based on the 2.1.0 archetype \(if you have not already done it\). Then delete the \{AIO\_PROJECT\_PATH\}/solr module/directory from the All-in-One project. Now copy the \{newly generated 2.1.0 AIO\}/solr-config module into the \{AIO\_PROJECT\_PATH\}/solr-config location.

    The new `solr-config` module probably does not have the same parent configuration as your \{AIO\_PROJECT\_PATH\} project. So open up the \{AIO\_PROJECT\_PATH\}/solr-config/pom.xml file and make sure the `parent` section is correct.

    If you have made changes to the Solr configuration, such as adding a synonyms list, then you will have to update the `solr-config` project with these changes.

31. Replace run scripts.

    Version 2.1.0 of the SDK have changes to the Linux run scripts and have new run scripts for Windows. So it make sense to take the new scripts from a newly generated 2.1.0 AIO project and replace the 2.0.0 scripts with them. So follow [these instructions](alfresco-sdk-tutorials-all-in-one-archetype.md) to generate an AIO project based on the 2.1.0 archetype \(if you have not already done it\). Then just copy over the \{newly generated 2.1.0 AIO\}/run.\* scripts to the \{AIO\_PROJECT\_PATH\} directory, overwriting the `run.sh` script.

32. Remove the alf\_data\_dev directory.

    It is not possible to do an incremental H2 database schema update. The complete alf\_data\_dev directory needs to be deleted before you run the application again.


Your All-in-One project should now be fully updated to use the 2.1.0 version of the SDK.

**Parent topic:**[Upgrading SDK version from 2.0.0 to 2.1.0](../concepts/alfresco-sdk-upgrading-sdkversion-200-210.md)

