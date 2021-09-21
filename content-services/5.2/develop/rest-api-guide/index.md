---
title: API guide
---

Alfresco Content Services supports a range of APIs (Application Programming Interfaces) to enable developers to write applications that access the repository on-premises.

> **Important:** Any APIs not covered by this documentation are unsupported and subject to significant change.

Alfresco Content Services provides a wide range of APIs.

The following diagram illustrates the key APIs:

![]({% link content-services/images/api-overview.png %})

There are three different kinds of customizations that you can build for Alfresco Content Services. Platform embedded extensions, Share embedded extensions, and remote extensions, also referred to as integrations.

On the platform (server side) you can add Java code and JavaScript code to extend the platform with new custom functionality such as Java Services, repository web scripts, actions, scheduled jobs and more. These extensions are embedded in the Platform application and run in the same JVM as the Platform. When developing platform extensions you use the [Public Java API]({% link content-services/5.2/develop/api-reference.md %}#java-api) and the [Repository JavaScript API]({% link content-services/5.2/develop/api-reference.md %}#java-api) and [Repository Freemarker Template API]({% link content-services/5.2/develop/api-reference.md %}#freemarker-api).

On the web client side you can extend Alfresco Share with new pages, dashlets, document library actions and more. These extensions are embedded in the Share application and run in the same JVM as Alfresco Share. When developing Share extensions you use the [Aikau Widget and Services Reference/API](http://dev.alfresco.com/resource/docs/aikau-jsdoc/) and the [Spring Surf API]({% link content-services/5.2/develop/repo-ext-points/web-scripts.md %}#presentation-tier-web-scripts).

Finally, you can also build stand-alone applications and web clients that talk to the repository remotely. These integrations will use the [ReST API]({% link content-services/5.2/develop/api-reference.md %}#rest-apis).

The following sections give you a brief overview of the APIs, their use cases, and links to further information.

-   **[API overview](#api-overview)**  
Provides an overview of each of the supported APIs, with links to further documentation.
-   **[Use Cases](#use-cases)**  
Typical use cases when developing content management solutions, with an example of the appropriate API.
-   **[Using the APIs](#using-the-apis)**  
There is common functionality that is often accessed by developers in Alfresco Content Services. For example, there is often a requirement to obtain a list of users, groups or sites, or search for a list of documents.
-   **[API Reference]({% link content-services/5.2/develop/api-reference.md %})**  
This information provides reference materials for the various Alfresco Content Services APIs that are available.

## API overview {#api-overview}

Provides an overview of each of the supported APIs, with links to further documentation.

Alfresco Content Services provides a wide range of APIs which you can use depending on what you are trying to do. The APIs can generally be divided into two main types: Remote, where code runs in the remote client, and Embedded, where the code runs on the server.

For example, the Alfresco Content Services REST API is a remote API, designed to allow you to create remote client applications. The Repository JavaScript API is an embedded API that allows you to create server-side extensions in JavaScript. The Public Java API is an embedded API that allows you to create server-side extensions that require a lower level of access, such as required if you are writing new services or Java-backed web scripts.

The following table provides a brief overview of each API, with links to further information:

|API|Type|Description|Support Status|
|---|----|-----------|--------------|
|[REST API]({% link content-services/5.2/develop/api-reference.md %}#rest-apis)|Remote|This is the main public API for interfacing your client application with Alfresco. This RESTful API can be used to access on-premises repositories.<br>The REST API provides the ability to access core repository functionality through a **[CMIS REST API]({% link content-services/5.2/develop/api-reference.md %}#cmis-rest-api)**, such as uploading a file, and Alfresco Content Services-specific functionality, such as management of sites, can be accessed through the Alfresco REST API.|Fully supported.|
|[Repository JavaScript API]({% link content-services/5.2/develop/api-reference.md %}#java-api) and the [Repository JavaScript API]({% link content-services/5.2/develop/api-reference.md %}#java-api)|Embedded|This API is a JavaScript API used primarily for the development of [Web Scripts]({% link content-services/5.2/develop/api-reference.md %}#web-scripts) that execute embedded in the Alfresco platform.<br>Web scripts are extensions to Alfresco Content Services that can be written and built without requiring compilation, and therefore have a reduced development time.<br>The web scripts are accessed using URLs, so can be thought of as providing the ability to create custom REST APIs.|Fully supported.|
|[Search API]({% link content-services/5.2/develop/api-reference.md %}#search-api)|Embedded|The Search API provides access to the search features of Alfresco Content Services. The Search API accepts POST requests containing JSON structures to group options related to different query concepts together.|Fully supported.|
|[Repository Freemarker Template API]({% link content-services/5.2/develop/api-reference.md %}#freemarker-api)|Embedded|This API provides a wide-range of objects and methods for creating scripts using the FreeMarker templating language, that execute embedded in the Alfresco platform.<br>It provides a more limited API than the Repository JavaScript API, but with the convenience of using a simpler templating language, rather than a more complex scripting language such as JavaScript.|Fully supported.|
|[Spring Surf API]({% link content-services/5.2/develop/repo-ext-points/web-scripts.md %}#presentation-tier-web-scripts)|Embedded|Spring Surf is a server-side UI development framework that is used by Share. Both legacy Surf pages and new Aikau pages are based on Spring Surf. A Spring Surf page is backed by one or more presentation web scripts, referred to as Spring Surf web scripts.<br>The Surf Platform API is used in Surf web script controllers and provides a JavaScript API to allow you to access URL and page contexts, as well as calling remote REST services.|Fully supported.|
|[Aikau Widget and Service Reference/API](http://dev.alfresco.com/resource/docs/aikau-jsdoc/)|Embedded|This is the reference, and API, for all the new Aikau widgets and services that are used in the Share user interface. These are fully available when developing custom pages, dashlets, and menus for Share.|Fully supported.|
|[Public Java API]({% link content-services/5.2/develop/api-reference.md %}#java-api)|Embedded|When you are extending the Platform with new content models and workflows it is often useful to provide corresponding new custom services implemented in Java. The business logic in web script controllers sometimes also need to be implemented in Java to use 3rd party libraries.<br>Alfresco Content Services provides numerous Java-level APIs, which are documented through the JavaDoc system. Links to the JavaDoc documentation can be found on the [Developer Site](http://dev.alfresco.com/resource/AlfrescoOne/5.0/PublicAPI/).<br>While in theory it is possible to access the complete range of out-of-the-box Java classes (APIs), there is a public API of classes and interfaces that you should stick to. This is to ensure that your application works on future versions of Alfresco Content Services and that you get appropriate support.|Fully supported.|
|Repository REST API|Remote|This is the older deprecated REST API based on web scripts. You should use the new REST API, which consist of the CMIS REST API and the Alfresco REST API.|**DEPRECATED: use [REST API]({% link content-services/5.2/develop/api-reference.md %}#rest-apis) instead.**|

## Use Cases {#use-cases}

Typical use cases when developing content management solutions, with an example of the appropriate API.

The following table lists use cases and what Alfresco Content Services API to use:

|Use case|API|
|--------|---|
|Accessing content metadata from a Platform extension such as a web script or workflow.|[Repository JavaScript API]({% link content-services/5.2/develop/api-reference.md %}#java-api) and the [Repository JavaScript API]({% link content-services/5.2/develop/api-reference.md %}#java-api)|
|Accessing text content (for example txt, xml, html) for files from a Platform extension such as a web script or workflow.|[Repository JavaScript API]({% link content-services/5.2/develop/api-reference.md %}#java-api) and the [Repository JavaScript API]({% link content-services/5.2/develop/api-reference.md %}#java-api)|
|Implementing a workflow service task that should publish content metadata to an external system via a 3rd party Java library.|[Public Java API]({% link content-services/5.2/develop/api-reference.md %}#java-api)|
|Accessing binary content (e.g. docx, pdf) for files from a Platform extension such as a web script or workflow.|[Public Java API]({% link content-services/5.2/develop/api-reference.md %}#java-api)|
|Implementing a scheduled job that should access content and metadata.|[Public Java API]({% link content-services/5.2/develop/api-reference.md %}#java-api)|
|Implementing a repository action that should access content and metadata.|[Public Java API]({% link content-services/5.2/develop/api-reference.md %}#java-api)|
|Creating a stand-alone client talking remotely to Alfresco Content Services.|[REST API]({% link content-services/5.2/develop/api-reference.md %}#rest-apis)|
|Changing the view for a Web Script, Dashlet, Page.|[Repository Freemarker Template API]({% link content-services/5.2/develop/api-reference.md %}#freemarker-api)|
|Creating a new Share Page or Share Dashlet.|Refer to the Aikau page extension point in the [Share Architecture]({% link content-services/5.2/develop/software-architecture.md %}#share-architecture). See also [Aikau Widget Reference](http://dev.alfresco.com/resource/docs/aikau-jsdoc/).|
|Modifying an existing Share Page or Dashlet.|Refer to the Surf page extension points in the [Share Architecture]({% link content-services/5.2/develop/software-architecture.md %}#share-architecture). Also, look at the [Surf Web Scripts]({% link content-services/5.2/develop/repo-ext-points/web-scripts.md %}#surf-web-scripts)|

## Using the APIs {#using-the-apis}

There is common functionality that is often accessed by developers in Alfresco Content Services. For example, there is often a requirement to obtain a list of users, groups or sites, or search for a list of documents.

Sometimes you need to create and manage workflows, or transform documents. A list of common functions and usages is provided here, and all supported APIs for working with that functionality. While the list of functionality is only meant to cover common tasks, links to more information are provided. See also the [Platform extensions]({% link content-services/5.2/develop/software-architecture.md  %}#platform-extension-point) and [Share extensions]({% link content-services/5.2/develop/software-architecture.md %}#share-extensions) to explore the full developer interface.

-   **[Java API]({% link content-services/5.2/develop/api-reference.md %}#java-api)**  
Provides Java API information.
-   **[ReST API](#rest-api)**  
This section provides information about Alfresco ReST API version 1.0 and how to use it.
-   **[CMIS API (OASIS ReST Standard)]({% link content-services/5.2/develop/reference/cmis-ref.md %})**  
Provides CMIS API information.
-   **[Using the APIs by Function]({% link content-services/5.2/develop/apis-by-function.md %})**  
Provides API information based on what type of operation that should be executed.


## ReST API {#rest-api}

This section provides information about Alfresco ReST API version 1.0 and how to use it.

The Alfresco ReST API is the main API to use for remote extensions.

To get started with the API follow these steps:

1.  Read the introduction to the ReST API
2.  Install the API Explorer
3.  Install a tool for making API calls
4.  Authenticate with the Repository to get a token
5.  Use the auth token to call the API

-   **[Introduction](#introduction)**  
Introduction to the Alfresco ReST API version 1.0.
-   **[Things to know before you start](#things-to-know-before-you-start)**  
Things that you should know before you start using the ReST API.
-   **[Installing and Getting Started with the API Explorer]({% link content-services/5.2/develop/rest-api-guide/install.md %}#installing-and-getting-started-with-the-api-explorer)**  
Information about Alfresco ReST API Explorer and how to install it and getting going with it.
-   **[Installing a tool to make HTTP calls]({% link content-services/5.2/develop/rest-api-guide/install.md %}#installing-a-tool-to-make-http-calls)**  
Information about the **cURL** command line tool that can be used to make HTTP calls.
-   **[Installing a tool to format JSON responses]({% link content-services/5.2/develop/rest-api-guide/install.md %}#installing-a-tool-to-format-json-responses)**  
Information about the **jq** command line tool that can be used to format JSON responses.
-   **[Authenticating with the Repository]({% link content-services/5.2/develop/rest-api-guide/install.md %}#authenticating-with-the-repository)**  
Before you can use the Alfresco ReST API you need to authenticate with the server to get a ticket.
-   **[Getting Repository Information]({% link content-services/5.2/develop/rest-api-guide/get-repo-info.md %})**  
Before you start using the ReST API it is useful to verify what exact version of ACS you are talking to, and what features it has enabled.
-   **[Managing Folders and Files]({% link content-services/5.2/develop/rest-api-guide/folders-files.md %})**  
This section is all about managing folders and files.
-   **[Managing Sites]({% link content-services/5.2/develop/rest-api-guide/sites.md %})**  
This section walks through how to manage Alfresco Share sites via the ReST API.
-   **[Managing People and Groups]({% link content-services/5.2/develop/rest-api-guide/people-groups.md %})**  
This section walks through how to manage people and groups via the ReST API.
-   **[Managing Audit Applications and Logs]({% link content-services/5.2/develop/rest-api-guide/audit-apps.md %}#managing-audit-applications-and-logs)**  
This section walks through how to manage audit applications and their audit logs via the ReST API.
-   **[Searching]({% link content-services/5.2/develop/rest-api-guide/searching.md %}#searching)**  
This section provides information on how to search for content and metadata in the Repository.

## Introduction {#introduction}

Introduction to the Alfresco ReST API version 1.0.

The Alfresco ReST API version 1.0 is a complete application interface that gives you access to all the features of the Alfresco Repository. The endpoint to access the API has the following format:

![]({% link content-services/images/dev-api-by-language-alf-rest-intro-1.png %})

If you are accessing a local Repository the endpoint URL will most likely look like follows for a standard Repository installation: **https://localhost:8080/alfresco/api/-default-/public/alfresco/versions/1/...**

The tenant part will always be `-default-`, unless you are running a multi-tenant Alfresco solution where you would specify what tenant you want to operate against.

The scope is important and it denotes the accessibility of the API, `public` means it is allowed to use and `private` means that the API is for internal Alfresco use only (can change at any time). You can add your own scope, such as `extension`, for your own APIs. The Alfresco ReST API actually contains a number of APIs and the Core API is denoted by the **/alfresco** path. You also have the Search, Workflow, Discovery, and Authentication APIs.

To work with an object in the Repository, such as a folder or file node, you will append to this URL as follows:

![]({% link content-services/images/dev-api-by-language-alf-rest-intro-2.png %})

An object in the Repository is referred to as an Entity. Which specific instance of an *entity* type you are working with is specified as part of the URL path (i.e. `{id}`). There can be Relationships between Entities and Operations applied to Entities, which are also specified as part of the URL (i.e. `children`, `copy`).

## Things to know before you start {#things-to-know-before-you-start}

Things that you should know before you start using the ReST API.

### Introduction

The Alfresco ReST API endpoints share many features, such as the format for collection responses, how to sort and order responses, how to limit results, how to request optional information, etc.

So it makes sense to know about these features before you start using the API, as sometimes documentation might not cover all these common features, and you would then have to resort to the API Explorer reference.

### The API Explorer is your source of truth

The reference documentation for the Alfresco ReST API is available in what is referred to as the API Explorer application. This application is available for each version of ACS.

If you are confused about what API endpoints that are supported for a specific version of ACS, then install the associated API Explorer and check if the API endpoint is available. If you are wondering about specific API endpoint details, and you cannot find any information about it anywhere, consult the API Explorer.

You can find more information about the API Explorer on [this page]({% link content-services/5.2/develop/rest-api-guide/install.md %}#installing-and-getting-started-with-the-api-explorer), which also has information on how to install it for your specific version of ACS.

If you want to know what the API Explorer looks like right now, then have a look at the online version at [https://api-explorer.alfresco.com/api-explorer](https://api-explorer.alfresco.com/api-explorer) (note that this API Explorer always shows the API for the latest version of ACS).

### Finding out if an API endpoint is supported in a specific ACS version

The majority of the API endpoints have information in the Open API specification (i.e. Swagger docs) about what version of ACS that is required (i.e. in the API Explorer).

This version information is usually available in the beginning of the API endpoint description, as in the following screenshot:

![]({% link content-services/images/dev-api-by-language-alf-rest-acs-required-version-1.png %})

Note that an API endpoint can be supported from a specific patch version of ACS, such as in the following screenshot:

![]({% link content-services/images/dev-api-by-language-alf-rest-acs-required-version-2.png %})

If you are running an earlier version of ACS, which doesn't support the API endpoint, then you would need to upgrade your ACS installation before starting to use this endpoint.

### Tickets

It's common to use HTTP basic authentication when trying out the ReST API.

However, the basic auth mechanism provides no confidentiality protection for the transmitted credentials. They are merely encoded with Base64 in transit, but not encrypted or hashed in any way. Therefore, basic Authentication is typically used in conjunction with HTTPS to provide confidentiality.

Alfresco ReST API also provides another way of authenticating with the repository. The APIs also support the Alfresco ticket mechanism. You can POST the following body to **http://localhost:8080/alfresco/api/-default-/public/authentication/versions/1/tickets** to create a new ticket:

```

{
  "userId": "admin",
  "password": "admin"
}‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍

```

The response provides the ticket in the `id` property:

```

{
  "entry": {
    "id": "TICKET_ed4981b4bbb15fc2713f7caaffd23982d0dd4e5c",
    "userId": "admin"
  }
}‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍

```

This ticket can then be used instead of a username and password. Although the ReST API supports the `alf_ticket` query parameter, we do not recommend using it, a more secure approach is to use a HTTP header. The basic auth mechanism is still used i.e. sending an `Authorisation` header. However, the base64 encoded username/password is replaced with the base64 encoded ticket.

How to get a ticket and how to use it is explained [here]({% link content-services/5.2/develop/rest-api-guide/install.md %}#authenticating-with-the-repository) in the ReST API user guide.

### Limiting result items

By default the API will return a maximum of 100 result items in any one request, this can be controlled via the `maxItems` query parameter.

The **http://localhost:8080/alfresco/api/-default-/public/alfresco/versions/1/nodes/-my-/children?maxItems=5** request shows how you can limit the number of result items to five.

This query parameter is supported across all collection endpoints.

### Skipping result items

By default the API will return result items starting from the beginning, it's possible to skip any number of result items using the `skipCount` query parameter. This is typically used for implementing paging or infinite scrolling in clients.

The **http://localhost:8080/alfresco/api/-default-/public/alfresco/versions/1/nodes/-my-/children?skipCount=2** request shows how you can skip the first two result items.

This query parameter is supported across all collection endpoints.

### Ordering result items

All collection endpoints (those returning a list of result items) will have a default sort order. It's possible to change the sort order on some endpoints via the `orderBy` query parameter.

The **http://localhost:8080/alfresco/api/-default-/public/alfresco/versions/1/nodes/-my-/children?orderBy=sizeInBytes DESC** request shows how you can order the nodes in your home folder by the size of the content, starting with the largest item.

The direction of the sorting can be controlled by the `DESC` (descending) and `ASC` (ascending) keywords.

As previously mentioned, not all endpoints allow ordering to be controlled so you'll need to consult the API Explorer to see whether the `orderBy` parameter is supported and what properties within the response that can be used.

### Filtering result items

Sometimes only a subset of the response items are required, several endpoints support this via the `where` query parameter.

The `where` parameter allows you to provide one or more clauses defining what items you want to see in the response. The **http://localhost:8080/alfresco/api/-default-/public/alfresco/versions/1/nodes/-my-/children?where=(isFile=true)** request shows how you can limit the nodes in your home folder to just the files.

The `where` parameter is specific to each endpoint so you'll need to consult the API Explorer to see firstly, whether the `where` parameter is supported and secondly, what expressions and clauses can be used.

### Requesting optional item information

We have taken what we're calling a "performance first" approach with the API. This means that each endpoint, by default, only returns the item information that is efficient to retrieve.

If additional processing is required on the server side to obtain the item information, then it's made available via the `include` query parameter.

The **http://localhost:8080/alfresco/api/-default-/public/alfresco/versions/1/nodes/-my-/children?include=properties,aspectNames** request shows how you can also include the properties and aspects for each node in your home folder when listing its children.

As with the `orderBy` and `where` parameters, the `include` parameter is specific to the endpoint so you'll need to consult the API Explorer to see what extra item information is available.

### Limiting the item information

Sometimes bandwidth is a major consideration, such as when building a mobile client.

To cater for this scenario the API allows you to control the amount of item data sent over the wire via the `fields` query parameter.

The **http://localhost:8080/alfresco/api/-default-/public/alfresco/versions/1/nodes/-my-/children?fields=id,name** request shows how you can limit the item response to only contain the `id` and `name` properties as shown in the response below:

```

{
  "list": {
    "pagination": {
      "count": 3,
      "hasMoreItems": false,
      "totalItems": 3,
      "skipCount": 0,
      "maxItems": 100
    },
    "entries": [
      {
        "entry": {
          "name": "A Folder",
          "id": "a5634765-ab0f-438a-8efd-bfa4139da8aa"
        }
      },
      {
        "entry": {
          "name": "lorem-ipsum.txt",
          "id": "5516aca4-df8b-43e8-8ff3-707316c60c6e"
        }
      },
      {
        "entry": {
          "name": "image.jpg",
          "id": "fc132aa5-6281-40bf-adee-5731e6ecb653"
        }
      }
    ]
  }
}‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍

```

The `fields` parameter works in conjunction with the `include` parameter so you don't have to repeat yourself. For example, say you want to include the `id`, `name` and the optional `aspectName` properties in the response. It's then possible to use the `fields=id,name&include=aspectNames` query parameter string. No need to specify the `aspectName` value again in the `fields` parameter.

The `fields` parameter is supported universally across all endpoints.

### Person id alias

There are several endpoints across the API that expect a person id as part of the URL, this is OK if the client knows the person id, but there are some scenarios where it might not be known, for example when using tickets.

For this scenario the API supports the `-me-` alias which can be substituted in any URL that expects `personId`.

The **http://localhost:8080/alfresco/api/-default-/public/alfresco/versions/1/people/-me-** request shows how this can be used to retrieve the profile information of the currently authenticated user.

### Well known node id aliases

There are several endpoints across the API that expect a node id as part of the URL, this is OK if the client knows the node id, but there are some scenarios where it might not be known, for example when starting to navigate the folder hierarchy.

For this scenario the API supports the following node id aliases:

-   `-root-`: corresponds to the node id for the **/Company Home** folder.
-   `-shared-`: corresponds to the node id for the **/Company Home/Shared** folder.
-   `-my-`: corresponds to the node id for the current user's home folder (i.e. **/Company Home/User Homes/{userid}**).

The **http://localhost:8080/alfresco/api/-default-/public/alfresco/versions/1/nodes/-root-/children** request shows how you can list the contents (children) of the **/Company Home** folder without knowing its node id.

### Creating multiple entities (items)

Supporting batch operations, such as updating the metadata for multiple items simultaneously, is something we plan to support in the future. However it's a little known fact that the API already has some basic batch capabilities when it comes to creating entities.

Most POST endpoints that create entities actually allow an array of objects to be passed in the body, which creates each one individually, *but within the same transaction*.

The **http://localhost:8080/alfresco/api/-default-/public/alfresco/versions/1/nodes/-my-/children** request shows how two folders can be created with the one request by passing the body shown below:

```

[
  {
    "name": "Folder One",
    "nodeType": "cm:folder"
  },
  {
    "name": "Folder Two",
    "nodeType": "cm:folder"
  }
]‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍

```

The API returns a standard listing response providing the details on each entity that was created, in this case, the two folders:

```

{
  "list": {
    "pagination": {
      "count": 2,
      "hasMoreItems": false,
      "totalItems": 2,
      "skipCount": 0,
      "maxItems": 100
    },
    "entries": [
      {
        "entry": {
          "aspectNames": [
            "cm:auditable"
          ],
          "createdAt": "2017-04-12T10:31:12.477+0000",
          "isFolder": true,
          "isFile": false,
          "createdByUser": {
            "id": "test",
            "displayName": "Test User"
          },
          "modifiedAt": "2017-04-12T10:31:12.477+0000",
          "modifiedByUser": {
            "id": "test",
            "displayName": "Test User"
          },
          "name": "Folder One",
          "id": "ecbec6fd-a273-4978-9b95-00a8e783948e",
          "nodeType": "cm:folder",
          "parentId": "062b8b2a-aa7e-4cdd-bfec-7fbcd16ecd85"
        }
      },
      {
        "entry": {
          "aspectNames": [
            "cm:auditable"
          ],
          "createdAt": "2017-04-12T10:31:12.501+0000",
          "isFolder": true,
          "isFile": false,
          "createdByUser": {
            "id": "test",
            "displayName": "Test User"
          },
          "modifiedAt": "2017-04-12T10:31:12.501+0000",
          "modifiedByUser": {
            "id": "test",
            "displayName": "Test User"
          },
          "name": "Folder Two",
          "id": "18c82e9b-5a2f-44bf-bc77-1aca7346a24a",
          "nodeType": "cm:folder",
          "parentId": "062b8b2a-aa7e-4cdd-bfec-7fbcd16ecd85"
        }
      }
    ]
  }
}‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍

```

If the endpoint does not support creating multiple entities an error is returned.

### Including the source entity for a collection

When returning a relationship collection for an entity, for example the children of a node or the members of a site, details of the entity are not included by default, to include them you can use the `includeSource` query parameter.

The **http://localhost:8080/alfresco/api/-default-/public/alfresco/versions/1/nodes/-my-/children?includeSource=true** request shows how you'd include details of the user's home folder when listing its children, shown below in the `source` property:

```

{
  "list": {
    "pagination": {
      "count": 12,
      "hasMoreItems": false,
      "totalItems": 12,
      "skipCount": 0,
      "maxItems": 100
    },
    "entries": [ ... ],
    "source": {
      "name": "test",
      "createdAt": "2017-02-20T11:01:39.647+0000",
      "modifiedAt": "2017-04-12T10:31:12.509+0000",
      "createdByUser": {
        "id": "admin",
        "displayName": "Administrator"
      },
      "modifiedByUser": {
        "id": "test",
        "displayName": "Test User"
      },
      "isFolder": true,
      "isFile": false,
      "aspectNames": [
        "cm:ownable",
        "cm:auditable"
      ],
      "properties": {
        "cm:owner": {
          "id": "test",
          "displayName": "Test User"
        }
      },
      "nodeType": "cm:folder",
      "parentId": "a9ad3bc4-d30f-4910-bee0-63d497e74a22",
      "id": "062b8b2a-aa7e-4cdd-bfec-7fbcd16ecd85"
    }
  }
}

```

‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍‍

Another example is returning details of a site when listing it's members, to do that you'd use the **http://localhost:8080/alfresco/api/-default-/public/alfresco/versions/1/sites/swsdp/members?includeSource=true** URL.

The `includeSource` parameter is supported for all endpoints that include an entity and a relationship collection.

