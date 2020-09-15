---
title: Configure PingFederate
---

The following steps are example instructions for configuring PingFederate as the identity provider to use with SAML SSO in Alfresco. For detailed instructions on configuration use the [PingFederate documentation](https://support.pingidentity.com/s/PingFederate-help){:target="_blank"}.

PingFederate can be configured manually or you can reuse or clone an [existing connection](#reuse-an-existing-connection).

## Configure PingFederate manually

1. Log in to your PingFederate administrative console as the administrator.

    The URL is in the format `https://<DNS_NAME>:9999/pingfederate/app`

2. In **IdP Configuration** > **SP Connections**, click **Create New** to create a service provider connection for Alfresco Content Services.

3. Enter information in each of the following tabs to set the type of connection you want to establish between PingFederate and Alfresco Content Services.

    1. **Connection Type**: Select the **Browser SSO Profiles** check box and click **Next**.

    2. **Connection Options**: Select the **Browser SSO** check box and click **Next**.

    3. **Import Metadata**: Use this tab to import the metadata file describing this new connection.

        1. In a new browser window, log in to the SAML SSO Admin Console page as an administrator: `http://localhost:8080/alfresco/service/enterprise/admin/admin-saml`

        2. Click `Download SP Metadata`.
        3. Save the file.

            > **Note:** The Admin Console settings for SAML will be setup later.

    4. Set these values in the **General Info** tab:

        1. Specify the **Partner's Entity ID (Connection ID**) and the **Connection Name** for your connection.
        2. Ensure that the Base URL is pointing to your service provider. For example:

            * For Alfresco Share: `http://localhost:8080/share`
            * For REST API: `http://localhost:8080/alfresco`
            * For Alfresco Officer Services: `http://localhost:8080/alfresco`

        3. Optionally, you can also provide contact information.
        4. Set the level of transaction logging you need. Ensure that **Standard** is selected as the **Logging Mode**.
        5. Click **Next**.

            > **Note:** You can save the configuration by clicking **Save Draft**. You can then retrieve it by selecting **Manage All SP** from **SP Connections** on the main administrative console page.

        6. The **Browser SSO** tab has a number of sections to complete. Click **Configure Browser SSO** and complete the following steps on each of the Browser SSO tabs.

4. Use the Browser SSO section to setup message transfers between Alfresco and PingFederate.

    1. Select all four available profiles on this tab and click **Next**.

        **SAML Profiles**: Alfresco uses all the SSO and SLO profiles available.

    2. **Assertion Lifetime**: Accept the default and click **Next**.

        This sets the time for which an assertion is valid. A SAML assertion is an XML document that contains authentication, authorization, and attribute information. Each assertion has validity time period.

    3. Click **Configure Assertion Creation** in the **Assertion Creation** tab.

        Configuring assertions involves specifying how PingFederate obtains user-authentication information and uses it to create assertions for Alfresco Content Services. This includes choosing an identity mapping method, defining the attribute contract and configuring adapters.

    4. **Identity Mapping**: Ensure that the **Standard** mapping is selected and click **Next**.

    5. Enter the following information for the **Attribute Contract**:

        1. Choose **urn:oasis:names:tc:SAML:1.1:nameid-format:unspecified** as the subject name format for the SAML_SUBJECT attribute contract.

            > **Note:** The contract includes the default SAML_SUBJECT, which identifies the user in the assertion. This is because you used the standard identity mapping.

        2. Extend the Contract by adding an email part to it. Type **Email** in the **Extend the Contract** text box.
        3. Choose **urn:oasis:names:tc:SAML:2.0:attrname-format:basic** as the attribute name format and click **Add**. The details are added.
        4. Click **Next**.

5. In Authentication Source Mapping, click **Map New Adapter Instance**, and complete the following steps for the **IdP Adapter Mapping** tabs.

    IdP adapters are used for user authentication in the Single Sign-On process. When an Alfresco user enters credentials, the user attributes are returned to PingFederate.

    1. **Adapter Instance**: Select **IdP Adapter** from the **Adapter Instance** menu and click **Next**.

        An adapter instance is a configured and deployed adapter.

    2. **Assertion Mapping**: Ensure **Use only Adapter Contract values in the SAML assertion** is selected. Click **Next**.

        Setting up assertion mappings involves defining data stores that you want to use to look up adapter contract values.

    3. Set these values for **Attribute Contract Fulfilment**:

        1. For the Email attribute contract, select **Adapter** as the **Source**.
        2. For the Email attribute contract, select **email** as the **Value**.
        3. For the SAML_SUBJECT attribute contract, select **Adapter** as the **Source**.
        4. For the SAML_SUBJECT attribute contract, select **subject** as the **Value** .
        5. Click **Next**.

    4. Click through **Next** and **Done**, as the information is optional for the **Issuance Criteria** tab.

    5. Click **Next** and **Done**.

        You are redirected to the **Browser SSO** tab to configure bindings, endpoints, and other settings needed for the SAML profile.

        > **Note:** You can save the configuration at any time by clicking Save Draft. You can then retrieve it by selecting **Manage All SP** from **SP Connections** on the main administrative console page.

6. Click **Protocol Settings** in the **Browser SSO** tab and complete the following tasks on each of the **Protocol Settings** tabs.

    1. Specify information for the **Assertion Consumer Service URL**:

        For Alfresco Share:

        1. Select **POST** from the **Binding** menu.
        2. Type **/page/saml-authnresponse (POST)** in the **Endpoint URL** field.
        3. Click **Add**. Click **Next**.

        For REST API:

        1. Select **POST** from the **Binding** menu.
        2. Type **/service/saml/-default-/rest-api/authenticate-response (POST)** in the **Endpoint URL** field.
        3. Click **Add**. Click **Next**.

        For Alfresco Office Services:

        1. Select **POST** from the **Binding** menu.
        2. Type **/service/saml/-default-/aos/authenticate-response (POST)** in the **Endpoint URL** field.
        3. Click **Add**. Click **Next**.

    2. Specify information for the **SLO Service URLs**. These specify where Alfresco receives logout requests when a Single Log-out (SLO) request is initiated by PingFederate, and where PingFederate sends SLO responses.

        For Alfresco Share:

        1. Select **POST** from the **Binding** menu.
        2. Type **/page/saml-logoutrequest** in the **Endpoint URL** field.
        3. Type **https://-your server-/share/page/saml-logoutresponse** in the **Response URL** field.For example: `https://localhost:8443/share/page/saml-logoutresponse`
        4. Click **Add**. Click **Next**.

        For REST API:

        1. Select **POST** from the **Binding** menu.
        2. Type **/service/saml/-default-/rest-api/logout-request (POST)** in the **Endpoint URL** field.
        3. Type **https://-your server-/alfresco/service/saml/-default-/rest-api/logout-response** in the **Response URL** field.

        For Alfresco Office Services:

        1. Select **POST** from the **Binding** menu.
        2. Type **/service/saml/-default-/aos/logout-request (POST)** in the **Endpoint URL** field.
        3. Type **https://-your server-/alfresco/service/saml/-default-/aos/logout-response** in the **Response URL** field.

    3. **Allowable SAML Bindings**: Ensure that only **POST** is selected as the binding type. Click **Next**.

    4. **Signature Policy**: You do not need to select an option; just click **Next**.

    5. Configure the **Encryption Policy**:

        1. Ensure that **None** is selected and click **Next**.
        2. Check the summary and click **Done**.
        3. Click **Next**.
        4. Review the final settings and click **Done**. You are redirected to the **SP Connection > Browser SSO** tab.

7. Click the **Credentials** tab and **Configure Credentials** and complete the following steps on each tab.

    1. **Digital Signature Settings**: Download the PingFederate certificate.

        In the Credentials section, select **Digital Signature Settings** and Manage Certificates.

        1. Click **Export** for the IdP certificate that you require.
        2. Select **Certificate only** and click **Next**.
        3. Click **Export**, and save the file to a folder. Click **Done**.

        > **Note**: You will need this certificate for uploading into the administration console later.

        On the **Digital Signature Settings** screen, select the signing certificate and the signing algorithm.

        1. Select the certificate from the drop-down list.
        2. Select the **Signing Algorithm** from the drop-down list. Make sure that the selected Signing Algorithm is **RSA SHA256**.

    2. **Signature Verification Settings**: Specify the **SP Certificate** used by PingFederate to validate SAML messages sent from Alfresco products.

        1. Select **Manage Signature Verification Settings**.
        2. Select the **Unanchored** option.
        3. Click **Next**.
        4. Click **Manage Certificates**.
        5. Click **Import** and **Browse** to select the SP Certificate that you downloaded from the SAML SSO administration console and then click **Extract**.
        6. In a new browser window, log in to the Admin Console SAML SSO page as an administrator: `http://localhost:8080/alfresco/service/enterprise/admin/admin-saml`
        7. Click **Download SP Certificate**.
        8. Save the file.
        9. Click **Next**. The **Summary** screen is displayed. You can review or edit your credentials configuration here.
        10. When you finish editing the existing settings, click **Done** on the **Summary** screen, and **Save** on the  **Credentials** screen.

8. Ensure that your connection is active.

    You can check your connection from the main administrative console. Select **SP Connections > Manage All SP** and scroll down to see the connection you created. Each connection has a status of Active, Inactive or Draft.

## Reuse an existing connection

1. Log in to your PingFederate administrative console as the administrator: `https://<DNS_NAME>:9999/pingfederate/app`

2. Download or copy an existing connection profile from PingFederate:

    From the PingFederate main administrative console, select **SP Connections > Manage All SP** and scroll down to an existing connection for Alfresco. Click **Export Connection** and **Save** to download and edit offline, or **Copy** to create a new connection in PingFederate.

3. If you are downloading the connection information to edit it offline, the file is saved as a `sp-pingfederate-connection.xml` file, for example (with encoding information removed):

    ```xml
    <?xml version="1.0" encoding="UTF-8"?>
    <md:EntityDescriptor entityID="nameofconnection" urn:name="nameofconnection" urn:baseUrl="http://localhost:8080/share" urn:LogLevel="STANDARD" urn:isActive="true" xmlns:md="urn:oasis:names:tc:SAML:2.0:metadata" xmlns:urn="urn:sourceid.org:saml2:metadata-extension:v2">
      <md:Extensions>
        <urn:EntityExtension PFVersion="7.3.0.5" LicenseGroup="">
          <urn:DigitialSignatureAliases SigningAlgorithm="http://www.w3.org/2000/09/xmldsig#rsa-sha1" includeX509inXmlSig="true" includeRawKeyInXmlSig="false"/>
          <urn:Encryption>
            <urn:EncryptionPolicy EncryptionAlgorithm="http://www.w3.org/2001/04/xmlenc#aes128-cbc" KeyTransportAlgorithm="http://www.w3.org/2001/04/xmlenc#rsa-oaep-mgf1p" EncryptAssertion="false" EncryptSubjectNameID="false" SLOEncryptSubjectNameID="false"/>
            <urn:DecryptionPolicy AssertionEncrypted="false" SubjectNameIDEncrypted="false" AttributeEncrypted="false" SLOSubjectNameIDEncrypted="false"/>
          </urn:Encryption>
          <urn:Dependencies>
            <urn:SigningKeyPairReference MD5Fingerprint="fingerprint_number"/>
            <urn:DsigVerificationCert>
             <urn:Base64EncodedCert>certificate_info</urn:DsigVerificationCert>
            <urn:SecondaryDsigVerificationCert/>
            <urn:DecryptionKeyPairReference/>
            <urn:EncryptionCert/>
            <urn:SoapAuth>
              <soap:Incoming xmlns:soap="http://www.sourceid.org/2004/04/soapauth"/>
              <soap:Outgoing xmlns:soap="http://www.sourceid.org/2004/04/soapauth"/>
            </urn:SoapAuth>
          </urn:Dependencies>
          <urn:ConnectionTemplateProperties/>
        </urn:EntityExtension>
      </md:Extensions>
      <md:SPSSODescriptor protocolSupportEnumeration="urn:oasis:names:tc:SAML:2.0:protocol" AuthnRequestsSigned="false" WantAssertionsSigned="false">
        <md:Extensions>
          <urn:RoleExtension ArtifactTimeoutSeconds="60">
            <urn:IncomingBindings Artifact="false" POST="true" Redirect="true" SOAP="false"/>
            <urn:EnabledProfiles IDPInitiatedSSO="true" IDPInitiatedSLO="true" SPInitiatedSSO="true" SPInitiatedSLO="true"/>
            <urn:SP AssertionValidityAfterMinutes="5" AssertionValidityBeforeMinutes="5" ConnectionTargetType="Standard" EnableCDCDuringSSO="false">
              <urn:AdapterToAssertionMapping AbortIfNotFoundInAnyDataSources="false" RestrictVirtualServerIds="false" AdapterInstanceId="idpadapter">
                <urn:DefaultAttributeMapping>
                  <urn:AttributeMap Name="SAML_SUBJECT" Type="Adapter" Value="subject"/>
                  <urn:AttributeMap Name="Email" Type="Adapter" Value="email"/>
                  <urn:AttributeMap Name="PersonImmutableID" Type="Adapter" Value="username"/>
                  <urn:TokenAuthorizationIssuanceCriteria/>
                </urn:DefaultAttributeMapping>
              </urn:AdapterToAssertionMapping>
              <urn:NameIdentifierMappingType IncludeAdditionalAttributes="false" IncludeAdditionalTransientAttributes="false"/>
            </urn:SP>
          </urn:RoleExtension>
        </md:Extensions>
        <md:SingleLogoutService Binding="urn:oasis:names:tc:SAML:2.0:bindings:HTTP-POST" Location="/page/components/saml/logoutrequest" ResponseLocation="http://localhost:8080/share/page/saml-logoutresponse"/>
        <md:NameIDFormat>urn:oasis:names:tc:SAML:1.1:nameid-format:unspecified</md:NameIDFormat>
        <md:AssertionConsumerService index="0" Location="/page/saml-authnresponse" Binding="urn:oasis:names:tc:SAML:2.0:bindings:HTTP-POST" isDefault="true"/>
        <md:AttributeConsumingService index="0">
          <md:ServiceName xml:lang="en">AttributeContract</md:ServiceName>
          <md:RequestedAttribute Name="Email" NameFormat="urn:oasis:names:tc:SAML:2.0:attrname-format:basic"/>
          <md:RequestedAttribute Name="PersonImmutableID" NameFormat="urn:oasis:names:tc:SAML:2.0:attrname-format:basic"/>
        </md:AttributeConsumingService>
      </md:SPSSODescriptor>
      <md:ContactPerson contactType="administrative">
        <md:Company>your-company</md:Company>
        <md:EmailAddress>your_address</md:EmailAddress>
      </md:ContactPerson>
    </md:EntityDescriptor>
    ```

    > **Note**: `entityID` and `urn:name` are the name of your PingFederate connection, and `urn:baseUrl` is the name of your service provider instance. Ensure that you also have the correct `ResponseLocation` defined.

4. From the PingFederate main administrative console page, select **Import from the SP Connections** section. Click **Browse** to find your `sp-pingfederate-connection.xml` file. Click **Import** and **Done**.

5. Review the settings for the connection.

    From the PingFederate main administrative console, select **SP Connections > Manage All SP** and scroll down to the connection you created. Click the connection name and view the summary information.

6. Ensure that your connection is active.

    Each connection has a status of Active, Inactive or Draft.

### Download an identity provider certificate

> **Note:** You can skip this task if you have already downloaded the certificate in the manual setup steps.

1. Log in to the identity provider administrative console as the administrator, for example:`https://<DNS_NAME>:9999/pingfederate/app`

2. For PingFederate, in the Server Configuration section, select **Certificate Management** and **Digital Signing & XML Decryption Keys & Certificates**.

    1. Click **Export** for the IdP certificate that you require.

    2. Select **Certificate only** and click **Next**.

    3. Click **Export**, and save the file to a folder for uploading to Alfresco in the next task. Click **Done**.

## Setup users in PingFederate

The following steps can be used to setup users in PingFederate for development and test environments. 

For production environments, see the guidance in the [PingFederate documentation](https://support.pingidentity.com/s/PingFederate-help){:target="_blank"} on other options, including configuring an LDAP connection.

1. Run a full LDAP sync. This can be done by restarting Alfresco Content Services.

    If a user exists in LDAP and PingFederate, but not in Alfresco, they will not be able to log in to Alfresco when SAML SSO is enabled. See [Configuring LDAP (Active Directory)](LINK) for more information.

2. Stop the PingFederate server.

3. Add a section at the end of the file: `root/pingfederate-7.3.0/pingfederate/server/default/deploy/quickstart-app-idp.war/WEB-INF/classes/users.xml`, above the </users\> closing tag.

    The format expected is as follows for each Alfresco user:

    ```xml
    <user> 
    <first-name>Administrator</first-name>
    <last-name>Administrator</last-name>
    <email-address>admin@alfresco.com</email-address>
    <user-id>admin</user-id>
    <password>admin</password>
    <attribute name="SSN">123-45-6789</attribute>
    <attribute name="net worth">$38.26</attribute>
    <attribute name="salary">18500</attribute>
    </user>
    ```

    Ensure you choose a non-trivial password for each user, and that the details match the user in Alfresco Content Services.

4. Restart the PingFederate server.

    The new users are loaded and visible in the menu when you next go to your IdP logon page. You can check the PingFederate `server.log` for more information.
