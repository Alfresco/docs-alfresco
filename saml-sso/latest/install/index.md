---
title: Install with Zip
---

SAML Single Sign-On (SSO) is installed as a module of Alfresco Content Services. These modules are referred to as Alfresco Module Packages (AMP) and use the `.amp` file format.

AMPs can be installed in the `amps` directory of your Alfresco Content Services installation or by using the [Module Management Tool](LINK).

## Prerequisites

There are a number of prerequisites for installing SAML SSO in addition to the [supported platforms]({% link saml-sso/latest/support/index.md %}).

### Software

Alfresco should work with any identify provider (IdP) that supports SAML 2.0, however the following IdPs have been tested:

* Microsoft Active Directory Federation Services (ADFS) 3.0 for Microsoft Windows 2012 R2 and above
* PingIdentity PingFederate 7.0 and later

Make sure that you have the public key of the certificate from your chosen IdP. You also need the SSO request, SLO request, and SLO response URLs.

### SAML level

Alfresco uses SAML 2.0. See [OASIS SAML v2.0](https://wiki.oasis-open.org/security/FrontPage){:target="_blank"} for more information on SAML specifications.

### Authentication chain

SAML is not a part of the authentication chain. It is used as a replacement for the authentication chain.

If you have not enforced SAML for a specific service provider, you can use the other authentication methods specified in your authentication chain alongside SAML when accessing that service provider.

## Installation steps

> **Note**: If you are installing SAML SSO on top of Alfresco Content Connector for AWS S3, use the `-force` option, otherwise Alfresco Content Services will not start correctly.

> **Note**: If you are running Alfresco Content Services behind a proxy, make sure the identity provider references the proxy endpoint instead of directly referencing the Alfresco cluster.

1. Stop the Alfresco Content Services server.

2. Navigate to the Alfresco Support Portal: [http://support.alfresco.com](http://support.alfresco.com){:target="_blank"} and download and unzip the SAML SSO for Alfresco Content Services zip package:

    * `alfresco-saml-1.2.x.zip`

    The `alfresco-saml-1.2.x.zip` file contains the following files:

       * `README.txt`
       * `alfresco-global.properties.sample`
       * `alfresco-saml-repo-1.2.x.amp`
       * `alfresco-saml-share-1.2.x.amp`
       * `alfresco/extension/subsystems/SAML/share/share/my-custom-share-sp.properties.sample`
       * `alfresco/extension/subsystems/SAML/repository/rest-api/my-custom-rest-api-sp.properties.sample`
       * `alfresco/extension/subsystems/SAML/repository/aos/my-custom-aos-sp.properties.sample`
       * `share-config-custom.xml.sample`

3. Move or copy `alfresco-saml-repo-1.2.x.amp` to the amps directory and `alfresco-saml-share-1.2.x.amp` to the `amps\_share` directory in your Alfresco Content Services installation.

4. If you are using Tomcat, navigate to the bin directory and run the `apply\_amps.bat` file to install the AMP files.

    * `/opt/alfresco/bin`
    * (Windows) `c:\Alfresco\bin`

    Check the output from the script to ensure that the AMP files have installed successfully.

5. If you are not using Tomcat, use the [Module Management Tool](LINK) to apply the AMP files.

6. The SAML module does not supply a service provider certificate that is used to sign messages sent to the IdP. You must generate your own certificate, as shown in the following example:

    This will generate a self-signed certificate.

    1. Run the following command:

       ```bash
       keytool -genkeypair -keyalg RSA -alias my-saml-key -keypass change-me -storepass change-me -keystore my-saml.keystore -storetype JCEKS
       ```

    2. Place the generated `my-saml.keystore` file into a location of your choice that is accessible to the repository.

        Set the file permissions accordingly to limit who can read it.

    3. Generate a SAML keystore metadata file in the same location as the keystore and add the following content:

       ```bash
       aliases=my-saml-key
       keystore.password=change-me
       my-saml-key.password=change-me
       ```

       Set the file permissions accordingly to limit who can read it.

    4. Set the following values in the `alfresco-global.properties` file:

       ```bash
       saml.keystore.location=<full pathname>/my-saml.keystore
       saml.keystore.keyMetaData.location=<full pathname>/my-saml-keystore-passwords.properties
       ```

    5. Restart the Alfresco Content Services server.

    6. Use the SAML Admin Console **Download SP Certificate** button to download the certificate for your SP, which can then be uploaded to your IdP.

    7. Stop the Alfresco server.

7. Locate your `share-config-custom.xml.sample` file.

    This sample configuration file is shipped with SAML and shows the required rules and properties that need to be added to the CSRFPolicy to allow SAML logouts.

    1. If you are using Alfresco Share as your service provider, and you have custom CSRFPolicy configurations in your installation, copy and paste the *SAML SPECIFIC CONFIG* section of the sample file into your custom CSRFPolicy filter, and save.

    2. If you have a `share-config-custom.xml` file in your Alfresco Share installation, merge the contents of `share-config-custom.xml.sample` into your `share-config-custom.xml` file, and save.

    3. Alternatively, if you do not have a `share-config-custom.xml` in your Alfresco Share installation, rename `share-config-custom.xml.sample` to `share-config-custom.xml`.

    4. Review the details in the CSRFPolicy section for accuracy.

8. Restart the Alfresco Content Services server.

## Uninstall steps

Use the [Module Management Tool](LINK) to uninstall the SAML SSO module from Alfresco Content Services.

1. Stop the Alfresco server.

2. Use the information in [Uninstalling an AMP file](LINK) to uninstall each AMP file.

    For example, from the Alfresco root directory, you need two commands:

    ```bash
    java -jar bin/alfresco-mmt.jar uninstall alfresco-saml-repo tomcat/webapps/alfresco.war
    java -jar alfresco-mmt.jar uninstall alfresco-saml-share tomcat/webapps/share.war
    ```

    Use these commands to check whether the AMP files were removed:

    ```bash
    java -jar bin/alfresco-mmt.jar list tomcat/webapps/alfresco.war
    java -jar bin/alfresco-mmt.jar list tomcat/webapps/share.war
    ```

3. Delete the `tomcat/webapps/alfresco` and `tomcat/webapps/share` folders in the Alfresco installation directory.

    Deleting these directories forces Tomcat to read the edited WAR files when Alfresco is restarted.

4. Remove any `share-config-custom.xml` customizations that you added when you installed the SAML module.

    For example:

    1. If you are using Alfresco Share as your service provider, and you have custom CSRFPolicy configurations in your installation, remove the *SAML SPECIFIC CONFIG* section, and save.

    2. Remove the contents of `share-config-custom.xml.sample` from your `share-config-custom.xml` file, and save. If there is no other content in your `share-config-custom.xml` file, you can simply remove the file.

5. Restart the Alfresco server.
