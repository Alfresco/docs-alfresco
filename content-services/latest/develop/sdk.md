---
title: Alfresco In-Process SDK
---

The Alfresco In-Process SDK is a Maven based development kit that provides an easy to use approach to developing applications and extensions for Alfresco Content Services. With this SDK you can develop, package, test, run, document and release your Alfresco extension project.

The following picture illustrates where In-Process SDK fits into the big picture:

![sdk4_big_picture]({% link content-services/images/sdk4_big_picture.png %})

The Alfresco Software Development Kit (Alfresco SDK) is a fundamental tool provided by Alfresco to developers to build customizations and extensions for the Alfresco Digital Business Platform. It is based on [Apache Maven](http://maven.apache.org/){:target="_blank"} and [Docker](https://www.docker.com/){:target="_blank"} and is compatible with major IDEs. This enables Rapid Application Development (RAD) and Test Driven Development (TDD).

The Alfresco SDK is released under [Apache License version 2.0](http://www.apache.org/licenses/LICENSE-2.0.html){:target="_blank"} and supports Content Services both in Community Edition and Enterprise Edition. If you're an Enterprise customer, check the [Alfresco SDK Support status]({% link content-services/latest/support/index.md %}) for the version you're using. If your version is in Limited or Full Support and you need help, [contact Support]({% link support/latest/contact.md %}).

The 4.0 release took advantage of Semantic Versioning ([SEMVER](https://semver.org/){:target="_blank"}), which means that it isn't directly compatible with the previous releases of the SDK.

If you have existing projects that you wish to upgrade to the latest SDK version, the recommended approach is to generate a new project from the new archetypes and move your code over.

## What's new?

This release of the Alfresco In-Process SDK is a minor update to the SDK and extends support for Content Services.

### Embracing containers and Docker

The main change included in SDK 4.0 is the addition of container technologies. Specifically, the new SDK is highly based on [Docker](https://www.docker.com/){:target="_blank"} and [Docker Compose](https://docs.docker.com/compose/){:target="_blank"} to offer a solution aligned with the architectural decisions made for version 6: moving towards microservices-oriented solutions.

Working with Docker images gives the developers the opportunity to easily customize the deployment of the local environment to adapt it to their requirements.
Adding, removing and configuring services in the environment is as easy as modifying the Docker Compose descriptor file.

### Support for Java 17

[Java 17](https://openjdk.org/projects/jdk/17/){:target="_blank"} is the latest Long Term Support (LTS) version that provides support for 3 years. Content Services 7.3 or later already offers support for this version of the Java platform.

The Alfresco In-Process SDK has been modified to add support for Java 17. If you're working as a developer on customizations for Content Services, you must now use the latest version of the SDK + JDK 17 to work on them. The Apache Maven plugins included in the archetypes has been updated to avoid any issue with Java 17.

### Easy dependency configuration

The configuration of the Maven dependency management has been greatly improved thanks to the addition of a _bill of materials_ (BOM).

The inclusion of the BOM dependency in the `dependencyManagement` section of the `pom.xml` file of the projects generated using the archetypes imports all artifacts in the selected Alfresco platform version. It is still needed to define dependencies in the POM files, but the version can be omitted as it's enforced by this `dependencyManagement`.

That incredibly eases the management of the versions of the different Alfresco platform's dependencies required in a customization project.

### Alfresco Maven Plugin no longer needed

The Alfresco SDK manages the lifecycle of the generated projects making use of proper [utility scripts](#workingwithrunscript) (`run.sh` / `run.bat`). That avoids the need of using the Alfresco Maven Plugin and eases the process to modify the lifecycle of the customization projects.

If a development team has straightforward requirements and doesn't want to worry about the complexity of working with containers, it can use the utility scripts as they are. But, if any development team has a requirement or a development process that requires a customization in the project development lifecycle, it is easy to modify the utility scripts, the Docker files or the Docker Compose descriptor to adapt the SDK projects to their needs.

The Alfresco Maven Plugin is only required in those cases in which it is required to package the customization project as an AMP. For more information about how to work with AMPs, visit [Working with AMPs](#workingwithamps).

### Integration testing

The integration tests and the mechanisms to execute them in an Alfresco Content Services instance remains the same as in the previous version of the SDK.

However, the inclusion of Docker and the utility scripts provides a different perspective about the environment on which the integration tests are executed. In this version, the integration tests are run against the dockerized environment defined using Docker and Docker Compose. By doing so, the integration test environment can be more similar to a real one, including whatever other service is required for a full featured integration test execution.

## Getting started with Alfresco SDK {#gettingstarted}

Use these instructions to get started with using the Alfresco SDK.

### Prerequisites

There are a number of software requirements for using the Alfresco SDK:

* Java Development Kit (JDK) - Version 17
* Maven - Version 3.3
* Docker - Latest stable version
* JRebel (optional) for hot reloading of web resources, configuration, and classes
* HotSwap Agent (optional) for hot reloading of web resources, configuration, and classes

#### Java

It is highly recommended to use Java 17 with Content Services.

1. Download [JDK 17](https://jdk.java.net/archive/){:target="_blank"}, unzip it and configure it as the default Java installation.

2. Verify the installation for both JDK and JRE.

    ```bash
    $ javac -version
    javac 17.0.9
    
    $ java -version
    openjdk version "17.0.9" 2023-10-17
    OpenJDK Runtime Environment Homebrew (build 17.0.9+0)
    OpenJDK 64-Bit Server VM Homebrew (build 17.0.9+0, mixed mode, sharing)
    ```

3. Make sure `JAVA_HOME` is setup correctly, so other tools like Maven use the correct version.

    ```bash
    $ env|grep JAVA_HOME
    JAVA_HOME=/Library/Java/JavaVirtualMachines/jdk-17.0.9.jdk/Contents/Home
    ```

#### Maven

Alfresco recommends that you keep up-to-date with all the Maven releases. Linux distributions and package managers tend to bundle older releases and this is the most common pitfall.

Alfresco SDK requires Maven 3.3.0 or later, but you are recommended to download the latest version.

1. Download and install [Apache Maven](https://maven.apache.org/download.cgi){:target="_blank"} and make sure it is configured correctly on your path.

2. Verify the installation.

    ```bash
    $ mvn -v
    Apache Maven 3.9.6 (bc0240f3c744dd6b6ec2920b3cd08dcc295161ae)
    Maven home: /opt/homebrew/Cellar/maven/3.9.6/libexec
    Java version: 17.0.9, vendor: Homebrew, runtime: /opt/homebrew/Cellar/openjdk@17/17.0.9/libexec/openjdk.jdk/Contents/Home
    Default locale: en_GB, platform encoding: UTF-8
    OS name: "mac os x", version: "14.2.1", arch: "aarch64", family: "mac"
    ```

#### Docker

Alfresco recommends that you keep up-to-date with all the Docker releases. If you're using an older version of Windows or Mac you'll have to use [Docker Toolbox](https://docs.docker.com/toolbox/){:target="_blank"} which has some known issues.

1. Download and install [Docker](https://docs.docker.com/install/){:target="_blank"}.

2. Verify the installation of Docker.

    ```bash
    $ docker -v
    Docker version 25.0.3, build 4debf41
    ```

3. [Docker Compose](https://docs.docker.com/compose/install/){:target="_blank"} is included as part of some Docker installers. If it's not part of your installation, then install it separately after you've installed Docker.

4. Verify the installation of Docker Compose.

    ```bash
    $ docker-compose -v
    Docker Compose version v2.24.6-desktop.1
    ```

### Generate your project from the archetypes

1. After you've successfully configured Java and Maven, you can generate your project.

    ```bash
    mvn archetype:generate -Dfilter=org.alfresco:
    ```

    > **Note:** You need double quotes around the filter if you are using Windows PowerShell: `mvn archetype:generate "-Dfilter=org.alfresco:"`.

    The output:

    ```text
    [INFO] Generating project in Interactive mode
    [INFO] No archetype defined. Using maven-archetype-quickstart (org.apache.maven.archetypes:maven-archetype-quickstart:1.0)
    Choose archetype:
    1: remote -> org.alfresco.maven.archetype:activiti-jar-archetype (DEPRECATED - UNSUPPORTED - EXPERIMENTAL)
    2: remote -> org.alfresco.maven.archetype:alfresco-allinone-archetype (Sample multi-module project for All-in-One development on the Alfresco platform. Includes modules for Platform/Repository JAR and Share JAR)
    3: remote -> org.alfresco.maven.archetype:alfresco-amp-archetype (Sample project with full support for lifecycle and rapid development of Repository AMPs (Alfresco Module Packages))
    4: remote -> org.alfresco.maven.archetype:alfresco-platform-jar-archetype (Sample project with full support for lifecycle and rapid development of Platform/Repository JARs and AMPs (Alfresco Module Packages))
    5: remote -> org.alfresco.maven.archetype:alfresco-share-jar-archetype (Share project with full support for lifecycle and rapid development of JARs and AMPs (Alfresco Module Packages))
    6: remote -> org.alfresco.maven.archetype:share-amp-archetype (Share project with full support for lifecycle and rapid development of AMPs (Alfresco Module Packages))
   ```

2. Select one of the archetypes.

    * `org.alfresco.maven.archetype:alfresco-allinone-archetype`
    * `org.alfresco.maven.archetype:alfresco-amp-archetype`
    * `org.alfresco.maven.archetype:alfresco-platform-jar-archetype`
    * `org.alfresco.maven.archetype:alfresco-share-jar-archetype`
    * `org.alfresco.maven.archetype:share-amp-archetype`

    > **Note:** Archetype `org.alfresco.maven.archetype:activiti-jar-archetype` is deprecated and is not supported.  

    This example uses `org.alfresco.maven.archetype:alfresco-allinone-archetype`. For more on archetypes, see [Alfresco SDK Maven archetypes](#mvnarchetypes).

3. Select the latest version.

    ```bash
    Choose org.alfresco.maven.archetype:alfresco-allinone-archetype version:
    1: 2.0.0-beta-1
    2: 2.0.0-beta-2
    3: 2.0.0-beta-3
    4: 2.0.0-beta-4
    5: 2.0.0
    6: 2.1.0
    7: 2.1.1
    8: 2.2.0
    9: 3.0.0
    10: 3.0.1
    11: 3.1.0
    12: 4.0.0-beta-1
    13: 4.0.0
    14: 4.1.0
    15: 4.2.0
    16: 4.3.0
    17: 4.4.0
    18: 4.5.0
    19: 4.6.0
    20: 4.7.0
    21: 4.8.0
    Choose a number: 21: 21
    ```

    This example uses SDK 4.8, but you should see similar results for other SDK 4.x versions.

4. You are prompted to enter additional information:

    ```bash
    [INFO] Using property: version = 1.0-SNAPSHOT
    Define value for property 'groupId': com.acme
    Define value for property 'artifactId': my-all-in-one
    Define value for property 'package' com.acme: : com.acme
    ```

5. After you have specified the information according to your project, a final confirmation will appear.

    > **Note** The data entered in this example will be different for your installation.

    ```bash
    Confirm properties configuration:
    version: 1.0-SNAPSHOT
    groupId: com.acme
    artifactId: my-all-in-one
    package: com.acme
    Y: : y
    ```

6. Press **Y** and then press **Enter**.

    ```bash
    [INFO] ----------------------------------------------------------------------------
    [INFO] Using following parameters for creating project from Archetype: alfresco-allinone-archetype:4.8.0
    [INFO] ----------------------------------------------------------------------------
    [INFO] Parameter: groupId, Value: com.acme
    [INFO] Parameter: artifactId, Value: my-all-in-one
    [INFO] Parameter: version, Value: 1.0-SNAPSHOT
    [INFO] Parameter: package, Value: com.acme
    [INFO] Parameter: packageInPathFormat, Value: com/acme
    [INFO] Parameter: package, Value: com.acme
    [INFO] Parameter: groupId, Value: com.acme
    [INFO] Parameter: artifactId, Value: my-all-in-one
    [INFO] Parameter: version, Value: 1.0-SNAPSHOT
    [INFO] Parent element not overwritten in /Users/username/sdk/my-all-in-one/my-all-in-one-platform/pom.xml
    [INFO] Parent element not overwritten in /Users/username/sdk/my-all-in-one/my-all-in-one-share/pom.xml
    [INFO] Parent element not overwritten in /Users/username/sdk/my-all-in-one/my-all-in-one-integration-tests/pom.xml
    [INFO] Parent element not overwritten in /Users/username/sdk/my-all-in-one/my-all-in-one-platform-docker/pom.xml
    [INFO] Parent element not overwritten in /Users/username/sdk/my-all-in-one/my-all-in-one-share-docker/pom.xml
    [INFO] Executing META-INF/archetype-post-generate.groovy post-generation script
    [INFO] Project created from Archetype in dir: /Users/username/sdk/my-all-in-one
    [INFO] ------------------------------------------------------------------------
    [INFO] BUILD SUCCESS
    [INFO] ------------------------------------------------------------------------
    [INFO] Total time:  18.512 s
    [INFO] Finished at: 2024-04-10T11:58:59+01:00
    [INFO] ------------------------------------------------------------------------
    ```

7. You have successfully generated your first SDK project.

Inside the project you will find the `run.bat` and `run.sh` scripts. These allow you to quickly compile, test, or run your project.
To run your project, `cd` into your working directory and use:

* `./run.sh build_start` for Mac OS X or Linux
* `run.bat build_start` for Windows.

If this is the first time you are doing this, it will take a while for Maven to download all the required dependencies and for Docker to download all the required images.

For information on how to work with the projects, see [Working with generated projects](#workingwithprojects).

## Alfresco SDK Maven archetypes {#mvnarchetypes}

The Alfresco SDK comes with a number of Maven archetypes that can be used to generate Alfresco extension projects. [Maven archetypes](https://maven.apache.org/guides/introduction/introduction-to-archetypes.html){:target="_blank"} are project template toolkits and are available during the creation of a new SDK project. An archetype is a pattern or model from which all other things of the same kind are made. Using archetypes provides a great way to enable developers to quickly follow best practices in a consistent way. This is valid for every project built with Apache Maven and it's valid in particular when using the Alfresco SDK.

In this section we are going to introduce all the available archetypes in Alfresco SDK, with a brief description of their purpose and main use. After reading this information, you should be able to understand the various possibilities that Alfresco SDK can offer to developers, in terms of projects.

When generating your project, you'll be prompted to select the Maven archetype you want to use through an interactive menu.

```bash
[INFO] Generating project in Interactive mode
[INFO] No archetype defined. Using maven-archetype-quickstart (org.apache.maven.archetypes:maven-archetype-quickstart:1.0)
Choose archetype:
1: remote -> org.alfresco.maven.archetype:activiti-jar-archetype (DEPRECATED - UNSUPPORTED - EXPERIMENTAL)
2: remote -> org.alfresco.maven.archetype:alfresco-allinone-archetype (Sample multi-module project for All-in-One development on the Alfresco platform. Includes modules for Platform/Repository JAR and Share JAR)
3: remote -> org.alfresco.maven.archetype:alfresco-amp-archetype (Sample project with full support for lifecycle and rapid development of Repository AMPs (Alfresco Module Packages))
4: remote -> org.alfresco.maven.archetype:alfresco-platform-jar-archetype (Sample project with full support for lifecycle and rapid development of Platform/Repository JARs and AMPs (Alfresco Module Packages))
5: remote -> org.alfresco.maven.archetype:alfresco-share-jar-archetype (Share project with full support for lifecycle and rapid development of JARs and AMPs (Alfresco Module
        Packages))
6: remote -> org.alfresco.maven.archetype:share-amp-archetype (Share project with full support for lifecycle and rapid development of AMPs (Alfresco Module
        Packages))
Choose a number or apply filter (format: [groupId:]artifactId, case sensitive contains): :
```

### org.alfresco.maven.archetype:activiti-jar-archetype (for use with SDK 2.2 only)

This Maven archetype is related to an older version of the Alfresco SDK and should not be used. For technical reasons this archetype can't be hidden and is still listed.

### org.alfresco.maven.archetype:alfresco-allinone-archetype

This archetype allows a developer to implement the All-In-One project on Content Services. The All-In-One project, also called AIO, is provided in this and previous versions of Alfresco SDK. It has been reshaped in SDK 4 to leverage Docker.

The All-In-One archetype allows a developer to create a multi-module project on Content Services. The All-In-One project includes a module for the core repository in Content Services and a module for the Share client. This includes:

* Content Services Repository JAR.
* Alfresco Share JAR.
* Content Services Repository Docker image configuration.
* Alfresco Share Docker image configuration.
* Integration tests.
* Docker container configuration and orchestration via Docker Compose for Content Services, Alfresco Share, Alfresco Search Services, and PostgreSQL.
* (Optional) AMP deployment configuration. JAR is the recommended artifact type and is the default.

The project created using the All-In-One Maven archetype, by default, includes sample code to show you how to develop with the Content Services Repository and the Alfresco Share client. The samples are simple and are only intended to help your initial steps with your Alfresco development.

The All-In-One project is recommended to be used if you have to develop a customization of the Content Services Repository together with customizations for the Alfresco Share client. If you intend to develop a project on the Content Services Repository only, use the `org.alfresco.maven.archetype:alfresco-platform-jar-archetype` archetype. If you plan to develop a project on the Alfresco Share client only, use the `org.alfresco.maven.archetype:alfresco-share-jar-archetype` archetype.

For more information about the All-In-One project, see [All-In-One (AIO) project structure](#structureaio).

### org.alfresco.maven.archetype:alfresco-amp-archetype (for use with SDK 2.2 only)

This Maven archetype is related to an older version of the Alfresco SDK and should not be used. For technical reasons this archetype can't be hidden and is still listed.

### org.alfresco.maven.archetype:alfresco-platform-jar-archetype

This archetype allows a developer to implement the Platform JAR project on Content Services. It has been reshaped in SDK 4 to leverage Docker.

The Platform JAR Maven archetype allows a developer to create a module on Content Services, in particular on the Repository side, and includes:

* Content Services Repository JAR.
* Content Services Repository Docker image configuration.
* Docker container configuration and orchestration via Docker Compose for Content Services, Share (optional), Alfresco Search Services, and PostgreSQL.
* (Optional) AMP deployment configuration. JAR is the recommended artifact type and is the default.

The project created using the Platform JAR Maven archetype includes some sample code (by default) to show you how to develop with the Alfresco Content Services Repository. The samples included in the project are basic and straightforward, and can help you to take the first steps into Alfresco development.

The Platform JAR project is recommended to be used if you have to develop a customization of the Content Services Repository. If you also plan to develop a customization of the Alfresco Share client, use the All-In-One Maven archetype instead.

For more information about the Platform JAR project, see [Platform JAR project structure](#structureplatform).

### org.alfresco.maven.archetype:alfresco-share-jar-archetype

This archetype allows a developer to implement the Share JAR project on an Alfresco Share client. It has been reshaped in SDK 4 to leverage Docker.

The Share JAR Maven archetype allows a developer to create a module on an Alfresco Share client, and includes:

* Alfresco Share JAR.
* Alfresco Share Docker image configuration.
* Docker container configuration and orchestration via Docker Compose for Content Services, Share (optional), Alfresco Search Services, and PostgreSQL.
* (Optional) AMP deployment configuration. JAR is the recommended artifact type and is the default.

The project created using the Share JAR Maven archetype includes some sample code (by default) to show you how to develop with the Alfresco Share client. The samples included in the project are basic and straightforward, and can help you to take the first steps into Alfresco development.

The Share JAR project is recommended to be used if you have to develop a customization of the Alfresco Share client. If you also plan to develop a customization of the Content Services Repository, use the All-In-One Maven archetype instead.

For more information about the Share JAR project, see [Share JAR project structure](#structureshare).

### org.alfresco.maven.archetype:share-amp-archetype (for use with SDK 2.2 only)

This Maven archetype is related to an older version of the Alfresco SDK and should not be used. For technical reasons this archetype can't be hidden and is still listed.

## Working with generated projects {#workingwithprojects}

After generating a project using one of the Alfresco SDK Maven archetypes, it is important to know how to build, run, and test these projects.

The Alfresco Platform 7.0 and above architecture is based on container technologies. The projects generated using the Alfresco SDK archetypes, set up their local environment using Docker and Docker Compose.

If you're not familiar with these technologies, its highly recommended you visit the [Docker documentation website](https://docs.docker.com){:target="_blank"}. This site offers a great quantity of training resources about [Docker](https://docs.docker.com/get-started/){:target="_blank"} and [Docker Compose](https://docs.docker.com/compose/gettingstarted/){:target="_blank"}.

Before continuing, make sure that you have read and completed the tasks in the [Getting started with Alfresco SDK](#gettingstarted) section.

* [Working with an All-In-One (AIO) project](#workingaio)
* [Working with Platform JAR project structure](#workingplatform)
* [Working with Share JAR project structure](#workingshare)

After generating your project, using one of the Maven archetypes, review the project structure. The directory structure and content of each folder and file can help you to understand how to start developing with the Alfresco SDK.

The structure of the project and the purpose of the files it contains vary according to the [Maven archetype](#mvnarchetypes) used to generate the project itself. The following links provide detailed descriptions of the different project types.

* [All-In-One (AIO) project structure](#structureaio)
* [Platform JAR project structure](#structureplatform)
* [Share JAR project structure](#structureshare)

### Run script {#workingwithrunscript}

All the projects generated using the Alfresco SDK archetypes provide a utility script to work with the project. This script is `run.sh` for Unix systems
and `run.bat` for Windows systems.

The execution of this script must be followed by a parameter that dictates the task to be executed in the project. The list of available tasks is:

| Task | Description |
| ---- | ----------- |
|`build_start` | Build the whole project, recreate the Content Services and Share docker images, start the dockerized environment composed by Content Services, Share, ASS and PostgreSQL and tail the logs of all the containers.|
|`build_start_it_supported` | Build the whole project including dependencies required for IT execution, recreate the Content Services and Share docker images, start the dockerized environment composed by Content Services, Share, ASS and PostgreSQL and tail the logs of all the containers.|
|`start` | Start the dockerized environment without building the project and tail the logs of all the containers.|
|`stop` | Stop the dockerized environment.|
|`purge` | Stop the dockerized environment and delete all the persistent data (docker volumes).|
|`tail` | Tail the logs of all the containers.|
|`reload_share` | Build the Share module, recreate the Share docker image and restart the Share container (not available in the Alfresco Platform JAR archetype).|
|`reload_acs` | Build the Content Services module, recreate the Content Services docker image and restart the Content Services container (only available in the All-In-One archetype).|
|`build_test` | Build the whole project, recreate the Content Services and Share docker images, start the dockerized environment, execute the integration tests from the `integration-tests` module and stop the environment.|
|`test` | Execute the integration tests (the environment must be already started).|

This utility script uses `mvn`, `docker` and `docker-compose` commands, so make sure you have properly installed Maven, Docker and Docker Compose and you have configured them properly to be accessible in the path.

In the case of Maven, it is not necessary that the `mvn` executable is in the path if you've properly configured the environment variable `M2_HOME`. The script looks for the `M2_HOME` environment variable to build the path to the `mvn` executable.

### Working with an All-In-One (AIO) project {#workingaio}

Before you continue make sure that you have read and completed the tasks in the [Getting started](#gettingstarted) tutorial to generate an All-In-One (AIO) project, which means selecting the `org.alfresco.maven.archetype:alfresco-allinone-archetype`Maven archetype when generating the project.

> **Note:** The following information assumes that the AIO project was generated with the name `my-all-in-one-project`.

An AIO SDK project is used to build extensions for both [Content Services (Content Services) Repository]({% link content-services/latest/develop/repo-ext-points/index.md %}) and [Alfresco Share UI]({% link content-services/latest/develop/share-ext-points/index.md %}). The runtime environment for Content Services is Docker so not only is this project building the source code for your extensions but also the custom Docker images for the Alfresco Repository and Alfresco Share. The custom Docker images includes the JARs, or AMPs, with your extension code.

Looking into the generated AIO parent project we have:

* A Docker Compose file (`my-all-in-one-project/docker/docker-compose.yml`) that can be used to build custom Docker images and run the project.
* One sub-project `my-all-in-one-project-platform` that can be used to build Repository customizations.
* One sub-project `my-all-in-one-project-share` that can be used to build Alfresco Share UI customizations.

There are also the `my-all-in-one-project-platform-docker` and `my-all-in-one-project-share-docker` projects that are used to assemble (aggregate) all the Repository and Share extensions (there's usually more than one of each in a bigger project) and then build the custom Docker images with the extension(s) applied.

The Repository and Share extensions that are aggregated can either be extensions that you develop locally or extensions that are available in a Maven repository somewhere.

#### Configuration properties

There are a number of properties that we can customize when we run the Alfresco SDK project. These configuration properties are defined in the `my-all-in-one-project/pom.xml` project file.

The following table explains some of these properties:

| Name | Type | Default value | Description |
| ---- | ---- | ------------- | ----------- |
| alfresco.platform.version | `string` | 23.2.1 | The version of the Content Services Repository (i.e. `alfresco.war`) that the Repository Extension should be applied to.<br><br>This also specifies the version of the Content Services Repository Docker image that the custom built Repository image should be based on. See `my-all-in-one-project-platform-docker/src/main/docker/Dockerfile` |
| alfresco.share.version | `string` | 23.2.0.72 | The version of Alfresco Share (i.e. `share.war`) that the Share Extension should be applied to.<br><br>This also specifies the version of the Alfresco Share Docker image that the custom built Share image should be based on. See `my-all-in-one-project-share-docker/src/main/docker/Dockerfile`|
| docker.acs.image | `string` | alfresco/alfresco-content-repository-community | The name of the Content Services Repository Docker image in Docker Hub. This changes if you switch to Enterprise Edition.|
| docker.share.image | `string` | alfresco/alfresco-share | The name of the Alfresco Share Docker image in Docker Hub. This changes if you switch to Enterprise Edition.|
| share.port | `number` | 8180 | The external port (i.e. outside container) for the Alfresco Share webapp.|
| share.debug.port | `number` | 9898 | The external port (i.e. outside container) for Alfresco Share remote debugging.|
| acs.host | `string` | my-all-in-one-project-acs | This is the name (host) that the Content Services Repository is available at. This maps to the service name for the Content Services Repository in the Docker Compose file `my-all-in-one-project/docker/docker-compose.yml`. The name is only useful for communication between containers on the default Docker network that is created. |
| acs.port | `number` | 8080 | The external port (i.e. outside container) for the Content Services Repository.|
| acs.debug.port | `number` | 8888 | The external port (i.e. outside container) for Content Services Repository remote debugging.|
| postgres.port | `number` | 5555 | The external port (i.e. outside container) for PostgreSQL database.|

When you first start out you don't need to change any of these properties - just use the defaults and try it out.

#### Building and running the AIO project

The first thing you need to do before you can run anything is to build the custom Content Services Docker images with the custom extensions. We can build images and extensions at the same time as we start (run) the project by using the `./run.sh build_start` script (on Windows use the `run.bat build_start` script instead).

Note that if you have another Alfresco SDK project running, then you need to stop it first. Also, make sure that the following ports are free:

* `8180` (Share)
* `8080` (Alfresco Repo)
* `9898` (Share Debug)
* `8888` (Alfresco Repo Debug)
* `5555` (Postgres)

If you want to change the ports see the properties section of `my-all-in-one-project/pom.xml`. This project file also contains the versions of Alfresco Repository and Alfresco Share.  

```bash
% cd my-all-in-one-project
my-all-in-one-project username % ./run.sh build_start

[INFO] Scanning for projects...
[WARNING] The project com.example:my-all-in-one-project:pom:1.0-SNAPSHOT uses prerequisites which is only intended for maven-plugin projects but not for non maven-plugin projects. For such purposes you should use the maven-enforcer-plugin. See https://maven.apache.org/enforcer/enforcer-rules/requireMavenVersion.html
[INFO] ------------------------------------------------------------------------
[INFO] Reactor Build Order:
[INFO] 
[INFO] AIO - SDK 4.8
[INFO] Alfresco Platform/Repository JAR Module
[INFO] Alfresco Share JAR Module
[INFO] Integration Tests Module
[INFO] Alfresco Platform/Repository Docker Module
[INFO] Alfresco Share Docker Module
...
[INFO] ------------------------------------------------------------------------
[INFO] Reactor Summary for AIO - SDK 4.8 1.0-SNAPSHOT:
[INFO] 
[INFO] AIO - SDK 4.8 ...................................... SUCCESS [01:27 min]
[INFO] Alfresco Platform/Repository JAR Module ............ SUCCESS [17:41 min]
[INFO] Alfresco Share JAR Module .......................... SUCCESS [02:04 min]
[INFO] Integration Tests Module ........................... SUCCESS [  0.431 s]
[INFO] Alfresco Platform/Repository Docker Module ......... SUCCESS [02:01 min]
[INFO] Alfresco Share Docker Module ....................... SUCCESS [  0.077 s]
[INFO] ------------------------------------------------------------------------
[INFO] BUILD SUCCESS
[INFO] ------------------------------------------------------------------------
...
my-all-in-one-project-acs-volume
my-all-in-one-project-db-volume
my-all-in-one-project-ass-volume
...
[+] Building 56.9s (25/25) FINISHED                                                       ... docker:desktop-linux
...
 => [my-all-in-one-project-share 1/7] FROM docker.io/alfresco/alfresco-share:23.2.1@sha256:472a2977c71ca2afd297ba1b90c010f1fcf29e3bc72a869f40bb72a43c7ec10c ...
 ...
 => [my-all-in-one-project-acs 1/8] FROM docker.io/alfresco/alfresco-content-repository-community:23.2.1@sha256:566dc4343bc82c0fa7799a18d71c9a0b54f737427789a6bdd47559aa17b975f7 ...
...
my-all-in-one-project-acs-1       | 11-Apr-2024 17:09:22.877 INFO [main] org.apache.catalina.startup.HostConfig.deployDirectory Deployment of web application directory [/usr/local/tomcat/webapps/_vti_bin] has finished in [116] ms
my-all-in-one-project-acs-1       | 11-Apr-2024 17:09:22.883 INFO [main] org.apache.coyote.AbstractProtocol.start Starting ProtocolHandler ["http-nio-8080"]
my-all-in-one-project-acs-1       | 11-Apr-2024 17:09:22.919 INFO [main] org.apache.catalina.startup.Catalina.start Server startup in [39015] milliseconds
```

The `./run.sh build_start` script performs the following tasks:

* Stop anything running already with this project's Docker Compose file: `my-all-in-one-project/docker/docker-compose.yml`.
* Build the Repository and Share Extension JARs so we are sure to get the latest changes.
* Assemble/Aggregate all Repository extension JARs into the `my-all-in-one-project/my-all-in-one-project-platform-docker/target/extensions` directory.
* Assemble/Aggregate all Share extension JARs into the `my-all-in-one-project/my-all-in-one-project-share-docker/target/extensions` directory.
* Create Docker Volumes for Repository (`alf_data`), Search index, and Database so data is persisted outside the containers.
* Run the project via the Docker Compose file and instruct Docker Compose to build the custom Docker images first.
* Tail the logs of all containers.

It also builds the following Docker images:

```bash
% docker image ls|more
REPOSITORY                                              TAG                        IMAGE ID       CREATED         SIZE
alfresco-content-services-my-all-in-one-project         development                ab3db191285f   3 hours ago     1.03GB
alfresco-share-my-all-in-one-project                    development                eb6e429d86ba   3 hours ago     717MB
```

The different web applications should now be accessible (login with `admin/admin`):

* **Content Services Repository**: <http://localhost:8080/alfresco>
* **Content Services Share**: <http://localhost:8180/share/>

#### Trying out the sample code

The AIO project has some sample extension code that you can try out. There is one Repository extension and one Share extension that you can test to make sure the extension JARs have been applied properly.

The Repository extension is a Web Script that you can call with the following URL:

```http
http://localhost:8080/alfresco/service/sample/helloworld
```

The source code for the Web Script is located in the `my-all-in-one-project/my-all-in-one-project-platform/` folder:

* `src/main/resources/alfresco/extension/templates/webscripts/alfresco/tutorials`
* `src/main/java/ com/example/platformsample/HelloWorldWebScript.java`

The Share extension is a custom Aikau page with a custom widget that you can reach with the following URL:

```http
http://localhost:8180/share/page/hdp/ws/simple-page
```

The source code for the Page and Widget is located in the `my-all-in-one-project/my-all-in-one-project-share/` folder:

* `src/main/resources/alfresco/web-extension/site-webscripts/com/example/pages`
* `src/main/resources/META-INF/resources/my-all-in-one-project-share/js/tutorials/widgets`

#### Looking inside the containers

Sometimes it's useful to look at what's been deployed in the containers. For example, you may wonder how to access the Repository container and list the custom Repository extension JARs that have been deployed.

You can do that as follows:

First **Ctrl-C** out of the log tailing:

```bash
my-all-in-one-project-acs-1       | 11-Apr-2024 20:20:50.095 INFO [main] org.apache.coyote.AbstractProtocol.start Starting ProtocolHandler ["http-nio-8080"]
my-all-in-one-project-acs-1       | 11-Apr-2024 20:20:50.140 INFO [main] org.apache.catalina.startup.Catalina.start Server startup in [29624] milliseconds
my-all-in-one-project-acs-1       | 2024-04-11T20:20:51,016 [] INFO  [management.subsystems.ChildApplicationContextFactory] [http-nio-8080-exec-1] Starting 'Search' subsystem, ID: [Search, managed, solr6]
my-all-in-one-project-acs-1       | 2024-04-11T20:20:51,134 [] INFO  [management.subsystems.ChildApplicationContextFactory] [http-nio-8080-exec-1] Startup of 'Search' subsystem, ID: [Search, managed, solr6] complete
^Ccanceled
```

Then check the name of the Content Services Repository container:

```bash
% docker container ls
CONTAINER ID   IMAGE                                                         COMMAND                  CREATED          STATUS          PORTS                                                                                                NAMES
c705daffb5ee   alfresco-content-services-my-all-in-one-project:development   "catalina.sh run -se…"   15 minutes ago   Up 15 minutes   0.0.0.0:8080->8080/tcp, 8000/tcp, 10001/tcp, 0.0.0.0:8888->8888/tcp                                  docker-my-all-in-one-project-acs-1
5f41b646301f   alfresco/alfresco-activemq:5.16.1                             "/bin/sh -c './init.…"   15 minutes ago   Up 15 minutes   0.0.0.0:5672->5672/tcp, 0.0.0.0:8161->8161/tcp, 0.0.0.0:61613->61613/tcp, 0.0.0.0:61616->61616/tcp   docker-my-all-in-one-project-activemq-1
1173e7cfe77e   alfresco-share-my-all-in-one-project:development              "/usr/local/tomcat/s…"   15 minutes ago   Up 15 minutes   8000/tcp, 0.0.0.0:8180->8080/tcp, 0.0.0.0:9898->8888/tcp                                             docker-my-all-in-one-project-share-1
02778d042822   postgres:9.6                                                  "docker-entrypoint.s…"   15 minutes ago   Up 15 minutes   0.0.0.0:5555->5432/tcp                                                                               docker-my-all-in-one-project-postgres-1
5db21219a5ce   alfresco/alfresco-search-services:2.0.3                       "/bin/sh -c '$DIST_D…"   15 minutes ago   Up 15 minutes   0.0.0.0:8983->8983/tcp, 10001/tcp                                                                    docker-my-all-in-one-project-ass-1
```

Then open up a shell into the Content Services Repository container:

```bash
username sdk % docker exec -it docker-my-all-in-one-project-acs-1 /bin/bash
[alfresco@c705daffb5ee tomcat]$ pwd
/usr/local/tomcat
[alfresco@c705daffb5ee tomcat]$ ls -l webapps/alfresco/WEB-INF/lib | grep "my-all"
-rw-r--r-- 1 root root        17614 Apr 11 20:20 my-all-in-one-project-platform-1.0-SNAPSHOT.jar
[alfresco@c705daffb5ee tomcat]$ exit
exit
```

#### Updating extension code

So now you probably want to write some new code, or update the existing code, and see how that works with the containers running. Let's just update the code and restart.

For example, let's update the Repository Web Script to return a different message.

1. Open the file in the `my-all-in-one-project/my-all-in-one-project-platform/` folder:

    ```text
    src/main/resources/alfresco/extension/templates/webscripts/alfresco/tutorials/helloworld.get.html.ftl
    ```

2. Change the content as follows:

    ```text
    Message: '${fromJS}' '${fromJava}' UPDATED!
    ```

To get this code update deployed, run the following command in another console then where we are tailing the logs,
and stand in the directory where the `run.sh` script is located:

```bash
my-all-in-one-project username % ./run.sh reload_acs
```

What this does is the following:

* Kill the `my-all-in-one-project-acs` container.
* Remove the killed (stopped) `my-all-in-one-project-acs` container, so a new Docker image can be created with a `development` tag.
* Build the Repository extension JAR: `my-all-in-one-project/my-all-in-one-project-platform`.
* Copy the newly built Repository extension JAR over to the `my-all-in-one-project/my-all-in-one-project-platform-docker/target/extensions` where it's picked up when the new Docker image is built.
* Build a new `alfresco-content-services-my-all-in-one-project:development` image.
* Start up the `my-all-in-one-project-acs` container based on new image.

You're left with the console tailing the logs, but you can **Ctrl-C** out of this as you are already tailing the logs
in the initial console where we started things up.

You can check if the change took effect by accessing the `http://localhost:8080/alfresco/service/sample/helloworld` Web Script.

#### Stopping the project

To stop the solution you need to first `Ctrl-C` out of the log tailing. This does not stop the containers as they run in daemon mode in the background. Check this by executing the following command that lists running containers:

```bash
% docker container ls                                     
CONTAINER ID   IMAGE                                                         COMMAND                  CREATED          STATUS          PORTS                                                                                                NAMES
4b81a5763df1   alfresco-content-services-my-all-in-one-project:development   "catalina.sh run -se…"   50 seconds ago   Up 49 seconds   0.0.0.0:8080->8080/tcp, 8000/tcp, 10001/tcp, 0.0.0.0:8888->8888/tcp                                  docker-my-all-in-one-project-acs-1
ff9724a263ca   alfresco-share-my-all-in-one-project:development              "/usr/local/tomcat/s…"   50 seconds ago   Up 49 seconds   8000/tcp, 0.0.0.0:8180->8080/tcp, 0.0.0.0:9898->8888/tcp                                             docker-my-all-in-one-project-share-1
54e643ee81eb   alfresco/alfresco-search-services:2.0.3                       "/bin/sh -c '$DIST_D…"   50 seconds ago   Up 49 seconds   0.0.0.0:8983->8983/tcp, 10001/tcp                                                                    docker-my-all-in-one-project-ass-1
4606301df7ff   alfresco/alfresco-activemq:5.16.1                             "/bin/sh -c './init.…"   50 seconds ago   Up 49 seconds   0.0.0.0:5672->5672/tcp, 0.0.0.0:8161->8161/tcp, 0.0.0.0:61613->61613/tcp, 0.0.0.0:61616->61616/tcp   docker-my-all-in-one-project-activemq-1
f944866169a7   postgres:9.6                                                  "docker-entrypoint.s…"   50 seconds ago   Up 49 seconds   0.0.0.0:5555->5432/tcp                                                                               docker-my-all-in-one-project-postgres-1
```

Now, standing in the directory where the `run.sh` script is located execute the following command to stop and remove the containers:

```bash
% ./run.sh stop
[+] Running 6/6
 ✔ Container docker-my-all-in-one-project-acs-1       Removed    ... 2.8s 
 ✔ Container docker-my-all-in-one-project-activemq-1  Removed    ... 10.2s 
 ✔ Container docker-my-all-in-one-project-share-1     Removed    ... 10.3s 
 ✔ Container docker-my-all-in-one-project-ass-1       Removed    ... 10.2s 
 ✔ Container docker-my-all-in-one-project-postgres-1  Removed    ... 0.1s 
 ✔ Network docker_default                             Removed    ... 0.1s 
```

### Working with Platform JAR project structure {#workingplatform}

Before you continue make sure that you have read and completed the tasks in the [Getting started](#gettingstarted) tutorial to generate a Platform project, which means selecting the `org.alfresco.maven.archetype:alfresco-platform-jar-archetype` Maven archetype when generating the project.

> **Note:** The following information assumes that the Platform project was generated with the name `my-platform-project`.

A Platform project is used to build extensions for the [Content Services (Content Services) Repository]({% link content-services/latest/develop/repo-ext-points/index.md %}). The runtime environment for Content Services is Docker so not only is this project building the source code for your extensions but also the custom Docker image for the Alfresco Repository. The custom Docker images includes the JARs, or AMPs, with your extension code.

Looking into the generated Platform project we have:

* A Docker Compose file (`my-platform-project/docker/docker-compose.yml`) that will be used to build custom Docker images and run the project.
* A directory for our extension source code: `my-platform-project/src/main/java`.
* A directory with the Docker related files, such as the `Dockerfile` used to build the custom Content Services Repository Docker image: `my-platform-project/src/main/docker`.

#### Configuration properties (platform)

There are a number of properties that we can customize when we run the Alfresco SDK project. These configuration properties are defined in the `my-platform-project/pom.xml` project file.

The following table explains some of these properties:

| Name | Type | Default value | Description |
| ---- | ---- | ------------- | ----------- |
| alfresco.platform.version | `string` | 23.2.1 | The version of the Content Services Repository (i.e. `alfresco.war`) that the Repository Extension should be applied to.<br><br>This also specifies the version of the Content Services Repository Docker image that the custom built Repository image should be based on. See `my-platform-project-platform-docker/src/main/docker/Dockerfile`. |
| alfresco.share.version | `string` | 23.2.0.72 | The version of Alfresco Share (i.e. `share.war`) that the Share Extension should be applied to.<br><br>This also specifies the version of the Alfresco Share Docker image that the custom built Share image should be based on. See `my-platform-project-share-docker/src/main/docker/Dockerfile`. |
| docker.acs.image | `string` | alfresco/alfresco-content-repository-community | The name of the Content Services Repository Docker image in Docker Hub. This changes if you switch to Enterprise Edition.|
| docker.share.image | `string` | alfresco/alfresco-share | The name of the Alfresco Share Docker image in Docker Hub. This changes if you switch to Enterprise Edition.|
| share.port | `number` | 8180 | The external port (i.e. outside container) for the Alfresco Share webapp.|
| share.debug.port | `number` | 9898 | The external port (i.e. outside container) for Alfresco Share remote debugging.|
| acs.host | `string` | my-platform-project-acs | This is the name (host) that the Content Services Repository is available at. This maps to the service name for the Content Services Repository in the Docker Compose file `my-platform-project/docker/docker-compose.yml`. The name is only useful for communication between containers on the default Docker network that is created. |
| acs.port | `number` | 8080 | The external port (i.e. outside container) for the Content Services Repository.|
| acs.debug.port | `number` | 8888 | The external port (i.e. outside container) for Content Services Repository remote debugging.|
| postgres.port | `number` | 5555 | The external port (i.e. outside container) for PostgreSQL database.|

There are some Alfresco Share related properties listed here, but they are not used unless you uncomment some code in the Docker Compose file (`my-platform-project/docker/docker-compose.yml`) to run the Alfresco Share container.

When you first start out you don't need to change any of these properties - just use the defaults and try it out.

#### Building and running the Platform project

The first thing you need to do before you can run anything is to build the custom Content Services Repository Docker image with the custom extensions. We can build the image and extensions at the same time as we start (run) the project by using the `./run.sh build_start` script (on Windows use the `run.bat build_start` script instead).

Note that if you have another Alfresco SDK project running, then you need to stop it first. Also, make sure that the following ports are free: `8180` (Share - if enabled in Docker Compose), `8080` (Alfresco Repo), `9898` (Share Debug - if enabled in Docker Compose), `8888` (Alfresco Repo Debug), `5555` (Postgres). If you want to change the ports see the properties section of `my-platform-project/pom.xml`. This project file also contains the versions of Alfresco Repository and Alfresco Share (if enabled) that will be used.  

```bash
% cd my-platform-project/
username my-platform-project % ./run.sh build_start
[INFO] Scanning for projects...
[INFO] 
[INFO] --------------------< com.acme:my-platform-project >--------------------
[INFO] Building my-platform-project Platform/Repository JAR Module 1.0-SNAPSHOT
[INFO]   from pom.xml
[INFO] --------------------------------[ jar ]---------------------------------
...
[INFO] ------------------------------------------------------------------------
[INFO] BUILD SUCCESS
[INFO] ------------------------------------------------------------------------
[INFO] Total time:  9.130 s
[INFO] Finished at: 2024-04-12T18:46:34+01:00
[INFO] ------------------------------------------------------------------------
my-platform-project-acs-volume
my-platform-project-db-volume
my-platform-project-ass-volume
...
[+] Building 2.0s (13/13) FINISHED                                                        ... docker:desktop-linux
...
 => CACHED [my-platform-project-acs 1/8] FROM docker.io/alfresco/alfresco-content-repository-community:23.2.1@sha256:566dc4343bc82c0fa7799a18d71c9a0b54f737427789a6bdd47559aa17b975f7 ...
 ...
[+] Running 7/7
 ✔ Network docker_default                          ... Created                                     ... 0.0s 
 ✔ Container docker-my-platform-project-postgres-1 ... Started                                     ... 0.1s 
 ✔ Container docker-my-platform-project-ass-1      ... Started                                     ... 0.1s 
 ✔ Container docker-my-platform-project-activemq-1 ... Started                                     ... 0.1s 
 ...
 ✔ Container docker-my-platform-project-acs-1      ... Started                                     ... 0.0s 
 ...
my-platform-project-acs-1       | 12-Apr-2024 17:47:10.681 INFO [main] org.apache.catalina.startup.HostConfig.deployDirectory Deployment of web application directory [/usr/local/tomcat/webapps/_vti_bin] has finished in [65] ms
my-platform-project-acs-1       | 12-Apr-2024 17:47:10.684 INFO [main] org.apache.coyote.AbstractProtocol.start Starting ProtocolHandler ["http-nio-8080"]
my-platform-project-acs-1       | 12-Apr-2024 17:47:10.698 INFO [main] org.apache.catalina.startup.Catalina.start Server startup in [30794] milliseconds
```

The `./run.sh build_start` script performs the following tasks:

* Stop anything running already with this project's Docker Compose file: `my-platform-project/docker/docker-compose.yml`.
* Build the Repository Extension JARs so we are sure to get the latest changes.
* Assemble/Aggregate all Repository extension JARs into the `my-platform-project/target/extensions` directory.
* Create Docker Volumes for Repository (`alf_data`), Search index, and Database so data is persisted outside the containers.
* Run the project via the Docker Compose file and instruct Docker Compose to build the custom Docker images first.
* Tail the logs of all containers.

It also builds the following Docker image:

```bash
% docker image ls|more
REPOSITORY                                              TAG                        IMAGE ID       CREATED         SIZE
alfresco-content-services-my-platform-project           development                82b6f0ab2131   5 hours ago     1.03GB
```

The different web applications should now be accessible (login with `admin/admin`):

* **Content Services Repository**: <http://localhost:8080/alfresco>
* (Optional) **Content Services Share**: <http://localhost:8180/share/> (if enabled in Docker Compose file)

#### Trying out the sample code (platform)

The Platform project has some sample extension code that you can try out.

The Repository extension is a Web Script that can be called with the following URL:

```http
http://localhost:8080/alfresco/service/sample/helloworld
```

The source code for the Web Script is located in the `my-platform-project/` folder:

* `src/main/resources/alfresco/extension/templates/webscripts/alfresco/tutorials`
* `src/main/java/ com/example/platformsample/HelloWorldWebScript.java`

#### Looking inside the containers (platform)

Sometimes it's useful to look at what's been deployed in the containers. For example, you may wonder how to access the Repository container and list the custom Repository extension JARs that have been deployed.

You can do that as follows:

First **Ctrl-C** out of the log tailing:

```text
my-platform-project-acs-1       | 12-Apr-2024 18:35:55.422 INFO [main] org.apache.coyote.AbstractProtocol.start Starting ProtocolHandler ["http-nio-8080"]
my-platform-project-acs-1       | 12-Apr-2024 18:35:55.439 INFO [main] org.apache.catalina.startup.Catalina.start Server startup in [21690] milliseconds
...
my-platform-project-acs-1       | 2024-04-12T18:35:59,479 [] INFO  [management.subsystems.ChildApplicationContextFactory] [http-nio-8080-exec-2] Starting 'Search' subsystem, ID: [Search, managed, solr6]
my-platform-project-acs-1       | 2024-04-12T18:35:59,573 [] INFO  [management.subsystems.ChildApplicationContextFactory] [http-nio-8080-exec-2] Startup of 'Search' subsystem, ID: [Search, managed, solr6] complete
^Ccanceled
```

Then check the name of the Content Services Repository container:

```bash
% docker container ls
CONTAINER ID   IMAGE                                                       COMMAND                  CREATED        STATUS       PORTS                                                                                                NAMES
75c3fe550624   alfresco-content-services-my-platform-project:development   "catalina.sh run -se…"   5 hours ago    Up 5 hours   0.0.0.0:8080->8080/tcp, 8000/tcp, 10001/tcp, 0.0.0.0:8888->8888/tcp                                  docker-my-platform-project-acs-1
126b2384cf66   postgres:9.6                                                "docker-entrypoint.s…"   5 hours ago    Up 5 hours   0.0.0.0:5555->5432/tcp                                                                               docker-my-platform-project-postgres-1
bbe9adb43c0f   alfresco/alfresco-activemq:5.16.1                           "/bin/sh -c './init.…"   5 hours ago    Up 5 hours   0.0.0.0:5672->5672/tcp, 0.0.0.0:8161->8161/tcp, 0.0.0.0:61613->61613/tcp, 0.0.0.0:61616->61616/tcp   docker-my-platform-project-activemq-1
5dac786d5121   alfresco/alfresco-search-services:2.0.3                     "/bin/sh -c '$DIST_D…"   5 hours ago    Up 5 hours   0.0.0.0:8983->8983/tcp, 10001/tcp                                                                    docker-my-platform-project-ass-1
```

Then open up a shell into the Content Services Repository container:

```bash
username my-platform-project % docker exec -it docker-my-platform-project-acs-1 /bin/bash
[alfresco@75c3fe550624 tomcat]$ 
[alfresco@75c3fe550624 tomcat]$ pwd
/usr/local/tomcat
[alfresco@75c3fe550624 tomcat]$ ls -l webapps/alfresco/WEB-INF/lib | grep "my-plat"
-rw-r--r-- 1 root root        22099 Apr 12 17:46 my-platform-project-1.0-SNAPSHOT.jar
[alfresco@75c3fe550624 tomcat]$ exit
exit
```

#### Updating extension code (platform)

So now you probably want to write some new code, or update the existing code, and see how that works with the containers running. Let's just update the code and restart.

For example, let's update the Repository Web Script to return a different message.

1. Open the file in the `my-platform-project` folder:

    ```text
    src/main/resources/alfresco/extension/templates/webscripts/alfresco/tutorials/helloworld.get.html.ftl
    ```

2. Change the content as follows:

    ```text
    Message: '${fromJS}' '${fromJava}' UPDATED!
    ```

To get this code update deployed we have to run the following commands:

First `Ctrl-C` out of the log tailing.

Then stop the project:

```bash
username my-platform-project % ./run.sh stop
WARN[0000] /Users/username/sdk/my-platform-project/target/classes/docker/docker-compose.yml: `version` is obsolete 
[+] Running 5/4
 ✔ Container docker-my-platform-project-acs-1      ... Removed                                     ... 2.1s 
 ✔ Container docker-my-platform-project-ass-1      ... Removed                                     ... 10.2s 
 ✔ Container docker-my-platform-project-activemq-1 ... Removed                                     ... 10.2s 
 ✔ Container docker-my-platform-project-postgres-1 ... Removed                                     ... 0.1s 
 ✔ Network docker_default                          ... Removed
```

Now build and start again:

```bash
username my-platform-project % ./run.sh build_start
```

What this does is the following:

* Kill the `my-platform-project-acs` container.
* Removed the killed (stopped) `my-platform-project-acs` container, so a new Docker image can be created with `development` tag.
* Build the Repository extension JAR.
* Copy the newly built Repository extension JAR over to the `my-platform-project/target/extensions` where it will be picked up when the new Docker image is built.
* Build a new `alfresco-content-services-my-platform-project:development` image.
* Start up the `my-platform-project-acs` container based on new image.

You can check if the change took effect by accessing the `http://localhost:8080/alfresco/service/sample/helloworld` Web Script.

#### Stopping the project (platform)

To stop the solution you need to first `Ctrl-C` out of the log tailing. This does not stop the containers as they run in daemon mode in the background. Check this by executing the following command that lists running containers:

```bash
username my-platform-project % docker container ls
CONTAINER ID   IMAGE                                                       COMMAND                  CREATED         STATUS         PORTS                                                                                                NAMES
6fa4599fcb56   alfresco-content-services-my-platform-project:development   "catalina.sh run -se…"   6 minutes ago   Up 6 minutes   0.0.0.0:8080->8080/tcp, 8000/tcp, 10001/tcp, 0.0.0.0:8888->8888/tcp                                  docker-my-platform-project-acs-1
23e1ffff3441   postgres:9.6                                                "docker-entrypoint.s…"   6 minutes ago   Up 6 minutes   0.0.0.0:5555->5432/tcp                                                                               docker-my-platform-project-postgres-1
0f852a410905   alfresco/alfresco-search-services:2.0.3                     "/bin/sh -c '$DIST_D…"   6 minutes ago   Up 6 minutes   0.0.0.0:8983->8983/tcp, 10001/tcp                                                                    docker-my-platform-project-ass-1
e71756e68aef   alfresco/alfresco-activemq:5.16.1                           "/bin/sh -c './init.…"   6 minutes ago   Up 6 minutes   0.0.0.0:5672->5672/tcp, 0.0.0.0:8161->8161/tcp, 0.0.0.0:61613->61613/tcp, 0.0.0.0:61616->61616/tcp   docker-my-platform-project-activemq-1
```

Now, standing in the directory where the `run.sh` script is located execute the following command to stop and remove the containers:

```bash
username my-platform-project % ./run.sh stop
...
[+] Running 5/4
 ✔ Container docker-my-platform-project-acs-1      ... Removed                                     ... 2.4s 
 ✔ Container docker-my-platform-project-ass-1      ... Removed                                     ... 10.2s 
 ✔ Container docker-my-platform-project-activemq-1 ... Removed                                     ... 10.2s 
 ✔ Container docker-my-platform-project-postgres-1 ... Removed                                     ... 0.1s 
 ✔ Network docker_default                          ... Removed                                     ... 0.0s 
```

### Working with Share JAR project structure {#workingshare}

Before you continue make sure that you have read and completed the tasks in the [Getting started](#gettingstarted) tutorial to generate an Alfresco Share project, which means selecting the `org.alfresco.maven.archetype:alfresco-share-jar-archetype` Maven archetype when generating the project.

> **Note:** The following information assumes that the Share project was generated with the name `my-share-project`.

An Alfresco Share project is used to build extensions for [Alfresco Share UI]({% link content-services/latest/develop/share-ext-points/index.md %}). The runtime environment for Content Services is Docker so not only is this project building the source code for your extensions but also the custom Docker image for Alfresco Share. The custom Docker images includes the JARs, or AMPs, with your extension code.

Looking into the generated Share project we can have:

* A Docker Compose file (`my-share-project/docker/docker-compose.yml`) that can be used to build custom Docker images and run the project.
* A directory for our extension source code: `my-share-project/src/main/java`.
* A directory with the Docker related files, such as the `Dockerfile` used to build the custom Alfresco Share Docker image: `my-share-project/src/main/docker`.

#### Configuration properties (share)

There are a number of properties that we can customize when we run the Alfresco SDK project.
These configuration properties are defined in the `my-share-project/pom.xml` project file.

The following table explains some of these properties:

| Name | Type | Default value | Description |
| ---- | ---- | ------------- | ----------- |
| alfresco.platform.version | `string` | 23.2.1 | The version of the Content Services Repository (i.e. `alfresco.war`) that the Repository Extension should be applied to.<br><br>This also specifies the version of the Content Services Repository Docker image that the custom built Repository image should be based on. See `my-share-project-platform-docker/src/main/docker/Dockerfile` |
| alfresco.share.version | `string` | 23.2.0.72 | The version of Alfresco Share (i.e. `share.war`) that the Share Extension should be applied to.<br><br>This also specifies the version of the Alfresco Share Docker image that the custom built Share image should be based on. See `my-share-project-share-docker/src/main/docker/Dockerfile`|
| docker.acs.image | `string` | alfresco/alfresco-content-repository-community | The name of the Content Services Repository Docker image in Docker Hub. This changes if you switch to Enterprise Edition.|
| docker.share.image | `string` | alfresco/alfresco-share | The name of the Alfresco Share Docker image in Docker Hub. This changes if you switch to Enterprise Edition.|
| share.port | `number` | 8180 | The external port (i.e. outside container) for the Alfresco Share webapp.|
| share.debug.port | `number` | 9898 | The external port (i.e. outside container) for Alfresco Share remote debugging.|
| acs.host | `string` | my-share-project-acs | This is the name (host) that the Content Services Repository is available at. This maps to the service name for the Content Services Repository in the Docker Compose file `my-share-project/docker/docker-compose.yml`. The name is only useful for communication between containers on the default Docker network that is created. |
| acs.port | `number` | 8080 | The external port (i.e. outside container) for the Content Services Repository.|
| acs.debug.port | `number` | 8888 | The external port (i.e. outside container) for Content Services Repository remote debugging.|
| postgres.port | `number` | 5555 | The external port (i.e. outside container) for PostgreSQL database.|

There are some Content Services Repository related properties listed here, such as `acs.host` and `acs.port`. Alfresco Share uses those to connect to the Alfresco Repository. However, this is a bit tricky when we are running in a container environment. You cannot just start the Repository and make it available on `localhost:8080`. It would not be accessible from inside the Share container.

For Share to be able to connect to the Repository, both containers need to be attached to the same Docker network. This way, you can just use the Docker Compose service name for the Repository, such as `my-share-project-acs`. So the best way to test your Share extension is to uncomment the code in the Docker Compose file (`my-share-project/docker/docker-compose.yml`) to also run the Content Services Repository container, Search, and Postgres.

#### Building and running the Share project

The first thing you need to do before you can run anything is to build the custom Share Docker image with the custom extensions. We can build the image and extensions at the same time as we start (run) the project by using the `./run.sh build_start` script (on Windows use the `run.bat build_start` script instead).

Note that if you have another Alfresco SDK project running, then you need to stop it first. Also, make sure that the following ports are free: `8180` (Share), `8080` (Alfresco Repo - if enabled in Docker Compose), `9898` (Share Debug), `8888` (Alfresco Repo Debug - if enabled), `5555` (Postgres). If you want to change the ports see the properties section of `my-share-project/pom.xml`. This project file also contains the versions of Alfresco Repository (if enabled) and Alfresco Share that will be used.  

> **Note:** Before running the Share project, uncomment the code that starts the Repository, Search, and PostgreSQL in the (`my-share-project/docker/docker-compose.yml`) file, so you can test the Share extension. Make sure you also remove the `# Optional` line.

```bash
% cd my-share-project
username my-share-project % ./run.sh build_start
WARN[0000] /Users/username/sdk/my-share-project/target/classes/docker/docker-compose.yml: `version` is obsolete
[INFO] Scanning for projects...
[INFO] 
[INFO] ---------------------< com.acme:my-share-project >----------------------
[INFO] Building my-share-project Share JAR Module 1.0-SNAPSHOT
[INFO]   from pom.xml
[INFO] --------------------------------[ jar ]---------------------------------
...
[INFO] ------------------------------------------------------------------------
[INFO] BUILD SUCCESS
[INFO] ------------------------------------------------------------------------
[INFO] Total time:  21.073 s
[INFO] Finished at: 2024-04-14T10:33:42+01:00
[INFO] ------------------------------------------------------------------------
my-share-project-acs-volume
my-share-project-db-volume
my-share-project-ass-volume
...
[+] Building 1.7s (12/12) FINISHED ... docker:desktop-linux
...
 => CACHED [my-share-project-share 1/7] FROM docker.io/alfresco/alfresco-share:23.2.1@sha256:472a2977c71ca2afd297ba1b90c010f1fcf29e3bc72a869f40bb72a43c7ec10c ...
 ...
my-share-project-share-1  | 14-Apr-2024 09:33:57.658 INFO [main] org.apache.catalina.startup.HostConfig.deployDirectory Deployment of web application directory [/usr/local/tomcat/webapps/share] has finished in [7,471] ms
my-share-project-share-1  | 14-Apr-2024 09:33:57.667 INFO [main] org.apache.coyote.AbstractProtocol.start Starting ProtocolHandler ["http-nio-8080"]
my-share-project-share-1  | 14-Apr-2024 09:33:57.692 INFO [main] org.apache.catalina.startup.Catalina.start Server startup in [7538] milliseconds
```

The `./run.sh build_start` script does the following tasks:

* Stop anything running already with this project's Docker Compose file: `my-share-project/docker/docker-compose.yml`.
* Build the Share Extension JARs so we are sure to get the latest changes.
* Assemble/Aggregate all Share extension JARs into the `my-share-project/target/extensions` directory.
* Create Docker Volumes for Repository (`alf_data`), Search index, and Database so data is persisted outside the containers.
* Run the project via the Docker Compose file and instruct Docker Compose to build the custom Docker images first.
* Tail the logs of all containers.

It also builds the following Docker image:

```bash
% docker image ls|more
REPOSITORY                                              TAG                        IMAGE ID       CREATED          SIZE
alfresco-share-my-share-project                         development                eaa8fcce28cc   13 minutes ago   717MB
```

The different web applications should now be accessible (login with `admin/admin`):

* **Content Services Repository**: <http://localhost:8080/alfresco>
* **Content Services Share**: <http://localhost:8180/share/>

#### Trying out the sample code (share)

The Share project has some sample extension code that you can try out. The Share extension is a custom Aikau page with a custom widget, you reach it with the following URL:

```http
http://localhost:8180/share/page/hdp/ws/simple-page
```

The source code for the Page and Widget is located in the `my-share-project/` folder:

* `src/main/resources/alfresco/web-extension/site-webscripts/com/example/pages`
* `src/main/resources/META-INF/resources/my-share-project-share/js/tutorials/widgets`

#### Looking inside the containers (share)

Sometimes it's useful to look at what's been deployed in the containers. For example, you may wonder how to access the Share container and list the custom Share extension JARs that have been deployed.

You can do that as follows:

First **Ctrl-C** out of the log tailing:

```text
my-share-project-share-1     | 14-Apr-2024 10:23:59.710 INFO [main] org.apache.catalina.startup.HostConfig.deployDirectory Deployment of web application directory [/usr/local/tomcat/webapps/share] has finished in [8,028] ms
my-share-project-share-1     | 14-Apr-2024 10:23:59.723 INFO [main] org.apache.coyote.AbstractProtocol.start Starting ProtocolHandler ["http-nio-8080"]
my-share-project-share-1     | 14-Apr-2024 10:23:59.733 INFO [main] org.apache.catalina.startup.Catalina.start Server startup in [8078] milliseconds
...
my-share-project-share-1     | 2024-04-14T10:24:07,557 [] INFO  [web.site.EditionInterceptor] [http-nio-8080-exec-1] Successfully retrieved license information from Alfresco.
...
^Ccanceled
username my-share-project % 
```

Then check the name of the Alfresco Share container:

<!--FIXME postgres-->
```bash
% docker container ls
CONTAINER ID   IMAGE                                                   COMMAND                  CREATED          STATUS          PORTS                                                      NAMES
c8a4d84406b0   alfresco/alfresco-content-repository-community:23.2.1   "catalina.sh run -se…"   11 minutes ago   Up 11 minutes   8000/tcp, 10001/tcp, 0.0.0.0:8080->8080/tcp                docker-my-share-project-acs-1
46e3d0959a52   alfresco-share-my-share-project:development             "/usr/local/tomcat/s…"   11 minutes ago   Up 11 minutes   8000/tcp, 0.0.0.0:8180->8080/tcp, 0.0.0.0:9898->8888/tcp   docker-my-share-project-share-1
96dc5ffd4eb7   alfresco/alfresco-search-services:2.0.3                 "/bin/sh -c '$DIST_D…"   11 minutes ago   Up 11 minutes   0.0.0.0:8983->8983/tcp, 10001/tcp                          docker-my-share-project-ass-1
eb1cc2c908d2   postgres:9.6                                            "docker-entrypoint.s…"   11 minutes ago   Up 11 minutes   0.0.0.0:5555->5432/tcp                                     docker-my-share-project-postgres-1
```

Then open up a shell into the Alfresco Share container:

```bash
username sdk % docker exec -it docker-my-share-project-share-1 /bin/bash
[root@46e3d0959a52 tomcat]# pwd
/usr/local/tomcat
[root@46e3d0959a52 tomcat]# ls -l webapps/share/WEB-INF/lib/ | grep "my-sh"
-rw-r--r-- 1 root root    19343 Apr 14 09:54 my-share-project-1.0-SNAPSHOT.jar
[root@46e3d0959a52 tomcat]# exit
exit
```

#### Updating extension code (share)

So now you probably want to write some new code, or update the existing code, and see how that works with the running containers. Let's just update the code and restart.

For example, let's update the Share Page title.

1. Open the file in the `my-share-project` folder:

    ```text
    src/main/resources/alfresco/web-extension/site-webscripts/com/example/pages/simple-page.get.js
    ```

2. Change the content as follows:

    ```json
    model.jsonModel = {
        widgets: [{
            id: "SET_PAGE_TITLE",
            name: "alfresco/header/SetTitle",
            config: {
                title: "This is an UPDATED PAGE Title"
            }
        },
            {
                id: "MY_HORIZONTAL_WIDGET_LAYOUT",
                name: "alfresco/layout/HorizontalWidgets",
                config: {
                    widgetWidth: 50,
                    widgets: [
                        {
                            id: "DEMO_SIMPLE_LOGO",
                            name: "alfresco/logo/Logo",
                            config: {
                                logoClasses: "alfresco-logo-only"
                            }
                        },
                        {
                            id: "DEMO_SIMPLE_MSG",
                            name: "tutorials/widgets/TemplateWidget"
                        }
                    ]
                }
            }]
    };
    ```

3. To get this code update deployed, run the following command in another console, where you're tailing the logs, and stand in the directory where the `run.sh` script is located:

    ```bash
    username my-share-project % ./run.sh reload_share
    ```

What this does is the following:

* Kill the `my-share-project-acs` container.
* Remove the killed (stopped) `my-share-project-acs` container, so a new Docker image can be created with a `development` tag.
* Build the Share extension JAR.
* Copy the newly built Share extension JAR over to the `my-share-project/target/extensions` where it's picked up when the new Docker image is built.
* Build a new `alfresco-share-my-share-project:development` image.
* Start up the `my-share-project-acs` container based on new image.

You're left with the console tailing the logs, but you can **Ctrl-C** out of this as you are already tailing the logs in the initial console where we started things up.

You can check if the change took effect by accessing the `http://localhost:8180/share/page/hdp/ws/simple-page` Web Script.

#### Stopping the project (share)

To stop the solution you need to first `Ctrl-C` out of the log tailing. This does not stop the containers as they run in daemon mode in the background. Check this by executing the following command that lists running containers:

```bash
% docker container ls
CONTAINER ID   IMAGE                                                   COMMAND                  CREATED          STATUS          PORTS                                                      NAMES
d1e1afb26377   alfresco-share-my-share-project:development             "/usr/local/tomcat/s…"   10 minutes ago   Up 10 minutes   8000/tcp, 0.0.0.0:8180->8080/tcp, 0.0.0.0:9898->8888/tcp   docker-my-share-project-share-1
c8a4d84406b0   alfresco/alfresco-content-repository-community:23.2.1   "catalina.sh run -se…"   39 minutes ago   Up 39 minutes   8000/tcp, 10001/tcp, 0.0.0.0:8080->8080/tcp                docker-my-share-project-acs-1
96dc5ffd4eb7   alfresco/alfresco-search-services:2.0.3                 "/bin/sh -c '$DIST_D…"   39 minutes ago   Up 39 minutes   0.0.0.0:8983->8983/tcp, 10001/tcp                          docker-my-share-project-ass-1
eb1cc2c908d2   postgres:9.6                                            "docker-entrypoint.s…"   39 minutes ago   Up 39 minutes   0.0.0.0:5555->5432/tcp                                     docker-my-share-project-postgres-1
```

Now, standing in the directory where the `run.sh` script is located execute the following command to stop and remove the containers:

```bash
username my-share-project % ./run.sh stop      
WARN[0000] /Users/username/sdk/my-share-project/target/classes/docker/docker-compose.yml: `version` is obsolete 
[+] Running 5/5
 ✔ Container docker-my-share-project-acs-1      ... Removed                                     ... 1.2s 
 ✔ Container docker-my-share-project-ass-1      ... Removed                                     ... 10.2s 
 ✔ Container docker-my-share-project-share-1    ... Removed                                     ... 10.2s 
 ✔ Container docker-my-share-project-postgres-1 ... Removed                                     ... 0.1s 
 ✔ Network docker_default                       ... Removed                                     ... 0.1s
```

### All-In-One (AIO) project structure {#structureaio}

This page provides a detailed description of the All-In-One (AIO) project, including the project structure and folder contents.

Now that you know what an All-In-One project is, let’s introduce the structure of the project, once it is created using the `org.alfresco.maven.archetype:alfresco-allinone-archetype`.

Below is an example directory structure of an All-In-One project created with `com.example` as `groupId` and `my-all-in-one-project` as `artifactId`.

```text
my-all-in-one-project
├── pom.xml
├── README.md
├── run.bat
├── run.sh
├── docker
|   └── docker-compose.yml
├── my-all-in-one-project-integration-tests
|   ├── pom.xml
│   └── src
│       ├── main
│       │   └── java
│       │       └── com
│       │           └── example
│       └── test
│           └── java
│               └── com
│                   └── example
│                       └── platformsample
│                           ├── CustomContentModelIT.java
│                           ├── DemoComponentIT.java
│                           └── HelloWorldWebScriptIT.java
├── my-all-in-one-project-platform-docker
|   ├── pom.xml
│   └── src
│       └── main
│           └── docker
│               ├── alfresco-global.properties
│               ├── dev-log4j2.properties
│               ├── disable-webscript-caching-context.xml
│               ├── Dockerfile
│               ├── hotswap-agent.properties
│               └── license
│                   └── README.md
├── my-all-in-one-project-platform
│   ├── pom.xml
│   └── src
│       ├── main
│       │   ├── assembly
│       │   │   ├── amp.xml
│       │   │   ├── file-mapping.properties
│       │   │   └── web
│       │   │       └── README.md
│       │   ├── java
│       │   │   └── com
│       │   │       └── example
│       │   │           └── platformsample
│       │   │               ├── DemoComponent.java
│       │   │               ├── Demo.java
│       │   │               └── HelloWorldWebScript.java
│       │   └── resources
│       │       ├── alfresco
│       │       │   ├── extension
│       │       │   │   └── templates
│       │       │   │       └── webscripts
│       │       │   │           └── alfresco
│       │       │   │               └── tutorials
│       │       │   │                   ├── helloworld.get.desc.xml
│       │       │   │                   ├── helloworld.get.html.ftl
│       │       │   │                   └── helloworld.get.js
│       │       │   └── module
│       │       │       └── my-all-in-one-project-platform
│       │       │           ├── alfresco-global.properties
│       │       │           ├── context
│       │       │           │   ├── bootstrap-context.xml
│       │       │           │   ├── service-context.xml
│       │       │           │   └── webscript-context.xml
│       │       │           ├── messages
│       │       │           │   ├── content-model.properties
│       │       │           │   └── workflow-messages.properties
│       │       │           ├── model
│       │       │           │   ├── content-model.xml
│       │       │           │   └── workflow-model.xml
│       │       │           ├── module-context.xml
│       │       │           ├── module.properties
│       │       │           └── workflow
│       │       │               └── sample-process.bpmn20.xml
│       │       └── META-INF
│       │           └── resources
│       │               └── test.html
│       └── test
│           └── java
│               └── com
│                   └── example
│                       └── platformsample
│                           └── HelloWorldWebScriptControllerTest.java
├── my-all-in-one-project-share-docker
|   ├── pom.xml
│   └── src
│       └── main
│           └── docker
│               ├── Dockerfile
│               ├── hotswap-agent.properties
│               ├── log4j2.properties
│               └── share-config-custom.xml
└── my-all-in-one-project-share
    ├── pom.xml
    └── src
        ├── main
        │   ├── assembly
        │   │   ├── amp.xml
        │   │   ├── file-mapping.properties
        │   │   └── web
        │   │       └── README.md
        │   ├── java
        │   │   └── com
        │       ├── alfresco
        │       │   ├── module
        │       │   │   └── my-all-in-one-project-share
        │       │   │       └── module.properties
        │       │   └── web-extension
        │       │       ├── messages
        │       │       │   └── my-all-in-one-project-share.properties
        │       │       ├── my-all-in-one-project-share-slingshot-application-context.xml
        │       │       ├── site-data
        │       │       │   └── extensions
        │       │       │       └── my-all-in-one-project-share-example-widgets.xml
        │       │       └── site-webscripts
        │       │           ├── com
        │       │           │   └── example
        │       │           │       └── pages
        │       │           │           ├── simple-page.get.desc.xml
        │       │           │           ├── simple-page.get.html.ftl
        │       │           │           └── simple-page.get.js
        │       │           └── org
        │       │               └── alfresco
        │       │                   └── README.md
        │       └── META-INF
        │           ├── resources
        │           │   └── my-all-in-one-project-share
        │           │       └── js
        │           │           └── tutorials
        │           │               └── widgets
        │           │                   ├── css
        │           │                   │   └── TemplateWidget.css
        │           │                   ├── i18n
        │           │                   │   └── TemplateWidget.properties
        │           │                   ├── templates
        │           │                   │   └── TemplateWidget.html
        │           │                   └── TemplateWidget.js
        │           └── share-config-custom.xml
        └── test
            └── java
                └── com
                    └── example
```

From a high level standpoint, we can describe the content of the project as follows:

* `my-all-in-one-project` (the root of the project) contains the whole project. It can easily be pushed into a version control repository and/or an internet hosting service like GitHub, SVN, CVS, etc.
* The files stored into the root of the project are mainly related to actions and commands (running, debugging, etc.), technical configuration (`pom.xml`), and documentation (`README.md`).
* `my-all-in-one-project-integration-tests` (typically named `<artefactId-integration-tests>`) contains a sub-project entirely dedicated to integration tests.
* `my-all-in-one-project-platform-docker` (typically named `<artefactId-platform-docker>`) contains a sub-project dedicated to the configuration of a custom Docker image with the Content Services Repository and the customization module `my-all-in-one-project-platform` installed.
* `my-all-in-one-project-platform` (typically named `<artefactId-platform>`) contains a sub-project entirely dedicated to the customization of the Content Services Repository.
* `my-all-in-one-project-share-docker` (typically named `<artefactId-share-docker>`) contains a sub-project dedicated to the configuration of a custom Docker image with the Alfresco Share client and the customization module `my-all-in-one-project-share` installed.
* `my-all-in-one-project-share` (typically named `<artefactId-share>`) contains a sub-project entirely dedicated to the customization of the Alfresco Share client.

After this brief introduction of the All-In-One project, let’s focus on the content of the folders.

#### Project root folder

Below is a description of the files in the root of the project (in this case, `my-all-in-one-project`).

| File | Description |
| ---- | ----------- |
|`run` (`sh` and `bat`) | Utility script to work with the project (compile, run, test, show logs, etc.). [More details about the run script](#workingwithrunscript).|
|`pom.xml` | This XML file contains information about the project and configuration details used by Apache Maven to build the project. You can define all the configurations, parameters, and settings in this file for projects as well as for sub-projects.|
|`README.md` | File in Markdown format containing the documentation for the project.|

#### my-all-in-one-project-platform

Below is a description of the content in the `my-all-in-one-project-platform` (typically named `<artefactId-platform>`) sub-project. This sub-project contains the source code entirely dedicated to the customizing the Content Services Repository.

| Content | Description |
| ------- | ----------- |
|`pom.xml` | This XML file contains information about the project and configuration details used by Apache Maven to build the project. You can define all the configurations, parameters, and settings in this file even if it depends on the parent pom in the root folder. For the majority of use cases, settings and configurations are directly inherited from the parent pom, and this file can work in its default version.|
|`src/main/assembly` | In this folder you can find everything that's needed to fully control creating the AMP artifact in the platform project. The main file to check is `amp.xml`.|
|`src/main/java/<groupId>...` | This folder contains the same content you can find in a regular Java project, i.e. the Java source code. Here you should put all the custom classes, interfaces, and Java source code in general.|
|`src/main/resources/alfresco/extension/templates/webscripts` | In this folder you can find the extensions to the REST API related to Web Scripts . Repository Web Scripts are defined in XML, JavaScript, and FreeMarker files. These are referred to as Data Web Scripts as they usually return JSON or XML. The default project contains a Hello World example.|
|`src/main/resources/alfresco/module/<artifactId>` | This folder contains all the configuration files and settings for the Alfresco platform module. Here you can find context files, the `alfresco-global.properties` file, Content Model examples, and Activiti workflow examples.|
|`src/main/resources/META-INF` | This folder hosts the content that will be placed in the `META-INF` folder of a standard Java web application.|
|`src/test/java/<groupId>...` | This folder contains the same content you can find in a regular Java project, i.e. the Java source code for tests. Here you should put all the custom classes, interfaces, and Java source code related to tests.|

#### my-all-in-one-project-platform-docker

Below is a description of the content in the `my-all-in-one-project-platform-docker` (typically named `<artefactId-platform-docker>`) sub-project. This sub-project contains the resources required to define a custom Docker image with the Content Services Repository and the customization module `my-all-in-one-project-platform` installed.

| Content | Description |
| ------- | ----------- |
| `pom.xml` | This XML file contains information about the project and configuration details used by Apache Maven to build the project. It adds the dependency to the `my-all-in-one-project-platform` module and configures the `maven-dependency-plugin` to copy all the artifacts required in the Docker image into the folder `${project.build.directory}/extensions`. |
| `src/main/docker` | In this folder you can find everything that's needed to fully configure the custom Content Services Docker image. |
| `src/main/docker/Dockerfile` | This is the file that define the custom Content Services Docker image. The default configuration installs all the existing JARs and AMPs under `${project.build.directory}/extensions` folder and adds custom configuration and license files. |
| `src/main/docker/license` | This folder contains the licenses required for running an Enterprise project. |

#### my-all-in-one-project-share

Below is a description of the content in the `my-all-in-one-project-share` (typically named `<artefactId-share>`) sub-project. This sub-project contains the source code entirely dedicated to the customizing the Alfresco Share client.

| Content | Description |
| ------- | ----------- |
| `pom.xml` | This XML file contains information about the project and configuration details used by Apache Maven to build the project. You can define all the configurations, parameters, and settings in this file even if it depends on the parent pom in the root folder. For the majority of use cases, settings and configurations are directly inherited from the parent pom, and this file can work in its default version. |
| `src/main/assembly` | In this folder you can find everything that's needed to fully control creating the AMP artifact in the platform project. The main file to check is `amp.xml`. |
| `src/main/java/<groupId>...` | This folder contains the same content you can find in a regular Java project, i.e. the Java source code. Here you should put all the custom classes, interfaces, and Java source code in general. |
| `src/main/resources/alfresco/module/<artifactId>` | This folder contains all the configuration files and settings for the Alfresco Share module. Here you can find the property file for the module. |
| `src/main/resources/alfresco/web-extension` | In this folder you can find the extensions to the web client (Alfresco Share) and it's where you store Spring configurations that extend and override the system Share configuration. There are two important sub-directories here: `site-data` and `site-webscripts`. |
| `src/main/resources/alfresco/META-INF/resources` | This folder hosts the content that will be placed in the `META-INF` folder of a standard Java web application. It is best practice to use a further subdirectory based on the module name. This allows you to manage multiple modules, so that their web resources don't conflict with each other. |
| `src/main/resources/alfresco/META-INF/share-config-custom.xml` | This file is a relevant Alfresco Share file used to configure the sub-project with the correct settings, depending on your environment. For more details, see [Share configuration]({% link content-services/latest/develop/share-ext-points/index.md %}). |
| `src/test/java/<groupId>...` | This folder contains the same content you can find in a regular Java project, i.e. the Java source code for tests. Here you should put all the custom classes, interfaces, and Java source code related to tests. |

#### my-all-in-one-project-share-docker

Below is a description of the content in the `my-all-in-one-project-share-docker` (typically named `<artefactId-share-docker>`) sub-project. This sub-project contains the resources required to define a custom Docker image with the Alfresco Share Client and the customization module `my-all-in-one-project-share` installed.

| Content | Description |
| ------- | ----------- |
| `pom.xml` | This XML file contains information about the project and configuration details used by Apache Maven to build the project. It adds the dependency to the `my-all-in-one-project-share` module and configures the `maven-dependency-plugin` to copy all the artifacts required in the Docker image into the folder `${project.build.directory}/extensions`. |
| `src/main/docker` | In this folder you can find everything that's needed to fully configure the custom Alfresco Share Docker image. |
| `src/main/docker/Dockerfile` | This is the file that define the custom Alfresco Share Docker image. The default configuration installs all the existing JARs and AMPs under `${project.build.directory}/extensions` folder and adds custom configuration files. |

#### my-all-in-one-project-integration-tests

Below is a description of the content in the `my-all-in-one-project-integration-tests` (typically named `<artefactId-integration-tests>`) sub-project. This sub-project contains all the source code and resources needed to run the integration tests.

| Content | Description |
| ------- | ----------- |
| `pom.xml` | This XML file contains information about the project and configuration details used by Apache Maven to build the project. You can define all the configurations, parameters, and settings in this file even if it depends on the parent pom in the root folder. For the majority of use cases, settings and configurations are directly inherited from the parent pom, and this file can work in its default version. |
| `src/main/java/<groupId>...` | This folder contains the same content you can find in a regular Java project, i.e. the Java source code. Here you should put all the custom classes, interfaces, and Java source code in general. The folder is empty by default. |
| `src/test/java/<groupId>...` | This folder contains the same content you can find in a regular Java project, i.e. the Java source code for tests. Here you should put all the custom classes, interfaces, and Java source code in general related to tests. By default you can find three different tests related to content modelling, custom components, and web scripts. |

### Platform JAR project structure {#structureplatform}

This page provides a detailed description of the Platform JAR project, including the project structure and folder content. Now that you know what a Platform JAR project is, let’s introduce the structure of the project, once it is created using the `org.alfresco.maven.archetype:alfresco-platform-jar-archetype`.

Below is an example directory structure of a Platform JAR created with `com.example` as `groupId` and `my-platform-jar-project` as `artifactId`.

```text
my-platform-jar-project
├── README.md
├── docker
│   └── docker-compose.yml
├── pom.xml
├── run.bat
├── run.sh
└── src
    ├── main
    │   ├── assembly
    │   │   ├── amp.xml
    │   │   ├── file-mapping.properties
    │   │   └── web
    │   │       └── README.md
    │   ├── docker
    │   │   ├── Dockerfile
    │   │   ├── alfresco-global.properties
    │   │   ├── dev-log4j2.properties
    │   │   ├── disable-webscript-caching-context.xml
    │   │   ├── hotswap-agent.properties
    │   │   └── license
    │   │       └── README.md
    │   ├── java
    │   │   └── com
    │   │       └── example
    │   │           └── platformsample
    │   │               ├── Demo.java
    │   │               ├── DemoComponent.java
    │   │               └── HelloWorldWebScript.java
    │   └── resources
    │       ├── META-INF
    │       │   └── resources
    │       │       └── test.html
    │       └── alfresco
    │           ├── extension
    │           │   └── templates
    │           │       └── webscripts
    │           │           └── alfresco
    │           │               └── tutorials
    │           │                   ├── helloworld.get.desc.xml
    │           │                   ├── helloworld.get.html.ftl
    │           │                   └── helloworld.get.js
    │           └── module
    │               └── my-platform-jar-project
    │                   ├── alfresco-global.properties
    │                   ├── context
    │                   │   ├── bootstrap-context.xml
    │                   │   ├── service-context.xml
    │                   │   └── webscript-context.xml
    │                   ├── log4j2.properties
    │                   ├── messages
    │                   │   ├── content-model.properties
    │                   │   └── workflow-messages.properties
    │                   ├── model
    │                   │   ├── content-model.xml
    │                   │   └── workflow-model.xml
    │                   ├── module-context.xml
    │                   ├── module.properties
    │                   └── workflow
    │                       └── sample-process.bpmn20.xml
    └── test
        └── java
            └── com
                └── example
                    └── platformsample
                        ├── CustomContentModelIT.java
                        ├── DemoComponentIT.java
                        ├── HelloWorldWebScriptControllerTest.java
                        └── HelloWorldWebScriptIT.java
```

From a high level standpoint, we can describe the content of the project as follows:

* `my-platform-jar-project` (the root of the project) contains the whole project. It can easily be pushed into a version control repository and/or an internet hosting service like GitHub, SVN, CVS, etc.
* The files stored into the root of the project are mainly related to actions and commands (running, debugging, etc.), technical configuration (`pom.xml`), and documentation (`README.md`).
* `src` contains the source code, tests, configurations, settings and resources that are entirely dedicated to the customization of the Content Services Repository.

After this brief introduction of the Platform JAR project, let’s focus on the content of the folders.

#### Project root folder (platform)

Below is a description of the files in the root of the project (in this case, `my-platform-jar-project`).

| File | Description |
| ---- | ----------- |
| `run` (`sh` and `bat`) | Utility script to work with the project (compile, run, test, show logs, etc.). [More details about the run script](#workingwithrunscript). |
| `pom.xml` | This XML file contains information about the project and configuration details used by Apache Maven to build the project. |
| `README.md` | File in Markdown format containing the documentation for the project. |

#### `src` folder (platform)

Below is a description of the content in the `src` folder. This folder contains the source code, tests, configuration, settings, and resources entirely dedicated to the customization of the Content Services Repository.

| Content | Description |
| ------- | ----------- |
| `src/main/assembly` | In this folder you can find everything that's needed to fully control creating the AMP artifact in the platform project. The main file to check is `amp.xml`. |
| `src/main/docker` | In this folder you can find everything that's needed to fully configure the custom Content Services Docker image. |
| `src/main/docker/Dockerfile` | This is the file that define the custom Content Services Docker image. The default configuration installs all the existing JARs and AMPs under `${project.build.directory}/extensions` folder and adds custom configuration and license files. |
| `src/main/docker/license` | This folder contains the licenses required for running an Enterprise project. |
| `src/main/java/<groupId>...` | This folder contains the same content you can find in a regular Java project, i.e. the Java source code. Here you should put all the custom classes, interfaces, and Java source code in general. |
| `src/main/resources/alfresco/extension/templates/webscripts` | In this folder you can find the extensions to the REST API related to Web Scripts . Repository Web Scripts are defined in XML, JavaScript, and FreeMarker files. These are referred to as Data Web Scripts as they usually return JSON or XML. The default project contains a Hello World example. |
| `src/main/resources/alfresco/module/<artifactId>` | This folder contains all the configuration files and settings for the Alfresco platform module. Here you can find context files, the `alfresco-global.properties` file, Content Model examples, and Activiti workflow examples. |
| `src/main/resources/META-INF` | This folder hosts the content that will be placed in the `META-INF` folder of a standard Java web application. |
| `src/test/java/<groupId>...` | This folder contains the same content you can find in a regular Java project, i.e. the Java source code for tests. Here you should put all the custom classes, interfaces, and Java source code related to tests. |

### Share JAR project structure {#structureshare}

The following page provides a detailed description of the Share client JAR project, including the project structure and folder content.

Now that you know what a Share JAR project is, let’s introduce the structure of the project, once it is created using the `org.alfresco.maven.archetype:alfresco-share-jar-archetype`.

Below is an example directory structure of a Share JAR created with `com.example` as `groupId` and `my-share-jar-project` as `artifactId`.

```text
my-share-jar-project
├── pom.xml
├── README.md
├── run.bat
├── run.sh
└── src
    ├── main
    │   ├── assembly
    │   │   ├── amp.xml
    │   │   ├── file-mapping.properties
    │   │   └── web
    │   │       └── README.md
    │   ├── docker
    │   │   ├── Dockerfile
    │   │   ├── hotswap-agent.properties
    │   │   ├── log4j2.properties
    │   │   └── share-config-custom.xml
    │   ├── java
    │   │   └── com
    │   │       └── example
    │   └── resources
    │       ├── alfresco
    │       │   ├── module
    │       │   │   └── my-share-jar-project
    │       │   │       └── module.properties
    │       │   └── web-extension
    │       │       ├── messages
    │       │       │   └── my-share-jar-project.properties
    │       │       ├── my-share-jar-project-slingshot-application-context.xml
    │       │       ├── site-data
    │       │       │   └── extensions
    │       │       │       └── my-share-jar-project-example-widgets.xml
    │       │       └── site-webscripts
    │       │           ├── com
    │       │           │   └── example
    │       │           │       └── pages
    │       │           │           ├── simple-page.get.desc.xml
    │       │           │           ├── simple-page.get.html.ftl
    │       │           │           └── simple-page.get.js
    │       │           └── org
    │       │               └── alfresco
    │       │                   └── README.md
    │       └── META-INF
    │           ├── resources
    │           │   └── my-share-jar-project
    │           │       └── js
    │           │           └── tutorials
    │           │               └── widgets
    │           │                   ├── css
    │           │                   │   └── TemplateWidget.css
    │           │                   ├── i18n
    │           │                   │   └── TemplateWidget.properties
    │           │                   ├── templates
    │           │                   │   └── TemplateWidget.html
    │           │                   └── TemplateWidget.js
    │           └── share-config-custom.xml
    └── test
        └── java
            └── com
                └── example
```

From a high level standpoint, we can describe the content of the project as follows:

* `my-platform-jar-project` (the root of the project) contains the whole project. It can easily be pushed into a version control repository and/or an internet hosting service like GitHub, SVN, CVS, etc.
* The files stored into the root of the project are mainly related to actions and commands (running, debugging, etc.), technical configuration (`pom.xml`), and documentation (`README.md`).
* `src` contains the source code, tests, configurations, settings and resources that are entirely dedicated to the customization of the Alfresco Share client.

After this brief introduction of the Platform JAR project, let’s focus on the content of the folders.

#### Project root folder (share)

Below is a description of the files in the root of the project (in this case, `my-share-jar-project`).

| File | Description |
| ---- | ----------- |
| `run` (`sh` and `bat`) | Utility script to work with the project (compile, run, test, show logs, etc.). [More details about the run script](#workingwithrunscript). |
| `pom.xml` | This XML file contains information about the project and configuration details used by Apache Maven to build the project. |
| `README.md` | File in Markdown format containing the documentation for the project. |

#### `src` folder (share)

Below is a description of the content in the `src` folder, which contains the source code, tests, configuration, settings, and resources entirely dedicated to the customization of the Alfresco Share client.

| Content | Description |
| ------- | ----------- |
| `src/main/assembly` | In this folder you can find everything that's needed to fully control creating the AMP artifact in the platform project. The main file to check is `amp.xml`. |
| `src/main/docker` | In this folder you can find everything that's needed to fully configure the custom Alfresco Share Docker image. |
| `src/main/docker/Dockerfile` | This is the file that define the custom Alfresco Share Docker image. The default configuration installs all the existing JARs and AMPs under `${project.build.directory}/extensions` folder and adds custom configuration files. |
| `src/main/java/<groupId>...` | This folder contains the same content you can find in a regular Java project, i.e. the Java source code. Here you should put all the custom classes, interfaces, and Java source code in general. |
| `src/main/resources/alfresco/module/<artifactId>` | This folder contains all the configuration files and settings for the Alfresco Share module. Here you can find the property file for the module. |
| `src/main/resources/alfresco/web-extension` | In this folder you can find the extensions to the web client (Alfresco Share) and it's where you store Spring configurations that extend and override the system Share configuration. There are two important sub-directories here: `site-data` and `site-webscripts`. |
| `src/main/resources/alfresco/META-INF/resources` | This folder hosts the content that will be placed in the `META-INF` folder of a standard Java web application. It is best practice to use a further subdirectory based on the module name. This allows you to manage multiple modules, so that their web resources don't conflict with each other. |
| `src/main/resources/alfresco/META-INF/share-config-custom.xml` | This file is a relevant Alfresco Share file used to configure the sub-project with the correct settings, depending on your environment. For more details, see [Share configuration]({% link content-services/latest/develop/share-ext-points/index.md %}). |
| `src/test/java/<groupId>...` | This folder contains the same content you can find in a regular Java project, i.e. the Java source code for tests. Here you should put all the custom classes, interfaces, and Java source code related to tests. |

## Setting up your development environment

The Maven Alfresco SDK is designed to work well with [Eclipse](https://www.eclipse.org/){:target="_blank"} and [IntelliJ IDEA](https://www.jetbrains.com/idea/){:target="_blank"}.

### Setting up your development environment using Eclipse

The Maven Alfresco SDK is designed to work well with Eclipse. This support includes the ability to import existing Alfresco projects created using the Alfresco SDK.

Here we assume you already have an Eclipse installation up and running, together with an available Alfresco project created using the Alfresco SDK. If you don't have a project already, follow the steps in [Getting started with Alfresco SDK](#gettingstarted) to learn how to quickly generate it in a few easy steps.

#### Importing the Alfresco project into Eclipse

1. Starting from Eclipse, select `File > Import > Maven > Existing Maven Projects` from the main menu to import the Alfresco project.

    ![sdk-dev-env-eclipse-import]({% link content-services/images/sdk-dev-env-eclipse-import.png %})

2. Click `Next` then browse to the root of the Alfresco project.

    ![sdk-dev-env-eclipse-project]({% link content-services/images/sdk-dev-env-eclipse-project.png %})

3. Click `Finish` to start importing the project into Eclipse.

    Before completing the import, Eclipse checks the completeness of the local Maven repository. If you already have a local repository that includes all the required dependencies, this task will finish relatively quickly. Otherwise, be patient and wait until the downloads are completed (it can take some time).

    Once the import is complete, a warning message may be displayed.

    ![sdk-dev-env-eclipse-warning]({% link content-services/images/sdk-dev-env-eclipse-warning.png %})

4. Click `Resolve All Later` to complete the import task.

5. Check the Markers tab in the bottom panel, where you may see some Maven problems. Expand the list and right click on a item with an error, then select `Quick Fix` and mark as shown.

    ![sdk-dev-env-eclipse-quickfix]({% link content-services/images/sdk-dev-env-eclipse-quickfix.png %})

6. Click `Finish` to confirm the fix.

    You may be asked to confirm your selection.

7. Repeat the fix for all similar issues you have. Note that these issues really depend on the archetype you used to generate the project.

    Once done, you may see an error with description: Project configuration is not up-to-date with pom.xml.

8. To fix this, right click one of the Alfresco projects and select `Maven > Update Project`, ensure all the Alfresco projects and sub-projects are selected, and then click `OK`.

Once this is done, the project is successfully imported in Eclipse.

If you want more detail about how to work with the project, visit [Working with generated projects](#workingwithprojects).

### Setting up your development environment using Intellij IDEA

The Maven Alfresco SDK is designed to work well with Intellij. This support includes the ability to import existing Alfresco projects created using the Alfresco SDK.

Here we assume you already have an Intellij installation up and running, together with an available Alfresco project created using the Alfresco SDK. If you don't have a project already, follow the steps in [Getting started with Alfresco SDK](#gettingstarted) to learn how to quickly generate it in a few easy steps.

#### Importing the Alfresco project into Intellij IDEA

1. Starting from IntelliJ IDEA, select `File > Open` from the main menu to open the Alfresco project. Alternatively, select `Import Project` if you're running IntelliJ IDEA for the first time in your development environment.

    ![sdk-dev-env-intellij-import]({% link content-services/images/sdk-dev-env-intellij-import.png %})

2. After the project is imported, you will see a window similar to the following:

    ![sdk-dev-env-intellij-finish]({% link content-services/images/sdk-dev-env-intellij-finish.png %})

Once this is done, the project is successfully imported in IntelliJ IDEA.

If you want more detail about how to work with the project, visit [Working with generated projects](#workingwithprojects).

## Advanced topics

This information provides more advanced topics that you might come in contact with when you have been working with an SDK project for a while. We will have a look at how you can work with AMPs, remote debugging, hot reloading, enable transformations and more.

### Switching Content Services and Share versions

The latest version of the Alfresco SDK supports different versions for Content Services and Alfresco Share. Since each product is no longer released under one common version number, Content Services (i.e. `alfresco.war`) and the Share UI (`share.war`) are now released with individual version numbers.

By default, SDK 4 is configured to generate projects using the most recent version of Content Services and Share. You can easily change one (or both) versions by simply updating the `pom.xml` file in your project. The compatibility of these versions is up to you, however you should check in advance the right versions to use.

When editing `pom.xml` you will see a number of properties that define the Content Services platform version and the Alfresco Share version, such as:

```xml
<alfresco.platform.version>7.0.0</alfresco.platform.version>
<alfresco.share.version>7.0.0</alfresco.share.version>
```

Before continuing, always remember to start from a newly generated SDK project before changing the version numbers. We do not recommend changing the versions using developed customizations or source code.

This article is focused on the Community version. If you want to switch to Alfresco Enterprise, visit [Working with Enterprise](#workingwithenterprise).

The supported versions are explained in the next sections of this article.

#### Switch to Alfresco version 7.0.x

Starting from a newly created Alfresco SDK project (All-In-One, Platform JAR, or Share JAR), let’s replace the two properties with the following ones.

1. Open the `pom.xml` in your generated project.

2. Replace the properties with the following:

    ```xml
    <alfresco.platform.version>7.0.0</alfresco.platform.version>
    <alfresco.share.version>7.0.0</alfresco.share.version>
    ```

    In this example we have shown the switch to version 7.0.0. Feel free to use the correct version for your project, paying attention to the compatible versions of Content Services and Alfresco Share.

3. After changing the versions, delete all the previous data of your development Docker environment:

    ```bash
    ./run.sh purge
    ```

4. Rebuild and restart the project:

    ```bash
    ./run.sh build_start
    ```

### Working with Enterprise {#workingwithenterprise}

By default, the Alfresco SDK uses the Community Edition releases, but it can be configured to use Enterprise Edition releases. Here you'll learn how to set up a project to work with an Enterprise Edition release, highlighting the changes required to make it work.

If you would like to work with the Alfresco Enterprise Edition, then this requires just a few property changes and a license installation. You also need to have access to the private Alfresco Nexus repository and the private Alfresco Quay.io Docker registry. See:

* [How to configure private Alfresco Nexus repository](#enterprisemvnrepo).
* [How to configure private Alfresco Docker registry](#enterprisedockerregistry).

#### Installing the license

The very first task to complete is about installing an enterprise license, otherwise the server will remain in read-only mode. This task is required if and only if you used the All-In-One archetype, or the Platform JAR archetype to generate your project. If you used the Share JAR archetype to generate your project, feel free to ignore this task and move on the next one.

If you are an Alfresco Partner or Customer, you can request an enterprise license by opening a ticket in [Hyland Community](https://community.hyland.com/){:target="_blank"}. The Enterprise license is nothing more and nothing less than a file with `lic` extension. The Enterprise license file goes into the `src/main/docker/license` folder (this folder will be located under the platform JAR submodule if you're using the All-In-One archetype). The license will be copied into the Content Services Docker container before it is started. The license file name doesn't matter, but make sure that you keep it simple and maintain the `lic` extension.

#### Configuring the Enterprise release

The configuration of the Enterprise version is straightforward when using the `pom.xml` configuration file stored in the root folder of your project.
You'll need to update the following settings in the `pom.xml` file:

* Change the _bill of materials_ (BOM) dependency name:

```xml
<alfresco.bomDependencyArtifactId>acs-packaging</alfresco.bomDependencyArtifactId>
```

* Change the Docker Content Services image names for the Alfresco repository and the Alfresco Share UI:

```xml
<docker.acs.image>quay.io/alfresco/alfresco-content-repository</docker.acs.image>

<docker.share.image>quay.io/alfresco/alfresco-share</docker.share.image>
```

Changing these parameters instructs the project to use the proper maven dependencies and Docker images. Note that the Docker images are located in the private **quay.io** Docker Registry.

Depending on the needs of your project, it might be necessary to change the `org.alfresco:alfresco-remote-api` dependency to `org.alfresco:alfresco-enterprise-remote-api` or adding any other enterprise dependency like `org.alfresco:alfresco-enterprise-repository`. In any case, it won't be necessary to include the dependency version as the BOM dependency in the `dependencyManagement` section of the parent `pom.xml` file handles that.

#### Configuring the Enterprise version

The configuration of the Enterprise version is straightforward when using the `pom.xml` configuration file stored in the root folder of your project.
You'll need to update the following settings in the `pom.xml` file:

```xml
<alfresco.platform.version>7.0.0</alfresco.platform.version>
<alfresco.share.version>7.0.0</alfresco.share.version>
```

Making use of the Alfresco SDK 4 it is no longer required the configuration of the Alfresco Surf versions. The inclusion of the BOM and the custom Docker
images will take care of that task automatically for you.

#### Purging the project data and running the project

Once all the previous configuration is done, you only need to purge any possible old data (persistent data from the Docker containers), rebuild and restart
the project.

```bash
./run.sh purge
./run.sh build_start
```

If you're using Windows, you'll need to use the `run.bat` script instead of `run.sh`.

#### How to configure private Alfresco Nexus repository {#enterprisemvnrepo}

The first matter to consider is to ensure that you have credentials for the Alfresco Private Repository ([artifacts.alfresco.com](https://nexus.alfresco.com/nexus/){:target="_blank"}), where the Alfresco artifacts are stored. Enterprise customers and partners can request these credentials by opening a ticket in [Hyland Community](https://community.hyland.com/){:target="_blank"}.

Once you have suitable credentials, you need to add support for Alfresco private Maven repository to your configuration. This would typically be done by adding your access credentials to the `settings.xml` contained in your `~/.m2` directory (for Linux and OS X). On Windows this resolves to `C:\Users\<username>\.m2`.

To do this, load `settings.xml` into your editor and add the following new server configuration in the `<servers>` section:

```xml
<server>
    <id>alfresco-private-repository</id>
    <username>username</username>
    <password>password</password>
</server>
```

You will need to replace the placeholder text with your real username and password as allocated by Alfresco. The id value should not be changed as it is used in the Alfresco SDK project build files to specify the Enterprise artifacts Maven repository.

It is possible to use encrypted passwords here. See the [official Maven documentation](http://maven.apache.org/guides/mini/guide-encryption.html){:target="_blank"} for details on how to do this.

At this point you have configured Maven to have access to the Alfresco Private Repository.

#### How to configure private Alfresco Docker registry {#enterprisedockerregistry}

In order to download the Docker images needed to work with Content Services Enterprise Edition it is required to configure the Alfresco private Docker registry hosted at [Quay.io](https://quay.io/){:target="_blank"}.

The first matter to consider is to ensure that you have credentials for the Alfresco private Docker registry, where the Alfresco images are stored. Customers and partners can request these credentials by opening a ticket in [Hyland Community](https://community.hyland.com/){:target="_blank"}. Once you have suitable credentials, you only need to login your docker installation to the Quay.io Docker registry:

```bash
docker login quay.io
```

At this point you have configured Docker to have access to the Alfresco private Docker registry at [Quay.io](https://quay.io/){:target="_blank"}.

#### How to set up Alfresco Transform Service {#setuptransformservice}

By default, the _Alfresco Transform Service_ (ATS) is not included in the basic configuration of the projects generated by making use of the Alfresco SDK archetypes.

ATS is only supported in Content Services Enterprise and is distributed as a composition of Docker containers. The Docker images required for ATS are available in the Alfresco private docker registry at [Quay.io](https://quay.io){:target="_blank"}.
For more information, see [How to configure private Alfresco Docker registry](#enterprisedockerregistry).

In order to properly configure ATS in a project generated using the Alfresco SDK archetypes, you'll need to execute 2 steps:

1. Add the containers that conform ATS to the Docker Compose file.
2. Configure the properties that are required to properly set up ATS.

##### Adding the new containers

* Locate the Docker Compose file (usually at `PROJECT_ROOT_PATH/docker/docker-compose.yml`) and add the container that contains the All-In-One (AIO) transformer:

```text
services:
...
  transform-core-aio:
    image: alfresco/alfresco-transform-core-aio:<AIO-VERSION>
    mem_limit: 1536m
    environment:
        JAVA_OPTS: " -XX:MinRAMPercentage=50 -XX:MaxRAMPercentage=80"
    ports:
        - 8090:8090  
  activemq:
    image: alfresco/alfresco-activemq:<ACTIVEMQ-VERSION>
    mem_limit: 1g
    ports:
        - 8161:8161 # Web Console
        - 5672:5672 # AMQP
        - 61616:61616 # OpenWire
        - 61613:61613 # STOMP
...
```

> **Note:** Make you're using compatible component versions, such as the `<AIO-VERSION>` Transformer, and `<ACTIVEMQ-VERSION>`.

* Check that you don't have any port conflict with other services in the Docker Compose file.

##### Adding the required configuration

* Locate the _Alfresco global properties_ file for docker (usually at `PROJECT_ROOT_PATH/PROJECT_ARTIFACT_ID-platform-docker/src/main/docker/alfresco-global.properties`) and add the ATS configuration properties:

```text
localTransform.core-aio.url=http://transform-core-aio:8090/
messaging.broker.url=failover:(nio://activemq:61616)?timeout=3000&jms.useCompression=true
```

* Remove the old value of the property `messaging.broker.url` in the same `alfresco-global.properties` file.

Once these 2 modifications are done, rebuild and restart all the services (`run.sh/run.bat build_start`) and Content Services will use ATS to execute remote transformations asynchronously whenever possible.

### Working with AMPs {#workingwithamps}

Since the early days of the Alfresco SDK, the Alfresco Module Packages (AMP) have been the way customizations were packaged. In the Alfresco SDK everything is packaged as a JAR by default, while the AMPs are still available as an optional assembly. This gives you much more control over packaging, and simple modules can easily be deployed as JARs.

The [Maven Assembly Plugin](http://maven.apache.org/plugins/maven-assembly-plugin/){:target="_blank"} allows you to control the final artifacts that Maven builds. You add the plugin configuration and point it to an XML file that contains the full configuration on the artifact we want to produce.

#### Building AMPs with Alfresco SDK 4

To build AMPs the SDK ships a default assembly XML file that will tell the assembly plugin how to produce an AMP file. You will find this file in `src/main/assembly/amp.xml` (in the case of All-In-One project you'll find one descriptor for the platform JAR module and another for the share JAR module). The plugin configuration is already present in your `pom.xml` file, as shown:

```xml
<plugin>
    <groupId>org.apache.maven.plugins</groupId>
    <artifactId>maven-assembly-plugin</artifactId>
    <version>2.6</version>
    <executions>
        <execution>
            <id>build-amp-file</id>
            <phase>package</phase>
            <goals>
                <goal>single</goal>
            </goals>
            <configuration>
                <appendAssemblyId>false</appendAssemblyId>
                <descriptor>src/main/assembly/amp.xml</descriptor>
            </configuration>
        </execution>
    </executions>
    <dependencies>
        <dependency>
            <groupId>org.alfresco.maven.plugin</groupId>
            <artifactId>alfresco-maven-plugin</artifactId>
            <version>${alfresco.sdk.version}</version>
        </dependency>
    </dependencies>
</plugin>
```

This section is commented out by default.

To produce both a JAR file and an AMP, remove the comments and run the `mvn package` command.

Now you have full control over how your AMPs are built. If you want to change the content of the AMP, you can change the assembly `amp.xml` and tailor it to your needs.

#### Installing AMPs with the SDK

The projects created from the Alfresco SDK archetypes are configured to deploy either JARs or AMPs to the Content Services / Share docker container. The only thing to do is modify the `pom.xml` file of the corresponding docker module / project in order to properly configure the dependencies and the Maven dependency plugin.

##### All-In-One project

1. Modify the platform JAR dependency from the file `PROJECT_ARTIFACT_ID-platform-docker/pom.xml` to set the type of dependency to `amp`:

    ```xml
    <dependencies>
        <dependency>
            <groupId>org.alfresco</groupId>
            <artifactId>sample-module-platform</artifactId>
            <version>1.0-SNAPSHOT</version>
            <type>amp</type>
        </dependency>
    </dependencies>
    ```

2. Add the `<includeTypes>amp</includeTypes>` to the `collect-extensions` execution in maven-dependency-plugin plugin build configuration in the same file:

    ```xml
    <!-- Collect extensions (JARs or AMPs) declared in this module do be deployed to docker -->
    <execution>
        <id>collect-extensions</id>
        <phase>package</phase>
        <goals>
            <goal>copy-dependencies</goal>
        </goals>
        <configuration>
            <outputDirectory>${project.build.directory}/extensions</outputDirectory>
            <includeScope>runtime</includeScope>
            <includeTypes>amp</includeTypes>
        </configuration>
    </execution>
    ```

3. Repeat these steps for the share module in the file `PROJECT_ARTIFACT_ID-share-docker/pom.xml`.

##### Platform / Share project

Modify the Maven Resource Plugin in the file `pom.xml` to set the platform / share JAR artifact to copy to `amp`:

```xml
<execution>
    <id>copy-repository-extension</id>
    <phase>package</phase>
    <goals>
        <goal>copy-resources</goal>
    </goals>
    <configuration>
        <outputDirectory>${project.build.directory}/extensions</outputDirectory>
        <resources>
            <resource>
                <directory>target</directory>
                <includes>
                    <include>${project.build.finalName}.amp</include>
                </includes>
                <filtering>false</filtering>
            </resource>
        </resources>
    </configuration>
</execution>
```

Once this configuration is in place, you simply need to rebuild and restart the project. The new configuration will make the Docker images automatically install the packaged AMPs in Content Services / Share.

#### Installing 3rd party AMPs {#installing3rdpartyamps}

Installing 3rd party AMPs to the projects is pretty simple. The only requirement is adding the dependency to the project. The default configuration installs any AMPs set as a maven dependency in the corresponding Docker image. It is important to remember that Content Services and Share are separated containers, so you'll need to add the dependency in the corresponding docker module in case of an All-In-One project.

Here is an example of how to install Florian Maul's Javascript Console.

```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns="http://maven.apache.org/POM/4.0.0"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/maven-v4_0_0.xsd">
    <modelVersion>4.0.0</modelVersion>
    <artifactId>sample-module-platform-docker</artifactId>
    <name>Alfresco Platform/Repository Docker Module</name>
    <description>Platform/Repo Docker Module to generate the final Docker image</description>
    <packaging>jar</packaging>

    <parent>
        <groupId>org.alfresco</groupId>
        <artifactId>sample-module</artifactId>
        <version>1.0-SNAPSHOT</version>
    </parent>

    <properties>
    </properties>

    <dependencies>
        <dependency>
            <groupId>org.alfresco</groupId>
            <artifactId>sample-module-platform</artifactId>
            <version>1.0-SNAPSHOT</version>
        </dependency>

        <!-- Javascript Console AMP -->
        <dependency>
            <groupId>de.fmaul</groupId>
            <artifactId>javascript-console-repo</artifactId>
            <version>0.6</version>
            <type>amp</type>
        </dependency>
    </dependencies>
    
    ...
</project>
```

Another option for installing 3rd party AMPs to the projects is to have the amps local to the project. In this approach the amp file, the amp local to the project will be copied and applied from the Docker file. To use local amp you need to:

1. Modify the `<project>-platform-docker/pom.xml`
2. Create directory: `<project>-platform-docker/src/main/docker/extensions`
3. Copy the amp file into `<project>-platform-docker/src/main/docker/extensions`

The project `Dockerfile` contains directives to apply amp to Alfresco image in the build element of `./workshop-sdk4-platform-docker/pom.xml`,
exclude *.amp in the `copy-and-filter-docker-resources` execution step:

```xml
<artifactId>maven-resources-plugin</artifactId>
<executions>
    <execution>
        <id>copy-and-filter-docker-resources</id>
        <phase>validate</phase>
        <goals>
            <goal>copy-resources</goal>
        </goals>
        <configuration>
            <outputDirectory>${project.build.directory}</outputDirectory>
            <resources>
                <resource>
                    <directory>src/main/docker</directory>
                    <filtering>true</filtering>
                    <excludes>
                        <exclude>**/*.jar</exclude>
                        <exclude>**/*.so</exclude>
                        <exclude>**/*.gz</exclude>
                        <exclude>**/*.amp</exclude>            
                    </excludes>
                </resource>
            </resources>
        </configuration>
    </execution>
```

include *.amp in the `copy-and-filter-docker-resources-non-filtered`:

```xml
<execution>
    <id>copy-and-filter-docker-resources-non-filtered</id>
    <phase>validate</phase>
    <goals>
        <goal>copy-resources</goal>
    </goals>
    <configuration>
        <outputDirectory>${project.build.directory}</outputDirectory>
        <resources>
            <resource>
                <directory>src/main/docker</directory>
                <filtering>false</filtering>
                <includes>
                    <include>**/*.jar</include>
                    <include>**/*.so</include>
                    <include>**/*.gz</include>
                    <include>**/*.amp</include>
                </includes>
            </resource>
        </resources>
    </configuration>
</execution>
```

## Controlling the order AMPs are applied

Under some specific circumstances it is necessary to apply different AMPs in a development project in a precise order. The default configuration of the projects generated using the Alfresco SDK archetypes doesn't specify any concrete order applying the AMPs to the Content Services/Share installation.

Anyway, that order can be controlled modifying slightly the configuration of the custom Docker images in the project. For instance, let's say we have three third party AMPs that we want to apply in the next order `third-party-amp-01.amp -> third-party-amp-02.amp -> third-party-amp-03.amp`. In this example, we're going to consider we need to apply them to a platform JAR module (the process would be the same for a Share module, simply changing the path of the files).

1. Follow the steps described in the section [Installing 3rd party AMPs](#installing3rdpartyamps) to include all the AMPs dependencies.
2. Locate the `Dockerfile` under the folder `src/main/docker`. In this file, there is a section that copies and applies the AMPs to the Content Services installation.

    ```bash
    # Copy Dockerfile to avoid an error if no AMPs exist
    COPY Dockerfile extensions/*.amp $TOMCAT_DIR/amps/
    RUN java -jar $TOMCAT_DIR/alfresco-mmt/alfresco-mmt*.jar install \
                  $TOMCAT_DIR/amps $TOMCAT_DIR/webapps/alfresco -directory -nobackup -force
    ```

3. Replace the `RUN` command to execute one installation of AMP each time and copy it three times, ensuring the installation is executed in the required order:

    ```bash
    # Copy Dockerfile to avoid an error if no AMPs exist
    COPY Dockerfile extensions/*.amp $TOMCAT_DIR/amps/
    # Install third-party-amp-01
    RUN java -jar $TOMCAT_DIR/alfresco-mmt/alfresco-mmt*.jar install \
                  $TOMCAT_DIR/amps/third-party-amp-01.amp $TOMCAT_DIR/webapps/alfresco -directory -nobackup -force
    # Install third-party-amp-02
    RUN java -jar $TOMCAT_DIR/alfresco-mmt/alfresco-mmt*.jar install \
                  $TOMCAT_DIR/amps/third-party-amp-02.amp $TOMCAT_DIR/webapps/alfresco -directory -nobackup -force
    # Install third-party-amp-03
    RUN java -jar $TOMCAT_DIR/alfresco-mmt/alfresco-mmt*.jar install \
                  $TOMCAT_DIR/amps/third-party-amp-03.amp $TOMCAT_DIR/webapps/alfresco -directory -nobackup -force
    ```

4. Rebuild and restart the project (use `run.bat` instead in Windows):

    ```bash
    ./run.sh build_start
    ```

At this point, you have configured your project to apply the AMPs in a specific order.

### Debugging {#debugging}

When developing add-ins, fixing bugs, or changing Alfresco from the source code, it is helpful to debug an instance of Alfresco running on a standard application server. This section outlines the steps needed to configure Alfresco and Eclipse (or IntelliJ IDEA) to provide a real-time view of the server and to troubleshoot issues by stepping through the code line by line.

Here we assume you have already generated an Alfresco project using the Alfresco SDK. If you don't have a project already, follow the steps in [Getting started with Alfresco SDK](#gettingstarted) to learn how to generate it in a few easy steps.

#### Remote debugging using Eclipse

All the projects generated using the Alfresco SDK are pre-configured to listen for remote debug connections. Depending on the selected archetypes you'll have a port for remotely debugging Content Services, share or both of them.

By default, the remote debug port for Content Services is **8888** and for share is **9898**. This configuration can be changed through the maven properties `acs.debug.port` and `share.debug.port` in the `pom.xml` file of the main project.

```xml
<!-- Environment configuration properties -->
<share.port>8180</share.port>
<share.debug.port>9898</share.debug.port>
<acs.host>${artifactId}-acs</acs.host>
<acs.port>8080</acs.port>
<acs.debug.port>8888</acs.debug.port>
```

These remote debug ports are configured in the docker compose file to be exposed by the corresponding docker containers.

```text
services:
  sample-project-share:
...
    environment:
      CATALINA_OPTS: "-agentlib:jdwp=transport=dt_socket,server=y,suspend=n,address=0.0.0.0:8888"
      REPO_HOST: sample-project-acs
      REPO_PORT: 8080
    ports:
      - "${share.port}:8080"
      - "${share.debug.port}:8888"
  sample-project-acs:
...
    environment:
      CATALINA_OPTS: "-agentlib:jdwp=transport=dt_socket,server=y,suspend=n,address=0.0.0.0:8888"
    ports:
      - "${acs.port}:8080"
      - "${acs.debug.port}:8888"
...
```

##### Configuring remote debugging using Eclipse

Here you'll see how to create and manage a configuration to remotely debug your launched Alfresco project that's waiting for a connection. This assumes you have an Eclipse IDE up and running, and have already imported the same project you are going to debug.

For more details on how to import an Alfresco project into your Eclipse IDE, see Setting up your development environment using Eclipse.

1. Open the Eclipse IDE and click on `Run Configurations` (top right).

    ![sdk-debug-eclipse-create]({% link content-services/images/sdk-debug-eclipse-create.png %})

2. Click on the green plus sign (top left) and select `Remote Java Application` to add a new configuration for a remote app.

3. Enter a descriptive name for your configuration, for example, `Sample project Content Services debug`.

    ![sdk-debug-eclipse-config]({% link content-services/images/sdk-debug-eclipse-config.png %})

4. Click Browse then locate the platform project JAR if you want to debug Content Services or the share project JAR if you want to debug share.

5. Check that your settings match the screenshot. This is a sample to debug Content Services. If you want to debug share or you have configured custom ports for remote debugging you'll need to modify that configuration. If you're working with _Docker Toolbox_ instead of _Docker Desktop_ the host to access the container won't be `localhost` but a configured _IP_ address (i.e. 192.168.99.100).

6. Click `Apply`.

    You will be taken back to the project source code.

7. Click on the bug icon and select the new configuration to run it.

    ![sdk-debug-eclipse-launch]({% link content-services/images/sdk-debug-eclipse-launch.png %})

    The IDE connects the source code to the deployed one at the docker container. Once the code is linked, you can open a browser and start using your application. In our case, we are going to test the behavior of debugging by running the sample webscript.

8. Open your browser and type `http://localhost:8080/alfresco/s/sample/helloworld`.

    This is a sample webscript generated in every project created using the SDK and the platform artifact.

    ![sdk-hellofromjava]({% link content-services/images/sdk-hellofromjava.png %})

    Now let's find the `HelloWorldWebScript.java` file in the `src/main/java/.../platformsample` folder of your project. If you're using an All-In-One project, the folder is located in the platform sub-project.

9. Edit the file using Eclipse IDE and set a breakpoint (by clicking to the left of the line number) at line:

    ```java
    model.put(“fromJava”,”HelloFromJava”);
    ```

10. Refresh the browser. Eclipse will intercept the execution at the breakpoint:

    ![sdk-debug-eclipse-breakpoint]({% link content-services/images/sdk-debug-eclipse-breakpoint.png %})

From here the management is the same as for a regular Java application using your preferred IDE. Please note that the whole Alfresco source code is available at debug time, thanks to the local maven repository.

#### Remote debugging using IntelliJ

All the projects generated using the Alfresco SDK are pre-configured to listen for remote debug connections. Depending on the selected archetypes you'll have a port for remotely debugging Content Services, share or both of them.

By default, the remote debug port for Content Services is **8888** and for share is **9898**. This configuration can be changed through the maven properties `acs.debug.port` and `share.debug.port` in the `pom.xml` file of the main project.

```xml
<!-- Environment configuration properties -->
<share.port>8180</share.port>
<share.debug.port>9898</share.debug.port>
<acs.host>${artifactId}-acs</acs.host>
<acs.port>8080</acs.port>
<acs.debug.port>8888</acs.debug.port>
```

These remote debug ports are configured in the docker compose file to be exposed by the corresponding docker containers.

```text
services:
  sample-project-share:
...
    environment:
      CATALINA_OPTS: "-agentlib:jdwp=transport=dt_socket,server=y,suspend=n,address=0.0.0.0:8888"
      REPO_HOST: sample-project-acs
      REPO_PORT: 8080
    ports:
      - "${share.port}:8080"
      - "${share.debug.port}:8888"
  sample-project-acs:
...
    environment:
      CATALINA_OPTS: "-agentlib:jdwp=transport=dt_socket,server=y,suspend=n,address=0.0.0.0:8888"
    ports:
      - "${acs.port}:8080"
      - "${acs.debug.port}:8888"
...
```

##### Configuring remote debugging using IntelliJ

Here you'll see how to create and manage a configuration to remotely debug your launched Alfresco project that's waiting for a connection. This assumes you have an IntelliJ IDEA IDE up and running, and have already imported the same project you are going to debug.

For more details on how to import an Alfresco project into your IntelliJ IDEA IDE, see Setting up your development environment using Intellij IDEA.

1. Open the IntelliJ IDEA IDE and click on `Add/Edit Configurations` (top right).

    ![sdk-debug-intellij-create]({% link content-services/images/sdk-debug-intellij-create.png %})

2. Click on the plus icon (top left) and select `Remote` to add a new configuration for a remote app.

3. Enter a descriptive name for your configuration, for example, `Sample project Content Services debug`.

    ![sdk-debug-intellij-config]({% link content-services/images/sdk-debug-intellij-config.png %})

4. Check that your settings match the screenshot. This is a sample to debug Content Services. If you want to debug share or you have configured custom ports for remote debugging you'll need to modify that configuration. If you're working with _Docker Toolbox_ instead of _Docker Desktop_ the host to access the container won't be `localhost` but a configured _IP_ address (i.e. 192.168.99.100).

5. Click `OK`.

    You will be taken back to the project source code.

6. Click on the `Edit Configurations` dropdown box and select the new configuration to run it.

    ![sdk-debug-intellij-launch]({% link content-services/images/sdk-debug-intellij-launch.png %})

    The IDE connects the source code with the deployed one at the docker container. Once the code is linked, you can open a browser and start using your application. In our case, we are going to test the behavior of debugging by running the sample webscript.

7. Open your browser and type `http://localhost:8080/alfresco/s/sample/helloworld`.

    This is a sample webscript generated in every project created using the SDK and the platform artifact.

    ![sdk-hellofromjava]({% link content-services/images/sdk-hellofromjava.png %})

    Now let's find the `HelloWorldWebScript.java` file in the `src/main/java/.../platformsample` folder of your project. If you're using an All-In-One project, the folder is located in the platform sub-project.

8. Edit the file using IntelliJ IDEA IDE and set a breakpoint (by clicking to the left of the line number) at line:

    ```java
    model.put(“fromJava”,”HelloFromJava”);
    ```

9. Refresh the browser. IntelliJ IDEA will intercept the execution at the breakpoint:

    ![sdk-debug-intellij-breakpoint]({% link content-services/images/sdk-debug-intellij-breakpoint.png %})

From here the management is the same as for a regular Java application using your preferred IDE. Please note that the whole Alfresco source code is available at debug time, thanks to the local maven repository.

### SDK integration testing

_"Integration testing is the phase in software testing where individual software modules are combined and tested as a group. It occurs after unit testing and before validation testing. Integration testing takes as its input modules that have been unit tested, groups them in larger aggregates, applies tests defined in an integration test plan to those aggregates, and delivers as its output the integrated system ready for system testing." [Wikipedia]._

Even if the definition of integration testing is a general description, the concept is also valid for Alfresco projects. The Alfresco SDK 4.x keeps the same general idea of integration testing provided by SDK 3.0, but this new version reshapes it slightly to leverage on a Docker-oriented environment.

Here are the basics to understanding and using integration testing in the context of projects created with the SDK, from a technical perspective:

* SDK 4.x develops integration tests for the platform only. Currently, the integration tests that the SDK is able to manage by default is related to Content Services (Content Services) only.
* Integration tests require a Content Services instance to be up and running. You will see that all the scripts and commands are designed to easily manage this requirement, but the prerequisite for the SDK is that a Content Services instance is available.
* If you're running a project created with a Platform JAR archetype, integration tests are not provided by default. However, you can copy them from your All-In-One project.

#### How SDK's integration tests work

The Alfresco SDK's integration tests are primarily supported by a utility module included in the SDK called [Alfresco Rapid Application Development](https://github.com/Alfresco/alfresco-sdk/tree/master/modules/alfresco-rad){:target="_blank"} (alfresco-rad). This module basically enables the execution of the integration tests within the context of a running Alfresco Content Services (Content Services) instance.

##### Alfresco Rapid Application Development (Alfresco RAD)

The Alfresco RAD is an Alfresco module which main functionality is offering the ability to execute integration tests in a real Content Services context. The core classes
that conforms the Alfresco RAD module are:

* [AlfrescoTestRunner](https://github.com/Alfresco/alfresco-sdk/blob/master/modules/alfresco-rad/src/main/java/org/alfresco/rad/test/AlfrescoTestRunner.java){:target="_blank"}. A JUnit test runner that is designed to work with a Content Services instance. It detects if it's executing a test inside of a running Content Services instance. If that is the case the tests are all run normally. If the test is being run from outside the repository, then, instead of running the actual test, an HTTP request is made to a Web Script (`RunTestWebScript`) in a running Alfresco instance.
* [RunTestWebScript](https://github.com/Alfresco/alfresco-sdk/blob/master/modules/alfresco-rad/src/main/java/org/alfresco/rad/test/RunTestWebScript.java){:target="_blank"}. This Web Script works in consort with the `AlfrescoTestRunner`. When a test is run from outside the repository, the Alfresco test runner sends a proxied request to perform the test to this script. This runs the test and wraps the results up so that the test initiator can be fooled into thinking they are running the tests locally.
* [AbstractAlfrescoIT](https://github.com/Alfresco/alfresco-sdk/blob/master/modules/alfresco-rad/src/main/java/org/alfresco/rad/test/AbstractAlfrescoIT.java){:target="_blank"}. Abstract integration test class that gives access to the Alfresco Spring Application context and the `ServiceRegistry` that should be used when accessing Alfresco Services.
* [Remote](https://github.com/Alfresco/alfresco-sdk/blob/master/modules/alfresco-rad/src/main/java/org/alfresco/rad/test/Remote.java){:target="_blank"}. The `AlfrescoTestRunner` class has to determine where the Content Services instance endpoint is exposed to send the proxied request to the `RunTestWebScript`. It uses, in order, the next three mechanisms:

  * The `Remote` annotation. If the test is annotated with `@Remote`, then it uses the `endpoint` property to determine the Content Services endpoint.
  * The `acs.endpoint.path` Java system property. If the Java system property is set, then its value is used as the Content Services endpoint.
  * A default value. If none of the previous mechanisms returned a value, then the default value `http://localhost:8080/alfresco` is used.

In summary, if you want to execute your integration tests inside an existing Content Services instance, you'll need to annotate them with the JUnit `RunWith` annotation and set the value to `AlfrescoTestRunner.class`. If you want to customize the default Content Services endpoint location, you can either annotate your tests with `Remote` or set the Java system property `acs.endpoint.path`.

##### Integration tests configuration in the All-In-One project

So, taking into account the previous section, let's see how the integration tests are configured in a project generated from the SDK All-In-One archetype.

* The maven dependencies required to execute the integration tests are deployed to the Content Services Docker image in the `PROJECT_ARTEFACTID-platform-docker` maven module using the `maven-dependency-plugin`. The configuration is done in the file `PROJECT_ARTEFACTID-platform-docker/pom.xml`:

    ```xml
    <plugin>
        <groupId>org.apache.maven.plugins</groupId>
        <artifactId>maven-dependency-plugin</artifactId>
        <executions>
            <!-- Copy the repository extension and the dependencies required for execute integration tests -->
            <execution>
                <id>copy-repo-extension</id>
                <phase>pre-integration-test</phase>
                <goals>
                    <goal>copy</goal>
                </goals>
                <configuration>
                    <artifactItems>
                        ...
                        <!-- Test dependencies -->
                        <!-- We need these dependencies installed in Content Services in order to execute the test remotely making use of the Alfresco RAD module -->
                        <artifactItem>
                            <groupId>org.alfresco.maven</groupId>
                            <artifactId>alfresco-rad</artifactId>
                            <version>${alfresco.sdk.version}</version>
                            <overWrite>false</overWrite>
                            <outputDirectory>${project.build.directory}/extensions</outputDirectory>
                        </artifactItem>
                        <artifactItem>
                            <groupId>org.alfresco</groupId>
                            <artifactId>PROJECT_ARTEFACTID-integration-tests</artifactId>
                            <version>1.0-SNAPSHOT</version>
                            <classifier>tests</classifier>
                            <overWrite>false</overWrite>
                            <outputDirectory>${project.build.directory}/extensions</outputDirectory>
                        </artifactItem>
                        <artifactItem>
                            <groupId>junit</groupId>
                            <artifactId>junit</artifactId>
                            <version>4.12</version>
                            <overWrite>false</overWrite>
                            <outputDirectory>${project.build.directory}/extensions</outputDirectory>
                        </artifactItem>
                        <artifactItem>
                            <groupId>org.mockito</groupId>
                            <artifactId>mockito-all</artifactId>
                            <version>1.9.5</version>
                            <overWrite>false</overWrite>
                            <outputDirectory>${project.build.directory}/extensions</outputDirectory>
                        </artifactItem>
                        <artifactItem>
                            <groupId>org.apache.httpcomponents</groupId>
                            <artifactId>httpclient</artifactId>
                            <version>4.5.2</version>
                            <overWrite>false</overWrite>
                            <outputDirectory>${project.build.directory}/extensions</outputDirectory>
                        </artifactItem>
                    </artifactItems>
                </configuration>
            </execution>
            ...
        </executions>
    </plugin>
    ```

* The `integration-tests` maven module include the definition of all the integration test classes to be executed against the existing Content Services instance. The test classes are included in the folder `integration-tests/src/test/java`.
* The `integration-tests` maven `pom.xml` file adds the configuration of the `acs.endpoint.path` in case it is required. This is done using the `maven-failsafe-plugin`:

    ```xml
    <plugin>
        <groupId>org.apache.maven.plugins</groupId>
        <artifactId>maven-failsafe-plugin</artifactId>
        <configuration>
            <systemPropertyVariables>
                <acs.endpoint.path>${test.acs.endpoint.path}</acs.endpoint.path>
            </systemPropertyVariables>
        </configuration>
    </plugin>
    ```

    This is specially useful when the Content Services endpoint is not exposed at the default location (`http://localhost:8080/alfresco`). This property is important when the
    development environment is run using Docker Toolbox (old Windows and MacOS versions). In this case, the container exposed ports are not mapped to `localhost`, but to a custom IP provided by the Virtual Box virtual machine (i.e. `http://192.168.99.100:8080/alfresco`).

* The All-In-One project utility scripts (`run.sh` / `run.bat`) offer two different tasks to execute the integration tests:
  * `build_test`. It builds the whole project, recreates the Content Services and Share docker images, starts the dockerized environment, executes the integration tests from the `integration-tests` module and stops the environment.
  * `test`. It simply executes the integration tests (the environment must be already started).

##### Sample tests included in the generated project

The All-In-One archetype includes some basic integration tests that demonstrate the way you can implement the integration tests of your custom module.

###### `CustomContentModelIT`: Checking the correct existence and setup of a custom model

This integration test verifies the existence of the `{http://www.acme.org/model/content/1.0}contentModel` in the Content Services instance. It also creates a new node in the repository with the following features:

* The node is named `AcmeFile.txt`.
* The node type is set to `{http://www.acme.org/model/content/1.0}document`.
* The node property `securityClassification` is set to `Company Confidential`.
* The aspect `cm:titled` is added to the new node.

Once created, some Java assertions are raised to check the correct definition of the node. As a last task, the node is deleted from the repository to clean the environment.

###### `DemoComponentIT`: Checking the Content Services DemoComponent component

This integration test verifies the existence of the `DemoComponent` component deployed in the Content Services instance. You can find the definition of the `DemoComponent` as a custom component of a project created with the All-In-One archetype. For more details, see the class definition in `PROJECT_ARTEFACTID-platform/src/main/java/com/example/platformsample/DemoComponent.java`.

The integration test retrieves the `DemoComponent` bean from the Content Services instance (see `testGetCompanyHome()`), and requests the Company Home component. In addition, some Java assertions check if Company Home is identified correctly and has seven children stored in it.

###### `HelloWorldWebScriptIT`: Checking the Content Services helloworld webscript

This integration test is the simplest one, and verifies the existence and the response of the `helloworld` web script in the Content Services instance. The test invokes the web script at the URL `http://localhost:8080/alfresco/service/sample/helloworld` and checks the response using some Java assertions.

#### How to run SDK's integration tests

Running the integration tests of a project generated from the Alfresco SDK archetypes is pretty easy. Let's distinguish different cases of executing the integration tests.

##### Command line

If you want to run the integration tests from the command line you'll have to use the utility scripts provided by all the projects generated from the archetypes. These are `run.sh` if you're on Unix systems or `run.bat` if you're on Windows systems.

If you want to spin up a new dockerized environment with Content Services, run the integration tests and stop that environment, you'll use the `build_test` goal:

```bash
./run.sh build_test
```

If you want all your previous data in the docker environment to be wiped out before the execution of the integration tests, remember to call the `purge` goal
before the `build_test` goal:

```bash
./run.sh purge
./run.sh build_test
```

The `build_test` goal will execute the next list of tasks:

* Stop any previous execution of the dockerized environment.
* Compile all the source code.
* Rebuild the custom Docker images of the project.
* Start a new dockerized environment.
* Execute the integration tests.
* Show the logs of the docker containers during the tests execution.
* Stop the dockerized environment.

If your dockerized environment is already started and you simply want to execute the integration tests against that existing Content Services instance, then use the `test`
goal:

```bash
./run.sh test
```

##### Configuring a custom Content Services endpoint location

If you want to run your integration tests against a Content Services instance not exposed in `http://localhost:8080/alfresco` you'll need to modify a maven property before executing the tests.

The maven property for the test Content Services instance endpoint location is `acs.endpoint.path` and you can configure it in the `pom.xml` file in the root folder of your project:

```xml
<properties>
    ...
    <test.acs.endpoint.path>http://192.168.99.100:8080/alfresco</test.acs.endpoint.path>
    ...
</properties>
```

This parameter is **specially important** if you're running your dockerized environment using [Docker Toolbox](https://docs.docker.com/toolbox/){:target="_blank"} instead of [Docker Desktop](https://www.docker.com/products/docker-desktop){:target="_blank"}. If that is the case, then the Docker container exposed ports are not mapped in the hosted machine as `localhost` but as an assigned IP address (i.e. `192.168.99.100`).

##### Eclipse IDE

If your project is available in Eclipse, you can easily run one or more of the integration tests directly from your IDE.

To run the integration tests:

1. In order to properly execute the integration tests the dockerized environment must be already up and running with IT support. So, before executing the tests you must run the `build_start_it_supported` or the `start` goal of the `run` script.
2. Open the project using the IDE.
3. Select the classes for the integration tests (either one, some, or the whole package).
4. Right click and select `Run As ...`, then click `JUnit Test`.

![sdk-it-eclipse-run]({% link content-services/images/sdk-it-eclipse-run.png %})

Once the tests have completed (typically, after a few seconds), the results are presented.

![sdk-it-eclipse-results]({% link content-services/images/sdk-it-eclipse-results.png %})

When using an IDE, the source code related to the integration tests is the one deployed directly on the platform side. This means that an update in the code for the Java classes will be included when you run the integration tests _if and only if_ they are deployed in the platform. To avoid stopping/starting Content Services with every change, use **hot reloading** as the only way to deploy the new version of the Java classes. For more details, see
[JRebel](#hotreloadingjrebel) / [HotSwapAgent](#hotreloadinghotswapagent) Hot reloading.

##### IntelliJ IDEA IDE

If your project is available in IntelliJ IDEA, you can easily run one or more of the integration tests directly from your IDE.

To run the integration tests:

1. In order to properly execute the integration tests the dockerized environment must be already up and running with IT support. So, before executing the tests you must run the `build_start_it_supported` or the `start` goal of the `run` script.
2. Open the project using the IDE.
3. Select the classes for the integration tests (either one, some, or the whole package).
4. Right click and select `Run Tests`.

![sdk-it-intellij-run]({% link content-services/images/sdk-it-intellij-run.png %})

Once the tests have completed (typically, after a few seconds), the results are presented.

![sdk-it-intellij-results]({% link content-services/images/sdk-it-intellij-results.png %})

When using an IDE, the source code related to the integration tests is the one deployed directly on the platform side. This means that an update in the code for the Java classes will be included when you run the integration tests _if and only if_ they are deployed in the platform. To avoid stopping/starting Content Services with every change, use **hot reloading** as the only way to deploy the new version of the Java classes. For more details, see
[JRebel](#hotreloadingjrebel) / [HotSwapAgent](#hotreloadinghotswapagent) Hot reloading.

### Hot reloading

Hot reloading in a Java project is the ability to avoid the infamous _change > restart and wait > check_ development lifecycle. This allows you to modify your application's code, and view the changes without having to restart Content Services / Alfresco Share. You can potentially gain significant savings in development time that would otherwise be wasted rebuilding the Docker images and restarting the Docker containers.

Hot reloading is a well known behavior in several other languages (C# for example), and the most practical and fast lifecycle like Save&Reload should be possible. Hot reloading is the key to enabling [Rapid Application Development (RAD)](https://en.wikipedia.org/wiki/Rapid_application_development){:target="_blank"} and [Test Driven Development (TDD)](https://en.wikipedia.org/wiki/Test-driven_development){:target="_blank"}.

Since the Java 1.4 JVM, the Debugger API allowed debuggers to update class bytecode in place, using the same class identity. This meant that all objects could refer to an updated class and execute new code when their methods were called, preventing the need to reload a container whenever class bytecode was changed. All modern IDEs support it, including Eclipse, IntelliJ IDEA, and NetBeans. Since Java 5, this functionality has also been available directly to Java applications through the [Instrumentation API](http://docs.oracle.com/javase/6/docs/technotes/guides/instrumentation/index.html){:target="_blank"}.

In the Alfresco development lifecycle hot reloading is possible as in every other Java project (and with the same limitations). You can manage a project created with the Alfresco SDK using hot reloading through two different tools:

* [JRebel](#hotreloadingjrebel)
* [HotSwapAgent](#hotreloadinghotswapagent)

Both have advantages and disadvantages, so it's up to you to make the right choice for your needs. [JRebel](https://www.jrebel.com/products/jrebel/){:target="_blank"} is a commercial product while [HotSwapAgent](http://hotswapagent.org/index.html){:target="_blank"} is open source. Both products can reload classes and web resources. However, JRebel is more powerful than HotSwapAgent and can also reload changes to the Spring XML context files, for example.

#### How to configure and use JRebel {#hotreloadingjrebel}

[JRebel](https://www.jrebel.com/products/jrebel/){:target="_blank"} is the agent that enables you to do hot reloading. This allows you to modify the application code, and view the changes without having to restart Alfresco Tomcat (or the Content Services Docker container).

A prerequisite to this tutorial is having an Alfresco project created with Alfresco SDK, using the All-In-One archetype, or the Platform JAR archetype. It's worth noting that hot reloading is only supported on the platform, and not in Alfresco Share.

An open source and free of charge alternative to JRebel is HotSwapAgent. For more details, see the [HotSwapAgent website](http://hotswapagent.org/index.html){:target="_blank"}.

JRebel can be installed in several ways: for example, using an IDE or in "standalone" mode. Various IDEs are supported, including Eclipse and IntelliJ. The standalone installation is useful if you want to use hot reloading from the command line.

##### Installing JRebel standalone (from the command line)

1. Download JRebel in standalone mode and unpack it in your preferred location.
2. Run the activate-gui.sh script to activate your installation.

_Note that a license is required. In this step you will be able to request a trial license._

##### Installing JRebel using Eclipse IDE

1. Open Eclipse and go to `Help > Eclipse Marketplace`.

2. Search for JRebel and select Install.

3. Restart Eclipse to complete the installation.

4. Select `Help > JRebel > Activation` to activate your installation.

    > **Note** that a license is required. In this step you will be able to request a trial license.

5. Select `Help > JRebel > Configuration > Remote servers` to add a new remote server.

6. Give a descriptive name to the new server and set the `Server URL` as `http://localhost:8080/alfresco`.

    ![sdk-jrebel-eclipse-server]({% link content-services/images/sdk-jrebel-eclipse-server.png %})

7. Select the checkbox to enable the server synchronisation and the checkbox to `Synchronize on build`.

    ![sdk-jrebel-eclipse-servers]({% link content-services/images/sdk-jrebel-eclipse-servers.png %})

8. Select `Help > JRebel > Configuration > Projects` and select the checkbox to enable JRebel and the remote server support for required projects (the complete project in case of the Platform Jar archetype or the `PROJECT_ARTIFACT_ID-platform` and `PROJECT_ARTEFACTID-integration-tests` modules in case of the All-In-One archetype).

    ![sdk-jrebel-eclipse-projects]({% link content-services/images/sdk-jrebel-eclipse-projects.png %})

##### Installing JRebel using IntelliJ IDEA

1. Open IntelliJ and go to `Preferences > Plugins`.

2. Search for JRebel and select Install.

3. Restart IntelliJ to complete the installation.

4. Select `Preferences > JRebel > JRebel License` to activate your installation.

    > **Note** that a license is required. In this step you will be able to request a trial license._

5. Select `Preferences > JRebel > Remote Servers` to add a new remote server.

6. Give a descriptive name to the new server and set the `Server URL` as `<http://localhost:8080/alfresco>.

    ![sdk-jrebel-intellij-server]({% link content-services/images/sdk-jrebel-intellij-server.png %})

7. Select the checkbox to enable the server synchronisation and the checkbox to `Synchronize on build`.

    ![sdk-jrebel-intellij-servers]({% link content-services/images/sdk-jrebel-intellij-servers.png %})

8. Open the JRebel Panel and select the checkbox to enable JRebel and the remote server support for required projects (the complete project in case of the Platform Jar archetype or the `PROJECT_ARTIFACT_ID-platform` and `PROJECT_ARTEFACTID-integration-tests` modules in case of the All-In-One archetype).

    ![sdk-jrebel-intellij-projects]({% link content-services/images/sdk-jrebel-intellij-projects.png %})

##### Configuring JRebel in the project

By default, JRebel is not set up in the projects generated by making use of the Alfresco SDK archetypes. So, in order to enable it, you'll need to follow the next steps:

1. Once JRebel is activated, copy `JREBEL_BASE_DIR/jrebel.jar` and `JREBEL_BASE_DIR/lib/libjrebel64.so` to `PROJECT_ARTIFACT_ID-platform-docker/src/main/docker` folder in case of the All-In-One archetype or `PROJECT_ARTIFACT_ID/src/main/docker` folder in case of the Platform Jar archetype.
2. Modify the file `PROJECT_ARTIFACT_ID-platform-docker/src/main/docker/Dockerfile` to copy the JRebel files into the platform container:

    ```bash
    # Hot reload - JRebel
    COPY jrebel.jar /jrebel.jar
    COPY libjrebel64.so /libjrebel64.so
    ```

3. Modify the file `docker/docker-compose.yml` to change the `CATALINA_OPTS` environment property to use the JRebel agent and the remote plugin. Add the command to avoid executing Tomcat with the Security Manager enabled (it makes the hot reloading tools to fail):

    ```text
    sample-project-acs:
        image: alfresco-content-services-sample-project:development
        build:
          dockerfile: ./Dockerfile
          context: ../../../sample-project-platform-docker/target
        environment:
          CATALINA_OPTS: "-agentlib:jdwp=transport=dt_socket,server=y,suspend=n,address=8888 -agentpath:/libjrebel64.so -Drebel.remoting_plugin=true"
        command: ["catalina.sh", "run"]
        ports:
          - "${acs.port}:8080"
          - "${acs.debug.port}:8888"
        volumes:
          - alf-acs-volume:/usr/local/tomcat/alf_data
        depends_on:
          - sample-project-postgres
    ```

##### Reloading changes in source code

1. Rebuild and restart the whole project (`run.sh/run.bat build_start`).

    You'll recognize JRebel is working when you see similar log messages:

    ```text
    2023-06-27 15:28:12 JRebel:  Starting logging to file: /home/alfresco/.jrebel/jrebel.log
    2023-06-27 15:28:12 JRebel:  
    2023-06-27 15:28:12 JRebel:  #############################################################
    2023-06-27 15:28:12 JRebel:  
    2023-06-27 15:28:12 JRebel:  JRebel Agent 7.0.8 (999999999999)
    2023-06-27 15:28:12 JRebel:  (c) Copyright ZeroTurnaround AS, Estonia, Tartu.
    2023-06-27 15:28:12 JRebel:  
    2023-06-27 15:28:12 JRebel:  Over the last 2 days JRebel prevented
    2023-06-27 15:28:12 JRebel:  at least 1 redeploys/restarts saving you about 0 hours.
    2023-06-27 15:28:12 JRebel:  
    2023-06-27 15:28:12 JRebel:  Licensed to XXXX XXXX (XXXX)
    2023-06-27 15:28:12 JRebel:  
    2023-06-27 15:28:12 JRebel:  License type: evaluation
    2023-06-27 15:28:12 JRebel:  Valid from: XXX 99, 9999
    2023-06-27 15:28:12 JRebel:  Valid until: XXX 99, 9999
    2023-06-27 15:28:12 JRebel:  
    2023-06-27 15:28:12 JRebel:  You are using an EVALUATION license.
    2023-06-27 15:28:12 JRebel:  Days left until license expires: 99
    2023-06-27 15:28:12 JRebel:  
    2023-06-27 15:28:12 JRebel:  To extend your evaluation or purchase a license,
    2023-06-27 15:28:12 JRebel:  contact sales@zeroturnaround.com.
    2023-06-27 15:28:12 JRebel:  
    2023-06-27 15:28:12 JRebel:  If you think this is an error, contact support@zeroturnaround.com.
    2023-06-27 15:28:12 JRebel:  
    2023-06-27 15:28:12 JRebel:  
    2023-06-27 15:28:12 JRebel:  #############################################################
    ```

2. Before making any changes, let's run the sample webscript by opening your browser and typing `http://localhost:8080/alfresco/s/sample/helloworld`.

    This is a sample webscript generated in every project created using SDK 4.0 and the platform artifact.

    ![sdk-hellofromjava]({% link content-services/images/sdk-hellofromjava.png %})

3. Locate `HelloWorldWebScript.java` in the `src/main/java/.../platformsample` folder of your project (If you are using an All-In-One project, the folder is located in the platform sub-project).

4. Edit it using your preferred editor and change the code so that `HelloFromJava` becomes `HelloFromMe`:

    ```java
    model.put(“fromJava”,”HelloFromMe”);
    ```

5. Save the file and compile the Java class (using your preferred IDE or the `mvn compile` command).

    A number of log messages appear in the Alfresco project terminal, for example:

    ```text
    ... JRebel: Reloading class 'com.example.platformsample.HelloWorldWebScript'.
    ... JRebel: Reconfiguring bean 'webscript.alfresco.tutorials.helloworld.get' 
    [com.example.platformsample.HelloWorldWebScript]
    ```

6. Refresh the browser to see the updated message:

    ![sdk-hellofromme]({% link content-services/images/sdk-hellofromme.png %})

By changing the code and compiling it again, the changes have been dynamically received from Content Services.

#### How to configure and use Hotswap Agent {#hotreloadinghotswapagent}

[HotSwapAgent](http://hotswapagent.org/index.html){:target="_blank"} is the agent that enables you to do hot reloading. This allows you to modify the application code, and view the changes without having to restart Alfresco Tomcat (or the Content Services Docker container).

A prerequisite for this tutorial is to have a project created with the Alfresco SDK, using the All-In-One archetype or the Platform JAR archetype. It's worth noting that hot reloading is only supported on the platform, and not in Alfresco Share.

As an alternative to the HotSwapAgent you can also try out JRebel. It has more features but isn't free.

The way to configure HotSwapAgent in case of using Java 11 or Java 17 is pretty different. By default, Content Services 6.1+ uses Java 11 and Content Services 7.3+ uses Java 17.

##### Issue with Docker Toolbox

It's worth noting that the HotSwapAgent's hot reloading mechanism is not working for [Docker Toolbox](https://docs.docker.com/toolbox/toolbox_install_windows/){:target="_blank"} at the moment. Docker Toolbox is for older Mac and Windows systems that do not meet the requirements of [Docker for Mac](https://docs.docker.com/docker-for-mac/){:target="_blank"} and [Docker for Windows](https://docs.docker.com/docker-for-windows/){:target="_blank"}.

This is due to an issue with the component used by HotSwapAgent to notify the changes in the compiled class files. HotSwapAgent uses the class
[WatcherNIO2.java](https://github.com/HotswapProjects/HotswapAgent/blob/master/hotswap-agent-core/src/main/java/org/hotswap/agent/watch/nio/WatcherNIO2.java){:target="_blank"} to watch for the changes in the `extraClasspath` folder. That class is based on the Java class [WatchDir.java](https://docs.oracle.com/javase/tutorial/essential/io/examples/WatchDir.java){:target="_blank"} that, in Linux systems, is implemented using [inotify](https://man7.org/linux/man-pages/man7/inotify.7.html){:target="_blank"}. It seems that inotify is not working properly with mounted volumes over Docker Toolbox (which internally uses VirtualBox).

You can track the evolution of this issue [here](https://github.com/moby/moby/issues/18246){:target="_blank"}.

##### Configuring HotSwapAgent in the project (Java 8)

1. Modify the file `PROJECT_ARTIFACT_ID-platform-docker/src/main/docker/Dockerfile` to copy the HotSwapAgent configuration file into the Content Services container classpath:

    ```bash
    # Hot reload - Hotswap agent
    COPY hotswap-agent.properties $TOMCAT_DIR/webapps/alfresco/WEB-INF/classes
    ```

2. Modify the file `PROJECT_ARTIFACT_ID-platform-docker/src/main/docker/Dockerfile` to append the commands to install and configure [DCEVM](http://dcevm.github.io/){:target="_blank"} and the HotSwapAgent java agent in the Content Services container:

    ```bash
    # Download and Install the more capable DCEVM, which will allow more changes to classes, such as new methods
    RUN mkdir -p dcevm \
        && curl -L -o dcevm/DCEVM-8u181-installer.jar "https://github.com/dcevm/dcevm/releases/download/light-jdk8u181%2B2/DCEVM-8u181-installer-build2.jar" \
        && cd dcevm \
        && jar -xvf DCEVM-8u181-installer.jar \
        && cp linux_amd64_compiler2/product/libjvm.so /usr/java/default/jre/lib/amd64/server
    
    # Download HotSwap Agent - it is used in the Docker Compose file.
    RUN cd /usr/local/tomcat \
        && mkdir -p hotswap-agent \
        && curl -L -o lib/hotswap-agent-1.3.0.jar "https://github.com/HotswapProjects/HotswapAgent/releases/download/RELEASE-1.3.0/hotswap-agent-1.3.0.jar"
    ```

3. Modify the file `docker/docker-compose.yml` to change the Content Services container `CATALINA_OPTS` environment property to use the HotSwap java agent:

    ```text
      sample-project-acs:
        image: alfresco-content-services-sample-project:development
        build:
          dockerfile: ./Dockerfile
          context: ../../../sample-project-platform-docker/target
        environment:
          CATALINA_OPTS: "-agentlib:jdwp=transport=dt_socket,server=y,suspend=n,address=8888 -javaagent:/usr/local/tomcat/lib/hotswap-agent-1.3.0.jar"
    ...
    ```

4. Modify the file `docker/docker-compose.yml` to change the Content Services container command to avoid the execution of Tomcat with the Security Manager enabled (it makes the hot reloading tools fail):

    ```text
      sample-project-acs:
        image: alfresco-content-services-sample-project:development
        build:
          dockerfile: ./Dockerfile
          context: ../../../sample-project-platform-docker/target
        environment:
          CATALINA_OPTS: "-agentlib:jdwp=transport=dt_socket,server=y,suspend=n,address=8888 -javaagent:/usr/local/tomcat/lib/hotswap-agent-1.3.0.jar"
        command: ["catalina.sh", "run"]
    ...
    ```

5. Modify the file `docker/docker-compose.yml` to mount the target folders into the folder `/usr/local/tomcat/hotswap-agent` inside the Content Services container:

    ```text
      sample-project-acs:
        image: alfresco-content-services-sample-project:development
        build:
          dockerfile: ./Dockerfile
          context: ../../../sample-project-platform-docker/target
        environment:
          CATALINA_OPTS: "-agentlib:jdwp=transport=dt_socket,server=y,suspend=n,address=8888 -javaagent:/usr/local/tomcat/lib/hotswap-agent-1.3.0.jar"
        command: ["catalina.sh", "run"]
        ports:
          - "${acs.port}:8080"
          - "${acs.debug.port}:8888"
        volumes:
          - alf-acs-volume:/usr/local/tomcat/alf_data
          - ../../../sample-project-platform/target/classes:/usr/local/tomcat/hotswap-agent/sample-project-platform/target/classes
          - ../../../sample-project-integration-tests/target/test-classes:/usr/local/tomcat/hotswap-agent/sample-project-integration-tests/target/test-classes
    ...
    ```

For more information about HotSwapAgent configuration for Java 8, check the [HotSwapAgent documentation](http://hotswapagent.org/mydoc_quickstart.html){:target="_blank"}.

##### Configuring HotSwapAgent in the project (Java 11)

Using Java 11 and HotSwapAgent, it isn't necessary to configure the java agent and the alternative JVM as in previous versions. Instead, it is required to use an alternative pre-built JDK distribution. That JDK is based on OpenJDK and includes all the required modifications to run the HotSwapAgent properly.

In the context of the Alfresco SDK, this change is an issue because the JDK installation is inherited from the [Alfresco java docker image](https://github.com/Alfresco/alfresco-docker-base-java){:target="_blank"}. It is necessary to modify the project Content Services docker image to change the default java installation of the container's OS to the one provided by HotSwapAgent.

A way to implement the required modifications would be:

1. Download the last release of the Trava OpenJDK (Linux distribution) from [here](https://github.com/TravaOpenJDK/trava-jdk-11-dcevm/releases){:target="_blank"} and save it into the folder `PROJECT_ARTIFACT_ID-platform-docker/src/main/docker`.

2. Modify the file `PROJECT_ARTIFACT_ID-platform-docker/src/main/docker/Dockerfile` to append the commands required to install and configure the custom JDK for the HotSwapAgent:

    ```bash
    # HOTSWAP AGENT
    # Install and configure Trava OpenJDK (OpenJDK pre-built with DCEVM and hotswap agent for Java 11)
    COPY trava-jdk-11-dcevm.tar.gz $TOMCAT_DIR
    RUN tar -xvf $TOMCAT_DIR/trava-jdk-11-dcevm.tar.gz -C /usr/java/ && \
        rm $TOMCAT_DIR/trava-jdk-11-dcevm.tar.gz && \
        alternatives --install /usr/bin/java java /usr/java/dcevm-11.0.1+7/bin/java 40000 && \
        alternatives --install /usr/bin/javac javac /usr/java/dcevm-11.0.1+7/bin/javac 40000 && \
        alternatives --install /usr/bin/jar jar /usr/java/dcevm-11.0.1+7/bin/jar 40000 && \
        alternatives --set java /usr/java/dcevm-11.0.1+7/bin/java && \
        alternatives --set javac /usr/java/dcevm-11.0.1+7/bin/javac && \
        alternatives --set jar /usr/java/dcevm-11.0.1+7/bin/jar && \
        ln -sfn /usr/java/dcevm-11.0.1+7 /usr/java/latest && \
        ln -sfn /usr/java/dcevm-11.0.1+7 /usr/java/default
    ```

3. Modify the file `PROJECT_ARTIFACT_ID-platform-docker/src/main/docker/Dockerfile` to copy the HotSwapAgent configuration file into the Content Services container classpath:

    ```bash
    # Copy the configuration properties file in the classpath
    COPY hotswap-agent.properties $TOMCAT_DIR/webapps/alfresco/WEB-INF/classes
    ```

4. Modify the file `docker/docker-compose.yml` to change the Content Services container command to avoid the execution of Tomcat with the Security Manager enabled (it makes the hot reloading tools fail):

    ```text
      sample-project-acs:
        image: alfresco-content-services-sample-project:development
        build:
          dockerfile: ./Dockerfile
          context: ../../../sample-project-platform-docker/target
        environment:
          CATALINA_OPTS: "-agentlib:jdwp=transport=dt_socket,server=y,suspend=n,address=8888"
        command: ["catalina.sh", "run"]
    ...
    ```

5. Modify the file `docker/docker-compose.yml` to mount the target folders into the folder `/usr/local/tomcat/hotswap-agent` inside the Content Services container:

    ```text
      sample-project-acs:
        image: alfresco-content-services-sample-project:development
        build:
          dockerfile: ./Dockerfile
          context: ../../../sample-project-platform-docker/target
        environment:
          CATALINA_OPTS: "-agentlib:jdwp=transport=dt_socket,server=y,suspend=n,address=8888"
        command: ["catalina.sh", "run"]
        ports:
          - "${acs.port}:8080"
          - "${acs.debug.port}:8888"
        volumes:
          - alf-acs-volume:/usr/local/tomcat/alf_data
          - ../../../sample-project-platform/target/classes:/usr/local/tomcat/hotswap-agent/sample-project-platform/target/classes
          - ../../../sample-project-integration-tests/target/test-classes:/usr/local/tomcat/hotswap-agent/sample-project-integration-tests/target/test-classes
    ...
    ```

Instead of downloading the Trava OpenJDK distribution file and copying it to the container, the Dockerfile script could include directly the download of the file (via `curl` for instance), but that would slow down the creation of the Content Services image each time it is rebuilt.

###### Creating a custom HotSwapAgent Content Services docker image

Another alternative to avoid this time overhead, due to the installation of the Trava OpenJDK distribution, is to create a custom docker image that installs and sets that custom JDK up.

A sample `Dockerfile` for that custom image for Content Services 6.0 Community could be:

```bash
FROM alfresco/alfresco-content-repository-community:6.0.7-ga

# HOTSWAP AGENT
# Install and configure Trava OpenJDK (OpenJDK pre-built with DCEVM and hotswap agent for Java 11)
COPY trava-jdk-11-dcevm.tar.gz $TOMCAT_DIR
RUN tar -xvf $TOMCAT_DIR/trava-jdk-11-dcevm.tar.gz -C /usr/java/ && \
    rm $TOMCAT_DIR/trava-jdk-11-dcevm.tar.gz && \
    alternatives --install /usr/bin/java java /usr/java/dcevm-11.0.1+7/bin/java 40000 && \
    alternatives --install /usr/bin/javac javac /usr/java/dcevm-11.0.1+7/bin/javac 40000 && \
    alternatives --install /usr/bin/jar jar /usr/java/dcevm-11.0.1+7/bin/jar 40000 && \
    alternatives --set java /usr/java/dcevm-11.0.1+7/bin/java && \
    alternatives --set javac /usr/java/dcevm-11.0.1+7/bin/javac && \
    alternatives --set jar /usr/java/dcevm-11.0.1+7/bin/jar && \
    ln -sfn /usr/java/dcevm-11.0.1+7 /usr/java/latest && \
    ln -sfn /usr/java/dcevm-11.0.1+7 /usr/java/default
```

That docker image can be built and pushed to your company Docker registry.

* Go to the folder where the `Dockerfile` is located and build the docker image:

```bash
> docker build -t "alfresco/alfresco-content-repository-community-hotswap-agent:6.0.7-ga" .
```

* Tag and push the image to your company Docker registry:

```bash
> docker tag DOCKER_REGISTRY_URL/alfresco/alfresco-content-repository-community-hotswap-agent:6.0.7-ga alfresco/alfresco-content-repository-community-hotswap-agent:6.0.7-ga
> docker push DOCKER_REGISTRY_URL/alfresco/alfresco-content-repository-community-hotswap-agent:6.0.7-ga
```

Once the new image is available in the Docker registry, the maven property `docker.acs.image` can be modified in the main `pom.xml` file of the project to use that custom image:

```xml
<docker.acs.image>alfresco/alfresco-content-repository-community-hotswap-agent</docker.acs.image>
```

For more information about HotSwapAgent configuration for Java 11, check the [HotSwapAgent documentation](http://hotswapagent.org/mydoc_quickstart-jdk11.html){:target="_blank"}.

##### Reloading changes in source code

1. Rebuild and restart the whole project (`run.sh/run.bat build_start`).

    You'll recognize HotSwapAgent is working when you see similar log messages:

    ```text
     HOTSWAP AGENT: 14:08:07.154 DEBUG (org.hotswap.agent.util.classloader.URLClassLoaderHelper) - Added extraClassPath URLs [file:/usr/local/tomcat/hotswap-agent/] to classLoader ParallelWebappClassLoader
       context: alfresco
       delegate: false
     ----------> Parent Classloader:
     java.net.URLClassLoader@4c402120
    ```

2. Before making any changes, let's run the sample webscript by opening your browser and typing `http://localhost:8080/alfresco/s/sample/helloworld`.

    This is a sample webscript generated in every project created using the SDK and the platform artifact.

    ![sdk-hellofromjava]({% link content-services/images/sdk-hellofromjava.png %})

3. Locate `HelloWorldWebScript.java` in the `src/main/java/.../platformsample` folder of your project (If you are using an All-In-One project, the folder is located in the platform sub-project).

4. Edit it using your preferred editor and change the code so that `HelloFromJava` becomes `HelloFromMe`:

    ```java
    model.put(“fromJava”,”HelloFromMe”);
    ```

5. Save the file and compile the Java class (using your preferred IDE or the `mvn compile` command).

    A number of log messages appear in the Alfresco project terminal, for example:

    ```text
     HOTSWAP AGENT: 14:10:29.887 DEBUG (org.hotswap.agent.watch.nio.WatcherNIO2) - Watch event 'ENTRY_MODIFY' on '/usr/local/tomcat/hotswap-agent/sample-project-platform/target/classes/com/example/platformsample/HelloWorldWebScript.class' --> HelloWorldWebScript.class
     HOTSWAP AGENT: 14:10:30.319 DEBUG (org.hotswap.agent.command.impl.SchedulerImpl) - Executing pluginManager.hotswap([class com.example.platformsample.HelloWorldWebScript])
     HOTSWAP AGENT: 14:10:30.368 RELOAD (org.hotswap.agent.config.PluginManager) - Reloading classes [com.example.platformsample.HelloWorldWebScript] (autoHotswap)
     HOTSWAP AGENT: 14:10:30.387 DEBUG (org.hotswap.agent.plugin.jdk.JdkPlugin) - Flushing com.example.platformsample.HelloWorldWebScript from introspector
     HOTSWAP AGENT: 14:10:30.394 DEBUG (org.hotswap.agent.plugin.jdk.JdkPlugin) - Flushing com.example.platformsample.HelloWorldWebScript from ObjectStreamClass caches
     HOTSWAP AGENT: 14:10:30.399 DEBUG (org.hotswap.agent.plugin.jvm.ClassInitPlugin) - Adding $ha$$clinit to class: com.example.platformsample.HelloWorldWebScript
     HOTSWAP AGENT: 14:10:30.422 DEBUG (org.hotswap.agent.plugin.jvm.ClassInitPlugin) - Skipping old field logger
     HOTSWAP AGENT: 14:10:33.312 DEBUG (org.hotswap.agent.config.PluginManager) - ... reloaded classes [com.example.platformsample.HelloWorldWebScript] (autoHotswap)
    ```

6. Refresh the browser to see the updated message:

    ![sdk-hellofromme]({% link content-services/images/sdk-hellofromme.png %})

By changing the code and compiling it again, the changes have been dynamically received from Content Services.

### Switching Content Services database

By default, the projects generated by making use of the archetypes provided by the Alfresco SDK 4 are pre-configured to work with a specific database, which is PostgreSQL.

Anyway, Content Services is developed and tested to [support a wide range of platforms and languages]({% link content-services/latest/support/index.md %}).
That includes a set of supported databases.

In this article, we are going to detail the process to modify a project generated from the SDK's archetypes to use a different database. In this case, we're going to show how to configure a project to work with MySQL instead of PostgreSQL.

So, the steps to configure a MySQL database in an All-In-One project are:

1. Modify the `Dockerfile` of the platform module (`PROJECT_ROOT_PATH/PROJECT_ARTIFACT_ID-platform-docker/src/main/docker/Dockerfile`) to add the MySQL driver library to the tomcat lib folder:

    ```text
    FROM ${docker.acs.image}:${alfresco.platform.version}
    ...
    # Copy MySQL driver to Tomcat lib folder
    RUN curl -L -o $TOMCAT_DIR/lib/mysql-db-connector.jar "https://repo1.maven.org/maven2/mysql/mysql-connector-java/5.1.47/mysql-connector-java-5.1.47.jar"
    ```

    If you've created a corporate Content Services Docker image extending the official one, you can include the download and installation of the MySQL driver in that Docker
    image to avoid this installation on every compilation of the project.

2. Modify the Content Services configuration to use the MySQL driver and connection URL. This configuration is set in the file `PROJECT_ROOT_PATH/PROJECT_ARTIFACT_ID-platform-docker/src/main/docker/alfresco-global.properties`:

    ```text
    db.driver=com.mysql.jdbc.Driver
    db.url=jdbc:mysql://sample-aio-mysql:3306/alfresco?useUnicode=yes&characterEncoding=UTF-8&useSSL=false
    ```

    Remember that the database URL must contain the name of the MySQL container configured in the Docker Compose file.

3. Modify the Docker Compose file (`PROJECT_ROOT_PATH/docker/docker-compose.yml`) to delete the PostgreSQL container and configure the new MySQL container:

    ```text
    version: '3.4'
    services:
    ...
      sample-aio-mysql:
        image: mysql:5.7
        command: mysqld --character-set-server=utf8
        environment:
          MYSQL_ROOT_PASSWORD: root
          MYSQL_DATABASE: alfresco
          MYSQL_USER: alfresco
          MYSQL_PASSWORD: alfresco
        expose:
          - "3306"
        volumes:
          - sample-aio-db-volume:/var/lib/mysql
    ...
    ```

4. Modify the Docker Compose file (`PROJECT_ROOT_PATH/docker/docker-compose.yml`) to change the dependency of Content Services container from the PostgreSQL container to the MySQL container:

    ```text
    version: '3.4'
    services:
    ...
      sample-aio-acs:
        image: alfresco-content-services-sample-aio:development
        build:
          dockerfile: ./Dockerfile
          context: ../../../sample-aio-platform-docker/target
        environment:
          CATALINA_OPTS: "-agentlib:jdwp=transport=dt_socket,server=y,suspend=n,address=0.0.0.0:8888"
        ports:
          - "${acs.port}:8080"
          - "${acs.debug.port}:8888"
        volumes:
          - sample-aio-acs-volume:/usr/local/tomcat/alf_data
        depends_on:
          - sample-aio-mysql
    ...
    ```

Once all these steps are done, remove all the old data from the project (`run.sh/run.bat purge`) and rebuild and restart the project (`run.sh/run.bat build_start`). That's everything required to switch from a PostgreSQL to a MySQL database. The process is the same with the rest of supported databases.

## Troubleshooting {#troubleshooting}

This section describes a list of common issues with the projects generated from the Alfresco SDK archetypes and the way to troubleshoot them.

### Incorrect JDK version

The Content Services container is not starting properly and it is showing Java compatibility errors in the logs:

```text
org.springframework.beans.factory.CannotLoadBeanClassException: 
Error loading class [com.example.platformsample.Demo] for bean with name 'com.example.Demo' defined in class path resource 
[alfresco/module/sample-project-platform/context/service-context.xml]: 
problem with class file or dependent class; nested exception is java.lang.UnsupportedClassVersionError: 
com/example/platformsample/Demo has been compiled by a more recent version of the Java Runtime (class file version 55.0), 
this version of the Java Runtime only recognizes class file versions up to 52.0 (unable to load class [com.example.platformsample.Demo])
```

This error represents that the source code was compiled using the wrong version of the JDK. This issue can happen if the generated project is compiled using JDK 11 and it is deployed in a Content Services 6.0 container (which uses JRE 8).

#### Solution

To solve this issue you can follow several approaches:

* Compile the project using a JDK version lower than 11 (and equal to or newer than 8).
* Remove the `java11` profile in the `pom.xml` file of the base project (this is not recommended if you plan to move to Content Services 6.1+).
* Move to Content Services 6.1+. This is highly recommended due to the fact that it uses JRE 11 (JDK 8 has already reached its end of support time).

### Containers synchronization

Content Services depends on the readiness of the database in order to start properly. If the database is not ready when Content Services reaches the startup phase that requires it, then
it fails showing error messages in the log:

```text
sample-project-acs_1    | 27-June-2023 10:58:06 AM org.postgresql.core.v3.ConnectionFactoryImpl log
sample-project-acs_1    | WARNING: IOException occurred while connecting to sample-project-postgres:5432
sample-project-acs_1    | java.net.UnknownHostException: sample-project-postgres
sample-project-acs_1    | at java.base/java.net.AbstractPlainSocketImpl.connect(AbstractPlainSocketImpl.java:220)
sample-project-acs_1    | at java.base/java.net.SocksSocketImpl.connect(SocksSocketImpl.java:403)
sample-project-acs_1    | at java.base/java.net.Socket.connect(Socket.java:591)
sample-project-acs_1    | at org.postgresql.core.PGStream.<init>(PGStream.java:69)
...
sample-project-acs_1    | 27-June-2023 10:58:06.281 SEVERE [localhost-startStop-1] org.postgresql.Driver.connect Connection error: 
sample-project-acs_1    | org.postgresql.util.PSQLException: The connection attempt failed.
sample-project-acs_1    | at org.postgresql.core.v3.ConnectionFactoryImpl.openConnectionImpl(ConnectionFactoryImpl.java:259)
sample-project-acs_1    | at org.postgresql.core.ConnectionFactory.openConnection(ConnectionFactory.java:49)
sample-project-acs_1    | at org.postgresql.jdbc.PgConnection.<init>(PgConnection.java:195)
...
```

The projects generated using the Alfresco SDK archetypes are configured in a way that the Content Services container _depends on_ the database container (PostgreSQL).

```text
services:
  sample-project-acs:
    image: alfresco-content-services-sample-project:development
    ...
    depends_on:
      - sample-project-postgres
  sample-project-postgres:
    image: postgres:9.6
    ...
```

The problem is Docker Compose only ensures that the dependant container will be started before the one that declares the dependency. But that doesn't ensure that the PostgreSQL (or any other database) service will be ready when the Content Services script reaches the point in which the database is required.

Usually, the database service starts before Content Services requires it, but there are some infrequent cases (an environment with low resources or high load) in which this synchronization issue appears.

#### Solution

In these cases, you can follow the [recommendation in the official Docker documentation](https://docs.docker.com/compose/startup-order/){:target="_blank"}, which is to use a scripting sync solution like `_wait-for-it_` or `_dockerize_`.

Let's see how you can configure the Content Services container to use [wait-for-it](https://github.com/vishnubob/wait-for-it){:target="_blank"} to wait for the database service to be ready to accept connections:

1. Download the last version of the [wait-for-it](https://github.com/vishnubob/wait-for-it){:target="_blank"} bash script and save it into the folder `PROJECT_ARTIFACT_ID-platform-docker/src/main/docker`.

2. Modify the file `PROJECT_ARTIFACT_ID-platform-docker/src/main/docker/Dockerfile` to include the addition of the script to the Content Services container and granting execution permission to it.

    ```bash
    # Copy wait-for-it.sh script to wait for other services
    COPY wait-for-it.sh /tmp/wait-for-it.sh
    RUN chmod +x /tmp/wait-for-it.sh
    ```

3. Modify the file `docker/docker-compose.yml` to change the Content Services container command to use the _wait-for-it_ script to wait for the PostgreSQL service to be ready.

    ```text
      sample-project-acs:
        image: alfresco-content-services-sample-project:development
        build:
          dockerfile: ./Dockerfile
          context: ../../../sample-project-platform-docker/target
        environment:
          CATALINA_OPTS: "-agentlib:jdwp=transport=dt_socket,server=y,suspend=n,address=0.0.0.0:8888"
        command: ["/tmp/wait-for-it.sh", "sample-project-postgres:5432", "--", "catalina.sh", "run"]
        ports:
          - "${acs.port}:8080"
          - "${acs.debug.port}:8888"
    ```

With this configuration in place, when the project is rebuilt and restarted the Content Services container will wait for the database service to be ready.

### Ports conflict

The docker-based development environment started by a project generated using the Alfresco SDK archetypes exposes a set of different ports to the hosted machine (i.e. Content Services http port, Content Services debug port or PostgreSQL port).

If one of these ports is already in use in the hosted machine (by another service) when you start the development environment, then the startup process will fail and the container that wanted to expose the busy port won't start.

#### Solution

The docker compose file under `docker/docker-compose.yml` is the source file that, in the compile phase of the project, will be filtered by the `maven-resource-plugin` in order to produce the final copy of the docker compose file.

That allows you to modify the number of the exposed ports through maven properties in the `pom.xml` file of the main project.

```xml
<!-- Environment configuration properties -->
<share.port>8180</share.port>
<share.debug.port>9898</share.debug.port>
<acs.port>8080</acs.port>
<acs.debug.port>8888</acs.debug.port>
<postgres.port>5555</postgres.port>
```

That way, if you face a port conflict, you only need to change the port in the corresponding maven property and rebuilt and restart the project.

### Alfresco Share previews / Transformations not working

Some files with different formats like _doc_, _docx_ or _xls_ can't be previewed in Alfresco Share. The source reason of this problem is that the Alfresco Transform Service (ATS) is not working. ATS is required to generate the content renditions that will be used by Alfresco Share to show the content preview.

#### Solution

By default, ATS is not included in the basic configuration of the projects generated by making use of the Alfresco SDK 4 archetypes.

To enable it, you simply need to follow the steps described in the article [How to set up Alfresco Transform Service](#setuptransformservice). If you're working with Alfresco Enterprise you must also follow the step in [How to set up Alfresco Transform Service](#workingwithenterprise).
