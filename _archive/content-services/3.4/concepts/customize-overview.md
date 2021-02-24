---
author: [Alfresco Documentation, Alfresco Documentation]
source: Professional Alfresco Book
audience: 
category: [Customization, Alfresco repository]
keyword: [extend Alfresco, repository]
---

# Alfresco repository extension points

Building custom content-driven web applications involves modeling semantic content inside the repository and then wrapping business logic around the content to provide lifecycle, rendering, and, eventually, publication to a website.

Some common extension points include:

-   Content models
-   Content behavior
-   Process definitions
-   Workflow models
-   Actions

The Alfresco repository has many other additional extension points. You can define custom transformers that convert a document of a source file type to a destination file type. For example, you might plug in a transformer that converts an MPEG video file to an audio output stream. You could then push both of these files to a web server for delivery.

You can define custom metadata extractors responsible for interrogating the content and pulling out metadata fields. For example, you can write a metadata extractor that extracts values from a custom file format and places it onto Alfresco metadata properties. You can then search on these properties or fire off custom business logic.

You can also define custom template and scripting variables for extending the Alfresco repository using server-side JavaScript or FreeMarker.

-   **[Content models](../concepts/content-models.md)**  
A content model defines content types, aspects, and constraints in an XML file that declares a namespace and all its members. These members belong to the namespace and an associated prefix. For example, the prefix `cm` refers to the formal namespace www.alfresco.org/model/content/1.0.
-   **[Content behavior](../concepts/content-behavior.md)**  
The Alfresco repository lets you inject behavior into your content, such as enforcing certain policies or executing custom business logic through the use of aspects.
-   **[Process definitions](../concepts/process-def.md)**  
Alfresco provides the jBPM workflow engine out of the box, which empowers solution developers to model business processes around content. Workflow provides you with the ability to design lifecycle management around your content.
-   **[Workflow models](../concepts/workflow-models.md)**  
Workflow models let you wrap forms and property sheets around jBPM workflow processes, informing the repository how to map content contained within the in-flight processes to display elements for end users. This includes mapping end-user input into process variables as well as mapping process variables back into display elements.
-   **[Actions](../concepts/actions.md)**  
Actions are Spring beans that act upon a content node. You develop actions using Java and register them with the repository through a Spring configuration file. Actions provide the ideal place to put your common, highly reusable business logic. You can then call these actions from within the repository for any number of content objects.

**Parent topic:**[Developing against the Alfresco repository](../reuse/gge-hdg-alfrescodevelopment.md)

