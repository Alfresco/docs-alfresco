---
author: [Alfresco Documentation, Alfresco Documentation]
source: Professional Alfresco Book
audience: 
category: [security, developer]
---

# Authorization-related zones

Zones are also used to record the primary source of person and group information. They can be held within Alfresco Content Services or some external source. While authorities can be in many zones, it makes sense for an authority to be in only one authentication-related zone.

-   AUTH.ALF is for authorities defined within Alfresco Content Services and not synchronized from an external source. This is the default zone for authentication.
-   AUTH.EXT.<ID\> is for authorities defined externally, such as in LDAP.

**Parent topic:**[Zones](../concepts/secur-zones.md)

