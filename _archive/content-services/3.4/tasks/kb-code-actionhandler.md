---
author: [Alfresco Documentation, Alfresco Documentation]
source: Professional Alfresco Book
audience: 
category: [Knowledge Base, API/Script]
keyword: knowledge base
---

# Adding an archive action handler

Introduce a custom web script that acts as an HTTP POST handler for your archive action.

1.  Define the POST action handler web script for the document library services as follows:

    Add the file archive.post.desc.xml to the following directory:

    <installLocation\>\\tomcat\\shared\\classes\\alfresco\\extension\\templates\\webscripts\\ org\\alfresco\\slingshot\\documentlibrary\\acti

    archive.post.desc.xml

    ```
    <webscript>
       <shortname>Archive</shortname>
       <description>
          Document List Action - Archive Knowledge Base articles
       </description>
       <url>/slingshot/doclib/action/archive/site/{site}/{container}</url>
       <format default="json">argument</format>
       <authentication>user</authentication>
       <transaction>required</transaction>
    </webscript>
    ```

2.  Define the scriptable controller for the POST action handler web script as follows:

    Add the file archive.post.json.js to the following directory:

    <installLocation\>\\tomcat\\shared\\classes\\alfresco\\extension\\templates\\webscripts\\ org\\alfresco\\slingshot\\documentlibrary\\acti

    archive.post.json.js

    ```
    <import resource="classpath:/alfresco/templates/webscripts/org/alfresco/slingshot \
                      /documentlibrary/action/action.lib.js">
    
    /**
     * Archive multiple files action
     * @method POST
     */
    
    /**
     * Entrypoint required by action.lib.js
     * 
     * @method runAction
     * @param p_params {object} Object literal containing files array
     * @return {object|null} object representation of action results
     */
    function runAction(p_params)
    {
       var results = [];
       var files = p_params.files;
       var file, fileNode, result, nodeRef;
    
       // Must have array of files
       if (!files || files.length == 0)
       {
          status.setCode(status.STATUS_BAD_REQUEST, "No files.");
          return;
       }
    
       for (file in files)
       {
          nodeRef = files[file];
          result =
          {
             nodeRef: nodeRef,
             action: "archiveFile",
             success: false
          }
    
          try
          {
             fileNode = search.findNode(nodeRef);
             if (fileNode === null)
             {
                result.id = file;
                result.nodeRef = nodeRef;
                result.success = false;
             }
             else
             {
                if (fileNode.properties["kb:status"] != "Current")
                {
                   // Only knowledge base articles with staus "Current" may be archived
                   status.setCode(status.STATUS_BAD_REQUEST, "No Current");
                   return;
                }
                else
                {
                   result.id = fileNode.name;
                   result.type = fileNode.isContainer ? "folder" : "document";
                   result.nodeRef = nodeRef;
                   
                   // set the kb:status property to "Archived"
                   fileNode.properties["kb:status"] = "Archived";
                   fileNode.save();
                   
                   result.success = (result.nodeRef !== null);
                }
             }
          }
          catch (e)
          {
             result.id = file;
             result.nodeRef = nodeRef;
             result.success = false;
          }
    
          results.push(result);
       }
    
       return results;
    }
    
    /* Bootstrap action script */
    main();
    ```

3.  Add the template view for the POST action handler web script as follows:

    Add the file archive.post.json.ftl to the following directory:

    <installLocation\>\\tomcat\\shared\\classes\\alfresco\\extension\\templates\\webscripts\\ org\\alfresco\\slingshot\\documentlibrary\\acti

    archive.post.json.ftl

    ```
    <#import "action.lib.ftl" as actionLib />
    <@actionLib.resultsJSON results=results />
    ```


**Parent topic:**[Customizing Document Library services](../tasks/kb-code-doclibrary.md)

