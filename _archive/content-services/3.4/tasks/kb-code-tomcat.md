---
author: [Alfresco Documentation, Alfresco Documentation]
source: Professional Alfresco Book
audience: 
category: [Knowledge Base, API/Script]
keyword: knowledge base
---

# Adding files to the Tomcat ROOT web application

The custom dashlet and custom page components have browser-side dependencies the browser must resolve. You can modify the share.war file, but a better option is to put them in an alternate web application; in this case, the ROOT web application under Tomcat.

**Note:** The files in this section are used by the custom dashlet and custom page implementations provided in these samples. They are NOT part of the core Alfresco Share web application. Rather than modify the Alfresco Share web application itself, they are copied into a separate ROOT web application in Tomcat.

1.  Add the file web.xml to the directory:

    *<installLocation\>*\\tomcat\\webapps\\ROOT\\WEB-INF

    The web.xml file is required for the ROOT web application. If this file already exists in your Tomcat server, skip to the next step. If not, you may have to create the following directory structures.

2.  Add the custom dashlet dependencies; in this case, it has a single CSS file dependency.

    -   Add the file knowledgebase.css to the directory:

        *<installLocation\>*\\tomcat\\webapps\\ROOT\\share-extension\\components\\dashlets

    knowledgebase.css

    ```
    .knowledgebase.dashlet .body .msg
    {
       padding: 0.5em;
    }
    
    .knowledgebase.dashlet .body table td
    {
       padding: 0.15em 0.5em 0.15em 0.25em;
    }
    ```

3.  Add the custom page component dependencies as follows:

    Add the following files to the directory:

    *<installLocation\>*\\tomcat\\webapps\\ROOT\\share-extension\\components\\knowledgebase

    1.  knowledgebase.css

        This provides the CSS for the Knowledge Base custom page.

        ```
        .knowledgebase 
        {
           padding: 1em;
        }
        
        .knowledgebase .title
        {
           line-height: 2.5em;
           color: #008000;
           font-size: 108%;
        }
        
        .knowledgebase table
        {
           margin-bottom: 2em;
           width: 70em;
           border: 1px solid #C0C0C0;
        }
        
        .knowledgebase caption
        {
           padding: 0.5em;
           font-size: 1.23%;
        }
        
        .knowledgebase tbody
        {
           border-top: 1px solid #C0C0C0;
        }
        
        .knowledgebase th,
        .knowledgebase td
        {
           padding: 0.25em;
        }
        
        .knowledgebase table th.kbid
        {
           width: 10%;
        }   
        
        .knowledgebase table .name
        {
           width: 30%;
        }   
        
        .knowledgebase table .modified-by
        {
           width: 20%;
        }   
        
        .knowledgebase table .modified-date
        {
           width: 20%;
        }   
        
        .knowledgebase table .actions
        {
           width: 15%;
           text-align: center;
        }   
        
        .knowledgebase table .actions .yui-button button 
        {
           line-height: 1;
           min-height: 1em;
           padding: 0 3px;
        }
        ```

    2.  knowledgebase.js

        This provides browser-side JavaScript for the Knowledge Base custom page.

        ```
        /**
         * Alfresco Knowledge Base namespace.
         * 
         * @namespace Alfresco
         * @class Alfresco.kb
         */
        Alfresco.kb = Alfresco.kb || {};
        
        /**
         * Knowledge Base component.
         * 
         * Lists all knowledge base articles and gives the possibility to archive the
         * current ones.
         * 
         * @namespace Alfresco
         * @class Alfresco.kb.KnowledgeBase
         */
        (function()
        {
           /**
            * YUI Library aliases
            */
           var Dom = YAHOO.util.Dom,
               Event = YAHOO.util.Event;
        
           /**
            * Dashboard KnowledgeBase constructor.
            *
            * @param {String} htmlId The HTML id of the parent element
            * @return {Alfresco.KnowledgeBase} The new component instance
            * @constructor
            */
           Alfresco.kb.KnowledgeBase = function KB_constructor(htmlId)
           {
              Alfresco.kb.KnowledgeBase.superclass.constructor.call(this, 
                 "Alfresco.kb.KnowledgeBase", htmlId, ["button"]);
              return this;
           };
        
           YAHOO.extend(Alfresco.kb.KnowledgeBase, Alfresco.component.Base,
           {
              /**
               * Object container for initialization options
               *
               * @property options
               * @type object
               */
              options:
              {
                 /**
                  * Current siteId.
                  * 
                  * @property siteId
                  * @type string
                  */
                 siteId: "",
        
                 /**
                  * ContainerId representing root container
                  *
                  * @property containerId
                  * @type string
                  * @default "documentLibrary"
                  */
                 containerId: "documentLibrary"
              },
                    
              /**
               * Fired by YUI when parent element is available for scripting
               *
               * @method onReady
               */
              onReady: function KB_onReady()
              {         
                 var el = Dom.get(this.id)
                 var archiveButtons = Dom.getElementsByClassName("archive", "button", el);          
                 for (var i = 0, l = archiveButtons.length; i < l; i++)
                 {
                    Alfresco.util.createYUIButton(this, null, this.onArchiveButtonClick, 
                       {}, archiveButtons[i]);    
                 } 
              },
              
              /**
               * Fired when the user clicks the Cancel button.
               * Takes the user back to the details edit page without saving anything.
               *
               * @method onArchiveButtonClick
               * @param p_oEvent {object} a "click" event
               */
              onArchiveButtonClick: function KB_onArchiveButtonClick(p_oEvent, p_oButton)
              {
                 // Disable buttons to avoid double submits 
                 var buttonSpanEl = p_oButton.get("element");
                 p_oButton.set("disabled", true);
                 
                 // Prepare archive webscript url
                 var url = YAHOO.lang.substitute(Alfresco.constants.PROXY_URI_RELATIVE + 
                    "/slingshot/doclib/action/archive/site/{siteId}/{containerId}",
                 {
                    siteId: this.options.siteId,
                    containerId: this.options.containerId
                 });
                 
                 // Request article to be archived
                 Alfresco.util.Ajax.jsonPost(
                 {
                    url: url,
                    dataObj:
                    {
                       nodeRefs: [ p_oButton.get("value") ]
                    },
                    successCallback:
                    {
                       fn: function(response)
                       {                  
                          // Remove button from row and move row to archive table
                          var trEl = buttonSpanEl.parentNode.parentNode;
                          buttonSpanEl.parentNode.removeChild(buttonSpanEl);
                          Dom.get(this.id + "-archived-tbody").appendChild(trEl);
                       },
                       scope: this
                    },
                    failureMessage: this.msg("message.archiveError")
                 });
              }      
           });
        })();
        ```


**Parent topic:**[Customizing Alfresco Share \(basic\)](../concepts/kb-share-customize-about.md)

