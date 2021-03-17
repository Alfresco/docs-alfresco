---
author: [Alfresco Documentation, Alfresco Documentation]
source: Professional Alfresco Book
audience: 
category: [Knowledge Base, API/Script]
option: knowledge base
---

# Adding files to the Tomcat ROOT web application

The customizations in this section have dependencies the browser must resolve. One option is to modify the share.war file, but a better option is to place them in an alternate web application; in this case, the ROOT web application under Tomcat.

This section describes how to set up the ROOT web application under Tomcat.

1.  Add the web.xml file to the following directory:

    *<installLocation\>*\\tomcat\\webapps\\ROOT\\WEB-INF

    **Note:**

    The web.xml file is required for the ROOT web application. If this file already exists in your Tomcat server, you can skip to the next step. If not, you may have to create the following directory structures yourself.

2.  Add document library dependencies by adding the following files to the following directory:

    *<installLocation\>*\\tomcat\\webapps\\ROOT\\share-extension\\components\\documentlibrary

    1.  This file defines a browser-side event handler for the archive action in Alfresco Share.

        knowledgebase-actions.js

        ```
        /**
         * DocumentList "Archive" action
         * 
         * @namespace Alfresco
         * @class Alfresco.DocumentList
         */
        (function()
        {
         /**
        * Backup single document.
        *
        * @method onActionBackup
        * @param file {object} Object literal representing one or more file(s) or folder(s) to be actioned
        */
         Alfresco.doclib.Actions.prototype.onActionArchive = function DL_onActionArchive(file)
         {
        this.modules.actions.genericAction(
        {
         success:
         {
        event:
        {
         name: "metadataRefresh"
        },
        message: this.msg("message.archive.success", file.displayName)
         },
         failure:
         {
        message: this.msg("message.archive.failure", file.displayName)
         },
         webscript:
         {
        name: "archive/site/{site}/{container}",
        method: Alfresco.util.Ajax.POST
         },
         params:
         {
        site: this.options.siteId,
        container: this.options.containerId
         },
         config:
         {
        requestContentType: Alfresco.util.Ajax.JSON,
        dataObj:
        {
         nodeRefs: [file.nodeRef]
        }
         }
        });
         };
        })();
        ```

    2.  This provides additional custom CSS used by the document library.

        knowledgebase-documentlist.css

        ```
        
        .doclist .onActionArchive a
        {
         background-image: url(images/kbarchive-16.png);
        }
        ```

3.  Add the Knowledge Base article image kbarchive-16.png to the following directory:

    *<installLocation\>*\\tomcat\\webapps\\ROOT\\share-extension\\components\\documentlibrary\\images


**Parent topic:**[Adding Alfresco Share customizations](../tasks/kb-code-share.md)

