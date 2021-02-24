---
author: [Alfresco Documentation, Alfresco Documentation]
audience: 
category: [Authentication and Security, Authentication, Administration]
keyword: [configuration, Kerberos, Active Directory, authentication]
---

# Configuring Kerberos against Active Directory

You can set up accounts for use by Alfresco on a Windows domain controller running Active Directory.

It is important to identify each of the servers in your Alfresco cluster that will be running one or both of the Alfresco repository tier \(alfresco.war\) and Alfresco Share \(share.war\) web applications. See [Configuring Share clustering](cluster-share-config.md) for supported cluster configurations. These instructions also apply to simple non-clustered installations, where a single alfresco.war and share.war run on a single host.

**Note:** When configuring Kerberos on a cluster through a load balancer, use the proxy name as the Service Principal Names \(SPN\).

These instructions use the following naming conventions for the example server, server1.alfresco.org:

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

2.  Create accounts for the Alfresco SSO authentication filters by repeating the following steps for each server in the cluster that will be running either the Alfresco repository tier web application \(alfresco.war\) or the Share web application \(share.war\).

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

3.  Copy the key table files created in steps 1 and 2 to the servers they were named after. Copy the files to a protected area, such as C:\\etc\\ or /etc.

4.  On each server in the cluster that will be running either the Alfresco repository tier web application \(alfresco.war\) or the Share web application \(share.war\), repeat the following steps:

    1.  Set up the Kerberos ini file to point to the Windows domain controller.

        The default location is %WINDIR%\\krb5.ini, where %WINDIR% is the location of your Windows directory, for example, C:\\Windows\\krb5.ini. If the file does not already exist \(for example, if the Kerberos libraries are not installed on the target server\), you must copy these over or create them from scratch. See [Kerberos Help](http://web.mit.edu/kerberos/krb5-1.12/doc/admin/conf_files/krb5_conf.html) for more information on the `krb5.conf` file. In this example, our Windows domain controller host name is adsrv.alfresco.org.

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

        **Note:** Specify the realm in uppercase.

        The Kerberos ini file for Linux is /etc/krb5.conf.

    2.  Set up the Java login configuration file.

        For JBoss, open the $JBOSS\_HOME/standalone/configuration/standalone.xml file.

        In the `<subsystem xmlns="urn:jboss:domain:security:1.2">` section, add the following:

        ```
        <security-domain name="alfresco" cache-type="default">  
            <authentication>  
                  <login-module code="com.sun.security.auth.module.Krb5LoginModule" flag="sufficient"/>  
            </authentication>  
        </security-domain> 
        ```

        Add the following security-domain sections:

        ```
        <security-domain name="AlfrescoCIFS" cache-type="default">
        	<authentication>
        			<login-module code="com.sun.security.auth.module.Krb5LoginModule" flag="required">
        			   <module-option name="debug" value="true"/>
        			   <module-option name="storeKey" value="true"/>
        			   <module-option name="useKeyTab" value="true"/>
        			   <module-option name="doNotPrompt" value="true"/>
        			   <module-option name="isInitiator" value="false"/>
        			   <module-option name="keyTab" value="C:/etc/cifs<host>.keytab"/>
        			   <module-option name="principal" value="cifs/<hostnetbios>.domain"/>
        			</login-module>
        	</authentication>
        </security-domain>
        <security-domain name="AlfrescoHTTP" cache-type="default">
        	<authentication>
        			<login-module code="com.sun.security.auth.module.Krb5LoginModule" flag="required">
        			   <module-option name="debug" value="true"/>
        			   <module-option name="storeKey" value="true"/>
        			   <module-option name="useKeyTab" value="true"/>
        			   <module-option name="doNotPrompt" value="true"/>
        			   <module-option name="isInitiator" value="false"/>
        			   <module-option name="keyTab" value="C:/etc/http<host>.keytab"/>
        			   <module-option name="principal" value="HTTP/<host>.<domain>"/>
        			</login-module>
        	</authentication>
        </security-domain>
        <security-domain name="ShareHTTP" cache-type="default">
        	<authentication>
        			<login-module code="com.sun.security.auth.module.Krb5LoginModule" flag="required">
        			   <module-option name="debug" value="true"/>
        			   <module-option name="storeKey" value="true"/>
        			   <module-option name="useKeyTab" value="true"/>
        			   <module-option name="doNotPrompt" value="true"/>
        			   <module-option name="isInitiator" value="false"/>
        			   <module-option name="keyTab" value="C:/etc/http<host>.keytab"/>
        			   <module-option name="principal" value="HTTP/<host>.<domain>"/>
        			</login-module>
        	</authentication>
        </security-domain>
        ```

        Only include `AlfrescoCIFS` if the server is to run the Alfresco repository tier application \(alfresco.war\). Only include `ShareHTTP` if the server is to run the Alfresco Share web application \(share.war\).

        For other environments, in the Java security folder \(for example, C:/Alfresco/java/lib/security\), create a file named java.login.config with entries as shown below. Only include AlfrescoCIFS if the server is to run the Alfresco repository tier application \(alfresco.war\). Only include ShareHTTP if the server is to run the Alfresco Share web application \(share.war\).

        ```
        Alfresco {
           com.sun.security.auth.module.Krb5LoginModule sufficient;
        };
        
        AlfrescoCIFS {
           com.sun.security.auth.module.Krb5LoginModule required
           storeKey=true
           useKeyTab=true
           doNotPrompt=true
           keyTab="C:/etc/cifs<host>.keytab"
           principal="cifs/<hostnetbios>.<domain>";
        };
        
        AlfrescoHTTP
        {
           com.sun.security.auth.module.Krb5LoginModule required
           storeKey=true
           useKeyTab=true
           doNotPrompt=true
           keyTab="C:/etc/http<host>.keytab"
           principal="HTTP/<host>.<domain>";
        };
        
        ShareHTTP
        {
           com.sun.security.auth.module.Krb5LoginModule required
           storeKey=true
           useKeyTab=true
           doNotPrompt=true
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

    3.  Enable the login configuration file by adding the following line to the main Java security configuration file, usually at java\\lib\\security\\java.security.

        ```
        login.config.url.1=file:${java.home}/lib/security/java.login.config
        ```

    4.  If the Alfresco server is not part of the Active Directory domain, ensure that its clock is kept in sync with the domain controller's, for example, by configuring the domain controller as an NTP server.


**Parent topic:**[Configuring Kerberos](../concepts/auth-kerberos-intro.md)

