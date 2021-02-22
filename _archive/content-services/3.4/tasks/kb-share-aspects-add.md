---
author: [Alfresco Documentation, Alfresco Documentation]
source: Professional Alfresco Book
audience: 
category: [Knowledge Base, Alfresco Share, API/Script]
keyword: knowledge base
---

# Setting aspects

The document library provides a user interface for setting aspects onto documents, providing a list of available aspects from which to pick. The list is generated within the document library services.

1.  To add the `kb:article` aspect to the list of aspects, configure the document library services responsible for handing back document library aspects.

    This is implemented as a single web script. It hands back a JSON string that lists all the aspect information for a given document as follows:

    ```
    {
       "current": ["cm:auditable", "sys:referenceable", "cm:titled",
                   "cm:author","app:inlineeditable"],
       "visible": ["cm:generalclassifiable","cm:complianceable","cm:dublincore",    
                   "cm:effectivity","cm:summarizable","cm:versionable",
                   "cm:templatable","cm:emailed","emailserver:aliasable",
                   "cm:taggable"],
       "addable": [],
       "removeable": []
    }
    ```

    The JSON lists four properties, each having an array of aspects.

    -   `current`: contains the array of all aspects currently applied to the document.
    -   `visible`: contains the array of all the aspects potentially available for the current document.
    -   `addable` and `removable`: contains the arrays of aspects that can be added to or removed from the current document.
    The document library uses this information within Alfresco Share to determine how to render a meaningful user interface to the end user. This comes back from a single repository-side web script that looks to the configuration file aspects.get.config.xml to determine which aspects should be visible to the end user.

2.  Make the `kb:article` aspect visible by adding it to the configuration file aspects.get.config.xml.

    This is implemented as a single web script. It hands back a JSON string that lists all the aspect information for a given document as follows:

    ```
    <aspects>
       <visible>
          ...
          <aspect name="{http://www.alfresco.org/model/knowledgebase/1.0}article" />
          ...
       </visible>
    </aspects>
    ```

    You could also specify whether the `kb:article` aspect can be added or removed by document library users.

    This simple configuration adjustment enables the document library to work with the Knowledge Base article aspect.


**Parent topic:**[Customizing Alfresco Share \(advanced\)](../concepts/kb-share-customize-adv.md)

