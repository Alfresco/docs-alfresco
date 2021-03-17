---
author: Alfresco Documentation
---

# Mini glossary

Terms and concepts used when developing for Alfresco.

|Term|Description|
|----|-----------|
|Actions|Actions typically work in conjunction with Rules. When creating a rule you specify the action to be carried out when the rule is activated. There are standard actions, but you can also create custom actions. Custom actions are implemented in Java as Spring beans.|
|Aspects|While nodes must be of a single Type, they can have multiple Aspects applied to them. Dublin Core, Taggable, EXIF, Geographic, Emailed are all examples of aspects. Also a single aspect can be applied to multiple types.|
|Associations|Relationships between Types are modeled with Associations. There are two types: Child Associations and Peer Associations.|
|Attributes|Attributes provide a global means of storing key-value data. Whereas properties are attached to a node, attributes are system-wide, and not stored per-node. They can be quickly searched for without the need for an index and are cluster-safe.|
|Auditing|Auditing allows you to track events that occur in Alfresco ECM. The events that you audit are completely configurable.|
|Configuration|Alfresco Platform provides many points at which the configuration of the system can be changed. For example, changes may be made to alfresco-global.properties or many of the other configuration files. In addition, the Share web client is [highly configurable](share-configuring-intro.md).|
|Content|This is the piece of content to be stored in the repository. It could be a Word document, a PDF, a PNG image file, an audio file and so on. Note that the content itself will be stored on the file system, while its corresponding node, containing metadata, will be stored in an RDBMS.|
|Content Model|The content model describes the nodes and the hierarchical relationship between them, as well as any constraints that may exist. For example, nodes that are of container type can contain other nodes.|
|Content Renditions|Renditions are manipulations of content that typically involves some content transformation, followed by some other operation such as crop or resize. For example, you might have a PDF document, which you might convert the first page of to a PNG, and then crop and resize that image to create a thumbnail view of the document. The key service is the Rendition Service.|
|Content Store|The Alfresco repository has multiple content stores. Typically this would include a main content store, an encrypted content store, an archive content store \(for deleted items\), and a version store \(to hold previous versions of documents\). It is also possible for developers to create custom content stores for specific purposes.|
|Content Transformation|Content transformation transforms one format of content into another. There are numerous applications of this, such as converting content into plain text for indexing and generating PDF versions of Word files. Transformations can be chained together, for example DOC to PDF using LibreOffice. Key service is the ContentTransformation Service.|
|Extension|Extensions can be thoughts of as server-side additions to Alfresco. There are two main types of extension: Platform and Share. Each of these extension types are fully described in this documentation, along with all officially supported extension points.|
|Events|Data structures created on various changes within the repository, such as name change of a piece of content. There are three types of Event: 1.  Inbound event - content arriving into a folder
2.  Outbound event - content leaving a folder
3.  Update event - content being modified

|
|Indexing|As content is added to the Alfresco ECM it is indexed by an indexer such as Solr. Solr indexes both meta data and the plain text content of files added. The content model defines the metadata \(aspects, properties, types, associations\) that are to be indexed via the `<tokenise>` element. The indexes can be queried using a variety of query languages, including: -   fts-alfresco
-   storeroot
-   noderef
-   xpath
-   lucene
-   cmis-strict
-   cmis-alfresco
-   db-afts
-   db-cmis

 Queries can be executed from JavaScript and Java code, and also in the Node Browser \(available under Admin Tools in Share\).

|
|Nodes|Each piece of content in the repository has a node associated with it. The node contains information about the content, such as its metadata and location within the content store. The node is stored in a RDBMS such as PostgreSQL, the content itself is stored on the file system.|
|Predefined Content Model|There are pre-defined content models provided out-of-the-box, these include Folder/Document hierarchy, Dublin Core, blogs, Wiki, Sites.|
|Policies|These are event handlers triggered by certain node events for either all nodes or just nodes of a specific type.|
|Metadata|Most content has metadata associated with it. For example, photographs have EXIF metadata. Word documents would have Author, Creation Date, and so on. The metadata provides very useful information for document discovery, without the overhead of having to extract and process the full content of a document.|
|Metadata extraction|Content type \(mimetype\) can automatically be identified for the standard types by Tika. This metadata can be extracted from the content and copied into the content's associated node \(properties\). For custom content types it is possible to create Custom metadata extractors. Key service is the MetadataExtractor Service. You can also create [custom metadata extractors](../references/dev-extension-points-custom-metadata-extractor.md).|
|Mimetypes|The mimetype essentially identifies the type of content. Alfresco is able to automatically identify content types and establish mimetype \(using Tika\). It is also possible to create custom content identification through custom mimetypes.|
|Module|A module is the format in which an *extension* is packaged.|
|Property|Properties are named items of metadata associated with a Type. Each Property is of a specific data type \(such as Text or Date\). Constraints can be applied to restrict the value of a Property.|
|Repository|This is where content is stored, and can be thought of as the content stores and all the related services. It consists of the filesystem or storage service where the content is stored and a database containing metadata. See [Repository Concepts](dev-repository-concepts.md) for an overview.|
|Rules|Declarative definition of processes based on addition, update, or removal of nodes with respect to folders \(think email rules for content\). These are set up for a folder in Share. See documentation and videos on [applying rules to folders](library-folder-rules.md). Note that Rules can be filtered based on conditions/criteria: -   All items \(no filter\)
-   Items with a specific mimetype \(for example .doc, .pdf\)
-   Contained in a category
-   Specific content type applied to a specific aspect file name pattern \(for example \*-context.xml\)

Boolean NOT can be used \(for example not .pdf\). There are no limits to the number of conditions that can be applied to each Rule.

|
|Type|A node is always of a single Type. A Type is similar to a class in Object-Oriented Programming, Types can be inherited from a parent Type in the content model.|

**Parent topic:**[Architecture](../concepts/dev-arch-overview.md)

