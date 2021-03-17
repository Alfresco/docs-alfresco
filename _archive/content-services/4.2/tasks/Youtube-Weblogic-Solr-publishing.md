---
author: Alfresco Documentation
---

# Enabling publishing to YouTube with Alfresco \(Solr enabled\) deployed on WebLogic

In an Alfresco environment deployed on WebLogic and with the Solr search engine enabled, to enable the publish to YouTube feature requires additional steps.

This task requires you to add three certificates to the standard Java truststore:

-   Google certificate
-   ssl.repo.crt certificate
-   ssl.repo.client.crt certificate

1.  Download the Google certificate.

    1.  Download OpenSSL \(for Windows\) from [OpenSSL](http://www.openssl.org/related/binaries.html).

        **Note:** OpenSSL is pre-installed in the Linux and OS operating systems. To verify that you have OpenSSL installed, run the following command: `openssl version`.

    2.  Run the following command: `openssl s_client -connect docs.google.com:443 -showcerts`.

        The PEM-format certificate outputs are displayed.

    3.  From the output displayed, copy the certificate for the wildcard `*.google.com` domain to your clipboard including the `----BEGIN CERTIFICATE`---- and `----END CERTIFICATE----` parts.

        **Note:** Several certificates are displayed. The certificate you need to copy is the first one that is displayed and has the value `CN=*.google.com`.

    4.  Paste the PEM-format certificate text into a new file.

        For example, youtube.com.pem.

    5.  Convert the PEM-format certificate into DER format using OpenSSL.

        For example, `openssl x509 -in youtube.com.pem -out youtube.com.der -outform DER`.

2.  Generate the ssl.repo.crt and the ssl.repo.client.crt certificates using the following instructions [Generating Secure Keys for Solr Communication](generate-keys-solr.md).

3.  Ensure that all the certificates exist in the <JAVA\_HOME\>/jre/lib/security\> directory.

4.  Add the certificates to your standard Java truststore using the Keytool Java utility.

    ```
    keytool -importcert -noprompt -alias ssl.repo -file ssl.repo.crt -keystore cacerts -storepass changeit
    keytool -importcert -noprompt -alias ssl.repo -file ssl.repo.client.crt -keystore cacerts -storepass changeit
    keytool -importcert -noprompt -alias ssl.repo -file youtube.der -keystore cacerts -storepass changeit
    ```

    **Note:** The default password for the keystore is `changeit`. You do NOT need to change the default password.

5.  Follow the instructions in [Configuring Solr with Alfresco running on WebLogic](alf-weblogic-solr-config.md) to configure the WebLogic application server.

    **Note:**

    -   At Step 3\(d\) ensure that you choose the **Custom Identity and Java Standard Trust** keystore.
    -   At Step 3\(f\) ensure that you enter a valid Java Standard Trust Keystore Passphrase as the **Custom Identity Keystore Passphrase**.
6.  Restart the server.


**Parent topic:**[Installing Alfresco on WebLogic](../tasks/alf-weblogic-install.md)

