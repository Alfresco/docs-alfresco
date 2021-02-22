---
author: Alfresco Documentation
---

# Enabling Google Docs with Alfresco \(Lucene enabled\) deployed on WebSphere

This section describes how to enable Google Docs on Alfresco deployed within WebSphere and using the Lucene search engine.

1.  Download the **Root 1 - Equifax Secure Certificate Authority** certificate from [Geotrust](http://www.geotrust.com/resources/root-certificates/index.html).

2.  Download the **Root 2 VeriSign Class 3 Public Primary CA** certificate from [Download Primary PCA Root Certificates](http://www.verisign.com/support/roots.html).

3.  Export the **www.google.com certificate** certificate from [Google account authorization](https://www.google.com/accounts/AuthSubRequest).

    In Internet Explorer 8:

    1.  In **Internet Explorer**, select **Run as administrator**.

        This allows you to export a certificate.

    2.  Go to [Google account authorization](https://www.google.com/accounts/AuthSubRequest).

    3.  Click on the padlock icon \(to the right of the address bar\), and then **View certificates**.

    4.  On the **Details** tab, click **Copy to File**.

    5.  Select **DER encoded binary X.509 \(.cer\)** and specify a path.

4.  Open the IBM WebSphere console in a browser and navigate to **Security \> SSL certificate and key management \> Key stores and certificates \> NodeDefaultTrustStore \> Signer certificates**.

5.  Add the three certificates you downloaded in the first three steps.

6.  Restart the server.


**Parent topic:**[Installing Alfresco on WebSphere](../tasks/alf-websphere-install.md)

