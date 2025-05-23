---
title: Events Extension Point
---

When implementing business logic an out-of-process model should be used. For example, if some processing should be done
every time a PDF is uploaded to a specific folder, then there is an event that can be subscribed to and the business logic 
can be implemented in an external process separate from the Content Services server process.

The following diagram gives an overview of the Event System and the event types:

![acs_70_event_system_overview]({% link content-services/images/acs_70_event_system_overview.png %})

Architecture Information: [Platform Architecture]({% link content-services/7.4/develop/software-architecture.md %}#platformarch)

## Event Model {#eventmodel}
The event model in Content Services is a library packaged as a JAR file, which is part of the repository (i.e. `alfresco.war`). 
The library contains the event model and the databind helpers used to help the clients to marshall and unmarshall the events.

The event model is based on the [CloudEvents specification](https://github.com/cloudevents/spec/blob/v1.0/spec.md){:target="_blank"}.
CloudEvents is a specification for describing event data in common formats to provide interoperability across services, 
platforms and systems. For more information see [CloudEvents Primer](https://github.com/cloudevents/spec/blob/v1.0/primer.md){:target="_blank"}.

The Content Services event payload (i.e. the part of transmitted data that is the actual intended message) consist
of two parts. The CloudEvent attributes and the Content Services event attributes.

```json
{
  CloudEvent standard attributes...
  "data": {
    Content Services custom event attributes... 
  }

}
```

Basic configuration of the event system is in the [repository.properties](https://github.com/Alfresco/alfresco-community-repo/blob/master/repository/src/main/resources/alfresco/repository.properties){:target="_blank"}
file:

```text
### Repository events2
#
# Type and aspect filters which should be excluded.
# Note: System folder node types are added by default.
repo.event2.filter.nodeTypes=sys:*, fm:*, cm:thumbnail, cm:failedThumbnail, cm:rating, rma:rmsite include_subtypes
repo.event2.filter.nodeAspects=sys:*
repo.event2.filter.childAssocTypes=rn:rendition
#
# Comma separated list of users which should be excluded
# Note: username's case-sensitivity depends on the {user.name.caseSensitive} setting
repo.event2.filter.users=System, null
#
# Topic name
repo.event2.topic.endpoint=amqp:topic:alfresco.repo.event2
```       
The following table describes the configuration properties for protecting users' sensitive data:

>**Note**: The following properties for protecting users' sensitive data have been introduced in Content Services 7.4.2.5. Upgrade Content Services to version 7.4.2.5, to take advantage of these properties and for a more secure and reliable environment.

| Property | Description |
|----------|-------------|
| `repo.event2.filter.nodeProperties` | Allows to specify properties that should be filtered out. Filtering always happens before mapping.<br><br>Default value: `` |
| `repo.event2.mapper.enabled` | Allows to disable property mapping entirely.<br><br>Default value: `true` |
| `repo.event2.mapper.overrideReplacementText` | Allows to change the text displayed in events instead of default: `SENSITIVE_DATA_REMOVED`.<br><br>**Note**: By default, the values of properties `usr:salt`, `usr:passwordHash`, `usr:password`, and `trx:password` are replaced with the `SENSITIVE_DATA_REMOVED` text.<br><br>Default value: ``
| `repo.event2.mapper.overrideDefaultProperties` | Allows to override the default list of properties whose values are replaced, instead of using the default: `usr:salt`, `usr:passwordHash`, `usr:password`, and `trx:password`.<br><br>Default value: `` |

The following table lists example configurations of these properties and their corresponding results:

| Example Configuration | Result |
|-----------------------|--------|
| `-Drepo.event2.mapper.enabled=false` | No property mapping is performed. |
| `-Drepo.event2.mapper.overrideDefaultProperties=usr:* -Drepo.event2.mapper.overrideReplacementText=HIDDEN_BY_SECURITY_MEASURES` | All the values of properties from user model are replaced with the `HIDDEN_BY_SECURITY_MEASURES` text.<br><br>The value of property `trx:password` is not replaced as the default configuration has been overriden to only map `usr:*`. |
| `-Drepo.event2.filter.nodeProperties=usr:salt,usr:passwordHash,usr:password,trx:password` | The properties `usr:salt`, `usr:passwordHash`, `usr:password`, and `trx:password` are filtered out completely before any mapping occurs and are not present in ActiveMQ. |
| `-Drepo.event2.filter.nodeProperties=trx:*` | The properties `trx:*` are filtered out.<br><br>The properties `usr:salt`, `usr:passwordHash`, and `usr:password` are mapped due to default configuration. |

Any custom configuration, to for example the default event filtering, can be done in `alfresco-global.properties`.

It is possible to disable the events from being triggered and sent to ActiveMQ by setting `repo.event2.enabled=false`. This setting prevents any behaviors from being bound to the node creation/update/delete and permission changes.

### CloudEvent attributes
Standard CloudEvent attributes in the context of Content Services events:

| Property             | Type          | Description                                                      |
|----------------------|---------------|------------------------------------------------------------------|
|`type`                |String         |The [Alfresco event type](#acseventtypes). ([1.0 spec#type](https://github.com/cloudevents/spec/blob/v1.0/spec.md#type){:target="_blank"})|
|`specversion`         |String         |The CloudEvents specification version. Value should be `1.0`. ([1.0 spec#specversion](https://github.com/cloudevents/spec/blob/v1.0/spec.md#specversion){:target="_blank"})|
|`id`                  |String         |Event ID, a UUID generated by the producer ([1.0 spec#id](https://github.com/cloudevents/spec/blob/v1.0/spec.md#id){:target="_blank"})|
|`source`              |URI-reference  |The instance of a repository that produced the event, .i.e. repository cluster node identifier ([1.0 spec#source](https://github.com/cloudevents/spec/blob/v1.0/spec.md#source){:target="_blank"})|
|`time`                |Timestamp      |The producer's timestamp of when the event occurred. ([1.0 spec#time](https://github.com/cloudevents/spec/blob/v1.0/spec.md#time){:target="_blank"})|
|`dataschema`          |URI-reference  |Identifies the schema that data adheres to.|
|`datacontenttype`     |String         |The content type of the data attribute. Value should be `application/json`. ([1.0 spec#datacontenttype](https://github.com/cloudevents/spec/blob/v1.0/spec.md#datacontenttype){:target="_blank"})|
|`data`                |JSON           |The domain-specific [data](#acsdata) of the event. ([1.0 spec#data](https://github.com/cloudevents/spec/blob/v1.0/spec.md#data-attribute){:target="_blank"})|

### Content Services event data attributes {#acsdata}
Content Services event data payload/attributes:

| Property             | Type          | Description                                                      |
|----------------------|---------------|------------------------------------------------------------------|
|`data.eventGroupId`   |String         |Optional unique identifier for events group, i.e. a transaction ID. Multiple nodes can be created in the same transaction.|
|`data.resource`       |Object (varies)|The object representing the resource affected. Here the resource represents a node in the Alfresco Repository.|
|`data.resource.@type` |String|The type of resource object (`NodeResource`, `ChildAssociationResource`).|
|`data.resource.id`    |String|The Alfresco Repository Node Id for the resource (e.g. node such as folder or file) that the data represent.|
|`data.resource.primaryHierarchy` |Array|Optional primary hierarchy of ancestors of the resource affected, i.e. folder path for the node. Note that the first element is the immediate parent.|
|`data.resource.name`             |String|The name of the resource. This is the name of the node, e.g. the name of a folder or a file.|
|`data.resource.nodeType`         |String|A content model type, such as `cm:content` for a file or `cm:folder` for a folder. See [content modelling]({% link content-services/7.4/develop/repo-ext-points/content-model.md %})|
|`data.resource.createdByUser`    |Object|The id (String) and display name (String) of the user that created the node.|
|`data.resource.createdAt`        |String|The time a node was created.|
|`data.resource.modifiedByUser`   |Object|The id (String) and display name (String) of the user that modified/updated the node.|
|`data.resource.modifiedAt`       |String|The time a node was modified/updated.|
|`data.resource.content`          |Object|If the node is of content type `cm:content` (i.e. a file), then this object contains information about the file, such as MIME-type and size.|
|`data.resource.properties`       |Object|[Content model]({% link content-services/7.4/develop/repo-ext-points/content-model.md %}) properties corresponding to the `data.resource.nodeType`.|
|`data.resource.aspectNames`      |Array|[Content model]({% link content-services/7.4/develop/repo-ext-points/content-model.md %}) aspects that have been applied to the node.|
|`data.resource.isFolder`         |Boolean|`true` if this node is of type `cm:folder`.|
|`data.resource.isFile`           |Boolean|`true` if this node is of type `cm:content`.|
|`data.resource.resourceReaderAuthorities`|Array|(*Enterprise Only*) The authority IDs, such as `GROUP_EVERYONE`, that have READ access to the resource affected by the event. **Note**: this property will not be present in the event when `authorities generation` is disabled.|
|`data.resource.resourceDeniedAuthorities`|Array|(*Enterprise Only*) The authority IDs, such as `GROUP_EVERYONE`, that are denied READ access to the resource affected by the event. **Note**: this property will not be present in the event when `authorities generation` is disabled.|
|`data.resource.resourceReaderSecurityControls`|Array|(*Enterprise Only*) The Governance security controls that have been placed on the resource affected by the event. **Note**: this property is only available for AGS. Also, it will not be present in the event response when `authorities generation` is disabled or when the AGS module is not installed.|
|`data.resourceBefore` |Object (varies)|The object representing the old values of the changed resource's attributes. Note, this object is only available on the `org.alfresco.event.node.Updated` event type.|

For a detailed view of the event data refer to [Repo Event JSON schema](https://github.com/Alfresco/acs-event-model/tree/master/src/main/resources/json-schema){:target="_blank"}.

### Content Services event types {#acseventtypes}
The following are the different types of events that can be subscribed to:

|Name                              |Description                                                      |
|----------------------------------|-----------------------------------------------------------------|
|`org.alfresco.event.node.Created`|Occurs when a node is created.|
|`org.alfresco.event.node.Updated`|Occurs when a node is updated or moved. Currently only node's name, type, properties, aspects, and content are supported.|
|`org.alfresco.event.node.Deleted`|Occurs when a node is deleted.|
|`org.alfresco.event.assoc.child.Created`|Occurs when a secondary child association is created.<br><br>**Note.** This event is not triggered for `cm:contains` primary parent-child associations. I.e. when a file or folder is created.|
|`org.alfresco.event.assoc.child.Deleted`|Occurs when a secondary child association is deleted.<br><br>**Note.** This event is not triggered for `cm:contains` primary parent-child associations. I.e. when a file or folder is deleted.|
|`org.alfresco.event.assoc.peer.Created`|Occurs when a peer association is created.|
|`org.alfresco.event.assoc.peer.Deleted`|Occurs when a peer association is deleted.|
|`org.alfresco.event.permission.Updated`|Occurs when permissions for a node is updated|

## === Event descriptions ===
Let's have a look at each event and see what we can use it for when implementing business logic for a 
particular content domain.

Content Services events are published on the [JMS Topic](http://activemq.apache.org/how-does-a-queue-compare-to-a-topic.html){:target="_blank"} 
called `alfresco.repo.event2`. See (search) default configuration in the [repository.properties](https://github.com/Alfresco/alfresco-community-repo/blob/master/repository/src/main/resources/alfresco/repository.properties){:target="_blank"} file.
So a Camel Route could for example be configured to pick up events from `amqpConnection:topic:alfresco.repo.event2`. The `amqpConnection` to the 
[Active MQ](http://activemq.apache.org) endpoint in the Content Services server would then be configured to connect to `amqp://localhost:5672`.

## Node created event
This event is fired whenever a node, such as a folder or file, is created in the repository. The full name of this 
event is `org.alfresco.event.node.Created`. 

Here is an example payload for this event type:

```json
{
  "specversion": "1.0",
  "type": "org.alfresco.event.node.Created",
  "id": "368818d9-dddd-4b8b-8eab-e050253d7f61",
  "source": "/08d9b620-48de-4247-8f33-360988d3b19b",
  "time": "2021-01-21T11:14:16.42372Z",
  "dataschema": "https://api.alfresco.com/schema/event/repo/v1/nodeCreated",
  "datacontenttype": "application/json",
  "data": {
    "eventGroupId": "4004ca99-9d2a-400d-9d80-8f840e223581",
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
      "modifiedAt": "2021-01-21T11:14:15.695Z",
      "content": {
        "mimeType": "application/pdf",
        "sizeInBytes": 531152,
        "encoding": "UTF-8"
      },
      "properties": {
        "cm:autoVersion": true,
        "cm:versionType": "MAJOR",
        "cm:autoVersionOnUpdateProps": false,
        "cm:versionLabel": "1.0",
        "cm:initialVersion": true
      },
      "aspectNames": [
        "cm:versionable",
        "cm:auditable"
      ],
      "isFolder": false,
      "isFile": true
    },
    "resourceReaderAuthorities": [
      "GROUP_EVERYONE"
    ],
    "resourceDeniedAuthorities": []
  }
}
```

Using the [Node Browser]({% link content-services/7.4/admin/troubleshoot.md %}#usingnodebrowser) the following 
`NodeRefs` were resolved as follows:

```json
  "id": "d71dd823-82c7-477c-8490-04cb0e826e65",   /app:company_home/cm:Testing/cm:Inbound/cm:purchase-order-scan.pdf (cm:content)
  "primaryHierarchy": [
    "5f355d16-f824-4173-bf4b-b1ec37ef5549",       /app:company_home/cm:Testing/cm:Inbound  (cm:folder)
    "93f7edf5-e4d8-4749-9b4c-e45097e2e19d",       /app:company_home/cm:Testing             (cm:folder)
    "c388532e-8da6-4d50-a6d2-4f3f3ac36ff7",       /app:company_home                        (cm:folder)
    "2fa2cde5-9d83-4460-a38c-cfe4ec9cca08"        Store root                               (sys:store_root)
```

The event payload is telling us that a file called `purchase-order-scan.pdf` (i.e. `data.resource.name`) of type `cm:content` 
(i.e. `data.resource.nodeType`) was created by the user `admin` (i.e. `data.resource.createdByUser.id`) in the 
**/Company Home/Testing/Inbound** folder (i.e. `data.resource.primaryHierarchy[0]`). The new node has a Node ID 
`d71dd823-82c7-477c-8490-04cb0e826e65` (i.e. `data.resource.id`).

To find out the display name for a folder or file via its Node ID use the ReST API to 
[get metadata]({% link content-services/7.4/develop/rest-api-guide/folders-files.md %}#getnodemetadata). This 
call can also be used to get other properties for the created node as not all are returned in the event data 
(i.e. `data.resource.properties`).

When subscribing to the `org.alfresco.event.node.Created` event it's possible to filter out anything that is
of no interest. So for example, if you are interested in files with content type `cm:content` uploaded to a folder 
called **/Company Home/Testing/Inbound** (e.g. Node ID `5f355d16-f824-4173-bf4b-b1ec37ef5549`) it would be easy to 
configure this. 

{% capture sdk5-plain-java-nodecreated %}
The following code shows how this can be done with SDK 5 and plain Java event handlers:

```java
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
        return IsFileFilter.get() // Make sure it's a file
                .and(ParentFolderFilter.of("5f355d16-f824-4173-bf4b-b1ec37ef5549")); // Located in the /Company Home/Testing/Inbound folder
    }
}
```

This code uses a custom [`ParentFolderFilter`]({% link content-services/7.4/develop/oop-sdk.md %}#parentfoldercustomfilter). 

For more information about how to extract all the properties from the message payload see [`NodeResource` info]({% link content-services/7.4/develop/oop-sdk.md %}#noderesourceobj).

To create an SDK event handler project that uses plain Java event handlers follow [these instructions]({% link content-services/7.4/develop/oop-sdk.md %}#purejavaeventhandlers).

{% endcapture %}

{% capture sdk5-spring-integration-nodecreated %}
The following code shows how this can be done with SDK 5 and Spring Integration event handlers:

```java
package org.alfresco.tutorial.events;

import org.alfresco.event.sdk.handling.filter.EventTypeFilter;
import org.alfresco.event.sdk.handling.filter.IsFileFilter;
import org.alfresco.event.sdk.integration.EventChannels;
import org.alfresco.event.sdk.integration.filter.IntegrationEventFilter;
import org.alfresco.event.sdk.model.v1.model.DataAttributes;
import org.alfresco.event.sdk.model.v1.model.NodeResource;
import org.alfresco.event.sdk.model.v1.model.RepoEvent;
import org.alfresco.event.sdk.model.v1.model.Resource;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.integration.dsl.IntegrationFlowAdapter;
import org.springframework.integration.dsl.IntegrationFlowDefinition;
import org.springframework.messaging.Message;
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
                .filter(IntegrationEventFilter.of(ParentFolderFilter.of("5f355d16-f824-4173-bf4b-b1ec37ef5549"))) // Filter node and make sure we got correct parent folder ID
                .handle(t -> handleEvent(t)); // Handle event with a bit of logging
    }

    private void handleEvent(Message message) {
        RepoEvent<DataAttributes<Resource>> repoEvent = (RepoEvent<DataAttributes<Resource>>)message.getPayload();
        NodeResource resource = (NodeResource) repoEvent.getData().getResource();

        LOGGER.info("File uploaded: {}", resource);
    }
}
```

This code uses a custom [`ParentFolderFilter`]({% link content-services/7.4/develop/oop-sdk.md %}#parentfoldercustomfilter). 

For more information about how to extract all the properties from the message payload see [`NodeResource` info]({% link content-services/7.4/develop/oop-sdk.md %}#noderesourceobj).

To create an SDK event handler project that uses Spring Integration follow [these instructions]({% link content-services/7.4/develop/oop-sdk.md %}#springintegrationhandlers).

{% endcapture %}

{% capture apache-camel-nodecreated %}
The following code snippet shows how this could be done with an 
[Apache Camel route](https://camel.apache.org/manual/latest/routes.html){:target="_blank"} configuration:

```java
public class SimpleRoute extends RouteBuilder {

    @Override
    public void configure() {

        from("amqpConnection:topic:alfresco.repo.event2")
            .id("CreatedFileRoute")
            .log("${body}") 
            .choice() 
            .when() // When the following is true:
                // The event type is node created
                .jsonpath("$[?(@.type=='org.alfresco.event.node.Created' && " +   
                // The node that was created is a file
                "@.data.resource.nodeType=='cm:content' && " +            
                // The file is located in the /Company Home/Testing/Inbound folder
                "'5f355d16-f824-4173-bf4b-b1ec37ef5549' in @.data.resource.primaryHierarchy[:1])]")
            // Unpack the data into JSON format  
            .unmarshal("publicDataFormat")
            // Call a Spring Bean with the event data 
            .bean("eventHandlerImpl", "onReceive(*, COPY)") 
            .end();
    }
}
```

The `jsonpath` expression uses several of the event data properties to filter out exactly the events we are interested in.

In this case a Spring Bean with ID `eventHandlerImpl` is called at the end of the route from where you could make the 
necessary ReST API calls.
{% endcapture %}

{% include tabs.html tableid="event-code-nodecreated" opt1="SDK5 - Plain Java" content1=sdk5-plain-java-nodecreated opt2="SDK5 - Spring Integration" content2=sdk5-spring-integration-nodecreated opt3="Apache Camel" content3=apache-camel-nodecreated %}

## Node updated event {#nodeupdatedevent}
This event is fired whenever a node, such as a folder or file, is updated or moved in the repository. The full name of this 
event is `org.alfresco.event.node.Updated`. The event is fired when the node's name, type, properties, aspects, or content 
is updated.

Here is an example payload for this event type:

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

The event data payload looks very similar to the data for a created node. There is just one extra object called
`resourceBefore` that contains the property values before the update. In this case we can see that the `cm:title` property
of the `cm:titled` aspect has been filled in (i.e. `data.resource.properties.cm:title: "Purchase Order"`).

Using the [Node Browser]({% link content-services/7.4/admin/troubleshoot.md %}#usingnodebrowser) the following 
`NodeRefs` were resolved as follows:

```json
  "id": "d71dd823-82c7-477c-8490-04cb0e826e65",   /app:company_home/cm:Testing/cm:Inbound/cm:purchase-order-scan.pdf (cm:content)
  "primaryHierarchy": [
    "5f355d16-f824-4173-bf4b-b1ec37ef5549",       /app:company_home/cm:Testing/cm:Inbound  (cm:folder)
    "93f7edf5-e4d8-4749-9b4c-e45097e2e19d",       /app:company_home/cm:Testing             (cm:folder)
    "c388532e-8da6-4d50-a6d2-4f3f3ac36ff7",       /app:company_home                        (cm:folder)
    "2fa2cde5-9d83-4460-a38c-cfe4ec9cca08"        Store root                               (sys:store_root)
```

The event payload is telling us that a file called `purchase-order-scan.pdf` (i.e. `data.resource.name`) of type `cm:content` 
(i.e. `data.resource.nodeType`) was updated by the user `admin` (i.e. `data.resource.createdByUser.id`) in the 
**/Company Home/Testing/Inbound** folder (i.e. `data.resource.primaryHierarchy[0]`). The updated node has a Node ID 
`d71dd823-82c7-477c-8490-04cb0e826e65` (i.e. `data.resource.id`).

To find out the display name for a folder or file via its Node ID use the ReST API to 
[get metadata]({% link content-services/7.4/develop/rest-api-guide/folders-files.md %}#getnodemetadata). This 
call can also be used to get other properties for the created node as not all are returned in the event data 
(i.e. `data.resource.properties`).

When subscribing to the `org.alfresco.event.node.Updated` event it's possible to filter out anything that is
of no interest. So for example, if you are interested in files with content type `cm:content` updated in the folder 
called **/Company Home/Testing/Inbound** (e.g. Node ID `5f355d16-f824-4173-bf4b-b1ec37ef5549`) it would be easy to 
configure this. 

{% capture sdk5-plain-java-nodeupdated %}
The following code shows how this can be done with SDK 5 and plain Java event handlers:

```java
package org.alfresco.tutorial.events;

import org.alfresco.event.sdk.handling.filter.EventFilter;
import org.alfresco.event.sdk.handling.filter.IsFileFilter;
import org.alfresco.event.sdk.handling.handler.OnNodeUpdatedEventHandler;
import org.alfresco.event.sdk.model.v1.model.DataAttributes;
import org.alfresco.event.sdk.model.v1.model.NodeResource;
import org.alfresco.event.sdk.model.v1.model.RepoEvent;
import org.alfresco.event.sdk.model.v1.model.Resource;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;


/**
 * Sample event handler to demonstrate reacting to a document/file being updated.
 */
@Component
public class ContentUpdatedEventHandler implements OnNodeUpdatedEventHandler {
    private static final Logger LOGGER = LoggerFactory.getLogger(ContentUploadedEventHandler.class);

    public void handleEvent(final RepoEvent<DataAttributes<Resource>> repoEvent) {
        NodeResource beforeUpdateResource = (NodeResource) repoEvent.getData().getResourceBefore();
        NodeResource afterUpdateResource = (NodeResource) repoEvent.getData().getResource();
        LOGGER.info("A file was updated in the repository: {}, {}, {}", afterUpdateResource.getId(), 
                afterUpdateResource.getNodeType(), afterUpdateResource.getName());
    }

    public EventFilter getEventFilter() {
        return IsFileFilter.get() // Make sure it's a file
                .and(ParentFolderFilter.of("5f355d16-f824-4173-bf4b-b1ec37ef5549")); // Located in the /Company Home/Testing/Inbound folder
    }
}
```

Note that you can get to the property values before the update via the `repoEvent.getData().getResourceBefore()` call.
You can compare those to the values retreived via `repoEvent.getData().getResource()` and see what's changed.

This code uses a custom [`ParentFolderFilter`]({% link content-services/7.4/develop/oop-sdk.md %}#parentfoldercustomfilter). 

For more information about how to extract all the properties from the message payload see [`NodeResource` info]({% link content-services/7.4/develop/oop-sdk.md %}#noderesourceobj).

To create an SDK event handler project that uses plain Java event handlers follow [these instructions]({% link content-services/7.4/develop/oop-sdk.md %}#purejavaeventhandlers).

{% endcapture %}

{% capture sdk5-spring-integration-nodeupdated %}
The following code shows how this can be done with SDK 5 and Spring Integration event handlers:

```java
package org.alfresco.tutorial.events;

import org.alfresco.event.sdk.handling.filter.EventTypeFilter;
import org.alfresco.event.sdk.handling.filter.IsFileFilter;
import org.alfresco.event.sdk.integration.EventChannels;
import org.alfresco.event.sdk.integration.filter.IntegrationEventFilter;
import org.alfresco.event.sdk.model.v1.model.DataAttributes;
import org.alfresco.event.sdk.model.v1.model.NodeResource;
import org.alfresco.event.sdk.model.v1.model.RepoEvent;
import org.alfresco.event.sdk.model.v1.model.Resource;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.integration.dsl.IntegrationFlowAdapter;
import org.springframework.integration.dsl.IntegrationFlowDefinition;
import org.springframework.messaging.Message;
import org.springframework.stereotype.Component;

/**
 * Spring Integration based event handler that will execute code when a file is updated
 */
@Component
public class UpdatedContentFlow extends IntegrationFlowAdapter {
    private static final Logger LOGGER = LoggerFactory.getLogger(UpdatedContentFlow.class);

    // Use builder to create an integration flow based on alfresco.events.main.channel event channel
    @Override
    protected IntegrationFlowDefinition<?> buildFlow() {
        return from(EventChannels.MAIN) // Listen to events coming from the Alfresco events channel
                .filter(IntegrationEventFilter.of(EventTypeFilter.NODE_UPDATED)) // Filter events and select only node updated events
                .filter(IntegrationEventFilter.of(IsFileFilter.get())) // Filter node and make sure it is a file node
                .filter(IntegrationEventFilter.of(ParentFolderFilter.of("5f355d16-f824-4173-bf4b-b1ec37ef5549"))) // Filter node and make sure we got correct parent folder ID (/Company Home/Testing/Inbound)
                .handle(t -> handleEvent(t)); // Handle event with a bit of logging
    }

    private void handleEvent(Message message) {
        RepoEvent<DataAttributes<Resource>> repoEvent = (RepoEvent<DataAttributes<Resource>>)message.getPayload();
        NodeResource beforeUpdateResource = (NodeResource) repoEvent.getData().getResourceBefore();
        NodeResource afterUpdateResource = (NodeResource) repoEvent.getData().getResource();

        LOGGER.info("File updated: Before update {}, after update {}", beforeUpdateResource.toString(),
                afterUpdateResource.toString());
    }
}
```

Note that you can get to the property values before the update via the `repoEvent.getData().getResourceBefore()` call.
You can compare those to the values retreived via `repoEvent.getData().getResource()` and see what's changed.

This code uses a custom [`ParentFolderFilter`]({% link content-services/7.4/develop/oop-sdk.md %}#parentfoldercustomfilter).

For more information about how to extract all the properties from the message payload see [`NodeResource` info]({% link content-services/7.4/develop/oop-sdk.md %}#noderesourceobj). 

To create an SDK event handler project that uses Spring Integration follow [these instructions]({% link content-services/7.4/develop/oop-sdk.md %}#springintegrationhandlers).

{% endcapture %}

{% capture apache-camel-nodeupdated %}
The following code snippet shows how this could be done with an 
[Apache Camel route](https://camel.apache.org/manual/latest/routes.html){:target="_blank"} configuration:

```java
public class SimpleRoute extends RouteBuilder {

    @Override
    public void configure() {
        from("amqpConnection:topic:alfresco.repo.event2")
            .id("UpdatedFileRoute")
            .log("${body}") // Log all incoming events on this topic, even those that we are not interested in
            .choice()
            .when() // When the following is true:
                // The event type is node updated
                .jsonpath("$[?(@.type=='org.alfresco.event.node.Updated' && " +
                // and the node that was updated is a file
                "@.data.resource.nodeType=='cm:content' && " +
                // and the file is located in the /Company Home/Testing/Inbound folder
                "'5f355d16-f824-4173-bf4b-b1ec37ef5549' in @.data.resource.primaryHierarchy[:1])]")
            // Unpack the data into JSON format
            .unmarshal("publicDataFormat")
            // Call a Spring Bean with the event data
            .bean("updatedEventHandlerImpl", "onReceive(*, COPY)")
            .end();
    }
}
```

The `jsonpath` expression uses several of the event data properties to filter out exactly the events we are interested in.

In this case a Spring Bean with ID `updatedEventHandlerImpl` is called at the end of the route from where you could make the 
necessary ReST API calls.
{% endcapture %}

{% include tabs.html tableid="event-code-nodeupdated" opt1="SDK5 - Plain Java" content1=sdk5-plain-java-nodeupdated opt2="SDK5 - Spring Integration" content2=sdk5-spring-integration-nodeupdated opt3="Apache Camel" content3=apache-camel-nodeupdated %}

## Node deleted event
This event is fired whenever a node, such as a folder or file, is deleted in the repository. The full name of this 
event is `org.alfresco.event.node.Deleted`. 

Here is an example payload for this event type:

```json
{
  "specversion": "1.0",
  "type": "org.alfresco.event.node.Deleted",
  "id": "df329995-d744-427c-bafb-4a31ba7d50e3",
  "source": "/08d9b620-48de-4247-8f33-360988d3b19b",
  "time": "2021-01-27T10:57:02.586606Z",
  "dataschema": "https://api.alfresco.com/schema/event/repo/v1/nodeDeleted",
  "datacontenttype": "application/json",
  "data": {
    "eventGroupId": "acb8e25f-a340-48b5-8de8-249ae5bac670",
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
    "resourceReaderAuthorities": [],
    "resourceDeniedAuthorities": []
  }
}
```

The event data payload looks very similar to the data for a created node. Using the 
[Node Browser]({% link content-services/7.4/admin/troubleshoot.md %}#usingnodebrowser) the following 
`NodeRefs` were resolved as follows:

```json
  "id": "d71dd823-82c7-477c-8490-04cb0e826e65",   /app:company_home/cm:Testing/cm:Inbound/cm:purchase-order-scan.pdf (cm:content)
  "primaryHierarchy": [
    "5f355d16-f824-4173-bf4b-b1ec37ef5549",       /app:company_home/cm:Testing/cm:Inbound  (cm:folder)
    "93f7edf5-e4d8-4749-9b4c-e45097e2e19d",       /app:company_home/cm:Testing             (cm:folder)
    "c388532e-8da6-4d50-a6d2-4f3f3ac36ff7",       /app:company_home                        (cm:folder)
    "2fa2cde5-9d83-4460-a38c-cfe4ec9cca08"        Store root                               (sys:store_root)
```

The event payload is telling us that a file called `purchase-order-scan.pdf` (i.e. `data.resource.name`) of type `cm:content` 
(i.e. `data.resource.nodeType`) was deleted by the user `admin` (i.e. `data.resource.createdByUser.id`) in the 
**/Company Home/Testing/Inbound** folder (i.e. `data.resource.primaryHierarchy[0]`). The deleted node had a Node ID 
`d71dd823-82c7-477c-8490-04cb0e826e65` (i.e. `data.resource.id`). Note that the deleted node is soft deleted and is now
available in the trash can.

When subscribing to the `org.alfresco.event.node.Deleted` event it's possible to filter out anything that is
of no interest. So for example, if you are interested in files with content type `cm:content` deleted in the folder 
called **/Company Home/Testing/Inbound** (e.g. Node ID `5f355d16-f824-4173-bf4b-b1ec37ef5549`) it would be easy to 
configure this. 

{% capture sdk5-plain-java-nodedeleted %}
The following code shows how this can be done with SDK 5 and plain Java event handlers:

```java
package org.alfresco.tutorial.events;

import org.alfresco.event.sdk.handling.filter.EventFilter;
import org.alfresco.event.sdk.handling.filter.IsFileFilter;
import org.alfresco.event.sdk.handling.handler.OnNodeDeletedEventHandler;
import org.alfresco.event.sdk.model.v1.model.DataAttributes;
import org.alfresco.event.sdk.model.v1.model.NodeResource;
import org.alfresco.event.sdk.model.v1.model.RepoEvent;
import org.alfresco.event.sdk.model.v1.model.Resource;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;


/**
 * Sample event handler to demonstrate reacting to a document/file being deleted.
 */
@Component
public class ContentDeletedEventHandler implements OnNodeDeletedEventHandler {
    private static final Logger LOGGER = LoggerFactory.getLogger(ContentDeletedEventHandler.class);

    public void handleEvent(final RepoEvent<DataAttributes<Resource>> repoEvent) {
        NodeResource resource = (NodeResource) repoEvent.getData().getResource();
        LOGGER.info("A file was deleted: {}, {}, {}", resource.getId(), resource.getNodeType(), 
            resource.getName());
    }

    public EventFilter getEventFilter() {
        return IsFileFilter.get() // Make sure it's a file
                .and(ParentFolderFilter.of("5f355d16-f824-4173-bf4b-b1ec37ef5549")); // Located in the /Company Home/Testing/Inbound folder
    }
}
```

This code uses a custom [`ParentFolderFilter`]({% link content-services/7.4/develop/oop-sdk.md %}#parentfoldercustomfilter). 

For more information about how to extract all the properties from the message payload see [`NodeResource` info]({% link content-services/7.4/develop/oop-sdk.md %}#noderesourceobj).

To create an SDK event handler project that uses plain Java event handlers follow [these instructions]({% link content-services/7.4/develop/oop-sdk.md %}#purejavaeventhandlers).

{% endcapture %}

{% capture sdk5-spring-integration-nodedeleted %}
The following code shows how this can be done with SDK 5 and Spring Integration event handlers:

```java
package org.alfresco.tutorial.events;

import org.alfresco.event.sdk.handling.filter.EventTypeFilter;
import org.alfresco.event.sdk.handling.filter.IsFileFilter;
import org.alfresco.event.sdk.integration.EventChannels;
import org.alfresco.event.sdk.integration.filter.IntegrationEventFilter;
import org.alfresco.event.sdk.model.v1.model.DataAttributes;
import org.alfresco.event.sdk.model.v1.model.NodeResource;
import org.alfresco.event.sdk.model.v1.model.RepoEvent;
import org.alfresco.event.sdk.model.v1.model.Resource;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.integration.dsl.IntegrationFlowAdapter;
import org.springframework.integration.dsl.IntegrationFlowDefinition;
import org.springframework.messaging.Message;
import org.springframework.stereotype.Component;

/**
 * Spring Integration based event handler that will execute code when a file is deleted
 */
@Component
public class DeletedContentFlow extends IntegrationFlowAdapter {
    private static final Logger LOGGER = LoggerFactory.getLogger(DeletedContentFlow.class);

    // Use builder to create an integration flow based on alfresco.events.main.channel event channel
    @Override
    protected IntegrationFlowDefinition<?> buildFlow() {
        return from(EventChannels.MAIN) // Listen to events coming from the Alfresco events channel
                .filter(IntegrationEventFilter.of(EventTypeFilter.NODE_DELETED)) // Filter events and select only node deleted events
                .filter(IntegrationEventFilter.of(IsFileFilter.get())) // Filter node and make sure it is a file node
                .filter(IntegrationEventFilter.of(ParentFolderFilter.of("5f355d16-f824-4173-bf4b-b1ec37ef5549"))) // Filter node and make sure we got correct parent folder ID (/Company Home/Testing/Inbound)
                .handle(t -> handleEvent(t)); // Handle event with a bit of logging
    }

    private void handleEvent(Message message) {
        RepoEvent<DataAttributes<Resource>> repoEvent = (RepoEvent<DataAttributes<Resource>>)message.getPayload();
        NodeResource resource = (NodeResource) repoEvent.getData().getResource();

        LOGGER.info("File deleted: {}", resource.toString());
    }
}
```

This code uses a custom [`ParentFolderFilter`]({% link content-services/7.4/develop/oop-sdk.md %}#parentfoldercustomfilter). 

For more information about how to extract all the properties from the message payload see [`NodeResource` info]({% link content-services/7.4/develop/oop-sdk.md %}#noderesourceobj).

To create an SDK event handler project that uses Spring Integration follow [these instructions]({% link content-services/7.4/develop/oop-sdk.md %}#springintegrationhandlers).

{% endcapture %}

{% capture apache-camel-nodedeleted %}
The following code snippet shows how this could be done with an 
[Apache Camel route](https://camel.apache.org/manual/latest/routes.html){:target="_blank"} configuration:

```java
public class SimpleRoute extends RouteBuilder {

    @Override
    public void configure() {
        from("amqpConnection:topic:alfresco.repo.event2")
            .id("DeletedFileRoute")
            .log("${body}") // Log all incoming events on this topic, even those that we are not interested in
            .choice()
            .when() // When the following is true:
            // The event type is node deleted
            .jsonpath("$[?(@.type=='org.alfresco.event.node.Deleted' && " +
                    // and the node that was deleted is a file
                    "@.data.resource.nodeType=='cm:content' && " +
                    // and the file is located in the /Company Home/Testing/Inbound folder
                    "'5f355d16-f824-4173-bf4b-b1ec37ef5549' in @.data.resource.primaryHierarchy[:1])]")
            // Unpack the data into JSON format
            .unmarshal("publicDataFormat")
            // Call a Spring Bean with the event data
            .bean("deletedEventHandlerImpl", "onReceive(*, COPY)")
            .end();
    }
}
```

The `jsonpath` expression uses several of the event data properties to filter out exactly the events we are interested in.

In this case a Spring Bean with ID `deletedEventHandlerImpl` is called at the end of the route from where you could make the 
necessary ReST API calls.
{% endcapture %}

{% include tabs.html tableid="event-code-nodedeleted" opt1="SDK5 - Plain Java" content1=sdk5-plain-java-nodedeleted opt2="SDK5 - Spring Integration" content2=sdk5-spring-integration-nodedeleted opt3="Apache Camel" content3=apache-camel-nodedeleted %}

## Parent-Child association created event {#parentchildassoccreatedevent}
This event is fired whenever a **secondary** parent -> child association is created, such as via the the 
[POST nodes/{parentId}/secondary-children]({% link content-services/7.4/develop/rest-api-guide/folders-files.md %}#createparentchildassoc4nodeexist)  
ReST API. The full name of this event is `org.alfresco.event.assoc.child.Created`. 

>**Note** that this event will not be generated when a file is created or a folder is created. In this case the **primary** 
parent -> child association (i.e. `cm:contains`) is created but an event for this association is not triggered. You will 
have to listen to the `org.alfresco.event.node.Created` event instead, and from the data for this event you can get to the 
**primary** parent -> child association.  

Here is an example payload for this event type:

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

Using the [Node Browser]({% link content-services/7.4/admin/troubleshoot.md %}#usingnodebrowser) the following 
`NodeRefs` were resolved as follows:

```json
  "parent": {
    "id": "a4eb7684-0ffe-4bf5-b6f7-4297a6e4ee84"  /app:company_home/cm:My_x0020_Gadgets/cm:My_x0020_Gadget  
  },
  "child": {
    "id": "ceb3c804-8b32-4050-b2da-b55c47f01666"  /app:company_home/cm:My_x0020_Gadgets/cm:gadget-picture.png
```

The event payload is telling us that a secondary parent-child association of type `fdk:images` (i.e. `data.resource.assocType`) 
was set up between a gadget file `My Gadget` (i.e. `data.resource.parent`) and a gadget image `gadget-picture.png` 
(i.e. `data.resource.child`).

When subscribing to the `org.alfresco.event.assoc.child.Created` event it's possible to filter out anything that is
of no interest. So for example, if you are only interested in associations of type `fdk:images` it would be easy to 
configure this. 

{% capture sdk5-plain-java-parentchildassoccreated %}
The following code shows how this can be done with SDK 5 and plain Java event handlers:

```java
package org.alfresco.tutorial.events;

import org.alfresco.event.sdk.handling.filter.AssocTypeFilter;
import org.alfresco.event.sdk.handling.filter.EventFilter;
import org.alfresco.event.sdk.handling.handler.OnChildAssocCreatedEventHandler;
import org.alfresco.event.sdk.model.v1.model.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

/**
* Sample event handler to demonstrate reacting to a parent-child assoc being created.
*/
@Component
public class ParentChildAssocCreatedEventHandler implements OnChildAssocCreatedEventHandler {
    private static final Logger LOGGER = LoggerFactory.getLogger(ParentChildAssocCreatedEventHandler.class);

    public void handleEvent(final RepoEvent<DataAttributes<Resource>> repoEvent) {
        ChildAssociationResource resource = (ChildAssociationResource) repoEvent.getData().getResource();
        LOGGER.info("A secondary Parent-Child association was created: {} -> {}", resource.getParent().getId(), 
                resource.getChild().getId());
    }

    public EventFilter getEventFilter() {
        return AssocTypeFilter.of("fdk:images"); // Make sure the Parent-Child association is of type FDK Images
    }
}
```

This code uses the `org.alfresco.event.sdk.handling.filter.AssocTypeFilter` event filter to specify what type of 
Parent-Child association we are interested in. 

For more information about how to extract all the properties from the message payload see [`ChildAssociationResource` info]({% link content-services/7.4/develop/oop-sdk.md %}#childassocresourceobj).

To create an SDK event handler project that uses plain Java event handlers follow [these instructions]({% link content-services/7.4/develop/oop-sdk.md %}#purejavaeventhandlers).

{% endcapture %}

{% capture sdk5-spring-integration-parentchildassoccreated %}
The following code shows how this can be done with SDK 5 and Spring Integration event handlers:

```java
package org.alfresco.tutorial.events;

import org.alfresco.event.sdk.handling.filter.AssocTypeFilter;
import org.alfresco.event.sdk.handling.filter.EventTypeFilter;
import org.alfresco.event.sdk.integration.EventChannels;
import org.alfresco.event.sdk.integration.filter.IntegrationEventFilter;
import org.alfresco.event.sdk.model.v1.model.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.integration.dsl.IntegrationFlowAdapter;
import org.springframework.integration.dsl.IntegrationFlowDefinition;
import org.springframework.messaging.Message;
import org.springframework.stereotype.Component;

/**
 * Spring Integration based event handler that will execute code when a secondary parent-child assoc is being created.
 */
@Component
public class ParentChildAssocCreatedFlow extends IntegrationFlowAdapter {
    private static final Logger LOGGER = LoggerFactory.getLogger(ParentChildAssocCreatedFlow.class);

    // Use builder to create an integration flow based on alfresco.events.main.channel event channel
    @Override
    protected IntegrationFlowDefinition<?> buildFlow() {
        return from(EventChannels.MAIN) // Listen to events coming from the Alfresco events channel
                .filter(IntegrationEventFilter.of(EventTypeFilter.CHILD_ASSOC_CREATED)) // Filter events and select only Parent-Child assoc created events
                .filter(IntegrationEventFilter.of(AssocTypeFilter.of("fdk:images"))) // Make sure the Parent-Child association is of type FDK Images
                .handle(t -> handleEvent(t)); // Handle event with a bit of logging
    }

    private void handleEvent(Message message) {
        RepoEvent<DataAttributes<Resource>> repoEvent = (RepoEvent<DataAttributes<Resource>>)message.getPayload();
        ChildAssociationResource resource = (ChildAssociationResource) repoEvent.getData().getResource();
        LOGGER.info("A secondary Parent-Child association was created: {} -> {}", resource.getParent().getId(),
                resource.getChild().getId());
    }
}
```

This code uses the `org.alfresco.event.sdk.handling.filter.AssocTypeFilter` event filter to specify what type of 
Parent-Child association we are interested in. 

For more information about how to extract all the properties from the message payload see [`ChildAssociationResource` info]({% link content-services/7.4/develop/oop-sdk.md %}#childassocresourceobj).

To create an SDK event handler project that uses Spring Integration follow [these instructions]({% link content-services/7.4/develop/oop-sdk.md %}#springintegrationhandlers).

{% endcapture %}

{% capture apache-camel-parentchildassoccreated %}
The following code snippet shows how this could be done with an 
[Apache Camel route](https://camel.apache.org/manual/latest/routes.html){:target="_blank"} configuration:

```java
public class SimpleRoute extends RouteBuilder {

    @Override
    public void configure() {
        from("amqpConnection:topic:alfresco.repo.event2")
            .id("ParentChildAssocCreatedRoute")
            .log("${body}") // Log all incoming events on this topic, even those that we are not interested in
            .choice()
            .when() // When the following is true:
            // The event type is parent-child assoc created
            .jsonpath("$[?(@.type=='org.alfresco.event.assoc.child.Created' && " +
                    // and the association type is fdk:images
                    "@.data.resource.assocType=='fdk:images')]" )
            // Unpack the data into JSON format
            .unmarshal("publicDataFormat")
            // Call a Spring Bean with the event data
            .bean("parentChildAssocCreatedEventHandlerImpl", "onReceive(*, COPY)")
            .end();
    }
}
```

The `jsonpath` expression uses several of the event data properties to filter out exactly the events we are interested in.

In this case a Spring Bean with ID `parentChildAssocCreatedEventHandlerImpl` is called at the end of the route from 
where you could make the necessary ReST API calls.
{% endcapture %}

{% include tabs.html tableid="event-code-parentchildassoccreated" opt1="SDK5 - Plain Java" content1=sdk5-plain-java-parentchildassoccreated opt2="SDK5 - Spring Integration" content2=sdk5-spring-integration-parentchildassoccreated opt3="Apache Camel" content3=apache-camel-parentchildassoccreated %}

## Parent-Child association deleted event
This event is fired whenever a **secondary** parent -> child association is deleted, such as via the the 
[DELETE nodes/{parentId}/secondary-children]({% link content-services/7.4/develop/rest-api-guide/folders-files.md %}#deletingassociations)  
ReST API. The full name of this event is `org.alfresco.event.assoc.child.Deleted`. 

>**Note** that this event will not be generated when a file is deleted or a folder is deleted. In this case the **primary** 
parent -> child association (i.e. `cm:contains`) is deleted but an event for this association is not triggered. You will 
have to listen to the `org.alfresco.event.node.Deleted` event instead, and from the data for this event you can get data for 
the deleted **primary** parent -> child association.  

Here is an example payload for this event type:

```json
{
  "specversion": "1.0",
  "type": "org.alfresco.event.assoc.child.Deleted",
  "id": "80a8b1db-9bac-4f20-8273-025bc555ba61",
  "source": "/08d9b620-48de-4247-8f33-360988d3b19b",
  "time": "2021-02-01T16:39:56.583965Z",
  "dataschema": "https://api.alfresco.com/schema/event/repo/v1/childAssocDeleted",
  "datacontenttype": "application/json",
  "data": {
    "eventGroupId": "3c53ff93-9a7c-4275-ac17-7bb2b7413f53",
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

Using the [Node Browser]({% link content-services/7.4/admin/troubleshoot.md %}#usingnodebrowser) the following 
`NodeRefs` were resolved as follows:

```json
  "parent": {
    "id": "a4eb7684-0ffe-4bf5-b6f7-4297a6e4ee84"  /app:company_home/cm:My_x0020_Gadgets/cm:My_x0020_Gadget  
  },
  "child": {
    "id": "ceb3c804-8b32-4050-b2da-b55c47f01666"  /sys:archivedItem/gadget-picture.png
```

The event payload is telling us that a secondary parent-child association of type `fdk:images` (i.e. `data.resource.assocType`) 
was deleted between a gadget file `My Gadget` (i.e. `data.resource.parent`) and a gadget review `gadget-picture.png` 
(i.e. `data.resource.child`).

>**Note**. when you use the Node Browser to look for the deleted `gadget-picture.png` file (i.e. with ID ceb3c804-8b32-4050-b2da-b55c47f01666) 
you have to search in the `archive://SpacesStore` store to find it. This store contains soft deleted files. 

When subscribing to the `org.alfresco.event.assoc.child.Deleted` event it's possible to filter out anything that is
of no interest. So for example, if you are only interested in associations of type `fdk:images` it would be easy to 
configure this. 

{% capture sdk5-plain-java-parentchildassocdeleted %}
The following code shows how this can be done with SDK 5 and plain Java event handlers:

```java
package org.alfresco.tutorial.events;

import org.alfresco.event.sdk.handling.filter.AssocTypeFilter;
import org.alfresco.event.sdk.handling.filter.EventFilter;
import org.alfresco.event.sdk.handling.handler.OnChildAssocDeletedEventHandler;
import org.alfresco.event.sdk.model.v1.model.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

/**
* Sample event handler to demonstrate reacting to a parent-child assoc being deleted.
*/
@Component
public class ParentChildAssocDeletedEventHandler implements OnChildAssocDeletedEventHandler {
    private static final Logger LOGGER = LoggerFactory.getLogger(ParentChildAssocDeletedEventHandler.class);

    public void handleEvent(final RepoEvent<DataAttributes<Resource>> repoEvent) {
        ChildAssociationResource resource = (ChildAssociationResource) repoEvent.getData().getResource();
        LOGGER.info("A secondary Parent-Child association was deleted: {} -> {}", resource.getParent().getId(), 
                resource.getChild().getId());
    }

    public EventFilter getEventFilter() {
        return AssocTypeFilter.of("fdk:images"); // Make sure the Parent-Child association is of type FDK Images
    }
}
```

This code uses the `org.alfresco.event.sdk.handling.filter.AssocTypeFilter` event filter to specify what type of 
Parent-Child association we are interested in. 

For more information about how to extract all the properties from the message payload see [`ChildAssociationResource` info]({% link content-services/7.4/develop/oop-sdk.md %}#childassocresourceobj).

To create an SDK event handler project that uses plain Java event handlers follow [these instructions]({% link content-services/7.4/develop/oop-sdk.md %}#purejavaeventhandlers).

{% endcapture %}

{% capture sdk5-spring-integration-parentchildassocdeleted %}
The following code shows how this can be done with SDK 5 and Spring Integration event handlers:

```java
package org.alfresco.tutorial.events;

import org.alfresco.event.sdk.handling.filter.AssocTypeFilter;
import org.alfresco.event.sdk.handling.filter.EventTypeFilter;
import org.alfresco.event.sdk.integration.EventChannels;
import org.alfresco.event.sdk.integration.filter.IntegrationEventFilter;
import org.alfresco.event.sdk.model.v1.model.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.integration.dsl.IntegrationFlowAdapter;
import org.springframework.integration.dsl.IntegrationFlowDefinition;
import org.springframework.messaging.Message;
import org.springframework.stereotype.Component;

/**
 * Spring Integration based event handler that will execute code when a secondary parent-child assoc is being deleted.
 */
@Component
public class ParentChildAssocDeletedFlow extends IntegrationFlowAdapter {
    private static final Logger LOGGER = LoggerFactory.getLogger(ParentChildAssocDeletedFlow.class);

    // Use builder to create an integration flow based on alfresco.events.main.channel event channel
    @Override
    protected IntegrationFlowDefinition<?> buildFlow() {
        return from(EventChannels.MAIN) // Listen to events coming from the Alfresco events channel
                .filter(IntegrationEventFilter.of(EventTypeFilter.CHILD_ASSOC_DELETED)) // Filter events and select only Parent-Child assoc deleted events
                .filter(IntegrationEventFilter.of(AssocTypeFilter.of("fdk:images"))) // Make sure the Parent-Child association is of type FDK Images
                .handle(t -> handleEvent(t)); // Handle event with a bit of logging
    }

    private void handleEvent(Message message) {
        RepoEvent<DataAttributes<Resource>> repoEvent = (RepoEvent<DataAttributes<Resource>>)message.getPayload();
        ChildAssociationResource resource = (ChildAssociationResource) repoEvent.getData().getResource();
        LOGGER.info("A secondary Parent-Child association was deleted: {} -> {}", resource.getParent().getId(),
                resource.getChild().getId());
    }
}
```

This code uses the `org.alfresco.event.sdk.handling.filter.AssocTypeFilter` event filter to specify what type of 
Parent-Child association we are interested in. 

For more information about how to extract all the properties from the message payload see [`ChildAssociationResource` info]({% link content-services/7.4/develop/oop-sdk.md %}#childassocresourceobj).

To create an SDK event handler project that uses Spring Integration follow [these instructions]({% link content-services/7.4/develop/oop-sdk.md %}#springintegrationhandlers).

{% endcapture %}

{% capture apache-camel-parentchildassocdeleted %}
The following code snippet shows how this could be done with an 
[Apache Camel route](https://camel.apache.org/manual/latest/routes.html){:target="_blank"} configuration:

```java
public class SimpleRoute extends RouteBuilder {

    @Override
    public void configure() {
        from("amqpConnection:topic:alfresco.repo.event2")
            .id("ParentChildAssocDeletedRoute")
            .log("${body}") // Log all incoming events on this topic, even those that we are not interested in
            .choice()
            .when() // When the following is true:
            // The event type is parent-child assoc deleted
            .jsonpath("$[?(@.type=='org.alfresco.event.assoc.child.Deleted' && " +
                    // and the association type is fdk:images
                    "@.data.resource.assocType=='fdk:images')]" )
            // Unpack the data into JSON format
            .unmarshal("publicDataFormat")
            // Call a Spring Bean with the event data
            .bean("parentChildAssocDeletedEventHandlerImpl", "onReceive(*, COPY)")
            .end();
    }
}
```

The `jsonpath` expression uses several of the event data properties to filter out exactly the events we are interested in.

In this case a Spring Bean with ID `parentChildAssocDeletedEventHandlerImpl` is called at the end of the route from 
where you could make the necessary ReST API calls.
{% endcapture %}

{% include tabs.html tableid="event-code-parentchildassocdeleted" opt1="SDK5 - Plain Java" content1=sdk5-plain-java-parentchildassocdeleted opt2="SDK5 - Spring Integration" content2=sdk5-spring-integration-parentchildassocdeleted opt3="Apache Camel" content3=apache-camel-parentchildassocdeleted %}

## Peer association created event {#peer2peerassoccreatedevent}
This event is fired whenever a peer association is created, such as via the the 
[POST nodes/{sourceId}/targets]({% link content-services/7.4/develop/rest-api-guide/folders-files.md %}#createparentchildassoc4nodeexist)  
ReST API. The full name of this event is `org.alfresco.event.assoc.peer.Created`. 

Here is an example payload for this event type:

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

Using the [Node Browser]({% link content-services/7.4/admin/troubleshoot.md %}#usingnodebrowser) the following 
`NodeRefs` were resolved as follows:

```json
  "source": {
    "id": "a4eb7684-0ffe-4bf5-b6f7-4297a6e4ee84"  /app:company_home/cm:My_x0020_Gadgets/cm:My_x0020_Gadget
  },
  "target": {
    "id": "f826ac49-0262-48af-8f63-f87eb7007078"  /app:company_home/cm:My_x0020_Gadgets/cm:gadget-review.txt

```

The event payload is telling us that a peer association of type `fdk:reviews` (i.e. `data.resource.assocType`) 
was set up between a gadget file `My Gadget` (i.e. `data.resource.source`) and a gadget review `gadget-review.txt` 
(i.e. `data.resource.target`).

When subscribing to the `org.alfresco.event.assoc.peer.Created` event it's possible to filter out anything that is
of no interest. So for example, if you are only interested in associations of type `fdk:reviews` it would be easy to 
configure this. 

{% capture sdk5-plain-java-peer2peerassoccreated %}
The following code shows how this can be done with SDK 5 and plain Java event handlers:

```java
import org.alfresco.event.sdk.handling.filter.AssocTypeFilter;
import org.alfresco.event.sdk.handling.filter.EventFilter;
import org.alfresco.event.sdk.handling.handler.OnPeerAssocCreatedEventHandler;
import org.alfresco.event.sdk.model.v1.model.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

/**
* Sample event handler to demonstrate reacting to a peer-2-peer assoc being created.
*/
@Component
public class Peer2PeerAssocCreatedEventHandler implements OnPeerAssocCreatedEventHandler {
    private static final Logger LOGGER = LoggerFactory.getLogger(Peer2PeerAssocCreatedEventHandler.class);

    public void handleEvent(final RepoEvent<DataAttributes<Resource>> repoEvent) {
        PeerAssociationResource resource = (PeerAssociationResource) repoEvent.getData().getResource();
        LOGGER.info("A Peer-Peer association was created: Source {} -> Target {}", resource.getSource().getId(),
                resource.getTarget().getId());
    }

    public EventFilter getEventFilter() {
        return AssocTypeFilter.of("fdk:reviews"); // Make sure the Peer-Peer association is of type FDK Reviews
    }
}
```

This code uses the `org.alfresco.event.sdk.handling.filter.AssocTypeFilter` event filter to specify what type of 
Peer-2-Peer association we are interested in. 

For more information about how to extract all the properties from the message payload see [`PeerAssociationResource` info]({% link content-services/7.4/develop/oop-sdk.md %}#peerassocresourceobj).

To create an SDK event handler project that uses plain Java event handlers follow [these instructions]({% link content-services/7.4/develop/oop-sdk.md %}#purejavaeventhandlers).

{% endcapture %}

{% capture sdk5-spring-integration-peer2peerassoccreated %}
The following code shows how this can be done with SDK 5 and Spring Integration event handlers:

```java
package org.alfresco.tutorial.events;


import org.alfresco.event.sdk.handling.filter.AssocTypeFilter;
import org.alfresco.event.sdk.handling.filter.EventTypeFilter;
import org.alfresco.event.sdk.integration.EventChannels;
import org.alfresco.event.sdk.integration.filter.IntegrationEventFilter;
import org.alfresco.event.sdk.model.v1.model.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.integration.dsl.IntegrationFlowAdapter;
import org.springframework.integration.dsl.IntegrationFlowDefinition;
import org.springframework.messaging.Message;
import org.springframework.stereotype.Component;

/**
 * Spring Integration based event handler that will execute code when a peer-2-peer assoc is being created.
 */
@Component
public class Peer2PeerAssocCreatedFlow extends IntegrationFlowAdapter {
    private static final Logger LOGGER = LoggerFactory.getLogger(Peer2PeerAssocCreatedFlow.class);

    // Use builder to create an integration flow based on alfresco.events.main.channel event channel
    @Override
    protected IntegrationFlowDefinition<?> buildFlow() {
        return from(EventChannels.MAIN) // Listen to events coming from the Alfresco events channel
                .filter(IntegrationEventFilter.of(EventTypeFilter.PEER_ASSOC_CREATED)) // Filter events and select only Peer2Peer assoc created events
                .filter(IntegrationEventFilter.of(AssocTypeFilter.of("fdk:reviews"))) // Make sure the Peer2Peer association is of type FDK Reviews
                .handle(t -> handleEvent(t)); // Handle event with a bit of logging
    }

    private void handleEvent(Message message) {
        RepoEvent<DataAttributes<Resource>> repoEvent = (RepoEvent<DataAttributes<Resource>>)message.getPayload();
        PeerAssociationResource resource = (PeerAssociationResource) repoEvent.getData().getResource();
        LOGGER.info("A Peer-Peer association was created: Source {} -> Target {}", resource.getSource().getId(),
                resource.getTarget().getId());
    }
}
```

This code uses the `org.alfresco.event.sdk.handling.filter.AssocTypeFilter` event filter to specify what type of 
Peer-2-Peer association we are interested in. 

For more information about how to extract all the properties from the message payload see [`PeerAssociationResource` info]({% link content-services/7.4/develop/oop-sdk.md %}#peerassocresourceobj).

To create an SDK event handler project that uses Spring Integration follow [these instructions]({% link content-services/7.4/develop/oop-sdk.md %}#springintegrationhandlers).

{% endcapture %}

{% capture apache-camel-peer2peerassoccreated %}
The following code snippet shows how this could be done with an 
[Apache Camel route](https://camel.apache.org/manual/latest/routes.html){:target="_blank"} configuration:

```java
public class SimpleRoute extends RouteBuilder {

    @Override
    public void configure() {
        from("amqpConnection:topic:alfresco.repo.event2")
            .id("PeerAssocCreatedRoute")
            .log("${body}") // Log all incoming events on this topic, even those that we are not interested in
            .choice()
            .when() // When the following is true:
            // The event type is peer assoc created
            .jsonpath("$[?(@.type=='org.alfresco.event.assoc.peer.Created' && " +
                    // and the association type is fdk:reviews
                    "@.data.resource.assocType=='fdk:reviews')]" )
            // Unpack the data into JSON format
            .unmarshal("publicDataFormat")
            // Call a Spring Bean with the event data
            .bean("peerAssocCreatedEventHandlerImpl", "onReceive(*, COPY)")
            .end();
    }
}
```

The `jsonpath` expression uses several of the event data properties to filter out exactly the events we are interested in.

In this case a Spring Bean with ID `peerAssocCreatedEventHandlerImpl` is called at the end of the route from 
where you could make the necessary ReST API calls.
{% endcapture %}

{% include tabs.html tableid="event-code-peer2peerassoccreated" opt1="SDK5 - Plain Java" content1=sdk5-plain-java-peer2peerassoccreated opt2="SDK5 - Spring Integration" content2=sdk5-spring-integration-peer2peerassoccreated opt3="Apache Camel" content3=apache-camel-peer2peerassoccreated %}

## Peer association deleted event
This event is fired whenever a peer association is deleted, such as via the the 
[DELETE nodes/{sourceId}/targets]({% link content-services/7.4/develop/rest-api-guide/folders-files.md %}#deletingassociations)  
ReST API. The full name of this event is `org.alfresco.event.assoc.peer.Deleted`. 

Here is an example payload for this event type:

```json
{
  "specversion": "1.0",
  "type": "org.alfresco.event.assoc.peer.Deleted",
  "id": "630a2b78-5832-42ad-89e0-bafaed73df3d",
  "source": "/08d9b620-48de-4247-8f33-360988d3b19b",
  "time": "2021-02-01T10:39:37.329006Z",
  "dataschema": "https://api.alfresco.com/schema/event/repo/v1/peerAssocDeleted",
  "datacontenttype": "application/json",
  "data": {
    "eventGroupId": "27e7f158-707b-48ee-87ca-efd247e6cbb7",
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

Using the [Node Browser]({% link content-services/7.4/admin/troubleshoot.md %}#usingnodebrowser) the following 
`NodeRefs` were resolved as follows:

```json
  "source": {
    "id": "a4eb7684-0ffe-4bf5-b6f7-4297a6e4ee84"  /app:company_home/cm:My_x0020_Gadgets/cm:My_x0020_Gadget  
  },
  "target": {
    "id": "f826ac49-0262-48af-8f63-f87eb7007078"  /sys:archivedItem/gadget-review.txt
```

The event payload is telling us that a peer association of type `fdk:reviews` (i.e. `data.resource.assocType`) 
was deleted between a gadget file `My Gadget` (i.e. `data.resource.source`) and a gadget review `gadget-review.txt` 
(i.e. `data.resource.target`).

>**Note**. when you use the Node Browser to look for the deleted `gadget-review.txt` file (i.e. with ID f826ac49-0262-48af-8f63-f87eb7007078) 
you have to search in the `archive://SpacesStore` store to find it. This store contains soft deleted files. 

When subscribing to the `org.alfresco.event.assoc.peer.Deleted` event it's possible to filter out anything that is
of no interest. So for example, if you are only interested in associations of type `fdk:reviews` it would be easy to 
configure this. 

{% capture sdk5-plain-java-peer2peerassocdeleted %}
The following code shows how this can be done with SDK 5 and plain Java event handlers:

```java
import org.alfresco.event.sdk.handling.filter.AssocTypeFilter;
import org.alfresco.event.sdk.handling.filter.EventFilter;
import org.alfresco.event.sdk.handling.handler.OnPeerAssocDeletedEventHandler;
import org.alfresco.event.sdk.model.v1.model.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

/**
* Sample event handler to demonstrate reacting to a peer-2-peer assoc being deleted.
*/
@Component
public class Peer2PeerAssocDeletedEventHandler implements OnPeerAssocDeletedEventHandler {
    private static final Logger LOGGER = LoggerFactory.getLogger(Peer2PeerAssocDeletedEventHandler.class);

    public void handleEvent(final RepoEvent<DataAttributes<Resource>> repoEvent) {
        PeerAssociationResource resource = (PeerAssociationResource) repoEvent.getData().getResource();
        LOGGER.info("A Peer-Peer association was deleted: Source {} -> Target {}", resource.getSource().getId(),
                resource.getTarget().getId());
    }

    public EventFilter getEventFilter() {
        return AssocTypeFilter.of("fdk:reviews"); // Make sure the Peer-Peer association is of type FDK Reviews
    }
}
```

This code uses the `org.alfresco.event.sdk.handling.filter.AssocTypeFilter` event filter to specify what type of 
Peer-2-Peer association we are interested in. 

For more information about how to extract all the properties from the message payload see [`PeerAssociationResource` info]({% link content-services/7.4/develop/oop-sdk.md %}#peerassocresourceobj).

To create an SDK event handler project that uses plain Java event handlers follow [these instructions]({% link content-services/7.4/develop/oop-sdk.md %}#purejavaeventhandlers).

{% endcapture %}

{% capture sdk5-spring-integration-peer2peerassocdeleted %}
The following code shows how this can be done with SDK 5 and Spring Integration event handlers:

```java
package org.alfresco.tutorial.events;

import org.alfresco.event.sdk.handling.filter.AssocTypeFilter;
import org.alfresco.event.sdk.handling.filter.EventTypeFilter;
import org.alfresco.event.sdk.integration.EventChannels;
import org.alfresco.event.sdk.integration.filter.IntegrationEventFilter;
import org.alfresco.event.sdk.model.v1.model.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.integration.dsl.IntegrationFlowAdapter;
import org.springframework.integration.dsl.IntegrationFlowDefinition;
import org.springframework.messaging.Message;
import org.springframework.stereotype.Component;

/**
 * Spring Integration based event handler that will execute code when a peer-2-peer assoc is being deleted.
 */
@Component
public class Peer2PeerAssocDeletedFlow extends IntegrationFlowAdapter {
    private static final Logger LOGGER = LoggerFactory.getLogger(Peer2PeerAssocDeletedFlow.class);

    // Use builder to create an integration flow based on alfresco.events.main.channel event channel
    @Override
    protected IntegrationFlowDefinition<?> buildFlow() {
        return from(EventChannels.MAIN) // Listen to events coming from the Alfresco events channel
                .filter(IntegrationEventFilter.of(EventTypeFilter.PEER_ASSOC_DELETED)) // Filter events and select only Peer2Peer assoc deleted events
                .filter(IntegrationEventFilter.of(AssocTypeFilter.of("fdk:reviews"))) // Make sure the Peer2Peer association is of type FDK Reviews
                .handle(t -> handleEvent(t)); // Handle event with a bit of logging
    }

    private void handleEvent(Message message) {
        RepoEvent<DataAttributes<Resource>> repoEvent = (RepoEvent<DataAttributes<Resource>>)message.getPayload();
        PeerAssociationResource resource = (PeerAssociationResource) repoEvent.getData().getResource();
        LOGGER.info("A Peer-Peer association was deleted: Source {} -> Target {}", resource.getSource().getId(),
                resource.getTarget().getId());
    }
}
```

This code uses the `org.alfresco.event.sdk.handling.filter.AssocTypeFilter` event filter to specify what type of 
Peer-2-Peer association we are interested in. 

For more information about how to extract all the properties from the message payload see [`PeerAssociationResource` info]({% link content-services/7.4/develop/oop-sdk.md %}#peerassocresourceobj).

To create an SDK event handler project that uses Spring Integration follow [these instructions]({% link content-services/7.4/develop/oop-sdk.md %}#springintegrationhandlers).

{% endcapture %}

{% capture apache-camel-peer2peerassocdeleted %}
The following code snippet shows how this could be done with an 
[Apache Camel route](https://camel.apache.org/manual/latest/routes.html){:target="_blank"} configuration:

```java
public class SimpleRoute extends RouteBuilder {

    @Override
    public void configure() {
        from("amqpConnection:topic:alfresco.repo.event2")
            .id("PeerAssocDeletedRoute")
            .log("${body}") // Log all incoming events on this topic, even those that we are not interested in
            .choice()
            .when() // When the following is true:
            // The event type is peer assoc deleted
            .jsonpath("$[?(@.type=='org.alfresco.event.assoc.peer.Deleted' && " +
                    // and the association type is fdk:reviews
                    "@.data.resource.assocType=='fdk:reviews')]" )
            // Unpack the data into JSON format
            .unmarshal("publicDataFormat")
            // Call a Spring Bean with the event data
            .bean("peerAssocDeletedEventHandlerImpl", "onReceive(*, COPY)")
            .end();
    }
}
```

The `jsonpath` expression uses several of the event data properties to filter out exactly the events we are interested in.

In this case a Spring Bean with ID `peerAssocDeletedEventHandlerImpl` is called at the end of the route from 
where you could make the necessary ReST API calls.

{% endcapture %}

{% include tabs.html tableid="event-code-peer2peerassocdeleted" opt1="SDK5 - Plain Java" content1=sdk5-plain-java-peer2peerassocdeleted opt2="SDK5 - Spring Integration" content2=sdk5-spring-integration-peer2peerassocdeleted opt3="Apache Camel" content3=apache-camel-peer2peerassocdeleted %}

## Permission updated event (ENTERPRISE ONLY)
This event is fired whenever a permission is updated for a node, such as via the the **Manage Permissions** action in the 
Share user interface. The full name of this event is `org.alfresco.event.permission.Updated`. 

>Note. this event is not fired if you are using the Community Edition of Alfresco.

Here is an example payload for this event type:

```json
{
  "specversion": "1.0",
  "type": "org.alfresco.event.permission.Updated",
  "id": "ecf62eb0-55b5-4c42-969b-27bb24ad658d",
  "source": "/bb4be766-5aeb-4bc9-bd23-948ae98e4e9f",
  "time": "2021-04-07T09:10:33.825727Z",
  "dataschema": "https://api.alfresco.com/schema/event/repo/v1/permissionUpdated",
  "datacontenttype": "application/json",
  "data": {
    "eventGroupId": "8ddc1695-b911-40c4-b81c-05b549cd02dc",
    "resource": {
      "@type": "NodeResource",
      "id": "018de31a-47bf-431f-9107-3aacb63fcb67",
      "primaryHierarchy": [
        "f813b415-aa71-43b9-9c8a-2ce92ab715f8",
        "1f0371cf-ab5b-45f3-8d76-76699c82367d",
        "341635c3-c089-4564-b5dd-8407498b7ea3"
      ],
      "name": "somefile.txt",
      "nodeType": "cm:content",
      "createdByUser": {
        "id": "admin",
        "displayName": "Administrator"
      },
      "createdAt": "2021-04-07T09:06:44.216Z",
      "modifiedByUser": {
        "id": "admin",
        "displayName": "Administrator"
      },
      "modifiedAt": "2021-04-07T09:10:33.602Z",
      "content": {
        "mimeType": "text/plain",
        "sizeInBytes": 9,
        "encoding": "UTF-8"
      },
      "properties": {
        "cm:title": "",
        "app:editInline": true,
        "cm:lastThumbnailModification": [
          "pdf:1617786411514"
        ],
        "cm:description": ""
      },
      "aspectNames": [
        "cm:thumbnailModification",
        "cm:titled",
        "app:inlineeditable",
        "rn:renditioned",
        "cm:auditable"
      ],
      "isFile": true,
      "isFolder": false
    },
    "resourceReaderAuthorities": [
      "GROUP_EVERYONE",
      "abeecher",
      "guest"
    ],
    "resourceDeniedAuthorities": []
  }
}
```

In this case the node permissions for user `abeecher` was updated. For information about what specific 
permissions were set or removed for the user use the [ReST API]({% link content-services/7.4/develop/rest-api-guide/folders-files.md %}#setpermissionsnode).

When subscribing to the `org.alfresco.event.permission.Updated` event it's possible to filter out anything that is
of no interest. So for example, if you are only interested in permission updates for a specific node or folder it would 
be easy to configure this. 

{% capture sdk5-plain-java-permissionupdated %}
The following code shows how this can be done with SDK 5 and plain Java event handlers:

```java
import org.alfresco.event.sdk.handling.filter.EventFilter;
import org.alfresco.event.sdk.handling.filter.IsFileFilter;
import org.alfresco.event.sdk.handling.handler.OnPermissionUpdatedEventHandler;
import org.alfresco.event.sdk.model.v1.model.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

/**
 * Sample event handler to demonstrate reacting to a node permission being updated.
 * 
 * IMPORTANT! only works with ACS 7 Enterprise Edition.
 */
@Component
public class PermissionUpdatedEventHandler implements OnPermissionUpdatedEventHandler {
    private static final Logger LOGGER = LoggerFactory.getLogger(PermissionUpdatedEventHandler.class);

    public void handleEvent(final RepoEvent<DataAttributes<Resource>> repoEvent) {
        NodeResource resource = (NodeResource) repoEvent.getData().getResource();
        LOGGER.info("A node permission was updated: {}", resource.toString());
    }
    
    public EventFilter getEventFilter() {
        return IsFileFilter.get() // permissions for a file is being updated
                .and(ParentFolderFilter.of("55a21ec2-eaff-4e0f-b76b-c84e32d1c2fe")); // the file is located in a specific folder with this Node ID 
    }
}
```

This code uses the `org.alfresco.event.sdk.handling.filter.IsFileFilter` event filter to specify that we are only interested 
in permission updates to files. 

This code uses a custom [`ParentFolderFilter`]({% link content-services/7.4/develop/oop-sdk.md %}#parentfoldercustomfilter). 

For more information about how to extract all the properties from the message payload see [`NodeResource` info]({% link content-services/7.4/develop/oop-sdk.md %}#noderesourceobj).

To create an SDK event handler project that uses plain Java event handlers follow [these instructions]({% link content-services/7.4/develop/oop-sdk.md %}#purejavaeventhandlers).

{% endcapture %}

{% capture sdk5-spring-integration-permissionupdated %}
The following code shows how this can be done with SDK 5 and Spring Integration event handlers:

```java
package org.alfresco.tutorial.events;

import org.alfresco.event.sdk.handling.filter.EventTypeFilter;
import org.alfresco.event.sdk.handling.filter.IsFileFilter;
import org.alfresco.event.sdk.integration.EventChannels;
import org.alfresco.event.sdk.integration.filter.IntegrationEventFilter;
import org.alfresco.event.sdk.model.v1.model.DataAttributes;
import org.alfresco.event.sdk.model.v1.model.NodeResource;
import org.alfresco.event.sdk.model.v1.model.RepoEvent;
import org.alfresco.event.sdk.model.v1.model.Resource;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.integration.dsl.IntegrationFlowAdapter;
import org.springframework.integration.dsl.IntegrationFlowDefinition;
import org.springframework.messaging.Message;
import org.springframework.stereotype.Component;

/**
 * Spring Integration based event handler that will execute code when node permissions are being updated.
* 
* IMPORTANT! only works with ACS 7 Enterprise Edition.
 */
@Component
public class PermissionUpdatedFlow extends IntegrationFlowAdapter {
    private static final Logger LOGGER = LoggerFactory.getLogger(PermissionUpdatedFlow.class);

    // Use builder to create an integration flow based on alfresco.events.main.channel event channel
    @Override
    protected IntegrationFlowDefinition<?> buildFlow() {
        return from(EventChannels.MAIN) // Listen to events coming from the Alfresco events channel
                .filter(IntegrationEventFilter.of(EventTypeFilter.PERMISSION_UPDATED)) // Filter events and select only permission updated events
                .filter(IntegrationEventFilter.of(IsFileFilter.get())) // Filter node and make sure it is a file node
                .filter(IntegrationEventFilter.of(ParentFolderFilter.of("5f355d16-f824-4173-bf4b-b1ec37ef5549"))) // Filter node and make sure the file is in a folder with this Node ID
                .handle(t -> handleEvent(t)); // Handle event with a bit of logging
    }

    private void handleEvent(Message message) {
        RepoEvent<DataAttributes<Resource>> repoEvent = (RepoEvent<DataAttributes<Resource>>)message.getPayload();
        NodeResource resource = (NodeResource) repoEvent.getData().getResource();
        LOGGER.info("Node permissions were updated: {} ", resource.toString());
    }
}
```

This code uses the `org.alfresco.event.sdk.handling.filter.IsFileFilter` event filter to specify that we are only interested 
in permission updates to files. 

This code uses a custom [`ParentFolderFilter`]({% link content-services/7.4/develop/oop-sdk.md %}#parentfoldercustomfilter). 

For more information about how to extract all the properties from the message payload see [`NodeResource` info]({% link content-services/7.4/develop/oop-sdk.md %}#noderesourceobj).

To create an SDK event handler project that uses Spring Integration follow [these instructions]({% link content-services/7.4/develop/oop-sdk.md %}#springintegrationhandlers).

{% endcapture %}

{% capture apache-camel-permissionupdated %}
The following code snippet shows how this could be done with an 
[Apache Camel route](https://camel.apache.org/manual/latest/routes.html){:target="_blank"} configuration:

```java
public class SimpleRoute extends RouteBuilder {

    @Override
    public void configure() {
        from("amqpConnection:topic:alfresco.repo.event2")
            .id("PermissionUpdatedRoute")
            .log("${body}") // Log all incoming events on this topic, even those that we are not interested in
            .choice()
            .when() // When the following is true:
            // The event type is permission udpated
            .jsonpath("$[?(@.type=='org.alfresco.event.permission.Updated' && " +
                // The node that was created is a file
                "@.data.resource.nodeType=='cm:content' && " +            
                // The file is located in a folder with this Node ID
                "'5f355d16-f824-4173-bf4b-b1ec37ef5549' in @.data.resource.primaryHierarchy[:1])]")
            // Unpack the data into JSON format
            .unmarshal("publicDataFormat")
            // Call a Spring Bean with the event data
            .bean("permissionUpdatedHandlerImpl", "onReceive(*, COPY)")
            .end();
    }
}
```

The `jsonpath` expression uses several of the event data properties to filter out exactly the events we are interested in.

In this case a Spring Bean with ID `permissionUpdatedHandlerImpl` is called at the end of the route from 
where you could make the necessary ReST API calls.
{% endcapture %}

{% include tabs.html tableid="event-code-permissionupdated" opt1="SDK5 - Plain Java" content1=sdk5-plain-java-permissionupdated opt2="SDK5 - Spring Integration" content2=sdk5-spring-integration-permissionupdated opt3="Apache Camel" content3=apache-camel-permissionupdated %}


 