---
title: Solr Admin web interface
---
The Solr Admin Web interface allows you to view Solr configuration details, run queries, and analyze document fields.

All Solr URLs, which are bundled within Alfresco Content Services, are protected by SSL. To use these URLs from a browser, you need to import a browser-compatible keystore to allow mutual authentication and decryption to work. The following steps describe how to import the keystore into your browser (these relate to Firefox, other browsers will have a similar mechanism):

1. Open the FireFox **Certificate Manager** by selecting **Firefox \> Preferences... \> Advanced \> Certificates \> View Certificates \> Your Certificates**.

2. Import the browser keystore `browser.p12` that is located in your <ALFRESCO\_HOME\>/alf\_data/keystore directory.

3. Enter the password `alfresco`.

    A window displays showing that the keystore has been imported successfully. The **Certificate Manager** now contains the imported keystore with the repository certificate under the **Your Certificates** tab.

4. Close the **Certificate Manager** by clicking **OK**.

5. In the browser, navigate to a Solr URL, [https://localhost:8983/solr](https://localhost:8983/solr).

    The browser displays an error message window to indicate that the connection is untrusted. This is due to the certificate not being tied to the server IP address. In this case, view the certificate and confirm that it is signed by the Alfresco Certificate Authority.

6. Expand **I understand the risks**.

7. Select **Add Exception**.

8. Click **View**.

    This displays the certificate.

9. Confirm that the certificate was issued by Alfresco Certificate Authority, and then confirm the **Security Exception**.

Access to Solr is granted and the Solr Admin screen is displayed.

The Solr web interface makes it easy for administrators to view the Solr configuration details, run queries, and analyse document fields in order to calibrate a Solr configuration.

The main Solr Admin dashboard is divided into two parts.

Click on the left or the center of the Solr Admin UI below to learn more about it.

![](../images/Solr-admin.png)

* **[Solr Admin UI - left panel](../concepts/solradmin-left.md)**  
The left-side of the Solr Admin screen is a menu under the Solr logo that provides the navigation through the screens of the UI. The first set of links are for system-level information and configuration, and provide access to Logging, Core Admin and Java Properties, among other things.
* **[Solr Admin UI - center panel](../concepts/solradmin-center.md)**  
The center of the screen shows the detail of the Solr core selected, such as statistics, summary report, and so on.
