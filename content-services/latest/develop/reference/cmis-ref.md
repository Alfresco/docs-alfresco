---
title: CMIS API reference
---

The Content Management Interoperability Services (CMIS) is an OASIS standard that is useful when you want to build 
clients and services that work with different types of ECM systems in a standard way.

## Getting Started
To get you started with CMIS, review the format of the URL you will use, and what responses to expect.

>**Note:** If you are accessing an on-premise instance, the term **repository** means the same thing in Content Services and CMIS.

### The domain model
CMIS defines a domain model. A client will access a CMIS service endpoint described by a URL. A service endpoint must 
have at least one repository. A repository, in this case an instance of Content Services, is a data store which contains 
content. Each item of content is an object such as a folder, or a document. A repository is identified by its ID, and has 
a set of capabilities which describe what optional CMIS functionality the repository supports.

Using the CMIS service endpoint in an HTTP Get call will return the endpoint's CMIS service document which describes the 
CMIS functionality it supports.

Each CMIS object has an ID, type, and a set of properties for that type. There are four base types for a CMIS object:

* **Document**: An item of content. The document can have a content stream, which is the actual file associated with the document. A content stream exists only as part of its containing document object. A content stream has a mimetype associated with it. A document object can contain one or more renditions, which are alternate views of the content. Documents objects are the only objects that are versionable. Each version of a document has its own object ID. All the versions of a document make up a version series and share a version series ID. You can create, read, update and delete documents using CMIS methods.
* **Folder**: A container used to organize the document objects. A repository has one root folder. All other folder objects have one parent folder. A folder has a folder path representing its place in the repository's folder hierarchy.
* **Relationship**: A relationship between a source object and a target object. Creating, changing and deleting relationships does not change the source or target objects themselves.
* **Policy**: An optional repository-specific object that can be applied to controllable objects. The behavior of policies are not modeled by the CMIS specification. A policy object can be applied to multiple controllable objects and a controllable object can have multiple policies applied to it. A policy object can not be deleted if it is currently applied to one or more controllable objects.

### What does a request look like?
You call a method on the CMIS ReST API by issuing an authenticated HTTP request with a URL.

The four HTTP methods are used to support the traditional Create, Read, Update, and Delete (CRUD) operations of 
content management:

* **POST**: is used to create a new entities
* **GET**: is used to retrieve information
* **PUT**: is used to update a single entity
* **DELETE**: is used to delete a single entity

#### Request URL format
Each request is a URL with a specific format. The format is dependent on the type of target repository.

For an on-premise Content Services repository it looks as follows.

This is an example of a request URL for CMIS 1.1:

```text
https://localhost:8080/alfresco/api/-default-/public/cmis/versions/1.1/atom/content?id=a99ae2db-0e40-4fb6-bf67-3f331a358cfc
```

This is an example of a request URL for CMIS 1.0:

```text
https://localhost:8080/alfresco/api/-default-/public/cmis/versions/1.0/atom/content?id=a99ae2db-0e40-4fb6-bf67-3f331a358cfc
```

Each request URL is made up of the following elements:

1. The protocol, which can be `http` or `https`.
2. The hostname. This will be the host and port number of your alfresco instance. So if your Alfresco instance is running on the local machine on port 8080 this will be `localhost:8080`.
3. The fixed string `-default-`.
4. The API you want to call. In this case it is the public Alfresco CMIS API identified as `/public/cmis`.
5. `/versions/n`. This specifies the version of the CMIS API you are using. `1.1` or `1.0`.
6. The CMIS binding. Alfresco supports the `atom` binding for the CMIS 1.0 protocol, and both the `atom` and `browser` bindings for the CMIS 1.1 protocol.
7. The CMIS method itself. In this case the request is to get the content of a CMIS document with a specific id.

### CMIS configuration settings
It is possible to configure the way that CMIS requests are processed by adding property settings in the 
`alfresco-global.properties` file.

#### Change the default file limit
The default limit for the length of a file to upload is 4GB (4096MB).

To change this limit, for example to 5GB (5120MB), add the following property:

```text
opencmis.maxContentSizeMB=5120
```

To ignore the size check, use the following property setting:

```text
opencmis.maxContentSizeMB=-1
```

#### Change the memory threshold
The default threshold for memory is 4MB (4096KB). This sets the size threshold for content kept in memory. Documents 
bigger than this threshold will be cached in a temporary directory.

To change threshold, for example to 5MB (5120KB), add the following property:

```text
opencmis.memoryThresholdKB=5120
```

To ignore the memory threshold, use the following property setting:

```text
opencmis.memoryThresholdKB=-1
```

### Getting the service document
The capabilities available to your application from an instance of an on-premise Content Services are described in an 
AtomPub document returned when calling the base URL. The service document contains information on the repository, 
the CMIS methods that can be called on it, and the parameters for those methods.

#### Getting the service document for an on-premise repository
To retrieve the service document use the HTTP GET method with this URL:

```text
https://localhost:8080/alfresco/api/cmis/versions/1.1/atom/
```

The response body is an AtomPub XML document which describes the CMIS capabilities in a standard way.

#### Getting the service document for a specific network
To retrieve the service document for a specific network that the current authenticated user is a member of, use the 
HTTP GET method with a URL that specifies the network. For example this URL returns the service document for 
the `yourcompany.com` network.

```text
https://api.alfresco.com/yourcompany.com/public/cmis/versions/1.1/atom
```

The response body is an AtomPub XML document which describes the CMIS capabilities in a standard way. See the 
[CMIS specification](http://docs.oasis-open.org/cmis/CMIS/v1.1/CMIS-v1.1.html){:target="_blank"} for more details.

### Getting information on a node
You can get information on a specific node in the repository by using its `id`. The resulting AtomPub XML document 
describes the node. You can tailor the information returned by providing HTML parameters.

Here is an example of a URL to retrieve information on a specific node in a Content Services on-premise instance:

```text
https://localhost:8080/alfresco/api/-default-/public/cmis/versions/1.1/atom/id?id=5dba1525-44a6-45ed-a42e-4a155a3f0539
```

The response body is an AtomPub XML document which describes the CMIS capabilities in a standard way. See the 
[CMIS specification](http://docs.oasis-open.org/cmis/CMIS/v1.0/os/cmis-spec-v1.0.html){:target="_blank"} for more details.

You can add the following **optional** HTTP parameters to the URL:

|Parameter|Default value|Description|
|---------|-------------|-----------|
|filter|Repository specific|A comma-separated list of query names that defines which properties must be returned by the repository.|
|includeAllowableActions|false|A boolean value. A value of `true` specifies that the repository must return the allowable actions for the node.|
|includeRelationships|IncludeRelationships.NONE|The relationships in which the node participates that must be returned in the response.|
|renditionFilter|cmis:none|A filter describing the set of renditions that must be returned in the response.|
|includePolicyIds|false|A boolean value. A value of `true` specifies the repository must return the policy ids for the node.|
|includeAcl|false|A boolean value. A value of `true` specifies the repository must return the Access Control List \(ACL\) for the node.|

### Getting the children of a node
### Getting the contents of a document
### Updating the contents of a document

## Working with the CMIS API from Java
### Working with Alfresco aspects from OpenCMIS
### Adding aspects to a document or folder
### Removing aspects from a document or folder
### Using the CMIS Workbench with Alfresco