---
author: [Alfresco Documentation, Alfresco Documentation]
source: Professional Alfresco Book
audience: 
category: [Knowledge Base, Customization]
keyword: [knowledge base, developing]
---

# Customizing Alfresco Share \(advanced\)

This section guides you through the process of adding advanced customizations to Alfresco Share and the Alfresco repository. These customizations include the addition of archiving logic based on the Alfresco repository rules, and customizing the Alfresco Share interface by introducing new actions and workflows to the document library, and introducing custom forms.

This section builds on the foundation work in:

-   [Getting started](kb-about.md#)
-   [Customizing Alfresco Share \(basic\)](kb-share-customize-about.md#)

-   **[Setting aspects](../tasks/kb-share-aspects-add.md)**  
The document library provides a user interface for setting aspects onto documents, providing a list of available aspects from which to pick. The list is generated within the document library services.
-   **[Defining actions in the document library](../concepts/kb-share-actions.md)**  
The document library user interface lets you run repository actions against your documents. When you click on an action, Alfresco Share fires into the appropriate action handler within the document library services. A web script within Alfresco Share generates the list of actions, letting you adjust the list of actions through configuration without coding.
-   **[Configuring workflows](../tasks/kb-share-workflow.md)**  
Alfresco Share lets you configure the workflows that can launch from within the document library. The document library uses a web script to determine which workflows display to users for selection.
-   **[Configuring forms in Alfresco Share](../concepts/kb-share-forms.md)**  
The Alfresco Forms engine lets you define and customize interactive forms to create, display, and edit content objects using XML configuration.
-   **[Creating articles using JavaScript](../tasks/kb-content-javascript.md)**  
Once you have defined a content model, you can create articles within the Alfresco content repository that adhere to your model. This example uses the Alfresco JavaScript API to create knowledge articles, and assumes you have created a content model.
-   **[Stopping the Alfresco server](../tasks/alfresco-stop.md)**  
This section describes how to stop the Alfresco server.
-   **[Customizing Document Library services](../tasks/kb-code-doclibrary.md)**  
The following tasks involve customizations to the Document Library services in the Alfresco repository.
-   **[Adding Alfresco Share customizations](../tasks/kb-code-share.md)**  
The tasks in this section involve customizations to Alfresco Share.
-   **[Starting the Alfresco server](../tasks/alfresco-start.md)**  
The server must be running before you can use Alfresco Share or Alfresco Explorer. When you install Alfresco using the setup wizard, the server is automatically installed and started as a service.
-   **[Setting up a Knowledge Base](../tasks/kb-setup.md)**  
A custom Knowledge Base site preset was created for Alfresco Share and used to build a new site. This site was called “My Second Project” and given the short name “second”. This example describes how to add a Knowledge Base space to this site’s document library in Alfresco Explorer.
-   **[Adding and editing content](../tasks/kb-content-add.md)**  
Once your Knowledge Base is inside the document library, you can add content to the library and edit the content metadata using Alfresco Share.
-   **[Approving content](../tasks/kb-content-approve.md)**  
This example submits the Knowledge Base article for approval by assigning it a workflow and then approving the article.
-   **[Archiving content in the Knowledge Base](../tasks/kb-content-archive.md)**  
You configured Alfresco Share to provide an Archive action for documents. You can now trigger this action and archive your document.

**Parent topic:**[Building a custom Knowledge Base application](../concepts/kb-getting-started-overview.md)

