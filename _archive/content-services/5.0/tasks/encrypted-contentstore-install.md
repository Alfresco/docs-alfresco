---
author: Alfresco Documentation
---

# Installing the Encrypted Content Store

Follow these steps to install the Encrypted Content Store to an instance of Alfresco.

Before you begin, ensure that you have Alfresco One 5.0 installed on your machine. For more information, see [Installing Alfresco using setup wizards](../concepts/installs-eval-intro.md).

1.  Obtain the license \( .lic \) file with content encryption enabled from Alfresco.

2.  Apply the license into the <ALFRESCO\_HOME\>/tomcat/shared/classes/alfresco/extension/license directory.

3.  Generate the RSA master key\(s\) in a new keystore.

    For example, use the following command to generate the master key:

    ```
    keytool -genkey -alias key1 -keyalg RSA -keystore <master keystore path> -keysize 2048
    ```

4.  Due to US export regulations and limitations in the Java Cryptographic Extension \(JCE\), the length of the symmetric key is not greater than 128 bit in the default configuration. If you are eligible to unlimited strength encryption, download the *Unlimited Strength Jurisdiction Policy* files from Oracle and increase the configuration value, `cryptodoc.jce.keygen.defaultSymmetricKeySize`.

5.  Follow the instructions for [Configuring the Encrypted Content Store](../concepts/encrypted-config.md).


**Parent topic:**[Encrypted Content Store](../concepts/encrypted-cs-home.md)

