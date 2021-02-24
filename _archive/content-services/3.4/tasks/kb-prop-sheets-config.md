---
author: [Alfresco Documentation, Alfresco Documentation]
source: Professional Alfresco Book
audience: 
category: [Knowledge Base, Developer]
option: knowledge base
---

# Property sheets

Alfresco Explorer automatically renders content metadata for viewing and editing. It generates a property sheet for content in applications, such as a Knowledge Base, that you can tweak by informing Alfresco Explorer of properties that exist on the `kb:status` and `kb:article` aspects.

The following code provides this configuration for Alfresco Explorer. It defines how to render property sheets for matching aspect and content-type names. Each property sheet can have zero or more fields that render controls for displaying and editing individual properties of the content model.

```
<config evaluator="aspect-name" condition="kb:article">
   <property-sheet>
      <separator name="sep" display-label="KB Article Properties"
                 component-generator="HeaderSeparatorGenerator"
                 show-in-edit-mode="false"/>
      <show-property name="kb:kbid"  show-in-edit-mode="true"/>
      <show-property name="kb:article_type"  show-in-edit-mode="true"/>
      <show-property name="kb:status" display-label="kb:status" 
                     show-in-edit-mode="true"/>
   </property-sheet>
</config>
<config evaluator="aspect-name" condition="kb:status">
   <property-sheet>
      <show-property name="kb:status" display-label="kb:status"/>
   </property-sheet>
</config>
```

Your Knowledge Base properties will now be available to end users for viewing and editing in Alfresco Explorer.

**Parent topic:**[Configuring Alfresco Explorer extensions](../concepts/kb-explorer-ext.md)

