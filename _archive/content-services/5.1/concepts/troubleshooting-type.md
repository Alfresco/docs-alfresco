---
author: [Alfresco Documentation, Alfresco Documentation]
source: 
audience: 
category: [Alfresco Server, Administration, Configuration]
keyword: [solr, search, lucene]
---

# Troubleshooting rules and actions

Use these troubleshooting tips when working with rules and actions.

**Type specialization action problems with Mac OS/X**

If you are using Mac OS/X 10.8.3 or later, the type specialization action is not performed when you save a Microsoft Word document.

To resolve this issue, edit your alfresco-global.properties file to set the following value:

```
policy.content.update.ignoreEmpty=false
```

**Parent topic:**[Troubleshooting](../concepts/ch-troubleshoot.md)

