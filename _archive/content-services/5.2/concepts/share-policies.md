---
author: [Alfresco Documentation, Alfresco Documentation]
audience: 
category: Alfresco Share
option: [extending, Share, Document library]
---

# Security policies and filters

You can configure a number of policies and filters in Alfresco Share to mitigate security attacks. You can also configure filters in Alfresco Repository to mitigate security attacks when the Alfresco Content Services ReST API is accessed externally.

**Important:** **Cross-Site Request Forgery \(CSRF\)**

The Open Web Application Security Project \(OWASP\) describes Cross-Site Request Forgery \(CSRF\) as a type of attack that occurs when a malicious web site, email, blog, instant message, or program causes a user's web browser to perform an unwanted action on a trusted site for which the user is currently authenticated \(see the [Cross-Site\_Request\_Forgery Prevention\_Cheat\_Sheet](https://www.owasp.org/index.php/Cross-Site_Request_Forgery_%28CSRF%29_Prevention_Cheat_Sheet)\).

The Share application must be accessible on the network to be available to users, and so it is protected with a CSRF filter. You should then also ensure that `/alfresco` is protected behind a firewall. If another user interface client is used \(i.e. not Share\), such as an ADF application that directly accesses the Alfresco Content Services ReST API, then `/alfresco` need to be proteced with a CSRF filter.

If you want to protect those areas against CSRF attacks, then you will need to implement a solution similar to one of those listed on the [CSRF prevention cheat sheet](https://www.owasp.org/index.php/Cross-Site_Request_Forgery_%28CSRF%29_Prevention_Cheat_Sheet). Of particular interest is a solution based on Apache with `mod_csrf` because of efficiency and its loose coupling with the applications to protect.

-   **[Alfresco Share Security policies and filters](../concepts/share-security-policies-filters.md)**  
You can configure a number of policies and filters in Alfresco Share to mitigate security attacks.
-   **[Alfresco Repository Security policies and filters](../concepts/repository-security-policies-filters.md)**  
You can configure filters in Alfresco Repository to mitigate security attacks when the Alfresco Content Services ReST API is accessed externally.

**Parent topic:**[Setting up authentication and security](../concepts/auth-intro.md)

