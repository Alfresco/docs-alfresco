---
author: [Alfresco Documentation, Alfresco Documentation]
audience: 
category: [Authentication and Security, Authentication, Administration]
keyword: [configuration, Kerberos, authentication, cross-domain, Active Directory]
---

# Configuring cross-domain support for Kerberos

Use this information to configure Kerberos authentication in a multi-domain environment.

In this task, we will prepare Active Directory Domain Services, configure SSO, and configure cross-domain support for Kerberos SSO.

1.  Install Active Directory Domain Services.

    1.  Log in to your Windows server and start the Server Manager.

    2.  In the Server Manager menu, click Roles \> Add Roles, and Next.

    3.  In the Add Roles wizard, select the Active Directory Domain Services role.

    4.  Click **Add Required Features** when prompted.

    5.  Click **Install** to complete the installation, and **Close**.

2.  Configure Active Directory Domain Services.

    1.  In the Server Manager menu, click Roles \> Active Directory Domain Services, and click the link to start the Active Directory Domain Services Installation Wizard, and click **Next**.

    2.  On the Choose a Deployment Configuration window, click Create a new domain in the forest, and click **Next**.

    3.  Type your domain name in the Name the Forest Root Domain window.

    4.  In the Set Forest Functional Level window, choose the oldest operating system that you support in your network.

    5.  In the Additional Domain Controller Options window, ensure that DNS server checked.

    6.  Specify folders to contain the Active Directory controller database, log files, and SYSVOL, and click **Next**.

    7.  Choose a password for the Restore Mode Administrator account.

        This is an additional account \(separate from the Domain Administrator\) that is used for recovery.

    8.  Check Reboot on completion on the last window of the wizard.

    Your first Active Directory server is now installed and configured with a DNS server. Repeat [step 1](auth-kerberos-cross-domain.md#step1) and [step 2](auth-kerberos-cross-domain.md#step2) to install and configure your second Active Directory server.

3.  Install and configure Alfresco with Kerberos SSO.

    Follow the steps in [Configuring Share Kerberos SSO](auth-kerberos-shareSSO.md) to set this up.

4.  Configure cross-domain support by assigning a conditional forwarder for a domain name.

    1.  On your Windows server, open the DNS Manager \(Start \> Administrative Tools \> DNS\).

    2.  In the DNS Manager menu, select your DNS server and expand it to see a number of folders.

    3.  Click the Conditional Forwarders folder.

    4.  From the DNS Manager menu, click Action \> New Conditional Forwarder, and the New Conditional Forwarder appears.

    5.  In the DNS domain field, type the fully qualified domain name \(FQDN\) that you want to use to forward queries.

    6.  Click the IP address of the master servers table and type the IP address of the server that you want to use to forward queries for the specified DNS domain, and click **OK**.

    7.  Restart your network adapter.

    Your first Active Directory server now has a conditional forwarder assigned for a domain name. Repeat this step to set up a conditional forwarder on your second Active Directory server.

5.  Configure cross-domain support by creating a two-way forest trust between the Active Directory servers.

    1.  On your Windows server, open Active Directory Domains and Trusts \(Start \> Administrative Tools \> Active Directory Domains and Trusts\).

    2.  In the Active Directory Domains and Trusts menu, right-click the domain that you want to administer and click Properties.

    3.  From the Properties window, select the Trusts tab and click **New Trust**. The Trust wizard starts. Click **Next**.

    4.  In the Trust Name window, type the Domain Name System \(DNS\) name, or NetBIOS name of the domain, and click **Next**.

    5.  In the Trust Type window, select Forest trust, and click **Next**.

    6.  In the Direction of Trust window, select Two-way, and click **Next**.

    7.  In the Sides of Trust window, select Both this domain and the specified domain, and click **Next**.

    8.  In the User Name and Password window, enter Administrator credentials for the trusted domain, and click **Next**.

    9.  In the Outgoing Trust Authentication Level-Local Forest window, select Forest-wide authentication, and click **Next**.

    10. In the Outgoing Trust Authentication Level-Specified Forest window, select Forest-wide authentication, and click **Next**.

    11. In the Trust Selection Complete window, click **Next**.

    12. In the Trust Creation Complete window, click **Next**.

    13. In the Confirm Outgoing Trust window, select **Yes, confirm the outgoing trust**, and click **Next**.

    14. In the Confirm Incoming Trust window, select **Yes, confirm the incoming trust**, and click **Next**, and click **Finish**.

    You can now log into Alfresco from the first trusted domain using Kerberos SSO, but not from the second domain.

6.  Add realm information for the trusted domain into your `krb5.ini` file:

    In the `[realms]` section, where `domain2.local` is the name of your second trusted domain:

    ```
    [realms]
    ...
    DOMAIN2.LOCAL = {     
    kdc = ad2.domain2.local:88     
    admin_server = ad2.domain2.local:749     
    default_domain = domain2.local    
    }       
    
    ```

    and in the `[domain_realm]` section:

    ```
    
    [domain_realm]    
    ... 
    .domain2.local = DOMAIN2.LOCAL    
    domain2.local = DOMAIN2.LOCAL       
    
    ```

7.  Restart the Alfresco server.

    When the server has restarted, check that you can access Alfresco Share from both domains.


**Parent topic:**[Configuring Kerberos](../concepts/auth-kerberos-intro.md)

