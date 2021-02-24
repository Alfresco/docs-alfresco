---
author: [Alfresco Documentation, Alfresco Documentation]
source: Professional Alfresco Book
audience: 
category: [Knowledge Base, API/Script]
keyword: knowledge base
---

# Setting up the `kb:article` aspect

This tells the document library to make your custom `kb:article` aspect visible.

1.  Define the availability of aspects within the document library as follows:

    Add the file aspects.get.config.xml to the following directory:

    <installLocation\>\\tomcat\\shared\\classes\\alfresco\\extension\\templates\\webscripts\\ org\\alfresco\\slingshot\\documentlibrary

    aspects.get.config.xml

    ```
    <aspects>
     <visible>
      <aspect name="{http://www.alfresco.org/model/content/1.0}generalclassifiable" />
      <aspect name="{http://www.alfresco.org/model/content/1.0}complianceable" />
      <aspect name="{http://www.alfresco.org/model/content/1.0}dublincore" />
      <aspect name="{http://www.alfresco.org/model/content/1.0}effectivity" />
      <aspect name="{http://www.alfresco.org/model/content/1.0}summarizable" />
      <aspect name="{http://www.alfresco.org/model/content/1.0}versionable" />
      <aspect name="{http://www.alfresco.org/model/content/1.0}templatable" />
      <aspect name="{http://www.alfresco.org/model/content/1.0}emailed" />
      <aspect name="{http://www.alfresco.org/model/emailserver/1.0}aliasable" />
      <aspect name="{http://www.alfresco.org/model/content/1.0}taggable" />
      <aspect name="{http://www.alfresco.org/model/knowledgebase/1.0}article" />
     </visible>
    
     <!-- Aspects that a user can add. Same as "visible" if left empty -->
     <addable>
     </addable>
    
     <!-- Aspects that a user can remove. Same as "visible" if left empty -->
     <removeable>
     </removeable>
    </aspects>
    ```


**Parent topic:**[Customizing Document Library services](../tasks/kb-code-doclibrary.md)

