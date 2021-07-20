---
title: API Reference 
---

This information provides reference materials for the various Alfresco Content Services APIs that are available.

> **Note:** When searches are completed using Solr, totalItems is only a part of the results via ReST, CMIS, JavaScript, and Java. When TMQ searches are used it will not be returned. The only way to force the use of Solr with ReST and JavaScript is to use something in the search that requires Solr. Additionally, the Java API allows you to set Query Consistency.

This information includes API reference guides. For more descriptive material, including tutorials, see the Developer Guide.

-   **[ReST APIs](#rest-apis)**  
The ReST APIs lets you access content in an on-premises repository from your own applications. The APIs are ReSTful, which means each call is an HTTP request, so you don't even need a programming language to try it out. You can just type a URL address in a web browser. There are two types of ReST APIs, the Alfresco ReST API and the standard CMIS ReST API.
-   **[Java API]({% link content-services/5.2/develop/reference/java-foundation-ref.md %})**  
When you need to create new services in Alfresco Content Services, or develop applications or customizations that cannot be implemented at the web script level, it is necessary to write those extensions in Java. Alfresco Content Services provides Java-level APIs, which are documented through the JavaDoc system.
-   **[JavaScript API](#java-api) and the [Repository JavaScript API]({% link content-services/5.2/develop/api-reference.md %}#javascript-apijava-api)**  
The Repository JavaScript API lets you develop JavaScript (ECMAScript) 1.6 compatible files to access, modify, and create repository objects such as nodes, aspects, and properties.
-   **[Search API](#search-api)**  
The Search API provides access to the search features of Alfresco Content Services.
-   **[FreeMarker API](#freemarker-api)**  
FreeMarker templates can be used to generate the view component of the Model-View-Controller (MVC) pattern.
-   **[Web Scripts](#web-scripts)**  
This information provides reference material for web script options, objects, and methods.
-   **[Spring Surf API](#spring-surf-api)**  
The Surf API lets you build user interfaces for your web applications using server-side scripts and templates. This is the full list of the objects and methods that compose the Surf API that can be access from web script JavaScript controllers and FreeMarker templates.

## ReST APIs {#rest-apis}

The ReST APIs lets you access content in an on-premises repository from your own applications. The APIs are ReSTful, which means each call is an HTTP request, so you don't even need a programming language to try it out. You can just type a URL address in a web browser. There are two types of ReST APIs, the Alfresco ReST API and the standard CMIS ReST API.

### Alfresco ReST API

Use the Alfresco ReST API version 1.0 when developing remote clients. The quickest way to get started is to use the [User Guide]({% link content-services/5.2/develop/rest-api-guide/index.md %}#rest-api) with the [ReST API Explorer](#the-rest-api-explorer) as a Reference Guide, based on the [OpenAPI initiative](https://openapis.org/). It gives you full documentation for each endpoint, and a **Try it out!** button so you can use each method.

### CMIS ReST API

Use the [CMIS ReST API](#cmis-rest-api) for use cases that require portability between different ECM systems.

-   **[Alfresco ReST API](#alfresco-rest-api)**  
The ReST API lets you manage Alfresco Content Services-specific features of content in an on-premises repository from your own applications.
-   **[CMIS REST API](#cmis-rest-api)**  
Alfresco fully implements both the CMIS 1.0 and 1.1 standards to allow your application to manage content and metadata in a repository. This section gives a brief overview of the URL format for CMIS REST API calls, and explains the format of responses.

## Alfresco ReST API {#alfresco-rest-api}

The ReST API lets you manage Alfresco Content Services-specific features of content in an on-premises repository from your own applications.

The API gives your application access to folders, files, sites, containers, comments, ratings, tags, and workflow objects. Response and request bodies are all specified with simple JSON. There are two main APIs that you can use, the Alfresco ReST API and the CMIS standard.

-   **[The ReST API Explorer](#the-rest-api-explorer)**  
The ReST API Explorer documents all the API methods available to you, and lets you try those methods out.

## Entity reference {#entity-reference}

This contains a description of each of the Alfresco Content Services entities operated on by the REST API, and a pointer to the REST API Explorer section that describes the methods available on that entity.

## The ReST API Explorer {#the-rest-api-explorer}

The ReST API Explorer documents all the API methods available to you, and lets you try those methods out.

The Alfresco ReST API Explorer is the reference guide for the API. It's based on the [OpenAPI initiative](https://openapis.org/) and gives you interactive documentation for the Alfresco ReST API. You can access our online REST API Explorer at [https://api-explorer.alfresco.com/api-explorer](https://api-explorer.alfresco.com/api-explorer), and if you have the Alfresco SDK you can also run the Explorer on your local machine.

Follow the guidelines on [this page]({% link content-services/5.2/develop/rest-api-guide/install.md %}#installing-and-getting-started-with-the-api-explorer) for information on how to install the API Explorer in a trial or SDK environment.

This screenshot shows what the REST API Explorer looks like:

![]({% link content-services/images/dev-api-by-language-alf-rest-api-explorer-1.png %})

Use the userid admin and password admin if you're are using the online REST API explorer.

To explore the operations on a specific entity, for example **nodes** (i.e. folders and files), just click on it.

Now you can click on each of the available operations and test them on Alfresco.

You can use the API with another user than `admin` by changing the username and password in the upper right corner of the screen

The ReST API consists of a number of parts, the Core API, the Workflow API, the Search API etc. You can switch between the different APIs by clicking on the drop down box, and then selecting the API you want to work with.

## CMIS REST API {#cmis-rest-api}

Alfresco fully implements both the CMIS 1.0 and 1.1 standards to allow your application to manage content and metadata in a repository. This section gives a brief overview of the URL format for CMIS REST API calls, and explains the format of responses.

CMIS (Content Management Interoperability Services) is a vendor-neutral [OASIS Web services interface specification](https://www.oasis-open.org/committees/tc_home.php?wg_abbrev=cmis) that enables interoperability between Enterprise Content Management (ECM) systems. CMIS allows rich information to be shared across Internet protocols in vendor-neutral formats, among document systems, publishers and repositories, in a single enterprise and between companies.

You can use basic HTTP methods to invoke CMIS methods, or you can use one of the many language-specific libraries that wrap CMIS. One such example for the Java language is the [OpenCMIS Client API](http://chemistry.apache.org/java/developing/guide.html) provided by the [Apache Chemistry](http://chemistry.apache.org/) project. Apache Chemistry provides client libraries for many other languages such as Python, PHP, and .NET.

You can use methods described by both CMIS [1.0](http://docs.oasis-open.org/cmis/CMIS/v1.0/cmis-spec-v1.0.html) and [1.1](http://docs.oasis-open.org/cmis/CMIS/v1.1/CMIS-v1.1.html) in the same application, although in practice it is advisable to write all new applications to the latest 1.1 specification.

-   **[CMIS basics](#cmis-basics)**  
CMIS is built around a number of concepts. This information provides an overview of those that are shared between all CMIS versions.
-   **[CMIS 1.1](#cmis-1.1)**  
CMIS 1.1 introduces a number of new concepts that are supported by Alfresco. You can now use the new browser binding to simplify flows for web applications, use Alfresco aspects, and use the append data support to manage large items of content.

## CMIS basics {#cmis-basics}

CMIS is built around a number of concepts. This information provides an overview of those that are shared between all CMIS versions.

-   **[CMIS repository](#cmis-repository)**  
At the root of the CMIS model and services is a repository, which is an instance of the content management system and its store of metadata, content, and indexes.
-   **[CMIS query](#cmis-query)**  
A CMIS query is based upon SQL-92. The query is read-only and presents no data manipulation capabilities.
-   **[CMIS services](#cmis-services)**  
CMIS provides services that you can access using SOAP or AtomPub, depending on your preferred architectural style.
-   **[CMIS object model](#cmis-object-model)**  
The CMIS object model is similar to the Alfresco object model without the support of aspects. It supports versioning, policy, document, and folder objects.
-   **[CMIS bindings](#cmis-bindings)**  
Clients can communicate with a CMIS repository using one of three protocol bindings: AtomPub, SOAP Web Services, and in CMIS 1.1, the Browser binding, which is the recommended binding to use. CMIS repositories provide a service endpoint, or URL, for each of these bindings.

## CMIS repository {#cmis-repository}

At the root of the CMIS model and services is a repository, which is an instance of the content management system and its store of metadata, content, and indexes.

The repository is the end point to which all requests are directed. In the RESTful model, it is the root path of the resources being addressed in CMIS. The repository is capable of describing itself and its capabilities.

Other core concepts include:

-   CMIS object model
-   CMIS query
-   CMIS services

## CMIS query {#cmis-query}

A CMIS query is based upon SQL-92. The query is read-only and presents no data manipulation capabilities.

The syntax consists of the following clauses:

-   `SELECT` with a target list
-   `FROM` with the object types being queried
-   `JOIN` to perform a join between object types
-   `WHERE` with the predicate
-   `IN` and `ANY` to query multi-value properties
-   `CONTAINS` to specify a full-text qualification
-   `IN_FOLDER` and `IN_TREE` to search within a folder hierarchy
-   `ORDERBY` to sort the results

The CMIS query maps the object type into a relational structure where object type approximates a table, the object approximates a row, and the property approximates a column that can be multi-valued. You can query the actual binary content using a full text query and folder path information using the `in_folder` and `in_tree` functions.

A query can also be paged for user interface presentation.

## CMIS services {#cmis-services}

CMIS provides services that you can access using SOAP or AtomPub, depending on your preferred architectural style.

CMIS services include the following:

-   **Repository services** let you discover available repositories, get the capabilities of these repositories, and provide basic Data Dictionary information of what types are available in the repository.
-   **Navigation services** let you navigate the repository by accessing the folder tree and traversing the folder/child hierarchy. You can use these services to get both children and parents of an object.
-   **Object services** provide the basic CRUD (Create, Read, Update, Delete) and Control services on any object, including document, folder, policy, and relationship objects. For document objects, this includes setting and getting of properties, policies, and content streams. Object services retrieve objects by path or object ID. Applications may also discover what actions users are allowed to perform.
-   **Multi-filing services** let you establish the hierarchy by adding or removing an object to or from a folder.
-   **Discovery services** provide Query and Change services, and a means of paging the results of the query.
-   **Change services** let you discover what content has changed since the last time checked, as specified by a special token. You can use Change services for external search indexing and replication services.
-   **Versioning services** control concurrent operation of the Object services by providing Check In and Check Out services. Version services also provide version histories for objects that are versioned.
-   **Relationship services** let you create, manage, and access relationships or associations between objects as well as allow an application to traverse those associations.
-   **Policy services** apply policies on document objects. Policies are free-form objects and can be used by implementations for security, record, or control policies.
-   **ACL services** let you create, manage, and access Access Control Lists to control who can perform certain operations on an object.

## CMIS object model {#cmis-object-model}

The CMIS object model is similar to the Alfresco object model without the support of aspects. It supports versioning, policy, document, and folder objects.

CMIS supports object types that define properties associated with each type. Each object has an object type, properties defined by that object type, and an object ID.

Object types support inheritance and are sub-typed as document object types and folder object types. Document object types can have content streams to store and access binary data. Object types can also be related through relationship object types.

![]({% link content-services/images/cmis-objects.png %})

### CMIS policy object

A policy object represents an administrative policy that can be enforced by a repository, such as a retention management policy.

An Access Control List is a type of policy object. CMIS allows applications to create or apply ACLs. The Alfresco repository also uses policy objects to apply aspects.

### CMIS document object

Document objects have properties and content streams for accessing the binary information that is the document, properties that can be multi-valued, and versions.

Document objects can also have renditions that represent alternate file types of the document. Only one rendition type, a thumbnail, is well defined.

![]({% link content-services/images/cmis-props.png %})

### CMIS versioning

Versioning in CMIS is relatively simple to encompass the various versioning models of different CMIS implementations.

Each version is a separate object with its own object ID. For a given object ID, you can retrieve the specific version, the current version, or all versions of the object, as well as delete specific or all versions of a Document object. Document versions are accessed as a set of Document objects organized on the time stamp of the object. CMIS does not provide a history graph.

![]({% link content-services/images/cmis-versioning.png %})

### CMIS folder object

Document objects live in a folder hierarchy. As in Alfresco, a folder can exist in another folder to create the hierarchy. The relationship between a folder and document is many-to-many if the repository supports multi-filing, allowing a document to appear in more than one folder. Otherwise, it is one-to-many relationship.

![]({% link content-services/images/cmis-folder.png %})

## CMIS bindings {#cmis-bindings}

Clients can communicate with a CMIS repository using one of three protocol bindings: AtomPub, SOAP Web Services, and in CMIS 1.1, the Browser binding, which is the recommended binding to use. CMIS repositories provide a service endpoint, or URL, for each of these bindings.

### AtomPub binding

This RESTful binding is based on the [Atom Publishing Protocol](https://tools.ietf.org/html/rfc5023). Clients communicate with the repository by requesting the service document, which is obtained through a well-known URI. In Alfresco, the service document is at:

```
http://<hostname>:<port>/alfresco/api/-default-/public/cmis/versions/1.1/atom
      
```

### Web service binding

This binding is based on the [SOAP protocol](http://www.w3.org/TR/soap/) All services and operations defined in the CMIS domain model specification are present in the Web Services binding. You can get a summary of the CMIS services from Alfresco from the following URL:

```
http://<hostname>:<port>/alfresco/cmis
      
```

### Browser binding (Recommended)

From version 1.1 of the specification, CMIS provides a simpler [JSON-based](http://tools.ietf.org/html/rfc4627) binding. The [browser binding](#the-browser-binding) is designed for web applications, and is easy to use with HTML and JavaScript. It uses just two verbs, GET and POST, and resources are referenced using simple and predictable URLs. You can get a summary of the repository information from Alfresco from the following URL:

```
http://<hostname>:<port>/alfresco/api/-default-/public/cmis/versions/1.1/browser
      
```

All three bindings are described fully in the [CMIS 1.1 specification](http://docs.oasis-open.org/cmis/CMIS/v1.1/CMIS-v1.1.html).

## CMIS 1.1 {#cmis-1.1}

CMIS 1.1 introduces a number of new concepts that are supported by Alfresco. You can now use the new browser binding to simplify flows for web applications, use Alfresco aspects, and use the append data support to manage large items of content.

-   **[The Browser binding](#the-browser-binding)**  
In addition to the existing XML-based AtomPub and Web services bindings, CMIS 1.1 provides a simpler JSON-based binding. The browser binding is designed for web applications and is easy to use just with HTML and JavaScript. It uses just two verbs, GET and POST, and resources are referenced using simple and predictable URLs.
-   **[Using aspects](#using-aspects)**  
Alfresco aspects are exposed as secondary types in CMIS 1.1. You can dynamically add aspects to an Alfresco object using the API.
-   **[Appending content](#appending-content)**  
In some applications such as journaling, or when using very large files, you want to upload a file in chunks. You might have large files that time out during an upload, or fail because of a bad connection. You can use the CMIS 1.1 `append` parameter in these situations
-   **[cmis:item support](#cmis:item-support)**  
You can use `cmis:item` to query some Alfresco Content Services object types and your own custom types that are outside the CMIS definitions of document, folder, relationship, or policy.

## The Browser binding {#the-browser-binding}

In addition to the existing XML-based AtomPub and Web services bindings, CMIS 1.1 provides a simpler JSON-based binding. The browser binding is designed for web applications and is easy to use just with HTML and JavaScript. It uses just two verbs, GET and POST, and resources are referenced using simple and predictable URLs.

You reference content in the repository by using the two URLs returned by the `getRepositories` or `getRepositoryInfo` service:

```
rootFolderUrl
repositoryUrl
```

Objects can then be referenced in two ways:

1.  by their ID

    ```
    
    <rootFolderUrl>?objectId=<objectId>
    
    ```

2.  by their path

    ```
    
    <rootFolderUrl>/<object path>
    
    ```


Content that is independent of a folder, for example a Type definition be accessed using the repositoryUrl service.

```

<repositoryUrl>?cmisselector=<selector>
```

-   **[Getting content](#getting-content)**  
You use the HTTP GET command with parameters to retrieve content from a repository.
-   **[Creating content](#creating-content)**  
You use the HTTP POST command to create, update, and delete content from a repository. In an application a user would use an HTML form in a browser.
-   **[Compact JSON return values](#compact-json-return-values)**  
 The JSON returned on a browser binding call includes type and property definitions, which can be quite large. Your application might not need this information. You can use `succinct` to produce more compact responses. `succinct` is expressed as a parameter on HTTP GET calls and as a control on HTTP POST calls.

## Getting content {#getting-content}

You use the HTTP GET command with parameters to retrieve content from a repository.

Use the `cmisselector` parameter to define which content you want returned on a resource. For example if you want the children of an object:

```
cmisselector=children 
```

The URL to get all of the children of the root/test node in the repository looks like this:

```

http://localhost:8080/alfresco/api/-default-/public/cmis/versions/1.1/browser/root/test?cmisselector=children

```

All content will be returned as JSON by default.

### returning JSONP

In some cases you might want to request data from a server in a different domain, this is normally prohibited by web browsers due to their [same origin policy](http://en.wikipedia.org/wiki/Same_origin_policy). CMIS 1.1 uses the `callback` parameter to return [JSONP](http://en.wikipedia.org/wiki/JSONP). This format also known as JSON with padding returns JavaScript code. It is evaluated by the JavaScript interpreter, not parsed by a JSON parser. You use the `callback` parameter to provide a JavaScript function to cope with the returned JSONP. For example the following function would write repository information into an HTML page:

```
  <script type="text/javascript"> 
  function showRepositoryInfo(repositoryInfo) { 
  for(repId in repositoryInfo) {
  var ri = repositoryInfo [repId];   
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
 
```

The following function would invoke the CMIS URL GET with the callback function `showRepositoryInfo`.

```
  <script type="text/javascript" 
src="/alfresco/api/-default-/public/cmis/versions/1.1/browser?callback=showRepositoryInfo">
</script>
 
```

The JSONP returned would look like this:

```
  showRepositoryInfo (
{"-default-":{ 
”vendorName":”Alfresco",
”productName" : ”Alfresco Enterprise”,
"productVersion": "4.2.0 (r56201)“
  }
 }
)

 
```

## Creating content {#creating-content}

You use the HTTP POST command to create, update, and delete content from a repository. In an application a user would use an HTML form in a browser.

You use the `cmisaction` element to control the action. So for example to create a document you would set `cmisaction=createDocument`.

You define other CMIS properties as form elements for example: `propertyId[0]… propertyValue[0]`.

You define the content stream for a create or an update using the `file` input form element:

```
<input id="content” type="file”

```

The form shows an example of a document create command:

```
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

The form action URL is more specifically put together as follows. To create the document directly under /Company Home use:

```
<form id="cd1" action="http://localhost:8080/alfresco/api/browser/root" method="post">
```

And to store the document in a specific folder specify the folder path as the display path leaving out /Company Home:

```
<form id="cd1" action="http://localhost:8080/alfresco/api/browser/root/MyFolder" method="post">
```

## Compact JSON return values {#compact-json-return-values}

The JSON returned on a browser binding call includes type and property definitions, which can be quite large. Your application might not need this information. You can use `succinct` to produce more compact responses. `succinct` is expressed as a parameter on HTTP GET calls and as a control on HTTP POST calls.

In the following example the `succint` parameter is used on an HTTP GET call to retrieve information on some children of the Presentations folder in the test site. Specifying `succint` reduces the size of the returned JSON significantly.

```

http://localhost:8080/alfresco/api/-default-/public/cmis/versions/1.1/browser/root/sites/test/documentLibrary/Presentations?cmisselector=children&succinct=true

```

## Using aspects {#using-aspects}

Alfresco aspects are exposed as secondary types in CMIS 1.1. You can dynamically add aspects to an Alfresco object using the API.

You add an aspect to an object by updating the `cmis:secondaryObjectTypeIds` property with the Type Id of the Aspect. You can add and set an aspect in the same call.

`cmis:secondaryObjectTypeIds` is an array of strings, each of which is an aspect type, for example, `dublinCoreAspect`.

## Appending content {#appending-content}

In some applications such as journaling, or when using very large files, you want to upload a file in chunks. You might have large files that time out during an upload, or fail because of a bad connection. You can use the CMIS 1.1 `append` parameter in these situations

You can use the `isLastChunk` parameter to indicate to the server that the chunked data is complete. The following example puts a chunk of data to a specific existing Alfresco object:

```

http://localhost:8080/alfresco/api/-default-/public/cmis/versions/1.1/atom/content?id=915b2b00-7bf6-40bf-9a28-c780a75fbd68&append=true

```

## cmis:item support {#cmis:item-support}

You can use `cmis:item` to query some Alfresco Content Services object types and your own custom types that are outside the CMIS definitions of document, folder, relationship, or policy.

You can find a user or a set of users via a CMIS query. For example, the following query will return all information for all users:

```

SELECT * FROM cm:person

```

The following query will return the selected fields for users with names like "smith" and "smithers" all users:

```

SELECT cm:userName, cm:homeFolder FROM cm:person where cm:userName like 'smi%'

```

## Java API {#java-api}

When you need to create new services in Alfresco Content Services, or develop applications or customizations that cannot be implemented at the web script level, it is necessary to write those extensions in Java. Alfresco Content Services provides Java-level APIs, which are documented through the JavaDoc system.

See the JavaDoc documentation on the [Alfresco Developer Site](http://dev.alfresco.com/resource/docs/java/index.html?overview-summary.html). It is possible to access the complete range of Java APIs, but there is a list of recommended Public Java API calls below. Where possible it is strongly recommended that your application limits itself to this list, so that your application works on future versions of Alfresco Content Services.

-   **[Public Java API services](#public-java-api-services)**  
The Public Java API provides access to Alfresco Content Services through a number of services that are exposed. These services are accessed via a single point of access - the Service Registry. This information provides an overview of the services exposed by the Public Java API.

## Public Java API services {#public-java-api-services}

The Public Java API provides access to Alfresco Content Services through a number of services that are exposed. These services are accessed via a single point of access - the Service Registry. This information provides an overview of the services exposed by the Public Java API.

The following table summarizes the main services available to the developer. These services are available via the [service registry](http://dev.alfresco.com/resource/docs/java/org/alfresco/service/ServiceRegistry.html).

> **Important:** There is a wealth of additional information to be found in the [Public Java API access and transaction management documentation]({% link content-services/5.2/develop/reference/java-foundation-ref.md %}). This documentation also shows you how to obtain the service registry.

|Service|Description|Support Status|
|-------|-----------|--------------|
|[ActionService](#actionservice)|An action represents a unit of work that can be applied to a node. Using the Action Service, actions of specific types can be created.|[Full Support]({% link support/latest/policies/product-lifecycle.md %})|
|[ActivityService](#activityservice)|A service to manage activity feeds.|[Full Support]({% link support/latest/policies/product-lifecycle.md %})|
|[AttributeService](#attributeservice)|This provides services for reading, writing, and querying global attributes.|[Full Support]({% link support/latest/policies/product-lifecycle.md %})|
|[AuditService](#auditservice)|This provides services for querying audit data and enabling and disabling auditing.|[Full Support]({% link support/latest/policies/product-lifecycle.md %})|
|[AuthenticationService](#authenticationservice)|This service provides an API to allow authentication of users using various methods, such as username and password and authentication tickets.|[Full Support]({% link support/latest/policies/product-lifecycle.md %})|
|[AuthorityService](#authorityservice)|This service provides an API to encapsulate authorities granted to users.|[Full Support]({% link support/latest/policies/product-lifecycle.md %})|
|[CategoryService](#categoryservice)|Provides a system for creating and managing categories of nodes.|[Full Support]({% link support/latest/policies/product-lifecycle.md %})|
|[CheckOutCheckInService](#checkoutcheckinservice)|Service to provide document locking. If a document is locked, other users cannot change its content, until it is unlocked.|[Full Support]({% link support/latest/policies/product-lifecycle.md %})|
|[ContentService](#contentservice)|A service for accessing and transforming content.|[Full Support]({% link support/latest/policies/product-lifecycle.md %})|
|[CopyService](#copyservice)|This service provides methods to copy nodes within and across workspaces and to update the state of a node, with that of another node, within and across workspaces.|[Full Support]({% link support/latest/policies/product-lifecycle.md %})|
|[DictionaryService](#dictionaryservice)|This service represents the repository Data Dictionary. The dictionary provides access to content meta-data such as Type and Aspect descriptions. Content meta-data is organized into models where each model is given a qualified name. This means that it is safe to develop independent models and bring them together into the same repository without name clashes (as long their namespace is different).|[Full Support]({% link support/latest/policies/product-lifecycle.md %})|
|[FileFolderService](#filefolderservice)|Provides methods specific to manipulating files and folders. This service provides a simple way of accessing simple trees of files and folders.|[Full Support]({% link support/latest/policies/product-lifecycle.md %})|
|[JobLockService](#joblockservice)|This service ensures that a scheduled job can only run on one node of a cluster at a time. A scheduled job could be, for example, an Activities feed job that generates email to send to everyone every night or a content cleaner job that cleans up orphaned content.|[Full Support]({% link support/latest/policies/product-lifecycle.md %})|
|[LockService](#lockservice)|A low-level locking service, used by the CheckOutCheckIn service. Does not create a working copy.|[Full Support]({% link support/latest/policies/product-lifecycle.md %})|
|[MessageService](#messageservice)|Provides methods to access the locale of the current thread and to get localised strings. These strings may be loaded from resource bundles deployed in the Repository.|[Full Support]({% link support/latest/policies/product-lifecycle.md %})|
|[MimetypeService](#mimetypeservice)|Provides support related to content mimetype. For example, provides methods to retrieve the extension for the specified mimetype.|[Full Support]({% link support/latest/policies/product-lifecycle.md %})|
|[ModuleService](#moduleservice)|A service to control and provide information about the currently-installed modules.|[Full Support]({% link support/latest/policies/product-lifecycle.md %})|
|[NamespaceService](#namespaceservice)|Provides access to and definition of namespace URIs and prefixes.|[Full Support]({% link support/latest/policies/product-lifecycle.md %})|
|[NodeService](#nodeservice)|Provides an API for managing nodes.|[Full Support]({% link support/latest/policies/product-lifecycle.md %})|
|[NodeLocatorService](#nodelocatorservice)|The NodeLocatorService looks up node locators registered via Spring configuration by name.|[Full Support]({% link support/latest/policies/product-lifecycle.md %})|
|[PermissionService](#permissionservice)|Provides an API for managing the node permissions. Permissions specify users and groups that have access to a node. Each user and group can be assigned a role.|[Full Support]({% link support/latest/policies/product-lifecycle.md %})|
|[PersonService](#personservice)|This service encapsulates the management of people and groups. People and groups may be managed entirely in the repository or entirely in some other implementation such as LDAP or via NTLM. Some properties may be in the repository and some in another store. Individual properties may or may not be mutable.|[Full Support]({% link support/latest/policies/product-lifecycle.md %})|
|[RenditionService](#renditionservice)|Provides support for rendering content nodes into other forms, known as renditions. The rendition nodes are derived from their source node and as such can be updated automatically when their source node's content (or other properties) are changed. Examples of renditions include reformatted content (essentially a transformation from one MIME-type to another), rescaled images (including thumbnails), and the output of a Freemarker or XSLT template. Renditions can be performed synchronously or asynchronously and can be created at a specified location within the repository. By default they are created as primary children of their source node but it is possible to have them created at other nodes specified explicitly or as templated paths.|[Full Support]({% link support/latest/policies/product-lifecycle.md %})|
|[RetryingTransactionHelper](#retryingtransactionhelper)|A helper that runs a unit of work inside a UserTransaction, transparently retrying the unit of work if the cause of failure is an optimistic locking or deadlock condition.|[Full Support]({% link support/latest/policies/product-lifecycle.md %})|
|[SearchService](#searchservice)|This encapsulates the execution of search against different indexing mechanisms.|[Full Support]({% link support/latest/policies/product-lifecycle.md %})|
|[SiteService](#siteservice)|Provides an extensive API for managing sites in Alfresco Share.|[Full Support]({% link support/latest/policies/product-lifecycle.md %})|
|[TaggingService](#taggingservice)|It is possible to tag (a text label) any content, including folders. This service provides an API for creating, deleting, and adding tags, and other tag management methods.|[Full Support]({% link support/latest/policies/product-lifecycle.md %})|
|[TemplateService](#templateservice)|Provides an API for executing template engine against a template file and data model. The service provides a configured list of available template engines. The template file can either be in the repository (passed as NodeRef string) or on the classpath. Also a template can be passed directly as a String using the `processTemplateString()` methods. The data model is specified to the template engine. The FreeMarker template engine is used by default.|[Full Support]({% link support/latest/policies/product-lifecycle.md %})|
|[TenantService](#tenantservice)|Provides APIs for the multi-tenancy capability. The service is applicable in both Single Tenancy and Multi Tenancy arrangements.|[Full Support]({% link support/latest/policies/product-lifecycle.md %})|
|[VersionService](#versionservice)|Provides an API for managing the versions of a piece of content.|[Full Support]({% link support/latest/policies/product-lifecycle.md %})|
|[WorkflowService](#workflowservice)|Provides a client-facing API for interacting with workflows and tasks.|[Full Support]({% link support/latest/policies/product-lifecycle.md %})|

-   **[ActionService](#actionservice)**  
An action represents a unit of work that can be applied to a node. Using the Action Service, actions of specific types can be created.
-   **[ActivityService](#activityservice)**  
The ActivityServices is responsible for generating activity feeds for each member of a Share site. The activities generated include such events as a document was added, a document was previewed, the wiki was updated.
-   **[AttributeService](#attributeservice)**  
This provides services for reading, writing, and querying global attributes.
-   **[AuditService](#auditservice)**  
The API by which applications can query the audit logs and enable or disable auditing.
-   **[AuthenticationService](#authenticationservice)**  
This service provides an API to allow authentication of users using various methods, such as username and password and authentication tickets.
-   **[AuthorityService](#authorityservice)**  
The service that encapsulates authorities granted to users. This service will refuse to create any user authorities. These should be managed using the AuthenticationService and PersonService. Methods that try to change alter users will throw an exception. A string key is used to identify the authority. These follow the contract defined in AuthorityType. If there are entities linked to these authorities this key should be used to find them, as userName is used to link user and person.
-   **[CategoryService](#categoryservice)**  
Provides an API for creating and managing categories of nodes.
-   **[CheckOutCheckInService](#checkoutcheckinservice)**  
Service to provide document locking. If a document is locked, other users cannot change its content, until it is unlocked.
-   **[ContentService](#contentservice)**  
A service for accessing and transforming content.
-   **[CopyService](#copyservice)**  
This service provides methods to copy nodes within and across workspaces. It also provides support to update the state of a node, with that of another node, within and across workspaces.
-   **[DictionaryService](#dictionaryservice)**  
This service represents the Repository Data Dictionary. The dictionary provides access to content meta-data such as Type and Aspect descriptions. Content metadata is organized into models where each model is given a qualified name. This means that it is safe to develop independent models and bring them together into the same Repository without name clashes (as long their namespace is different).
-   **[FileFolderService](#filefolderservice)**  
Provides methods specific to manipulating files and folders. This service provides a simple way of accessing simple trees of files and folders in Alfresco.
-   **[JobLockService](#joblockservice)**  
This service ensures that a scheduled job can only run on one node of a cluster at a time. A scheduled job could be, for example, an Activities feed job that generates email to send to everyone every night or a content cleaner job that cleans up orphaned content.
-   **[LockService](#lockservice)**  
A node-level locking service, used by the CheckOutCheckIn service. Does not create a working copy.
-   **[MessageService](#messageservice)**  
Provides methods to access the locale of the current thread and to get localised strings. These strings may be loaded from resource bundles deployed in the repository.
-   **[MimetypeService](#mimetypeservice)**  
Provides support related to content mimetype. For example, provides methods to retrieve the extension for the specified mimetype.
-   **[ModuleService](#moduleservice)**  
A service to control and provide information about the currently-installed modules.
-   **[NamespaceService](#namespaceservice)**  
Provides access to and definition of namespace URIs and Prefixes.
-   **[NodeService](#nodeservice)**  
Provides an API for managing nodes.
-   **[NodeLocatorService](#nodelocatorservice)**  
The NodeLocatorService looks up node locators registered via Spring configuration by name.
-   **[PermissionService](#permissionservice)**  
Provides an API for managing the node permissions. Permissions specify users and groups that have access to a node. Each user and group can be assigned a role.
-   **[PersonService](#personservice)**  
This service encapsulates the management of people and groups. People and groups may be managed entirely in the repository or entirely in some other implementation such as LDAP or via NTLM. Some properties may be in the repository and some in another store. Individual properties may or may not be mutable.
-   **[RenditionService](#renditionservice)**  
Provides support for rendering content nodes into other forms, known as renditions. The rendition nodes are derived from their source node and as such can be updated automatically when their source node's content (or other properties) are changed. Examples of renditions include reformatted content (essentially a transformation from one MIME-type to another), rescaled images (including thumbnails), and the output of a Freemarker or XSLT template. Renditions can be performed synchronously or asynchronously and can be created at a specified location within the repository. By default they are created as primary children of their source node but it is possible to have them created at other nodes specified explicitly or as templated paths.
-   **[RetryingTransactionHelper](#retryingtransactionhelper)**  
A helper that runs a unit of work inside a UserTransaction, transparently retrying the unit of work if the cause of failure is an optimistic locking or deadlock condition.
-   **[SearchService](#searchservice)**  
This encapsulates the execution of search against different indexing mechanisms.
-   **[SiteService](#siteservice)**  
Provides an extensive API for managing sites in Alfresco Share.
-   **[TaggingService](#taggingservice)**  
It is possible to tag (a text label) any content, including folders. This service provides an API for creating, deleting, and adding tags, and other tag management methods.
-   **[TemplateService](#templateservice)**  
Provides an API for executing template engine against a template file and data model. The service provides a configured list of available template engines. The template file can either be in the repository (passed as NodeRef string) or on the classpath. Also a template can be passed directly as a String using the `processTemplateString()` methods. The data model is specified to the template engine. The FreeMarker template engine is used by default.
-   **[TenantService](#tenantservice)**  
Provides APIs for the multi-tenancy capability. The service is applicable in both Single Tenancy and Multi Tenancy arrangements.
-   **[VersionService](#versionservice)**  
Provides an API for managing the versions of a piece of content.
-   **[WorkflowService](#workflowservice)**  
Provides a client-facing API for interacting with workflows and tasks.

## ActionService {#actionservice}

An action represents a unit of work that can be applied to a node. Using the Action Service, actions of specific types can be created.

|Information|ActionService|
|-----------|-------------|
|Support Status|[Full Support]({% link support/latest/policies/product-lifecycle.md %})|
|Architecture Information|[Platform Architecture]({% link content-services/5.2/develop/software-architecture.md %}#platform-architecture)|
|Description|An Action is a unit of work that can be carried out on a node. Actions are commonly used in conjunction with Rules, but that is not mandatory. When you create Rules for a folder, you can specify certain Actions to occur to nodes added to the folder. For example, when a Word document is added to a folder, you may want a PDF to be automatically generated, or a notification email to sent. There are a number of built-in Actions available by default: -   Execute Script
-   Copy
-   Move
-   Checkin
-   Checkout
-   Link to category
-   Add Aspect
-   Remove Aspect
-   Add simple workflow
-   Send email
-   Transform and copy content
-   Transform and copy image
-   Extract common metadata fields
-   Import
-   Specialise type
-   Increment counter
-   Set property value

 You can also create custom Actions to do whatever you want to content added to the folder.

 While Actions are typically triggered by Rules, you can also invoke them directly by selecting them from a menu item. The Action Service also allows you to call them directly from code. Any piece of code that can access the ActionService can invoke the Action, for example:

 -   JavaScript
-   Workflow
-   Web script
-   Java

|
|Deployment - App Server|It is not likely that you will deploy Java extensions directly into a Tomcat application server as classes and Spring context files. Use an SDK build project instead.|
|[Deployment All-in-One SDK project]({% link content-services/5.2/develop/sdk.md %}#getting-started-with-alfresco-content-services-sdk-3).|-   Java source code: aio/platform-jar/src/main/java/{domain specific package path}
-   Spring beans: aio/platform-jar/src/main/resources/alfresco/module/platform-jar/context/service-context.xml

|
|Java API|[Java API Documentation](http://dev.alfresco.com/resource/AlfrescoOne/5.1/PublicAPI/org/alfresco/service/cmr/action/ActionService.html)|
|Java example|```

                  
public void sendEmailWithDoc(String to, String subject, String bodyText, NodeRef docNodeRef) {
    boolean executeAsync = true;
    Map<String, Serializable> aParams = new HashMap<String, Serializable>();
    aParams.put("to", to);
    aParams.put("subject", subject);
    aParams.put("body_text", bodyText);

    Action a = serviceRegistry.getActionService().createAction("send-as-email", aParams);
    if (a != null) {
       serviceRegistry.getActionService().executeAction(a, docNodeRef, true, executeAsync);
    } else {
       throw new RuntimeException("Could not create send-as-email action");
    }
}                  
                  
               
```

|
|More Information|-   [Actions platform extension point documentation]({% link content-services/5.2/develop/repo-ext-points/repo-actions.md %}).
-   [Java API - Access and Transaction Management documentation]({% link content-services/5.2/develop/reference/java-foundation-ref.md %}).

|
|Tutorials|[Jeff Potts Custom Action tutorial](http://ecmarchitect.com/alfresco-developer-series-tutorials/actions/tutorial/tutorial.html)|

## ActivityService {#activityservice}

The ActivityServices is responsible for generating activity feeds for each member of a Share site. The activities generated include such events as a document was added, a document was previewed, the wiki was updated.

|Information|ActivityService|
|-----------|---------------|
|Support Status|[Full Support]({% link support/latest/policies/product-lifecycle.md %})|
|Architecture Information|[Platform Architecture]({% link content-services/5.2/develop/software-architecture.md %}#platform-architecture)|
|Description|What is an activity?

 -   Activity represents an action that has taken place within a client interface (app/tool)
-   Activity is typically initiated by the app/tool/component/service on behalf of a user (it is not necessarily initiated by the underlying repository)
-   Activity is of a given/named type specified by the app/tool (for example document added)
-   Activity is performed at a particular point in time (post date)
-   Activity may have associated data dependent on type of activity
-   Activity may be performed within a given site/network context
-   Activity may be performed within a given app/tool context
-   Activity may be sensitive, that is, associated with data that is permission controlled, therefore, the activity itself may be permission controlled (can or can't be read)
-   Activity may be rendered into one or more UI views (activity summary)

 Activities may be raised by one or more Alfresco Content Services applications. The posted activity must have a uniquely named activity type.

 Examples of activity types include:

 -   Added, updated, and deleted documents
-   Triggered on versioning
-   Includes changes to metadata (explicitly denoted in feed)
-   Does not include updates to tags
-   Uploaded and expanded ZIP
-   Added and deleted folders
-   Added and removed members (person joined/left site)
-   User role changes (change of user role for a site)
-   New comments (on any artifact in a site, including documents, blog entries, and so on.)
-   Workflow-generated activities (requires explicit posting via customizing workflow definition)
-   Added, updated, and deleted events (calendar entries)
-   Published, updated, and deleted wiki pages
-   Published, updated, and deleted blog entries
-   Blog entry published to external blog engine

|
|Deployment - App Server|It is not likely that you will deploy Java extensions directly into a Tomcat application server as classes and Spring context files. Use an SDK build project instead.|
|[Deployment All-in-One SDK project]({% link content-services/5.2/develop/sdk.md %}#getting-started-with-alfresco-content-services-sdk-3).|-   Java source code: aio/platform-jar/src/main/java/{domain specific package path}
-   Spring beans: aio/platform-jar/src/main/resources/alfresco/module/platform-jar/context/service-context.xml

|
|Java API|[Java API Documentation](http://dev.alfresco.com/resource/AlfrescoOne/5.1/PublicAPI/index.html?org/alfresco/service/cmr/activities/ActivityService.html)|
|Tutorials|See the following [blog post](http://alfresco.blog.redpill-linpro.com/2015/11/26/posting-custom-events-to-the-activity-feed/).|

## AttributeService {#attributeservice}

This provides services for reading, writing, and querying global attributes.

|Information|AttributeService|
|-----------|----------------|
|Support Status|[Full Support]({% link support/latest/policies/product-lifecycle.md %})|
|Architecture Information|[Platform Architecture]({% link content-services/5.2/develop/software-architecture.md %}#platform-architecture)|
|Description|The `AttributeService` is used to get and set global, arbitrary attributes. Attributes typically have a key and a value, where the key consists of three segments (known as a key set) and a value. Attributes are stored in the database so they persist over server restarts. An example of use is for persisting system-wide JMX configuration properties in Alfresco Content Services. The `AttributeService` class provides a Java interface for creating and managing attributes, including methods such as:

-   `Serializable getAttribute(Serializable ... keys)` - get an attribute using a list of unique keys
-   `getAttributes(AttributeQueryCallback callback, Serializable ... keys)` - Getting a collection of attributes
-   `Serializable getAttribute(Serializable ... keys)` - Getting a single attribute
-   `setAttribute(Serializable value, Serializable ... keys)` - Set attribute or create attribute if doesn't exist
-   `removeAttribute(Serializable ... keys)` - Removing an attribute
-   `removeAttributes(Serializable ... keys)` - Removing a collection of attributes

Collections of Attributes can be processed on retrieval by implementing a callback handler object. The callback handler object's `handleAttribute` method is invoked for each attribute retrieved.

**Note**. The `AttributeService` is not what you would use to get the attributes (more correctly, "properties") of a node. Use the [NodeService](#nodeservice) class for that.

|
|Deployment - App Server|It is not likely that you will deploy Java extensions directly into a Tomcat application server as classes and Spring context files. Use an SDK build project instead.|
|[Deployment All-in-One SDK project]({% link content-services/5.2/develop/sdk.md %}#getting-started-with-alfresco-content-services-sdk-3).|-   Java source code: aio/platform-jar/src/main/java/{domain specific package path}
-   Spring beans: aio/platform-jar/src/main/resources/alfresco/module/platform-jar/context/service-context.xml

|
|Java API|[Java API Documentation](http://dev.alfresco.com/resource/AlfrescoOne/5.1/PublicAPI/org/alfresco/service/cmr/attributes/AttributeService.html)|
|Java example|The following example shows how you could map a unique document identifier to an Alfresco node reference independtly of nodes: ```
public class DocId2NodeRefMapper {
    /**
     * The Alfresco Service Registry that gives access to all public content services in Alfresco.
     */
    private ServiceRegistry serviceRegistry;

    public void setServiceRegistry(ServiceRegistry serviceRegistry) {
        this.serviceRegistry = serviceRegistry;
    }

    public static final String ROOT_ATTR_PATH = "docId2NodeRefMappings";
    public static final String DOC_ID_ATTR_NAME = "documentId";

    public void mapDocId2NodeRef(String doc_id, NodeRef nodeRef) {
 
        // Check if mapping to node ref is already set up
        if (this.serviceRegistry.getAttributeService().exists(ROOT_ATTR_PATH, DOC_ID_ATTR_NAME, doc_id)) {
 
            // Check to see if this node has already been registered
            if (!this.serviceRegistry.getAttributeService().getAttribute(ROOT_ATTR_PATH, DOC_ID_ATTR_NAME, doc_id).equals(nodeRef)) {
                throw new RuntimeException("Duplicate entry id:" + doc_id);
            }
        }

        // Register node reference under document identifier
        this.serviceRegistry.getAttributeService().setAttribute(nodeRef, ROOT_ATTR_PATH, DOC_ID_ATTR_NAME, doc_id);
    }
}
```

Notice how when you set the attribute value the value is the first parameter of the `setAttribute` method.

| |
|More Information|-   [Tech Talk Live video](https://www.youtube.com/watch?v=obQ_89MFtRs)
-   [AttributeService Primer video](https://vimeo.com/67580571)
-   [Java API - Access and Transaction Management documentation]({% link content-services/5.2/develop/reference/java-foundation-ref.md %}).

|

## AuditService {#auditService}

The API by which applications can query the audit logs and enable or disable auditing.

|Information|AuditService|
|-----------|------------|
|Support Status|[Full Support]({% link support/latest/policies/product-lifecycle.md %})|
|Architecture Information|[Platform Architecture]({% link content-services/5.2/develop/software-architecture.md %}#platform-architecture)|
|Description|The AuditService API provides faciities to query audit data. There are also methods to clear audit data, enable and disable auditing, and check auditing status.|
|Deployment - App Server|It is not likely that you will deploy Java extensions directly into a Tomcat application server as classes and Spring context files. Use an SDK build project instead.|
|[Deployment All-in-One SDK project]({% link content-services/5.2/develop/sdk.md %}#getting-started-with-alfresco-content-services-sdk-3).|-   Java source code: aio/platform-jar/src/main/java/{domain specific package path}
-   Spring beans: aio/platform-jar/src/main/resources/alfresco/module/platform-jar/context/service-context.xml

|
|Java API|[Java API Documentation](http://dev.alfresco.com/resource/docs/java/org/alfresco/service/cmr/audit/AuditService.html)|
|Java example|```

                  
    /**
     * Returns content changes.
     */
    public ObjectList getContentChanges(Holder<String> changeLogToken, BigInteger maxItems)
    {
        final ObjectListImpl result = new ObjectListImpl();
        result.setObjects(new ArrayList<ObjectData>());

        EntryIdCallback changeLogCollectingCallback = new EntryIdCallback(true)
        {
            @Override
            public boolean handleAuditEntry(Long entryId, String user, long time, Map<String, Serializable> values)
            {
                result.getObjects().addAll(createChangeEvents(time, values));
                return super.handleAuditEntry(entryId, user, time, values);
            }
        };

        Long from = null;
        if ((changeLogToken != null) && (changeLogToken.getValue() != null))
        {
            try
            {
                from = Long.parseLong(changeLogToken.getValue());
            }
            catch (NumberFormatException e)
            {
                throw new CmisInvalidArgumentException("Invalid change log token: " + changeLogToken);
            }
        }

        AuditQueryParameters params = new AuditQueryParameters();
        params.setApplicationName(CMIS_CHANGELOG_AUDIT_APPLICATION);
        params.setForward(true);
        params.setFromId(from);

        int maxResults = (maxItems == null ? 0 : maxItems.intValue());
        maxResults = (maxResults < 1 ? 0 : maxResults + 1);

        auditService.auditQuery(changeLogCollectingCallback, params, maxResults);

        String newChangeLogToken = null;
        if (maxResults > 0)
        {
            if (result.getObjects().size() >= maxResults)
            {
            	StringBuilder clt = new StringBuilder();
                newChangeLogToken = (from == null ? clt.append(maxItems.intValue() + 1).toString() : clt.append(from.longValue() + maxItems.intValue()).toString());
                result.getObjects().remove(result.getObjects().size() - 1).getId();
                result.setHasMoreItems(true);
            }
            else
            {
                result.setHasMoreItems(false);
            }
        }

        if (changeLogToken != null)
        {
            changeLogToken.setValue(newChangeLogToken);
        }

        return result;
    }
                  
                  
               
```

|
|More Information|-   [Audit platform extension point documentation]({% link content-services/5.2/develop/repo-ext-points/audit-log.md %}#audit-log).
-   [Auditing]({% link content-services/5.2/admin/audit.md %}#auditing) provides a detailed overview of auditing.

|
|Tutorials|-   [Audit API Hints and Tricks](https://www.youtube.com/watch?v=_aP_JYTwZ6Y) DevCon presentation by Mehdi Belmekki.
-   [Audit and Reporting with Alfresco and NoSQL by Zaizi](http://www.slideshare.net/zaiziltd/scale-audit-reporting-with-a-nosql-architecture)
-   [Audit tutorials]({% link content-services/5.2/admin/audit.md %}#auditing-tutorials)

|

## AuthenticationService {#authenticationservice}

This service provides an API to allow authentication of users using various methods, such as username and password and authentication tickets.

|Information|AuthenticationService|
|-----------|---------------------|
|Support Status|[Full Support]({% link support/latest/policies/product-lifecycle.md %})|
|Architecture Information|[Platform Architecture]({% link content-services/5.2/develop/software-architecture.md %}#platform-architecture)|
|Description|Authentication is required at various access points into the repository. For example web scripts, CMIS, CIFS, FTP, WebDAV, and web clients represent access points where authentication needs to take place. Authentication can be via a ticket, a username and password pair, or some other mechanism. The authentication service provides an API to:

-   Authenticate using a user name and password
-   Authenticate using a ticket
-   Create, update and delete authentication information
-   Clear the current authentication
-   Invalidate a ticket
-   Get the username for who is currently authenticated
-   Get a ticket for subsequent re-authentication
-   Determine if the current user is "the system user"

Not all implementations will support creating, updating and deleting authentication information.

The authenticated username is used as the key to obtain other security information such as group membership, the details about the person, to record a user as the owner of an object. It is one of the identifiers against which permissions may be assigned.

The authentication service does not provide any details about a user other than authentication.

The authentication service stores authentication information on the calling thread. Application developers should ensure that this information is cleared.

 The authentication service brings together three components:

 -   The authentication component
-   The authentication DAO
-   The ticket component

 The authentication component supports authentication only. The authentication DAO provides an API to create, delete and update authentication information. The ticket component is resposible for managing and storing tickets that may be obtained after authentication and used in place of authentication.

|
|Deployment - App Server|It is not likely that you will deploy Java extensions directly into a Tomcat application server as classes and Spring context files. Use an SDK build project instead.|
|[Deployment All-in-One SDK project]({% link content-services/5.2/develop/sdk.md %}#getting-started-with-alfresco-content-services-sdk-3).|-   Java source code: aio/platform-jar/src/main/java/{domain specific package path}
-   Spring beans: aio/platform-jar/src/main/resources/alfresco/module/platform-jar/context/service-context.xml

|
|Java API|[Java API documentation](http://dev.alfresco.com/resource/AlfrescoOne/5.1/PublicAPI/org/alfresco/service/cmr/security/AuthenticationService.html)|
|Java example|```

                  

// Get service registry
ServiceRegistry serviceRegistry = (ServiceRegistry) beanFactory.getBean(ServiceRegistry.SERVICE_REGISTRY);

// Get services
AuthenticationService authService = (AuthenticationService)serviceRegistry.getAuthenticationService();
PersonService personService = (PersonService)serviceRegistry.getPersonService();

// Get current user
NodeRef person = personService.getPerson(authService.getCurrentUserName());


               
```

|
|More Information|-   [Authentication service documentation]({% link content-services/5.2/admin/security.md %}#authentication-service)
-   [AuthorityService JavaScript API documentation](#authority-service)
-   [Java API - Access and Transaction Management documentation]({% link content-services/5.2/develop/reference/java-foundation-ref.md %}).

|

## AuthorityService {#}authorityService

The service that encapsulates authorities granted to users. This service will refuse to create any user authorities. These should be managed using the AuthenticationService and PersonService. Methods that try to change alter users will throw an exception. A string key is used to identify the authority. These follow the contract defined in AuthorityType. If there are entities linked to these authorities this key should be used to find them, as userName is used to link user and person.

|Information|AuthorityService|
|-----------|----------------|
|Support Status|[Full Support]({% link support/latest/policies/product-lifecycle.md %})|
|Architecture Information|[Platform Architecture]({% link content-services/5.2/develop/software-architecture.md %}#platform-architecture)|
|Description|Authority is a general term to describe a group, user, or role. The AuthorityService provides an API to: -   Add and delete authorities.
-   Get authorities.
-   Retrieve authority details such as short name.

|
|Deployment - App Server|It is not likely that you will deploy Java extensions directly into a Tomcat application server as classes and Spring context files. Use an SDK build project instead.|
|[Deployment All-in-One SDK project]({% link content-services/5.2/develop/sdk.md %}#getting-started-with-alfresco-content-services-sdk-3).|-   Java source code: aio/platform-jar/src/main/java/{domain specific package path}
-   Spring beans: aio/platform-jar/src/main/resources/alfresco/module/platform-jar/context/service-context.xml

|
|Java API|[Java API documentation](http://dev.alfresco.com/resource/AlfrescoOne/5.1/PublicAPI/org/alfresco/service/cmr/security/AuthorityService.html)|
|Java example|```


    /**
     * Search the root groups, those without a parent group.
     * 
     * @param paging Paging object with max number to return, and items to skip
     * @param sortBy What to sort on (authorityName, shortName or displayName)
     * @return The root groups (empty if there are no root groups)
     */
    public ScriptGroup[] searchRootGroupsInZone(String displayNamePattern, String zone, ScriptPagingDetails paging, String sortBy)
    {
        Set<String> authorities;
        try 
        {
            authorities = authorityService.findAuthorities(AuthorityType.GROUP,
                    null, true, displayNamePattern, zone);
        }
        catch (UnknownAuthorityException e)
        {
            authorities = Collections.emptySet();
        }
        return makeScriptGroups(authorities, paging, sortBy, serviceRegistry, this.getScope());
    }
                 
               
```

|
|More Information|-   [Authentication service documentation]({% link content-services/5.2/admin/security.md %}#authentication-service)
-   [AuthorityService JavaScript API documentation](#authority-service)
-   [Java API - Access and Transaction Management documentation]({% link content-services/5.2/develop/reference/java-foundation-ref.md %}).

|

## CategoryService {#categoryService}

Provides an API for creating and managing categories of nodes.

|Information|CategoryService|
|-----------|---------------|
|Support Status|[Full Support]({% link support/latest/policies/product-lifecycle.md %})|
|Architecture Information|[Platform Architecture]({% link content-services/5.2/develop/software-architecture.md %}#platform-architecture)|
|Description|Categories provide a system for organizing content. Unlike tags, which have no hierarchical structure, and which can be created and applied by anyone, categories are created by the Administrator, and are hierarchical in nature. For example, You might have a Europe category, and then sub-categories such as France, Germany, Spain, and so on. The top Category in the hierarchical structure is known as the Root Category. The CategoryService API provides methods to perform actions such as the following:

 -   Create a Category
-   Create a root Category
-   Delete a Category
-   Create a Classification (a grouping of Categories)
-   Delete a Classification
-   Get most popular Categories

|
|Deployment - App Server|It is not likely that you will deploy Java extensions directly into a Tomcat application server as classes and Spring context files. Use an SDK build project instead.|
|[Deployment All-in-One SDK project]({% link content-services/5.2/develop/sdk.md %}#getting-started-with-alfresco-content-services-sdk-3).|-   Java source code: aio/platform-jar/src/main/java/{domain specific package path}
-   Spring beans: aio/platform-jar/src/main/resources/alfresco/module/platform-jar/context/service-context.xml

|
|Java API|[Java API documentation](http://dev.alfresco.com/resource/AlfrescoOne/5.1/PublicAPI/org/alfresco/service/cmr/search/CategoryService.html)|
|Java example|```

                  
// To create a root category:
NodeRef newRootCat = categoryService.createRootCategory(
      spacesStore, 
      ContentModel.ASPECT_GEN_CLASSIFIABLE, 
      "newRootCat");

// To create a category
NodeRef newCategory = categoryService.createCategory(newRootCat, "newCategory");

               
```

|
|More Information|-   [Tagging and Categorizing Content]({% link content-services/5.2/using/content/manage.md %}#tagging-and-categorizing-content)
-   [Category Manager documentation]({% link content-services/5.2/admin/share-admin-tools.md %}#category-manager)
-   [Java API - Access and Transaction Management documentation]({% link content-services/5.2/develop/reference/java-foundation-ref.md %}).

|

## CheckOutCheckInService {#checkoutcheckinservice}

Service to provide document locking. If a document is locked, other users cannot change its content, until it is unlocked.

|Information|CheckOutCheckInService|
|-----------|----------------------|
|Support Status|[Full Support]({% link support/latest/policies/product-lifecycle.md %})|
|Architecture Information|[Platform Architecture]({% link content-services/5.2/develop/software-architecture.md %}#platform-architecture)|
|Description|Check out locks the item and creates a working copy that can be edited. The locked item can be viewed by others, but not changed. When the item is checked in, the working copy replaces the original item and removes the lock. Methods are provided to: -   Check out a node
-   Check in a node
-   Check if a node is a working copy
-   Check if a node is locked (checked out)
-   Cancel a check out for a given working copy
-   Get a working copy
-   Get the original checked out node

|
|Deployment - App Server|It is not likely that you will deploy Java extensions directly into a Tomcat application server as classes and Spring context files. Use an SDK build project instead.|
|[Deployment All-in-One SDK project]({% link content-services/5.2/develop/sdk.md %}#getting-started-with-alfresco-content-services-sdk-3).|-   Java source code: aio/platform-jar/src/main/java/{domain specific package path}
-   Spring beans: aio/platform-jar/src/main/resources/alfresco/module/platform-jar/context/service-context.xml

|
|Java API|[Java API documentation](http://dev.alfresco.com/resource/AlfrescoOne/5.1/PublicAPI/org/alfresco/service/cmr/coci/CheckOutCheckInService.html)|
|Java example|```

                  
CheckOutCheckInService checkOutCheckInService = serviceRegistry.getCheckOutCheckInService();

NodeRef checkedOutCopy = checkOutCheckInService.checkout(nodeRef);


               
```

|
|More Information|-   [Java API - Access and Transaction Management documentation]({% link content-services/5.2/develop/reference/java-foundation-ref.md %}).

|

## ContentService {#contentService}

A service for accessing and transforming content.

|Information|ContentService|
|-----------|--------------|
|Support Status|[Full Support]({% link support/latest/policies/product-lifecycle.md %})|
|Architecture Information|[Platform Architecture]({% link content-services/5.2/develop/software-architecture.md %}#platform-architecture)|
|Description|The ContentService provides an API for accessing and transforming content. You may want to read the content associated with a node, or transform the content from one format to another, for example from .ppt to .pdf. Methods provided by the API includes functionality to: -   Get obtainable transformers (to convert one mimetype to another)
-   Get a suitable reader for a content type. The returned ContentReader will have a getContent method to actually read the content to a specified file.
-   Get a suitable writer for a content type. The returned ContentWriter will have a putContent method to write the content to a specified file.
-   Transform content from one mimetype to another.
-   Get a transformer suitable for transforming images.
-   Utility methods (for example to check size of content and free space in the content store).

|
|Deployment - App Server|It is not likely that you will deploy Java extensions directly into a Tomcat application server as classes and Spring context files. Use an SDK build project instead.|
|[Deployment All-in-One SDK project]({% link content-services/5.2/develop/sdk.md %}#getting-started-with-alfresco-content-services-sdk-3).|-   Java source code: aio/platform-jar/src/main/java/{domain specific package path}
-   Spring beans: aio/platform-jar/src/main/resources/alfresco/module/platform-jar/context/service-context.xml

|
|Java API|[Java API documentation](http://dev.alfresco.com/resource/AlfrescoOne/5.1/PublicAPI/org/alfresco/service/cmr/repository/ContentService.html)|
|Java example|```

                  
// Read data associated with a content NodeRef (plain text)

ContentReader reader = contentService.getReader(nodeRef, ContentModel.PROP_CONTENT);

// Reading the data content of a NodeRef (binary)

ContentReader reader = contentService.getReader(nodeRef, ContentModel.PROP_CONTENT);
InputStream originalInputStream = reader.getContentInputStream();
ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
final int BUF_SIZE = 1 << 8; //1KiB buffer
byte[] buffer = new byte[BUF_SIZE];
int bytesRead = -1;
while((bytesRead = originalInputStream.read(buffer)) > -1) {
 outputStream.write(buffer, 0, bytesRead);
}
originalInputStream.close();
byte[] binaryData = outputStream.toByteArray();

// Writing data to a node's content

ContentWriter writer = contentService.getWriter(nodeRef, ContentModel.PROP_CONTENT, true);
writer.putContent(new ByteArrayInputStream(content));

// Writing a file's data to a node's content

ContentWriter writer = contentService.getWriter(nodeRef, ContentModel.PROP_CONTENT, true);
writer.setLocale(CONTENT_LOCALE);
File file = new File("c:/temp/images/BigCheese1.bmp");
writer.setMimetype("image/bmp");
writer.putContent(file);

// Transforming a PPT to PDF (also works for other file formats)

ContentReader pptReader = contentService.getReader(pptNodeRef, ContentModel.PROP_CONTENT);
ContentWriter pdfWriter = contentService.getWriter(pdfNodeRef, ContentModel.PROP_CONTENT, true);
ContentTransformer pptToPdfTransformer =
    contentService.getTransformer(MimetypeMap.MIMETYPE_PPT, MimetypeMap.MIMETYPE_PDF);
pptToPdfTransformer.transform(pptReader, pdfWriter);

/**
 * Creates a new content node setting the content provided.
 *
 * @param  parent   the parent node reference
 * @param  name     the name of the newly created content object
 * @param  text     the content text to be set on the newly created node
 * @return NodeRef  node reference to the newly created content node
 */
 
private NodeRef createContentNode(NodeRef parent, String name, String text)
{

    // Create a map to contain the values of the properties of the node
        
    Map<QName, Serializable> props = new HashMap<QName, Serializable>(1);
    props.put(ContentModel.PROP_NAME, name);  

    // use the node service to create a new node
    NodeRef node = this.nodeService.createNode(
                        parent, 
                        ContentModel.ASSOC_CONTAINS, 
                        QName.createQName(NamespaceService.CONTENT_MODEL_1_0_URI, name),
                        ContentModel.TYPE_CONTENT, 
                        props).getChildRef();
                        
    // Use the content service to set the content onto the newly created node
    ContentWriter writer = this.contentService.getWriter(node, ContentModel.PROP_CONTENT, true);
    writer.setMimetype(MimetypeMap.MIMETYPE_TEXT_PLAIN);
    writer.setEncoding("UTF-8");
    writer.putContent(text);
    
    // Return a node reference to the newly created node
    return node;
} 


               
```

|
|More Information|-   [Java API - Access and Transaction Management documentation]({% link content-services/5.2/develop/reference/java-foundation-ref.md %}).

|

## CopyService {#copyService}

This service provides methods to copy nodes within and across workspaces. It also provides support to update the state of a node, with that of another node, within and across workspaces.

|Information|CopyService|
|-----------|-----------|
|Support Status|[Full Support]({% link support/latest/policies/product-lifecycle.md %})|
|Architecture Information|[Platform Architecture]({% link content-services/5.2/develop/software-architecture.md %}#platform-architecture)|
|Description|It is very useful to able to copy nodes. When copying container nodes (folders) you also have the option to copy child nodes. Operations provided by the service include: -   Copy a node, along with (optionally) its children.
-   Copy and rename a node.
-   Get the copies of a specified node (with paged results).
-   Check if the name of a top-level node will be changed during copy, due to policies in place.
-   Given the copied node, obtain the original node.

 Copies can be performed across workspaces.

|
|Deployment - App Server|It is not likely that you will deploy Java extensions directly into a Tomcat application server as classes and Spring context files. Use an SDK build project instead.|
|[Deployment All-in-One SDK project]({% link content-services/5.2/develop/sdk.md %}#getting-started-with-alfresco-content-services-sdk-3).|-   Java source code: aio/platform-jar/src/main/java/{domain specific package path}
-   Spring beans: aio/platform-jar/src/main/resources/alfresco/module/platform-jar/context/service-context.xml

|
|Java API|[Java API documentation](http://dev.alfresco.com/resource/AlfrescoOne/5.1/PublicAPI/org/alfresco/service/cmr/repository/CopyService.html)|
|Java example|```

                  
/*
 * Copyright (C) 2005-2014 Alfresco Software Limited.
 *
 * This file is part of Alfresco
 *
 * Alfresco is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Lesser General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * Alfresco is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public License
 * along with Alfresco. If not, see <http://www.gnu.org/licenses/>.
 */
/**
 * 
 */
package org.alfresco.repo.action.executer;

import java.util.List;
import java.util.Set;

import org.alfresco.model.ContentModel;
import org.alfresco.query.PagingRequest;
import org.alfresco.query.PagingResults;
import org.alfresco.repo.action.ParameterDefinitionImpl;
import org.alfresco.service.cmr.action.Action;
import org.alfresco.service.cmr.action.ParameterDefinition;
import org.alfresco.service.cmr.coci.CheckOutCheckInService;
import org.alfresco.service.cmr.dictionary.DataTypeDefinition;
import org.alfresco.service.cmr.repository.ChildAssociationRef;
import org.alfresco.service.cmr.repository.CopyService;
import org.alfresco.service.cmr.repository.CopyService.CopyInfo;
import org.alfresco.service.cmr.repository.NodeRef;
import org.alfresco.service.cmr.repository.NodeService;
import org.alfresco.service.cmr.rule.RuleServiceException;
import org.alfresco.service.namespace.QName;

/**
 * Copy action executor.
 * <p>
 * Copies the actioned upon node to a specified location.
 * 
 * @author Roy Wetherall
 */
public class CopyActionExecuter extends ActionExecuterAbstractBase
{
    public static final String ERR_OVERWRITE = "Unable to overwrite copy because more than one have been found.";
    
    public static final String NAME = "copy";
    public static final String PARAM_DESTINATION_FOLDER = "destination-folder";
    public static final String PARAM_DEEP_COPY = "deep-copy";
    public static final String PARAM_OVERWRITE_COPY = "overwrite-copy";
    
    private CopyService copyService;
	
	/**
	 * The node service
	 */
    private NodeService nodeService;
	private CheckOutCheckInService checkOutCheckInService;
    
    /**
     * Sets the node service
     */
    public void setNodeService(NodeService nodeService) 
    {
        this.nodeService = nodeService;
    }
    
    /**
     * Sets the copy service
     */
    public void setCopyService(CopyService copyService) 
    {
        this.copyService = copyService;
    }
    

	/**
	 * Service to determine check-in or check-out status
	 */
	public void setCheckOutCheckInService(CheckOutCheckInService checkOutCheckInService)
    {
        this.checkOutCheckInService = checkOutCheckInService;
    }

    @Override
    protected void addParameterDefinitions(List<ParameterDefinition> paramList) 
    {
        paramList.add(new ParameterDefinitionImpl(PARAM_DESTINATION_FOLDER, DataTypeDefinition.NODE_REF, true, getParamDisplayLabel(PARAM_DESTINATION_FOLDER)));
        paramList.add(new ParameterDefinitionImpl(PARAM_DEEP_COPY, DataTypeDefinition.BOOLEAN, false, getParamDisplayLabel(PARAM_DEEP_COPY)));		
        paramList.add(new ParameterDefinitionImpl(PARAM_OVERWRITE_COPY, DataTypeDefinition.BOOLEAN, false, getParamDisplayLabel(PARAM_OVERWRITE_COPY)));
    }

	@Override
    public void executeImpl(Action ruleAction, NodeRef actionedUponNodeRef)
    {
        if (!nodeService.exists(actionedUponNodeRef))
        {
            return;
        }
        NodeRef destinationParent = (NodeRef) ruleAction.getParameterValue(PARAM_DESTINATION_FOLDER);

        // Check the destination not to be in a pending delete list
        // MNT-11695
        Set<QName> destinationAspects = nodeService.getAspects(destinationParent);
        if (destinationAspects.contains(ContentModel.ASPECT_PENDING_DELETE))
        {
            return;
        }

        // Get the deep copy value
        boolean deepCopy = false;
        Boolean deepCopyValue = (Boolean)ruleAction.getParameterValue(PARAM_DEEP_COPY);
        if (deepCopyValue != null)
        {
            deepCopy = deepCopyValue.booleanValue();
        }
	        
        // Get the overwirte value
        boolean overwrite = true;
        Boolean overwriteValue = (Boolean)ruleAction.getParameterValue(PARAM_OVERWRITE_COPY);
        if (overwriteValue != null)
        {
            overwrite = overwriteValue.booleanValue();
        }
        
        // Since we are overwriting we need to figure out whether the destination node exists
        NodeRef copyNodeRef = null;
        if (overwrite == true)
        {
            // Try and find copies of the actioned upon node reference.
            // Include the parent folder because that's where the copy will be if this action
            // had done the first copy.
            PagingResults<CopyInfo> copies = copyService.getCopies(
                    actionedUponNodeRef,
                    destinationParent,
                    new PagingRequest(1000));
            for (CopyInfo copyInfo : copies.getPage())
            {
                NodeRef copy = copyInfo.getNodeRef();
                // We know that it is in the destination parent, but avoid working copies
                if (checkOutCheckInService.isWorkingCopy(copy))
                {
                    continue;
                }
                if (copyNodeRef == null)
                {
                    copyNodeRef = copy;
                }
                else
                {
                    throw new RuleServiceException(ERR_OVERWRITE);
                }
            }
        }
        
        if (copyNodeRef != null)
        {
            // Overwrite the state of the destination node ref with the actioned upon node state
            this.copyService.copy(actionedUponNodeRef, copyNodeRef);
        }
        else
        {
            ChildAssociationRef originalAssoc = nodeService.getPrimaryParent(actionedUponNodeRef);
            // Create a new copy of the node
            this.copyService.copyAndRename(
	                actionedUponNodeRef, 
	                destinationParent,
                    originalAssoc.getTypeQName(),
                    originalAssoc.getQName(),
	                deepCopy);
        }
    }
}


               
```

|
|More Information|-   [Java API - Access and Transaction Management documentation]({% link content-services/5.2/develop/reference/java-foundation-ref.md %}).

|

## DictionaryService {#dictionaryservice}

This service represents the Repository Data Dictionary. The dictionary provides access to content meta-data such as Type and Aspect descriptions. Content metadata is organized into models where each model is given a qualified name. This means that it is safe to develop independent models and bring them together into the same Repository without name clashes (as long their namespace is different).

|Information|DictionaryService|
|-----------|-----------------|
|Support Status|[Full Support]({% link support/latest/policies/product-lifecycle.md %})|
|Architecture Information|[Platform Architecture]({% link content-services/5.2/develop/software-architecture.md %}#platform-architecture)|
|Description|The DictionaryService provides access to the entire content meta-model. The content meta-model contains information of Types, DataTypes, Properties, Aspects, Associations and Constraints. Operations supported include: -   Get DataTypes, Types, Associations, Properties, Constraints, Classes from a Content Model.
-   Check if a class is a sub-class.
-   Get SubTypes and SubAspects.

|
|Deployment - App Server|It is not likely that you will deploy Java extensions directly into a Tomcat application server as classes and Spring context files. Use an SDK build project instead.|
|[Deployment All-in-One SDK project]({% link content-services/5.2/develop/sdk.md %}#getting-started-with-alfresco-content-services-sdk-3).|-   Java source code: aio/platform-jar/src/main/java/{domain specific package path}
-   Spring beans: aio/platform-jar/src/main/resources/alfresco/module/platform-jar/context/service-context.xml

|
|Java API|[Java API documentation](http://dev.alfresco.com/resource/AlfrescoOne/5.1/PublicAPI/org/alfresco/service/cmr/dictionary/DictionaryService.html)|
|Java example|```

                  
/**
     * Determines whether one class is a sub type of an other.  Returns true if it is, false otherwise.
     * 
     * @param clazz         the class to test
     * @param subTypeOf     test whether the class is a sub-type of this class
     * @return boolean      true if it is a sub-class, false otherwise
     */
    public boolean isSubTypeOf(final String clazz, final String subTypeOf)
    {
    	Boolean result = this.session.doSessionWork(new SessionWork<Boolean>()
    	{
			public Boolean doWork() 
			{
		        // Convert to full names if required
		        String fullClazz = DataDictionary.this.session.getNamespaceMap().getFullName(clazz);
		        String fullSubTypeOf = DataDictionary.this.session.getNamespaceMap().getFullName(subTypeOf);
		        
		        // Create the QNames for the passes classes
		        QName className = QName.createQName(fullClazz);
		        QName ofClassName = QName.createQName(fullSubTypeOf);
		        
		        // Return the result
		        return new Boolean(DataDictionary.this.dictionaryService.isSubClass(className, ofClassName));
			}
    	});
    	
    	return result.booleanValue();
    }                  

               
```

|
|More Information|-   [Content Model Extension Point]({% link content-services/5.2/develop/repo-ext-points/content-model.md %})
-   [Java API - Access and Transaction Management documentation]({% link content-services/5.2/develop/reference/java-foundation-ref.md %}).

|

## FileFolderService {#fileFolderService}

Provides methods specific to manipulating files and folders. This service provides a simple way of accessing simple trees of files and folders in Alfresco.

|Information|FileFolderService|
|-----------|-----------------|
|Support Status|[Full Support]({% link support/latest/policies/product-lifecycle.md %})|
|Architecture Information|[Platform Architecture]({% link content-services/5.2/develop/software-architecture.md %}#platform-architecture)|
|Description|The `FileFolderService` provides methods for dealing with Files and Folders. This class is an abstraction of the [NodeService](#nodeservice) class, which you should look at if you want more control when creating folder and file nodes.

With the `FileFolderService` class the following type of operations are available:

-   Create a file or folder
-   Copy a file or folder
-   Move a file or folder
-   Delete a file or folder
-   Get Readers and Writers for a file
-   List files and folders (with paged results)

The methods typically work with a `NodeRef` for the node that represents the target file or folder.

|
|Deployment - App Server|It is not likely that you will deploy Java extensions directly into a Tomcat application server as classes and Spring context files. Use an SDK build project instead.|
|[Deployment All-in-One SDK project]({% link content-services/5.2/develop/sdk.md %}#getting-started-with-alfresco-content-services-sdk-3).|-   Java source code: aio/platform-jar/src/main/java/{domain specific package path}
-   Spring beans: aio/platform-jar/src/main/resources/alfresco/module/platform-jar/context/service-context.xml

|
|Java API|[Java API documentation](http://dev.alfresco.com/resource/AlfrescoOne/5.1/PublicAPI/org/alfresco/service/cmr/model/FileFolderService.html)|
|Java example|The following example uses the `FileFolderService` to create a folder and then a file in this new folder.

The example code is executed inside a [Web Script](#web-scripts) so it will automatically be part of a transaction using the `RetryingTransactionHelper`, same thing if the code was executed from a [Repo Action]({% link content-services/5.2/develop/repo-ext-points/repo-actions.md %}).

```
import org.alfresco.model.ContentModel;
import org.alfresco.repo.content.MimetypeMap;
import org.alfresco.repo.nodelocator.CompanyHomeNodeLocator;
import org.alfresco.service.ServiceRegistry;
import org.alfresco.service.cmr.model.FileExistsException;
import org.alfresco.service.cmr.model.FileInfo;
import org.alfresco.service.cmr.repository.ContentWriter;
import org.alfresco.service.cmr.repository.NodeRef;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.extensions.webscripts.Cache;
import org.springframework.extensions.webscripts.DeclarativeWebScript;
import org.springframework.extensions.webscripts.Status;
import org.springframework.extensions.webscripts.WebScriptRequest;

import java.util.HashMap;
import java.util.Map;

/**
 * A Web Script that uses the FileFolderService to create a folder and a file.
 *
 * @author martin.bergljung@alfresco.com
 */
public class FileFolderServiceTestWebScript extends DeclarativeWebScript {
    private static Log logger = LogFactory.getLog(FileFolderServiceTestWebScript.class);

    /**
     * The Alfresco Service Registry that gives access to all public content services in Alfresco.
     */
    private ServiceRegistry serviceRegistry;

    public void setServiceRegistry(ServiceRegistry serviceRegistry) {
        this.serviceRegistry = serviceRegistry;
    }

    protected Map<String, Object> executeImpl(
            WebScriptRequest req, Status status, Cache cache) {
        Map<String, Object> model = new HashMap<String, Object>();

        String message = "Your 'FileFolderServiceTestWebScript' Web Script was called ";

        FileInfo newFolderInfo = null;
        try {
            newFolderInfo = createFolder("Some Folder");
            message += "and a folder was created: " + newFolderInfo;
        } catch (FileExistsException fee) {
            message += "and there was a problem creating a folder: " + fee.getMessage();
        }

        if (newFolderInfo != null) {
            FileInfo newFileInfo = null;
            try {
                newFileInfo = createFile(newFolderInfo,"some.txt", "Some text content...");
                message += ", a text file was then created in this folder: " + newFileInfo;
            } catch (FileExistsException fee) {
                message += ", there was a problem creating a file in the new folder: " + fee.getMessage();
            }
        }

        logger.info(message);

        model.put("message", message);

        return model;
    }

    /**
     * Create a folder under the /Company Home folder.
     *
     * @param folderName the name of the folder
     * @return a FileInfo object with data about the new folder, such as NodeRef
     */
    private FileInfo createFolder(String folderName) throws FileExistsException {

        // Get a NodeRef for /Company Home folder
        NodeRef parentFolderNodeRef = serviceRegistry.getNodeLocatorService().getNode(
                CompanyHomeNodeLocator.NAME, null, null);

        // Create the folder under /Company Home
        FileInfo folderInfo = serviceRegistry.getFileFolderService().create(
                parentFolderNodeRef, folderName, ContentModel.TYPE_FOLDER);

        return folderInfo;
    }

    /**
     * Create a file under the passed in folder.
     *
     * @param folderInfo the folder that the file should be created in
     * @param filename the name of the file
     * @param fileTxt the content of the file
     * @return a FileInfo object with data about the new file, such as NodeRef
     */
    private FileInfo createFile(FileInfo folderInfo, String filename, String fileTxt) throws FileExistsException {

        // Create the file under passed in folder, the file will be empty to start with
        FileInfo fileInfo = serviceRegistry.getFileFolderService().create(
                folderInfo.getNodeRef(), filename, ContentModel.TYPE_CONTENT);

        // Get the NodeRef for the new file from the FileInfo object
        NodeRef newFileNodeRef = fileInfo.getNodeRef();

        // Add some content to the file
        ContentWriter writer = serviceRegistry.getFileFolderService().getWriter(newFileNodeRef);
        writer.setMimetype(MimetypeMap.MIMETYPE_TEXT_PLAIN);
        writer.setEncoding("UTF-8");
        writer.putContent(fileTxt);

        return fileInfo;
    }
}
```

We use the `ServiceRegistry` to get to the `FileFolderService`. The `ServiceRegistry` bean is injected into the Web Script controller bean as follows:

```
<bean id="webscript.alfresco.tutorials.filefolderservicetest.get"
		  class="org.alfresco.training.platformsample.FileFolderServiceTestWebScript"
		  parent="webscript">
	<property name="serviceRegistry">
		<ref bean="ServiceRegistry" />
	</property>
</bean>
```

**Note** how we catch the `FileExistsException` to deal with the situations when the folder or file already exists. This is a runtime exception so we are not forced to deal with it, but it's good practice to catch it and display a nice message to the end user.

If we complete the Web Script with a descriptor and template as follows:

/extension/templates/webscripts/alfresco/tutorials/**filefolderservicetest.get.desc.xml:**

```
<webscript>
    <shortname>FileFolderService Test Sample Webscript</shortname>
    <description>Uses the FileFolderService to create a folder and a file</description>
    <url>/sample/filefolderservicetest</url>
    <authentication>user</authentication>
    <format default="html"></format>
    <lifecycle>sample</lifecycle>    
</webscript>
  
```

/extension/templates/webscripts/alfresco/tutorials/**filefolderservicetest.get.html.ftl:**```
Message: '${message}'
```

Then, the first time we execute the Web Script ([http://localhost:8080/alfresco/s/sample/filefolderservicetest](http://localhost:8080/alfresco/s/sample/filefolderservicetest)) we will get a response looking something like this:

*Message: 'Your 'FileFolderServiceTestWebScript' Web Script was called and a folder was created: FileInfo[name=Some Folder, isFolder=true, nodeRef=workspace://SpacesStore/91b0932a-5056-4607-a1bd-849ec655d16e], a text file was then created in this folder: FileInfo[name=some.txt, isFolder=false, nodeRef=workspace://SpacesStore/5b17ba0a-b0b5-4df1-bd37-91098cac7263]'*

If we now run the Web Script again, when the folder and file exist, the following response is returned:

*Message: 'Your 'FileFolderServiceTestWebScript' Web Script was called and there was a problem creating a folder: 00270021 File or folder Some Folder already exists'*

|
|More Information|-   [Java API - Access and Transaction Management documentation]({% link content-services/5.2/develop/reference/java-foundation-ref.md %}).

|

## JobLockService {#joblockservice}

This service ensures that a scheduled job can only run on one node of a cluster at a time. A scheduled job could be, for example, an Activities feed job that generates email to send to everyone every night or a content cleaner job that cleans up orphaned content.

|Information|JobLockService|
|-----------|--------------|
|Support Status|[Full Support]({% link support/latest/policies/product-lifecycle.md %})|
|Architecture Information|[Platform Architecture]({% link content-services/5.2/develop/software-architecture.md %}#platform-architecture)|
|Description|The `JobLockService` is used to provide a locking service at the job level, rather than the node level. It's for example used indirectly via the [AbstractScheduledLockedJob](https://github.com/Alfresco/alfresco-repository/blob/master/src/main/java/org/alfresco/schedule/AbstractScheduledLockedJob.java) `QuarzJobBean`.

|
|Deployment - App Server|It is not likely that you will deploy Java extensions directly into a Tomcat application server as classes and Spring context files. Use an SDK build project instead.|
|[Deployment All-in-One SDK project]({% link content-services/5.2/develop/sdk.md %}#getting-started-with-alfresco-content-services-sdk-3).|-   Java source code: aio/platform-jar/src/main/java/{domain specific package path}
-   Spring beans: aio/platform-jar/src/main/resources/alfresco/module/platform-jar/context/service-context.xml

|
|Java API|[Java API documentation](http://dev.alfresco.com/resource/AlfrescoOne/5.1/PublicAPI/org/alfresco/repo/lock/JobLockService.html)|
|Java example|For an example of using the `JobLockService` see the [Content Store Cleaner code](https://github.com/Alfresco/alfresco-repository/blob/master/src/main/java/org/alfresco/repo/content/cleanup/ContentStoreCleaner.java) on GitHub.|
|More Information|-   [Scheduled Jobs extension point documentation]({% link content-services/5.2/develop/repo-ext-points/scheduled-jobs.md %}#scheduled-jobs-definitions)
-   [Java API - Access and Transaction Management documentation]({% link content-services/5.2/develop/reference/java-foundation-ref.md %}).

|

## LockService {#lockService}

A node-level locking service, used by the CheckOutCheckIn service. Does not create a working copy.

|Information|LockService|
|-----------|-----------|
|Support Status|[Full Support]({% link support/latest/policies/product-lifecycle.md %})|
|Architecture Information|[Platform Architecture]({% link content-services/5.2/develop/software-architecture.md %}#platform-architecture)|
|Description|If you need a node-level locking system, then the LockService can provide this. Functionality provided by the service includes: -   Checking for a lock on a node
-   Obtaining lock information
-   Locking and unlocking a node
-   Suspend and enable locks

|
|Deployment - App Server|It is not likely that you will deploy Java extensions directly into a Tomcat application server as classes and Spring context files. Use an SDK build project instead.|
|[Deployment All-in-One SDK project]({% link content-services/5.2/develop/sdk.md %}#getting-started-with-alfresco-content-services-sdk-3).|-   Java source code: aio/platform-jar/src/main/java/{domain specific package path}
-   Spring beans: aio/platform-jar/src/main/resources/alfresco/module/platform-jar/context/service-context.xml

|
|Java API|[Java API documention](http://dev.alfresco.com/resource/AlfrescoOne/5.1/PublicAPI/org/alfresco/service/cmr/lock/LockService.html)|
|Java example|```


/** 
 * Return whether a Node is currently locked
 * @param node             The Node wrapper to test against
 * @param lockService      The LockService to use
 * @return whether a Node is currently locked
 */
public static Boolean isNodeLocked(Node node,LockService lockService){
  Boolean locked=Boolean.FALSE;
  if (node.hasAspect(ContentModel.ASPECT_LOCKABLE)) {
    LockStatus lockStatus=lockService.getLockStatus(node.getNodeRef());
    if (lockStatus == LockStatus.LOCKED || lockStatus == LockStatus.LOCK_OWNER) {
      locked=Boolean.TRUE;
    }
  }
  return locked;
}

               
```

|
|More Information|-   [Java API - Access and Transaction Management documentation]({% link content-services/5.2/develop/reference/java-foundation-ref.md %}).

|

## MessageService {#messageservice}

Provides methods to access the locale of the current thread and to get localised strings. These strings may be loaded from resource bundles deployed in the repository.

|Information|MessageService|
|-----------|--------------|
|Support Status|[Full Support]({% link support/latest/policies/product-lifecycle.md %})|
|Architecture Information|[Platform Architecture]({% link content-services/5.2/develop/software-architecture.md %}#platform-architecture)|
|Description|The `MessageService` provides functionality around Internationalization (i18n). It provides facilities to:

-   Get a message based on a key from a localized properties file
-   Get and set the locale
-   Register and unregister resource bundles

All user displayed strings that originate in the repository should be externalised into resource bundles to ensure that the repository is fully localisable. Examples of strings requiring extraction include:

-   Descriptive display labels used by a client
-   Error messages

Extracted strings should be gathered into resource bundles by functional area. This enables functional areas to remain distinct within the repository.

The base bundle should be named by functional area and have the .properties extension. All base bundles should be in US English.

If a message needs to be parameterised the Java `MessageFormatter` style should be used.

The keys used in the resource bundles should be scoped by functional area to avoid clashes (this is important since at runtime the contents of the various resource bundles is combined, any names clashes will result in message values being overwritten).

A resource bundle can be placed anywhere in the source tree, but in general repository resource bundles should be placed in the `alfresco.messages` package.

Example resource bundle contents:

```
## User displayed string for the rule service functional area {#user-displayed-string-for-the-rule-service-functional-area}

ruleservice.error=There has been an error executing rule {0}.
ruleservice.confimation_all=All rules have been executed.
```

Before a resource bundle can be used by the repository it must be registered. Suitable methods are provided by the service to support this. And more commonly the `org.alfresco.i18n.ResourceBundleBootstrapComponent` class can be used as a Spring bean to register resource bundles.

|
|Deployment - App Server|It is not likely that you will deploy Java extensions directly into a Tomcat application server as classes and Spring context files. Use an SDK build project instead.|
|[Deployment All-in-One SDK project]({% link content-services/5.2/develop/sdk.md %}#getting-started-with-alfresco-content-services-sdk-3).|-   Java source code: aio/platform-jar/src/main/java/{domain specific package path}
-   Localization files: aio/platform-jar/src/main/resources/alfresco/module/platform-jar/messages
-   Spring beans: aio/platform-jar/src/main/resources/alfresco/module/platform-jar/context/bootstrap-context.xml

|
|Java API|[Java API documentation](http://dev.alfresco.com/resource/AlfrescoOne/5.1/PublicAPI/org/alfresco/repo/i18n/MessageService.html)|
|Java example|The following example uses a Web Script to test registered resource bundles as follows: ```
import org.alfresco.service.ServiceRegistry;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.extensions.webscripts.Cache;
import org.springframework.extensions.webscripts.DeclarativeWebScript;
import org.springframework.extensions.webscripts.Status;
import org.springframework.extensions.webscripts.WebScriptRequest;

import java.util.HashMap;
import java.util.Locale;
import java.util.Map;

/**
 * A Web Script that can be used to test the MessageService class.
 *
 * @author martin.bergljung@alfresco.com
 */
public class MessageServiceTestWebscript extends DeclarativeWebScript {
    private static Log logger = LogFactory.getLog(MessageServiceTestWebscript.class);

    /**
     * The Alfresco Service Registry that gives access to all public content services in Alfresco.
     */
    private ServiceRegistry serviceRegistry;

    public void setServiceRegistry(ServiceRegistry serviceRegistry) {
        this.serviceRegistry = serviceRegistry;
    }

    protected Map<String, Object> executeImpl(
            WebScriptRequest req, Status status, Cache cache) {
        String key = req.getParameter("key");
        String language = req.getParameter("language");
        Locale locale = Locale.forLanguageTag(language);

        Map<String, Object> model = new HashMap<String, Object>();

        String message = "Your 'MessageServiceTestWebscript' Web Script was called: <br/>";

        message += "Locale: " + locale.getDisplayName() + "<br/>";
        message += "Translation of " + key + ": " + this.serviceRegistry.getMessageService().getMessage(key, locale);

        logger.info(message);

        model.put("message", message);

        return model;
    }
}
```

This Web Script is called with two parameters, one specifies the resource string we want (i.e. `key`) and one specifies the language we want the resource string text in (i.e. `language`).

We then use the `ServiceRegistry` to get to the `MessageService`, and then the `getMessage` method is called to get the requested message in correct locale.

The `ServiceRegistry` bean is injected into the Web Script controller bean as follows:

```
<bean id="webscript.alfresco.tutorials.messageservicetest.get"
	  class="org.alfresco.training.platformsample.MessageServiceTestWebscript"
	  parent="webscript">
	<property name="serviceRegistry">
		<ref bean="ServiceRegistry" />
	</property>
</bean>
```

If we complete the Web Script with a descriptor and template as follows:

/extension/templates/webscripts/alfresco/tutorials/**messageservicetest.get.desc.xml:**

```
<webscript>
    <shortname>MessageService Test Sample Webscript</shortname>
    <description>Get a message for a specific key and language, uses the MessageService</description>
    <url>/sample/messageservicetest?key={key}&amp;language={language}</url>
    <authentication>user</authentication>
    <format default="html"></format>
    <lifecycle>sample</lifecycle>    
</webscript>
```

/extension/templates/webscripts/alfresco/tutorials/**messageservicetest.get.html.ftl:**```
${message} 
```

And add two resource files as follows:

platform-jar/src/main/resources/alfresco/module/platform-jar/messages**test-messages.properties:**

```
alfresco.tutorial.hello=Hello
```

platform-jar/src/main/resources/alfresco/module/platform-jar/messages**test-messages_sv.properties:**```
alfresco.tutorial.hello=Hej
```

These two resource files can be loaded by defining the following Spring bean:

```
<bean id="org.alfresco.tutorial.test.i18nResourceBundles"
          class="org.alfresco.i18n.ResourceBundleBootstrapComponent">
    <property name="resourceBundles">
        <list>
            <value>alfresco.module.${project.artifactId}.messages.test-messages</value>
        </list>
    </property>
</bean>
```

Then we can call the Web Script with the following URL:

[http://localhost:8080/alfresco/s/sample/messageservicetest?key=alfresco.tutorial.hello&language=en](http://localhost:8080/alfresco/s/sample/messageservicetest?key=alfresco.tutorial.hello&language=en)

The response in the browser will look something like this:

*Your 'MessageServiceTestWebscript' Web Script was called:*

*Locale: English*

*Translation of alfresco.tutorial.hello: Hello*

If we call it with the other locale (sv) the response looks like this ([http://localhost:8080/alfresco/s/sample/messageservicetest?key=alfresco.tutorial.hello&language=sv](http://localhost:8080/alfresco/s/sample/messageservicetest?key=alfresco.tutorial.hello&language=sv)):*Your 'MessageServiceTestWebscript' Web Script was called:*

*Locale: Swedish*

*Translation of alfresco.tutorial.hello: Hej*

|
|More Information|-   [Java API - Access and Transaction Management documentation]({% link content-services/5.2/develop/reference/java-foundation-ref.md %}).

|

## MimetypeService {#mimetypeService}

Provides support related to content mimetype. For example, provides methods to retrieve the extension for the specified mimetype.

|Information|MimetypeService|
|-----------|---------------|
|Support Status|[Full Support]({% link support/latest/policies/product-lifecycle.md %})|
|Architecture Information|[Platform Architecture]({% link content-services/5.2/develop/software-architecture.md %}#platform-architecture)|
|Description|Alfresco Content Services supports numerous mimetypes out-of-the-box. However, it is also possible to add your own custom mimetypes. The MimetypeService provides an API for managing mimetypes. For example, you can obtain a list of current mimetypes, mimetype extensions, and guess mimetypes using a specified file and content reader.|
|Deployment - App Server|It is not likely that you will deploy Java extensions directly into a Tomcat application server as classes and Spring context files. Use an SDK build project instead.|
|[Deployment All-in-One SDK project]({% link content-services/5.2/develop/sdk.md %}#getting-started-with-alfresco-content-services-sdk-3).|-   Java source code: aio/platform-jar/src/main/java/{domain specific package path}
-   Spring beans: aio/platform-jar/src/main/resources/alfresco/module/platform-jar/context/service-context.xml

|
|Java API|[Java API](http://dev.alfresco.com/resource/AlfrescoOne/5.1/PublicAPI/org/alfresco/service/cmr/repository/MimetypeService.html)|
|Java example|```

// Using mimetype service when writing content

ContentWriter contentWriter = contentService.getWriter(node, ContentModel.PROP_CONTENT, true);

contentWriter.setMimetype(mimetypeService.guessMimetype(filename));

contentWriter.putContent(field.getInputStream());
```

|
|More Information|-   [Java API - Access and Transaction Management documentation]({% link content-services/5.2/develop/reference/java-foundation-ref.md %}).
-   [Mimetype platform extension point documentation]({% link content-services/5.2/develop/repo-ext-points/mimetypes.md %})

|

## ModuleService {#moduleservice}

A service to control and provide information about the currently-installed modules.

|Information|ModuleService|
|-----------|-------------|
|Support Status|[Full Support]({% link support/latest/policies/product-lifecycle.md %})|
|Architecture Information|[Platform Architecture]({% link content-services/5.2/develop/software-architecture.md %}#platform-architecture)|
|Description|A module is an extension to Alfresco Content Services that is developed with a particular project structure and packaging. Modules can be registered and loaded as part of the boot process. In Share Admin Tools, you can [view the currently installed Modules]({% link content-services/5.2/develop/extension-packaging.md %}#extension-packaging-modules). The ModuleService provides functionality to programmatically start up and shut down modules, and get module information.|
|Deployment - App Server|It is not likely that you will deploy Java extensions directly into a Tomcat application server as classes and Spring context files. Use an SDK build project instead.|
|[Deployment All-in-One SDK project]({% link content-services/5.2/develop/sdk.md %}#getting-started-with-alfresco-content-services-sdk-3).|-   Java source code: aio/platform-jar/src/main/java/{domain specific package path}
-   Spring beans: aio/platform-jar/src/main/resources/alfresco/module/platform-jar/context/service-context.xml

|
|Java API|[Java API Documentation](http://dev.alfresco.com/resource/AlfrescoOne/5.1/PublicAPI/org/alfresco/service/cmr/module/ModuleService.html)|
|Java example|```

                  
// Get all Modules

List<ModuleDetails> modules = moduleService.getAllModules();
loggerService.info(I18NUtil.getMessage(MSG_FOUND_MODULES, modules.size()));

for (ModuleDetails module : modules)
{
  Map<String, ModuleComponent> components = getComponents(module.getId());
  for (ModuleComponent component : components.values())
  {
      component.shutdown();
  }
}
                  
               
```

|
|More Information|-   [Java API - Access and Transaction Management documentation]({% link content-services/5.2/develop/reference/java-foundation-ref.md %}).

|

## NamespaceService {#namespaceservice}

Provides access to and definition of namespace URIs and Prefixes.

|Information|NamespaceService|
|-----------|----------------|
|Support Status|[Full Support]({% link support/latest/policies/product-lifecycle.md %})|
|Architecture Information|[Platform Architecture]({% link content-services/5.2/develop/software-architecture.md %}#platform-architecture)|
|Description|The `NamespaceService` has constants defined for the major namespaces used by internal Alfresco content models, including the prefixes for those.

 Alfresco Content Services namespaces start with http://www.alfresco.org. The top-level namespace sub-divisions are:

-   model - identify a data model
-   view - identify a view of content held in the repository
-   ws - identify a Web Service definition
-   test - identify a test definition

Each namespace typically ends with its version number.

**Registry**

Note: This list will expand / change between now and the next release.

|Namespace|Common Prefix|Description|
|---------|-------------|-----------|
|http://www.alfresco.org|alf|General Namespace|
|http://www.alfresco.org/model/dictionary/1.0|d|Data Dictionary model|
|http://www.alfresco.org/model/system/1.0|sys|Repository system model|
|http://www.alfresco.org/model/content/1.0|cm|Content Domain model|
|http://www.alfresco.org/model/application/1.0|app|Application model|
|http://www.alfresco.org/model/bpm/1.0|bpm|Business Process Model|
|http://www.alfresco.org/model/site/1.0|st|Site Model|
|http://www.alfresco.org/model/forum/1.0|fm|Forum Model|
|http://www.alfresco.org/model/user/1.0|usr|User model (in repository.jar)|
|http://www.alfresco.org/view/repository/1.0|view|Import / Export View|
|http://www.alfresco.org/model/action/1.0|act|Action service model|
|http://www.alfresco.org/model/rule/1.0|rule|Rule service model|
|http://www.alfresco.org/ws/service/authentication/1.0|auth|Authentication Web Service|
|http://www.alfresco.org/ws/service/repository/1.0|rep|Repository Web Service|
|http://www.alfresco.org/ws/service/content/1.0|content|Content Web Service|
|http://www.alfresco.org/ws/service/authoring/1.0|author|Authoring Web Service|
|http://www.alfresco.org/ws/service/classification/1.0|cls|Classification Web Service|
|http://www.alfresco.org/ws/cml/1.0|cml|Content Manipulation Language|
|http://www.alfresco.org/ws/model/content/1.0|cm|Web Service Content Domain Model|
|http://www.alfresco.org/model/workflow/1.0|wf|Workflow Model (link is to the simple workflow model, not generally extended)|

|
|Deployment - App Server|It is not likely that you will deploy Java extensions directly into a Tomcat application server as classes and Spring context files. Use an SDK build project instead.|
|[Deployment All-in-One SDK project]({% link content-services/5.2/develop/sdk.md %}#getting-started-with-alfresco-content-services-sdk-3).|-   Java source code: aio/platform-jar/src/main/java/{domain specific package path}
-   Spring beans: aio/platform-jar/src/main/resources/alfresco/module/platform-jar/context/service-context.xml

|
|Java API|[Java API Documentation](http://dev.alfresco.com/resource/AlfrescoOne/5.1/PublicAPI/org/alfresco/service/namespace/NamespaceService.html)|
|Java example|It's common to use the `NamespaceService` to get to prefixes for content models, such as in this example:

 ```
String companyHomePath = serviceRegistry.getNodeService().getPath(companyHome)
               .toPrefixString(serviceRegistry.getNamespaceService());
```

 This code would result in `companyHomePath` being set to `/app:company_home`.

 Another example usage is the following code that uses the `NamespaceService` when a `QName` is created:

 ```
String name = "aName";
QName aQName = QName.createQName(NamespaceService.CONTENT_MODEL_1_0_URI, QName.createValidLocalName(name));
```

 This code would result in `aQName` being set to `{http://www.alfresco.org/model/content/1.0}aName`.

|
|More Information|-   [Java API - Access and Transaction Management documentation]({% link content-services/5.2/develop/reference/java-foundation-ref.md %}).

|

## NodeService {#nodeservice}

Provides an API for managing nodes.

|Information|NodeService|
|-----------|-----------|
|Support Status|[Full Support]({% link support/latest/policies/product-lifecycle.md %})|
|Architecture Information|[Platform Architecture]({% link content-services/5.2/develop/software-architecture.md %}#platform-architecture)|
|Description|Nodes are the fundamental data structure in Alfresco Content Services. All content that is stored is represented by a node data structure, which contains content metadata and is persisted in a database (such as PostgreSQL). The content referenced by the node is stored as a *.bin file in a content store (such as the file system, S3, encrypted or other content store). Every node in the system is referenced by a NodeRef, which is made up of the content store protocol, the content store name, and the Universal Unique Identifier (UUID) of the content, for example: `workspace://SpacesStore/ccb906ba-a768-4ccb-8b26-515119e1efdc`. Generally nodes are of two main types, a content node (`cm:content`), or a folder node (`cm:folder`). Folders can contain child nodes. Note that each content store will have a root node, and all other nodes in the store will be children of the root node.

 The NodeService provides an extensive API for managing nodes. Functionality includes:

-   Adding aspects, children, properties, associations
-   Getting aspects, children, properties, associations
-   Removing aspects, children, properties, associations
-   Creating and deleting stores
-   Creating and deleting nodes
-   Checking for existence of a node
-   Get available content stores
-   Moving nodes

 The NodeService makes extensive use of NodeRefs to reference the node of interest.

 Since Alfresco 4.1.1 the `alf_node.node_deleted` column has been replaced by a system type (`sys:deleted`) and an aspect (`sys:pendingDelete`). While the `sys:deleted` type will never be visible to client code, the `sys:pendingDelete` aspect will be. Any custom code that attempts to modify behaviour during node deletion may need to be adjusted.

 **Node deletion**

 Changes made in 4.1.1 introduced comprehensive policy callbacks for all associations during node deletion. The following node policies are available for node deletion:

 -   BeforeDeleteNodePolicy
-   BeforeArchiveNodePolicy
-   OnDeleteNodePolicy
-   BeforeDeleteChildAssociationPolicy
-   OnDeleteChildAssociationPolicy
-   BeforeDeleteAssociationPolicy
-   OnDeleteAssociationPolicy

 The association (peer and child) policies are now fired reliably for all associations within the node hierarchy being deleted. For examples of their usage, see: `org.alfresco.repo.model.ml.MultilingualDocumentAspect`.

 Once NodeService.deleteNode is called:

 -   It is impossible to add or remove associations to or from any node in the hierarchy being deleted. This includes attempted changes from any source including changes attempted by custom code reacting to before- or on-delete callbacks.
-   All nodes in the hierarchy will temporarily have the sys:pendingDelete aspect applied. Custom code can using NodeService.hasAspect to discover if a node is about to be deleted.
-   It is impossible to add new nodes or link other nodes into any node in the hierarchy being deleted. Any attempt to do so will be treated as a concurrency violation since custom code should not be attempting this from callbacks during the node deletion.
-   All associations, with the notable exception of the primary parent-child links, will be removed even if node archival is taking place. Node archival now only preserves the core parent-child associations and discards all other associations after making the relevant callbacks. Custom code must use the association deletion callbacks to remove nodes or aspects that might violate model integrity constraints in the archived hierarchy.

 A good example of the changes is in the handling of the `cm:copiedFrom` aspect. Copied nodes have an aspect `cm:copiedfrom`, which has a mandatory association to the original source node. When either the source or copy is deleted the aspect has to be removed. See `org.alfresco.repo.copy.CopyServiceImpl.beforeDeleteOriginalAssociation` for how the association deletion is detected in order to ensure that the aspect is removed from the copied node.

|
|Deployment - App Server|It is not likely that you will deploy Java extensions directly into a Tomcat application server as classes and Spring context files. Use an SDK build project instead.|
|[Deployment All-in-One SDK project]({% link content-services/5.2/develop/sdk.md %}#getting-started-with-alfresco-content-services-sdk-3).|-   Java source code: aio/platform-jar/src/main/java/{domain specific package path}
-   Spring beans: aio/platform-jar/src/main/resources/alfresco/module/platform-jar/context/service-context.xml

|
|Java API|[Java API](http://dev.alfresco.com/resource/AlfrescoOne/5.1/PublicAPI/org/alfresco/service/cmr/repository/NodeService.html)|
|Java example|```

                  

// Getting a NodeRef from its path

StoreRef storeRef = new StoreRef(StoreRef.PROTOCOL_WORKSPACE, "SpacesStore");
ResultSet rs = searchService.query(storeRef, SearchService.LANGUAGE_LUCENE, "PATH:\"/app:company_home/app:user_homes/sys:boris/cm:mypics\"");
NodeRef companyHomeNodeRef = null;
try
{
  if (rs.length() == 0)
  {
      throw new AlfrescoRuntimeException("Didn't find Company Home");
  }
  companyHomeNodeRef = rs.getNodeRef(0);
}
finally
{
  rs.close();
}

// Getting a file name from a NodeRef

String fileName = (String) nodeService.getProperty(nodeRef, ContentModel.PROP_NAME);

// Reading a property of a node
// The property may come from an aspect or not. You will probably want to cast to the appropriate type.

QName PROP_QNAME_MY_PROPERTY = QName.createQName("custom.model", "myProperty");
value = nodeService.getProperty(nodeRef, PROP_QNAME_MY_PROPERTY);

// Updating a property of a node
// The property may come from an aspect or not.

QName PROP_QNAME_MY_PROPERTY = QName.createQName("custom.model", "myProperty");
nodeService.setProperty(nodeRef, PROP_QNAME_MY_PROPERTY, value);

// Getting the parent of a NodeRef

ChildAssociationRef childAssociationRef = nodeService.getPrimaryParent(nodeRef);
NodeRef parent = childAssociationRef.getParentRef();

// Adding an aspect to a node
// Supposing the "MyAspect" aspect defines a "myProperty" property in the "custom.model" namespace.

QName CUSTOM_ASPECT_QNAME = QName.createQName("custom.model", "MyAspect");
QName PROP_QNAME_MY_PROPERTY = QName.createQName("custom.model", "myProperty");
Map<QName,Serializable> aspectValues = new HashMap<QName,Serializable>();
aspectValues.put(PROP_QNAME_MY_PROPERTY, value);
nodeService.addAspect(nodeRef, CUSTOM_ASPECT_QNAME, aspectValues);

// Checking whether a node has a given aspect

QName CUSTOM_ASPECT_QNAME = QName.createQName("custom.model", "MyAspect");
boolean hasAspect = nodeService.hasAspect(node, CUSTOM_ASPECT_QNAME);

// Looping through children of a NodeRef

List<ChildAssociationRef> children = nodeService.getChildAssocs(companyHome);
for (ChildAssociationRef childAssoc : children) {
  NodeRef childNodeRef = childAssoc.getChildRef();
  // Use childNodeRef here.
}

// Creating a child association between two existing NodeRef

QName PROP_QNAME_MY_CHILD_ASSOCIATION = QName.createQName("custom.model", "myChildAssociation");
nodeService.addChild(parentNodeRef, childNodeRef, PROP_QNAME_MY_CHILD_ASSOCIATION, PROP_QNAME_MY_CHILD_ASSOCIATION);

// Creating an association between two NodeRef

QName PROP_QNAME_MY_ASSOCIATION = QName.createQName("custom.model", "myAssociation");
nodeService.createAssociation(sourceNodeRef, targetNodeRef, PROP_QNAME_MY_ASSOCIATION);

// Setting the type of a node

QName PROP_QNAME_MY_TYPE = QName.createQName("custom.model", "myType");
nodeService.setType(finalOriginal, MY_TYPE);

// Getting the MIME type of a node

ContentData contentData = (ContentData) nodeService.getProperty(nodeRef, ContentModel.PROP_CONTENT);
String originalMimeType = contentData.getMimetype();

// Adding a category to a node

ArrayList<NodeRef> categories = new ArrayList<NodeRef>(1);
categories.add(categoryNode);
if(!nodeService.hasAspect(targetNode, ContentModel.ASPECT_GEN_CLASSIFIABLE)
{
  HashMap<QName, Serializable> props = new HashMap<QName, Serializable>();
  props.put(ContentModel.PROP_CATEGORIES, categories);
  nodeService.addAspect(targetNode, ContentModel.ASPECT_GEN_CLASSIFIABLE, props);
}
else
{
  nodeService.setProperty(targetNode, ContentModel.PROP_CATEGORIES, categories);
}

// Getting the categories of a node

List<NodeRef> categories = (List<NodeRef>) nodeService.getProperty(nodeRef, ContentModel.PROP_CATEGORIES);

// Deleting a node for real (not recycle bin)

nodeService.addAspect(nodeRef, ContentModel.ASPECT_TEMPORARY, null);
nodeService.deleteNode(nodeRef);
                  
               
```

|
|More Information|-   [Java API - Access and Transaction Management documentation]({% link content-services/5.2/develop/reference/java-foundation-ref.md %}).
-   [Custom Content Store platform extension point documentation]({% link content-services/5.2/develop/repo-ext-points/content-stores.md %}#content-stores)

|

## NodeLocatorService {#nodelocatorservice}

The NodeLocatorService looks up node locators registered via Spring configuration by name.

|Information|NodeLocatorService|
|-----------|------------------|
|Support Status|[Full Support]({% link support/latest/policies/product-lifecycle.md %})|
|Architecture Information|[Platform Architecture]({% link content-services/5.2/develop/software-architecture.md %}#platform-architecture)|
|Description|**Introduction**

 The 4.0 release saw the introduction of the `NodeLocatorService`.

 The service provides a way to lookup one node from another, its main use is from the Forms association control, allowing custom "startLocation" strategies to be plugged in.

 **Configuration**

 The `NodeLocatorService` looks up node locators by name, the out-of-the-box node locators are defined in a file named node-locator-context.xml.

 This Spring configuration file defines a base bean that can be used to define new node locator implementations. Using this bean will automatically register the node locator with the repository and make it available.

 This page will use an example node locator to describe the service, it will allow a named folder to be found. To define the example node locator the following Spring configuration would be used (in a custom context file):

 ```

               
<bean id="namedFolderNodeLocator" class="com.example.NamedFolderNodeLocator" parent="baseNodeLocator">
   <property name="NodeService" ref="NodeService" />
   <property name="FileFolderService" ref="FileFolderService" />
</bean>
               
               
```

 **Java API**

 The `NodeLocatorService` looks up node locators registered via Spring configuration by name. A node locator must implement the NodeLocator interface, whose definition is shown below:

 ```

                  
public interface NodeLocator
{
    NodeRef getNode(NodeRef source, Map<String, Serializable> params);
    public List<ParameterDefinition> getParameterDefinitions(); 
}
                     
                     
```

 A NodeLocator in its simplest form takes a source node, some optional parameters and returns a node or null if a suitable node could not be found. If a node is not found the NodeLocatorService returns the NodeRef representing "Company Home".

 The source node is not mandatory, node locators can be used to return well known nodes, "Company Home", "User Home" for example in which case a source node is not required.

 If a NodeLocator has parameters they must be defined using the same definition classes (ParameterDefinition) used by the ActionService.

 A base class `AbstractNodeLocator` is provided and it is recommended that your NodeLocator extends this base class. It provides the functionality to register the NodeLocator with the NodeLocatorService registry. This class also defines an abstract method your implementation must override.

 ```

public abstract String getName();
                     
```

 This is the unique name for your NodeLocator and will be used by the NodeLocatorService in the lookup process. It is also used in the startLocation configuration.

 **Example**

 Our example locator, NamedFolderNodeLocator, will be named "namedfolder" and will expect a single parameter called "name" which will indicate what folder to locate. The full source for this example is shown below:

 ```

                        
public class NamedFolderNodeLocator extends AbstractNodeLocator
{
    public static final String LOCATOR_NAME = "namedfolder";
    public static final String NAME_PARAM = "name";

    private NodeService nodeService;
    private FileFolderService fileFolderService;

    public void setNodeService(NodeService nodeService)
    {
        this.nodeService = nodeService;
    }

    public void setFileFolderService(FileFolderService fileFolderService)
    {
        this.fileFolderService = fileFolderService;
    }

    @Override
    public NodeRef getNode(NodeRef source, Map<String, Serializable> params)
    {
        NodeRef node = null;
      
        String folderName = (String)params.get(NAME_PARAM);
        if (source != null && folderName != null)
        {
           // get the parent of the source node
           NodeRef parent = nodeService.getPrimaryParent(source).getParentRef();
           // look for a child with the provided name
           NodeRef folder = nodeService.getChildByName(parent, ContentModel.ASSOC_CONTAINS, folderName);
           // make sure it's a folder
           if (folder != null && fileFolderService.getFileInfo(folder).isFolder())
           {
               node = folder;
           }
        }
        return node;
    }
      
    public List<ParameterDefinition> getParameterDefinitions()
    {
        List<ParameterDefinition> paramDefs = new ArrayList<ParameterDefinition>(2);
        paramDefs.add(new ParameterDefinitionImpl(NAME_PARAM, DataTypeDefinition.TEXT, false, "Name"));
        return paramDefs;
    }
            
    public String getName()
    {
        return LOCATOR_NAME;
    }
}

                     
```

 The "source" parameter in `getNode()` represents the starting point, in a form association control this will be the node being edited, for a create form it will be the destination node. Our example finds the primary parent of the source node and looks for a child folder with the given name. This is a fairly simple example but it is easy to see how this could be extended to allow for a named folder to be located up or down a folder hierarchy.

 **REST API**

 A REST API is provided for the NodeLocatorService, it is used by the form association control to determine the startLocation of the control but of course can be used by any client if required.

 The webscript descriptor is shown below:

 ```


<webscript> 
   <shortname>Node Locator</shortname>
   <description>Locates a Node in the repository using the specified Node Location strategy.</description>
   <url>/api/{store_type}/{store_id}/{node_id}/nodelocator/{node_locator_name}</url>
   <url>/api/nodelocator/{node_locator_name}</url>
   <format default="json"/>
   <authentication>user</authentication>
   <transaction allow="readonly">required</transaction>
</webscript>
```

 Two URLs are supported, one that allows a source node to be provided and one that does not, this is useful for "well known" nodes, "Company Home", "Sites Home" for example. Parameters are passed as query string parameters, a request for our example node locator may look like the following:

 ```
http://localhost:8080/alfresco/api/workspace/SpacesStore/28740556-129a-4ae8-b6c8-952fff728d63/nodelocator/namedfolder?name=Example
```

 A typical response is shown below:

 ```

{
  "data":
  {
    "nodeRef": "workspace://SpacesStore/d2a8bc42-4874-4d45-9a23-33cdd02be777"
  }
}
```

 **startLocation**

 The main use of the NodeLocatorService is to determine where the forms association control should start when it is first displayed. In some scenarios the picker may need to start in the root of the document library of a Share site or start in the folder where the node being edit is located. See the next section for a list of NodeLocators provided out-of-the-box.

 NodeLocators are configured using form control parameters. The name of the NodeLocator implementation is provided as the 'startLocation' parameter and the parameters are provided by a 'startLocationParameters' parameter. They should be provided in the form of query string parameters, for example `name=value&name=value`.

 The configuration for our example node locator is shown below, it will look for a folder named "Example" in the same folder as the node being edited.

 ```


<field id="my:association">
   <control>
      <control-param name="startLocation">{namedfolder}</control-param>
      <control-param name="startLocationParams">name=Example</control-param>
   </control>
</field>

```

 > **Note:** The curly braces are required around the node locator name.

 **Available Node Locators**

 The following table shows the node locators available out-of-the-box, the parameters they accept and their use.

 |Name|Class|Parameters|Usage|
|----|-----|----------|-----|
|companyhome|CompanyHomeNodeLocator|None|Returns the Company Home node|
|userhome|UserHomeNodeLocator|None|Returns the current user's home folder node|
|sharedhome|SharedHomeNodeLocator|None|Returns the Shared Home root node|
|siteshome|SitesHomeNodeLocator|None|Returns the Sites root node|
|doclib|DocLibNodeLocator|None|Returns the documentLibrary node for the site the source node belongs to|
|self|SelfNodeLocator|None|Returns the source node|
|xpath|XPathNodeLocator|query, store_type and store_id|Returns the node pointed to by the given XPath query. The XPath should be relative to the root of a store. If a source node is provided the Store is taken from the node, otherwise the store_type and store_id must be provided.|
|ancestor|AncestorNodeLocator|type and aspect|Returns an ancestor node of the source node. If no parameters are provided the immediate parent is returned. If a type parameter is present the first ancestor node of that type is returned. If an aspect parameter is present the first ancestor node with that aspect applied is returned. The type and aspect parameters can be combined thus finding an ancestor node of a certain type and with a specific aspect applied.|

|
|Deployment - App Server|It is not likely that you will deploy Java extensions directly into a Tomcat application server as classes and Spring context files. Use an SDK build project instead.|
|[Deployment All-in-One SDK project]({% link content-services/5.2/develop/sdk.md %}#getting-started-with-alfresco-content-services-sdk-3).|-   Java source code: aio/platform-jar/src/main/java/{domain specific package path}
-   Spring beans: aio/platform-jar/src/main/resources/alfresco/module/platform-jar/context/service-context.xml

|
|Java API|[Java API documentation](http://dev.alfresco.com/resource/AlfrescoOne/5.1/PublicAPI/org/alfresco/repo/nodelocator/NodeLocatorService.html)|
|Java example|See Description for example.|
|More Information|-   [Java API - Access and Transaction Management documentation]({% link content-services/5.2/develop/reference/java-foundation-ref.md %}).

|

## PermissionService {#permissionservice}

Provides an API for managing the node permissions. Permissions specify users and groups that have access to a node. Each user and group can be assigned a role.

|Information|PermissionService|
|-----------|-----------------|
|Support Status|[Full Support]({% link support/latest/policies/product-lifecycle.md %})|
|Architecture Information|[Platform Architecture]({% link content-services/5.2/develop/software-architecture.md %}#platform-architecture)|
|Description|The permission service is responsible for: -   Providing well known permissions and authorities
-   Providing an API to read, set, and delete permissions for a node
-   Providing an API to query, enable, and disable permission inheritance for a node
-   Determining if the current, authenticated user has a permission for a node

 The PermissionService interface defines constants for well-known permissions and authorities.

 The default implementation coordinates implementations of two service provider interfaces: a ModelDAO and a PermissionsDAO. A permission is simply a name scoped by the fully qualified name of the type or aspect to which it applies. The beans are defined and configured in <installLocation>\tomcat\webapps\alfresco\WEB-INF\classes\alfresco\public-services-security-context.xml. This file also contains the configuration for security enforcement.

 The ModelDAO interface defines an API to access a permissions model. The default permission model is in XML and defines permission sets, and their related permission groups and permissions. Global permissions are part of the permission model. There may be more than one permission model defined in XML; they are in practice merged into one permission model. A module can extend the permission model.

 The available permissions are defined in the permission model. This is defined in <installLocation>\tomcat\webapps\alfresco\WEB-INF\classes\alfresco\model\permissionDefinitions.xml. This configuration is loaded in a bean definition in <installLocation>\tomcat\webapps\alfresco\WEB-INF\classes\alfresco\public-services-security-context.xml. This file also defines global permissions. The definition file is read once at application start-up. If you make changes to this file, you will have to restart the repository in order to apply the changes.

|
|Deployment - App Server|It is not likely that you will deploy Java extensions directly into a Tomcat application server as classes and Spring context files. Use an SDK build project instead.|
|[Deployment All-in-One SDK project]({% link content-services/5.2/develop/sdk.md %}#getting-started-with-alfresco-content-services-sdk-3).|-   Java source code: aio/platform-jar/src/main/java/{domain specific package path}
-   Spring beans: aio/platform-jar/src/main/resources/alfresco/module/platform-jar/context/service-context.xml

|
|Java API|[Java API documentation](http://dev.alfresco.com/resource/AlfrescoOne/5.1/PublicAPI/org/alfresco/service/cmr/security/PermissionService.html)|
|Java example|```

                  
// Set permissions for a user on a node
permissionService.setPermission(nodeRef, "NameOfUser...", PermissionService.COORDINATOR, true);                  
                  
               
```

|
|More Information|-   [Java API - Access and Transaction Management documentation]({% link content-services/5.2/develop/reference/java-foundation-ref.md %}).
-   [Permissions platform extension point documentation]({% link content-services/5.2/develop/repo-ext-points/permissions.md %})

|

## PersonService {#personService}

This service encapsulates the management of people and groups. People and groups may be managed entirely in the repository or entirely in some other implementation such as LDAP or via NTLM. Some properties may be in the repository and some in another store. Individual properties may or may not be mutable.

|Information|PersonService|
|-----------|-------------|
|Support Status|[Full Support]({% link support/latest/policies/product-lifecycle.md %})|
|Architecture Information|[Platform Architecture]({% link content-services/5.2/develop/software-architecture.md %}#platform-architecture)|
|Description|The Person service supports various methods relating to users. The methods relating to the Person service include the ability to:

-   Look up people from user names
-   Create user information
-   Delete user information
-   Modify user information

|
|Deployment - App Server|It is not likely that you will deploy Java extensions directly into a Tomcat application server as classes and Spring context files. Use an SDK build project instead.|
|[Deployment All-in-One SDK project]({% link content-services/5.2/develop/sdk.md %}#getting-started-with-alfresco-content-services-sdk-3).|-   Java source code: aio/platform-jar/src/main/java/{domain specific package path}
-   Spring beans: aio/platform-jar/src/main/resources/alfresco/module/platform-jar/context/service-context.xml

|
|Java API|[Java API documentation](http://dev.alfresco.com/resource/AlfrescoOne/5.1/PublicAPI/org/alfresco/service/cmr/security/PersonService.html)|
|Java example|```

                  
// Create user with authentication
if (authenticationService.authenticationExists(userName) == false)
{
   authenticationService.createAuthentication(userName, password.toCharArray());

   Map user = new Map();
   user.put(ContentModel.PROP_USERNAME, userName);
   user.put(ContentModel.PROP_FIRSTNAME, "firstName");
   user.put(ContentModel.PROP_LASTNAME, "lastName");
   user.put(ContentModel.PROP_EMAIL, userName+"@example.com");
   user.put(ContentModel.PROP_JOBTITLE, "jobTitle");

   NodeRef person = personService.createPerson(user);

   // ...
}  
                  
               
```

|
|More Information|-   [Java API - Access and Transaction Management documentation]({% link content-services/5.2/develop/reference/java-foundation-ref.md %}).

|

## RenditionService {#renditionservice}

Provides support for rendering content nodes into other forms, known as renditions. The rendition nodes are derived from their source node and as such can be updated automatically when their source node's content (or other properties) are changed. Examples of renditions include reformatted content (essentially a transformation from one MIME-type to another), rescaled images (including thumbnails), and the output of a Freemarker or XSLT template. Renditions can be performed synchronously or asynchronously and can be created at a specified location within the repository. By default they are created as primary children of their source node but it is possible to have them created at other nodes specified explicitly or as templated paths.

|Information|RenditionService|
|-----------|----------------|
|Support Status|[Full Support]({% link support/latest/policies/product-lifecycle.md %})|
|Architecture Information|[Platform Architecture]({% link content-services/5.2/develop/software-architecture.md %}#platform-architecture)|
|Description|The DM Rendition Service provides support for rendering content nodes into other forms, known as renditions. The rendition nodes are derived from their source node and as such can be updated automatically when their source node's content (or other properties) are changed. Examples of renditions include: -   Reformatted content (essentially a transformation from one MIME-type to another)
-   Rescaled images (including thumbnails) the output of a Freemarker or XSLT template

 Renditions can be performed synchronously or asynchronously and can be created at a specified location within the repository. By default they are created as primary children of their source node but it is possible to have them created at other nodes specified explicitly or as templated paths.

 -   **Rendering Engines**

Are responsible for performing the transformation on a source node to create a rendition. Different Rendering Engines will perform different types of transformation. They can be registered with the Rendition Service using a unique name.

-   **Rendering Engine Definitions**

Provide a description of a given Rendering Engine. Each Rendering Engine Definition exposes parameter definitions for all the parameters which can be provided to the associated Rendering Engine. Each parameter definition describes the parameter name, type and whether or not it is mandatory.

-   **Rendition Definitions**

Encapsulate all the necessary information for rendering a given source node into a rendition. This includes the Rendering Engine which is used to perform the rendition and all the parameter values specified. Rendition Definitions have unique, qualified names and can be persisted within the repository.

-   **Composite Rendition Definitions**

are a special type of Rendition Definition which allow the creation of renditions which require a sequence of two or more transformation steps. For example, a Composite Rendition Definition could be used to first reformat a PDF document into a PNG image and then resize the image to a small thumbnail. Composite Rendition Definitions specify an ordered list of other Rendition Definitions to be sequentially executed, with the output of the previous transformation feeding in as the source node for the next definition. All Composite Rendition Definitions specify the Composite Rendering Engine for their transformations.


 Available rendering engines include:

 -   Base rendering engine
-   Reformat rendering engine
-   Image rendering engine
-   FreeMarker rendering engine
-   XSLT rendering engine
-   HTML rendering engine
-   Composite rendering engine

|
|Deployment - App Server|It is not likely that you will deploy Java extensions directly into a Tomcat application server as classes and Spring context files. Use an SDK build project instead.|
|[Deployment All-in-One SDK project]({% link content-services/5.2/develop/sdk.md %}#getting-started-with-alfresco-content-services-sdk-3).|-   Java source code: aio/platform-jar/src/main/java/{domain specific package path}
-   Spring beans: aio/platform-jar/src/main/resources/alfresco/module/platform-jar/context/service-context.xml

|
|Java API|[Java API Documentation](http://dev.alfresco.com/resource/AlfrescoOne/5.1/PublicAPI/org/alfresco/service/cmr/rendition/RenditionService.html)|
|Java example|**Registering a new Rendering Engine**

 Rendering Engines are registered with the Rendition Service through Spring dependency injection. rendition-services-context.xml declares an abstract bean called baseRenderingAction which is the parent bean for all rendering engines. baseRenderingAction itself is a child bean of the ActionService's action-executer bean.

 In Alfresco Content Services, there are a number of concrete rendering engine beans, for example, reformat within the same spring context file. To register a new rendering engine, add new spring bean definitions.

 **Retrieving registered Rendering Engine Definitions**

 ```

                
// Rendering Engine Definitions can be retrieved
// 1. as a list of all registered engine definitions

List<RenderingEngineDefinition> engineDefs = renditionService.getRenderingEngineDefinitions();

// 2. by name
// This name must be the same as the spring bean name used for the rendering engine.

String renderingEngineName = "myEngineName";
RenderingEngineDefinition engineDef = renditionService.getRenderingEngineDefinition(renderingEngineName);
             
```

 **Creating a Rendition Definition**

 ```


// Names must be provided for the rendition definition and the rendering engine to use.
QName  renditionName       = QName.createQName(NamespaceService.CONTENT_MODEL_1_0_URI, "myRendDefn");
String renderingEngineName = ReformatRenderingEngine.NAME;

// Create the Rendition Definition object.
RenditionDefinition renditionDef = renditionService.createRenditionDefinition(renditionName, renderingEngineName);

// Set parameters on the rendition definition.
renditionDef.setParameterValue(AbstractRenderingEngine.PARAM_MIME_TYPE, MimetypeMap.MIMETYPE_PDF);


```

 **Storing a Rendition Definition**

 ```


// Store the Rendition Definition using the QName
// of the Rendition Definition as a unique identifier.
renditionService.saveRenditionDefinition(renditionDef);


```

 **Retrieving a Rendition Definition**

 ```


// Rendition Definitions can be retrieved:
// 1. As a list of all stored Rendition Definitions
List<RenditionDefinition> definitions = renditionService.loadRenditionDefinitions();

// 2. As a list of stored Rendition Definitions filtered by Rendering Engine name.
String renderingEngineName = "myEngineName";
List<RenditionDefinition> definitions = renditionService.loadRenditionDefinitions();

// 3. As a single Rendition Definition, uniquely identified by its QName.
QName renditionName = QName.createQName(NamespaceService.CONTENT_MODEL_1_0_URI, "myRendDefn");
RenditionDefinition renditionDef = renditionService.loadRenditionDefinition(renditionName);


```

 **Editing an existing Rendition Definition**

 ```


// Retrieve the existing Rendition Definition
QName renditionName = QName.createQName(NamespaceService.CONTENT_MODEL_1_0_URI, "myRendDefn");
RenditionDefinition renditionDef = renditionService.loadRenditionDefinition(renditionName);

// Make changes.
renditionDef.setParameterValue(AbstractRenderingEngine.PARAM_MIME_TYPE, MimetypeMap.MIMETYPE_PDF);
renditionDef.setParameterValue(RenditionService.PARAM_ORPHAN_EXISTING_RENDITION, true);

// Persist the changes.
renditionService.saveRenditionDefinition(renditionDef);


```

 **Performing a simple rendition**

 ```


// A rendition definition is required to perform any rendition.
// The rendition definition can be loaded from the repository or created as shown above.
NodeRef sourceNode = // obtained in the usual way e.g. from nodeService
ChildAssociationRef renditionAssoc = renditionService.render(sourceNode, renditionDef);


```

 **Performing a composite rendition**

 ```


// First obtain a Composite Rendition Definition
// This can be loaded from the repository or created as shown here.
QName renditionName = QName.createQName(NamespaceService.CONTENT_MODEL_1_0_URI, "myRendDefn");
CompositeRenditionDefinition compositeDefinition  = 
renditionService.createCompositeRenditionDefinition(renditionName);

// Now specify which other renditions are to be performed as part of the composite rendition.
RenditionDefinition reformatDefinition = renditionService.load(reformatRenditionName);
RenditionDefinition rescaleImageDefinition = renditionService.load(rescaleImageRenditionName);

compositeDefinition.addAction(reformatDefinition);
compositeDefinition.addAction(rescaleImageDefinition);

// Perform the composite rendition
NodeRef sourceNode = // obtained in the usual way e.g. from nodeService
ChildAssociationRef renditionAssoc = renditionService.render(sourceNode, compositeDefinition);


```

 **Retrieving renditions for a node**

 ```


NodeRef sourceNode = // obtained in the usual way e.g. from nodeService

// 1. Get all renditions with the specified node as their source.
List<ChildAssociationRef> allRenditions = renditionService.getRenditions(sourceNode);

// 2. Get the rendition with the specified source node and the specified rendition definition name.
//    If there is no matching rendition, null is returned
QName renditionName = QName.createQName(NamespaceService.CONTENT_MODEL_1_0_URI, "myRenditionDef");
ChildAssociationRef rendition = renditionService.getRenditionByName(sourceNode, renditionName);

// 3. Get the renditions with the specified source node whose MIME types match a filter
//    This example returns renditions whose mimetype starts with "image".
List<ChildAssociationRef> imageRenditions = renditionService.getRenditions(sourceNode, "image");



```

 **Specifying a RenditionDefinition as asynchronous or synchronous**

 This behaviour is inherited from the ActionService - remember that RenditionDefinition extends Action. So we can create a Rendition Definition as shown above and set it to execute asynchronously:

 ```


RenditionDefinition renditionDef = // created as shown above

renditionDef.setExecuteAsynchronously(true);


```

|
|More Information|-   [Java API - Access and Transaction Management documentation]({% link content-services/5.2/develop/reference/java-foundation-ref.md %}).
-   [Mimetypes platform extension documentation]({% link content-services/5.2/develop/repo-ext-points/mimetypes.md %})

|

## RetryingTransactionHelper {#retryingtransactionhelper}

A helper that runs a unit of work inside a UserTransaction, transparently retrying the unit of work if the cause of failure is an optimistic locking or deadlock condition.

|Information|RetryingTransactionHelper|
|-----------|-------------------------|
|Support Status|[Full Support]({% link support/latest/policies/product-lifecycle.md %})|
|Architecture Information|[Platform Architecture]({% link content-services/5.2/develop/software-architecture.md %}#platform-architecture)|
|Description|A description and application of the RetryingTransactionHelper can be found [Repository Java API]({% link content-services/5.2/develop/reference/java-foundation-ref.md %}).|
|Deployment - App Server|It is not likely that you will deploy Java extensions directly into a Tomcat application server as classes and Spring context files. Use an SDK build project instead.|
|[Deployment All-in-One SDK project]({% link content-services/5.2/develop/sdk.md %}#getting-started-with-alfresco-content-services-sdk-3).|-   Java source code: aio/platform-jar/src/main/java/{domain specific package path}
-   Spring beans: aio/platform-jar/src/main/resources/alfresco/module/platform-jar/context/service-context.xml

|
|Java API|[Java API Documentation](http://dev.alfresco.com/resource/AlfrescoOne/5.1/PublicAPI/org/alfresco/repo/transaction/RetryingTransactionHelper.html)|
|Java example|See [Repository Java API]({% link content-services/5.2/develop/reference/java-foundation-ref.md %}).|
|More Information|See [Repository Java API]({% link content-services/5.2/develop/reference/java-foundation-ref.md %}).|

## SearchService {#searchservice}

This encapsulates the execution of search against different indexing mechanisms.

|Information|SearchService|
|-----------|-------------|
|Support Status|[Full Support]({% link support/latest/policies/product-lifecycle.md %})|
|Architecture Information|[Platform Architecture]({% link content-services/5.2/develop/software-architecture.md %}#platform-architecture)|
|Description|Solr provides indexing of metadata and the plain text of content. This can be queried using various query languages. The query languages supported include: -   LANGUAGE_CMIS_ALFRESCO
-   LANGUAGE_CMIS_STRICT
-   LANGUAGE_FTS_ALFRESCO
-   LANGUAGE_LUCENE
-   LANGUAGE_SOLR_ALFRESCO
-   LANGUAGE_SOLR_CMIS
-   LANGUAGE_SOLR_FTS_ALFRESCO
-   LANGUAGE_XPATH

|
|Deployment - App Server|It is not likely that you will deploy Java extensions directly into a Tomcat application server as classes and Spring context files. Use an SDK build project instead.|
|[Deployment All-in-One SDK project]({% link content-services/5.2/develop/sdk.md %}#getting-started-with-alfresco-content-services-sdk-3).|-   Java source code: aio/platform-jar/src/main/java/{domain specific package path}
-   Spring beans: aio/platform-jar/src/main/resources/alfresco/module/platform-jar/context/service-context.xml

|
|Java API|[Java API Documentation](http://dev.alfresco.com/resource/AlfrescoOne/5.1/PublicAPI/org/alfresco/service/cmr/search/SearchService.html)|
|Java example|```

                  
// Simple example
ResultSet results = searchService.query(storeRef, SearchService.LANGUAGE_FTS_ALFRESCO, "quick");
                  
// Find all the nodes under the root node by QName namespace:one
// The prefix must be resolved to a URI
ResultSet results = searcher.query(rootNodeRef.getStoreRef(), "lucene", "PATH:\"/namespace:one\"", null, null);
results = searcher.query(storeRef, "lucene", "PATH:\"/namespace:one/namespace:five\"", null, null);
results = searcher.query(storeRef, "lucene", "PATH:\"/namespace:one/namespace:five/namespace:twelve\"", null, null);
results = searcher.query(storeRef, "lucene", "PATH:\"/namespace:*\"", null, null);
results = searcher.query(storeRef, "lucene", "PATH:\"/namespace:*/namespace:*\"", null, null);
results = searcher.query(storeRef, "lucene", "PATH:\"/namespace:*/namespace:*/namespace:*\"", null, null);
results = searcher.query(storeRef, "lucene", "PATH:\"/namespace:one/namespace:*\"", null, null);
results = searcher.query(storeRef, "lucene", "PATH:\"/namespace:*/namespace:five/namespace:*\"", null, null);
results = searcher.query(storeRef, "lucene", "PATH:\"/namespace:one/namespace:*/namespace:nine\"", null, null);
results = searcher.query(storeRef, "lucene", "PATH:\"/*\"", null, null);
results = searcher.query(storeRef, "lucene", "PATH:\"/*/*\"", null, null);
results = searcher.query(storeRef, "lucene", "PATH:\"/*/namespace:five\"", null, null);
results = searcher.query(storeRef, "lucene", "PATH:\"/*/*/*\"", null, null);
results = searcher.query(storeRef, "lucene", "PATH:\"/namespace:one/*\"", null, null);
results = searcher.query(storeRef, "lucene", "PATH:\"/*/namespace:five/*\"", null, null);
results = searcher.query(storeRef, "lucene", "PATH:\"/namespace:one/*/namespace:nine\"", null, null);
results = searcher.query(storeRef, "lucene", "PATH:\"//.\"", null, null);
results = searcher.query(storeRef, "lucene", "PATH:\"//*\"", null, null);
results = searcher.query(storeRef, "lucene", "PATH:\"//*/.\"", null, null);
results = searcher.query(storeRef, "lucene", "PATH:\"//*/./.\"", null, null);
results = searcher.query(storeRef, "lucene", "PATH:\"//./*\"", null, null);
results = searcher.query(storeRef, "lucene", "PATH:\"//././*/././.\"", null, null);

// Examples using the default namespace
results = searcher.query(storeRef, "lucene", "PATH:\"//common\"", null, null);
results = searcher.query(storeRef, "lucene", "PATH:\"/one//common\"", null, null);
results = searcher.query(storeRef, "lucene", "PATH:\"/one/five//*\"", null, null);
results = searcher.query(storeRef, "lucene", "PATH:\"/one/five//.\"", null, null);
results = searcher.query(storeRef, "lucene", "PATH:\"/one//five/nine\"", null, null);
results = searcher.query(storeRef, "lucene", "PATH:\"/one//thirteen/fourteen\"", null, null);
results = searcher.query(storeRef, "lucene", "PATH:\"/one//thirteen/fourteen//.\"", null, null);
results = searcher.query(storeRef, "lucene", "PATH:\"/one//thirteen/fourteen//.//.\"", null, null);

// Type based queries.
// escapeQName uses QueryParser static method to escape the string.

QName qname = QName.createQName(NamespaceService.ALFRESCO_URI, "int-ista");
results = searcher.query(storeRef, "lucene", "\@" + escapeQName(qname) + ":\"01\"", null, null);

qname = QName.createQName(NamespaceService.ALFRESCO_URI, "long-ista");
results = searcher.query(storeRef, "lucene", "\@" + escapeQName(qname) + ":\"2\"", null, null);
    
qname = QName.createQName(NamespaceService.ALFRESCO_URI, "float-ista");
results = searcher.query(storeRef, "lucene", "\@" + escapeQName(qname) + ":\"3.4\"", null, null);
      
results = searcher.query(storeRef, "lucene", "\@" + escapeQName(QName.createQName(NamespaceService.ALFRESCO_URI, "double-ista")) + ":\"5.6\"", null, null);
   
Date date = new Date();
String sDate = CachingDateFormat.getDateFormat().format(date);
results = searcher.query(storeRef, "lucene", "\@" + escapeQName(QName.createQName(NamespaceService.ALFRESCO_URI, "date-ista")) + ":\"" + sDate + "\"", null, null);
    
results = searcher.query(storeRef, "lucene",
               "\@" + escapeQName(QName.createQName(NamespaceService.ALFRESCO_URI, "datetime-ista")) + ":\"" + sDate + "\"", null, null);

results = searcher.query(storeRef, "lucene", "\@" + escapeQName(QName.createQName(NamespaceService.ALFRESCO_URI, "boolean-ista")) + ":\"true\"", null,
               null);

results = searcher.query(storeRef, "lucene", "\@" + escapeQName(QName.createQName(NamespaceService.ALFRESCO_URI, "qname-ista")) + ":\"{wibble}wobble\"",
               null, null);
results = searcher.query(storeRef, "lucene", "\@" + escapeQName(QName.createQName(NamespaceService.ALFRESCO_URI, "guid-ista")) + ":\"My-GUID\"", null,
               null);
  
results = searcher.query(storeRef, "lucene", "\@" + escapeQName(QName.createQName(NamespaceService.ALFRESCO_URI, "category-ista")) + ":\"CategoryId\"",
               null, null);
 
results = searcher.query(storeRef, "lucene", "\@" + escapeQName(QName.createQName(NamespaceService.ALFRESCO_URI, "noderef-ista")) + ":\"" + n1 + "\"",
               null, null);
          
results = searcher.query(storeRef, "lucene", "\@" + escapeQName(QName.createQName(NamespaceService.ALFRESCO_URI, "path-ista")) + ":\""
               + nodeService.getPath(n3) + "\"", null, null);
      

// Queries based on type.

results = searcher.query(storeRef, "lucene", "TYPE:\"" + testType.toString() + "\"", null, null);
    
results = searcher.query(storeRef, "lucene", "TYPE:\"" + testSuperType.toString() + "\"", null, null);

results = searcher.query(storeRef, "lucene", "ASPECT:\"" + testAspect.toString() + "\"", null, null);
      
results = searcher.query(storeRef, "lucene", "ASPECT:\"" + testSuperAspect.toString() + "\"", null, null);
   

// Full text search examples

results = searcher.query(storeRef, "lucene", "TEXT:\"fox\"", null, null);
       
QName queryQName = QName.createQName("alf:test1", namespacePrefixResolver);
results = searcher.query(storeRef, queryQName, null);
       

// Canned queries and query parameters

queryQName = QName.createQName("alf:test2", namespacePrefixResolver);
results = searcher.query(storeRef, queryQName, null);
       
queryQName = QName.createQName("alf:test2", namespacePrefixResolver);
QueryParameter qp = new QueryParameter(QName.createQName("alf:banana", namespacePrefixResolver), "woof");
results = searcher.query(storeRef, queryQName, new QueryParameter[] { qp });
      
queryQName = QName.createQName("alf:test3", namespacePrefixResolver);
qp = new QueryParameter(QName.createQName("alf:banana", namespacePrefixResolver), "/one/five//*");
results = searcher.query(storeRef, queryQName, new QueryParameter[] { qp });
    
// TODO: should not have a null property type definition
QueryParameterDefImpl paramDef = new QueryParameterDefImpl(QName.createQName("alf:lemur", namespacePrefixResolver), (PropertyTypeDefinition) null, true, "fox");
results = searcher.query(storeRef, "lucene", "TEXT:\"${alf:lemur}\"", null, new QueryParameterDefinition[] { paramDef });
       
paramDef = new QueryParameterDefImpl(QName.createQName("alf:intvalue", namespacePrefixResolver), (PropertyTypeDefinition) null, true, "1");
qname = QName.createQName(NamespaceService.ALFRESCO_URI, "int-ista");
results = searcher.query(storeRef, "lucene", "\@" + escapeQName(qname) + ":\"${alf:intvalue}\"", null, new QueryParameterDefinition[] { paramDef });

// Other

results = searcher.query(rootNodeRef.getStoreRef(), "lucene", "PARENT:\"" + rootNodeRef.toString() + "\"", null, null);
       
results = searcher.query(rootNodeRef.getStoreRef(), "lucene", "+PARENT:\"" + rootNodeRef.toString() + "\" +QNAME:\"one\"", null, null);
                  
                  
               
```

|
|More Information|-   [Java API - Access and Transaction Management documentation]({% link content-services/5.2/develop/reference/java-foundation-ref.md %}).

|

## SiteService {#siteService}

Provides an extensive API for managing sites in Alfresco Share.

|Information|SiteService|
|-----------|-----------|
|Support Status|[Full Support]({% link support/latest/policies/product-lifecycle.md %})|
|Architecture Information|[Platform Architecture]({% link content-services/5.2/develop/software-architecture.md %}#platform-architecture)|
|Description|The SiteService provides an extension API for creating, deleting and managing Share Sites. Both JavaScript and Java APIs are available, and access to Sites is also possible via the REST API.|
|Deployment - App Server|It is not likely that you will deploy Java extensions directly into a Tomcat application server as classes and Spring context files. Use an SDK build project instead.|
|[Deployment All-in-One SDK project]({% link content-services/5.2/develop/sdk.md %}#getting-started-with-alfresco-content-services-sdk-3).|-   Java source code: aio/platform-jar/src/main/java/{domain specific package path}
-   Spring beans: aio/platform-jar/src/main/resources/alfresco/module/platform-jar/context/service-context.xml

|
|Java API|[Java API Documentation](http://dev.alfresco.com/resource/AlfrescoOne/5.1/PublicAPI/org/alfresco/service/cmr/site/SiteService.html)|
|Java example|```

                  
// Using siteService to obtain info about site                  
SiteInfo siteInfo = siteService.getSite(nodeRef);
String siteShortName = siteInfo.getShortName();
String siteGroup = siteService.getSiteGroup(siteShortName);                  
                  
               
```

|
|More Information|-   [Java API - Access and Transaction Management documentation]({% link content-services/5.2/develop/reference/java-foundation-ref.md %}).

|

## TaggingService {#taggingservice}

It is possible to tag (a text label) any content, including folders. This service provides an API for creating, deleting, and adding tags, and other tag management methods.

|Information|TaggingService|
|-----------|--------------|
|Support Status|[Full Support]({% link support/latest/policies/product-lifecycle.md %})|
|Architecture Information|[Platform Architecture]({% link content-services/5.2/develop/software-architecture.md %}#platform-architecture)|
|Description|Tags are simple text labels that are attached to a piece of content. Each piece of content can have multiple tags. Folders also have a TagScope object which encapsulates information about the tags used on content in that folder. The [JavaScript TagScope](#tagscope-object) object provides a simple illustration of what a TagScope represents. The TagScope object contains an array that lists Tags in count order. There are methods to find out how many times a particualr tag is used.|
|Deployment - App Server|It is not likely that you will deploy Java extensions directly into a Tomcat application server as classes and Spring context files. Use an SDK build project instead.|
|[Deployment All-in-One SDK project]({% link content-services/5.2/develop/sdk.md %}#getting-started-with-alfresco-content-services-sdk-3).|-   Java source code: aio/platform-jar/src/main/java/{domain specific package path}
-   Spring beans: aio/platform-jar/src/main/resources/alfresco/module/platform-jar/context/service-context.xml

|
|Java API|[Java API documentation](http://dev.alfresco.com/resource/AlfrescoOne/5.1/PublicAPI/org/alfresco/service/cmr/tagging/TaggingService.html)|
|Java example|```

               
// Get tags applied to node 

List<String> tags = taggingService.getTags(nodeRef);               
               
            
```

|
|More Information|-   [Java API - Access and Transaction Management documentation]({% link content-services/5.2/develop/reference/java-foundation-ref.md %}).

|

## TemplateService {#templateservice}

Provides an API for executing template engine against a template file and data model. The service provides a configured list of available template engines. The template file can either be in the repository (passed as NodeRef string) or on the classpath. Also a template can be passed directly as a String using the `processTemplateString()` methods. The data model is specified to the template engine. The FreeMarker template engine is used by default.

|Information|TemplateService|
|-----------|---------------|
|Support Status|[Full Support]({% link support/latest/policies/product-lifecycle.md %})|
|Architecture Information|[Platform Architecture]({% link content-services/5.2/develop/software-architecture.md %}#platform-architecture)|
|Description| |
|Deployment - App Server|It is not likely that you will deploy Java extensions directly into a Tomcat application server as classes and Spring context files. Use an SDK build project instead.|
|[Deployment All-in-One SDK project]({% link content-services/5.2/develop/sdk.md %}#getting-started-with-alfresco-content-services-sdk-3).|-   Java source code: aio/platform-jar/src/main/java/{domain specific package path}
-   Spring beans: aio/platform-jar/src/main/resources/alfresco/module/platform-jar/context/service-context.xml

|
|Java API|[Java API documentation](http://dev.alfresco.com/resource/AlfrescoOne/5.1/PublicAPI/org/alfresco/service/cmr/repository/TemplateService.html)|
|Java example|```

                  
// build the email template model
final Map<String, Object> model = createEmailTemplateModel(nodeRef);

// process the template against the model
text = templateService.processTemplate("freemarker", templateRef.toString(), model);                  
                  
               
```

|
|More Information|-   [Java API - Access and Transaction Management documentation]({% link content-services/5.2/develop/reference/java-foundation-ref.md %}).
-   [Template Reference Guide](#freemarker-api)

|

## TenantService {#tenantservice}

Provides APIs for the multi-tenancy capability. The service is applicable in both Single Tenancy and Multi Tenancy arrangements.

|Information|TenantService|
|-----------|-------------|
|Support Status|[Full Support]({% link support/latest/policies/product-lifecycle.md %})|
|Architecture Information|[Platform Architecture]({% link content-services/5.2/develop/software-architecture.md %}#platform-architecture)|
|Description|Multi-tenancy is supported by the Alfresco repository. Read more about it [here]({% link content-services/5.2/admin/multi-tenancy.md %}#setting-up-multi-tenancy). The `TenantService` is used by Alfresco repository code to rewrite `NodeRef`s, `StoreRef`s etc so they include a tenant domain when running in a multi tenant environment, which makes it possible to handle multiple tenants in parallel.When you use the `TenantService` in a single tenant environment the methods are either NOOP, return what you pass in, or return empty domain for domain related methods.

|
|Deployment - App Server|It is not likely that you will deploy Java extensions directly into a Tomcat application server as classes and Spring context files. Use an SDK build project instead.|
|[Deployment All-in-One SDK project]({% link content-services/5.2/develop/sdk.md %}#getting-started-with-alfresco-content-services-sdk-3).|-   Java source code: aio/platform-jar/src/main/java/{domain specific package path}
-   Spring beans: aio/platform-jar/src/main/resources/alfresco/module/platform-jar/context/service-context.xml

|
|Java API|[Java API documentation](http://dev.alfresco.com/resource/AlfrescoOne/5.1/PublicAPI/org/alfresco/repo/tenant/TenantService.html)|
|Java example|The following code shows an example of how a `NodeRef` and a `StoreRef` can be rewritten to be multi-tenant aware:

 ```
NodeRef nodeRef = "some node reference that needs to be rewritten for a specific tenant domain";
NodeRef tenantNodeRef = serviceRegistry.getTenantService().getName(nodeRef);

String store = "some repository store that needs to be rewritten for a specific tenant domain";
StoreRef storeRef = serviceRegistry.getTenantService().getName(new StoreRef(store));
```

 In a single tenant environment these `getName` operations would have no effect.

|
|More Information|-   [Java API - Access and Transaction Management documentation]({% link content-services/5.2/develop/reference/java-foundation-ref.md %}).

|

## VersionService {#versionservice}

Provides an API for managing the versions of a piece of content.

|Information|VersionService|
|-----------|--------------|
|Support Status|[Full Support]({% link support/latest/policies/product-lifecycle.md %})|
|Architecture Information|[Platform Architecture]({% link content-services/5.2/develop/software-architecture.md %}#platform-architecture)|
|Description|Alfresco has a strong versioning story, which gives you the ability to version any content stored in the repository, no matter what the file type (**note**. folders are not versionable). Versions are full files and not diffs of the files. Alfresco gives you the ability to have both major and minor versions of content. Versions can be created/updated by checkout/checkin, by rule, through any interface or through script/APIs.

If a content file has the aspect `versionable` applied to it, then multiple versions of the file can be managed. The `VersionService` provides an API to allow you to do this programmatically: -   `createVersion` - this creates a new version of the file, which is placed at the end of the appropriate version history. If the file has no version history then one is created and this version is considered to be the initial version.
-   `getVersionHistory` - this gets the version history that relates to the file.
-   `deleteVersionHistory` - this deletes the version history for a versioned file.
-   `getCurrentVersion` - gets the current version for a file.
-   `revert` - reverts the state of a file to that of a previous version.
-   `restore` - restores a previously deleted file from a version in its version history.

|
|Deployment - App Server|It is not likely that you will deploy Java extensions directly into a Tomcat application server as classes and Spring context files. Use an SDK build project instead.|
|[Deployment All-in-One SDK project]({% link content-services/5.2/develop/sdk.md %}#getting-started-with-alfresco-content-services-sdk-3).|-   Java files: aio/platform-jar/src/main/java/{package path}
-   Spring beans: aio/platform-jar/src/main/resources/alfresco/module/platform-jar/context/service-context.xml

|
|Java API|[Java API documentation](http://dev.alfresco.com/resource/AlfrescoOne/5.1/PublicAPI/org/alfresco/service/cmr/version/VersionService.html)|
|Java example|Alfresco provides the ability to apply behaviors / policies to content/metadata within the repository. You can think of these as event listeners, that allow you to take custom actions based on what is happening within the repository. In this example we are listening to the `afterCreateVersion` event and then we check if we have reached the maximum number of versions that we want to store, if we have, then we delete the last one (by default Alfresco has no limit of how many versions it stores):

 ```
import org.alfresco.repo.policy.Behaviour;
import org.alfresco.repo.policy.JavaBehaviour;
import org.alfresco.repo.policy.PolicyComponent;
import org.alfresco.repo.version.VersionServicePolicies;
import org.alfresco.service.ServiceRegistry;
import org.alfresco.service.cmr.repository.NodeRef;
import org.alfresco.service.cmr.version.Version;
import org.alfresco.service.cmr.version.VersionHistory;
import org.alfresco.service.namespace.NamespaceService;
import org.alfresco.service.namespace.QName;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

public class MaxVersionPolicy implements VersionServicePolicies.AfterCreateVersionPolicy {
    private static Log logger = LogFactory.getLog(MaxVersionPolicy.class);

    /**
     * The Alfresco Service Registry that gives access to all public content services in Alfresco.
     */
    private ServiceRegistry serviceRegistry;

    private PolicyComponent policyComponent;
    private Behaviour afterCreateVersion;

    /**
     * Max number of versions we will store of a file in the repo
     */
    private int maxVersions;

    public void setPolicyComponent(PolicyComponent policyComponent) {
        this.policyComponent = policyComponent;
    }

    public void setServiceRegistry(ServiceRegistry serviceRegistry) {
        this.serviceRegistry = serviceRegistry;
    }

    public void setMaxVersions(int maxVersions) {
        this.maxVersions = maxVersions;
    }

    /**
     * Spring bean init() method
     */
    public void init() {
        this.afterCreateVersion = new JavaBehaviour(this, "afterCreateVersion",
                Behaviour.NotificationFrequency.TRANSACTION_COMMIT);

        this.policyComponent.bindClassBehaviour(QName.createQName(
                NamespaceService.ALFRESCO_URI, "afterCreateVersion"),
                MaxVersionPolicy.class, this.afterCreateVersion);
    }

    @Override
    public void afterCreateVersion(NodeRef versionableNode, Version version) {
        VersionHistory versionHistory = serviceRegistry.getVersionService().getVersionHistory(versionableNode);

        if (versionHistory != null) {
            logger.debug("Current number of versions: " + versionHistory.getAllVersions().size());
            logger.debug("least recent/root version: " + versionHistory.getRootVersion().getVersionLabel());

            // If the current number of versions in the VersionHistory is greater
            // than the maxVersions limit, remove the root/least recent version
            if (versionHistory.getAllVersions().size() > maxVersions) {
                logger.debug("Removing Version: " + versionHistory.getRootVersion().getVersionLabel());
                serviceRegistry.getVersionService().deleteVersion(versionableNode, versionHistory.getRootVersion());
            }
        } else {
            logger.debug("versionHistory does not exist");
        }
    }
}
```

 The Spring bean for the `MaxVersionPolicy` class looks like this:

 ```
<bean id="org.alfresco.training.maxVersion" 
        class="org.alfresco.training.platformsample.MaxVersionPolicy"
        init-method="init">
    <property name="policyComponent">
        <ref bean="policyComponent" />
    </property>
    <property name="serviceRegistry">
        <ref bean="ServiceRegistry" />
    </property>
    <!-- The max number of versions per versioned file -->
    <property name="maxVersions">
        <value>10</value>
    </property>
</bean>
```

|
|More Information|-   [Java API - Access and Transaction Management documentation]({% link content-services/5.2/develop/reference/java-foundation-ref.md %}).

|

## WorkflowService {#workflowservice}

Provides a client-facing API for interacting with workflows and tasks.

|Information|WorkflowService|
|-----------|---------------|
|Support Status|[Full Support]({% link support/latest/policies/product-lifecycle.md %})|
|Architecture Information|[Platform Architecture]({% link content-services/5.2/develop/software-architecture.md %}#platform-architecture)|
|Description|The Activiti workflow engine is built into Alfresco Content Services. You can [create and manage workflows]({% link content-services/5.2/admin/workflows.md %}) directly from your Dashboard. Of course, with the WorkflowService, you can create and manage these workflows programmatically. The default workflows out-of-the-box are: -   New Task
-   Assign a new task to yourself or a colleague
-   Review and approve (group review)
-   Assign a review task to a group
-   Review and Approve (one or more reviewers)
-   Assign a review task to multiple reviewers
-   Review and Approve (pooled review)
-   Assign a review task to multiple reviewers, who can take ownership of the task
-   Review and Approve (single reviewer)
-   Assign a review task to a single reviewer

 It is also possible to create custom workflows.

|
|Deployment - App Server|It is not likely that you will deploy Java extensions directly into a Tomcat application server as classes and Spring context files. Use an SDK build project instead.|
|[Deployment All-in-One SDK project]({% link content-services/5.2/develop/sdk.md %}#getting-started-with-alfresco-content-services-sdk-3).|-   Java source code: aio/platform-jar/src/main/java/{domain specific package path}
-   Spring beans: aio/platform-jar/src/main/resources/alfresco/module/platform-jar/context/service-context.xml

|
|Java API|[Java API Documentation](http://dev.alfresco.com/resource/AlfrescoOne/5.1/PublicAPI/org/alfresco/service/cmr/workflow/WorkflowService.html)|
|Java example|An extensive example of using the Workflow API is provided in the code ./projects/repository/source/java/org/alfresco/repo/workflow/WorkflowInterpreter.java.|
|More Information|-   [Java API - Access and Transaction Management documentation]({% link content-services/5.2/develop/reference/java-foundation-ref.md %}).
-   [Workflow platform extension point documentation]({% link content-services/5.2/develop/repo-ext-points/index.md %}#workflow)
-   [Creating and managing workflows]({% link content-services/5.2/admin/workflows.md %})


|
|Tutorials|-   [Creating Custom Advanced Workflows in Alfresco by Jeff Potts](https://ecmarchitect.com/alfresco-developer-series-tutorials/workflow/tutorial/tutorial.html)

|

## JavaScript API {#javascript-api}

The Repository JavaScript API lets you develop JavaScript (ECMAScript) 1.6 compatible files to access, modify, and create repository objects such as nodes, aspects, and properties.

Use the JavaScript API for web scripts that execute JavaScript in the repository.

You can use scripts to perform the following functions:

-   Find nodes
-   Perform searches
-   Walk node hierarchies
-   Modify the value of properties, aspects, and associations
-   Transform and manipulate content
-   Create groups, people, and modify permissions
-   Create new files, folders, or nodes
-   Copy, move, and delete nodes
-   Create, modify, and remove child and target associations between nodes
-   Include or import other scripts

-   **[About script files](#about-script-files)**  
Script files are generally located either on the classpath (for example, ./tomcat/shared/classes/alfresco/extension/templates/webscripts), or in a repository store (for example, the default repository in Company Home/Data Dictionary/Scripts)
-   **[Root objects]({%link content-services/5.2/develop/reference/repo-root-objects-ref.md %})**  
The JavaScript API provides a number of root objects which are available from your JavaScript code.
-   **[Scripting API](#scripting-api)**  
The JavaScript API provides a rich set of scriptable Java objects.
-   **[Services API](#services-api)**  
The Alfresco JavaScript Services API provides an interface to core services that can be accessed from web scripts.

## About script files {#about-script-files}

Script files are generally located either on the classpath (for example, ./tomcat/shared/classes/alfresco/extension/templates/webscripts), or in a repository store (for example, the default repository in Company Home/Data Dictionary/Scripts)

You can directly access scripts in the repository location using a URL with the appropriate read permissions on the script document. You can import scripts on the classpath into other scripts but you cannot execute them directly in Alfresco Share.

### Importing scripts

This feature allows you to build libraries of scripts for use by other scripts at runtime. The syntax to import the scripts is specific to Alfresco Content Services and is not a feature of standard JavaScript. For example, the `<script src='...'>` syntax, as supported by most web browsers, is not part of standard ECMA JavaScript and will not work in Alfresco Content Services.

The syntax to import other scripts is very strict and you must follow it exactly; otherwise, the import can fail. Import directives must be the first lines in the JavaScript file. This means that no code or comments are allowed above those lines, and the usual JavaScript code and comments appear after the import lines. Only the following syntax variants are supported:

-   Import a script from the repository using a name-based path:

    `<import resource="/Company Home/Data Dictionary/Scripts/library.js">`

-   Import a script from the repository using a NodeRef reference: 

    `<import resource="workspace://SpacesStore/6f73de1b-d3b4-11db-80cb-112e6c2ea048">`

-   Import a script from a Java classpath location:

    `<import resource="classpath:alfresco/extension/myutils.js">`


## Scripting API {#scripting-api}

The JavaScript API provides a rich set of scriptable Java objects.

Many root-scope objects are provided by default, such as access to the user home folder, company home folder, search, People API, and logging functionality. You can also configure additional root-scope objects for use with your own scripts.

-   **[ScriptNode API](#scriptnode-api)**  
In JavaScript code various parts of the underlying system can be conveniently exposed as objects of type `ScriptNode`. For example, the `companyhome`, `userhome`, `document`, `space`, and `person` objects are best represented as objects of type `ScriptNode`. The ScriptNode API provides access to properties and methods for manipulating this type of object.
-   **[Actions API](#actions-api)**  
The actions API provides a root level `actions` object that allows invocation of Alfresco Content Services actions registered with the repository.
-   **[Classification API](#classification-api)**  
The Classification API has two parts: manipulating classifications, and manipulating the categories they contain.
-   **[Logging API](#logging-api)**  
A root level `logger` object provides a number of methods to help debug scripts.
-   **[People API](#people-api)**  
The People API provides access to Alfresco Content Services people and groups.
-   **[ScriptAction API](#scriptaction-api)**  
A ScriptAction represents an action registered within the repository.
-   **[Search API](#search-api)**  
The Search API provides direct access to repository level search results and Saved Search results through the `search` root scope object.
-   **[Session API](#session-api)**  
A root level `session` object is provided to access the servelt web session.
-   **[SessionTicket API](#sessionticket-api)**  
A root level `sessionticket` object is provided to access the current logged in user session ticket as a string value.
-   **[Utility methods](#utility-methods)**  
A root level `utils` object is provided as a library of helper methods that are missing from generic JavaScript.

## ScriptNode API {#scriptnode-api}

In JavaScript code various parts of the underlying system can be conveniently exposed as objects of type `ScriptNode`. For example, the `companyhome`, `userhome`, `document`, `space`, and `person` objects are best represented as objects of type `ScriptNode`. The ScriptNode API provides access to properties and methods for manipulating this type of object.

### Additional APIs and properties

In addition to the properties shown in the [table](#scriptnode-api), the ScriptNode object API also exposes a number of additional properties and APIs which have been grouped by functional purpose in this documentation. These additional APIs include:

-   [Security API](#security/permissions-api)
-   [Ownership API](#ownership-api)
-   [Modifying and creating API](#modifying-and-creating-api)
-   [Checkin/Checkout API](#check-in/check-out-api)
-   [Versions API](#versions-api)
-   [Content API](#content-api)
-   [ScriptContentData API](#scriptcontentdata-api)
-   [Transformation API](#transformation-api)
-   [Thumbnail API](#thumbnail-api)
-   [Tagging API](#tagging-api)

### Properties

The following properties are available to use within scripts:

|Property|Read/write|Description|
|--------|----------|-----------|
|`activeWorkflows`|Read-only|Returns an array of all active workflows in which this node is involved. Null is returned if the node is not part of an active workflow.

 The following code snippet obtains a list of workflow objects for the file TEST_FILE_0.TXT:

 ```

var node = companyhome.childByNamePath("TEST_FILE_0.TXT");
var workflows = node.activeWorkflows;

```

|
|`aspects`|Read-only|A read-only array of the fully qualified QName strings applied to the node|
|`aspectsSet`|Read-only|A list of aspects applied to this node|
|`aspectsShort`|Read-only|An array of aspects as short prefix qnames applied to this node|
|`associations`|Read-only|The same as `assocs`|
|`assocs`|Read-only|A read-only associative array of the target associations of the node. Each named entry in the array contains an array of the script node objects on the end of the association. Example: `mynode.assocs["cm:translations"][0]`

|
|`childAssociations`|Read-only|Same as childAssocs|
|`childAssocs`|Read-only|A read-only associative array of the child associations of the node. Each named entry in the array contains an array of the script node objects on the end of the association. Example: `myforumnode.childAssocs["fm:discussion"][0]`

|
|`children`|Read-only|A read-only JavaScript array of the child node objects Example: `mynode.children[0]`

|
|`content`|Read-write|The content string for this node from the default content property (`ContentModel.PROP_CONTENT`).|
|`displayPath`|Read-only|A read-only display path to this node|
|`downloadUrl`|Read-only|For a content document this is a read-only string representing the download (as attachment) URL for the content. For a container node this would be an empty string.|
|`hasChildren`|Read-only|True if the node has children|
|`icon16`|Read-only|A read-only small icon image for this node|
|`icon32`|Read-only|A read-only large icon image for this node|
|`id`|Read-only|The GUID for the node|
|`isCategory`|Read-only|Returns true if this node is a category, or false otherwise|
|`isContainer`|Read-only|Returns true if the node is a folder node, or false otherwise|
|`isDocument`|Read-only|Returns true if this node is a document, or false otherwise|
|`isLinkToContainer`|Read-only|Returns true if this node is a link to a container, or false otherwise|
|`isLinkToDocument`|Read-only|Returns true if this node is a link to a document, or false otherwise|
|`isLocked`|Read-only|Returns true if the node is locked, or false otherwise. Once a node is checked out it becomes locked.|
|`mimetype`|Read-write|A read/write value representing the MIME type of the content|
|`name`|Read-write|Shortcut access to the `cm:name` property. Can be read and written to.|
|`nodeRef`|Read-only|The NodeRef corresponding to this node|
|`parent`|Read-only|Primary parent node. This will be null if this is the root node.|
|`parentAssociations`|Read-only|Same as parentAssocs|
|`parentAssocs`|Read-only|A read-only associative array of the parent associations of the node. Each named entry in the array contains an array of the script node objects on the end of the association. Example: `mynode.parentAssocs["cm:contains"][0]`

|
|`parents`|Read-only|Array of the parent nodes|
|`primaryParentAssoc`|Read-only|The primary parent association so it is possible to obtain the association QName and the association type QName|
|`properties`|Read-only|Provides access to all the properties of this node. The properties returned are accessed by using an associative array. Properties of a node can be accessed in the following ways: Example: `node.properties["name"]`

Example: `node.properties.name`

|
|`qnamePath`|Read-only|A read-only QName type path to this node|
|`qNameType`|Read-only|The QName type|
|`siteShortName`|Read-only|Returns the name of the site this node is contained within. If the node is not contained within a site, the value is null|
|`size`|Read-only|A read-only long value that represents the size (in bytes) of the content attached to the node from the default content property.|
|`sourceAssociations`|Read-only|The same as `sourceAssocs`|
|`sourceAssocs`|Read-only|A read-only associative array of the source associations of the node. Each named entry in the array contains an array of the script node objects on the end of the association. Example: `mynode.assocs["cm:translations"][0]`

|
|`storeId`|Read-only|The store id for the node|
|`storeType`|Read-only|The store type for the node|
|`type`|Read-only|Fully qualified QName type of the node|
|`typeShort`|Read-only|Returns the type of the node as a short form qname.|
|`url`|Read-only|For a content document, this method returns the URL to the content stream for the default content property. For a container node, this method returns the URL to browse to the folder in the web-client.|
|`webdavUrl`|Read-only|A read-only string representing the webdav URL for the content|

-   **[getPropertyNames](#getpropertynames)**  
`getPropertyNames(useShortQNames)` returns all the property names defined for this node as an array.
-   **[getTypePropertyNames](#gettypepropertynames)**  
`getTypePropertyNames` returns all the property names defined for this node's type as an array.
-   **[childByNamePath](#childbynamepath)**  
`childByNamePath(path)` performs a path-based query based on the name property of the nodes.
-   **[childrenByXPath](#childrenbyxpath)**  
`childrenByXPath(xpath)` performs an XPath-based query relative to the current node.
-   **[childFileFolders](#childfilefolders)**  
The `childFileFolders` methods are used to obtain an array of child files and folders for the node.
-   **[isScriptContent](#isscriptcontent)**  
`isScriptContent(obj)` determines whether the supplied node property value is a `ScriptContentData` object.
-   **[hasAspect](#hasaspect)**  
`hasAspect(type)` returns true if an aspect was applied to the node.
-   **[getChildAssocsByType](#getchildassocsbytype)**  
`getChildAssocsByType(String type)` returns an array of the associations from the referenced node that match a specific object type.
-   **[isSubType](#issubtype)**  
`isSubType(type)` determines if this node is a subtype of the specified type.
-   **[exists](#exists)**  
`exists()` checks whether the node exists in the repository.
-   **[reset](#reset)**  
`reset()` resets the node cached state of a node.
-   **[toJSON](#tojson)**  
`toJSON()` returns the JSON representation of this node.
-   **[Security/Permissions API](#security/permissions-api)**  
The Security ScriptNode API features several methods and properties related to permissions of nodes in the repository.
-   **[Ownership API](#ownership-api)**  
The Ownership ScriptNode API provides methods to get, set and take ownership of a node.
-   **[Modifying and creating API](#modifying-and-creating-api)**  
Most of the available ScriptNode API return read-only values, however the Scripting API also supports writable objects and access to repository services.
-   **[Check in/check out API](#check-in/check-out-api)**  
The check in/check out ScriptNode API features methods for check out, check in, and canceling check out of working copies.
-   **[Versions API](#versions-api)**  
The Versions ScriptNode API provides several methods and properties for managing and retrieving the versions of a document.
-   **[Content API](#content-api)**  
 The Content API provides several properties to manipulate node content directly. The content can also be manipulated using the ScriptContentData API.
-   **[ScriptContentData API](#scriptcontentdata-api)**  
The ScriptContentData API provides several methods and properties related to node properties of type `d:content`; for example, `document.properties.content`.
-   **[Transformation API](#transformation-api)**  
The Transformation API provides document, image, and FreeMarker template processing services in Alfresco.
-   **[Thumbnail API](#thumbnail-api)**  
A thumbnail is a transformation of content into a specified destination MIME type. This is most commonly an image of a particular size, but can also be other things, for example, a Flash rendition. The `ScriptNode` class provides several methods for generating and handling thumbnails.
-   **[Tagging API](#tagging-api)**  
A tag is a non-hierarchical keyword or term assigned to a piece of information.


## getPropertyNames {#getPropertyNames}

`getPropertyNames(useShortQNames)` returns all the property names defined for this node as an array.

### Parameters

-   **useShortQNames**

    If true short-form qnames will be returned, else long-form.


### Returns

Returns an array of property names for this node type and optionally parent properties.

### Example

```

var props = node.getPropertyNames(true);
      
```


## getTypePropertyNames {#gettypepropertynames}

`getTypePropertyNames` returns all the property names defined for this node's type as an array.

### getTypePropertyNames

`getTypePropertyNames(useShortQNames)` - Returns all the property names defined for this node's type as an array.

#### Returns

Returns an array of property names for this node's type. Short qnames are returned.

#### Example

```

var props = node.getTypePopertyNames();  
        
```

### getTypePropertyNames (boolean)

`getTypePropertyNames(useShortQNames)` - Return all the property names defined for this node's type as an array.

#### Parameters

-   **useShortQNames**

    If true short-form qnames will be returned, else long-form.


#### Returns

Returns an array of property names for this node's type.

#### Example

```

var props = node.getTypePopertyNames(false);  // return long form qnames
      
```

## childByNamePath {#childByNamePath}

`childByNamePath(path)` performs a path-based query based on the name property of the nodes.

### Parameters

-   **path**

    The path to the node.


### Returns

Returns a node found at the specified path relative to the current node. If this is not found, null is returned.

### Example

`var testingFolder =userhome.childByNamePath("QA/Performance/Testing");`

## childrenByXPath {#childrenByXPath}

`childrenByXPath(xpath)` performs an XPath-based query relative to the current node.

### Parameters

-   **xpath**

    XPath query to select nodes.


### Returns

Returns an array of the nodes found. If no results are matched, returns an empty array.

### Example

`var nodes = userhome.childrenByXPath("*[@cm:name='Finance Documents']/*");`

## childFileFolders {#childFileFolders}

The `childFileFolders` methods are used to obtain an array of child files and folders for the node.

### childFileFolders()

Returns an array of child files and folders for the node.

#### Returns

Returns a JavaScript array of child file and folder nodes for the node. It automatically retrieves all sub-types of `cm:content` and `cm:folder`, and removes system type folders from the results.

#### Example

`var nodes = node.childFileFolders();`

### childFileFolders(files, folders)

Returns an array of child files and folders for the node, and as modified by parameters.

#### Parameters

-   **files**

    A boolean value which if set to true specifies that files extending from `cm:content` should be returned.

-   **folders**

    A boolean value which if set to true specifies that folders extending from `cm:folder` should be returned, ignoring sub-types of `cm:systemfolder`.


#### Returns

Returns a JavaScript array of child file and folder nodes for the node. It automatically retrieves all sub-types of `cm:content` and `cm:folder`, and removes system type folders from the results.

#### Example

`var nodes = node.childFileFolders(false, true); // don't return files`

### childFileFolders(files, folders, ignoreTypes)

Returns an array of child files and folders for the node, and as modified by parameters.

#### Parameters

-   **files**

    A boolean value which if set to true specifies that files extending from `cm:content` should be returned.

-   **folders**

    A boolean value which if set to true specifies that folders extending from `cm:folder` should be returned, ignoring sub-types of `cm:systemfolder`.

-   **ignoreTypes**

    Can be set to filter nodes of the specified type or types from the results returned. The type is specified in either long or short QName string form, as a single string or as an array of strings to filter multiple types.


#### Returns

Returns a JavaScript array of child file and folder nodes for the node. It automatically retrieves all sub-types of `cm:content` and `cm:folder`, and removes system type folders from the results.

#### Example

`var nodes = node.childFileFolders(true, true, "cm:folder"); // ignore folders`

`var nodes = node.childFileFolders(true, true, ["cm:folder", "st:sites"]); // ignores folders and sites`

### childFileFolders(files, folders, ignoreTypes, maxItems)

Returns a `ScriptPagingNode` object containing child files and folders for the node, as well as information to control paging of results. Parameters can be used to filter results. It is also possible to limit the number of nodes returned in the results.

CAUTION:

This method is deprecated in version 4.0.

#### Parameters

-   **files**

    A boolean value which if set to true specifies that files extending from `cm:content` should be returned.

-   **folders**

    A boolean value which if set to true specifies that folders extending from `cm:folder` should be returned, ignoring sub-types of `cm:systemfolder`.

-   **ignoreTypes**

    Can be set to filter nodes of the specified type or types from the results returned. The type is specified in either long or short QName string form, as a single string or as an array of strings to filter multiple types.

-   **maxItems**

    An integer value which sets the maximum number of results to return.


#### Returns

Returns a `ScriptPagingNode` object. The results are limited to the number specified by `maxItems`.

#### Example

```

    var nodeNames = new Array();
    var nodes = null;
    var maxItems = 10;

    var results = companyhome.childFileFolders(true, false, "st:sites", maxItems);

    nodes = results.getPage();
    
    for (var n in nodes){
        nodeNames.push(nodes[n]['name']);
    }
        
```

### childFileFolders(files, folders, ignoreTypes, skipOffset, maxItems, requestTotalCountMax, sortProp, sortAsc, queryExecutionId)

Returns child files and folders of the node.

#### Parameters

-   **files**

    A boolean value which if set to true specifies that files extending from `cm:content` should be returned.

-   **folders**

    A boolean value which if set to true specifies that folders extending from `cm:folder` should be returned, ignoring sub-types of `cm:systemfolder`.

-   **ignoreTypes**

    Can be set to filter nodes of the specified type or types from the results returned. The type is specified in either long or short QName string form, as a single string or as an array of strings to filter multiple types.

-   **skipOffset**

    Number of items to skip. For example 0, or number of pages to skip * size of page.

-   **maxItems**

    An integer value which sets the maximum number of items, the size of the page.

-   **requestTotalCountMax**

    Request total count (up to a given max total count) Note, if set to 0 then total count is not requested and the query might be able to optimise/cutoff for max items.

-   **sortProp**

    Optional sort property as a prefix QName string, for example `cm:name`. Also supports special content cases such as `cm:content.size` and `cm:content.mimetype`.

-   **sortAsc**

    A boolean value. If true nodes will be sorted in ascending order, if false nodes will be sorted in descending order.

-   **queryExecutionId**

    If paging then can pass back the previous query execution (as a hint for possible query optimization). Note this parameter is not used, it is reserved for future use.


#### Returns

Returns a `ScriptPagingNode` containing child file and folder nodes for the node. It automatically retrieves all sub-types of `cm:content` and `cm:folder`, and removes system type folders from the results.

#### Example

```

    var queryExecutionId = null; // reserved for future use

    var results;
    var nodeNames = new Array(); // just store file names in a list
    var resultsTrimmed = false;
    var nodes = null;

    // get files ordered by name (exclude folders and st:sites)
    results = companyhome.childFileFolders(true, false, "st:sites", 0, 100, 0, "cm:name", true, queryExecutionId);

    nodes = results.getPage();
    
    for (var n in nodes){
        nodeNames.push(nodes[n]['name']);
    }

    resultsTrimmed = results.hasMoreItems(); // did we get all possible child files/folders?

        
```

## isScriptContent {#isScriptContent}

`isScriptContent(obj)` determines whether the supplied node property value is a `ScriptContentData` object.

### Parameters

-   **obj**

    Node property value


### Returns

Boolean. Returns true if the supplied node property value is a `ScriptContentData` object; otherwise, it returns false.

## hasAspect {#hasAspect}

`hasAspect(type)` returns true if an aspect was applied to the node.

### Parameters

-   **type**

    The type of aspect whose presence will be checked for. Examples include `cm:versionable` and `cm:templatable`.


### Returns

Boolean

### Example

```

var isTemplatable = document.hasAspect("cm:templatable");
...
var node = companyhome.childByNamePath("TEST_FILE_0.TXT");
model.result = node.hasAspect("cm:versionable");

```
## getChildAssocsByType {#getChildAssocsByType}

`getChildAssocsByType(String type)` returns an array of the associations from the referenced node that match a specific object type.

### Parameters

-   **type**

    A string representing the specific object type.


### Returns

Returns the aspects applied to this node as an array of short prefix qname strings.

### Example

```
var assoc = node.getChildAssocsByType("cm:folder")[0];
```

## isSubType {#issubtype}

`isSubType(type)` determines if this node is a subtype of the specified type.

### Parameters

-   **type**

    The qname type to test this object against (fully qualified or short-name form).


### Returns

Returns true if this node is a subtype of the specified type (or itself of that type).

## exists {#exists}

`exists()` checks whether the node exists in the repository.

### Returns

Returns a boolean, true if the node exists, false otherwise.

### Example

```

if (node.exists()){
  ...
}           
      
```

## reset {#reset}

`reset()` resets the node cached state of a node.

This resets properties as follows:

```

        this.name = null;
        this.type = null;
        this.properties = null;
        this.aspects = null;
        this.targetAssocs = null;
        this.sourceAssocs = null;
        this.childAssocs = null;
        this.children = null;
        this.hasChildren = null;
        this.parentAssocs = null;
        this.displayPath = null;
        this.qnamePath = null;
        this.isDocument = null;
        this.isContainer = null;
        this.parent = null;
        this.primaryParentAssoc = null;
        this.activeWorkflows = null;
        this.siteName = null;
        this.siteNameResolved = false;      
    
```

### Example

The following would reset the cached state of the node:

```

node.reset();

```

## toJSON {#toJSON}

`toJSON()` returns the JSON representation of this node.

### toJSON

`toJSON()` - returns the JSON representation of this node. Long-form QNames are used in the result.

#### Returns

Returns the JSON representation of this node.

### toJSON

`toJSON(boolean useShortQNames)` - returns the JSON representation of this node. Short-form QNames are used in the result.

#### Parameters

-   **boolean useShortQNames**

    If true, short-form QNames will be returned, else long-form QNames will be returned.


#### Returns

Returns the JSON representation of this node.

## Security/Permissions API {#security/permissions-api}

The Security ScriptNode API features several methods and properties related to permissions of nodes in the repository.

The Security API provides a wide range of methods for setting and getting permissions on nodes. It is good practice to check for the appropriate user permissions on a node before accessing or modifying it.

### Properties

-   **`permissions`**

    Array of permissions applied to this node, including inherited permissions.


-   **`directPermissions`**

    Array of permissions applied to this node, excluding inherited permissions.


-   **`fullPermissions`**

    Array of all permissions applied to this node, including inherited permissions.


-   **`settablePermissions`**

    Array of settable permissions for this node.


-   **[hasPermission](#haspermission)**  
`hasPermission(permission)` checks if a user has the specified permission on a node.
-   **[inheritsPermissions](#inheritspermissions)**  
`inheritsPermissions()` indicates whether the node inherits permissions.
-   **[setInheritsPermissions](#setinheritspermissions)**  
`setInheritsPermissions(inherit)` indicates that the node should inherit permissions from the parent node when set to true. Set to false to break the inheritance chain.
-   **[setPermission](#setpermission)**  
The `setPermission` methods apply permissions to nodes.
-   **[removePermission](#removepermission)**  
The `removePermission` methods remove permissions for users from a node.
-   **[getPermissions](#getpermissions)**  
`getPermissions()` returns an array of permissions attached to a node.

## hasPermission {#hasPermission}

`hasPermission(permission)` checks if a user has the specified permission on a node.

The default permissions are in org.alfresco.service.cmr.security.PermissionService. The most commonly used permission checks are:

-   Read
-   Write
-   Delete
-   AddChildren
-   CreateChildren

### Parameters

-   **permission**

    The specified permission


### Returns

Returns true if the user has the specified permission on the node.

## inheritsPermissions {#inheritspermissions}

`inheritsPermissions()` indicates whether the node inherits permissions.

### Returns

Returns true if the node currently inherits its permissions from the parent space, and returns false to indicate the permissions are set specifically on the node.

## setInheritsPermissions {#setinheritspermissions}

`setInheritsPermissions(inherit)` indicates that the node should inherit permissions from the parent node when set to true. Set to false to break the inheritance chain.

### Parameters

-   **inherit**

    True to indicate the node inherits from its parent. False, indicates the node should not inherit permissions from the parent node.

## setPermission {#setpermission}

The `setPermission` methods apply permissions to nodes.

### setPermission(permission)

`setPermission(permission)`

This method applies a permission to the node.

#### Parameters

-   **permission**

    The permission to apply to the node.


### setPermission(permission, authority)

`setPermission(permission, authority)`

This method applies a permission for the specified authority (for example, a user name or group) to the node.

Note that the method does not check for the presence of the specified authority, so the method will not fail if a non-existent user is specified. The existence of a user or group should be checked for in preceding code for additional robustness.

#### Parameters

-   **permission**

    The permission to apply to the node.

-   **authority**

    The authority (user, group) for which the permission will be applied.


#### Example

```

var node = companyhome.childByNamePath("TEST_FILE_0.TXT");

node.setPermission("Read", "fred.bloggs");
node.setPermission("Delete", "Admin");
node.setPermission("Write", "GROUP_EVERYONE");
node.setPermission("Delete", "GROUP_ALFRESCO_ADMINISTRATORS");
node.setPermission("Delete", "Peter.Pickles"); // user doesn't exist!

model.permissions = node.getPermissions();


```

This would result in the following permissions being set:

```

ALLOWED;fred.bloggs;Read

ALLOWED;Peter.Pickles;Delete

ALLOWED;Admin;Delete

ALLOWED;GROUP_EVERYONE;Write

ALLOWED;GROUP_ALFRESCO_ADMINISTRATORS;Delete  

```

## removePermission {#removepermission}

The `removePermission` methods remove permissions for users from a node.

### removePermission(permission)

`removePermission(permission)` removes a permission for all users from the node.

#### Parameters

-   **permission**

    The permission to remove.


### removePermission(permission, authority)

`removePermission(permission, authority)` removes a permission for the specified authority (for example, a user name or group) from the node.

#### Parameters

-   **permission**

    The permission to remove.

-   **authority**

    The authority, typically a user name or group, to remove the permission for.


#### Example

```

var node = companyhome.childByNamePath("TEST_FILE_0.TXT");

node.setPermission("Read", "fred.bloggs");
node.setPermission("Delete", "Admin");
node.setPermission("Write", "GROUP_EVERYONE");
node.setPermission("Delete", "GROUP_ALFRESCO_ADMINISTRATORS");

//...

node.removePermission("Read", "fred.bloggs");

model.permissions = node.getPermissions();

```

The resulting permissions would be:

```

ALLOWED;Admin;Delete

ALLOWED;GROUP_EVERYONE;Write

ALLOWED;GROUP_ALFRESCO_ADMINISTRATORS;Delete  

```

## getPermissions {#getPermissions}

`getPermissions()` returns an array of permissions attached to a node.

### Returns

An array of permissions applied to this node, including inherited permissions.

Strings returned are of the format `[ALLOWED|DENIED];[USERNAME|GROUPNAME];PERMISSION`. An example is `ALLOWED;GROUP_EVERYONE;Consumer`. The string can then be tokenized on the ';' character.

### Example

```

var node = companyhome.childByNamePath("TEST_FILE_0.TXT");
model.permissions = node.getPermissions();      

```

## Ownership API {#ownership-api}

The Ownership ScriptNode API provides methods to get, set and take ownership of a node.

### Properties

-   **`owner`**

    The owner property of the node (as a UID)


-   **[takeOwnership](#takeownership)**  
 `takeOwnership()` this method results in the authenticated user running the script to take ownership of the node.

## takeOwnership {#takeownership}

`takeOwnership()` this method results in the authenticated user running the script to take ownership of the node.

### Example

If running the script while authenticated as `admin`, the following code would result in `admin` being returned as the owner.

```

var node = companyhome.childByNamePath("TEST_FILE_0.TXT");

node.setOwner("fred.bloggs"); // owner is now 'fred.bloggs'

//...

node.takeOwnership(); // currently authenticated user running script is 'admin'

model.owner = node.getOwner();
  
```

## Modifying and creating API {#modifying-and-creating-api}

Most of the available ScriptNode API return read-only values, however the Scripting API also supports writable objects and access to repository services.

The `ScriptNode` object lets you modify and add properties, add aspects, create new files, folder, and custom type nodes, and update and set the text content stream for a node. You can also delete nodes, transform content, execute templates, and modify the associations for a node.

**Remember:** JavaScript objects are different to native repository Java objects. Property values in the repository must be the correct object type as defined in the Data Dictionary and exposed by the content model. This means that a string property value expects a Java string, and a multi-valued property expects a list. The Alfresco JavaScript API converts most object types between JavaScript and Java for you such as Array (for a multi-value property), numbers, dates, Boolean, and strings. The conversion code handles all common type conversions and recursive lists of those types.

|Type|Description|
|----|-----------|
|`properties`|Property array (can be modified for updating or adding new properties)Example:

`// change the name of this document document.properties.name = "Backup of " + document.properties.name; // add a new property string document.properties["cm:locale"] = mylocalenode; // save the property modifications document.save();`The `node.save()`API call is required to persist the property modifications. All other modifications made using the API, such as content or adding aspects, take immediate effect.

|
|`content`|A property to modify the text content of a node Example: `mynode.content = mynode.content + "append some text";`

|
|`name`|A helper property (a shortcut for `properties.name`) to get/set the name|

-   **[createFolder](#createfolder)**  
The `createFolder` methods create a new folder as a child of the current node.
-   **[createFile](#createfile)**  
The `createFile` methods create a new file as a child of the current node. Once created the file should have content set using the `content` property.
-   **[createNode](#createnode)**  
The `createNode` methods are used to create new nodes.
-   **[addNode](#addnode)**  
The `addNode(node)` method adds an existing node as a child of this node.
-   **[removeNode](#removenode)**  
`removeNode(node)` removes all parent-child relationships between two nodes.
-   **[createAssociation](#createassociation)**  
`createAssociation(target, assocType)` creates a new target association to the specified node with the given association type QName.
-   **[removeAssociation](#removeassociation)**  
 `removeAssociation(target, assocType)` removes the association to the specified node with the given association type QName.
-   **[remove](#remove)**  
`remove()` this method deletes the node.
-   **[copy](#copy)**  
The `copy`
-   **[move](#move)**  
`move` moves the node to the specified destination.
-   **[addAspect](#addaspect)**  
The `addAspect` methods are used to add new aspects to nodes.
-   **[removeAspect](#removeaspect)**  
`removeAspect(aspect)` removes the specified aspect from the node.
-   **[specializeType](#specializetype)**  
`specializeType(type)` specializes the type of a node.
-   **[revert](#revert)**  
`revert` reverts node to the specified version.
-   **[save](#save)**  
 `save()` persists the modified properties of this node.

## createFolder {#createFolder}

The `createFolder` methods create a new folder as a child of the current node.

Note: Any unsaved property changes will be lost when this method is called. To preserve property changes call [save()](#save) first.

### createFolder(name)

`createFolder(name)` this method creates a new folder (`cm:folder`) node with the specified name as a child of this node.

#### Parameters

-   **name**

    The folder name


#### Returns

Returns the new node as the result of the function or returns null if the creation fails.

#### Example

`var myfolder = userhome.createFolder("New Folder");`

### createFolder(name, type)

`createFolder(name, type)` this method creates a new folder (`cm:folder`) node with the specified name and type as a child of this node.

#### Parameters

-   **name**

    The folder name

-   **type**

    The type of the folder to create. If null it defaults to type `ContentModel.TYPE_FOLDER`. Examples of folder types include `cm:systemfolder`, `cm:folder`, `st:site`, and `fm:forum`.


#### Returns

Returns the new node as the result of the function or returns null if the creation fails.

#### Example

`var myfolder = userhome.createFolder("New Folder", "st:site");`

## createFile {#createFile}

The `createFile` methods create a new file as a child of the current node. Once created the file should have content set using the `content` property.

Note: Any unsaved property changes will be lost when this method is called. To preserve property changes call [save()](#save) on the node first.

### createFile(name)

`createFile(name)` this method creates a new file node of type `cm:content` with the specified name. The node is created as a child of the current node.

#### Parameters

-   **name**

    The name of the file to create


#### Returns

Returns the newly created node as the result of the function, or returns null if the creation failed. Alfresco Content Services puts the file MIME type of the content (there is no MIME type with the `createNode` method).

#### Example

`var myfile = userhome.createFile("newfile.txt");`

### createFile(name, type)

`createFile(name)` this method creates a new file node of type `cm:content` with the specified name. The node is created as a child of the current node.

#### Parameters

-   **name**

    The name of the file to create

-   **type**

    The type of file to create. If null will create `ContentModel.TYPE_CONTENT`.


#### Returns

Returns the newly created node as the result of the function, or returns null if the creation failed. Alfresco Content Services puts the file MIME type of the content (there is no MIME type with the `createNode` method).

#### Example

`var myfile = userhome.createFile("newfile.txt", "cm:content");`

## createNode {#createNode}

The `createNode` methods are used to create new nodes.

Note: Any unsaved property changes will be lost when this method is called. To preserve property changes call [save()](#save) first.

### createNode(name,type)

This method creates a new node of the specified type (a QName in either full or short form).

#### Parameters

-   **name**

    The node name. Name of the node to create (can be null for a node without a 'cm:name' property).

-   **type**

    The node type. QName type (fully qualified or short form such as 'cm:content').


#### Returns

Newly created node, or null if failed to create.

#### Example

`var node = myforum.createNode("My Discussion", "fm:forum");`

### createNode(name, type, assocType)

This method creates a new node of the specified type as a child of the current node with the given child association type.

#### Parameters

-   **name**

    The node name. Name of the node to create (can be null for a node without a 'cm:name' property).

-   **type**

    The node type. QName type (fully qualified or short form such as 'cm:content').

-   **assocType**

    The QName of the child association type (fully qualified or short form, for example, 'cm:contains')


#### Example

`var node = myforum.createNode("My Discussion", "fm:forum", "fm:discussion");`

### createNode(name, type, properties)

This method creates a new node as a child of the current node with the specified properties.

#### Parameters

-   **name**

    The node name. Name of the node to create (can be null for a node without a 'cm:name' property).

-   **type**

    The node type. QName type (fully qualified or short form such as 'cm:content').

-   **properties**

    An associative array of the properties to be added to the node upon creation. This is useful when a type requires the setting of mandatory properties.


#### Returns

Newly created node, or null if failed to create.

#### Example

```

var node = companyhome.childByNamePath("Sites/test"); 
var forumName = "My Forum";
var properties = new Array();
properties['cm:title'] = "The forum title";
properties['cm:description'] = "The forum description";
var forum = node.createNode(forumName, "fm:forum", properties);   
        
```

### createNode(name, type, properties, assocType)

This method creates a new node as a child of the current node. The node contains the specified child association name with the specified properties with that child association type.

#### Parameters

-   **name**

    The node name. Name of the node to create (can be null for a node without a 'cm:name' property).

-   **type**

    The node type. QName type (fully qualified or short form such as 'cm:content').

-   **properties**

    An associative array of the properties to be added to the node upon creation.

-   **assocType**

    The QName QName of the child association type (fully qualified or short form, for example, 'cm:contains').


```


        
```

### createNode(name, type, properties, assocType, assocName)

This method creates a new node as a child of the current node. The node contains the specified child association name with the specified properties, and the given child association type and name.

#### Parameters

-   **name**

    The node name. Name of the node to create (can be null for a node without a 'cm:name' property).

-   **type**

    The node type. QName type (fully qualified or short form such as 'cm:content').

-   **properties**

    An associative array of the properties to be added to the node upon creation

-   **assocType**

    The QName of the child association type (fully qualified or short form, for example, 'cm:contains').

-   **assocName**

    The QName of the child association name (fully qualified or short form, for example, 'fm:discussion').


```


        
```

## addNode {#addNode}

The `addNode(node)` method adds an existing node as a child of this node.

Note: Any unsaved property changes will be lost when this method is called. To preserve property changes call [save()](#save) first.

### Parameters

-   **node**

    The node to add as a child of the current node.


### Returns

void

### Example

```

var dir = companyhome.createNode("SUB_FOLDER", "cm:folder");

var properties = new Array();
properties['cm:title'] = "Node title";
properties['cm:description'] = "Node description";

var node = companyhome.createNode("SUPER_FILE.TXT", "cm:content", properties);
node.content = "Node content";

// now add as child of sub folder

dir.addNode(node);    
model.node = node;
      
```

## removeNode {#removeNode}

`removeNode(node)` removes all parent-child relationships between two nodes.

The child node will be cascade deleted if one of the associations was the primary association, that is, the one with which the child node was created.

Note: Any unsaved property changes will be lost when this method is called. To preserve property changes call [save()](#save) first.

### Parameters

-   **node**

    The node to be removed.


### Example

```

var dir = companyhome.childByNamePath("SUB_FOLDER");
var node = companyhome.childByNamePath("SUPER_FILE.TXT");

// delete child from parent

dir.removeNode(node);
       
```

## createAssociation {#createAssociation}

`createAssociation(target, assocType)` creates a new target association to the specified node with the given association type QName.

Note: Any unsaved property changes will be lost when this method is called. To preserve property changes call [save()](#save) first.

### Parameters

-   **target**

    Destination node for the association

-   **assocType**

    Association type qname (short form or fully qualified)


### Returns

The new association.

## removeAssociation {#removeAssociation}

`removeAssociation(target, assocType)` removes the association to the specified node with the given association type QName.

Note: Any unsaved property changes will be lost when this method is called. To preserve property changes call [save()](#save) first.

### Parameters

-   **target**

    Destination node on the end of the association

-   **assocType**

    Association type qname (short form or fully qualified)


## remove {#remove}

`remove()` this method deletes the node.

Note: Any unsaved property changes will be lost when this method is called. To preserve property changes call [save()](#save) first.

### Returns

Returns true on success, or false otherwise.

### Example

Any variable or references to the ScriptNode should be discarded. For example:

`mynode.remove();`

## copy {#copy}

The `copy`

methods are used to copy nodes to specified destination nodes.

### copy(destination)

This method copies the node to the specified destination node.

#### Parameters

-   **destination**

    The destination node


#### Returns

Returns the newly copied `ScriptNode` instance on success, or null if the copy fails.

#### Example

`var docCopy = document.copy(userhome);`

### copy(destination, deepCopy)

This method copies the node to the specified destination node. It copies all child nodes of the source if the `deepCopy` argument is true. Otherwise, it only copies the source node itself.

#### Parameters

-   **destination**

    The destination node

-   **deepCopy**

    True for a deep copy, false otherwise.


#### Returns

Returns the newly copied `ScriptNode` instance on success, or null if the copy fails reason.

#### Example

`var docCopy = document.copy(userhome, true);`

## move {#move}

`move` moves the node to the specified destination.

### move(destination)

`move(destination)` this method moves the node to the new parent destination.

#### Parameters

-   **destination**

    The destination node.


#### Returns

Boolean

Returns true on success, or false on failure to move

### move(source, destination)

`move(source, destination)` this method moves the specified source node to the new parent destination.

#### Parameters

-   **source**

    The source node.

-   **destination**

    The destination node.


#### Returns

Boolean

Returns true on success, or false on failure to move


## addAspect {#addAspect}

The `addAspect` methods are used to add new aspects to nodes.

Note: Any unsaved property changes will be lost when this method is called. To preserve property changes call [save()](#save) first.

### addAspect(aspect)

This method adds a new aspect and properties to the node allowing mandatory aspect properties to be supplied when the new aspect is applied.

#### Parameters

-   **aspect**

    The aspect to add


#### Returns

True if the aspect was added successfully, false otherwise.

#### Example

`document.addAspect("cm:translatable");`

### addAspect(aspect, properties)

This method adds a new aspect and properties to the node allowing mandatory aspect properties to be supplied when the new aspect is applied.

#### Parameters

-   **aspect**

    The aspect to add

-   **properties**

    An associative array of QName keyed properties. Any mandatory properties for the aspect must be provided.


#### Returns

True if the aspect was added successfully, false otherwise.

#### Example

```

var props = new Array(); 
props["cm:template"] = myTemplateNode.nodeRef; 
document.addAspect("cm:templatable", props);
```

## removeAspect {#removeAspect}

`removeAspect(aspect)` removes the specified aspect from the node.

Note: Any unsaved property changes will be lost when this method is called. To preserve property changes call [save()](#save) first.

### Parameters

-   **aspect**

    The aspect type to remove


### Returns

True if aspect removed, false otherwise.

## specializeType {#specializetype}

`specializeType(type)` specializes the type of a node.

Resets the type of the node. Can be called in order specialize a node to a sub-type. This should be used with caution since calling it changes the type of the node and thus implies a different set of aspects, properties and associations. It is the responsibility of the caller to ensure that the node is in an appropriate state after changing the type.

### Parameters

-   **type**

    The type name supplied must be a subtype of the current type as defined in the Data Dictionary


### Returns

Boolean. Returns true on success, false otherwise.

## revert {#revert}

`revert` reverts node to the specified version.

### revert(history, majorVersion, versionLabel)

`revert(history, majorVersion, versionLabel)` this method reverts the node to the specified version.

The node must have the `cm:versionable` aspect. The node will be checked out if required and will be checked in after the call. This method does not attempt to perform a deep revert of associations.

#### Parameters

-   **history**

    A revision history note.

-   **majorVersion**

    If set to true the method will try to save the changes as a major version increment. If false will save as a minor version increment.

-   **versionLabel**

    The version label to revert from.


#### Returns

ScriptNode

Returns the original node that was checked out if reverted, or null if the specified version does not exist.

### revert(history, majorVersion, versionLabel, deep)

`revert(history, majorVersion, versionLabel, deep)` revert this node to the specified version and potentially all child nodes.

The node must have the aspect `cm:versionable`. The node will be checked out if required, and checked in on completion of the call.

#### Parameters

-   **history**

    A revision history note.

-   **majorVersion**

    If set to true the method will try to save the changes as a major version increment. If false will save as a minor version increment.

-   **versionLabel**

    The version label to revert from.

-   **deep**

    If set to true the method will perform a deep revert. If set to false a deep revert will not be performed, and only the current node will be reverted.


#### Returns

ScriptNode

Returns the original node that was checked out if reverted, or null if the specified version does not exist.


## save {#save}

`save()` persists the modified properties of this node.

### Example

```

var node = companyhome.createFile("TEST_FILE_1.TXT");

node.properties.description = "This is an example description.";
node.save(); // persist changes to database
       
```

## Check in/check out API {#check-in/check-out-api}

The check in/check out ScriptNode API features methods for check out, check in, and canceling check out of working copies.

> **Note:** If you want to record version history when using these methods, first add the `cm:versionable` aspect to a node.

-   **[checkout](#checkout)**  
The `checkout` methods perform checkouts of versionable nodes.
-   **[checkin](#checkin)**  
The `checkin` methods perform check in operations on working copy nodes.
-   **[cancelCheckout](#cancelcheckout)**  
`cancelCheckout()` cancels the check-out of a working copy document.
-   **[checkoutForUpload](#checkoutforupload)**  
`checkoutForUpload()` performs a checkout of the node for upload.
-   **[unlock](#unlock)**  
`unlock()` removes a lock on the node.

## checkout {#checkout}

The `checkout` methods perform checkouts of versionable nodes.

### checkout ()

`checkout()` this method performs a checkout of the node.

#### Returns

Returns the resulting working copy node.

#### Example

```

    var workingCopy;
    var node = companyhome.childByNamePath("TEST_FILE_1.TXT");

    node.ensureVersioningEnabled(true, true);
    
    if (node.isVersioned){
        
        workingCopy = node.checkout();
        workingCopy.content = "Add some content.";
        workingCopy.checkin("Added some content.");
    }

        
```

### checkout(destination)

`checkout(destination)` this method performs a check out of the node to the specified destination.

#### Parameters

-   **destination**

    Destination for the checked out document working copy node.


#### Returns

Returns the resulting working copy node.


## checkin {#checkin}

The `checkin` methods perform check in operations on working copy nodes.

### checkin()

`checkin()` this method performs a check in operation on a working copy node. It copies the current state of the working copy to the original node (including any content updated in the working node). This method can only be called on a working copy node.

#### Returns

Returns the original node that was previously checked out.

### checkin(description)

`checkin(description)` this method performs a check in operation on a working copy node applying the specified version history note text.

#### Parameters

-   **description**

    A version history note. A description of the change made.


#### Returns

Returns the original node that was previously checked out.

#### Example

```

    var workingCopy;
    var node = companyhome.childByNamePath("TEST_FILE_1.TXT");

    node.ensureVersioningEnabled(true, true);
    
    if (node.isVersioned){
        
        workingCopy = node.checkout();
        workingCopy.content = "Add some content.";
        workingCopy.checkin("Added some content.");
    }

        
```

### checkin(description, majorVersion)

`checkin(description, majorVersion)` this method performs a check in operation on a working copy node.

It applies the specified version history note text and as a major or minor version increment as required.

#### Parameters

-   **description**

    A version history note. A description of the change made.

-   **majorVersion**

    True to save as a major version increment, false for minor version


#### Returns

Returns the original node that was previously checked out.

## cancelCheckout {#cancelcheckout}

`cancelCheckout()` cancels the check-out of a working copy document.

The working copy is deleted and any changes made to it are lost.

> **Note:** This method can only be called on a working copy node. Any reference to this working copy node should be discarded.

### Returns

Returns the original node that was previously checked out.

### Example

```

    var workingCopy;
    var node = companyhome.childByNamePath("TEST_FILE_1.TXT");

    node.ensureVersioningEnabled(true, true);
    
    if (node.isVersioned){
        
        workingCopy = node.checkout();
        workingCopy.content = "Add some content.";
        
        // changed mind

        node = workingCopy.cancelCheckout();

    }
       
```

## checkoutForUpload {#checkoutForUpload}

`checkoutForUpload()` performs a checkout of the node for upload.

### Returns

Returns the resulting working copy node.

## unlock {#unlock}

`unlock()` removes a lock on the node.

## Versions API {#versions-api}

The Versions ScriptNode API provides several methods and properties for managing and retrieving the versions of a document.

### Properties

-   **`isVersioned`**

    A read-only Boolean property for determining if the document is versioned.

-   **`versionHistory`**

    A read-only property for listing all versions of the document in descending (version created) date order.


-   **[Script Version Object](#script-version-object)**  
The Versions ScriptNode API provides methods that return `ScriptVersion` objects, for example, `getVersion()`. ScriptVersion objects have the following properties.
-   **[getVersion](#getversion)**  
`getVersion(label)` gets a specific version of a document identified by `label`.
-   **[createVersion](#createversion)**  
`createVersion(history, major)` this method creates a version snapshot of the current document.
-   **[ensureVersioningEnabled](#ensureversioningenabled)**  
 `ensureVersioningEnabled(autoVersion, autoVersionProps)` ensures that this node has the `cm:versionable` aspect applied to it, and that it has the initial version in the version store.
-   **[getVersionHistory](#getversionhistory)**  
 `getVersionHistory()` gets the version history for the current node.

## Script Version Object {#script-version-object}

The Versions ScriptNode API provides methods that return `ScriptVersion` objects, for example, `getVersion()`. ScriptVersion objects have the following properties.

### Properties

-   **`createdDate`**

    A read-only property representing the date at which the version was created.

-   **`creator`**

    A read-only property representing the user name of the person who created the version.

-   **`label`**

    A read-only property representing the version label.

-   **`type`**

    A read-only property representing the version type (MAJOR, MINOR).

-   **`description`**

    A read-only property representing the description (history comment) of the version.

-   **`nodeRef`**

    A read-only property representing the node reference of the document that was versioned.

-   **`node`**

    A read-only property representing the node as it was versioned.


## getVersion {#getversion}

`getVersion(label)` gets a specific version of a document identified by `label`.

### Parameters

-   **label**

    The version label of the node to get.


### Returns

A ScriptVersion object representing the version of this node requested.

### Example

```

    var version;
    var createdDate;
    var creator;
    
    var node = companyhome.childByNamePath("TEST_FILE_1.TXT");

    if (node.isVersioned){
        version = node.getVersion("1.0");
        createdDate = version.createdDate;
        creator = version.creator;          
    }
       
```

## createVersion {#createversion}

`createVersion(history, major)` this method creates a version snapshot of the current document.

Note: this will add the cm:versionable aspect.

### Parameters

-   **history**

    Version history note. A description of the change made.

-   **major**

    True to save as a major version increment, false for minor version.


### Returns

Returns a ScriptVersion object for the new version of the document.

## ensureVersioningEnabled {#ensureVersioningEnabled}

`ensureVersioningEnabled(autoVersion, autoVersionProps)` ensures that this node has the `cm:versionable` aspect applied to it, and that it has the initial version in the version store.

Calling this on a versioned node with a version store entry will have no effect. Calling this on a newly uploaded share node will have versioning enabled for it.

### Parameters

-   **autoVersion**

    If set to true auto versioning will also be applied if the `cm:versionable` aspect is applied.

-   **autoVersionProps**

    If set to true auto versioning of properties will also be applied, if the `cm:versionable` aspect is applied.


### Returns

ScriptVersion

### Example

```

    var version;
    var createdDate;
    var creator;

    var node = companyhome.createFile("TEST_FILE_999.TXT");

    node.ensureVersioningEnabled(true, true);

    if (node.isVersioned){
        version = node.getVersion("1.0");
        createdDate = version.createdDate;
        creator = version.creator;
    }

      
```

## getVersionHistory {#getversionhistory}

`getVersionHistory()` gets the version history for the current node.

### Returns

Version history as a list of `ScriptVersion` objects.

### Example

```


    var versionHistory;
    var revisionDates = new Array();

    var node = companyhome.childByNamePath("TEST_FILE_1.TXT");

    node.ensureVersioningEnabled(true, true);

    if (node.isVersioned){
        versionHistory = node.getVersionHistory();

        for (var i in versionHistory){
            revisionDates.push(versionHistory[i].createdDate);
        }
    }
      
```

## Content API {#content-api}

The Content API provides several properties to manipulate node content directly. The content can also be manipulated using the ScriptContentData API.

### Properties

-   **content**

    A read/write value that represents the content as a string

-   **mimetype**

    A read/write value representing the MIME type of the content

-   **size**

    A read-only long value that represents the size (in bytes) of the content

-   **url**

    A read-only string representing the download URL for the content

-   **downloadUrl**

    A read-only string representing the download (as attachment) URL for the content

-   **webdavUrl**

    A read-only string representing the webdav URL for the content


## ScriptContentData API {#scriptcontentdata-api}

The ScriptContentData API provides several methods and properties related to node properties of type `d:content`; for example, `document.properties.content`.

### Properties

-   **content**

    A read/write value that represents the content as a string

-   **mimetype**

    Guess and apply the MIME type to the content based on the file name

-   **encoding**

    A read/write string value that represents the encoding of the content

-   **size**

    A read-only long value that represents the size (in bytes) of the content

-   **url**

    A read-only string representing the download URL for the content

-   **downloadUrl**

    A read-only string representing the download (as attachment) URL for the content


-   **[write](#write)**  
`write(content)` copies the content from the specified `ScriptContent`.
-   **[guessMimetype](#guessmimetype)**  
`guessMimetype(filename)` guesses and applies the MIME type to the content based on the given file name.
-   **[guessEncoding](#guessencoding)**  
`guessEncoding()` guesses and applies the encoding to the content based on the current content. It uses the ContentCharsetFinder service.
-   **[getInputStream](#getinputstream)**  
`getInputStream()` returns the input stream for the underlying ScriptContentData object.
-   **[getReader](#getreader)**  
`getReader()` returns the reader for the input stream of the underlying ScriptContentData object.

## write {#write}

`write(content)` copies the content from the specified `ScriptContent`.

### write(content)

Sets the content stream from another content object.

#### Parameters

-   **content**

    The source ScriptContentData object.


#### Example

```

var sourceFilename = "TEST_FILE_1.TXT";
var destFilename = "TEST_FILE_2.TXT";

var sourceNode = companyhome.childByNamePath(sourceFilename);
var destNode = companyhome.childByNamePath(destFilename);

sourceNode.content = "This is the SOURCE node content!";
destNode.properties.content.write(sourceNode.properties.content);        
        
```

### write(content, applyMimetype, guessEncoding)

Sets the content stream from another content object.

#### Parameters

-   **content**

    The source ScriptContentData object.

-   **applyMimetype**

    If set to true, the mimetype will be set from the mimetype of the source ScriptContentData object. If false, the mimetype of the target is unchanged.

-   **guessEncoding**

    If true the method will attempt to determine the encoding from the source content stream. If false, the encoding as set in the source content object will be used.


#### Example

```

// use mimetype and encoding from source node
destNode.properties.content.write(sourceNode.properties.content, true, false);        
        
```

### write(inputStream)

Sets the content stream from a source inputStream.

#### Parameters

-   **inputStream**

    The source inputStream.


#### Example

```

// use source node content stream
destNode.properties.content.write(sourceNode.properties.content.getInputStream());
        
```

## guessMimetype {#guessmimetype}

`guessMimetype(filename)` guesses and applies the MIME type to the content based on the given file name.

### Parameters

-   **filename**

    The file name of the content


## guessEncoding {#guessencoding}

`guessEncoding()` guesses and applies the encoding to the content based on the current content. It uses the ContentCharsetFinder service.

### Parameters

-   **none**

## getInputStream {#getInputStream}

`getInputStream()` returns the input stream for the underlying ScriptContentData object.

### Parameters

-   **none**

### Returns

Input stream of the underlying `ScriptContentData` object.

## getReader {#getReader}

`getReader()` returns the reader for the input stream of the underlying ScriptContentData object.

### Parameters

-   **none**

### Returns

The reader for the input stream of the underlying ScriptContentData object.

## Transformation API {#transformation-api}

The Transformation API provides document, image, and FreeMarker template processing services in Alfresco.

-   **[transformDocument](#transformdocument)**  
The `transformDocument` methods use the document transformation services in Alfresco.
-   **[transformImage](#transformimage)**  
The `transformImage` methods use the image transformation services in Alfresco Content Services.
-   **[processTemplate](#processtemplate)**  
The `processTemplate` methods use the FreeMarker template processing services in Alfresco Content Services.

## transformDocument {#transformDocument}

The `transformDocument` methods use the document transformation services in Alfresco.

The LibreOffice server is required for some document transformations.

### transformDocument(mimetype)

`transformDocument(mimetype)` this method transforms a document to a new document MIME type format. It makes a copy of the document, changes the extension to match the new MIME type, and applies the transformation.

#### Parameters

-   **mimetype**

    The mimetype of the new document.


#### Returns

Returns the transformed document node if successful, or null if the transformation failed.

#### Example

```


// transform document type to HTML
var node = companyhome.childByNamePath("TEST_1.TXT");

var transformedNode = node.transformDocument("text/html");
        
        
```

### transformDocument(mimetype, destination)

`transformDocument(mimetype, destination)` this method transforms a document to a new document MIME type format. It makes a copy of the document in the specified destination folder, changes the extension to match the new MIME type, and applies the transformation.

#### Parameters

-   **mimetype**

    The mimetype of the new document.


-   **destination**

    The destination folder in which the new document will be placed.


#### Returns

Returns the transformed document node if successful, or null if the transformation failed.

#### Example

```

// transform document and place new document in destination folder
var node = companyhome.childByNamePath("TEST_1.TXT");
var destDir = companyhome.childByNamePath("TRANSFORMED_DOCS");

var transformedNode = node.transformDocument("text/xml", destDir);
        
```


## transformImage {#transformimage}

The `transformImage` methods use the image transformation services in Alfresco Content Services.

> **Note:** To use these services, the ImageMagick components must be installed and working correctly. For more detailed information on ImageMagick, refer to the ImageMagick web site.

### transformImage(mimetype)

`transformImage(mimetype)` this method transforms an image to a new image format.

#### Parameters

-   **mimetype**

    The mimetype the document will be transformed to.


#### Returns

Returns the transformed image node if successful, or null if the transformation failed.

#### Example

```

// transform JPEG image file to BMP        
var node = companyhome.childByNamePath("WIND_TURBINE.JPG");

var transformedNode = node.transformImage("image/bmp");  
        
```

### transformImage(mimetype, options)

`transformImage(mimetype, options)` this method transforms a document to a new document MIME type format. It copies the document, changes the extension to match the new MIME type, and then applies the transformation. The transformed image node is returned if successful, or null is returned if the transformation failed.

#### Parameters

-   **mimetype**

    The mimetype the document will be transformed to.

-   **options**

    Image convert command options.


#### Returns

Returns the transformed image node if successful, or null if the transformation failed.

### transformImage(mimetype, destination)

`transformImage(mimetype, destination)` this method transforms a document to a new document MIME type format. It copies the document, changes the extension to match the new MIME type, and then applies the transformation.

#### Parameters

-   **mimetype**

    The mimetype the document will be transformed to.

-   **destination**

    The destination folder the transformed document will be output to.


#### Returns

Returns the transformed image node if successful, or null if the transformation failed.

#### Example

```

// transform image from JPEG to GIF and locate in destination folder
var node = companyhome.childByNamePath("WIND_TURBINE.JPG");
var destDir = companyhome.childByNamePath("TRANSFORMED_IMAGES");

var transformedNode = node.transformImage("image/gif", destDir);
        
```

### transformImage(mimetype, options, destination)

`transformImage(mimetype, options, destination)` this method transforms an image to a new image format, applying the supplied ImageMagick options. It copies the image document in the specified destination folder, changes the extension to match the new MIME type, and then applies the transformation.

#### Parameters

-   **mimetype**

    The mimetype the document will be transformed to.

-   **options**

    Image convert command options.

-   **destination**

    The destination folder the transformed document will be output to.


#### Returns

Returns the transformed image node if successful, or null if the transformation failed.


## processTemplate {#processtemplate}

The `processTemplate` methods use the FreeMarker template processing services in Alfresco Content Services.

### processTemplate(template)

`processTemplate(template)` this method executes a FreeMarker template file against the node. The node is used as the context for the document or space object in the templating default model.

#### Parameters

-   **template**

    The node of the template to execute as a ScriptNode object.


#### Returns

Returns the transformed image node if successful, or null if the transformation failed.

### processTemplate(template, args)

`processTemplate(template, args)` this method executes a FreeMarker template file against the node, passing the supplied array of name/value pair arguments to the template. The node is used as the context for the document or space object in the templating default model.

#### Parameters

-   **template**

    The node of the template to execute as a ScriptNode object.

-   **args**

    An associative array containing the name-value pairs of arguments to be passed to the template.


#### Returns

Returns the result of the template execution as a string.


## Thumbnail API {#thumbnail-api}

A thumbnail is a transformation of content into a specified destination MIME type. This is most commonly an image of a particular size, but can also be other things, for example, a Flash rendition. The `ScriptNode` class provides several methods for generating and handling thumbnails.

-   **[createThumbnail](#createthumbnail)**  
The `createThumbnail` methods create a thumbnail based on the definition registered for the thumbnail name provided.
-   **[getThumbnail](#getthumbnail)**  
`getThumbnail(thumbnailName)` gets the given thumbnail for the content property.
-   **[getThumbnails](#getthumbnails)**  
`getThumbnails()` gets all the thumbnails for a given node's content property.
-   **[getThumbnailDefinitions](#getthumbnaildefinitions)**  
`getThumbnailDefinitions()` returns the names of the thumbnail definitions that can be applied to the content property of this node.
-   **[ScriptThumbnail Object](#scriptthumbnail-object)**  
Certain thumbnail methods return `ScriptThumbnail` objects. These objects are an extension of the ScriptNode object. ScriptThumbnail objects have a single method, `update`.

## createThumbnail {#createthumbnail}

The `createThumbnail` methods create a thumbnail based on the definition registered for the thumbnail name provided.

If the thumbnail name has not been registered, there will be an error.

### createThumbnail(thumbnailName)

`createThumbnail(thumbnailName,async)` this method creates a thumbnail based on the definition registered for the thumbnail name provided.

If the thumbnail name has not been registered, there will be an error.

#### Parameters

-   **thumbnailName**

    The thumbnail name. The thumbnail name corresponds to preset thumbnail details stored in the repository.


#### Returns

Returns the `ScriptThumbnail` object representing the newly created thumbnail.

### createThumbnail(thumbnailName,async)

`createThumbnail(thumbnailName,async)` this method creates a thumbnail based on the definition registered for the thumbnail name provided.

If the thumbnail name has not been registered, there will be an error.

#### Parameters

-   **thumbnailName**

    The thumbnail name. The thumbnail name corresponds to preset thumbnail details stored in the repository.

-   **async**

    Optional parameter

    False by default, true if the thumbnail is to be created asynchronously. When set to false, the method blocks until the thumbnail is created and the newly created thumbnail is returned. If set to true, the method queues the creation of the thumbnail asynchronously and immediately returns to the calling client with null.


#### Returns

Returns the `ScriptThumbnail` object representing the newly created thumbnail.

## getThumbnail {#getthumbnail}

`getThumbnail(thumbnailName)` gets the given thumbnail for the content property.

### Parameters

-   **thumbnailName**

    The thumbnail name. The thumbnail name corresponds to preset thumbnail details stored in the repository.


### Returns

Returns a `ScriptThumbnail` object representing the specified thumbnail.

## getThumbnails {#getthumbnails}

`getThumbnails()` gets all the thumbnails for a given node's content property.

### Returns

Returns a list of `ScriptThumbnail` objects. This is empty if none are available.

## getThumbnailDefinitions {#getthumbnaildefinitions}

`getThumbnailDefinitions()` returns the names of the thumbnail definitions that can be applied to the content property of this node.

Thumbnail definitions only appear in this list if they can produce a thumbnail for the content found in the content property. This is determined by looking at the MIME type of the content and the destination MIME type of the thumbnail.

### Returns

Returns an array of thumbnail names that are valid for the current content type.

## ScriptThumbnail Object {#scriptthumbnail-object}

Certain thumbnail methods return `ScriptThumbnail` objects. These objects are an extension of the ScriptNode object. ScriptThumbnail objects have a single method, `update`.

-   **[update](#update)**  
`update()` updates all the thumbnails for a particular node.

## update {#update}

`update()` updates all the thumbnails for a particular node.

This method belongs to the `ScriptThumbnail` object, which extends the standard `ScriptNode` and represents a thumbnail object.

 
## Tagging API {#tagging-api}

A tag is a non-hierarchical keyword or term assigned to a piece of information.

### Properties

-   **`tags`**

    An array of tag name strings. If a string array of tags is applied to this property they will overwrite the tags currently applied to the node.

-   **`isTagScope`**

    A boolean. If true, the node is a tag scope node and false otherwise.


-   **[clearTags](#cleartags)**  
`clearTags()` deletes all the tags from the node.
-   **[addTag](#addtag)**  
`addTag(tag)` adds a single tag to a node.
-   **[addTags](#addtags)**  
`addTags(tags)` adds several tags to a node.
-   **[removeTag](#removetag)**  
`removeTag(tag)` removes the specified tag from a node.
-   **[removeTags](#removetags)**  
`removeTags(tags)` removes the specified tags from a node.
-   **[getTagScope](#gettagscope)**  
`getTagScope()` gets the nearest tag scope to this node by traversing up the parent hierarchy until one is found. If none is found, null is returned.
-   **[setIsTagScope](#setistagscope)**  
`setIsTagScope(boolean value)`
-   **[childrenByTags](#childrenbytags)**  
`childrenByTags(tag)` gets all children of the node that have the tag specified. The methods fetch the children of the node in a deep (recursive) fashion.

## clearTags {#cleartags}

`clearTags()` deletes all the tags from the node.

## addTag {#addTag}

`addTag(tag)` adds a single tag to a node.

### Parameters

-   **tag**

    The tag (as a string) to add to the node.


### Returns

void

## addTags {#addtags}

`addTags(tags)` adds several tags to a node.

### Parameters

-   **tags**

    A string array containing the tags to add to the node.


### Returns

void

## removeTag {#removetag}

`removeTag(tag)` removes the specified tag from a node.

### Parameters

-   **tag**

    The tag (as a string) to remove from the node.


## removeTags {#removetags}

`removeTags(tags)` removes the specified tags from a node.

### Parameters

-   **tags**

    A string array containing the tags to remove from the node.

## getTagScope {#getTagScope}

`getTagScope()` gets the nearest tag scope to this node by traversing up the parent hierarchy until one is found. If none is found, null is returned.

### Returns

A [TagScope](#tagscope-object) object which represents the nearest tag scope, or null if one is not found.

## setIsTagScope {#setistagscope}

`setIsTagScope(boolean value)`Sets whether this node is a tag scope or not.

### Parameters

-   **value**

    True if this node is a [TagScope](#tagscope-object), false otherwise.


### Returns

void

## childrenByTags {#childrenByTags}

`childrenByTags(tag)` gets all children of the node that have the tag specified. The methods fetch the children of the node in a deep (recursive) fashion.

### Parameters

-   **tag**

    A string representing the tag name.


### Returns

An array of `ScriptNode` objects that corresponds to the children of the node with the specified tag.

## Actions API {#actions-api}

The actions API provides a root level `actions` object that allows invocation of Alfresco Content Services actions registered with the repository.

### Properties

The following Action object properties are available to use within scripts:

|Action Object Property|Read/write|Description|
|----------------------|----------|-----------|
|registered|Read-only|An array of strings representing the actions available.|

-   **[create](#create)**  
`create(name)` returns the `ScriptAction` object with the name specified.

## create {#create}

`create(name)` returns the `ScriptAction` object with the name specified.

### Parameters

-   **name**

    A string representing the name of the action to return a `ScriptAction` object for.


### Returns

The `ScriptAction` object for the given action name, or null if the action name is not registered.

## Classification API {#classification-api}

The Classification API has two parts: manipulating classifications, and manipulating the categories they contain.

A root level `classification` object is provided to return category nodes. The `CategoryNode` objects returned from the methods are extended from the standard JavaScript `ScriptNode` model to include category manipulation.

-   **[createRootCategory](#createrootcategory)**  
`createRootCategory(aspect, name)` creates a root category.
-   **[getAllCategoryNodes](#getallcategorynodes)**  
`getAllCategoryNodes(aspect)` gets an array of all the category nodes in the given classification.
-   **[getAllClassificationAspects](#getallclassificationaspects)**  
`getAllClassificationAspects()` gets all the aspects that define a classification. An array of aspect QNames in `prefix:localName` form is returned.
-   **[getCategory](#getcategory)**  
`getCategory(catRef)` returns a category node.
-   **[getCategoryUsage](#getcategoryusage)**  
`getCategoryUsage(aspect, maxCount)` returns categories with the most number of objects. The number of categories returned is specified in `maxCount`.
-   **[getRootCategories](#getrootcategories)**  
`getRootCategories(aspect)` returns an array of root category nodes for a given classification.
-   **[setStoreUrl](#setstoreurl)**  
`setStoreUrl(storeRef)` sets the default store reference.
-   **[CategoryNode API](#categorynode-api)**  
The CategoryNode objects returned from the classification object methods are extended from the standard JavaScript ScriptNode model.

## createRootCategory {#createrootcategory}

`createRootCategory(aspect, name)` creates a root category.

### Parameters

-   **aspect**

    The classification aspect.

-   **name**

    Name of root category to create.


### Returns

A category node

### Example

## getAllCategoryNodes {#getAllCategoryNodes}

`getAllCategoryNodes(aspect)` gets an array of all the category nodes in the given classification.

### Parameters

-   **aspect**

    The classification aspect.


### Returns

Returns an array of `CategoryNode` objects in the given classification.

## getAllClassificationAspects {#getAllClassificationAspects}

`getAllClassificationAspects()` gets all the aspects that define a classification. An array of aspect QNames in `prefix:localName` form is returned.

### Returns

Returns an array of strings representing aspects as QNames.

### Example

```

    model.aspects = classification.getAllClassificationAspects();    
      
```

The previous code would return aspects such as `cm:taggable`, `cm:generalclassifiable`, `cm:classifiable`.

## getCategory {#getCategory}

`getCategory(catRef)` returns a category node.

### Parameters

-   **catRef**

    The category node reference.


### Returns

A category node.

### Example

```

  .
  
```

## getCategoryUsage {#getCategoryUsage}

`getCategoryUsage(aspect, maxCount)` returns categories with the most number of objects. The number of categories returned is specified in `maxCount`.

### Parameters

-   **aspect**

    The classification aspect / category.

-   **maxCount**

    The maximum number of categories to return.


### Returns

Scriptable object containing the top categories.

### Example

```

  .
  
```

## getRootCategories {#getRootCategories}

`getRootCategories(aspect)` returns an array of root category nodes for a given classification.

### Parameters

-   **aspect**

    The classification aspect.


### Returns

Array of root category nodes.

### Example

```

    model.catnodes = classification.getRootCategories("cm:generalclassifiable");    
  
```

The previous code snippet would return category node names such as:

```

Software Document Classification

Languages

Regions

Tags    
  
```

## setStoreUrl {#setstoreurl}

`setStoreUrl(storeRef)` sets the default store reference.

### Parameters

-   **String storeRef**

    The default store reference.


### Returns

void

## CategoryNode API {#categorynode-api}

The CategoryNode objects returned from the classification object methods are extended from the standard JavaScript ScriptNode model.

### Properties

-   **`isCategory`**

    Returns true if this is a category node, or false otherwise. This is supported by all nodes types.


-   **`categoryMembers`**

    Gets an array of all the members of this category at any depth


-   **`subCategories`**

    Gets an array of all the subcategories of this category at any depth


-   **`membersAndSubCategories`**

    Gets an array of all the subcategories and members of this category at any depth


-   **`immediateCategoryMembers`**

    Gets an array of all the immediate members of this category (only direct members of this category and not through sub categories).


-   **`immediateSubCategories`**

    Gets an array of all the immediate subcategories of this category (only direct subcategories of this category and not through subcategories)


-   **`immediateMembersAndSubCategories`**

    Gets an array of all the immediate subcategories and members of this category (only direct subcategories and members of this category and not through subcategories)


-   **[createSubCategory](#createsubcategory)**  
`createSubCategory(name)` creates a new subcategory from the current category node.
-   **[removeCategory](#removecategory)**  
`removeCategory()` deletes the current category node.
-   **[rename](#rename)**  
`rename(name)` renames the current category node to the specified name.

## createSubCategory {#createsubcategory}

`createSubCategory(name)` creates a new subcategory from the current category node.

### Parameters

-   **name**

    Name of the category to create.


### Returns

Returns a `CategoryNode` representing the new sub-category created.

## removeCategory {#removeCategory}

`removeCategory()` deletes the current category node.

## rename {#rename}

`rename(name)` renames the current category node to the specified name.

### Parameters

-   **name**

    String representing the new name of the category node.

## Logging API {#logging-api}

A root level `logger` object provides a number of methods to help debug scripts.

### Properties

-   **`loggingEnabled`**

    True if logging is enabled.

-   **`debugLoggingEnabled`**

    True if debug logging is enabled.

-   **`infoLoggingEnabled`**

    True if info logging is enabled.

-   **`warnLoggingEnabled`**

    True if warn logging is enabled.

-   **`errorLoggingEnabled`**

    True if error logging is enabled.


```
logger.debug("Debug string")
```

-   **[log](#log)**  
`log(string)` writes a message string to the log.
-   **[warn](#warn)**  
`warn(string)` writes a message string to the log.
-   **[info](#info)**  
`info(string)` writes a message string to the log.
-   **[error](#error)**  
`error(string)` writes a message string to the console.
-   **[debug](#debug)**  
`debug(string)` writes a debug message string to the log.

## log {#log}

`log(string)` writes a message string to the log.

### Parameters

-   **string**

    A message string to write to the log.


## warn {#warn}

`warn(string)` writes a message string to the log.

### Parameters

-   **string**

    A message string to write to the log.


## info {#info}

`info(string)` writes a message string to the log.

### Parameters

-   **string**

    A message string to write to the log.


## error {#error}

`error(string)` writes a message string to the console.

### Parameters

-   **string**

    A message string to write to the log.


## debug {#debug}

`debug(string)` writes a debug message string to the log.

### Parameters

-   **string**

    A message string to write to the log.


## People API {#people-api}

The People API provides access to Alfresco Content Services people and groups.

-   **[addAuthority](#addauthority)**  
`addAuthority(parentGroup, authority)` adds an authority (User or Group ) to the specified parent group.
-   **[changePassword](#changepassword)**  
`changePassword(oldpassword, newpassword)` changes the password for the current user only when the old password is supplied.
-   **[createGroup](#creategroup)**  
The `createGroup` methods are used to create groups.
-   **[createPerson](#createperson)**  
`createPerson` creates a person (`cm:person`) object.
-   **[deleteGroup](#deletegroup)**  
`deleteGroup(group)` removes a group from the system.
-   **[deletePerson](#deleteperson)**  
The `deletePerson(username)` method deletes a person with the given user name from the system.
-   **[disableAccount](#disableaccount)**  
`disableAccount(userName)` disables an enabled account. It can be invoked with Administrator authority only.
-   **[enableAccount](#enableaccount)**  
`enableAccount(userName)` enables a disabled account. It can be invoked with Administrator authority only.
-   **[getCapabilities](#getcapabilities)**  
`getCapabilities(person)` returns a hash of the specified user's capabilities.
-   **[getContainerGroups](#getcontainergroups)**  
`getContainerGroups(person)` gets the groups that contain the specified authority.
-   **[getExcludeTenantFilter](#getexcludetenantfilter)**  
`getExcludeTenantFilter(person)` returns a Boolean.
-   **[getGroup](#getgroup)**  
`getGroup(groupId)` gets a group given the group ID.
-   **[getImmutableProperties](#getimmutableproperties)**  
`getImmutableProperties(username)` returns a map of the person properties that are marked as immutable for the given user.
-   **[getMembers](#getmembers)**  
`getMembers` returns an array of people nodes belonging to the specified group (including all subgroups).
-   **[getPeople](#getpeople)**  
The `getPeople(...)` methods get the collection of people stored in the repository.
-   **[getPeoplePaging](#getpeoplepaging)**  
`getPeoplePaging()` gets the collection of people stored in the repository.
-   **[getPeopleEvaluationMode](#getpeopleevaluationmode)**  
`ScriptNode getPeopleEvaluationMode(username)` returns the permission evaluation mode.
-   **[getPerson](#getperson)**  
`ScriptNode getPerson(username)` returns a single (cm:person) node associated with the specified user name, or null if the person does not exist.
-   **[getPersonFullName](#getpersonfullname)**  
`ScriptNode getPersonFullName(username)` avoids complete `getProperties()` retrieval for a `cm:person` when the script only requires the full name of person.
-   **[isAccountEnabled](#isaccountenabled)**  
`isAccountEnabled(userName)` determines if the specified user's account is enabled.
-   **[isAdmin](#isadmin)**  
`isAdmin(person)` determines if the specified user has Administrator authority.
-   **[isGuest](#isguest)**  
`isGuest(person)` determines if the specified user has Guest authority.
-   **[removeAuthority](#removeauthority)**  
`removeAuthority(parentGroup, authority)` removes an authority from a group.
-   **[setPassword](#setpassword)**  
`setPassword(userName, password)` sets the password for the given user. It is executable with Administrator authority only.
-   **[setQuota](#setquota)**  
`setQuota(person, quota)` sets the quota content in bytes for the specified person. It can be invoked only by an Administrator authority.
-   **[setStoreUrl](#setstoreurl)**  
`setStoreUrl(storeRef)` sets the default store reference.

## addAuthority {#addAuthority}

`addAuthority(parentGroup, authority)` adds an authority (User or Group ) to the specified parent group.

### Parameters

-   **parentGroup**

    The node representing the group to add the user or group to.

-   **authority**

    A node representing the user or group to add.


### Example

The following example will add `joe.user` to the administrators group.

```

var group = people.getGroup("GROUP_ALFRESCO_ADMINISTRATORS");

if(group){

    user = people.getPerson("joe.user");
    try{
        people.addAuthority(group, user);
    }
    catch (ex){
        model.message = "ABORT: Exception occurred: "+ex;
        return;
    }
}                                                                                                                                       
      
```

If a problem occurs, for example the user cannot be found, an exception message will be generated such as the following:

```

        ABORT: Exception occurred: JavaException: java.lang.IllegalArgumentException: Authority is a mandatory parameter
      
```

## changePassword {#changepassword}

`changePassword(oldpassword, newpassword)` changes the password for the current user only when the old password is supplied.

### Parameters

-   **oldpassword**

    A string representing the currently logged in user's current password.

-   **newpassword**

    A string representing the currently logged in user's new password.


### Example

```

  people.changePassword("oldpwd", "newpwd");
      
```

## createGroup {#createGroup}

The `createGroup` methods are used to create groups.

### createGroup(groupName)

`createGroup(groupName)` this method creates a new top-level where groupName is the unique group name to create.

#### Parameters

-   **group**

    The unique group name to create


#### Example

```

    var groupName = "TECH_WRITERS";
    var newGroup = people.getGroup("GROUP_"+groupName);
    if(!newGroup){
        newGroup = people.createGroup(groupName);
    }          
        
```

### createGroup(parentGroup,groupName)

`createGroup(parentGroup, groupName)` this method creates a new group as a child of the specified parent group node. This can be null for a top-level group.

#### Parameters

-   **parentGroup**

    The parent group

-   **groupName**

    The group name


#### Example

```

    var parentGroupName = "TECH_WRITERS";
    var parentGroup = people.getGroup("GROUP_"+parentGroupName);
    var subGroup = "TECH_WRITER_ELITE"; // do not prefix with GROUP_
    
    if(parentGroup){
        newGroup = people.createGroup(parentGroup, subGroup);
        model.newGroup = newGroup;
    }
        
```

## createPerson {#createperson}

`createPerson` creates a person (`cm:person`) object.

### createPerson(username)

`createPerson(username)` creates a person (`cm:person`) with the given user name.

#### Parameters

-   **userName**

    A string representing the user name for the user to be created.


#### Returns

Returns the `person` node created or null if the user name already exists.

### createPerson(userName, firstName, lastName, emailAddress)

`createPerson(userName, firstName, lastName, emailAddress)` creates a person (`cm:person`) with a generated user name.

#### Parameters

-   **userName**

    A string representing the username for the user to be created.

-   **firstName**

    A string representing the user's first name.

-   **lastName**

    A string representing the user's last name.

-   **emailAddress**

    A string representing the user's email address.


#### Returns

Returns the `person` node created or null if the user cannot be created.

### createPerson(username, firstName, lastName, emailAddress, password, setAccountEnabled)

`createPerson(username, firstName, lastName, emailAddress, password, setAccountEnabled)` creates a person (`cm:person`) with a generated user name.

#### Parameters

-   **userName**

    A string representing the username for the user to be created.

-   **firstName**

    A string representing the user's first name.

-   **lastName**

    A string representing the user's last name.

-   **emailAddress**

    A string representing the user's email address.

-   **setAccountEnabled**

    A boolean. Set to true to create an enabled user account. Set to false to create a disabled user account.


#### Returns

Returns the `person` node created or null if the user cannot be created.

### createPerson(username, firstName, lastName, emailAddress, password, setAccountEnabled, notifyByEmail)

`createPerson(username, firstName, lastName, emailAddress, password, setAccountEnabled, notifyByEmail)` creates a person (`cm:person`) with a generated user name.

#### Parameters

-   **userName**

    A string representing the username for the user to be created.

-   **firstName**

    A string representing the user's first name.

-   **lastName**

    A string representing the user's last name.

-   **emailAddress**

    A string representing the user's email address.

-   **setAccountEnabled**

    A boolean. Set to true to create an enabled user account. Set to false to create a disabled user account.

-   **notifyByEmail**

    A boolean. Set to true to have an automated email sent to the user's account when the account is created. This only works if the username and password are provided. If set to false no email will be sent.


#### Returns

Returns the `person` node created or null if the user cannot be created.

#### Example

```

    var testUser = people.createPerson("joe.user", "Joe", "User", "joe.user@alfresco.com", "password", true, true);
    if (testUser){
        // user account created
    }          
        
```

## deleteGroup {#deletegroup}

`deleteGroup(group)` removes a group from the system.

### Parameters

-   **group**

    The group to delete.


### Example

```

var node = people.getGroup("GROUP_TECH_WRITERS");

if(node){
    people.deleteGroup(node);
}        
      
```

## deletePerson {#deleteperson}

The `deletePerson(username)` method deletes a person with the given user name from the system.

### Parameters

-   **username**

    The user name of the person to delete.


### Example

```

    people.deletePerson("joe.user");    
  
```

## disableAccount {#disableAccount}

`disableAccount(userName)` disables an enabled account. It can be invoked with Administrator authority only.

> **Note:** This procedure works for alfrescoNtlm users only.

### Parameters

-   **userName**

    A string representing the user name of the user whose account is to be disabled.


### Example

The following code snippet toggles the user account status:

```

if(people.isAccountEnabled("Joe")){
    people.disableAccount("Joe");        
}
else{
    people.enableAccount("Joe");
}
```

## enableAccount {#enableAccount}

`enableAccount(userName)` enables a disabled account. It can be invoked with Administrator authority only.

### Parameters

-   **userName**

    A string representing the user name of the user whose account is to be enabled.


### Example

The following code snippet toggles the user account status:

```

    if(people.isAccountEnabled("Joe")){
        people.disableAccount("Joe");        
    }
    else{
        people.enableAccount("Joe");
    }

      
```

## getCapabilities {#getCapabilities}

`getCapabilities(person)` returns a hash of the specified user's capabilities.

### Parameters

-   **person**

    A node representing the user whose capabilities are to be fetched.


### Returns

A <string, boolean> hash containing the capabilities of the user. For example, `isMutable`, `isGuest`, `isAdmin` and their boolean states will be returned.

### Example

The following code snippet returns a hash containing the capabilities of the `admin` user:

```

var person = people.getPerson("admin");

if (person){
    model.caps = people.getCapabilities(person);
}
```

The capabilities returned would be as follows:

```

isMutable: TRUE

isGuest: FALSE

isAdmin: TRUE  

```

## getContainerGroups {#getContainerGroups}

`getContainerGroups(person)` gets the groups that contain the specified authority.

### Parameters

-   **person**

    The user (cm:person) to get the containing groups for.


### Example

The following code returns a list of groups that `abeecher` is a member of:

```

var user = people.getPerson("abeecher");

if(user){
    model.containers = people.getContainerGroups(user);
}
```

## getExcludeTenantFilter {#getExcludeTenantFilter}

`getExcludeTenantFilter(person)` returns a Boolean.

### Parameters

None

### Returns

A boolean.

## getGroup {#getGroup}

`getGroup(groupId)` gets a group given the group ID.

### Parameters

-   **groupId**

    A string representing the groupId of the group to return.


### Returns

Returns a `ScriptGroup` object, or null if the group cannot be found.

### Example

```

        
function main()
{
   //
   // Get the person details
   //
   
   if ((json.isNull("userName")) || (json.get("userName").length() == 0))
   {
      status.setCode(status.STATUS_BAD_REQUEST, "User name missing when creating person");
      return;
   }
   
   if ((json.isNull("firstName")) || (json.get("firstName").length() == 0))
   {
      status.setCode(status.STATUS_BAD_REQUEST, "First name missing when creating person");
      return;
   }
   
   if ((json.isNull("email")) || (json.get("email").length() == 0))
   {
      status.setCode(status.STATUS_BAD_REQUEST, "Email missing when creating person");
      return;
   }
   
   var password = "password";
   if (json.has("password"))
   {
      password = json.get("password");
   }
   
   // Create the person with the supplied user name
   var userName = json.get("userName");
   var enableAccount = ((json.has("disableAccount") && json.get("disableAccount")) == false);
   var person = people.createPerson(userName, json.get("firstName"), json.get("lastName"), json.get("email"), password, enableAccount);
   
   // return error message if a person with that user name could not be created
   if (person === null)
   {
      status.setCode(status.STATUS_CONFLICT, "User name already exists: " + userName);
      return;
   }
   
   // assign values to the person's properties
   if (json.has("title"))
   {
      person.properties["title"] = json.get("title");
   }
   if (json.has("organisation"))
   {
      person.properties["organization"] = json.get("organisation");
   }
   if (json.has("jobtitle"))
   {
      person.properties["jobtitle"] = json.get("jobtitle");
   }
   person.save();
   
   // set quota if any - note that only Admin can set this and will be ignored otherwise
   var quota = (json.has("quota") ? json.get("quota") : -1);
   people.setQuota(person, quota.toString());
   
   // apply groups if supplied - note that only Admin can successfully do this
   if (json.has("groups"))
   {
      var groups = json.get("groups");
      for (var index=0; index<groups.length(); index++)
      {
         var groupId = groups.getString(index);
         var group = people.getGroup(groupId);
         if (group != null)
         {
            people.addAuthority(group, person);
         }
      }
   }
   
   // Put the created person into the model
   model.person = person;
}

main();

      
```

## getImmutableProperties {#getImmutableProperties}

`getImmutableProperties(username)` returns a map of the person properties that are marked as immutable for the given user.

This enables a script to interrogate which properties are dealt with by an external system such as LDAP and should not be mutable in any client UI.

### Parameters

-   **username**

    A string representing the username of the user whose immutable properties are to be fetched.


### Returns

A `ScriptableHashMap` containing the immutable properties of the specified user.

### Example

```

var person = people.getPerson("abeecher");

if (person){
    model.immutableProperties = people.getImmutableProperties(person);
}
```

## getMembers {#getMembers}

`getMembers` returns an array of people nodes belonging to the specified group (including all subgroups).

### getMembers

`getMembers(group)` gets specified group members.

#### Parameters

-   **group**

    A node representing the group whose members will be fetched.


#### Returns

Returns an array of people nodes belonging to the specified group (including all subgroups).

#### Example

The following code would fetch all members of the administrators group and any subgroups.

```

var node = people.getGroup("GROUP_ALFRESCO_ADMINISTRATORS");

if(node){
    model.members = people.getMembers(node);         
}
```

### getMembers

`getMembers(group, recurse)` gets specified group members. Will not recurse into subgroups if `recurse` is set to `false`.

#### Parameters

-   **group**

    A node representing the group whose members will be fetched.

-   **recurse**

    Set to true to recurse into subgroups. Set to false to turn off recursion.


#### Returns

Returns an array of people nodes belonging to the specified group or people of subgroups if `recurse` was set to true.

#### Example

The following code would fetch all members of the administrators group, but not the members of any subgroups.

```

var node = people.getGroup("GROUP_ALFRESCO_ADMINISTRATORS");

if(node){
    model.members = people.getMembers(node, false);         
}
```


## getPeople {#getPeople}

The `getPeople(...)` methods get the collection of people stored in the repository.

### getPeople(filter)

`getPeople(filter)` get the collection of people stored in the repository.

An optional filter query can be provided by which to filter the people collection. Space separates the query terms, for example "john bob" will find all users whose first or second names contain the strings "john" or "bob".

CAUTION:

This method is **deprecated** in version 4.0 and above.

#### Parameters

-   **filter**

    This is a query string by which to filter the collection of people. If `null` then all people stored in the repository are returned.


#### Returns

Returns an array of NodeRefs.

#### Example

```

        
var user;
var nodes = people.getPeople(null);
for each(var node in nodes)
{ 
  logger.log(node); 
  user = utils.getNodeFromString(node); 
  logger.log(user.properties["cm:userName"] + " '" 
      + user.properties["cm:firstName"] + "' '" 
      + user.properties["cm:lastName"] + "'"); 
}         
        
      
```

### getPeople(filter, maxResults)

`getPeople(filter, maxResults)` get the collection of people stored in the repository.

An optional filter query can be provided by which to filter the people collection. Space separates the query terms, for example "john bob" will find all users whose first or second names contain the strings "john" or "bob".

#### Parameters

-   **filter**

    This is a query string by which to filter the collection of people. If `null` then all people stored in the repository are returned.

-   **maxResults**

    The maximum number of results to return. Returns all results if this value is set to be less than or equal to zero.


#### Returns

Returns an array of NodeRefs.

#### Example

The following snippet would return all users whose first or last names contained the string “fred”. The results are limited to a maximum of 10 results:

```

    model.users = people.getPeople("fred", 10);    
        
```

### getPeople(filter, maxResults, sortBy, sortAsc)

`getPeople(filter, maxResults, sortBy, sortAsc)` get the collection of people stored in the repository.

An optional filter query can be provided by which to filter the people collection. Space separates the query terms, for example "john bob" will find all users whose first or second names contain the strings "john" or "bob". This method supports sorting by specifying `sortBy` and `sortAsc` parameters.

#### Parameters

-   **filter**

    This is a query string by which to filter the collection of people. If `null` then all people stored in the repository are returned.

-   **maxResults**

    The maximum number of results to return. Returns all results if this value is set to be less than or equal to zero.

-   **sortBy**

    The field for sorting.

-   **sortAsc**

    Set to true to sort results in ascending order.


#### Returns

Returns an array of NodeRefs.

#### Example

The following snippet would return all users whose first or last names contained the string “fred”, sorted in ascending order on `lastName`. The results are limited to a maximum of 10 results:

```

    model.users = people.getPeople("fred", 10, "lastName", true);    
        
```


## getPeoplePaging {#getPeoplePaging}

`getPeoplePaging()` gets the collection of people stored in the repository.

### Parameters

-   **filter**

    This is a query string by which to filter the collection of people. If `null` then all people stored in the repository are returned.

-   **pagingRequest**

    A `ScriptPagingDetails` object.

-   **sortBy**

    The field for sorting.

-   **sortAsc**

    Set to true to sort results in ascending order.


### Returns

Returns a collection of people objects as a JavaScript array, with Paging.

### Example


## getPeopleEvaluationMode {#getPeopleEvaluationMode}

`ScriptNode getPeopleEvaluationMode(username)` returns the permission evaluation mode.

### Parameters

None

### Returns

Permission evaluation mode.

## getPerson {#getPerson}

`ScriptNode getPerson(username)` returns a single (cm:person) node associated with the specified user name, or null if the person does not exist.

### Parameters

-   **username**

    A string representing the user name for the user who is being fetched.


### Returns

A node representing the user requested, or null if the user name cannot be found.

### Example

The following code snippet returns the node object for the user with the username `abeecher`:

```

model.user = people.getPerson("abeecher");  
      
```

## getPersonFullName {#getPersonFullName}

`ScriptNode getPersonFullName(username)` avoids complete `getProperties()` retrieval for a `cm:person` when the script only requires the full name of person.

### Parameters

-   **username**

    A string representing the user name of the user for which to return the full name.


### Returns

Full name of the person or null if the user does not exist in the system.

### Example

The following code snippet returns the full name for the user with the username `abeecher`:

```

model.fullname = people.getPersonFullName("abeecher");  
      
```

## isAccountEnabled {#isAccountEnabled}

`isAccountEnabled(userName)` determines if the specified user's account is enabled.

### Parameters

-   **userName**

    A string representing the user name of the user whose account is to be checked.


### Returns

Returns true if the specified user account is enabled, false if the account is currently disabled.

### Example

The following code snippet toggles the user account status:

```

if(people.isAccountEnabled("Joe")){
    people.disableAccount("Joe");        
}
else{
    people.enableAccount("Joe");
}
```

## isAdmin {#isAdmin}

`isAdmin(person)` determines if the specified user has Administrator authority.

### Parameters

-   **person**

    A node representing the user to check.


### Returns

Returns true if the specified user is an Administrator authority.

### Example

```

var userName = "abeecher";

var user = people.getPerson(userName);

if(user){
    model.isAdmin = people.isAdmin(user);
    model.userName = userName;
}
```

## isGuest {#isGuest}

`isGuest(person)` determines if the specified user has Guest authority.

### Parameters

-   **person**

    A node representing the user to check.


### Returns

Returns true if the specified user is logged in as a guest.

### Example

```

var userName = "abeecher";

var user = people.getPerson(userName);

if(user){
    model.isAdmin = people.isGuest(user);
    model.userName = userName;
}
```

## removeAuthority {#removeAuthority}

`removeAuthority(parentGroup, authority)` removes an authority from a group.

### Parameters

-   **parentGroup**

    The node representing the group to remove the user or group from.

-   **authority**

    A node representing the user or group to remove.


### Example

The following code will remove the user `abeecher` from the test group.

```

var group = people.getGroup("GROUP_TEST");

if(group){

    user = people.getPerson("abeecher");
    try{
        people.removeAuthority(group, user);
    }
    catch (ex){
        model.message = "ABORT: Exception occurred: "+ex;
        return;
    }
}
```

If a problem occurs, for example the user cannot be found, an exception message will be generated such as the following:

```

        ABORT: Exception occurred: JavaException: java.lang.IllegalArgumentException: Authority is a mandatory parameter
      
```

## setPassword {#setpassword}

`setPassword(userName, password)` sets the password for the given user. It is executable with Administrator authority only.

### Parameters

-   **userName**

    A string representing the user name of the user to set the password for.

-   **password**

    A string representing the password to assign for the user specified.


### Example

```
people.setPassword("joe.user", "newpwd");
```

## setQuota {#setquota}

`setQuota(person, quota)` sets the quota content in bytes for the specified person. It can be invoked only by an Administrator authority.

### Parameters

-   **person**

    A node representing the user to set the quota for.

-   **quota**

    A string representing the quota in bytes to allocate to the specified user. A value of -1 means no quota is set.


### Example

The following code sets the quota to 10 MB for the user `abeecher`:

```

    var userName = "abeecher";
    var user = people.getPerson(userName);
    if (user){
        people.setQuota(user, "10240000"); // 10 MB
    }
      
```

## setStoreUrl {#setstoreurl}

`setStoreUrl(storeRef)` sets the default store reference.

### Parameters

-   **String storeRef**

    The default store reference.


### Returns

void

## ScriptAction API

A ScriptAction represents an action registered within the repository.

### Properties

-   **`name`**

    Returns the name of the action

-   **`parameters`**

    An associative array (map) of the parameters for the action


-   **[execute](#execute)**  
The `execute()` methods execute the action against the specified node.
-   **[executeAsynchronously](#executeasynchronously)**  
`executeAsynchronously(node)` executes the action against the specified node asynchronously.

## execute {#execute}

The `execute()` methods execute the action against the specified node.

### execute(node)

`execute(node)` executes the action against the specified node.

The action (and its parameters) can be reused against many nodes by repeatedly invoking execute. Between invocations, the parameters of the action can be changed.

#### Parameters

-   **node**

    The node on which to execute the action.


#### Example

Executing the mail action:

```


// create mail action   
var mail = actions.create("mail");   
mail.parameters.to = "davidc@alfresco.com";   
mail.parameters.subject = "Hello from JavaScript";   
mail.parameters.from = "davidc@alfresco.com";   
mail.parameters.template = root.childByNamePath
("Company Home/Data Dictionary/Email Templates/notify_user_email.ftl");   
mail.parameters.text = "some text, in case template is not found";   
// execute action against a document       
mail.execute(doc); 
      
```

### execute(node, readOnly, newTxn)

`execute(node, readOnly, newTxn)` executes the action against the specified node.

The action (and its parameters) can be reused against many nodes by repeatedly invoking execute. Between invocations, the parameters of the action can be changed.

#### Parameters

-   **node**

    The node on which to execute the action.

-   **readOnly**

    Set to true to start a read-only transaction, false otherwise.

-   **newTxn**

    Set to true to start a new transaction, false to use the existing transaction.


### execute(nodeRef)

`execute(nodeRef)` executes the action against the specified node.

The action (and its parameters) can be reused against many nodes by repeatedly invoking execute. Between invocations, the parameters of the action can be changed.

#### Parameters

-   **nodeRef**

    The node on which to execute the action.


### execute(nodeRef, readOnly, newTxn)

`execute(nodeRef, readOnly, newTxn)` executes the action against the specified node.

The action (and its parameters) can be reused against many nodes by repeatedly invoking execute. Between invocations, the parameters of the action can be changed.

#### Parameters

-   **nodeRef**

    The node on which to execute the action.

-   **readOnly**

    Set to true to start a read-only transaction, false otherwise.

-   **newTxn**

    Set to true to start a new transaction, false to use the existing transaction.


## executeAsynchronously {#executeasynchronously}

`executeAsynchronously(node)` executes the action against the specified node asynchronously.

The action (and its parameters) can be reused against many nodes by repeatedly invoking execute. Between invocations, the parameters of the action can be changed.

When called, this method returns immediately, with the action executing in a separate thread.

### Parameters

-   **node**

    The node on which to execute the action.

## Search API {#search-api}

The Search API provides direct access to repository level search results and Saved Search results through the `search` root scope object.

Local searches can be performed using the ScriptNode APIs `childByNamePath` and `childByXPath`. Like the various node objects, the `search` object is part of the root scope.

-   **[findNode](#findnode)**  
`findNode` methods allow you to search for a single node by node reference object, or node reference string. By default the method assumes you are searching for a node that is a descendent of `CompanyHome`.
-   **[ISO9075Decode](#iso9075decode)**  
`ISO9075Decode(string value)` is a helper to decode a ISO9075-encoded string for Lucene PATH statements.
-   **[ISO9075Encode](#iso9075encode)**  
`ISO9075Encode(string value)` is a helper to encode a value into ISO9075-encoded format for Lucene PATH statements.
-   **[isValidXpathQuery](#isvalidxpathquery)**  
`isValidXpathQuery(query)` checks the validity of an XPath query string.
-   **[luceneSearch](#lucenesearch)**  
The `luceneSearch` methods provide search operations using the Lucene search syntax.
-   **[query](#query)**  
`query(search)` performs a search on `ScriptNode` objects.
-   **[savedSearch](#savedsearch)**  
`savedSearch(node)` returns an array of `ScriptNode` objects that were found by executing the Saved Search referenced by the supplied `node` object. The node object contains the XML that represents the saved search.
-   **[selectNodes](#selectnodes)**  
The `selectNodes` methods perform an XPath search and return a list of found nodes.
-   **[tagSearch](#tagsearch)**  
`tagSearch(store, tag)` performs a search on a given tag in a given store.
-   **[xpathSearch](#xpathsearch)**  
 `xpathSearch(xpath)` performs an XPath search.

## findNode {#findNode}

`findNode` methods allow you to search for a single node by node reference object, or node reference string. By default the method assumes you are searching for a node that is a descendent of `CompanyHome`.

### findNode(noderef)

`findNode(noderef)`

This method returns a single `ScriptNode` as specified by the `NodeRef` object for that node.

#### Parameters

-   **noderef**

    Node reference of the node to find.


#### Returns

Returns a single `ScriptNode` object, or null if the search failed.

#### Example

```
var foundNode = search.findNode(nodeRef);
```

### findNode(noderef)

`findNode(noderef)`

This method returns a single `ScriptNode` as specified by the string form of the `NodeRef` for that node, null is returned if the search failed.

#### Parameters

-   **noderef**

    A node reference as a string.


#### Returns

Returns a single `ScriptNode`, or null if the search failed.

#### Example

```
       
var foundNode = null;    
if (nodeRef.isNodeRef(nodeRefString)){

    foundNode = search.findNode(nodeRefString);
    ...
}
```

### findNode(referenceType, reference)

`findNode(referenceType, reference)`

Helper to convert a Web Script Request URL to a `NodeRef`.

#### Parameters

-   **referenceType**

    The reference type. The reference type can be one of:

    -   `node`
    -   `path`
-   **reference**

    The reference elements supplied depend on the reference type:

    -   `node` - {store_type}/{store_id}/{node_id} — resolve to node through its node reference
    -   `path` - {store_type}/{store_id}/{path} — resolve to node through its display path

#### Returns

Returns a single `ScriptNode`, or null if the search failed.

#### Example

```

var referenceType = "node"; 
// Store type, store id, node id
var reference = ["workspace", "SpacesStore", "78eb920f-fd46-41ee-9fdb-099e96da8349"];
var foundNode = search.findNode(referenceType, reference);


```

```

var referenceType = "path";
// store type, store id, display path 
var reference = ["workspace", "SpacesStore", "Company Home/dir1/dir2","TEST_FILE_1.TXT"];
var foundNode = search.findNode(referenceType, reference);

```

## ISO9075Decode {#iso9075decode}

`ISO9075Decode(string value)` is a helper to decode a ISO9075-encoded string for Lucene PATH statements.

### Parameters

-   **string**

    The string to decode.


### Returns

Returns a decoded string.

### Example

The following code:

```

var rawString = "//test:123 DIR/FILE.TXT @";    
var encodedString = search.ISO9075Encode(rawString);
var decodedString = search.ISO9075Decode(encodedString);        
      
```

Would result in the following strings:

```

rawString: //test:123 DIR/FILE.TXT @
encodedString: _x002f__x002f_test_x003a_123_x0020_DIR_x002f_FILE.TXT_x0020__x0040_
decodedString: //test:123 DIR/FILE.TXT @    
      
```

The following code:

```

var rawString = "@cm\:name:\"banana\"";    
var encodedString = search.ISO9075Encode(rawString);
var decodedString = search.ISO9075Decode(encodedString);
      
```

Would result in the following strings:

```

rawString: @cm:name:"banana"
encodedString: _x0040_cm_x003a_name_x003a__x0022_banana_x0022_
decodedString: @cm:name:"banana"        
      
```

## ISO9075Encode {#iso9075encode}

`ISO9075Encode(string value)` is a helper to encode a value into ISO9075-encoded format for Lucene PATH statements.

### Parameters

-   **string**

    The string to encode. Characters within the string that need to be encoded to ISO9075 will take the format _xDDDD_, where DDDD is the hex value of the character.


### Returns

Returns a ISO9075 encoded string.

### Example

The following code:

```

var rawString = "//test:123 DIR/FILE.TXT @";    
var encodedString = search.ISO9075Encode(rawString);
var decodedString = search.ISO9075Decode(encodedString);        
      
```

Would result in the following strings:

```

rawString: //test:123 DIR/FILE.TXT @
encodedString: _x002f__x002f_test_x003a_123_x0020_DIR_x002f_FILE.TXT_x0020__x0040_
decodedString: //test:123 DIR/FILE.TXT @    
      
```

The following code:

```

var rawString = "@cm\:name:\"banana\"";    
var encodedString = search.ISO9075Encode(rawString);
var decodedString = search.ISO9075Decode(encodedString);
      
```

Would result in the following strings:

```

rawString: @cm:name:"banana"
encodedString: _x0040_cm_x003a_name_x003a__x0022_banana_x0022_
decodedString: @cm:name:"banana"        
      
```

## isValidXpathQuery {#isvalidxpathquery}

`isValidXpathQuery(query)` checks the validity of an XPath query string.

### Parameters

-   **query**

    The XPath query string to check.


### Returns

Returns true is the query is a valid XPath query string, false otherwise.

### Example

The method can be used to check the validity of a XPath query prior to use:

```

if (search.isValidXpathQuery(query)){
    nodes = search.xpathSearch(query);
}
else {
  // ...
}
      
```

## luceneSearch {#lucenesearch}

The `luceneSearch` methods provide search operations using the Lucene search syntax.

### luceneSearch(search)

`luceneSearch(search)` this method performs a full-text search.

#### Parameters

-   **search**

    The search terms and operators that represent the Lucene search phrase.


#### Returns

Returns an array of `ScriptNode` objects that were found by the repository Lucene search.

#### Example

`var nodes = search.luceneSearch("TEXT:alfresco");`

### luceneSearch(store, search)

`luceneSearch(store, search)` this method performs a Lucene search in a given store.

#### Parameters

-   **store**

    The given store, for example `workspace://SpacesStore`.

-   **search**

    The search terms and operators that represent the Lucene search phrase.


#### Returns

Returns an array of `ScriptNode` objects that were found by the repository Lucene search in the given store.

#### Example

`var nodes = search.luceneSearch("workspace://SpacesStore", "TEXT:foo");`

### luceneSearch(search, sortColumn, asc)

`luceneSearch(search, sortColumn, asc)` this method performs a Lucene search by property and a specified sort order.

#### Parameters

-   **search**

    The search terms and operators that represent the Lucene search phrase.

-   **sortColumn**

    The property name to sort on.

-   **asc**

    The sort order. If set to true the results are ordered in ascending order based on the property specified. If false the results are sorted in descending order.


#### Returns

Returns an array of `ScriptNode` objects satisfying the search criteria sorted by the specified `sortColumn` and `asc`.

#### Example

`var nodes = search.luceneSearch("TEXT:alfresco", "@cm:modified", false);`

### luceneSearch(store, search, sortColumn, asc)

`luceneSearch(store, search, sortColumn, asc)`

This method performs a Lucene search by property and a specified sort order in the given store.

#### Parameters

-   **store**

    The given store

-   **search**

    The search terms and operators that represent the Lucene search phrase.

-   **sortColumn**

    The property name to sort on

-   **asc**

    The sort order. If set to true the results are ordered in ascending order based on the property specified. If false the results are sorted in descending order.


#### Returns

Returns an array of `ScriptNode` objects satisfying the search criteria and sorted by the specified `sortColumn` and `asc` in the given store.

#### Example

`var nodes = search.luceneSearch("workspace://SpacesStore", "TEXT:alfresco", "@cm:modified", true);`

### luceneSearch(search, sortColumn, asc, max)

`luceneSearch(search, sortColumn, asc, max)` this method performs a Lucene search by property and a specified sort order in the specified store. The number of results returned can be limited.

#### Parameters

-   **search**

    The search terms and operators that represent the Lucene search phrase.

-   **sortColumn**

    The property name to sort on

-   **asc**

    The sort order. If set to true the results are ordered in ascending order based on the property specified. If false the results are sorted in descending order.

-   **max**

    The maximun number of items to return in the search results.


#### Returns

Returns an array of `ScriptNode` objects satisfying the search criteria and sorted by the specified `sortColumn` and `asc`. The results are limited to the number specified by the `max` parameter.

#### Example

`var nodes = search.luceneSearch("TEXT:alfresco", "@cm:modified", true, 50);`

### luceneSearch(store, search, sortColumn, asc, max)

`luceneSearch(store, search, sortColumn, asc, max)` this method performs a Lucene search by property and a specified sort order in the give store.

#### Parameters

-   **store**

    The given store

-   **search**

    The search terms and operators that represent the Lucene search phrase.

-   **sortColumn**

    The property name to sort on

-   **asc**

    The sort order. If set to true the results are ordered in ascending order based on the property specified. If false the results are sorted in descending order.

-   **max**

    The maximun number of items to return in the search results.


#### Returns

Returns an array of `ScriptNode` objects satisfying the search criteria and sorted by the specified `sortColumn` and `asc` in the given store. Results are limited to the number specified by the parameter `max`.

#### Example

`var nodes = search.luceneSearch("workspace://SpacesStore", "TEXT:alfresco", "@cm:modified", true, 50);`

## query {#query}

`query(search)` performs a search on `ScriptNode` objects.

### Parameters

-   **search**

    The search object. The search object is defined as follows:

    ```
    
    search
    {
        query: string,          mandatory, in appropriate format and encoded for the given language
        store: string,          optional, defaults to 'workspace://SpacesStore'
        language: string,       optional, one of: lucene, xpath, jcr-xpath, fts-alfresco - defaults to 'lucene'
        templates: [],          optional, Array of query language template objects (see below) - if supported by the language 
        sort: [],               optional, Array of sort column objects (see below) - if supported by the language
        page: object,           optional, paging information object (see below) - if supported by the language
        namespace: string,      optional, the default namespace for properties
        defaultField: string,   optional, the default field for query elements when not explicit in the query
        onerror: string         optional, result on error - one of: exception, no-results - defaults to 'exception'
    }
    
    sort
    {
        column: string,         mandatory, sort column in appropriate format for the language
        ascending: boolean      optional, defaults to false
    }
    
    page
    {
        maxItems: int,          optional, max number of items to return in result set
        skipCount: int          optional, number of items to skip over before returning results
    }
    
    template
    {
        field: string,          mandatory, custom field name for the template
        template: string        mandatory, query template replacement for the template
    }
    
                  
    ```


### Returns

Returns an array of `ScriptNode` objects representing the search results.

### Example

The `search` object defines the search to be executed as is constructed in this way:

The search definition object can be as simple to use as:

`var results = search.query({query: "TEXT:alfresco"});`

Or as richly defined as:

```

var sort1 = 
{ 
  column: "@{http://www.alfresco.org/model/content/1.0}modified", 
  ascending: false 
}; 

var sort2 = 
{ 
  column: "@{http://www.alfresco.org/model/content/1.0}created", 
  ascending: false
}; 

var paging = 
{ 
  maxItems: 100, 
  skipCount: 0 
}; 

var def = 
{ 
  query: "cm:name:test*", 
  store: "workspace://SpacesStore", 
  language: "fts-alfresco", 
  sort: [sort1, sort2], 
  page: paging 
}; 

var results = search.query(def); 

```

This interface supports multi-column sorting and any of the Alfresco Content Services search languages. Future versions of the API will allow the search definition objects to be extended with additional properties while maintaining backward compatibility.

## savedSearch {#savedsearch}

`savedSearch(node)` returns an array of `ScriptNode` objects that were found by executing the Saved Search referenced by the supplied `node` object. The node object contains the XML that represents the saved search.

### Parameters

-   **node**

    The node object representing the saved search node.


### Returns

Array of `ScriptNode` objects

### Example

```

    var node = companyhome.childByNamePath("Data Dictionary/Saved Searches/SilverSearch");
    if (node){        
        var nodes = search.savedSearch(node);
        model.nodes = nodes;
        model.message = "Nodes found from saved search:";
    }
    else{
        model.message = "Saved search not found";
    }
      
```

### savedSearch(noderef)

`savedSearch(noderef)` this method returns an array of `ScriptNode` objects that were found by executing the Saved Search referenced by the supplied `noderef` string.

#### Parameters

-   **noderef**

    The noderef string representing the saved search node.


#### Returns

Array of `ScriptNode` objects

#### Example

```

    var node = companyhome.childByNamePath("Data Dictionary/Saved Searches/GoldSearch");
    if (node){
        
        var nodeRef = node.nodeRef;
        var nodeRefString = nodeRef.toString();

        if (nodeRef.isNodeRef(nodeRefString)){
            var nodes = search.savedSearch(nodeRefString);
            model.nodes = nodes;
            model.message = "Nodes found from saved search:";
        }
        else{
            model.message = "nodeRefString not valid!";
        }
    }
    else{
        model.message = "Saved search not found";
    }

      
```


## selectNodes {#selectNodes}

The `selectNodes` methods perform an XPath search and return a list of found nodes.

This method uses the underlying Node Service to perform a search. While this method provides full support for XPath syntax by using Jaxen, use of the Node Service means that searches might be less performant, especially for queries such as unconstrained full-text searches. For searches of such a nature it might be better to use xpathSearch(), which provides index-based searching at the cost of a more limited XPath syntax.

CAUTION:

The following operators should be avoided or used with caution as they can potentially consume considerable resources:

-   selectNodes with //
-   selectNodes with /*
-   selectNodes with like

In general, avoid using `selectNodes()` unless you are looking for a specific path.

It is generally preferable to use a query language that searches against an index. This avoids potential excessive consumption of resources.

Comparison between searching with the Node Service and using index-based searching, plus further information on supported syntax can be found in the [developer Wiki](http://wiki.alfresco.com/wiki/Search_Documentation).

### selectNodes(search)

`selectNodes(search)`

This method performs an XPath search on the default store, `workspace://SpacesStore`.

#### Parameters

-   **search**

    The search string.


#### Returns

Returns an array of `ScriptNode` objects representing the search results.

### selectNodes(store, search)

`selectNodes(store, search)`

This method performs an XPath search on the specified store.

#### Parameters

-   **store**

    The store to search.

-   **search**

    The search string.


#### Returns

Returns an array of `ScriptNode` objects representing the search results.

#### Example

```

var searchString = "//*"; // XPath search string
var store = "workspace://SpacesStore";

var nodes = search.selectNodes(store, searchString);
        
```

The following JavaScript snippet shows a typical search query:

```


// call in JS
model.nodes = search.selectNodes("/app:company_home/app:dictionary/*[like(@cm:name,'*templates')]")


```

Given the following FTL template:

```

          
<#list nodes as node>
  <p>${node.name}</p>
</#list>

        
```

The result would be:

```

Email Templates

Presentation Templates

Space Templates

RSS Templates

Node Templates
        
```

## tagSearch {#tagsearch}

`tagSearch(store, tag)` performs a search on a given tag in a given store.

The default store (SpacesStore) is used if null value is supplied.

### Parameters

-   **store**

    The store in which to search. The default is `workspace://SpacesStore` if null is provided for this parameter.

-   **tag**

    The tag to search for. Any node with this tag will be returned as part of an array of nodes.


### Returns

Returns an array of `ScriptNode` objects that represent the nodes within the store that have the given tag applied.

### Examples

```

var store = "workspace://SpacesStore";
var tag = "mining";
var nodes = search.tagSearch(store, tag);
      
```

Returns nodes that have the tag “mining” applied to them.

## xpathSearch {#xpathsearch}

`xpathSearch(xpath)` performs an XPath search.

This method executes a search using a Lucene-based indexed query. The support for XPath is restricted but optimized. Being index-based, this method can offer better performance than Node Service based methods such as `selectNodes()`, for searches such as unconstrained full-text searches across large numbers of nodes.

Comparison between searching with the Node Service and using index-based searching, plus further information on supported syntax can be found in the [developer Wiki](http://wiki.alfresco.com/wiki/Search_Documentation).

### Parameters

-   **xpath**

    The XPath search string


### Returns

Returns an array of `ScriptNode` objects that were found by the repository XPath search.

### Example

```

var query = "//";
var nodes = search.xpathSearch(query);
```

### xpathSearch(store, xpath)

`xpathSearch(store, xpath)`

This method performs an XPath search in a given store.

#### Parameters

-   **store**

    The given store

-   **xpath**

    The XPath string


#### Returns

Returns an array of `ScriptNode` objects that were found by the repository XPath search in the given store.

#### Example

```

var query = "//";
var store = "archive://SpacesStore"; 
var nodes = search.xpathSearch(store, query);

```


## Session API {#session-api}

A root level `session` object is provided to access the servelt web session.

### Properties

-   **`id`**

    Gets the session ID.


-   **[getValue](#getvalue)**  
`object getValue(string name)` returns an attribute value from the session.
-   **[setValue](#setvalue)**  
`void setValue(string name, object value)` add or set an attribute for the session.
-   **[removeValue](#removevalue)**  
`void removeValue(string name)` remove an attribute from the session.

## getValue {#getvalue}

`object getValue(string name)` returns an attribute value from the session.

### Parameters

-   **String name**

    The name of the servelt web session attribute to return a value for.


### Returns

An object representing the value of the attribute.

## setValue {#setvalue}

`void setValue(string name, object value)` add or set an attribute for the session.

### Parameters

-   **String name**

    The name of the servlet web session attribute to add or set a value for.

-   **object value**

    The value of the attribute to set or add to the session object.


### Returns

void

## removeValue {#removevalue}

`void removeValue(string name)` remove an attribute from the session.

### Parameters

-   **String name**

    The name of the servlet web session attribute to remove from the session object.


### Returns

void

## SessionTicket API {#sessionticket-api}

A root level `sessionticket` object is provided to access the current logged in user session ticket as a string value.

### Properties

-   **`ticket`**

    Gets the current authentication ticket.

## Utility methods {#utility-methods}

A root level `utils` object is provided as a library of helper methods that are missing from generic JavaScript.

-   **[createPaging](#createpaging)**  
The `createPaging` methods are used to build a `ScriptPagingDetails` object from the parameters supplied.
-   **[disableRules](#disablerules)**  
`disableRules` disables rule execution for the current thread.
-   **[displayPath](#displayPath)**  
`displayPath(node)` returns the `cm:name` display path for a node with minimum performance overhead.
-   **[enableRules](#enablerules)**  
`enableRules` enables rule execution for the current thread.
-   **[fromISO8601](#fromiso8601)**  
`fromISO8601(string)` parses a date from an ISO8601 formatted string.
-   **[getLocale](#getlocale)**  
`getLocale` returns the locale string for the current thread.
-   **[getNodeFromString](#getnodefromstring)**  
`getNodeFromString(noderef)` returns a `ScriptNode` object representing the supplied `NodeRef` string. The node is not confirmed to exist in the repository.
-   **[longQName](#longqname)**  
`longQName(string)` returns the long version of a short prefixed QName.
-   **[moduleInstalled](#moduleinstalled)**  
`moduleInstalled(moduleName)` checks if a module is installed.
-   **[pad](#pad)**  
`pad(string, length)` pads a string with leading zeros to the specified length.
-   **[setLocale](#setlocale)**  
`setLocale` sets the locale for the current thread.
-   **[setServiceRegistry](#setserviceregistry)**  
`setServiceRegistry(services)` sets the service registry.
-   **[setNodeService](#setnodeservice)**  
`setNodeService(nodeService)` sets the node service.
-   **[shortQName](#shortqname)**  
`shortQName(string)` returns the short, or prefix, version of a long QName.
-   **[toBoolean](#toboolean)**  
`toBoolean(string)` returns a Boolean object from a string value.
-   **[toISO8601(Date)](#toiso8601date)**  
`toISO8601(Date)` formats a date to an ISO8601 formatted string.
-   **[toISO8601(long)](#toiso8601long)**  
`toISO8601(long)` formats a time in milliseconds to an ISO8601 formatted string.

## createPaging {#createpaging}

The `createPaging` methods are used to build a `ScriptPagingDetails` object from the parameters supplied.

### createPaging(maxItems, skipCount)

Builds a `ScriptPagingDetails` object from the supplied parameters.

#### Parameters

-   **maxItems**

    An integer value which sets the maximum number of results to return.

-   **skipCount**

    The number of results to skip.


#### Returns

Returns a `ScriptPagingDetails` object.

### createPaging(maxItems, skipCount, queryExecutionId)

Builds a `ScriptPagingDetails` object from the supplied parameters.

#### Parameters

-   **maxItems**

    An integer value which sets the maximum number of results to return.

-   **skipCount**

    The number of results to skip.

-   **queryExecutionId**

    Reserved for future use.


#### Returns

Returns a `ScriptPagingDetails` object.

### createPaging(args)

Returns a `ScriptPagingDetails` object built from the supplied Args object. The Args object contains a map of parameters which must use their standard names, such as `maxItems`, and `skipCount`.

#### Parameters

-   **args**

    A map containing the parameters (using their standard names) and their corresponding values.


#### Returns

Returns a `ScriptPagingDetails` object.


## disableRules {#disablerules}

`disableRules` disables rule execution for the current thread.

## displayPath {#displayPath}

`displayPath(node)` returns the `cm:name` display path for a node with minimum performance overhead.

### Parameters

-   **node**

    The script node.


### Returns

Returns a cm:name based human readable display path for the give node.

## enableRules {#enablerules}

`enableRules` enables rule execution for the current thread.

## fromISO8601 {#fromISO8601}

`fromISO8601(string)` parses a date from an ISO8601 formatted string.

### Parameters

-   **isoDateString**

    An ISO8601 formatted string to convert to a datetime object.


### Returns

A date object.

### Example

```

    var date = new Date();
    var timeInMillisecs = date.getTime(); 
    var ISODate = utils.toISO8601(timeInMillisecs);
    var origDate = utils.fromISO8601(ISODate); 
   
```

The preceding code snippet would result in the ISO8601 formatted string `2011-11-28T17:06:51.477Z` being converted to the datetime object `Nov 28, 2011 5:06:51 PM`.

## getLocale {#getLocale}

`getLocale` returns the locale string for the current thread.

### Returns

Returns the locale string for the current thread.

### Example

```

        var localeString = utils.getLocale();
      
```

The preceding code snippet would return a locale string such as `en_US`.

## getNodeFromString {#getnodefromstring}

`getNodeFromString(noderef)` returns a `ScriptNode` object representing the supplied `NodeRef` string. The node is not confirmed to exist in the repository.

### Parameters

-   **noderef**

    The noderef string


### Returns

Returns a ScriptNode object corresponding to the node referenced by the supplied NodeRef string.

## longQName {#longQName}

`longQName(string)` returns the long version of a short prefixed QName.

### Parameters

-   **string**

### Returns

Returns a string of the long version of a QName.

### Example

```

        var longQName = utils.longQName("cm:content");
      
```

The preceding code snippet would return `longQName` as `{http://www.alfresco.org/model/content/1.0}content`.

## moduleInstalled {#moduleinstalled}

`moduleInstalled(moduleName)` checks if a module is installed.

### Parameters

-   **moduleName**

    A string representing the module name, for example `org.alfresco.module.foo`.


### Returns

True if the specified module is installed.

### Example

```

    var result = false;
    result = utils.moduleInstalled("org.alfresco.module.vti");
    model.result = result;
   
```

The preceding code snippet would return `result` as `true` if the module was installed.

## pad {#pad}

`pad(string, length)` pads a string with leading zeros to the specified length.

### Parameters

-   **string**

    The string to pad with leading '0' characters.

-   **length**

    The length of the padded string.


### Returns

Returns the new string.

## setLocale {#setlocale}

`setLocale` sets the locale for the current thread.

### Parameters

-   **localeString**

    A locale string in ISO format, `ISOLanguageCode_ISOCountryCode`, for example `en_US`.


### Example

```

utils.setLocale("en_US");
      
```

The preceding code snippet would set the locale for the current thread to `en_US`.

## setServiceRegistry {#setserviceregistry}

`setServiceRegistry(services)` sets the service registry.

### Parameters

-   **services**

    The Service Registry.


### Returns

void

## setNodeService {#setnodeservice}

`setNodeService(nodeService)` sets the node service.

### Parameters

-   **nodeService**

    The Node Service to set.


### Returns

void

## shortQName {#shortqname}

`shortQName(string)` returns the short, or prefix, version of a long QName.

### Parameters

-   **string**

### Returns

Returns a string of the prefix version of a QName.

### Example

```

    var shortQName = utils.shortQName("{http://www.alfresco.org/model/content/1.0}content");
  
```

The preceding code snippet would return `shortQName` as `cm:content`.

## toBoolean {#toBoolean}

`toBoolean(string)` returns a Boolean object from a string value.

### Parameters

-   **booleanString**

    A boolean string, true or false.


### Returns

Boolean value

### Example

```

  var booleanString = "true";

  model.result = utils.toBoolean(booleanString);        
      
```

The preceding code snippet would return a boolean value for `result` of `true`.

## toISO8601(Date) {#toISO8601date}

`toISO8601(Date)` formats a date to an ISO8601 formatted string.

### Parameters

-   **Date**

    Date object to convert.


### Returns

The date converted to an ISO8601 formatted string.

### Example

```

 var date = new Date();
 var ISODate = utils.toISO8601(date);
    
```

The preceding code snippet would result in the datetime `Nov 28, 2011 4:50:16 PM` being converted to `2011-11-28T16:43:57.039Z`.

## toISO8601(long) {#toISO8601long}

`toISO8601(long)` formats a time in milliseconds to an ISO8601 formatted string.

### Parameters

-   **timeInMillis**

    A Long representing the time in milliseconds to convert.


### Returns

The time as an ISO8601 formatted string.

### Example

```

    var date = new Date();
    var timeInMillisecs = date.getTime(); 
    var ISODate = utils.toISO8601(timeInMillisecs);
   
```

The preceding code snippet would convert the time in milliseconds `1,322,499,360,718` to the ISO8601 date time string `2011-11-28T16:56:00.718Z`.

## Services API {#services-api}

The Alfresco JavaScript Services API provides an interface to core services that can be accessed from web scripts.

The JavaScript Services API provides an interface from web scripts to a number of core services including:

-   Activities service
-   Authority service
-   Rendition service
-   Site service
-   Tagging service
-   Thumbnail service
-   Workflow service

Each of these services APIs is described in the following sections.

-   **[Activities service](#activities-service)**  
Activities refer to updates to content within a site, including uploaded files, blogs, discussions, calendars, and the team wiki. The methods available for the Activities service are grouped into the `Post activity` and `Feed controls`object types.
-   **[Authority service](#authority-service)**  
Authority is a general term to describe a group, user, or role. The authority service provides the following methods to retrieve groups. The authority service makes the `groups` root object available.
-   **[Rendition service](#rendition-service)**  
A rendition is an alternative representation of a content node. Renditions are derived from their source nodes and are usually updated automatically when their source node is updated.
-   **[Site service](#site-service)**  
A site is a collaborative area for a unit of work or a project. Sites are created in Alfresco Share, and manipulated in various ways directly using the UI or through web scripts or the REST API.
-   **[Tagging service](#tagging-service)**  
A tag is a non-hierarchical keyword or term assigned to a piece of information. The root object used to access these services is `taggingService`.
-   **[Thumbnail service](#thumbnail-service)**  
A thumbnail is a transformation of content into a specified destination MIME type. This is most commonly an image of a particular size, but can also be other things, for example, a Flash rendition. The Thumbnail service transforms and maintains this thumbnail.
-   **[Workflow service](#workflow-service)**  
The Workflow JavaScript API lets you access Alfresco Content Services advanced workflows from within JavaScript.

## Activities service {#activities-service}

Activities refer to updates to content within a site, including uploaded files, blogs, discussions, calendars, and the team wiki. The methods available for the Activities service are grouped into the `Post activity` and `Feed controls`object types.

-   **[getFeedControls](#getfeedcontrols)**  
`getFeedControls()` gets feed control objects for the current user.
-   **[postActivity](#postactivity)**  
The `postActivity` methods enable the posting of activities.
-   **[setFeedControl](#setfeedcontrol)**  
`setFeedControl(siteId, appToolId)` sets the feed control for a site, an appTool, or a site/appTool combination for the current user.
-   **[unsetFeedControl](#unsetfeedcontrol)**  
`unsetFeedControl(siteId,appTool)` unsets the feed control for a site, an appTool, or a site/appTool combination for the current user.

## getFeedControls {#getFeedControls}

`getFeedControls()` gets feed control objects for the current user.

### Returns

Returns an array of `FeedControl` objects.

### Example

The following code snippet would return a list of feed controls for the current user:

```

      model.feedControls = activities.getFeedControls();        
      
```

The following FreeMarker code could then be used to enumerate these objects:

```

  
    <#list feedControls as fc>  
      <p>${fc.siteId}</p>
      <p>${fc.appToolId}</p>
    </#list>
  

```

## postActivity {#postActivity}

The `postActivity` methods enable the posting of activities.

### postActivity(activityType, siteId, appTool, jsonActivityData)

`postActivity(activityType, siteId, appTool, jsonActivityData)` posts a custom activity type.

#### Parameters

-   **activityType**

    Required. Activity type name specified in package format, for example `org.alfresco.calendar.event-created`.

-   **siteId**

    Required parameter to get site members and to apply feed controls.

-   **appTool**

    Optional parameter. The application id or component id generating the activity, for example `calendarComponent`. If set, then feed controls can be applied.

-   **jsonActivityData**

    Required. The activity data, which can be accessed by the activity templates.


#### Returns

void

#### Example

```

activities.postActivity("org.alfresco.calendar.event-created", "mysite1", "calendarComponent", '{ "item1" : 123 }');        
        
```

### postActivity(activityType, siteId, appTool, nodeRef)

`postActivity(activityType, siteId, appTool, nodeRef)` this method posts a predefined activity type and looks up activity data asynchronously including name, displayPath, typeQName, firstName (of posting user), lastName (of posting user).

#### Parameters

-   **activityType**

    Required. Activity type name specified in package format, for example `org.alfresco.calendar.event-created`.

-   **siteId**

    Required parameter to get site members and to apply feed controls.

-   **appTool**

    Optional parameter. The application id or component id generating the activity, for example `calendarComponent`. If set, then feed controls can be applied.

-   **nodeRef**

    Required. This allows the activity service to look up some generic data for the node.


### postActivity(activityType, siteId, appTool, nodeRef, beforeName)

`postActivity(activityType, siteId, appTool, nodeRef, beforeName)` this method posts a predefined activity type, for example, for checked out nodeRef or renamed nodeRef

#### Parameters

-   **activityType**

    Required. Activity type name specified in package format, for example `org.alfresco.calendar.event-created`.

-   **siteId**

    Required parameter to get site members and to apply feed controls.

-   **appTool**

    Optional parameter. The application id or component id generating the activity, for example `calendarComponent`. If set, then feed controls can be applied.

-   **nodeRef**

    Required. This allows the activity service to look up some generic data for the node.

-   **beforeName**

    The name of the node prior to the name change.


### postActivity(activityType,siteId,appTool,nodeRef,name,typeQName,parentNodeRef)

`postActivity(activityType,siteId,appTool,nodeRef,name,typeQName,parentNodeRef)` this method posts a predefined activity, for example, for the deleted nodeRef.

#### Parameters

-   **activityType**

    Required. Activity type name specified in package format, for example `org.alfresco.calendar.event-created`.

-   **siteId**

    Required parameter to get site members and to apply feed controls.

-   **appTool**

    Optional parameter. The application id or component id generating the activity, for example `calendarComponent`. If set, then feed controls can be applied.

-   **nodeRef**

    Required. This allows the activity service to look up some generic data for the node.

-   **name**

    Optional. The name of node.

-   **typeQName**

    Optional. The type of node.

-   **parentNodeRef**

    Optional. Used to look up path/displayPath


## setFeedControl {#setFeedControl}

`setFeedControl(siteId, appToolId)` sets the feed control for a site, an appTool, or a site/appTool combination for the current user.

### Parameters

-   **siteId**

    A string representing the short name of the site. Optional if `appToolId` is supplied.

-   **appToolId**

    A string representing the application or component name. Optional if `siteId` is supplied.


### Returns

void

## unsetFeedControl {#unsetfeedcontrol}

`unsetFeedControl(siteId,appTool)` unsets the feed control for a site, an appTool, or a site/appTool combination for the current user.

### Parameters

-   **siteId**

    A string representing the short name of the site. Optional if `appToolId` is supplied.

-   **appToolId**

    A string representing the application or component name. Optional if `siteId` is supplied.

## Authority service {#authority-service}

Authority is a general term to describe a group, user, or role. The authority service provides the following methods to retrieve groups. The authority service makes the `groups` root object available.

-   **[createRootGroup](#createrootgroup)**  
`createRootGroup(shortName,displayName)` creates a new root group in the default application zone.
-   **[getAllRootGroups](#getallrootgroups)**  
The `getAllRootGroups()` methods return a list of groups found across all zones.
-   **[getAllRootGroupsInZone](#getallrootgroupsinzone)**  
The `getAllRootGroupsInZone(zone)` methods return a list of groups in the specified zone.
-   **[getGroup](#getgroup)**  
`getGroup(shortName)` gets a group given its short name.
-   **[getGroupForFullAuthorityName](#getgroupforfullauthorityname)**  
`getGroupForFullAuthorityName(fullName)` gets a group given its full authority name.
-   **[getGroups](#getgroups)**  
The `getGroups()` methods return groups across all zones.
-   **[getGroupsInZone](#getgroupsinzone)**  
`getGroupsInZone(...)` returns an array of `ScriptGroup` objects representing groups found in the specified zone.
-   **[getUser](#getuser)**  
`getUser(username)` gets a user given the user's user name.
-   **[searchGroups](#searchgroups)**  
The `searchGroups()` methods search for groups.
-   **[searchGroupsInZone](#searchgroupsinzone)**  
The `searchGroupsInZone()` methods search for groups in the specified zone.
-   **[searchRootGroups](#searchrootgroups)**  
The `searchRootGroups()` methods search for root groups across all zones.
-   **[searchRootGroupsInZone](#searchrootgroupsinzone)**  
The `searchRootGroupsInZone()` methods search for root groups in the specified zone.
-   **[searchUsers](#searchusers)**  
`searchUsers(nameFilter, paging, sortBy)` returns an array of `ScriptUsers` that match the specified parameters.
-   **[ScriptGroup object](#scriptgroup-object)**  
A `ScriptGroup` object represents an Alfresco Content Services group.
-   **[ScriptUser object](#scriptuser-object)**  
A `ScriptUser` object represents an Alfresco Content Services user.

## createRootGroup {#createrootgroup}

`createRootGroup(shortName,displayName)` creates a new root group in the default application zone.

### Parameters

-   **shortName**

    A string representing the short name to assign the new group.

-   **displayName**

    A string representing the display name to assign the new group.


### Returns

Returns authority or null if it cannot be found.

### Example

```

    var shortName = "MY_GROUP";
    var displayName = "MyGroup";

    model.scriptGroup = groups.createRootGroup(shortName, displayName);        
      
```

The preceding code snippet would create a new group with the following details:

```

fullName: GROUP_MY_GROUP

displayName: MyGroup

shortName: MY_GROUP        
      
```

## getAllRootGroups {#getAllRootGroups}

The `getAllRootGroups()` methods return a list of groups found across all zones.

### getAllRootGroups()

`getAllRootGroups()` this method returns a list groups found across all zones.

#### Returns

Returns an array of ScriptGroup objects, representing the groups found across all zones.

#### Example

```

          model.scriptGroups = groups.getAllRootGroups();
        
```

### getAllRootGroups(maxItems, skipCount)

`getAllRootGroups(maxItems, skipCount)` this method returns a list groups found across all zones.

#### Parameters

-   **maxItems**

    An integer representing the maximum number of items to return in the results.

-   **skipCount**

    Integer representing the number of items to skip.


#### Returns

Returns an array of ScriptGroup objects, representing the groups found across all zones.

#### Example

```

          model.scriptGroups = groups.getAllRootGroups(5, 0); 
        
```

### getAllRootGroups(paging)

`getAllRootGroups(paging)` this method returns a list groups found across all zones.

#### Parameters

-   **paging**

    A `ScriptPagingDetails` object.


#### Returns

Returns an array of ScriptGroup objects, representing the groups found found across all zones.

#### Example

```

    var paging = utils.createPaging(3, 0);    

    model.scriptGroups = groups.getAllRootGroups(paging);
        
```

## getAllRootGroupsInZone {#getAllRootGroupsInZone}

The `getAllRootGroupsInZone(zone)` methods return a list of groups in the specified zone.

### getAllRootGroupsInZone(zone)

`getAllRootGroupsInZone(zone)` this method returns a list groups in the specified zone.

#### Parameters

-   **zone**

    The zone in which to search. This could include application zones such as APP.DEFAULT, APP.SHARE, or APP.RM or authorization zones such as AUTH.ALF or AUTH.EXT.<ID>.


#### Returns

Returns an array of ScriptGroup objects, representing the groups found in the specified zone.

#### Example

```

          model.scriptGroups = groups.getAllRootGroupsInZone("APP.DEFAULT"); // APP.DEFAULT, APP.SHARE, APP.RM
        
```

### getAllRootGroupsInZone(zone, maxItems, skipCount)

`getAllRootGroupsInZone(zone, maxItems, skipCount)` this method returns a list groups in the specified zone.

#### Parameters

-   **zone**

    The zone in which to search. This could include application zones such as APP.DEFAULT, APP.SHARE, or APP.RM or authorization zones such as AUTH.ALF or AUTH.EXT.<ID>.

-   **maxItems**

    An integer representing the maximum number of items to return in the results.

-   **skipCount**

    Integer representing the number of items to skip.


#### Returns

Returns an array of ScriptGroup objects, representing the groups found in the specified zone.

#### Example

```

          model.scriptGroups = groups.getAllRootGroupsInZone("APP.DEFAULT", 5, 0); 
        
```

### getAllRootGroupsInZone(zone, paging, sortBy)

`getAllRootGroupsInZone(zone, paging, sortBy)` this method returns a list groups in the specified zone.

#### Parameters

-   **zone**

    The zone in which to search. This could include application zones such as APP.DEFAULT, APP.SHARE, or APP.RM or authorization zones such as AUTH.ALF or AUTH.EXT.<ID>.

-   **paging**

    A `ScriptPagingDetails` object.

-   **sortBy**

    The property by which to sort the results, for example `displayName`.


#### Returns

Returns an array of ScriptGroup objects, representing the groups found in the specified zone.

#### Example

```

    var paging = utils.createPaging(3, 0);    

    model.scriptGroups = groups.getAllRootGroupsInZone("APP.DEFAULT", paging, "displayName");
        
```


## getGroup {#getGroup}

`getGroup(shortName)` gets a group given its short name.

### Parameters

-   **shortName**

    A string representing the short name of the group to return.


### Returns

Returns a `ScriptGroup` object, or null if the group cannot be found.

### Example

```

var shortName = "MY_GROUP";

model.scriptGroup = groups.getGroup(shortName);
```

## getGroupForFullAuthorityName {#getGroupForFullAuthorityName}

`getGroupForFullAuthorityName(fullName)` gets a group given its full authority name.

### Parameters

-   **fullName**

    A string representing the full authority name of the group to return. This string must start with “GROUP_”.


### Returns

Returns a `ScriptGroup` object, or null if the group cannot be found.

### Example

```

    var fullName = "GROUP_MY_GROUP";

    model.scriptGroup = groups.getGroupForFullAuthorityName(fullName);
      
```

## getGroups {#getGroups}

The `getGroups()` methods return groups across all zones.

### getGroups(filter, paging)

`getGroups(filter, paging)` this method returns groups across all zones.

#### Parameters

-   **filter**

    Pattern to filter groups by. If the filter is null, an empty string or * all groups found will be returned. If the filter starts with * or contains a ? character results returned could be inconsistent.

-   **paging**

    A `ScriptPagingDetails` object.


#### Returns

An array of `ScriptGroup` objects.

#### Example

```

    var filter = "Star";

    // return all results, skip 0
    var paging = utils.createPaging(-1, 0);

    model.scriptGroups = groups.getGroups(filter, paging);
        
        
```

### getGroups(filter, paging, sortBy)

`getGroups(filter, paging, sortBy)` this method returns groups across all zones.

#### Parameters

-   **filter**

    Pattern to filter groups by. If the filter is null, an empty string or * all groups found will be returned. If the filter starts with * or contains a ? character results returned could be inconsistent.

-   **paging**

    A `ScriptPagingDetails` object.

-   **sortBy**

    The property by which to sort the results, for example `displayName`.


#### Returns

An array of `ScriptGroup` objects.

#### Example

```

    var filter = "Star";

    // return all results, skip 0
    var paging = utils.createPaging(-1, 0);


    model.scriptGroups = groups.getGroups(filter, paging, "displayName");          
        
```

The preceding code snippet would return results such as:

```

fullName: GROUP_Starlight_Title

displayName: Another group

shortName: Starlight_Title

fullName: GROUP_Admins

displayName: Starlight Admins

shortName: Admins

fullName: GROUP_FINANCE

displayName: Starlight Finance

shortName: FINANCE

fullName: GROUP_STARLIGHT

displayName: Starlight Group

shortName: STARLIGHT          
```


## getGroupsInZone {#getGroupsInZone}

`getGroupsInZone(...)` returns an array of `ScriptGroup` objects representing groups found in the specified zone.

### getGroupsInZone

`getGroupsInZone(filter, zone, paging, sortBy)` returns an array of `ScriptGroup` objects representing groups found in the specified zone.

**Attention:** Deprecated since 4.0.

#### Parameters

-   **filter**

    Pattern to filter groups by. If the filter is null, an empty string or * all groups found will be returned. If the filter starts with * or contains a ? character results returned could be inconsistent.

-   **zone**

    The zone in which to search. This could include application zones such as APP.DEFAULT, APP.SHARE, or APP.RM or authorization zones such as AUTH.ALF or AUTH.EXT.<ID>.

-   **paging**

    A `ScriptPagingDetails` object.

-   **sortBy**

    The property by which to sort the results, for example `displayName`.


#### Returns

An array of `ScriptGroup` objects from the specified zone.

#### Example

```

    var filter = "Star";

    // return all results, skip 0
    var paging = utils.createPaging(-1, 0);

    model.scriptGroups = groups.getGroupsInZone(filter, "APP.DEFAULT", paging, "displayName");
        
        
```

### getGroupsInZone

`getGroupsInZone(filter, zone, paging, sortBy, sortAsc)` returns an array of `ScriptGroup` objects representing groups found in the specified zone.

#### Parameters

-   **filter**

    Pattern to filter groups by. If the filter is null, an empty string or * all groups found will be returned. If the filter starts with * or contains a ? character results returned could be inconsistent.

-   **zone**

    The zone in which to search. This could include application zones such as APP.DEFAULT, APP.SHARE, or APP.RM or authorization zones such as AUTH.ALF or AUTH.EXT.<ID>.

-   **paging**

    A `ScriptPagingDetails` object.

-   **sortBy**

    The property by which to sort the results, for example `displayName`.

-   **sortAsc**

    True to sort results in ascending order, false otherwise.


#### Returns

An array of `ScriptGroup` objects from the specified zone.

#### Example

```

    var filter = "Star";

    // return all results, skip 0
    var paging = utils.createPaging(-1, 0);

    model.scriptGroups = groups.getGroupsInZone(filter, "APP.DEFAULT", paging, "displayName", true);
        
        
```


## getUser {#getuser}

`getUser(username)` gets a user given the user's user name.

### Parameters

-   **username**

    A string representing the user name of the user.


### Returns

Returns a `ScriptUser` object, or null if the user cannot be found.

### Example

```

    var username = "joe.user";

    model.scriptUser = groups.getUser(username);
      
```

The returned ScriptUser object can be passed to the following FreeMarker template code:

```


   <p>authorityType: ${scriptUser.authorityType}</p>
   <p>shortName: ${scriptUser.shortName}</p>
   <p>fullName: ${scriptUser.fullName}</p>
   <p>userName: ${scriptUser.userName}</p>
   <p>displayName: ${scriptUser.displayName}</p>
   <p>personNodeRef: ${scriptUser.personNodeRef}</p>
   <p>person.properties.name: ${scriptUser.person.properties.name}</p>
   <p>person.type: ${scriptUser.person.type}</p>
        
      
```

The preceding FreeMarker code would display results similar to the following:

```

authorityType: USER

shortName: joe.user

fullName: joe.user

userName: joe.user

displayName: joe.user

personNodeRef: workspace://SpacesStore/4d7abb60-d8ff-4fcf-956f-93e53ebafed0

person.properties.name: 4d7abb60-d8ff-4fcf-956f-93e53ebafed0

person.type: {http://www.alfresco.org/model/content/1.0}person        
      
```

## searchGroups {#searchgroups}

The `searchGroups()` methods search for groups.

### searchGroups(shortNameFilter)

`searchGroups(shortNameFilter)` searches for groups based on short name filter string.

#### Parameters

-   **shortNameFilter**

    A string to filter returned results on the short name string. Wildcards such as “*” and “?” can be used. When empty string is used, all results are returned without filtering.


#### Returns

Returns an array of ScriptGroup objects that represents the groups matching the query.

### searchGroups(shortNameFilter, paging, sortBy)

`searchGroups(shortNameFilter, paging, sortBy)` searches for groups based on a short name filter string.

#### Parameters

-   **shortNameFilter**

    A string to filter returned results on the short name string. Wildcards such as “*” and “?” can be used. When empty string is used, all results are returned without filtering.

-   **paging**

    A `ScriptPagingDetails` object.

-   **sortBy**

    The property by which to sort the results, for example `displayName`.


#### Returns

Returns an array of ScriptGroup objects that represents the groups matching the query.

#### Example

```

    // return maximum 3 results, skip 0
    var paging = utils.createPaging(3, 0);

    // property to sort by is displayName in this case
    model.scriptGroups = groups.searchGroups("*", paging, "displayName");  
```

## searchGroupsInZone {#searchgroupsinzone}

The `searchGroupsInZone()` methods search for groups in the specified zone.

### searchGroupsInZone(shortNameFilter, zone)

`searchGroupsInZone(shortNameFilter, zone)` this method searches for groups in the specified zone.

#### Parameters

-   **shortNameFilter**

    A string to filter returned results on the short name string. Wildcards such as “*” and “?” can be used. When empty string is used, all results are returned without filtering.

-   **zone**

    The zone in which to search. This could include application zones such as APP.DEFAULT, APP.SHARE, or APP.RM or authorization zones such as AUTH.ALF or AUTH.EXT.<ID>.


#### Returns

Returns a `ScriptGroup` array representing the groups matching the query.

### searchGroupsInZone(shortNameFilter, zone, maxItems, skipCount)

`searchGroupsInZone(shortNameFilter, zone, maxItems, skipCount)` this method searches for groups in the specified zone.

#### Parameters

-   **shortNameFilter**

    A string to filter returned results on the short name string. Wildcards such as “*” and “?” can be used. When empty string is used, all results are returned without filtering.

-   **zone**

    The zone in which to search. This could include application zones such as APP.DEFAULT, APP.SHARE, or APP.RM or authorization zones such as AUTH.ALF or AUTH.EXT.<ID>.

-   **maxItems**

    An integer representing the maximum number of items to return in the results.

-   **skipCount**

    Integer representing the number of items to skip.


#### Returns

Returns a `ScriptGroup` array representing the groups matching the query.

### searchGroupsInZone(shortNameFilter, zone, paging, sortBy)

`searchGroupsInZone(shortNameFilter, zone, paging, sortBy)` this method searches for groups in the specified zone.

#### Parameters

-   **shortNameFilter**

    A string to filter returned results on the short name string. Wildcards such as “*” and “?” can be used. When empty string is used, all results are returned without filtering.

-   **zone**

    The zone in which to search. This could include application zones such as APP.DEFAULT, APP.SHARE, or APP.RM or authorization zones such as AUTH.ALF or AUTH.EXT.<ID>.

-   **paging**

    A `ScriptPagingDetails` object.

-   **sortBy**

    The property by which to sort the results, for example `displayName`.


#### Returns

Returns a `ScriptGroup` array representing the groups matching the query.

#### Example

```

    // return maximum 3 results, skip 0
    var paging = utils.createPaging(3, 0);

    // property to sort by is displayName in this case
    model.scriptGroups = groups.searchGroupsInZone("*", "APP.SHARE", paging, "displayName");  
```

## searchRootGroups {#searchRootGroups}

The `searchRootGroups()` methods search for root groups across all zones.

### searchRootGroups(displayNamePattern)

`searchRootGroups(displayNamePattern)` searches for root groups based on the display name filter string.

#### Parameters

-   **displayNamePattern**

    A string to filter returned results on the display name string. Wildcards such as “*” and “?” can be used. When empty string is used, all results are returned without filtering.


#### Returns

Returns an array of `ScriptGroup` objects that represents the root groups matching the query.

### searchRootGroups(displayNamePattern, paging, sortBy)

`searchRootGroups(displayNamePattern, paging, sortBy)` searches for root groups based on a display name pattern string.

#### Parameters

-   **displayNamePattern**

    A string to filter returned results on the display name string. Wildcards such as “*” and “?” can be used. When empty string is used, all results are returned without filtering.

-   **paging**

    A `ScriptPagingDetails` object.

-   **sortBy**

    The property by which to sort the results, for example `displayName`.


#### Returns

Returns an array of `ScriptGroup` objects that represents the root groups matching the query.

#### Example

```

    // return maximum 3 results, skip 0
    var paging = utils.createPaging(3, 0);

    // property to sort by is displayName in this case
    model.scriptGroups = groups.searchRootGroups("*", paging, "displayName");  
```

## searchRootGroupsInZone {#searchRootGroupsInZone}

The `searchRootGroupsInZone()` methods search for root groups in the specified zone.

### searchRootGroupsInZone(displayNamePattern, zone)

`searchRootGroupsInZone(displayNamePattern, zone)` this method searches for root groups in the specified zone.

#### Parameters

-   **displayNamePattern**

    A string to filter returned results on the display name string. Wildcards such as “*” and “?” can be used. When empty string is used, all results are returned without filtering.

-   **zone**

    The zone in which to search. This could include application zones such as APP.DEFAULT, APP.SHARE, or APP.RM or authorization zones such as AUTH.ALF or AUTH.EXT.<ID>.


#### Returns

Returns a `ScriptGroup` array representing the groups matching the query.

### searchRootGroupsInZone(displayNamePattern, zone, maxItems, skipCount)

`searchRootGroupsInZone(displayNamePattern, zone, maxItems, skipCount)` this method searches for root groups in the specified zone.

#### Parameters

-   **displayNamePattern**

    A string to filter returned results on the display name string. Wildcards such as “*” and “?” can be used. When empty string is used, all results are returned without filtering.

-   **zone**

    The zone in which to search. This could include application zones such as APP.DEFAULT, APP.SHARE, or APP.RM or authorization zones such as AUTH.ALF or AUTH.EXT.<ID>.

-   **maxItems**

    An integer representing the maximum number of items to return in the results.

-   **skipCount**

    Integer representing the number of items to skip.


#### Returns

Returns a `ScriptGroup` array representing the root groups matching the query.

### searchRootGroupsInZone(displayNamePattern, zone, paging, sortBy)

`searchRootGroupsInZone(displayNamePattern, zone, paging, sortBy)` this method searches for root groups in the specified zone.

#### Parameters

-   **displayNamePattern**

    A string to filter returned results on the display name string. Wildcards such as “*” and “?” can be used. When empty string is used, all results are returned without filtering.

-   **zone**

    The zone in which to search. This could include application zones such as APP.DEFAULT, APP.SHARE, or APP.RM or authorization zones such as AUTH.ALF or AUTH.EXT.<ID>.

-   **paging**

    A `ScriptPagingDetails` object.

-   **sortBy**

    The property by which to sort the results, for example `displayName`.


#### Returns

Returns a `ScriptGroup` array representing the root groups matching the query.

#### Example

```

    // return maximum 3 results, skip 0
    var paging = utils.createPaging(3, 0);

    // property to sort by is displayName in this case
    model.scriptGroups = groups.searchRootGroupsInZone("*", "APP.SHARE", paging, "displayName");  
```


## searchUsers {#searchusers}

`searchUsers(nameFilter, paging, sortBy)` returns an array of `ScriptUsers` that match the specified parameters.

### Parameters

-   **nameFilter**

    String to allow a partial match of the name. The user name, first name, and last name will all be checked to see if they start with the filter string. If empty then the string will match all users.

-   **paging**

    A `ScriptPagingDetails` object.

-   **sortBy**

    The property by which to sort the results, for example `displayName`.


### Returns

Returns an array of `ScriptUser` objects that represents the users matching the query.

### Example

```

    var filterName = "A";
    var paging =  utils.createPaging(-1, 0);
    var sortBy = "userName";

    model.scriptUsers = groups.searchUsers(filterName, paging, sortBy);
      
```

The return results could be displayed using the following FreeMarker template code snippet:

```



    <#list scriptUsers as su>
  
     <p>firstName: ${su.person.properties.firstName}</p>

     <p>lastName: ${su.person.properties.lastName}</p>

     <p>userName: ${su.userName}</p>

     <hr/>
   </#list>
        
        
```

The preceding code snippet would return results similar to the following:

```

firstName: Alice

lastName: Beecher

userName: abeecher

firstName: Administrator

lastName:

userName: admin

firstName: Tony

lastName: Tortilla

userName: Archvile

firstName: Peter

lastName: Andrews

userName: petethepiper

      
```

## ScriptGroup object {#scriptgroup-object}

A `ScriptGroup` object represents an Alfresco Content Services group.

### Properties

-   **`authorityType`**

    Get or set the authority type

-   **`allGroups`**

    Gets all descendant subgroups

-   **`allUsers`**

    Gets the users contained within this group and its subgroups

-   **`childUsers`**

    Gets child users of this group

-   **`displayName`**

    Get or set the display name for this group (requires administrator permission)

-   **`fullName`**

    Get or set the full name of the group

-   **`shortName`**

    Get or set the short name of the group


-   **[addAuthority](#addauthority)**  
`addAuthority(fullAuthorityName)` adds an existing authority as a child of this group.
-   **[createGroup](#creategroup)**  
`createGroup(shortName, displayName)` creates a new group as a child of this group.
-   **[deleteGroup](#deletegroup)**  
`deleteGroup()` deletes this group.
-   **[getAllGroups](#getallgroups)**  
`getAllGroups()` returns all descendant groups of this group.
-   **[getAllParentGroups](#getallparentgroups)**  
The `getAllParentGroups()` methods return all parent groups of this group.
-   **[getAllUsers](#getallusers)**  
`getAllUsers()` returns all users contained in this group.
-   **[getChildAuthorities](#getchildauthorities)**  
The `getChildAuthorities(...)` methods return the child authorities (users and groups) of this group.
-   **[getChildGroups](#getchildgroups)**  
The `getChildGroups()` methods return child groups of this group.
-   **[getChildUsers](#getchildusers)**  
The `getChildUsers(...)` methods get the child users of this group.
-   **[getGroupCount](#getgroupcount)**  
`getGroupCount()` returns the number of child groups contained within this group.
-   **[getGroupNode](#getgroupnode)**  
`getGroupNode()` returns a script node object wrapping this group.
-   **[getGroupNodeRef](#getgroupnoderef)**  
`getGroupNodeRef()` returns the node reference of this group.
-   **[getParentGroups](#getparentgroups)**  
The `getParentGroups()` methods return the immediate parent groups of this group.
-   **[getUserCount](#getusercount)**  
`getUserCount()` returns the number of users within this group.
-   **[getZones](#getzones)**  
`getZones()` returns a set of zone names for this group. Zones provide a higher level way of organizing groups.
-   **[removeAuthority](#removeauthority)**  
`removeAuthority(fullAuthorityName)` removes a child authority from this group.
-   **[removeGroup](#removegroup)**  
`removeGroup(shortName)` removes a specified subgroup from this group. It does not delete the subgroup or its members.
-   **[removeUser](#removeuser)**  
The `removeUser(shortName)` removes a specified child user from this group. It does not delete the user.

## addAuthority

`addAuthority(fullAuthorityName)` adds an existing authority as a child of this group.

### Parameters

-   **fullAuthorityName**

    A string representing the full name of the authority.


### Example

```

var shortName = "MY_SUB_GROUP";
var group = groups.getGroup(shortName);

// now add authority to this group

var fullName = "GROUP_MY_TEST_GROUP";
group.addAuthority(fullName);        
      
```

## createGroup {#createGroup}

`createGroup(shortName, displayName)` creates a new group as a child of this group.

### Parameters

-   **shortName**

    A string representing the short name for the new group.

-   **displayName**

    A string representing the display name for the new group.


### Returns

Returns the new child group.

### Example

```

var shortName = "MY_GROUP";
var group = groups.getGroup(shortName);

// now create child group of this group

var shortName = "MY_SUB_GROUP";
var displayName = "MySubGroup";
model.childGroup = group.createGroup(shortName, displayName);
        
```

## deleteGroup {#deletegroup}

`deleteGroup()` deletes this group.

### Parameters

None

### Returns

void

### Example

```

    var shortName = "MY_TEST_GROUP";
    var group = groups.getGroup(shortName);

    // now delete this group
    
    group.deleteGroup();
      
```

## getAllGroups {#getAllGroups}

`getAllGroups()` returns all descendant groups of this group.

### Parameters

None

### Returns

An array of `ScriptGroup` objects.

### Example

```

    var groups = group.getAllGroups();
        
```

## getAllParentGroups {#getAllParentGroups}

The `getAllParentGroups()` methods return all parent groups of this group.

### getAllParentGroups()

`getAllParentGroups()` this method returns all parent groups of this group.

#### Parameters

None

#### Returns

An array of `ScriptGroup` objects.

#### Example

```

var shortName = "MY_SUB_GROUP";
var group = groups.getGroup(shortName);

// now find all parent groups
model.parentGroups = group.getAllParentGroups();
        
```

### getAllParentGroups(maxItems, skipCount)

`getAllParentGroups(maxItems, skipCount)` this method returns all parent groups of this group.

#### Parameters

-   **maxItems**

    An integer representing the maximum number of results to return. If set to -1 all results will be returned.

-   **skipCount**

    An integer representing the number of results to skip.


#### Returns

An array of `ScriptGroup` objects.

#### Example

```

var shortName = "MY_SUB_SUB_GROUP";
var group = groups.getGroup(shortName);

// now find all parent groups
var maxItems = -1;
var skipCount = 0;
model.parentGroups = group.getAllParentGroups(maxItems, skipCount);
        
```

### getAllParentGroups(paging, sortBy)

`getAllParentGroups(paging, sortBy)` this method returns all parent groups of this group.

#### Parameters

-   **paging**

    A `ScriptPagingDetails` object.

-   **sortBy**

    The property by which to sort the results, for example `displayName`.


#### Returns

An array of `ScriptGroup` objects.

#### Example

```

var shortName = "MY_SUB_SUB_GROUP";
var group = groups.getGroup(shortName);

// now find immediate parent groups
var paging = utils.createPaging(-1, 0);
var sortBy = "displayName";
model.parentGroups = group.getAllParentGroups(paging, sortBy);
        
```


## getAllUsers {#getAllUsers}

`getAllUsers()` returns all users contained in this group.

### Parameters

None

### Returns

An array of `ScriptUser` objects representing the users contained in this group.

### Example

```

    var users = mygroup.getAllUsers();
        
```

## getChildAuthorities {#getChildAuthorities}

The `getChildAuthorities(...)` methods return the child authorities (users and groups) of this group.

### getChildAuthorities

`getChildAuthorities()` this method returns the child authorities (users and groups) of this group.

#### Parameters

None

#### Returns

An array of `Authority` objects.

#### Example

```

    var shortName = "MY_GROUP";
    var group = groups.getGroup(shortName);

    model.childAuthorities = group.getChildAuthorities();
        
```

The following FreeMarker code could be used to display the results from the preceding JavaScript code snippet:

```


  <#list childAuthorities as ca>
  
     <p>fullName: ${ca.fullName}</p>
     <p>displayName: ${ca.displayName}</p>
     <p>shortName: ${ca.shortName}</p>
     <p>authorityType: ${ca.authorityType}</p>

     <hr/>
  </#list>
          
        
```

The preceding code would display results such as the following:

```

fullName: abeecher

displayName: abeecher

shortName: abeecher

authorityType: USER

fullName: GROUP_ANOTHER_STARLIGHT_GROUP

displayName: Another example group

shortName: ANOTHER_STARLIGHT_GROUP

authorityType: GROUP

fullName: mjackson

displayName: mjackson

shortName: mjackson

authorityType: USER

fullName: GROUP_MY_SUB_GROUP

displayName: MySubGroup

shortName: MY_SUB_GROUP

authorityType: GROUP

fullName: GROUP_FINANCE

displayName: Starlight Finance

shortName: FINANCE

authorityType: GROUP        

```

### getChildAuthorities

`getChildAuthorities(paging, sortBy)` this method returns the child authorities (users and groups) of this group.

#### Parameters

-   **paging**

    A `ScriptPagingDetails` object.

-   **sortBy**

    The property by which to sort the results, for example `displayName`.


#### Returns

An array of `Authority` objects.

#### Example

```

    var shortName = "MY_GROUP";
    var group = groups.getGroup(shortName);

    // now find child authorities
    var paging = utils.createPaging(-1, 0);
    var sortBy = "displayName";
    model.childAuthorities = group.getChildAuthorities(paging, sortBy);
        
```

The following FreeMarker code could be used to display the results from the preceding JavaScript code snippet:

```


  <#list childAuthorities as ca>
  
     <p>fullName: ${ca.fullName}</p>
     <p>displayName: ${ca.displayName}</p>
     <p>shortName: ${ca.shortName}</p>
     <p>authorityType: ${ca.authorityType}</p>

     <hr/>
  </#list>
          
        
```

The preceding code would display results such as the following:

```

fullName: abeecher

displayName: abeecher

shortName: abeecher

authorityType: USER

fullName: GROUP_ANOTHER_STARLIGHT_GROUP

displayName: Another example group

shortName: ANOTHER_STARLIGHT_GROUP

authorityType: GROUP

fullName: mjackson

displayName: mjackson

shortName: mjackson

authorityType: USER

fullName: GROUP_MY_SUB_GROUP

displayName: MySubGroup

shortName: MY_SUB_GROUP

authorityType: GROUP

fullName: GROUP_FINANCE

displayName: Starlight Finance

shortName: FINANCE

authorityType: GROUP        

```

## getChildGroups {#getChildGroups}

The `getChildGroups()` methods return child groups of this group.

### getChildGroups()

`getChildGroups()` this method returns child groups of this group.

#### Parameters

None

#### Returns

An array of `ScriptGroup` objects.

#### Example

```

var shortName = "MY_GROUP";
var group = groups.getGroup(shortName);

// now find child groups
model.childGroups = group.getChildGroups();        
        
```

### getChildGroups(maxItems, skipCount)

`getChildGroups(maxItems, skipCount)` this method returns child groups of this group.

#### Parameters

-   **maxItems**

    An integer representing the maximum number of results to return. If set to -1 all results will be returned.

-   **skipCount**

    An integer representing the number of results to skip.


#### Returns

An array of `ScriptGroup` objects.

#### Example

```

var shortName = "MY_GROUP";
var group = groups.getGroup(shortName);

// now find child users
var maxItems = -1; // return all results
var skipCount = 0; // skip 0 results
model.childGroups = group.getChildGroups(maxItems, skipCount);        
        
```

### getChildGroups(paging, sortBy)

`getChildGroups(paging, sortBy)` this method returns the child groups of this group.

#### Parameters

-   **paging**

    A `ScriptPagingDetails` object.

-   **sortBy**

    The property by which to sort the results, for example `displayName`.


#### Returns

An array of `ScriptGroup` objects.

#### Example

```

var shortName = "MY_GROUP";
var group = groups.getGroup(shortName);

// now find child users
var paging = utils.createPaging(-1, 0);
var sortBy = "displayName";
model.childGroups = group.getChildGroups(paging, sortBy);
        
```

## getChildUsers {#getChildUsers}

The `getChildUsers(...)` methods get the child users of this group.

### getChildUsers

`getChildUsers()` this method gets the child users of this group.

#### Parameters

None

#### Returns

Returns an array of `ScriptUser` objects.

#### Example

```

var shortName = "MY_SUB_GROUP";
var group = groups.getGroup(shortName);

// now find child users
model.childUsers = group.getChildUsers();
      
```

### getChildUsers

`getChildUsers(paging, sortBy)` this method gets the child users of this group.

#### Parameters

-   **paging**

    A `ScriptPagingDetails` object.

-   **sortBy**

    The property by which to sort the results, for example `userName`.


#### Returns

Returns an array of `ScriptUser` objects.

#### Example

```

var shortName = "MY_SUB_GROUP";
var group = groups.getGroup(shortName);

// now find child users
var paging = utils.createPaging(-1, 0);
var sortBy = "userName";
model.childUsers = group.getChildUsers(paging, sortBy);
      
```


## getGroupCount {#getGroupCount}

`getGroupCount()` returns the number of child groups contained within this group.

### Parameters

None

### Returns

Returns an integer representing the number of child groups contained within this group.

### Example

```

var shortName = "MY_SUB_GROUP";
var group = groups.getGroup(shortName);

// now find group count
model.groupCount = group.getGroupCount();
      
```

## getGroupNode {#getGroupNode}

`getGroupNode()` returns a script node object wrapping this group.

### Parameters

None

### Returns

Returns a script node object wrapping this group.

### Example

```

var shortName = "MY_SUB_GROUP";
var group = groups.getGroup(shortName);

// now find group node
model.groupNode = group.getGroupNode();
      
```

## getGroupNodeRef {#getGroupNodeRef}

`getGroupNodeRef()` returns the node reference of this group.

### Parameters

None

### Returns

Returns a script node object wrapping this group.

### Example

```

var shortName = "MY_SUB_GROUP";
var group = groups.getGroup(shortName);

// now get group node ref
model.groupNodeRef = group.getGroupNodeRef();
      
```

## getParentGroups {#getParentGroups}

The `getParentGroups()` methods return the immediate parent groups of this group.

### getParentGroups()

`getParentGroups()` this method returns immediate parent groups of this group.

#### Parameters

None

#### Returns

An array of `ScriptGroup` objects.

#### Example

```

var shortName = "MY_SUB_SUB_GROUP";
var group = groups.getGroup(shortName);

// now find immediate parent groups
model.parentGroups = group.getParentGroups();
        
```

### getParentGroups(maxItems, skipCount)

`getParentGroups(maxItems, skipCount)` this method returns immediate parent groups of this group.

#### Parameters

-   **maxItems**

    An integer representing the maximum number of results to return. If set to -1 all results will be returned.

-   **skipCount**

    An integer representing the number of results to skip.


#### Returns

An array of `ScriptGroup` objects.

#### Example

```

var shortName = "MY_SUB_SUB_GROUP";
var group = groups.getGroup(shortName);

// now find immediate parent groups
var maxItems = -1;
var skipCount = 0;
model.parentGroups = group.getParentGroups(maxItems, skipCount);
        
```

### getParentGroups(paging, sortBy)

`getParentGroups(paging, sortBy)` this method returns the immediate parent groups of this group.

#### Parameters

-   **paging**

    A `ScriptPagingDetails` object.

-   **sortBy**

    The property by which to sort the results, for example `displayName`.


#### Returns

An array of `ScriptGroup` objects.

#### Example

```

var shortName = "MY_SUB_SUB_GROUP";
var group = groups.getGroup(shortName);

// now find immediate parent groups
var paging = utils.createPaging(-1, 0);
var sortBy = "displayName";
model.parentGroups = group.getParentGroups(paging, sortBy);
        
```

## getUserCount {#getusercount}

`getUserCount()` returns the number of users within this group.

### Parameters

None

### Returns

Returns an integer representing the number of users contained within this group.

### Example

```

var shortName = "MY_SUB_GROUP";
var group = groups.getGroup(shortName);

// now find group count
model.userCount = group.getUserCount();
      
```

## getZones {#getzones}

`getZones()` returns a set of zone names for this group. Zones provide a higher level way of organizing groups.

### Parameters

None

### Returns

Returns a set of strings representing the zones of this group.

### Example

```

var shortName = "MY_SUB_GROUP";
var group = groups.getGroup(shortName);

// now return zones
model.zones = group.getZones();
      
```

## removeAuthority {#removeAuthority}

`removeAuthority(fullAuthorityName)` removes a child authority from this group.

### Parameters

-   **fullAuthorityName**

    A string representing the full name of the authority.


### Example

```

var shortName = "MY_SUB_GROUP";
var group = groups.getGroup(shortName);

// now remove authority from this group

var fullName = "GROUP_MY_TEST_GROUP";
group.removeAuthority(fullName);
      
```

## removeGroup {#removeGroup}

`removeGroup(shortName)` removes a specified subgroup from this group. It does not delete the subgroup or its members.

### Parameters

-   **shortName**

    A string representing the short name of the sub group to remove from the containing group.


### Example

```

    var shortName = "MY_GROUP";
    var group = groups.getGroup(shortName);

    // now remove child group of this group
    
    var shortName = "MY_SUB_GROUP";
    group.removeGroup(shortName);        
      
```

## removeUser {#removeuser}

The `removeUser(shortName)` removes a specified child user from this group. It does not delete the user.

### Parameters

-   **shortName**

    The short name of the user to remove.


### Example

```

    var shortName = "MY_SUB_GROUP";
    var group = groups.getGroup(shortName);

    // now remove child user from this group
    
    var shortName = "james.joey";
    group.removeUser(shortName);        
        
```

## ScriptUser object {#scriptuser-object}

A `ScriptUser` object represents an Alfresco Content Services user.

### Properties

-   **authorityType**

    Gets or sets the authority type (user, group, role)

-   **displayName**

    Gets or sets the display name of the user

-   **fullName**

    Gets or sets the full name of the user

-   **person**

    Gets the ScriptNode object representing the person

-   **personNodeRef**

    Gets the nodeRef for the user

-   **shortName**

    Gets or sets the short name of the user

-   **userName**

    Gets the user name of the user


-   **[getPerson](#getperson)**  
`getPerson()` returns a script node wrapping the person.
-   **[getZones](#getzones)**  
`getZones()` returns all the zones of this user.

## getPerson {#getPerson}

`getPerson()` returns a script node wrapping the person.

### Parameters

None

### Returns

Returns a script node wrapping the person.

### Example

```

var username = "joe.user";

var scriptUser = groups.getUser(username);

var person = scriptUser.getPerson();
      
```

## getZones {#getzones}

`getZones()` returns all the zones of this user.

### Parameters

None

### Returns

Returns a set of strings representing all the zones of this user.

### Example

```

var username = "joe.user";

var scriptUser = groups.getUser(username);

var zones = scriptUser.getZones();
      
```

## Rendition service {#rendition-service}

A rendition is an alternative representation of a content node. Renditions are derived from their source nodes and are usually updated automatically when their source node is updated.

Thumbnails are a special case of renditions which are still available through the Thumbnail Service. Other examples include content that has been transformed into other formats (MIME types), images that have been processed in some way or content which incorporates property values from the source node. Rendition Services are grouped into the following object types:

-   Rendition Service
-   Rendition Definition

-   **[createRenditionDefinition](#createrenditiondefinition)**  
`createRenditionDefinition(renditionName, renderingEngineName)` creates a new rendition definition with the specified rendition name which uses the specified rendering engine.
-   **[getRenditionByName](#getrenditionbyname)**  
 `getRenditionByName(node, renditionName)` retrieves existing renditions for a node by rendition name.
-   **[getRenditions](#getrenditions)**  
The `getRenditions` methods retrieve existing renditions for a node.
-   **[render](#render)**  
The `render(...)` methods generate a rendition from a specified node.
-   **[Rendition definition](#rendition-definition)**  
The ScriptRenditionDefinition extends from ScriptAction and fully specifies a type of rendition. `getrenderingEngineName` and `getRenditionName` are extensions to the existing JavaScript API for script actions.

## createRenditionDefinition {#createrenditiondefinition}

`createRenditionDefinition(renditionName, renderingEngineName)` creates a new rendition definition with the specified rendition name which uses the specified rendering engine.

### Parameters

-   **renditionName**

    The rendition definition name. A unique identifier used to specify the created definition.

-   **renderingEngineName**

    The rendering engine name. The name of the rendering engine associated with this definition.


### Returns

Returns the newly created `ScriptRenditionDefinition` object.


## getRenditionByName {#getRenditionByName}

`getRenditionByName(node, renditionName)` retrieves existing renditions for a node by rendition name.

### Parameters

-   **node**

    The source nodes for the renditions.

-   **renditionName**

    The name used to identify a rendition. For example `cm:doclib` or `{http://www.alfresco.org/model/content/1.0}imgpreview`.


### Returns

Returns a ScriptNode which represents the parent association for the rendition or null if there is no such rendition.

## getRenditions {#getRenditions}

The `getRenditions` methods retrieve existing renditions for a node.

### getRenditions(node)

`getRenditions(node)` this method gets renditions for the specified node.

#### Parameters

-   **node**

    The node whose renditions are requested


#### Returns

Returns a `ScriptNode` array of all existing rendition objects for the specified node.

### getRenditions(node, mimeTypePrefix)

`getRenditions(node, mimeTypePrefix)` this method gets renditions for the specified node.

#### Parameters

-   **node**

    The node whose renditions are requested

-   **mimeTypePrefix**

    A filter to restrict the renditions returned to those whose MIME-type starts with the prefix. This must not be null or an empty string.


#### Returns

Returns an array of ScriptNode objects representing all existing rendition objects for the specified node whose MIME-type starts with the given filter string.


## render {#render}

The `render(...)` methods generate a rendition from a specified node.

### render(sourceNode, scriptRenditionDef)

`render(sourceNode, renditionDefQName)` this method uses a rendition definition to produce a rendition from a specified node.

#### Parameters

-   **sourceNode**

    The node for which a rendition should be created

-   **scriptRenditionDef**

    The ScriptRenditionDefinition object to use to render the rendition.


#### Returns

Returns the new rendition object (a ScriptNode) object.

### render

`render(sourceNode, renditionDefQName)` this method uses a saved rendition definition to produce a rendition from a specified node.

#### Parameters

-   **sourceNode**

    The node for which a rendition should be created

-   **renditionDefQName**

    The qname of the rendition definition to use for example `cm:doclib` or `{http://www.alfresco.org/model/content/1.0}imgpreview`.


#### Returns

Returns the new rendition object (a ScriptNode) object.


## Rendition definition {#rendition-definition}

The ScriptRenditionDefinition extends from ScriptAction and fully specifies a type of rendition. `getrenderingEngineName` and `getRenditionName` are extensions to the existing JavaScript API for script actions.

-   **[getRenderingEngineName](#getrenderingenginename)**  
`getRenderingEngineName()` retrieves the name of the rendering engine used by the current rendition definition.
-   **[getRenditionName](#getrenditionname)**  
 `getRenditionName()` retrieves the name of the current rendition definition.

## getRenderingEngineName {#getRenderingEngineName}

`getRenderingEngineName()` retrieves the name of the rendering engine used by the current rendition definition.

### Returns

Returns the name of the rendering engine used by the current rendition definition.

## getRenditionName {#getRenditionName}

`getRenditionName()` retrieves the name of the current rendition definition.

### Returns

Returns the name of this rendition definition in `prefix:localName` format.

## Site service {#site-service}

A site is a collaborative area for a unit of work or a project. Sites are created in Alfresco Share, and manipulated in various ways directly using the UI or through web scripts or the REST API.

The methods available for the Site service are grouped into `siteService` and `site` object types.

-   **[Site service object](#site-service-object)**  
The `siteService` object provides methods to create sites, list sites in the repository, list roles that can be assigned to members of a site, and get sites for given names.
-   **[Site object](#site-object)**  
The `site` object provides site related properties and methods.

## Site service object {#site-service-object}

The `siteService` object provides methods to create sites, list sites in the repository, list roles that can be assigned to members of a site, and get sites for given names.

-   **[cleanSitePermissions](#cleansitepermissions)**  
`cleanSitePermissions()` these methods clean permissions from a node.
-   **[createSite](#createsite)**  
The `createSite(...)` methods partially create a new site.
-   **[findSites](#createsite)**  
`findSites(filter, sitePresetFilter, size)` searches for and returns a list of sites. The returned list can be optionally filtered by name and site preset. If no filters are specified then all the available sites are returned.
-   **[getSite](#getsite)**  
`getSite(shortName)` gets a site for a provided short name.
-   **[getSites](#getsites)**  
`getSites(filter, sitePresetFilter, size)` returns a list of sites. Retrieves all the sites available in the repository. The returned list can optionally be filtered by name and site preset. If no filters are specified then all the available sites are returned.
-   **[hasCreateSitePermissions](#hascreatesitepermissions)**  
`hasCreateSitePermissions()` returns true if the currently logged on user has permission to create a site.
-   **[hasSite](#hassite)**  
`hasSite(String shortName)` returns true if the specified site exists. Allows private site existence to be tested.
-   **[isSiteManager](#issitemanager)**  
`isSiteManager(siteId)` checks whether the currently authenticated user is a site manager or not, for the specified site.
-   **[listSiteRoles](#listsiteroles)**  
The `listSiteRoles()` methods list all the roles that can be assigned to a member of a site.
-   **[listSites](#listsites)**  
The `listSites` methods list the sites that are available in the repository.
-   **[listUserSites](#listusersites)**  
The `listUserSites()` methods list all the sites to which the specified user has an explicit membership.

## Site object {#site-object}

The `site` object provides site related properties and methods.

### Properties

-   **`description`**

    The displayable description of the site.

-   **`isPublic`**

    Whether the site is public or not (true or false).

-   **`node`**

    The site node (null if there are none).

-   **`shortName`**

    A read-only unique short name identifying the site.

-   **`siteGroup`**

    The site group name.

-   **`sitePermissionGroups`**

    A map of role name mapped to associated group name.

-   **`sitePreset`**

    A read-only name of the site preset used to create the site.

-   **`title`**

    The displayable title of the site.

-   **`visibility`**

    The visibility of the site (`PUBLIC_SITE`, `MODERATED_SITE`, `PRIVATE_SITE`)


### Example

```

    var site = siteService.getSite("simple-site");

    if(site){
        
        model.sitePreset = site.sitePreset;
        model.shortName = site.shortName;
        model.title = site.title;
        model.description = site.description;
        model.isPublic = site.isPublic;
        model.visibility = site.visibility;
        model.node = site.node;
        model.siteGroup = site.siteGroup;
        model.sitePermissionGroups = site.sitePermissionGroups;
        model.customProperties = site.customProperties;
    }        
        
```

-   **[acquireContainer](#acquirecontainer)**  
`acquireContainer(...)` gets and, if missing, creates a new site container. The container is created in a new read/write transaction.
-   **[createAndSaveContainer](#createandsavecontainer)**  
`createAndSaveContainer(containerId, containerType, description)` indicates whether a user is a member of the site.
-   **[createContainer](#createcontainer)**  
The `createContainer` methods create new site containers.
-   **[deleteSite](#deletesite)**  
`deleteSite()` deletes a site.
-   **[getContainer](#getcontainer)**  
`getContainer(componentId)` gets (or creates) the container folder (node) folder for the specified component identifier with the container type `cm:folder`.
-   **[getCustomProperties](#getcustomproperties)**  
`getCustomProperties()` gets a map of the custom properties of the site.
-   **[getCustomProperty](#getcustomproperty)**  
`getCustomProperty(name)` gets the value of a custom property (null if the custom property has not been set or does not exist).
-   **[getInvitation](#getinvitation)**  
`getInvitation(invitationId)` gets an invitation to this web site.
-   **[getMembersRole](#getmembersrole)**  
`getMembersRole(authorityName)` returns a user's role in this site.
-   **[getMembersRoleInfo](#getmembersroleinfo)**  
`getMembersRoleInfo(authorityName)` returns extended information about a user's role in this site.
-   **[hasContainer](#hascontainer)**  
`hasContainer(componentId)` determines if the container folder for the specified component exists; if true the container folder exists.
-   **[inviteModerated](#invitemoderated)**  
`inviteModerated(inviteeComments, inviteeUserName, inviteeRole)` creates a new moderated invitation to the specified web site.
-   **[inviteNominated (new user)](#invitenominated-new-user)**  
`inviteNominated(inviteeFirstName, inviteeLastName, inviteeEmail, inviteeRole, acceptUrl, rejectUrl)` creates a new nominated invitation to this web site for a new user who might not already be an Alfresco Content Services user.
-   **[inviteNominated (existing user)](#invitenominated-existing-user)**  
`inviteNominated(inviteeUserName, inviteeRole, acceptUrl, rejectUrl)` creates a new nominated invitation to this web site for an existing user.
-   **[isMember](#ismember)**  
isMember(authorityName) indicates whether a user is a member of the site.
-   **[isMemberOfGroup](#ismemberofgroup)**  
isMemberOfGroup(authorityName) indicates whether a user belongs to a group that has access rights to the site.
-   **[listInvitations](#listinvitations)**  
`listInvitations()` lists the outstanding invitations for this web site.
-   **[listMembers](#listmembers)**  
`listMembers(nameFilter, roleFilter, size, collapseGroups)` gets a map of members of the site filtered by user name and/or user role.
-   **[removeMembership](#removemembership)**  
`removeMembership(authorityName)` removes the specified user from a web project.
-   **[resetAllPermissions](#resetallpermissions)**  
`resetAllPermissions(node)` resets any permissions that have been set on the node, deleting all permissions and setting the node to inherit permissions.
-   **[save](#save)**  
`save()` saves any outstanding updates to the site detail. Those changes will be lost if properties of the site change and the save method is not called.
-   **[setMembership](#setmembership)**  
`setMembership(authorityName, role)` sets the membership details for a user.
-   **[setPermissions](#setpermissions)**  
`setPermissions(node, permissions)` sets permissions for a node.

## cleanSitePermissions {#cleansitepermissions}

`cleanSitePermissions()` these methods clean permissions from a node.

When a node is moved or copied from one site to another, the node will retain associated permissions assigned in the source site. These methods allow any permission from outside of the current site to be removed, so that only the permissions of the containing site will apply to the specified node.

### cleanSitePermissions(ScriptNode targetNode)

`cleanSitePermissions(ScriptNode targetNode)` cleans permissions from the node specified by the supplied ScriptNode object.

#### Parameters

-   **targetNode**

    The target node on which to perform the clean operation.


#### Returns

void

#### Example

```

          siteService.cleanSitePermissions(node);
      
```

### cleanSitePermissions(NodeRef targetNode)

`cleanSitePermissions(NodeRef targetNode)` cleans permissions from the node specified by the supplied nodeRef.

#### Parameters

-   **targetNode**

    The node reference of the target node on which to perform the clean operation.


#### Returns

void

#### Example

```

          siteService.cleanSitePermissions(nodeRef);
      
```

## createSite {#createsite}

The `createSite(...)` methods partially create a new site.

CAUTION:

These methods will only create a site at the repository level, and do not create a fully functional site. It should be considered for internal use only at the moment. You need to create a site programmatically in the Share context, using the `create-site` module. Further information can be found at the address http://your_domain:8080/share/page/index/uri/modules/create-site.post within your Alfresco Content Services installation.

### createSite

`createSite(sitePreset, shortName, title, description, visibility)` creates a new site.

CAUTION:

This method only creates a site at the repository level, it does not create a fully functional site. It should be considered for internal use only at the moment. You need to a site programmatically in the Share context, using the `create-site` module. Further information can be found at the address `http://your_domain:8080/share/page/index/uri/modules/create-site.post` within your Alfresco Content Services installation.

#### Parameters

-   **sitePreset**

    The site preset, for example `site-dashboard` or custom-defined preset.

-   **shortName**

    The unique site short name to identify the site

-   **title**

    A title for the site

-   **description**

    A description for the site

-   **visibility**

    The visibility of the site, which is one of `siteService.PUBLIC_SITE`, `siteService.MODERATED_SITE`, `siteService.PRIVATE_SITE`.


#### Returns

Returns a Site object representing the created site with the specified parameters.

#### Example

```

var site = siteService.createSite("site-dashboard", "gamma-site", "Gamma Site", "A site description", siteService.PUBLIC_SITE);      
      
```

### createSite

`createSite(sitePreset, shortName, title, description, visibility, siteType)` creates a new site.

CAUTION:

This method only creates a site at the repository level, it does not create a fully functional site. It should be considered for internal use only at the moment. Youy need to create a site programmatically in the Share context, using the `create-site` module. Further information can be found at the address `http://your_domain:8080/share/page/index/uri/modules/create-site.post` within your Alfresco Content Services installation.

#### Parameters

-   **sitePreset**

    The site preset, for example `site-dashboard` or custom-defined preset.

-   **shortName**

    The unique site short name to identify the site

-   **title**

    A title for the site

-   **description**

    A description for the site

-   **visibility**

    The visibility of the site, which is one of `siteService.PUBLIC_SITE`, `siteService.MODERATED_SITE`, `siteService.PRIVATE_SITE`.

-   **siteType**

    QName of site type to create. By default this would be a collaboration site, `st:site`. It is possible to create other types of site, and these can be selected here. This value must be a sub-type of `st:site`.


#### Returns

Returns a Site object representing the created site with the specified parameters.

#### Example

```

var site = siteService.createSite("site-dashboard", "gamma-site", "Gamma Site", "A site description", siteService.PUBLIC_SITE, "st:site");      
      
```


## findSites {#findsites}

`findSites(filter, sitePresetFilter, size)` searches for and returns a list of sites. The returned list can be optionally filtered by name and site preset. If no filters are specified then all the available sites are returned.

This method will find all sites available to the currently authenticated user based on the specified site filter, site preset filter and result set size. The filter parameter will match any sites whose cm:name, cm:title, cm:description *contain* the specified string (ignoring case). Note that this method uses [Alfresco Full Text Search]({% link content-services/5.2/develop/alfresco-full-text-search-ref.md %}#alfresco-full-text-search-reference) to retrieve results and depending on Solr configuration can only offer eventually consistent results.

### Parameters

-   **filter**

    An inclusion filter string for returned sites. Any supplied filter will be wrapped in asterisks, for example as in '*foo*', and used to match sites whose `cm:name`, `cm:title`, or `cm:description` **contains** the filter string.

-   **sitePresetFilter**

    Site preset filter name to match against.

-   **size**

    The maximum number of results to return. The default, 0, returns all results.


### Returns

Returns a list of Site objects. The list can be empty, but not null.

### Example

The following code snippet will search for all sites that contain 'foo' in their name, title or description:

```

    var sites = siteService.findSites('foo', null, 0);
      
```

## getSite {#getSite}

`getSite(shortName)` gets a site for a provided short name.

### Parameters

-   **shortName**

    The short name of the site


### Returns

Return a site object, or returns null if the site does not exist.

### Example

```

var site = siteService.getSite("simple-site");

if(site){
    
    model.sitePreset = site.sitePreset;
    model.shortName = site.shortName;
    model.title = site.title;
    model.description = site.description;
}        
      
```

## getSites {#getSites}

`getSites(filter, sitePresetFilter, size)` returns a list of sites. Retrieves all the sites available in the repository. The returned list can optionally be filtered by name and site preset. If no filters are specified then all the available sites are returned.

If filters start with a “*” character, a Solr-based search will be performed, rather than a database query. This can discover a wider range of results, such as those sites that **contain** the search term, as opposed to those that **start with** the search term.

Within the implementation of this method, if the query does not contain a wildcard, then `listSites()` is invoked, else `findSites()` is used instead.

> **Note:** When using Solr searches, rather than direct database queries, newly created sites might not be found until the underlying search indexes are updated.

### Parameters

-   **filter**

    An inclusion filter string for returned sites. Only sites whose `cm:name`, `cm:title`, or `cm:description` start with the filter string will be returned.

-   **sitePresetFilter**

    Site preset filter string.

-   **size**

    The maximum number of results to return. The default, 0, returns all results.


### Returns

Returns a list of Site objects. The list can be empty, but not null.

### Example

The following code snippet will return all sites:

```

var sites = siteService.getSites(null, null, 0);
      
```

## hasCreateSitePermissions {#hasCreateSitePermissions}

`hasCreateSitePermissions()` returns true if the currently logged on user has permission to create a site.

### Returns

Returns a boolean. Returns true if the currently authenticated user has permission to create a site, false otherwise.

### Example

```

  var result = siteService.hasCreateSitePermissions();
      
```

## hasSite {#hasSite}

`hasSite(String shortName)` returns true if the specified site exists. Allows private site existence to be tested.

### Returns

Returns a boolean. Returns true if specified site exists, false otherwise.

### Example

```

  var result = siteService.hasSite();
      
```

## isSiteManager {#issitemanager}

`isSiteManager(siteId)` checks whether the currently authenticated user is a site manager or not, for the specified site.

### Parameters

-   **siteId**

    The short name of the site to check.


### Returns

Returns a boolean. True is returned if the currently authenticated user is a site manager, false otherwise.

### Example

```

result = siteService.isSiteManager("simple-site");
      
```

## listSiteRoles {#listSiteRoles}

The `listSiteRoles()` methods list all the roles that can be assigned to a member of a site.

### listSiteRoles

`listSiteRoles()` lists all the roles that can be assigned to a member of a site.

#### Returns

Returns an array containing strings representing the roles available to assign to a member of a site.

#### Example

```

  var roles = siteService.listSiteRoles(); 
      
```

The preceding code snippet would return a list of roles such as:

```

  SiteManager

  SiteCollaborator

  SiteContributor

  SiteConsumer

```

### listSiteRoles(shortName)

`listSiteRoles(shortName)` lists all the roles that can be assigned to a member of a site, for a specific site.

#### Parameters

-   **shortName**

    A string representing the short name of the site to list roles for.


#### Returns

Returns an array containing strings representing the roles available to assign to a member of a site.

#### Example

```

  var roles = siteService.listSiteRoles("test-site"); 
      
```

The preceding code snippet would return a list of roles for the specified site, such as:

```

  SiteManager

  SiteCollaborator

  SiteContributor

  SiteConsumer

```

## listSites {#listSites}

The `listSites` methods list the sites that are available in the repository.

List the available sites. This list can optionally be filtered by site name/title/description and/or site preset. This method uses a database query rather than using Solr.

> **Note:** The filter parameter will only match sites whose cm:name or cm:title or cm:description *starts with* the specified string (ignoring case). The listing of sites whose cm:names (or titles or descriptions) *contain* the specified string is no longer supported. To retrieve sites whose cm:names (or titles or descriptions) contain a substring, findSites(String, String, int) should be used instead.

### listSites(nameFilter, sitePresetFilter)

`listSites(nameFilter, sitePresetFilter)` lists the sites that are available in the repository.

#### Parameters

-   **nameFilter**

    String by which to filter the list of sites returned. Only sites whose `cm:name` or `cm:title` or `cm:description` **start with** the filter string will be returned.

-   **sitePresetFilter**

    The site preset filter (sites whose preset EQUALS sitePresetFilter).


#### Returns

A list of the sites filtered, as appropriate. If no filters are specified then all the available sites are returned.

### listSites(nameFilter, sitePresetFilter, size)

`listSites(nameFilter, sitePresetFilter, size)` lists the sites that are available in the repository.

#### Parameters

-   **nameFilter**

    String by which to filter the list of sites returned. Only sites whose `cm:name` or `cm:title` or `cm:description` **starts with** the filter string will be returned.

-   **sitePresetFilter**

    The site preset filter.

-   **size**

    The maximum number of sites to return. By default this is set to 0, which returns all results.


#### Returns

A list of the sites filtered, as appropriate. If no filters are specified then all the available sites are returned.

#### Example

The following code snippet would return all sites without any filtering or restriction on number of results returned:

```

 var sites = siteService.listSites(null, null, 0);
        
```

The following code snippet would return all dashboard sites whose name, title or description starts with the text “test” and restricts the number of sites returned to 5:

```

var sites = siteService.listSites("test", null, 5);          
        
```


## listUserSites {#listusersites}

The `listUserSites()` methods list all the sites to which the specified user has an explicit membership.

### listUserSites

`listUserSites(userName)` lists all the sites to which the specified user has an explicit membership.

#### Parameters

-   **userName**

    The user name for the user whose site membership is to be listed.


#### Returns

Returns a list of the sites to which the specified user has an explicit membership.

#### Example

```

      var sites = siteService.listUserSites("admin"); 
    
```

### listUserSites

`listUserSites(userName, size)` lists all the sites to which the specified user has an explicit membership.

#### Parameters

-   **userName**

    The user name for the user whose site membership is to be listed.

-   **size**

    An integer representing the number of results to return. The default is 0 which returns all results.


#### Returns

Returns a list of the sites to which the specified user has an explicit membership.

#### Example

```

      var sites = siteService.listUserSites("admin", 10); 
    
```


## Site object {#site-object}

The `site` object provides site related properties and methods.

### Properties

-   **`description`**

    The displayable description of the site.

-   **`isPublic`**

    Whether the site is public or not (true or false).

-   **`node`**

    The site node (null if there are none).

-   **`shortName`**

    A read-only unique short name identifying the site.

-   **`siteGroup`**

    The site group name.

-   **`sitePermissionGroups`**

    A map of role name mapped to associated group name.

-   **`sitePreset`**

    A read-only name of the site preset used to create the site.

-   **`title`**

    The displayable title of the site.

-   **`visibility`**

    The visibility of the site (`PUBLIC_SITE`, `MODERATED_SITE`, `PRIVATE_SITE`)


### Example

```

    var site = siteService.getSite("simple-site");

    if(site){
        
        model.sitePreset = site.sitePreset;
        model.shortName = site.shortName;
        model.title = site.title;
        model.description = site.description;
        model.isPublic = site.isPublic;
        model.visibility = site.visibility;
        model.node = site.node;
        model.siteGroup = site.siteGroup;
        model.sitePermissionGroups = site.sitePermissionGroups;
        model.customProperties = site.customProperties;
    }        
        
```

-   **[acquireContainer](#acquirecontainer)**  
`acquireContainer(...)` gets and, if missing, creates a new site container. The container is created in a new read/write transaction.
-   **[createAndSaveContainer](#createandsavecontainer)**  
`createAndSaveContainer(containerId, containerType, description)` indicates whether a user is a member of the site.
-   **[createContainer](#createcontainer)**  
The `createContainer` methods create new site containers.
-   **[deleteSite](#deletesite)**  
`deleteSite()` deletes a site.
-   **[getContainer](#getcontainer)**  
`getContainer(componentId)` gets (or creates) the container folder (node) folder for the specified component identifier with the container type `cm:folder`.
-   **[getCustomProperties](#getcustomproperties)**  
`getCustomProperties()` gets a map of the custom properties of the site.
-   **[getCustomProperty](#getcustomproperty)**  
`getCustomProperty(name)` gets the value of a custom property (null if the custom property has not been set or does not exist).
-   **[getInvitation](#getinvitation)**  
`getInvitation(invitationId)` gets an invitation to this web site.
-   **[getMembersRole](#getmembersrole)**  
`getMembersRole(authorityName)` returns a user's role in this site.
-   **[getMembersRoleInfo](#getmembersroleinfo)**  
`getMembersRoleInfo(authorityName)` returns extended information about a user's role in this site.
-   **[hasContainer](#hascontainer)**  
`hasContainer(componentId)` determines if the container folder for the specified component exists; if true the container folder exists.
-   **[inviteModerated](#invitemoderated)**  
`inviteModerated(inviteeComments, inviteeUserName, inviteeRole)` creates a new moderated invitation to the specified web site.
-   **[inviteNominated (new user)](#invitenominated-new-user)**  
`inviteNominated(inviteeFirstName, inviteeLastName, inviteeEmail, inviteeRole, acceptUrl, rejectUrl)` creates a new nominated invitation to this web site for a new user who might not already be an Alfresco Content Services user.
-   **[inviteNominated (existing user)](#invitenominated-existing-user)**  
`inviteNominated(inviteeUserName, inviteeRole, acceptUrl, rejectUrl)` creates a new nominated invitation to this web site for an existing user.
-   **[isMember](#ismember)**  
isMember(authorityName) indicates whether a user is a member of the site.
-   **[isMemberOfGroup](#ismemberofgroup)**  
isMemberOfGroup(authorityName) indicates whether a user belongs to a group that has access rights to the site.
-   **[listInvitations](#listinvitations)**  
`listInvitations()` lists the outstanding invitations for this web site.
-   **[listMembers](#listmMembers)**  
`listMembers(nameFilter, roleFilter, size, collapseGroups)` gets a map of members of the site filtered by user name and/or user role.
-   **[removeMembership](#removemembership)**  
`removeMembership(authorityName)` removes the specified user from a web project.
-   **[resetAllPermissions](#resetallpermissions)**  
`resetAllPermissions(node)` resets any permissions that have been set on the node, deleting all permissions and setting the node to inherit permissions.
-   **[save](#save)**  
`save()` saves any outstanding updates to the site detail. Those changes will be lost if properties of the site change and the save method is not called.
-   **[setMembership](#setmembership)**  
`setMembership(authorityName, role)` sets the membership details for a user.
-   **[setPermissions](#setpermissions)**  
`setPermissions(node, permissions)` sets permissions for a node.

## acquireContainer {#acquirecontainer}

`acquireContainer(...)` gets and, if missing, creates a new site container. The container is created in a new read/write transaction.

### acquireContainer

`acquireContainer(String componentId)` gets and if missing creates a new site container. The container is created in a new read/write transaction.

#### Parameters

-   **component ID**

    A string specifying the component ID.


#### Returns

A `ScriptNode` object representing the newly created container.

### acquireContainer

`acquireContainer(String componentId, String folderType)` gets and if missing creates a new site container. The container is created in a new read/write transaction.

#### Parameters

-   **componentId**

    A string specifying the component ID.

-   **folderType**

    The folder type to create.


#### Returns

A `ScriptNode` object representing the newly created container.

### acquireContainer

`acquireContainer(String componentId, String folderType, Object properties)` gets and if missing creates a new site container. The container is created in a new read/write transaction.

#### Parameters

-   **componentId**

    A string specifying the component ID.

-   **folderType**

    The folder type to create.

-   **properties**

    The properties to set on the container.


#### Returns

A `ScriptNode` object representing the newly created container.


## createAndSaveContainer {#createAndSaveContainer}

`createAndSaveContainer(containerId, containerType, description)` indicates whether a user is a member of the site.

### Parameters

-   **containerId**

    A string specifying the id for the container node.

-   **containerType**

    A string specifying the type for the container node.

-   **description**

    A string specifying a value for the `cm:description` property on the container node.


### Returns

A `ScriptNode` object representing the newly created and saved container.

## createContainer {#createContainer}

The `createContainer` methods create new site containers.

### createContainer

The `createContainer(componentId)` method creates a new site container of type cm:folder.

#### Parameters

-   **componentId**

    The component identifier


### createContainer

The `createContainer(componentId, folderType)` method creates a new site container of the given type (type of container of subtype of `cm:folder`).

#### Parameters

-   **componentId**

    The component identifier

-   **folderType**

    The type of folder to create. If this is null, it creates a standard folder.


### createContainer

The `createContainer(componentId, folderType, permissions)` method creates a new site container of the given type and applies the provided permissions (a map of authorities and permissions) to the created container.

#### Parameters

-   **componentId**

    The component identifier

-   **folderType**

    The type of folder to create. If this is null, it creates a standard folder.

-   **permissions**

    The permissions for the site.



## deleteSite {#deletesite}

`deleteSite()` deletes a site.

### Example

```

var site = siteService.getSite("site-to-delete");

if(site){
    
    site.deleteSite();

    site = siteService.getSite("site-to-delete");

    if(!site){
        model.message = "Site not found!";
    }
    else{
        model.message = "Site found!";
    }
}        
      
```

## getContainer {#getcontainer}

`getContainer(componentId)` gets (or creates) the container folder (node) folder for the specified component identifier with the container type `cm:folder`.

The type of container is either the one specified by the caller (which must be `cm:folder` or a subtype of), or `cm:folder`, if a type is not specified at all.

### Parameters

-   **componentId**

    The component identifier


### Returns

Returns a `ScriptNode` object representing the container folder, or null if the container cannot be returned or created (mostl likely due to permissions).

## getCustomProperties {#getCustomProperties}

`getCustomProperties()` gets a map of the custom properties of the site.

### Returns

Returns a map of property names and values.

## getCustomProperty {#getCustomProperty}

`getCustomProperty(name)` gets the value of a custom property (null if the custom property has not been set or does not exist).

### Parameters

-   **name**

    The QName of the property.


### Returns

Returns the value of the property, or null if not set.

## getInvitation {#getInvitation}

`getInvitation(invitationId)` gets an invitation to this web site.

### Parameters

-   **invitationId**

    The invitation id of the invitation to return.


### Returns

The `ScriptInvitation` object.

## getMembersRole {#getMembersRole}

`getMembersRole(authorityName)` returns a user's role in this site.

### Parameters

-   **authorityName**

    A string representing the authority name.

-   ****

### Returns

Returns a string representing the user's role or null if not a member.

### Example

The following code snippet uses `getMembersRole` to determine the site role of the authority “admin”:

```

var site = siteService.getSite("swsdp");

if(site){

    var authorityName = "admin";

    if(site.isMember(authorityName)){

        model.authorityName = authorityName;
        model.role = site.getMembersRole(authorityName); 

    }
}
      
```

## getMembersRoleInfo {#getMembersRoleInfo}

`getMembersRoleInfo(authorityName)` returns extended information about a user's role in this site.

### Parameters

-   **authorityName**

    A string representing the authority name.

-   ****

### Returns

Returns a SiteMemberInfo object describing the user's role, or null if the user is not a member.

### Example

The following code snippet uses `getMembersRoleInfo` to determine the site role of the authority “admin”:

```

var site = siteService.getSite("swsdp");

if(site){

    var authorityName = "admin";

    if(site.isMember(authorityName)){

        model.authorityName = authorityName;
        model.roleInfo = site.getMembersRoleInfo(authorityName); 

    }
}
      
```

## hasContainer {#hasContainer}

`hasContainer(componentId)` determines if the container folder for the specified component exists; if true the container folder exists.

### Parameters

-   **componentId**

    The component to check for existence of a container folder.


### Returns

Returns a boolean, true if container folder exists, false otherwise.

## inviteModerated {#invitemoderated}

The `inviteModerated(inviteeComments, inviteeUserName, inviteeRole)` creates a new moderated invitation to the specified web site.

### Parameters

-   **inviteeComments**

    String.

-   **inviteeUserName**

    String.

-   **inviteeRole**

    String.


### Returns

A `ScriptInvitation` object.

## inviteNominated (new user) {#invitenominated-new-user}

`inviteNominated(inviteeFirstName, inviteeLastName, inviteeEmail, inviteeRole, acceptUrl, rejectUrl)` creates a new nominated invitation to this web site for a new user who might not already be an Alfresco Content Services user.

### Parameters

-   **inviteeFirstName**

    A string representing the invited user's first name.

-   **inviteeLastName**

    A string representing the invited user's last name.

-   **inviteeEmail**

    A string representing the invited user's email address.

-   **inviteeRole**

    A string representing the invited user's role, for example: Manager, Collaborator, Contributor, Consumer.

-   **acceptUrl**

    A string representing the URL corresponding to acceptance of the invitation.

-   **rejectUrl**

    A string representing the URL corresponding to rejection of the invitation.


### Returns

A `ScriptInvitation` object.

## inviteNominated (existing user) {#invitenominated-existing-user}

`inviteNominated(inviteeUserName, inviteeRole, acceptUrl, rejectUrl)` creates a new nominated invitation to this web site for an existing user.

### Parameters

-   **inviteeUserName**

    A string representing the invitee's user name.

-   **inviteeRole**

    A string representing the invited user's role, for example: Manager, Collaborator, Contributor, Consumer.

-   **acceptUrl**

    A string representing the URL corresponding to acceptance of the invitation.

-   **rejectUrl**

    A string representing the URL corresponding to rejection of the invitation.


### Returns

A `ScriptInvitation` object.

## isMember {#isMember}

isMember(authorityName) indicates whether a user is a member of the site.

### Parameters

-   **authorityName**

    A string representing the user's authority name.


### Returns

Boolean

This is true if the user is a member of the site, or false if otherwise.

### Example

The following code snippet uses `isMember` to test if “admin” is a member of the site “swsdp”:

```

var site = siteService.getSite("swsdp");

if(site){

    var authorityName = "admin";

    if(site.isMember(authorityName)){

        model.authorityName = authorityName;
        model.role = site.getMembersRole(authorityName); 

    }
}
      
```


## isMemberOfGroup {#isMemberOfGroup}

isMemberOfGroup(authorityName) indicates whether a user belongs to a group that has access rights to the site.

### Parameters

-   **authorityName**

    A string representing the user's authority name.


### Returns

Boolean

This is true if the user is a member of a group that has access to this site, or false if otherwise.

### Example

The following code snippet uses `isMemberOfGroup` to test if “joe.user” is a member of a group that has access to the site “swsdp”:

```

var site = siteService.getSite("swsdp");

if(site){

    var authorityName = "joe.user";

    if(site.isMemberOfGroup(authorityName)){
      ...
    }
}
      
```

## listInvitations {#listInvitations}

`listInvitations()` lists the outstanding invitations for this web site.

### Returns

An array of `ScriptInvitation` objects.

### listInvitations(props)

`listInvitations(props)` this method lists the open invitations for this web site.

#### Parameters

-   **props**

    The optional properties to search for, such as inviteeUserName and invitationType.


#### Returns

An array of `ScriptInvitation` objects.


## listMembers {#listMembers}

`listMembers(nameFilter, roleFilter, size, collapseGroups)` gets a map of members of the site filtered by user name and/or user role.

If no name or role filter is specified all members of the site are listed.

This list includes both users and groups if collapseGroups is set to false, otherwise all groups that are members are collapsed into their component users and listed.

### Parameters

-   **nameFilter**

    User name filter string.

-   **roleFilter**

    User role filter string.

-   **size**

    Limit the return results to this number of items. The default, 0, returns all results.

-   **collapseGroups**

    True if collapse member groups into user list; false otherwise.


### Returns

Returns the list of members of a site with their roles or all site members if no name or role filter is specified.

### Example

The following code snippet would return all members with no filtering, and the members of groups are also collapsed into the member list returned:

```
        
  model.members = site.listMembers(null, null, 0, true);        
      
```

## removeMembership {#removeMembership}

`removeMembership(authorityName)` removes the specified user from a web project.

### Parameters

-   **authorityName**

    A string representing the user name of the user to remove from membership of the site.


### Returns

void

### Example

```

    var site = siteService.getSite("swsdp");

    if(site){

        var authorityName = "joe.user";

        site.removeMembership(authorityName);

        ...   
    }
      
```

## resetAllPermissions {#resetallpermissions}

`resetAllPermissions(node)` resets any permissions that have been set on the node, deleting all permissions and setting the node to inherit permissions.

### Parameters

-   **node**

    The ScriptNode object for which to reset all permissions.


### Returns

void

## save {#save}

`save()` saves any outstanding updates to the site detail. Those changes will be lost if properties of the site change and the save method is not called.

### Example

```

      var site = siteService.getSite("simple-site");
      
      if(site){
      
        var oldDescription = site.description;
        site.description = "A new description";
        site.save();
        
        model.oldDescription = oldDescription;
        model.newDescription = site.description;
      }
      
```

## setMembership {#setmembership}

`setMembership(authorityName, role)` sets the membership details for a user.

If the user is not already a member of the site, then they are added with the role given. If the user is already a member of the site, then their role is updated to the new role.

Only a site manager can modify memberships. There must be at least one site manager at all times.

### Parameters

-   **authorityName**

    A string representing the user's user name.

-   **role**

    A string representing the role for the user.


### Example

```

    var site = siteService.getSite("swsdp");

    if(site){

        var authorityName = "joe.user";
        var role = "SiteContributor"; // "SiteManager", "SiteCollaborator", "SiteContributor", "SiteConsumer"

        site.setMembership(authorityName, role);

        ...
   
    }

      
```

## setPermissions {#setpermissions}

`setPermissions(node, permissions)` sets permissions for a node.

### Parameters

-   **node**

    The ScriptNode object to set permissions for.

-   **permissions**

    The permissions to set for the object.


## Tagging service {#tagging-service}

A tag is a non-hierarchical keyword or term assigned to a piece of information. The root object used to access these services is `taggingService`.

You must enable the auditing service and the tag audit application for `taggingService` to function properly. Set `audit.enabled=true` and `audit.tagging.enabled=true` in the application configuration.

-   **[createTag](#createtag)**  
`createTag(store, tag)` creates a node representing the tag.
-   **[deleteTag](#deletetag)**  
`deleteTag(store, tag)` deletes the specified tag.
-   **[getTag](#gettag)**  
`getTag(store, tag)` returns a tag node for the specified store and tag.
-   **[getTags](#gettags)**  
The `getTags()` methods get all the tags available in a store.
-   **[TagScope object](#tagscope-object)**  
The tagging-related `ScriptNode` methods such as `getTagScope` return `TagScope` objects.

## createTag {#createtag}

`createTag(store, tag)` creates a node representing the tag.

### Parameters

-   **store**

    A store reference string designating the store in which to create the tag.

-   **tag**

    A string designating the tag to create.


### Returns

A ScriptNode object corresponding to the created tag. Null if the tag can not be created.

### Example

```

    model.node = taggingService.createTag("workspace://SpacesStore", "cloud");        
      
```

## deleteTag {#deletetag}

`deleteTag(store, tag)` deletes the specified tag.

### Parameters

-   **store**

    A store reference string designating the store in which the tag is located.

-   **tag**

    A string designating the tag to delete.


### Returns

void

### Example

```

    if(taggingService.getTag("workspace://SpacesStore", "cloud")){

        taggingService.deleteTag("workspace://SpacesStore", "cloud");
        model.message1 = "Tag successfully deleted!";

    }
    else {
        model.message1 = "Tag does not exist!";
    }

    // ensure deleted

    if(taggingService.getTag("workspace://SpacesStore", "cloud")){
        model.message2 = "Tag found!";
    }
    else {
        model.message2 = "Tag does not exist!";
    }
        
      
```

The preceding code snippet would result in the following messages if the tag was found and deleted:

```

Message1: Tag successfully deleted!

Message2: Tag does not exist!        
        
```

## getTag {#getTag}

`getTag(store, tag)` returns a tag node for the specified store and tag.

### Parameters

-   **store**

    A store reference string designating the store to scan for tags.

-   **tag**

    A string designating the tag to fetch.


### Returns

A ScriptNode object corresponding to the specified tag. Null if tag not found.

### Example

```

    model.node = taggingService.getTag("workspace://SpacesStore", "cold");    
      
```

The preceding code snippet would return a node for the tag “cold”. The node details can be displayed using the following FreeMarker template code:

```


   <p>${node.name}, ${node.nodeRef}, ${node.type}</p>

        
```

This would display information such as:

```

  cold, workspace://SpacesStore/0b0cbfd3-4c2d-4d7a-885d-c3ba6e471a9a, {http://www.alfresco.org/model/content/1.0}category

```


## getTags {#getTags}

The `getTags()` methods get all the tags available in a store.



### getTags(store)

`getTags(store)` gets tags from the specified store.

#### Parameters

-   **store**

    A store reference string designating the store to scan for tags.


#### Returns

A string array containing the available tags.

#### Example

The following code snippet would return all tags in the SpacesStore:

```

    model.tags = taggingService.getTags("workspace://SpacesStore");          
        
```

The following FreeMarker template code could then enumerate the tags:

```


<#list tags as t>  
  <p>${t}</p>
</#list>

```

### getTags(store, filter)

`getTags(store, filter)` gets tags from the specified store.

#### Parameters

-   **store**

    A store reference string designating the store to scan for tags.

-   **filter**

    A string used to filter the list of returned tags.


#### Returns

A string array containing the available tags.

#### Example

The following code snippet would return tags in the SpacesStore which contained the text “co”:

```

    model.tags = taggingService.getTags("workspace://SpacesStore", "co");          
        
```

## TagScope object {#tagscope-object}

The tagging-related `ScriptNode` methods such as `getTagScope` return `TagScope` objects.

### Introduction

A `TagScope` object represents the roll up of tags within the scope of a node tree. More specifically, a *tag scope* is a designated container (i.e. a folder) for tagged content. The tag scope defines a set of aggregated data (*tag scope data*) on the number of occurences (i.e. count) of each tag within the container. The repository tagging services are responsible for keeping the tag scope data up-to-date as tags are added and removed from files and folders within the container.

When a `cm:tasgscope` aspect is applied to a `cm:folder` node it defines a tag scope container, which aggregates the occurence of tags applied to objects within the container.

```
<aspect name='cm:tagscope'>
    <title>Tag Scope</title>
    <properties>
        <property name='cm:tagScopeCache'>
            <title>Tags</title>
            <type>d:content</type>
            <protected>true</protected>
        </property>        
    </properties>    
</aspect>
```

The aspect defines a single `d:content` property containing the aggregated data in plain text. The structure of the content is as follows:

```
presentation|24
tech|23
dev|23
sales|18
video|18
```

This is the data that is returned when API requests are made for tagging data.

### Properties

The `TagScope` object type provides the following property:

-   **`tags`**

    A read-only array containing the tag details in count order.


-   **[getCount](#getcount)**  
`getCount(tag)` gets the count of a tag; that is, how many times the tag is used within the tag scope. This is zero if the tag is not present.
-   **[getTopTags](#gettoptags)**  
`getTopTags(topN)` gets the top tags ordered by count.
-   **[refresh](#refresh)**  
`refresh()` refreshes the tag scope, causing the tags and counts within the tag scope to be updated.

## getCount {#getCount}

`getCount(tag)` gets the count of a tag; that is, how many times the tag is used within the tag scope. This is zero if the tag is not present.

### Parameters

-   **tag**

    A string representing the tag to return the count for.


### Example

The following code snippet would return the count for the tag “cool”:

```

    var node = companyhome.childByNamePath("TAG_SCOPE_FOLDER/TEST_FILE_1.TXT");
    if (node){

        model.message = "Node found";

        var tagScope = node.getTagScope();
        if (tagScope){
            model.tags = tagScope.tags;
            model.count = tagScope.getCount("cool");
        }        
    }
    else {
        model.message = "Node not found!";
    }        
    
```

## getTopTags {#getTopTags}

`getTopTags(topN)` gets the top tags ordered by count.

### Parameters

-   **topN**

    The number of top tags to return.


### Returns

Returns the top tag details ordered by count.

### Example

```

    var node = companyhome.childByNamePath("TAG_SCOPE_FOLDER/TEST_FILE_1.TXT");
    if (node){

        model.message = "Node found";

        var tagScope = node.getTagScope();
        if (tagScope){
            model.tags = tagScope.tags;
            model.topTags = tagScope.getTopTags(4);
        }        
    }
    else {
        model.message = "Node not found!";
    }        
      
```

The preceding code snippet would return results for tags and topTags such as the following:

```

Node found

Tags:

Tag: 'cool' @ 3 instances

Tag: 'ends' @ 3 instances

Tag: 'browsers' @ 2 instances

Tag: 'code' @ 2 instances

Tag: 'cold' @ 2 instances

Tag: 'first' @ 2 instances

Tag: 'fire' @ 2 instances

Tag: 'fir' @ 2 instances

Tag: 'fun' @ 1 instances

Top tags:

Tag: 'cool' @ 3 instances

Tag: 'ends' @ 3 instances

Tag: 'browsers' @ 2 instances

Tag: 'code' @ 2 instances  
  
```

## refresh {#refresh}

`refresh()` refreshes the tag scope, causing the tags and counts within the tag scope to be updated.


## Thumbnail service {#thumbnail-service}

A thumbnail is a transformation of content into a specified destination MIME type. This is most commonly an image of a particular size, but can also be other things, for example, a Flash rendition. The Thumbnail service transforms and maintains this thumbnail.

-   **[getMimeAwarePlaceHolderResourcePath](#getmimeawareplaceholderresourcepath)**  
`getMimeAwarePlaceHolderResourcePath(thumbnailName, mimetype)` gets the resource path for the place holder thumbnail for the given named thumbnail and the given mime type.
-   **[getPlaceHolderResourcePath](#getplaceholderresourcepath)**  
`getPlaceHolderResourcePath(thumbnailName)` gets the resource path for the place holder thumbnail for the given named thumbnail.
-   **[isThumbnailNameRegistered](#isthumbnailnameregistered)**  
`isThumbnailNameRegistered(thumbnailName)` determines whether a given thumbnail name has been registered.

## getMimeAwarePlaceHolderResourcePath {#getMimeAwarePlaceHolderResourcePath}

`getMimeAwarePlaceHolderResourcePath(thumbnailName, mimetype)` gets the resource path for the place holder thumbnail for the given named thumbnail and the given mime type.

If there is no icon available for the specified MIME type, a generic icon will be used instead. The generic icon is that returned by getPlaceHolderResourcePath(String). If neither a MIME-specific icon nor a generic icon is available, `null` is returned.

### Parameters

-   **thumbnailName**

    A string representing the thumbnail name.

-   **mimetype**

    A string representing the mimetype of the piece of content.


### Returns

Returns a string of placeholder thumbnail resource path (null if it is not set).

## getPlaceHolderResourcePath {#getPlaceHolderResourcePath}

`getPlaceHolderResourcePath(thumbnailName)` gets the resource path for the place holder thumbnail for the given named thumbnail.

### Parameters

-   **thumbnailName**

    A string representing the thumbnail name.


### Returns

Returns a string of placeholder thumbnail resource path (null if it is not set).

## isThumbnailNameRegistered {#isthumbnailnameregistered}

`isThumbnailNameRegistered(thumbnailName)` determines whether a given thumbnail name has been registered.

### Parameters

-   **thumbnailName**

    A string representing the thumbnail name.


### Returns

Returns true if the thumbnail name is registered. Otherwise it returns false.

## Workflow service {#workflow-service}

The Workflow JavaScript API lets you access Alfresco Content Services advanced workflows from within JavaScript.

This API provides the ability to:

-   Access and manage workflow definitions, instances, paths, tasks, and transitions
-   Create workflow packages
-   Start, cancel, or delete workflow instances
-   End and progress workflow paths to the next node with a specified transition

> **Note:** The object model for this API is similar to that of the Advanced Workflow Java API. The relationships between the various types used in this API are the same as the relationships between the various classes used in the Advanced Workflow API. Each class in the Workflow JavaScript API mirrors a class in the Advanced Workflow API, however, the JavaScript classes are simpler, making them more easily accessible from JavaScript. All the JavaScript classes implement the Serializable interface, which allows them to be stored in Scriptable objects.

-   **[JscriptWorkflowDefinition](#jscriptworkflowdefinition)**  
The workflow definition is the type (or template) of a workflow process. A workflow process definition relates to a workflow instance like a Java class definition relates to an instance of that class. You can use the workflow definition to create and start new workflow instances of that type, as well as to find all currently active instances of that type.
-   **[JscriptWorkflowInstance](#jscriptworkflowinstance)**  
The workflow instance holds various data about a workflow such as its start date, due date, current state, and so on. A workflow instance can be cancelled (made inactive), or deleted.
-   **[JscriptWorkflowNode](#jscriptworkflownode)**  
A workflow node is a single point in the workflow process. Some workflow nodes are task nodes with associated tasks that must be completed before the workflow can transition to the next node.
-   **[JscriptWorkflowPath](#jscriptworkflowpath)**  
The workflow path represents the current state (position) of a workflow instance.
-   **[JscriptWorkflowTask](#jscriptworkflowtask)**  
JscriptWorkflowTask represents a specific instance of a workflow task as opposed to a workflow task definition (the task type). A workflow task instance represents a user action, which is usually something that cannot be automated in the workflow.
-   **[JscriptWorkflowTransition](#jscriptworkflowtransition)**  
The workflow transition is a simple Data Transfer Object (DTO) representing a single transition type.
-   **[Workflow Manager](#workflow-manager)**  
The Workflow Manager is the entry point to the Workflow JavaScript API. It is the only object in this API exposed to the root scripting scope. In the root scripting scope, the WorkflowManager object is identified as `workflow`.

## JscriptWorkflowDefinition {#jscriptworkflowdefinition}

The workflow definition is the type (or template) of a workflow process. A workflow process definition relates to a workflow instance like a Java class definition relates to an instance of that class. You can use the workflow definition to create and start new workflow instances of that type, as well as to find all currently active instances of that type.

### Properties

-   **`id`**

    Returns an ID for this workflow definition

-   **`name`**

    Returns a string name for this workflow definition

-   **`version`**

    Returns a version number for this workflow definition

-   **`title`**

    Returns a title for this workflow definition

-   **`description`**

    Returns a description for this workflow definition

-   **`activeInstances`**

    Returns an array of all active workflow instances for this workflow definition.


-   **[startWorkflow](#startworkflow)**  
The `startWorkflow()` methods create and start a new workflow instance of the workflow definition type.

## startWorkflow {#startworkflow}

The `startWorkflow()` methods create and start a new workflow instance of the workflow definition type.

### startWorkflow(properties)

`startWorkflow(properties)` this method creates and starts a new workflow instance of the workflow definition's type.

#### Parameters

-   **properties**

    If not of type `ScriptableObject`, the properties parameter will be ignored


#### Returns

Returns the workflow path (JscriptWorkflowPath) for the created instance. This method does not set a package container.

### startWorkflow(workflowPackage, properties)

`startWorkflow(properties)` this method creates and starts a new workflow instance of the workflow definition's type.

#### Parameters

-   **workflowPackage**

    Workflow package node to attach to the new workflow.

-   **properties**

    If not of type `ScriptableObject`, the properties parameter will be ignored


#### Returns

Returns the workflow path (JscriptWorkflowPath) for the created instance.


## JscriptWorkflowInstance {#jscriptworkflowinstance}

The workflow instance holds various data about a workflow such as its start date, due date, current state, and so on. A workflow instance can be cancelled (made inactive), or deleted.

### Properties

-   **`active`**

    Returns true if the workflow instance is in progress, or false otherwise

-   **`description`**

    Returns the description for this workflow instance

-   **`endDate`**

    Returns the date when this workflow instance ended

-   **`id`**

    Returns the ID for this workflow instance

-   **`paths`**

    Returns an array containing all the paths associated with this workflow instance

-   **`startDate`**

    Returns the date when this workflow instance started


-   **[cancel](#cancel)**  
`cancel()` cancels the workflow instance.
-   **[remove](#remove)**  
`remove()` removes the workflow instance.

## cancel {#cancel}

`cancel()` cancels the workflow instance.

## remove {#remove}

`remove()` removes the workflow instance.

## JscriptWorkflowNode {#jscriptworkflownode}

A workflow node is a single point in the workflow process. Some workflow nodes are task nodes with associated tasks that must be completed before the workflow can transition to the next node.

### Properties

-   **`description`**

    Returns the description for this workflow node

-   **`isTaskNode`**

    Returns true if this node is a task node, or false otherwise

-   **`name`**

    Returns the name when this workflow node

-   **`title`**

    Returns the title for this workflow node

-   **`transitions`**

    Returns the list of transitions that are available for this node


## JscriptWorkflowPath {#jscriptworkflowpath}

The workflow path represents the current state (position) of a workflow instance.

The path stores the current position in the workflow as well as the path taken through the workflow to reach this point. An in-progress workflow can have multiple workflow paths if the process contains any forking nodes. The workflow path can be signaled to transition to the next node in the process.

### Properties

-   **`active`**

    Returns true if this node is a task node, or false otherwise

-   **`id`**

    Returns the ID for this workflow path

-   **`instance`**

    Returns the workflow instance to which this workflow path belongs

-   **`node`**

    Returns the current node (position) of the workflow path

-   **`tasks`**

    Returns an array of all the tasks associated with this workflow path


-   **[signal](#signal)**  
`signal(transitionId)` signals the workflow path to transition to the next node.

## signal {#signal}

`signal(transitionId)` signals the workflow path to transition to the next node.

### Parameters

-   **transitionId**

    ID of the transition to follow (or null, for the default transition)


### Returns

Returns `JscriptWorkflowPath` object representing the newly transitioned workflow path

## JscriptWorkflowTask {#jscriptworkflowtask}

JscriptWorkflowTask represents a specific instance of a workflow task as opposed to a workflow task definition (the task type). A workflow task instance represents a user action, which is usually something that cannot be automated in the workflow.

Task instances can be associated with workflow nodes within the process definition. When the workflow path reaches a node with an associated task, it will not progress until the task is complete and the user signals a transition. A workflow task instance can be signaled with a transition causing the workflow path to progress to the next node with the specified transition.

Some typical examples of where tasks might be used include reviewing and approving documents, editing and appending documents, and marking exam papers.

### Properties

-   **complete**

    Returns whether the task is complete or not. True means the task is complete, false not complete.

-   **description**

    Returns the description for the workflow task instance

-   **id**

    Returns the ID for the workflow task instance

-   **name**

    Returns the name for the workflow task instance

-   **packageResources**

    Returns an array of NodeRefs of the content stored in the package container associated with this workflow task instance

-   **pooled**

    Gets or sets if this is a pooled task instance or not (true or false). A pooled task instance can be assigned to a group of users, of which one can take ownership and progress the task

-   **properties**

    Gets or sets a map containing all the properties associated with this task instance

-   **title**

    Returns the title for the workflow task instance

-   **transitions**

    Returns a map containing all the transition IDs (map keys) and transition titles (map values) for the task instance


-   **[endTask](#endtask)**  
`endTask(transitionId)` ends the task and signals the associated workflow path to progress to the next node using the specified transition.

## endTask {#endtask}

`endTask(transitionId)` ends the task and signals the associated workflow path to progress to the next node using the specified transition.

### Parameters

-   **transitionId**

    ID of the transition to end the task for.


### Returns

void

## JscriptWorkflowTransition {#jscriptworkflowtransition}

The workflow transition is a simple Data Transfer Object (DTO) representing a single transition type.

### Properties

-   **`description`**

    Returns the description for the workflow transition

-   **`id`**

    Returns the ID for the workflow transition

-   **`title`**

    Returns the title for the workflow transition

## Workflow Manager {#workflow-manager}

The Workflow Manager is the entry point to the Workflow JavaScript API. It is the only object in this API exposed to the root scripting scope. In the root scripting scope, the WorkflowManager object is identified as `workflow`.

### Properties

-   **`allDefinitions`**

    Returns an array of all (old and current) versions of deployed workflow definitions For current versions only, use latestDefinitions.

-   **`assignedTasks`**

    Returns an array of all tasks that are currently in progress assigned to the current user.

-   **`completedTasks`**

    Returns an array of all completed tasks assigned to the current user.

-   **latestDefinitions**

    Returns an array of the latest version of all deployed workflow definitions For all versions, use allDefinitions.


-   **[createPackage](#createpackage)**  
`createPackage()` creates a package. A package is a container node that can store content associated with a workflow instance.
-   **[getAllDefinitions](#getalldefinitions)**  
`getAllDefinitions()` - Returns all versions of the deployed workflow definitions.
-   **[getAssignedTasks](#getalldefinitions)**  
`getAssignedTasks()` - Get tasks assigned to the current user. Note that this will only return in-progress tasks.
-   **[getCompletedTasks](#getcompletedtasks)**  
`getCompletedTasks()` - Get completed tasks assigned to the current user.
-   **[getDefinition](#getdefinition)**  
`getDefinition(id)` returns a workflow definition with the specified ID.
-   **[getDefinitionByName](#getdefinitionbyname)**  
`getDefinitionByName(name)` gets the workflow definitions corresponding to the specified name.
-   **[getInstance](#getinstance)**  
`getInstance(workflowInstanceId)` gets the workflow instance with the specified ID.
-   **[getLatestDefinitions](#getlatestdefinitions)**  
`getLatestDefinitions()` - Gets the latest versions of the deployed, workflow definitions.
-   **[getPooledTasks](#getpooledtasks)**  
`getPooledTasks(authority)` gets pooled workflow task instances available to the given authority.
-   **[getTask](#gettask)**  
`getTask(id)` returns the workflow task instance with the specified ID.
-   **[getTaskById](#gettaskbyid)**  
`getTaskById(id)` returns the workflow task instance with the specified ID.

## createPackage {#createpackage}

`createPackage()` creates a package. A package is a container node that can store content associated with a workflow instance.

### Returns

Returns a ScriptNode object corresponding to the created container.

## getAllDefinitions {#getAllDefinitions}

`getAllDefinitions()` - Returns all versions of the deployed workflow definitions.

### Parameters

None

### Returns

Returns all versions of the deployed workflow definitions.

### Example

```
    
model.definitions = workflow.getAllDefinitions();        
      
```

## getAssignedTasks {#getAssignedTasks}

`getAssignedTasks()` - Get tasks assigned to the current user. Note that this will only return in-progress tasks.

### Parameters

None

### Returns

Returns the list of assigned (in-progress) tasks.

### Example

```
   
model.assignedTasks = workflow.getAssignedTasks();        
      
```

## getCompletedTasks {#getCompletedTasks}

`getCompletedTasks()` - Get completed tasks assigned to the current user.

### Parameters

None

### Returns

Returns the list of completed tasks.

### Example

```

    model.completedTasks = workflow.getCompletedTasks();          
      
```

## getDefinition {#getDefinition}

`getDefinition(id)` returns a workflow definition with the specified ID.

### Parameters

-   **id**

    A string representing the ID of the workflow definition.


### Returns

Returns the workflow definition with the given ID. Returns null if no workflow definition with the given ID exists.

### Example

```

    var id = "activiti$activitiAdhoc:1:4";
    
    model.definition = workflow.getDefinition(id);        
      
```

## getDefinitionByName {#getDefinitionByName}

`getDefinitionByName(name)` gets the workflow definitions corresponding to the specified name.

### Parameters

-   **name**

    A string representing the name of the workflow definition to return.


### Returns

Returns the workflow definition with the given name or null if no workflow definition with the given name exists.

### Example

```

    var name = "activiti$activitiAdhoc";
    
    model.definition = workflow.getDefinitionByName(name);        
      
```

## getInstance {#getInstance}

`getInstance(workflowInstanceId)` gets the workflow instance with the specified ID.

### Parameters

-   **workflowInstanceId**

    A string representing the ID of the workflow instance.


### Returns

Returns the workflow instance with the given ID or null if no workflow instance with the given ID exists.

### Example

```

    var id = "activiti$164";

    model.instance = workflow.getInstance(id);      
        
```

## getLatestDefinitions {#getLatestDefinitions}

`getLatestDefinitions()` - Gets the latest versions of the deployed, workflow definitions.

### Parameters

None

### Returns

Returns the latest versions of the deployed, workflow definitions.

### Example

```
    
model.latestDefinitions = workflow.getLatestDefinitions();        
      
```

## getPooledTasks {#getPooledTasks}

`getPooledTasks(authority)` gets pooled workflow task instances available to the given authority.

A pooled task can be assigned to a group of users, and then one of those users may take ownership and progress the task.

### Parameters

-   **authority**

### Returns

Returns an array of the pooled workflow task instances available to the given authority.

### Example

```

    model.pooledTasks = workflow.getPooledTasks("GROUP_SUPERUSERS");          
      
```

## getTask {#getTask}

`getTask(id)` returns the workflow task instance with the specified ID.

### Parameters

-   **id**

    The ID of the workflow task instance.


### Returns

Returns the workflow task instance with the specified ID. Returns null if no workflow task instance with the given ID exists.

### Example

```

    var taskId = "activiti$144";

    model.task = workflow.getTask(taskId);        
      
```

## getTaskById {#getTaskById}

`getTaskById(id)` returns the workflow task instance with the specified ID.

This method is functionally equivalent to the `getTask(id)` method.

### Parameters

-   **id**

    The ID of the workflow task instance.


### Returns

Returns the workflow task instance with the specified ID. Returns null if no workflow task instance with the given ID exists.

### Example

```

    var taskId = "activiti$144";

    model.task = workflow.getTaskById(taskId);        
      
```

## Search API {#search-api}

The Search API provides access to the search features of Alfresco Content Services.

The Search API accepts POST requests containing JSON structures as described in the table below. The JSON is structured to group options related to different query concepts together.

The Search API is defined under the search namespace. It uses the `/search` endpoint, which does not accept any URL parameters and is therefore, completely controlled via the parameters in a POST body.

> **Note:** The `/search` endpoint is available in Alfresco Content Services 5.2.7 and newer versions.

The elements used by the `/search` endpoint are:

|Element|Type|Parameters|Description|Reference|
|-------|----|----------|-----------|---------|
|`query`|string|-   `language`
-   `userQuery`
-   `query`

|This specifies a basic query to be parsed with minimum possible query parameters.|See [query](#query).|
|`paging`| |-   `maxItems`
-   `skipCount`

|This restricts the number of results to be displayed.|See [paging](#paging).|
|`include`|string| |This returns additional information about the node.|See [include](#include).|
|`includeRequest`|boolean| |When this element is set to `true`, the original request is included in the response.|See [includeRequest](#includerequest).|
|`fields`|string| |This specifies a list of field names.|See [fields](#fields).|
|`sort`| |-   `type`
-   `field`
-   `ascending`

|The `sort` element lets you sort the results of a query.|See [sort](#sort).|
|`templates`| |-   `name`
-   `template`

|This specifies the templates used for query expansion.|See [sort](#templates).|
|`defaults`| |-   `textAttributes`
-   `defaultFTSOperator`
-   `defaultFTSFieldOperator`
-   `namespace`
-   `defaultFieldName`

|This specifies the common query defaults.|See [defaults](#defaults).|
|`timezone`|string| |This specifies a valid timezone id supported by `@see java.time.ZoneId`.|See [timezone](#timezone).|
|`filterQueries`| |-   `query`
-   `tags`

|This specifies the constraints that apply to the results set but do not affect the score of each entry.|See [filterQueries](#filterqueries).|
|`facetQueries`| |-   `query`
-   `label`

|This specifies the facet queries to include.|See [facetQueries](#facetqueries).|
|`facetFields`| |-   `field`
-   `label`
-   `prefix`
-   `sort`
-   `method`
-   `missing`
-   `limit`
-   `offset`
-   `mincount`
-   `facetEnumCacheMinDf`
-   `excludeFilters`

|This specifies the simple facet fields to include.|See [facetFields](#facetfields).|
|`facetIntervals`| |-   `sets`
-   `intervals`

|This specifies the facet intervals.|See [facetIntervals](#facetintervals).|
|`pivots`| |-   `key`

|This specifies a list of pivot keys.|See [pivots](#pivots).|
|`stats`| |-   `field`
-   `label`
-   `min`
-   `max`
-   `sum`
-   `count`
-   `missing`
-   `mean`
-   `stddev`
-   `sumOfSquares`
-   `distinctValues`
-   `countDistinct`
-   `cardinality`
-   `cardinalityAccuracy`
-   `excludeFilters`
-   `percentiles`

|This specifies a list of stats request.|See [stats](#stats).|
|`spellcheck`| |-   `query`

|This specifies a request that spellcheck fragments to be added to result set rows.|See [spellcheck](#spellcheck).|
|`scope`| |-   `locations`

|This specifies the scope or the locations that are queried.|See [scope](#scope).|
|`limits`| |-   `permissionEvaluationTime`
-   `permissionEvaluationCount`

|This limits the time and resources used for query execution.|See [limits](#limits).|
|`highlight`| |-   `prefix`
-   `postfix`
-   `snippetCount`
-   `fragmentSize`
-   `maxAnalyzedChars`
-   `mergeContiguous`
-   `usePhraseHighlighter`
-   `fields`

|This specifies the request that highlight fragments to be added to the result set rows.|See [highlight](#highlight).|
|`range`| |-   `range`
-   `start`
-   `end`
-   `gap`
-   `hardend`
-   `include`
-   `other`
-   `method`

|This is useful for stitching together a series of range queries on any date or numeric field that supports range queries.|See [range](#range).|

> **Note:** The POST response in the examples used for various elements is only a part of the full result returned by the query. For detailed information, see the [Search API Postman collection](https://www.getpostman.com/collections/be013a0a99c6428e5017).

> **Note:** Limited stats are available with Solr 4 as compared to Solr 6. So, the Solr 4 response may be different from the Solr 6 response. Also, there are some differences between the default Solr 4 core and the rerank core. The rerank core is the default core with Solr 6 but you can also use it with Solr 4.

> **Note:** It is advisable to use a Swagger-aware editor.

-   **[query](#query)**  
The `query` element specifies the basic query to be parsed. This is the only mandatory parameter with any query.
-   **[paging](#paging)**  
Use the `paging` element to restrict the number of results to be displayed. By default, results are limited to the first 100.
-   **[include](#include)**  
The `include` element returns additional information about the node.
-   **[includeRequest](#includerequest)**  

-   **[fields](#fields)**  
The `fields` element specifies a list of field names. Use this parameter to restrict the fields returned within a response, for example, if you want to save on the overall bandwidth. The list applies to a returned individual entity or entries within a collection.
-   **[sort](#sort)**  
The `sort` element lets you sort the results of a query. It specifies an array of sort specifications. The array order defines the ordering precedence.
-   **[templates](#templates)**  
CMIS `CONTAINS()` now supports templates. The `templates` element specifies the templates used for query expansion. A template is a way to define and abstract complex queries from the user.
-   **[defaults](#defaults)**  

-   **[timezone](#timezone)**  
This specifies a valid timezone id supported by `@see java.time.ZoneId`.
-   **[filterQueries](#filterqueries)**  
The `filterQueries` also support multi-select facets to enable building complex `filterQueries`. It limits the result found and specifies the constraints that apply to the results set but do not affect the score or the rank of the results found by the query.
-   **[facetQueries](#facetqueries)**  
The `facetQueries` element specifies the facet queries to include. These queries are used to generate a single-facet value based on the number of documents that matched the overall query and the facet query.
-   **[facetFields](#facetfields)**  
The `facetFields` element specifies the simple facet fields to include in a query. These facets are generated by counting field values for all results that match the query. This is the default behaviour of all the filter queries applied.
-   **[facetIntervals](#facetintervals)**  
The `facetIntervals` element specifies facet intervals. It is more restrictive but fast range-based faceting. It enables you to control the ranges using `Intervals` and provides much more flexibility on what you get in your ranges. In `intervals`, the ranges don't overlap so you can double-count the entries and use date maths expressions, such as TODAY, THIS WEEK, THIS MONTH, and THIS YEAR.
-   **[pivots](#pivots)**  
The `pivots` element specifies a list of pivot keys. It enables nested facet fields where you can put any number of single facet fields inside each other so that it becomes a chain of fields.
-   **[stats](#stats)**  
The `stats` element specifies a list of simple statistics for numeric, dates, and text fields within the document set.
-   **[spellcheck](#spellcheck)**  
The `spellcheck` element specifies a request that spellcheck fragments should be added to the result set rows. The properties reflect Solr spellcheck parameters.
-   **[scope](#scope)**  
The `scope` element specifies the scope or the locations that are queried. By default, search uses the `nodes` location, which is the `workspace://SpacesStore` content store. To change the scope to another location, you can use the `locations` JSON body parameter.
-   **[limits](#limits)**  
The `limits` element limits the time and resources used for query execution. Limits applied to the query go to the database.
-   **[highlight](#highlight)**  
The `highlight` element specifies the request that highlight fragments should be added to the result set rows. The properties reflect Solr highlighting parameters.
-   **[range](#range)**  
The `range` element keeps together a series of range queries on any date or numeric field that supports range queries. It allows you to create a number of buckets and then group things by those.

## query {#query}

The `query` element specifies the basic query to be parsed. This is the only mandatory parameter with any query.

### Parameters

The parameters for the `query` element are:

|Parameter|Type|Description|Default value|
|---------|----|-----------|-------------|
|`language`|String|The query language in which the query is written.|The default search language is `afts` but `cmis` and `lucene` are also supported. See [Alfresco Full Text Search Reference]({% link content-services/5.2/develop/alfresco-full-text-search-ref.md %}#alfresco-full-text-search-reference).|
|`userQuery`|String|The exact search request typed in by the user.| |
|`query`|String|The query which may have been generated in some way from the `userQuery`.| |

### Examples

**Example 1**: Here's a basic query that searches for the term *lorem*:

```
{
  "query": {
    "query": "lorem"
  }
}
```

The above example uses the default search language `afts`.

**Example 2:** Here's an example of a simple CMIS query:

```
{
  "query": {
    "query": "select * from cmis:folder",
    "language": "cmis"
  }
}
```

**Example 3:** Here's a simple CMIS query to find all content with a name starting with *test*:

```
{
  "query":{
    "query":"select * from cmis:document WHERE cmis:name LIKE 'test.%'",
    "language":"cmis"
  }
}
```

**Example 4:** Here's a simple `lucene` query to find all the content modified in the last week:

```
{
  "query":{
    "query":"+@cm\:modified:[NOW/DAY-7DAYS TO NOW/DAY+1DAY] +TYPE:\"cm:content\"",
    "language":"lucene"
  }
}
```

-   **[Structure, tags, categories, and query](#structure,-tags,-categories,-and-query)**  
Alfresco Content Services 5.2.7 supports structural queries to find documents by how they are arranged in a folder structure, how they are categorised, and how they have been tagged.

## Structure, tags, categories, and query {#structure,-tags,-categories,-and-query}

Alfresco Content Services 5.2.7 supports structural queries to find documents by how they are arranged in a folder structure, how they are categorised, and how they have been tagged.

You can add new types of category, add your new categories to existing hierarchies, use aspects on the base category object. All these categories are discoverable. Categories and tags are implemented the same way. Tags are a flat category whereas categories are treated as an additional path to a document in a category hierarchy. A document is linked to a category by setting a property to the node ref of one or more categories.

Alfresco Search Services provides new information in the index and fields that can be used in the query, filter queries and, facets. These are:

-   `TAG` - Used to index all the lowercase tags that have been assigned to a node. It provides easy query time access to concepts in Share.
-   `SITE` - Used to index the site short name for a node in any site. It provides easy query time access to concepts in Share. It may be possible that a node exists in more than one site. If a node does not exist in any site, it is assigned a value of `_REPOSITORY_`.
-   `NPATH`- Specifies the name path to a node. `NPATH` support queries that will progressively drill into a folder or category structure and support faceting to count the documents and folders in each part of the next layer. See the example below for how it is indexed.
-   `PNAME`- Specifies the path from the node up through its parents. `PNAME` support queries that will progressively drill into a folder or category structure and support faceting to count the documents and folders in each part of the next layer. For more information, see the example below.
-   `APATH` - Used as `NPATH` but using `UUID`. The `UUID` can be used as the key for internationalisation (Solr 6 only). `APATH` does the same job with a `UUID` key to aid internationalisation and a bridge to other public APIs where `UUID` is ubiquitous.
-   `ANAME` - Used as `PNAME` but using `UUID`. The `UUID` can be used as the key for internationalisation (Solr 6 only). `ANAME` does the same job with a `UUID` key to aid internationalisation and a bridge to other public APIs where `UUID` is ubiquitous.

The Search public API in Alfresco Content Services 5.2.7 exposes filter queries and faceting by field with prefix restrictions. These, in combination with the additional data, supports new ways to drill-in and roll up data.

**Example to show what's in the index**

```
"PATH":["/{http://www.alfresco.org/model/application/1.0}company_home/{http://www.alfresco.org/model/site/1.0}sites/
{http://www.alfresco.org/model/content/1.0}woof/{http://www.alfresco.org/model/content/1.0}documentLibrary/
{http://www.alfresco.org/model/content/1.0}CMIS-v1.1-cs01.pdf"]
"SITE":["woof"]
"APATH":[
         
          "0/264ed642-b527-488a-9139-ecde3673e4de",          
          "1/264ed642-b527-488a-9139-ecde3673e4de/e4c94340-8e40-4612,a4e4-354d10f3217e",         
          "2/264ed642-b527-488a-9139-ecde3673e4de/e4c94340-8e40-4612-a4e4-354d10f3217e/b9f14a0f-cffb-4409
           -b8d0-d77e89eca0e2",         
          "3/264ed642-b527-488a-9139-ecde3673e4de/e4c94340-8e40-4612-a4e4-354d10f3217e/b9f14a0f-cffb-4409
           -b8d0-d77e89eca0e2/4f3c4bcd-2ee1-462d-9462-24b7a72acc19",         
          "4/264ed642-b527-488a-9139-ecde3673e4de/e4c94340-8e40-4612-a4e4-354d10f3217e/b9f14a0f-cffb-4409
           -b8d0-d77e89eca0e2/4f3c4bcd-2ee1-462d-9462-24b7a72acc19/340d5e93-89bf-4cc2-9ae5-9f4ffbad2675",        
          "F/264ed642-b527-488a-9139-ecde3673e4de/e4c94340-8e40-4612-a4e4-354d10f3217e/b9f14a0f-cffb-4409
           -b8d0-d77e89eca0e2/4f3c4bcd-2ee1-462d-9462-24b7a72acc19/340d5e93-89bf-4cc2-9ae5-9f4ffbad2675"]
              
"ANAME":[
          "0/340d5e93-89bf-4cc2-9ae5-9f4ffbad2675",          
          "1/4f3c4bcd-2ee1-462d-9462-24b7a72acc19/340d5e93-89bf-4cc2-9ae5-9f4ffbad2675",      
          "2/b9f14a0f-cffb-4409-b8d0-d77e89eca0e2/4f3c4bcd-2ee1-462d-9462-24b7a72acc19/340d5e93-89bf-4cc2
           -9ae5-9f4ffbad2675",          
          "3/e4c94340-8e40-4612-a4e4-354d10f3217e/b9f14a0f-cffb-4409-b8d0-d77e89eca0e2/4f3c4bcd-2ee1-462d
           -9462-24b7a72acc19/340d5e93-89bf-4cc2-9ae5-9f4ffbad2675",          
          "4/264ed642-b527-488a-9139-ecde3673e4de/e4c94340-8e40-4612-a4e4-354d10f3217e/b9f14a0f-cffb-4409
           -b8d0-d77e89eca0e2/4f3c4bcd-2ee1-462d-9462-24b7a72acc19/340d5e93-89bf-4cc2-9ae5-9f4ffbad2675",         
          "F/264ed642-b527-488a-9139-ecde3673e4de/e4c94340-8e40-4612-a4e4-354d10f3217e/b9f14a0f-cffb-4409
           -b8d0-d77e89eca0e2/4f3c4bcd-2ee1-462d-9462-24b7a72acc19/340d5e93-89bf-4cc2-9ae5-9f4ffbad2675"]
"NPATH":[
          "0/Company Home",
          "1/Company Home/Sites",
          "2/Company Home/Sites/woof",
          "3/Company Home/Sites/woof/documentLibrary",          
          "4/Company Home/Sites/woof/documentLibrary/CMIS-v1.1-cs01.pdf",          
          "F/Company Home/Sites/woof/documentLibrary/CMIS-v1.1-cs01.pdf"]
"PNAME":[
          "0/documentLibrary",                    
          "1/woof/documentLibrary",                    
          "2/Sites/woof/documentLibrary",          
          "3/Company Home/Sites/woof/documentLibrary",          
          "F/Company Home/Sites/woof/documentLibrary"]
```

**Queries to use**

**SITE**

To find things by `SITE`, use:

```
SITE:"woof"
```

You can also do this in a filter query in the Search API as filter queries are cached, reused, and warmed.

**TAG**

Similarly for `TAG`, use:

```
 TAG:tag
```

SITE and TAG also support faceting.

**NPATH**

`NPATH` can be used for navigation. To get the top level names, request for a facet on `NPATH` starting with the prefix `0/`.

You can then remove the `0/` from the facets returned to get the names of the top level things.

Here's the JSON body of the request:

```
{  
  "query": {
    "query": "*"
  },
  "facetFields": {
    "facets": [
      {"field": "NPATH", "prefix": "0/"}
     ]
  }
}
```

The response contains `0/categories`.

Now lets drill into another layer. We need the prefix `1/categories` and we filter out the things based on where we want to drill-in `0/categories`, as shown below:

```
{  
  "query": {
    "query": "*"
  },
  "filterQueries": [{"query": "NPATH:\"0/categories\""}],
  "facetFields": {
    "facets": [
      {"field": "NPATH", "prefix": "1/categories"}
    ] 
   }
}
```

This gives us `1/categories/General` and `1/categories/Tags`. Now let's skip a few steps and count the stuff in the `General/Languages` category.

```
{
  "query": {
    "query": "*"
  },
  "filterQueries": [{"query": "NPATH:\"2/categories/General/Languages\""}],
  "facetFields": {
    "facets": [
      {"field": "NPATH" }
    ]
  }
}
```

In a clean repository, this will show both the structure of Language and how many sub-categories exist.

**PNAME**

`PNAME` gives faceting based on ancestry. It can highlight common structures for storing data or departure from such a structure, for example, things in odd locations. If you have used folders to encode state you can roll up on this state.

`PNAME` can also be used to count direct members of a category whereas, `NPATH` can count everything below a category. The design in `PNAME` uses the same prefix for each. So, to get the next category layer with total and direct counts, use:

```
{  
  "query": {
    "query": "*"
  },
   "filterQueries": [{"query": "NPATH:\"2/categories/General/Regions\""}],
   "facetFields": {   
     "facets": [
      {"field": "NPATH", "prefix": "3/categories/General/Regions", "label": "clade"},
      {"field": "PNAME", "prefix": "3/categories/General/Regions", "label": "direct"}   
     ]
  }
}
```

## paging {#paging}

Use the `paging` element to restrict the number of results to be displayed. By default, results are limited to the first 100.

### Parameters

The parameters for the `paging` element are:

|Parameter|Type|Description|Default value|
|---------|----|-----------|-------------|
|`maxItems`|Integer|The maximum number of items to return in the query result.|The default value is 100.

|
|`skipCount`|Integer|The number of items to skip from the start of the query set.|The minimum value is 0.The default value is 0.

|

### Example

Here's an example to ensure that the results are limited by final size - skipping the first 28 results and returning the next 50.

```
"paging": {
  "maxItems": "50",
  "skipCount": "28"
}
```

## include {#include}

The `include` element returns additional information about the node.

The following optional fields can be requested:

-   `properties`
-   `aspectNames`
-   `path`
-   `isLink`
-   `allowableOperations`
-   `association`
-   `isLocked`
-   `permissions`

### Example

This example uses the `include` JSON body parameter to return additional information in the standard response. This works in the same way as in the `/nodes/{nodeId}/children` method in the core API. For example:

```
"include": ["aspectNames", "properties", "isLink"]
```

## includeRequest {#includeRequest}

To include the original request in the response, set `includeRequest` to `true` in the JSON body. The default value is `false`.

### Examples

**Example 1:** Let's consider an example to shows the use of `includeRequest` parameter in the JSON body. There is also a request for a particular type of mimetype, plain text.

```
{
  "query": {
      "query": "name:*"
  },
  "includeRequest": true,
  "facetFormat": "V2",
  "facetQueries": [
     {"query": "content.size:[o TO 102400]", "label": "small", "group": "size"},
     {"query": "content.size:[102400 TO 1048576]", "label": "medium", "group": "size"},
     {"query": "content.size:[1048576 TO 16777216]", "label": "large", "group": "size"}
  ],
  "filterQueries": [{"query": "content.mimetype:\"text/plain\""}],
  "facetFields": {"facets": [{"field": "content.mimetype"}]}
}
```

**Response**

```
"request": {
                "query": {
                    "query": "name:*"
                },
                "filterQueries": [
                    {
                        "query": "content.mimetype:\"text/plain\""
                    }
                ],
                "facetFields": {
                    "facets": [
                        {
                            "field": "content.mimetype",
                            "missing": false,
                            "offset": 0,
                            "mincount": 1,
                            "facetEnumCacheMinDf": 0
                        }
                    ]
                },
                "facetQueries": [
                    {
                        "query": "content.size:[o TO 102400]",
                        "label": "small",
                        "group": "size"
                    },
                    {
                        "query": "content.size:[102400 TO 1048576]",
                        "label": "medium",
                        "group": "size"
                    },
                    {
                        "query": "content.size:[1048576 TO 16777216]",
                        "label": "large",
                        "group": "size"
                    }
                ],
                "facetFormat": "V2"
            }
        },
```

**Example 2:** Additionally, you can use `mimetype()` with `facetFields` to group `content.mimetype` into logical groupings that are easy to understand, such as document, image, and spread sheet. For example:

```
{
  "query": {
      "query": "name:*"
  },
  "includeRequest": true,
  "facetFormat": "V2",
  "facetQueries": [
     {"query": "content.size:[o TO 102400]", "label": "small", "group": "size"},
     {"query": "content.size:[102400 TO 1048576]", "label": "medium", "group": "size"},
     {"query": "content.size:[1048576 TO 16777216]", "label": "large", "group": "size"}
  ],
  "facetFields": {"facets": [{"field": "mimetype()"}]}
}
```

**Response**

```
"facets": [
                {
                    "type": "query",
                    "label": "size",
                    "buckets": [
                        {
                            "label": "small",
                            "filterQuery": "content.size:[o TO 102400]",
                            "metrics": [
                                {
                                    "type": "count",
                                    "value": {
                                        "count": 192
                                    }
                                }
                            ]
                        },
                        ...
                        {
                            "label": "medium",
                            "filterQuery": "content.size:[102400 TO 1048576]",
                            "metrics": [
                                {
                                    "type": "count",
                                    "value": {
                                        "count": 20
                                    }
                                }
                            ]
                        }
                    ]
                },
                {
                    "type": "field",
                    "label": "mimetype()",
                    "buckets": [
                        {
                            "label": "image",
                            "filterQuery": "mimetype():\"image\"",
                            "metrics": [
                                {
                                    "type": "count",
                                    "value": {
                                        "count": "48"
                                    }
                                }
                            ]
                        },
                        {
                            "label": "other",
                            "filterQuery": "mimetype():\"other\"",
                            "metrics": [
                                {
                                    "type": "count",
                                    "value": {
                                        "count": "13"
                                    }
                                }
                            ]
                        },
                        {
                            "label": "web",
                            "filterQuery": "mimetype():\"web\"",
                            "metrics": [
                                {
                                    "type": "count",
                                    "value": {
                                        "count": "28"
                                    }
                                }
                            ]
                        },
                        {
                            "label": "document",
                            "filterQuery": "mimetype():\"document\"",
                            "metrics": [
                                {
                                    "type": "count",
                                    "value": {
                                        "count": "121"
                                    }
                                }
                            ]
                        },
```

## fields {#fields}

The `fields` element specifies a list of field names. Use this parameter to restrict the fields returned within a response, for example, if you want to save on the overall bandwidth. The list applies to a returned individual entity or entries within a collection.

If the `include` element is used along with the `field` element, the fields specified in `include` are returned in addition to those specified in the `fields` element.

### Example

The `field` element works in the same way as in the `/nodes/{nodeId}/children` method in the core API. For example:

```
"fields": ["id", "name", "search"]
```

## sort {#sort}

The `sort` element lets you sort the results of a query. It specifies an array of sort specifications. The array order defines the ordering precedence.

### Parameters

The parameters for the `sort` element are:

|Parameter|Type|Description|Default value|
|---------|----|-----------|-------------|
|`type`|String|This specifies how to order - either by using a field or based on the position of the document in the index, or by score/relevance.|The default value is `FIELD`.|
|`field`|String|The name of the field.| |
|`ascending`|Boolean|The sorting order.The ordering of nulls is determined by the Solr configuration.

|The default value is `false`.|

### Example

Example of sorting the result:

```
"sort": [{"type":"FIELD", "field":"cm:description", "ascending":"true"}]
```

> **Note:** The `sort` element is not supported for CMIS queries.

## templates {#templates}

CMIS `CONTAINS()` now supports templates. The `templates` element specifies the templates used for query expansion. A template is a way to define and abstract complex queries from the user.

It is similar to the `dismax` query parser in Solr but more powerful because a template can be treated as a field. Any number of templates are allowed. Template definitions cannot be circular.

For example, a template called `WOOF` defined as `%(cm:name cm:title)` allows `WOOF:example` to generate `cm:name:example cm:name:example`.

### Parameters

The parameters for the `templates` element are:

|Parameter|Type|Description|Default value|
|---------|----|-----------|-------------|
|`name`|String|The name of the template.|The default search language is `afts` but `cmis` and `lucene` are also supported. See [Alfresco Full Text Search Reference]({% link content-services/5.2/develop/alfresco-full-text-search-ref.md %}#alfresco-full-text-search-reference).|
|`template`|String|The template itself.| |

### Examples

**Example 1:** Here's an example of specifying the template using the `templates` JSON body parameter:

```
"templates": [{"name": "_PERSON","template": "|%firstName OR |%lastName OR |%userName"},
              {"name": "mytemplate","template": "%cm:content"}]
```

**Example 2:** Here's an example of templates in CMIS `CONTAINS()`:

```
{
  "query": {
      "language": "cmis",
      "query": "select * from cmis:document where CONTAINS('alfresco')"
  },
  "include": ["properties"],
   "templates": [
    {
      "name": "TEXT",
      "template": "%cmis:name OR %cmis:description^200"
    }
  ]
}
```

In the above example, we have specified:

```
select * from cmis:document where CONTAINS('alfresco')
```

Previously, you could redefine what `alfresco` meant and the query will look in the `TEXT`, which is the default field.

Now, you can redefine `TEXT` to actually mean a name and a description, and if it matches the description then it should be given a higher relevance score. Here's the response to the query:

```
{
    "list": {
        "pagination": {
            "count": 67,
            "hasMoreItems": false,
            "totalItems": 67,
            "skipCount": 0,
            "maxItems": 100
        },
        "context": {},
        "entries": [
            {
                "entry": {
                    "isFile": true,
                    "createdByUser": {
                        "id": "System",
                        "displayName": "System"
                    },
                    "modifiedAt": "2017-06-21T09:38:10.077+0000",
                    "nodeType": "cm:content",
                    "content": {
                        "mimeType": "text/plain",
                        "mimeTypeName": "Plain Text",
                        "sizeInBytes": 9148,
                        "encoding": "UTF-8"
                    },
                    "parentId": "f4dfccca-baae-42cb-8d95-cefd0701d774",
                    "createdAt": "2017-06-21T09:38:10.077+0000",
                    "isFolder": false,
                    "search": {
                        "score": 0.76890534
                    },
                    "modifiedByUser": {
                        "id": "System",
                        "displayName": "System"
                    },
                    "name": "activities-email_es.ftl",
                    "location": "nodes",
                    "id": "f8607f66-5b1e-43b4-8458-d340f2d4462d",
                    "properties": {
                        "cm:title": "activities-email_es.ftl",
                        "app:editInline": true,
                        "cm:description": "Email template used to generate the activities email for Alfresco Share - Spanish version"
                    }
                }
            },
            {
                "entry": {
                    "isFile": true,
                    "createdByUser": {
                        "id": "System",
                        "displayName": "System"
                    },
                    "modifiedAt": "2017-06-21T09:38:11.473+0000",
                    "nodeType": "cm:content",
                    "content": {
                        "mimeType": "text/plain",
                        "mimeTypeName": "Plain Text",
                        "sizeInBytes": 6069,
                        "encoding": "UTF-8"
                    },
                    "parentId": "f7217cfd-6ced-489c-af9f-c92884bf0e00",
                    "createdAt": "2017-06-21T09:38:11.473+0000",
                    "isFolder": false,
                    "search": {
                        "score": 0.76890534
                    },
                    "modifiedByUser": {
                        "id": "System",
                        "displayName": "System"
                    },
                    "name": "invite-email.html.ftl",
                    "location": "nodes",
                    "id": "eb2592af-0dad-4acb-ac78-a41674ed51ce",
                    "properties": {
                        "cm:title": "invite-email.html.ftl",
                        "app:editInline": true,
                        "cm:description": "Email template used to generate the invite email for Alfresco Share - Default version"
                    }
                }
            },
            ...
            {
                "entry": {
                    "isFile": true,
                    "createdByUser": {
                        "id": "System",
                        "displayName": "System"
                    },
                    "modifiedAt": "2017-06-21T09:38:12.278+0000",
                    "nodeType": "cm:content",
                    "content": {
                        "mimeType": "text/plain",
                        "mimeTypeName": "Plain Text",
                        "sizeInBytes": 1106,
                        "encoding": "UTF-8"
                    },
                    "parentId": "6f2e473b-11e1-4dde-b17e-0b0cd8690733",
                    "createdAt": "2017-06-21T09:38:12.278+0000",
                    "isFolder": false,
                    "search": {
                        "score": 0.0017449327
                    },
                    "modifiedByUser": {
                        "id": "System",
                        "displayName": "System"
                    },
                    "name": "emailbody_textplain_alfresco_zh_CN.ftl",
                    "location": "nodes",
                    "id": "df5f4f97-1825-4764-bdc7-e44f65f6d13b",
                    "properties": {
                        "cm:title": "emailbody_textplain_alfresco_zh_CN.ftl",
                        "app:editInline": true,
                        "cm:description": "Email template used to generate the \"multipart/alternative\" IMAP message body
                         (\"text/plain\" part) - Simplified Chinese version"
                    }
                }
            }
        ]
    }
}
```

### Field Boosts

Field boosts changes the importance of different fields in a query. It provides a higher relevance score to a field.

**Example:** The following example shows that you can boost `content` relative to other fields by adding `^200` to `cm:content`.

```
{
    "query": {
        "language": "afts",
        "query": "WOOF:alfresco"
    },
    "include": ["properties"],
    "templates": [
        {
            "name": "WOOF",
            "template": "(%cm:name OR %cm:content^200 OR %cm:title OR %cm:description) AND TYPE:content"
        }
    ]
}
```

**Response**: In the response, the matching content will carry more weight than the matching name, title, or description.

```
{
    "list": {
        "pagination": {
            "count": 100,
            "hasMoreItems": true,
            "totalItems": 103,
            "skipCount": 0,
            "maxItems": 100
        },
        "context": {},
        "entries": [
            {
                "entry": {
                    "isFile": true,
                    "createdByUser": {
                        "id": "System",
                        "displayName": "System"
                    },
                    "modifiedAt": "2017-06-21T09:38:11.773+0000",
                    "nodeType": "**cm:content**",
                    "content": {
                        "mimeType": "text/plain",
                        "mimeTypeName": "Plain Text",
                        "sizeInBytes": 1067,
                        "encoding": "UTF-8"
                    },
                    "parentId": "6f2e473b-11e1-4dde-b17e-0b0cd8690733",
                    "createdAt": "2017-06-21T09:38:11.773+0000",
                    "isFolder": false,
                    "search": {
                        "score": 0.36432934
                    },
                    "modifiedByUser": {
                        "id": "System",
                        "displayName": "System"
                    },
                    "name": "emailbody_textplain_share.ftl",
                    "location": "nodes",
                    "id": "a88e162c-4dfa-4561-a67d-fae54f16b033",
                    "properties": {
                        "cm:title": "emailbody_textplain_share.ftl",
                        "app:editInline": true,
                        "cm:description": "Email template used to generate the \"multipart/alternative\" IMAP message body 
                         (\"text/plain\" part) for Alfresco Share - Default version"
                    }
                }
            },
            {
                "entry": {
                    "isFile": true,
                    "createdByUser": {
                        "id": "System",
                        "displayName": "System"
                    },
                    "modifiedAt": "2017-06-21T09:38:11.824+0000",
                    "nodeType": "**cm:content**",
                    "content": {
                        "mimeType": "text/plain",
                        "mimeTypeName": "Plain Text",
                        "sizeInBytes": 1091,
                        "encoding": "UTF-8"
                    },
                    "parentId": "6f2e473b-11e1-4dde-b17e-0b0cd8690733",
                    "createdAt": "2017-06-21T09:38:11.824+0000",
                    "isFolder": false,
                    "search": {
                        "score": 0.36432934
                    },
                    "modifiedByUser": {
                        "id": "System",
                        "displayName": "System"
                    },
                    "name": "emailbody_textplain_share_de.ftl",
                    "location": "nodes",
                    "id": "3d02664c-87c7-4534-911c-61ec0c38daae",
                    "properties": {
                        "cm:title": "emailbody_textplain_share_de.ftl",
                        "app:editInline": true,
                        "cm:description": "Email template used to generate the \"multipart/alternative\" IMAP message body 
                         (\"text/plain\" part) for Alfresco Share - German version"
                    }
                }
            },
            ...
            {
                "entry": {
                    "isFile": true,
                    "createdByUser": {
                        "id": "System",
                        "displayName": "System"
                    },
                    "modifiedAt": "2017-06-21T09:38:12.230+0000",
                    "nodeType": "**cm:content**",
                    "content": {
                        "mimeType": "text/plain",
                        "mimeTypeName": "Plain Text",
                        "sizeInBytes": 1330,
                        "encoding": "UTF-8"
                    },
                    "parentId": "6f2e473b-11e1-4dde-b17e-0b0cd8690733",
                    "createdAt": "2017-06-21T09:38:12.230+0000",
                    "isFolder": false,
                    "search": {
                        "score": 0.0046951687
                    },
                    "modifiedByUser": {
                        "id": "System",
                        "displayName": "System"
                    },
                    "name": "emailbody_textplain_alfresco_ru.ftl",
                    "location": "nodes",
                    "id": "f208d4c1-0b5a-4cf1-b9a0-62aaa107a4ff",
                    "properties": {
                        "cm:title": "emailbody_textplain_alfresco_ru.ftl",
                        "app:editInline": true,
                        "cm:description": "Email template used to generate the \"multipart/alternative\" IMAP message body 
                         (\"text/plain\" part) - Russian version"
                    }
                }
            }
        ]
    }
}
```

## defaults {#defaults}

The `defaults` element specifies the common query defaults that are not usually changed.

### Parameters

The parameters that can be used to set the default/implicit `AND` or `OR` behaviour are:

|Parameter|Type|Description|Default value|
|---------|----|-----------|-------------|
|`textAttributes`|String|A list of query fields/properties used to expand `TEXT:` queries.You can include all content properties using `d:content` or list all individual content properties or types. As more terms are included, the query size, complexity, memory impact, and query time will increase.

|The default value is `cm:content`.

|
|`defaultFTSOperator`|String|The default way to combine query parts when `AND` or `OR` is not explicitly stated.It also includes `!`, `-`, `+`, `one`, `two`, and `three`.

|The default value is `AND`.

|
|`defaultFTSFieldOperator`|String|The default way to combine query parts in field query groups when `AND` or `OR` is not explicitly stated. It also includes `!`, `-`, `+`, `FIELD:` (`one`, `two`, and `three`).

|The default value is `AND`.

|
|`namespace`|String|This is the default name space to use, if the name space is not already specified.|The default value is `default: cm`.

|
|`defaultFieldName`|String| |The default value is `TEXT`.

|

### Example

Example of specifying the defaults by using the `defaults` JSON body parameter:

```
"defaults": {
  "textAttributes": [
    "cm:content", "cm:name"
  ],
  "defaultFTSOperator": "AND",
  "defaultFTSFieldOperator": "OR",
  "namespace": "cm",
  "defaultFieldName": "PATH"
}
```

## timezone {#timezone}

This specifies a valid timezone id supported by `@see java.time.ZoneId`.

### Example

```
"timezone": "string"
```

## filterQueries {#filterqueries}

The `filterQueries` also support multi-select facets to enable building complex `filterQueries`. It limits the result found and specifies the constraints that apply to the results set but do not affect the score or the rank of the results found by the query.

### Parameters

The parameters for the `filterQueries` element are:

|Parameter|Type|Description|
|---------|----|-----------|
|`query`|String|The filter query expression. For multi-select facets, selected facets must be ordered together.|
|`tags`|String|The tags used exclude the filters from facet evaluation for multi-select facet support.|

### Example

In the following example, we will use the `queries` option to specify multiple mimetypes.

With multi-select facet, you must use `exclude` in `facetFields` so that `filterQueries` is not used as a part of faceting.

```
{
  "query": {
      "query": "name:*"
  },
  "includeRequest": true,
  "facetFormat": "V2",
  "facetQueries": [
     {"query": "content.size:[o TO 102400]", "label": "small", "group": "size"},
     {"query": "content.size:[102400 TO 1048576]", "label": "medium", "group": "size"},
     {"query": "content.size:[1048576 TO 16777216]", "label": "large", "group": "size"}
  ],
  "filterQueries": [{"queries": ["content.mimetype:\"text/plain\"", "content.mimetype:\"image/png\""], "tags": ["exclude"]}],
  "facetFields": {"facets": [{"field": "content.mimetype", "excludeFilters":["exclude"]}]}
}
```

**Response**

The response will filter everything out and display results for mimetype - `text/plain` and `image/png`.

```
"facets": [
                {
                    "type": "query",
                    "label": "size",
                    "buckets": [
                        {
                            "label": "small",
                            "filterQuery": "content.size:[o TO 102400]",
                            "metrics": [
                                {
                                    "type": "count",
                                    "value": {
                                        "count": 147
                                    }
                                }
                            ]
                        },
                        ...
                        {
                            "label": "medium",
                            "filterQuery": "content.size:[102400 TO 1048576]",
                            "metrics": [
                                {
                                    "type": "count",
                                    "value": {
                                        "count": 11
                                    }
                                }
                            ]
                        }
                    ]
                },
                {
                    "type": "field",
                    "label": "content.mimetype",
                    "buckets": [
                        {
                            "label": "text/plain",
                            "filterQuery": "content.mimetype:\"text/plain\"",
                            "display": "Plain Text",
                            "metrics": [
                                {
                                    "type": "count",
                                    "value": {
                                        "count": "120"
                                    }
                                }
                            ]
                        },
                        {
                            "label": "image/png",
                            "filterQuery": "content.mimetype:\"image/png\"",
                            "display": "PNG Image",
                            "metrics": [
                                {
                                    "type": "count",
                                    "value": {
                                        "count": "38"
                                    }
                                }
                            ]
                        },
```

## facetQueries {#facetQueries}

The `facetQueries` element specifies the facet queries to include. These queries are used to generate a single-facet value based on the number of documents that matched the overall query and the facet query.

### Parameters

The parameters for the `facetQueries` element are:

|Parameter|Type|Description|
|---------|----|-----------|
|`query`|String|A facet query.|
|`label`|String|A label to include in place of the facet query.|

### Ungrouped facet queries

-   Between Alfresco Content Services 5.2.0 and Alfresco Content Services 5.2.1:

    Executing ungrouped facet queries returned individual facet query. You can use `label` to find and group them together but that doesn't lend itself in the same way as behaving between different type of faceting.

    **Example:** Here's an example of three ungrouped facet queries. The search request will look for content nodes with any name. We also specify that we want to know how many of the results are small, medium, and large.

    ```
    {
      "query": {
          "query": "name:*"
      },
      "facetQueries": [
         {"query": "content.size:[o TO 102400]", "label": "small"},
         {"query": "content.size:[102400 TO 1048576]", "label": "medium"},
         {"query": "content.size:[1048576 TO 16777216]", "label": "large"}
    ]
    }
    ```

    **Response:**

    The response contains a `facetQueries` object containing the count we requested. It also has an entry for each query supplied in the result.

    ```
    {
        "list": {
            "pagination": {
                "count": 100,
                "hasMoreItems": true,
                "totalItems": 816,
                "skipCount": 0,
                "maxItems": 100
            },
            "context": {
                "facetQueries": [
                    {
                        "label": "small",
                        "filterQuery": "content.size:[o TO 102400]",
                        "count": 192
                    },
                    {
                        "label": "large",
                        "filterQuery": "content.size:[1048576 TO 16777216]",
                        "count": 3
                    },
                    {
                        "label": "medium",
                        "filterQuery": "content.size:[102400 TO 1048576]",
                        "count": 20
                    }
                ]
            },
    ```

-   From Alfresco Content Services 5.2.1 onwards:

    You can get the same new format and behaviour as with [grouping facet queries](#facetqueries) by specifying an explicit flag, `"facetFormat": "V2"`, as shown in the example below:

    ```
    {
      "query": {
          "query": "name:*"
      },
      "facetFormat": "V2",
      "facetQueries": [
         {"query": "content.size:[o TO 102400]", "label": "small"},
         {"query": "content.size:[102400 TO 1048576]", "label": "medium"},
         {"query": "content.size:[1048576 TO 16777216]", "label": "large"}
    ]
    }
    ```

    **Response:**

    ```
    "facets": [
                    {
                        "type": "query",
                        "buckets": [
                            {
                                "label": "small",
                                "filterQuery": "content.size:[o TO 102400]",
                                "metrics": [
                                    {
                                        "type": "count",
                                        "value": {
                                            "count": 192
                                        }
                                    }
                                ]
                            },
    ```


### Grouping facet queries

Another way of doing this is by grouping the queries together in the same group by using the `group` label as shown below:

```
{
        "query": {
        "query": "name:*"
        },
        "facetQueries": [
        {"query": "content.size:[o TO 102400]", "label": "small", "group": "size"},
        {"query": "content.size:[102400 TO 1048576]", "label": "medium", "group": "size"},
        {"query": "content.size:[1048576 TO 16777216]", "label": "large", "group": "size"}
        ]
        }
```

The above query returns the results as faceted field grouped under the label `size`. The response shows a new format of grouping facets as type, label, and bucket. Each individual bucket has a label and a `filterQuery` that you can use to apply the condition for that particular bucket. It also returns the metrics in terms of count and its value. So, all these things are grouped together in the same facet (in the same way as [facetFields](#facetfields).

```
"facets": [
                                {
                                "type": "query",
                                "label": "size",
                                "buckets": [
                                {
                                "label": "small",
                                "filterQuery": "content.size:[o TO 102400]",
                                "metrics": [
                                {
                                "type": "count",
                                "value": {
                                "count": 192
                                }
                                }
                                ]
                                },
                                {
                                "label": "large",
                                "filterQuery": "content.size:[1048576 TO 16777216]",
                                "metrics": [
                                {
                                "type": "count",
                                "value": {
                                "count": 3
                                }
                                }
                                ]
                                },
                                {
                                "label": "medium",
                                "filterQuery": "content.size:[102400 TO 1048576]",
                                "metrics": [
                                {
                                "type": "count",
                                "value": {
                                "count": 20
                                }
                                }
                                ]
                                }
                                ]
                                }
                                ]
```

**General Example**

-   Here's an example of a complete query for faceting via the `content.size` field:

    ```
    {
                                    "query": {
                                    "query": "presentation",
                                    "language": "afts"
                                    },
                                    "facetQueries": [
                                    {"query": "content.size:[0 TO 10240]", "label": "xtra small"},
                                    {"query": "content.size:[10240 TO 102400]", "label": "small"},
                                    {"query": "content.size:[102400 TO 1048576]", "label": "medium"},
                                    {"query": "content.size:[1048576 TO 16777216]", "label": "large"},
                                    {"query": "content.size:[16777216 TO 134217728]", "label": "xtra large"},
                                    {"query": "content.size:[134217728 TO MAX]", "label": "XX large"}
                                    ],
                                    "facetFields": {"facets": [{"field": "'content.size'"}]}
                                    }
    ```

    The response will contain a matching `context` section and the `label` will match the facet query.

    ```
    "context": {
                                    "facetQueries": [
                                    { "label": "small","count": 2 },
                                    { "label": "large","count": 0 },
                                    { "label": "xtra small","count": 5 },
                                    { "label": "xtra large","count": 56},
                                    { "label": "medium","count": 4 },
                                    { "label": "XX large", "count": 1 }
                                    ]
                                    },
    ```

-   You can specify several facet queries using the `facetQueries` JSON body parameter, for example:

    ```
    "facetQueries": [{"query": "created:2016","label": "CreatedThisYear"}]
    ```

    The response will contain a matching `context` section and the `label` will match the facet query.

    ```
    "context": {
                                    "facetQueries": [
                                    {"label": "CreatedThisYear","count": 3}
                                    ]
                                    },
    ```


### Easy filter queries

You can easily add filter queries to a request where each facet includes the filter to use. The response displays both the field facet and the query facet. The search request will look for content nodes with any name. We also specify that we want to know how many of the results are small, medium, and large. Additionally, we are also asking for the `content.mimetype` `facetField` to be included in the response.

```
{
  "query": {
      "query": "name:*"
  },
  "facetFormat": "V2",
  "facetQueries": [
     {"query": "content.size:[o TO 102400]", "label": "small", "group": "size"},
     {"query": "content.size:[102400 TO 1048576]", "label": "medium", "group": "size"},
     {"query": "content.size:[1048576 TO 16777216]", "label": "large", "group": "size"}
  ],
  "facetFields": {"facets": [{"field": "content.mimetype"}]}
}
```

**Response**

```
"context": {
            "facets": [
                {
                    "type": "query",
                    "label": "size",
                    "buckets": [
                        {
                            "label": "small",
                            "filterQuery": "content.size:[0 TO 102400]",
                            "metrics": [
                                {
                                    "type": "count",
                                    "value": {
                                        "count": 192
                                    }
                                }
                            ]
                        },
                       ...
                {
                    "type": "field",
                    "label": "content.mimetype",
                    "buckets": [
                        {
                            "label": "text/plain",
                            "filterQuery": **"content.mimetype:\"text/plain\""**,
                            "display": "Plain Text",
                            "metrics": [
                                {
                                    "type": "count",
                                    "value": {
                                        "count": "120"
                                    }
                                }
                            ]
                        },
```

**Easy filter queries - Adding a filter:**

In this example, we will add a filter by taking the string from the `filterQuery` in the above response and adding it to the `filterQueries` in the request, and constraining it to that particular selection in your facet.

For example, from the above query's [response](#facetqueries), locate the `[filterQuery](#facetqueries)` of the `content.mimetype` format. Now, copy the string (`"content.mimetype:\"text/plain\""`) as it appears from the `filterQuery` and use that by adding `filterQueries` in the query.

```
"filterQueries": [{"query": "content.mimetype:\"text/plain\""}],
```

**Complete query:**

```
{
  "query": {
      "query": "name:*"
  },
  "facetFormat": "V2",
  "facetQueries": [
     {"query": "content.size:[0 TO 102400]", "label": "small", "group": "size"},
     {"query": "content.size:[102400 TO 1048576]", "label": "medium", "group": "size"},
     {"query": "content.size:[1048576 TO 16777216]", "label": "large", "group": "size"}
  ],
  **"filterQueries": [{"query": "content.mimetype:\"text/plain\""}],**
  "facetFields": {"facets": [{"field": "content.mimetype"}]}
}
```

**Response:** The results will come back constrained and display the total count of plain text files, along with their details as shown below:

```
"facets": [
                {
                    "type": "query",
                    "label": "size",
                    "buckets": [
                        {
                            "label": "small",
                            "filterQuery": "content.size:[0 TO 102400]",
                            "metrics": [
                                {
                                    "type": "count",
                                    "value": {
                                        "count": 120
                                    }
                                }
                            ]
                        },
                       ...
                {
                    "type": "field",
                    "label": "content.mimetype",
                    "buckets": [
                        {
                            "label": "text/plain",
                            "filterQuery": "content.mimetype:\"text/plain\"",
                            "display": "Plain Text",
                            "metrics": [
                                {
                                    "type": "count",
                                    "value": {
                                        "count": "120"
                                    }
                                }
                            ]
                        }
                    ]
                }
            ]
        },
        "entries": [
            {
                "entry": {
                    "isFile": true,
                    "createdByUser": {
                        "id": "System",
                        "displayName": "System"
                    },
                    "modifiedAt": "2017-06-21T09:38:11.612+0000",
                    "nodeType": "cm:content",
                    "content": {
                        "mimeType": "text/plain",
                        "mimeTypeName": "Plain Text",
                        "sizeInBytes": 5301,
                        "encoding": "UTF-8"
                    },
                    "parentId": "f7217cfd-6ced-489c-af9f-c92884bf0e00",
                    "createdAt": "2017-06-21T09:38:11.612+0000",
                    "isFolder": false,
                    "search": {
                        "score": 1.1348674
                    },
                    "modifiedByUser": {
                        "id": "System",
                        "displayName": "System"
                    },
                    "name": "invite-email-add-direct.html_de.ftl",
                    "location": "nodes",
                    "id": "d1799aae-d80a-44fe-87ab-ede249c7e1db"
                }
            },
```

**Easy filter queries - with request**

To include the original request in the response, use the `includeRequest` parameter in the JSON body. For example:

```
{
  "query": {
      "query": "name:*"
  },
  "includeRequest": true,
  "facetFormat": "V2",
  "facetQueries": [
     {"query": "content.size:[o TO 102400]", "label": "small", "group": "size"},
     {"query": "content.size:[102400 TO 1048576]", "label": "medium", "group": "size"},
     {"query": "content.size:[1048576 TO 16777216]", "label": "large", "group": "size"}
  ],
  "filterQueries": [{"query": "content.mimetype:\"text/plain\""}],
  "facetFields": {"facets": [{"field": "content.mimetype"}]}
}
```

**Response**:

The response returns a `request` object which displays exactly what you had requested for.

```
 "context": {
            "facets": [
                {
                    "type": "query",
                    "label": "size",
                    "buckets": [
                        {
                            "label": "small",
                            "filterQuery": "content.size:[o TO 102400]",
                            "metrics": [
                                {
                                    "type": "count",
                                    "value": {
                                        "count": 120
                                    }
                                }
                            ]
                        },
                        {
                            "label": "large",
                            "filterQuery": "content.size:[1048576 TO 16777216]",
                            "metrics": [
                                {
                                    "type": "count",
                                    "value": {
                                        "count": 0
                                    }
                                }
                            ]
                        },
                        {
                            "label": "medium",
                            "filterQuery": "content.size:[102400 TO 1048576]",
                            "metrics": [
                                {
                                    "type": "count",
                                    "value": {
                                        "count": 0
                                    }
                                }
                            ]
                        }
                    ]
                },
                {
                    "type": "field",
                    "label": "content.mimetype",
                    "buckets": [
                        {
                            "label": "text/plain",
                            "filterQuery": "content.mimetype:\"text/plain\"",
                            "display": "Plain Text",
                            "metrics": [
                                {
                                    "type": "count",
                                    "value": {
                                        "count": "120"
                                    }
                                }
                            ]
                        }
                    ]
                }
            ],
            **"request":** {
                "query": {
                    "query": "name:*"
                },
                "filterQueries": [
                    {
                        "query": "content.mimetype:\"text/plain\""
                    }
                ],
                "facetFields": {
                    "facets": [
                        {
                            "field": "content.mimetype",
                            "missing": false,
                            "offset": 0,
                            "mincount": 1,
                            "facetEnumCacheMinDf": 0
                        }
                    ]
                },
                "facetQueries": [
                    {
                        "query": "content.size:[o TO 102400]",
                        "label": "small",
                        "group": "size"
                    },
                    {
                        "query": "content.size:[102400 TO 1048576]",
                        "label": "medium",
                        "group": "size"
                    },
                    {
                        "query": "content.size:[1048576 TO 16777216]",
                        "label": "large",
                        "group": "size"
                    }
                ],
                "facetFormat": "V2"
            }
        },
```

## facetFields {#facetFields}

The `facetFields` element specifies the simple facet fields to include in a query. These facets are generated by counting field values for all results that match the query. This is the default behaviour of all the filter queries applied.

### Parameters

The parameter for the `facetFields` element is:

|Parameter|Type|Description|
|---------|----|-----------|
|`facets`|String|A simple facet field that defines specific fields on which to facet.|

The filters used with the `facets` parameter are:

|Filters|Type|Description|
|-------|----|-----------|
|`field`|String|This specifies the facet field.|
|`label`|String|This specifies the label to include in place of the facet field.|
|`prefix`|String|This restricts the possible constraints to only indexed values with a specified prefix.|
|`sort`|String|The available values are `COUNT` and `INDEX`.|
|`method`|String|The available values are `ENUM` and `FC`.|
|`missing`|boolean|When true, it counts the results that match the query but which have no facet value for the field (in addition to the term-based constraints). The default value is `false`.|
|`limit`|Integer| |
|`offset`|Integer| |
|`mincount`|Integer|This specifies the minimum count required for a facet field to be included in the response. The default value is `1`.|
|`facetEnumCacheMinDf`|Integer| |
|`excludeFilters`|String|This specifies that the filter queries with tags listed here will not be included in facet counts. This is used for multi-select faceting.|

> **Note:** Only `facetFields` support `exclude` for multi-select facets. `Range`, `pivot`, or `intervals` do no support exclude.

### Examples

**Example 1:** You can specify several facet fields using the `facetFields` JSON body parameter, for example:

```
"facetFields": {"facets": [{"field": "creator", "mincount": 1}, {"field": "modifier", "mincount": 1}]}
```

**Response:** The result contains a matching `context` section and the `label` will match the facet field.

```
"context": {
   "facetsFields": [
     {  "label": "creator",
        "buckets": [
          { "label": "System", "count": 75 },
          { "label": "mjackson", "count": 5 }
        ]},
     {  "label": "modifier",
        "buckets": [
          { "label": "System", "count": 72 },
          { "label": "mjackson", "count": 5 },
          { "label": "admin", "count": 3 }
        ]}
   ]
},
```

**Example 2:** Instead of nesting facet fields in a [pivot](#pivots), you can also use flat facet, as shown below:

```
{
   "query": {
      "query": "name:*" 
   },
   "facetFields": {
      "facets": [
         {"field": "content.mimetype", "label": "mimetype"},
         {"field": "SITE", "label": "site"},
         {"field": "TYPE", "label": "type"}
      ]
    }
}
```

**Response:**

```
"facetsFields": [
                {
                    "label": "type",
                    "buckets": [
                        {
                            "label": "{http://www.alfresco.org/model/content/1.0}category",
                            "filterQuery": "TYPE:\"{http://www.alfresco.org/model/content/1.0}category\"",
                            "count": 335
                        },
                      ...
                        {
                            "label": "{http://www.alfresco.org/model/system/1.0}store_root",
                            "filterQuery": "TYPE:\"{http://www.alfresco.org/model/system/1.0}store_root\"",
                            "count": 1
                        },
                        {
                            "label": "{http://www.alfresco.org/model/transfer/1.0}transferGroup",
                            "filterQuery": "TYPE:\"{http://www.alfresco.org/model/transfer/1.0}transferGroup\"",
                            "count": 1
                        }
                    ]
                },
                {
                    "label": "site",
                    "buckets": [
                        {
                            "label": "_REPOSITORY_",
                            "filterQuery": "SITE:\"_REPOSITORY_\"",
                            "count": 711
                        },
                        {
                            "label": "swsdp",
                            "filterQuery": "SITE:\"swsdp\"",
                            "count": 103
                        },
                        {
                            "label": "surf-config",
                            "filterQuery": "SITE:\"surf-config\"",
                            "count": 2
                        }
                    ]
                },
                {
                    "label": "mimetype",
                    "buckets": [
                        {
                            "label": "text/plain",
                            "filterQuery": "content.mimetype:\"text/plain\"",
                            "count": 120,
                            "display": "Plain Text"
                        },
                        {
                            "label": "image/png",
                            "filterQuery": "content.mimetype:\"image/png\"",
                            "count": 38,
                            "display": "PNG Image"
                        },
                        ...
                        {
                            "label": "application/vnd.ms-excel",
                            "filterQuery": "content.mimetype:\"application/vnd.ms-excel\"",
                            "count": 1,
                            "display": "Microsoft Excel"
                        },
                        {
                            "label": "video/mp4",
                            "filterQuery": "content.mimetype:\"video/mp4\"",
                            "count": 1,
                            "display": "MPEG4 Video"
                        }
                    ]
                }
            ]
        },
```

**Example 3:** You can also combine the pivots with flat facets. The way `facets` are done is by taking `facetFields` and giving them a label and then giving them a structure in how you want to combine them together. Similarly, in this example, we are defining the fields and giving them a label by which we want to arrange the results together.

```
{
   "query": {
      "query": "name:*" 
   },
   "facetFields": {
      "facets": [
         {"field": "content.mimetype", "label": "mimetype"},
         {"field": "SITE", "label": "site"},
         {"field": "TYPE", "label": "type"}
      ]
    }
}
```

**Response:** The result shows a `facetField` entry for each label. There's a bucket for `type`, `site`, and `mimetype`.

```
"context": {
            "facetsFields": [
                {
                    "label": "**type**",
                    "buckets": [
                        {
                            "label": "{http://www.alfresco.org/model/content/1.0}category",
                            "filterQuery": "TYPE:\"{http://www.alfresco.org/model/content/1.0}category\"",
                            "count": 335
                        }
                        ...
                        {
                            "label": "{http://www.alfresco.org/model/transfer/1.0}transferGroup",
                            "filterQuery": "TYPE:\"{http://www.alfresco.org/model/transfer/1.0}transferGroup\"",
                            "count": 1
                        }
                    ]
                },
                {
                    "label": "**site**",
                    "buckets": [
                        {
                            "label": "_REPOSITORY_",
                            "filterQuery": "SITE:\"_REPOSITORY_\"",
                            "count": 711
                        },
                        ...
                        {
                            "label": "surf-config",
                            "filterQuery": "SITE:\"surf-config\"",
                            "count": 2
                        }
                    ]
                },
                {
                    "label": "**mimetype**",
                    "buckets": [
                        {
                            "label": "text/plain",
                            "filterQuery": "content.mimetype:\"text/plain\"",
                            "count": 120,
                            "display": "Plain Text"
                        },
                        {
                            "label": "image/png",
                            "filterQuery": "content.mimetype:\"image/png\"",
                            "count": 38,
                            "display": "PNG Image"
                        },
                        ...
                        {
                            "label": "video/mp4",
                            "filterQuery": "content.mimetype:\"video/mp4\"",
                            "count": 1,
                            "display": "MPEG4 Video"
                        }
                    ]
                }
            ]
        },
```

### mimetype()

mimetype() groups `content.mimetype` in the same way as is done for reporting and analytics version 1. It can only be used as a `facetField` and not as a part of `pivot`, as shown in the example below.

**Example:**

```
{
  "query": {
      "query": "name:*"
  },
  "includeRequest": true,
  "facetFormat": "V2",
  "facetQueries": [
     {"query": "content.size:[o TO 102400]", "label": "small", "group": "size"},
     {"query": "content.size:[102400 TO 1048576]", "label": "medium", "group": "size"},
     {"query": "content.size:[1048576 TO 16777216]", "label": "large", "group": "size"}
  ],
  "facetFields": {"facets": [{"field": "mimetype()"}]}
}
```

## facetIntervals {#facetIntervals}

The `facetIntervals` element specifies facet intervals. It is more restrictive but fast range-based faceting. It enables you to control the ranges using `Intervals` and provides much more flexibility on what you get in your ranges. In `intervals`, the ranges don't overlap so you can double-count the entries and use date maths expressions, such as TODAY, THIS WEEK, THIS MONTH, and THIS YEAR.

### Parameters

The parameter for the `facetIntervals` element is:

|Parameter|Description|
|---------|-----------|
|`sets`|Sets the intervals for all fields.|
|`intervals`|Specifies the fields to facet by interval.|

The filters used with the `sets` parameter are:

|Filters|Type|Description|
|-------|----|-----------|
|`label`|String|This specifies the label to use to identify the set.|
|`start`|String|This specifies the start of the range.|
|`end`|String|This specifies the end of the range.|
|`startInclusive`|Boolean|When true, the set will include values greater or equal to `start`. The default value is `true`.|
|`endInclusive`|Boolean|When true, the set will include values less than or equal to `end`. The default value is `true`.|

The filters used with the `intervals` parameter are:

|Filters|Type|Description|
|-------|----|-----------|
|`field`|String|This specifies the field to facet on.|
|`label`|String|This specifies the label to use to identify the field facet.|
|`sets`|String|This restricts the possible constraints to only indexed values with a specified prefix.|

Even though `range` and `intervals` look similar, there is a slight difference between them. For example:

-   Overlapping content: In `range`, you get a series of content and it cannot overlap, except if you are using `include`. With `intervals`, you specify exactly what you want for every interval, so you can have overlapping ranges. You can specify any interval, for example, `TODAY`, `THIS WEEK`, `THIS MONTH`, `LAST YEAR`, and count things more than once. You cannot do this with `range`.
-   Nested query: You can embed a range in another nested pivot but `intervals` cannot be nested.

> **Note:** There is a known issue in Solr 4 with intervals - Label on an interval does not work.

> **Note:** Solr 6 supports text intervals. Make sure you use non-tokenised or interval-based fields with text. Also, intervals are similar to range facet queries and can take advantage of doc values in Solr.

### Examples

**Interval - date:** In this example, we have defined a group of intervals. Each interval contains a label and a field. Within each field is a group of sets that you want to report on. The first set specifies that the query should return results during the year 2016-2017. You can also specify if you want to include the end. The second set specifies that the query should return results according to the specified date maths expression. The third set specifies that the query should return the result according to the wildcard that allows open-ended range. So, this set specifies everything before 2016.

```
{
  "query": {
    "query": "name:*",
    "language": "afts"
  },
  "filterQueries": [{"query": "cm:created:[* TO 2016>"}],
  "facetIntervals": {
    "intervals": [
      {
        
        "field": "cm:created",
          "sets": [
            {
              "label": "lastYear",
              "start": "2016",
              "end": "2017",
              "endInclusive" : false
            },
            {
              "label": "currentYear",
              "start": "NOW/YEAR",
              "end": "NOW/YEAR+1YEAR"
            },
          {
            "label": "earlier",
            "start": "*",
            "end": "2016",
            "endInclusive" : false
          }
        ]
      }
    ]
  }
}
```

**Interval - date - timezone:** By specifying the `timezone` and `locales`, the query adjusts the year based on your timezone. In the following example, the first set explicitly specifies the year range, so the response will bring back intervals based on the dates that you have asked for. In the second set, the Solr date math expression will consider the specified time zone.

```
{
  "query": {
    "query": "name:*",
    "language": "afts"
  },
  "filterQueries": [{"query": "cm:created:[* TO 2016>"}],
   "localization":  
    {
       "timezone": "GMT+6",
       "locales" : [ "fr", "en" ]                
    },
  "facetIntervals": {
    "intervals": [
      {
        "label" : "TheCreated",
        "field": "cm:created",
          "sets": [
            {
              "label": "lastYear",
              "start": "2016",
              "end": "2017",
              "endInclusive" : false
            },
            {
              "label": "currentYear",
              "start": "NOW/YEAR",
              "end": "NOW/YEAR+1YEAR"
            },
          {
            "label": "earlier",
            "start": "*",
            "end": "2016",
            "endInclusive" : false
          }
        ]
      }
    ]
  }
}
```

**Interval - numeric:** This only works with numbers. In this example, we want to generate intervals that overlap, for example, 0-100, 0-10000, and 110-600. You can also specify `startInclusive` and `endInclusive`. The set(s) defined within `facetIntervals` will apply to all the fields.

```
{
  "query": {
    "query": "name:*"
  },
  "facetIntervals": {
    "sets":[
         { "start": "0", "startInclusive": false, "end": "100", "endInclusive": false, "label":"exclusive"}
     ],
    "intervals" : [ 
         {
           "field": "content.size",
           
           "sets":[
               { "start": "0", "startInclusive": true, "end": "100", "endInclusive": false, "label":"inclusive1"},
               { "start": "0", "startInclusive": true, "end": "10000", "endInclusive": false, "label":"inclusive2"},
               { "start": "110", "startInclusive": true, "end": "600", "endInclusive": true, "label":"inclusive3"}
              ]
         }
    ]
}
}
```

**Interval - text:** Intervals can also be used with text. In this example, we want to query on everything under `name` and filtered for things that start with `b*` even if they are not untokenized. The result is faceted on terms starting with a, b, and c.

```
{
                "query": {
                    "query": "name:*"
                },
                "filterQueries": [
    {
      "query": "=name:b*"
    }
  ],
                
                
                 "facetIntervals": {
    "intervals" : [ 
         {
           "field": "name",
           "sets":[
               { "start": "a", "startInclusive": true, "end": "b", "endInclusive": false},
               { "start": "b", "startInclusive": true, "end": "c", "endInclusive": false},
               { "start": "c", "startInclusive": true, "end": "d", "endInclusive": false}
              ]
         }
    ]
}
}
```

The response returns intervals that are text based.

## pivots {#pivots}

The `pivots` element specifies a list of pivot keys. It enables nested facet fields where you can put any number of single facet fields inside each other so that it becomes a chain of fields.

### Parameters

The parameter for the `pivots` element is:

|Parameter|Description|
|---------|-----------|
|`key`|A key corresponding to a matching field facet label.|

> **Note:** You can't nest intervals in a pivot. Intervals exist separately at the top.

> **Note:** Range and Stats have to be at the end of pivots.

### Example

**Example 1:** In this example, we are combining flat facet and a simple nested pivot section together in the JSON body parameter. The aim is to get a count of each type of `facetField`. The `pivot` section contains a `key` for the top level breakdown, followed by a nested `pivot` section with a `key` for next level of breakdown, and so on.

Simple nested pivots can only have one `key` at each depth.

```
{
   "query": {
      "query": "name:*" 
   },
   "facetFields": {
      "facets": [
         {"field": "content.mimetype", "label": "mimetype"},
         {"field": "SITE", "label": "site"},
         {"field": "TYPE", "label": "type"}
      ]
    },
    "pivots" : [
      {
        "key": "site",
        "pivots": [
          {
            "key": "type",
            "pivots": [
              {
                "key": "mimetype"
              }
              ]
          }
          ]
      }
      ]
}
```

**Response**: In the result, we see that pivot only does the count, just like `facetField` does. We have a **site** at the top level; inside this **site**, there is a sub-facet with another type of `pivot` with a `label` **type**. This corresponds to the second nested pivot in the query. The second-level of nesting shows information on the type of document.

Inside the `pivot` **type**, there is a sub-facet for mimetype. This contains information for every site and every type, a count of each mimetype.

If you want to filter down in to the type, you can use the string from the `filterQuery`. If you want to filter on a particular bucket in this hierarchy, you can take the type and the sites, and add a `filterQuery` for each one of those.

```
"facets": [
                {
                    "type": "pivot",
                    "label": "**site**",
                    "buckets": [
                        {
                            "label": "_REPOSITORY_",
                            "filterQuery": "SITE:\"_REPOSITORY_\"",
                            "metrics": [
                                {
                                    "type": "count",
                                    "value": {
                                        "count": 711
                                    }
                                }
                            ],
                            "**facets**": [
                                {
                                    "type": "**pivot**",
                                    "label": "**type**",
                                    "buckets": [
                                        {
                                            "label": "{http://www.alfresco.org/model/content/1.0}category",
                                            **"filterQuery": "TYPE:\"{http://www.alfresco.org/model/content/1.0}category\"",**
                                            "metrics": [
                                                {
                                                    "type": "count",
                                                    "value": {
                                                        "count": 335
                                                    }
                                                }
                                            ]
                                        },
                                        {
                                            "label": "{http://www.alfresco.org/model/content/1.0}content",
                                            "filterQuery": "TYPE:\"{http://www.alfresco.org/model/content/1.0}content\"",
                                            "metrics": [
                                                {
                                                    "type": "count",
                                                    "value": {
                                                        "count": 141
                                                    }
                                                }
                                            ],
                                            "facets": [
                                                {
                                                    "type": "pivot",
                                                    "label": "mimetype",
                                                    "buckets": [
                                                        {
                                                            "label": "text/plain",
                                                            "filterQuery": "content.mimetype:\"text/plain\"",
                                                            "display": "Plain Text",
                                                            "metrics": [
                                                                {
                                                                    "type": "count",
                                                                    "value": {
                                                                        "count": 120
                                                                    }
                                                                }
                                                            ]
                                                        },
                                                        {
                                                            "label": "application/x-javascript",
                                                            "filterQuery": "content.mimetype:\"application/x-javascript\"",
                                                            "display": "JavaScript",
                                                            "metrics": [
                                                                {
                                                                    "type": "count",
                                                                    "value": {
                                                                        "count": 10
                                                                    }
                                                                }
                                                            ]
                                                        },
                                                        {
                                                            "label": "text/html",
                                                            "filterQuery": "content.mimetype:\"text/html\"",
                                                            "display": "HTML",
                                                            "metrics": [
                                                                {
                                                                    "type": "count",
                                                                    "value": {
                                                                        "count": 6
                                                                    }
                                                                }
                                                            ]
                                                        },
                                                        {
                                                            "label": "text/xml",
                                                            "filterQuery": "content.mimetype:\"text/xml\"",
                                                            "display": "XML",
                                                            "metrics": [
                                                                {
                                                                    "type": "count",
                                                                    "value": {
                                                                        "count": 3
                                                                    }
                                                                }
                                                            ]
                                                        },
                                                        {
                                                            "label": "image/jpeg",
                                                            "filterQuery": "content.mimetype:\"image/jpeg\"",
                                                            "display": "JPEG Image",
                                                            "metrics": [
                                                                {
                                                                    "type": "count",
                                                                    "value": {
                                                                        "count": 2
                                                                    }
                                                                }
                                                            ]
                                                        }
                                                    ]
                                                }
                                            ]
                                        },
```

**Pivots with Stats and Range**

**Example 1:** In this example, we have combination of `facetField` called *site*, some `stats` for *content.size*, some `ranges` for *created* date, and a `pivot` for *site*, including *size* statistics for each site. In the pivots, we specify that we want to query on the sites on the basis of their size.

```
{
   "query": {
      "query": "name:*" 
   },
   "facetFields": {
      "facets": [
         {"field": "SITE", "label": "site"}
      ]
    },
    "stats": [
        {
            "field": "content.size",
            "label": "size",
            "min": true,
            "max": true,
            "stddev": true,
            "missing": true, 
            "sum": true,
            
            "sumOfSquares": true,
            "percentiles": ["1","12.5","25","50","75","99"],
            "distinctValues": false,
            "countDistinct": true,
            "cardinality": true,
            "cardinalityAccuracy": 0.1
      }
      ],
    "ranges":[ 
                {
                    "field": "created",
                    "start": "NOW/YEAR-5YEARS",
                    "end": "NOW/YEAR+1YEAR",
                    "gap": "+1YEAR",
                    "label": "created"
                }],
    "pivots" : [
      {
        "key": "**site**",
        "pivots": [
          {
            "key": "**size**"
          }
          ]
      }
      ]
}
```

**Response:** The result shows site-specific breakdown. It returns a pivot with sites and within each site, we have got all the metrics that come from the stats on size. For example, for a site called REPOSITORY, the results display the breakdown of PERCENTILES that is specific to REPOSITORY, nodes in that site that don't have content, sum, total count of content in that site, max and min content size in the site, and other information.

This information is repeated for each site.

```
 "context": {
            "facets": [
                {
                    "type": "range",
                    "label": "created",
                    "buckets": [
                        {
                            "label": "[2012-01-01T00:00:00Z - 2013-01-01T00:00:00Z)",
                            "filterQuery": "created:[\"2012-01-01T00:00:00Z\" TO \"2013-01-01T00:00:00Z\">",
                            "metrics": [
                                {
                                    "type": "count",
                                    "value": {
                                        "count": "0"
                                    }
                                }
                            ],
                            "bucketInfo": {
                                "startInclusive": "true",
                                "start": "2012-01-01T00:00:00Z",
                                "end": "2013-01-01T00:00:00Z",
                                "endInclusive": "false"
                            }
                        },
                        ...
                        {
                            "label": "[2017-01-01T00:00:00Z - 2018-01-01T00:00:00Z]",
                            "filterQuery": "created:[\"2017-01-01T00:00:00Z\" TO \"2018-01-01T00:00:00Z\"]",
                            "metrics": [
                                {
                                    "type": "count",
                                    "value": {
                                        "count": "686"
                                    }
                                }
                            ],
                            "bucketInfo": {
                                "startInclusive": "true",
                                "start": "2017-01-01T00:00:00Z",
                                "end": "2018-01-01T00:00:00Z",
                                "endInclusive": "true"
                            }
                        }
                    ]
                },
                {
                    "type": "pivot",
                    "label": "site",
                    "buckets": [
                        {
                            "label": "_**REPOSITORY**_",
                            "filterQuery": "SITE:\"_REPOSITORY_\"",
                            "metrics": [
                                {
                                    "type": "count",
                                    "value": {
                                        "count": 711
                                    }
                                }
                            ]
                        },
                        {
                            "label": "swsdp",
                            "filterQuery": "SITE:\"swsdp\"",
                            "metrics": [
                                {
                                    "type": "count",
                                    "value": {
                                        "count": 103
                                    }
                                }
                            ]
                        },
                        {
                            "label": "surf-config",
                            "filterQuery": "SITE:\"surf-config\"",
                            "metrics": [
                                {
                                    "type": "count",
                                    "value": {
                                        "count": 2
                                    }
                                }
                            ]
                        }
                    ]
                },
                {
                    "type": "stats",
                    "label": "size",
                    "buckets": [
                        {
                            "metrics": [
                                {
                                    "type": "missing",
                                    "value": {
                                        "missing": 601
                                    }
                                },
                                {
                                    "type": "sumOfSquares",
                                    "value": {
                                        "sumOfSquares": 30775603176391
                                    }
                                },
                                {
                                    "type": "max",
                                    "value": {
                                        "max": 3737049
                                    }
                                },
                                {
                                    "type": "stddev",
                                    "value": {
                                        "stddev": 370197.67997948296
                                    }
                                },
                                {
                                    "type": "mean",
                                    "value": {
                                        "mean": 82057.55813953489
                                    }
                                },
                                {
                                    "type": "sum",
                                    "value": {
                                        "sum": 17642375
                                    }
                                },
                                {
                                    "type": "countValues",
                                    "value": {
                                        "countValues": 215
                                    }
                                },
                                {
                                    "type": "min",
                                    "value": {
                                        "min": 25
                                    }
                                }
                            ]
                        }
                    ]
                }
            ]
        },
```

This resembles doing a pivot in Microsoft Excel with fields and text values in all columns and measures like, count or average, in the middle.

**Example 2:** Instead of stats, you can also use ranges. In this case, for each site, the results will show a breakdown of when content was created.

```
{
   "query": {
      "query": "name:*" 
   },
   "facetFields": {
      "facets": [
         {"field": "SITE", "label": "site"}
      ]
    },
    "stats": [
        {
            "field": "content.size",
            "label": "size",
            "min": true,
            "max": true,
            "stddev": true,
            "missing": true, 
            "sum": true,
            
            "sumOfSquares": true,
            "percentiles": ["1","12.5","25","50","75","99"],
            "distinctValues": false,
            "countDistinct": true,
            "cardinality": true,
            "cardinalityAccuracy": 0.1
      }
      ],
    "ranges":[ 
                {
                    "field": "created",
                    "start": "NOW/YEAR-5YEARS",
                    "end": "NOW/YEAR+1YEAR",
                    "gap": "+1YEAR",
                    "label": "created"
                }],
    "pivots" : [
      {
        "key": "**site**",
        "pivots": [
          {
            "key": "**created**"
          }
          ]
      }
      ]
}
```

**Response:** The response shows an overall breakdown and you see a range for created. After that is the pivot and for each `site`, there is `range` and `buckets`. At the top-level, there is also a `range` for `created`. Under that is the pivot and for each site, there's a range with buckets.

You can use these stats for creating reports, for example, for the REPOSITORY as a whole, you can create reports around when the first and last content was created or for what period of time that site was active.

```
"context": {
            "facets": [
                {
                    "type": "**range**",
                    "label": "**created**",
                    "buckets": [
                        {
                            "label": "[2012-01-01T00:00:00Z - 2013-01-01T00:00:00Z)",
                            "filterQuery": "created:[\"2012-01-01T00:00:00Z\" TO \"2013-01-01T00:00:00Z\">",
                            "metrics": [
                                {
                                    "type": "count",
                                    "value": {
                                        "count": "0"
                                    }
                                }
                            ],
                            "bucketInfo": {
                                "startInclusive": "true",
                                "start": "2012-01-01T00:00:00Z",
                                "end": "2013-01-01T00:00:00Z",
                                "endInclusive": "false"
                            }
                        },
                        ...
                        {
                            "label": "[2017-01-01T00:00:00Z - 2018-01-01T00:00:00Z]",
                            "filterQuery": "created:[\"2017-01-01T00:00:00Z\" TO \"2018-01-01T00:00:00Z\"]",
                            "metrics": [
                                {
                                    "type": "count",
                                    "value": {
                                        "count": "686"
                                    }
                                }
                            ],
                            "bucketInfo": {
                                "startInclusive": "true",
                                "start": "2017-01-01T00:00:00Z",
                                "end": "2018-01-01T00:00:00Z",
                                "endInclusive": "true"
                            }
                        }
                    ]
                },
                {
                    "type": "pivot",
                    "label": "site",
                    "buckets": [
                        {
                            "label": "_REPOSITORY_",
                            "filterQuery": "SITE:\"_REPOSITORY_\"",
                            "metrics": [
                                {
                                    "type": "count",
                                    "value": {
                                        "count": 711
                                    }
                                }
                            ]
                        },
                        {
                            "label": "swsdp",
                            "filterQuery": "SITE:\"swsdp\"",
                            "metrics": [
                                {
                                    "type": "count",
                                    "value": {
                                        "count": 103
                                    }
                                }
                            ]
                        },
                        {
                            "label": "surf-config",
                            "filterQuery": "SITE:\"surf-config\"",
                            "metrics": [
                                {
                                    "type": "count",
                                    "value": {
                                        "count": 2
                                    }
                                }
                            ]
                        }
                    ]
                },
                {
                    "type": "stats",
                    "label": "size",
                    "buckets": [
                        {
                            "metrics": [
                                {
                                    "type": "missing",
                                    "value": {
                                        "missing": 601
                                    }
                                },
                                {
                                    "type": "sumOfSquares",
                                    "value": {
                                        "sumOfSquares": 30775603176391
                                    }
                                },
                                {
                                    "type": "max",
                                    "value": {
                                        "max": 3737049
                                    }
                                },
                                {
                                    "type": "stddev",
                                    "value": {
                                        "stddev": 370197.67997948296
                                    }
                                },
                                {
                                    "type": "mean",
                                    "value": {
                                        "mean": 82057.55813953489
                                    }
                                },
                                {
                                    "type": "sum",
                                    "value": {
                                        "sum": 17642375
                                    }
                                },
                                {
                                    "type": "countValues",
                                    "value": {
                                        "countValues": 215
                                    }
                                },
                                {
                                    "type": "min",
                                    "value": {
                                        "min": 25
                                    }
                                }
                            ]
                        }
                    ]
                }
            ]
        },
```

Using version store for reports: An index will store every version, so you can find out when a version was created. This gives you some measure of activity.

## stats {#stats}

The `stats` element specifies a list of simple statistics for numeric, dates, and text fields within the document set.

### Parameters

The parameter for the `stats` element is:

|Parameter|Type|Description|
|---------|----|-----------|
|`field`|String|The stats field.|
|`label`|String|A label to include for referencing the stats field.|
|`min`|Boolean|The minimum value of the field. The default value is `true`.|
|`max`|Boolean|The maximum value of the field. The default value is `true`.|
|`sum`|Boolean|The sum of all the values of the field. The default value is `true`.|
|`count`|Boolean|The number of values found. The default value is `true`.|
|`missing`|Boolean|The number which do not have a value for this field. The default value is `true`.|
|`mean`|Boolean|The average of all the values. The default value is `true`.|
|`stddev`|Boolean|This is the standard deviation. The default value is `true`.|
|`sumOfSquares`|Boolean|The sum of all values square. The default value is `true`.|
|`distinctValues`|Boolean|The set of all distinct values for the field. The default value is `false`.|
|`countDistinct`|Boolean|The number of distinct values. The default value is `false`.|
|`cardinality`|Boolean|A statistical approximation of the number of distinct values. The default value is `false`.|
|`cardinalityAccuracy`|Number|The number between `0.0` and `1.0` indicating how aggressively the algorithm should try to be accurate. This parameter is used with boolean cardinality flag. The default value is `0.3`.|
|`excludeFilters`|String|A list of filters to exclude.|
|`percentiles`|Number|A list of percentile values, for example, `1,99,99.9`.|

> **Note:** It is not possible to do a date range Vs Stats.

### Example

-   **Example of numeric stats:**

    In this example, we want to display the statistics for the `content.size` field. All the parameters, such as min, max, sum, missing, and so on are computed against all the records.

    ```
    {
      "query": {
        "query": "name:*"
      },
        "stats": [
            {
                "field": "content.size",
                "label": "myStat",
                "min": true,
                "max": true,
                "stddev": true,
                "missing": true, 
                "sum": true,
                "count": true,
                "sumOfSquares": true,
                "percentiles": ["1","12.5","25","50","75","99"],
                "distinctValues": true,
                "countDistinct": true,
                "cardinality": true,
                "cardinalityAccuracy": 0.1
          }
          ]
    }
    ```

-   **Example of date stats:** In this example, we want to find the statistics about when content was created. The response will return the statistics for the whole repository. To see when content was created in a site, you can add `filterQueries` to for that site(s) to narrow down the result.

    ```
    {
      "query": {
        "query": "name:*"
      },
        "stats": [
            {
                "field": "created",
                "label": "myStat",
                "min": true,
                "max": true,
                "stddev": true,
                "missing": true, 
                "sum": true,
                "count": true,
                "sumOfSquares": true,
                "percentiles": ["1","12.5","25","50","75","99"],
                "distinctValues": true,
                "countDistinct": true,
                "cardinality": true,
                "cardinalityAccuracy": 0.1
          }
          ]
    }
    ```

-   **Example of text stats:** In this example, we want to know what kind of content exists in my repository. The response will show a stats on how many documents, folders, people, or custom types and models exist in the repository.

    ```
    {
      "query": {
        "query": "name:*"
      },
        "stats": [
            {
                "field": "TYPE",
                "label": "myStat",
                "min": true,
                "max": true,
                "stddev": true,
                "missing": true, 
                "sum": true,
                "count": true,
                "sumOfSquares": true,
                "percentiles": ["1","12.5","25","50","75","99"],
                "distinctValues": true,
                "countDistinct": true,
                "cardinality": true,
                "cardinalityAccuracy": 0.1
          }
          ]
    }
    ```


## spellcheck {#spellcheck}

The `spellcheck` element specifies a request that spellcheck fragments should be added to the result set rows. The properties reflect Solr spellcheck parameters.

> **Note:** Spell check only works on Alfresco Search Services with Solr 6 if you have already enabled suggestions.

### Parameters

The parameter for the `spellcheck` element is:

|Parameter|Type|Description|
|---------|----|-----------|
|`query`|String|A facet query.|

### Example

For spell checking you can use a query like this:

```
{
  "query": {
    "query": "cm:title:alfrezco"
  },
  "spellcheck": {"query": "alfrezco"}
}
```

Alternatively, if you are already specifying [userQuery](#query), the following example produces the same result:

```
{
  "query": {
    "query": "cm:title:alfrezco",
    "userQuery": "alfrezco"
  },
  "spellcheck": {}
}
```

The spellcheck response includes a `spellCheck` context like this:

```
"context": {
  "spellCheck": {
    "type": "searchInsteadFor",
    "suggestions": ["alfresco"]
  }
},
```

## scope {#scope}

The `scope` element specifies the scope or the locations that are queried. By default, search uses the `nodes` location, which is the `workspace://SpacesStore` content store. To change the scope to another location, you can use the `locations` JSON body parameter.

### Parameters

The parameter for the `scope` element is:

|Parameter|Type|Description|
|---------|----|-----------|
|`locations`|String|The locations to include in the query. The possible values are:-   `nodes` - default value
-   `versions`
-   `deleted-nodes`

|

### Example

Example to change the scope to another location - `deleted-nodes`:

```
"scope": {
    "locations": ["deleted-nodes"]
}
```

## limits {#limits}

The `limits` element limits the time and resources used for query execution. Limits applied to the query go to the database.

### Parameters

The parameters for the `limits` element are:

|Parameter|Type|Description|Default value|
|---------|----|-----------|-------------|
|`permissionEvaluationTime`|Integer|The maximum time for post query permission evaluation.|The default value is 20000.

|
|`permissionEvaluationCount`|Integer|The maximum count of post query permission evaluations.|The default value is 2000.

|

### Example

Example of limiting how long the query will take by using the limits JSON body parameter:

```
"limits": {
  "permissionEvaluationTime": 20000,
  "permissionEvaluationCount": 2000
}
```

## highlight {#highlight}

The `highlight` element specifies the request that highlight fragments should be added to the result set rows. The properties reflect Solr highlighting parameters.

### Parameters

The parameter for the `highlight` element is:

|Parameter|Type|Description|
|---------|----|-----------|
|`prefix`|String|The string used to mark the start of a highlight in a fragment.|
|`postfix`|String|The string used to mark the end of a highlight in a fragment.|
|`snippetCount`|Integer|The maximum number of distinct highlight snippets to return for each highlight field.|
|`fragmentSize`|Integer|The character length of each snippet.|
|`maxAnalyzedChars`|Integer|The number of characters to be considered for highlighting. Matches after this count will not be shown.|
|`mergeContiguous`|Boolean|If fragments overlap, they can be merged into one larger fragment|
|`usePhraseHighlighter`|Boolean|This specifies if phrases should be identified.|
|`fields`|Boolean|The fields to highlight and field specific configuration properties for each field. The properties are:-   `field`: This string type specifies the name of the field to highlight.
-   `snippetCount`
-   `fragmentSize`
-   `mergeContiguous`
-   `prefix`
-   `postfix`

|

### Example

Here's an example query for search highlighting:

```
{
  "query": {
    "query": "description:workflow",
    "userQuery":"workflow"
  },
  "highlight": {
    "prefix": "¿",
    "postfix": "?",
    "mergeContiguous": true,
    "fields": [
      {
        "field": "cm:title"
      },
      {
        "field": "description",
        "prefix": "(",
        "postfix": ")"
      }

    ]
  }
}
```

The above example changes the default for all fields for highlighting `prefix` to `¿`, `postfix` to `?`, and `description` to `()`. The highlight information is added in each node entry response. Here's an example (partial) response:

```
*"entry": {
        "createdAt": "2016-10-12T15:24:31.202+0000",
        "isFolder": true,
        "search": {
          "score": 1,
          "highlight": [
            {
              "field": "cm:title",
              "snippets": [
                "Customized ¿Workflow? Process Definitions"
              ]
            },
            {
              "field": "description",
              "snippets": [
                "Customized (Workflow) Process Definitions"
              ]
            }
          ]
      },*
```

## range {#range}

The `range` element keeps together a series of range queries on any date or numeric field that supports range queries. It allows you to create a number of buckets and then group things by those.

### Parameters

The parameter for the `highlight` element is:

|Parameter|Type|Description|
|---------|----|-----------|
|`range`|String|This specifies the field to facet by range.|
|`start`|String|This specifies the start of the facet range.|
|`end`|Integer|This specifies the end of the facet range.|
|`gap`|Integer|This specifies the span of the range as a value to be added to the lower bound.|
|`hardend`|Integer|This boolean parameter specifies how Solr handles a range gap that cannot be evenly divided between the range start and end values. If true, the last range constraint will have the `facet.range.end` value an upper bound. If false, the last range will have the smallest possible upper bound greater than `facet.range.end` such that the range is the exact width of the specified range gap. The default value for this parameter is false.|
|`include`|Boolean|This specifies inclusion and exclusion preferences for the upper and lower bounds of the range.|
|`other`|Boolean|This specifies counts for Solr to compute in addition to the counts for each facet range `constraint.facet.range.method`.|
|`method`|Boolean|This specifies the algorithm or method to use for calculating facets.|

Range is similar to filter queries and filter cache. If you are using lot of range, it will filter through the cache and make it bigger.

### Examples

**Range - date:** In this example, we want to query anything within a name field. The result should have a range with label *created*, a start date, an end date, and a gap of one year.

```
{
                "query": {
                    "query": "name:*"
                },
                "ranges":[ 
                {
                    "field": "created",
                    "start": "2012",
                    "end": "2017",
                    "gap": "+1YEAR"
                }]
}
```

**Response**

The response shows a facet entry of `type` *range*. As the label was not specified in the query, the returned range has a `label` by field, *created*. Each individual bucket also has an auto-generated label, for example, `"[2012-01-01T00:00:00Z - 2013-01-01T00:00:00Z)",`. You can also build your own custom labels. Each bucket has a gap of one year. The metric displays the count of results found. Each bucket has a `bucketInfo` section that shows the start and end value.

```
"facets": [
                {
                    "type": "range",
                    "label": "created",
                    "buckets": [
                        {
                            "label": "[2012-01-01T00:00:00Z - 2013-01-01T00:00:00Z)",
                            "filterQuery": "created:[\"2012-01-01T00:00:00Z\" TO \"2013-01-01T00:00:00Z\">",
                            "metrics": [
                                {
                                    "type": "count",
                                    "value": {
                                        "count": "0"
                                    }
                                }
                            ],
                            "bucketInfo": {
                                "startInclusive": "true",
                                "start": "2012-01-01T00:00:00Z",
                                "end": "2013-01-01T00:00:00Z",
                                "endInclusive": "false"
                            }
                        },
                       ...
                        {
                            "label": "[2017-01-01T00:00:00Z - 2018-01-01T00:00:00Z]",
                            "filterQuery": "created:[\"2017-01-01T00:00:00Z\" TO \"2018-01-01T00:00:00Z\"]",
                            "metrics": [
                                {
                                    "type": "count",
                                    "value": {
                                        "count": "686"
                                    }
                                }
                            ],
                            "bucketInfo": {
                                "startInclusive": "true",
                                "start": "2017-01-01T00:00:00Z",
                                "end": "2018-01-01T00:00:00Z",
                                "endInclusive": "true"
                            }
                        }
                    ]
                }
            ]
        },
```

By default, range includes the bottom of the range and not the top, but it will include the boundary. The last bucket in the range includes both the start and the end. So, in the above example, we count everything up to the end of 2018 and this is also reflected in the `label` and the `filterQuery`, as shown below:

```
{
                            "label": "[2017-01-01T00:00:00Z - 2018-01-01T00:00:00Z]",
                            "filterQuery": "created:[\"2017-01-01T00:00:00Z\" TO \"2018-01-01T00:00:00Z\"]",
                            "metrics": [
                                {
                                    "type": "count",
                                    "value": {
                                        "count": "686"
                                    }
                                }
                            ],
                            "bucketInfo": {
                                "startInclusive": "true",
                                "start": "2017-01-01T00:00:00Z",
                                "end": "2018-01-01T00:00:00Z",
                                "endInclusive": "true"
                            }
```

**Range - date - timezone**: In this example, we want to do a range with label *created*. We have also specified the start and end date using Solr date math expression, which makes it easy to create times relative to fixed moments in time and include the current time which can be represented using the special value of `NOW`. Here we have taken today's date and round it to a year. So, we want the query to range from the beginning of this year and go back five years with a gap of one year. Based on the localization parameters, the query will search for English and French tokenization and sort everything according to French.

```
{
    "query": {
        "query": "name:*"
    },
    "ranges":[ {
        "field": "created",
        "start": "2012",
        "end": "2017",
        "gap": "+1YEAR"
    }],
    "localization":  
    {
       "timezone": "GMT+6",
       "locales" : [ "fr", "en" ]                
    }
}
```

**Range - numeric:** Range allows you to split content in numeric buckets. It counts documents by their size. In this example, we want to query on the name field with label *content.size*. The result will create 10 buckets of documents between 0 to 1000000 with a gap of 100000.

```
{
                "query": {
                    "query": "name:*"
                },
                "ranges":[ 
                {
                    "field": "content.size",
                    "start": "0",
                    "end": "1000000",
                    "gap": "100000"
                }]
}
```

**Response**

```
"facets": [
                {
                    "type": "range",
                    "label": "content.size",
                    "buckets": [
                        {
                            "label": "[0 - 100000)",
                            "filterQuery": "content.size:[\"0\" TO \"100000\">",
                            "metrics": [
                                {
                                    "type": "count",
                                    "value": {
                                        "count": "192"
                                    }
                                }
                            ],
                            "bucketInfo": {
                                "startInclusive": "true",
                                "start": "0",
                                "end": "100000",
                                "endInclusive": "false"
                            }
                        },
                        ...
                        {
                            "label": "[900000 - 1000000]",
                            "filterQuery": "content.size:[\"900000\" TO \"1000000\"]",
                            "metrics": [
                                {
                                    "type": "count",
                                    "value": {
                                        "count": "1"
                                    }
                                }
                            ],
                            "bucketInfo": {
                                "startInclusive": "true",
                                "start": "900000",
                                "end": "1000000",
                                "endInclusive": "true"
                            }
                        }
                    ]
                }
            ]
        },
```

**Range - options:** This allows you to add some options (for example, `hardend` and `include`) to a query so that you can control what you get in the report.

When you set `hardend` to true, it buckets the results from start to end based on the gap. If you go over the end value, the bucket will be truncated so that you don't include results beyond the end point. The default is to just add that over the end point.

Additionally, you can also decide what to include using `include`. For example:

```
`"include":["lower", "upper", "edge"]`
```

The above query specifies that if you choose `lower`, every bucket that is generated, will include the lower value. If you choose `upper`, every bucket will include the upper value, and if you include `edge`, the lowest bucket will include its lowest value and the upper bucket will include its highest value. Ideally, you will choose `edge` with `upper` or `lower`. The default is `lower` with `edge`, so you don't double count values. The risk using `lower` with `upper` is that you may double-count things if they fall on the boundary of two buckets.

```
{
                "query": {
                    "query": "name:*"
                },
                "ranges":[ 
                {
                    "field": "content.size",
                    "start": "0",
                    "end": "950000",
                    "gap": "100000",
                    "hardend": true,
                    "include":["lower", "upper", "edge"] 
                }]
}
```

Here's an example of a range option using `edge`:

```
{
                "query": {
                    "query": "name:*"
                },
                "ranges":[ 
                {
                    "field": "content.size",
                    "start": "0",
                    "end": "950000",
                    "gap": "100000",
                    "hardend": true,
                    "include":["edge"] 
                }]
}
```

**Response:** The result shows that the first bucket includes the outer range whereas the rest of the buckets do not include the start or the end point as neither `upper` nor `lower` has been specified. The last bucket includes the upper boundary and includes a `true` condition. It is also truncated at the end point of 950000.

```
"facets": [
                {
                    "type": "range",
                    "label": "content.size",
                    "buckets": [
                        {
                            "label": "[0 - 100000)",
                            "filterQuery": "content.size:[\"0\" TO \"100000\">",
                            "metrics": [
                                {
                                    "type": "count",
                                    "value": {
                                        "count": "192"
                                    }
                                }
                            ],
                            "bucketInfo": {
                                "startInclusive": "true",
                                "start": "0",
                                "end": "100000",
                                "endInclusive": "false"
                            }
                        },
                        ...
                        {
                            "label": "(900000 - 950000]",
                            "filterQuery": "content.size:<\"900000\" TO \"950000\"]",
                            "metrics": [
                                {
                                    "type": "count",
                                    "value": {
                                        "count": "0"
                                    }
                                }
                            ],
                            "bucketInfo": {
                                "startInclusive": "false",
                                "start": "900000",
                                "end": "950000",
                                "endInclusive": "true"
                            }
                        }
                    ]
                }
            ]
        },
```

## FreeMarker API {#freemarker-api}

FreeMarker templates can be used to generate the view component of the Model-View-Controller (MVC) pattern.

The Repository FreeMarker Template API lets you render output using the FreeMarker template engine. This is the full list of public APIs that compose the Repository FreeMarker Template API.

> **Important:** Objects that are available to scripts running in the repository context are explained here. They are not available to scripts running in the Alfresco Share context.

-   **[Template usage](#template-usage)**  
Templates are used widely in Alfresco Content Services to render the view of a MVC pattern.
-   **[Template files](#template-files)**  
Template files can be stored on the classpath or within the repository store.
-   **[Template models](#template-files)**  
Template models provide data which can be used by the template to generate an output view.
-   **[Default model objects](#default-model-objects)**  
The default model provides a number of common objects useful for most templates. These are generally known as root objects.
-   **[Default model methods](#default-model-methods)**  
Custom template methods can be added to the FreeMarker language for use on template pages. The default model provides the following methods:
-   **[TemplateNode API](#templatenode-api)**  
`TemplateNode` objects and any subsequent child node objects provide access to the common Alfresco Content Services concepts, such as properties, aspects, and associations. The following template API is provided. `TemplateNode` extends `BasePermissionsNode`.
-   **[Classification API](#classification-api)**  
The `classification` object provides read access to classifications and root categories.
-   **[Current Date](#current-date)**  
The date object returns the current date.
-   **[JSP Page](#jsp-page)**  
Custom JSP pages can be written to render templates.
-   **[People API](#people-api)**  
The People API provides basic user and group query and inspection capabilities.
-   **[VersionHistoryNode API](#versionhistorynode-api)**  
The `VersionHistoryNode` is an extension of the `BaseContentNode` type. The `versionHistory` property of the `TemplateNode` object returns a sequence of `VersionHistoryNode` objects that represent the version history for the document.
-   **[Workflow API](#workflow-api)**  
The `workflow` root object provides read access to the in-progress and finished tasks for the current user. It also provides a function to look up a single task by its task ID. The functions described mostly return `WorkflowTaskItem` objects.


## Template usage {#template-usage}

Templates are used widely in Alfresco Content Services to render the view of a MVC pattern.

Templates are widespread throughout Alfresco Content Services: they are used within the repository core to generate emails and activities, in the web client to build custom views, at the remote REST API layer, and also as the default rendering mechanism for the web script and Surf frameworks.

The template engine is not tied to any output file format: templates can output entire HTML files as well as snippets of HTML, XML, JSON, or any other format. This makes them extremely flexible and appropriate for developing all kinds of solutions with Alfresco Content Services.

## Template files {#template-files}

Template files can be stored on the classpath or within the repository store.

Templates can be stored either on the classpath (for example, in ./tomcat/shared/classes/alfresco/extension/templates/webscripts) or in the repository store (for example, in Repository/Data Dictionary/Web Script Extensions).

In the case of the web script and Surf frameworks, FreeMarker is always selected as the template engine.

## Template models {#template-models}

Template models provide data which can be used by the template to generate an output view.

Views are often generated from model data. A template always has access to default model data. The default model can have data added to it, for example from JavaScript controllers.

A model consists of a number of objects or hierarchy of objects from which a template file retrieves values that can be used to dynamically generate the output view. The model is like the API for the template page: it provides the objects from which properties and values can be accessed.

The repository provides a "default" model that is always available. The web script framework provides additional model objects relevant to processing output for Remote APIs. Programmatically, it is also possible to define a custom model that can be merged into the default model to provide additional model objects. Custom Java objects can be configured by using Spring to make them available to template models within the repository and/or the web script framework.

## Default model objects {#default-model-objects}

The default model provides a number of common objects useful for most templates. These are generally known as root objects.

Most of the objects wrap the notion of a Node (such as a space or document in the repository) and are known as `TemplateNode` objects. This provides a rich object-oriented layer to make it easy to display common concepts, such as node properties, aspect values, and content.

> **Note:** Web scripts hosted within the repository tier also have access to the following template root objects. Web scripts hosted within the presentation tier (that is, within Surf) do not have direct access to these objects.

|Type|Description|
|----|-----------|
|`companyhome`|The Company Home template node.|
|`userhome`|The current user's Home Space template node.|
|`person`|The node representing the current user's `Person` object.|
|`args`|A map of any URL parameters passed by using the Template Content Servlet.

This is a neat way to pass additional parameters to your template. FreeMarker has built-in methods to parse integers and check for the existence of values that can be used to make your template even more interactive and powerful. For example, to output the names of the arguments passed to a template:

```

            
<#assign keys = args?keys>
<#list keys as arg>      
   ${arg}
</#list>


```

|
|`sessionticket`|Session related information providing a single value `sessionticket.ticket` for the current authentication ticket; useful when generating some Alfresco Content Services URLs for accessing outside the web client.|
|`classification`|Read access to classifications and root categories.|
|`url`|Provides a single property `url.context` that can be used to retrieve the container context path, such as /alfresco; useful when generating URL links to objects. This is not available when using the template as a custom view on a space.|
|`workflow`|Read access to information on `workflow` objects and the currently executing workflows for a user.

|
|`people`|This object gives access to the People API.

|

The various default model objects can be accessed directly from the root of a model in your FreeMarker template. For example, to display the name property of the userhome object:

```
${userhome.properties.name}
```

The node model is built dynamically as you access it, enabling you to write statements such as:

```
userhome.children[1].children[0].children[2].name
```

> **Note:** It should be noted that the FreeMarker template engine is very strict on the access of empty or null values. Unlike many templating or scripting languages that display empty values or assume FALSE as a default value for a missing property, the FreeMarker engine will instead throw an exception and abort the rendering of the template. To help you build stable templates, most of the TemplateNode API calls provided by the default model that return Maps or Sequences (lists) of items will return empty Maps and Sequences instead of null. Also if a null value can be returned by a call (for instance, from accessing a Map to find a value by name), you should use the FreeMarker built-in `exists` method or preferably the shortened form of `??` to check for null first. Therefore:

```


<#if mynode??>
  <#if mynode.assocs["cm:translations"]??>
     ${mynode.assocs["cm:translations"][0].content}
  </#if>
</#if>


```

This checks for the existence of `mynode` and then checks for the existence of a `translation` association before attempting to access the translation.

## Default model methods {#default-model-methods}

Custom template methods can be added to the FreeMarker language for use on template pages. The default model provides the following methods:

-   **[cropContent](#cropcontent)**  
`cropContent(content, length)` returns the first N characters of a content stream from the specified node.
-   **[dateCompare](#datecompare)**  
`dateCompare` methods that return a value based on how two dates compare, with an optional milliseconds offset.
-   **[hasAspect](#hasaspect)**  
`hasAspect(node, aspect)` returns whether a `TemplateNode` has a particular aspect applied to it. The aspect name can be either the fully qualified QName or the short prefixed name string.
-   **[hasPermission](#haspermission)**  
`hasPermission(node, permission)` returns whether a `TemplateNode` has the specified permission applied to it.
-   **[incrementDate](#incrementdate)**  
`incrementDate(date, increment)` returns a date incremented by the specified amount.
-   **[message](#message)**  
`message(id)` returns an i18n message resolved for the current locale and specified message ID.
-   **[shortQName](#shortqname)**  
`shortQName(longQName)` returns the shortQName equivalent of the specified longQName.
-   **[xmldate](#xmldate)**  
`xmldate` these methods return a converted date. The date can be specified either as a Date object or an ISO6801 string.

## cropContent {#cropcontent}

`cropContent(content, length)` returns the first N characters of a content stream from the specified node.

### Parameters

-   **content**

    A `TemplateContentData` object representing the target content stream.

-   **length**

    An integer representing the number of bytes to read from the content stream.


### Returns

Returns a string representing the content read.

### Example

```


<#assign templateContentData = node.properties.content>

<p>cropped content: ${cropContent(templateContentData, 150)}</p>  
        
      
```

The preceding code snippet will display the first 150 bytes of the content node.

## dateCompare {#dateCompare}

`dateCompare` methods that return a value based on how two dates compare, with an optional milliseconds offset.

### dateCompare

`dateCompare(dateA, dateB)` returns a value based on how two dates compare, with an optional milliseconds offset.

#### Parameters

-   **dateA**

    A date object.

-   **dateB**

    A date object.


#### Returns

Returns 1 if dateA is greater than dateB, else returns 0.

#### Example

```


<#assign isoDateA = "2012-01-05T16:52:43.319Z">
<#assign isoDateB = "2011-12-05T16:52:43.319Z">
<#assign dateA = xmldate(isoDateA)> 
<#assign dateB = xmldate(isoDateB)> 
<p>result: ${dateCompare(dateA, dateB)}</p>         

      
```

The preceding code snippet would produce output as follows:

```

          result: 1
          
```

This signifies that dateA is greater (newer) than dateB.

### dateCompare

`dateCompare` returns a value based on how two dates compare, with an optional milliseconds offset.

#### Parameters

-   **dateA**

    A date object.

-   **dateB**

    A date object.

-   **millis**

    An offset in milliseconds.


#### Returns

Returns 1 if dateA is greater than dateB by at least `millis`, else returns 0.

#### Example

### dateCompare

`dateCompare` returns a value based on how two dates compare, with an optional milliseconds offset.

#### Parameters

-   **dateA**

    A date object.

-   **dateB**

    A date object.

-   **millis**

    An offset in milliseconds.

-   **test**

    The test variable is one of the following strings: ">", "<", "==".


#### Returns

Returns 1 if the test result is positive, else returns 0.

#### Example

## hasAspect {#hasAspect}

`hasAspect(node, aspect)` returns whether a `TemplateNode` has a particular aspect applied to it. The aspect name can be either the fully qualified QName or the short prefixed name string.

### Parameters

-   **node**

    The `TemplateNode` to test for the presence of the specified aspect.

-   **aspect**

    A string representing the aspect to check for. The aspect name can be either the fully qualified QName or the short prefixed name string


### Returns

Returns 1 on true, 0 on false.

### Example

```

        
<#assign result = companyhome.hasAspect("cm:taggable")>
        
<p>result: <#if result>TRUE<#else>FALSE</#if></p>

<#-- test node passed from JS is taggable -->
                            
<#assign result = node.hasAspect("cm:taggable")>
                                   
<p>result: <#if result>TRUE<#else>FALSE</#if></p>


```

The preceding code snippet would produce output similar to the following:

```

result: FALSE

result: TRUE        
      
```

## hasPermission {#hasPermission}

`hasPermission(node, permission)` returns whether a `TemplateNode` has the specified permission applied to it.

### Parameters

-   **node**

    The `TemplateNode` to test for the presence of the specified permission.

-   **permission**

    A string representing the permission to check for. Permissions include Read, Write, Delete, AddChildren and Execute.


### Returns

Returns 1 on true, 0 on false.

### Example

```

      
<#assign result = node.hasPermission("Delete")>                                  
<p>hasPermission: <#if result>TRUE<#else>FALSE</#if></p>


```

## incrementDate {#incrementdate}

`incrementDate(date, increment)` returns a date incremented by the specified amount.

### Parameters

-   **date**

    The date to increment

-   **increment**

    The number to increment the date by.


### Returns

Returns the incremented date.

### Example

```


<#assign incDate = incrementDate(date, 100000000000)>
<p>date: ${date?date}</p>
<p>incDate: ${incDate?date}</p>

    
```

The preceding code snippet would produce output similar to the following:

```

date: Jan 6, 2012

incDate: Mar 9, 2015        
      
```

## message {#message}

`message(id)` returns an i18n message resolved for the current locale and specified message ID.

### Parameters

-   **id**

    A string representing the message ID to display.


### Returns

Returns an i18n message resolved for the current locale and specified message ID.

### Example

```


<p>message: ${message("templates.translatable.no_document_found")}</p>                          

      
```

The preceding code snippet would return the following message:

```

message: No document found        
      
```

The message having being loaded from a properties file such as /config/alfresco/messages/templates-messages.properties. The translations being loaded from corresponding files such as:

```

./root/projects/repository/config/alfresco/messages/templates-messages.properties:templates.translatable.no_document_found=No document found
./root/projects/repository/config/alfresco/messages/templates-messages_de.properties:templates.translatable.no_document_found=Kein Dokument gefunden
./root/projects/repository/config/alfresco/messages/templates-messages_es.properties:templates.translatable.no_document_found=Ning\u00fan documento encontrado
./root/projects/repository/config/alfresco/messages/templates-messages_fr.properties:templates.translatable.no_document_found=Aucun document trouv\u00e9
./root/projects/repository/config/alfresco/messages/templates-messages_it.properties:templates.translatable.no_document_found=Nessun documento trovato
./root/projects/repository/config/alfresco/messages/templates-messages_ja.properties:templates.translatable.no_document_found=\u6587\u66f8\u304c\u898b\u3064\u304b\u308a\u307e\u305b\u3093
./root/projects/repository/config/alfresco/messages/templates-messages_nl.properties:templates.translatable.no_document_found=Kan geen document vinden
      
```

## shortQName {#shortqname}

`shortQName(longQName)` returns the shortQName equivalent of the specified longQName.

### Parameters

-   **longQName**

    A string representing the longQName to convert to a shortQName.


### Returns

Returns a string representing the shortQName equivalent of the specified longQName.

### Example

```


<#assign result = shortQName("{http://www.alfresco.org/model/content/1.0}person")>      
<p>shortQName: ${result}</p>

      
```

The preceding code snippet would produce output similar to the following:

```

shortQName: cm:person        
      
```

## xmldate {#xmldate}

`xmldate` these methods return a converted date. The date can be specified either as a Date object or an ISO6801 string.

### xmldate(Date date)

`xmldate(Date date)` returns an ISO8601 string converted from the specified Date object.

#### Parameters

-   **date**

    A Date object to convert to an ISO6801 string.


#### Returns

Returns an ISO6801 string.

#### Example

### xmldate(String date)

`xmldate(String date)` returns a Date object converted from the specified ISO6801 string.

#### Parameters

-   **date**

    An ISO6801 format string.


#### Returns

Returns a date object converted from the specified ISO6801 format string.

#### Example

```


<p>Date:${date?date}</p>

<#assign isoDate = xmldate(date)>

<p>isoDate: ${isoDate}</p>

<#assign dateObject = xmldate(isoDate)>

<p>dateObject: ${dateObject?date}</p>


        
```

The preceding code snippet would produce output similar to the following:

```

Date:Jan 5, 2012

isoDate: 2012-01-05T16:52:43.319Z

dateObject: Jan 5, 2012          
        
```


## TemplateNode API {#templatenode-api}

`TemplateNode` objects and any subsequent child node objects provide access to the common Alfresco Content Services concepts, such as properties, aspects, and associations. The following template API is provided. `TemplateNode` extends `BasePermissionsNode`.

|Properties|Description|
|----------|-----------|
|`aspects`|A sequence of the aspects (as QName strings) applied to the node.|
|`assocs`, `associations`|A map of the target associations for the node.Each entry in the map contains a sequence of the `Node` objects on the end of the association. For example:

```
mynode.assocs["cm:translations"][0]
```

|
|`auditTrail`|Returns a sequence of `AuditInfo` objects representing the Audit Trail for a node; available only if auditing is active for the repository.|
|`childAssocs`, `childAssociations`|A map of the child associations for the node.Each entry in the map contains a sequence of the `Node` objects on the end of the child association. For example:

```
myforumnod.childAssocs["fm:discussion"][0]
```

|
|`childByNamePath`|Returns a map capable of returning a single child node found by name path, such as:```
companyhome.childByNamePath["Data Dictionary/Content Templates"]
```

Under the covers, this method is building an XPath and executing a search against the `cm:name` attribute on children of the current node. This method allows you to find a specific child node if you know its name.

> **Note:** The previous API calls use the node they are executed against as the current context for the query. For example, if you have a folder node called "myfolder" and you execute the call `myfolder.childByNamePath["MyChildFolder"]`, the search tries to find a folder called "MyChildFolder" as the child of the `myfolder` node.

|
|`children`|A sequence (list) of the child nodes. For example:```
mynode.children[0]
```

|
|`childrenByLuceneSearch`|Runs a search against the available search engine. Returns a map capable of executing a search against the entire repository based on a Lucene search string.It returns a sequence of nodes that represent the objects from the results of the search.

The value can be any valid Lucene search string supported by Alfresco Content Services. Note that you might need to escape Lucene special characters. The entire repository is searched; the current node is only used as an access point to retrieve the search object.

For example, execute a Lucene full-text search and list the resulting documents:

 ```


<table>
  <#list companyhome.childrenByLuceneSearch["TEXT:alfresco* AND TEXT:tutorial*"] as child>
    <tr><td><a href="/alfresco${child.url}" target="new">${child.properties.name}</a></td></tr>
  </#list>
</table>

```

|
|`childrenBySavedSearch`|Returns a map capable of executing a search based on a previously Saved Search object.It returns a sequence of child nodes that represent the objects from the results of the search. For example:

```
companyhome.childrenBySavedSearch["workspace://SpacesStore/92005879-996a-11da-bfbc-f7140598adfe"]
```

The value specified must be a NodeRef to an existing Saved Search object.

|
|`childrenByXPath`|Returns a map capable of executing an XPath query to find child nodes, such as:```
companyhome.childrenByXPath["*[@cm:name='Data Dictionary']/*"]
```

The map executes an XPath search against the current nod and returns a sequence of the nodes as results of the query.

|
|`content`|Returns the content for the default content property of the node as a string.|
|`directPermissions`|List of permissions applied to this Node which does not include inherited permissions. Strings returned are of the format `[ALLOWED|DENIED];[USERNAME|GROUPNAME];PERMISSION`, for example, `ALLOWED;kevinr;Consumer`. This format can be tokenized on the ';' character.|
|`displayMimetype`|The human-readable version of the MIME type encoding for the content attached to this node.|
|`displayPath`|The display path to this node; constructed from the `cm:name` property of each parent node in the hierarchy.|
|`downloadUrl`|The URL to the content stream for the default content property for this node as an HTTP1.1 attachment object.|
|`encoding`|The character encoding for content attached to the node from the default content property.|
|`exists`|Returns true if the node still exists.|
|`fullPermissions`|Returns a list of strings representing permissions applied to this Node, including inherited permissions. Strings returned are of the format `[ALLOWED|DENIED];[USERNAME|GROUPNAME];PERMISSION;[INHERITED|DIRECT]`, for example `ALLOWED;kevinr;Consumer`. The strings can be tokenized on the ';' character.|
|`getChildAssocsByType(String type)`|Returns a list of `TemplateNode` objects that represent the children of this node that match the specified object type.|
|`hasAspect(string aspectName)`|A function that returns true if a node has the specified aspect. For example:```
<#if userhome.hasAspect("cm:templatable")>...</#if>
```

|
|`hasChildren`|Returns a boolean, true if the node has children.|
|`hasPermission(permission)`|Returns true if the current user has the specified permission on the node. For example:```
<#if userhome.hasPermission("Write")>...</#if>
```

|
|`icon16`|A string representing the small icon image for this node.|
|`icon32`|A string representing the large icon image for this node.|
|`icon64`|A string representing the extra large icon image for this node.|
|`id`|GUID for the node.|
|`imageResolver`|Returns a `TemplateImageResolver` object which represents the image resolver instance used by this node.|
|`inheritsPermissions`|If the node inherits its parent node permissions, this is true; if the permissions are applied specifically, this is false.|
|`isCategory`|If the node is a category node, this is true; otherwise, it is false.|
|`isContainer`|If the node is a folder node, this is true; otherwise, it is false.|
|`isDocument`|If the node is a content node, this is true; otherwise, it is false.|
|`isLinkToContainer`|Returns true if this node is a link to a container, that is, a folderlink.|
|`isLinkToDocument`|Returns true if this node is a link to a document, that is, a filelink.|
|`isLocked`|If the node is locked, this is true; otherwise, it is false.|
|`isWorkingCopy`|Returns true if the node is a working copy.|
|`isTemplateContent(object)`|Returns true if the given object is a `TemplateContentData` instance; useful to determine if a value returned from a property is of the `d:content` datatype.|
|`isTemplateNodeRef(object)`|Returns true if the given object is a `TemplateNodeRef` instance; useful to determine if a value returned from a property is a `d:noderef` datatype.|
|`mimetype`|The MIME type encoding for content for the default content property attached to this node.|
|`name`|Shortcut access to the name property.|
|`nodeByReference`|Returns a map capable of executing a search for a single node by `NodeRef` reference. This method allows you to find a node if you have the full `NodeRef` string or `NodeRef` object.In another example, find a node from a `hardcodedNodeRef` value:

```
Found: ${companyhome.nodeByReference["workspace://SpacesStore/e661dccb-ecc0-11da-9974-63f65406985a"].id}
```

|
|`nodeRef`|NodeRef string for the node.|
|`parent`|Parent node will only be null if this is the root node.|
|`parentTypeShort`|Parent in short name format. Parent node will only be null if this is the root node.|
|`permissions`|Sequence of the permissions explicitly applied to this node; strings returned are of the format:```
[ALLOWED|DENIED];[USERNAME|GROUPNAME];PERMISSION'
```

For example, `ALLOWED;kevinr;Consumer` can be easily tokenized on the semicolon (;) character.

|
|`primaryParentAssoc`|Returns the `ChildAssociationRef` instance for the node.|
|`properties`|A map of the properties for the node, such as `userhome.properties.name`.

Properties can return several different types of objects. This depends entirely on the underlying property type in the repository. If the property is multi-value, the result will be a sequence that can be indexed like any other sequence or array. If the result is an unknown or unsupported type, the `toString()` result is generally used; therefore, the result will mostly be a string type. If the property can potentially contain a 'null' value, take care when accessing it and use the `exists` FreeMarker built-in method to check for null values before accessing.

Date and boolean property values should be handled carefully. The FreeMarker built-in methods `is_date` and `is_boolean` can be used to check if the page developer is unsure of the property value type. These values can then be formatted as appropriate.

For example, iterate over all properties for a node called `document` and render the values as appropriate for the data-types returned:

 ```


<table>
 <#-- Get a list of all the property names for the document -->
 <#assign props = document.properties?keys>
 <#list props as t>
    <#-- If the property exists -->
    <#if document.properties[t]?exists>
       <#-- If it is a date, format it accordingly-->
       <#if document.properties[t]?is_date>
       <tr><td>${t} = ${document.properties[t]?date}</td></tr>
       
       <#-- If it is a boolean, format it accordingly-->
       <#elseif document.properties[t]?is_boolean>
       <tr><td>${t} = ${document.properties[t]?string("yes", "no")}</td></tr>
       
       <#-- Otherwise treat it as a string -->
       <#else>
       <tr><td>${t} = ${document.properties[t]}</td></tr>
       </#if>
    </#if>
 </#list>
</table>
```

If the type of the property is a `NodeRef` object (`d:noderef` in the content model), the template model will automatically convert the property type into another `TemplateNode` object. This means the template developer can continue to dynamically walk the object hierarchy for that node. For example, if a document node has a `NodeRef` property called `locale`, you could execute the following to retrieve the name of the node the property references:

```
${document.properties.locale.properties.name}
```

If a property is of the datatype `d:content`, additional API methods are available on the returned object. Methods are provided to retrieve the `content`, `mimetype`, `displayMimetype`, `encoding`, `size`, and `url` for the content property. For example:

```
${document.properties.content.mimetype}
${document.properties.content.content}

```

As most document nodes are derived from the default Content Model type `cm:content`, shortcut APIs to access properties on the default `cm:content` content property are supplied directly on the `TemplateNode` object.

Helper methods to perform some simple textual operations on the content properties are also provided:

-   **content.getContentMaxLength(length)**

Returns content up to a maximum length.

-   **content.getContentAsText(length)**

Converts binary content (such as Word and PDF) to text, up to a maximum length.


|
|`qnamePath`|QName-based path to the node; useful for building Lucene PATH: style queries that constrain to a path location.|
|`serviceUrl`|Returns a string that represents the service URL.|
|`shareUrl`|This method returns a URL string which resolves to an Alfresco Share view of this node. Note that in order for this method to return meaningful data, the SysAdminParams bean must have been configured. This method only produces valid URLs for documents and not for folders.|
|`siteShortName`|Returns the short name of the site this node is located within. If the node is not located within a site null is returned.|
|`size`|The size, in bytes, of content attached to this node for the default content property.|
|`sourceAssocs`, `sourceAssociations`|A map of the associations to this node.Each entry in the map contains a sequence of the `Node` objects for the given association that reference this node. For example:

```
mynode.sourceAssocs["cm:avatarOf"][0]
```

|
|`storeId`|Returns the store ID for the node.|
|`storeType`|Returns the store type for the node.|
|`type`|Fully qualified QName type of the node.|
|`typeShort`|Prefix string or "short" QName type of the node.|
|`url`|The URL to the content stream for the default content property for this node.|
|`versionHistory`|Returns a list of `VersionHistoryNode` objects, representing the version history for the node.|
|`webdavUrl`|The WebDav URL to the node, based on the `cm:name` based path to the content for the default content property.|
|`xmlNodeModel`|Returns the XML DOM model object for the content of the node.If the node content is valid XML and the XML can be parsed, then this method returns the root of the DOM for this node. The DOM can be walked and processed using the syntax as per the FreeMarker XML Processing Guide.

For example, process the XML document content of the current document, assuming the node content contains the following XML:

 ```

          
<?xml version="1.0" standalone="yes"?>
<book title="Book Title">
  <chapter>
    <title>Chapter 1</title>
    <para>p1.1</para>
    <para>p1.2</para>
    <para>p1.3</para>
  </chapter>
  <chapter>
    <title>Chapter 2</title>
    <para>p2.1</para>
    <para>p2.2</para>
  </chapter>
</book>

<#if document.mimetype = "text/xml">
   <#assign dom=document.xmlNodeModel>
   <h1>${dom.book.@title}</h1>
   <#list dom.book.chapter as c>
      <h2>${c.title}</2>
   </#list>  
</#if>


```

|

## Classification API {#classification-api}

The `classification` object provides read access to classifications and root categories.

### Classification object

The following are `Classification` object properties:

|Property|Description|
|--------|-----------|
|`allClassificationAspects`|Returns a list of `QName` objects of all classification aspects.|

### Example

The following example displays the available classification types and top level category nodes:

```

        
<#list classification.allClassificationAspects as a>
  ${a}<br>
</#list>
 
      
```

The preceding code snippet would return output such as the following:

```

{http://www.alfresco.org/model/content/1.0}taggable
{http://www.alfresco.org/model/content/1.0}generalclassifiable
{http://www.alfresco.org/model/content/1.0}classifiable        
      
```

The following code snippet:

```


<#list classification.getRootCategories("cm:taggable") as n>
  ${n.name}<br>
</#list>     

    
```

Would produce output similar to the following:

```

text
examples
javascript
documentation
api        
        
```

The preceding output represents a list of tags available in the system that have been defined by the users.

-   **[getAllCategoryNodes](#getallcategorynodes)**  
`getAllCategoryNodes` these methods return a list of `CategoryTemplateNodes` which represent the category nodes for a given classification.
-   **[getRootCategories](#getrootcategories)**  
`getRootCategories(aspect)` returns the root categories in a classification.
-   **[CategoryTemplateNode](#categorytemplatenode)**  
The `CategoryTemplateNode` object represents a category object.

## getAllCategoryNodes {#getAllCategoryNodes}

`getAllCategoryNodes` these methods return a list of `CategoryTemplateNodes` which represent the category nodes for a given classification.

### getAllCategoryNodes(aspect)

`getAllCategoryNodes(aspect)` this method returns a list of CategoryTemplateNodes that represent all the category nodes for a given classification.

#### Parameters

-   **aspect**

    A string representing the aspect for which to return the category nodes.


#### Returns

Returns a `TemplateNode` object representing the user with the specified user name.

#### Example

```


<#list classification.getAllCategoryNodes("cm:generalclassifiable") as n>
  ${n.name}<br>
</#list>          

          
```

The preceding code snippet would return output similar to the following:

```

Software Document Classification
Software Descriptions
Main Software Descriptions
Short System Description
Requirement Description
Architecture Description
Implementation Description
Configuration Description
Software Description Appendices
Terminology Description
Internal Message Description
External Message Description
Record Description
User Interface Description
Process Description
Initialization Description
Utilization Documents
User's Manual
Operator's Manual
Installation Manual
Service Manual
User's Help
Operator's Help
Installations Help
Service Help
Development Plans
Responsibility Plan
Work Breakdown Plan
Schedule Plan
Expense Plan
Phase Plan
Risk Plan
Test Plan
Acceptance Plan
Manual Plan
Method Plan
Quality Plan
Documentation Plan
Version Control Plan
Quality Documents
Change Request
Analysis Request
Information Request
Reader's Report
Review Report
Inspection Report
Test Report
Review Call
Inspection Call
Test Call
Administrative Documents
Preliminary Contract
Development Contract
Extended Contract
Maintenance Contract
Contract Review Minutes
Project Meeting Minutes
Languages
English
British English
American English
Australian English
Canadian English
Indian English
French
French French
Canadian French
German
German German
Austrian German
Swiss German
Spanish
Spanish
Mexican Spanish
American Spanish
Regions
AFRICA
Eastern Africa
Burundi
Comoros
Djibouti
Eritrea
Ethiopia
Kenya
Madagascar
Malawi
Mauritius
Mozambique
Reunion
Rwanda
Seychelles
Somalia
Uganda
United Rep. of Tanzania
Zambia
Zimbabwe
Middle Africa
Angola
Cameroon
Central African Republic
Chad
Congo
...
Tags
          
        
```

### getAllCategoryNodes(aspect)

`getAllCategoryNodes(aspect)` this method returns a list of CategoryTemplateNodes that represent all the category nodes for a given classification.

#### Parameters

-   **aspect**

    A `QName` object representing the aspect for which to return the category nodes.


#### Returns

Returns a `TemplateNode` object representing the user with the specified user name.

#### Example


## getRootCategories {#getRootCategories}

`getRootCategories(aspect)` returns the root categories in a classification.

### Parameters

-   **aspect**

    A string that represents the aspect whose root categories are to be returned.


### Returns

Returns a list of `CategoryTemplateNodes` that represent the root category nodes for the specified aspect.

### Example

```

      
<#list classification.getRootCategories("cm:generalclassifiable") as n>
  ${n.name}<br>
</#list>     
      
    
```

The preceding code snippet would return output similar to the following:

```

Software Document Classification
Languages
Regions
Tags        

```

## CategoryTemplateNode {#categorytemplatenode}

The `CategoryTemplateNode` object represents a category object.

### Properties

The following properties are available for `CategoryTemplateNode` objects:

|Property|Description|
|--------|-----------|
|``categoryMembers``|Returns a list of members of a category as `TemplateNode` objects.|
|`subcategories`|Returns a list of subcategories of a category as `CategoryTemplateNode` objects.|
|`membersAndSubCategories`|Returns a list of `TemplateNode` objects representing all subcategories and members of a category.|
|`immediateCategoryMembers`|Returns a list of `TemplateNode` objects representing all immediate members of a category.|
|`immediateSubCategories`|Returns a list of `CategoryTemplateNode` objects representing all immediate subcategories of a category.|
|`immediateMembersAndSubCategories`|Returns a list of `TemplateNode` objects representing all immediate subcategories of a category.|
|`isCategory`|Returns true if the node is a category instance, false otherwise.|

## Current Date {#current-date}

The date object returns the current date.

In FreeMarker there is no such variable as today. Therefore, the current date (as a new `Date()` Java object) is provided in all templates as the `date` object in the root of the model.

### Example

The following code snippet shows an example of use:

```


<#assign datetimeformat="EEE, dd MMM yyyy HH:mm:ss zzz">
${date?string(datetimeformat)}


```

## JSP Page {#jsp-page}

Custom JSP pages can be written to render templates.

As well as the commonly used web script-based mechanisms for rendering template output, developers can write custom JSP pages with JSF components that render templates.

### Example

Following is the minimum JSP code required to display a template using the JSF Template component:

```

  
<%@ taglib uri="http://java.sun.com/jsf/html" prefix="h" %>
<%@ taglib uri="http://java.sun.com/jsf/core" prefix="f" %>
<%@ taglib uri="/WEB-INF/repo.tld" prefix="r" %>
 
<html>
  <body>
  
    <f:view>
      <h:form>
        <r:template template="alfresco/templates/userhome_docs.ftl" />
      </h:form>
    </f:view>
  
  </body>
</html>
  

```

## People API {#people-api}

The People API provides basic user and group query and inspection capabilities.

|Property|Description|
|--------|-----------|
|authenticationService|Sets the authentication service.|
|authorityDAO|Sets the authority DAO|
|authorityService|Sets the authority service|
|personService|Sets the person service|
|serviceRegistry|Sets the service registry|
|storeUrl|Sets the store URL|

-   **[getCapabilities](#getcapabilities)**  
`getCapabilities(person)` returns a map of capabilities for a given person.
-   **[getContainerGroups](#getcontainergroups)**  
`getContainerGroups(person)` returns the groups that contain the specified authorities.
-   **[getGroup](#getgroup)**  
`getGroup(groupName)` returns the group corresponding to the specified group name.
-   **[getMembers](#getmembers)**  
`getMembers` these methods return the members of a group.
-   **[getPerson](#getperson)**  
`getPerson(username)` returns a person object given the person's user name.
-   **[isAccountEnabled](#isaccountenabled)**  
`isAccountEnabled(person)` returns the status of the specified user.
-   **[isAdmin](#isadmin)**  
`isAdmin(person)` returns the administrator status of the specified user.
-   **[isGuest](#isguest)**  
`isGuest(person)` returns the guest status for the specified user.

## getCapabilities {#getCapabilities}

`getCapabilities(person)` returns a map of capabilities for a given person.

### Parameters

-   **person**

    A `TemplateNode` object representing the user to check.


### Returns

Returns a map of capabilities as boolean assertions for the specified person.

### Example

```


...
<#assign caps = people.getCapabilities(myPerson)>
<#assign keys = caps?keys>
<#list keys as k>
  <p>${k}: <#if caps[k]>TRUE<#else>FALSE</#if></p>
</#list>

```

The preceding code snippet would result in output such as the following:

```

isGuest: FALSE

isMutable: TRUE

isAdmin: TRUE        
      
```

## getContainerGroups {#getContainerGroups}

`getContainerGroups(person)` returns the groups that contain the specified authorities.

### Parameters

-   **person**

    A `TemplateNode` object representing the user to check.


### Returns

Returns a list of `TemplateNode` objects that represent the groups that contain the specified authority.

### Example

```


<#assign containerGroups = people.getContainerGroups(myPerson)>
<#list containerGroups as cg>
  <p>${cg.name}</p>
  <p>${cg.type}</p>
</#list>
        
      
```

The preceding code snippet would produce output similar to the following:

```

GROUP_ALFRESCO_ADMINISTRATORS

{http://www.alfresco.org/model/content/1.0}authorityContainer

GROUP_EMAIL_CONTRIBUTORS

{http://www.alfresco.org/model/content/1.0}authorityContainer

ef14d966-9e21-4096-a4a4-72bbf1e43e73

{http://www.alfresco.org/model/content/1.0}authorityContainer        
      
```

## getGroup {#getGroup}

`getGroup(groupName)` returns the group corresponding to the specified group name.

### Parameters

-   **groupName**

    A string representing the name of the group to be returned.


### Returns

Returns a `TemplateNode` object representing the group whose group name was specified.

### Example

```


<#assign myGroup = people.getGroup("GROUP_ALFRESCO_ADMINISTRATORS")>
<p>id: ${myGroup.id}</p>
<p>name: ${myGroup.name}</p>
<p>type: ${myGroup.type}</p>
        
      
```

The preceding code snippet would produce output similar to the following:

```

id: GROUP_ALFRESCO_ADMINISTRATORS

name: GROUP_ALFRESCO_ADMINISTRATORS

type: {http://www.alfresco.org/model/content/1.0}authorityContainer      
      
```

## getMembers {#getMembers}

`getMembers` these methods return the members of a group.

### getMembers(group)

`getMembers(group)` returns the members of a group including all sub-groups.

#### Parameters

-   **group**

    A `TemplateNode` object representing the group to return the members of.


#### Returns

Returns a list of `TemplateNode` objects representing the members of the specified group.

#### Example

```


<#assign members = people.getMembers(myGroup)>
<#list members as m>
  <p>${m.name}</p>
  <p>${m.id}</p>
</#list>

      
```

The preceding code snippet will return members of the specified group and sub-groups.

### getMembers(group, recurse)

`getMembers(group, recurse)` returns the members of a group.

#### Parameters

-   **group**

    A `TemplateNode` object representing the group to return the members of.

-   **recurse**

    If true the method will return members including sub-groups. If false members of sub-groups will not be returned.


#### Returns

Returns a list of `TemplateNode` objects representing the members of the specified group.

#### Example

```


<#assign members = people.getMembers(myGroup, false)>
<#list members as m>
  <p>${m.name}</p>
  <p>${m.id}</p>
</#list>

        
```

The preceding code snippet will return members of the specified group, but will not return members of sub-groups.


## getPerson {#getPerson}

`getPerson(username)` returns a person object given the person's user name.

### Parameters

-   **username**

    A string representing the user name of the user to return.


### Returns

Returns a `TemplateNode` object representing the user with the specified user name.

### Example

```


<p><#assign myPerson = people.getPerson("admin")></p>
<p>${myPerson.properties.userName}: ${myPerson.type}</p>

<table>
  <#-- Get a list of all the property names for the document -->
  <#assign props = myPerson.properties?keys>
  <#list props as t>
    <#-- If the property exists -->
    <#if myPerson.properties[t]?exists>

      <#-- If it is a date, format it accordingly-->
      <#if myPerson.properties[t]?is_date>
        <tr><td>${t} = ${myPerson.properties[t]?date}</td></tr>
       
      <#-- If it is a boolean, format it accordingly-->
      <#elseif myPerson.properties[t]?is_boolean>
        <tr><td>${t} = ${myPerson.properties[t]?string("yes", "no")}</td></tr>
       
      <#-- Otherwise treat it as a string -->
     <#else>
       <tr><td>${t} = ${myPerson.properties[t]}</td></tr>
     </#if>
    </#if>
  </#list>
</table>

```

The preceding code snippet would produce output similar to the following:

```

admin: {http://www.alfresco.org/model/content/1.0}person

{http://www.alfresco.org/model/content/1.0}name = c0d30157-535e-4e31-b2fa-2a194ab5a8e6
{http://www.alfresco.org/model/content/1.0}firstName = Administrator
{http://www.alfresco.org/model/content/1.0}homeFolder = Node Type: {http://www.alfresco.org/model/content/1.0}folder	Node Ref: workspace://SpacesStore/ea0f4d70-7edf-42db-b25a-a1acf7ee70d8
{http://www.alfresco.org/model/content/1.0}homeFolderProvider = bootstrapHomeFolderProvider
{http://www.alfresco.org/model/content/1.0}owner = admin
{http://www.alfresco.org/model/content/1.0}email = admin@alfresco.com
{http://www.alfresco.org/model/system/1.0}locale = en_US
{http://www.alfresco.org/model/content/1.0}userName = admin
{http://www.alfresco.org/model/system/1.0}store-protocol = workspace
{http://www.alfresco.org/model/system/1.0}store-identifier = SpacesStore
{http://www.alfresco.org/model/content/1.0}organizationId =
{http://www.alfresco.org/model/content/1.0}preferenceValues = org.alfresco.repo.template.BaseContentNode$TemplateContentData@2b80c6ea
{http://www.alfresco.org/model/system/1.0}node-dbid = 27
{http://www.alfresco.org/model/system/1.0}node-uuid = c0d30157-535e-4e31-b2fa-2a194ab5a8e6
{http://www.alfresco.org/model/content/1.0}lastName =
      
```

## isAccountEnabled {#isAccountEnabled}

`isAccountEnabled(person)` returns the status of the specified user.

### Parameters

-   **person**

    A `TemplateNode` object representing the user to check.


### Returns

Returns true if the specified user account is enabled, false otherwise.

### Example

```

          
<p>isAccountEnabled: <#if people.isAccountEnabled(myPerson)>TRUE<#else>FALSE</#if></p>
<p>isAdmin: <#if people.isAdmin(myPerson)>TRUE<#else>FALSE</#if></p>
<p>isGuest: <#if people.isGuest(myPerson)>TRUE<#else>FALSE</#if></p>
        
      
```

The preceding code snippet would produce output similar to the following:

```

isAccountEnabled: TRUE

isAdmin: TRUE

isGuest: FALSE      
      
```

## isAdmin {#isadmin}

`isAdmin(person)` returns the administrator status of the specified user.

### Parameters

-   **person**

    A `TemplateNode` object representing the user to check.


### Returns

Returns true of the specified user is an Administrator, false otherwise.

### Example

```

          
<p>isAccountEnabled: <#if people.isAccountEnabled(myPerson)>TRUE<#else>FALSE</#if></p>
<p>isAdmin: <#if people.isAdmin(myPerson)>TRUE<#else>FALSE</#if></p>
<p>isGuest: <#if people.isGuest(myPerson)>TRUE<#else>FALSE</#if></p>
        
      
```

The preceding code snippet would produce output similar to the following:

```

isAccountEnabled: TRUE

isAdmin: TRUE

isGuest: FALSE      
      
```

## isGuest {#isguest}

`isGuest(person)` returns the guest status for the specified user.

### Parameters

-   **person**

    A `TemplateNode` object representing the user to check.


### Returns

Returns true if the specified user is a guest, false otherwise.

### Example

```

          
<p>isAccountEnabled: <#if people.isAccountEnabled(myPerson)>TRUE<#else>FALSE</#if></p>
<p>isAdmin: <#if people.isAdmin(myPerson)>TRUE<#else>FALSE</#if></p>
<p>isGuest: <#if people.isGuest(myPerson)>TRUE<#else>FALSE</#if></p>
        
      
```

The preceding code snippet would produce output similar to the following:

```

isAccountEnabled: TRUE

isAdmin: TRUE

isGuest: FALSE      
      
```

## VersionHistoryNode API {#versionhistorynode-api}

The `VersionHistoryNode` is an extension of the `BaseContentNode` type. The `versionHistory` property of the `TemplateNode` object returns a sequence of `VersionHistoryNode` objects that represent the version history for the document.

### Properties

Each `VersionHistoryNode` objects have the following properties:

|Property|Description|
|--------|-----------|
|`aspects`|Returns the list of aspects applied to this node as a set of QNames.|
|`children`|Returns the children of this node as a list of `TemplateProperties` objects.|
|`createdDate`|Created date of the version.|
|`creator`|Creator of the version.|
|`description`|Version history description.|
|`id`|GUID for the node.|
|`isMajorVersion`|Boolean true if this was a major version.|
|`name`|Name property of the node version record.|
|`nodeRef`|`NodeRef` string for the node.|
|`parent`|Returns the primary parent of this node.|
|`properties`|Returns a map of the properties of the object.|
|`title`|Get the title of the node.|
|`type`|Fully qualified QName type of the node.|
|`url`|URL to the content stream for the frozen content state.|
|`versionLabel`|Version label of the version record.|

> **Note:** The property version.store.enableAutoVersionOnUpdateProps is set to false by default. This means that the version history is not incremented when using Edit Properties in Share. Set this property to version.store.enableAutoVersionOnUpdateProps=true in `alfresco-global.properties` to enable this property.

### Example

```


<#assign versionHistoryNodes = node.versionHistory>

<#list versionHistoryNodes as vhn>

  <p>aspects:</p>
  <ul>
    <#list vhn.aspects as aspect>
      <li>${aspect}</li>
    </#list>
  </ul>

 <p>children:</p>
 <#if vhn.children?exists>
   <ul>
     <#list vhn.children as child>
       <li>${child.properties.name}</li>
     </#list>
   </ul>
 <#else>
   <p>No children</p>
 </#if>

   <p>createDate (and time): ${vhn.createdDate?datetime}</p>
 
   <p>creator: ${vhn.creator}</p>
   <p>description: <#if vhn.description?exists>${vhn.description}<#else>None</#if></p>
   <p>id: ${vhn.id}</p>
   <p>isMajorVersion: <#if vhn.isMajorVersion>TRUE<#else>FALSE</#if></p>
   <p>name: ${vhn.name}</p>
   <p>nodeRef: ${vhn.nodeRef}</p>
   <p>parent: <#if vhn.parent?exists>${parent.id}<#else>None</#if></p>
   <p>type: ${vhn.type}</p>
   <p>url: ${vhn.url}</p>
   <p>versionLabel: ${vhn.versionLabel}</p>
   
  <hr/>
  
   <p>All properties for the VersionHistoryNode object:</p>

   <table border=1>
     <#assign object = vhn>
     <#assign props = object.properties?keys>
     <#list props as t>
     <#if object.properties[t]?exists>
       <#if object.properties[t]?is_date>
         <tr><td>${t} = ${object.properties[t]?date}</td></tr>
       <#elseif object.properties[t]?is_boolean>
         <tr><td>${t} = ${object.properties[t]?string("yes", "no")}</td></tr>
        <#elseif object.properties[t]?is_sequence>
          <tr><td>
              <#assign items = object.properties[t]>
              <#assign i = 0>
                ${t}=
                <#list items as item>
                  <p>${i}: ${item}</p>
                  <#assign i = i+1>
                </#list>
          </td></tr>
        <#else>
        <tr><td>${t} = ${object.properties[t]}</td></tr>
        </#if>
     </#if>
    </#list>
   </table>
   
   <hr/>

   <p>content: ${cropContent(vhn.properties.content, 150)}</p>
  
   <hr/>

   <p>auditable: <#if vhn.hasAspect("cm:auditable")>TRUE<#else>FALSE</#if></p>
   <p>author: <#if vhn.hasAspect("cm:author")>TRUE<#else>FALSE</#if></p>
   <p>title: <#if vhn.hasAspect("cm:titled")>TRUE<#else>FALSE</#if></p>
   <p>taggable: <#if vhn.hasAspect("cm:taggable")>TRUE<#else>FALSE</#if></p>
   
   <hr/>

</#list>

      
```

The preceding code would generate output similar to the following:

```

aspects:

{http://www.alfresco.org/model/content/1.0}auditable
{http://www.alfresco.org/model/system/1.0}referenceable
{http://www.alfresco.org/model/content/1.0}titled
{http://www.alfresco.org/model/rendition/1.0}renditioned
{http://www.alfresco.org/model/content/1.0}taggable
{http://www.alfresco.org/model/content/1.0}author
{http://www.alfresco.org/model/system/1.0}localized
{http://www.alfresco.org/model/forum/1.0}discussable
{http://www.alfresco.org/model/application/1.0}inlineeditable
{http://www.alfresco.org/model/forum/1.0}commentsRollup
{http://www.alfresco.org/model/content/1.0}versionable

children: No children

createDate (and time): Jan 9, 2012 2:16:43 PM

creator: admin

description: None

id: 7a37ec71-8b40-44be-be1d-5e2123cf0098

isMajorVersion: FALSE

name: TEST

nodeRef: versionStore://version2Store/7a37ec71-8b40-44be-be1d-5e2123cf0098

parent: None

type: {http://www.alfresco.org/model/content/1.0}content

url: /d/d/versionStore/version2Store/7a37ec71-8b40-44be-be1d-5e2123cf0098/TEST

versionLabel: 1.8

All properties for the VersionHistoryNode object:

{http://www.alfresco.org/model/content/1.0}creator = admin
{http://www.alfresco.org/model/content/1.0}author = Tony
{http://www.alfresco.org/model/content/1.0}autoVersion = yes
{http://www.alfresco.org/model/content/1.0}autoVersionOnUpdateProps = yes
{http://www.alfresco.org/model/system/1.0}locale = en_US
{http://www.alfresco.org/model/forum/1.0}commentCount = 2
{http://www.alfresco.org/model/system/1.0}store-protocol = workspace
{http://www.alfresco.org/model/content/1.0}taggable=
0: workspace://SpacesStore/fd353ba5-bfc3-4b32-b178-02206cf48d19

1: workspace://SpacesStore/e8fc0d83-8127-4015-942d-212303112ef1

2: workspace://SpacesStore/d05e3921-063e-4ced-b2ae-dc918ed3e14c

3: workspace://SpacesStore/43aacfb5-899a-4185-83a1-e88f51861d99

4: workspace://SpacesStore/5f8cebc4-ae48-404f-bdb5-5ed2e73aa180

{http://www.alfresco.org/model/application/1.0}editInline = yes
{http://www.alfresco.org/model/content/1.0}content = org.alfresco.repo.template.BaseContentNode$TemplateContentData@34df2786
{http://www.alfresco.org/model/content/1.0}title = My sample test program
{http://www.alfresco.org/model/system/1.0}node-uuid = eae9d90f-706f-46ba-9cc5-63b31e1e7fcb
{http://www.alfresco.org/model/content/1.0}modifier = admin
{http://www.alfresco.org/model/content/1.0}name = TEST
{http://www.alfresco.org/model/content/1.0}modified = Jan 9, 2012
{http://www.alfresco.org/model/content/1.0}initialVersion = yes
{http://www.alfresco.org/model/system/1.0}store-identifier = SpacesStore
{http://www.alfresco.org/model/content/1.0}created = Jan 5, 2012
{http://www.alfresco.org/model/system/1.0}node-dbid = 1,927
{http://www.alfresco.org/model/content/1.0}versionLabel = 1.8
{http://www.alfresco.org/model/content/1.0}description = A sample test program

content: The first 150 bytes content of the file ...

auditable: TRUE

author: TRUE

title: TRUE

taggable: TRUE

...
      
```

-   **[hasAspect](#hasaspect)**  
`hasAspect(aspect)` returns a boolean corresponding to whether or not the node has the specified aspect.

## hasAspect {#hasAspect}

`hasAspect(aspect)` returns a boolean corresponding to whether or not the node has the specified aspect.

### Parameters

-   **aspect**

    A string representing the aspect to check for.


### Returns

Returns true if the specified aspect is present, false otherwise.

### Example

```


...
<p>auditable: <#if vhn.hasAspect("cm:auditable")>TRUE<#else>FALSE</#if></p>
<p>author: <#if vhn.hasAspect("cm:author")>TRUE<#else>FALSE</#if></p>
<p>title: <#if vhn.hasAspect("cm:titled")>TRUE<#else>FALSE</#if></p>
<p>taggable: <#if vhn.hasAspect("cm:taggable")>TRUE<#else>FALSE</#if></p>
...
        
      
```

## Workflow API {#workflow-api}

The `workflow` root object provides read access to the in-progress and finished tasks for the current user. It also provides a function to look up a single task by its task ID. The functions described mostly return `WorkflowTaskItem` objects.

|Property|Description|
|--------|-----------|
|`assignedTasks`|Returns a list of `WorkflowTaskItem` objects representing the assigned tasks for the current user.|
|`completedTasks`|Returns a list of `WorkflowTaskItem` objects representing the completed tasks for the current user.|
|`pooledTasks`|Returns a list of `WorkflowTaskItem` objects representing the pooled tasks for the current user.|

### Example

For example, Workflow Tasks Todo for the current user:

```

            
            My Tasks Todo:
 <table cellspacing=0 cellpadding=2>
   <tr>
      <th>ID</th>
      <th>Type</th>
      <th>Name</th>
      <th>Description</th>
      <th>Created Date</th>
      <th>Start Date</th>
      <th>Due Date</th>
      <th>Priority</th>
      <th>% Complete</th>
      <th>Status</th>
      <th>Completed</th>
   <tr>
   <#list workflow.assignedTasks as t>
      <tr>
         <td>${t.id}</td>
         <td>${t.type}</td>
         <td>${t.name}</td>
         <td>${t.description}</td>
         <td>${t.properties["cm:created"]?datetime}</td>
         <td><#if t.properties["bpm:startDate"]?exists>${t.properties["bpm:startDate"]?datetime}<#else><i>None</i></#if></td>
         <td><#if t.properties["bpm:dueDate"]?exists>${t.properties["bpm:dueDate"]?datetime}<#else><i>None</i></#if></td>
         <td>${t.properties["bpm:priority"]}</td>
         <td>${t.properties["bpm:percentComplete"]}</td>
         <td>${t.properties["bpm:status"]}</td>
         <td>${t.isCompleted?string("Yes", "No")}</td>
      </tr>
   </#list>
 </table>
 
      
```

The preceding code snippet would return something similar to (depending on what tasks are in the system):

|ID|Type|Name|Description|Created Date|Start Date|Due Date|Priority|% Complete|Status|Completed|
|--|----|----|-----------|------------|----------|--------|--------|----------|------|---------|
|activiti$144|Adhoc Task|Adhoc Task allocated by colleague|Admin please review this and return! Thanks!|Dec 14, 2011 10:40:11 AM|Dec 14, 2011 10:40:11 AM|Dec 31, 2011 12:00:00 AM|2|0|In Progress|No|
|activiti$207|Adhoc Task|Adhoc Task allocated by colleague|Meeting minutes need reviewing!|Dec 14, 2011 10:42:06 AM|Dec 14, 2011 10:42:06 AM|Dec 31, 2011 12:00:00 AM|2|0|In Progress|No|

In the preceding example the Process Engine is used, as can be seen from the IDs. However, the `bpm:*` properties are independent of the engine used, so they are returned by the Process Engine. Before handing over the task and its properties, the `workflowService` implementation maps Alfresco Process Services-specific fields and variables (description, duedate, and so on) to the corresponding `bpm:*` properties.

-   **[getTaskById](#gettaskbyid)**  
`getTaskById(taskId)` returns a single object representing a task for the specified Task ID for the current user.
-   **[WorkflowTaskItem API](#workflowtaskitem-api)**  
A wrapper around a WorkflowTask item.

## getTaskById {#getTaskById}

`getTaskById(taskId)` returns a single object representing a task for the specified Task ID for the current user.

### Parameters

-   **taskId**

    A string representing the task ID of the task to return.


### Returns

Returns a `WorkflowTaskItem` object for the task specified by the task ID.

### Example

```


<#-- task is WorkflowTaskItem object -->
<#assign task = workflow.getTaskById("activiti$144")>

<p>id: ${task.id}</p>
<p>initiator: ${task.initiator.properties.userName}</p>
<p>isCompleted: <#if task.isCompleted>TRUE<#else>FALSE</#if></p>
<p>name: ${task.name}</p>
<p>outcome: <#if task.isCompleted>${task.outcome}<#else>Task not yetcomplete!</#if></p>
<p>package: ${task.package}</p>
<p>Listing package resources...
  <ul>
    <#list task.packageResources as pr>
      <li>${pr}</li>
    </#list>
  </ul>
<p>qnameType: ${task.qnameType}</p>
<p>startDate: ${task.startDate?date}</p>
<p>type: ${task.type}</p>

<p>transitions:</p>
<ul>
  <#list task.transitions as tx>
    <li>transition:
    <#assign keys = tx?keys> 
      <ul>
        <#list keys as k>
          <li>${k}=${tx[k]}</li>
        </#list>
      </ul>
    </li>
  </#list>
</ul>

<hr/>

<p>All properties for the task (WorkflowTaskItem) object:</p>

<table border=1>
<#assign props = task.properties?keys>
<#list props as t>
  <#-- If the property exists -->
  <#if task.properties[t]?exists>
     <#-- If it is a date, format it accordingly-->
     <#if task.properties[t]?is_date>
     <tr><td>${t} = ${task.properties[t]?date}</td></tr>
     
     <#-- If it is a boolean, format it accordingly-->
     <#elseif task.properties[t]?is_boolean>
     <tr><td>${t} = ${task.properties[t]?string("yes", "no")}</td></tr>

     <#-- If it is a sequence, format it accordingly-->
     <#elseif task.properties[t]?is_sequence>
     <tr><td>
         <#assign items = task.properties[t]>
         <#assign i = 0>
           ${t}=
           <#list items as item>
           <p>${i}: ${item}</p>
           <#assign i = i+1>
         </#list>
     </td></tr>

     
     <#-- Otherwise treat it as a string -->
     <#else>
     <tr><td>${t} = ${task.properties[t]}</td></tr>
     </#if>
  </#if>
</#list>
</table>        

      
```

The preceding code snippet would generate output similar to the following:

```

id: activiti$147

initiator: admin

isCompleted: FALSE

name: Task allocated by colleague

outcome: Task not yetcomplete!

package: workspace://SpacesStore/dbe1f1b1-333f-421e-9f5b-ed260af8f9d4

Listing package resources...

qnameType: {http://www.alfresco.org/model/workflow/1.0}adhocTask

startDate: Jul 24, 2014

type: Task

transitions:

    transition:
        label=Task Done
        id=Next

All properties for the task (WorkflowTaskItem) object:
{http://www.alfresco.org/model/content/1.0}name = Task
{http://www.alfresco.org/model/bpm/1.0}startDate = Jul 24, 2014
{http://www.alfresco.org/model/bpm/1.0}package = Node Type: {http://www.alfresco.org/model/bpm/1.0}package Node Ref: workspace://SpacesStore/dbe1f1b1-333f-421e-9f5b-ed260af8f9d4
{http://www.alfresco.org/model/bpm/1.0}packageActionGroup = add_package_item_actions
{http://www.alfresco.org/model/bpm/1.0}packageItemActionGroup = edit_package_item_actions
{http://www.alfresco.org/model/content/1.0}owner = admin
{http://www.alfresco.org/model/bpm/1.0}percentComplete = 0
{http://www.alfresco.org/model/bpm/1.0}dueDate = Jul 31, 2014
{http://www.alfresco.org/model/bpm/1.0}reassignable = yes
{http://www.alfresco.org/model/bpm/1.0}hiddenTransitions =
{http://www.alfresco.org/model/bpm/1.0}description = My Task
{http://www.alfresco.org/model/content/1.0}created = Jul 24, 2014
{http://www.alfresco.org/model/bpm/1.0}status = Not Yet Started
{http://www.alfresco.org/model/bpm/1.0}taskId = 147
{http://www.alfresco.org/model/bpm/1.0}priority = 2
{http://www.alfresco.org/model/bpm/1.0}pooledActors= 
      
```

## WorkflowTaskItem API {#workflowtaskitem-api}

A wrapper around a WorkflowTask item.

|Property|Description|
|--------|-----------|
|`description`|The task description value.|
|`id`|The task ID.|
|`initiator`|Returns a `TemplateNode` representing the user who initiated the workflow task.|
|`isCompleted`|Boolean value true if the task has been completed.|
|`name`|The task name value.|
|`outcome`|A string representing the outcome label from a completed task.|
|`package`|Returns the `NodeRef` to the workflow package node.|
|`packageResources`|Returns a list of `TemplateContent` objects representing the node resources from the package attached to this workflow task.|
|`packageTemplateNode`|Returns the workflow package reference as a `TemplateNode`.|
|`properties`|A map of all the properties for the task; includes all appropriate Alfresco Process Services and BPM model properties.|
|`qnameType`|A string representing the underlying QName model type of the workflow task.|
|`startDate`|Start date of the workflow task.|
|`transitions`|Returns a map of the available task transition names to transition Labels and IDs.|
|`type`|Workflow task type value.|

## Web Scripts {#web-scripts}

This information provides reference material for web script options, objects, and methods.

This reference guide contains detailed information on:

1.  Web script description language XML reference
2.  Web script root objects reference
3.  FreeMarker template methods reference

-   **[Web script description language reference](#web-script-description-language-reference)**  
Web script description language XML reference and description of advanced options.
-   **[Root objects available in all web scripts](#root-objects-available-in-all-web-scripts)**  
This information lists some of the more commonly used root objects that are available to web scripts, regardless of the context in which they run.
-   **[Root objects available in repository tier web scripts](#root-objects-available-in-repository-tier-web-scripts)**  
This information lists root objects additionally available when scripts are running in the repository tier context. These objects provide access to repository services.
-   **[Root objects available in all templates](#root-objects-available-in-all-templates)**  
This information lists root objects that are available to template code running in all contexts.
-   **[Root objects available in repository tier templates](#root-objects-available-in-repository-tier-templates)**  
This information lists root objects that are additionally available to template code running in the repository tier.
-   **[Root objects reference](#root-objects-reference)**  
This information contains more detail on each of the root objects.
-   **[FreeMarker template methods](#freemarker-template-methods)**  
The FreeMarker template language supports the notion of a method, which encapsulates an action to perform on a set of input parameters and can return an output value.
-   **[API references](#api-references)**  
This information contains details of useful API references.

## Web script description language reference {#web-script-description-language-reference}

Web script description language XML reference and description of advanced options.

Use this information to understand the web script description language.

-   **[webscript](#webscript)**  
The `webscript` element in a web descriptor file provides the root XML element. The `webscript` element is required.
-   **[shortname](#shortname)**  
The `shortname` element in a web descriptor file provides a human readable name for the web script. The `shortname` element is required.
-   **[description](#description)**  
The `description` element in a web descriptor file provides documentation for the web script. The `description` element is optional.
-   **[url](#url)**  
The `url` element represents a URI template to which the web script is bound. Variants of the URI template which specify a format do not need to be registered, however, specifying them is useful for documentation purposes. There must be at least one `url` element, but there can be several.
-   **[format](#format)**  
The `format` element controls how the content-type of the response can be specified by using the URI. The `format` element is optional.
-   **[authentication](#authentication)**  
The `authentication` element specifies the level of authentication required to run the web script. The `authentication` element is optional.
-   **[transaction](#transaction)**  
The `transaction` element specifies the transaction level required to run the web script. The `transaction` element is optional.
-   **[family](#family)**  
The `family` element allows a web script developer to categorize their web scripts. Any value can be assigned to family and any number of families can be assigned to the web script, providing a freeform tagging mechanism. The web script index provides views for navigating web scripts by family. The family tag can be repeated if the script belongs to multiple families. The `family` element is optional.
-   **[cache](#cache)**  
The `cache` element specifies the required caching level. The `cache` element is optional.
-   **[negotiate](#negotiate)**  
The `negotiate` element associates an Accept header MIME type to a specific web script format of response. The mandatory value specifies the format while the mandatory attribute, `accept`, specifies the MIME type. Content Negotiation is enabled with the definition of at least on `negotiate` element. The `negotiate` element can be specified zero or more times.
-   **[lifecycle](#lifecycle)**  
The `lifecycle` element allows a web script developer to indicate the development status of a web script. Typically, web scripts start out in a draft state while being developed or tested, are promoted to production quality for widespread use, and finally retired at the end of their life. The `lifecycle` element is optional.
-   **[formdata](#formdata)**  
The `formdata` element is optional.
-   **[args](#args)**  
The `args` element represents a list of arguments passed to the web script. This are listed for documentation purposes. The `args` element is optional.
-   **[responses](#responses)**  
The `responses` element represents a collection of response types for the web script. The `responses` element is optional.
-   **[requests](#requests)**  
The `requests` element represents a collection of request types for the web script. The `requests` element is optional.

## webscript {#webscript}

The `webscript` element in a web descriptor file provides the root XML element. The `webscript` element is required.

The `webscript` element has the following attributes:

-   **`kind` (optional)**

    Different kinds of web scripts can be created. When this attribute is specified it allows a web script kind other than the default to be specified. An example kind is `org.alfresco.repository.content.stream`. This kind of web script returns a binary stream from the repository back to the client. This might be useful for returning a thumbnail binary to the client for example. It is also possible to create additional web script kinds according to your needs.


`webscript` element example:

```

**<webscript kind="org.alfresco.repository.content.stream">**
  <shortname>Thumbnails</shortname>
  <description>Get a named thumbnail for a content resource</description>
  <url>/api/node/{store_type}/{store_id}/{id}/content{property}/thumbnails/{thumbnailname}</url>  
  <url>/api/path/{store_type}/{store_id}/{id}/content{property}/thumbnails/{thumbnailname}</url>
  <format default="">argument</format>
  <authentication>guest</authentication>
  <transaction>required</transaction>
</webscript>
        
```

## shortname {#shortname}

The `shortname` element in a web descriptor file provides a human readable name for the web script. The `shortname` element is required.

The `shortname` element has no attributes.

`shortname` element example:

```

<webscript kind="org.alfresco.repository.content.stream">
  **<shortname>Thumbnails</shortname>**
  <description>Get a named thumbnail for a content resource</description>
  <url>/api/node/{store_type}/{store_id}/{id}/content{property}/thumbnails/{thumbnailname}</url>  
  <url>/api/path/{store_type}/{store_id}/{id}/content{property}/thumbnails/{thumbnailname}</url>
  <format default="">argument</format>
  <authentication>guest</authentication>
  <transaction>required</transaction>
</webscript>
        
```

## description {#description}

The `description` element in a web descriptor file provides documentation for the web script. The `description` element is optional.

The `description` element has no attributes.

`description` element example:

```

<webscript kind="org.alfresco.repository.content.stream">
  <shortname>Thumbnails</shortname>
  **<description>Get a named thumbnail for a content resource</description>**
  <url>/api/node/{store_type}/{store_id}/{id}/content{property}/thumbnails/{thumbnailname}</url>  
  <url>/api/path/{store_type}/{store_id}/{id}/content{property}/thumbnails/{thumbnailname}</url>
  <format default="">argument</format>
  <authentication>guest</authentication>
  <transaction>required</transaction>
</webscript>
        
```

## url {#url}

The `url` element represents a URI template to which the web script is bound. Variants of the URI template which specify a format do not need to be registered, however, specifying them is useful for documentation purposes. There must be at least one `url` element, but there can be several.

The `url` element has no attributes.

`url` element example:

```

<webscript>
  <shortname>Alfresco Repo Usage</shortname>
  <description>
  JSON Returned:
  {
   "lastUpdate" : 1298463432794,
   "users" : 1,
   "documents" : 54,
   "licenseMode" : "TEAM",
   "readOnly" : false,
   "updated" : true,
   "licenseValidUntil" : null,
   "level" : 0,
   "warnings": [],
   "errors": []
  }
  level 0: nothing to report
  level 1: report warnings and errors to admin only
  level 2: report warnings and errors to all
  level 3: report warnings and errors to all; system is locked for updates
  </description>
  **<url>/api/admin/usage</url>**
  <format default="json"/>
  <authentication>guest</authentication>
  <transaction allow="readonly">required</transaction>
  <family>Admin</family>
  <lifecycle>internal</lifecycle>
</webscript>
      
```

## format {#format}

The `format` element controls how the content-type of the response can be specified by using the URI. The `format` element is optional.

The `format` element can have the following values:

-   **`argument`**

    The content-type is specified by using the format query string parameter, for example `/helloworld?to=dave&format=xml`.

-   **`extension`**

    The content-type is specified by using the URI extension, for example `/hello/world.xml?to=dave`.

-   **`any`**

    Either `argument` or `extension` can be used. This is the default where none is specified.


The `format` element also has the following attributes:

-   **`default` (optional)**

    If the caller does not specify a required content-type at all, the default content-type is taken from the `default` attribute of the `format` element. By default, if not set, the html format is assumed. In some cases, a URI might decide upon a response content-type at runtime. For these URIs, specify an empty format, for example format `default=""`.


`format` element example:

```

<webscript>
  <shortname>Alfresco Repo Usage</shortname>
  <description>
  JSON Returned:
  {
   "lastUpdate" : 1298463432794,
   "users" : 1,
   "documents" : 54,
   "licenseMode" : "TEAM",
   "readOnly" : false,
   "updated" : true,
   "licenseValidUntil" : null,
   "level" : 0,
   "warnings": [],
   "errors": []
  }
  level 0: nothing to report
  level 1: report warnings and errors to admin only
  level 2: report warnings and errors to all
  level 3: report warnings and errors to all; system is locked for updates
  </description>
  <url>/api/admin/usage</url>
  **<format default="json"/>**
  <authentication>guest</authentication>
  <transaction allow="readonly">required</transaction>
  <family>Admin</family>
  <lifecycle>internal</lifecycle>
</webscript>
        
```

## authentication {#authentication}

The `authentication` element specifies the level of authentication required to run the web script. The `authentication` element is optional.

The `authentication` element can have the following values:

-   **`none`**

    Specifies that no authentication is required to run the web script. This is the default value if the authentication level is not explicitly specified.

-   **`guest`**

    Specifies that at least guest level access is required to run the web script.

-   **`user`**

    Specifies that at least a user account is required to run the web script.

-   **`admin`**

    Specifies that at least an adminstrator account is required to run the web script.


The `authentication` element also has the following attributes:

-   **`runas` (optional)**

    The `runas` attribute allows a web script developer to state that the execution of a web script must run as a particular repository user, regardless of who initiated the web script.

    This is useful where the behavior of the web script requires specific permissions to succeed. Due to security concerns, the `runas` attribute is only available for web script implementations placed into the Java classpath.


`authentication` example.

The user to run as is specified through the `runas` attribute of the `<authentication>` element of the web script descriptor. For example:

```
<webscript>
  <shortname>Example Run As Usage</shortname>
  <url>/runas</url>
  **<authentication runas="admin">user</authentication>**
</webscript>
```

Here, the web script still requires a user to authenticate before execution; however, the web script executes as the `admin` user. Repository features, such as auditing, still reflect the user who initiated the web script.

## transaction {#transaction}

The `transaction` element specifies the transaction level required to run the web script. The `transaction` element is optional.

The `transaction` element can have the following values:

-   **`none`**

    Specifies that no transaction is required to run the web script. This is the default value if the transaction level is not explicitly specified, and the authentication level is `none`. If the authentication level is not `none` then the default value is `required`.

-   **`required`**

    Specifies that a transaction is required (and will inherit an existing transaction, if open).

-   **`requiresnew`**

    Specifies that a new transaction is required.


The `transaction` element also has the following attributes:

-   **`allow` (optional)**

    Specifies the type of data transfer allowed. Valid values, which are optional/required, are as follows:

    -   `readonly` - read only transfers allowed
    -   `readwrite` - read and write transfers allowed
-   **`buffersize` (optional)**

    Specifies the buffer size in bytes. Integer value.

    sets the size in bytes of the transactional buffer the webscript will allocate to guard against the potential rollback of a transaction during the webscript processing. If a rollback occurs and the buffer has not been filled, then it is able to rollback without any output from the webscript being committed to the container output stream. This means error responses can be returned instead of partially formed responses with an error embedded into them.

    Buffers are only present where a transaction is required, otherwise they are not used.

    For some webscripts, a buffer is not appropriate and would actually be detrimental to performance - the webscript might require direct access to the output stream not a wrapped buffer object - the `remoteadm` webscripts are such an example.


`transaction` example.

```

<webscript kind="org.alfresco.httpsonly"> 
  <shortname>Hello World</shortname>
  <description>Greet a user</description>
  <url>/sample/helloworld?to={name}</url>
  <url>/sample/helloworld.xml?to={name}</url>
  <format default="html">extension</format>
  <lifecycle>sample</lifecycle>
  <authentication runas="fred">user</authentication>
  **<transaction>required</transaction>**
  <family>Sample</family>
  <cache>
    <never>false</never>
    <public>false</public>
    <mustrevalidate/>
  </cache>
  <negotiate accept="text/html">html</negotiate>
  <negotiate accept="text/xml">xml</negotiate>
</webscript>
        
```

## family {#family}

The `family` element allows a web script developer to categorize their web scripts. Any value can be assigned to family and any number of families can be assigned to the web script, providing a freeform tagging mechanism. The web script index provides views for navigating web scripts by family. The family tag can be repeated if the script belongs to multiple families. The `family` element is optional.

An example usage of the `family` element follows:

```

<webscript>
  <shortname>Example Family Usage</shortname>
  <url>/family</url>
 **<family>CMIS</family>
  <family>Dashlet</family>**
</webscript>
        
```

CAUTION:

Do not use '.' in family names. For example, `my.family` would cause an error if using the family name to navigate to the script.

## cache {#cache}

The `cache` element specifies the required caching level. The `cache` element is optional.

The `cache` element has the following child elements:

-   **`never` (optional)**

    Specifies whether caching should be applied at all. Valid values, which are optional, are as follows:

    -   `true` (default) - specifies the web script response should never be cached.
    -   `false` - specifies the web script response can be cached.
    If `never` is not specified, the default is `true`.

-   **`public` (optional)**

    Specifies whether authneticated responses should be cached in the public cache. Valid values, which are optional, are as follows:

    -   `true` (default) - specifies the web script authenticated response can be cached in a public cache.
    -   `false` - specifies the web script authenticated response cannot be cached in a public cache.
    If `public` is not specified, the default is false.

-   **`mustrevalidate` (optional)**

    Specifies whether a cache must revalidate its version of the web script response in order to ensure freshness. Valid values, which are optional, are as follows:

    -   `true` (default) - specifies that validation must occur.
    -   `false` - specifies that validation can occur.
    If `mustrevalidate` is not specified, the default is true.


An example usage of the `cache` element follows:

```

<webscript kind="org.alfresco.httpsonly"> 
  <shortname>Hello World</shortname>
  <description>Greet a user</description>
  <url>/sample/helloworld?to={name}</url>
  <url>/sample/helloworld.xml?to={name}</url>
  <format default="html">extension</format>
  <lifecycle>sample</lifecycle>
  <authentication runas="fred">user</authentication>
  <transaction>required</transaction>
  <family>Sample</family>
  **<cache>
    <never>false</never>
    <public>false</public>
    <mustrevalidate/>
  </cache>**
  <negotiate accept="text/html">html</negotiate>
  <negotiate accept="text/xml">xml</negotiate>
</webscript>        
        
```

## negotiate {#negotiate}

The `negotiate` element associates an Accept header MIME type to a specific web script format of response. The mandatory value specifies the format while the mandatory attribute, `accept`, specifies the MIME type. Content Negotiation is enabled with the definition of at least on `negotiate` element. The `negotiate` element can be specified zero or more times.

The `negotiate` element has the following attributes:

-   **`accept`**

    Specifies the MIME type.


An example usage of the `negotiate` element follows:

```

<webscript kind="org.alfresco.httpsonly"> 
  <shortname>Hello World</shortname>
  <description>Greet a user</description>
  <url>/sample/helloworld?to={name}</url>
  <url>/sample/helloworld.xml?to={name}</url>
  <format default="html">extension</format>
  <lifecycle>sample</lifecycle>
  <authentication runas="fred">user</authentication>
  <transaction>required</transaction>
  <family>Sample</family>
  <cache>
    <never>false</never>
    <public>false</public>
    <mustrevalidate/>
  </cache>
  **<negotiate accept="text/html">html</negotiate>
  <negotiate accept="text/xml">xml</negotiate>**
</webscript>        
        
```

## lifecycle {#lifecycle}

The `lifecycle` element allows a web script developer to indicate the development status of a web script. Typically, web scripts start out in a draft state while being developed or tested, are promoted to production quality for widespread use, and finally retired at the end of their life. The `lifecycle` element is optional.

The `lifecycle` element can have the following values:

-   **`none`**

    Indicates this web script is not part of a lifecycle


-   **`sample`**

    Indicates this web script is a sample and is not intended for production use


-   **`draft`**

    Indicates this web script might be incomplete, experimental, or still subject to change


-   **`public_api`**

    Indicates this web script is part of a public API and should be stable and well tested


-   **`draft_public_api`**

    Indicates this web script is intended to become part of the public API but is incomplete or still subject to change


-   **`deprecated`**

    Indicates this web script should be avoided; it might be removed in future versions of the product


-   **`internal`**

    Indicates this web script is for Alfresco Content Services use only; it should not be relied upon between versions and is likely to change


The `lifecycle` element has no attributes.

`Lifecycle` option example:

```

<webscript>
<shortname>Example Lifecycle Usage</shortname>
<url>/lifecycle</url>
**<lifecycle>sample</lifecycle>**
</webscript>

```

## formdata {#formdata}

The `formdata` element is optional.

The `formdata` element can have the following values:

-   **``**
-   **``**

The `formdata` element has the following attributes.

-   **`multipart-processing`**

    Specifies whether multi-part processing should be on or off. Valid values, which are optional, are as follows:

    -   `true` - turns on multi-part form data processing.
    -   `false` - turns off multi-part form data processing.

`formdata` option example:

```

<webscript>
  <shortname>Alfresco Audit Service Clear</shortname>
  <description>Delete audit entries for a given application and time range</description>
  <url>/api/audit/clear/{application}?fromTime={fromTime}&amp;toTime={toTime}</url>
  <format default="json" />
  <authentication>admin</authentication>
  <transaction>required</transaction>
  <family>Audit</family>
  <lifecycle>internal</lifecycle>
  <args>
    <arg>
      <name>application</name>
      <description>Name of the audit application (mandatory)</description>
    </arg>
    <arg>
      <name>fromTime</name>
      <description>Time, in milliseconds, of the oldest audit entry to delete (omit to assume oldest)</description>
    </arg>
    <arg>
      <name>toTime</name>
      <description>Time, in milleseconds, of the youngest audit entry to delete (omit to assume current time)</description>
    </arg>
 </args>

  **<!--  turn off the multipart formdata processing -->
  <formdata multipart-processing="false" />**

</webscript>
        
```

## args {#args}

The `args` element represents a list of arguments passed to the web script. This are listed for documentation purposes. The `args` element is optional.

The `args` element has the following child elements:

-   **`arg`**

    Denotes an argument to the webscript. The `arg` element can contain the following child elements:

    -   `name` - the name of the argument.
    -   `description` - the description of the argument.

The `args` element has no attributes.

`args` element example:

```

<webscript>
  <shortname>Alfresco Audit Service Clear</shortname>
  <description>Delete audit entries for a given application and time range</description>
  <url>/api/audit/clear/{application}?fromTime={fromTime}&amp;toTime={toTime}</url>
  <format default="json" />
  <authentication>admin</authentication>
  <transaction>required</transaction>
  <family>Audit</family>
  <lifecycle>internal</lifecycle>
  **<args>
    <arg>
      <name>application</name>
      <description>Name of the audit application (mandatory)</description>
    </arg>
    <arg>
      <name>fromTime</name>
      <description>Time, in milliseconds, of the oldest audit entry to delete (omit to assume oldest)</description>
    </arg>
    <arg>
      <name>toTime</name>
      <description>Time, in milleseconds, of the youngest audit entry to delete (omit to assume current time)</description>
    </arg>
 </args>**

  <!--  turn off the multipart formdata processing -->
  <formdata multipart-processing="false" />

</webscript>
        
```

## responses {#responses}

The `responses` element represents a collection of response types for the web script. The `responses` element is optional.

The `responses` element has the following child elements:

-   **`response`**

    Denotes a response.


The `response` element has the following attributes:

-   **`type`**

    This attribute specifies the response type.


`responses` element example:

```

<webscript kind="org.alfresco.cmiskind">
  <shortname>Get ACL (getACL)</shortname>
  <description>
  <![CDATA[
  Get the ACL currently applied to the specified document or folder object.
  ]]>
  </description>
  <!-- by object id -->
  <url>/cmis/i/{id}/acl</url>
  <url>/cmis/s/{store}/i/{id}/acl</url>
  <!-- by object path -->
  <url>/cmis/p{path}/acl</url>
  <url>/cmis/s/{store}/p{path}/acl</url>
  <!-- alfresco style -->
  <url>/api/node/{store_type}/{store_id}/{id}/acl</url>
  <url>/api/path/{store_type}/{store_id}/{nodepath}/acl</url>
  <args>
    <arg>
        <shortname>store</shortname>
        <description>the store name</description>
    </arg>
    <arg>
        <shortname>id</shortname>
        <description>the node id of the object</description>
    </arg>
    <arg>
        <shortname>path</shortname>
        <description>the path of the object (relative to CMIS root, typically "Company Home")</description>
    </arg>
    <arg>
        <shortname>nodepath</shortname>
        <description>the path of the object (relative to root of Alfresco store)</description>
    </arg>
  </args>

  <format default="cmisacl">argument</format>
  **<responses>
    <response type="cmis.acl"/>
  </responses>**
  
  <authentication>guest</authentication>
  <transaction allow="readonly"/>
  <family>CMIS</family>
  <lifecycle>deprecated</lifecycle>
</webscript>
        
```

## requests {#requests}

The `requests` element represents a collection of request types for the web script. The `requests` element is optional.

The `requests` element has the following child elements:

-   **`request`**

    Denotes a request.


The `request` element has the following attributes:

-   **`type`**

    This attribute specifies the request type.


`requests` element example:

```

  <format default="cmisacl">argument</format>
  **<requests>
    <request type="cmis.acl"/>
  </requests>**
  <responses>
    <response type="cmis.acl"/>
  </responses>
        
```

## Root objects available in all web scripts {#root-objects-available-in-all-web-scripts}

This information lists some of the more commonly used root objects that are available to web scripts, regardless of the context in which they run.

|Root Object|Type in Script Runtime|Description|
|-----------|----------------------|-----------|
|`args`|Associative array|A map of query parameter values indexed by query parameter name. This is only available if the script was executed using the Script Servlet.|
|`argsM`|Associative array|A map of multi-valued query parameters, where each key is an argument name and each value is an array containing all respective argument values, even if only one is supplied.|
|`atom`|Object|A host object for parsing and generating Atom (Publishing) documents.|
|`cache`|`org.springframework.extensions.webscripts.Cache`|The `cache` object allows control over how the web script response is cached.|
|`config`|XML configuration data from a file|Provides access to the web script configuration read from an XML file.|
|`date`|java.util.Date|The date and time the web script was invoked.|
|`format`|`org.springframework.extensions.webscripts.FormatModel`|The `format` object represents the chosen format of the rendered response.|
|`formdata`|Object|Encapsulates data submitted by using a form. See `formdata` documentation.|
|`guest`|Boolean|A simple boolean value indicating whether the current is a guest user or not.|
|`json`|JSONArray or JSONObject|A host object for parsing and generating JSON objects POSTed to the web script.|
|`jsonUtils`|Object|A host object for parsing and generating JSON objects.|
|`headers`|Associative array|A map of request header values indexed by header name.|
|`headersM`|Associative array|A map of multi-valued request headers, where each key is a header name and each value is an array containing all respective header values, even if only one is supplied.|
|`logger`|Object|A host object providing access to console logging facilities for debugging of scripts. See the [Logging API](#logging-api).|
|`model`|Associative array|An empty associative array that can be populated by the JavaScript. Values placed into this array are available as root objects in Web Script response templates.|
|`msg`|Object|Provides access to the localized messages associated with a web script.|
|`requestbody`|Object|A ScriptContent representing the content of the request body.

 As with formdata, the content can be converted to a string (if appropriate) or written to an output stream such as a content object held in the repository.

 Often, content is posted in a structured form such as XML or JSON. In these cases, the content can be converted to a string and subsequently parsed by the controller script. However, this can become cumbersome or error prone if the parsing is required by several Web Scripts implementations. To alleviate this problem, the Web Scripts framework provides the notion of a Format Reader which parses a request of a given mimetype into an object structure that is then automatically provided to the Controller Script.

 Out-of-the-box, the Web Script framework provides the following Format Readers.

 -   **JSON**

Parses a request of mimetype application/json into a JSON object named `json`.

-   **Atom Feed**

Parses a request of mimetype application/atom+xml;type=feed into an Apache Abdera Feed object named feed.

-   **Atom Entry**

Parses a request of mimetype application/atom+xml;type=entry into an Apache Abdera Entry object named entry.

-   **Atom**

Parses a request of mimetype application/atom+xml into either an Abdera Feed or Entry object named feed and entry respectively.


 Format Readers are not invoked automatically i.e. sending a JSON request to a Web Script does not automatically provide a json root object to the Controller Script. The fall-back requestbody is provided instead.

 To explicitly initiate a Format Reader requires a Controller Script whose name is structured:

 ```
<serviceId>.<httpMethod>.<format>.js
```

 For example:

 ```
folder.post.json.js  => create 'json' root object for Controller Script when application/json mimetype is posted
folder.post.atomentry.js  => create 'entry' root object for Controller Script when application/atom+xml;type=entry mimetype is posted
```

|
|`server`|`org.alfresco.repo.web.scripts.RepositoryServerModel`|A description of the web script container hosting the web script.|
|`status`|`org.springframework.extensions.webscripts.Status`|The `status` object represents a response status.|
|`url`|`org.springframework.extensions.webscripts.DefaultURLModel`|Provides access to the web script URI, or parts of the URI, that triggered the web script.|
|`webscript`|`org.springframework.extensions.webscripts.DescriptionImpl`|The `webscript` object provides metadata describing the web script currently being executed.|

> **Note:** A full list of root objects is available in the [root objects section of the JavaScript API Reference]({% link content-services/5.2/develop/reference/repo-root-objects-ref.md %}).

## Root objects available in repository tier web scripts {#root-objects-available-in-repository-tier-web-scripts}

This information lists root objects additionally available when scripts are running in the repository tier context. These objects provide access to repository services.

|Root Object|Type in Script Runtime|Description|
|-----------|----------------------|-----------|
|`roothome`|Object|The repository root node (only available if access is authenticated)|
|`companyhome`|Object|The company home folder object (only available if access is authenticated)|
|`person`|Object|The person node of the currently authenticated user (only available if user is authenticated)|
|`userhome`|Object|The user home folder (only available if access is authenticated)|
|`search`|Object|A host object providing access to Lucene (Solr) and Saved Search results. See the [Search API](#search-api).|
|`people`|Object|A host object providing access to people and groups. See the [People API](#people-api).|
|`actions`|Object|A host object providing invocation of registered Actions. See the [Actions API](#actions-api).|
|`session`|Object|Session related information such as the current authentication ticket. See the [Session API](#session-api).|
|`classification`|Object|Access to the root elements of the Classification API. See the [Classification API](#classification-api).|
|`utils`|Object|Access to a library of useful helper functions not provided as part of generic JavaScript. See the [Utility methods](#utility-methods).|
|`workflow`|Object|Start workflows and access them, control in-progress workflows. See the [Workflow API](#workflow-api).|

> **Note:** A full list of root objects is available in the [root objects section of the JavaScript API Reference]({% link content-services/5.2/develop/reference/repo-root-objects-ref.md %}).

## Root objects available in all templates {#root-objects-available-in-all-templates}

This information lists root objects that are available to template code running in all contexts.

The following root objects are available in templates regardless of the context in which they run:

|Root Object|Type in Script Runtime|Description|
|-----------|----------------------|-----------|
|`args`|Associative array|A map of query parameter values indexed by query parameter name. This is only available if the script was executed using the Script Servlet.|
|`argsM`|Associative array|A map of multi-valued query parameters, where each key is an argument name and each value is an array containing all respective argument values, even if only one is supplied.|
|`cache`|`org.springframework.extensions.webscripts.Cache`|The `cache` object allows control over how the web script response is cached.|
|`config`|XML configuration data from a file|Provides access to the web script configuration read from an XML file.|
|`date`|java.util.Date|The date and time the web script was invoked.|
|`format`|`org.springframework.extensions.webscripts.FormatModel`|The `format` object represents the chosen format of the rendered response.|
|`guest`|Boolean|A simple boolean value indicating whether the current is a guest user or not.|
|`headers`|Associative array|A map of request header values indexed by header name.|
|`headersM`|Associative array|A map of multi-valued request headers, where each key is a header name and each value is an array containing all respective header values, even if only one is supplied.|
|`messages`|JSON|A JSON representation of all localized messages for the Web Script.|
|`server`|`org.alfresco.repo.web.scripts.RepositoryServerModel`|A description of the web script container hosting the web script.|
|`status`|`org.springframework.extensions.webscripts.Status`|The `status` object represents a response status.|
|`url`|`org.springframework.extensions.webscripts.DefaultURLModel`|Provides access to the web script URI, or parts of the URI, that triggered the web script.|
|`webscript`|`org.springframework.extensions.webscripts.DescriptionImpl`|The `webscript` object provides metadata describing the web script currently being executed.|

> **Note:** A full list of root objects is available in the [root objects section of the JavaScript API Reference]({% link content-services/5.2/develop/reference/repo-root-objects-ref.md %}).

## Root objects available in repository tier templates {#root-objects-available-in-repository-tier-templates}

This information lists root objects that are additionally available to template code running in the repository tier.

The following root objects are additionally available to templates running in the repository tier:

|Root Object|Type in Script Runtime|Description|
|-----------|----------------------|-----------|
|`roothome`|Object|The repository root node (only available if access has been authenticated).|
|`companyhome`|Object|The company home folder (only available if access has been authenticated).|
|`person`|Object|The person node of the currently authenticated user (only available if user has been authenticated).|
|`userhome`|Object|The user home folder (only available if access has been authenticated).|

> **Note:** A full list of root objects is available in the [root objects section of the JavaScript API Reference]({% link content-services/5.2/develop/reference/repo-root-objects-ref.md %}).

## Root objects reference {#root-objects-reference}

This information contains more detail on each of the root objects.

> **Note:** A full list of root objects is available in the [root objects section of the JavaScript API Reference]({% link content-services/5.2/develop/reference/repo-root-objects-ref.md %}).

-   **[atom](#atom)**  
A host object for parsing and generating Atom (Publishing) documents.
-   **[cache](#cache)**  
The `cache` object allows control over how the web script response is cached.
-   **[config](#config)**  
The `config` root object provides access to web script configuration.
-   **[format](#format)**  
The `format` object represents the chosen format of the rendered response.
-   **[formdata](#formdata)**  
Encapsulates data submitted by using a multipart form.
-   **[json](#json)**  
A root object encapsulating posted JSON content.
-   **[jsonUtils](#jsonutils)**  
A root object for parsing JSON.
-   **[requestbody](#requestbody)**  
A root object which encapsulates data posted to the web script.
-   **[server](#server)**  
The `server` object provides metadata describing the host server in which the web script is currently running.
-   **[status](#status)**  
The `status` object represents a response status.
-   **[url](#url)**  
`url` is a root object providing access to the URL (or parts of the URL) that triggered the web script.
-   **[webscript](#webscript)**  
The `webscript` object provides metadata describing the web script currently being executed.

## atom {#atom}

A host object for parsing and generating Atom (Publishing) documents.

## cache {#cache}

Some cache controls can be set only during the execution of a web script, such as setting when the content of the response was last modified. To support this, the Web Script Framework provides a special root object named `cache` to all controller scripts for allowing cache controls to be set at runtime.

The `cache` object allows control over how the web script response is cached.

Caching is controlled through the following properties.

|`neverCache`|(Read/write Boolean) Controls whether web script response should be cached at all; true means never cache. If not set, the default value is specified by the cache control section of the web script definition file.|
|`isPublic`|(Read/write Boolean) Controls whether web script response should be cached by public caches. If not set, the default value is specified by the cache control section of the web script definition file.|
|`mustRevalidate`|(Read/write Boolean) Controls whether cache **must** revalidate its version of the web script response to ensure freshness. If not set, the default value is specified by the cache control section of the web script definition file.|
|`maxAge`|(Read/write long) Specifies the maximum amount of time (in seconds, relative to the time of request) that the response will be considered fresh. If not set, the default value is null.|
|`lastModified`|(Read/write date) Specifies the time that the content of the response last changed. If not set, the default value is null.|
|`ETag`|(Read/write string) Specifies a unique identifier that changes each time the content of the response changes. If not set, the default value is null. This is useful for indicating to a client cache when content has changed.|

## config {#config}

The `config` root object provides access to web script configuration.

Configuration is accessed by using the `config` root object, which is available during both controller script and template execution.

There are three types of configuration, 'script', 'scoped' and 'global'. Script configuration is defined in an XML document with an arbitary structure stored locally with the Web Script. Global and Scoped configuration are specified in Alfresco Content Services configuration files.

### Script configuration

Script configuration is read from an XML file packaged with the web script. By way of example a 'Hello World' service would have the following file is created and placed in the same folder as the web script description document helloworld.get.config.xml.

Again, naming conventions apply where configuration file names have the following structure:

```
<serviceId>.<httpMethod>.config.xml
```

The content of the configuration can be any valid XML, such as the following:

```
<helloworld>
  <greeting>hello</greeting>
  <fromproperty>userName</fromproperty>
</helloworld>
```

Within a Controller Script, access to the configuration is by using E4X which is essentially "ECMAScript For XML". Tutorials can be found at [WSO2](http://wso2.org/library/1050) and [PHPForms](http://phpforms.net/tutorial/tutorial.html).

The controller script example can be updated to determine how to display "who" the greeting is from:

```
model.toWho = (args.to != null) ? args.to : person.properties.userName;
var s = new XML(config.script);
model.fromWho = person.properties[s.fromproperty];
```

FreeMarker has built-in support for processing XML data allowing response templates direct access to configuration too. The template example to extract the greeting from the configuration could be as follows:

```
<html>
  <body>
    At ${date?datetime}, ${fromWho?html} says ${config.script.helloworld.greeting?html} to ${toWho?html}
  </body>
</html>
```

### Global and scoped configuration

Global and scoped configuration is read by the Alfresco Content Services Configuration Service.

Repository tier web script configuration locations are set via the file webapps/alfresco/WEB-INF/classes/alfresco/web-scripts-application-context.xml as follows:

-   alfresco/web-scripts-config.xml on the classpath
-   alfresco/extension/web-scripts-config-custom.xml on the classpath

For Share (UI tier) web scripts configuration locations are set via the file webapps/share/WEB-INF/classes/alfresco/slingshot-application-context.xml as follows:

-   org/springframework/extensions/webscripts/spring-webscripts-config.xml on the classpath
-   META-INF/spring-webscripts-config-custom.xml on the classpath
-   META-INF/spring-webscripts-config-custom.xml in a web script JAR file found on the classpath

Configuration sections that do not have an evaluator or condition are known as 'global' config sections. These will always appear in a configuration lookup, a typical global configuration section has the following appearance:

```
<config>
  <server>
    <errorpage>/jsp/error.jsp</errorpage>
    <loginpage>/jsp/login.jsp</loginpage>
    <guesthome enabled="true">/jsp/guesthome.jsp</guesthome>
    <url>/</url>
    <url>/alf</url>
    <url>/alfresco</url>
  </server>
</config>
```

Scoped configuration, on the other hand, is a configuration section that does have an evaluator and condition, for example:

```
<config evaluator="string-compare" condition="Remote">
  <remote>
    <endpoint>http://localhost:8080/alfresco</endpoint>
  </remote>
</config>
```

### Accessing Global and Scoped Configuration

Accessing the configuration specified is achieved using the same techniques and syntax as any other model data, the global configuration is exposed by using the `config.global` root object and the scoped config is exposed by using the `config.scoped` root object.

For example, to access the server configuration from the example given the following syntax would be used in a JavaScript:

```
var serverCfg = config.global.server;
```

and the following syntax would be used in a FreeMarker template:

```
<#assign serverCfg=config.global.server>
```

Accessing scoped configuration is slightly different in that some context is required (to perform the scoped lookup against). This is achieved using the syntax to access a Map. For example to access the remote config in the scoped "Remote" section from the example given the following syntax would be used in a JavaScript:

```
var remote = config.scoped["Remote"].remote;
```

and the following syntax would be used in a FreeMarker template:

```
<#assign remoteCfg=config.scoped["Remote"].remote> 
```

## format {#format}

The `format` object represents the chosen format of the rendered response.

The format is interrogated by using the following properties:

|`Name`|(Read-only string) Format name|
|`Mimetype`|(Read-only string) MIME type associated with format|

## formdata {#formdata}

Encapsulates data submitted by using a multipart form.

When `multipart/form-data` is posted to a web script, the Web Script Framework provides a special root object named `formdata` that allows access to the posted request through a simple API, hiding the complexities of parsing the request directly. The API provides access to each form field, including its name and value. For form fields of type `file`, the content of the uploaded file is also provided. To simplify even further, all fields other than those of type file are also added to the root objects `args` and `argsM`.

The `formdata` root object provides an API that allows direct access to form fields submitted through the `multipart/form-data` content type. The `formdata` object comprises a number of *formfields*.

### formdata API

`formdata` is the root object that represents the submitted form, which comprises one or more form fields.

The following API provides access to the form fields.

-   **`hasField(string fieldname)`**

    Returns a Boolean indicating the existence of the form field named `fieldname`.


-   **`fields`**

    (Read-only) An array of `formfield` objects where each entry represents a field within the form


### The `formfield` API

The `formfield` object represents a single field within the form, allowing access to the field metadata and content through the following API:

-   **`name`**

    (Read-only string) The name of the field as defined in the form. Note that form fields cannot be uniquely named.


-   **`isFile`**

    (Read-only Boolean) Indicates whether the field is of type `file`.


-   **`value`**

    (Read-only string) The value of the field as entered into the form. Fields of type `file` return the file name. File content must be retrieved through content instead.


-   **`content`**

    (Read-only `ScriptContent`) The value of the field as entered into the form represented as a `ScriptContent` object.


-   **`mimetype`**

    (Read-only string) For form fields of type `file`, the MIME type of the content; otherwise, null.


-   **`filename`**

    (Read-only string) For form fields of type `file`, the file name of the uploaded file; otherwise, null.

## json {#json}

A root object encapsulating posted JSON content.

If the content type of the POST is `application/json` then the Web Script Framework will detect this and parse the JSON into the helper object called `json`. This allows the developer to access the JSON data using properties with the get method, for example `json.get("field")`.

If a POST was submitted to `/somewebscripturl`, with the following JSON data:

```
        
{
  somevalue: "hello",
  morestuff: 123
}

```

Then in the web script JavaScript code it would be possible to access the value of the `somevalue` field using the JavaScript code:

```

  json.get("somevalue");

```

If the data posted is a JSON object, the `json` root object will be of type `JSONObject`. If the data posted is a JSON array the `json` root object will be of type `JSONArray`.

Consider the following example script:

```

        
function abtest(){

    // Native JavaScript object                                                                                                                                            
    var myObj = {'name':'Test Object','size':100};

    // Convert native JS object to string                                                                                                                                  
    var myObjAsString = jsonUtils.toJSONString(myObj);
    model.myObjAsString = myObjAsString;

    // Convert string back to native object                                                                                                                                
    var tonyObject = jsonUtils.toObject(myObjAsString);

    // Get JSON data and load into model
    model.firstName = json.get("firstName");
    model.lastName = json.get("lastName");

}

function main(){
    abtest();
}

main();        
        
        
      
```

The script could be invoked using cURL as follows:

```

    
curl -uadmin:admin -H "Content-type: application/json" -X POST -d '{"firstName": "Fred", "lastName": "Bloggs"}' http://localhost:8080/alfresco/service/abtest    
    
  
```

The JSON data could then be processed by the controller script or simply added to the model before displaying by using the view:

```

        
<p>Hello ${firstName} ${lastName}</p>        
        
      
```

JSONObject methods

-   **`get(string name)`**

    Returns the value of the specified name from the JSON object


-   **`has(string name)`**

    Indicates whether the value of the specified name exists within the JSON object


-   **`isNull(string name)`**

    Indicates whether the value of the specified name is null within the JSON object


-   **`getJSONArray(string name)`**

    Returns a JSONArray object for the array of the specified name within the JSON object


JSONArray methods

-   **`length()`**

    (Read-only integer) Returns the length of the JSON array


-   **`getJSONObject(integer index)`**

    Returns the JSON object located in the JSON array at the specified index


## jsonUtils {#jsonutils}

A root object for parsing JSON.

The `jsonUtils` object provides the ability to programmatically traverse JSON documents, where the root of the document is either a JSON array or a JSON object.

JSONUtils methods

-   **toJSONString (object)**

    Converts a JavaScript native object and converts it to the corresponding JSON string.

-   **toJSONObject(object)**

    Converts a given JavaScript native object to an org.json.simple.JSONObject Java object. This is a specialized method only used by routines that will later expect a JSONObject.

-   **toObject(jsonString)**

    Takes a JSON string and converts it to a native JavaScript object.

-   **toObject(jsonObject)**

    Takes a JSON object and converts it to a native JavaScript object.

-   **encodeJSONString(value)**

    Encodes a JSON string value.


## requestbody {#requestbody}

A root object which encapsulates data posted to the web script.

When performing an HTTP POST to a web script, the posted request body often contains content that needs processing by the web script. To allow access to the request body, the Web Script Framework provides a special root object named `requestbody` that represents the content of the request. The `requestbody` is a `ScriptContent` object allowing access to the request content either as a string or as a content stream.

## server {#server}

The `server` object provides metadata describing the host server in which the web script is currently running.

Server metadata is accessed through the following properties of the `server` object.

|`versionMajor`|(Read-only string) Server major version number; for example 1.2.3|
|`versionMinor`|(Read-only string) Server minor version number; for example 1.2.3|
|`versionRevision`|(Read-only string) Server revision number; for example 1.2.3|
|`versionLabel`|(Read-only string) Server version label; for example, Dev.|
|`versionBuild`|(Read-only string) Server build number; for example, build-1|
|`version`|(Read-only string array) Server version; for example, major.minor.revision (label)|
|`edition`|(Read-only string) Server edition, such as 'Enterprise' or 'Community'|
|`schema`|(Read-only string) Server schema; for example, 10|

## status {#status}

The `status` object represents a response status.

The following properties allow for access to the status or the setting of a new status.

|`code`|(Read/write int) Status code; this is primarily an HTTP status code, but can be any number|
|`codeName`|(Read-only string) Human-readable status code name|
|`codeDescription`|(Read-only string) Human-readable status code description|
|`message`|(Read/write string) The status message|
|`redirect`|(Read/write Boolean) Indicates whether to redirect to a status-specific response template|
|`exception`|(Read/write java.lang.Exception) The exception, if any, that has caused this status|
|`location`|(Read/write string) The absolute URI to which the client should resubmit a request; this is often used with 3xx redirect status codes|

## url {#url}

`url` is a root object providing access to the URL (or parts of the URL) that triggered the web script.

Access to the URL parts is through the following properties on the `url` object.

|`context`|(Read-only string) context path for Alfresco Content Services|
|`serviceContext`|(Read-only string) service context path for Alfresco Content Services|
|`service`|(Read-only string) web script path|
|`full`|(Read-only string) web script URI with query parameters|
|`match`|(Read-only string) The part of the web script URI that matched the web script URI template|
|`args`|(Read-only map) Web script URI query parameters|
|`templateArgs`|(Read-only map) A map of substituted token values (within the URI path) indexed by token name|
|`extension`|(Read-only string) The part of the web script URL that extends beyond the match path (if there is no extension, an empty string is returned)|

A web script URI template of: `/user/{userid}` requests the URI: `/alfresco/service/user/fred?profile=full&format=html`

The `url` root object returns:

-   `url.context` => /alfresco
-   `url.serviceContext` => /alfresco/service
-   `url.service` => /alfresco/service/user/fred
-   `url.full` => /alfresco/service/user/fred?profile=full&format=html
-   `url.args` => profile=full&format=html
-   `url.templateArgs.userid` => fred
-   `url.match` => /user/
-   `url.extension` => fred

## webscript {#webscript}

The `webscript` object provides metadata describing the web script currently being executed.

Web script metadata is accessed through the following properties of the `webscript` object.

|`id`|(Read-only string) The web script identifier|
|`shortName`|(Read-only string) The web script short name|
|`description`|(Read-only string) The web script description|
|`defaultFormat`|(Read-only string) The default response format if none is explicitly specified in the web script URI|
|`formatStyle`|(Read-only string) The accepted ways of specifying the format in the web script URI|
|`URIs`|(Read-only string array) URI templates|
|`method`|(Read-only string) HTTP method|
|`requiredAuthentication`|(Read-only string) Required level of authentication|
|`requiredTransaction`|(Read-only string) Required level of transaction|
|`storePath`|(Read-only string) The path of the persistent store where the web script is stored|
|`scriptPath`|(Read-only string) The path (within `storePath`) of web script implementation files|
|`descPath`|(Read-only string) The path (within `storePath`) of the web script description document|

## FreeMarker template methods {#freemarker-template-methods}

The FreeMarker template language supports the notion of a method, which encapsulates an action to perform on a set of input parameters and can return an output value.

Although [FreeMarker](http://freemarker.sourceforge.net/docs/index.html) provides many methods of its own, it also allows the registration of custom methods. The Web Script Framework provides the following methods specifically for developers of web script response templates.

-   **`absurl(url)`**

    Returns an absolute URL representation of the passed URL. Useful when rendering links within Atom (and similar formats).


-   **`xmldate(date)`**

    Returns an ISO8601-formatted result of the passed date. Useful when rendering dates within XML.

-   **`scripturl(queryString)`**

    Returns a URL that references this web script. The passed `queryString` is added to the URL. System arguments such as `guest` and `format` are automatically added. This method is particularly useful for protection against the runtime environment within which the web script is executing. In some environments, such as a Portal, the URL is encoded.


-   **`clienturlfunction(funcName)`**

    Generates a client-side JavaScript function that can generate a URL back to this web script.


-   **`argreplace(argString, argName, argValue, ...)`**

    Replaces the specified `argName` with `argValue` or adds `argName` if it does not exist in `argString`.


-   **`encodeuri(uriString)`**

    Encodes the string into URL-safe form.

## API references {#api-references}

This information contains details of useful API references.

-   [Overview of APIs]({% link content-services/5.2/develop/rest-api-guide/index.md %}#api-guide)
-   [JavaScript API]({% link content-services/5.2/develop/api-reference.md %}#java-api) and the [Repository JavaScript API]({% link content-services/5.2/develop/api-reference.md %}#javascript-apijava-api)
-   [RESTful API](#rest-apis)
-   [FreeMarker API](#freemarker-api)
-   [Surf API]({% link content-services/5.2/develop/api-reference.md %}#spring-surf-api)

## Spring Surf API {#spring-surf-api}

The Surf API lets you build user interfaces for your web applications using server-side scripts and templates. This is the full list of the objects and methods that compose the Surf API that can be access from web script JavaScript controllers and FreeMarker templates.

-   **[Surf framework](#surf-framework)**  
When building new presentation templates or web components, developers can choose to use the FreeMarker and JavaScript technologies. These are the default and preferred way to build high performance and lightweight web parts. They are easy to build and require no server restarts.
-   **[Surf root objects](#surf-root-objects)**  
There are a number of root API objects available. Depending on the context of the object being processed (such as a page, template, or component), the objects available will differ slightly. For instance, when a page is the current context, the "config" object will not be available as there is no configuration at the page level. The context for rendering will be one of: the current page, the template for the page, or a component bound within the template.
-   **[Return types](#return-types)**  
A number of different objects can be returned from the various APIs provided by the root-scoped objects. They include important concepts such as Model Objects, which generically wrap the XML configuration for any Surf object, and Connectors, which enable RESTful style calls to configured remote endpoints.
-   **[Rendering objects](#rendering-objects)**  
There are multiple steps to the Surf page rendering process. At specific stages different objects are in context to scripts and, therefore, different root objects are available to each of those rendering objects.

## Surf framework {#surf-framework}

When building new presentation templates or web components, developers can choose to use the FreeMarker and JavaScript technologies. These are the default and preferred way to build high performance and lightweight web parts. They are easy to build and require no server restarts.

The availability of these APIs speeds the time it takes to develop new functionality. Most Surf platform features are available as root scope JavaScript and FreeMarker objects. Developers are able to work with the full range of objects available in the Surf framework. Objects represent entities such as component bindings, pages, templates, the request context, users, remote connections, and credential management.

> **Important:** The FreeMarker Template API and the JavaScript API use a common object model. This means that the objects available to the JavaScript API are very similar (in most cases, identical) to those made available by the FreeMarker API. It is highly recommended that the standard development pattern of the logic work being performed in JavaScript and presentation work being performed in FreeMarker should be followed where possible.

The Surf platform FreeMarker Template Processor provides capabilities similar to those provided by the repository FreeMarker Engine. **It does not, however, provide direct access to the repository concepts, such as nodes, properties, or aspects that developers of repository tier web scripts will be familiar with.**

The Surf platform web script runtime extends the templating and scripting capabilities that are already provided by the web script runtime, providing additional web-tier related root-scoped API objects.

## Surf root objects {#surf-root-objects}

There are a number of root API objects available. Depending on the context of the object being processed (such as a page, template, or component), the objects available will differ slightly. For instance, when a page is the current context, the "config" object will not be available as there is no configuration at the page level. The context for rendering will be one of: the current page, the template for the page, or a component bound within the template.

Following is the complete list of Surf platform root-scope objects.

|Type|Description|
|----|-----------|
|`context`|The request context of the current page. This object is always available.|
|`user`|The current user. This object is always available.|
|`content`|The current content instance. This object is available if the dispatcher is rendering a page for a given content object ID.|
|`page`|Information relating to the current page object. This object is available for pages, templates, and components within a page.|
|`template`|The template for the current page. This object is available for templates and components within the template.|
|`config`|An object representing component level XML configuration.|
|`theme`|The current theme ID string. This object is always available.|
|`instance`|The currently rendering model object (along with rendering context). This object is always available and will be one of a page, template, or component.|
|`sitedata`|Utility for working with the Surf platform object model. This object is always available.|
|`remote`|The Web Script Framework remote helper object. This object is available for Web script components. It provides a simple API for making remote HTTP RESTful calls from web tier JavaScript and retrieving the response content and status code.|
|`locale`|The current locale for the user request thread, as a string in Java Locale format.|
|`htmlid`|The page unique HTML ID string.|
|`url`|URL model for the current page request.|
|`head`|Concatenated component `.head` template output.|
|`app`|Helper object for dealing with the web application's environment.|
|`msg`|FreeMarker method object to resolve internationalization message IDs into label strings.|

-   **[context](#context)**  
 The context object provides a single point of reference for information about the user, the current rendering page, template, and other context. It provides this information so that individual rendering pieces do not need to calculate it themselves.
-   **[user](#user)**  
The user object provides a number of properties describing the user.
-   **[content](#content)**  
The `content` object provides a number of properties that describe a piece of content, such as a document.
-   **[page](#page)**  
The page object provides a number of properties describing a page.
-   **[template](#template)**  
The template object provides a single property.
-   **[config](#config)**  
The configuration object contains component configuration in XML format.
-   **[theme](#theme)**  
The current theme ID string.
-   **[instance](#instance)**  
When rendering a page, the `instance` object will represent the current page model object. When rendering a template, the `instance` object will represent the current template model object. The parent `page` object will also be available as usual if the template is running within the context of a page.
-   **[sitedata](#sitedata)**  
The sitedata object provides information about a site such as its configuration and root page.
-   **[remote](#remote)**  
The remote object stores details of endpoints.
-   **[locale](#locale)**  
The current locale for the user request thread, as a string in Java Locale format.
-   **[htmlid](#htmlid)**  
`htmlid` is a generated value that is a guaranteed safe and unique string that can be used as an HTML element ID for an element within the current component, template, or page. For example, it could be used as the ID for a DIV element surrounding the component markup, passed in to client-side JavaScript to allow easy dynamic manipulation of the component markup by using Ajax updates or similar.
-   **[url](#url)**  
The `url` object provides the following properties.
-   **[head](#head)**  
The `head` object.
-   **[app](#app)**  
The `app` object can be used on both the production and preview tiers to gain access to the correct web application mount points and more.
-   **[msg](#msg)**  
The `msg` object is a FreeMarker method object used for resolving i18n message IDs into label strings. It provides access to the combined i18n label bundle for the application and component.

## context {#context}

The context object provides a single point of reference for information about the user, the current rendering page, template, and other context. It provides this information so that individual rendering pieces do not need to calculate it themselves.

Each unit of work within the rendering pipeline is provided with a context object. This render context object is local to the currently rendering object instance but wraps the context of the original request to the page. The wrapped request context object is manufactured at the top of the request chain and is then made available to all templates, regions, components, chromes, and anything else downstream.

The request `context` object provides the following properties.

|`contentId`|The ID of the content being rendered. Available if the dispatcher is rendering a page for a given content object ID.|
|`content`|The content being rendered. Available if the dispatcher is rendering a page for a given content object ID. For example: ```
var pageTitle = context.page.title;
var userFullName = context.user.fullName;
var contentTitle = context.content.properties["title"];
var customValue = context.properties["customValue"];

```

|
|`resource`|Returns the content resource currently being rendered.|
|`id`|The internally managed ID for the current request Each request has a unique ID available to it that is guaranteed unique for each request. It is generally only used for debugging purposes.|
|`pageId`|The ID of the page being rendered.|
|`page`|The page object being rendered.|
|`templateId`|The ID of the template being rendered.

|
|`template`|The template object being rendered.|
|`user`|The current user.|
|`themeId`|The current theme ID.|
|`theme`|The current theme object.

|
|`formatId`|The format ID for the current request.|
|`properties`|Associative array of all context values.|
|`authenticated`|Returns true if there is a non-guest current user.|
|`externalAuthentication`|Returns true if external authentication, such as NTLM, is being used to manage the user.|
|`siteConfiguration`|Returns the site configuration as a `ScriptModelObject`.|
|`linkBuilder`|Returns the `ScriptLinkBuilder` instance for the current request.|
|`websiteTitle`|Returns the website title.|
|`uri`|Returns the URI.|
|`rootPage`|Returns the root page for the site.|
|`previewWebappId`|Returns the web app ID.|
|`previewStoreId`|Returns store ID.|
|`previewUserId`|Returns user ID.|
|`frameworkTitle`|Returns the framework title.|
|`frameworkVersion`|Returns the framework version.|
|`parameters`|Returns a key-value map of parameters in the incoming request.|
|`attributes`|Returns attributes.|
|`headers`|Returns headers.|

## user {#user}

The user object provides a number of properties describing the user.

|`properties`|An associative array of user properties.|
|`id`|The user identifier.|
|`name`|The Principal name (most commonly, this will be the same as the user ID).|
|`fullName`|The user's full name (for example, Joe Dwight Smith).|
|`firstName`|The user's first name (for example, Joe). Read/write.|
|`middleName`|The user's middle name (for example, Dwight). Read/write.|
|`lastName`|The user's last name (for example, Smith). Read/write.|
|`email`|The user's email address. Read/write.|
|`organization`|The user's organization. Read/write.|
|`jobTitle`|The user's job title. Read/write.|
|`location`|The user's location. Read/write.|
|`biography`|The user's biography. Read/write.|
|`telephone`|The user's telephone entry. Read/write.|
|`mobilePhone`|The user's mobile phone entry. Read/write.|
|`skype`|The user's Skype name. Read/write.|
|`instantMsg`|The user's instant messaging ID. Read/write.|
|`googleUsername`|User name for Google account. REad/write.|
|`companyPostcode`|The user's company post code. Read/write.|
|`companyTelephone`|The user's company telephone entry. Read/write.|
|`companyFax`|The user's company fax entry. Read/write.|
|`companyEmail`|The user's company email address. Read/write.|
|`companyAddress1`|The user's company address entry 1. Read/write.|
|`companyAddress2`|The user's company address entry 2. Read/write.|
|`companyAddress3`|The user's company address entry 3. Read/write.|
|`isAdmin`|Returns a boolean. True if user is an administrator.|
|`isGuest`|Returns a boolean. True if user is a guest.|
|`nativeUser`|Returns the underlying user object for access to additional methods on custom user objects.|
|`capabilities`|Get a map of capabilities (boolean assertions) for the user.|

For example, to output text based on the current user location property, use:

```


<#if user.location == "Boston">
  <p>Welcome to the Red Sox appreciation page, ${user.firstName}!</p>
</#if>

      
```

-   **[save](#save)**  
`save` - this method persists any changes to the user object's properties.
-   **[getUser](#getuser)**  
`getUser(String userId)` - this method returns a user object with populated details for the given User ID.

## save {#save}

`save` - this method persists any changes to the user object's properties.

## getUser {#getuser}

`getUser(String userId)` - this method returns a user object with populated details for the given User ID.

### Parameters

-   **userId**

    A string representing the user ID of the user.


### Returns

Returns a `ScriptUser` object, or null if the user cannot be found.

## content {#content}

The `content` object provides a number of properties that describe a piece of content, such as a document.

|`id`|The ID of the content object.|
|`typeId`|The type ID of the content object.|
|`properties`|An associative array of properties about the object.|

The following properties are metadata fields about the object:

|`timestamp`|The time (long) when the object was loaded.|
|`endpointId`|The ID of the endpoint from which the object was loaded.|
|`isLoaded`|Whether the object successfully loaded.|
|`statusCode`|Status code from the attempt to load the object.|
|`statusMessage`|Status message from the attempt to load the object.|

The following properties contain the payload of the document itself:

|`text`|The content of the selected object as text.|
|`xml`|The content of the selected object as XML.|

For example, you can work with metadata about the currently selected object as follows:

```
var id = content.id;
var typeId = content.typeId;
var endpointId = content.endpointId;
var timestamp = content.timestamp;
var isLoaded = content.isLoaded;
var statusCode = content.statusCode;
var statusMessage = content.statusMessage;
var modifiedDate = content.properties["cm:modified"];
```

You can also write components that work with the data of the object. This is particularly useful if you are dispatching from XML of Web Form based objects:

```
var text = content.text;
var xml = context.xml;

// parse the xml and load properties into our model
var e4x = new XML(content.xml);
model.productName = e4x.*::name.toString();
model.productDescription = e4x.*::description.toString();
```

Where the XML could be the following:

```


<pr:product xmlns:alf="http://www.alfresco.org"
            xmlns:chiba="http://chiba.sourceforge.net/xforms"
            xmlns:ev="http://www.w3.org/2001/xml-events"
            xmlns:pr="http://www.alfresco.org/alfresco/pr"
            xmlns:xf="http://www.w3.org/2002/xforms"
            xmlns:xhtml="http://www.w3.org/1999/xhtml"
            xmlns:xs="http://www.w3.org/2001/XMLSchema"
            xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">

   <pr:name>Demo Product 1</pr:name>
   <pr:description>Demo Product 1</pr:description>

</pr:product>


```

> **Note:** The `content` object is available only if an object ID is provided as part of the page URL.

## page {#page}

The page object provides a number of properties describing a page.

|`url`|The URL helper object.|
|`id`|The page object ID.|
|`title`|The page definition title.|
|`titleId`|The page definition title internationalization message ID.|
|`description`|The page definition description.|
|`descriptionId`|The page definition description internationalization message ID.|
|`theme`|The theme ID.|
|`properties`|Custom page definition properties, as defined within the page XML descriptor within the optional properties element; returned as a map, such as:

```
page.properties["mycustomprop"]
```

|

> **Note:** The `page` object is available only within the context of a page render.

## template {#template}

The template object provides a single property.

|`properties`|Custom page definition properties, as defined within the template XML descriptor within the optional properties element; returned as a map.|

## config {#config}

The configuration object contains component configuration in XML format.

Each component can have a snippet of XML configuration associated with it. The configuration can be any XML content and should be placed within a file named `<yourcomponent>.<method>.config.xml`. This object provides access to either the XML text content (for script model) or XML DOM (for FreeMarker template model) within the configuration.

For JavaScript access, the most common mechanism to process the XML config is to use the E4X XML DOM object.

For example, given the following XML configuration file `filters.get.config.xml`:

```


<filters>
   <filter id="all" label="All" />
   <filter id="new" label="New" />
   <filter id="drafts" label="Drafts" />
</filters>


```

Would be retrieved by using the config .script accessor and processed in JavaScript:

```
var cfg = new XML(config.script);
   for each(var filter in cfg..filter)
   {
      var id = filter.@id.toString();
      var label: filter.@label.toString();
      // do some work with the values
   }
```

Within a FreeMarker template the built-in XML DOM node object can be used. For example:

```
<#list config.script["filters"]["filter"].@id as f>${f}</#list>
```

The application global configuration and scoped configuration can be accessed by using the “global” and “scoped” accessors. For example:

```

        
<#assign helpPages = config.scoped["HelpPages"]["help-pages"]>
<#-- Global flags retrieved from web-framework-config-application -->
<#assign DEBUG=(config.global.flags.childrenMap["client-debug"][0].value = "true")>


```

See the online FreeMarker documentation for more information on XML DOM processing.

## theme {#theme}

The current theme ID string.

## instance {#instance}

When rendering a page, the `instance` object will represent the current page model object. When rendering a template, the `instance` object will represent the current template model object. The parent `page` object will also be available as usual if the template is running within the context of a page.

When rendering a component, the `instance` object will represent the current component model object. The parent `template` and `page` objects will also be available as usual if the component is running within the context of a template and page.

The `instance` object provides the following properties:

|`object`|The currently executing object (page, template, or component).|
|`id`|The ID of the currently executing object.|
|`htmlId`|The page-unique HTML ID for the currently executing object.|
|`properties`|An associative array of properties about the currently rendering object.|

The `instance` object provides the following methods:

### getParameterNames()

Returns a String[] of the names of the request parameters.

### getParameter(String name)

Returns the parameter value for the given parameter name.

### getParameters()

Returns an associative Array of the request parameter name/value pairs.

## sitedata {#sitedata}

The sitedata object provides information about a site such as its configuration and root page.

The `sitedata` object provides the following properties. The property types include:

-   Framework properties.
-   Properties that provide arrays of all objects of a given type.
-   Properties that provide associative arrays (or maps) of all instances for a given object type. These maps are keyed by object ID.

|`rootPage`|Root page object for the web site/application.|
|`siteConfiguration`|Configuration object for the web site/application.|
|`objectTypeIds`|Return a string array of object type IDs.|
|`chrome`|Provides an array of all `Chrome` objects.|
|`components`|Provides an array of all `Component` objects.|
|`componentTypes`|Provides an array of all `ComponentType` objects.|
|`configurations`|Provides an array of all `Configuration` objects.|
|`contentAssociations`|Provides an array of all `ContentAssociation` objects.|
|`pages`|Returns an array of all `Page` objects.|
|`pageTypes`|Provides an array of all `PageType` objects.|
|`pageAssociations`|Provides an array of all `PageAssociation` objects.|
|`templates`|Provides an array of all `Template` objects.|
|`templateTypes`|Provides an array of all `TemplateType` objects.|
|`themes`|Provides an array of all `Theme` objects.|
|`chromeMap`|Provides an associative array of all `Chrome` objects.|
|`componentsMap`|Provides an associative array of all `Component` objects.|
|`componentTypesMap`|Provides an associative array of all `ComponentType` objects.|
|`configurationsMap`|Provides an associative array of all `Configuration` objects.|
|`contentAssociationsMap`|Provides an associative array of all `ContentAssociation` objects.|
|`pagesMap`|Provides an associative array of all `Page` objects.|
|`pageAssociationsMap`|Provides an associative array of all `PageAssociation` objects.|
|`templatesMap`|Provides an associative array of all `Template` objects.|
|`templateTypesMap`|Provides an associative array of all `TemplateType` objects.|
|`themesMap`|Provides an associative array of all `Theme` objects.|

-   **[getObjectTypeName](#getobjecttypename)**  
`getObjectTypeName(String objectTypeId)` - this method returns the object type name, given the object type ID.
-   **[getObjectTypeDescription](#getobjecttypedescription)**  
`getObjectTypeDescription(String objectTypeId)` - this method returns the object type description, given the object type ID.
-   **[getObjects](#getobjects)**  
`getObjects(String objectTypeId)` - this method returns an array of objects of the given object type ID.
-   **[getObjectsMap](#getobjectsmap)**  
`getObjectsMap(String objectTypeId)` - this method returns a map of all instances of the given type. The map is keyed on object ID.
-   **[newObject](#newobject)**  
`newObject()` - these methods return a newly created `ScriptModelObject`.
-   **[newChrome](#newchrome)**  
`newChrome` - this method creates and returns a new Chrome object instance.
-   **[newComponent](#newcomponent)**  
`newComponent` - these methods create and return a new Component object instance. The scope, region and sourceId parameters should be set before the object is persisted.
-   **[newComponentType](#newcomponenttype)**  
`newComponentType` - this method returns a ScriptModelObject representing a new ComponentType instance of the specified type.
-   **[newConfiguration](#newconfiguration)**  
`newConfiguration` - these methods create and return a new Configuration object instance.
-   **[newContentAssociation](#newcontentassociation)**  
`newContentAssociation` - this method creates and returns a new ContentAssociation object instance.
-   **[newPage](#newpage)**  
`newPage` - these methods create and return a new Page object instance.
-   **[newPageAssociation](#newpageassociation)**  
`newPageAssociation` - this method creates and returns a new PageAssociation object instance.
-   **[newPageType](#newpagetype)**  
`newPageType` - this method creates and returns a new Chrome object instance.
-   **[newTemplate](#newtemplate)**  
`newTemplate` - these methods create and return a new Template object instance.
-   **[newTemplateType](#newtemplatetype)**  
`newTemplateType` - this method creates and returns a new TemplateType object instance.
-   **[newTheme](#newtheme)**  
`newTheme(String objectId)` - this method returns a newly created `ScriptModelObject` representing a new Theme.
-   **[newPreset](#newpreset)**  
`newPreset(String presetId, Scriptable tokens)` - creates model objects based on a given preset id. The preset is looked up and processed by the PresetManager bean. The various objects found in the preset will be generated using the supplied name/value map of tokens.
-   **[findComponents](#findcomponents)**  
`findComponents(String scope, String regionId, String sourceId, String componentTypeId)` - searches for Component instances within the web application that match the provided constraints. If a constraint is set to null, it is not considered as part of the search.
-   **[findWebScripts](#findwebscripts)**  
`findWebScripts(String family)` - returns an array of web scripts that match the given family name.
-   **[findChildPageAssociations](#findchildpageassociations)**  
`findChildPageAssociations(String sourceId, String destId)` - searches for PageAssociation instances within the web application that are of association type 'child' and which match the specified constraints. If a constraint is set to null, it is not considered as part of the search.
-   **[findPageAssociations](#findpageassociations)**  
`findPageAssociations(String sourceId, String destId, String associationType)` - searches for PageAssociation instances within the Web Application that are of the specified association type and which match the specified constraints. If a constraint is set to null, it is not considered as part of the search.
-   **[findChildPages](#findchildpages)**  
`findChildPages(String sourceId)` - searches for child pages of the given page.
-   **[findParentPages](#findparentpages)**  
`findParentPages(String pageId)` - searches for parent pages of the given page.
-   **[findContentAssociations](#findcontentassociations)**  
`findContentAssociations(String sourceId, String sourceType, String destId, String assocType, String formatId)` - searches for ContentAssociation instances within the web application that match the specified constraints. If a constraint is set to null, it is not considered as part of the search.
-   **[findComponentsMap](#findcomponentsmap)**  
`findComponentsMap(String scope, String regionId, String sourceId, String componentTypeId)` - provides a map of `ScriptModelObjects` that wrap Component instances. The map is keyed by Component object id.
-   **[findPageAssociationsMap](#findpageassociationsmap)**  
`findPageAssociationsMap(String sourceId, String destId, String associationType)` - Provides a map of ScriptModelObjects that wrap PageAssociation instances. The map is keyed by PageAssociation object id.
-   **[findContentAssociationsMap](#findcontentassociationsmap)**  
`findContentAssociationsMap(String sourceId, String sourceType, String destId, String assocType, String formatId)` - provides a map of ScriptModelObjects that wrap ContentAssociation instances. The map is keyed by ContentAssociation object id.
-   **[findTemplatesMap](#findtemplatesmap)**  
`findTemplatesMap(String pageId)` - provides a map of `ScriptModelObjects` that wrap Template instances. The map is keyed by format id.
-   **[findConfiguration](#findconfiguration)**  
`findConfiguration(String pageId)` - looks up Configuration instances and returns the first instance that is found for the matching constraints.
-   **[findTemplate](#findtemplate)**  
`findTemplate()` - these methods look up template instances and return the first instance that is found for the matching constraints.
-   **[removeTemplate](#removetemplate)**  
`removeTemplate(String pageId, String formatId)` - looks up the given Page and unbinds any Template instances that are bound to the page (keyed by formatId). If you would like to remove the default Template instance, set formatId to null.
-   **[bindComponent](#bindcomponent)**  
`bindComponent()` - these methods bind components.
-   **[unbindComponent](#unbindcomponent)**  
`unbindComponent()` - these methods unbind components.
-   **[associateTemplate](#associatetemplate)**  
`associateTemplate()` - these methods associate a template.
-   **[unassociateTemplate](#unassociatetemplate)**  
`unassociateTemplate()` - these methods unassociate a template.
-   **[associatePage](#associatepage)**  
`associatePage` - associates a page.
-   **[unassociatePage](#unassociatepage)**  
`unassociatePage` - unassociates a page.
-   **[associateContent](#associatecontent)**  
The `associateContent` method associates content.
-   **[unassociateContent](#unassociatecontent)**  
`unassociateContent` - unassociates content.
-   **[associateContentType](#associatecontenttype)**  
`associateContentType` - associates content type.
-   **[unassociateContentType](#unassociatecontenttype)**  
`unassociateContentType` - unassociates content type.
-   **[Helper methods](#helper-methods)**  
`Helper methods` - A collection of helper methods to support the SiteData object.

## getObjectTypeName {#getobjecttypename}

`getObjectTypeName(String objectTypeId)` - this method returns the object type name, given the object type ID.

### Parameters

-   **objectTypeId**

    A string representing the object type ID.


### Returns

Returns a string representing the object type name, or null if the object type ID cannot be found.

## getObjectTypeDescription {#getobjecttypedescription}

`getObjectTypeDescription(String objectTypeId)` - this method returns the object type description, given the object type ID.

### Parameters

-   **objectTypeId**

    A string representing the object type ID.


### Returns

Returns a string representing the object type description, or null if the object type ID cannot be found.

## getObjects {#getObjects}

`getObjects(String objectTypeId)` - this method returns an array of objects of the given object type ID.

### Parameters

-   **objectTypeId**

    A string representing the object type ID.


### Returns

Returns an array of objects of the specified type ID.

## getObjectsMap {#getObjectsMap}

`getObjectsMap(String objectTypeId)` - this method returns a map of all instances of the given type. The map is keyed on object ID.

### Parameters

-   **objectTypeId**

    A string representing the object type ID.


### Returns

Returns a map of objects keyed on object ID.

## newObject {#newobject}

`newObject()` - these methods return a newly created `ScriptModelObject`.

### newObject(String objectTypeId)

`newObject(String objectTypeId)` - this method returns a newly created `ScriptModelObject`.

#### Parameters

-   **objectTypeId**

    A string representing the object type ID.


#### Returns

Returns a newly created object with the specified object type.

### newObject(String objectTypeId, String objectId)

`newObject(String objectTypeId, String objectId)` - this method returns a newly created `ScriptModelObject`.

#### Parameters

-   **objectTypeId**

    A string representing the object type ID.

-   **objectId**

    A string representing the object ID.


#### Returns

Returns a newly created object with the specified object type and ID.

## newChrome {#newChrome}

`newChrome` - this method creates and returns a new Chrome object instance.

### Returns

Returns a `ScriptModelObject` representing the new Chrome instance. The ID for the instance is generated using the Web Framework's random GUID generator.

## newComponent {#newcomponent}

`newComponent` - these methods create and return a new Component object instance. The scope, region and sourceId parameters should be set before the object is persisted.

### newComponent

`newComponent` - this method creates and returns a new Component object instance. The scope, region and sourceId parameters should be set before the object is persisted.

#### Returns

Returns a `ScriptModelObject` representing the new Component instance. The ID for the instance is generated using the Web Framework's random GUID generator.

### newComponent(String componentTypeId)

`newComponent(String componentTypeId)` - this method creates and returns a new Component object instance. The scope, region and sourceId parameters should be set before the object is persisted.

#### Parameters

-   **componentTypeId**

    A string representing the component type ID.


#### Returns

Returns a `ScriptModelObject` representing the new Component instance. The ID for the instance is generated using the Web Framework's random GUID generator.

### newComponent(String scope, String regionId, String sourceId)

`newComponent(String scope, String regionId, String sourceId)` - this method creates and returns a new Component object instance.

#### Parameters

-   **scope**

    Scope, one of `global`, `template` or `page`.

-   **regionId**

    The ID of the region to bind to.

-   **sourceId**

    The source ID for the given scope.


#### Returns

Returns a `ScriptModelObject` representing the new Component instance. The ID for the instance is generated using the Web Framework's random GUID generator.

### newComponent(String componentTypeId, String scope, String regionId, String sourceId)

`newComponent(String componentTypeId, String scope, String regionId, String sourceId)` - this method creates and returns a new Component object instance.

#### Parameters

-   **componentTypeId**

    A string representing the component type ID.

-   **scope**

    Scope, one of `global`, `template` or `page`.

-   **regionId**

    The ID of the region to bind to.

-   **sourceId**

    The source ID for the given scope.


#### Returns

Returns a `ScriptModelObject` representing the new Component instance. The ID for the instance is generated using the Web Framework's random GUID generator.


## newComponentType {#newcomponenttype}

`newComponentType` - this method returns a ScriptModelObject representing a new ComponentType instance of the specified type.

### Returns

Returns a `ScriptModelObject` representing the new ComponentType instance. The ID for the instance is generated using the Web Framework's random GUID generator.

## newConfiguration {#newconfiguration}

`newConfiguration` - these methods create and return a new Configuration object instance.

### newConfiguration

`newConfiguration` - this method creates and returns a new Configuration object instance.

#### Returns

Returns a `ScriptModelObject` representing the new Configuration instance. The ID for the instance is generated using the Web Framework's random GUID generator.

### newConfiguration(String sourceId)

`newConfiguration(String sourceId)` - this method creates and returns a new Configuration object instance.

#### Parameters

-   **sourceId**

    A string representing the value to assign to the sourceId property.


#### Returns

Returns a `ScriptModelObject` representing the new Configuration instance. The ID for the instance is generated using the Web Framework's random GUID generator.


## newContentAssociation {#newcontentassociation}

`newContentAssociation` - this method creates and returns a new ContentAssociation object instance.

### Returns

Returns a `ScriptModelObject` representing the new ContentAssociation instance. The ID for the instance is generated using the Web Framework's random GUID generator.

## newPage {#newpage}

`newPage` - these methods create and return a new Page object instance.

### newPage

`newPage` - this method creates and returns a new Page object instance.

#### Returns

Returns a `ScriptModelObject` representing the new Page instance. The ID for the instance is generated using the Web Framework's random GUID generator.

### newPage(String id)

`newPage(String id)` - this method creates and returns a new Page object instance.

#### Parameters

-   **id**

    A string representing the page instance id.


#### Returns

Returns a `ScriptModelObject` representing the new Page instance.

### newPage(String id, String title, String description)

`newPage(String id, String title, String description)` - this method creates and returns a new Page object instance.

#### Parameters

-   **id**

    The id of the page instance.

-   **title**

    The title of the page instance.

-   **description**

    The description of the page instance.


#### Returns

Returns a `ScriptModelObject` representing the new Page instance.

### newPage(String id, String title, String titleId, String description, String descriptionId)

`newPage(String id, String title, String titleId, String description, String descriptionId)` - this method creates and returns a new Page object instance.

#### Parameters

-   **id**

    The id of the page instance.

-   **title**

    The title of the page instance.

-   **titleId**

    The message bundle key used to look up the title of the page instance.

-   **description**

    The description of the page instance.

-   **descriptionId**

    The message bundle key used to look up the description of the page instance.


#### Returns

Returns a `ScriptModelObject` representing the new Page instance.


## newPageAssociation {#newpageassociation}

`newPageAssociation` - this method creates and returns a new PageAssociation object instance.

### Returns

Returns a `ScriptModelObject` representing the new PageAssociation instance. The ID for the instance is generated using the Web Framework's random GUID generator.

## newPageType {#newpagetype}

`newPageType` - this method creates and returns a new Chrome object instance.

### Parameters

-   **objectId**

    A string representing the object ID.


### Returns

Returns a `ScriptModelObject` representing the new PageType instance. The ID for the instance is generated using the Web Framework's random GUID generator.

## newTemplate {#newtemplate}

`newTemplate` - these methods create and return a new Template object instance.

### newTemplate

`newTemplate` - this method creates and returns a new Template object instance.

#### Returns

Returns a `ScriptModelObject` representing the new Template instance. The ID for the instance is generated using the Web Framework's random GUID generator.

### newTemplate(String templateTypeId)

`newTemplate(String templateTypeId)` - this method creates and returns a new Template object instance.

#### Parameters

-   **templateTypeId**

    A string representing the id of the template type to be created.


#### Returns

Returns a `ScriptModelObject` representing the new Template instance. The ID for the instance is generated using the Web Framework's random GUID generator.

### newTemplate(String templateTypeId, String title, String description)

`newTemplate(String templateTypeId, String title, String description)` - this method creates and returns a new Template object instance.

#### Parameters

-   **templateTypeId**

    A string representing the id of the template type to be created.

-   **title**

    The title of the template instance.

-   **description**

    The description of the template instance.


#### Returns

Returns a `ScriptModelObject` representing the new Template instance. The ID for the instance is generated using the Web Framework's random GUID generator.

### newTemplate(String templateTypeId, String title, String titleId, String description, String descriptionId)

`newTemplate(String templateTypeId, String title, String titleId, String description, String descriptionId)` - this method creates and returns a new Template object instance.

#### Parameters

-   **templateTypeId**

    A string representing the id of the template type to be created.

-   **title**

    The title of the template instance.

-   **titleId**

    The message bundle key used to look up the title of the template instance.

-   **description**

    The description of the template instance.

-   **descriptionId**

    The message bundle key used to look up the description of the template instance.


#### Returns

Returns a `ScriptModelObject` representing the new Template instance. The ID for the instance is generated using the Web Framework's random GUID generator.

## newTemplateType {#newtemplatetype}

`newTemplateType` - this method creates and returns a new TemplateType object instance.

### Parameters

-   **objectId**

    A string representing the object ID.


### Returns

Returns a `ScriptModelObject` representing the new TemplateType instance. The ID for the instance is generated using the Web Framework's random GUID generator.

## newTheme {#newtheme}

`newTheme(String objectId)` - this method returns a newly created `ScriptModelObject` representing a new Theme.

### Parameters

-   **objectId**

    A string representing the object ID.


### Returns

Returns a `ScriptModelObject` representing a new Theme.

## newPreset {#newpreset}

`newPreset(String presetId, Scriptable tokens)` - creates model objects based on a given preset id. The preset is looked up and processed by the PresetManager bean. The various objects found in the preset will be generated using the supplied name/value map of tokens.

### Parameters

-   **presetId**

    A string representing the ID of the preset to generate.

-   **tokens**

    Token name/value map.


### Returns

void

## findComponents {#findComponents}

`findComponents(String scope, String regionId, String sourceId, String componentTypeId)` - searches for Component instances within the web application that match the provided constraints. If a constraint is set to null, it is not considered as part of the search.

### Parameters

-   **scope**

    The value of the scope property of the instance.

-   **regionId**

    The value of the regionId property of the instance.

-   **sourceId**

    The value of the sourceId property of the instance

-   **componentTypeId**

    The value of the componentTypeId property of the instance


### Returns

Returns an array of `ScriptModelObject` instances that wrap the Component results of the search.

## findWebScripts {#findwebscripts}

`findWebScripts(String family)` - returns an array of web scripts that match the given family name.

### Parameters

-   **family**

    A string representing the family.


### Returns

Returns an array of `Object` instances that represent web scripts that match the family name.

## findChildPageAssociations {#findchildpageassociations}

`findChildPageAssociations(String sourceId, String destId)` - searches for PageAssociation instances within the web application that are of association type 'child' and which match the specified constraints. If a constraint is set to null, it is not considered as part of the search.

### Parameters

-   **sourceId**

    A string representing the source id.

-   **destId**

    A string representing the destination id.


### Returns

Returns an array of `Object` instances that represent the PageAssociation results of the search.



## findPageAssociations {#findpagesassociations}

`findPageAssociations(String sourceId, String destId, String associationType)` - searches for PageAssociation instances within the Web Application that are of the specified association type and which match the specified constraints. If a constraint is set to null, it is not considered as part of the search.

### Parameters

-   **sourceId**

    A string representing the source id.

-   **destId**

    A string representing the destination id.

-   **associationType**

    A string representing the association type.


### Returns

Returns an array of `Object` instances that represent the PageAssociation results of the search.

## findChildPages {#findChildPages}

`findChildPages(String sourceId)` - searches for child pages of the given page.

### Parameters

-   **sourceId**

    A string representing the source id.


### Returns

Returns an array of `Object` instances that represent the child page results of the search.

## findParentPages {#findparentpages}

`findParentPages(String pageId)` - searches for parent pages of the given page.

### Parameters

-   **pageId**

    A string representing the page id.


### Returns

Returns an array of `Object` instances that represent the parent page results of the search.

## findContentAssociations {#findContentAssociations}

`findContentAssociations(String sourceId, String sourceType, String destId, String assocType, String formatId)` - searches for ContentAssociation instances within the web application that match the specified constraints. If a constraint is set to null, it is not considered as part of the search.

### Parameters

-   **sourceId**

    A string representing the source id.

-   **sourceType**

    A string representing the source type.

-   **destId**

    A string representing the destination id.

-   **assocType**

    A string representing the association type.

-   **formatId**

    A string representing the format id.


### Returns

Returns an array of `Object` instances that wrap the ContentAssociation results of the search.

## findComponentsMap {#findcomponentsmap}

`findComponentsMap(String scope, String regionId, String sourceId, String componentTypeId)` - provides a map of `ScriptModelObjects` that wrap Component instances. The map is keyed by Component object id.

### Parameters

-   **scope**

    A string representing the scope.

-   **regionId**

    A string representing the region id.

-   **sourceId**

    A string representing the source id.

-   **componentTypeId**

    A string representing the component type id.


### Returns

Returns a Scriptable object that represents a map of component instances keyed by component id.

## findPageAssociationsMap {#findpageassociationsmap}

`findPageAssociationsMap(String sourceId, String destId, String associationType)` - Provides a map of ScriptModelObjects that wrap PageAssociation instances. The map is keyed by PageAssociation object id.

### Parameters

-   **sourceId**

    A string representing the source id.

-   **destId**

    A string representing the destination id.

-   **associationType**

    A string representing the association type.


### Returns

Returns a Scriptable object that represents a map of PageAssociation instances keyed on object id.

## findContentAssociationsMap {#findContentAssociationsMap}

`findContentAssociationsMap(String sourceId, String sourceType, String destId, String assocType, String formatId)` - provides a map of ScriptModelObjects that wrap ContentAssociation instances. The map is keyed by ContentAssociation object id.

### Parameters

-   **sourceId**

    A string representing the source id.

-   **sourceType**

    A string representing the source type.

-   **destId**

    A string representing the destination id.

-   **assocType**

    A string representing the association type.

-   **formatId**

    A string representing the format id.


### Returns

Returns an array of `Object` instances that wrap the ContentAssociation results of the search.

## findTemplatesMap {#findtemplatesmap}

`findTemplatesMap(String pageId)` - provides a map of `ScriptModelObjects` that wrap Template instances. The map is keyed by format id.

### Parameters

-   **pageId**

    A string representing the page id.


### Returns

A Scriptable object that contains a map of ScriptModelObjects that wrap Template instances. The map being keyed on format id.

## findConfiguration {#findConfiguration}

`findConfiguration(String pageId)` - looks up Configuration instances and returns the first instance that is found for the matching constraints.

### Parameters

-   **sourceId**

    A string representing the source id.


### Returns

Returns a `ScriptModelObject` instance that wraps the Configuration instance.

## findTemplate {#findtemplate}

`findTemplate()` - these methods look up template instances and return the first instance that is found for the matching constraints.

### findTemplate

`findTemplate(String pageId)` - looks up Template instances and returns the first instance that is found for the matching constraints.

#### Parameters

-   **pageId**

    A string representing the page id.


#### Returns

Returns a `ScriptModelObject` instance that wraps the Template instance.

### findTemplate

`findTemplate(String pageId, String formatId)` - looks up Template instances and returns the first instance that is found for the matching constraints.

#### Parameters

-   **pageId**

    A string representing the page id.

-   **formatId**

    A string representing the format id.


#### Returns

Returns a `ScriptModelObject` instance that wraps the Template instance.


## removeTemplate {#removetemplate}

`removeTemplate(String pageId, String formatId)` - looks up the given Page and unbinds any Template instances that are bound to the page (keyed by formatId). If you would like to remove the default Template instance, set formatId to null.

### Parameters

-   **pageId**

    A string representing the page id.

-   **formatId**

    A string representing the format id.


### Returns

void

## bindComponent {#bindcomponent}

`bindComponent()` - these methods bind components.

### bindComponent

`bindComponent(String componentId, String scope, String regionId, String sourceId)` - bind component.

#### Parameters

-   **componentId**

    A string representing the component id.

-   **scope**

    A string representing the scope.

-   **regionId**

    A string representing the region id.

-   **sourceId**

    A string representing the source id.


#### Returns

void

### bindComponent

`bindComponent(ScriptModelObject componentObject, String scope, String regionId, String sourceId)` - bind component.

#### Parameters

-   **componentObject**

    A string representing the component object.

-   **scope**

    A string representing the scope.

-   **regionId**

    A string representing the region id.

-   **sourceId**

    A string representing the source id.


#### Returns

void


## unbindComponent {#unbindcomponent}

`unbindComponent()` - these methods unbind components.

### unbindComponent

`unbindComponent(String componentId)` - unbind component.

#### Parameters

-   **scope**

    A string representing the scope.

-   **regionId**

    A string representing the region id.

-   **sourceId**

    A string representing the source id.


#### Returns

void

### unbindComponent

`unbindComponent(String scope, String regionId, String sourceId)` - unbind component.

#### Parameters

-   **scope**

    A string representing the scope.

-   **regionId**

    A string representing the region id.

-   **sourceId**

    A string representing the source id.


#### Returns

void


## associateTemplate {#associatetemplate}

`associateTemplate()` - these methods associate a template.

### associateTemplate

`associateTemplate(String templateId, String pageId)` - associate template.

#### Parameters

-   **templateId**

    A string representing the template id.

-   **pageId**

    A string representing the page id.


#### Returns

void

### associateTemplate

`associateTemplate(String templateId, String pageId, String formatId)` - associate template.

#### Parameters

-   **templateId**

    A string representing the template id.

-   **pageId**

    A string representing the page id.

-   **formatId**

    A string representing the format id.


#### Returns

void


## unassociateTemplate {#unassociatetemplate}

`unassociateTemplate()` - these methods unassociate a template.

### unassociateTemplate

`unassociateTemplate(String pageId)` - unassociate template.

#### Parameters

-   **pageId**

    A string representing the page id.


#### Returns

void

### unassociateTemplate

`unassociateTemplate(String pageId, String formatId)` - unassociate template.

#### Parameters

-   **pageId**

    A string representing the page id.

-   **formatId**

    A string representing the format id.


#### Returns

void


## associatePage {#associatepage}

`associatePage` - associates a page.

### Parameters

-   **sourceId**

    A string representing the source id.

-   **destId**

    A string representing the destination id.


### Returns

void

## unassociatePage {#unassociatepage}

`unassociatePage` - unassociates a page.

### Parameters

-   **sourceId**

    A string representing the source id.

-   **destId**

    A string representing the destination id.


### Returns

void

## associateContent {#associatecontent}

The `associateContent` method associates content.

### Parameters

-   **contentId**

    A string representing the content id.

-   **templateId**

    A string representing the template id.

-   **assocType**

    A string representing the association type.

-   **formatId**

    A string representing the format id.


### Returns

void

## unassociateContent {#unassociateContent}

`unassociateContent` - unassociates content.

### Parameters

-   **contentId**

    A string representing the content id.

-   **templateId**

    A string representing the template id.

-   **formatId**

    A string representing the format id.


### Returns

void

## associateContentType {#associatecontenttype}

`associateContentType` - associates content type.

### Parameters

-   **contentTypeId**

    A string representing the content type id.

-   **templateId**

    A string representing the template id.

-   **assocType**

    A string representing the association type.

-   **formatId**

    A string representing the format id.


### Returns

void

## unassociateContentType {#unassociateContentType}

`unassociateContentType` - unassociates content type.

### Parameters

-   **contentTypeId**

    A string representing the content type id.

-   **templateId**

    A string representing the template id.

-   **formatId**

    A string representing the format id.


### Returns

void

## Helper methods {#helper-methods}

`Helper methods` - A collection of helper methods to support the SiteData object.

-   **[encode](#encode)**  
`encode(String input)` - these methods encode the input string into the specified encoding.
-   **[decode](#decode)**  
`decode(String input)` - these methods decode the input string.
-   **[logout](#logout)**  
`logout` - logs out the current user.
-   **[reloadUser](#reloaduser)**  
`reloadUser` - reloads the current user into the session.
-   **[getCredentialVault](#getcredentialvault)**  
`getCredentialVault` - returns the credential vault for the user.
-   **[getChrome](#getchrome)**  
`getChrome` - returns a `ScriptModelObject` representing the chrome.
-   **[getComponent](#getcomponent)**  
`getComponent()` - these methods return a component.
-   **[getComponentType](#getcomponenttype)**  
`getComponentType` - returns a `ScriptModelObject` representing the component type.
-   **[getConfiguration](#getconfiguration)**  
`getConfiguration` - returns a `ScriptModelObject` representing the configuration.
-   **[getContentAssociation](#getcontentassociation)**  
`getContentAssociation` - returns a `ScriptModelObject` representing the content association.
-   **[getPage](#getpage)**  
`getPage` - returns a `ScriptModelObject` representing the page.
-   **[getPageType](#getpagetype)**  
`getPageType` - returns a `ScriptModelObject` representing the page type.
-   **[getPageAssociation](#getpageassociation)**  
`getPageAssociation` - returns a `ScriptModelObject` representing the page association.
-   **[getTemplate](#gettemplate)**  
`getTemplate` - returns a `ScriptModelObject` representing the template.
-   **[getTemplateType](#gettemplatetype)**  
`getTemplateType` - returns a `ScriptModelObject` representing the template type.
-   **[getTheme](#gettheme)**  
`getTheme` - returns a `ScriptModelObject` representing the theme.
-   **[newGUID](#newguid)**  
`newGUID` - returns a string that represents the new GUID.
-   **[getFormatIds](#getformatids)**  
`getFormatIds` - returns an array of strings representing the format IDs.
-   **[getFormatTitle](#getformattitle)**  
`getFormatTitle` - returns a string that represents the format title.
-   **[getFormatDescription](#getformatdescription)**  
`getFormatDescription` - returns a string that represents the format description.

## encode {#encode}

`encode(String input)` - these methods encode the input string into the specified encoding.

### encode

`encode(String input)` - this method encodes the input string into the default encoding of UTF-8.

#### Parameters

-   **input**

    A string to encode.


#### Returns

Returns the string encoded into UTF-8.

### encode

`encode(String input, String encoding)` - this method encodes the input string into the specified encoding.

#### Parameters

-   **input**

    A string to encode.

-   **encoding**

    A string representing the encoding to use to encode the input string.


#### Returns

Returns the string encoded into the specified encoding.

## decode {#decode}

`decode(String input)` - these methods decode the input string.

### decode

`decode(String input)` - this method decodes the input string, assuming a default encoding of UTF-8.

#### Parameters

-   **input**

    A string to decode.


#### Returns

Returns the decoded string.

### decode

`decode(String input, String encoding)` - this method decodes the input string.

#### Parameters

-   **input**

    A string to decode.

-   **encoding**

    A string representing the encoding to use to decode the input string.


#### Returns

Returns the string decoded.

## logout {#logout}

`logout` - logs out the current user.

### Returns

void

## reloadUser {#reloaduser}

`reloadUser` - reloads the current user into the session.

### Returns

void

## getCredentialVault {#getCredentialVault}

`getCredentialVault` - returns the credential vault for the user.

### Returns

Returns a `ScriptCredentialVault` object representing the credential vault for the user.

## getChrome {#getChrome}

`getChrome` - returns a `ScriptModelObject` representing the chrome.

### Parameters

-   **objectId**

    A string representing the object id.


### Returns

Returns a `ScriptModelObject` object representing the chrome.

## getComponent {#getComponent}

`getComponent()` - these methods return a component.

### getComponent

`getComponent(String objectId)` - returns a component with the specified object id.

#### Parameters

-   **objectId**

    A string representing the object id.


#### Returns

Returns a `ScriptModelObject` instance that represents the component.

### getComponent

`getComponent(String scope, String regionId, String sourceId)` - returns a component with the specified parameters.

#### Parameters

-   **scope**

    A string representing the scope.

-   **regionId**

    A string representing the region id.

-   **sourceId**

    A string representing the source id.


#### Returns

Returns a `ScriptModelObject` instance that represents the component.


## getComponentType {#getComponentType}

`getComponentType` - returns a `ScriptModelObject` representing the component type.

### Parameters

-   **objectId**

    A string representing the object id.


### Returns

Returns a `ScriptModelObject` object representing the component type.

## getConfiguration {#getConfiguration}

`getConfiguration` - returns a `ScriptModelObject` representing the configuration.

### Parameters

-   **objectId**

    A string representing the object id.


### Returns

Returns a `ScriptModelObject` object representing the configuration.

## getContentAssociation {#getContentAssociation}

`getContentAssociation` - returns a `ScriptModelObject` representing the content association.

### Parameters

-   **objectId**

    A string representing the object id.


### Returns

Returns a `ScriptModelObject` object representing the content association.

## getPage {#getPage}

`getPage` - returns a `ScriptModelObject` representing the page.

### Parameters

-   **objectId**

    A string representing the object id.


### Returns

Returns a `ScriptModelObject` object representing the page.

## getPageType {#getPageType}

`getPageType` - returns a `ScriptModelObject` representing the page type.

### Parameters

-   **objectId**

    A string representing the object id.


### Returns

Returns a `ScriptModelObject` object representing the page type.

## getPageAssociation {#getPageAssociation}

`getPageAssociation` - returns a `ScriptModelObject` representing the page association.

### Parameters

-   **objectId**

    A string representing the object id.


### Returns

Returns a `ScriptModelObject` object representing the page association.

## getTemplate {#gettemplate}

`getTemplate` - returns a `ScriptModelObject` representing the template.

### Parameters

-   **objectId**

    A string representing the object id.


### Returns

Returns a `ScriptModelObject` object representing the template.

## getTemplateType {#gettemplatetype}

`getTemplateType` - returns a `ScriptModelObject` representing the template type.

### Parameters

-   **objectId**

    A string representing the object id.


### Returns

Returns a `ScriptModelObject` object representing the template type.

## getTheme {#gettheme}

`getTheme` - returns a `ScriptModelObject` representing the theme.

### Parameters

-   **objectId**

    A string representing the object id.


### Returns

Returns a `ScriptModelObject` object representing the theme.

## newGUID {#newguid}

`newGUID` - returns a string that represents the new GUID.

### Returns

Returns a string that represents the new GUID.

## getFormatIds {#getFormatIds}

`getFormatIds` - returns an array of strings representing the format IDs.

### Returns

Returns an array of strings representing the format IDs.

## getFormatTitle {#getFormatTitle}

`getFormatTitle` - returns a string that represents the format title.

### Parameters

-   **formatId**

    A string representing the format id.


### Returns

Returns a string that represents the format title.

## getFormatDescription {#getFormatDescription}

`getFormatDescription` - returns a string that represents the format description.

### Parameters

-   **formatId**

    A string representing the format id.


### Returns

Returns a string that represents the format description.

## remote {#remote}

The remote object stores details of endpoints.

The remote object provides the following properties:

|`endpointIds`|A string of available endpoint identifiers.|

-   **[setConfigService](#setconfigservice)**  
The `setConfigService(ConfigService configService)` - sets the configuration service.
-   **[setConnectorProvider](#setconnectorprovider)**  
The `setConnectorProvider(ConnectorProvider connectorProvider)` - sets the connector provider.
-   **[connect](#connect)**  
The `connect()` - these methods create and return a `ScriptRemoteConnector` object.
-   **[call](#call)**  
The `call(String uri)` - invokes a specific URI on the default endpoint.
-   **[getEndpointName](#getendpointname)**  
The `getEndpointName(String endpointId)` - return an endpoint name given the specified endpoint ID.
-   **[getEndpointDescription](#getendpointdescription)**  
The `getEndpointDescription(String endpointId)` - return an endpoint description given the specified endpoint ID.
-   **[getEndpointURL](#getendpointurl)**  
The `getEndpointURL(String endpointId)` - return an endpoint URL given the specified endpoint ID.
-   **[isEndpointPersistent](#isendpointpersistent)**  
The `isEndpointPersistent(String id)` - checks if an endpoint is persistent or not. True if the endpoint is persistent.

## setConfigService {#setConfigService}

The `setConfigService(ConfigService configService)` - sets the configuration service.

### Parameters

-   **configService**

    A `ConfigService` object representing the configuration service.


### Returns

void.

## setConnectorProvider {#setConnectorProvider}

The `setConnectorProvider(ConnectorProvider connectorProvider)` - sets the connector provider.

### Parameters

-   **connectorProvider**

    A `ConnectorProvider` object representing the connector provider.


### Returns

void.

## connect {#connect}

The `connect()` - these methods create and return a `ScriptRemoteConnector` object.

### connect

The `connect()` - constructs a remote connector to a default endpoint (if configured). If a default endpoint is not configured, null will be returned.

#### Returns

Returns a `ScriptRemoteConnector` object.

### connect

The `connect(String endpointId)` - constructs a remote connector to a specific endpoint. If the endpoint does not exist, null is returned.

#### Parameters

-   **endpointId**

    A string representing the endpoint.


#### Returns

Returns a `ScriptRemoteConnector` object.


## call {#call}

The `call(String uri)` - invokes a specific URI on the default endpoint.

### Parameters

-   **uri**

    A string representing the URI.


### Returns

Returns a `Response` object.

## getEndpointName {#getEndpointName}

The `getEndpointName(String endpointId)` - return an endpoint name given the specified endpoint ID.

### Parameters

-   **endpointId**

    A string representing the endpoint ID.


### Returns

Returns a string representing endpoint name.

## getEndpointDescription {#getEndpointDescription}

The `getEndpointDescription(String endpointId)` - return an endpoint description given the specified endpoint ID.

### Parameters

-   **endpointId**

    A string representing the endpoint ID.


### Returns

Returns a string representing endpoint description.

## getEndpointURL {#getEndpointURL}

The `getEndpointURL(String endpointId)` - return an endpoint URL given the specified endpoint ID.

### Parameters

-   **endpointId**

    A string representing the endpoint ID.


### Returns

Returns a string representing endpoint URL.

## isEndpointPersistent {#isEndpointPersistent}

The `isEndpointPersistent(String id)` - checks if an endpoint is persistent or not. True if the endpoint is persistent.

### Parameters

-   **id**

    A string representing the target ID.


### Returns

Returns true if the ID corresponds to a persistent endpoint.

## locale {#locale}

The current locale for the user request thread, as a string in Java Locale format.

For example:

```
var currentLocale = locale;
```

## htmlid {#htmlid}

`htmlid` is a generated value that is a guaranteed safe and unique string that can be used as an HTML element ID for an element within the current component, template, or page. For example, it could be used as the ID for a DIV element surrounding the component markup, passed in to client-side JavaScript to allow easy dynamic manipulation of the component markup by using Ajax updates or similar.

For example:

```
<div id="${htmlid}">your component markup here</div>
```

## url {#url}

The `url` object provides the following properties.

|`context`|The page root context path (for example, /share).|
|`servletContext`|The page root context path and servlet path (for example, /share/page).|
|`uri`|The page URI (no URL arguments) (for example, /share/page/mylogin).|
|`url`|The complete page URL (for example, /share/page/mylogin?user=test).|
|`queryString`|The query string from the URL (for example, user=test&a=1).|
|`args`|A map of URL argument name/value pairs.|
|`templateArgs`|A map of URL templated arguments name/value pairs.Defining the `templateArgs` object is an optional feature of some custom Page Mapper implementations. The Page Mapper dissects the URL and extract additional arguments from its structure as based on a preconfigured template. For example, in the Alfresco Share application, a templated current “site” argument is extracted from the URL.

|

## head {#head}

The `head` object.

Each web script component within a page template can have an optional `.head.ftl` template file. Each head template for all the components bound within the page is executed before the final processing stage and the output of each is concatenated. The concatenated output is then made available within the `head` variable. Any client-side CSS and Script, including files required for a component, can be correctly output into the HEAD section of the page.

For example:

```


<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
   <title>My Page</title>
   ${head}
</head>
… rest of the page, with XHTML markup and component bindings etc.


```

This pattern ensured component writers can maintain a clean XHTML valid output for their page, even with many dynamic component bindings within the BODY tag markup.

## app {#app}

The `app` object can be used on both the production and preview tiers to gain access to the correct web application mount points and more.

The following methods are available:

### context

Returns the root web application context.

### include(path)

Performs a server-side include of a web asset from the default endpoint.

### include(path, endpoint)

Performs a server-side include of a web asset from the specified endpoint.

It executes a wrapped server-side include. The result string is returned.

Some example paths include:

```
   /a/b/c.gif
   /images/test.jpg
```

-   **[getContext](#getcontext)**  
`getContext()` - returns the root web application context.
-   **[include](#include)**  
`include(String relativePath)` - performs a server-side include of a web asset.

## getContext {#getContext}

`getContext()` - returns the root web application context.

### Returns

Returns a string representing the root web application context.

## include {#include}

`include(String relativePath)` - performs a server-side include of a web asset.

### Parameters

-   **relativePath**

    A string representing the relative path.


### Returns

The result string is returned. Valid paths are, for example:

```

/a/b/c.gif
/images/test.jpg

```

## msg {#msg}

The `msg` object is a FreeMarker method object used for resolving i18n message IDs into label strings. It provides access to the combined i18n label bundle for the application and component.

For example:

```

        
<span>${msg("label.mymessage")}</span>


```

## Return types {#return-types}

A number of different objects can be returned from the various APIs provided by the root-scoped objects. They include important concepts such as Model Objects, which generically wrap the XML configuration for any Surf object, and Connectors, which enable RESTful style calls to configured remote endpoints.

-   **[ScriptModelObject](#scriptmodelobject)**  
Model objects are returned from most of the query functions on `sitedata`. They are also bound to rendering contexts. A model object could be a component, a template, or any other object type.
-   **[ScriptRemoteConnector](#scriptremoteconnector)**  
Connectors are retrieved by using the `remote` object and are used to communicate with configured endpoints. This communication generally consists of an HTTP request followed by an appropriate `Response` object (JSON, XML, or other format).
-   **[Response](#response)**  
The `Response` object wraps the response data, status code, status message, and any exception information from a remote call.
-   **[ResponseStatus](#responsestatus)**  
The `ResponseStatus` object wraps the response status code, status message, and any exception information from a remote call. The `ResponseStatus` object inherits from the `Status` object.

## ScriptModelObject {#scriptmodelobject}

Model objects are returned from most of the query functions on `sitedata`. They are also bound to rendering contexts. A model object could be a component, a template, or any other object type.

By default, the following properties are available:

|`id`|The ID of the object.|
|`title`|The title of the object.|
|`titleId`|The title internationalization message ID of the object.|
|`description`|The description of the object.|
|`descriptionId`|The description internationalization message ID of the object.|
|`typeId`|The type ID of the underlying model object.|
|`properties`|An associative array (map) of all properties on the object.|
|`resources`|Returns a `ScriptResources` object.|

The following metadata properties are available:

|`timestamp`|The modification time of the object(long).|
|`persisterId`|The ID of the persister to which the object belongs.|
|`storagePath`|The path to the file within the persister.|

-   **[save](#save)**  
The `save(boolean persist)` methods are used to persist the modified properties of an object.
-   **[remove](#remove)**  
The `remove()` method removes the object.
-   **[delete](#delete)**  
The `delete()` method deletes the object.
-   **[toXML](#toxml)**  
The `toXML()` method returns the object as XML.
-   **[touch](#touch)**  
`touch()` method touches the object, setting the object's timestamp to the current time.
-   **[getBooleanProperty](#getbooleanproperty)**  
The `getBooleanProperty(String propertyName)` method returns the value of the specified boolean property.
-   **[getProperty](#getproperty)**  
The `getProperty(String propertyName)` method returns the value of the specified property.
-   **[setProperty](#setproperty)**  
The `setProperty(String propertyName, String propertyValue)` method sets the value of the specified property.
-   **[removeProperty](#removeproperty)**  
The `removeProperty(String propertyName)` method removes the specified property.
-   **[getModelObject](#getmodelobject)**  
The `getModelObject()` method returns a `ModelObject` object.
-   **[clone](#clone)**  
`clone()` - these methods create a clone of the model object.

## save {#save}

The `save(boolean persist)` methods are used to persist the modified properties of an object.

### save

`save()` - persist object and modified properties.

#### Returns

void

### save

`save(boolean persist)` - persist object and modified properties.

#### Parameters

-   **persist**

    A boolean. If true the object and all modified properties will be persisted.


#### Returns

void


## remove {#remove}

The `remove()` method removes the object.

### Returns

void


## delete {#delete}

The `delete()` method deletes the object.

### Returns

void

## toXML {#toxml}

The `toXML()` method returns the object as XML.

### Returns

Returns the object as XML.

## touch {#touch}

The `touch()` method touches the object, setting the object's timestamp to the current time.

### Returns

void

## getBooleanProperty {#getBooleanProperty}

The `getBooleanProperty(String propertyName)` method returns the value of the specified boolean property.

### Parameters

-   **propertyName**

    A string representing the name of the property whose value is to be returned.


### Returns

Returns a boolean representing the state of the property.

## getProperty {#getProperty}

The `getProperty(String propertyName)` method returns the value of the specified property.

### Parameters

-   **propertyName**

    A string representing the name of the property whose value is to be returned.


### Returns

Returns a string representing the value of the property.

## setProperty {#setproperty}

The `setProperty(String propertyName, String propertyValue)` method sets the value of the specified property.

### Parameters

-   **propertyName**

    A string representing the name of the property whose value is to be returned.

-   **propertyValue**

    A string representing the value of the property.


### Returns

void

## removeProperty {#removeproperty}

The `removeProperty(String propertyName)` method removes the specified property.

### Parameters

-   **propertyName**

    A string representing the name of the property to be removed.


### Returns

void

## getModelObject {#getModelObject}

The `getModelObject()` method returns a `ModelObject` object.

### Returns

Returns the model object.

## clone {#clone}

`clone()` - these methods create a clone of the model object.

### clone

`clone()` - creates a clone of the model object.

#### Returns

Returns a `ScriptModelObject` object representing the model object.

### clone

`clone(String newObjectId)` - creates a clone of the model object.

#### Parameters

-   **newObjectId**

    A string representing the new ID of the model object.


#### Returns

Returns a `ScriptModelObject` object representing the model object.

## ScriptRemoteConnector {#scriptremoteconnector}

Connectors are retrieved by using the `remote` object and are used to communicate with configured endpoints. This communication generally consists of an HTTP request followed by an appropriate `Response` object (JSON, XML, or other format).

By default, the following properties are available:

|`endpoint`|The ID of the endpoint to which this connector is bound.|
|`descriptor`|The endpoint descriptor.|

-   **[call](#call)**  
`call(String uri)`: this method invokes a URI on the endpoint by using a GET request.
-   **[get](#get)**  
`get(String uri)` - this method invokes a GET request URI on the endpoint.
-   **[post](#post)**  
`post()` - these methods invoke a URI on a remote service, passing the supplied body as a POST request.
-   **[put](#put)**  
`put()` - these methods invoke a URI on a remote service, passing the supplied body as a PUT request.
-   **[del](#del)**  
`del(String uri)`: this method invokes a URI on the endpoint by using a DELETE request.

## call {#call}

`call(String uri)`: this method invokes a URI on the endpoint by using a GET request.

### Parameters

-   **uri**

    A string representing the URI to be invoked on the endpoint.


### Returns

Returns a `Response` object.

## get {#get}

`get(String uri)` - this method invokes a GET request URI on the endpoint.

### Parameters

-   **uri**

    A string representing the URI to be invoked on the endpoint.


### Returns

Returns a `Response` object.

## post {#post}

`post()` - these methods invoke a URI on a remote service, passing the supplied body as a POST request.

### post

`post(String uri, String body)` - this method invokes a URI on a remote service, passing the supplied body as a POST request.

#### Parameters

-   **uri**

    A string representing the URI to be invoked on the endpoint.

-   **body**

    A string representing the body of the POST request.


#### Returns

Returns a `Response` object.

### post

`post(String uri, String body, String contentType)` - this method invokes a URI on a remote service, passing the supplied body as a POST request.

#### Parameters

-   **uri**

    A string representing the URI to be invoked on the endpoint.

-   **body**

    A string representing the body of the POST request.

-   **contentType**

    A string representing the content mimetype of the request body.


#### Returns

Returns a `Response` object.

## put {#put}

`put()` - these methods invoke a URI on a remote service, passing the supplied body as a PUT request.

### put

`put(String uri, String body)` - this method invokes a URI on a remote service, passing the supplied body as a put request.

#### Parameters

-   **uri**

    A string representing the URI to be invoked on the endpoint.

-   **body**

    A string representing the body of the put request.


#### Returns

Returns a `Response` object.

### put

`put(String uri, String body, String contentType)` - this method invokes a URI on a remote service, passing the supplied body as a put request.

#### Parameters

-   **uri**

    A string representing the URI to be invoked on the endpoint.

-   **body**

    A string representing the body of the put request.

-   **contentType**

    A string representing the content mimetype of the request body.


#### Returns

Returns a `Response` object.


## del {#del}

`del(String uri)`: this method invokes a URI on the endpoint by using a DELETE request.

### Parameters

-   **uri**

    A string representing the URI to be invoked on the endpoint.


### Returns

Returns a `Response` object.

## Response {#response}

The `Response` object wraps the response data, status code, status message, and any exception information from a remote call.

By default, the following properties are available:

|`encoding`|Read/write property. The encoding of the response.|
|`response`|The data of the response as a string.|
|`text`|The text of the response.|
|`responseStream`|The response `InputStream`.|
|`status`|Returns a `ResponseStatus` object wrapping the return code status, message, and any exception information.|

## ResponseStatus {#responsestatus}

The `ResponseStatus` object wraps the response status code, status message, and any exception information from a remote call. The `ResponseStatus` object inherits from the `Status` object.

By default, the following properties are available:

Note that the previously used class `WebScriptStatus` is now deprecated.

|`exception`|Response status exception object; this can be null. Read/write.|
|`message`|Response status message. Read/write.|
|`redirect`|Redirect to status code response. Read/write.|
|`code`|Response status code. Read/write.|
|`codeName`|Localized response status code name. Read only.|
|`location`|Location response header. Read/write.|
|`codeDescription`|Localized response status code description.|

-   **[setCode](#setcode)**  
`setCode(int code, String message)` - method to set a status code and message.
-   **[setHeader](#setheader)**  
`setHeader(String headerName, String headerValue)` - allows for response headers to be stored onto the status.
-   **[getHeaders](#getheaders)**  
`getHeaders()` - this method returns response headers.

## setCode {#setCode}

`setCode(int code, String message)` - method to set a status code and message.

### Parameters

-   **code**

    A string representing the code.

-   **message**

    A string representing the message.


### Returns

void

## setHeader {#setheader}

`setHeader(String headerName, String headerValue)` - allows for response headers to be stored onto the status.

### Parameters

-   **headerName**

    A string representing the name of the header.

-   **headerValue**

    A string representing the value of the header.


### Returns

void

## getHeaders {#getHeaders}

`getHeaders()` - this method returns response headers.

### Returns

Returns a Map<String, String> object representing a map of the header names and values.

## Rendering objects {#rendering-objects}

There are multiple steps to the Surf page rendering process. At specific stages different objects are in context to scripts and, therefore, different root objects are available to each of those rendering objects.

-   **[templates]({% link content-services/5.2/develop/alfresco-full-text-search-ref.md %}#templates)**  
The `templates` object contains root-scope objects that are available during the rendition of a template.
-   **[components](#components)**  
The `components` rendering object contains root-scoped objects that are available during the rendition of a component.

## templates {#templates}

The `templates` object contains root-scope objects that are available during the rendition of a template.

### sitedata

Always available.

### context

Always available.

### instance

Always available.

### user

Always available ('guest' if unauthenticated).

### content

Available if content is being dispatched.

### page

The page model object.

### theme

The current theme ID.

### htmlid

The HTML ID.

### url

The URL information object.

### head

The string of all component headers (<script> and <link> dependencies).

Custom properties of the `Template` object can be accessed by using the properties map. Given a custom property called `mycustomproperty`, it would be accessed like this:

```
${context.template.properties["mycustomproperty"]}
```

Custom properties of the `Page` object can be accessed like this:

```
${context.page.properties["mycustomproperty"]}
```

The following Surf directives are available to FreeMarker Templates:

```
<@region id="regionName" scope="(global, template or page)" protected=true/false/>
<@component componentId="(id of component)" chrome="(id of chrome)" chromeless=true/false/>
```
## components {#components}

The `components` rendering object contains root-scoped objects that are available during the rendition of a component.

### sitedata

Always available.

### context

Always available.

### instance

Always available.

### user

Always available (‘guest’ if unauthenticated).

### content

Available if content is being dispatched.

### page

Page model object.

### template

Available if a parent template is present.

### config

Component level XML configuration.

### app

Web application access.

### theme

The current theme ID.

### htmlid

The HTML ID.

### url

URL information object.

Custom properties of the currently rendering component can be accessed by using the properties map. Given a custom property called `mycustomproperty`, it would be accessed like this:

```
${instance.properties["mycustomproperty"]}
```
