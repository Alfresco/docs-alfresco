---
author: [Alfresco Documentation, Alfresco Documentation]
audience: 
category: Alfresco Share
option: [extending, Share, Document library]
---

# Security policies and filters

You can configure a number of policies and filters in Alfresco Share to mitigate security attacks.

**Important:** **Cross-Site Request Forgery \(CSRF\) and Alfresco**

The Open Web Application Security Project \(OWASP\) describes Cross-Site Request Forgery \(CSRF\) as a type of attack that occurs when a malicious web site, email, blog, instant message, or program causes a user's web browser to perform an unwanted action on a trusted site for which the user is currently authenticated \(see the [Cross-Site\_Request\_Forgery Prevention\_Cheat\_Sheet](https://www.owasp.org/index.php/Cross-Site_Request_Forgery_%28CSRF%29_Prevention_Cheat_Sheet)\).

The Share application must be accessible on the network to be available to users, and so it is protected with a CSRF filter.

If you want to protect those areas against CSRF attacks, then you will need to implement a solution similar to one of those listed on the [CSRF prevention cheat sheet](https://www.owasp.org/index.php/Cross-Site_Request_Forgery_%28CSRF%29_Prevention_Cheat_Sheet). Of particular interest is a solution based on Apache with `mod_csrf` because of efficiency and its loose coupling with the applications to protect.

When setting up a production Alfresco instance, you should ensure that `/alfresco` is protected behind a firewall.

-   **[Cross-Site Request Forgery \(CSRF\) filters in Alfresco Share](../concepts/csrf-policy.md)**  
You can configure `CSRFPolicy` in Alfresco Share to prevent CSRF attacks that allow malicious requests to be unknowingly loaded by a user.
-   **[Iframes and phishing attack mitigation in Alfresco Share](../concepts/iframe-policy.md)**  
You can configure `IFramePolicy` to protect users against a phishing attack, which attempts to acquire information such as user names or passwords by simulating a trustworthy entity.
-   **[Security filters and clickjacking mitigation in Alfresco Share](../concepts/security-policy.md)**  
You can configure a security filter, `SecurityHeadersPolicy`, that mitigates clickjacking attacks in Alfresco Share.

**Parent topic:**[Setting up authentication and security](../concepts/auth-intro.md)

