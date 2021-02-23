---
author: [Alfresco Documentation, Alfresco Documentation]
source: 
audience: 
category: [Authentication and Security, Security, Developer]
keyword: [Authority service, security]
---

# Authority service

This topic describes the features of authority service. It also describes how to configure it using the authority-services-context.xml property file.

The authority service is responsible for:

-   Creating and deleting authorities
-   Querying for authorities
-   Structuring authorities into hierarchies
-   Supporting queries for membership
-   Finding all the authorities that apply to the current authenticated user
-   Determining if the current authenticated user has admin rights
-   Managing zones and the assignment of authorities to zones

The default implementation allows a list of group names to define both administration groups and guest groups. Each authentication component defines its own default administrative user\(s\), which can also be set explicitly. The default service is defined in <configRoot\>/classes/alfresco/authority-services-context.xml.

-   **[Using guestGroups and adminGroups properties](../concepts/guestGroups.md)**  
The authority-services-context.xml, bean id `authorityService` provides the property configuration of the Authority Service implementation. This configuration also allows the designation of specific groups with `admin` or `guest` permissions in the system.

**Parent topic:**[Implementation and services](../concepts/secur-implserv.md)

