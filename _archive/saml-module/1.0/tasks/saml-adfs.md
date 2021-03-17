# Configuring AD FS with SAML SSO

Configure your Active Directory Federation Services \(AD FS\) identity provider to work with SAML SSO in Alfresco Content Services.

**Note:** The following steps are example instructions to help you configure AD FS.

Ensure that you have:

-   A working domain on your Windows Server 2012
-   Set up Active Directory
-   Set up users in Active Directory

1.  Perform and run a full LDAP sync. This can be done by restarting Alfresco.

    If a user exists in LDAP and PingFederate, but not in Alfresco Content Services, they will not be able to log in to Alfresco Content Services when SAML SSO is enabled. See [Configuring LDAP \(Active Directory\)](http://docs.alfresco.com/5.1/tasks/adminconsole-directorymgt-ad.html) for more information.

2.  Install AD FS.

    In these example instructions, create a domain name of `example.com` and a Federation Service Name of `adfs.example.com`.

    Test your AD FS installation by accessing these URLs:

    ```
    https://adfs.example.com/adfs/ls/idpinitiatedsignon
    ```

    and

    ```
    https://adfs.example.com/federationmetadata/2007-06/federationmetadata.xml
    ```

    where `adfs.example.com` is your Federation Service Name.

3.  Log in to AD FS as the administrator, and go to Account Settings.

4.  In Idp AuthenticationRequest Service URL, enter the location of the SingleSignOnService element of the AD FS metadata.

    For example:

    ```
    https://adfs.example.com/federationmetadata/2007-06/federationmetadata.xml
    ```

    Alfresco supports the HTTP-POST binding only, so you need only to copy the location of the HTTP-POST services. For example:

    ```
    <SingleSignOnService Location="https://adfs.example.com/adfs/ls/" Binding="urn:oasis:names:tc:SAML:2.0:bindings:HTTP-POST"/>
    ```

5.  In IdP SingleLogoutRequest Service URL and IdP SingleLogoutResponse Service URL, enter the location of the SingleLogoutService element of the AD FS metadata.

    For example:

    ```
    <SingleLogoutService Location="https://adfs.example.com/adfs/ls/" Binding="urn:oasis:names:tc:SAML:2.0:bindings:HTTP-POST"/>
    ```

6.  Export the AD FS certificate:

    1.  Click AD FS Management \(Server Manager \> Tools\), then Service, then Certificates.

    2.  In the Token-signing section, right click the certificate and select View Certificate.

    3.  On the Details tab, click Copy to file and Next.

    4.  Select `DER encoded binary X.509 (.CER)`, and click Next.

    5.  Select where you want to save the file and enter a name for the file. Click Save, Next, and Finish.

7.  In a browser window, log in to the Admin Console SAML SSO page as an administrator, to upload your exported certificate to Alfresco:

    ```
    http://localhost:8443/alfresco/service/enterprise/admin/admin-saml
    ```

    where localhost:8443 is your Alfresco host name and port.

    **Note:** Make sure you configure Alfresco for SSL before configuring SAML.

8.  Click **Upload IdP Certificate** to browse to and upload the AD FS certificate you exported in [step 6](saml-adfs.md#step3), and click Save.

    IdP Certificate Status shows whether the certificate is valid, and IdP Certificate Status shows the expiry date of the current certificate.

    Alfresco does not allow you to upload an expired certificate. If you attempt to do this, you will see an error message.

9.  While you are in the Admin Console, click **Download SP Certificate** to download the certificate required by AD FS, and **Download SP Metadata** as you will need these files later in this task.

10. Add a Relying Party Trust \(RPT\).

    1.  Click AD FS Management \(Server Manager \> Tools \> AD FS Management\), and expand Trust Relationships.

    2.  Select the Relying Party Trusts folder. Right click Relying Party Trusts and select Add Relying Party Trust.

        A configuration wizard starts to configure a new trust.

    3.  Click **Start**.

    4.  In the Select Data Source window, select Enter data about the relying party manually and click Next.

    5.  In the Specify Display Name window, enter a display name that you'll remember, and any notes that you require. Click Next.

    6.  In the Choose Profile window, click the AD FS profile radio button and click Next.

    7.  In the Configure Certificate window, accept the default certificate settings by clicking Next.

    8.  In the Configure URL window, check Enable support for the SAML 2.0 WebSSO protocol box and enter in the Relying party SAML 2.0 SSO service URL.

        In your Alfresco metadata, this is the Location value of the AssertionConsumerService element.

        For example:

        -   **For Share:**

            ```
            https://localhost:8443/share/page/saml-authnresponse
            ```

        -   **For REST API:**

            ```
            https://localhost:8443/alfresco/service/saml/-default-/rest-api/authenticate-response
            ```

        -   **For AOS:**

            ```
            https://localhost:8443/alfresco/service/saml/-default-/aos/authenticate-response
            ```

        Click Next.

    9.  In the Configure Identifiers window, enter a relying party trust identifier.

        This value must match the value in the **Entity Identification \(Issuer\)** field of the Alfresco Admin Console.

        For example:

        -   **For Share:**

            ```
            https://localhost:8443/share
            ```

        -   **For REST API:**

            ```
            https://localhost:8443/alfresco
            ```

        Click **Next**.

    10. In the Configure Multi-factor Authentication Now? window, click the radio button I do not want to configure multi-factor authentication settings for this relying party trust at this time and click Next.

    11. In the Choose Issuance Authorization Rules window, click the radio button Permit all users to access this relying party and click Next.

    12. In the Ready to Add Trust window, leave the default settings and click Next.

    13. In the Finish window, check the check box and click Close to exit.

        The Edit Claim Rules editor opens.

11. Create the claim rules.

    If the Edit Claim Rules editor doesn't open after you have created the trust, right click the relying party name that you created in the previous step and select Edit Claim Rule.

    1.  In the Issuance Transform Rules tab, click **Add Rule** and click Next.

    2.  In the Choose Rule Type window, select Send LDAP Attributes as Claims and click **Next**.

    3.  In the Configure Claim Rule window:

        1.  In Claim rule name, enter a name for the rule; for example, LDAP Attributes.
        2.  In Attribute store, select Active Directory.
        3.  In the Mapping of LDAP attributes to outgoing claim types table, select E-Mail Addresses in the LDAP Attribute column.
        4.  In the Mapping of LDAP attributes to outgoing claim types table, enter E-Mail Addresses in the Outgoing Claim Type column.
        5.  In the next row of the Mapping of LDAP attributes to outgoing claim types table, select SAM-Account-Name in the LDAP Attribute column.
        6.  In the next row of the Mapping of LDAP attributes to outgoing claim types table, select Name ID in the Outgoing Claim Type column.

            **Note:** Adding the Name ID instructs AD FS to specifically send the SessionIndex with the response. You need the SessionIndex to use Alfresco Single Logout \(without this, Alfresco can log you out locally only\).

    4.  Click Finish to save the rule.

    5.  Click OK to complete.

12. Adjust the Relying Party Trust settings.

    1.  Click AD FS Management \(Server Manager \> Tools \> AD FS Management\), and expand Trust Relationships.

    2.  Right click the Relying Party Trust that you created in [step 10](saml-adfs.md#step7), and select Properties.

    3.  Click the Advanced tab, and make sure you select SHA-256 as Secure hash algorithm. Click OK.

    4.  Click the Endpoints tab, and click Add SAML to add a new endpoint.

        1.  In Endpoint type, select SAML Logout.
        2.  In Binding, select POST.
        3.  In Trusted URL, enter the Alfresco logout request URL. This is the Location value in the Alfresco metadata SingleLogoutService element.

            For example:

            -   **For Share:**

                ```
                <md:SingleLogoutService 
                ...
                Location="https://localhost:8443/share/page/saml-logoutrequest"/>
                ```

            -   For **REST API:**

                ```
                <md:SingleLogoutService
                ...
                Location="https://localhost:8443/alfresco/service/saml/-default-/rest-api/logout-request"/>
                ```

            -   For **AOS:**

                ```
                <md:SingleLogoutService
                ...
                Location="https://localhost:8443/alfresco/service/saml/-default-/aos/logout-request"/>
                ```

        4.  In Response URL, enter the Alfresco logout response URL. This is the ResponseLocation value in the Alfresco metadata SingleLogoutService element.

            For example:

            -   **For Share:**

                ```
                <md:SingleLogoutService 
                ...
                ResponseLocation="https://localhost:8443/share/page/saml-logoutresponse"/>
                ```

            -   For **REST API:**

                ```
                <md:SingleLogoutService 
                ...
                ResponseLocation="https://localhost:8443/alfresco/service/saml/-default-/rest-api/logout-response"/>
                ```

            -   For **AOS:**

                ```
                <md:SingleLogoutService 
                ...
                ResponseLocation="https://localhost:8443/alfresco/service/saml/-default-/aos/logout-response"/>
                ```

        5.  Click OK.
    5.  Click the Signature tab, and Add to upload the Alfresco certificate that you downloaded in [step 9](saml-adfs.md#step6).

        **Note:** You might see a warning about the length of a certificate key. You can ignore this message \(click Yes\).

    6.  Click OK to save your changes.

13. Test your setup.

    1.  Create a user in the Windows Server Active Directory.

    2.  Add an email address for the created user.

        Right click on the user, select Properties, and add the email address that matches your Alfresco instance and Windows server domain.

        For example, if you have created a user in Alfresco with the username user1, AD FS assigns an email address of user1@example.com, where example.com is the AD FS domain.

    3.  Go to https://adfs.example.com/adfs/ls/idpinitiatedsignon where `adfs.example.com` is your Federated Service Name.

    4.  Select the RPT name that you created in [step 10](saml-adfs.md#step7), and sign in.

        You should see confirmation that you are signed in to AD FS. See [Authenticating users with SAML SSO for Share](saml-testing.md) for more information about testing your SAML SSO settings.

14. For troubleshooting AD FS, see the AD FS logs in Event Viewer.

    1.  From the Start screen, enter Event Viewer.

    2.  Expand Applications and Services Logs and AD FS, and click Admin.

    3.  In the Filter Current Log dialog box, for Event level, verify that that the following check boxes are selected: Warning, Information, and Error.


**Parent topic:**[Step 1. Configuring the identity provider](../concepts/config-IdP.md)

