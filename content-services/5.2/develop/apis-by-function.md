---
title: Using the APIs by Function
---

Provides API information based on what type of operation that should be executed.

This information groups the APIs based on what entity or function they operate on. For example, if you wanted to access a node, you would look under the Nodes section. If you are looking for a way to start workflows then you would go to the Workflow section.

References to code in different languages such as REST, Java, and JavaScript are also included.

-   **[Actions](#actions)**  
Actions are units of work that can be carried out on a node. Usually they are fired by Rules, so that, for example, when a piece of content is added (or removed) from a specific folder, it is transformed, tagged, or processed in some way.
-   **[Files and Folders](#files-and-folders)**  
Files (Documents) and Folders (Containers) are fundamental units within the repository. Developers often search for specific files and folders and process them. In addition Rules can be set on Folders that fire Actions when files are added or removed from a Folder.
-   **[Nodes](#nodes)**  
The core data structure in the repository is called a node. Each piece of content in the repository has a corresponding node data structure to reference the content and metadata. Each node has a corresponding `NodeRef` uniquely identifying it in the repository. Examples of nodes are folders, files, and comments.
-   **[People and Groups](#people-and-groups)**  
People (i.e. users) and groups are fundamental to a content management system, as they add and share content, are used to control permissions, create sites and interact with them and perform day to day functions relating to content.
-   **[Search](#search)**  
Solr provides indexing of metadata and the plain text of content. This can be queried using various query languages, including Lucene and CMIS Query Language.
-   **[Sites](#sites)**  
Sites provide a way for users to collaborate around content. Content can be organized within sites, and access to sites controlled by the site managers.
-   **[Tags](#tags)**  
Tags are simple text labels that are attached to a piece of content, such as a folder or a file. Each piece of content can have multiple tags. Folders also have a TagScope object which encapsulates information about the tags used on content in that folder. The TagScope object contains an array that lists Tags in count order. There are methods to find out how many times a particular tag is used.
-   **[Workflow](#workflow)**  
The Activiti workflow engine is built into Alfresco Content Services. It also provides UI in Alfresco Share to allow you to create standard workflows and manage them. In addition, as a developer, you can create custom workflows and manage them programmatically.



## Actions

Actions are units of work that can be carried out on a node. Usually they are fired by Rules, so that, for example, when a piece of content is added (or removed) from a specific folder, it is transformed, tagged, or processed in some way.

|Information|Actions|
|-----------|-------|
|Java API|This API exposes the [ActionService]({% link content-services/5.2/develop/api-reference.md %}#actionservice) that can be used to create and execute Repository actions. For more info see the [JavaDocs](http://dev.alfresco.com/resource/docs/java/org/alfresco/service/cmr/action/ActionService.html).|
|JavaScript API|In JavaScript actions can be managed via the [Actions API]({% link content-services/5.2/develop/api-reference.md %}#actions-api). Use the root object `actions`.|
|Alfresco ReST API|The Alfresco ReST API has endpoints to list available repository actions and for executing actions. See the API Explorer Action Reference docs [here](https://api-explorer.alfresco.com/api-explorer/#/actions).|
|CMIS ReST API|Not Available|
|Mobile SDK (iOS)|Not Available|
|Mobile SDK (Android)|Not Available|
|More Information|-   [Actions platform extension point documentation]({% link content-services/5.2/develop/repo-ext-points/repo-actions.md %}).<br>-   [Java API - Access and Transaction Management documentation]({% link content-services/5.2/develop/java-api-guide.md %}#repository-java-api).|

## Files and Folders

Files (Documents) and Folders (Containers) are fundamental units within the repository. Developers often search for specific files and folders and process them. In addition Rules can be set on Folders that fire Actions when files are added or removed from a Folder.

|Information|Files and Folders|
|-----------|-----------------|
|Java API|This API exposes the [FileFolderService]({% link content-services/5.2/develop/api-reference.md %}#filefolderservice) as a way of managing folders and files. For more info see the [JavaDocs](http://dev.alfresco.com/resource/docs/java/org/alfresco/service/cmr/model/FileFolderService.html). To search for folders and files use the [SearchService]({% link content-services/5.2/develop/java-api-guide.md %}#searchservice), see also the [JavaDocs](http://dev.alfresco.com/resource/docs/java/org/alfresco/service/cmr/search/SearchService.html) (note. `FileFolderService` contains `search` methods that are deprecated).|
|Repository JavaScript API|In JavaScript there are many objects and methods for working with files and folders. For example, the `companyhome` root object has a `children` property that returns child nodes. See the [JavaScript API Documentation]({% link content-services/5.2/develop/api-reference.md %}#scripting-api) for more information.|
|Alfresco ReST API|The Alfresco ReST API can be used to manage folders, files, comments, etc. See the [Managing Folders and Files ReST API documentation.]({% link content-services/5.2/develop/rest-api-guide/folders-files.md %}).|
|CMIS ReST API|The preferred way to access folders and files in Alfresco is via the Alfresco ReST API. However, if your requirements are to use an open standard, then have a look at [OASIS Content Management Interoperability Services (CMIS)](https://www.oasis-open.org/committees/cmis/). See the [CMIS API]({% link content-services/5.2/develop/reference/cmis-ref.md %}) section to get going with the CMIS ReST API. This information covers the ATOM binding where you work with XML.<br><br>If you prefer to work with JSON, then have a look at the [Browser binding]({% link content-services/5.2/develop/api-reference.md %}#cmis-1.1) available in CMIS 1.1.<br><br>If you are developing a remote client in Java and want to use CMIS, then have a look at the [OpenCMIS](http://chemistry.apache.org/java/developing/index.html) Java Library.|
|More Information|-   [Java API - Access and Transaction Management documentation]({% link content-services/5.2/develop/java-api-guide.md %}#repository-java-api).|

## Nodes

The core data structure in the repository is called a node. Each piece of content in the repository has a corresponding node data structure to reference the content and metadata. Each node has a corresponding `NodeRef` uniquely identifying it in the repository. Examples of nodes are folders, files, and comments.

|Information|Nodes|
|-----------|-----|
|Public Java API|This API exposes the [NodeService]({% link content-services/5.2/develop/api-reference.md %}#nodeservice) as a way of managing nodes. To search for nodes use the [SearchService]({% link content-services/5.2/develop/java-api-guide.md %}#searchservice).|
|Repository JavaScript API|You can find nodes using the [Search API]({% link content-services/5.2/develop/api-reference.md %}#search-api), and then manipulate individual nodes using the [ScriptNode API]({% link content-services/5.2/develop/api-reference.md %}#scriptnode-api)|
|Alfresco ReST API|The Alfresco ReST API can be used to access different types of nodes, such as folders, files, tags, comments, and ratings. See the [Managing Folders and Files ReST API documentation.]({% link content-services/5.2/develop/rest-api-guide/folders-files.md %}).|
|CMIS ReST API|The preferred way to access nodes in Alfresco is via the Alfresco ReST API. However, if your requirements are to use an open standard, then have a look at [OASIS Content Management Interoperability Services (CMIS)](https://www.oasis-open.org/committees/cmis/). See the [CMIS API]({% link content-services/5.2/develop/reference/cmis-ref.md %}) section to get going with the CMIS ReST API. This information covers the ATOM binding where you work with XML. If you prefer to work with JSON, then have a look at the [Browser binding]({% link content-services/5.2/develop/api-reference.md %}#cmis-1.1) available in CMIS 1.1. If you are developing a remote client in Java and want to use CMIS, then have a look at the [OpenCMIS  Java Library](http://chemistry.apache.org/java/developing/index.html).|
|More Information|-   [Java API - Access and Transaction Management documentation]({% link content-services/5.2/develop/java-api-guide.md %}#repository-java-api).<br>-   [Custom Content Store platform extension point documentation]({% link content-services/5.2/develop/repo-ext-points/content-stores.md %}#content-stores)|

## People and Groups

People (i.e. users) and groups are fundamental to a content management system, as they add and share content, are used to control permissions, create sites and interact with them and perform day to day functions relating to content.

|Information|People & Groups|
|-----------|---------------|
|Java API|This API exposes the [PersonService]({% link content-services/5.2/develop/java-api-guide.md %}#personservice) as a way of managing users and groups. For more info see the [JavaDocs](http://dev.alfresco.com/resource/docs/java/org/alfresco/service/cmr/security/PersonService.html).|
|JavaScript API|Use the `people` root object to manage users and groups, for more info see the [People JavaScript API Documentation]({% link content-services/5.2/develop/api-reference.md %}#people-api)|
|Alfresco ReST API|[People and Groups ReST API User Guide]({% link content-services/5.2/develop/rest-api-guide/people-groups.md %})|
|CMIS ReST API|Not available|
|More Information|-   [Java API - Access and Transaction Management documentation]({% link content-services/5.2/develop/java-api-guide.md %}#repository-java-api).|

## Search

Solr provides indexing of metadata and the plain text of content. This can be queried using various query languages, including Lucene and CMIS Query Language.

|Information|Search|
|-----------|------|
|Java API|To search for nodes use the [SearchService]({% link content-services/5.2/develop/java-api-guide.md %}#searchservice), see also the [JavaDocs](http://dev.alfresco.com/resource/docs/java/org/alfresco/service/cmr/search/SearchService.html).|
|JavaScript API|Use the `search` root object, for more info see the [JavaScript API Documentation]({% link content-services/5.2/develop/api-reference.md %}#search-api)|
|Alfresco ReST API|The Alfresco ReST API provides a number of ways to search for content in the repository, both simple term based search and more complex search on types and aspects. You can search on files and folders, people, sites etc. See the [Search User Guide]({% link content-services/5.2/develop/rest-api-guide/searching.md %}#searching).|
|CMIS ReST API|The CMIS ReST API has extensive support for searching with the CMIS Query Language (QL). See the [CMIS API]({% link content-services/5.2/develop/reference/cmis-ref.md %}) section on how to get going with the CMIS ReST API. This section covers the ATOM binding where you work with XML. If you prefer to work with JSON, then have a look at the [Browser binding]({% link content-services/5.2/develop/api-reference.md %}#cmis-1.1) available in CMIS 1.1. Then look at the [CMIS QL]({% link content-services/5.2/develop/api-reference.md %}#cmis-query) Introduction.<br>If you are developing a remote client in Java and want to use CMIS for searching, then have a look at the [OpenCMIS](http://chemistry.apache.org/java/developing/index.html) Java Library.|
|More Information|-   [Search Syntax]({% link content-services/5.2/develop/alfresco-full-text-search-ref.md %}#search-query-syntax-apis). (CMIS, Java, JavaScript)<br>-   [Java API - Access and Transaction Management documentation]({% link content-services/5.2/develop/java-api-guide.md %}#repository-java-api).|

## Sites

Sites provide a way for users to collaborate around content. Content can be organized within sites, and access to sites controlled by the site managers.

|Information|Sites|
|-----------|-----|
|Java API|To manage sites use the [SiteService]({% link content-services/5.2/develop/java-api-guide.md %}#siteservice), see also the [JavaDocs](http://dev.alfresco.com/resource/docs/java/org/alfresco/service/cmr/site/SiteService.html).|
|JavaScript API|Use the `siteService` and `site` root objects, for more info see the [SiteService JavaScript API]({% link content-services/5.2/develop/api-reference.md %}#site-service)|
|Alfresco ReST API|The Alfresco ReST API can be used to create and manage sites. See the [Sites ReST API User Guide]({% link content-services/5.2/develop/rest-api-guide/sites.md %})|
|CMIS ReST API|Not Available|
|More Information|-   [Java API - Access and Transaction Management documentation]({% link content-services/5.2/develop/java-api-guide.md %}#repository-java-api).|

## Tags

Tags are simple text labels that are attached to a piece of content, such as a folder or a file. Each piece of content can have multiple tags. Folders also have a TagScope object which encapsulates information about the tags used on content in that folder. The TagScope object contains an array that lists Tags in count order. There are methods to find out how many times a particular tag is used.

|Information|Tags|
|-----------|----|
|Java API|To manage content tags use the [TaggingService]({% link content-services/5.2/develop/java-api-guide.md %}#taggingservice), see also the [JavaDocs](http://dev.alfresco.com/resource/docs/java/org/alfresco/service/cmr/tagging/TaggingService.html).|
|JavaScript API|Use the `taggingService` root object, for more info see the [Tagging JavaScript API Documentation]({% link content-services/5.2/develop/api-reference.md %}#tagging-service)|
|Alfresco REST API|The Alfresco ReST API supports managing tags, see the [Tags REST API User Guide]({% link content-services/5.2/develop/rest-api-guide/folders-files.md %}#manage-tags-for-a-folder-or-file).|
|CMIS ReST API|Not Available|
|More Information|None|

## Workflow

The Activiti workflow engine is built into Alfresco Content Services. It also provides UI in Alfresco Share to allow you to create standard workflows and manage them. In addition, as a developer, you can create custom workflows and manage them programmatically.

|Information|Workflow|
|-----------|--------|
|Public Java API|To start and manage workflow instances use the [WorkflowService]({% link content-services/5.2/develop/apis-by-function.md %}#workflowservice), and the [JavaDocs](http://dev.alfresco.com/resource/docs/java/org/alfresco/service/cmr/workflow/WorkflowService.html).|
|Repository JavaScript API|Use the `workflow` root object - see the [Workflow JavaScript API documentation]({% link content-services/5.2/develop/api-reference.md %}#workflow-service) for more information. See the example of [how to start a workflow with an attached file](#start-workflow).|
|Alfresco ReST API|The Alfresco ReST API provides APIs for dealing with process definitions, process instances, and tasks. To see the reference documentation for these APIs, and to try them out on the online ReST API explorer, go to [https://api-explorer.alfresco.com/api-explorer](https://api-explorer.alfresco.com/api-explorer). If you have the ReST API explorer running locally, then go to [http://localhost:8080/api-explorer](http://localhost:8080/api-explorer). Now, by default the ReST API Explorer will show the API Definitions for the Core API. You need to switch to the Workflow API definition in the *API definition* drop down box at the top of the page.|
|CMIS ReST API|Not Available|
|More Information|-   [Java API - Access and Transaction Management documentation]({% link content-services/5.2/develop/java-api-guide.md %}#repository-java-api).<br>-   [Workflow platform extension point documentation]({% link content-services/5.2/develop/repo-ext-points/index.md %}#workflow)<br>-   [Creating and managing workflows]({% link content-services/5.2/admin/workflows.md %})|

### Example: How to start a workflow with an attached file {#start-workflow}

```java
var aFile = search.findNode("<NodeRef>");
var workflowAction = workflow.getDefinitionByName('activiti$some-process-definition-name');
var package= workflow.createPackage();
package.addNode(aFile);
var parameters = new Array(2);
parameters["bpm:workflowDescription"] = "Testing Workflow ";
parameters["someCustomWorkflowVariable"]="someVal";
var futureDate = new Date();
futureDate.setDate(futureDate.getDate() + 7);
parameters["bpm:workflowDueDate"] = futureDate;
workflowAction.startWorkflow(package, parameters);
```
