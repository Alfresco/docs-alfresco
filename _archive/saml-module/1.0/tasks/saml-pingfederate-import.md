# Configuring PingFederate using a cloned connection

Import a connection into the PingFederate identity provider to work with SAML SSO in Alfresco.

**Note:** The following steps are example instructions to help you configure PingFederate. For detailed configuration information see the [PingFederate admin documentation](https://documentation.pingidentity.com/pingfederate/pf81/index.shtml#gettingStartedGuide/concept/consoleNavigation.html).

If this is the first time you are setting up PingFederate, use the manual setup specified here: [Configuring PingFederate manually](saml-pingfederate.md), so that the correct Alfresco metadata is loaded.

1.  Log in to your PingFederate administrative console as the administrator.

    The URL is in the format:

    ```
    https://<DNS_NAME>:9999/pingfederate/app
    ```

    where `<DNS_NAME>` is the fully qualified name of the machine running the PingFederate server.

2.  Download or copy an existing connection profile from PingFederate:

    1.  From the PingFederate main administrative console, select SP Connections \> Manage All SP and scroll down to an existing Alfresco connection. Click Export Connection and Save to download and edit offline, or Copy to create a new connection in PingFederate.

3.  If you are downloading the connection information to edit it offline, the file is saved as a sp-pingfederate-connection.xml file:

    Here is an example, with encoding information removed:

    ```
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

    `entityID` and `urn:name` are the name of your PingFederate connection, and `urn:baseUrl` is the name of your service provider instance. Ensure that you also have the correct `ResponseLocation` defined.

    Save your changes.

4.  From the PingFederate main administrative console page, select Import from the SP Connections section. Click Browse to find your sp-pingfederate-connection.xml file. Click Import and Done.

5.  Review the settings for the connection.

    From the PingFederate main administrative console, select SP Connections \> Manage All SP and scroll down to the connection you created. Click the connection name and view the summary information.

6.  Ensure that your connection is active.

    Each connection has a status of Active, Inactive or Draft.


**Parent topic:**[Configuring PingFederate manually](../tasks/saml-pingfederate.md)

