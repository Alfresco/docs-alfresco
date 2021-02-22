---
author: Alfresco Documentation
source: 
---

# Installing SAML SSO

Download and install the SAML AMP files.

**Note:** If you are running Alfresco behind a proxy, make sure the IdP references the proxy endpoint instead of directly referencing the Alfresco cluster.

1.  Stop the Alfresco server.

2.  Browse to the Alfresco Support Portal: [http://support.alfresco.com](http://support.alfresco.com) and download and unzip the SAML SSO for Alfresco Content Services zip package:

    -   alfresco-saml-1.0.3.zip

        The alfresco-saml-1.0.3.zip file contains the following files:

        -   README.txt
        -   alfresco-global.properties.sample
        -   alfresco-saml-repo-1.0.3.amp
        -   alfresco-saml-share-1.0.3.amp
        -   alfresco/extension/subsystems/SAML/share/share/my-custom-share-sp.properties.sample
        -   alfresco/extension/subsystems/SAML/repository/rest-api/my-custom-rest-api-sp.properties.sample
        -   alfresco/extension/subsystems/SAML/repository/aos/my-custom-aos-sp.properties.sample
        -   share-config-custom.xml.sample
3.  Move or copy alfresco-saml-repo-1.0.3.amp to the amps directory and alfresco-saml-share-1.0.3.amp to the amps\_share directory in your Alfresco installation.

4.  If you are using Tomcat, navigate to the bin directory and run the apply\_amps.bat file to install the AMP files.

    -   \(Windows\) c:\\Alfresco\\bin
    -   /opt/alfresco/bin
    Check the output from the script to ensure that the AMP files have installed successfully.

5.  If you are not using Tomcat, use the Module Management Tool to apply the AMP files.

    For more information, see [Using the Module Management Tool](docs.alfresco.com/concepts/dev-extensions-modules-management-tool.html).

6.  The SAML module does not supply a service provider certificate that is used to sign messages sent to the IdP. You must generate your own certificate, as shown below:

    This will generate a self-signed certificate.

    1.  Run the following command:

        ```
        keytool -genkeypair -alias my-saml-key -keypass change-me -storepass change-me -keystore my-saml.keystore -storetype JCEKS
        ```

    2.  Place the generated my-saml.keystore file into a location of your choice that is accessible to the repository.

        Set the file permissions accordingly to limit who can read it.

    3.  Generate a SAML keystore metadata file in the same location as the keystore and add the following content:

        ```
        aliases=my-saml-key
        keystore.password=change-me
        my-saml-key.password=change-me
        ```

        Set the file permissions accordingly to limit who can read it.

    4.  Set the following values in the alfresco-global.properties file:

        ```
        saml.keystore.location=<full pathname>/my-saml.keystore
        saml.keystore.keyMetaData.location=<full pathname>/my-saml-keystore-passwords.properties
        ```

    5.  Restart the Alfresco server.

    6.  Use the SAML Admin Console **Download SP Certificate** button to download the certificate for your SP, which can then be uploaded to your IdP.

    7.  Stop the Alfresco server.

7.  Locate your share-config-custom.xml.sample file.

    This sample configuration file is shipped with SAML and shows the required rules \(and properties\) that need to be added to the CSRFPolicy to allow SAML logouts.

    1.  If you are using Alfresco Share as your service provider, and you have custom CSRFPolicy configurations in your installation, copy and paste the *SAML SPECIFIC CONFIG* section of the sample file into your custom CSRFPolicy filter, and save.

    2.  If you have a share-config-custom.xml file in your Alfresco Share installation, merge the contents of share-config-custom.xml.sample into your share-config-custom.xml file, and save.

    3.  Alternatively, if you do not have a share-config-custom.xml in your Alfresco Share installation, rename share-config-custom.xml.sample to share-config-custom.xml.

    4.  Review the details in the `CSRFPolicy` section for accuracy.

8.  Restart the Alfresco server.


**Parent topic:**[Installing SAML SSO in Alfresco](../concepts/saml-config-overview.md)

