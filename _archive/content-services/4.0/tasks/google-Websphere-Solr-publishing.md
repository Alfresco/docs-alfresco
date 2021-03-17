---
author: Alfresco Documentation
---

# Enabling Google Docs with Alfresco \(Solr enabled\) deployed on WebSphere

This section describes how to enable Google Docs with Alfresco deployed on WebSphere and using the Solr search engine.

1.  Log into the WebSphere administrative console.

2.  Navigate to **Security \> SSL certificate and key management \> Configuration settings \> Manage endpoint security configurations**.

3.  Select the appropriate outbound configuration to get to your server.

    For example **\(cell\):SwSt4-AS1-119Node01Cell:\(node\):SwSt4-AS1-119Node01 management scope**.

4.  Under**Related Items**, click **Key stores and certificates**and select the **AlfrescoTrustStore** key store.

5.  Under **Additional Properties**, click **Signer certificates and Retrieve From Port**.

6.  Click the **Retrieve From Port** button.

7.  In the **Host field**, enter docs.google.com.

8.  In the **Port** field, enter 443.

9.  In the **Alias field**, enter docs.google.com\_cert.

10. Click**Retrieve Signer Information**.

11. Verify that the certificate information is for a certificate that you can trust.

12. Click **Apply**.

13. Click **Save**.

14. Restart your application server.


**Parent topic:**[Enabling Google Docs with WebSphere](../concepts/googledocs-Websphere-integration_overview.md)

