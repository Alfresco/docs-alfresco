---
title: Troubleshoot the SAML Module
---

Use this information to troubleshoot common SAML issues.

## General troubleshooting tips

Check the IdP server logs for more information.

Check the Alfresco log files. Watch the following packages:

For repository errors:

* `org.alfresco.repo.security.authentication.saml`
* `org.alfresco.repo.web.scripts.saml`

For service provider errors:

* `org.alfresco.web.auth.saml`
* `org.alfresco.web.scripts.saml`
* `org.alfresco.web.site.servlet.saml`

> **Note:** SAML logging is set to INFO by default. You can increase SAML logging in your SAML `log4j.properties` file.

Check the IdP URLs in Alfresco for SSO and SLO match the information provided by your identity provider.

Check the IdP certificate matches the path you have specified in Alfresco, and is valid.

In the IdP, check that you have created a valid user, with a valid email address.

## Troubleshooting REST API and AOS service providers

1. Open the following URL:

    * For REST API: `/alfresco/service/saml/-default-/rest-api/authenticate`

    * For AOS: `/alfresco/service/saml/-default-/aos/authenticate`

2. Check that you are redirected to your IdP.
3. If not, check the IdP SSO URL in the AOS SP config on the Admin Console.
4. Check that the IdP accepts this authentication request. If not (error message in the IdP), check that the IdP certificate and the entity identifier are valid in the AOS SP configuration on the Admin Console.
5. Check the log of your IdP.
6. Log in to your IdP.
7. Check that you are redirected back to `/alfresco/service/saml/-default-/rest-api/authenticate-response` for REST API and `/alfresco/service/saml/-default-/aos/authenticate-response` for AOS. If not, check the configuration of your IdP. It is possible that you may need to configure a return URL for this connection.

Some IdPs will require to specify the format of the data in the URL used. For example:

* For REST AP SP: `http:/localhost:8080/alfresco/service/saml/-default-/rest-api/authenticate-response?format=json`
* For AOS SP: `http:/localhost:8080/alfresco/service/saml/-default-/aos/authenticate-response?format=html`

## Unable to log in to service provider

Check the IdP certificate expiry date.

Ensure that you are using a valid IdP certificate.

If a user exists in the IdP but can't log on to the service provider, then the administrator should check that the user has an email address configured in the IdP.

> **Note:** If you are an Alfresco Administrator with username, **admin**, and you are using Alfresco Share as your service provider, and you need to perform some emergency Share activities, but you can't log in, you can use this URL to bypass SAML-enabled Share: `http://localhost:8080/share/page/?useIdp=false` where `localhost:8080` is your Alfresco host name and port.

If you are using ADFS with Windows 2000 or earlier, Windows requires that special characters are replaced (commonly with an underscore) in the `sAMAccountName`. As a result, either set up Alfresco users with user names that match the `sAMAccountName` or use a different value in the `saml.sp.user.mapping.id` setting.

## SAML information not appearing in the Alfresco Admin Console

If you can't see the SAML page in the Admin Console, it might be that the updated `alfresco.war` has not been deployed.

1. Stop Alfresco.
2. Delete the `tomcat/webapps/alfresco` and `tomcat/webapps/share` folders in the Alfresco installation directory. This forces the `alfresco.war` and `share.war` files to be exploded when Alfresco restarts.
3. Restart Alfresco.
4. Check the Admin Console for the SAML page.

## SAML enabled error messages

* "SAML is enabled but the IdP SSO request URL is invalid"
* "SAML is enabled but the IdP SLO request URL is invalid"
* "SAML is enabled but the IdP SLO response URL is invalid"

Check that you have specified the correct URLs in the SAML IdP settings section in the Admin Console. For example, that you have not entered `https://your-idp-hostname:your-idp-port/idp/SSO.saml2` instead of `https://your-idp-hostname:your-idp-port/idp/SLO.saml2` in the **IdP Single Logout Request Service URL** field.

## IdP request URLs invalid error messages

* "IdP SSO request URL is invalid"
* "IdP SLO request URL is invalid"
* "IdP SLO response URL is invalid"

Check that you have specified the correct URLs in the SAML IdP settings section in the Admin Console. For example, that you have not entered `https://your-idp-hostname:your-idp-port/idp/SSO.saml2` instead of `https://your-idp-hostname:your-idp-port/idp/SLO.saml2` in the **IdP Single Logout Request Service URL** field.

## Certificate invalid error messages

* "SAML is enabled but the IdP certificate path is invalid"
* "IdP certificate path is invalid"

Check that you have specified the correct path to the IdP certificate, or whether the IdP certificate has moved.

## Service provider error messages

* "SAML is enabled but the SP issuer is invalid"
* "SP issuer is invalid"

Check if the issuer property is empty, or contains one of these characters: `"${}"`

## Unsuccessful login error message

* "Your login to Alfresco was unsuccessful."

Check that the user logging on has been set up with an account in both Alfresco and the IdP. If the user doesn't have an account, they can't log in. If you are using LDAP synchronization, check your settings to ensure that the user is created before attempting to log in.

## Error message when trying to log out from the service provider

If you are using AD FS as an IdP, and you log out locally from the IdP, you will get an error message when you attempt to log out from the service provider.

To avoid the error, do not locally sign out from ADFS. Alternatively, on your ADFS page, click the Sign in to one of the following sites option, and choose the URL that relates to your service provider setup. Then you can log out from the service provider successfully.

## Error after redeploying or updating the SAML AMP

After redeploying the SAML AMP, you may get an error during login or logout initiated with SAML. For example, after a SAML version update, you may need to re-upload the IdP certificate using the Admin Console and also upload a new SAML SP certificate inside of your IdP.

Using the Admin Console, check that all the service provider properties are correct.

## Error message if boolean properties have an invalid value

If you enter an incorrect value for a boolean property from JMX using JConsole, you will get a **Startup of 'Search' subsystem, ID: [Search, managed, noindex] failed** error message in the IdP server log.

To resolve this error, use the `revert` method under `SAML/<service_provider>/Operations`.

## Other tips and information

* Depending on the configuration requirements of your application, you can replace all the REST API service provider IDs in the calls to the SAML authentication dance with the value of any other repository type service provider defined in Alfresco.

* If your organization uses SAML to authenticate with (custom) applications other than Share, make sure that the SAML web scripts in the repository side are accessible by all the clients that need access to them.

* It may help you with the configuration of your IdP if you know that you can download the metadata for any of the service provider configured in Alfresco. Go to `http://localhost:8080/alfresco/s/enterprise/admin/admin-saml`, select the tab that you want (for example, REST API), and select **Download SP Metadata**.

* When using the SAML Module, you cannot have an empty authentication chain, as shown:

    ```bash
    authentication.chain=
    ```
