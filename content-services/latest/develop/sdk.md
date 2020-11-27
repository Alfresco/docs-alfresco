---
title: Alfresco SDK
---

Alfresco SDK 4.1 is a Maven based development kit that provides an easy to use approach to developing applications and 
extensions for Alfresco. With this SDK you can develop, package, test, run, document and release your Alfresco extension project.

The Alfresco Software Development Kit (Alfresco SDK) is a fundamental tool provided by Alfresco to developers to build 
customizations and extensions for the Alfresco Digital Business Platform. It is based on [Apache Maven](http://maven.apache.org/){:target="_blank"} 
and [Docker](https://www.docker.com/){:target="_blank"} and is compatible with major IDEs. This enables Rapid Application Development (RAD) 
and Test Driven Development (TDD).

Alfresco SDK 4.1 is released under [Apache License version 2.0](http://www.apache.org/licenses/LICENSE-2.0.html){:target="_blank"} 
and supports Alfresco Content Services both in Community Edition and Enterprise Edition. If you're an Enterprise customer, 
please check the [Alfresco SDK Support status]({% link content-services/latest/support/index.md %}) 
for the version you're using. If your version is in Limited or Full Support and you need help, contact our [Support team](http://support.alfresco.com/){:target="_blank"}.

Alfresco SDK 4.1 is a minor update to the SDK and provides support for Alfresco 6.2.x.

The 4.0 release takes advantage of Semantic Versioning ([SEMVER](http://semver.org/){:target="_blank"}), which means that 
this new release is not directly compatible with the previous releases of the SDK.

If you have existing projects that you wish to upgrade to SDK 4.1.x, the recommended approach is to generate a new project 
from our archetypes and move your code into place.

## What's new?

Alfresco SDK 4.0 brings some changes oriented to assist the way the customizations are built, packaged, run and tested for Alfresco Content Services 6 and 
Alfresco Share 6.

This is a mayor release oriented to support Alfresco 6, so it is not compatible with previous versions of the SDK.

### Embracing containers and Docker

The main change included in SDK 4.0 is the addition of container technologies. Specifically, the new SDK is highly based 
on [Docker](https://www.docker.com/){:target="_blank"} and [Docker compose](https://docs.docker.com/compose/){:target="_blank"} 
to offer a solution aligned with the architectural decisions made in Alfresco for version 6: moving towards microservices-oriented 
solutions.

Working with Docker images gives the developers the opportunity to easily customise the deployment of the local environment to adapt it to their requirements.
Adding, removing and configuring services in the environment is as easy as modifying the Docker compose descriptor file.

### Support for Java 11

[Java 11](https://openjdk.java.net/projects/jdk/11/){:target="_blank"} is the next Long Term Support (LTS) version that provides support for 3 years. Alfresco 6.1 already offers
support for this version of the Java platform.

Alfresco SDK 4.0 has been modified to add support for Java 11 as well. This way, if you're working as a developer in customisations for Alfresco 6.1 you must
now use SDK 4.0 + JDK 11 to work on them. The Apache Maven plugins included in the archetypes has been updated to avoid any issue with Java 11.

### Easy dependency configuration

The configuration of the Maven dependency management has been greatly improved thanks to the addition of a _bill of materials_ (BOM). 

The inclusion of the BOM dependency in the `dependencyManagement` section of the `pom.xml` file of the projects generated using the archetypes imports all 
artifacts in the selected Alfresco platform version. It is still needed to define dependencies in the POM files, but the version can be omitted as it's 
enforced by this `dependencyManagement`. 

That incredibly eases the management of the versions of the different Alfresco platform's dependencies required in a customisation project.

### Alfresco Maven Plugin no longer needed

Alfresco SDK 4.0 manages the lifecycle of the generated projects making use of proper [utility scripts](TODO:working-with-generated-projects/README.md#run-script) 
(`run.sh` / `run.bat`). That avoids the need of using the Alfresco Maven Plugin and eases the process to modify the lifecycle of the customisation projects.

If a development team has straightforward requirements and doesn't want to worry about the complexity of working with containers, it can use the utility scripts
as they are. But, if any development team has a requirement or a development process that requires a customisation in the project development lifecycle, it is 
easy to modify the utility scripts, the Docker files or the Docker compose descriptor to adapt the SDK projects to their needs.

The Alfresco Maven Plugin is only required in those cases in which it is required to package the customisation project as an AMP. For more information about 
how to work with AMPs, please visit [Working with AMPs](#workingwithamps).

### Integration testing

The integration tests and the mechanisms to execute them in an Alfresco Content Service instance remains the same as in the previous version of the SDK. 

However, the inclusion of Docker and the utility scripts provides a different perspective about the environment on which the integration tests are executed.
In this version, the integration tests are run against the dockerised environment defined using Docker and Docker compose. By doing so, the integration test
environment can be more similar to a real one, including whatever other service is required for a full featured integration test execution. 

### Support for Alfresco 6.2.x

Alfresco SDK 4.1 provides support for Alfresco 6.2.x.

## Getting started with Alfresco SDK {#gettingstarted}

Use these instructions to get started with using Alfresco SDK 4.1.

### Prerequisites
   
There are a number of software requirements for using Alfresco SDK 4.1:

* Java Development Kit (JDK) - Version 11
* Maven - Version 3.3
* Docker - Latest stable version
* JRebel (optional) for hot reloading of web resources, configuration, and classes
* HotSwap Agent (optional) for hot reloading of web resources, configuration, and classes

#### Java

ACS 6.0 is compiled and executed using Java 8, but it is highly recommended to work with ACS 6.1+ which uses Java 11.

1. Download [JDK 11](https://jdk.java.net/11/){:target="_blank"}, unzip it and configure it as the default Java installation.

2. Verify the installation for both JDK and JRE.

```bash
$ javac -version
javac 11.0.1

$ java -version
openjdk version "11.0.1" 2018-10-16
OpenJDK Runtime Environment 18.9 (build 11.0.1+13)
OpenJDK 64-Bit Server VM 18.9 (build 11.0.1+13, mixed mode)
```

3. Make sure JAVA_HOME is setup correctly, so other tools like Maven will use the correct version.

```bash
$ env|grep JAVA_HOME
JAVA_HOME=/Library/Java/JavaVirtualMachines/jdk-11.0.1.jdk/Contents/Home
```

#### Maven

Alfresco recommends that you keep up-to-date with all the Maven releases. Linux distributions and package managers tend to bundle older releases and this is 
the most common pitfall.

Alfresco SDK 4.1 requires Maven 3.3.0+, but you are recommended to download the latest version.

1. Download and install [Apache Maven](https://maven.apache.org/download.cgi){:target="_blank"} and make sure it is configured correctly on your path.

2. Verify the installation.

```bash
$ mvn -v
Apache Maven 3.3.9 (bb52d8502b132ec0a5a3f4c09453c07478323dc5; 2015-11-10T17:41:47+01:00)
Maven home: /usr/local/Cellar/maven/3.3.9/libexec
Java version: 11.0.1, vendor: Oracle Corporation
Java home: /Library/Java/JavaVirtualMachines/jdk-11.0.1.jdk/Contents/Home
Default locale: en_ES, platform encoding: UTF-8
OS name: "mac os x", version: "10.13.4", arch: "x86_64", family: "mac"
```

#### Docker

Alfresco recommends that you keep up-to-date with all the Docker releases. If you're using an older version of Windows or Mac you'll have to use 
[Docker Toolbox](https://docs.docker.com/toolbox/){:target="_blank"} which has some known issues.

1. Download and install [Docker](https://docs.docker.com/install/){:target="_blank"}.

2. Verify the installation of Docker.

```bash
$ docker -v
Docker version 18.06.1-ce, build e68fc7a
``` 

3. [Docker Compose](https://docs.docker.com/compose/install/){:target="_blank"} is included as part of some Docker installers. If it's not part of your installation, then 
install it separately after you've installed Docker.

4. Verify the installation of Docker Compose.

```bash
$ docker-compose -v
docker-compose version 1.22.0, build f46880f
```

### Generate your project from the archetypes

1. After you've successfully configured Java and Maven, it's time to generate your project.

```bash
mvn archetype:generate -Dfilter=org.alfresco:
```

You'll be prompted to select the archetype you want. The previously available archetypes, `alfresco-amp-archetype` and `share-amp-archetype` will still show up 
as an option, however these archetypes are not part of Alfresco SDK 4.1.

Attention: You'll need double quotes around the filter part if you are using Windows Powershell: `mvn archetype:generate "-Dfilter=org.alfresco:"`.

The output looks something like this:

```text
[INFO] Generating project in Interactive mode
[INFO] No archetype defined. Using maven-archetype-quickstart (org.apache.maven.archetypes:maven-archetype-quickstart:1.0)
Choose archetype:
1: remote -> org.alfresco.maven.archetype:alfresco-platform-jar-archetype (Sample project with full support for lifecycle and rapid development of Platform/Repository JARs and AMPs (Alfresco Module Packages))
2: remote -> org.alfresco.maven.archetype:alfresco-share-jar-archetype (Share project with full support for lifecycle and rapid development of JARs and AMPs (Alfresco Module
        Packages))
3: remote -> org.alfresco.maven.archetype:alfresco-allinone-archetype (Sample multi-module project for All-in-One development on the Alfresco platform. Includes modules for Platform/Repository JAR and Share JAR)
...
```

2. Select one of the following archetypes:

* `org.alfresco.maven.archetype:alfresco-allinone-archetype`
* `org.alfresco.maven.archetype:alfresco-platform-jar-archetype`
* `org.alfresco.maven.archetype:alfresco-share-jar-archetype`

3. Choose the latest version, such as 4.1.0.

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
11: 4.0.0
12: 4.1.0
```

4. Next you will be prompted for additional values, like `groupId`, `artifactId`, and `package`, as shown below:

```bash
Define value for property 'groupId':
Define value for property 'artifactId':
[INFO] Using property: version = 1.0-SNAPSHOT
Define value for property 'package':
```

5. After you have specified the information according to your project, a final confirmation will appear.

```bash
Confirm properties configuration:
groupId: com.acme
artifactId: my-all-in-one
version: 1.0-SNAPSHOT
package: com.acme
Y: :
```

6. Press **Y** and then press **Enter**.

If everything has been configured correctly, you should see something similar to this:

```bash
[INFO] ----------------------------------------------------------------------------
[INFO] Using following parameters for creating project from Archetype: alfresco-allinone-archetype:4.1.0-SNAPSHOT
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
[INFO] Parent element not overwritten in /Users/Alfresco/my-all-in-one/my-all-in-one-platform/pom.xml
[INFO] Parent element not overwritten in /Users/Alfresco/my-all-in-one/my-all-in-one-share/pom.xml
[INFO] Parent element not overwritten in /Users/Alfresco/my-all-in-one/my-all-in-one-integration-tests/pom.xml
[INFO] Parent element not overwritten in /Users/Alfresco/my-all-in-one/my-all-in-one-platform-docker/pom.xml
[INFO] Parent element not overwritten in /Users/Alfresco/my-all-in-one/my-all-in-one-share-docker/pom.xml
[INFO] Executing META-INF/archetype-post-generate.groovy post-generation script
[INFO] Project created from Archetype in dir: /Users/Alfresco/my-all-in-one
[INFO] ------------------------------------------------------------------------
[INFO] BUILD SUCCESS
[INFO] ------------------------------------------------------------------------
[INFO] Total time: 04:11 min
[INFO] Finished at: 2019-01-10T16:21:46+01:00
[INFO] Final Memory: 17M/1024M
[INFO] ------------------------------------------------------------------------
```

7. You have successfully generated your first SDK 4.1 project.

Inside the project, you will find the `run.bat` and `run.sh` scripts. These are convenience scripts for you to quickly compile / test / run your project.

In the terminal window, use:
* `./run.sh build_start` for Mac OS X or Linux.
* `run.bat build_start` for Windows.

If this is the first time you are doing this, it will take a while for Maven to download all the required dependencies and for Docker to download all the
required images.

For more information about how to work with the projects, please visit [Working with generated projects](#workingwithprojects).

## Alfresco SDK Maven archetypes {#mvnarchetypes}

The Alfresco SDK 4.1 comes with a number of Maven archetypes that can be used to generate Alfresco extension projects.

For more details, see [Getting started with Alfresco SDK 4.1](#gettingstarted).

These archetypes are available during the creation of a brand new project. In short, a [Maven archetype](https://maven.apache.org/guides/introduction/introduction-to-archetypes.html){:target="_blank"} 
is a project templating toolkit. It's defined as an original pattern or model from which all other things of the same kind are made. Using archetypes 
provides a great way to enable developers to quickly follow best practice in a consistent way. This is valid for every project built with Apache Maven and 
it's valid in particular when using Alfresco SDK 4.1.

In this section we are going to introduce all the available archetypes in Alfresco SDK 4.1, with a brief description of their purpose and main use. 
After reading this information, you should be able to understand the various possibilities that Alfresco SDK 4.1 can offer to developers, in terms of 
projects.

When generating your project, you'll be prompted to select the Maven archetype you want to use through an interactive menu, similar to what you can see below.

```bash
[INFO] Generating project in Interactive mode
[INFO] No archetype defined. Using maven-archetype-quickstart (org.apache.maven.ar
chetypes:maven-archetype-quickstart:1.0)
Choose archetype:
1: remote -> org.alfresco.maven.archetype:activiti-jar-archetype (Sample project w
ith full support for lifecycle and rapid development of Activiti JARs)
2: remote -> org.alfresco.maven.archetype:alfresco-allinone-archetype (Sample mult
i-module project for All-in-One development on the Alfresco platform. Includes mod
ules for Platform/Repository JAR and Share JAR)
3: remote -> org.alfresco.maven.archetype:alfresco-amp-archetype (Sample project w
ith full support for lifecycle and rapid development of Repository AMPs (Alfresco 
Module Packages))
4: remote -> org.alfresco.maven.archetype:alfresco-platform-jar-archetype (Sample 
project with full support for lifecycle and rapid development of Platform/Reposit
ory JARs and AMPs (Alfresco Module Packages))
5: remote -> org.alfresco.maven.archetype:alfresco-share-jar-archetype (Share pro
ject with full support for lifecycle and rapid development of JARs and AMPs (Alfr
esco Module
Packages))
6: remote -> org.alfresco.maven.archetype:share-amp-archetype (Share project with 
full support for lifecycle and rapid development of AMPs (Alfresco Module
Packages))
Choose a number or apply filter (format: [groupId:]artifactId, case sensitive con
tains): : 
```

The menu shows 6 possible options, where each option corresponds to a different Maven archetype that you can select by using the listed numbers. 
Please note that the numbering is not sequential and some numbers may be skipped.

### org.alfresco.maven.archetype:alfresco-allinone-archetype

This archetype allows a developer to implement the All-In-One project on Alfresco Content Services. The All-In-One project (also called AIO) is provided in 
this and previous versions of Alfresco SDK, but in SDK 4.1 it has been reshaped to leverage on Docker.

The All-In-One archetype allows a developer to create a multi-module project on Alfresco Content Services. The All-In-One project mainly includes a module for 
the core repository in ACS and a module for the Share client. This includes:

* ACS Repository JAR
* Alfresco Share JAR
* ACS Repository Docker image configuration
* Alfresco Share Docker image configuration
* Integration tests
* Docker containers (ACS, Share, Alfresco Search Service, PostgreSQL) configuration and orchestration via Docker compose
* (Optional) AMP deployment configuration (JAR is the recommended artifact type and the default)

The project created using the All-In-One Maven archetype includes some sample code (by default) to show you how to develop with the Alfresco Content Services 
Repository and the Alfresco Share client. The samples included in the project are basic and straightforward, and can help you to take the first steps into 
Alfresco development.

The All-In-One project is recommended to be used if you have to develop a customization of the Alfresco Content Services Repository together with 
customizations on Alfresco Share client. If your plan to develop a project on the Alfresco Content Services Repository only, use the Platform JAR Maven 
archetype. If you plan to develop a project on the Alfresco Share client only, use the Share JAR Maven archetype.

For more information about the All-In-One project, see [All-In-One project structure](#structureaio).

### org.alfresco.maven.archetype:alfresco-platform-jar-archetype

This archetype allows a developer to implement the Platform JAR project on Alfresco Content Services. It has been reshaped in SDK 4.1 to leverage on Docker.

The Platform JAR Maven archetype allows a developer to create a module on Alfresco Content Services, in particular on the Repository side, and includes:

* ACS Repository JAR
* ACS Repository Docker image configuration
* Docker containers (ACS, Share (optional), Alfresco Search Service, PostgreSQL) configuration and orchestration via Docker compose
* (Optional) AMP deployment configuration (JAR is the recommended artifact type and the default)

The project created using the Platform JAR Maven archetype includes some sample code (by default) to show you how to develop with the Alfresco Content 
Services Repository. The samples included in the project are basic and straightforward, and can help you to take the first steps into Alfresco development.

The Platform JAR project is recommended to be used if you have to develop a customization of the Alfresco Content Services Repository. If you also plan to 
develop a customization of the Alfresco Share client, use the All-In-One Maven archetype instead.

For more information about the Platform JAR project, see [Platform JAR project structure](#structureplatform).

### org.alfresco.maven.archetype:alfresco-share-jar-archetype

This archetype allows a developer to implement the Share JAR project on an Alfresco Share client. It has been reshaped in SDK 4.1 to leverage on Docker.

The Share JAR Maven archetype allows a developer to create a module on an Alfresco Share client, and includes:

* Alfresco Share JAR
* Alfresco Share Docker image configuration
* Docker containers (ACS, Share, Alfresco Search Service, PostgreSQL) configuration and orchestration via Docker compose
* (Optional) AMP deployment configuration (JAR is the recommended artifact type and the default)

The project created using the Share JAR Maven archetype includes some sample code (by default) to show you how to develop with the Alfresco Share client. 
The samples included in the project are basic and straightforward, and can help you to take the first steps into Alfresco development.

The Share JAR project is recommended to be used if you have to develop a customization of the Alfresco Share client. If you also plan to develop a 
customization of the Alfresco Content Services Repository, use the All-In-One Maven archetype instead.

For more information about the Share JAR project, see [Share JAR project structure](#structureshare).

### org.alfresco.maven.archetype:activiti-jar-archetype (for use with SDK 2.2 only)

This Maven archetype is related to an older version of the Alfresco SDK and should not be used. For technical reasons this archetype can't be hidden and is 
still listed.

### org.alfresco.maven.archetype:alfresco-amp-archetype (for use with SDK 2.2 only)

This Maven archetype is related to an older version of the Alfresco SDK and should not be used. For technical reasons this archetype can't be hidden and is 
still listed.

### org.alfresco.maven.archetype:share-amp-archetype (for use with SDK 2.2 only)

This Maven archetype is related to an older version of the Alfresco SDK and should not be used. For technical reasons this archetype can't be hidden and is 
still listed.

## Working with generated projects {#workingwithprojects}

After generating a project using one of the Alfresco SDK 4.1 Maven archetypes, it is important to know how to build / run / test these projects.

The Alfresco Platform 6 deployment architecture is highly based on container technologies, specifically in [Docker](http://docs.alfresco.com/6.0/concepts/master-deploy.html){:target="_blank"}. 
Due to that, the projects generated using the Alfresco SDK 4.1 archetypes set up their local environment making an intensive use of Docker and Docker compose 
technologies.

If you're not familiar with these technologies, it is highly recommended visiting the [Docker documentation website](https://docs.docker.com){:target="_blank"}. This site offers
a great quantity of training resources about [Docker](https://docs.docker.com/get-started/){:target="_blank"} and [Docker compose](https://docs.docker.com/compose/gettingstarted/){:target="_blank"}.

Before continuing, make sure that you have read and completed the tasks in the [Getting started](#gettingstarted) tutorial.

* [Working with an All-In-One project](#workinaio)
* [Working with a Platform (Repository) JAR project](#workingplatform)
* [Working with a Share JAR project](#workingshare)

After generating your project, using one of the Maven archetypes, review the project structure. The directory structure and content of each folder and file 
can help you to understand how to start developing with the Alfresco SDK 4.1. 

The structure of the project and the purpose of the files it contains vary according to the [Maven archetype](#mvnarchetypes) used to generate the project 
itself. The following links provide detailed descriptions of the different project types.

* [All-In-One project structure](#structureaio)
* [Platform JAR project structure](#structureplatform)
* [Share JAR project structure](#structureshare)

### Run script {#workingwithrunscript}

All the projects generated using the Alfresco SDK 4.1 archetypes provide a utility script to work with the project. This script is `run.sh` for Unix systems
and `run.bat` for Windows systems.

The execution of this script must be followed by a parameter that dictates the task to be executed in the project. The list of available tasks is:

|Task|Description|
|----|-----------|
|`build_start` | Build the whole project, recreate the ACS and Share docker images, start the dockerised environment composed by ACS, Share, ASS and PostgreSQL and tail the logs of all the containers.|
|`build_start_it_supported` | Build the whole project including dependencies required for IT execution, recreate the ACS and Share docker images, start the dockerised environment composed by ACS, Share, ASS and PostgreSQL and tail the logs of all the containers.|
|`start` | Start the dockerised environment without building the project and tail the logs of all the containers.|
|`stop` | Stop the dockerised environment.|
|`purge` | Stop the dockerised environment and delete all the persistent data (docker volumes).|
|`tail` | Tail the logs of all the containers.|
|`reload_share` | Build the Share module, recreate the Share docker image and restart the Share container (not available in the Alfresco Platform JAR archetype).|
|`reload_acs` | Build the ACS module, recreate the ACS docker image and restart the ACS container (only available in the All-In-One archetype).|
|`build_test` | Build the whole project, recreate the ACS and Share docker images, start the dockerised environment, execute the integration tests from the `integration-tests` module and stop the environment.|
|`test` | Execute the integration tests (the environment must be already started).|

This utility script uses `mvn`, `docker` and `docker-compose` commands, so make sure you have properly installed Maven, Docker and Docker compose and you have 
configured them properly to be accessible in the path.

In the case of Maven, it is not necessary that the `mvn` executable is in the path if you've properly configured the environment variable `M2_HOME`. The script
looks for the `M2_HOME` environment variable to build the path to the `mvn` executable. 

### Working with an All-In-One (AIO) project {#workingaio}

Before you continue make sure that you have read and completed the tasks in the 
[Getting started](#gettingstarted) tutorial to generate an All-In-One (AIO) project, 
which means selecting the `org.alfresco.maven.archetype:alfresco-allinone-archetype` 
Maven archetype when generating the project. The following information assumes that 
the AIO project was generated with the name `my-all-in-one-project`.

#### Introduction

An AIO SDK project is used to build extensions for both [Alfresco Content Services (ACS) Repository]({% link content-services/latest/develop/repo-ext-points/overview.md %}) 
and [Alfresco Share UI]({% link content-services/latest/develop/share-ext-points/overview.md %}). The runtime environment
for ACS is Docker so not only is this project building the source code for your extensions but also the 
custom Docker images for the Alfresco Repository and Alfresco Share. The custom Docker images includes the 
JARs, or AMPs, with your extension code. 

Looking into the generated AIO parent project we can see that we got a Docker Compose file (`my-all-in-one-project/docker/docker-compose.yml`) 
that will be used to build custom Docker images and run the project, one sub-project called `my-all-in-one-project-platform` that will be 
used to build Repository customizations, and one sub-project called `my-all-in-one-project-share` that can be used to build Alfresco Share UI customizations.

There are also the `my-all-in-one-project-platform-docker` and `my-all-in-one-project-share-docker` projects that are 
used to assemble (aggregate) all the Repository and Share extensions 
(there are usually more than one of each in a bigger project) and then build the custom Docker images with the 
extension(s) applied.

The Repository and Share extensions that are aggregated can either be extensions that you develop locally or extensions 
that are available in a Maven repository somewhere. 

#### Configuration properties

There are a number of properties that we can customise when we run the Alfresco SDK project.
These configuration properties are defined in the `my-all-in-one-project/pom.xml` project file.

The following table explains some of these properties:

| Name | Type | Default value | Description |
| ---- | ---- | ------------- | ----------- |
| alfresco.platform.version | `string` | 6.1.2-ga | The version of the ACS Repository (i.e. alfresco.war) that the Repository Extension should be applied to. This also specifies the version of the ACS Repository Docker Image that the custom built Repository image should be based on. See `my-all-in-one-project-platform-docker/src/main/docker/Dockerfile` |
| alfresco.share.version | `string` | 6.1.0-RC3 | The version of Alfresco Share (i.e. share.war) that the Share Extension should be applied to. This also specifies the version of the Alfresco Share Docker Image that the custom built Share image should be based on. See `my-all-in-one-project-share-docker/src/main/docker/Dockerfile`|
| docker.acs.image | `string` | alfresco/alfresco-content-repository-community | The name of the ACS Repository Docker image in Docker Hub. This changes if you switch to Enterprise Edition.|
| docker.share.image | `string` | alfresco/alfresco-share | The name of the Alfresco Share Docker image in Docker Hub. This changes if you switch to Enterprise Edition.|
| share.port | `number` | 8180 | The external port (i.e. outside container) for the Alfresco Share webapp.|
| share.debug.port | `number` | 9898 | The external port (i.e. outside container) for Alfresco Share remote debugging.|
| acs.host | `string` | my-all-in-one-project-acs | This is the name (host) that the ACS Repository is available at. This maps to the service name for the ACS Repository in the Docker Compose file `my-all-in-one-project/docker/docker-compose.yml`. The name is only useful for communication between containers on the default Docker network that is created. |
| acs.port | `number` | 8080 | The external port (i.e. outside container) for the ACS Repository.|
| acs.debug.port | `number` | 8888 | The external port (i.e. outside container) for ACS Repository remote debugging.|
| postgres.port | `number` | 5555 | The external port (i.e. outside container) for PostgreSQL database.|

When you first start out you don't need to change any of these properties, just use the defaults and try it out.

#### Building and running the project

The first thing you need to do before you can run anything is to build the custom ACS Docker images with the custom extensions.
We can build images and extensions at the same time as we start (run) the project by using the `./run.sh build_start` script 
(on Windows use the `run.bat build_start` script instead).

Note that if you have another Alfresco SDK project running, then you need to stop it first. Also, make sure that the 
following ports are free: 8180 (Share), 8080 (Alfresco Repo), 9898 (Share Debug), 8888 (Alfresco Repo Debug), 5555 (Postgres).
If you want to change the ports see the properties section of `my-all-in-one-project/pom.xml`. This project file also 
contains the versions of Alfresco Repository and Alfresco Share that will be used.  

```bash
$ cd my-all-in-one-project
my-all-in-one-project mbergljung$ ./run.sh build_start
[INFO] Scanning for projects...
[WARNING] The project com.example:my-all-in-one-project:pom:1.0-SNAPSHOT uses prerequisites which is only intended for maven-plugin projects but not for non maven-plugin projects. For such purposes you should use the maven-enforcer-plugin. See https://maven.apache.org/enforcer/enforcer-rules/requireMavenVersion.html
[INFO] ------------------------------------------------------------------------
[INFO] Reactor Build Order:
[INFO] 
[INFO] AIO - SDK 4.1
[INFO] Alfresco Platform/Repository JAR Module
[INFO] Alfresco Share JAR Module
[INFO] Integration Tests Module
[INFO] Alfresco Platform/Repository Docker Module
[INFO] Alfresco Share Docker Module
...
[INFO] ------------------------------------------------------------------------
[INFO] Reactor Summary:
[INFO] 
[INFO] AIO - SDK 4.1 ...................................... SUCCESS [  0.680 s]
[INFO] Alfresco Platform/Repository JAR Module ............ SUCCESS [  5.461 s]
[INFO] Alfresco Share JAR Module .......................... SUCCESS [  0.557 s]
[INFO] Integration Tests Module ........................... SUCCESS [  0.900 s]
[INFO] Alfresco Platform/Repository Docker Module ......... SUCCESS [  0.760 s]
[INFO] Alfresco Share Docker Module ....................... SUCCESS [  0.139 s]
[INFO] ------------------------------------------------------------------------
[INFO] BUILD SUCCESS
[INFO] ------------------------------------------------------------------------
...
my-all-in-one-project-acs-volume
my-all-in-one-project-db-volume
my-all-in-one-project-ass-volume
...
Building my-all-in-one-project-share
Step 1/8 : FROM alfresco/alfresco-share:6.1.0-RC3
...
Successfully tagged alfresco-share-my-all-in-one-project:development
Building my-all-in-one-project-acs
Step 1/9 : FROM alfresco/alfresco-content-repository-community:6.1.2-ga
...
Successfully tagged alfresco-content-services-my-all-in-one-project:development
...
my-all-in-one-project-acs_1       | 27-Mar-2019 06:53:39.191 INFO [main] org.apache.coyote.AbstractProtocol.start Starting ProtocolHandler ["http-nio-8080"]
my-all-in-one-project-acs_1       | 27-Mar-2019 06:53:39.233 INFO [main] org.apache.coyote.AbstractProtocol.start Starting ProtocolHandler ["ajp-nio-8009"]
my-all-in-one-project-acs_1       | 27-Mar-2019 06:53:39.249 INFO [main] org.apache.catalina.startup.Catalina.start Server startup in 84022 ms
``` 

The `./run.sh build_start` script will do the following:

* Stop anything running already with this project's Docker Compose file: `my-all-in-one-project/docker/docker-compose.yml` 
* Build the Repository and Share Extension JARs so we are sure to get the latest changes
* Assemble/Aggregate all Repository extension JARs into the `my-all-in-one-project/my-all-in-one-project-platform-docker/target/extensions` directory
* Assemble/Aggregate all Share extension JARs into the `my-all-in-one-project/my-all-in-one-project-share-docker/target/extensions` directory
* Create Docker Volumes for Repository (alf_data), Search index, and Database so data is persisted outside the containers
* Run the project via the Docker Compose file and instruct Docker Compose to build the custom Docker images first
* Tail the logs of all containers

This will build the following two Docker images:

```bash
$ docker image ls|more
REPOSITORY                                                       TAG                                          IMAGE ID            CREATED             SIZE
alfresco-content-services-my-all-in-one-project                  development                                  48e61e882567        16 hours ago        2.07GB
alfresco-share-my-all-in-one-project                             development                                  d6cbb6143578        16 hours ago        749MB
``` 

The different web applications should now be accessible:

* **ACS Repository**: http://localhost:8080/alfresco
* **ACS Share**: http://localhost:8180/share/ - login with admin/admin

#### Trying out the sample code

The AIO project has some sample extension code that you can try out. There is a one Repository extension and one Share extension 
that you can test to make sure the extension JARs have been applied properly.

The Repository extension is a Web Script that can be called with the following URL: `http://localhost:8080/alfresco/service/sample/helloworld`.
The source code for the Web Script is located here: `my-all-in-one-project/my-all-in-one-project-platform/src/main/resources/alfresco/extension/templates/webscripts/alfresco/tutorials` 
and here: `my-all-in-one-project/my-all-in-one-project-platform/src/main/java/ com/example/platformsample/HelloWorldWebScript.java`.

The Share extension is a custom Aikau page with a custom widget, you reach it with the following URL: `http://localhost:8180/share/page/hdp/ws/simple-page`.
The source code for the Page and Widget is located here: `my-all-in-one-project/my-all-in-one-project-share/src/main/resources/alfresco/web-extension/site-webscripts/com/example/pages` 
and here: `my-all-in-one-project/my-all-in-one-project-share/src/main/resources/META-INF/resources/my-all-in-one-project-share/js/tutorials/widgets`.

#### Looking inside the containers

Sometimes it's good to be able to look at what has actually been deployed in the containers. For example, how do I 
access the Repository container and list the custom Repository extension JARs that have been deployed? 

You can do that as follows:

First **Ctrl-C** out of the log tailing:

```bash 
my-all-in-one-project-acs_1       | 27-Mar-2019 07:26:23.893 INFO [main] org.apache.coyote.AbstractProtocol.start Starting ProtocolHandler ["http-nio-8080"]
my-all-in-one-project-acs_1       | 27-Mar-2019 07:26:23.914 INFO [main] org.apache.coyote.AbstractProtocol.start Starting ProtocolHandler ["ajp-nio-8009"]
my-all-in-one-project-acs_1       | 27-Mar-2019 07:26:23.940 INFO [main] org.apache.catalina.startup.Catalina.start Server startup in 83197 ms
my-all-in-one-project-acs_1       |  2019-03-27 07:26:24,304  INFO  [management.subsystems.ChildApplicationContextFactory] [http-nio-8080-exec-3] Starting 'Search' subsystem, ID: [Search, managed, solr6]
my-all-in-one-project-acs_1       |  2019-03-27 07:26:25,555  INFO  [management.subsystems.ChildApplicationContextFactory] [http-nio-8080-exec-3] Startup of 'Search' subsystem, ID: [Search, managed, solr6] complete
^CERROR: Aborting.
my-all-in-one-project mbergljung$ 
``` 

Then check the name of the ACS Repository container:

```bash 
$ docker container ls
CONTAINER ID        IMAGE                                                         COMMAND                  CREATED             STATUS              PORTS                                                      NAMES
733867a70117        alfresco-content-services-my-all-in-one-project:development   "catalina.sh run -se…"   5 minutes ago       Up 5 minutes        0.0.0.0:8080->8080/tcp, 0.0.0.0:8888->8888/tcp             docker_my-all-in-one-project-acs_1
1f197e52b4f2        alfresco/alfresco-search-services:1.2.0                       "/bin/sh -c '$DIST_D…"   5 minutes ago       Up 5 minutes        0.0.0.0:8983->8983/tcp                                     docker_my-all-in-one-project-ass_1
4eff0cc9cc25        alfresco-share-my-all-in-one-project:development              "/usr/local/tomcat/s…"   5 minutes ago       Up 5 minutes        8000/tcp, 0.0.0.0:8180->8080/tcp, 0.0.0.0:9898->8888/tcp   docker_my-all-in-one-project-share_1
a7854ff16d72        postgres:9.6                                                  "docker-entrypoint.s…"   5 minutes ago       Up 5 minutes        0.0.0.0:5555->5432/tcp                                     docker_my-all-in-one-project-postgres_1
``` 

Then open up a shell into the ACS Repository container:

```bash
my-all-in-one-project mbergljung$ docker exec -it docker_my-all-in-one-project-acs_1 /bin/bash
[root@733867a70117 tomcat]# pwd
/usr/local/tomcat
[root@733867a70117 tomcat]# ls -l webapps/alfresco/WEB-INF/lib | grep "my-all"
-rw-r--r-- 1 root root    17220 Mar 27 07:24 my-all-in-one-project-platform-1.0-SNAPSHOT.jar
[root@733867a70117 tomcat]# exit
exit
``` 

#### Updating extension code

So now you probably want to write some new code, or update the existing code, and see how that works with the containers running. 
What do you need to do, restart etc. First just update the code. For example, let's update the Repository Web Script 
to return a different message. Open up the `my-all-in-one-project/my-all-in-one-project-platform/src/main/resources/alfresco/extension/templates/webscripts/alfresco/tutorials/helloworld.get.html.ftl` 
file and change it to look as follows:

```text
Message: '${fromJS}' '${fromJava}' UPDATED!
``` 

To get this code update deployed we just have to run the following command in another console then where we are tailing the logs,
and stand in the directory where the `run.sh` script is located:

```bash
my-all-in-one-project mbergljung$ ./run.sh reload_acs
``` 

What this will do is the following:

* Kill the `my-all-in-one-project-acs` container 
* Remove the killed (stopped) `my-all-in-one-project-acs` container, so a new Docker image can be created with `development` tag
* Build the Repository extension JAR: `my-all-in-one-project/my-all-in-one-project-platform` 
* Copy the newly built Repository extension JAR over to the `my-all-in-one-project/my-all-in-one-project-platform-docker/target/extensions` where it will be picked up when the new Docker image is built.
* Build a new `alfresco-content-services-my-all-in-one-project:development` image
* Start up the `my-all-in-one-project-acs` container based on new image  

You will be left with the console tailing the logs, but you can **Ctrl-C** out of this as you are already tailing the logs 
in the initial console where we started things up.

You can now check if the change took effect by accessing the `http://localhost:8080/alfresco/service/sample/helloworld` Web Script.
 
#### Stopping the project

To stop the solution you need to first `Ctrl-C` out of the log tailing. This does not stop the containers 
as they run in daemon mode in the background. Check this by executing the following command that lists running containers:

```bash
$ docker container ls
CONTAINER ID        IMAGE                                                         COMMAND                  CREATED             STATUS              PORTS                                                      NAMES
49015432f1b2        alfresco-content-services-my-all-in-one-project:development   "catalina.sh run -se…"   20 minutes ago      Up 20 minutes       0.0.0.0:8080->8080/tcp, 0.0.0.0:8888->8888/tcp             docker_my-all-in-one-project-acs_1
edb9ea129a5d        postgres:9.6                                                  "docker-entrypoint.s…"   20 minutes ago      Up 20 minutes       0.0.0.0:5555->5432/tcp                                     docker_my-all-in-one-project-postgres_1
6992d183986f        alfresco/alfresco-search-services:1.2.0                       "/bin/sh -c '$DIST_D…"   20 minutes ago      Up 20 minutes       0.0.0.0:8983->8983/tcp                                     docker_my-all-in-one-project-ass_1
107d00733efd        alfresco-share-my-all-in-one-project:development              "/usr/local/tomcat/s…"   20 minutes ago      Up 20 minutes       8000/tcp, 0.0.0.0:8180->8080/tcp, 0.0.0.0:9898->8888/tcp   docker_my-all-in-one-project-share_1
``` 

Now, standing in the directory where the `run.sh` script is located execute the following command to stop and remove the containers:

```bash
my-all-in-one-project mbergljung$ ./run.sh stop
Stopping docker_my-all-in-one-project-acs_1      ... done
Stopping docker_my-all-in-one-project-postgres_1 ... done
Stopping docker_my-all-in-one-project-ass_1      ... done
Stopping docker_my-all-in-one-project-share_1    ... done
Removing docker_my-all-in-one-project-acs_1      ... done
Removing docker_my-all-in-one-project-postgres_1 ... done
Removing docker_my-all-in-one-project-ass_1      ... done
Removing docker_my-all-in-one-project-share_1    ... done
Removing network docker_default
``` 

### Working with Platform JAR project structure {#workingplatform}

Before you continue make sure that you have read and completed the tasks in the 
[Getting started](#gettingstarted) tutorial to generate a Platform project, 
which means selecting the `org.alfresco.maven.archetype:alfresco-platform-jar-archetype` 
Maven archetype when generating the project. The following information assumes that 
the Platform project was generated with the name `my-platform-project`.

#### Introduction

A Platform project is used to build extensions for the [Alfresco Content Services (ACS) Repository]({% link content-services/latest/develop/repo-ext-points/overview.md %}). 
The runtime environment for ACS is Docker so not only is this project building the source code for your extensions but also the 
custom Docker image for the Alfresco Repository. The custom Docker images includes the JARs, or AMPs, with your extension code. 

Looking into the generated Platform project we can see that we got a Docker Compose file (`my-platform-project/docker/docker-compose.yml`) 
that will be used to build custom Docker images and run the project. We also got a directory for our extension source code: 
`my-platform-project/src/main/java` and one directory with the Docker related stuff, such as the `Dockerfile` used to 
build the custom ACS Repository Docker image: `my-platform-project/src/main/docker`.

#### Configuration properties

There are a number of properties that we can customise when we run the Alfresco SDK project.
These configuration properties are defined in the `my-platform-project/pom.xml` project file.

The following table explains some of these properties:

| Name | Type | Default value | Description |
| ---- | ---- | ------------- | ----------- |
| alfresco.platform.version | `string` | 6.1.2-ga | The version of the ACS Repository (i.e. alfresco.war) that the Repository Extension should be applied to. This also specifies the version of the ACS Repository Docker Image that the custom built Repository image should be based on. See `my-platform-project-platform-docker/src/main/docker/Dockerfile` |
| alfresco.share.version | `string` | 6.1.0-RC3 | The version of Alfresco Share (i.e. share.war) that the Share Extension should be applied to. This also specifies the version of the Alfresco Share Docker Image that the custom built Share image should be based on. See `my-platform-project-share-docker/src/main/docker/Dockerfile`|
| docker.acs.image | `string` | alfresco/alfresco-content-repository-community | The name of the ACS Repository Docker image in Docker Hub. This changes if you switch to Enterprise Edition.|
| docker.share.image | `string` | alfresco/alfresco-share | The name of the Alfresco Share Docker image in Docker Hub. This changes if you switch to Enterprise Edition.|
| share.port | `number` | 8180 | The external port (i.e. outside container) for the Alfresco Share webapp.|
| share.debug.port | `number` | 9898 | The external port (i.e. outside container) for Alfresco Share remote debugging.|
| acs.host | `string` | my-platform-project-acs | This is the name (host) that the ACS Repository is available at. This maps to the service name for the ACS Repository in the Docker Compose file `my-platform-project/docker/docker-compose.yml`. The name is only useful for communication between containers on the default Docker network that is created. |
| acs.port | `number` | 8080 | The external port (i.e. outside container) for the ACS Repository.|
| acs.debug.port | `number` | 8888 | The external port (i.e. outside container) for ACS Repository remote debugging.|
| postgres.port | `number` | 5555 | The external port (i.e. outside container) for PostgreSQL database.|

There are some Alfresco Share related properties listed here, but they are not used unless you uncomment some code in the 
Docker Compose file (`my-platform-project/docker/docker-compose.yml`) to run the Alfresco Share container.

When you first start out you don't need to change any of these properties, just use the defaults and try it out.

#### Building and running the project

The first thing you need to do before you can run anything is to build the custom ACS Repository Docker image with the custom extensions.
We can build the image and extensions at the same time as we start (run) the project by using the `./run.sh build_start` script 
(on Windows use the `run.bat build_start` script instead).

Note that if you have another Alfresco SDK project running, then you need to stop it first. Also, make sure that the 
following ports are free: 8180 (Share - if enabled in Docker Compose), 8080 (Alfresco Repo), 9898 (Share Debug - if enabled in Docker Compose), 
8888 (Alfresco Repo Debug), 5555 (Postgres).
If you want to change the ports see the properties section of `my-platform-project/pom.xml`. This project file also 
contains the versions of Alfresco Repository and Alfresco Share (if enabled) that will be used.  

```bash
$ cd my-platform-project/
MBP512-MBERGLJUNG-0917:my-platform-project mbergljung$ ./run.sh build_start
[INFO] Scanning for projects...
[INFO] 
[INFO] ------------------------------------------------------------------------
[INFO] Building my-platform-project Platform/Repository JAR Module 1.0-SNAPSHOT
[INFO] ------------------------------------------------------------------------
...
[INFO] ------------------------------------------------------------------------
[INFO] BUILD SUCCESS
[INFO] ------------------------------------------------------------------------
[INFO] Total time: 8.323 s
[INFO] Finished at: 2019-03-27T09:23:28Z
[INFO] Final Memory: 62M/227M
[INFO] ------------------------------------------------------------------------
my-platform-project-acs-volume
my-platform-project-db-volume
my-platform-project-ass-volume
Creating network "docker_default" with the default driver
Building my-platform-project-acs
...
Successfully tagged alfresco-content-services-my-platform-project:development
Creating docker_my-platform-project-postgres_1 ... done
Creating docker_my-platform-project-ass_1      ... done
Creating docker_my-platform-project-acs_1      ... done
Attaching to docker_my-platform-project-acs_1, docker_my-platform-project-ass_1, docker_my-platform-project-postgres_1
...
my-platform-project-acs_1       | 27-Mar-2019 09:25:12.923 INFO [main] org.apache.coyote.AbstractProtocol.start Starting ProtocolHandler ["http-nio-8080"]
my-platform-project-acs_1       | 27-Mar-2019 09:25:12.947 INFO [main] org.apache.coyote.AbstractProtocol.start Starting ProtocolHandler ["ajp-nio-8009"]
my-platform-project-acs_1       | 27-Mar-2019 09:25:12.955 INFO [main] org.apache.catalina.startup.Catalina.start Server startup in 91144 ms``` 
```

The `./run.sh build_start` script will do the following:

* Stop anything running already with this project's Docker Compose file: `my-platform-project/docker/docker-compose.yml` 
* Build the Repository Extension JARs so we are sure to get the latest changes
* Assemble/Aggregate all Repository extension JARs into the `my-platform-project/target/extensions` directory
* Create Docker Volumes for Repository (alf_data), Search index, and Database so data is persisted outside the containers
* Run the project via the Docker Compose file and instruct Docker Compose to build the custom Docker images first
* Tail the logs of all containers

This will build the following Docker image:

```bash 
$ docker image ls|more
REPOSITORY                                                       TAG                                          IMAGE ID            CREATED             SIZE
alfresco-content-services-my-platform-project                    development                                  b2b9a7b730f5        5 minutes ago       2.07GB
``` 

The different web applications should now be accessible:

* **ACS Repository**: http://localhost:8080/alfresco
* And optionally (if enabled in Docker Compose file) **ACS Share**: http://localhost:8180/share/ - login with admin/admin

#### Trying out the sample code

The Platform project has some sample extension code that you can try out. 

The Repository extension is a Web Script that can be called with the following URL: `http://localhost:8080/alfresco/service/sample/helloworld`.
The source code for the Web Script is located here: `my-platform-project/src/main/resources/alfresco/extension/templates/webscripts/alfresco/tutorials` 
and here: `my-platform-project/src/main/java/ com/example/platformsample/HelloWorldWebScript.java`.

#### Looking inside the containers

Sometimes it's good to be able to look at what has actually been deployed in the containers. For example, how do I 
access the Repository container and list the custom Repository extension JARs that have been deployed? 

You can do that as follows:

First **Ctrl-C** out of the log tailing:

```text 
my-platform-project-acs_1       | 27-Mar-2019 09:25:12.923 INFO [main] org.apache.coyote.AbstractProtocol.start Starting ProtocolHandler ["http-nio-8080"]
my-platform-project-acs_1       | 27-Mar-2019 09:25:12.947 INFO [main] org.apache.coyote.AbstractProtocol.start Starting ProtocolHandler ["ajp-nio-8009"]
my-platform-project-acs_1       | 27-Mar-2019 09:25:12.955 INFO [main] org.apache.catalina.startup.Catalina.start Server startup in 91144 ms
my-platform-project-acs_1       |  2019-03-27 09:25:40,406  INFO  [management.subsystems.ChildApplicationContextFactory] [http-nio-8080-exec-6] Starting 'Transformers' subsystem, ID: [Transformers, default]
my-platform-project-acs_1       |  2019-03-27 09:25:40,948  INFO  [management.subsystems.ChildApplicationContextFactory] [http-nio-8080-exec-6] Startup of 'Transformers' subsystem, ID: [Transformers, default] complete
^[[B^CERROR: Aborting.
my-platform-project mbergljung$
``` 

Then check the name of the ACS Repository container:

```bash 
$ docker container ls
CONTAINER ID        IMAGE                                                       COMMAND                  CREATED             STATUS              PORTS                                            NAMES
ba90b1648470        alfresco-content-services-my-platform-project:development   "catalina.sh run -se…"   8 minutes ago       Up 8 minutes        0.0.0.0:8080->8080/tcp, 0.0.0.0:8888->8888/tcp   docker_my-platform-project-acs_1
0435b09e687c        alfresco/alfresco-search-services:1.2.0                     "/bin/sh -c '$DIST_D…"   8 minutes ago       Up 8 minutes        0.0.0.0:8983->8983/tcp                           docker_my-platform-project-ass_1
c9145e7cdb20        postgres:9.6                                                "docker-entrypoint.s…"   8 minutes ago       Up 8 minutes        0.0.0.0:5555->5432/tcp                           docker_my-platform-project-postgres_1
``` 

Then open up a shell into the ACS Repository container:

```bash 
my-platform-project mbergljung$ docker exec -it docker_my-platform-project-acs_1 /bin/bash
[root@ba90b1648470 tomcat]# pwd
/usr/local/tomcat
[root@ba90b1648470 tomcat]# ls -l webapps/alfresco/WEB-INF/lib | grep "my-plat"
-rw-r--r-- 1 root root    21180 Mar 27 09:23 my-platform-project-1.0-SNAPSHOT.jar
-rw-r--r-- 1 root root    13692 Mar 27 09:23 my-platform-project-1.0-SNAPSHOT-tests.jar
[root@ba90b1648470 tomcat]# exit
exit
``` 

#### Updating extension code

So now you probably want to write some new code, or update the existing code, and see how that works with the containers running. 
What do you need to do, restart etc. First just update the code. For example, let's update the Repository Web Script 
to return a different message. Open up the `my-platform-project/src/main/resources/alfresco/extension/templates/webscripts/alfresco/tutorials/helloworld.get.html.ftl` 
file and change it to look as follows:

```text 
Message: '${fromJS}' '${fromJava}' UPDATED!
``` 

To get this code update deployed we have to run the following commands:

First `Ctrl-C` out of the log tailing.

Then stop the project:

```bash 
my-platform-project mbergljung$ ./run.sh stop
Stopping docker_my-platform-project-acs_1      ... done
Stopping docker_my-platform-project-ass_1      ... done
Stopping docker_my-platform-project-postgres_1 ... done
Removing docker_my-platform-project-acs_1      ... done
Removing docker_my-platform-project-ass_1      ... done
Removing docker_my-platform-project-postgres_1 ... done
Removing network docker_default
``` 

Now build and start again:

```bash
my-platform-project mbergljung$ ./run.sh build_start
...
``` 

What this will do is the following:

* Kill the `my-platform-project-acs` container 
* Removed the killed (stopped) `my-platform-project-acs` container, so a new Docker image can be created with `development` tag
* Build the Repository extension JAR
* Copy the newly built Repository extension JAR over to the `my-platform-project/target/extensions` where it will be picked up when the new Docker image is built.
* Build a new `alfresco-content-services-my-platform-project:development` image
* Start up the `my-platform-project-acs` container based on new image  

You can now check if the change took effect by accessing the `http://localhost:8080/alfresco/service/sample/helloworld` Web Script.
 
#### Stopping the project

To stop the solution you need to first `Ctrl-C` out of the log tailing. This does not stop the containers 
as they run in daemon mode in the background. Check this by executing the following command that lists running containers:

```bash
$ docker container ls
CONTAINER ID        IMAGE                                                       COMMAND                  CREATED             STATUS              PORTS                                            NAMES
61de829092f3        alfresco-content-services-my-platform-project:development   "catalina.sh run -se…"   3 minutes ago       Up 3 minutes        0.0.0.0:8080->8080/tcp, 0.0.0.0:8888->8888/tcp   docker_my-platform-project-acs_1
07300ddb6714        alfresco/alfresco-search-services:1.2.0                     "/bin/sh -c '$DIST_D…"   3 minutes ago       Up 3 minutes        0.0.0.0:8983->8983/tcp                           docker_my-platform-project-ass_1
09922ce36d90        postgres:9.6                                                "docker-entrypoint.s…"   3 minutes ago       Up 3 minutes        0.0.0.0:5555->5432/tcp                           docker_my-platform-project-postgres_1
``` 

Now, standing in the directory where the `run.sh` script is located execute the following command to stop and remove the containers:

```bash 
my-platform-project mbergljung$ ./run.sh stop
Stopping docker_my-platform-project-acs_1      ... done
Stopping docker_my-platform-project-ass_1      ... done
Stopping docker_my-platform-project-postgres_1 ... done
Removing docker_my-platform-project-acs_1      ... done
Removing docker_my-platform-project-ass_1      ... done
Removing docker_my-platform-project-postgres_1 ... done
Removing network docker_default
``` 

### Working with Share JAR project structure {#workingshare}

Before you continue make sure that you have read and completed the tasks in the 
[Getting started](#gettingstarted) tutorial to generate an Alfresco Share project, 
which means selecting the `org.alfresco.maven.archetype:alfresco-share-jar-archetype` 
Maven archetype when generating the project. The following information assumes that 
the Share project was generated with the name `my-share-project`.

## Introduction
An Alfresco Sharte project is used to build extensions for [Alfresco Share UI]({% link content-services/latest/develop/share-ext-points/overview.md %}). 
The runtime environment for ACS is Docker so not only is this project building the source code for your extensions but also the 
custom Docker image for Alfresco Share. The custom Docker images includes the 
JARs, or AMPs, with your extension code. 

Looking into the generated Share project we can see that we got a Docker Compose file (`my-share-project/docker/docker-compose.yml`) 
that will be used to build custom Docker images and run the project. We also got a directory for our extension source code: 
`my-share-project/src/main/java` and one directory with the Docker related stuff, such as the `Dockerfile` used to 
build the custom Alfresco Share Docker image: `my-share-project/src/main/docker`.

#### Configuration properties

There are a number of properties that we can customise when we run the Alfresco SDK project.
These configuration properties are defined in the `my-share-project/pom.xml` project file.

The following table explains some of these properties:

| Name | Type | Default value | Description |
| ---- | ---- | ------------- | ----------- |
| alfresco.platform.version | `string` | 6.1.2-ga | The version of the ACS Repository (i.e. alfresco.war) that the Repository Extension should be applied to. This also specifies the version of the ACS Repository Docker Image that the custom built Repository image should be based on. See `my-share-project-platform-docker/src/main/docker/Dockerfile` |
| alfresco.share.version | `string` | 6.1.0-RC3 | The version of Alfresco Share (i.e. share.war) that the Share Extension should be applied to. This also specifies the version of the Alfresco Share Docker Image that the custom built Share image should be based on. See `my-share-project-share-docker/src/main/docker/Dockerfile`|
| docker.acs.image | `string` | alfresco/alfresco-content-repository-community | The name of the ACS Repository Docker image in Docker Hub. This changes if you switch to Enterprise Edition.|
| docker.share.image | `string` | alfresco/alfresco-share | The name of the Alfresco Share Docker image in Docker Hub. This changes if you switch to Enterprise Edition.|
| share.port | `number` | 8180 | The external port (i.e. outside container) for the Alfresco Share webapp.|
| share.debug.port | `number` | 9898 | The external port (i.e. outside container) for Alfresco Share remote debugging.|
| acs.host | `string` | my-share-project-acs | This is the name (host) that the ACS Repository is available at. This maps to the service name for the ACS Repository in the Docker Compose file `my-share-project/docker/docker-compose.yml`. The name is only useful for communication between containers on the default Docker network that is created. |
| acs.port | `number` | 8080 | The external port (i.e. outside container) for the ACS Repository.|
| acs.debug.port | `number` | 8888 | The external port (i.e. outside container) for ACS Repository remote debugging.|
| postgres.port | `number` | 5555 | The external port (i.e. outside container) for PostgreSQL database.|

There are some ACS Repository related properties listed here, such as `acs.host` and `acs.port`. Alfresco Share will use those
to connect to the Alfresco Repository. This is however a bit tricky when we are running in a container environment. You cannot
just start the Repository and make it available on `localhost:8080`. It would not be accessible like that from inside the 
Share container. For Share to be able to connect to the Repository both containers need to be attached to the same 
Docker Network. This way you can just use the Docker Compose service name for the Repository, such as `my-share-project-acs`.
So the best way to test your Share extension is to uncomment the code in the Docker Compose file 
(`my-share-project/docker/docker-compose.yml`) to also run the ACS Repository container, Search, and Postgres.

#### Building and running the project

The first thing you need to do before you can run anything is to build the custom Share Docker image with the custom extensions.
We can build the image and extensions at the same time as we start (run) the project by using the `./run.sh build_start` script 
(on Windows use the `run.bat build_start` script instead).

Note that if you have another Alfresco SDK project running, then you need to stop it first. Also, make sure that the 
following ports are free: 8180 (Share), 8080 (Alfresco Repo - if enabled in Docker Compose), 9898 (Share Debug), 8888 (Alfresco Repo Debug - if enabled), 5555 (Postgres).
If you want to change the ports see the properties section of `my-share-project/pom.xml`. This project file also 
contains the versions of Alfresco Repository (if enabled) and Alfresco Share that will be used.  

When I run the project I have uncommented the code (make sure to also remove the "# Optional" line) that starts 
the Repository, Search, and PostgresSQL in the (`my-share-project/docker/docker-compose.yml`) file, so I can test the Share extension:  

```bash
$ cd my-share-project
my-share-project mbergljung$ ./run.sh build_start
[INFO] Scanning for projects...
[INFO] ------------------------------------------------------------------------
[INFO] Building my-share-project Share JAR Module 1.0-SNAPSHOT
[INFO] ------------------------------------------------------------------------
...
[INFO] ------------------------------------------------------------------------
[INFO] BUILD SUCCESS
[INFO] ------------------------------------------------------------------------
[INFO] Total time: 2.856 s
[INFO] Finished at: 2019-03-27T10:07:14Z
[INFO] Final Memory: 29M/104M
[INFO] ------------------------------------------------------------------------
my-share-project-acs-volume
my-share-project-db-volume
my-share-project-ass-volume
Creating network "docker_default" with the default driver
Building my-share-project-share
...
Successfully tagged alfresco-share-my-share-project:development...
...
my-share-project-acs_1       | 27-Mar-2019 10:09:01.158 INFO [main] org.apache.coyote.AbstractProtocol.start Starting ProtocolHandler ["http-nio-8080"]
my-share-project-acs_1       | 27-Mar-2019 10:09:01.175 INFO [main] org.apache.coyote.AbstractProtocol.start Starting ProtocolHandler ["ajp-nio-8009"]
my-share-project-acs_1       | 27-Mar-2019 10:09:01.213 INFO [main] org.apache.catalina.startup.Catalina.start Server startup in 95189 ms
``` 

The `./run.sh build_start` script will do the following:

* Stop anything running already with this project's Docker Compose file: `my-share-project/docker/docker-compose.yml` 
* Build the Share Extension JARs so we are sure to get the latest changes
* Assemble/Aggregate all Share extension JARs into the `my-share-project/target/extensions` directory
* Create Docker Volumes for Repository (alf_data), Search index, and Database so data is persisted outside the containers
* Run the project via the Docker Compose file and instruct Docker Compose to build the custom Docker images first
* Tail the logs of all containers

This will build the following Docker image:

```bash 
$ docker image ls
REPOSITORY                                                       TAG                                          IMAGE ID            CREATED              SIZE
alfresco-share-my-share-project                                  development                                  b8b9acdb3425        About a minute ago   749MB
``` 

The different web applications should now be accessible:

* **ACS Repository**: http://localhost:8080/alfresco
* **ACS Share**: http://localhost:8180/share/ - login with admin/admin

#### Trying out the sample code

The Share project has some sample extension code that you can try out. 

The Share extension is a custom Aikau page with a custom widget, you reach it with the following URL: `http://localhost:8180/share/page/hdp/ws/simple-page`.
The source code for the Page and Widget is located here: `my-share-project/src/main/resources/alfresco/web-extension/site-webscripts/com/example/pages` 
and here: `my-share-project/src/main/resources/META-INF/resources/my-share-project-share/js/tutorials/widgets`.

#### Looking inside the containers

Sometimes it's good to be able to look at what has actually been deployed in the containers. For example, how do I 
access the Share container and list the custom Share extension JARs that have been deployed? 

You can do that as follows:

First **Ctrl-C** out of the log tailing:

```text 
my-share-project-acs_1       | 27-Mar-2019 10:09:01.213 INFO [main] org.apache.catalina.startup.Catalina.start Server startup in 95189 ms
my-share-project-acs_1       |  2019-03-27 10:09:30,278  INFO  [management.subsystems.ChildApplicationContextFactory] [http-nio-8080-exec-5] Starting 'Transformers' subsystem, ID: [Transformers, default]
my-share-project-acs_1       |  2019-03-27 10:09:30,618  INFO  [management.subsystems.ChildApplicationContextFactory] [http-nio-8080-exec-5] Startup of 'Transformers' subsystem, ID: [Transformers, default] complete
my-share-project-share_1     | 2019-03-27 10:11:50,150  INFO  [web.site.EditionInterceptor] [http-nio-8080-exec-1] Successfully retrieved license information from Alfresco.
my-share-project-share_1     | 2019-03-27 10:12:11,652  INFO  [web.scripts.ImapServerStatus] [http-nio-8080-exec-7] Successfully retrieved IMAP server status from Alfresco: disabled
^CERROR: Aborting.
my-share-project mbergljung$ 
``` 

Then check the name of the Alfresco Share container:

```bash 
$ docker container ls
CONTAINER ID        IMAGE                                                     COMMAND                  CREATED             STATUS              PORTS                                                      NAMES
dda89172506c        alfresco/alfresco-content-repository-community:6.1.2-ga   "catalina.sh run -se…"   6 minutes ago       Up 6 minutes        0.0.0.0:8080->8080/tcp                                     docker_my-share-project-acs_1
2b4fa4b4a3f6        alfresco-share-my-share-project:development               "/usr/local/tomcat/s…"   6 minutes ago       Up 6 minutes        8000/tcp, 0.0.0.0:8180->8080/tcp, 0.0.0.0:9898->8888/tcp   docker_my-share-project-share_1
ad8857f3574b        postgres:9.6                                              "docker-entrypoint.s…"   6 minutes ago       Up 6 minutes        0.0.0.0:5555->5432/tcp                                     docker_my-share-project-postgres_1
92902d7ae624        alfresco/alfresco-search-services:1.2.0                   "/bin/sh -c '$DIST_D…"   6 minutes ago       Up 6 minutes        0.0.0.0:8983->8983/tcp                                     docker_my-share-project-ass_1
``` 

Then open up a shell into the Alfresco Share container:

```bash 
my-share-project mbergljung$ docker exec -it docker_my-share-project-share_1 /bin/bash
[root@2b4fa4b4a3f6 tomcat]# pwd
/usr/local/tomcat
[root@2b4fa4b4a3f6 tomcat]# ls -l webapps/share/WEB-INF/lib/ | grep "my-sh"
-rw-r--r-- 1 root root    18920 Mar 27 10:07 my-share-project-1.0-SNAPSHOT.jar
[root@2b4fa4b4a3f6 tomcat]# exit
exit
``` 

#### Updating extension code

So now you probably want to write some new code, or update the existing code, and see how that works with the containers running. 
What do you need to do, restart etc. First just update the code. For example, let's update the Share Page title. 
Open up the `my-share-project/src/main/resources/alfresco/web-extension/site-webscripts/com/example/pages/simple-page.get.js` 
file and change it to look as follows:

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

To get this code update deployed we just have to run the following command in another console then where we are tailing the logs,
and stand in the directory where the `run.sh` script is located:

```bash 
my-share-project mbergljung$ ./run.sh reload_share
``` 

What this will do is the following:

* Kill the `my-share-project-acs` container 
* Remove the killed (stopped) `my-share-project-acs` container, so a new Docker image can be created with `development` tag
* Build the Share extension JAR
* Copy the newly built Share extension JAR over to the `my-share-project/target/extensions` where it will be picked up when the new Docker image is built.
* Build a new `alfresco-share-my-share-project:development` image
* Start up the `my-share-project-acs` container based on new image  

You will be left with the console tailing the logs, but you can **Ctrl-C** out of this as you are already tailing the logs 
in the initial console where we started things up.

You can now check if the change took effect by accessing the `http://localhost:8180/share/page/hdp/ws/simple-page` Web Script.
 
#### Stopping the project

To stop the solution you need to first `Ctrl-C` out of the log tailing. This does not stop the containers 
as they run in daemon mode in the background. Check this by executing the following command that lists running containers:

```bash 
$ docker container ls
CONTAINER ID        IMAGE                                                     COMMAND                  CREATED             STATUS              PORTS                                                      NAMES
59f02060955a        alfresco-share-my-share-project:development               "/usr/local/tomcat/s…"   4 minutes ago       Up 4 minutes        8000/tcp, 0.0.0.0:8180->8080/tcp, 0.0.0.0:9898->8888/tcp   docker_my-share-project-share_1
dda89172506c        alfresco/alfresco-content-repository-community:6.1.2-ga   "catalina.sh run -se…"   16 minutes ago      Up 16 minutes       0.0.0.0:8080->8080/tcp                                     docker_my-share-project-acs_1
ad8857f3574b        postgres:9.6                                              "docker-entrypoint.s…"   16 minutes ago      Up 16 minutes       0.0.0.0:5555->5432/tcp                                     docker_my-share-project-postgres_1
92902d7ae624        alfresco/alfresco-search-services:1.2.0                   "/bin/sh -c '$DIST_D…"   16 minutes ago      Up 16 minutes       0.0.0.0:8983->8983/tcp                                     docker_my-share-project-ass_1
``` 

Now, standing in the directory where the `run.sh` script is located execute the following command to stop and remove the containers:

```bash 
my-share-project mbergljung$ ./run.sh stop
Stopping docker_my-share-project-share_1    ... done
Stopping docker_my-share-project-acs_1      ... done
Stopping docker_my-share-project-postgres_1 ... done
Stopping docker_my-share-project-ass_1      ... done
Removing docker_my-share-project-share_1    ... done
Removing docker_my-share-project-acs_1      ... done
Removing docker_my-share-project-postgres_1 ... done
Removing docker_my-share-project-ass_1      ... done
Removing network docker_default
``` 

### All-In-One (AIO) project structure {#structureaio}

This page provides a detailed description of the All-In-One (AIO) project, including the project structure and folder contents.

Now that you know what an All-In-One project is, let’s introduce the structure of the project, once it is created using the 
`org.alfresco.maven.archetype:alfresco-allinone-archetype`.

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
│               ├── dev-log4j.properties
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
│               ├── log4j.properties
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
* `my-all-in-one-project-platform-docker` (typically named `<artefactId-platform-docker>`) contains a sub-project dedicated to the configuration of a custom Docker image with the Alfresco Content Services Repository and the customization module `my-all-in-one-project-platform` installed.
* `my-all-in-one-project-platform` (typically named `<artefactId-platform>`) contains a sub-project entirely dedicated to the customization of the Alfresco Content Services Repository.
* `my-all-in-one-project-share-docker` (typically named `<artefactId-share-docker>`) contains a sub-project dedicated to the configuration of a custom Docker image with the Alfresco Share client and the customization module `my-all-in-one-project-share` installed.
* `my-all-in-one-project-share` (typically named `<artefactId-share>`) contains a sub-project entirely dedicated to the customization of the Alfresco Share client.

After this brief introduction of the All-In-One project, let’s focus on the content of the folders.

#### Project root folder

Below is a description of the files in the root of the project (in this case, `my-all-in-one-project`).

|File | Description|
|--- | ---|
|`run` (`sh` and `bat`) | Utility script to work with the project (compile, run, test, show logs, etc.). [More details about the run script](#workingwithrunscript).|
|`pom.xml` | This XML file contains information about the project and configuration details used by Apache Maven to build the project. You can define all the configurations, parameters, and settings in this file for projects as well as for sub-projects.|
|`README.md` | File in Markdown format containing the documentation for the project.|

#### my-all-in-one-project-platform

Below is a description of the content in the `my-all-in-one-project-platform` (typically named `<artefactId-platform>`) sub-project. This sub-project 
contains the source code entirely dedicated to the customizing the Alfresco Content Services Repository.

|Content | Description|
|--- | ---|
|`pom.xml` | This XML file contains information about the project and configuration details used by Apache Maven to build the project. You can define all the configurations, parameters, and settings in this file even if it depends on the parent pom in the root folder. For the majority of use cases, settings and configurations are directly inherited from the parent pom, and this file can work in its default version.|
|`src/main/assembly` | In this folder you can find everything that's needed to fully control creating the AMP artifact in the platform project. The main file to check is `amp.xml`.|
|`src/main/java/<groupId>...` | This folder contains the same content you can find in a regular Java project, i.e. the Java source code. Here you should put all the custom classes, interfaces, and Java source code in general.|
|`src/main/resources/alfresco/extension/templates/webscripts` | In this folder you can find the extensions to the REST API related to Web Scripts . Repository Web Scripts are defined in XML, JavaScript, and FreeMarker files. These are referred to as Data Web Scripts as they usually return JSON or XML. The default project contains a Hello World example.|
|`src/main/resources/alfresco/module/<artifactId>` | This folder contains all the configuration files and settings for the Alfresco platform module. Here you can find context files, the `alfresco-global.properties` file, Content Model examples, and Activiti workflow examples.|
|`src/main/resources/META-INF` | This folder hosts the content that will be placed in the `META-INF` folder of a standard Java web application.|
|`src/test/java/<groupId>...` | This folder contains the same content you can find in a regular Java project, i.e. the Java source code for tests. Here you should put all the custom classes, interfaces, and Java source code related to tests.|

#### my-all-in-one-project-platform-docker

Below is a description of the content in the `my-all-in-one-project-platform-docker` (typically named `<artefactId-platform-docker>`) sub-project. This 
sub-project contains the resources required to define a custom Docker image with the Alfresco Content Services Repository and the customization module 
`my-all-in-one-project-platform` installed.

Content | Description
--- | ---
`pom.xml` | This XML file contains information about the project and configuration details used by Apache Maven to build the project. It adds the dependency to the `my-all-in-one-project-platform` module and configures the `maven-dependency-plugin` to copy all the artifacts required in the Docker image into the folder `${project.build.directory}/extensions`.
`src/main/docker` | In this folder you can find everything that's needed to fully configure the custom ACS Docker image.
`src/main/docker/Dockerfile` | This is the file that define the custom ACS Docker image. The default configuration installs all the existing JARs and AMPs under `${project.build.directory}/extensions` folder and adds custom configuration and license files.
`src/main/docker/license` | This folder contains the licenses required for running an Enterprise project.

#### my-all-in-one-project-share

Below is a description of the content in the `my-all-in-one-project-share` (typically named `<artefactId-share>`) sub-project. This sub-project 
contains the source code entirely dedicated to the customizing the Alfresco Share client.

Content | Description
--- | ---
`pom.xml` | This XML file contains information about the project and configuration details used by Apache Maven to build the project. You can define all the configurations, parameters, and settings in this file even if it depends on the parent pom in the root folder. For the majority of use cases, settings and configurations are directly inherited from the parent pom, and this file can work in its default version.
`src/main/assembly` | In this folder you can find everything that's needed to fully control creating the AMP artifact in the platform project. The main file to check is `amp.xml`.
`src/main/java/<groupId>...` | This folder contains the same content you can find in a regular Java project, i.e. the Java source code. Here you should put all the custom classes, interfaces, and Java source code in general.
`src/main/resources/alfresco/module/<artifactId>` | This folder contains all the configuration files and settings for the Alfresco Share module. Here you can find the property file for the module.
`src/main/resources/alfresco/web-extension` | In this folder you can find the extensions to the web client (Alfresco Share) and it's where you store Spring configurations that extend and override the system Share configuration. There are two important sub-directories here: `site-data` and `site-webscripts`.
`src/main/resources/alfresco/META-INF/resources` | This folder hosts the content that will be placed in the `META-INF` folder of a standard Java web application. It is best practice to use a further subdirectory based on the module name. This allows you to manage multiple modules, so that their web resources don't conflict with each other.
`src/main/resources/alfresco/META-INF/share-config-custom.xml` | This file is a relevant Alfresco Share file used to configure the sub-project with the correct settings, depending on your environment. For more details, see [Share configuration](http://docs.alfresco.com/5.2/concepts/dev-extensions-share-configuration.html).
`src/test/java/<groupId>...` | This folder contains the same content you can find in a regular Java project, i.e. the Java source code for tests. Here you should put all the custom classes, interfaces, and Java source code related to tests.

#### my-all-in-one-project-share-docker

Below is a description of the content in the `my-all-in-one-project-share-docker` (typically named `<artefactId-share-docker>`) sub-project. This 
sub-project contains the resources required to define a custom Docker image with the Alfresco Share Client and the customization module 
`my-all-in-one-project-share` installed.

Content | Description
--- | ---
`pom.xml` | This XML file contains information about the project and configuration details used by Apache Maven to build the project. It adds the dependency to the `my-all-in-one-project-share` module and configures the `maven-dependency-plugin` to copy all the artifacts required in the Docker image into the folder `${project.build.directory}/extensions`.
`src/main/docker` | In this folder you can find everything that's needed to fully configure the custom Alfresco Share Docker image.
`src/main/docker/Dockerfile` | This is the file that define the custom Alfresco Share Docker image. The default configuration installs all the existing JARs and AMPs under `${project.build.directory}/extensions` folder and adds custom configuration files.

#### my-all-in-one-project-integration-tests

Below is a description of the content in the `my-all-in-one-project-integration-tests` (typically named `<artefactId-integration-tests>`) sub-project. This sub-project contains all the source code and resources needed to run the integration tests.

Content | Description
--- | ---
`pom.xml` | This XML file contains information about the project and configuration details used by Apache Maven to build the project. You can define all the configurations, parameters, and settings in this file even if it depends on the parent pom in the root folder. For the majority of use cases, settings and configurations are directly inherited from the parent pom, and this file can work in its default version.
`src/main/java/<groupId>...` | This folder contains the same content you can find in a regular Java project, i.e. the Java source code. Here you should put all the custom classes, interfaces, and Java source code in general. The folder is empty by default.
`src/test/java/<groupId>...` | This folder contains the same content you can find in a regular Java project, i.e. the Java source code for tests. Here you should put all the custom classes, interfaces, and Java source code in general related to tests. By default you can find three different tests related to content modelling, custom components, and web scripts.

### Platform JAR project structure {#structureplatform}

This page provides a detailed description of the Platform JAR project, including the project structure and folder content.

Now that you know what a Platform JAR project is, let’s introduce the structure of the project, once it is created using the 
`org.alfresco.maven.archetype:alfresco-platform-jar-archetype`.

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
    │   │   ├── dev-log4j.properties
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
    │                   ├── log4j.properties
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
* `src` contains the source code, tests, configurations, settings and resources that are entirely dedicated to the customization of the Alfresco Content Services Repository.

After this brief introduction of the Platform JAR project, let’s focus on the content of the folders.

#### Project root folder

Below is a description of the files in the root of the project (in this case, `my-platform-jar-project`).

File | Description
--- | ---
`run` (`sh` and `bat`) | Utility script to work with the project (compile, run, test, show logs, etc.). [More details about the run script](#workingwithrunscript).
`pom.xml` | This XML file contains information about the project and configuration details used by Apache Maven to build the project.
`README.md` | File in Markdown format containing the documentation for the project.

#### `src` folder

Below is a description of the content in the `src` folder. This folder contains the source code, tests, configuration, settings, and resources entirely 
dedicated to the customization of the Alfresco Content Services Repository.

Content | Description
--- | ---
`src/main/assembly` | In this folder you can find everything that's needed to fully control creating the AMP artifact in the platform project. The main file to check is `amp.xml`.
`src/main/docker` | In this folder you can find everything that's needed to fully configure the custom ACS Docker image.
`src/main/docker/Dockerfile` | This is the file that define the custom ACS Docker image. The default configuration installs all the existing JARs and AMPs under `${project.build.directory}/extensions` folder and adds custom configuration and license files.
`src/main/docker/license` | This folder contains the licenses required for running an Enterprise project.
`src/main/java/<groupId>...` | This folder contains the same content you can find in a regular Java project, i.e. the Java source code. Here you should put all the custom classes, interfaces, and Java source code in general.
`src/main/resources/alfresco/extension/templates/webscripts` | In this folder you can find the extensions to the REST API related to Web Scripts . Repository Web Scripts are defined in XML, JavaScript, and FreeMarker files. These are referred to as Data Web Scripts as they usually return JSON or XML. The default project contains a Hello World example.
`src/main/resources/alfresco/module/<artifactId>` | This folder contains all the configuration files and settings for the Alfresco platform module. Here you can find context files, the `alfresco-global.properties` file, Content Model examples, and Activiti workflow examples.
`src/main/resources/META-INF` | This folder hosts the content that will be placed in the `META-INF` folder of a standard Java web application.
`src/test/java/<groupId>...` | This folder contains the same content you can find in a regular Java project, i.e. the Java source code for tests. Here you should put all the custom classes, interfaces, and Java source code related to tests.

### Share JAR project structure {#structureshare}

The following page provides a detailed description of the Share client JAR project, including the project structure and folder content.

Now that you know what a Share JAR project is, let’s introduce the structure of the project, once it is created using the 
`org.alfresco.maven.archetype:alfresco-share-jar-archetype`.

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
    │   │   ├── log4j.properties
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

#### Project root folder

Below is a description of the files in the root of the project (in this case, `my-share-jar-project`).

File | Description
--- | ---
`run` (`sh` and `bat`) | Utility script to work with the project (compile, run, test, show logs, etc.). [More details about the run script](#workingwithrunscript).
`pom.xml` | This XML file contains information about the project and configuration details used by Apache Maven to build the project.
`README.md` | File in Markdown format containing the documentation for the project.

#### `src` folder

Below is a description of the content in the `src` folder, which contains the source code, tests, configuration, settings, and resources entirely dedicated to 
the customization of the Alfresco Share client.

Content | Description
--- | ---
`src/main/assembly` | In this folder you can find everything that's needed to fully control creating the AMP artifact in the platform project. The main file to check is `amp.xml`.
`src/main/docker` | In this folder you can find everything that's needed to fully configure the custom Alfresco Share Docker image.
`src/main/docker/Dockerfile` | This is the file that define the custom Alfresco Share Docker image. The default configuration installs all the existing JARs and AMPs under `${project.build.directory}/extensions` folder and adds custom configuration files.
`src/main/java/<groupId>...` | This folder contains the same content you can find in a regular Java project, i.e. the Java source code. Here you should put all the custom classes, interfaces, and Java source code in general.
`src/main/resources/alfresco/module/<artifactId>` | This folder contains all the configuration files and settings for the Alfresco Share module. Here you can find the property file for the module.
`src/main/resources/alfresco/web-extension` | In this folder you can find the extensions to the web client (Alfresco Share) and it's where you store Spring configurations that extend and override the system Share configuration. There are two important sub-directories here: `site-data` and `site-webscripts`.
`src/main/resources/alfresco/META-INF/resources` | This folder hosts the content that will be placed in the `META-INF` folder of a standard Java web application. It is best practice to use a further subdirectory based on the module name. This allows you to manage multiple modules, so that their web resources don't conflict with each other.
`src/main/resources/alfresco/META-INF/share-config-custom.xml` | This file is a relevant Alfresco Share file used to configure the sub-project with the correct settings, depending on your environment. For more details, see [Share configuration](http://docs.alfresco.com/6.0/concepts/dev-extensions-share-configuration.html).
`src/test/java/<groupId>...` | This folder contains the same content you can find in a regular Java project, i.e. the Java source code for tests. Here you should put all the custom classes, interfaces, and Java source code related to tests.


## Setting up your development environment

The Maven Alfresco SDK is designed to work well with [Eclipse](https://www.eclipse.org/){:target="_blank"} and [IntelliJ IDEA](https://www.jetbrains.com/idea/){:target="_blank"}.

### Setting up your development environment using Eclipse

The Maven Alfresco SDK is designed to work well with Eclipse. This support includes the ability to import existing Alfresco projects created using the 
Alfresco SDK.

Here we assume you already have an Eclipse installation up and running, together with an available Alfresco project created using the Alfresco SDK. If you 
don't have a project already, follow the steps in [Getting started with Alfresco SDK 4.1](#gettingstarted) to learn how to quickly generate it in a few 
easy steps.

#### Importing the Alfresco project into Eclipse

1. Starting from Eclipse, select `File > Import > Maven > Existing Maven Projects` from the main menu to import the Alfresco project.

![sdk-dev-env-eclipse-import]({% link content-services/images/sdk-dev-env-eclipse-import.png %})

2. Click `Next` then browse to the root of the Alfresco project.

![sdk-dev-env-eclipse-project]({% link content-services/images/sdk-dev-env-eclipse-project.png %})

3. Click `Finish` to start importing the project into Eclipse.

Before completing the import, Eclipse checks the completeness of the local Maven repository. If you already have a local repository that includes all the 
required dependencies, this task will finish relatively quickly. Otherwise, be patient and wait until the downloads are completed (it can take some time).

Once the import is complete, a warning message may be displayed.

![sdk-dev-env-eclipse-warning]({% link content-services/images/sdk-dev-env-eclipse-warning.png %})

4. Click `Resolve All Later` to complete the import task.

5. Check the Markers tab in the bottom panel, where you may see some Maven problems. Expand the list and right click on a item with an error, then select 
`Quick Fix` and mark as shown.

![sdk-dev-env-eclipse-quickfix]({% link content-services/images/sdk-dev-env-eclipse-quickfix.png %})

6. Click `Finish` to confirm the fix.

You may be asked to confirm your selection.

7. Repeat the fix for all similar issues you have. Note that these issues really depend on the archetype you used to generate the project.

Once done, you may see an error with description: Project configuration is not up-to-date with pom.xml.

8. To fix this, right click one of the Alfresco projects and select `Maven > Update Project`, ensure all the Alfresco projects and sub-projects are selected, 
and then click `OK`.

Once this is done, the project is successfully imported in Eclipse. 

If you want more detail about how to work with the project, please visit [Working with generated projects](#workingwithprojects).

### Setting up your development environment using Intellij IDEA

The Maven Alfresco SDK is designed to work well with Eclipse. This support includes the ability to import existing Alfresco projects created using the 
Alfresco SDK.

Here we assume you already have an Eclipse installation up and running, together with an available Alfresco project created using the Alfresco SDK. If you 
don't have a project already, follow the steps in [Getting started with Alfresco SDK 4.1](#gettingstarted) to learn how to quickly generate it in a few 
easy steps.

#### Importing the Alfresco project into Intellij IDEA

1. Starting from IntelliJ IDEA, select `File > Open` from the main menu to open the Alfresco project. Alternatively, select `Import Project` if you're running 
IntelliJ IDEA for the first time in your development environment.

![sdk-dev-env-intellij-import]({% link content-services/images/sdk-dev-env-intellij-import.png %})

2. After the project is imported, you will see a window similar to the following:

![sdk-dev-env-intellij-finish]({% link content-services/images/sdk-dev-env-intellij-finish.png %})

Once this is done, the project is successfully imported in IntelliJ IDEA. 

If you want more detail about how to work with the project, please visit [Working with generated projects](#workingwithprojects).

## Advanced topics


### Switching Alfresco Content Services and Share versions
### Working with Enterprise
#### How to configure private Alfresco Nexus repository
#### How to configure private Alfresco Docker registry
#### How to set up Alfresco Transform Service
### Working with AMPs {#workingwithamps}
### Debugging
#### Remote debugging using Eclipse
#### Remote debugging using IntelliJ
### Integration testing
#### How SDK's integration tests work
#### How to run SDK's integration tests
### Hot reloading 
#### How to configure and use JRebel
#### How to configure and use Hotswap Agent
### Switching Alfresco Content Services database

## Troubleshooting