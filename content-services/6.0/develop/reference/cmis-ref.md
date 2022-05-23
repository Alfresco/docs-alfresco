---
title: CMIS API reference
---

CMIS (Content Management Interoperability Services) is a vendor-neutral [OASIS Web services interface specification](https://www.oasis-open.org/committees/tc_home.php?wg_abbrev=cmis){:target="_blank"} 
that enables interoperability between Enterprise Content Management (ECM) systems. CMIS allows rich information to be 
shared across Internet protocols in vendor-neutral formats, among document systems, publishers and repositories, 
in a single enterprise and between companies.

Content Services fully implements both the CMIS 1.0 and 1.1 standards to allow your application to manage content and 
metadata in a repository. This section gives a brief overview of the URL format for CMIS ReST API calls, and explains 
the format of responses. 

You can use basic HTTP methods to invoke CMIS methods, or you can use one of the many language-specific libraries that 
wrap CMIS. One such example for the Java language is the [OpenCMIS Client API](http://chemistry.apache.org/java/developing/guide.html){:target="_blank"} 
provided by the [Apache Chemistry](http://chemistry.apache.org/){:target="_blank"} project. Apache Chemistry provides 
client libraries for many other languages such as Python, PHP, and .NET. The OpenCMIS library is covered in this section. 

You can use methods described by both CMIS [1.0](http://docs.oasis-open.org/cmis/CMIS/v1.0/cmis-spec-v1.0.html){:target="_blank"} 
and [1.1](http://docs.oasis-open.org/cmis/CMIS/v1.1/CMIS-v1.1.html){:target="_blank"} in the same application, although 
in practice it is advisable to write all new applications to the latest 1.1 specification.

* **[CMIS basics](#cmis-basics)**: CMIS is built around a number of concepts. This information provides an overview of those that are shared between all CMIS versions.
* **[Content Services configuration settings](#repoconfigsettings)**: Information about repository configuration related to CMIS.
* **[Getting started with the AtomPub binding (XML)](#atompubbinding)**: CMIS 1.0 introduces the XML based AtomPub binding.
* **[Getting started with the Browser binding (JSON)](#browserbinding)**: CMIS 1.1 introduces a number of new concepts that are supported by Alfresco. You can now use the new browser binding to simplify flows for web applications, use Alfresco aspects, and use the append data support to manage large items of content.
* **[Working with the CMIS API from Java](#opencmisintro)**: Introduction to the OpenCMIS Java library that wraps the CMIS ReST API.

## CMIS basics {#cmis-basics}
CMIS is built around a number of concepts. This information provides an overview of those that are shared between all 
CMIS versions.

* **[CMIS repository](#cmis-repo)**: At the root of the CMIS model and services is a repository, which is an instance of the content management system and its store of metadata, content, and indexes.
* **[CMIS query](#cmis-query)**: A CMIS query is based upon SQL-92. The query is read-only and presents no data manipulation capabilities.
* **[CMIS services](#cmis-services)**: CMIS provides services that you can access using SOAP or AtomPub, depending on your preferred architectural style.
* **[CMIS object model](#cmis-obj-model)**: The CMIS object model is similar to the Alfresco object model without the support of aspects. It supports versioning, policy, document, and folder objects.
* **[CMIS bindings](#cmis-bindings)**: Clients can communicate with a CMIS repository using one of three protocol bindings: AtomPub, SOAP Web Services, and in CMIS 1.1, the Browser bindings. CMIS repositories provide a service endpoint, or URL, for each of these bindings.

### CMIS repository {#cmis-repo}
At the root of the CMIS model and services is a repository, which is an instance of the content management system and 
its store of metadata, content, and indexes.

The repository is the end point to which all requests are directed. In the RESTful model, it is the root path of the 
resources being addressed in CMIS. The repository is capable of describing itself and its capabilities.

### CMIS query {#cmis-query}
A CMIS query is based upon SQL-92. The query is read-only and presents no data manipulation capabilities.

The syntax consists of the following clauses:

* `SELECT` with a target list
* `FROM` with the object types being queried
* `JOIN` to perform a join between object types
* `WHERE` with the predicate
* `IN` and `ANY` to query multi-value properties
* `CONTAINS` to specify a full-text qualification
* `IN_FOLDER` and `IN_TREE` to search within a folder hierarchy
* `ORDERBY` to sort the results

The CMIS query maps the object type into a relational structure where object type approximates a table, the object 
approximates a row, and the property approximates a column that can be multi-valued. You can query the actual binary 
content using a full text query and folder path information using the `in_folder` and `in_tree` functions.

A query can also be paged for user interface presentation.

### CMIS services  {#cmis-services}
CMIS provides services that you can access using SOAP or AtomPub, depending on your preferred architectural style.

CMIS services include the following:

* **Repository services** let you discover available repositories, get the capabilities of these repositories, and provide basic Data Dictionary information of what types are available in the repository.
* **Navigation services** let you navigate the repository by accessing the folder tree and traversing the folder/child hierarchy. You can use these services to get both children and parents of an object.
* **Object services** provide the basic CRUD (Create, Read, Update, Delete) and Control services on any object, including document, folder, policy, and relationship objects. For document objects, this includes setting and getting of properties, policies, and content streams. Object services retrieve objects by path or object ID. Applications may also discover what actions users are allowed to perform.
* **Multi-filing services** let you establish the hierarchy by adding or removing an object to or from a folder.
* **Discovery services** provide Query and Change services, and a means of paging the results of the query.
* **Change services** let you discover what content has changed since the last time checked, as specified by a special token. You can use Change services for external search indexing and replication services.
* **Versioning services** control concurrent operation of the Object services by providing Check In and Check Out services. Version services also provide version histories for objects that are versioned.
* **Relationship services** let you create, manage, and access relationships or associations between objects as well as allow an application to traverse those associations.
* **Policy services** apply policies on document objects. Policies are free-form objects and can be used by implementations for security, record, or control policies.
* **ACL services** let you create, manage, and access Access Control Lists to control who can perform certain operations on an object.

### CMIS object model  {#cmis-obj-model}
The CMIS object model is similar to the Alfresco repository object model without the support for aspects. It supports 
versioning, policy, document, and folder objects.

CMIS supports object types that define properties associated with each type. Each object has an object type, properties 
defined by that object type, and an object ID.

Object types support inheritance and are sub-typed as document object types and folder object types. Document object 
types can have content streams to store and access binary data. Object types can also be related through relationship 
object types.

![CMIS-object-model]({% link content-services/images/cmis-objects.png %}){:width="400" height="300px"}

#### CMIS policy object  
A policy object represents an administrative policy that can be enforced by a repository, such as a retention management 
policy.

An Access Control List (ACL) is a type of policy object. CMIS allows applications to create or apply ACLs. The Alfresco 
repository also uses policy objects to apply aspects.

#### CMIS document object 
Document objects have properties and content streams for accessing the binary information that is the document, 
properties that can be multi-valued, and versions.

Document objects can also have renditions that represent alternate file types of the document. Only one rendition type, 
a thumbnail, is well defined.

![CMIS-properties]({% link content-services/images/cmis-props.png %}){:width="400" height="300px"}

#### CMIS versioning
Versioning in CMIS is relatively simple to encompass the various versioning models of different CMIS implementations.

Each version is a separate object with its own object ID. For a given object ID, you can retrieve the specific version, 
the current version, or all versions of the object, as well as delete specific or all versions of a Document object. 
Document versions are accessed as a set of Document objects organized on the time stamp of the object. CMIS does not 
provide a history graph.

![CMIS-versioning]({% link content-services/images/cmis-versioning.png %}){:width="400" height="300px"}

#### CMIS folder object
Document objects live in a folder hierarchy. As in the Alfresco repository, a folder can exist in another folder to 
create the hierarchy. The relationship between a folder and document is many-to-many if the repository supports 
multi-filing, allowing a document to appear in more than one folder. Otherwise, it is one-to-many relationship.

![CMIS-folder]({% link content-services/images/cmis-folder.png %}){:width="400" height="300px"}

### CMIS bindings {#cmis-bindings}
Clients can communicate with a CMIS repository using one of three protocol bindings: AtomPub, SOAP Web Services, and in 
CMIS 1.1, the Browser bindings. The CMIS repositories provide a service endpoint, or URL, for each of these bindings.

#### AtomPub binding
This RESTful binding is based on the [Atom Publishing Protocol](https://tools.ietf.org/html/rfc5023){:target="_blank"}. 
Clients communicate with the repository by requesting the service document, which is obtained through a well-known URI. 
In Content Services, the service document is at:

```text
http://<hostname>:<port>/alfresco/api/-default-/public/cmis/versions/1.1/atom
```

Response format is XML. 

#### Web service binding
This binding is based on the [SOAP protocol](http://www.w3.org/TR/soap/){:target="_blank"} All services and operations defined in the 
CMIS domain model specification are present in the Web Services binding. You can get a summary of the CMIS services from 
Alfresco from the following URL:

```text
http://<hostname>:<port>/alfresco/cmisws
```

Response format is XML.

#### Browser binding
From version 1.1 of the specification, CMIS provides a simpler [JSON-based](http://tools.ietf.org/html/rfc4627){:target="_blank"} 
binding. The browser binding is designed for web applications, and is easy to use with HTML and JavaScript. It uses just 
two verbs, GET and POST, and resources are referenced using simple and predictable URLs. You can get a summary of the 
repository information from Alfresco from the following URL:

```text
http://<hostname>:<port>/alfresco/api/-default-/public/cmis/versions/1.1/browser
```

Response format is JSON.

## Content Services configuration settings {#repoconfigsettings}
It is possible to configure the way that CMIS requests are processed by adding property settings in the
`alfresco-global.properties` file.

### Change the default file limit
The default limit for the length of a file to upload is 4GB (4096MB).

To change this limit, for example to 5GB (5120MB), add the following property:

```text
opencmis.maxContentSizeMB=5120
```

To ignore the size check, use the following property setting:

```text
opencmis.maxContentSizeMB=-1
```

### Change the memory threshold
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

## Getting started with the AtomPub binding (XML) {#atompubbinding}
To get you started with [CMIS AtomPub binding](http://docs.oasis-open.org/cmis/CMIS/v1.1/errata01/os/CMIS-v1.1-errata01-os-complete.html#x1-3750003){:target="_blank"}, 
review the format of the URL you will use, and what responses to expect.

>**Note:** If you are accessing an on-premise instance, the term **repository** means the same thing in Content Services and CMIS.

### What does a request look like?
You call a method on the CMIS ReST API by issuing an authenticated HTTP request with a URL.

The four HTTP methods are used to support the traditional Create, Read, Update, and Delete (CRUD) operations of
content management when using the AtomPub binding:

* **POST**: is used to create a new entities
* **GET**: is used to retrieve information
* **PUT**: is used to update a single entity
* **DELETE**: is used to delete a single entity

Each request is a URL with a specific format. The format is dependent on the type of target repository.

For an on-premise Content Services repository it looks as follows for the AtomPub binding (CMIS 1.0):

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

### Getting the service document
The capabilities available to your application from an instance of an on-premise Content Services are described in an
[AtomPub service document](http://docs.oasis-open.org/cmis/CMIS/v1.1/errata01/os/CMIS-v1.1-errata01-os-complete.html#x1-4280007){:target="_blank"} 
returned when calling the base URL. The service document contains information on the repository, the CMIS methods that can 
be called on it, and the parameters for those methods.

To retrieve the service document use the HTTP GET method with this URL:

```text
https://localhost:8080/alfresco/api/cmis/versions/1.1/atom/
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
[CMIS specification](http://docs.oasis-open.org/cmis/CMIS/v1.1/errata01/os/CMIS-v1.1-errata01-os-complete.html#x1-1710002){:target="_blank"} 
for more details.

You can add the following **optional** HTTP parameters to the URL:

|Parameter|Default value|Description|
|---------|-------------|-----------|
|filter|Repository specific|A comma-separated list of query names that defines which properties must be returned by the repository.|
|includeAllowableActions|`false`|A boolean value. A value of `true` specifies that the repository must return the allowable actions for the node.|
|includeRelationships|`IncludeRelationships.NONE`|The relationships in which the node participates that must be returned in the response.|
|renditionFilter|`cmis:none`|A filter describing the set of renditions that must be returned in the response.|
|includePolicyIds|`false`|A boolean value. A value of `true` specifies the repository must return the policy ids for the node.|
|includeAcl|`false`|A boolean value. A value of `true` specifies the repository must return the Access Control List (ACL) for the node.|

### Getting the children of a node
You can get the children of a specific node in the repository by using its `id`. The resulting AtomPub XML document
describes children of the node. You can tailor the information returned by providing HTML parameters. You can use this
method to navigate a folder tree in the repository.

Here is an example of a URL to retrieve the children of a specific node in a Content Services on-premise instance:

```text
https://localhost:8080/alfresco/api/-default-/public/cmis/versions/1.1/atom/children?id=5dba1525-44a6-45ed-a42e-4a1a1a3f0539
```

The response body is an AtomPub XML document which describes the child nodes in a standard way. See the
[CMIS specification](http://docs.oasis-open.org/cmis/CMIS/v1.1/errata01/os/CMIS-v1.1-errata01-os-complete.html#x1-2000001){:target="_blank"} 
for more details.

You can add the following optional HTTP parameters to the URL:

|Parameter|Default value|Description|
|---------|-------------|-----------|
|filter|Repository specific|A comma-separated list of query names that defines which properties must be returned by the repository.|
|orderBy|Repository specific|A comma-separated list of query names that defines the order of the results set. Each query name in the list must be followed by the string `ASC` or `DESC` to specify the direction of the order, ascending or descending.|
|includeAllowableActions|`false`|A boolean value. A value of `true` specifies that the repository must return the allowable actions for each node.|
|includeRelationships|`IncludeRelationships.NONE`|The relationships in which each node participates that must be returned in the response.|
|renditionFilter|`cmis:none`|A filter describing the set of renditions that must be returned in the response.|
|includePathSegment|`false`|A boolean value. A value of `true` returns a path segment in the response for each child object that can be used to construct that object's path.|
|maxItems|Repository specific|The maximum number of items to return in the response.|
|skipCount|`0`|The number of objects to skip over before returning any results.|

### Getting the contents of a document
You can get the contents of a specific document in the repository by using its `id`. The format of the URl and the
parameters that you can use are detailed in the service document.

Here is an example of a URL to retrieve the contents of a specific document in a Content Services on-premise instance:

```text
https://localhost:8080/alfresco/api/-default-/public/cmis/versions/1.1/atom/content?id=824ba7cd-dcee-4908-8917-7b6ac0611c97
```

The response body is the content of the document. The format is specific to the type of content, so for example,
getting the contents of a text document returns a text response body.

### Updating the contents of a document
You can replace the contents of a specific document in the repository by using its `id`. The format of the URl and the
parameters that you can use are detailed in the service document.

Here is an example of a URL to update the contents of a specific document in a Content Services on-premise instance:

```text
https://localhost:8080/alfresco/api/-default-/public/cmis/versions/1.1/atom/content?id=824ba7cd-dcee-4908-8917-7b6ac0611c97
```

The request `Content-Type` must be of the same mime-type as the target document. In this example, we are updating a
plain text document.

```text
Content-Type: text/plain; charset=utf-8
```

The request body is the new content of the document.

```text
Some updated text.
```

If the request is successful an `HTTP CREATED` response (status 201) is returned.

## Getting started with the browser binding (JSON) {#browserbinding}
[CMIS 1.1](http://docs.oasis-open.org/cmis/CMIS/v1.1/errata01/os/CMIS-v1.1-errata01-os-complete.html#x1-5360005){:target="_blank"} 
introduces a number of new concepts that are supported by the Alfresco repository. You can now use the new browser binding 
to simplify flows for web applications, use Alfresco aspects, and use the *append data* support to manage large items of content.

In addition to the existing XML-based AtomPub and Web services bindings, CMIS 1.1 provides a simpler JSON-based binding. 
The browser binding is designed for web applications and is easy to use just with HTML and JavaScript. It uses just 
two verbs, GET and POST, and resources are referenced using simple and predictable URLs.

You reference content in the repository by using the two URLs returned by the `getRepositories` or `getRepositoryInfo` 
service:

```text
rootFolderUrl
repositoryUrl
```

Objects can then be referenced in two ways:

1. By their ID: `{rootFolderUrl}?objectId={objectId}`
2. By their path: `{rootFolderUrl}/{object path}`

Content that is independent of a folder, for example a Type definition, can be accessed using the `repositoryUrl` 
service: `{repositoryUrl}?cmisselector={selector}`

### Getting content
You use the HTTP GET command with parameters to retrieve content from a repository.

Use the `cmisselector` parameter to define which content you want returned on a resource. For example if you want the 
children of an object:

```text
cmisselector=children 
```

The URL to get all of the children of the root/test node in the repository looks like this:

```text
http://localhost:8080/alfresco/api/-default-/public/cmis/versions/1.1/browser/root/test?cmisselector=children
```

All content will be returned as JSON by default.

In some cases you might want to request data from a server in a different domain, this is normally prohibited by 
web browsers due to their [same origin policy](https://en.wikipedia.org/wiki/Same_origin_policy){:target="_blank"}. 

CMIS 1.1 uses the `callback` parameter to return [JSONP](https://en.wikipedia.org/wiki/JSONP){:target="_blank"}. 
This format also known as JSON with padding returns JavaScript code. It is evaluated by the JavaScript interpreter, 
not parsed by a JSON parser. You use the `callback` parameter to provide a JavaScript function to cope with the 
returned JSONP. 

For example the following function would write repository information into an HTML page:

```javascript
<script type="text/javascript"> 
  function showRepositoryInfo(repositoryInfo) { 
      for (repId in repositoryInfo) {
          var ri = repositoryInfo[repId];   
          document.write("<h1>Information</h1>"); 
          document.write("<ul>");  
          document.write("<li>ID..."
          + ri.repositoryID+"</li>"); 
          document.write("<li>Name..."
          + ri.productName+"</li>");
          document.write("<li>Description..."
          + ri.productVersion);
          document.write("</li>"); 
          document.write("</ul>"); 
      }
  }
</script> 
```

The following function would invoke the CMIS URL GET with the callback function `showRepositoryInfo`.

```javascript
<script type="text/javascript" 
    src="/alfresco/api/-default-/public/cmis/versions/1.1/browser?callback=showRepositoryInfo">
</script>
```

The JSONP returned would look like this:

```json
  showRepositoryInfo (
    {"-default-":{ 
        ”vendorName":”Alfresco",
        ”productName" : ”Alfresco Enterprise”,
        "productVersion": "4.2.0 (r56201)“
  }
 }
)
```
 
### Creating content
You use the HTTP POST command to create, update, and delete content from a repository. In an application a user would 
use an HTML form in a browser.

You use the `cmisaction` element to control the action. So for example to create a document you would set 
`cmisaction=createDocument`.

You define other CMIS properties as form elements for example: `propertyId[0]… propertyValue[0]`.

You define the content stream for a create or an update using the `file` input form element:

```xml
<input id="content” type="file”
```

The form shows an example of a document create command:

```xml
<form id="cd1" action="http://localhost:8080/alfresco/api/…" method="post">
  <table>
  <tr>
  <td><label for="name">Name:</label></td>
  <td><input name="propertyValue[0]" type="text" id="name”/></td>
  <td><input id="content" name="Browse" type="file" height="70px" size="50"/></td>
  </tr>
  </table>
  <input id="cd" type="submit" value="Create Document"/></td>
  <input name="propertyId[0]" type="hidden" value="cmis:name" />
  <input name="propertyId[1]" type="hidden" value="cmis:objectTypeId" />
  <input name="propertyValue[1]" type="hidden" type="text" id="typeId" value="cmis:document"/> </td>
  <input name="cmisaction" type="hidden" value="createDocument" />
  </form>
```

The form action URL is more specifically put together as follows. To create the document directly under **/Company Home** 
use:

```xml
<form id="cd1" action="http://localhost:8080/alfresco/api/browser/root" method="post">
```

And to store the document in a specific folder specify the folder path as the display path leaving out **/Company Home**:

```xml
<form id="cd1" action="http://localhost:8080/alfresco/api/browser/root/MyFolder" method="post">
```

### Compact JSON return values
The JSON returned on a browser binding call includes type and property definitions, which can be quite large. Your 
application might not need this information. You can use `succinct` to produce more compact responses. `succinct` is 
expressed as a parameter on HTTP GET calls and as a control on HTTP POST calls.

In the following example the `succint` parameter is used on an HTTP GET call to retrieve information on some children 
of the **Presentations** folder in the test site. Specifying `succint` reduces the size of the returned JSON significantly.

```text
http://localhost:8080/alfresco/api/-default-/public/cmis/versions/1.1/browser/root/sites/test/documentLibrary/Presentations?cmisselector=children&succinct=true
```

### Using aspects
Alfresco aspects are exposed as secondary types in CMIS 1.1. You can dynamically add aspects to an Alfresco object 
using the API.

You add an aspect to an object by updating the `cmis:secondaryObjectTypeIds` property with the Type Id of the Aspect. 
You can add and set an aspect in the same call.

`cmis:secondaryObjectTypeIds` is an array of strings, each of which is an aspect type, for example, `dublinCoreAspect`.

### Appending content
In some applications such as journaling, or when using very large files, you want to upload a file in chunks. You might 
have large files that time out during an upload, or fail because of a bad connection. You can use the CMIS 1.1 `append` 
parameter in these situations.

You can use the `isLastChunk` parameter to indicate to the server that the chunked data is complete. The following 
example puts a chunk of data to a specific existing Alfresco object:

```text
http://localhost:8080/alfresco/api/-default-/public/cmis/versions/1.1/atom/content?id=915b2b00-7bf6-40bf-9a28-c780a75fbd68&append=true
```

### CMIS Item support
You can use `cmis:item` to query some Content Services object types, and your own custom types, that are outside the 
CMIS definitions of document, folder, relationship, or policy.

You can find a user, or a set of users, via a CMIS query. For example, the following query will return all information 
for all users:

```text
SELECT * FROM cm:person
```

The following query will return the selected fields for users with names like "smith" and "smithers" all users:

```text
SELECT cm:userName, cm:homeFolder FROM cm:person where cm:userName like 'smi%'
```

## Working with the CMIS API from Java {#opencmisintro}
The [Apache Chemistry](https://chemistry.apache.org){:target="_blank"} project provides a Java API called OpenCMIS that 
wraps the CMIS ReST API. It contains a number of libraries that abstract the CMIS low-level protocol bindings. 
[OpenCMIS](https://chemistry.apache.org/java/opencmis.html){:target="_blank"} is the library used by Java developers. 
It provides an abstraction layer on top of all the CMIS protocol bindings, the AtomPub binding, the Web Service binding, 
and the Browser binding.

To use the OpenCMIS library, we need to first configure it in the Maven POM file's dependency section, open the `pom.xml` 
file in your Maven Java project, and add the following (check that you are using the latest version of the library):

```xml
<project ...
    <dependencies>
        ...
        <!-- Bring in the OpenCMIS library for talking to CMIS servers -->
        <dependency>
            <groupId>org.apache.chemistry.opencmis</groupId>
            <artifactId>chemistry-opencmis-client-impl</artifactId>
            <version>1.1.0</version>
        </dependency>
    </dependencies>
</project> 
```

Before we start working with the repository we must create a session and connect to it. In your CMIS client class, such 
as `CmisClient`, add the following Hash map that will contain active sessions:

```java
public class CmisClient {
    private static Map<String, Session> connections = new ConcurrentHashMap<String, Session>();
    public CmisClient() { }
}
```

The `Session` interface is from the `org.apache.chemistry.opencmis.client.api` package in the OpenCMIS library. 
It represents a session/connection for a specific user with the CMIS repository. A session holds the configuration 
settings and cache settings to use across multiple calls to the repository. The session is also the entry point to 
perform all operations on the repository, such as listing folders, creating documents and folders, finding out the 
capabilities of the repository, and searching.

To create a new connection with the repository, use the Session Factory interface and query it for all the available 
repositories, and then create a new session for one of them. We will create a new `getSession` method in the `CmisClient` 
class to do the job as follows:

```java
public Session getSession(String connectionName, String username, String pwd) {
	Session session = connections.get(connectionName);

	if (session == null) {
		System.out.println("Not connected, creating new connection to" +
				" Alfresco with the connection id (" + connectionName +	")");
			
		// No connection to Alfresco available, create a new one
		SessionFactory sessionFactory =	SessionFactoryImpl.newInstance();
		Map<String, String> parameters = new HashMap<String, String>();
		parameters.put(SessionParameter.USER, username);
		parameters.put(SessionParameter.PASSWORD, pwd);
		parameters.put(SessionParameter.ATOMPUB_URL, "http://localhost:8080/alfresco/api/-default-/cmis/versions/1.1/atom");
		parameters.put(SessionParameter.BINDING_TYPE, BindingType.ATOMPUB.value());
		parameters.put(SessionParameter.COMPRESSION, "true");
		parameters.put(SessionParameter.CACHE_TTL_OBJECTS, "0");
			
		// If there is only one repository exposed (e.g. Alfresco),
		// these lines will help detect it and its ID
		List<Repository> repositories = sessionFactory.getRepositories(parameters);
		Repository alfrescoRepository = null;
		if (repositories != null && repositories.size() > 0) {
			System.out.println("Found (" + repositories.size() + ") Alfresco repositories");
			alfrescoRepository = repositories.get(0);
			System.out.println("Info about the first Alfresco repo [ID=" +
					alfrescoRepository.getId() + "][name=" +
					alfrescoRepository.getName() + "][CMIS ver supported=" +
					alfrescoRepository.getCmisVersionSupported() + "]");
		} else {
			throw new CmisConnectionException("Could not connect to the Alfresco Server, " +
							"no repository found!");
		}
			
		// Create a new session with the Alfresco repository
		session = alfrescoRepository.createSession();
			
		// Save connection for reuse
		connections.put(connectionName, session);
	} else {
		System.out.println("Already connected to Alfresco with the " +
				"connection id (" + connectionName + ")");
	}
		
	return session;
}
```

This method starts off by checking if the Hash map already has a connection available for the connection identifier 
passed in. We don't want to create a new connection for every call that we do to the repository. If there is no connection, 
we will use the `SessionFactoryImpl` class to create a new `SessionFactory` interface, which we can use to get a list of 
repositories for the CMIS server.

A CMIS server can provide more than one repository, so we need to tell the server about which one we want to talk to. 
This is usually done by passing in a repository ID. All OpenCMIS operations require a repository ID parameter. However, 
there is one operation named `getRepositories` that doesn't, so it is used to get a list of the available repositories. 
When the repository information is fetched from the server, we pass in a map of configuration parameters that tells 
OpenCMIS what username and password to use to connect to the CMIS server, what protocol binding to use underneath OpenCMIS, 
and so on.

We are connecting to Content Services, and it only provides one repository, so we can grab the first `Repository` object 
in the repositories list and use it to create a session/connection. The `Repository` object provides information about 
the repository, such as its ID, name, and the version of CMIS it supports. In case of Alfresco, the ID is `-default-`, 
and if running with the older AtomPub URL, it will be a universally unique identifier (UUID) that looks something like 
`f0ebcfb4-ca9f-4991-bda8-9465f4f11527`.

Now add the following code to the `main()` method in your project:

```java
public static void main(String[] args) {
    CmisClient cmisClient = new CmisClient();
    String connectionName = "martinAlf01";
    Session session = cmisClient.getSession(connectionName, "admin", "admin");
}
```

Now that we have a connection/session to the Alfresco server it's time to start calling different CMIS endoints from Java.

One of the first things we might want to do is to get a list of all the content in the top folder in the repository, 
referred to as **/Company Home** in Alfresco. The top folder is referred to as the root folder in CMIS. To get the root 
folder and then a listing of its content, add the following code in a new method named `listTopFolder`:

```java
public void listTopFolder(Session session) {
	Folder root = session.getRootFolder();
	ItemIterable<CmisObject> contentItems= root.getChildren();
	for (CmisObject contentItem : contentItems) {
		if (contentItem instanceof Document) {
			Document docMetadata = (Document)contentItem;
			ContentStream docContent = docMetadata.getContentStream();
				
			System.out.println(docMetadata.getName() + " [size=" +
					docContent.getLength()+"][Mimetype=" +
					docContent.getMimeType()+"][type=" +
					docMetadata.getType().getDisplayName()+"]");
		} else {
			System.out.println(contentItem.getName() + "[type="+contentItem.getType().getDisplayName()+"]");
		}
	}
}
```

Now we probably want to create content. Let's start by creating a folder, which is easy, just get a `Folder` object for 
the parent folder in which you want to create a new folder and then use the `createFolder` method on the parent folder 
object as in the following code:

```java
public Folder createFolder(Session session) {
	String folderName = "OpenCMISTest";
	Folder parentFolder = session.getRootFolder();
	
	// Make sure the user is allowed to create a folder
	// under the root folder
	if (parentFolder.getAllowableActions().getAllowableActions().
			contains(Action.CAN_CREATE_FOLDER) == false) {
		throw new CmisUnauthorizedException(
				"Current user does not have permission to create a " +
				"sub-folder in " + parentFolder.getPath());
	}
		
	// Check if folder already exist, if not create it
	Folder newFolder = (Folder) getObject(session, parentFolder, folderName);
	if (newFolder == null) {
		Map<String, Object> newFolderProps = new HashMap<String, Object>();
		newFolderProps.put(PropertyIds.OBJECT_TYPE_ID, "cmis:folder");
		newFolderProps.put(PropertyIds.NAME, folderName);
		newFolder = parentFolder.createFolder(newFolderProps);
		System.out.println("Created new folder: " + newFolder.getPath() +
				" [creator=" + newFolder.getCreatedBy() + "][created=" +
				date2String(newFolder.getCreationDate().getTime()) + "]");
	} else {
		System.out.println("Folder already exist: " + newFolder.getPath());
	}
	
       return newFolder;
}
```

Here we are creating the new folder under the root folder, which is represented by the **/** path, and is the same as 
**/Company Home** in Alfresco. Before we go ahead and create the folder, we first check if the current user is authorized 
to create a subfolder under the root folder. We can do this by getting the allowed actions on the root folder. 
If they contain the `canCreateFolder` action, we can go ahead and create the folder. If not, then we throw an unauthorized 
runtime exception that will stop execution. This is actually the same exception that will be thrown by the OpenCMIS library 
if we do not check anything before creating the folder with an unauthorized user.

When we know we are allowed to create a folder, we call a custom method named `getObject`, which we will define in a second. 
This method will return a `Folder` object if it can find it, or null if it can't. If the folder was not found, it will be 
created via the `createFolder` method.

The `createFolder` method takes a map of metadata that should be set for the new folder. The name and type of the folder 
are mandatory properties, so this is the minimum metadata we can use to create a folder.

The `createFolder` method returns a new CMIS object that represents the newly created folder, which we can use in future 
methods to create documents in it and to log some information about the new folder.

Before we can run the code, we need to implement the `getObject` method as follows:

```java
private CmisObject getObject(Session session, Folder parentFolder, String objectName) {
	CmisObject object = null;
	try {
		String path2Object = parentFolder.getPath();
		if (!path2Object.endsWith("/")) {
			path2Object += "/";
		}
		path2Object += objectName;
		object = session.getObjectByPath(path2Object);
	} catch (CmisObjectNotFoundException nfe0) {
		// Nothing to do, object does not exist
	}

	return object;
}
```

The `getObject` method is quite useful as it can be used to easily get a CMIS object, such as a `Folder` or
a `Document`.

There is also the `date2String` convenience method that we used to format the date, it's implemented as follows and used 
when printing date properties:

```java
private String date2String(Date date) {
    return new SimpleDateFormat("yyyy-MM-dd HH:mm:ss z").format(date);
}
```

After creating some folders, we probably want to create or upload documents to them. Creating a document, or file if you 
like, is almost the same as creating a folder. However, a document object can also contain content bytes in the form of 
a so-called content stream that represents the physical bytes of the file.

So, to create a document object with content, we first create a content stream object and then use that object when 
creating the document object as follows:

```java
public Document createDocument(Session session, Folder parentFolder)
			throws IOException {
	String documentName = "OpenCMISTest.txt";

	// Make sure the user is allowed to create a document
	// in the passed in folder
	if (parentFolder.getAllowableActions().getAllowableActions().
			contains(Action.CAN_CREATE_DOCUMENT) == false) {
		throw new CmisUnauthorizedException("Current user does not "+
				"have permission to create a document in " +
				parentFolder.getPath());
	}

	// Check if document already exist, if not create it
	Document newDocument = (Document) getObject(session, parentFolder, documentName);
	if (newDocument == null) {
		// Setup document metadata
		Map<String, Object> newDocumentProps =
				new HashMap<String, Object>();
		newDocumentProps.put(PropertyIds.OBJECT_TYPE_ID, "cmis:document");
		newDocumentProps.put(PropertyIds.NAME, documentName);

		// Setup document content
		String mimetype = "text/plain; charset=UTF-8";
		String documentText = "This is a test document!";
		byte[] bytes = documentText.getBytes("UTF-8");
		ByteArrayInputStream input = new ByteArrayInputStream(bytes);
		ContentStream contentStream = session.getObjectFactory().createContentStream(
						documentName, bytes.length, mimetype, input);

		// Create versioned document object
		newDocument = parentFolder.createDocument(
				newDocumentProps, contentStream, VersioningState.MAJOR);
	
       	System.out.println("Created new document: " +
				getDocumentPath(newDocument) + " [version=" +
				newDocument.getVersionLabel() + "][creator=" +
				newDocument.getCreatedBy() + "][created=" +
				date2String(newDocument.getCreationDate().getTime())+"]");
	} else {
		System.out.println("Document already exist: " + getDocumentPath(newDocument));
	}
	
       return newDocument;
}
```

The new document should be created in the **OpenCMISTest** folder. To do this, we feed the folder reference into the 
`createDocument` method as follows:

```java
Folder folder = cmisClient.createFolder(session);
Document document = cmisClient.createDocument(session, folder);
```

The following code implements the custom `getDocumentPath` method used above. It's handy in a lot of situations to get 
the absolute repository path for a document::

```java
private String getDocumentPath(Document document) {
       String path2Doc = getParentFolderPath(document);
       if (!path2Doc.endsWith("/")) {
              path2Doc += "/";
       }
 
       path2Doc += document.getName();
         
       return path2Doc;
}
```

What this method does is call another custom method named `getParentFolderPath` to get the path for the parent folder 
of the document object passed in. When it has this path, it checks if it ends in **/**, if not, it adds **/** 
(if it is the root folder, it will end in slash as it is represented by `/`). To complete the full path for the document, 
it then adds the name of the document to the parent folder path and returns the result. The `getParentFolderPath` method 
is implemented as follows:

```java
private String getParentFolderPath(Document document) {
      Folder parentFolder = getDocumentParentFolder(document);
      return parentFolder == null ? "Un-filed" : parentFolder.getPath();
}
```

This code just calls another custom method named `getDocumentParentFolder` to get the parent `Folder` object for the 
passed in `Document` object. It then checks if it is `null`, which means that the document has not been filed/contained 
in any folder and is in a state called `unfiled`. If we have a parent folder object, we just return the absolute repository 
path for it.

The `getDocumentParentFolder` custom method is implemented as follows:

```java
private Folder getDocumentParentFolder(Document document) {
	// Get all the parent folders (could be more than one if multi-filed)
	List<Folder> parentFolders = document.getParents();
	// Grab the first parent folder
	if (parentFolders.size() > 0) {
		if (parentFolders.size() > 1) {
			System.out.println("The " + document.getName() +
					" has more than one parent folder, it is multi-filed");
		}

		return parentFolders.get(0);
	} else {
		System.out.println("Document " + document.getName() +
				" is un-filed and does not have a parent folder");

		return null;
	}
}
```

A document can have multiple folders as parents (that is, `multifiled`), so we start out by finding out what parents the 
document have by calling `getParents` on it. Then we grab the first parent in the list assuming that most document 
objects will only be filed/contained in one folder. If it is `multifiled`, we print out a message about that. If no 
parent folders could be found for the document, then it is `unfiled` and `null` is returned as the document does not 
have a parent folder.

This was a short introduction to working with OpenCMIS Java CMIS API. There are multiple books covering OpenCMIS and 
if you are going to work extensively with this API get one of those.

If you are wondering about how to work with Alfresco aspects using OpenCMIS see [next section](#workingwithaspects).

### Working with Alfresco aspects from OpenCMIS {#workingwithaspects}
It's possible to work with Alfresco aspects directly via OpenCMIS using CMIS secondary types.

Alfresco has two types of classes that can be used to classify content, types and aspects. A node in Alfresco 
(that is, a CMIS object) can have one and only one type set but zero or more aspects applied.

We can use so-called CMIS secondary types to manage the aspects for an object in Alfresco, as Alfresco exposes any 
aspects that are set on an object as secondary types.

This will work if you are running Alfresco 4.2.e Community, Alfresco 4.2.0 Enterprise, or newer versions. With earlier 
versions, you have to use a special Alfresco OpenCMIS extension to manage aspects.

When we want to manage aspects via CMIS secondary types, we will just use standard OpenCMIS library functions. Secondary 
object types are managed in a specific multivalued property named `cmis:secondaryObjectTypeIds`.

See this [section](#addaspects) for how to add aspects to a CMIS object, such as a folder or document.

See this [section](#removeaspects) for how to remove aspects from a CMIS object.

#### Adding aspects to a document or folder {#addaspects}
Aspects can be applied when creating or updating a document or folder.

To demonstrate how to add an aspect when we are creating an object, we will add one of the out-of-the-box Alfresco 
aspects called Titled (`cm:titled`) when we create a folder. This aspect, or the CMIS secondary type, requires two extra 
properties to be filled in, title and description:

```java
public void createFolderWithTitledAspect(Session session) {
	String folderName = "OpenCMISTestTitled";
	Folder parentFolder = session.getRootFolder();
		
	// Check if folder already exist, if not create it
	Folder newFolder = (Folder) getObject(session, parentFolder, folderName);
	if (newFolder == null) {
		List<Object> aspects = new ArrayList<Object>();
		aspects.add("P:cm:titled");

		Map<String, Object> newFolderProps = new HashMap<String, Object>();
		newFolderProps.put(PropertyIds.OBJECT_TYPE_ID, "cmis:folder");
		newFolderProps.put(PropertyIds.NAME, folderName);
		newFolderProps.put("cmis:secondaryObjectTypeIds", aspects);
		newFolderProps.put("cm:title", "Folder Title");
		newFolderProps.put("cm:description", "Folder Description");

		newFolder = parentFolder.createFolder(newFolderProps);

		System.out.println("Created new folder with Titled aspect: " +
				newFolder.getPath() + " [creator=" + newFolder.getCreatedBy()
				+ "][created=" + date2String(newFolder.getCreationDate().getTime()) + "]");
	} else {
		System.out.println("Cannot create folder, it already exist: " +
				newFolder.getPath());
	}
}
```

For information on how to get a `Session` object, `getObject` method implementation, and `date2String` method, see 
[this section](#opencmisintro).

Here we first check whether the folder we intend to create already exists. If it doesn't, we go ahead and create a list 
of aspects that we want to set for the folder object. In this case, it is just the one aspect called `P:cm:titled` 
(P stands for policy; it's the way Alfresco traditionally exposes aspects, and you still have to use this prefix), 
but the `cmis:secondaryObjectTypeIds` property is a multivalued property, so we need to keep the aspect name in a list.

Then the standard properties map is created where one of the properties is the `cmis:secondaryObjectTypeIds` property, 
keeping the list of aspects. The folder is then created with this map of properties, and the aspect is set for us and 
exposed as a secondary type via CMIS.

If we already have an object and want to add an aspect to it, we can also use the `cmis:secondaryObjectTypeIds` property 
and update it via the `updateProperties` operation. We are going to use another of Alfresco's out-of-the-box aspects 
called Effectivity (`cm:effectivity`). It can be used to set a from date and a to date for an object, representing some 
form of time period when the object is effective. To do this for a document object, do as follows:

```java
public void addAspectToExistingDocument(Document document) {
	String aspectName = "P:cm:effectivity";

	// Make sure we got a document, and then add the aspect to it
	if (document != null) {
		// Check that document don't already got the aspect applied
		List<Object> aspects = document.getProperty("cmis:secondaryObjectTypeIds").getValues();
		if (!aspects.contains(aspectName)) {
			aspects.add(aspectName);

			Map<String, Object> properties = new HashMap<String, Object>();
			properties.put("cmis:secondaryObjectTypeIds", aspects);
			properties.put("cm:from", new Date());
			Calendar toDate = Calendar.getInstance();
			toDate.add(Calendar.MONTH, 2);
			properties.put("cm:to", toDate.getTime());

			Document updatedDocument = (Document) document.updateProperties(properties);
	
       		System.out.println("Added aspect " + aspectName + " to " + getDocumentPath(updatedDocument));
		} else {
			System.out.println("Aspect " + aspectName + " is already applied to " + getDocumentPath(document));
		}
	} else {
		System.out.println("Document is null, cannot add aspect to it!");
	}
}
```

The document object that we want to apply the aspect to is passed to the method. We start by getting currently set 
aspects, so we can see if the `cm:effectivity` aspect is already set. We also need to keep a list of aspects that are 
already set as we need to add them to the aspect list together with the new aspect. If we don't include the aspects 
that are already set, we will basically unset them when we update the properties.

For information on how to implement the `getDocumentPath` method see [this section](#opencmisintro).

#### Removing aspects from a document or folder {#removeaspects}
To remove aspects from an existing object, such as a document or folder, you must first get all aspects and then 
remove the unwanted ones from the list before updating.

If we have a document or folder, and we want to remove an aspect from it, then we can use the `cmis:secondaryObjectTypeIds` 
property and update it via the `updateProperties` operation. Let's take an example where a document has the 
out-of-the-box aspect called Effectivity (`cm:effectivity`) applied, and we want to remove it. To do this for 
a document object, do as follows:

```java
public void removeAspectFromDocument(Document document) {
	String aspectName = "P:cm:effectivity";

	// Make sure we got a document, and then remove the aspect from it
	if (document != null) {
		// Check that document got the aspect applied
		List<Object> aspects = document.getProperty("cmis:secondaryObjectTypeIds").getValues();
		if (aspects.contains(aspectName)) {
			aspects.remove(aspectName);
			Map<String, Object> properties = new HashMap<String, Object>();
			properties.put("cmis:secondaryObjectTypeIds", aspects);
			Document updatedDocument = (Document) document.updateProperties(properties);
			
			System.out.println("Removed aspect " + aspectName + " from " + getDocumentPath(updatedDocument));
		} else {
			System.out.println("Aspect " + aspectName + " is not applied to " + getDocumentPath(document));
		}
	} else {
		System.out.println("Document is null, cannot remove aspect from it!");
	}
}
```

The document object that we want to remove the aspect from is passed into the method. We start by getting currently set 
aspects, so we can make sure that the `cm:effectivity` aspect is indeed set. We need to keep a list of all the aspects 
that are already set, and which we want to keep when updating. There is no method to remove just one aspect, we need to 
set all aspects that we want to keep when we update the properties.

Note that when you remove an aspect in this way, all the associated properties are removed as well automatically, in 
this case `cm:from` and `cm:to`.

For information on how to implement the `getDocumentPath` method see [this section](#opencmisintro).

### Using the CMIS Workbench with Alfresco
The CMIS Workbench is a CMIS desktop client for developers. It is a repository browser and an interactive test bed for 
the OpenCMIS client API.

1.  Download the CMIS workbench zip file from the [Apache Chemistry](http://www.apache.org/dyn/closer.cgi/chemistry/opencmis){:target="_blank"} website.
2.  Unpack the contents of the zip file to a new directory.
3.  Navigate to the directory and run the following command to install the workbench:
    -   Unix: `workbench.sh`
    -   Windows: `workbench.bat`
4.  During the installation:
    1.  In the URL field, enter the Alfresco CMIS URL: `http://localhost:8080/alfresco/api/-default-/cmis/versions/1.1/atom`

        **Note:** This URL has changed since Alfresco One 4.2.1.

        For a Browser binding, use `http://localhost:8080/alfresco/api/-default-/cmis/versions/1.1/browser`.
    2.  Enter the username and password.
    3.  Click **Load Repositories**.
    4.  Click **Login**.
5.  In the CMIS workbench, check that you can connect to the repository by running CMIS functions such as creating, updating, and deleting folders.
