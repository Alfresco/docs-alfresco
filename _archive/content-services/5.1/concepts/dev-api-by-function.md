---
author: Alfresco Documentation
---

# By Function

Provides API information based on what type of operation that should be executed.

This information groups the APIs based on what entity or function they operate on. For example, if you wanted to access a node, you would look under the Nodes section. If you are looking for a way to start workflows then you would go to the Workflow section.

References to code in different languages such as REST, Java, and JavaScript are also included.

-   **[Actions](../references/dev-api-func-actions.md)**  
Actions are units of work that can be carried out on a node. Usually they are fired by Rules, so that, for example, when a piece of content is added \(or removed\) from a specific folder, it is transformed, tagged, or processed in some way.
-   **[Files and Folders](../references/dev-api-func-files-folders.md)**  
Files \(Documents\) and Folders \(Containers\) are fundamental units within the Alfresco Repository. Developers often search for specific files and folders and process them. In addition Rules can be set on Folders that fire Actions when files are added or removed from a Folder.
-   **[Nodes](../references/dev-api-func-nodes.md)**  
The core data structure in the Alfresco Repository is called a node. Each piece of content in the Repository has a corresponding node data structure to reference the content and metadata. Each node has a corresponding `NodeRef` uniquely identifying it in the Repository.
-   **[People](../references/dev-api-func-people.md)**  
Users and groups are fundamental to a content management system, as they add and share content, are used to control permissions, create sites and interact with them and perform day to day functions relating to content.
-   **[Search](../references/dev-api-func-search.md)**  
Solr provides indexing of metadata and the plain text of content. This can be queried using various query languages, including Lucene and CMIS Query Language.
-   **[Sites](../references/dev-api-func-sites.md)**  
Share Sites provide a way for users to collaborate around content. Content can be organized within Sites, and access to sites controlled by the Site managers.
-   **[Tags](../references/dev-api-func-tags.md)**  
Tags are simple text labels that are attached to a piece of content, such as a folder, file, wiki page, discussion, event etc. Each piece of content can have multiple tags. Folders also have a TagScope object which encapsulates information about the tags used on content in that folder. The TagScope object contains an array that lists Tags in count order. There are methods to find out how many times a particular tag is used.
-   **[Workflow](../references/dev-api-func-workflow.md)**  
Alfresco has the Activiti workflow engine built in. It also provides UI in Share to allow you to create standard workflows and manage them. In addition, as a developer, you can create custom workflows and manage them programmatically.

**Parent topic:**[Using the APIs](../concepts/dev-api-functional-reference.md)

