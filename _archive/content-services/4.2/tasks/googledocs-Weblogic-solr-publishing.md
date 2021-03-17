---
author: Alfresco Documentation
---

# Enabling Google Docs with Alfresco \(Solr enabled\) deployed on WebLogic

To enable Google Docs for Alfresco running on WebLogic and using Solr as the search engine, you need to add the Google certificate manually using the Keytool Java utility.

1.  To download the certificate:

    1.  Download OpenSSL \(for Windows\) from [OpenSSL](http://www.openssl.org/related/binaries.html).

        **Note:** OpenSSL is pre-installed in the Linux and OS operating systems. To verify that you have OpenSSL installed, run the following command: `openssl version`.

    2.  Run the following command: `openssl s_client -connect docs.google.com:443 -showcerts`.

        The PEM-format certificate outputs are displayed.

    3.  From the output displayed, copy the certificate for the wildcard \*.google.com domain to your clipboard including the `----BEGIN CERTIFICATE----` and `----END CERTIFICATE----` parts.

        **Note:** Several certificates are displayed. The certificate you need to copy is the first one that is displayed and has the value `CN=*.google.com`.

    4.  Paste the PEM-format certificate text into a new file.

        For example, google.com.pem.

    5.  Convert the PEM-format certificate into DER format using OpenSSL.

        For example, `openssl x509 -in google.com.pem -out google.com.der -outform DER`.

2.  Add the google.com.der certificate to your truststore using the Keytool Java utility.

    ```
    keytool -import -file google.com.der -keystore ssl.truststore -storetype JCEKS -alias google.com
    ```

3.  Restart the server.


**Parent topic:**[Enabling Google Docs with WebLogic](../concepts/Slideshare-Weblogic-integration_overview.md)

