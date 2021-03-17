---
author: Alfresco Documentation
---

# Deploying All-in-One \(AIO\) WARs to external environments

This section goes through how to deploy the WARs that are produced by the All-In-One \(AIO\) project to an external environment, such as QA, UAT, and PRODUCTION.

This task assumes you completed the [Installing and Configuring software](../concepts/alfresco-sdk-installing-prerequisite-software.md) section and generated an AIO project [as described in this section](alfresco-sdk-tutorials-all-in-one-archetype.md).

Building an AIO project generates the customized alfresco.war and share.war for use in an Alfresco installation. However, by default the alfresco.war will be configured with an alfresco-global.properties file that assumes it will be deployed in a local environment, with the alf\_data directory in the build project and the use of the flat file H2 database. It is in fact assuming that we will run the environment from Maven \(i.e. `mvn clean install -Prun`\). Therefore, if we take the WAR files that are produced during a `mvn clean install` build and deploy them to an external Alfresco installation, it will not work.

This 'local' configuration is managed by a so called environment configuration. The SDK supports multiple environment configurations and this gives us the opportunity to manage configurations for multiple Alfresco environments. This also means that the produced WAR files will contain environment specific configuration, which might not be desirable in all situations. We can prevent this with the use of a specific property during build.

1.  Excluding the environment configuration from the produced Alfresco Repository WAR file.
2.  Build with the `app.properties.include` property set to "none".

    The `app.properties.include` is normally set to `**`, which will include all the files under src/main/properties/$\{env\} \(e.g. alfresco-global.properties\). If we set this property to `none` it will not match any files. Note that it does not work to set this property to an empty string, and the Maven plug-in that is used does not have a `skip` configuration option:

    ```
    all-in-one$ mvn clean install -Dapp.properties.include=none
    ```

3.  Copy the produced WAR files to the Alfresco installation

    When the AIO project has been built without environment specific configuration we can copy the WAR files to an Alfresco installation:

    ```
    all-in-one$ cd repo/target/
    all-in-one/repo/target$ mv repo.war alfresco.war
    all-in-one/repo/target$ cp alfresco.war /opt/alfresco50d/tomcat/webapps/
    all-in-one/repo/target$ cd ../../share/target/
    all-in-one/share/target$ cp share.war /opt/alfresco50d/tomcat/webapps/
    all-in-one/share/target$ cd /opt/alfresco50dTest/
    alfresco50d$ cd tomcat/webapps
    alfresco50d/tomcat/webapps$ rm -rf alfresco/ share/
    ```

    Note that we need to remove the exploded WAR directories for the new WARs to be picked up and deployed. Also, the Alfresco Repository WAR is generated with the repo.war name so we need to change it to alfresco.war before copying it over to the Alfresco installation.

4.  Restart Alfresco Tomcat

    The new WARs are now in place so restart Tomcat to have them deployed:

    ```
    alfresco50d$ ./alfresco.sh restart tomcat
    ```

5.  Including environment specific configuration in the produced Alfresco Repository WAR file.
6.  Create a new environment directory

    This should be done in the all-in-one/repo/src/main/properties directory, which already contains the local directory representing the local environment. Name the new directory after the environment you are deploying to, such as for example uat \(i.e. User Acceptance Testing\):

    ```
    all-in-one/repo/src/main/properties$ mkdir uat
    ```

7.  Copy the alfresco-global.properties file from the external UAT environment to the environment directory.

    You will find the environment specific file located in the alfresco/tomcat/shared/classes directory from where it can be copied to the build project. At this point you should see something like this under the repo project:

    ```
    
    all-in-one/repo/src/main$ tree
    .
    ├── properties
    │   ├── local
    │   │   └── alfresco-global.properties
    │   └── uat
    │       └── alfresco-global.properties
    └── resources
        └── alfresco
            └── extension
                └── dev-log4j.properties
    
    ```

    So we got the `local` environment configuration that will point to a development alf\_data directory and the H2 database. We then have a new environment configuration called `uat` that contains an alfresco-global.properties file that has been copied from that environment's alfresco/tomcat/shared/classes directory. Looking in the `uat` environment's properties file we will see something like this \(or whatever configuration we have done for the UAT environment\):

    ```
    
    ###############################
    ## Common Alfresco Properties #
    ###############################
    
    dir.root=/opt/alfresco/alf_data
    
    alfresco.context=alfresco
    alfresco.host=127.0.0.1
    alfresco.port=8080
    alfresco.protocol=http
    
    share.context=share
    share.host=127.0.0.1
    share.port=8080
    share.protocol=http
    
    ### database connection properties ###
    db.driver=org.postgresql.Driver
    db.username=alfresco
    db.password=admin
    db.name=alfresco
    db.url=jdbc:postgresql://localhost:5432/${db.name}
    # Note: your database must also be able to accept at least this many connections.  Please see your database documentation for instructions on how to configure this.
    db.pool.max=275
    db.pool.validate.query=SELECT 1
    ...
    
    ```

8.  Build WARs to include the UAT environment specific configuration.

    We can now activate the UAT environment configuration by specifying the name on the command line \(it defaults to `local`\):

    ```
    all-in-one$ mvn clean install -DskipTests=true -Denv=uat
    ```

    The alfresco-global.properties configuration file for the `uat` environment will end up in the tomcat/webapps/alfresco/WEB-INF/classes directory of the final alfresco.war. It will take precedence over the tomcat/shared/classes/alfresco-global.properties file. Note here also that we need to skip Unit tests while doing this build as they require a local context to be running, which is not possible when we change environment configuration.

9.  Copy the produced WAR files to the Alfresco installation

    When the AIO project has been built with the UAT environment specific configuration we can copy the WAR files to this Alfresco installation:

    ```
    all-in-one$ cd repo/target/
    all-in-one/repo/target$ mv repo.war alfresco.war
    all-in-one/repo/target$ cp alfresco.war /opt/alfresco50d/tomcat/webapps/
    all-in-one/repo/target$ cd ../../share/target/
    all-in-one/share/target$ cp share.war /opt/alfresco50d/tomcat/webapps/
    all-in-one/share/target$ cd /opt/alfresco50dTest/
    alfresco50d$ cd tomcat/webapps
    alfresco50d/tomcat/webapps$ rm -rf alfresco/ share/
    ```

    Note that we need to remove the exploded WAR directories for the new WARs to be picked up and deployed. Also, the Alfresco Repository WAR is generated with the repo.war name so we need to change it to alfresco.war before copying it over to the Alfresco installation.

10. Restart Alfresco Tomcat

    The new WARs are now in place so restart Tomcat to have them deployed:

    ```
    alfresco50d$ ./alfresco.sh restart tomcat
    ```


This article has shown how it is possible to generate WAR files without any environment specific configuration, making them deployable to any environment. We have also covered how to set up a new custom environment configuration, and how to have it included in the final WAR, making it deployable only to a specific Alfresco server.

**Parent topic:**[Advanced Topics](../concepts/alfresco-sdk-advanced-topics.md)

