---
author: [Alfresco Documentation, Alfresco Documentation, Alfresco Documentation]
source: 
audience: 
category: [Authentication and Security, Authentication, Administration]
keyword: [configuration, Kerberos, Active Directory, authentication]
---

# Alfresco Day Zero Configuration Guide

By default, Alfresco configuration is optimized for single user evaluation of Alfresco. This configuration minimizes resource usage at the expense of scalability \(particularly scalability in the presence of large concurrent traffic volumes\). Therefore, for any other use of Alfresco \(including but not limited to QA, performance/scalability testing, production, production mirror, and disaster recovery\), Alfresco strongly recommends that additional configuration be performed.

The [Day Zero Configuration Guide](https://www.alfresco.com/cmis/browser?id=workspace%3A//SpacesStore/e0583ce9-d55c-450f-bc95-d587c2d01aeb) describes the generally valid configuration steps that should be taken to achieve this, regardless of the specific Alfresco use case. It describes the steps to take before Alfresco is started for the first time, together with optional configuration and tuning to reach optimal Alfresco performance.

This document does not describe the full breadth of Alfresco configuration options that can be leveraged to scale Alfresco in use case specific ways, but aggregates a general set of recommendations from the official documentation in a one-stop-shop document. For additional documentation, see the rest of the product documentation, access the Knowledge Base through the [Support Portal](http://support.alfresco.com), or the [Scalability Blueprint](http://www.alfresco.com/resources/whitepapers/alfresco-scalability-blueprint) document.

This is a live document generated out of Alfresco product documentation, so make sure that you check this page often for updates. Check the PDF publication date to make sure you are using the latest available version.

-   **[Day Zero architecture validation](../tasks/zeroday-architecture.md)**  
 This section describes the steps required to validate the architecture to ensure that it meets the prerequisites for an Alfresco installation.
-   **[Day Zero environment validation](../concepts/zeroday-environment-intro.md)**  
It is important to validate certain environment-specific items prior to installing Alfresco.
-   **[Day Zero configuration](../concepts/zeroday-config.md)**  
This section describes the configuration changes that will improve Alfresco reliability, stability and performance when used for anything other than single user evaluation purposes.

**Parent topic:**[Admin QuickStart](../concepts/at-a-glance-intro.md)

