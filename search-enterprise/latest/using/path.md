@@ -0,0 +1,159 @@
---
title: Path queries
---

Setup sequence for new systems
The PATH[1] field indexing is different for reindexing and live indexing components because they rely on different sources of truth: 

RDBMS (reindexing)

Events (live indexing)

The live indexing component populates the PATH[1] field on Elasticsearch documents starting from the primaryHierarchy[2] attribute found in the node event. Here’s an extract of a node event which contains that information: 

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

During the first system bootstrap (new systems only) the initial folder hierarchy is created before the event subsystem is started; that means standard folders like "Company home", "Data dictionary", "Sites" are not going to be picked up by live indexing component. 

As a consequence of that, some members of the primaryHierarchy couldn’t be dereferenced because live indexing component will not have enough information to construct the PATH field for new folders and documents that are created after the initial system start up. 

In order to overcome the scenario above, the recommended setup sequence for new systems that require PATH query functionality is the following:

Startup new content repository.

Perform full reindex

Continue with live indexing.

Nodes / NodeTypes Blacklist
The Live Indexing and Reindexing components rely on a configuration file which acts as a blacklist containing 

The list of node types to be excluded from indexing

The list of node types with content excluded from indexing

The list of property names to be excluded from (metadata) indexing

The blacklist file path / reference can be specified through Spring configuration capabilities. That means:

a property called "alfresco.mediation.filter-file" in the module application.properties

a system property -Dalfresco.mediation.filter-file 

The default value of that property is "classpath:mediation-filter.yml", it points to a file included in the bundle which provides no rules:

mediation:
  nodeTypes:
  contentNodeTypes:
In case some blacklisted entry is configured, there is a possibility to have certain branches of repository without PATH being indexed for any nodes in them. This can happen if due to configuration the nodes in the hierarchy are excluded from the index in modelling, reindex or live index component's configuration. 

If certain nodes are excluded from the search indexing, then their children's PATH will not be able to be constructed even if the children themselves will be indexed (metadata and content). Here’s an example scenario (live indexing):  

a node event is received by the Mediation (part of live indexing component)

the Mediation detects the node within the event as blacklisted, according to configuration; the node is not sent to Elasticsearch 

another node event arrives

the node within the event has a primaryHierarchy attribute whose content refers to the blacklisted node above  

the PATH field cannot be built because there’s at least one member of the primaryHierarchy that cannot be dereferenced

Make sure the live indexing and reindexing components are pointing to the same blacklist configuration (i.e. same file or different file with the same content) otherwise the runtime filtering applied to nodes will be different depending on which indexing component is executed.  

[1] The PATH field is the Elasticsearch field which contains the primaryHierarchy attribute which consists of a list of noderefs.

[2] “primaryHierarchy” captures the primary hierarchy of ancestors of the resource affected, i.e. folder path for content. The first element is the immediate parent   

The fields listed and the corresponding query execution behavior are common to AFTS and the Lucene query languages.

## Type and Aspect Queries

Type and Aspect queries have several things in common and both of them expect a name as the field value, specifically:

* If the value is an unqualified name it will be expanded to a fully qualified name using the default namespace.
* If the value is a prefixed name the prefix is expanded, for example `cm:name => {http://www.alfresco.org/model/content/1.0}content}name`.
* If the value is a fully qualified name then it is used in that form.

**Important:** Prefix and wildcard queries in the namespace part, for example `TYPE:{http://www.*}person` won't work, whereas `TYPE:{http://www.alfresco.org/model/content/1.0}pers*` does work. Descendant expansion in prefix and wildcard queries, for example `TYPE: cm:pers*` will not expand to `cm:person descendants`.

## ALL (Field, Prefix, Range, Wildcard, Fuzzy)

The ALL virtual field (i.e. it is not in the index) expands to all fields defined:

* In `SearchParameters::allAttributes` (the object representation of the corresponding attribute in the ReST API search request) or if they are empty in `DictionaryService::getAllProperties`.

## TEXT (Field, Prefix, Range, Wildcard, Fuzzy)

The TEXT virtual field (i.e. it is not in the index) expands to all fields defined:

* In `SearchParameters::textAttributes` (the object representation of the corresponding attribute in the ReST API Search Request) or if they are empty, the `AlfrescoDefaultTextFields` (i.e. `cm:name`, `cm:title`, `cm:description`, `cm:content`).
This generates a term centric multi-field query:

For example:

```afts
TEXT:(test AND file AND term3 )
```

This query is expanded to:

```afts
(cm:title:test OR cm:name:test OR cm:description:test OR cm:content:test) AND
(cm:title:file OR cm:name:file OR cm:description:file OR cm:content:file) AND
(cm:title:term3 OR cm:name:term3 OR cm:description:term3 OR cm:content:term3)
```

> **Note:** This means that a full query in AND matches documents that contains all the terms in the query, in any of the fields involved.

## DataType (Field, Prefix, Range, Wildcard, Fuzzy)

This query is executed when the field name corresponds to a `datatype` definition using its prefixed or fully qualified form, for example `d:text, {http://www.alfresco.org/model/dictionary/1.0}text)`.

The query produced is a boolean query which includes an optional clause for each property associated to the input `datatype` definition.

## Permission Queries

Fields that are related to ACL information are stored directly as part of the Elasticsearch documents. As a consequence of that, the corresponding queries are plain `term`/ `range` / `prefix` / `fuzzy` queries using the following fields:

* Property (Field, Prefix, Range, Wildcard, Fuzzy)  
* OWNER (Field, Prefix, Wildcard, Fuzzy)
* READER (Field, Prefix, Wildcard, Fuzzy)
* AUTHORITY (Field, Prefix, Wildcard, Fuzzy)
* DENIED (Field, Prefix, Wildcard, Fuzzy)

## ID (Field, Prefix, Wildcard)

The ID (virtual) field maps to an Elasticsearch document id (_id) and it corresponds to the Alfresco node identifier, for example `5fef4b5d-4527-40e5-94fa-1878ef7a54eb`.

## EXISTS (Field)

The query intent can be summarized in “give me all nodes that have a value for the property/field I requested”. This is very similar to the previous one, the difference is that the `NULLPROPERTIES` field is not involved in this scenario.

The value of a clause whose field is `EXISTS` could be:

* An unqualified name will be expanded to a fully qualified name using the default namespace.
* a prefixed name is expanded, for example `cm:name => {http://..}content}name)`.
* a fully qualified name.
* a field name, for example ID, OWNER, READER.

If the value is associated to a property definition then a boolean query is executed that has the following clause:

* `PROPERTIES` (MUST) Otherwise, in case of a field (e.g. OWNER, ID, READER) a wildcard query is built using that field, for example `OWNER:*`.