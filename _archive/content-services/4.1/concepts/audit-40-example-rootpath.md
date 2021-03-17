---
author: [Alfresco Documentation, Alfresco Documentation]
source: 
audience: 
category: Administration
option: audit
---

# **Example rootPath and auditMap**

The last component in the *rootPath* is considered by the *AuditFilter* to be the event **action**. The keys in an audit map identify each audit value. Global properties may be defined to accept or reject each value. If any value in an audit map is rejected, the whole map is rejected. So that one does not have to define too many properties, a *default* event action property may be defined. This will be inherited by all actions unless a property is defined for a particular event action.

```
rootPath:
    /alfresco-access/transaction

auditMap:
    "action"         => "MOVE"
    "node"           => "workspace://SpacesStore/90a398d1-8e0d-462a-8c3b-f0b17a2d1143"
    "move/from/node" => "workspace://SpacesStore/a82446e9-4dca-49d2-9ce0-4526687fb310"
    "move/from/path" => "/app:company_home/st:sites/cm:fred/cm:documentLibrary/cm:folder1"
    "move/from/type" => "cm:folder"
    "move/to/node"   => "workspace://SpacesStore/517bd4d0-99bc-47ad-8cd7-5d425f94c7db"
    "move/to/path"   => "/app:company_home/st:sites/cm:fred/cm:documentLibrary"
    "move/to/type"   => "cm:folder"
    "path"           => "/app:company_home/st:sites/cm:fred/cm:documentLibrary/cm:Word 123.docx"
    "sub-actions"    => "moveNode readContent"
    "type"           => "cm:content"
    "user"           => "admin"
```

**Parent topic:**[Audit filters](../concepts/audit-filters.md)

