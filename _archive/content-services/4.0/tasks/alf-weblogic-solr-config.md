---
author: [Alfresco Documentation, Alfresco Documentation]
source: DITA reference
audience: 
category: Documentation
---

# Configuring Solr with Alfresco running on WebLogic

These instructions describe how to configure Solr to communicate with Alfresco deployed on WebLogic 11g Rel1 \(10.3.5\).

Solr must be deployed on a separate Tomcat instance.

-   Configure Solr using the following instructions: [Configuring Solr](solr-install-config.md).

**Note:** The SSL certificate provided with your Alfresco installation will not work on WebLogic. You need to generate a new SSL certificate for Solr to work correctly. For more information, see the instructions in the [Generating Secure Keys for Solr Communication](generate-keys-solr.md) topic.

Ensure that Alfresco is installed on WebLogic using the instructions described in the section [Installing Alfresco on WebLogic](alf-weblogic-install.md) .

1.  Edit the <Weblogic\_HOME\>/user\_projects/domains/alf\_domain/alfresco-global.properties file, and add the following properties:

    ```
    dir.keystore=<Weblogic_HOME>/user_projects/domains/alf_domain/keystore
    index.subsystem.name=solr
    solr.host=<SOLR_HOST>
    solr.port=8080     
    solr.port.ssl=8443
    ```

2.  Create and populate a keystore directory for the Alfresco and Solr servers.

    1.  Create a folder called <Weblogic\_HOME\>/user\_projects/domains/alf\_domain/keystore.

        **Note:** At this stage, the keystore directory will just be a template, containing standard keys that are incompatible with Weblogic.

    2.  Copy all the files from <alfresco.war\>/WEB-INF/classes/alfresco/keystore to this new folder.

        **Note:** To secure the installation, you must follow the steps to generate new keys as explained in the [Generating Secure Keys for Solr Communication](generate-keys-solr.md) section.

3.  Open the WebLogic Admin Console:

    1.  Go to **Environment – Servers – AlfrescoServer – Configuration – General**.

    2.  Select the **SSL Listen Port Enabled** checkbox and then enter **8443** in the **SSL Listen Port** field.

    3.  Click **Save**.

    4.  On the **Keystores** tab, click **Change** and then select the **Custom Identity and Custom Trust** value in drop down menu.

    5.  Click **Save**.

    6.  In the **Identity** section, enter following parameter values:

        ```
        Custom Identity Keystore:
        <Weblogic_HOME>/user_projects/domains/alf_domain/keystore/ssl.keystore
        Custom Identity Keystore Type:   JCEKS
        Custom Identity Keystore Passphrase:   kT9X6oe68t
        Confirm Custom Identity Keystore Passphrase:   kT9X6oe68t
        ```

    7.  In the **Trust** section provide following parameters:

        ```
        Custom Trust Keystore: <Weblogic_HOME>/user_projects/domains/alf_domain/keystore/ssl.truststore
        Custom Trust Keystore Type:  JCEKS
        Custom Trust Keystore Passphrase:   kT9X6oe68t
        Confirm Custom Trust Keystore Passphrase:   kT9X6oe68t 
        ```

    8.  Click **Save**.

    9.  Select the **SSL** tab and then enter the following fields:

        ```
        Private Key Alias:   ssl.repo     
        Private Key Passphrase:   kT9X6oe68t     
        Confirm Private Key Passphrase:  kT9X6oe68t
        ```

    10. Click **Save**.

    11. Expand the Advanced link and then enter the following fields:

        ```
        Two Way Client Cert Behavior: Client Certs Requested But Not Enforced     
        ```

    12. Click **Save**.

4.  Test that Alfresco can now be accessed over SSL.

    For example, enter `https://localhost:8443/alfresco`.

5.  In the WebLogic Admin Console, go to **Security Realms – myrealm – Providers – Authentication – DefaultIdentityAsserter**.

    1.  In Available Types: select X.509 and move it to the Chosen: list.

    2.  Click **Save**.

    3.  Select the **Provider Specific** tab and fill following parameters as below:

        ```
        Default User Name Mapper Attribute Delimiter: , (Comma)     
        Default User Name Mapper Attribute Type: CN     
        Use Default User Name Mapper: true (check the checkbox).
        ```

    4.  Click **Save**.

6.  Restart AdminServer and AlfrescoServer.

7.  In the WebLogic Admin Console, go to **Security Realms – myrealm – Users and Groups - Users**.

8.  Click **New**.

9.  In Create a New User page fill following parameters as below:

    ```
    Name:   Alfresco Repository
    Client     Password:   kT9X6oe68t     
    Confirm Password:    kT9X6oe68t     
    ```

10. Click **OK**.   

11. To complete the installation, it is necessary to secure the two-way communication between Alfresco and Solr by generating your own keys. For details, see the [Generating Secure Keys for Solr Communication](generate-keys-solr.md) topic.

12. Restart AlfrescoServer.


**Parent topic:**[Installing Alfresco on WebLogic](../tasks/alf-weblogic-install.md)

