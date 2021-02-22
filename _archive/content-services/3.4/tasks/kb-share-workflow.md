---
author: [Alfresco Documentation, Alfresco Documentation]
source: Professional Alfresco Book
audience: 
category: [Knowledge Base, Alfresco Share, API/Script]
keyword: [knowledge base, workflow]
---

# Configuring workflows

Alfresco Share lets you configure the workflows that can launch from within the document library. The document library uses a web script to determine which workflows display to users for selection.

-   To configure a workflow for selection, modify the following web script file to include your desired workflow:

    /org/alfresco/modules/documentlibrary/workflow.get.html.ftl

    ```
    <div class="field">
       <select id="${el}-type" name="type" tabindex="0">
          <option value="wf:review" selected="selected">Review &amp; Approve</option>
          **<option value="wf:articleapproval"\>KB Article Review &amp; Approve</option\>**
          <option value="wf:adhoc">Adhoc Task</option>
       </select>
    </div>
    ```

    By adding the section shown in bold, the selector for the document library lets you choose the `wf:articleapproval` workflow. This ID matches the ID of the workflow declared in the kb-approval-process-definition.xml file that defines your workflow. Alfresco Share will then make the `wf:articleapproval` workflow available to users.


**Parent topic:**[Customizing Alfresco Share \(advanced\)](../concepts/kb-share-customize-adv.md)

