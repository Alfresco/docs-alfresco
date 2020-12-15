---
title: Introduction to the ReST API Guide
---

The Alfresco ReST API version 1.0 is a complete application interface that gives you access to all the features of the 
Alfresco Repository. When building remote extensions the Alfresco ReST API is the preferred interface.

The endpoint to access the API has the following format:

![dev-api-by-language-alf-rest-intro-1]({% link content-services/images/dev-api-by-language-alf-rest-intro-1.png %})

If you are accessing a local Repository the endpoint URL will most likely look like follows for a standard Repository 
installation: `https://localhost:8080/alfresco/api/-default-/public/alfresco/versions/1/...`

The tenant part will always be `-default-`, unless you are running a multi-tenant Alfresco solution where you would 
specify what tenant you want to operate against.

The scope is important and it denotes the accessibility of the API, `public` means it is allowed to use and `private` 
means that the API is for internal Alfresco use only (can change at any time). You can add your own scope, such as 
`extension`, for your own APIs. The Alfresco ReST API actually contains a number of APIs and the Core API is denoted by 
the `/alfresco` path. You also have the Search, Workflow, Discovery, and Authentication APIs.

To work with an object in the Repository, such as a folder or file node, you will append to this URL as follows:

![dev-api-by-language-alf-rest-intro-2]({% link content-services/images/dev-api-by-language-alf-rest-intro-2.png %})

An object in the Repository is referred to as an Entity. Which specific instance of an *entity* type you are working 
with is specified as part of the URL path (i.e. `{id}`). There can be Relationships between Entities and Operations 
applied to Entities, which are also specified as part of the URL (i.e. `children`, `copy`).

This section provides information about Alfresco ReST API version 1.0 and how to use it.

To get started with the API follow these steps:

1. [Read things to know before you start]({% link content-services/latest/develop/rest-api-guide/things-to-know.md %})
2. [Install the ReST API Explorer]({% link content-services/latest/develop/rest-api-guide/install-rest-api-explorer.md %})
3. [Install a tool for making API calls]({% link content-services/latest/develop/rest-api-guide/install-http-calls-tool.md %})
4. [Install a tool to format JSON responses]({% link content-services/latest/develop/rest-api-guide/install-json-format-tool.md %})
5. [Authenticate with the Repository to get a token]({% link content-services/latest/develop/rest-api-guide/auth-with-repo.md %})
6. [Get Repository Info to see what is supported]({% link content-services/latest/develop/rest-api-guide/get-repo-info.md %}) - which uses and tests the auth token



