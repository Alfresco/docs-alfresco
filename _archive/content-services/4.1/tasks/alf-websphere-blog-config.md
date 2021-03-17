---
author: [Alfresco Documentation, Alfresco Documentation]
audience: 
category: Documentation
---

# Configuring blogs with WebSphere

You can enable blogs with Alfresco deployed on WebSphere 7.0.

-   Ensure that Alfresco is installed on WebSphere using the instructions described in [Installing Alfresco on WebSphere](alf-websphere-install.md).
-   Ensure that the Alfresco server is not running.

1.  Log into the WebSphere Administration console.

2.  In the Administration Console, go to**Security – SSL certificate and key management – Configuration settings**, and then select **Manage endpoint security configurations**.

3.  Select the appropriate outbound configuration to get to your server.

    For example, \(cell\): **SwSt4-AS1-119Node01Cell:\(node\):SwSt4-AS1-119Node01 management scope**.

4.  Under **Related Items**, click **Key stores and certificates** **AlfrescoTrustStore**.

5.  Under the **Additional Properties** section, click **Signer certificates**, and then select **Retrieve From Port**.

6.  Enter the name of the external blog that you want to synchronize with Alfresco in the **host name** field.

    For example, `alfresco.wordpress.com`.

7.  Enter your blog port value in the **Port** field.

    For example, `443`.

8.  Enter your blog alias name in the **Alias** field.

    For example, `myExternalBlog`.

9.  Click **Retrieve Signer Information**.

10. Verify that the certificate information is for a certificate that you can trust.

11. Click **Apply** and **Save**.

12. Synchronize the content.


**Parent topic:**[Installing Alfresco on WebSphere](../tasks/alf-websphere-install.md)

