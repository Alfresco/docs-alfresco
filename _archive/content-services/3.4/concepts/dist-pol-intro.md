---
author: [Alfresco Documentation, Alfresco Documentation]
audience: 
category: 
---

# Installing and verifying the Distribution Policies Module

The Alfresco Distribution Policies is an add-on module that enables Alfresco Enterprise content owners to restrict the distribution of their content via Alfresco Mobile.

With this module installed Alfresco Enterprise users can set up restrictions on specified content so that when the content is accessed in Alfresco Mobile some common operations are prevented, such as "Open In…" \(sending to third-party apps\), E-mail and Print.

**Note:** The Alfresco Distribution Policies module can be applied to Alfresco Enterprise 3.4.14 or subsequent service packs, and is supported on Alfresco Mobile iOS App v1.5 or later.

The module consists of a Repository AMP and Share JAR. The Repository extension defines a new aspect *dp:restrictable*, containing a single optional property *dp:offlineExpiresAfter*.

Any content the aspect is applied to will have a restricted set of actions when viewed on Alfresco Mobile, that prevents users sending that content outside of Alfresco Mobile.

If the *dp:offlineExpiresAfter property* is set, this defines the maximum amount of time for which the content is available in Alfresco Mobile since the user last authenticated with the Repository.

**Tip:** It's recommended you use full hours when setting offline expiry as in Alfresco Mobile part-hours are rounded up to the nearest hour.

-   **[Installing the Alfresco Distribution Policies Module](../tasks/dpm-install.md)**  
These steps describe how to install the Alfresco Distribution Policies Module to an instance of Alfresco.
-   **[Verifying the Alfresco Distribution Policies Modules](../tasks/dpm-verify.md)**  
Use the following steps to verify that the Alfresco Distribution Policies Module has been installed correctly.

**Parent topic:**[Installing](../concepts/master-ch-install.md)

