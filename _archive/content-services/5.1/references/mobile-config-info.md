---
author: Alfresco Documentation
---

# Selecting an Alfresco Mobile version

Use the Info object to ensure backwards compatibility and configuration versioning.

You need to add one of the two schema-versions to the info code block.

-   Alfresco Android 1.5 supports only schema-version 0.1
-   Alfresco Android 1.6 and later supports schema-version 0.1 and 0.2

If you're using Alfresco Android 1.6 or later it's recommended to use version 0.2, as 0.1 doesn't give full support.

```
"info": {
   "schema-version": 0.2
}
```

**Parent topic:**[Creating the configuration file](../concepts/mobile-config-overview.md)

