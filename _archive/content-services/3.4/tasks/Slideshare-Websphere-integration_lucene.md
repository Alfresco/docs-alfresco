---
author: Alfresco Documentation
---

# Enabling SlideShare with Alfresco \(Lucene enabled\) deployed on WebSphere

This section describes how to enable SlideShare for Alfresco deployed on WebSphere and using the Lucene search engine.

1.  Download the **Root 2 VeriSign Class 3 Public Primary CA** certificate from [Download Primary PCA Root Certificates](http://www.verisign.com/support/roots.html).

2.  Open the IBM WebSphere console and navigate to **Security \>SSL certificate and key management \> Key stores and certificates \> NodeDefaultTrustStore \> Signer certificates** .

3.  Click **Add**.

4.  Enter the alias name.

5.  Enter the path to your certificate and select DER option.

6.  Click **Apply**.

7.  Click **Save**.

8.  Restart the server.


**Parent topic:**[Installing Alfresco on WebSphere](../tasks/alf-websphere-install.md)

