---
author: [Alfresco Documentation, Alfresco Documentation]
source: 
audience: 
category: [Authentication and Security, Authentication, Administration]
keyword: [configuration, Kerberos, Active Directory, authentication]
---

# Configuring Kerberos against Active Directory

This section describes how to set up accounts for use by Alfresco on a Windows domain controller running Active Directory.

In these instructions, it is important to identify each of the servers in your Alfresco cluster that will be running one or both of the Alfresco repository tier \(alfresco.war\) and Alfresco Share \(share.war\) web applications. Please see the [Configuring Share clustering](cluster-share-config.md) topic for supported cluster configurations. These instructions should also apply to simple non-clustered installations, where a single alfresco.war and share.war run on a single host.

We will use the following naming conventions for the example server, server1.alfresco.org:

-   `<host>` is the server host name \(without domain name suffix\). For example, `server1`.
-   `<hostnetbios>` is the resolved value of the `cifs.serverName` property if the server is part of the Active Directory domain \(typically the host name with the letter 'A' appended\) or the host name otherwise \(without domain name suffix\). For example, `server1A`.
-   `<domain>` is the DNS domain. For example, `alfresco.org`.
-   `<domainnetbios>` is the Windows domain NetBIOS name. For example, `alfresco`.
-   `<REALM>` is t he DNS domain in upper case. For example, `ALFRESCO.ORG`.

1.  On the Windows domain controller, create accounts for the Alfresco CIFS service by repeating the following steps for each server in the cluster that will be running the Alfresco repository tier web application \(alfresco.war\):

    1.  In the Active Directory Users and Computers application, navigate to the **Action \> New \> User** menu, then enter the full name as CIFS <host\> and the user login name as cifs<host\>.

    2.  Click **Next**.

    3.  Enter a password.

    4.  Enable **Password never expires** and disable **User must change password at next logon**.

    5.  Click **Next**.

    6.  Click **Finish**.

    7.  Right-click the new user account name, and then select **Properties**.

    8.  Select the **Account** tab and enable the **Do not require Kerberos preauthentication** option in the **Account Options** section.

    9.  From the command prompt, use the `ktpass` utility to generate key tables for this account as shown below:

        ```
        ktpass -princ cifs/<hostnetbios>.<domain>@<REALM> -pass <password> -mapuser 
        <domainnetbios>\cifs<host> -crypto RC4-HMAC-NT -ptype KRB5_NT_PRINCIPAL -out 
        c:\temp\cifs<host>.keytab -kvno 0
        ```

    10. Create the Service Principal Names \(SPN\) for the account using the `setspn` utility.

        ```
        setspn -a cifs/<hostnetbios> cifs<host>
        setspn -a cifs/<hostnetbios>.<domain> cifs<host>
        ```

        **Note:** Remember that `ktpass` may already have added some of these SPNs automatically. You can list the existing SPNs for the account using:

        ```
        setspn -l cifs<host>
        ```

2.  Now, create accounts for the Alfresco SSO authentication filters by repeating the following steps for each server in the cluster that will be running either the Alfresco repository tier web application \(alfresco.war\) or the Share web application \(share.war\).

    1.  In the Active Directory Users and Computers application, navigate to the **Action \> New \> User** menu, then enter the full name as HTTP <host\> and the user login name as http<host\>.

    2.  Click **Next**.

    3.  Enter a password.

    4.  Enable **Password never expires** and disable **User must change password at next logon**.

    5.  Click **Next**.

    6.  Click **Finish**.

    7.  Right-click the new user account name, and then select **Properties**.

    8.  Select the **Account** tab and enable the **Do not require Kerberos preauthentication** option in the **Account Options** section.

    9.  From the command prompt, use the `ktpass` utility to generate key tables for this account as shown below:

        ```
        ktpass -princ HTTP/<host>.<domain>@<REALM> -pass <password> -mapuser 
        <domainnetbios>\http<host> -crypto RC4-HMAC-NT -ptype KRB5_NT_PRINCIPAL -out 
        c:\temp\http<host>.keytab -kvno 0
        ```

    10. Create the Service Principal Names \(SPN\) for the account using the `setspn` utility.

        ```
        setspn -a HTTP/<host> http<host>
        setspn -a HTTP/<host>.<domain> http<host>
        ```

    11. In the Active Directory Users and Computers application, right click on the `http<host>` user and select **Properties**.

    12. Select the **Delegation** tab. If you cannot see the **Delegation** tab, do one or both of the following:

        -   Check that you ran the `setspn` command mentioned above correctly. Delegation is only intended to be used by service accounts, which should have registered SPNs, as opposed to a regular user account which typically does not have SPNs.
        -   Raise the functional level of your domain to Windows Server 2003. To do this:
            -   Open **Active Directory Domains and Trusts**.
            -   In the console tree, right-click the applicable domain and then click **Raise Domain Functional Level**.
            -   In **Select an available domain functional level**, click **Windows Server 2003**, and then click **Raise**.
    13. In the user **Delegation** tab, select the **Trust this user for delegation to any service \(Kerberos only\)** check box.

3.  Copy the key table files created in steps 1 and 2 to the servers they were named after. Copy the files to a protected area, such as C:\\etc\\ or /etc.

4.  Now, on each server in the cluster that will be running either the Alfresco repository tier web application \(alfresco.war\) or the Share web application \(share.war\), repeat the following steps:

    1.  Set up the Kerberos ini file to point to the Windows domain controller.

        The default location is %WINDIR%\\krb5.ini, where %WINDIR% is the location of your Windows directory, for example, C:\\Windows\\krb5.ini. In this example, our Windows domain controller host name is adsrv.alfresco.org.

        ```
        [libdefaults]
        default_realm = ALFRESCO.ORG
        default_tkt_enctypes = rc4-hmac
        default_tgs_enctypes = rc4-hmac
        
        [realms]
        ALFRESCO.ORG = {
           kdc = adsrv.alfresco.org
           admin_server = adsrv.alfresco.org
        }
        
        [domain_realm]
        adsrv.alfresco.org = ALFRESCO.ORG
        .adsrv.alfresco.org = ALFRESCO.ORG
        ```

        **Note:** The realm should be specified in uppercase.

        The Kerberos ini file for Linux is /etc/krb5.conf.

    2.  Set up the Java login configuration file.

        For JBoss 5, open the $JBOSS\_HOME/server/default/conf/login-config.xml file. Add entries such as the following inside the `<policy>` tag. Only include AlfrescoCIFS if the server is to run the Alfresco repository tier application \(alfresco.war\). Only include ShareHTTP if the server is to run the Alfresco Share web application \(share.war\).

        ```
        <application-policy name="Alfresco">
           <authentication>
              <login-module code="com.sun.security.auth.module.Krb5LoginModule" flag="sufficient"/>
           </authentication>
        </application-policy>
        
        <application-policy name="AlfrescoCIFS">
           <authentication>
               <login-module code="com.sun.security.auth.module.Krb5LoginModule" flag="required">
                <module-option name="debug">true</module-option>
                <module-option name="storeKey">true</module-option>
                <module-option name="useKeyTab">true</module-option>
                <module-option name="isInitiator">false</module-option>
                <module-option name="keyTab">C:/etc/cifs<host>.keytab</module-option>
                <module-option name="principal">cifs/<hostnetbios>.domain</module-option>
               </login-module>
           </authentication>
        </application-policy>
        
        <application-policy name="AlfrescoHTTP">
           <authentication>
               <login-module code="com.sun.security.auth.module.Krb5LoginModule" flag="required">
                <module-option name="debug">true</module-option>
                <module-option name="storeKey">true</module-option>
                <module-option name="isInitiator">false</module-option>
                <module-option name="useKeyTab">true</module-option>
                <module-option name="keyTab">C:/etc/http<host>.keytab</module-option>
                <module-option name="principal">HTTP/<host>.<domain></module-option>
               </login-module>
           </authentication>
        </application-policy>
        
        <application-policy name="ShareHTTP">
           <authentication>
              <login-module code="com.sun.security.auth.module.Krb5LoginModule" flag="required">
               <module-option name="debug">true</module-option>
               <module-option name="storeKey">true</module-option>
               <module-option name="isInitiator">false</module-option>
               <module-option name="useKeyTab">true</module-option>
               <module-option name="keyTab">C:/etc/http<host>.keytab</module-option>
               <module-option name="principal">HTTP/<host>.<domain></module-option>
              </login-module>
           </authentication>
        </application-policy>
        ```

        For other environments, in the JRE\\lib\\security folder \(for example, C:/Alfresco/java/jre/lib/ security\), create a file named java.login.config with entries as shown below. Only include AlfrescoCIFS if the server is to run the Alfresco repository tier application \(alfresco.war\). Only include ShareHTTP if the server is to run the Alfresco Share web application \(share.war\).

        **For Windows:**

        ```
        Alfresco {
           com.sun.security.auth.module.Krb5LoginModule sufficient;
        };
        
        AlfrescoCIFS {
           com.sun.security.auth.module.Krb5LoginModule required
           storeKey=true
           useKeyTab=true
           keyTab="C:/etc/cifs<host>.keytab"
           principal="cifs/<hostnetbios>.<domain>";
        };
        
        AlfrescoHTTP
        {
           com.sun.security.auth.module.Krb5LoginModule required
           storeKey=true
           useKeyTab=true
           keyTab="C:/etc/http<host>.keytab"
           principal="HTTP/<host>.<domain>";
        };
        
        ShareHTTP
        {
           com.sun.security.auth.module.Krb5LoginModule required
           storeKey=true
           useKeyTab=true
           keyTab="C:/etc/http<host>.keytab"
           principal="HTTP/<host>.<domain>";
        };
        
        com.sun.net.ssl.client {
           com.sun.security.auth.module.Krb5LoginModule sufficient;
        };
        
        other {
           com.sun.security.auth.module.Krb5LoginModule sufficient;
        };
        ```

    3.  Enable the login configuration file by adding the following line to the main Java security configuration file, usually at JRE\\lib\\security\\java.security.

        ```
        login.config.url.1=file:${java.home}/lib/security/java.login.config
        ```

    4.  If the Alfresco server is not part of the Active Directory domain, ensure that its clock is kept in sync with the domain controller's, for example, by configuring the domain controller as an NTP server.


**Parent topic:**[Configuring Kerberos](../concepts/auth-kerberos-intro.md)

