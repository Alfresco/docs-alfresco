---
author: [Alfresco Documentation, Alfresco Documentation]
source: 
audience: 
category: [Alfresco Server, Administration, Configuration]
keyword: [solr, search, lucene]
---

# Using `guestGroups` and `adminGroups` properties

The authority-services-context.xml, bean id `authorityService` provides the property configuration of the Authority Service implementation. This configuration also allows the designation of specific groups with `admin` or `guest` permissions in the system.

By listing a group under the `guestGroups` property \(case insensitive\), the users in that group will only be allowed `guest` permission. Likewise, by listing a group under the `adminGroups` property \(case insensitive\), the users in that group will be provided `admin` permission.

For example, assume that you are synchronizing users into Alfresco and you specifically want to specify some groups as only guest users in the system. You would override the authority-services-context.xml file adding those groups to the `guestGroups` list \(case insensitive\). As a result, users in those groups will have authenticated logins but limited to guest authorization. For details, see [Configuring `guestGroups` and `adminGroups` properties](../tasks/config-guestGroups.md).

-   **[Configuring guestGroups and adminGroups properties](../tasks/config-guestGroups.md)**  
This topic describes how to configure the `guestGroups` and `adminGroups` properties.

**Parent topic:**[Authority service](../concepts/implserv-authority.md)

