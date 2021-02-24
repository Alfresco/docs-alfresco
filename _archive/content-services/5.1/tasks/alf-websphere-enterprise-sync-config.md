---
author: [Alfresco Documentation, Alfresco Documentation]
audience: 
category: Documentation
---

# Configuring Enterprise to Cloud Sync for Alfresco on WebSphere

Use this information to configure Enterprise to Cloud Sync for Alfresco deployed on WebSphere.

-   Ensure that Alfresco is installed on WebSphere using the instructions described in [Installing Alfresco on WebSphere](alf-websphere-install.md).
-   Ensure that the Alfresco server is not running. Add the cloud-sync license to the correct location and then restart the Alfresco server. This location is usually C:\\Alfresco\\tomcat\\shared\\classes\\alfresco\\extension\\license.

1.  Log into the WebSphere Administration console.

2.  In the Administration Console, go to**Security – SSL certificate and key management – Configuration settings**, and then select **Manage endpoint security configurations**.

3.  Select the appropriate outbound configuration to get to your server.

    For example, \(cell\): **SwSt4-AS1-119Node01Cell:\(node\):SwSt4-AS1-119Node01 management scope**.

4.  Under **Related Items**, click **Key stores and certificates** **AlfrescoTrustStore**.

5.  Under **Additional Properties**, click **Signer certificates**, and then select **Retrieve From Port**.

6.  Enter your Enterprise Cloud Sync host name in the **host name** field.

    For example, `a.alfresco.me`.

7.  Enter your Enterprise Cloud Sync SSL port value in the **Port** field.

    For example, `443`.

8.  Enter your Enterprise Cloud Sync certificate name in the **Alias** field.

    For example, `a.alfresco.me_cert`.

9.  Click **Retrieve Signer Information**.

10. Verify that the certificate information is for a certificate that you can trust.

11. Click **Apply** and **Save**.

12. Synchronize the content again.


**Parent topic:**[Installing Alfresco on WebSphere](../tasks/alf-websphere-install.md)

