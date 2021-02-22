---
author: Alfresco Documentation
---

# Alfresco Repository Security policies and filters

You can configure filters in Alfresco Repository to mitigate security attacks when the Alfresco Content Services ReST API is accessed externally.

The Alfresco Content Services ReST API must be accessible on the network when the user inteface is implemented with the Alfresco Application Development Framework \(ADF\). The `/alfresco` URL path then need to be protected with a CSRF filter.

-   **[Cross-Site Request Forgery \(CSRF\) filters for Repository](../concepts/repository-csrf-policy.md)**  
You can configure the repository in Alfresco Content Services with a filter to prevent CSRF attacks that allow malicious requests to be unknowingly loaded by a user.
-   **[Cross-Origin Resource Sharing \(CORS\) filters](../tasks/enable-cors.md)**  
Use this information to enable Cross-Origin Resource Sharing \(CORS\) in Alfresco Content Services, so that the repository accepts incoming requests from applications that are running on a different webserver.

**Parent topic:**[Security policies and filters](../concepts/share-policies.md)

