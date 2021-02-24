---
author: Alfresco Documentation
source: 
---

# Creating PingFederate users in a development environment

This task explains how to create users in PingFederate for a test setup.

For a production environment, see the guidance in the PingFederate documentation on other options, including configuring an LDAP connection: [LDAP Configuration](https://documentation.pingidentity.com/display/PF66/Configuring+an+LDAP+Connection#ConfiguringanLDAPConnection-1386638).

1.  Perform and run a full LDAP sync. This can be done by restarting Alfresco.

    If a user exists in LDAP and PingFederate, but not in Alfresco, they will not be able to log in to Alfresco when SAML SSO is enabled. See [Configuring LDAP \(Active Directory\)](http://docs.alfresco.com/5.1/tasks/adminconsole-directorymgt-ad.html) for more information.

2.  Stop the PingFederate server.

3.  Add a section at the end of this file: root/pingfederate-7.3.0/pingfederate/server/default/deploy/quickstart-app-idp.war/WEB-INF/classes/users.xml, above the </users\> closing tag.

    The format expected is as follows for each Alfresco user:

    ```
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

    Ensure you choose a non-trivial password for each user, and that the details match the user in Alfresco.

    To export user information from Alfresco, use the [Repository REST API](http://docs.alfresco.com/5.0/references/RESTful-PersonPeopleGet.html).

4.  Restart the PingFederate server.

    The new users are loaded and visible in the menu when you next go to your IdP logon page. You can check the PingFederate server.log for more information.


**Parent topic:**[Configuring PingFederate manually](../tasks/saml-pingfederate.md)

