---
title: Alfresco SDK 5.0 for out-of-process extensions
---

Alfresco SDK 5.0 is a development kit that provides an easy to use approach to developing applications and 
out-of-process extensions for Alfresco. With this SDK you can develop, package, test, run, document and release your 
Alfresco extension project.

The Alfresco Software Development Kit (Alfresco SDK) is a fundamental tool provided by Alfresco to developers to build 
customizations and extensions for the Alfresco Digital Business Platform. It is based on the [Spring Integration](https://spring.io/projects/spring-integration){:target="_blank"} 
tooling library and [Spring Boot](https://spring.io/projects/spring-boot){:target="_blank"}. 

Alfresco SDK 5.0 is released under [Apache License version 2.0](http://www.apache.org/licenses/LICENSE-2.0.html){:target="_blank"} 
and supports Content Services both in Community Edition and Enterprise Edition. If you're an Enterprise customer, 
please check the [Alfresco SDK Support status]({% link content-services/latest/support/index.md %}) 
for the version you're using. If your version is in Limited or Full Support and you need help, contact our [Support team](https://support.alfresco.com/){:target="_blank"}.

Alfresco SDK 5.0 is a major update to the SDK and provides support for Alfresco 7.x.

The 5.0 release takes advantage of Semantic Versioning ([SEMVER](http://semver.org/){:target="_blank"}), which means that 
this new release is not directly compatible with the previous releases of the SDK.

There is no direct upgrade path from previous versions of the SDK. This is because version 5.0 is an additional SDK to 
support out-of-process extensions, rather than an updated 4.2 version. [Alfresco SDK 4.2]({% link content-services/latest/develop/sdk.md %}) 
is still needed for a lot of the extension points, such as [content modelling]({% link content-services/latest/develop/repo-ext-points/content-model.md %}).

If you have an existing project with business logic that could be lifted out and implemented as an external service, then 
the recommended approach is to generate a new SDK 5.0 project and start using the event system to implement the business logic. 
Any business logic that is executed as a result of an action in the Repository, such as document or folder uploaded, updated, deleted,
can be reimplemented as an external out-process extension utilizing the new event system.

## What's new?

Alfresco SDK 5.0 is a brand new development environment that brings changes oriented to assist the way out-of-process 
customizations are built, packaged, run and tested for Content Services 7.

This is a mayor release oriented to support Content Services 7, so it is not compatible with previous versions of the 
SDK or Content Services.

## Introduction

The SDK includes Java libraries for the following:

* **Alfresco Java Event API** - enables an Alfresco developer to work with the new Alfresco Event system from Java.
* **Alfresco Java ReST API** - enables an Alfresco developer to work with the Alfresco ReST API 1.0 from Java.

Make sure to read through the [Platform Architecture]({% link content-services/latest/develop/software-architecture.md %}#platformarch)
before continuing as this section assumes familiarity with the Content Services architecture and event system.

If you are not familiar with Alfresco ReST API version 1.0, then read through this [introduction]({% link content-services/latest/develop/rest-api-guide/index.md %}).

## Alfresco Java Event API

The SDK has a Java library that wraps the Alfresco Event Model so it is more convenient to handle events in a Java project. 
This library provides the ability to work with events in a standard Java way or with Spring Integration.

The Alfresco Java Event API is composed of four main components: 

* Event Model
* Event Handling library 
* [Spring Integration](https://spring.io/projects/spring-integration){:target="_blank"} tooling library 
* [Spring Boot](https://spring.io/projects/spring-boot){:target="_blank"} custom [starter](https://docs.spring.io/spring-boot/docs/current/reference/html/spring-boot-features.html#boot-features-developing-auto-configuration){:target="_blank"}

### Event Model

The event model is a component that offers a custom model definition to clearly specify the way the Alfresco event data 
is organised. 

This component is declared in the module [alfresco-java-event-api-model](https://github.com/Alfresco/alfresco-java-sdk/tree/develop/alfresco-java-event-api/alfresco-java-event-api-model){:target="_blank"} 
and it is explained in detail [here]({% link content-services/latest/develop/oop-ext-points/events.md %}#eventmodel).

### Event Handling Library

The event handling library is a core component of the Alfresco Java Event API that offers a set of pre-defined event handling 
interfaces and the classes required to properly work with them. The idea of this library is to ease the implementation of 
business logic that must be executed as a response to an Alfresco repository event.

This component is defined in the module [alfresco-java-event-api-handling](https://github.com/Alfresco/alfresco-java-sdk/tree/develop/alfresco-java-event-api/alfresco-java-event-api-handling){:target="_blank"}. 
The classes and interfaces of this library were designed to be as Java technology agnostic as possible. They offer the 
plain event handling functionality doing no assumptions about the technology used to make them work together. They're 
mostly plain Java classes, so the integrator can use them in a Spring project, a Dagger project or any other technology.

The main four items in this library are explained in the next sections.

#### Event Handler {#eventhandler}

The [`EventHandler`](https://github.com/Alfresco/alfresco-java-sdk/tree/develop/alfresco-java-event-api/alfresco-java-event-api-handling/src/main/java/org/alfresco/event/sdk/handling/handler/EventHandler.java){:target="_blank"} 
interface defines the contract for an Alfresco repository event handler implementation.

This contract has been reduced to a minimum:

* The **type** of event the handler will manage.
* Other conditions, called **filters**, the event must match to be handled (default to none). See [Event Filter](#eventfilter).
* The **code** to execute when the event is triggered. The business logic implementation for your domain.

A hierarchy of interfaces that extend [`EventHandler`](https://github.com/Alfresco/alfresco-java-sdk/tree/develop/alfresco-java-event-api/alfresco-java-event-api-handling/src/main/java/org/alfresco/event/sdk/handling/handler/EventHandler.java){:target="_blank"} 
have been defined to cover the different types of Alfresco repository events that can be triggered by the 
Content Services event system:
 
* Node created - [`OnNodeCreatedEventHandler`](https://github.com/Alfresco/alfresco-java-sdk/tree/develop/alfresco-java-event-api/alfresco-java-event-api-handling/src/main/java/org/alfresco/event/sdk/handling/handler/OnNodeCreatedEventHandler.java){:target="_blank"}.
* Node updated - [`OnNodeUpdatedEventHandler`](https://github.com/Alfresco/alfresco-java-sdk/tree/develop/alfresco-java-event-api/alfresco-java-event-api-handling/src/main/java/org/alfresco/event/sdk/handling/handler/OnNodeUpdatedEventHandler.java){:target="_blank"}.
* Node deleted - [`OnNodeDeletedEventHandler`](https://github.com/Alfresco/alfresco-java-sdk/tree/develop/alfresco-java-event-api/alfresco-java-event-api-handling/src/main/java/org/alfresco/event/sdk/handling/handler/OnNodeDeletedEventHandler.java){:target="_blank"}.
* Parent-Child Association created - [`OnChildAssocCreatedEventHandler`](https://github.com/Alfresco/alfresco-java-sdk/tree/develop/alfresco-java-event-api/alfresco-java-event-api-handling/src/main/java/org/alfresco/event/sdk/handling/handler/OnChildAssocCreatedEventHandler.java){:target="_blank"}.
* Parent-Child Association deleted - [`OnChildAssocDeletedEventHandler`](https://github.com/Alfresco/alfresco-java-sdk/tree/develop/alfresco-java-event-api/alfresco-java-event-api-handling/src/main/java/org/alfresco/event/sdk/handling/handler/OnChildAssocDeletedEventHandler.java){:target="_blank"}.
* Peer-Peer Association Created - [`OnPeerAssocCreatedEventHandler`](https://github.com/Alfresco/alfresco-java-sdk/tree/develop/alfresco-java-event-api/alfresco-java-event-api-handling/src/main/java/org/alfresco/event/sdk/handling/handler/OnPeerAssocCreatedEventHandler.java){:target="_blank"}.
* Peer-Peer Association Deleted - [`OnPeerAssocDeletedEventHandler`](https://github.com/Alfresco/alfresco-java-sdk/tree/develop/alfresco-java-event-api/alfresco-java-event-api-handling/src/main/java/org/alfresco/event/sdk/handling/handler/OnPeerAssocDeletedEventHandler.java){:target="_blank"}.
* Permission updated - [`OnPermissionUpdatedEventHandler`](https://github.com/Alfresco/alfresco-java-sdk/tree/develop/alfresco-java-event-api/alfresco-java-event-api-handling/src/main/java/org/alfresco/event/sdk/handling/handler/OnPermissionUpdatedEventHandler.java){:target="_blank"}.

#### Event Handling Registry

The [`EventHandlingRegistry`](https://github.com/Alfresco/alfresco-java-sdk/tree/develop/alfresco-java-event-api/alfresco-java-event-api-handling/src/main/java/org/alfresco/event/sdk/handling/EventHandlingRegistry.java){:target="_blank"} 
is a class that registers the [`EventHandler`s](https://github.com/Alfresco/alfresco-java-sdk/tree/develop/alfresco-java-event-api/alfresco-java-event-api-handling/src/main/java/org/alfresco/event/sdk/handling/handler/EventHandler.java){:target="_blank"} 
that must be executed in response to each repository event type.

#### Event Handling Executor

The [`EventHandlingExecutor`](https://github.com/Alfresco/alfresco-java-sdk/tree/develop/alfresco-java-event-api/alfresco-java-event-api-handling/src/main/java/org/alfresco/event/sdk/handling/EventHandlingExecutor.java){:target="_blank"} 
is an interface that defines the process to execute the event handlers when events are received.

Currently, there is only one implementation ([`SimpleEventHandlingExecutor`](https://github.com/Alfresco/alfresco-java-sdk/tree/develop/alfresco-java-event-api/alfresco-java-event-api-handling/src/main/java/org/alfresco/event/sdk/handling/SimpleEventHandlingExecutor.java){:target="_blank"})
of this interface that simply uses the [`EventHandlingRegistry`](https://github.com/Alfresco/alfresco-java-sdk/tree/develop/alfresco-java-event-api/alfresco-java-event-api-handling/src/main/java/org/alfresco/event/sdk/handling/EventHandlingRegistry.java){:target="_blank"}
to get the list of [`EventHandler`s](https://github.com/Alfresco/alfresco-java-sdk/tree/develop/alfresco-java-event-api/alfresco-java-event-api-handling/src/main/java/org/alfresco/event/sdk/handling/handler/EventHandler.java){:target="_blank"} 
to execute when a specific repository event is triggered and executes them synchronously one by one. 

#### Event Filter {#eventfilter}

Event filters can be used in the [Event Handlers](#eventhandler) to narrow down the conditions required to execute the 
business logic (i.e. the code) in response to a repository event being triggered.

The [`EventFilter`](https://github.com/Alfresco/alfresco-java-sdk/tree/develop/alfresco-java-event-api/alfresco-java-event-api-handling/src/main/java/org/alfresco/event/sdk/handling/filter/EventFilter.java){:target="_blank"} 
is an interface that defines the contract that must be fulfilled by a repository event. It is basically a predicate 
interface that allows the developer to easily define conditions that an event must match for the code to be executed.

A number of filter implementations are offered out-of-the-box, covering the most common use cases:

* [`IsFileFilter`](https://github.com/Alfresco/alfresco-java-sdk/tree/develop/alfresco-java-event-api/alfresco-java-event-api-handling/src/main/java/org/alfresco/event/sdk/handling/filter/IsFileFilter.java){:target="_blank"} - checks if an event corresponds to a repository node of type `cm:content` or subtype (i.e. a file).
* [`IsFolderFilter`](https://github.com/Alfresco/alfresco-java-sdk/tree/develop/alfresco-java-event-api/alfresco-java-event-api-handling/src/main/java/org/alfresco/event/sdk/handling/filter/IsFolderFilter.java){:target="_blank"} - checks if an event corresponds to a repository node of type `cm:folder` or subtype (i.e. a folder).
* [`ContentAddedFilter`](https://github.com/Alfresco/alfresco-java-sdk/tree/develop/alfresco-java-event-api/alfresco-java-event-api-handling/src/main/java/org/alfresco/event/sdk/handling/filter/ContentAddedFilter.java){:target="_blank"} - checks if an event represents the addition of content (i.e. a file) to an existing `cm:content` node in the repository.
* [`ContentChangedFilter`](https://github.com/Alfresco/alfresco-java-sdk/tree/develop/alfresco-java-event-api/alfresco-java-event-api-handling/src/main/java/org/alfresco/event/sdk/handling/filter/ContentChangedFilter.java){:target="_blank"} - checks if an event represents a content update (i.e. file updated) of a `cm:content` node in the repository.
* [`PropertyAddedFilter`](https://github.com/Alfresco/alfresco-java-sdk/tree/develop/alfresco-java-event-api/alfresco-java-event-api-handling/src/main/java/org/alfresco/event/sdk/handling/filter/PropertyAddedFilter.java){:target="_blank"} - checks if an event corresponds to the addition of a node property in the repository.
* [`PropertyChangedFilter`](https://github.com/Alfresco/alfresco-java-sdk/tree/develop/alfresco-java-event-api/alfresco-java-event-api-handling/src/main/java/org/alfresco/event/sdk/handling/filter/PropertyChangedFilter.java){:target="_blank"} - checks if an event corresponds to the update of a node property in the repository.
* [`PropertyValueFilter`](https://github.com/Alfresco/alfresco-java-sdk/tree/develop/alfresco-java-event-api/alfresco-java-event-api-handling/src/main/java/org/alfresco/event/sdk/handling/filter/PropertyValueFilter.java){:target="_blank"} - checks if an event represents a node with a specific property with a specific value.
* [`NodeAspectFilter`](https://github.com/Alfresco/alfresco-java-sdk/tree/develop/alfresco-java-event-api/alfresco-java-event-api-handling/src/main/java/org/alfresco/event/sdk/handling/filter/NodeAspectFilter.java){:target="_blank"} - checks if an event represents a node with an specific aspect.
* [`NodeMovedFilter`](https://github.com/Alfresco/alfresco-java-sdk/tree/develop/alfresco-java-event-api/alfresco-java-event-api-handling/src/main/java/org/alfresco/event/sdk/handling/filter/NodeMovedFilter.java){:target="_blank"} - checks if an event represents a node being moved in the repository.
* [`NodeTypeChangedFilter`](https://github.com/Alfresco/alfresco-java-sdk/tree/develop/alfresco-java-event-api/alfresco-java-event-api-handling/src/main/java/org/alfresco/event/sdk/handling/filter/NodeTypeChangedFilter.java){:target="_blank"} - checks if an event represents the change of the type of a node in the repository.
* [`NodeTypeFilter`](https://github.com/Alfresco/alfresco-java-sdk/tree/develop/alfresco-java-event-api/alfresco-java-event-api-handling/src/main/java/org/alfresco/event/sdk/handling/filter/NodeTypeFilter.java){:target="_blank"} - checks if an event represents a node with a specific type.
* [`AssocTypeFilter`](https://github.com/Alfresco/alfresco-java-sdk/tree/develop/alfresco-java-event-api/alfresco-java-event-api-handling/src/main/java/org/alfresco/event/sdk/handling/filter/AssocTypeFilter.java){:target="_blank"} - checks if an event corresponds to a specific association type. This doesn't distinguish if the event is representing a peer-peer or parent-child association.
* [`MimeTypeFilter`](https://github.com/Alfresco/alfresco-java-sdk/tree/develop/alfresco-java-event-api/alfresco-java-event-api-handling/src/main/java/org/alfresco/event/sdk/handling/filter/MimeTypeFilter.java){:target="_blank"} - checks if an event represents a content node (i.e. `cm:content`) with a specific mime-type. 

The developer can create new custom event filters, as complex as required, and can use the logical operation of the 
[`EventFilter`](https://github.com/Alfresco/alfresco-java-sdk/tree/develop/alfresco-java-event-api/alfresco-java-event-api-handling/src/main/java/org/alfresco/event/sdk/handling/filter/EventFilter.java){:target="_blank"}
interface to combine several simpler filters in any way.

For instance, you can create a filter to react to an event related to the modification of the title of a content of 
type `cm:content` with a mime-type of `text/html` this way:

```java
PropertyChangedFilter.of("cm:title")
    .and(NodeTypeFilter.of("cm:content"))
    .and(MimeTypeFilter.of("text/html"))
```


TODO: ContentAddedFilter - check if this works, what if you just update a property, will this still be triggered?

### Spring Integration Tooling Library

The Spring Integration tooling library component offers some utility classes that ease the handling of Alfresco events 
in the context of a Spring Integration application.  

This component is defined in the module [alfresco-java-event-api-integration](https://github.com/Alfresco/alfresco-java-sdk/tree/develop/alfresco-java-event-api/alfresco-java-event-api-integration){:target="_blank"}. 

It makes use of the event handling library and the event model to offer integration features making the assumption that 
the integrator is working in the context of a Spring Integration project. 

The way the events are consumed from the ActiveMQ topic where the Alfresco event system is currently publishing them is 
not specified at this level of integration, and it is intentionally left open to the developer's choice. For a more 
opinionated integration level please take a look to the [Spring Boot custom starter section](#springbootcustomstarter).

Once the JSON events are ingested in a Spring Integration channel, this library offers a transformer to translate from 
the JSON schema defined by the Alfresco Event Model to the Java POJO classes defined in it (i.e. `RepoEvent`).

Apart from that, this module offers a wrapper of the [`EventFilter`](https://github.com/Alfresco/alfresco-java-sdk/tree/develop/alfresco-java-event-api/alfresco-java-event-api-handling/src/main/java/org/alfresco/event/sdk/handling/filter/EventFilter.java){:target="_blank"}
interface as a Spring Integration filter (`GenericSelector`) to be able to easily use all the filter offering of the handling 
library in a Spring Integration context.

### Spring Boot Custom Starter {#springbootcustomstarter}

The Spring Boot custom starter component defines a personalized Spring Boot starter that will automatically configure 
all the beans and property defaults for an Alfresco Event system client, making it easy to implement a client for the 
Alfresco Java Event API. As should be expected, the use of this component makes the assumption that the developer is 
creating an integration in the context of a Spring Boot application.

This component is defined in the [alfresco-java-event-api-spring-boot-starter](https://github.com/Alfresco/alfresco-java-sdk/tree/develop/alfresco-java-event-api/alfresco-java-event-api-spring-boot-starter){:target="_blank"} and 
the [alfresco-java-event-api-spring-boot](https://github.com/Alfresco/alfresco-java-sdk/tree/develop/alfresco-java-event-api/alfresco-java-event-api-spring-boot){:target="_blank"} modules.

The core class of this module is [`AlfrescoEventsAutoConfiguration`](https://github.com/Alfresco/alfresco-java-sdk/blob/develop/alfresco-java-event-api/alfresco-java-event-api-spring-boot/src/main/java/org/alfresco/event/sdk/autoconfigure/AlfrescoEventsAutoConfiguration.java){:target="_blank"}.
It is a Spring configuration class that automatically define the beans required to do the next actions:

* Define a Spring Integration flow to read the event messages from the ActiveMQ topic using a JMS channel adapter.
* Transform the message payload from JSON to a `RepoEvent` object. 
* Route the corresponding event messages to up to 2 other channels:
  * A channel to use pure Spring Integration handling if the property `alfresco.events.enableSpringIntegration` is enabled.
  * A channel to use event handling (from the event handling library) if the property `alfresco.events.enableHandlers` is enabled.

All this auto-configuration will be enabled as soon as the dependency `org.alfresco:alfresco-java-event-api-spring-boot-starter` 
is added to a Spring Boot project.

### Creating event handler projects

In this section we will see how to use SDK 5 to create Alfresco event handler projects, using plain Java and 
using the Spring framework.

#### Prerequisites
Before you start using any of the libraries in SDK 5 make sure you got the correct Java and Maven versions installed:

1. Java needs to be version 11 or above:

```bash
$ java -version
java version "11.0.2" 2019-01-15 LTS
Java(TM) SE Runtime Environment 18.9 (build 11.0.2+9-LTS)
Java HotSpot(TM) 64-Bit Server VM 18.9 (build 11.0.2+9-LTS, mixed mode)

$ javac -version
javac 11.0.2
```
2. Maven needs to be version 3.3 or above:

```bash
$ mvn -version
Apache Maven 3.5.0 (ff8f5e7444045639af65f6095c62210b5713f426; 2017-04-03T20:39:06+01:00)
Maven home: /Users/mbergljung/Tools/apache-maven-3.5.0
Java version: 11.0.2, vendor: Oracle Corporation
Java home: /Library/Java/JavaVirtualMachines/jdk-11.0.2.jdk/Contents/Home
Default locale: en_GB, platform encoding: UTF-8
OS name: "mac os x", version: "10.16", arch: "x86_64", family: "mac"
```

The Java artifacts (i.e. JAR libs) that we will be using are located in the 
[Alfresco Nexus repo](https://artifacts.alfresco.com/nexus/#nexus-search;quick~alfresco-java-sdk){:target="_blank"}:

![artifacts-alfresco-java-sdk]({% link content-services/images/artifacts-alfresco-java-sdk.png %}){:height="500px" width="400px"}

Maven needs to know about the Artifacts Repository so add the following to `~/.m2/settings.xml`:

```xml
<repositories>
  
    <repository>
      <id>alfresco-public</id>
      <url>https://artifacts.alfresco.com/nexus/content/groups/public</url>
    </repository>
  
  </repositories>
```

#### Create a starting point Spring project
The easiest way to get going is to use the **Spring Initializr** website and create a starting point project from there. 
Go to [https://start.spring.io/](https://start.spring.io/){:target="_blank"} and fill in your project info something like
this:

![spring-initializr]({% link content-services/images/spring-initializr.png %}){:height="500px" width="400px"}

Change so the parent of the Maven project (i.e. in `pom.xml`) is the Alfresco Java SDK (i.e. SDK 5). Then change to 
use the Alfresco Java Event Spring Boot starter. You should have a project file looking something like this now:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 https://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>

    <!-- Alfresco Java SDK 5 Parent -->
    <parent>
        <groupId>org.alfresco</groupId>
        <artifactId>alfresco-java-sdk</artifactId>
        <version>5.0.0</version>
    </parent>

    <groupId>org.alfresco.tutorial</groupId>
    <artifactId>events</artifactId>
    <version>0.0.1-SNAPSHOT</version>
    <name>events</name>
    <description>Alfresco SDK 5 - Demo of events</description>

    <properties>
        <java.version>11</java.version>
    </properties>

    <dependencies>
        <!-- Alfresco Java SDK 5 Java Event Handler API Spring Boot Starter -->
        <dependency>
            <groupId>org.alfresco</groupId>
            <artifactId>alfresco-java-event-api-spring-boot-starter</artifactId>
            <version>5.0.0</version>
        </dependency>
    </dependencies>

    <build>
        <plugins>
            <plugin>
                <groupId>org.springframework.boot</groupId>
                <artifactId>spring-boot-maven-plugin</artifactId>
            </plugin>
        </plugins>
    </build>

</project>
```

Remove the Test class as we are not going to use it, such as `org/alfresco/tutorial/events/EventsApplicationTests.java`.

Tell the event app where the Active MQ server is running so it knows where to listen for events, this is done
in the `src/main/resources/application.properties` configuration file :

```text
spring.activemq.brokerUrl=tcp://localhost:61616
```

Now package the project and make sure it builds properly:

```bash
$ mvn clean package -Dlicense.skip=true

[INFO] Scanning for projects...
[INFO] 
[INFO] ------------------------------------------------------------------------
[INFO] Building events 0.0.1-SNAPSHOT
[INFO] ------------------------------------------------------------------------
...
[INFO] 
[INFO] --- maven-clean-plugin:3.1.0:clean (default-clean) @ events ---
[INFO] Deleting /Users/mbergljung/IDEAProjects/docs-new/sdk5/sdk5-pure-java-events-sample/target
[INFO] 
[INFO] --- license-maven-plugin:3.0:check (validate-license) @ events ---
[INFO] 
[INFO] --- maven-resources-plugin:3.2.0:resources (default-resources) @ events ---
[INFO] Using 'UTF-8' encoding to copy filtered resources.
[INFO] Using 'UTF-8' encoding to copy filtered properties files.
[INFO] Copying 1 resource
[INFO] Copying 0 resource
[INFO] 
[INFO] --- maven-compiler-plugin:3.8.1:compile (default-compile) @ events ---
[INFO] Changes detected - recompiling the module!
[INFO] Compiling 1 source file to /Users/mbergljung/IDEAProjects/docs-new/sdk5/sdk5-pure-java-events-sample/target/classes
[INFO] 
[INFO] --- maven-resources-plugin:3.2.0:testResources (default-testResources) @ events ---
[INFO] Using 'UTF-8' encoding to copy filtered resources.
[INFO] Using 'UTF-8' encoding to copy filtered properties files.
[INFO] skip non existing resourceDirectory /Users/mbergljung/IDEAProjects/docs-new/sdk5/sdk5-pure-java-events-sample/src/test/resources
[INFO] 
[INFO] --- maven-compiler-plugin:3.8.1:testCompile (default-testCompile) @ events ---
[INFO] Changes detected - recompiling the module!
[INFO] 
[INFO] --- maven-surefire-plugin:2.22.2:test (default-test) @ events ---
[INFO] 
[INFO] --- maven-jar-plugin:3.2.0:jar (default-jar) @ events ---
[INFO] Building jar: /Users/mbergljung/IDEAProjects/docs-new/sdk5/sdk5-pure-java-events-sample/target/events-0.0.1-SNAPSHOT.jar
[INFO] 
[INFO] --- spring-boot-maven-plugin:2.4.2:repackage (repackage) @ events ---
[INFO] Replacing main artifact with repackaged archive
[INFO] ------------------------------------------------------------------------
[INFO] BUILD SUCCESS
[INFO] ------------------------------------------------------------------------
[INFO] Total time: 8.135 s
[INFO] Finished at: 2021-03-25T13:29:53Z
[INFO] Final Memory: 35M/127M
[INFO] ------------------------------------------------------------------------
```
The build should be successful and you should have the JAR file created, in this case `events-0.0.1-SNAPSHOT.jar`, try
and run the Spring Boot app:

```bash
$ java -jar target/events-0.0.1-SNAPSHOT.jar 

  .   ____          _            __ _ _
 /\\ / ___'_ __ _ _(_)_ __  __ _ \ \ \ \
( ( )\___ | '_ | '_| | '_ \/ _` | \ \ \ \
 \\/  ___)| |_)| | | | | || (_| |  ) ) ) )
  '  |____| .__|_| |_|_| |_\__, | / / / /
 =========|_|==============|___/=/_/_/_/
 :: Spring Boot ::                (v2.4.2)

2021-03-25 13:38:16.460  INFO 65122 --- [           main] o.a.tutorial.events.EventsApplication    : Starting EventsApplication v0.0.1-SNAPSHOT using Java 11.0.2 on MBP512-MBERGLJUNG-0917 with PID 65122 (/Users/mbergljung/IDEAProjects/docs-new/sdk5/sdk5-pure-java-events-sample/target/events-0.0.1-SNAPSHOT.jar started by mbergljung in /Users/mbergljung/IDEAProjects/docs-new/sdk5/sdk5-pure-java-events-sample)
2021-03-25 13:38:16.465  INFO 65122 --- [           main] o.a.tutorial.events.EventsApplication    : No active profile set, falling back to default profiles: default
2021-03-25 13:38:17.406  INFO 65122 --- [           main] faultConfiguringBeanFactoryPostProcessor : No bean named 'errorChannel' has been explicitly defined. Therefore, a default PublishSubscribeChannel will be created.
2021-03-25 13:38:17.410  INFO 65122 --- [           main] faultConfiguringBeanFactoryPostProcessor : No bean named 'taskScheduler' has been explicitly defined. Therefore, a default ThreadPoolTaskScheduler will be created.
2021-03-25 13:38:17.416  INFO 65122 --- [           main] faultConfiguringBeanFactoryPostProcessor : No bean named 'integrationHeaderChannelRegistry' has been explicitly defined. Therefore, a default DefaultHeaderChannelRegistry will be created.
2021-03-25 13:38:17.547  INFO 65122 --- [           main] trationDelegate$BeanPostProcessorChecker : Bean 'org.springframework.integration.config.IntegrationManagementConfiguration' of type [org.springframework.integration.config.IntegrationManagementConfiguration] is not eligible for getting processed by all BeanPostProcessors (for example: not eligible for auto-proxying)
2021-03-25 13:38:17.570  INFO 65122 --- [           main] trationDelegate$BeanPostProcessorChecker : Bean 'integrationChannelResolver' of type [org.springframework.integration.support.channel.BeanFactoryChannelResolver] is not eligible for getting processed by all BeanPostProcessors (for example: not eligible for auto-proxying)
2021-03-25 13:38:17.572  INFO 65122 --- [           main] trationDelegate$BeanPostProcessorChecker : Bean 'integrationDisposableAutoCreatedBeans' of type [org.springframework.integration.config.annotation.Disposables] is not eligible for getting processed by all BeanPostProcessors (for example: not eligible for auto-proxying)
2021-03-25 13:38:17.827  WARN 65122 --- [           main] s.c.a.AnnotationConfigApplicationContext : Exception encountered during context initialization - cancelling refresh attempt: org.springframework.beans.factory.UnsatisfiedDependencyException: Error creating bean with name 'acsEventsListeningFlow' defined in class path resource [org/alfresco/event/sdk/autoconfigure/AlfrescoEventsAutoConfiguration.class]: Unsatisfied dependency expressed through method 'acsEventsListeningFlow' parameter 0; nested exception is org.springframework.beans.factory.NoSuchBeanDefinitionException: No qualifying bean of type 'org.apache.activemq.ActiveMQConnectionFactory' available: expected at least 1 bean which qualifies as autowire candidate. Dependency annotations: {}
2021-03-25 13:38:17.840  INFO 65122 --- [           main] ConditionEvaluationReportLoggingListener : 

Error starting ApplicationContext. To display the conditions report re-run your application with 'debug' enabled.
2021-03-25 13:38:17.867 ERROR 65122 --- [           main] o.s.b.d.LoggingFailureAnalysisReporter   : 

***************************
APPLICATION FAILED TO START
***************************

Description:

Parameter 0 of method acsEventsListeningFlow in org.alfresco.event.sdk.autoconfigure.AlfrescoEventsAutoConfiguration required a bean of type 'org.apache.activemq.ActiveMQConnectionFactory' that could not be found.


Action:

Consider defining a bean of type 'org.apache.activemq.ActiveMQConnectionFactory' in your configuration.

```


#### Pure Java event handlers
To use pure Java event handlers follow these steps:

1. Add the following dependency in the Maven project file (i.e. `pom.xml`):

```xml

```

#### Spring Integration event handlers

 

## ReST API Java wrapper

