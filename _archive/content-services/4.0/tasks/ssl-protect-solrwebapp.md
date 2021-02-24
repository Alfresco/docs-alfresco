---
author: [Alfresco Documentation, Alfresco Documentation]
source: 
audience: 
category: [Alfresco Server, Administration, Configuration]
keyword: [solr, search]
---

# Connecting to the SSL-protected Solr web application

All Solr URLs, which are bundled within Alfresco, are protected by SSL.

To use these URLs from a browser, you need to import a browser-compatible key store to allow mutual authentication and decryption to work. The following steps describe how to import the key store into your browser \(these relate to Firefox, other browsers will have a similar mechanism\):

1.  Open the FireFox **Certificate Manager** by selecting **Tools \> Options \> Advanced \> Encryption \> View Certificates \> Your Certificates**.

2.  Import the browser keystore `browser.p12` that is located in your WEB\_INF/classes/alfresco/keystore directory.

3.  Enter the password `alfresco`.

    A window displays showing that the key store has been imported successfully. The **Certificate Manager** now contains the imported key store with the Alfresco repository certificate under the **Your Certificates** tab.

4.  Close the **Certificate Manager** by clicking **OK**.

5.  In the browser, navigate to a Solr URL.

    For example, use the URL [http://localhost:8080/solr](http://localhost:8080/solr).

    The browser displays an error message window to indicate that the connection is untrusted. This is due to the Alfresco certificate not being tied to the server IP address. In this case, view the certificate and confirm that it is signed by the Alfresco Certificate Authority.

6.  Expand **I understand the risks**.

7.  Select **Add Exception**.

8.  Click **View**.

    This displays the certificate.

9.  Confirm that the certificate was issued by Alfresco Certificate Authority, and then confirm the **Security Exception**.


Access to Solr is then granted. The Solr Admin page is displayed with a list of cores:

-   **Admin alfresco** \(workspace core for live content\)
-   **Admin archive** \(workspace core for archive content\)

The **Solr Admin \(alfresco\)** page is displayed when you click on the **Admin alfresco** core. This page is useful for finding information about the Solr installation, such as deployed schemas, Solr configuration, indexed fields etc.

**Parent topic:**[Solr security](../concepts/solrsecurity-intro.md)

