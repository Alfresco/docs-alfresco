---
author: Alfresco Documentation
---

# Enabling YouTube with Alfresco \(Lucene enabled\) deployed on WebSphere

In an Alfresco environment deployed on WebSphere and with the Lucene search engine enabled, to enable the publish to YouTube feature requires additional steps.

1.  Download the **Root 2 VeriSign Class 3 Public Primary CA** certificate from [Download Primary PCA Root Certificates](http://www.verisign.com/support/roots.html).

2.  Open the IBM WebSphere console in a browser and navigate to **Security \> SSL certificate and key management \> Key stores and certificates \> NodeDefaultTrustStore \> Signer certificates**.

3.  Click **Add**.

4.  Type the alias name.

5.  Enter the path to your certificate.

6.  Click **Apply**.

7.  Click **Save**.

8.  Restart the server.


**Parent topic:**[Enabling YouTube with WebSphere](../concepts/Youtube-Websphere-integration_overview.md)

