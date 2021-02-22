---
author: Alfresco Documentation
---

# Alfresco Share Security policies and filters

You can configure a number of policies and filters in Alfresco Share to mitigate security attacks.

The Share application must be accessible on the network to be available to users, and so it should be protected with a CSRF filter. You should then also ensure that `/alfresco` is protected behind a firewall. If another user interface client is used \(i.e. not Share\), such as an ADF application, then you need to also protect the Alfresco Repository with a CSRF filter.

-   **[Cross-Site Request Forgery \(CSRF\) filters for Share](../concepts/csrf-policy.md)**  
You can configure `CSRFPolicy` in Alfresco Share to prevent CSRF attacks that allow malicious requests to be unknowingly loaded by a user.
-   **[Iframes and phishing attack mitigation](../concepts/iframe-policy.md)**  
You can configure `IFramePolicy` to protect users against a phishing attack, which attempts to acquire information such as user names or passwords by simulating a trustworthy entity.
-   **[Security filters and clickjacking mitigation](../concepts/security-policy.md)**  
You can configure a security filter, `SecurityHeadersPolicy`, that mitigates clickjacking attacks in Alfresco Share.

**Parent topic:**[Security policies and filters](../concepts/share-policies.md)

