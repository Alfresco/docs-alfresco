---
author: [Alfresco Documentation, Alfresco Documentation]
source: 
audience: 
category: Administration
option: audit
---

# Enabling auditing of content

This section describes how to enable auditing of these events and sub events

1.  Open the alfresco-global.properties file.

2.  Add the following properties:

    ```
    # Enable audit in general
    audit.enabled=true
    
    # Enable the alfresco-access audit application
    audit.alfresco-access.enabled=true
    
    # Enable the auditing of sub-actions. Normally disabled as these values are
    # not normally needed by audit configurations, but may be useful to
    # developers
    #audit.alfresco-access.sub-actions.enabled=true
    ```


**Parent topic:**[Content auditing technical overview](../concepts/audit-content-techdesc.md)

