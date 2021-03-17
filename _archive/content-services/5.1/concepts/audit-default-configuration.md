---
author: Alfresco Documentation
---

# Default auditing global properties

When Alfresco is installed it has a set of default auditing properties you should be aware of.

The following default global properties \(set in repository.properties of the source code\) is:

```

# Audit configuration                                                                                                                                                                       
audit.enabled=true
audit.tagging.enabled=true
audit.alfresco-access.enabled=false
audit.alfresco-access.sub-actions.enabled=false
audit.cmischangelog.enabled=false
audit.dod5015.enabled=false

# Setting this flag to true will force startup failure when invalid audit configurations are detected                                                                                       
audit.config.strict=false

# Audit map filter for AccessAuditor - restricts recorded events to user driven events                                                                                                      
audit.filter.alfresco-access.default.enabled=false
audit.filter.alfresco-access.transaction.user=~System;~null;.*
audit.filter.alfresco-access.transaction.type=cm:folder;cm:content;st:site
audit.filter.alfresco-access.transaction.path=~/sys:archivedItem;~/ver:;.*
      
    
```

These defaults can be overriden in alfresco-global.properties, or using the APIs as required.

The default [audit filter](audit-filters.md) discards events where the user is `null` or `System`, the content or folder path is under `/sys:archivedItem` or under `/ver:`. The filter also rejects node types other than `cm:folder`, `cm:content` or `st:site`.

In addition, there are some more global properties \(set in repository.properties\) that can be overridden in alfresco-global.properties:

```

      
# DEPRECATED: Use 'system.auditableData.preserve'                                                                                                                                                         
system.preserve.modificationData=false
# The default to preserve all cm:auditable data on a node when the process is not directly driven by a user action                                                                                        
system.auditableData.preserve=${system.preserve.modificationData}
# Specific control of how the FileFolderService treats cm:auditable data when performing moves                                                                                                            
system.auditableData.FileFolderService=${system.auditableData.preserve}
# Specific control of whether ACL changes on a node trigger the cm:auditable aspect                                                                                                                       
system.auditableData.ACLs=${system.auditableData.preserve}      
      
    
```

These properties were introduced in Alfresco 4.2.4.

**Parent topic:**[Auditing Alfresco](../concepts/audit-intro.md)

