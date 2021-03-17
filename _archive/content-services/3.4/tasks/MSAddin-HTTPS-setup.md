---
author: [Alfresco Documentation, Alfresco Documentation]
audience: 
category: [Installation, Administration, MS Office Add-in, Extensions/Third Party Tools]
keyword: [MS Office Add-in, Extensions/Third Party Tools]
---

# Setting up Microsoft Office Add-ins to work with HTTPS

This section describes how to configure the Alfresco server and a client machine to run the Alfresco Microsoft Office Add-ins over HTTPS.

1.  Use the Java `keytool` utility to generate a key pair for further HTTPS connections for Tomcat.

    For example:

    ```
    %JAVA_HOME%\bin\keytool.exe -genkeypair -alias alfresco -keystore
        D:\temp\keystore.jks -storepass changeit -keypass changeit  -keyalg RSA -validity 360
        -keysize 2048 -storetype JKS 
    ```

    If you use a different tool, refer to the relevant vendor's documentation.

    **Attention:** Your certificate \(created in the remaining sections\) must be `VALID` for the appropriate host name and trusted to be able to communicate with Alfresco without warnings and errors. If you see warnings and errors with the HTTPS configuration, double check your certificate.

    1.  Configure the key pair using the following method:

        When prompted to enter the **First Name and Last Name**, enter a host DNS name. For example, if you are using Alfresco in the Intranet and you are using the host with a URL `https://my-host-name:8443/alfresco`, `enter my-host-name` as a value for the **First Name and Last Name** field. This is required to prevent Internet Explorer from requesting details about a valid certificate or host. If you are using URL such as `https://www.alfresco.org/alfresco`, your **First Name and Last Name** field value should be `www.alfresco.org`.

    2.  Export the generated associated certificate into a file.

        ```
        %JAVA_HOME%\bin\keytool.exe -exportcert -alias alfresco -file
            D:\temp\alfresco-ssl.cer -keystore  D:\BUGS\ALF-6390\keystore.jks -storepass changeit
            -storetype JKS 
        ```

2.  Configure Tomcat using the HTTPS connector.

3.  Add the generated certificate to the Windows **Trusted Root Certification Authorities** on each client machine using one of the following two methods.

    Method One:

    1.  Run the Certificate Manager \(certmgr.msc\).

    2.  Navigate to **Certificates - Current User** \> **Trusted Root Certification Authorities** \> **Certificates**.

    3.  Right-click on the **Certificates** node in the tree and invoke **All Tasks** \> **Import..** from the context menu.

    Method Two:

    1.  Invoke an installation of the certificate from Internet Explorer.

        From IE6 or IE7, navigate to `https://my-host:8443/alfresco` and on the Security Alert window, click **View Certificate**.

        From IE8, navigate to `https://my-host:8443/alfresco`, select Certificate Error, and then click **View certificates**.

    2.  View the certificate and then click **Install certificate...**.

    3.  Click **Next** to run through the steps in the wizard.

    4.  On the Certificate Store page, select the option **Place all certificates in the following store**.

    5.  Click **Browse**, and then select the **Trusted Root Certification Authorities** store.

    6.  Click **Finish** to complete the certificate import.

    7.  At the security warning, click **Yes** to install the certificate.


When the certificate is added to the Trusted Store, you will be able to work with Alfresco Office Add-In via HTTPS.

**Parent topic:**[Installing Microsoft Office Add-ins](../tasks/ms-addins.md)

