---
title: Configure Active Directory
---

The following steps are example instructions for configuring Active Directory Federation Services (ADFS) as the identity provider to use with the SAML Module in Alfresco.

## Prerequisites

* A working domain on your Windows Server
* Active Directory is set up
* Users exist in Active Directory
* Alfresco Content Services is configured for SSL

## Setup steps

1. Run a full LDAP sync. This can be done by restarting Alfresco Content Services.

    > **Note**: If a user exists in LDAP, but not in Alfresco, they will not be able to log in to Alfresco when SAML is enabled. See [Configuring LDAP (Active Directory)]({% link content-services/latest/admin/auth-sync.md %}#configure-ldap) for more information.

2. Install ADFS. For example purposes we will use a domain name of `example.com` and a Federation Service name of `adfs.example.com`.

    Test your AD FS installation by accessing these URLs:

    * `https://adfs.example.com/adfs/ls/idpinitiatedsignon`
    * `https://adfs.example.com/federationmetadata/2007-06/federationmetadata.xml`

    where `adfs.example.com` is your Federation Service Name.

3. Log in to ADFS as an administrator and go to **Account Settings**.

4. In **Idp AuthenticationRequest Service URL**, enter the location of the **SingleSignOnService** element of the ADFS metadata.

    For example `https://adfs.example.com/federationmetadata/2007-06/federationmetadata.xml`

    Alfresco supports the HTTP-POST binding only, so you only need to copy the location of the HTTP-POST services.

    For example:

    ```xml
    <SingleSignOnService Location="https://adfs.example.com/adfs/ls/" Binding="urn:oasis:names:tc:SAML:2.0:bindings:HTTP-POST"/>
    ```

5. In **IdP SingleLogoutRequest Service URL** and **IdP SingleLogoutResponse Service URL**, enter the location of the **SingleLogoutService** element of the ADFS metadata.

    For example:

    ```xml
    <SingleLogoutService Location="https://adfs.example.com/adfs/ls/" Binding="urn:oasis:names:tc:SAML:2.0:bindings:HTTP-POST"/>
    ```

6. Export the ADFS certificate:

    1. Click **ADFS Management** (**Server Manager > Tools**), then **Service**, then **Certificates**.

    2. In the Token-signing section, right click the certificate and select **View Certificate**.

    3. On the **Details** tab, click **Copy to file** and **Next**.

    4. Select `DER encoded binary X.509 (.CER)`, and click **Next**.

    5. Select where you want to save the file and enter a name for it. Click **Save**, **Next**, and **Finish**.

7. In a browser window, log in to the Admin Console SAML page as an administrator, to upload your exported certificate to Alfresco: `https://localhost:8443/alfresco/service/enterprise/admin/admin-saml`

8. Click **Upload IdP Certificate** to browse to and upload the ADFS certificate you exported in step 6, and click **Save**.

    IdP Certificate Status shows whether the certificate is valid and the expiry date of the current certificate.

    > **Note**: Alfresco Content Services does not allow you to upload an expired certificate.

9. While you are in the Admin Console, click **Download SP Certificate** to download the certificate required by ADFS and **Download SP Metadata** for later use.

10. Add a Relying Party Trust (RPT).

    1. Click A**DFS Management** (**Server Manager > Tools > ADFS Management**), and expand **Trust Relationships**.

    2. Select the **Relying Party Trusts** folder. Right click **Relying Party Trusts** and select **Add Relying Party Trust**.

    3. Click **Start** in the wizard that appears.

    4. In the **Select Data Source** window, select **Enter data about the relying party manually** and click **Next**.

    5. In the **Specify Display Name** window, enter a display name that you'll remember, and any notes that you require. Click **Next**.

    6. In the **Choose Profile** window, click the ADFS profile radio button and click **Next**.

    7. In the **Configure Certificate** window, accept the default certificate settings by clicking **Next**.

    8. In the **Configure URL** window, check **Enable support for the SAML 2.0 WebSSO protocol** box and enter in the **Relying party SAML 2.0 SSO service URL**.

        In your Alfresco metadata, this is the Location value of the AssertionConsumerService element. For example:

        * For Alfresco Share: `https://localhost:8443/share/page/saml-authnresponse`
        * For REST API: `https://localhost:8443/alfresco/service/saml/-default-/rest-api/authenticate-response`
        * For Alfresco Office Services: `https://localhost:8443/alfresco/service/saml/-default-/aos/authenticate-response`

    9. In the **Configure Identifiers** window, enter a relying party trust identifier.

        This value must match the value in the **Entity Identification (Issuer)** field of the Alfresco Admin Console. For example:

        * For Alfresco Share: `https://localhost:8443/share`
        * For REST API: `https://localhost:8443/alfresco`

    10. In the **Configure Multi-factor Authentication Now?** window, click the radio button **I do not want to configure multi-factor authentication settings for this relying party trust at this time** and click Next.

    11. In the **Choose Issuance Authorization Rules** window, click the radio button **Permit all users to access this relying party** and click **Next**.

    12. In the **Ready to Add Trust** window, leave the default settings and click **Next**.

    13. In the **Finish** window, check the check box and click **Close** to exit. The **Edit Claim Rules** editor will open.

11. Create the claim rules.

    > **Note**: If the Edit Claim Rules editor doesn't open after you have created the trust, right click the relying party name that you created in the previous step and select Edit Claim Rule.

    1. In the **Issuance Transform Rules** tab, click **Add Rule** and click **Next**.

    2. In the **Choose Rule Type** window, select **Send LDAP Attributes as Claims** and click **Next**.

    3. In the **Configure Claim Rule** window:

        1. In **Claim rule name**, enter a name for the rule, for example: `LDAP Attributes`.
        2. In **Attribute store**, select **Active Directory**.
        3. In the **Mapping of LDAP attributes to outgoing claim types** table, select **E-Mail Addresses** in the **LDAP Attribute** column and the **Outgoing Claim Type** column.
        4. In the next row, select **SAM-Account-Name** in the **LDAP Attribute** column.
        5. In the next row, select **Name ID** in the **Outgoing Claim Type** column.

            > **Note:** Adding the **Name ID** instructs ADFS to specifically send the SessionIndex with the response. You need the SessionIndex to use Alfresco Single Logout.

    4. Click **Finish** to save the rule and **OK** to complete.

12. Adjust the **Relying Party Trust** settings.

    1. Click A**DFS Management** (**Server Manager > Tools > ADFS Management**), and expand **Trust Relationships**.

    2. Right click the **Relying Party Trust** that you created in step 10 and select **Properties**.

    3. Click the **Advanced** tab, and make sure you select **SHA-256** as the secure hash algorithm. Click **OK**.

    4. Click the **Endpoints** tab, and click **Add SAML** to add a new endpoint.

        1. For **Endpoint** type, select **SAML Logout**.
        2. For **Binding**, select **POST**.
        3. For **Trusted URL**, enter the Alfresco logout request URL. This is the `Location` value in the Alfresco metadata SingleLogoutService element. For example:

            * For Alfresco Share:

                ```xml
                <md:SingleLogoutService
                ...
                Location="https://localhost:8443/share/page/saml-logoutrequest"/>
                ```

            * For REST API:

                ```xml
                <md:SingleLogoutService
                ...
                Location="https://localhost:8443/alfresco/service/saml/-default-/rest-api/logout-request"/>
                ```

            * For Alfresco Office Services:

                ```xml
                <md:SingleLogoutService
                ...
                Location="https://localhost:8443/alfresco/service/saml/-default-/aos/logout-request"/>
                ```

        4. In **Response URL**, enter the Alfresco logout response URL. This is the `ResponseLocation` value in the Alfresco metadata SingleLogoutService element. For example:

            * For Alfresco Share:

                ```xml
                <md:SingleLogoutService 
                ...
                ResponseLocation="https://localhost:8443/share/page/saml-logoutresponse"/>
                ```

            * For REST API:

                ```xml
                <md:SingleLogoutService 
                ...
                ResponseLocation="https://localhost:8443/alfresco/service/saml/-default-/rest-api/logout-response"/>
                ```

            * For Alfresco Office Services:

                ```xml
                <md:SingleLogoutService 
                ...
                ResponseLocation="https://localhost:8443/alfresco/service/saml/-default-/aos/logout-response"/>
                ```

        5. Click **OK**.

    5. Click the **Signature** tab, and **Add** to upload the Alfresco certificate that you downloaded in step 9.

        > **Note:** You may see a warning about the length of a certificate key. You can ignore this message.

    6. Click **OK** to save your changes.

13. Test your setup.

    1. Create a user in the Windows Server Active Directory.

    2. Add an email address for the created user.

        Right click on the user, select Properties, and add the email address that matches your Alfresco instance and Windows server domain. For example, if you have created a user in Alfresco with the username `user1`, ADFS assigns an email address of `user1@example.com`, where `example.com` is the ADFS domain.

    3. Go to `https://adfs.example.com/adfs/ls/idpinitiatedsignon` where `adfs.example.com` is your Federated Service name.

    4. Select the RPT name that you created in step 10 and sign in. You should see confirmation that you are signed in to ADFS.

To troubleshoot ADFS, use the Event Viewer.
