---
title: Kerberos
---

The configuration for Kerberos authentication will allow users to access Alfresco products by entering their credentials only once when logging into their Windows environment.

The following diagram illustrates the components and authentication flow for a Kerberos setup:

![Kerberos authentication diagram]({% link identity-service/images/1-5-kerberos.png %})

## Prerequisites

The following are the prerequisites needed to configure SSO with Kerberos:

* A Kerberos Key Distribution Center (KDC).
* An instance of Active Directory.
* Administrator access to all systems.

## Configuration

There are five steps to configuring SSO using Kerberos with Alfresco products. The following are the host names used as examples throughout the configuration:

* Alfresco Content Services: `repo.example.com`
* Alfresco Share: `share.example.com`
* Alfresco Digital Workspace: `adw.example.com`
* Alfresco Process Services: `aps.example.com`
* Active Directory: `ldap.example.com`
* Load Balancer: `alfresco.example.com`

> **Note:** If using a containerized deployment there are [several amendments and additions](#optional-containerized-deployment) required for certain steps.

## Step 1: Configure Kerberos files

A user account and `keytab` file is required for Alfresco Content Services (ACS), Alfresco Share and Alfresco Process Services (APS) and a `krb5.conf` file that details the location of the authentication server needs to be located on each server. The files can be configured against a load balancer.

The following table explains the values used to generate the `keytab` and `krb5.conf` files:

| Variable | Description |
| -------- | ----------- |
| host | A server host or load balancer name without a domain suffix, for example `alfresco` |
| domain| The Domain Name System (DNS) domain, for example `example.com` |
| domainnetbios | The Windows domain NetBIOS name, for example `example` |
| REALM | The DNS domain in uppercase, for example `EXAMPLE.COM` |

1. Create a user account in Active Directory for the SSO authentication filters:
    * Enter a full name such as `HTTP alfresco`.
    * Enter a login name such as `httpalfresco`.
    * Enable the setting **Do not require Kerberos pre-authentication**.
2. Use the `ktpass` command to generate a key table for the user account created in the previous step:

    ```bash
    ktpass -princ HTTP/<host>.<domain>@<REALM> -pass <password> -mapuser
    <domainnetbios>\http<host> -crypto all -ptype KRB5_NT_PRINCIPAL -out
    c:\temp\http<host>.keytab -kvno 0
    ```

    For example:

    ```bash
    ktpass -princ HTTP/alfresco.example.com@EXAMPLE.COM -pass <password> -mapuser
    example\httpalfresco -crypto all -ptype KRB5_NT_PRINCIPAL -out
    c:\temp\httpalfresco.keytab -kvno 0
    ```

3. Use the `setspn` command to create Service Principal Names (SPN) for the user account created in the first step:

    ```bash
    setspn -a HTTP/<host> http<host>
    setspn -a HTTP/<host>.<domain> http<host>
    ```

    For example:

    ```bash
    setspn -a HTTP/alfresco httpalfresco
    setspn -a HTTP/alfresco.example.com httpalfresco
    ```

4. In the **Delegation** tab of the **Properties** of the user account created in the first step, tick the **Trust this user for delegation to any service (Kerberos only)** checkbox.
5. Copy the key table file created to a protected area on each server such as `C:\etc`.

    > **Note:** The servers to copy the key table file to are Alfresco Content Services, Alfresco Share and Alfresco Process Services.

6. Configure a `krb5.conf` file that contains details of the authentication server:

    ```bash
    [libdefaults]
    default_realm = <REALM>
    default_tkt_enctypes = rc4-hmac
    default_tgs_enctypes = rc4-hmac

    [realms]
    <REALM> = {
            kdc = <host>.<domain>
            admin_server = <host>.<domain>
              }

    [domain_realm]
    <host>.<domain> = <REALM>
    .<host>.<domain> = <REALM>
    ```

    The following is an example `krb5.conf` file:

    ```bash
    [libdefaults]
    default_realm = EXAMPLE.COM
    default_tkt_enctypes = rc4-hmac
    default_tgs_enctypes = rc4-hmac

    [realms]
    EXAMPLE.COM = {
                kdc = ldap.example.com
                admin_server = ldap.example.com
                  }

    [domain_realm]
    ldap.example.com = EXAMPLE.COM
    .ldap.example.com = EXAMPLE.COM
    ```

7. Copy the `krb5.conf` file to the servers running Alfresco Content Services, Alfresco Share and Alfresco Process Services. By default it is located in `$WINDIR\krb5.conf` where `$WINDIR` is the location of the Windows directory such as `C:\Windows\krb5.conf`.

## Step 2: Configure Alfresco Content Services (ACS)

The Java login files need to be updated with details of the Kerberos configuration and the `alfresco-global.properties` updated to enable SSO using Kerberos.

1. Configure or create the Java configuration file `java.login.config` located in `/java/conf/security`. The following is an example of a `java.login.config` file. The important properties to set are `keyTab` and `principal`.

    * `keyTab` is the location of the [`keytab` file](#step-1-configure-kerberos-files) copied to the ACS server
    * `principal` is in the format `HTTP/<host>.<domain>`

    ```bash
    Alfresco {
      com.sun.security.auth.module.Krb5LoginModule sufficient;
    };

    AlfrescoHTTP
    {
      com.sun.security.auth.module.Krb5LoginModule required
        storeKey=true
        useKeyTab=true
        doNotPrompt=true
        keyTab="/etc/kerberos.keytab"
        principal="HTTP/alfresco.example.com";
    };

      com.sun.net.ssl.client {
        com.sun.security.auth.module.Krb5LoginModule sufficient;
    };

    other {
      com.sun.security.auth.module.Krb5LoginModule sufficient;
    };
    ```

2. Edit the following line in the Java security configuration file `java.security` by default located in `java/conf/security/`to point to the `java.login.config` file using the full file path:

    ```bash
    login.config.url.1=file:<installLocation>/java/conf/security/java.login.config
    ```

3. Use the following configuration parameters in an `alfresco-global.properties` file:

    | Property | Description |
    | -------- | ----------- |
    | authentication.chain | The authentication chain needs to be set for Kerberos, for example: `kerberos,alfrescoNtlm1:alfrescoNtlm` |
    | kerberos.authentication.realm | The Kerberos realm to authenticate against. The realm name is the domain name in uppercase, for example: `EXAMPLE.COM` |
    | kerberos.authentication.sso.enabled | Sets whether authentication using Kerberos is enabled or not |
    | kerberos.authentication.sso.fallback.enabled | Sets whether a fallback authentication mechanism such as database credentials is used |
    | kerberos.authentication.user.configEntryName | The name of the entry in the Java Authentication and Authorization Service (JAAS) file used for password-based authentication. The default value of `Alfresco` is recommended |

## Step 3: Configure Alfresco Share

The Java login files need to be updated with details of the Kerberos configuration and the `share-config-custom.xml` file edited to enable SSO using Kerberos.

1. Configure or create the Java configuration file `java.login.config` located in `/java/conf/security`. The following is an example of a `java.login.config` file. The important properties to set are `keyTab` and `principal`.

    * `keyTab` is the location of the [`keytab` file](#step-1-configure-kerberos-files) copied to the ACS server
    * `principal` is in the format `HTTP/<host>.<domain>`

    ```bash
    Alfresco {
      com.sun.security.auth.module.Krb5LoginModule sufficient;
    };

    ShareHTTP
    {
      com.sun.security.auth.module.Krb5LoginModule required
        storeKey=true
        useKeyTab=true
        doNotPrompt=true
        keyTab="/etc/kerberos.keytab"
        principal="HTTP/alfresco.example.com";
    };

      com.sun.net.ssl.client {
        com.sun.security.auth.module.Krb5LoginModule sufficient;
    };

    other {
      com.sun.security.auth.module.Krb5LoginModule sufficient;
    };
    ```

    > **Note:** If Alfresco Share is hosted on the same server as Alfresco Content Services then the contents of the `java.login.config` can be merged into a single file.

2. Edit the following line in the Java security configuration file `java.security` by default located in `java/conf/security/`to point to the `java.login.config` file using the full file path:

    ```bash
    login.config.url.1=file:<installLocation>/java/conf/security/java.login.config
    ```

3. Open the `share-config-custom.xml` file:

    * Update the `<realm>`property with the [realm name](#step-1-configure-kerberos-files), for example `<realm>EXAMPLE.COM</realm>`.
    * Update the `<endpoint-spn>` property with the [SPN value](#step-1-configure-kerberos-files), for example `<endpoint-spn>HTTP/alfresco@EXAMPLE.COM</endpoint-spn>`
    * Uncomment the **two** sections that begin with: `<config evaluator="string-compare" condition="Remote">`
    * Navigate to the `<!--- Kerberos settings --->` section and replace `condition="KerberosDisabled"` with `condition="Kerberos"`

    > **Note:** For Kerberos to work with user names that contain non-ASCII characters, add the following option to `JAVA_OPTS` for the Share JVM:
    >
    > ```bash
    > -Dsun.security.krb5.msinterop.kstring=true
    > ```

## Step 4: Configure Alfresco Digital Workspace

The Alfresco Digital Workspace requires one property added to enable Kerberos SSO. This can be added in the `app.config.json`, located by default in the `/src`directory.

The following is the property to add to the `app.config.json`:

```json
 "auth": {
      "withCredentials": true
}
```

## Step 5: Configure Alfresco Process Services

The Java login files need to be updated with details of the Kerberos configuration and the `activiti-ldap.properties` updated to enable SSO using Kerberos.

1. Configure or create the Java configuration file `java.login.config` located in `/java/conf/security`. The following is an example of a `java.login.config` file. The important properties to set are `keyTab` and `principal`.

    * `keyTab` is the location of the [`keytab` file](#step-1-configure-kerberos-files) copied to the ACS server
    * `principal` is in the format `HTTP/<host>.<domain>`

    ```bash
    Alfresco {
      com.sun.security.auth.module.Krb5LoginModule sufficient;
    };

    AlfrescoHTTP
    {
      com.sun.security.auth.module.Krb5LoginModule required
        storeKey=true
        useKeyTab=true
        doNotPrompt=true
        keyTab="/etc/kerberos.keytab"
        principal="HTTP/alfresco.example.com";
    };

      com.sun.net.ssl.client {
        com.sun.security.auth.module.Krb5LoginModule sufficient;
    };

    other {
      com.sun.security.auth.module.Krb5LoginModule sufficient;
    };
    ```

2. Edit the following line in the Java security configuration file `java.security` by default located in `java/conf/security/`to point to the `java.login.config` file using the full file path:

    ```bash
    login.config.url.1=file:<installLocation>/java/conf/security/java.login.config
    ```

3. Use the following configuration parameters in an `activiti-ldap-properties` file:

    | Property | Description |
    | -------- | ----------- |
    | kerberos.authentication.enabled | Sets whether authentication via Kerberos is enabled. This needs to be set to `true` to setup SSO using Kerberos, for example `true` |
    | kerberos.authentication.principal | The Service Principal Name (SPN) to authenticate against, for example `HTTP/alfresco.example.com` |
    | kerberos.authentication.keytab | The location of key table file, for example `C:/alfresco/alfrescohttp.keytab` |
    | kerberos.authentication.krb5.conf | The location of the Kerberos ini file, for example `C:/Windows/krb5.ini` |
    | kerberos.allow.ldap.authentication.fallback |Sets whether to allow sign in from unsupported browsers using LDAP credentials, for example `false` |
    | kerberos.allow.database.authentication.fallback | Sets whether to allow sign in from unsupported browsers using database credentials, for example `true` |
    | kerberos.allow.samAccountName.authentication | Sets whether authentication can use the short form such as `username` rather than `username@domain.com`, for example `true` |
    | security.authentication.use-externalid | A setting that enables authentication through Kerberos, for example `true` |
    | ldap.authentication.enabled | Sets whether LDAP authentication is enabled. This setting needs to be set to `true` for SSO to work for Kerberos, for example `true` |

## (Optional) Containerized deployment

In a containerized deployment it is assumed that a load balancer is used to route traffic to the relevant applications. The Active Directory instance used to authenticate users with in a containerized Kerberos scenario is also more likely to exist outside of the domain of the Alfresco applications.

### Kerberos configuration files

In [Step 1](#step-1-configure-kerberos-files) the `keytab` and `krb5.conf` files need to be edited if the Active Directory instance is in a separate domain.

1. The `keytab` file can be configured to refer to an Active Directory instance in a separate domain if necessary.

    For example:

    ```bash
    ktpass -princ HTTP/alfresco.example.com@AD-SSO.EXAMPLE.COM -pass PASSWORD -mapuser 
    ad-sso\httpsalfresco -crypto all -ptype KRB5_NT_PRINCIPAL -out 
    c:\temp\httpalfresco.keytab -kvno 0
    ```

    Where `alfresco.example.com` is the load balancer address, `AD-SSO.EXAMPLE.COM` is the domain of the Active Directory instance and `ad-sso` is the `domainnetbios` of the Active Directory instance.

2. The `krb5.conf` uses the internal IP address of the Active Directory container.

    For example:

    ```bash
    [libdefaults]
    default_realm = AD-SSO.EXAMPLE.COM
    default_tkt_enctypes = rc4-hmac
    default_tgs_enctypes = rc4-hmac

    [realms]
    AD-SSO.EXAMPLE.COM = {
              kdc = ec2amaz-5gk9lmd.ad-sso.example.com
              }

    [domain_realm]
    ec2amaz-5gk9lmd.ad-sso.example.com = AD-SSO.EXAMPLE.COM
    .ec2amaz-5gk9lmd.ad-sso.example.com = AD-SSO.EXAMPLE.COM
    ```

### Share configuration file

The same edits need to be carried out on the [`share-config-custom.xml`](#step-3-configure-alfresco-share) however the `<realm>` will be the Active Directory domain name and the `<endpoint-spn>` will use the load balancer address and Active Directory domain.

For example:

```bash
<realm>AD-SSO.EXAMPLE.COM</realm>
<endpoint-spn>HTTP/alfresco.example.com@AD-SSO.EXAMPLE.COM</endpoint-spn>
```

### Dockerfiles

In a containerized deployment, the updated files will need to be copied to the relevant application containers to overwrite the existing files with the correct configuration. This can be achieved by using the Dockerfile to update each container.

The following files need to be overwritten:

| Application | File |
| ----------- | ---- |
| Alfresco Content Services | `krb5.conf` |
| | `kerberos.keytab` |
| | `java.login.config` |
| | `java.security` |
| | `alfresco-globabl.properties` |
| | |
| Alfresco Share | `krb5.conf` |
| | `kerberos.keytab` |
| | `java.login.config` |
| | `java.security` |
| | `share-config-custom.xml` |
| | |
| Alfresco Digital Workspace | `app.config.json` |
| | |
| Alfresco Process Services | `krb5.conf` |
| | `kerberos.keytab` |
| | `java.login.config` |
| | `java.security` |
| | `activiti-ldap.properties` |

The following is an example Dockerfile used to overwrite the files in the Alfresco Process Services container assuming the new files are in a directory called `/config/`:

```dockerfile
FROM alfresco/process-services:1.10.0

COPY config/krb5.conf /etc/krb5.conf
COPY config/kerberos.keytab /etc/kerberos.keytab
COPY config/java.login.config /usr/java/default/conf/security/java.login.config
COPY config/java-aps.security /usr/java/default/conf/security/java.security
COPY config/activiti-ldap.properties /usr/local/tomcat/lib/activiti-ldap.properties
```

### Clustered deployments

If using a clustered deployment on Kubernetes set `sessionAffinity: ClientIP` on the Alfresco Content Services service so that client requests are passed to the same pod. The [Kubernetes documentation](https://kubernetes.io/docs/concepts/services-networking/service/#proxy-mode-ipvs){:target="_blank"} provides further information on this setting.

## Verify the configuration

To verify that SSO is working correctly after configuring Kerberos, the following are required:

* A Windows client machine that is part of the domain and has a browser installed that is configured to use Kerberos authentication.

The following is an example sequence to follow to verify that SSO works correctly:

1. Sign in to the Windows client machine as the user configured in [Step 1](#step-1-configure-kerberos-files).
2. Open a new browser session and navigate to the Alfresco Digital Workspace at the URL `http://adw.example.com/workspace` and there should be no additional sign in step required.
3. Create a new tab in the same browser session and navigate to Alfresco Share at the URL `http://share.example.com/share` and there should be no additional sign in step required.
4. Create a new tab in the same browser session and navigate to Alfresco Process Services at the URL `http://aps.example.com/activiti-app` and there should be no additional sign in step required.
