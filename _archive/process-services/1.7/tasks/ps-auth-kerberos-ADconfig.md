---
author: Alfresco Documentation
---

# Configuring Kerberos against Active Directory \(AD\)

Process Services support for Kerberos SSO allows customers with existing Kerberos AD infrastructure to quickly and easily set up windows-based SSO for their users’ access. It’s established as a security standard in many organizations and does not require additional infrastructure. It allows users secure access to the Process Services app \(`activiti-app`\) without explicit login through a web browser.

You must first set up accounts for use on a Microsoft Active Directory domain controller. It is important to identify each of the servers in your cluster that will be running the Process Services \(activiti-app.war\) web application. These instructions also apply to simple non-clustered installations, where a single activiti-app.war runs on a single host.

These instructions use the following naming conventions for the example server, server1.alfresco.org:

-   `<host>` is the server host name \(without domain name suffix\). For example, `server1`.
-   `<hostnetbios>` is the resolved value of the `cifs.serverName` property if the server is part of the Active Directory domain \(typically the host name with the letter 'A' appended\) or the host name otherwise \(without domain name suffix\). For example, `server1A`.
-   `<domain>` is the DNS domain. For example, `alfresco.org`.
-   `<domainnetbios>` is the Windows domain NetBIOS name. For example, `alfresco`.
-   `<REALM>` is t he DNS domain in upper case. For example, `ALFRESCO.ORG`.

**Prerequisites**

You must ensure that you have configured LDAP \(LDAP synchronization in particular\). You can use Kerberos SSO in combination with LDAP authentication and also database authentication. You can use both of these as fallback scenarios in the case that the user's browser does not support Kerberos authentication.

Kerberos SSO configuration can be divided into three parts:

-   \(1\) Steps to configure Active Directory and performed by an Administrator against the domain controllers
-   \(2\) Steps to configure the machine where Alfresco Process Services is hosted \(for example, creating the krb5.ini file\)
-   \(3\) Steps to set configuration properties

1.  Create accounts for the SSO authentication filters by repeating the following steps for each server in the cluster that will be running the APS web application \(activiti-app.war\).

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

        **Note:** When configuring Kerberos on a cluster through a load balancer, use the proxy name as the Service Principal Names \(SPN\).

    11. In the Active Directory Users and Computers application, right click on the `http<host>` user and select **Properties**.

    12. Select the **Delegation** tab. If you cannot see the **Delegation** tab, do one or both of the following:

        -   Check that you ran the specified `setspn` command correctly. Delegation is only intended to be used by service accounts, which should have registered SPNs, as opposed to a regular user account which typically does not have SPNs.
        -   Raise the functional level of your domain to Windows Server 2012 R2 x64. To do this:
            -   Open **Active Directory Domains and Trusts**.
            -   In the console tree, right-click the applicable domain and then click **Raise Domain Functional Level**.
            -   In **Select an available domain functional level**, click **Windows Server 2012**, and then click **Raise**.
    13. In the user **Delegation** tab, select the **Trust this user for delegation to any service \(Kerberos only\)** check box.

    Copy the key table files created in steps 1 and 2 to the servers they were named after. Copy the files to a protected area, such as C:\\etc\\ or /etc.

2.  On each server in the cluster that will be running the APS web application \(activiti-app.war\), repeat the following steps:

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
        ```

        For other environments, in the Java security folder \(for example, C:/Alfresco/java/lib/security\), create a file named java.login.config with entries as shown below.

        ```
        Alfresco {
           com.sun.security.auth.module.Krb5LoginModule sufficient;
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

    4.  If the Alfresco Process Services server is not part of the Active Directory domain, ensure that its clock is kept in sync with the domain controller's, for example, by configuring the domain controller as an NTP server.

3.  To complete Kerberos SSO enablement, perform the following configuration steps after completing the actions described in step 1 and step 2 above:

    **Note:** Use the same server as that used in part 2 of Kereberos SSO configuration to carry out these steps.

    1.  Open the <InstallLocation\>/tomcat/lib/activiti-ldap.properties file.

        **Note:** You will need to create this file if it does not already exist.

    2.  Specify the configuration settings listed in the table below.

    |Property name|Description|Default value|
    |-------------|-----------|-------------|
    |`kerberos.authentication.enabled`|A switch for activating functionality for Kerberos SSO authentication. This applies to both the APS user interface and the REST API.|`FALSE`|
    |`kerberos.authentication.principal`|The Service Principal Name \(SPN\). For example, `HTTP/alfresco.test.activiti.local`.|None|
    |`kerberos.authentication.keytab`|The file system path to the key table file. For example, `C:/alfresco-one/alfrescohttp.keytab`.|None|
    |`kerberos.authentication.krb5.conf`|The file system path to the local server. For example, `C:/Windows/krb5.ini`.|None|
    |`kerberos.allow.ldap.authentication.fallback`|Determines whether to allow login for unsupported client browsers using LDAP credentials.|`FALSE`|
    |`kerberos.allow.database.authentication.fallback`|Determines whether to allow login for unsupported client browsers using database credentials.|`FALSE`|
    |`kerberos.allow.samAccountName.authentication`|Authentication of the user id using the short form \(for example username instead of username@domain.com\).|`FALSE`|
    |`security.authentication.use-externalid`|A setting that enables the use of Kerberos authentication.|`FALSE`|


**Parent topic:**[Configuring Alfresco Process Services](../topics/administration_application_config.md)

