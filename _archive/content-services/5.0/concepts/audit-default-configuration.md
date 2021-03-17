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

