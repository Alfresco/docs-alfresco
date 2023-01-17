---
title: Alfresco SDK 5.1 for out-of-process extensions
---

Alfresco SDK 5.1 is a development kit that provides an easy to use approach to developing applications and 
out-of-process extensions for Content Services 7.x. With this SDK you can develop, package, test, run, document and 
release your extension project.

The following picture illustrates where SDK 5.1 fits into the big picture:

![sdk52_big_picture]({% link content-services/images/sdk52_big_picture.png %})

The SDK is a fundamental tool provided by Alfresco to developers to build customizations and extensions for the 
Content Services Platform. It is based on the [Spring Integration](https://spring.io/projects/spring-integration){:target="_blank"} 
tooling library and the [Spring Boot](https://spring.io/projects/spring-boot){:target="_blank"} library. 

Alfresco SDK 5.1 is released under [Apache License version 2.0](http://www.apache.org/licenses/LICENSE-2.0.html){:target="_blank"} 
and supports Content Services Enterprise Edition as well as Community Edition. If you're an Enterprise customer, 
please check the [Alfresco SDK Support status]({% link content-services/7.2/support/index.md %}) 
for the version you're using. If your version is in Limited or Full Support and you need help, contact our 
[Support team](https://support.alfresco.com/){:target="_blank"}.

The 5.1 release takes advantage of Semantic Versioning ([SEMVER](https://semver.org/){:target="_blank"}), which means that 
this new release is not directly compatible with the previous releases of the SDK.

There is no direct upgrade path from previous versions of the SDK. This is because version 5.1 is an additional SDK to 
support out-of-process extensions, rather than an updated 4.x version. [Alfresco SDK 4.x]({% link content-services/7.2/develop/sdk.md %}) 
is still needed for a lot of the extension points, such as [content modelling]({% link content-services/7.2/develop/repo-ext-points/content-model.md %}).

If you have an existing project with business logic that could be lifted out and implemented as an external service, then 
the recommended approach is to create a new SDK 5.1 project and start using the event system to implement the business logic. 
Any business logic that is executed as a result of an action in the Repository, such as document or folder uploaded, updated, deleted,
can be reimplemented as an external out-process extension utilizing the new event system. 

## What's new?
* Alfresco SDK 5.1 [integrates](#using-event-gateway) with the new [Event Gateway]({% link content-services/7.2/develop/oop-ext-points/event-gateway.md %}) 
that is part of Content Services version 7.1.
* ReST API authentication using [OAuth2](#rest-api-config) with Alfresco Identity Service.

## Introduction
The SDK includes Java libraries for the following:

* **Alfresco Java Event API** - enables an Alfresco developer to work with the new Alfresco Event system from Java.
* **Alfresco Java ReST API** - enables an Alfresco developer to work with the Alfresco ReST API 1.0 from Java.

Make sure to read through the [Platform architecture]({% link content-services/7.2/develop/software-architecture.md %}#platformarch)
before continuing as this section assumes familiarity with the Content Services architecture and event system.

If you are not familiar with Alfresco ReST API version 1.0, then read through this [introduction]({% link content-services/7.2/develop/rest-api-guide/index.md %}).

## Java Event API
The SDK has a Java library that wraps the Alfresco Event Model so it is more convenient to handle events in a Java project. 
This library provides the ability to work with events in a standard Java way or with Spring Integration.

The Alfresco Java Event API is consists of four main components: 

* Event Model
* Event Handling library 
* [Spring Integration](https://spring.io/projects/spring-integration){:target="_blank"} tooling library 
* [Spring Boot](https://spring.io/projects/spring-boot){:target="_blank"} custom [starter](https://docs.spring.io/spring-boot/docs/current/reference/html/features.html#boot-features-developing-auto-configuration){:target="_blank"}

### Event model
The event model is a component that offers a custom model definition to clearly specify the way the Alfresco event data is organized.

This component is declared in the module [alfresco-java-event-api-model](https://github.com/Alfresco/alfresco-java-sdk/tree/develop/alfresco-java-event-api/alfresco-java-event-api-model){:target="_blank"} 
and is explained in detail [here]({% link content-services/7.2/develop/oop-ext-points/events.md %}#eventmodel).

### Event handling library
The event handling library is a core component of the Alfresco Java Event API that offers a set of pre-defined event handling 
interfaces and the classes required to properly work with them. The idea of this library is to ease the implementation of 
business logic that must be executed as a response to an Alfresco repository event.

This component is defined in the module [alfresco-java-event-api-handling](https://github.com/Alfresco/alfresco-java-sdk/tree/develop/alfresco-java-event-api/alfresco-java-event-api-handling){:target="_blank"}. 
The classes and interfaces of this library were designed to be as Java technology agnostic as possible. They offer the 
plain event handling functionality doing no assumptions about the technology used to make them work together. They're 
mostly plain Java classes, so the integrator can use them in a Spring project, a Dagger project or any other technology.

The main four items in this library are explained in the following sections.

#### Event handler interface {#eventhandlerinterface}
The [`EventHandler`](https://github.com/Alfresco/alfresco-java-sdk/tree/develop/alfresco-java-event-api/alfresco-java-event-api-handling/src/main/java/org/alfresco/event/sdk/handling/handler/EventHandler.java){:target="_blank"} 
interface defines the contract for an Alfresco repository event handler implementation.

This contract has been reduced to a minimum:

* The **type** of event the handler will manage.
* Other conditions, called **filters**, the event must match before it is handled (defaults to none). See [Event Filter](#eventfilter).
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

#### Event handling registry
The [`EventHandlingRegistry`](https://github.com/Alfresco/alfresco-java-sdk/tree/develop/alfresco-java-event-api/alfresco-java-event-api-handling/src/main/java/org/alfresco/event/sdk/handling/EventHandlingRegistry.java){:target="_blank"} 
is a class that registers the [`EventHandler`s](https://github.com/Alfresco/alfresco-java-sdk/tree/develop/alfresco-java-event-api/alfresco-java-event-api-handling/src/main/java/org/alfresco/event/sdk/handling/handler/EventHandler.java){:target="_blank"} 
that must be executed in response to each repository event type.

#### Event handling executor
The [`EventHandlingExecutor`](https://github.com/Alfresco/alfresco-java-sdk/tree/develop/alfresco-java-event-api/alfresco-java-event-api-handling/src/main/java/org/alfresco/event/sdk/handling/EventHandlingExecutor.java){:target="_blank"} 
is an interface that defines the process to execute the event handlers when events are received.

Currently, there is only one implementation ([`SimpleEventHandlingExecutor`](https://github.com/Alfresco/alfresco-java-sdk/tree/develop/alfresco-java-event-api/alfresco-java-event-api-handling/src/main/java/org/alfresco/event/sdk/handling/SimpleEventHandlingExecutor.java){:target="_blank"})
of this interface. It simply uses the [`EventHandlingRegistry`](https://github.com/Alfresco/alfresco-java-sdk/tree/develop/alfresco-java-event-api/alfresco-java-event-api-handling/src/main/java/org/alfresco/event/sdk/handling/EventHandlingRegistry.java){:target="_blank"}
to get the list of [`EventHandler`s](https://github.com/Alfresco/alfresco-java-sdk/tree/develop/alfresco-java-event-api/alfresco-java-event-api-handling/src/main/java/org/alfresco/event/sdk/handling/handler/EventHandler.java){:target="_blank"} 
to execute when a specific repository event is triggered and executes them synchronously one by one. 

#### Event filter {#eventfilter}
Event filters can be used in the [Event handler implementations](#eventhandlerinterface) to narrow down the conditions 
required to execute the business logic (i.e. the code) in response to a repository event being triggered.

The [`EventFilter`](https://github.com/Alfresco/alfresco-java-sdk/tree/develop/alfresco-java-event-api/alfresco-java-event-api-handling/src/main/java/org/alfresco/event/sdk/handling/filter/EventFilter.java){:target="_blank"} 
is an interface that defines the contract that must be fulfilled by a repository event. It is basically a predicate 
interface that allows the developer to easily define conditions that an event must match for the code to be executed.

A number of filter implementations are offered out-of-the-box, covering the most common use cases:

* [`AspectAddedFilter`](https://github.com/Alfresco/alfresco-java-sdk/tree/develop/alfresco-java-event-api/alfresco-java-event-api-handling/src/main/java/org/alfresco/event/sdk/handling/filter/AspectAddedFilter.java){:target="_blank"} - checks if an event corresponds to a repository node that has had specified aspect added.
* [`AspectRemovedFilter`](https://github.com/Alfresco/alfresco-java-sdk/tree/develop/alfresco-java-event-api/alfresco-java-event-api-handling/src/main/java/org/alfresco/event/sdk/handling/filter/AspectRemovedFilter.java){:target="_blank"} - checks if an event corresponds to a repository node that has had specified aspect removed.
* [`AssocTypeFilter`](https://github.com/Alfresco/alfresco-java-sdk/tree/develop/alfresco-java-event-api/alfresco-java-event-api-handling/src/main/java/org/alfresco/event/sdk/handling/filter/AssocTypeFilter.java){:target="_blank"} - checks if an event corresponds to a specific association type. This doesn't distinguish if the event is representing a peer-peer or parent-child association.
* [`ContentAddedFilter`](https://github.com/Alfresco/alfresco-java-sdk/tree/develop/alfresco-java-event-api/alfresco-java-event-api-handling/src/main/java/org/alfresco/event/sdk/handling/filter/ContentAddedFilter.java){:target="_blank"} - checks if an event represents the addition of content (i.e. a file) to an existing `cm:content` node in the repository.
* [`ContentChangedFilter`](https://github.com/Alfresco/alfresco-java-sdk/tree/develop/alfresco-java-event-api/alfresco-java-event-api-handling/src/main/java/org/alfresco/event/sdk/handling/filter/ContentChangedFilter.java){:target="_blank"} - checks if an event represents a content update (i.e. file updated) of a `cm:content` node in the repository.
* [`IsFileFilter`](https://github.com/Alfresco/alfresco-java-sdk/tree/develop/alfresco-java-event-api/alfresco-java-event-api-handling/src/main/java/org/alfresco/event/sdk/handling/filter/IsFileFilter.java){:target="_blank"} - checks if an event corresponds to a repository node of type `cm:content` or subtype (i.e. a file).
* [`IsFolderFilter`](https://github.com/Alfresco/alfresco-java-sdk/tree/develop/alfresco-java-event-api/alfresco-java-event-api-handling/src/main/java/org/alfresco/event/sdk/handling/filter/IsFolderFilter.java){:target="_blank"} - checks if an event corresponds to a repository node of type `cm:folder` or subtype (i.e. a folder).
* [`MimeTypeFilter`](https://github.com/Alfresco/alfresco-java-sdk/tree/develop/alfresco-java-event-api/alfresco-java-event-api-handling/src/main/java/org/alfresco/event/sdk/handling/filter/MimeTypeFilter.java){:target="_blank"} - checks if an event represents a content node (i.e. `cm:content`) with a specific MIME type.
* [`NodeAspectFilter`](https://github.com/Alfresco/alfresco-java-sdk/tree/develop/alfresco-java-event-api/alfresco-java-event-api-handling/src/main/java/org/alfresco/event/sdk/handling/filter/NodeAspectFilter.java){:target="_blank"} - checks if an event represents a node with a specific aspect.
* [`NodeMovedFilter`](https://github.com/Alfresco/alfresco-java-sdk/tree/develop/alfresco-java-event-api/alfresco-java-event-api-handling/src/main/java/org/alfresco/event/sdk/handling/filter/NodeMovedFilter.java){:target="_blank"} - checks if an event represents a node being moved in the repository.
* [`NodeTypeChangedFilter`](https://github.com/Alfresco/alfresco-java-sdk/tree/develop/alfresco-java-event-api/alfresco-java-event-api-handling/src/main/java/org/alfresco/event/sdk/handling/filter/NodeTypeChangedFilter.java){:target="_blank"} - checks if an event represents the change of the type of a node in the repository.
* [`NodeTypeFilter`](https://github.com/Alfresco/alfresco-java-sdk/tree/develop/alfresco-java-event-api/alfresco-java-event-api-handling/src/main/java/org/alfresco/event/sdk/handling/filter/NodeTypeFilter.java){:target="_blank"} - checks if an event represents a node with a specific type.
* [`PropertyAddedFilter`](https://github.com/Alfresco/alfresco-java-sdk/tree/develop/alfresco-java-event-api/alfresco-java-event-api-handling/src/main/java/org/alfresco/event/sdk/handling/filter/PropertyAddedFilter.java){:target="_blank"} - checks if an event corresponds to the addition of a node property in the repository.
* [`PropertyChangedFilter`](https://github.com/Alfresco/alfresco-java-sdk/tree/develop/alfresco-java-event-api/alfresco-java-event-api-handling/src/main/java/org/alfresco/event/sdk/handling/filter/PropertyChangedFilter.java){:target="_blank"} - checks if an event corresponds to the update of a node property in the repository.
* [`PropertyCurrentValueFilter`](https://github.com/Alfresco/alfresco-java-sdk/tree/develop/alfresco-java-event-api/alfresco-java-event-api-handling/src/main/java/org/alfresco/event/sdk/handling/filter/PropertyCurrentValueFilter.java){:target="_blank"} - checks if an event represents a node with a specific property with a specific current value.
* [`PropertyRemovedFilter`](https://github.com/Alfresco/alfresco-java-sdk/tree/develop/alfresco-java-event-api/alfresco-java-event-api-handling/src/main/java/org/alfresco/event/sdk/handling/filter/PropertyRemovedFilter.java){:target="_blank"} - checks if an event corresponds to the removal of a specific property to a node in the repository.
* [`PropertyPreviousValueFilter`](https://github.com/Alfresco/alfresco-java-sdk/tree/develop/alfresco-java-event-api/alfresco-java-event-api-handling/src/main/java/org/alfresco/event/sdk/handling/filter/PropertyPreviousValueFilter.java){:target="_blank"} - checks if an event represents a node with a specific property with a specific previous value.
* [`PropertyValueFilter`](https://github.com/Alfresco/alfresco-java-sdk/tree/develop/alfresco-java-event-api/alfresco-java-event-api-handling/src/main/java/org/alfresco/event/sdk/handling/filter/PropertyValueFilter.java){:target="_blank"} - checks if an event represents a node with a specific property with a specific value.

You can use these filters alone or combine several of them into one complex filter.

For instance, you can create a complex filter to react to an event related to the modification of the title of content type `cm:content` with a MIME type of `text/html`:

```java
public EventFilter getEventFilter() {
    return PropertyChangedFilter.of("cm:title") // If title changed
            .and(NodeTypeFilter.of("cm:content")) // And it's a file
            .and(MimeTypeFilter.of("text/html")); // And the file is a HTML file
}
```

It's also possible to implement [custom event filters](#customeventfilters).

### Spring Integration Tooling Library
The Spring Integration tooling library component offers some utility classes that ease the handling of Alfresco events 
in the context of a Spring Integration application.  

This component is defined in the module [alfresco-java-event-api-integration](https://github.com/Alfresco/alfresco-java-sdk/tree/develop/alfresco-java-event-api/alfresco-java-event-api-integration){:target="_blank"}.

It makes use of the event handling library and the event model to offer integration features, making the assumption that 
the integrator is working in the context of a Spring Integration project.

The way the events are consumed from the ActiveMQ topic, where the Alfresco event system is currently publishing them, is 
not specified at this level of integration. This is intentionally left open to the developer's choice. For a more 
opinionated integration level, take a look at the [Spring Boot custom starter section](#springbootcustomstarter).

Once the JSON events are ingested in a Spring Integration channel, this library offers a transformer to translate from 
the JSON schema defined by the Alfresco Event Model to the Java POJO classes defined in it (i.e. `RepoEvent`).

Apart from that, this module offers a wrapper of the [`EventFilter`](https://github.com/Alfresco/alfresco-java-sdk/tree/develop/alfresco-java-event-api/alfresco-java-event-api-handling/src/main/java/org/alfresco/event/sdk/handling/filter/EventFilter.java){:target="_blank"}
interface as a Spring Integration filter (`GenericSelector`) to be able to easily use all the filter offering of the handling 
library in a Spring Integration context.

### Spring Boot Custom Starter {#springbootcustomstarter}
The Spring Boot custom starter component defines a personalized Spring Boot starter that will automatically configure 
all the beans and property defaults for an Alfresco Event system client, making it easy to implement a client for the 
Alfresco Java Event API. As expected, the use of this component makes the assumption that the developer is 
creating an integration in the context of a Spring Boot application.

This component is defined in the [alfresco-java-event-api-spring-boot-starter](https://github.com/Alfresco/alfresco-java-sdk/tree/develop/alfresco-java-event-api/alfresco-java-event-api-spring-boot-starter){:target="_blank"} and 
the [alfresco-java-event-api-spring-boot](https://github.com/Alfresco/alfresco-java-sdk/tree/develop/alfresco-java-event-api/alfresco-java-event-api-spring-boot){:target="_blank"} modules.

The core class of this module is [`AlfrescoEventsAutoConfiguration`](https://github.com/Alfresco/alfresco-java-sdk/blob/develop/alfresco-java-event-api/alfresco-java-event-api-spring-boot/src/main/java/org/alfresco/event/sdk/autoconfigure/AlfrescoEventsAutoConfiguration.java){:target="_blank"}.
It is a Spring configuration class that automatically define the beans required to do the following actions:

* Define a Spring Integration flow to read the event messages from the ActiveMQ topic using a JMS channel adapter.
* Transform the message payload from JSON to a `RepoEvent` object. 
* Route the corresponding event messages to up to 2 other channels:
  * A channel to use pure Spring Integration handling if the property `alfresco.events.enableSpringIntegration` is enabled.
  * A channel to use event handling (from the event handling library) if the property `alfresco.events.enableHandlers` is enabled.

All this auto-configuration is enabled as soon as the dependency `org.alfresco:alfresco-java-event-api-spring-boot-starter` 
is added to a Spring Boot project.

## Event API Resource objects
There are some data mapping objects that are good to know about when working with the Event API. They wrap the JSON payload data from event messages. 

### The NodeResource object {#noderesourceobj}
When working with the Event API and folders and files there is one data object called `NodeResource` that is used over 
and over. It's used to get to the JSON node data returned in the JMS message payload.

Here is an example payload for a file [node updated event]({% link content-services/7.2/develop/oop-ext-points/events.md %}#nodeupdatedevent):

```json
{
  "specversion": "1.0",
  "type": "org.alfresco.event.node.Updated",
  "id": "ae5dac3c-25d0-438d-b148-2084d1ab05a6",
  "source": "/08d9b620-48de-4247-8f33-360988d3b19b",
  "time": "2021-01-26T10:29:42.99524Z",
  "dataschema": "https://api.alfresco.com/schema/event/repo/v1/nodeUpdated",
  "datacontenttype": "application/json",
  "data": {
    "eventGroupId": "b5b1ebfe-45fc-4f86-b71b-421996482881",
    "resource": {
      "@type": "NodeResource",
      "id": "d71dd823-82c7-477c-8490-04cb0e826e65",
      "primaryHierarchy": [
        "5f355d16-f824-4173-bf4b-b1ec37ef5549",
        "93f7edf5-e4d8-4749-9b4c-e45097e2e19d",
        "c388532e-8da6-4d50-a6d2-4f3f3ac36ff7",
        "2fa2cde5-9d83-4460-a38c-cfe4ec9cca08"
      ],
      "name": "purchase-order-scan.pdf",
      "nodeType": "cm:content",
      "createdByUser": {
        "id": "admin",
        "displayName": "Administrator"
      },
      "createdAt": "2021-01-21T11:14:15.695Z",
      "modifiedByUser": {
        "id": "admin",
        "displayName": "Administrator"
      },
      "modifiedAt": "2021-01-26T10:29:42.529Z",
      "content": {
        "mimeType": "application/pdf",
        "sizeInBytes": 531152,
        "encoding": "UTF-8"
      },
      "properties": {
        "cm:autoVersion": true,
        "cm:title": "Purchase Order",
        "cm:versionType": "MAJOR",
        "cm:versionLabel": "1.0",
        "cm:autoVersionOnUpdateProps": false,
        "cm:lastThumbnailModification": [
          "doclib:1611227666770"
        ],
        "cm:description": "",
        "cm:taggable": null,
        "cm:initialVersion": true
      },
      "aspectNames": [
        "cm:versionable",
        "cm:author",
        "cm:thumbnailModification",
        "cm:titled",
        "rn:renditioned",
        "cm:auditable",
        "cm:taggable"
      ],
      "isFolder": false,
      "isFile": true
    },
    "resourceBefore": {
      "@type": "NodeResource",
      "modifiedAt": "2021-01-21T11:14:25.223Z",
      "properties": {
        "cm:title": null,
        "cm:taggable": null,
        "cm:description": null
      },
      "aspectNames": [
        "cm:versionable",
        "cm:author",
        "cm:thumbnailModification",
        "cm:titled",
        "rn:renditioned",
        "cm:auditable"
      ]
    },
    "resourceReaderAuthorities": [
      "GROUP_EVERYONE"
    ],
    "resourceDeniedAuthorities": []
  }
}
```

In an event handler, being it pure Java or Spring Integration based, we can get to the payload data via the 
`org.alfresco.event.sdk.model.v1.model.NodeResource` object:

```java
public class ContentUpdatedEventHandler implements OnNodeUpdatedEventHandler {

    public void handleEvent(final RepoEvent<DataAttributes<Resource>> repoEvent) {
        // Get the data for the node as it looked like before the update
        NodeResource beforeUpdateResource = (NodeResource) repoEvent.getData().getResourceBefore();
        ZonedDateTime prevModificationDate = beforeUpdateResource.getModifiedAt();
        LOGGER.info("Before this update the node was last updated {}", prevModificationDate);
        Set<String> beforeAspects = beforeUpdateResource.getAspectNames();
        if (beforeAspects != null) {
            LOGGER.info("Aspects before the update: ");
            for (String aspectName : beforeAspects) {
                LOGGER.info("    {}", aspectName);
            }
        }
        Map<String, Serializable> beforeProperties = beforeUpdateResource.getProperties();
        if (beforeProperties != null) {
            LOGGER.info("Properties before the update");
            for (Map.Entry<String, Serializable> property : beforeProperties.entrySet()) {
                LOGGER.info("    {} = {}", property.getKey(), property.getValue());
            }
        }
    
        // Get the latest data for the node
        NodeResource afterUpdateResource = (NodeResource) repoEvent.getData().getResource();
        LOGGER.info("Node data after update:");
        LOGGER.info("    ID: {}", afterUpdateResource.getId());
        LOGGER.info("    Name (cm:name): {}", afterUpdateResource.getName());
        LOGGER.info("    Content Model Type: {}", afterUpdateResource.getNodeType());
        LOGGER.info("    Created date (cm:created): {}", afterUpdateResource.getCreatedAt());
        LOGGER.info("    Created by (cm:creator): {}", afterUpdateResource.getCreatedByUser().getDisplayName());
        LOGGER.info("    Modified date (cm:modified): {}", afterUpdateResource.getModifiedAt());
        LOGGER.info("    Modified by (cm:modifier): {}", afterUpdateResource.getModifiedByUser().getDisplayName());
        if (afterUpdateResource.getContent() != null) {
            LOGGER.info("    Content (cm:content): {}, {}, {} bytes", afterUpdateResource.getContent().getMimeType(),
                    afterUpdateResource.getContent().getEncoding(), afterUpdateResource.getContent().getSizeInBytes());
        }
        Set<String> afterAspects = afterUpdateResource.getAspectNames();
        LOGGER.info("Aspects after the update");
        for (String aspectName: afterAspects) {
            LOGGER.info("    {}", aspectName);
        }
        Map<String, Serializable> afterProperties = afterUpdateResource.getProperties();
        LOGGER.info("Properties after the update");
        for (Map.Entry<String, Serializable> property: afterProperties.entrySet()) {
            LOGGER.info("    {} = {}", property.getKey(), property.getValue());
        }
    
        // Get the node location hierarchy in the repository
        // Use the ReST API to query for the name of the nodes
        List<String> nodeHierarchy = afterUpdateResource.getPrimaryHierarchy();
        LOGGER.info("Node location hierarchy (immediate parent node first):");
        for (String nodeID: nodeHierarchy) {
            LOGGER.info("    {}", nodeID);
        }
    }
}
```

The permission related properties `resourceReaderAuthorities` and `resourceDeniedAuthorities` will be listed as part of
`resource.getProperties()`. Note that these will only be present if you are running an Enterprise Edition of Alfresco 
version 7 or later. 

The folder primary hierarchy can be resolved by using the ReST API to get the names for the different Node IDs.
The first node ID in the list is the immediate parent folder for the node as in the following example:

```json
  "id": "d71dd823-82c7-477c-8490-04cb0e826e65",   /app:company_home/cm:Testing/cm:Inbound/cm:purchase-order-scan.pdf (cm:content)
  "primaryHierarchy": [
    "5f355d16-f824-4173-bf4b-b1ec37ef5549",       /app:company_home/cm:Testing/cm:Inbound  (cm:folder)
    "93f7edf5-e4d8-4749-9b4c-e45097e2e19d",       /app:company_home/cm:Testing             (cm:folder)
    "c388532e-8da6-4d50-a6d2-4f3f3ac36ff7",       /app:company_home                        (cm:folder)
    "2fa2cde5-9d83-4460-a38c-cfe4ec9cca08"        Store root                               (sys:store_root)
```

### The ChildAssociationResource object {#childassocresourceobj}
When working with the Event API and Parent-Child associations there is one data object called `ChildAssociationResource` 
that is used over and over. It's used to get to the JSON association data returned in the JMS message payload.

Here is an example payload for a [Parent-Child association created event]({% link content-services/7.2/develop/oop-ext-points/events.md %}#parentchildassoccreatedevent):

```json
{
  "specversion": "1.0",
  "type": "org.alfresco.event.assoc.child.Created",
  "id": "4014bcb2-f1e6-447f-8caa-3a6219bc94ad",
  "source": "/08d9b620-48de-4247-8f33-360988d3b19b",
  "time": "2021-01-28T13:42:34.329162Z",
  "dataschema": "https://api.alfresco.com/schema/event/repo/v1/childAssocCreated",
  "datacontenttype": "application/json",
  "data": {
    "eventGroupId": "78da21cc-fa5a-47d1-afcb-03005229efa9",
    "resource": {
      "@type": "ChildAssociationResource",
      "assocType": "fdk:images",
      "parent": {
        "id": "a4eb7684-0ffe-4bf5-b6f7-4297a6e4ee84"
      },
      "child": {
        "id": "ceb3c804-8b32-4050-b2da-b55c47f01666"    
      }
    }
  }
}
```

In an event handler, being it pure Java or Spring Integration based, we can get to the payload data via the 
`org.alfresco.event.sdk.model.v1.model.ChildAssociationResource` object:

```java
public class ParentChildAssocCreatedEventHandler implements OnChildAssocCreatedEventHandler {

    public void handleEvent(final RepoEvent<DataAttributes<Resource>> repoEvent) {
        ChildAssociationResource resource = (ChildAssociationResource) repoEvent.getData().getResource();
        LOGGER.info("A secondary Parent-Child association of type {} was created between nodes: {} -> {}", 
            resource.getAssocType(), resource.getParent().getId(), resource.getChild().getId());
    }
}

```

The `resource.getParent().getId()` call will return the Node ID for the parent node in the association and the 
`resource.getChild().getId()` call will return the Node ID for the child node.

### The PeerAssociationResource object {#peerassocresourceobj}
When working with the Event API and Peer-2-Peer associations there is one data object called `PeerAssociationResource` 
that is used over and over. It's used to get to the JSON association data returned in the JMS message payload.

Here is an example payload for a [Peer-2-Peer association created event]({% link content-services/7.2/develop/oop-ext-points/events.md %}#peer2peerassoccreatedevent):

```json
{
  "specversion": "1.0",
  "type": "org.alfresco.event.assoc.peer.Created",
  "id": "8a8113a2-fa67-4914-9ecb-2ec47c456159",
  "source": "/08d9b620-48de-4247-8f33-360988d3b19b",
  "time": "2021-01-28T13:42:34.352956Z",
  "dataschema": "https://api.alfresco.com/schema/event/repo/v1/peerAssocCreated",
  "datacontenttype": "application/json",
  "data": {
    "eventGroupId": "78da21cc-fa5a-47d1-afcb-03005229efa9",
    "resource": {
      "@type": "PeerAssociationResource",
      "assocType": "fdk:reviews",
      "source": {
        "id": "a4eb7684-0ffe-4bf5-b6f7-4297a6e4ee84"
      },
      "target": {
        "id": "f826ac49-0262-48af-8f63-f87eb7007078"
      }
    }
  }
}
```

In an event handler, being it pure Java or Spring Integration based, we can get to the payload data via the 
`org.alfresco.event.sdk.model.v1.model.PeerAssociationResource` object:

```java
public class Peer2PeerAssocCreatedEventHandler implements OnPeerAssocCreatedEventHandler {

    public void handleEvent(final RepoEvent<DataAttributes<Resource>> repoEvent) {
        PeerAssociationResource resource = (PeerAssociationResource) repoEvent.getData().getResource();
        LOGGER.info("A Peer-Peer association was created: Assoc Type {}: Source {} -> Target {}", resource.getAssocType(), 
                resource.getSource().getId(), resource.getTarget().getId());
    }
}
```

The `resource.getSource().getId()` call will return the Node ID for the source node in the association and the 
`resource.getTarget().getId()` call will return the Node ID for the target node.

## Creating event handler projects
In this section we will see how to use SDK 5 to create Alfresco event handler projects, using plain Java and 
using the Spring framework.

### Start up Content Services 7 or newer {#acsstart}
Before continuing you need an instance of Content Services version 7 running, either Community or Enterprise. In this 
samples section we will use Community and start it up with Docker Compose. You can get the Docker Compose file for 
Community version 7 from the [acs-deployment](https://github.com/Alfresco/acs-deployment/blob/master/docker-compose/community-docker-compose.yml){:target="_blank"} 
GitHub project.

Put the Docker Compose YAML file in a directory and then start it all up with the following command:

```bash
$ ls -l
total 8
-rw-r--r--  1 mbergljung  staff  4006 26 Mar 09:43 docker-compose.yml
$ docker-compose up
...
```

During start up you can see Apache Active MQ starting:

```text
activemq_1            |  INFO | Apache ActiveMQ 5.16.1 (localhost, ID:6906413a8893-36895-1616752022615-0:1) is starting
activemq_1            |  INFO | Listening for connections at: tcp://6906413a8893:61616?maximumConnections=1000&wireFormat.maxFrameSize=104857600
...
```

Note down the ActiveMQ Broker TCP access point (i.e. `tcp://localhost:61616`), we will need it later when configuring the 
event application.

It will take 5-15 minutes to start up, depending on what Docker images you already have locally. Make sure everything has 
started properly by accessing [http://localhost:8080/share](http://localhost:8080/share){:target="_blank"} 
and login with **admin/admin**. 

### Prerequisites {#prereq}
Before you start using any of the libraries in SDK 5 make sure you got the correct Java and Maven versions installed:

Java needs to be version 11 or above:

```bash
$ java -version
java version "11.0.2" 2019-01-15 LTS
Java(TM) SE Runtime Environment 18.9 (build 11.0.2+9-LTS)
Java HotSpot(TM) 64-Bit Server VM 18.9 (build 11.0.2+9-LTS, mixed mode)

$ javac -version
javac 11.0.2
```

Maven needs to be version 3.3 or above:

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

Maven needs to know about the Alfresco Artifacts Repository (Nexus) so add the following to `~/.m2/settings.xml`:

```xml
<repositories>
  
    <repository>
      <id>alfresco-public</id>
      <url>https://artifacts.alfresco.com/nexus/content/groups/public</url>
    </repository>
  
  </repositories>
```

### Create a starting point Spring project {#createstarterproj}

The easiest way to get going is to use the **Spring Initializr** website and create a starting point project from there.

#### Create Spring Boot project

Before you start, make sure you're familiar with Spring Boot and the Maven project structure.

1. Go to [https://start.spring.io/](https://start.spring.io/){:target="_blank"} and fill in your project info something like this:

    ![spring-initializr]({% link content-services/images/spring-initializr.png %}){:height="500px" width="400px"}

2. Click **GENERATE** to generate and download your default Spring Boot project.
3. Make the following changes in your project:

    1. Change the parent of the Maven project (i.e. in `pom.xml`) so it uses the Alfresco Java SDK (i.e. SDK 5).
    2. Delete the Spring Boot test dependency in the POM file, and also the test source (i.e. `org/alfresco/tutorial/sdk5demo/Sdk5DemoApplicationTests.java`).

    Your project file should look like this now:

    ```xml
    <?xml version="1.0" encoding="UTF-8"?>
    <project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 https://maven.apache.org/xsd/maven-4.0.0.xsd">
        <modelVersion>4.0.0</modelVersion>
        
        <!-- Alfresco Java SDK 5 Parent -->
        <parent>
            <groupId>org.alfresco</groupId>
            <artifactId>alfresco-java-sdk</artifactId>
            <version>5.1.0</version>
        </parent>
        
        <groupId>org.alfresco.tutorial</groupId>
        <artifactId>sdk5-demo</artifactId>
        <version>0.0.1-SNAPSHOT</version>
        <name>sdk5-demo</name>
        <description>Demo showing use of Alfresco SDK 5 libraries</description>
        
        <properties>
            <java.version>11</java.version>
        </properties>
        
        <dependencies>
            <dependency>
                <groupId>org.springframework.boot</groupId>
                <artifactId>spring-boot-starter</artifactId>
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

#### Set properties for event handler projects

> **Note:** Skip this section if you are just creating a project for a Java ReST API client.

If you plan to create an event handler project, you'll need to set a number of properties to:

* Tell the event app where the Active MQ server is running so it knows where to listen for events. This is done in the `src/main/resources/application.properties` configuration file. Remember, the Active MQ server is started as part of the [Content Services system](#acsstart).
* Tell the system to auto-define the Active MQ Connection factory:

```text
# Where is Alfresco Active MQ JMS Broker running?
spring.activemq.brokerUrl=tcp://localhost:61616
# This property is required if you want Spring Boot to auto-define the ActiveMQConnectionFactory, 
# otherwise you can define that bean in Spring config
spring.jms.cache.enabled=false
```

#### Set properties for Java ReST API projects {#rest-api-config}

> **Note:** Skip this section if you are just creating a project for an Event handler client.

If you plan to create a project for a Java ReST API client, set the following properties to tell the ReST API client where the Content Services server is running and the endpoints for the ReST APIs:

```text
# HTTP Basic Authentication that will be used by the API
content.service.security.basicAuth.username=admin
content.service.security.basicAuth.password=admin
# Location of the server and API endpoints
content.service.url=http://localhost:8080
content.service.path=/alfresco/api/-default-/public/alfresco/versions/1
search.service.path=/alfresco/api/-default-/public/search/versions/1
```

If you are using OAuth2 with Alfresco Identity Service, then you can use client-credential based authentication:

```text
spring.security.oauth2.client.registration.alfresco-rest-api.provider=alfresco-identity-service
spring.security.oauth2.client.registration.alfresco-rest-api.client-id=clientId
spring.security.oauth2.client.registration.alfresco-rest-api.client-secret=clientSecret
spring.security.oauth2.client.registration.alfresco-rest-api.authorization-grant-type=client_credentials
spring.security.oauth2.client.provider.alfresco-identity-service.token-uri=${keycloak.auth-server-url}/auth/realms/${keycloak.realm}/protocol/openid-connect/token
```

Or OAuth2 password based authentication:

```text
spring.security.oauth2.client.registration.alfresco-rest-api.provider=alfresco-identity-service
spring.security.oauth2.client.registration.alfresco-rest-api.client-id=clientId
spring.security.oauth2.client.registration.alfresco-rest-api.client-secret=clientSecret
spring.security.oauth2.client.registration.alfresco-rest-api.username=username
spring.security.oauth2.client.registration.alfresco-rest-api.password=pwd
spring.security.oauth2.client.registration.alfresco-rest-api.authorization-grant-type=password
spring.security.oauth2.client.provider.alfresco-identity-service.token-uri=${keycloak.auth-server-url}/auth/realms/${keycloak.realm}/protocol/openid-connect/token
```

Finally, if you want to provide a custom authentication mechanism, you can enable the delegated external authentication:

```text
content.service.security.delegated=true
```

Provide a bean that implements the interface `DelegatedAuthenticationProvider`.

#### Build and test

Now package the project and make sure it builds properly (skip the license test as none of the files have a license header):

```bash
$ mvn clean package -Dlicense.skip=true

[INFO] Scanning for projects...
[INFO] 
[INFO] ------------------------------------------------------------------------
[INFO] Building sdk5-demo 0.0.1-SNAPSHOT
[INFO] ------------------------------------------------------------------------
[INFO] 
[INFO] --- maven-clean-plugin:3.1.0:clean (default-clean) @ sdk5-demo ---
[INFO] Deleting /Users/mbergljung/IDEAProjects/docs-new/sdk5/sdk5-demo/target
[INFO] 
[INFO] --- license-maven-plugin:3.0:check (validate-license) @ sdk5-demo ---
[INFO] 
[INFO] --- maven-resources-plugin:3.2.0:resources (default-resources) @ sdk5-demo ---
[INFO] Using 'UTF-8' encoding to copy filtered resources.
[INFO] Using 'UTF-8' encoding to copy filtered properties files.
[INFO] Copying 1 resource
[INFO] Copying 0 resource
[INFO] 
[INFO] --- maven-compiler-plugin:3.8.1:compile (default-compile) @ sdk5-demo ---
[INFO] Changes detected - recompiling the module!
[INFO] Compiling 1 source file to /Users/mbergljung/IDEAProjects/docs-new/sdk5/sdk5-demo/target/classes
[INFO] 
[INFO] --- maven-resources-plugin:3.2.0:testResources (default-testResources) @ sdk5-demo ---
[INFO] Using 'UTF-8' encoding to copy filtered resources.
[INFO] Using 'UTF-8' encoding to copy filtered properties files.
[INFO] skip non existing resourceDirectory /Users/mbergljung/IDEAProjects/docs-new/sdk5/sdk5-demo/src/test/resources
[INFO] 
[INFO] --- maven-compiler-plugin:3.8.1:testCompile (default-testCompile) @ sdk5-demo ---
[INFO] Changes detected - recompiling the module!
[INFO] 
[INFO] --- maven-surefire-plugin:2.22.2:test (default-test) @ sdk5-demo ---
[INFO] 
[INFO] --- maven-jar-plugin:3.2.0:jar (default-jar) @ sdk5-demo ---
[INFO] Building jar: /Users/mbergljung/IDEAProjects/docs-new/sdk5/sdk5-demo/target/sdk5-demo-0.0.1-SNAPSHOT.jar
[INFO] 
[INFO] --- spring-boot-maven-plugin:2.4.2:repackage (repackage) @ sdk5-demo ---
[INFO] Replacing main artifact with repackaged archive
[INFO] ------------------------------------------------------------------------
[INFO] BUILD SUCCESS
[INFO] ------------------------------------------------------------------------
[INFO] Total time: 5.364 s
[INFO] Finished at: 2021-04-07T14:12:53+01:00
[INFO] Final Memory: 24M/90M
[INFO] ------------------------------------------------------------------------
```

You have successfully generated your first Spring Boot project.

Now that the JAR file has been created, in this case `events-0.0.1-SNAPSHOT.jar`, try and run the Spring Boot app:

```bash
$ java -jar target/sdk5-demo-0.0.1-SNAPSHOT.jar 
  
.   ____          _            __ _ _
/\\ / ___'_ __ _ _(_)_ __  __ _ \ \ \ \
( ( )\___ | '_ | '_| | '_ \/ _` | \ \ \ \
\\/  ___)| |_)| | | | | || (_| |  ) ) ) )
'  |____| .__|_| |_|_| |_\__, | / / / /
=========|_|==============|___/=/_/_/_/
:: Spring Boot ::                (v2.4.2)

2021-04-07 14:15:13.514  INFO 52906 --- [           main] o.a.t.sdk5demo.Sdk5DemoApplication       : Starting Sdk5DemoApplication v0.0.1-SNAPSHOT using Java 11.0.2 on MBP512-MBERGLJUNG-0917 with PID 52906 (/Users/mbergljung/IDEAProjects/docs-new/sdk5/sdk5-demo/target/sdk5-demo-0.0.1-SNAPSHOT.jar started by mbergljung in /Users/mbergljung/IDEAProjects/docs-new/sdk5/sdk5-demo)
2021-04-07 14:15:13.520  INFO 52906 --- [           main] o.a.t.sdk5demo.Sdk5DemoApplication       : No active profile set, falling back to default profiles: default
2021-04-07 14:15:14.471  INFO 52906 --- [           main] o.a.t.sdk5demo.Sdk5DemoApplication       : Started Sdk5DemoApplication in 1.697 seconds (JVM running for 2.257)
```

During development it's useful to be able to build and run the extension in one go (so you don't forget to build...). This can be done using the `spring-boot-maven-plugin` as follows:

```bash
$ mvn spring-boot:run -Dlicense.skip=true
```

We are now ready to add the specifics depending on what type of project we are going to develop:

* SDK 5 Event handler project using [pure Java](#purejavaeventhandlers)
* SDK 5 Event handler project using [Spring Integration](#springintegrationhandlers)
* SDK 5 [Java ReST API project](#restapijavawrapperproject)
* SDK 5 project using both [event handling and Java ReST API](#eventandrestproject)

### Pure Java event handlers {#purejavaeventhandlers}
Make sure you have completed [prerequisites](#prereq) and created a [starter project](#createstarterproj).

To use pure Java event handlers follow these steps:

Add the following dependency in the Maven project file (i.e. `pom.xml`):

```xml
<dependencies>
    <!-- Alfresco Java SDK 5 Java Event Handler API Spring Boot Starter -->
    <dependency>
        <groupId>org.alfresco</groupId>
        <artifactId>alfresco-java-event-api-spring-boot-starter</artifactId>
        <version>5.1.0</version>
    </dependency>
</dependencies>
```

Remove the default Spring Boot starter dependency (i.e. `<artifactId>spring-boot-starter</artifactId>`).

Test it:

```bash
$ mvn clean package -Dlicense.skip=true

[INFO] Scanning for projects...
...

$ java -jar target/events-0.0.1-SNAPSHOT.jar 
  .   ____          _            __ _ _
 /\\ / ___'_ __ _ _(_)_ __  __ _ \ \ \ \
( ( )\___ | '_ | '_| | '_ \/ _` | \ \ \ \
 \\/  ___)| |_)| | | | | || (_| |  ) ) ) )
  '  |____| .__|_| |_|_| |_\__, | / / / /
 =========|_|==============|___/=/_/_/_/
 :: Spring Boot ::                (v2.4.2)

2021-03-26 09:19:45.766  INFO 73086 --- [           main] o.a.tutorial.events.EventsApplication    : Starting EventsApplication v0.0.1-SNAPSHOT using Java 11.0.2 on MBP512-MBERGLJUNG-0917 with PID 73086 (/Users/mbergljung/IDEAProjects/docs-new/sdk5/sdk5-pure-java-events-sample/target/events-0.0.1-SNAPSHOT.jar started by mbergljung in /Users/mbergljung/IDEAProjects/docs-new/sdk5/sdk5-pure-java-events-sample)
2021-03-26 09:19:45.769  INFO 73086 --- [           main] o.a.tutorial.events.EventsApplication    : No active profile set, falling back to default profiles: default
2021-03-26 09:19:46.593  INFO 73086 --- [           main] faultConfiguringBeanFactoryPostProcessor : No bean named 'errorChannel' has been explicitly defined. Therefore, a default PublishSubscribeChannel will be created.
2021-03-26 09:19:46.598  INFO 73086 --- [           main] faultConfiguringBeanFactoryPostProcessor : No bean named 'taskScheduler' has been explicitly defined. Therefore, a default ThreadPoolTaskScheduler will be created.
2021-03-26 09:19:46.606  INFO 73086 --- [           main] faultConfiguringBeanFactoryPostProcessor : No bean named 'integrationHeaderChannelRegistry' has been explicitly defined. Therefore, a default DefaultHeaderChannelRegistry will be created.
2021-03-26 09:19:46.722  INFO 73086 --- [           main] trationDelegate$BeanPostProcessorChecker : Bean 'org.springframework.integration.config.IntegrationManagementConfiguration' of type [org.springframework.integration.config.IntegrationManagementConfiguration] is not eligible for getting processed by all BeanPostProcessors (for example: not eligible for auto-proxying)
2021-03-26 09:19:46.738  INFO 73086 --- [           main] trationDelegate$BeanPostProcessorChecker : Bean 'integrationChannelResolver' of type [org.springframework.integration.support.channel.BeanFactoryChannelResolver] is not eligible for getting processed by all BeanPostProcessors (for example: not eligible for auto-proxying)
2021-03-26 09:19:46.739  INFO 73086 --- [           main] trationDelegate$BeanPostProcessorChecker : Bean 'integrationDisposableAutoCreatedBeans' of type [org.springframework.integration.config.annotation.Disposables] is not eligible for getting processed by all BeanPostProcessors (for example: not eligible for auto-proxying)
2021-03-26 09:19:47.537  INFO 73086 --- [           main] o.s.s.c.ThreadPoolTaskScheduler          : Initializing ExecutorService 'taskScheduler'
2021-03-26 09:19:47.601  INFO 73086 --- [           main] o.s.i.endpoint.EventDrivenConsumer       : Adding {logging-channel-adapter:_org.springframework.integration.errorLogger} as a subscriber to the 'errorChannel' channel
2021-03-26 09:19:47.602  INFO 73086 --- [           main] o.s.i.channel.PublishSubscribeChannel    : Channel 'application.errorChannel' has 1 subscriber(s).
2021-03-26 09:19:47.602  INFO 73086 --- [           main] o.s.i.endpoint.EventDrivenConsumer       : started bean '_org.springframework.integration.errorLogger'
2021-03-26 09:19:47.602  INFO 73086 --- [           main] o.s.i.endpoint.EventDrivenConsumer       : Adding {transformer} as a subscriber to the 'acsEventsListeningFlow.channel#0' channel
2021-03-26 09:19:47.602  INFO 73086 --- [           main] o.s.integration.channel.DirectChannel    : Channel 'application.acsEventsListeningFlow.channel#0' has 1 subscriber(s).
2021-03-26 09:19:47.602  INFO 73086 --- [           main] o.s.i.endpoint.EventDrivenConsumer       : started bean 'acsEventsListeningFlow.org.springframework.integration.config.ConsumerEndpointFactoryBean#0'; defined in: 'class path resource [org/alfresco/event/sdk/autoconfigure/AlfrescoEventsAutoConfiguration.class]'; from source: 'bean method acsEventsListeningFlow'
2021-03-26 09:19:47.602  INFO 73086 --- [           main] o.s.i.endpoint.EventDrivenConsumer       : Adding {recipient-list-router} as a subscriber to the 'acsEventsListeningFlow.channel#1' channel
2021-03-26 09:19:47.602  INFO 73086 --- [           main] o.s.integration.channel.DirectChannel    : Channel 'application.acsEventsListeningFlow.channel#1' has 1 subscriber(s).
2021-03-26 09:19:47.602  INFO 73086 --- [           main] o.s.i.endpoint.EventDrivenConsumer       : started bean 'acsEventsListeningFlow.org.springframework.integration.config.ConsumerEndpointFactoryBean#1'; defined in: 'class path resource [org/alfresco/event/sdk/autoconfigure/AlfrescoEventsAutoConfiguration.class]'; from source: 'bean method acsEventsListeningFlow'
2021-03-26 09:19:47.603  INFO 73086 --- [           main] o.s.i.endpoint.EventDrivenConsumer       : Adding {bridge} as a subscriber to the 'alfresco.events.si.channel' channel
2021-03-26 09:19:47.603  INFO 73086 --- [           main] o.s.integration.channel.DirectChannel    : Channel 'application.alfresco.events.si.channel' has 1 subscriber(s).
2021-03-26 09:19:47.603  INFO 73086 --- [           main] o.s.i.endpoint.EventDrivenConsumer       : started bean 'acsEventsSpringIntegrationFlow.org.springframework.integration.config.ConsumerEndpointFactoryBean#0'; defined in: 'class path resource [org/alfresco/event/sdk/autoconfigure/AlfrescoEventsAutoConfiguration.class]'; from source: 'bean method acsEventsSpringIntegrationFlow'
2021-03-26 09:19:47.603  INFO 73086 --- [           main] o.s.i.endpoint.EventDrivenConsumer       : Adding {bridge} as a subscriber to the 'acsEventsSpringIntegrationFlow.channel#1' channel
2021-03-26 09:19:47.603  INFO 73086 --- [           main] o.s.integration.channel.DirectChannel    : Channel 'application.acsEventsSpringIntegrationFlow.channel#1' has 1 subscriber(s).
2021-03-26 09:19:47.603  INFO 73086 --- [           main] o.s.i.endpoint.EventDrivenConsumer       : started bean 'acsEventsSpringIntegrationFlow.org.springframework.integration.config.ConsumerEndpointFactoryBean#1'; defined in: 'class path resource [org/alfresco/event/sdk/autoconfigure/AlfrescoEventsAutoConfiguration.class]'; from source: 'bean method acsEventsSpringIntegrationFlow'
2021-03-26 09:19:47.603  INFO 73086 --- [           main] o.s.i.endpoint.EventDrivenConsumer       : Adding {bridge} as a subscriber to the 'alfresco.events.handlers.channel' channel
2021-03-26 09:19:47.603  INFO 73086 --- [           main] o.s.integration.channel.DirectChannel    : Channel 'application.alfresco.events.handlers.channel' has 1 subscriber(s).
2021-03-26 09:19:47.603  INFO 73086 --- [           main] o.s.i.endpoint.EventDrivenConsumer       : started bean 'acsEventsHandlersFlow.org.springframework.integration.config.ConsumerEndpointFactoryBean#0'; defined in: 'class path resource [org/alfresco/event/sdk/autoconfigure/AlfrescoEventsAutoConfiguration.class]'; from source: 'bean method acsEventsHandlersFlow'
2021-03-26 09:19:47.603  INFO 73086 --- [           main] o.s.integration.channel.DirectChannel    : Channel 'application.acsEventsHandlersFlow.channel#1' has 1 subscriber(s).
2021-03-26 09:19:47.604  INFO 73086 --- [           main] o.s.i.endpoint.EventDrivenConsumer       : started bean 'acsEventsHandlersFlow.org.springframework.integration.config.ConsumerEndpointFactoryBean#1'; defined in: 'class path resource [org/alfresco/event/sdk/autoconfigure/AlfrescoEventsAutoConfiguration.class]'; from source: 'bean method acsEventsHandlersFlow'
2021-03-26 09:19:47.604  INFO 73086 --- [           main] ishingJmsMessageListener$GatewayDelegate : started org.springframework.integration.jms.ChannelPublishingJmsMessageListener$GatewayDelegate@53812a9b
2021-03-26 09:19:47.784  INFO 73086 --- [           main] o.s.i.jms.JmsMessageDrivenEndpoint       : started bean 'acsEventsListeningFlow.jms:message-driven-channel-adapter#0'; defined in: 'class path resource [org/alfresco/event/sdk/autoconfigure/AlfrescoEventsAutoConfiguration.class]'; from source: 'bean method acsEventsListeningFlow'
2021-03-26 09:19:47.796  INFO 73086 --- [           main] o.a.tutorial.events.EventsApplication    : Started EventsApplication in 2.509 seconds (JVM running for 3.005)
```

Looks ready for some event handler code.

Now, start adding your event handler code, let's add an event handler that will be triggered when a new document/file 
is uploaded. To do this we need to create a class that implements the 
`org.alfresco.event.sdk.handling.handler.OnNodeCreatedEventHandler` [event handler interface](#eventhandlerinterface):

```java
package org.alfresco.tutorial.events;

import org.alfresco.event.sdk.handling.handler.OnNodeCreatedEventHandler;
import org.alfresco.event.sdk.model.v1.model.DataAttributes;
import org.alfresco.event.sdk.model.v1.model.NodeResource;
import org.alfresco.event.sdk.model.v1.model.RepoEvent;
import org.alfresco.event.sdk.model.v1.model.Resource;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

/**
 * Sample event handler to demonstrate reacting to a document/file being uploaded to the repository.
 */
@Component
public class ContentUploadedEventHandler implements OnNodeCreatedEventHandler {
    private static final Logger LOGGER = LoggerFactory.getLogger(ContentUploadedEventHandler.class);

    public void handleEvent(final RepoEvent<DataAttributes<Resource>> repoEvent) {
        NodeResource nodeResource = (NodeResource) repoEvent.getData().getResource();
        LOGGER.info("A file was uploaded to the repository: {}, {}, {}", nodeResource.getId(), nodeResource.getNodeType(),
             nodeResource.getName());
    }
}
```

Add the Spring Bean class into the same directory as the Spring Boot starter class. It doesn't have to be added to this 
directory, but in this case we are just testing it, so no need to organize too much. 

Now stop, build and start it up again:

```bash
$ ^C
...
$ mvn spring-boot:run -Dlicense.skip=true
...
```

Add a file via the Share user interface, you should see the following in the logs:

```text
2021-03-26 10:23:46.846  INFO 74020 --- [erContainer#0-1] o.a.t.e.ContentUploadedEventHandler      : A file was uploaded to the repository: 13ba2bbf-2422-4152-832f-060e017ec09c, cm:content, some-file.txt
```

Now, this event handler will actually also be triggered when a folder is created. So how can we fix so the handler is 
only triggered when a file is created/uploaded? By adding a so called [event filter](#eventfilter) to the class:

```java
package org.alfresco.tutorial.events;

import org.alfresco.event.sdk.handling.filter.EventFilter;
import org.alfresco.event.sdk.handling.filter.IsFileFilter;
import org.alfresco.event.sdk.handling.handler.OnNodeCreatedEventHandler;
import org.alfresco.event.sdk.model.v1.model.DataAttributes;
import org.alfresco.event.sdk.model.v1.model.NodeResource;
import org.alfresco.event.sdk.model.v1.model.RepoEvent;
import org.alfresco.event.sdk.model.v1.model.Resource;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;


/**
 * Sample event handler to demonstrate reacting to a document/file being uploaded to the repository.
 */
@Component
public class ContentUploadedEventHandler implements OnNodeCreatedEventHandler {
    private static final Logger LOGGER = LoggerFactory.getLogger(ContentUploadedEventHandler.class);

    public void handleEvent(final RepoEvent<DataAttributes<Resource>> repoEvent) {
        NodeResource nodeResource = (NodeResource) repoEvent.getData().getResource();
        LOGGER.info("A file was uploaded to the repository: {}, {}, {}", nodeResource.getId(), nodeResource.getNodeType(),
               nodeResource.getName());
    }

    public EventFilter getEventFilter() {
        return IsFileFilter.get();
    }
}
```

Here we are using the `org.alfresco.event.sdk.handling.filter.IsFileFilter`, which will make sure that the event handler
is triggered only when the node type is `cm:content` or subtype thereof, which represents files.

For a complete list of events with sample code see the [events extension point]({% link content-services/7.2/develop/oop-ext-points/events.md %}) 
documentation. For a complete list of Event Filters available in the SDK see this [section](#eventfilter).

For information on how to implement a custom event filter see this [section](#customeventfilters).

For more information about how to extract all the properties from the message payload see [`NodeResource` info](#noderesourceobj).

### Spring Integration event handlers {#springintegrationhandlers}
Make sure you have completed [prerequisites](#prereq) and created a [starter project](#createstarterproj).

To use Spring Integration based event handlers follow these steps:

Add the following dependency in the Maven project file (i.e. `pom.xml`):

```xml
<dependencies>
    <!-- Alfresco Java SDK 5 Spring Integration Event Handler API Spring Boot Starter -->
    <dependency>
        <groupId>org.alfresco</groupId>
        <artifactId>alfresco-java-event-api-spring-boot-starter</artifactId>
        <version>5.1.0</version>
    </dependency>
</dependencies>
```

Enable Spring Integration handlers in the `src/main/resources/application.properties` configuration file 
(by default pure Java event handlers is expected), add the following two extra properties:

```text
# Where is Alfresco Active MQ JMS Broker running?
spring.activemq.brokerUrl=tcp://localhost:61616
# This property is required if you want Spring Boot to auto-define the ActiveMQConnectionFactory,
# otherwise you can define that bean in Spring config
spring.jms.cache.enabled=false
# Enable Spring Integration based event handlers
alfresco.events.enableSpringIntegration=true
# Turn off plain Java event handlers
alfresco.events.enableHandlers=false
```

Remove the default Spring Boot starter dependency (i.e. `<artifactId>spring-boot-starter</artifactId>`).

Test it:

```bash
$ mvn clean package -Dlicense.skip=true
[INFO] Scanning for projects...
...

$ java -jar target/events-0.0.1-SNAPSHOT.jar 
  .   ____          _            __ _ _
 /\\ / ___'_ __ _ _(_)_ __  __ _ \ \ \ \
( ( )\___ | '_ | '_| | '_ \/ _` | \ \ \ \
 \\/  ___)| |_)| | | | | || (_| |  ) ) ) )
  '  |____| .__|_| |_|_| |_\__, | / / / /
 =========|_|==============|___/=/_/_/_/
 :: Spring Boot ::                (v2.4.2)

2021-03-29 13:44:49.441  INFO 2599 --- [           main] o.a.tutorial.events.EventsApplication    : Starting EventsApplication v0.0.1-SNAPSHOT using Java 11.0.2 on MBP512-MBERGLJUNG-0917 with PID 2599 (/Users/mbergljung/IDEAProjects/docs-new/sdk5/sdk5-spring-integration-events-sample/target/events-0.0.1-SNAPSHOT.jar started by mbergljung in /Users/mbergljung/IDEAProjects/docs-new/sdk5/sdk5-spring-integration-events-sample)
2021-03-29 13:44:49.446  INFO 2599 --- [           main] o.a.tutorial.events.EventsApplication    : No active profile set, falling back to default profiles: default
2021-03-29 13:44:50.606  INFO 2599 --- [           main] faultConfiguringBeanFactoryPostProcessor : No bean named 'errorChannel' has been explicitly defined. Therefore, a default PublishSubscribeChannel will be created.
2021-03-29 13:44:50.613  INFO 2599 --- [           main] faultConfiguringBeanFactoryPostProcessor : No bean named 'taskScheduler' has been explicitly defined. Therefore, a default ThreadPoolTaskScheduler will be created.
2021-03-29 13:44:50.621  INFO 2599 --- [           main] faultConfiguringBeanFactoryPostProcessor : No bean named 'integrationHeaderChannelRegistry' has been explicitly defined. Therefore, a default DefaultHeaderChannelRegistry will be created.
2021-03-29 13:44:50.775  INFO 2599 --- [           main] trationDelegate$BeanPostProcessorChecker : Bean 'org.springframework.integration.config.IntegrationManagementConfiguration' of type [org.springframework.integration.config.IntegrationManagementConfiguration] is not eligible for getting processed by all BeanPostProcessors (for example: not eligible for auto-proxying)
2021-03-29 13:44:50.802  INFO 2599 --- [           main] trationDelegate$BeanPostProcessorChecker : Bean 'integrationChannelResolver' of type [org.springframework.integration.support.channel.BeanFactoryChannelResolver] is not eligible for getting processed by all BeanPostProcessors (for example: not eligible for auto-proxying)
2021-03-29 13:44:50.803  INFO 2599 --- [           main] trationDelegate$BeanPostProcessorChecker : Bean 'integrationDisposableAutoCreatedBeans' of type [org.springframework.integration.config.annotation.Disposables] is not eligible for getting processed by all BeanPostProcessors (for example: not eligible for auto-proxying)
2021-03-29 13:44:51.924  INFO 2599 --- [           main] o.s.s.c.ThreadPoolTaskScheduler          : Initializing ExecutorService 'taskScheduler'
2021-03-29 13:44:52.014  INFO 2599 --- [           main] o.s.i.endpoint.EventDrivenConsumer       : Adding {logging-channel-adapter:_org.springframework.integration.errorLogger} as a subscriber to the 'errorChannel' channel
2021-03-29 13:44:52.015  INFO 2599 --- [           main] o.s.i.channel.PublishSubscribeChannel    : Channel 'application.errorChannel' has 1 subscriber(s).
2021-03-29 13:44:52.015  INFO 2599 --- [           main] o.s.i.endpoint.EventDrivenConsumer       : started bean '_org.springframework.integration.errorLogger'
2021-03-29 13:44:52.015  INFO 2599 --- [           main] o.s.i.endpoint.EventDrivenConsumer       : Adding {transformer} as a subscriber to the 'acsEventsListeningFlow.channel#0' channel
2021-03-29 13:44:52.015  INFO 2599 --- [           main] o.s.integration.channel.DirectChannel    : Channel 'application.acsEventsListeningFlow.channel#0' has 1 subscriber(s).
2021-03-29 13:44:52.015  INFO 2599 --- [           main] o.s.i.endpoint.EventDrivenConsumer       : started bean 'acsEventsListeningFlow.org.springframework.integration.config.ConsumerEndpointFactoryBean#0'; defined in: 'class path resource [org/alfresco/event/sdk/autoconfigure/AlfrescoEventsAutoConfiguration.class]'; from source: 'bean method acsEventsListeningFlow'
2021-03-29 13:44:52.015  INFO 2599 --- [           main] o.s.i.endpoint.EventDrivenConsumer       : Adding {recipient-list-router} as a subscriber to the 'acsEventsListeningFlow.channel#1' channel
2021-03-29 13:44:52.016  INFO 2599 --- [           main] o.s.integration.channel.DirectChannel    : Channel 'application.acsEventsListeningFlow.channel#1' has 1 subscriber(s).
2021-03-29 13:44:52.016  INFO 2599 --- [           main] o.s.i.endpoint.EventDrivenConsumer       : started bean 'acsEventsListeningFlow.org.springframework.integration.config.ConsumerEndpointFactoryBean#1'; defined in: 'class path resource [org/alfresco/event/sdk/autoconfigure/AlfrescoEventsAutoConfiguration.class]'; from source: 'bean method acsEventsListeningFlow'
2021-03-29 13:44:52.016  INFO 2599 --- [           main] o.s.i.endpoint.EventDrivenConsumer       : Adding {bridge} as a subscriber to the 'alfresco.events.si.channel' channel
2021-03-29 13:44:52.016  INFO 2599 --- [           main] o.s.integration.channel.DirectChannel    : Channel 'application.alfresco.events.si.channel' has 1 subscriber(s).
2021-03-29 13:44:52.016  INFO 2599 --- [           main] o.s.i.endpoint.EventDrivenConsumer       : started bean 'acsEventsSpringIntegrationFlow.org.springframework.integration.config.ConsumerEndpointFactoryBean#0'; defined in: 'class path resource [org/alfresco/event/sdk/autoconfigure/AlfrescoEventsAutoConfiguration.class]'; from source: 'bean method acsEventsSpringIntegrationFlow'
2021-03-29 13:44:52.016  INFO 2599 --- [           main] o.s.i.endpoint.EventDrivenConsumer       : Adding {bridge} as a subscriber to the 'acsEventsSpringIntegrationFlow.channel#1' channel
2021-03-29 13:44:52.016  INFO 2599 --- [           main] o.s.integration.channel.DirectChannel    : Channel 'application.acsEventsSpringIntegrationFlow.channel#1' has 1 subscriber(s).
2021-03-29 13:44:52.016  INFO 2599 --- [           main] o.s.i.endpoint.EventDrivenConsumer       : started bean 'acsEventsSpringIntegrationFlow.org.springframework.integration.config.ConsumerEndpointFactoryBean#1'; defined in: 'class path resource [org/alfresco/event/sdk/autoconfigure/AlfrescoEventsAutoConfiguration.class]'; from source: 'bean method acsEventsSpringIntegrationFlow'
2021-03-29 13:44:52.017  INFO 2599 --- [           main] o.s.i.endpoint.EventDrivenConsumer       : Adding {bridge} as a subscriber to the 'alfresco.events.handlers.channel' channel
2021-03-29 13:44:52.017  INFO 2599 --- [           main] o.s.integration.channel.DirectChannel    : Channel 'application.alfresco.events.handlers.channel' has 1 subscriber(s).
2021-03-29 13:44:52.017  INFO 2599 --- [           main] o.s.i.endpoint.EventDrivenConsumer       : started bean 'acsEventsHandlersFlow.org.springframework.integration.config.ConsumerEndpointFactoryBean#0'; defined in: 'class path resource [org/alfresco/event/sdk/autoconfigure/AlfrescoEventsAutoConfiguration.class]'; from source: 'bean method acsEventsHandlersFlow'
2021-03-29 13:44:52.017  INFO 2599 --- [           main] o.s.integration.channel.DirectChannel    : Channel 'application.acsEventsHandlersFlow.channel#1' has 1 subscriber(s).
2021-03-29 13:44:52.018  INFO 2599 --- [           main] o.s.i.endpoint.EventDrivenConsumer       : started bean 'acsEventsHandlersFlow.org.springframework.integration.config.ConsumerEndpointFactoryBean#1'; defined in: 'class path resource [org/alfresco/event/sdk/autoconfigure/AlfrescoEventsAutoConfiguration.class]'; from source: 'bean method acsEventsHandlersFlow'
2021-03-29 13:44:52.018  INFO 2599 --- [           main] ishingJmsMessageListener$GatewayDelegate : started org.springframework.integration.jms.ChannelPublishingJmsMessageListener$GatewayDelegate@d8305c2
2021-03-29 13:44:52.539  INFO 2599 --- [           main] o.s.i.jms.JmsMessageDrivenEndpoint       : started bean 'acsEventsListeningFlow.jms:message-driven-channel-adapter#0'; defined in: 'class path resource [org/alfresco/event/sdk/autoconfigure/AlfrescoEventsAutoConfiguration.class]'; from source: 'bean method acsEventsListeningFlow'
2021-03-29 13:44:52.561  INFO 2599 --- [           main] o.a.tutorial.events.EventsApplication    : Started EventsApplication in 3.849 seconds (JVM running for 4.638)
```

Looks ready for some event handler code.

Now, start adding your event handler code, let's add an event handler that will be triggered when a new document/file 
is uploaded. To do this we need to create a class that implements the 
`org.springframework.integration.dsl.IntegrationFlow` interface, we can use a helper adapter class (i.e. 
`IntegrationFlowAdapter`) for this:

```java
package org.alfresco.tutorial.events;

import org.alfresco.event.sdk.handling.filter.EventTypeFilter;
import org.alfresco.event.sdk.integration.EventChannels;
import org.alfresco.event.sdk.integration.filter.IntegrationEventFilter;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.integration.dsl.IntegrationFlowAdapter;
import org.springframework.integration.dsl.IntegrationFlowDefinition;
import org.springframework.stereotype.Component;

/**
 * Spring Integration based event handler that will execute code when a file is uploaded
 */
@Component
public class NewContentFlow extends IntegrationFlowAdapter {
    private static final Logger LOGGER = LoggerFactory.getLogger(NewContentFlow.class);

    // Use builder to create an integration flow based on alfresco.events.main.channel event channel
    @Override
    protected IntegrationFlowDefinition<?> buildFlow() {
        return from(EventChannels.MAIN) // Listen to events coming from the Alfresco events channel
                .filter(IntegrationEventFilter.of(EventTypeFilter.NODE_CREATED)) // Filter events and select only node created events
                .handle(t -> LOGGER.info("File uploaded: {}", t.getPayload().toString())); // Handle event with a bit of logging
    }
}
```

Add the Spring Bean class into the same directory as the Spring Boot starter class. It doesn't have to be added to this 
directory, but in this case we are just testing it, so no need to organize too much. 

Now stop, build and start it up again:

```bash
$ ^C
...
$ mvn spring-boot:run -Dlicense.skip=true
...
``` 

Add a file via the Share user interface, you should see the following in the logs:

```text
2021-03-30 10:09:22.738  INFO 9603 --- [erContainer#0-1] o.a.tutorial.events.NewContentFlow : File uploaded: RepoEvent [specversion=1.0, type=org.alfresco.event.node.Created, id=12100b22-8dae-4ebe-b114-ba9dc2f9755b, source=/3bc24dba-d1ae-4c04-af60-0294a4c68a7f, time=2021-03-30T09:09:22.711117Z, dataschema=https://api.alfresco.com/schema/event/repo/v1/nodeCreated, datacontenttype=application/json, data=EventData [eventGroupId=3196f0f6-b4aa-4834-9aa2-a58eaa8f121f, resource=NodeResource [id=4e1f0830-2452-4a4c-b20a-7146402ce665, name=somefile-again.txt, nodeType=cm:content, isFile=true, isFolder=false, createdByUser=UserInfo [id=admin, displayName=Administrator], createdAt=2021-03-30T09:09:22.324Z, modifiedByUser=UserInfo [id=admin, displayName=Administrator], modifiedAt=2021-03-30T09:09:22.324Z, content=ContentInfo [mimeType=text/plain, sizeInBytes=0, encoding=UTF-8], properties={cm:title=, app:editInline=true, cm:description=}, aspectNames=[app:inlineeditable, cm:titled, cm:auditable], primaryHierarchy=[19e067a9-5d2a-43ba-ac93-d273d938050c, 30afd06d-6ec7-4434-b1d6-1f7671b6b9a7, 7a82ddff-0869-430e-8cc8-623d97b98dc4]], resourceBefore=null]]
```

Now, this event handler will actually also be triggered when a folder is created. So how can we fix so the handler is 
only triggered when a file is created/uploaded? By adding a so called [event filter](#eventfilter) to the class:

```java
package org.alfresco.tutorial.events;

import org.alfresco.event.sdk.handling.filter.EventTypeFilter;
import org.alfresco.event.sdk.handling.filter.IsFileFilter;
import org.alfresco.event.sdk.integration.EventChannels;
import org.alfresco.event.sdk.integration.filter.IntegrationEventFilter;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.integration.dsl.IntegrationFlowAdapter;
import org.springframework.integration.dsl.IntegrationFlowDefinition;
import org.springframework.stereotype.Component;

/**
 * Spring Integration based event handler that will execute code when a file is uploaded
 */
@Component
public class NewContentFlow extends IntegrationFlowAdapter {
    private static final Logger LOGGER = LoggerFactory.getLogger(NewContentFlow.class);

    // Use builder to create an integration flow based on alfresco.events.main.channel event channel
    @Override
    protected IntegrationFlowDefinition<?> buildFlow() {
        return from(EventChannels.MAIN) // Listen to events coming from the Alfresco events channel
                .filter(IntegrationEventFilter.of(EventTypeFilter.NODE_CREATED)) // Filter events and select only node created events
                .filter(IntegrationEventFilter.of(IsFileFilter.get())) // Filter node and make sure it is a file node
                .handle(t -> LOGGER.info("File uploaded: {}", t.getPayload().toString())); // Handle event with a bit of logging
    }
}
```

Here we are using the `org.alfresco.event.sdk.handling.filter.IsFileFilter`, which will make sure that the event handler
is triggered only when the node type is `cm:content` or subtype thereof, which represents files. To use this filter with
Spring Integration we use the [IntegrationEventFilter](https://github.com/Alfresco/alfresco-java-sdk/blob/develop/alfresco-java-event-api/alfresco-java-event-api-integration/src/main/java/org/alfresco/event/sdk/integration/filter/IntegrationEventFilter.java){:target="_blank"} 
wrapper.

If you are thinking, do I really need a whole class just to process an event? No you don't, you can include a bean 
definition directly in the Spring Boot app class as follows:

```java
package org.alfresco.tutorial.events;

import org.alfresco.event.sdk.handling.filter.EventTypeFilter;
import org.alfresco.event.sdk.handling.filter.IsFileFilter;
import org.alfresco.event.sdk.integration.EventChannels;
import org.alfresco.event.sdk.integration.filter.IntegrationEventFilter;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.integration.dsl.IntegrationFlow;
import org.springframework.integration.dsl.IntegrationFlows;

@SpringBootApplication
public class EventsApplication {
    private static final Logger LOGGER = LoggerFactory.getLogger(EventsApplication.class);
    
    public static void main(String[] args) {
        SpringApplication.run(EventsApplication.class, args);
    }

    @Bean
    public IntegrationFlow logCreateFileNode() {
        return IntegrationFlows.from(EventChannels.MAIN) // Listen to events coming from the Alfresco events channel
                .filter(IntegrationEventFilter.of(EventTypeFilter.NODE_CREATED)) // Filter events and select only node created events
                .filter(IntegrationEventFilter.of(IsFileFilter.get())) // Filter node and make sure it is a file node
                .handle(t -> LOGGER.info("File uploaded: {}", t.getPayload().toString())) // Handle event with a bit of logging
                .get();
    }
}
```

It also makes sense to add error management code to the application class as follows:

```java
@SpringBootApplication
public class EventsApplication {
    private static final Logger LOGGER = LoggerFactory.getLogger(EventsApplication.class);
    
    public static void main(String[] args) {
        SpringApplication.run(EventsApplication.class, args);
    }

    @Bean
    public IntegrationFlow logError() {
        return IntegrationFlows.from(EventChannels.ERROR).handle(t -> {
            LOGGER.info("Error: {}", t.getPayload().toString());
            MessageHandlingException exception = (MessageHandlingException) t.getPayload();
            exception.printStackTrace();
        }).get();
    }
...
}
```

For a complete list of events with sample code see the [events extension point]({% link content-services/7.2/develop/oop-ext-points/events.md %}) 
documentation. For a complete list of Event Filters available in the SDK see this [section](#eventfilter).

For information on how to implement a custom event filter see this [section](#customeventfilters).

For more information about how to extract all the properties from the message payload see [`NodeResource` info](#noderesourceobj).

## Implementing custom event filters {#customeventfilters}
Make sure you have completed the [prerequisites](#prereq) and created a [starter project](#createstarterproj).
You also need to decide if you want to use pure [Java event handlers](#purejavaeventhandlers) or [Spring Integration event handlers](#springintegrationhandlers).

### Parent folder filter {#parentfoldercustomfilter}
The following event filter checks if a passed in node ID is equal to a desired parent folder node ID. This event filter
can be used to check if a file or folder is located in a specific folder. To create a custom event filter you need to 
create a class that extends the `org.alfresco.event.sdk.handling.filter.AbstractEventFilter` class and implement
the `test` method:  

```java
package org.alfresco.tutorial.events;

import org.alfresco.event.sdk.handling.filter.AbstractEventFilter;
import org.alfresco.event.sdk.model.v1.model.DataAttributes;
import org.alfresco.event.sdk.model.v1.model.NodeResource;
import org.alfresco.event.sdk.model.v1.model.RepoEvent;
import org.alfresco.event.sdk.model.v1.model.Resource;

import java.util.Objects;

/**
 * Filter that can be used when a node needs to be in a specific folder.
 */
public class ParentFolderFilter extends AbstractEventFilter {
    // The node ID for the folder we want to check against 
    private final String parentId;

    // Private ctor, make sure ID is not null
    private ParentFolderFilter(final String parentId) {
        this.parentId = Objects.requireNonNull(parentId);
    }

    // When using the filter, pass in the folder node ID we want to check against
    public static ParentFolderFilter of(final String parentId) {
        return new ParentFolderFilter(parentId);
    }

    // The actual test: 
    // get the node resource we are testing (such as a file node), 
    // then get its primary parent folder ID and check if it matches desired folder Node ID
    public boolean test(RepoEvent<DataAttributes<Resource>> event) {
        NodeResource resource = (NodeResource) event.getData().getResource();
        boolean parentFound = resource.getPrimaryHierarchy().get(0).equals(parentId);
        return isNodeEvent(event) && parentFound;
    }
}
```

This event filter can now be used in an event handler class as follows (in this case together with another filter):

```java
@Component
public class ContentUploadedEventHandler implements OnNodeCreatedEventHandler {
    private String folderID = "5f355d16-f824-4173-bf4b-b1ec37ef5549";

    ...
    
    public EventFilter getEventFilter() {
        // Check if uploaded file is located in desired folder
        return IsFileFilter.get()
                .and(ParentFolderFilter.of(folderID));
    }
```

## ReST API Java wrapper {#rest-api-java-wrapper}
The ReST API Java wrapper library in SDK 5 provides a Java object wrapper around the Alfresco ReST API. If you are not 
familiar with Alfresco ReST API version 1.0, then read through this [introduction]({% link content-services/7.2/develop/rest-api-guide/index.md %}).

The ReST API wrapper classes have been generated based on the ReST API [Swagger definition](https://swagger.io/){:target="_blank"}. 
The following main packages exist for the different APIs:

* [alfresco-auth-rest-api](https://github.com/Alfresco/alfresco-java-sdk/tree/develop/alfresco-java-rest-api/alfresco-java-rest-api-lib/generated/alfresco-auth-rest-api){:target="_blank"} - Managing Alfresco tickets
* [alfresco-core-rest-api](https://github.com/Alfresco/alfresco-java-sdk/tree/develop/alfresco-java-rest-api/alfresco-java-rest-api-lib/generated/alfresco-core-rest-api){:target="_blank"} - The main API with actions, nodes, audit, renditions, sites, tagging, versioning etc 
* [alfresco-discovery-rest-api](https://github.com/Alfresco/alfresco-java-sdk/tree/develop/alfresco-java-rest-api/alfresco-java-rest-api-lib/generated/alfresco-discovery-rest-api){:target="_blank"} - Repository information, such as license, version, modules 
* [alfresco-search-rest-api](https://github.com/Alfresco/alfresco-java-sdk/tree/develop/alfresco-java-rest-api/alfresco-java-rest-api-lib/generated/alfresco-search-rest-api){:target="_blank"} - Search API  

The following API requires the [Alfresco Insight Engine]({% link insight-engine/latest/index.md %}) to be installed:

* [alfresco-search-sql-rest-api](https://github.com/Alfresco/alfresco-java-sdk/tree/develop/alfresco-java-rest-api/alfresco-java-rest-api-lib/generated/alfresco-search-sql-rest-api){:target="_blank"} - SQL search with Alfresco Insight Engine

The following APIs require the [Alfresco Governance Services]({% link governance-services/latest/index.md %}) module to be installed:
 
* [alfresco-governance-core-rest-api](https://github.com/Alfresco/alfresco-java-sdk/tree/develop/alfresco-java-rest-api/alfresco-java-rest-api-lib/generated/alfresco-governance-core-rest-api){:target="_blank"} - Main Governance Services API
* [alfresco-governance-classification-rest-api](https://github.com/Alfresco/alfresco-java-sdk/tree/develop/alfresco-java-rest-api/alfresco-java-rest-api-lib/generated/alfresco-governance-classification-rest-api){:target="_blank"} - Classification and Security Marks API

## The alfresco-core-rest-api package
The [alfresco-core-rest-api](https://github.com/Alfresco/alfresco-java-sdk/tree/develop/alfresco-java-rest-api/alfresco-java-rest-api-lib/generated/alfresco-core-rest-api){:target="_blank"} 
package contains most of the APIs that you will need. Here are some of the APIs in this package:

* `NodesApi` – Manage nodes, such as folders and files
* `SitesApi` – Manage sites
* `QueriesApi` – Simple search for people, groups, nodes by term
* `VersionsApi` – Manage version history
* `ActionsApi` – Manage repository actions
* `AuditApi` – Manage audit apps and logging
* `CommentsApi` – Manage node comments
* `DownloadsApi` – Download node content 

This package together with the [alfresco-search-rest-api](https://github.com/Alfresco/alfresco-java-sdk/tree/develop/alfresco-java-rest-api/alfresco-java-rest-api-lib/generated/alfresco-search-rest-api){:target="_blank"} 
package, which contains the `SearchAPI`, is all you will need in most cases.

## Creating a Java ReST API extension project {#restapijavawrapperproject}
Make sure you have completed [prerequisites](#prereq) and created a [starter project](#createstarterproj).

1. Add the following dependency in the Maven project file (i.e. `pom.xml`):

    ```xml
    <dependencies>
        <!-- Alfresco Java SDK 5 Java ReST API wrapper Spring Boot Starter -->
        <dependency>
        <groupId>org.alfresco</groupId>
        <artifactId>alfresco-java-rest-api-spring-boot-starter</artifactId>
        <version>5.1.0</version>
        </dependency>
    </dependencies>
    ```

2. Remove the default Spring Boot starter dependency (i.e. `<artifactId>spring-boot-starter</artifactId>`).

3. Modify the contents of the Spring Boot application class (`org/alfresco/tutorial/sdk5demo/Sdk5DemoApplication.java`) by adding the following `com.fasterxml.jackson.databind.ObjectMapper`. This is required for deserializing dates:

    ```java
    package org.alfresco.tutorial.sdk5demo;

    import com.fasterxml.jackson.databind.ObjectMapper;
    import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
    import org.springframework.beans.factory.annotation.Autowired;
    import org.springframework.boot.SpringApplication;
    import org.springframework.boot.autoconfigure.SpringBootApplication;

    import javax.annotation.PostConstruct;
    
    @SpringBootApplication
    public class Sdk5DemoApplication {
    
        @Autowired
        private ObjectMapper objectMapper;
    
        @PostConstruct
        public void setUp() {
            objectMapper.registerModule(new JavaTimeModule());
        }
    
        public static void main(String[] args) {
            SpringApplication.run(Sdk5DemoApplication.class, args);
        }
    }
    ```

4. Test it:

    ```bash
    $ mvn clean package -Dlicense.skip=true
    [INFO] Scanning for projects...
    ...

    $ java -jar target/rest-api-0.0.1-SNAPSHOT.jar

    .   ____          _            __ _ _
    /\\ / ___'_ __ _ _(_)_ __  __ _ \ \ \ \
    ( ( )\___ | '_ | '_| | '_ \/ _` | \ \ \ \
    \\/  ___)| |_)| | | | | || (_| |  ) ) ) )
    '  |____| .__|_| |_|_| |_\__, | / / / /
    =========|_|==============|___/=/_/_/_/
    :: Spring Boot ::                (v2.4.2)

    2021-04-07 14:31:35.599  INFO 53273 --- [           main] o.a.tutorial.restapi.RestApiApplication  : Starting RestApiApplication v0.0.1-SNAPSHOT using Java 11.0.2 on MBP512-MBERGLJUNG-0917 with PID 53273 (/Users/mbergljung/IDEAProjects/docs-new/sdk5/sdk5-rest-api-java-wrapper-sample/target/rest-api-0.0.1-SNAPSHOT.jar started by mbergljung in /Users/mbergljung/IDEAProjects/docs-new/sdk5/sdk5-rest-api-java-wrapper-sample)
    2021-04-07 14:31:35.605  INFO 53273 --- [           main] o.a.tutorial.restapi.RestApiApplication  : No active profile set, falling back to default profiles: default
    2021-04-07 14:31:36.832  INFO 53273 --- [           main] o.s.cloud.context.scope.GenericScope     : BeanFactory id=55661aff-d1dc-3db8-94e2-cf0514d3118c
    2021-04-07 14:31:37.443  INFO 53273 --- [           main] o.a.tutorial.restapi.RestApiApplication  : Started RestApiApplication in 2.832 seconds (JVM running for 3.563)
    ```

Looks ready for some ReST API code.

Now, start adding your ReST API code, let's create a command line client that can be used to create sites, create folders, 
create files, and to search. First update the Spring Boot application class to look like follows, making use of the 
`org.springframework.boot.CommandLineRunner`:

```java
package org.alfresco.tutorial.restapi;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class RestApiApplication implements CommandLineRunner {
    private static final Logger LOGGER = LoggerFactory.getLogger(RestApiApplication.class);

    @Autowired
    CreateSiteCmd createSiteCmd;

    @Autowired
    CreateFolderCmd createFolderCmd;

    @Autowired
    CreateFileCmd createFileCmd;

    @Autowired
    SearchCmd searchCmd;

    public static void main(String[] args) {
        SpringApplication.run(RestApiApplication.class, args);
    }

    public void run(String... args) throws Exception {
        for (int i = 0; i < args.length; ++i) {
            LOGGER.info("args[{}]: {}", i, args[i]);
        }

        String command = args[0];

        switch (command) {
            case "create-site":
                createSiteCmd.execute(args[1]);
                break;
            case "create-folder":     // siteId, folderName
                createFolderCmd.execute(args[1], args[2]);
                break;
            case "create-file":      // parentFolderNodeId, filename
                createFileCmd.execute(args[1], args[2]);
                break;
            case "search":          // siteId, term
                searchCmd.execute(args[1], args[2]);
                break;
            default:
                LOGGER.error("Command {} is not available", command);
        }

    }
}
```

This command line runner uses a number of beans to support creating different things in the Alfresco Repository, such as 
sites and folders. Start by creating the `CreateSiteCmd` bean that will facilitate creating sites via the ReST API Java 
wrapper, in the same package as the Spring Boot application class create the following class:

```java
package org.alfresco.tutorial.restapi;

import org.alfresco.core.handler.SitesApi;
import org.alfresco.core.model.Site;
import org.alfresco.core.model.SiteBodyCreate;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.util.Objects;

@Component
public class CreateSiteCmd {
    static final Logger LOGGER = LoggerFactory.getLogger(CreateSiteCmd.class);

    @Autowired
    SitesApi sitesApi;

    public void execute(String siteId) throws IOException {
        Site site = Objects.requireNonNull(sitesApi.createSite(
                new SiteBodyCreate()
                        .id(siteId)
                        .title("title-" + siteId)
                        .description("description-" + siteId)
                        .visibility(SiteBodyCreate.VisibilityEnum.PUBLIC),
                null, null, null).getBody()).getEntry();
        LOGGER.info("Created site: {}", site);
    }
}
```

To use one of the ReST API Java wrapper services, such as [`SitesApi`](https://github.com/Alfresco/alfresco-java-sdk/blob/develop/alfresco-java-rest-api/alfresco-java-rest-api-lib/generated/alfresco-core-rest-api/src/main/java/org/alfresco/core/handler/SitesApi.java){:target="_blank"}, 
auto wire it into the component as in the above class. Creating stuff in the repository usually mean making a HTTP POST 
in the background. In these cases there is always a body class that we can use to fill in POST data, such as `SiteBody` in 
this case. A successful API call will return a populated result object called `Site`. 

In a similar way we add the other three command beans in the same directory as follows, starting with the `CreateFolderCmd`:

```java
package org.alfresco.tutorial.restapi;

import org.alfresco.core.handler.NodesApi;
import org.alfresco.core.handler.SitesApi;
import org.alfresco.core.model.Node;
import org.alfresco.core.model.NodeBodyCreate;
import org.alfresco.core.model.SiteContainer;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.util.Objects;

@Component
public class CreateFolderCmd {
    static final Logger LOGGER = LoggerFactory.getLogger(CreateFolderCmd.class);

    @Autowired
    SitesApi sitesApi;

    @Autowired
    NodesApi nodesApi;

    public void execute(String siteId, String folderName) throws IOException {
        SiteContainer docLibContainer = Objects.requireNonNull(sitesApi.getSiteContainer(siteId,
                "documentLibrary", null).getBody()).getEntry();
        LOGGER.info("Creating folder in site DocumentLibrary folder Node ID: {}", docLibContainer.getId());

        Node folderNode = Objects.requireNonNull(nodesApi.createNode(docLibContainer.getId(),
                new NodeBodyCreate()
                        .nodeType("cm:folder")
                        .name(folderName),
                null, null, null, null, null).getBody()).getEntry();

        LOGGER.info("Created folder: {}", folderNode.toString());
    }
}
```

The [`NodesApi`](https://github.com/Alfresco/alfresco-java-sdk/blob/develop/alfresco-java-rest-api/alfresco-java-rest-api-lib/generated/alfresco-core-rest-api/src/main/java/org/alfresco/core/handler/NodesApi.java){:target="_blank"} 
is one of the main APIs that we will use a lot to manipulate folders and files. We use it here to create a folder node 
in the site's document library.

Next we create the `CreateFileCmd` as follows in the same directory:

```java
package org.alfresco.tutorial.restapi;

import org.alfresco.core.handler.NodesApi;
import org.alfresco.core.model.Node;
import org.alfresco.core.model.NodeBodyCreate;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.util.Objects;

@Component
public class CreateFileCmd {
    static final Logger LOGGER = LoggerFactory.getLogger(CreateFileCmd.class);

    @Autowired
    NodesApi nodesApi;

    public void execute(String parentFolderId, String fileName) throws IOException {
        // Get the parent folder where file should be stored
        Node parentFolderNode = Objects.requireNonNull(nodesApi.getNode(parentFolderId, null,  null,
                null).getBody()).getEntry();
        LOGGER.info("Got parent folder node: {}", parentFolderNode.toString());

        // Create the file node metadata
        Node fileNode = Objects.requireNonNull(nodesApi.createNode(parentFolderNode.getId(),
                new NodeBodyCreate().nodeType("cm:content").name(fileName),
                null, null, null, null, null).getBody()).getEntry();

        // Add the file node content
        Node updatedFileNode = Objects.requireNonNull(nodesApi.updateNodeContent(fileNode.getId(),
                "Some text for this file...".getBytes(), true, null, null,
                null, null).getBody()).getEntry();

        LOGGER.info("Created file with content: {}", updatedFileNode.toString());
    }
}
```

You might notice that it requires two calls to create a file with content. The ReST API does provide a way to do this 
with one call as can be seen [here]({% link content-services/7.2/develop/rest-api-guide/folders-files.md %}#uploadfile).
However, the generated Java wrapping classes does not yet provide functionality for this (it is scheduled to be supported in 
a future version of SDK 5).

Add also the final `SearchCmd` class as follows:

```java
package org.alfresco.tutorial.restapi;

import org.alfresco.search.handler.SearchApi;
import org.alfresco.search.model.RequestQuery;
import org.alfresco.search.model.ResultSetPaging;
import org.alfresco.search.model.SearchRequest;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;

import java.io.IOException;

@Component
public class SearchCmd {
    static final Logger LOGGER = LoggerFactory.getLogger(SearchCmd.class);

    @Autowired
    SearchApi searchApi;

    public void execute(String siteId, String term) throws IOException {
        ResponseEntity<ResultSetPaging> result = searchApi.search(new SearchRequest()
                .query(new RequestQuery()
                        .language(RequestQuery.LanguageEnum.AFTS)
                        .query("(SITE:\"" + siteId + "\" AND TEXT:\"" + term + "\" )")));

        LOGGER.info("Search result: {}", result.getBody().getList().getEntries());
    }
}
```

Now, stop and build it again:

```bash
$ ^C
...
$ mvn clean package -Dlicense.skip=true
...
``` 
Create an Alfresco Share site with id `test` as follows:

```bash
$ java -jar target/rest-api-0.0.1-SNAPSHOT.jar create-site test
...
2021-04-08 13:16:49.239  INFO 62074 --- [           main] o.a.tutorial.restapi.RestApiApplication  : args[0]: create-site
2021-04-08 13:16:49.241  INFO 62074 --- [           main] o.a.tutorial.restapi.RestApiApplication  : args[1]: test
2021-04-08 13:16:52.989  INFO 62074 --- [           main] o.a.tutorial.restapi.CreateSiteCmd       : Created site: class Site {
    id: test
    guid: 59dc57a1-ad07-4715-8844-005cc7fc59d7
    title: title-test
    description: description-test
    visibility: PUBLIC
    preset: site-dashboard
    role: SiteManager
}
``` 

Then create a folder called `folder1` in the site with id `test`:

```bash
$ java -jar target/rest-api-0.0.1-SNAPSHOT.jar create-folder test folder1
...
2021-04-08 13:19:23.264  INFO 62106 --- [           main] o.a.tutorial.restapi.RestApiApplication  : args[0]: create-folder
2021-04-08 13:19:23.266  INFO 62106 --- [           main] o.a.tutorial.restapi.RestApiApplication  : args[1]: test
2021-04-08 13:19:23.267  INFO 62106 --- [           main] o.a.tutorial.restapi.RestApiApplication  : args[2]: folder1
2021-04-08 13:19:23.560  INFO 62106 --- [           main] o.a.tutorial.restapi.CreateFolderCmd     : Creating folder in site DocumentLibrary folder Node ID: aa02f5eb-f45d-4ab4-bf21-9eeb8c243d51
2021-04-08 13:19:24.166  INFO 62106 --- [           main] o.a.tutorial.restapi.CreateFolderCmd     : Created folder: class Node {
    id: 3e16d079-2fdc-4d64-ad76-c65c233165f4
    name: folder1
    nodeType: cm:folder
    isFolder: true
    isFile: false
    isLocked: false
    modifiedAt: 2021-04-08T12:19:23.876Z
    modifiedByUser: class UserInfo {
        displayName: Administrator
        id: admin
    }
    createdAt: 2021-04-08T12:19:23.876Z
    createdByUser: class UserInfo {
        displayName: Administrator
        id: admin
    }
    parentId: aa02f5eb-f45d-4ab4-bf21-9eeb8c243d51
    isLink: null
    isFavorite: null
    content: null
    aspectNames: [cm:auditable]
    properties: null
    allowableOperations: null
    path: null
    permissions: null
    definition: null
}
``` 

Create a file called `somefile.txt` in the folder called `folder1` (3e16d079-2fdc-4d64-ad76-c65c233165f4):

```bash
$ java -jar target/rest-api-0.0.1-SNAPSHOT.jar create-file 3e16d079-2fdc-4d64-ad76-c65c233165f4 somefile.txt
...
2021-04-08 13:21:55.972  INFO 62152 --- [           main] o.a.tutorial.restapi.RestApiApplication  : args[0]: create-file
2021-04-08 13:21:55.973  INFO 62152 --- [           main] o.a.tutorial.restapi.RestApiApplication  : args[1]: 3e16d079-2fdc-4d64-ad76-c65c233165f4
2021-04-08 13:21:55.973  INFO 62152 --- [           main] o.a.tutorial.restapi.RestApiApplication  : args[2]: somefile.txt
2021-04-08 13:21:56.211  INFO 62152 --- [           main] o.a.tutorial.restapi.CreateFileCmd       : Got parent folder node: class Node {
    id: 3e16d079-2fdc-4d64-ad76-c65c233165f4
    name: folder1
    nodeType: cm:folder
    isFolder: true
    isFile: false
    isLocked: false
    modifiedAt: 2021-04-08T12:19:23.876Z
    modifiedByUser: class UserInfo {
        displayName: Administrator
        id: admin
    }
    createdAt: 2021-04-08T12:19:23.876Z
    createdByUser: class UserInfo {
        displayName: Administrator
        id: admin
    }
    parentId: aa02f5eb-f45d-4ab4-bf21-9eeb8c243d51
    isLink: null
    isFavorite: null
    content: null
    aspectNames: [cm:auditable]
    properties: null
    allowableOperations: null
    path: null
    permissions: null
    definition: null
}
2021-04-08 13:21:56.896  INFO 62152 --- [           main] o.a.tutorial.restapi.CreateFileCmd       : Created file with content: class Node {
    id: 1187b449-258e-4843-997f-991b7995b665
    name: somefile.txt
    nodeType: cm:content
    isFolder: false
    isFile: true
    isLocked: false
    modifiedAt: 2021-04-08T12:21:56.697Z
    modifiedByUser: class UserInfo {
        displayName: Administrator
        id: admin
    }
    createdAt: 2021-04-08T12:21:56.265Z
    createdByUser: class UserInfo {
        displayName: Administrator
        id: admin
    }
    parentId: 3e16d079-2fdc-4d64-ad76-c65c233165f4
    isLink: null
    isFavorite: null
    content: class ContentInfo {
        mimeType: text/plain
        mimeTypeName: Plain Text
        sizeInBytes: 26
        encoding: ISO-8859-1
    }
    aspectNames: [cm:versionable, cm:auditable]
    properties: {cm:versionLabel=1.0, cm:versionType=MAJOR}
    allowableOperations: null
    path: null
    permissions: null
    definition: null
}
``` 
Finally, search for content matching text `file` in site with id `test`:

```bash
$ java -jar target/rest-api-0.0.1-SNAPSHOT.jar search test file
...
2021-04-08 14:40:51.379  INFO 63261 --- [           main] o.a.tutorial.restapi.RestApiApplication  : args[0]: search
2021-04-08 14:40:51.381  INFO 63261 --- [           main] o.a.tutorial.restapi.RestApiApplication  : args[1]: test
2021-04-08 14:40:51.381  INFO 63261 --- [           main] o.a.tutorial.restapi.RestApiApplication  : args[2]: file
2021-04-08 14:40:52.493  INFO 63261 --- [           main] org.alfresco.tutorial.restapi.SearchCmd  : Search result: [class ResultSetRowEntry {
    entry: class ResultNode {
        id: 1187b449-258e-4843-997f-991b7995b665
        name: somefile.txt
        nodeType: cm:content
        isFolder: false
        isFile: true
        isLocked: false
        modifiedAt: 2021-04-08T12:21:59.077Z
        modifiedByUser: class UserInfo {
            displayName: Administrator
            id: admin
        }
        createdAt: 2021-04-08T12:21:56.265Z
        createdByUser: class UserInfo {
            displayName: Administrator
            id: admin
        }
        parentId: 3e16d079-2fdc-4d64-ad76-c65c233165f4
        isLink: null
        content: class ContentInfo {
            mimeType: text/plain
            mimeTypeName: Plain Text
            sizeInBytes: 26
            encoding: ISO-8859-1
            mimeTypeGroup: null
        }
        aspectNames: null
        properties: null
        allowableOperations: null
        path: null
        search: class SearchEntry {
            score: 1.0
            highlight: null
        }
        archivedByUser: null
        archivedAt: null
        versionLabel: null
        versionComment: null
    }
}]
```

This sample has shown us that it's is easy to interact with the Alfresco Repository from a Java client with the help 
of SDK 5 Java ReST API services.
 
For more information see the [ReST API Java wrapper extension point]({% link content-services/7.2/develop/oop-ext-points/rest-api-java-wrapper.md %}) 
documentation. 

## Creating an extension project for both event handling and Java ReST API {#eventandrestproject}
Make sure you have completed [prerequisites](#prereq) and then create a [starter project](#createstarterproj) with 
configuration properties set for both event handling and ReST API.

The `application.properties` file should look something like this:

```text
# Where is Alfresco Active MQ JMS Broker running?
spring.activemq.brokerUrl=tcp://localhost:61616
# This property is required if you want Spring Boot to auto-define the ActiveMQConnectionFactory,
# otherwise you can define that bean in Spring config
spring.jms.cache.enabled=false

# HTTP Basic Authentication that will be used by the API
content.service.security.basicAuth.username=admin
content.service.security.basicAuth.password=admin
# Location of the server and API endpoints
content.service.url=http://localhost:8080
content.service.path=/alfresco/api/-default-/public/alfresco/versions/1
search.service.path=/alfresco/api/-default-/public/search/versions/1
```

>**Note:** The configuration will look slightly different if you want to use the Spring Integration for event handling.

1. Add the following dependencies in the Maven project file (i.e. `pom.xml`):

    ```xml
    <dependencies>
        <!-- Alfresco Java SDK 5 Java Event Handler API Spring Boot Starter -->
        <dependency>
            <groupId>org.alfresco</groupId>
            <artifactId>alfresco-java-event-api-spring-boot-starter</artifactId>
            <version>5.1.0</version>
        </dependency>
        
        <!-- Alfresco Java SDK 5 Java ReST API wrapper Spring Boot Starter -->
        <dependency>
        <groupId>org.alfresco</groupId>
        <artifactId>alfresco-java-rest-api-spring-boot-starter</artifactId>
        <version>5.1.0</version>
        </dependency>
    </dependencies>
    ```

2. Remove the default Spring Boot starter dependency (i.e. `<artifactId>spring-boot-starter</artifactId>`).

3. Modify the contents of the Spring Boot application class (`org/alfresco/tutorial/sdk5demo/Sdk5DemoApplication.java`) by adding the following `com.fasterxml.jackson.databind.ObjectMapper`. This is required for deserializing dates:

    ```java
    package org.alfresco.tutorial.sdk5demo;

    import com.fasterxml.jackson.databind.ObjectMapper;
    import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
    import org.springframework.beans.factory.annotation.Autowired;
    import org.springframework.boot.SpringApplication;
    import org.springframework.boot.autoconfigure.SpringBootApplication;

    import javax.annotation.PostConstruct;
    
    @SpringBootApplication
    public class Sdk5DemoApplication {
    
        @Autowired
        private ObjectMapper objectMapper;
    
        @PostConstruct
        public void setUp() {
            objectMapper.registerModule(new JavaTimeModule());
        }
    
        public static void main(String[] args) {
            SpringApplication.run(Sdk5DemoApplication.class, args);
        }
    }
    ```

4. Test it:

    ```bash
    $ mvn spring-boot:run -Dlicense.skip=true
    ...
    2021-04-08 15:21:17.392  INFO 63958 --- [           main] o.a.t.sdk5demo.Sdk5DemoApplication       : Started Sdk5DemoApplication in 2.531 seconds (JVM running for 3.0)
    ```

We can now add event handling and ReST API code. Here is an example of an event handler that is triggered when a file 
is uploaded. It then calls back to the repository via the ReST API to get the file content:

```java
package org.alfresco.tutorial.sdk5demo;

import org.alfresco.core.handler.NodesApi;
import org.alfresco.event.sdk.handling.filter.*;
import org.alfresco.event.sdk.handling.handler.OnNodeCreatedEventHandler;
import org.alfresco.event.sdk.model.v1.model.DataAttributes;
import org.alfresco.event.sdk.model.v1.model.NodeResource;
import org.alfresco.event.sdk.model.v1.model.RepoEvent;
import org.alfresco.event.sdk.model.v1.model.Resource;
import org.apache.commons.io.IOUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.io.InputStream;
import java.nio.charset.StandardCharsets;

/**
 * Sample event handler to demonstrate reacting to a document/file being uploaded to the repository.
 * It then uses the Java ReST API to call back for the file content from the repository.
 */
@Component
public class ContentUploadedEventHandler implements OnNodeCreatedEventHandler {
    private static final Logger LOGGER = LoggerFactory.getLogger(ContentUploadedEventHandler.class);

    @Autowired
    NodesApi nodesApi;

    public void handleEvent(final RepoEvent<DataAttributes<Resource>> repoEvent) {
        NodeResource nodeResource = (NodeResource) repoEvent.getData().getResource();
        LOGGER.info("A file was uploaded to the repository: {}, {}, {}", nodeResource.getId(), nodeResource.getNodeType(),
                nodeResource.getName());
        try {
            InputStream fileInputStream = nodesApi.getNodeContent(
                    nodeResource.getId(), true, null, null)
                    .getBody()
                    .getInputStream();

            String result = IOUtils.toString(fileInputStream, StandardCharsets.UTF_8.toString());
            LOGGER.info("A file '{}' was uploaded with the following content: {}", nodeResource.getName(), result);

        } catch (Exception ex) {
            LOGGER.error("An error occurred trying to download the content of the file", ex);
        }
    }

    public EventFilter getEventFilter() {
        return IsFileFilter.get();
    }
}
```

Running this and uploading a text file to the Repository gives logging as follows:

```bash
$ mvn spring-boot:run -Dlicense.skip=true
...
2021-04-08 15:36:46.441  INFO 64121 --- [erContainer#0-1] o.a.t.s.ContentUploadedEventHandler      : A file was uploaded to the repository: 9e99d999-ef8f-4f6f-9582-ac5f52c2bf8d, cm:content, some.txt
2021-04-08 15:36:47.134  INFO 64121 --- [erContainer#0-1] o.a.t.s.ContentUploadedEventHandler      : A file 'some.txt' was uploaded with the following content: This is a file with some text
```

## Debugging an extension project {#debug-extension-project}
Debugging an extension project is most likely going to be something you will have to do to see what's going on. This is
easy with a Spring Boot App. Configure for example the Spring Boot Maven plugin as follows:

```xml
<build>
    <plugins>
        <plugin>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-maven-plugin</artifactId>
            <configuration>
                <jvmArguments>
                    -Xdebug -Xrunjdwp:transport=dt_socket,server=y,suspend=y,address=5005
                </jvmArguments>
            </configuration>
        </plugin>
    </plugins>
</build>
```

Then you can attach remotely and debug from, for example, IntelliJ IDEA:

![sdk5-proj-debug]({% link content-services/images/sdk5-proj-debug.png %})

You can also configure debug on the command line (no maven plugin config needed):

```bash
mvn spring-boot:run -Dspring-boot.run.jvmArguments="-Xdebug -Xrunjdwp:transport=dt_socket,server=y,suspend=y,address=5005" -Dlicense.skip=true
```

## Using the Event Gateway {#using-event-gateway}
Alfresco Java SDK 5.1 is compatible with [Alfresco Event Gateway]({% link content-services/7.2/develop/oop-ext-points/event-gateway.md %}).

Using the Alfresco Event Gateway REST API, extensions can manage the lifecycle of an event subscription. For example, 
an out-of-process extension may [create a subscription](#gateway-api-create-sub) 
to receive certain types of events in a specific topic of an ActiveMQ broker.

The ActiveMQ broker can be different from the one used by the Alfresco Repository and is configured in both the 
out-of-process extension and the Event Gateway.

To work with the Gateway ReST API Java Wrapper in your extension project, add this dependency to your project's POM:

```xml
<dependency>
    <groupId>org.alfresco</groupId>
    <artifactId>alfresco-event-gateway-api</artifactId>
    <version>5.1.0</version>
</dependency>
```

### Creating a subscription {#gateway-api-create-sub}
The following code shows an example of how to create a subscription with a filter that only accepts [events of type]({% link content-services/7.2/develop/oop-ext-points/events.md%}#acseventtypes)
`org.alfresco.event.node.Created` and `org.alfresco.event.node.Updated`:

```java
import java.util.Collections;
import java.util.HashMap;
import java.util.Map;

import org.alfresco.gateway.handler.SubscriptionsApi;
import org.alfresco.gateway.model.Filter;
import org.alfresco.gateway.model.Subscription;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class Sample {
  private static final Logger LOGGER = LoggerFactory.getLogger(Sample.class);
  
  public static void create(String[] args) {
    @Inject
    SubscriptionsApi subscriptionsApi;

    Map<String, String> config = new HashMap<>();
    config.put("broker-id", "my-broker"); // Id of the a broker in alfresco-event-gateway configuration
    config.put("destination", "topic:sample-topic"); // Name of the topic to which the gateway shall publish the events

    Filter filter = new Filter();
    filter.setType("event-type");
    // Comma-separated list of event types accepted by the filter
    filter.setConfig(Collections.singletonMap("event-types", "org.alfresco.event.node.Created,org.alfresco.event.node.Updated"));

    Subscription subscriptionRequest = new Subscription();
    subscriptionRequest.setType("jms-activemq");
    subscriptionRequest.setConfig(config);
    subscriptionRequest.setFilters(Collections.singletonList(filter));

    Subscription result = subscriptionsApi.createSubscription(subscriptionRequest);
    LOGGER.info("Created subscription with id: {}", result.getId());
  }
}
```

### Getting a subscription
The following code shows an example of how to get a subscription by its id:

```java
import java.util.HashMap;
import java.util.Map;

import org.alfresco.gateway.handler.SubscriptionsApi;
import org.alfresco.gateway.model.Subscription;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class Sample {
  private static final Logger LOGGER = LoggerFactory.getLogger(Sample.class);

  public static void main(String[] args) {
    @Inject
    SubscriptionsApi subscriptionsApi;

    Subscription result = subscriptionsApi.getSubscription("my-subscription-id");
    LOGGER.info("Retrieved subscription: {}", result);
  }
}
```

### Updating a subscription
The following code shows an example of how to partially update a subscription:

```java
import java.util.HashMap;
import java.util.Map;

import org.alfresco.gateway.handler.SubscriptionsApi;
import org.alfresco.gateway.model.Subscription;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class Sample {
  private static final Logger LOGGER = LoggerFactory.getLogger(Sample.class);

  public static void main(String[] args) {
    @Inject
    SubscriptionsApi subscriptionsApi;

    Subscription subscription = subscriptionsApi.getSubscription("my-subscription-id");
    subscription.setStatus(Subscription.StatusEnum.ACTIVE);
    Subscription result = subscriptionsApi.partiallyUpdateSubscription(subscription);

    LOGGER.info("Updated subscription: {}", result);
  }
}
```

### Configuring a specific ActiveMQ broker - Extension Project
This is done in the `src/main/resources/application.properties` configuration file:

```text
spring.activemq.brokerUrl=tcp://my-broker-host:61616
spring.activemq.username=test
spring.activemq.password=my-secret

# This property is required if you want Spring Boot to auto-define the ActiveMQConnectionFactory, 
# otherwise you can define that bean in Spring config
spring.jms.cache.enabled=false

alfresco.events.topicName=topic:sample-topic
```

### Configuring a specific ActiveMQ broker - Event Gateway
The following properties need to be configured in the Event Gateway:

```text
# This is a sample about how to configure a broker config with id "my-broker" (only broker-url is
# mandatory). You can add any number of different broker configurations

alfresco.event.gateway.publication.jms.broker.my-broker.broker-url=tcp://my-broker-host:61616
alfresco.event.gateway.publication.jms.broker.my-broker.username=admin
alfresco.event.gateway.publication.jms.broker.my-broker.password=my-secret
```

In a Docker Compose configuration this is done as follows:

```text
...
services:
  alfresco-event-gateway:
    image: alfresco/alfresco-event-gateway-app:development
    environment:
      JAVA_TOOL_OPTIONS: "
                        -agentlib:jdwp=transport=dt_socket,address=*:8888,server=y,suspend=n
                         "
      JAVA_OPTS: "
                -Dspring.activemq.brokerUrl=tcp://activemq:61616
                -Dspring.datasource.url=jdbc:postgresql://postgres-event-gateway:5432/alfresco-event-gateway
                -Dspring.datasource.driverClassName=org.postgresql.Driver
                -Dspring.datasource.username=alfresco-event-gateway
                -Dspring.datasource.password=alfresco-event-gateway
                -Dspring.jpa.database-platform=org.hibernate.dialect.PostgreSQLDialect
                -Dspring.jpa.hibernate.ddl-auto=update
                -Dalfresco.event.gateway.publication.jms.broker.my-broker.broker-url=tcp://my-broker-host:61616
                -Dalfresco.event.gateway.publication.jms.broker.my-broker.username=admin
                -Dalfresco.event.gateway.publication.jms.broker.my-broker.password=my-secret
                -Dkeycloak.auth-server-url=http://${HOST_IP}:8999/auth
                -Dcontent.service.url=http://alfresco:8080
                -Dmanagement.metrics.export.simple.enabled=true
                -Dmanagement.endpoint.metrics.enabled=true
                  "
...
```