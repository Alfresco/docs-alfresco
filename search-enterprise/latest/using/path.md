---
title: Path queries
---

The PATH field is the Elasticsearch field which contains the `primaryHierarchy` attribute that consists of a list of `noderefs`. Field indexing is different for reindexing and live indexing components because they rely on different sources of information. Setup sequence for new systems:

RDBMS (reindexing)

Events (live indexing)

The live indexing component populates the PATH field on Elasticsearch documents starting from the `primaryHierarchy` attribute found in the node event. The `primaryHierarchy` captures the primary hierarchy of ancestors of the resource affected, which means the folder path of the content. The first element is the immediate parent. For example this is a node event which contains that information:

```JOSN
{
  "specversion": "1.0",
  "type": "org.alfresco.event.node.Created",
  "id": "97c1b36c-c569-4c66-8a31-7a8d0b6b804a",
  "source": "/f6d21231-618e-4f12-a920-e498660c5b9d",
  "time": "2020-04-27T12:37:03.560134+01:00",
  "dataschema": "https://api.alfresco.com/schema/event/repo/v1/nodeCreated",
  "datacontenttype": "application/json",
  "data": {
   ...
      "primaryHierarchy": [
        "521aac1c-20eb-444b-a137-2da3d35ee1a8",
        "2641bbe1-39ff-44dc-b47f-736552ad46cc"
      ],
     ... 
    }
  }
}
```

For new systems during the first system bootstrap the initial folder hierarchy is created before the event subsystem is started. This means standard folders like 'Company home', 'Data dictionary', and 'Sites' are not going to be picked up by the live indexing component. Due to this some members of the `primaryHierarchy` can't be de-referenced. This occurs because the live indexing component does not have enough information to construct the `PATH` field, for new folders and documents that are created after the initial system start up.

To overcome the scenario above the recommended setup sequence for new systems that require PATH query functionality is:

1. Startup new content repository.

2. Perform full reindex

3. Continue with live indexing.

### Nodes / NodeTypes Blacklist

The Live Indexing and Re-indexing components rely on a configuration file which acts as a blacklist, the file contains: 

* The list of node types to be excluded from indexing.
* The list of node types with content excluded from indexing.
* The list of property names to be excluded from (metadata) indexing.

The blacklist file path is specified through Spring configuration capabilities which means:

* A property called `alfresco.mediation.filter-file` in the module application.properties
* a system property `-Dalfresco.mediation.filter-file`

The default value of that property is `classpath:mediation-filter.yml` and points to a file included in the bundle which provides no rules:

```text
mediation:
  nodeTypes:
  contentNodeTypes:
```

When a blacklisted entry is configured you can have specific branches of the repository without PATH queries being indexed for any nodes in them. This can happen if the nodes in the hierarchy are excluded from the index in the modelling, re-indexing, or live indexing component's of the configuration.

If some nodes are excluded from the search indexing, then their children's PATH will not be able to be constructed even if the children themselves will be indexed using their metadata and content. The following example is for live indexing:  

1. A node event is received by the Mediation part of the live indexing component.

2. The Mediation detects the node being blacklisted and according to the configuration, the node is not sent to Elasticsearch.

3. Another node event arrives.

4. The node within the event has a `primaryHierarchy` attribute whose content refers to the blacklisted node above.  

* The PATH field cannot be built because there’s at least one member of the `primaryHierarchy` that cannot be dereferenced

> **Note:** Make sure the live indexing and re-indexing components are pointing to the same blacklist configuration i.e. the same file or different file within the same content, otherwise the runtime filtering applied to nodes will be different depending on which indexing component is executed.