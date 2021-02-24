---
author: Alfresco Documentation
---

# Exporting your IdP certificate

Download a certificate from the IdP to set up SAML SSO in Alfresco.

You can skip this task if you have already downloaded the certificate in [step 7 of Configuring PingFederate manually](saml-pingfederate.md#cert).

1.  Log in to your IdP administrative console as the administrator.

    For PingFederate, the URL is in the format:

    ```
    https://<DNS_NAME>:9999/pingfederate/app
    ```

    where `<DNS_NAME>` is the fully qualified name of the machine running the PingFederate server.

2.  For PingFederate, in the Server Configuration section, select **Certificate Management** and Digital Signing & XML Decryption Keys & Certificates.

    1.  Click **Export** for the IdP certificate that you require.

    2.  Select **Certificate only** and click **Next**.

    3.  Click **Export**, and save the file to a folder for uploading to Alfresco in the next task. Click **Done**.


Next, configure Alfresco. See [Configuring SAML SSO settings for Share using the Admin Console](saml-config-console.md) for more information.

**Parent topic:**[Configuring PingFederate manually](../tasks/saml-pingfederate.md)

