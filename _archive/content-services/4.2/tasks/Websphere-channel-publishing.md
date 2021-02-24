---
author: Alfresco Documentation
---

# Enabling channels with Alfresco deployed on WebSphere

Enable a variety of channels, including Alfresco in the cloud, Google Docs, YouTube, SlideShare, Twitter and LinkedIn, with Alfresco deployed on WebSphere.

1.  Log into the WebSphere administrative console.

2.  Navigate to **Security \> SSL certificate and key management \> Configuration settings \> Manage endpoint security configurations**.

3.  Select the appropriate outbound configuration to get to your server.

    For example, **\(cell\):SwSt4-AS1-119Node01Cell:\(node\):SwSt4-AS1-119Node01 management scope**.

4.  Under **Related Items**, click **Key stores and certificates** and select the **AlfrescoTrustStore** key store.

5.  Under **Additional Properties**, click **Signer certificates and Retrieve From Port**.

6.  Click **Retrieve From Port**.

7.  In the **Host field**, enter the appropriate host address. See the table for suitable options.

    For example, if you are using Google Docs, the host address is google.com.

8.  In the **Port** field, enter 443.

9.  In the **Alias field**, enter the appropriate alias. See the table for suitable options.

    For example, if you are using Google Docs, the alias is google.com\_cert.

10. Click **Retrieve Signer Information**.

11. Verify that the certificate information is for a certificate that you can trust.

12. Click **Apply**.

13. Click **Save**.

14. Restart your application server.


|Channel|Host field entry|Alias field entry|
|-------|----------------|-----------------|
|Blogs|Example: alfresco.wordpress.com|Example: myExternalBlog|
|Google Docs|google.com|google.com\_cert|
|LinkedIn|api.linkedin.com|api.linkedin.com\_cert|
|SlideShare|www.slideshare.net|www.slideshare.net\_cert|
|Twitter|api.twitter.com|api.twitter.com\_cert|
|YouTube|google.com|google.com\_cert|

**Parent topic:**[Enabling channels with WebSphere](../concepts/Websphere-integration-overview.md)

