---
author: Alfresco Documentation
---

# Configuring the RSS Feed Dashlet with HTTP authentication

This section describes how to enable the RSS Feed Dashlet for accessing sites over secure connections is a JDK configuration issue connected with absence of certificate\(s\) of the target feeds sender in the JDK keystore. To do this, you must add the certificate\(s\) from each site into the keystore of the JDK.

1.  Get the certificate of the target feeds sender site.

    For example, the certificate of https://anon.com.

    This site has already been visited or has not been visited yet with FireFox 3.6 or above.

    1.  Navigate to the **Tools \> Options...** menu and select **Advanced**.

    2.  Select **Encryption** and click **View Certificates**.

    3.  In the opened window select **Servers** and then click **Add Exception**.

    4.  Specify target site URL in the **Location** field \(for example, https://anon.com\), and then click **Get Certificate**.

    5.  Click **View** when it becomes active.

    6.  Go to the **Details** tab in the new window and click **Export**.

    7.  In the opened **Save Certificate To File...** window, leave the default values:

        ```
        'File name' = 'anon' and 'Save as type' = 'X.509 Certificate (PEM)'
        ```

    8.  Choose destination directory where certificate should be saved, for example <JAVA\_HOME\>/jre/lib/security and then click **Save**.

    9.  Close all windows without applying any changes. 

2.  In the command line console navigate to the <JAVA\_HOME\>/jre/lib/security directory. Execute the following command:

    ```
    keytool -import -trustcacerts -alias <certificate_alias> -file <certification_file_location> 
          -keystore <keystore_file_location> 
    ```

    Where:

    -   **`<certificate_alias>`**

        The new keystore alias for certificate is being imported.

    -   **`<certification_file_location>`**

        The location of the certificate file \(refer to step 1 for the details of certificates exporting\).

    -   **`<keystore_file_location>`**

        The keystore file location.

    For example, to import certificate from the https://anon.com site into the JDK keystore execute next command:  

    ```
    keytool -import -trustcacerts -alias icustomer.dsthealthsolutions.com -file anon.crt
          -keystore cacerts 
    ```

3.  Enter the keystore password to initiate the certificate import \(JDK has the `changeit` password by default\). Confirm by entering **yes**. 

4.  Restart the Alfresco server. 


**Parent topic:**[Customizing Alfresco Share configuration items](../tasks/share-customize.md)

