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
using the Spring Integration.

#### Java event handlers

To create a plain old Java project and set it up to handle Alfresco Events follow these steps:

1. 

#### Spring Integration event handlers

 

## ReST API Java wrapper

