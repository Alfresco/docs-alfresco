---
author: [Alfresco Documentation, Alfresco Documentation]
---

# Step 1. Configuring Kerberos with Active Directory

You can set up accounts for use by Alfresco Content Services on a Windows domain controller running Active Directory.

These instructions also apply to simple non-clustered installations, where a single alfresco.war and share.war run on a single host.

These instructions use the following naming conventions for the example server, server1.alfresco.org:

-   `<host>` is the server host name \(without domain name suffix\). For example, `server1`.
-   `<hostnetbios>` is the resolved value of the `cifs.serverName` property if the server is part of the Active Directory domain \(typically the host name with the letter 'A' appended\) or the host name otherwise \(without domain name suffix\). For example, `server1A`.
-   `<domain>` is the DNS domain. For example, `alfresco.org`.
-   `<domainnetbios>` is the Windows domain NetBIOS name. For example, `alfresco`.
-   `<REALM>` is t he DNS domain in upper case. For example, `ALFRESCO.ORG`.

Follow these instructions to configure Kerberos with Microsoft Windows Active Directory:

1.  On the Windows domain controller, create accounts for the CIFS service for the server that will run the repository tier web application \(alfresco.war\).

    1.  In the Active Directory Users and Computers application, navigate to the **Action \> New \> User** menu, then enter the full name as CIFS <host\> and the user login name as cifs<host\>.

    2.  Click **Next**.

    3.  Enter a password.

    4.  Enable **Password never expires** and disable **User must change password at next logon**.

    5.  Click **Next**.

    6.  Click **Finish**.

    7.  Right-click the new user account name, and then select **Properties**.

    8.  Select the **Account** tab and enable the **Do not require Kerberos preauthentication** option in the **Account Options** section.

    9.  From the command prompt, use the `ktpass` utility to generate key tables for this account as shown:

        ```
        ktpass -princ cifs/<hostnetbios>.<domain>@<REALM> -pass <password> -mapuser 
        <domainnetbios>\cifs<host> -crypto all -ptype KRB5_NT_PRINCIPAL -out 
        c:\temp\cifs<host>.keytab -kvno 0
        ```

    10. Create the Service Principal Names \(SPN\) for the account using the `setspn` utility.

        ```
        setspn -a cifs/<hostnetbios> cifs<host>
        setspn -a cifs/<hostnetbios>.<domain> cifs<host>
        ```

        **Note:** Remember that `ktpass` might already have added some of these SPNs automatically. You can list the existing SPNs for the account using:

        ```
        setspn -l cifs<host>
        ```

2.  Create accounts for the SSO authentication filters for the server that will run either the repository tier web application \(alfresco.war\) or the Share web application \(share.war\).

    1.  In the Active Directory Users and Computers application, navigate to the **Action \> New \> User** menu, then enter the full name as HTTP <host\> and the user log in name as http<host\>.

    2.  Click **Next**.

    3.  Enter a password.

    4.  Enable **Password never expires** and disable **User must change password at next logon**.

    5.  Click **Next**.

    6.  Click **Finish**.

    7.  Right-click the new user account name, and then select **Properties**.

    8.  Select the **Account** tab and enable the **Do not require Kerberos preauthentication** option in the **Account Options** section.

    9.  From the command prompt, use the `ktpass` utility to generate key tables for this account as shown:

        ```
        ktpass -princ HTTP/<host>.<domain>@<REALM> -pass <password> -mapuser 
        <domainnetbios>\http<host> -crypto all -ptype KRB5_NT_PRINCIPAL -out 
        c:\temp\http<host>.keytab -kvno 0
        ```

    10. Create the Service Principal Names \(SPN\) for the account using the `setspn` utility.

        ```
        setspn -a HTTP/<host> http<host>
        setspn -a HTTP/<host>.<domain> http<host>
        ```

    11. In the Active Directory Users and Computers application, right click on the `http<host>` user and select **Properties**.

    12. Select the **Delegation** tab. If you cannot see the **Delegation** tab, do one or both of the following:

        -   Check that you ran the specified `setspn` command correctly. Delegation is only intended to be used by service accounts, which should have registered SPNs, as opposed to a regular user account which typically does not have SPNs.
        -   Raise the functional level of your domain to Windows Server 2012 R2 x64. To do this:
            -   Open **Active Directory Domains and Trusts**.
            -   In the console tree, right-click the applicable domain and then click **Raise Domain Functional Level**.
            -   In **Select an available domain functional level**, click **Windows Server 2012**, and then click **Raise**.
    13. In the user **Delegation** tab, select the **Trust this user for delegation to any service \(Kerberos only\)** check box.

3.  Copy the key table files created in [steps 1](kerberos-AD-config.md#1) and [2](kerberos-AD-config.md#2) to the servers they were named after. Copy the files to a protected area, such as C:\\etc\\ or /etc.


**Parent topic:**[Enabling Kerberos authentication](../tasks/auth-kerberos-ADconfig.md)

