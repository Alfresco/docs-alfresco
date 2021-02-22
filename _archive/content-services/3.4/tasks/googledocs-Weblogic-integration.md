---
author: Alfresco Documentation
---

# Enabling Google Docs with Alfresco \(Lucene enabled\) deployed on WebLogic

This section describes how to enable Google Docs for Alfresco, deployed within WebLogic and using the Lucene search engine.

To enable Google Docs on Alfresco running on WebLogic and using Lucene as the search engine, you need to add Google certificates manually using the keytool Java utility.

1.  Export the www.google.com certificate certificate from [Google account authorization](https://docs.google.com/feeds).

    In Internet Explorer 8:

    1.  In **Internet Explorer**, select **Run as administrator**.

        This allows you to export a certificate.

    2.  Go to [Google account authorization](https://www.google.com/accounts/AuthSubRequest).

    3.  Click the padlock icon \(to the right of the address bar\), and then click **View certificates**.

    4.  On the **Details** tab, click **Copy to File**.

    5.  Select **DER encoded binary X.509 \(.cer\)** and specify a path.

    In Firefox:

    1.  Go to [Google account authorization](https://docs.google.com/feeds).

    2.  Click the padlock icon on the address bar, and then click **More Information**. You can also click **Tools** \> **Page Info** \> **Security**.

    3.  In the **Website Identity** section, click **View Certificate**.

    4.  On the **Details** tab, click Export.

    5.  Select X.509 Certificate \(DER\) and select a local path and specify a file name .

2.  Use the keytool Java utility to import this certificate and add it to your truststore.

    ```
    keytool.exe -import -file www.google.com.cer -keystore ssl.truststore -storetype JCEKS -alias www.google.com
    ```

3.  Add the google.com.cer certificate to your truststore using the keytool utility.

    ```
    keytool.exe -import -file google.com.cer -keystore ssl.truststore -storetype JCEKS -alias google.com
    ```

4.  Restart the server.


**Parent topic:**[Installing Alfresco on WebLogic](../tasks/war-weblogic10-install.md)

