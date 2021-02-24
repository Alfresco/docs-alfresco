---
author: Alfresco Documentation
---

# The domain model

CMIS defines a domain model. A client will access a CMIS service endpoint described by a URL. A service endpoint must have at least one repository. A repository, in this case an instance of Alfresco, is a data store which contains content. Each item of content is an object such as a folder, or a document. A repository is identified by its ID, and has a set of capabilities which describe what optional CMIS functionality the repository supports.

Using the CMIS service endpoint in an HTTP Get call will return the endpoint's CMIS service document which describes the CMIS functionality it supports.

Each CMIS object has an ID, type, and a set of properties for that type. There are four base types for a CMIS object :-

-   **Document**

    An item of content. The document may have a content stream, which is the actual file associated with the document. A content stream exists only as part of its containing document object. A content stream has a mimetype associated with it. A document object may contain one or more renditions, which are alternate views of the content. Documents objects are the only objects that are versionable. Each version of a document has its own object ID. All the versions of a document make up a version series and share a version series ID. You can create, read, update and delete documents using CMIS methods.

-   **Folder**

    A container used to organize the document objects. A repository has one root folder. All other folder objects have one parent folder. A folder has a folder path representing its place in the repository's folder hierarchy.

-   **Relationship**

    A relationship between a source object and a target object. Creating, changing and deleting relationships does not change the source or target objects themselves.

-   **Policy**

    An optional repository-specific object that can be applied to controllable objects. The behavior of policies are not modeled by the CMIS specification. A policy object may be applied to multiple controllable objects and a controllable object may have multiple policies applied to it. A policy object can not be deleted if it is currently applied to one or more controllable objects.


**Parent topic:**[Getting Started](../../../pra/1/concepts/cmis-getting-started.md)

