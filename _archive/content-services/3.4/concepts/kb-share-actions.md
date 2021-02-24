---
author: [Alfresco Documentation, Alfresco Documentation]
source: Professional Alfresco Book
audience: 
category: [Knowledge Base, API/Script]
keyword: [knowledge base, actions]
---

# Defining actions in the document library

The document library user interface lets you run repository actions against your documents. When you click on an action, Alfresco Share fires into the appropriate action handler within the document library services. A web script within Alfresco Share generates the list of actions, letting you adjust the list of actions through configuration without coding.

-   To define a new action in the document library, modify the web script configuration file as follows:

```
<documentList>
   <actionSets>
      <actionSet id="empty"></actionSet>
      <actionSet id="document">
         ...
         **<action id="onActionArchive" type="action-link" permission="" 
                 label="actions.document.archive" /\>
**         ...
      </actionSet>

      <actionSet id="locked">...</actionSet>
      <actionSet id="lockOwner">...</actionSet>
      <actionSet id="workingCopyOwner">...</actionSet>
      <actionSet id="folder">...</actionSet>
      <actionSet id="link">...</actionSet>
   </actionSets>
</documentList>
```

This code shows configuration for a new action in bold type. It defines a new action with the ID `onActionArchive` that will be available when documents are selected in the document library. It lets you describe actions available for documents in various states. For example, you can define which actions are available for documents that are locked, or which actions are available for folders. The document library uses this information within Alfresco Share to determine how to render a meaningful user interface. This comes back from a single repository-side web script that looks to the configuration file aspects.get.config.xml to determine which aspects a user sees.

To handle this action within the browser, define a JavaScript function. Click the new action and Alfresco Share looks for a browser-side JavaScript method named `onActionArchive` to handle the click. You must supply a browser-side JavaScript file that defines this click handler.

The actions-common.get.head.ftl file defines what should appear in the `HEAD` of the HTML markup for the document list. You can modify this file to include your own `<script>` tag to pull in browser-side JavaScript. In this example, this file pulls in JavaScript from the knowledgebase-action.js file.

The knowledgebase-action.js file defines the function that handles the click using the Alfresco Share client-side API to call back to the Alfresco Share server with a proxy request. The proxy request asks Alfresco Share to call over to the Alfresco repository on behalf of the user. That is, Alfresco Share will call over to the Alfresco repository and access the document library services on your behalf.

You might choose to have your JavaScript function make a proxy request over to one of the out-of-the-box document library web scripts, or you may choose to write your own Alfresco repository web script as an action handler.

In the case of knowledgebase-action.js, the function asks Alfresco Share to invoke a custom action handler. You add the action handler to the document library services by defining a new web script in the repository, which responds to the POST method. It is written in the style of the Alfresco Share repository web scripts and uses a library that allows it to handle one document or multiple documents at once.

The web script considers the incoming document nodes. If they are valid, the script sets the `kb:status` property of the documents to the value of “Archived”, indicating an Archived lifecycle state in your Knowledge Base.

**Parent topic:**[Customizing Alfresco Share \(advanced\)](../concepts/kb-share-customize-adv.md)

