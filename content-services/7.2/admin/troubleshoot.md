---
title: Troubleshooting
---

Help for diagnosing and resolving any Content Services issues that you might encounter.

For additional help, refer to the following:

* [Alfresco Support](https://support.alfresco.com/){:target="_blank"}
* [Alfresco Hub](https://hub.alfresco.com/){:target="_blank"}
* [Repo Admin Console]({% link content-services/7.2/admin/admin-console.md %}) for more information, specifically [support tools]({% link content-services/7.2/admin/support-tools.md %})
* [Share Admin Tools]({% link content-services/7.2/admin/share-admin-tools.md %}) to view various installation and setup information

## Set log levels

The `log4j.properties` file lets you configure logging levels to provide debugging information when troubleshooting. To set up logging policies, you must prepend `log4j.logger` to the class name you want to log to, and set the logging level. You can set the log level dynamically using the JMX client.

When using log4j, you should:

* Keep local customizations and licenses outside of the web application. For example, in the extension directory:

    ```text
    $TOMCAT_HOME/shared/classes/alfresco/extension/...-log4j.properties
    ```

* The supplied configuration files should be stored or installed within the web application. For example:

    ```text
    WEB-INF/classes/alfresco/extension/...-log4j.properties
    ```

> **Note:** A `dev-log4j.properties` file should not be packaged as a part of any product.

Logging uses the Log4J `HierarchyDynamicMBean`.

> **Note:** Log levels are not cluster-aware. If needed, the log level change will need to be applied to each machine. Some consoles (for example, JManage) can provide basic facilities for accessing each machine in an application cluster.

* Editable attributes are a dynamic list of loggers with the `logLevel` attribute, which can be changed to OFF, FATAL, ERROR, WARN, INFO, DEBUG or TRACE (editable).

* `addLoggerMBean` will be impacted if it has been loaded.

    The following steps provide instructions on adding loggers using JConsole:

1. Click **Alfresco > Log4jHierarchy > Operations > addLoggerMBean**.

2. Type the full **className** in **Name** on the right hand pane.

3. Click **addLoggerMBean**.

    A dialog box is displayed with the title **Operation return value**. If the operation is successful, the body of the dialog box contains the `className` you provided, preceded by `log4j:logger=`. If the operation is unsuccessful, the body of the dialog box shows `null`.

## Error messages

Use this information to help troubleshoot your installation.

### ImageMagick

Error message on the console:

```text
ERROR [AbstractImageMagickContentTransformer]
JMagickContentTransformer not available:
ERROR [AbstractImageMagickContentTransformer]
ImageMagickContentTransformer not available:
Failed to execute command: imconvert ...
```

These issues won't cause the server to fail. Content Services is reporting that external document transformation engines are not available for use by the server. You can remove the transformation references if they're not required.

### JAVA_HOME

Make sure the `JAVA_HOME` variable is set correctly for your Java installation.

### FTP Socket

Error message on server startup:

```text
ERROR [protocol] FTP Socket error
```

### Port already in use

```text
java.net.BindException: Address already in use:
JVM_Bind at
```

```text
java.net.PlainSocketImpl.socketBind(Native Method)
```

Check to see if you have any services running against port 8080 for the Content Services server or port 21 for the FTP integration.

## Using the Node Browser {#usingnodebrowser}

Use Node Browser in the Repo Admin Console or in Share Admin Tools as a debugging aid to browse the raw repository structure. This feature is intended for developers responsible for customizing the application.

This is a read-only feature with basic search capability.

1. Open the [Repo Admin Console]({% link content-services/7.2/admin/admin-console.md %}#launch-admin-console).

2. In the **Support Tools** section, click **Node Browser**. You see the **Node Browser Console** page.

3. In the **Store** section, select the store of interest:

    * `workspace://SpacesStore` - live content
    * `archive://SpacesStore` - archived content (soft deleted)
    * `workspace://version2Store` - older content version history
    * `user://alfrescoUserStore` - nodes of type `usr:user` is stored, note that nodes of type `cm:person` is stored in the `workspace://SpacesStore`
    * `system://system` - info about installed modules
    * `workspace://lightWeightVersionStore`

    Each store is an area of the repository and within each store, the nodes of that store are organized hierarchically. The node displayed is the root node of the selected store.

4. Click **Root List**.

    The **Node Browser** page displays details of the properties, aspects, children, parents, associations, source associations, and permissions for the selected node.

5. Search the selected store, as needed:

    1. Select the search type: `noderef`, `fts-alfresco`, `lucene`, `xpath`, `selectnodes`, `cmis-strict`, `cmis-alfresco`, `db-afts`, `db-cmis`.

    2. Enter the search criteria in the field provided.

    3. Click **Execute**.

### Using the Node Browser in Share Admin Tools

1. Go to [Share Admin Tools]({% link content-services/7.2/admin/share-admin-tools.md %}), and then click **Node Browser**.

    By default, the search criteria `PATH:"/"` is shown in the Node Browser field for the `workspace://SpacesStore` repository store. Each store is an area of the repository. The nodes contained within each store are organized hierarchically. The node displayed is the root node of the selected store.

    The default search type is set to **fts-alfresco**. For most administrative tasks, you can use the default search type.

    See [Alfresco Full Text Search reference]({% link search-services/latest/using/index.md %}) for more detail.

2. Enter your search criteria in the Note Browser field.

3. Click **Search**.

4. Click the link in the **Reference** column to browse the details.

    The details of the properties, aspects, children, parents, associations, source associations, and permissions are displayed for the node.

5. Click **Back to Search** to browse another node.

You can use another search syntax by choosing one of the following types from the **Search** list:

* `storeroot`
* `noderef`
* `xpath`
* `fts-alfresco`
* `cmis-strict`
* `cmis-alfresco`
* `db-afts`
* `db-cmis`

## Debug an installation

When developing add-ins, fixing bugs, or changing Content Services from the source code, it is helpful to debug an instance running on a standard application server. You can configure Content Services and Eclipse to provide a real-time view of the server and to troubleshoot issues by stepping through the code line by line.

To debug a running server, you must connect to the JVM in which Content Services is running. The following steps configure the JVM to expose an interface for this connection, and then configure Eclipse to connect to and control that JVM.

### Configure the JVM

You can configure the JVM to expose an interface for connection to the server.

Before you start, you must:

* Have a fully installed, configured, and running instance of Content Services. These steps assume you're using Tomcat on Windows, but the steps are similar for other application servers on other systems.
* Have an IDE installed. These steps describe how to configure Eclipse, which must be installed first ([Eclipse](https://www.eclipse.org/downloads/){:target="_blank"})
* Download source code from `https://github.com/Alfresco/alfresco-enterprise-repo`. This project has more instructions on how to set up a development environment.
* Ensure the source code is the same version as the installed server.

1. Verify that the server is not running.

2. Edit the JVM options used to start the Tomcat instance.

    For example, set the following:

    ```text
    JAVA_OPTS=%JAVA_OPTS% -server -Xdebug -Xrunjdwp:transport=dt_socket,server=y,suspend=n,address=8082
    ```

    where `address` is a port for your system.

3. Save the file and close the editor.

### Configure Eclipse

This task describes how to configure Eclipse to connect to and control the JVM.

1. From the Run menu, choose the **Open Debug** dialog.

2. Right-click **Remote Java Application** and select **New**.

3. In the Name box, type Debug Local Tomcat Alfresco.

4. Next to Project, click **Browse**, and select **Web Client**. If this is not available as an option, ensure your source code matches that of your server.

5. In Connection Properties, enter the port number.

6. Check **Allow Termination of remote VM** if you want to be able to stop the server from the Eclipse console.

7. Click **Apply** to save the configuration.

## Troubleshoot an upgrade

Use these tips for diagnosing and resolving any issues that might arise as a result of an upgrade.

1. Immediately after starting the server, make a copy of the `alfresco.log` file.

2. In the `alfresco.log` file, note the locations of the temporary files containing the SQL statements executed during the upgrade, and make a copy of these temporary files.

3. Submit the log file and temporary files to Alfresco Support.

## Troubleshoot rules and actions

Use these troubleshooting tips when working with rules and actions.

### Type specialization action problems with Mac OS/X**

If you're using Mac OS/X 10.8.3 or later, the type specialization action is not performed when you save a Microsoft Word document.

To resolve this issue, edit your `alfresco-global.properties` file to set the following value:

```text
policy.content.update.ignoreEmpty=false
```

## Troubleshoot clustering

Use these troubleshooting tips when testing cache clustering.

In **Linux/Unix** environments, you can use `netstat -ln` to check that the correct ports have been opened by the server on the correct network adapters. You can use `telnet <hostname><port>` to check if each open port can be reached by each cluster member.

If your cluster members are using NAT and IPv4 addresses, you might need to force the server to listen on IP V4 addresses rather than IP V6. To do this, add:

```text
-Djava.net.preferIPv4Stack=true
```

to the startup options of Content Services JVM. In a standard **Linux/Unix** installation, this would require editing of the `JAVA_OPTS` variable in the following script:

```text
tomcat/scripts/ctl.sh
```

On a standard **Windows** installation, this would require adding the parameter just before `;-Dalfresco.home` in:

```text
tomcat/bin/service.bat
```

and then running the scripts:

```bash
tomcat/scripts/serviceinstall.bat REMOVE
tomcat/scripts/serviceinstall.bat INSTALL
```

to re-register the service with the new option.

See [Setting up clustering]({% link content-services/7.2/admin/cluster.md %}) for more information on the process of initiating clustering and the options available for configuring clustering.

## Troubleshoot JMX Dumper

Use this information if you need to troubleshoot the JMX Dumper.

Invoking the JMX Dumper can result in a stack trace in the log file. When you open `jmx-dumper.zip`, it is trying to find a data source defined in the `web.xml` file. (`<res-ref-name>jdbc/dataSource</res-ref-name>`), but this data source is not declared in the `alfresco.xml` file.

To prevent this logging message for appearing, you can configure the data source in the `$CATALINA_BASE/conf/[enginename]/[hostname]/alfresco.xml` file.

## Troubleshoot WebDAV

Diagnose and resolve issues that might arise when configuring WebDAV.

Content Services uses two implementations of WebDAV:

* RFC-compliant WebDAV: `alfresco/webdav`
* Microsoft-compliant WebDAV: `alfresco/aos`

Microsoft WebDAV extensions (MS-DAVEXT) are only partially compatible with the WebDAV standard, therefore it is recommended that you use `/alfresco/aos` on Windows clients and `/alfresco/webdav` on Linux-based systems.

### Unable to mount WebDAV share (Windows)

* Check if Content Services has finished loading. Look for a *Server startup* message in the log file
* Check if the connection works if you use the IP address instead of the host name
* Check if you can browse folders using `https://<alfresco_ip>/alfresco/aos` in a web browser
* Add your server IP to the Trusted sites list in Windows Internet Explorer
* Make sure the **WebClient** service is running. To do so, follow the steps:

    1. Start `services.msc`.
    2. Start the **WebClient** service.

    > **Note:** For details on running the **WebClient** service, see [Enabling the WebClient service in Windows](https://docs.microsoft.com/en-gb/archive/blogs/johnguin/enabling-the-webclient-service-in-windows){:target="_blank"}.

* If you're not using SSL, check your connection configuration for Windows and Microsoft Office.

    > **Note:** Refer to Microsoft for details on setting the Basic Authentication Level key in the Registry Editor.

* If you can connect to the server but can't authenticate your login details, check if you can use the same user name and password to log in to Alfresco Share.

### Move file or folder using WebDAV on an Ubuntu client causes loss of metadata and creates a new node reference

There is a known issue where Ubuntu creates a new `nodeRef` when you move a file or a folder in WebDAV, because it uses PUT and DELETE methods instead of a MOVE method. As a result, the `nodeRef` for the file or folder changes and any associated metadata is lost. This issue applies to all versions of Ubuntu, but does not occur when using a Windows client.

### Editor role can't edit content using WebDAV and Cyberduck version 4.4+

There is a known issue when using WebDAV with Cyberduck 4.4 and later, where content can't be edited due to insufficient permissions. To avoid this, you can either use a version of Cyberduck earlier than 4.4, or assign permissions to the user to allow them to create files.

### Slow response when working with WebDav resources on Microsoft Windows Vista or 7

There is a known issue where you may experience poor performance when opening a WebDav folder, copying files to or from a WebDav folder, or changing from one folder to another on the WebDav folder. This can be caused because when WebClient issues a WebDAV command it checks for a web proxy server. If you have Auto-Proxy detection enabled and there isn't a proxy server in the environment between the client and WebDAV resource, WebClient waits for the timeout of Auto-Proxy detection. Command completion therefore will take longer due to the wait for the Auto-Proxy detection timeout.

## OpenLDAP tips

Use these tips when working with OpenLDAP.

There are a number of things to note:

* The maximum number of results returned has been increased from the default of 500 that even applies to paged results. See the OpenLDAP documentation on limits. If you have more than 500 users or groups this would be an issue.
* Digest authentication has been configured to map from a user ID to the corresponding distinguished name. See the example data.
* Passwords are in clear text (so that any authentication mechanism can be used). It is possible they can be in the correct hashed form for the MD5 digest to work.

```text
See slapd.conf(5) for details on configuration options.
# This file should NOT be world readable.
#
include  /usr/local/etc/openldap/schema/core.schema
include  /usr/local/etc/openldap/schema/cosine.schema
include  /usr/local/etc/openldap/schema/inetorgperson.schema

# Define global ACLs to disable default read access.

# Do not enable referrals until AFTER you have a working directory
# service AND an understanding of referrals.
#referral  ldap://root.openldap.org

pidfile   /usr/local/var/run/slapd.pid
argsfile   /usr/local/var/run/slapd.args

# Load dynamic backend modules:
# modulepath /usr/local/libexec/openldap
# moduleload back_bdb.la
# moduleload back_ldap.la
# moduleload back_ldbm.la
# moduleload back_passwd.la
# moduleload back_shell.la

# Sample security restrictions
# Require integrity protection (prevent hijacking)
# Require 112-bit (3DES or better) encryption for updates
# Require 63-bit encryption for simple bind
# security ssf=1 update_ssf=112 simple_bind=64

# Sample access control policy:
# Root DSE: allow anyone to read it
# Subschema (sub)entry DSE: allow anyone to read it
# Other DSEs:
#  Allow self write access
#  Allow authenticated users read access
#  Allow anonymous users to authenticate
# Directives needed to implement policy:
# access to dn.base="" by * read
# access to dn.base="cn=Subschema" by * read
# access to *
# by self write
# by users read
# by anonymous auth
#
# if no access controls are present, the default policy
# allows anyone and everyone to read anything but restricts
# updates to rootdn. (e.g., "access to * by * read")
#
# rootdn can always read and write EVERYTHING!

#######################################################################
# BDB database definitions
#######################################################################

database  bdb
suffix  "dc=company,dc=com"
rootdn  "cn=Manager,dc=company,dc=com"
# Cleartext passwords, especially for the rootdn, should
# be avoid. See slappasswd(8) and slapd.conf(5) for details.
# Use of strong authentication encouraged.
# This is secret ....
rootpw          {SSHA}u9AUUYOSVX6idlXcwyYOAG6G84oHFpvG
# The database directory MUST exist prior to running slapd AND
# should only be accessible by the slapd and slap tools.
# Mode 700 recommended.
directory  /usr/local/var/openldap-data
# Indices to maintain
index  objectClass  eq

# Clear text to allow hashing
password-hash  {CLEARTEXT}

# SASL mappings for md5 digest authentication
# Extract the user id and use as the search key

authz-regexp
   uid=([^,]*),cn=digest-md5,cn=auth
   ldap:///dc=company,dc=com??one?(uid=$1)

authz-regexp
   uid=([^,]*),cn=company.com,cn=digest-md5,cn=auth
   ldap:///dc=company,dc=com??one?(uid=$1)

# Tweaks to increase the result set size and max query time

sizelimit 50000
timelimit 3600

```

The following is a very simple example LDIF file that defines People and Groups Organizational units and some example users and groups.

```text
# Initial directory contents
dn: dc=company,dc=com
dc: company
objectClass: top
objectClass: domain

dn: ou=People,dc=company,dc=com
ou: People
objectClass: top
objectClass: organizationalUnit

dn: ou=Groups,dc=company,dc=com
ou: Groups
objectClass: top
objectClass: organizationalUnit

dn: uid=fullname,ou=People,dc=company,dc=com
objectclass: inetOrgPerson
sn: Name
cn: Full Name
userPassword: inClearText
telephoneNumber: 1234567890
uid: fullname
givenName: Full
mail: full.name@company.com
o: Company Software Inc.

dn: uid=walrus,ou=People,dc=company,dc=com
objectclass: inetOrgPerson
sn: Rus
cn: Wal Rus
userPassword: inClearText
telephoneNumber: 1234567890
uid: walrus
givenName: Wal
mail: wal.rus@company.com
o: Company Software Inc.

dn: cn=Group One,ou=Groups,dc=company,dc=com
objectclass: groupOfNames
cn: Group One
member: uid=fullname,ou=People,dc=company,dc=com

dn: cn=Group Two,ou=Groups,dc=company,dc=com
objectclass: groupOfNames
cn: Group Two
member: cn=Group One,ou=Groups,dc=company,dc=com
member: uid=walrus,ou=People,dc=company,dc=com
```

## Active Directory tips

Tips for using Active Directory with the LDAP synchronization.

* You might need to give special permissions in the Active Directory to the account that you're using to do the LDAP bind (as configured in `ldap.synchronization.java.naming.security.principal`). To do this, open Active Directory Users and Computers, right click on the domain, and select **Delegate Control...** Click **Next**, then select the user that you're using for the LDAP bind and click **Next**. The permission that they will need is on the next screen **Read all inetOrgPerson information.**
* The example URL in `ldap.authentication.java.naming.provider.url` does not use SSL. SSL is recommended for production systems. You'll need to switch the port from 389 (below, non-SSL) to 636 for SSL.
* It is often helpful to screen out non-user accounts and disabled accounts. The default user queries in the `ldap-ad` subsystem type do this by checking bit fields on the `userAccountControl` attribute. For example:

    ```text
    userAccountControl:1.2.840.113556.1.4.803:=512
    ```

## Troubleshoot SMTP inbound email using StartTLS

For StartTLS support to work for inbound email, you must configure SSL for Java.

To identify whether you're having this problem, enable `DEBUG` logging for the class `org.subethamail` in your `log4j.properties` file.

```text
startTLS() failed: no cipher suites in common
```

Also, to enable efficient inbound mail server logging in debug mode, you need a log4j option that allows you to track mails, including the sender details, recipient details, subject and the reason for rejection/acceptance. To do so, enable `DEBUG` logging for the `class org.subethamail.smtp.server.ConnectionHandler` as shown:

```text
log4j.logger.org.subethamail.smtp.server.ConnectionHandler=debug  
```

The following process outlines one method for creating a self-signed certificate. However, this can differ between JVM vendors, so see the JVM documentation for more information.

1. Create a suitable key and certificate:

    ```bash
    keytool -genkey -keystore mySrvKeystore -keyalg RSA
    ```

2. Add the following somewhere in your Tomcat configuration. For example, `/etc/tomcat5/tomcat7.conf`.

    ```text
    JAVA_OPTS="$JAVA_OPTS -Djavax.net.ssl.keyStore=mySrvKeystore -Djavax.net.ssl.keyStorePassword=123456"
    ```

## Handle higher rate of outbound TCP connections

If you're using the Web Services API on a Windows client and frequently see errors such as `java.net.BindException: Address already in use: connect` in the client application, you might need to tune the client operating system parameters so that it can handle a higher rate of outbound TCP connections.

1. Open the **Registry**.

2. Under the following registry entry:

    ```text
    HKEY_LOCAL_MACHINE\SYSTEM\CurrentControlSet\Services\TCPIP\Parameters
    ```

3. Key in the registry of the Windows client machine.

4. Add the following registry entries:

    * `TcpTimedWaitDelay`

        Add this DWORD with a value of 30.

    * `MaxUserPort`

        Add this DWORD with a value of 32768.

5. Refer to the Windows documentation for further details on these registry entries.

## Troubleshoot IMAP

Use this information to troubleshoot IMAP problems.

### IMAP scale limitations

If you mount more than 5000 folders or mailbox folders, depending on the IMAP client that you're using, you might not be able to view more than the first 5000 folders.

In order to avoid this situation, you should limit the number of folders that are being mounted.

For example:

* Do not mount from the company root space if you know that you have a very large folder structure. Choose a specific site to reduce the number of folders being mounted.
* Do not extract attachments to a separate folder (`imap.attachments.mode=SEPARATE`), particularly for large repositories. When you specify `imap.attachments.mode`, choose one of the following settings:
  * `imap.attachments.mode=COMMON`: all attachments for all emails are extracted to one folder
  * `imap.attachments.mode=SAME`: attachments are extracted to the same folder as the original message

### IMAP server error message

```text
Exception in thread "Thread-53" java.lang.RuntimeException:
java.net.BindException: Cannot assign requested address:
JVM_Bind at com.icegreen.greenmail.imap.ImapServer.run(ImapServer.java:53)
Caused by: java.net.BindException:
Cannot assign requested address: JVM_Bind
```

This error message is related to the IP address or hostname that has been provided for binding. To resolve this issue:

* Check that the IP address or hostname you provided is correct for your `imap.server.host` setting.
* Check that the port you're using is not blocked. The default port to use is 143.
* Check that firewalls are not blocking this IP address or hostname.
* Use the command line tool Netstat to check your network connections.

    > **Note:** You should not use localhost as the `imap.server.host` - update this value with the IP address (or corresponding DNS address) of your external IP interface. A value of 0.0.0.0 in Unix will make it listen on the specified port on all IP interfaces.

## Troubleshoot database scheme problems

The **Schema Difference Tool** provides a way of identifying and troubleshooting problems in database schemas. Such problems can sometimes arise when performing certain version upgrades or customized installations.

The Schema Difference Tool can be used when troubleshooting or examining the database schema for a repository. The tool has two main functions:

1. Producing schema dumps as XML files.
2. Validating a database schema.

Schema dumps were available in previous versions of Content Services. However, prior to the introduction of the Schema Difference Tool, the only way to judge the validity of the schema was to examine the file manually and compare schemas with simple text tools such as the Unix diff command. The Schema Difference Tool performs a certain amount of automatic comparison that removes much of the effort needed in making these comparisons.

If any changes are made to the database schema during server start-up (such as a fresh install) then the tool performs both schema dumping and validation as described. The dumps and validation are made both pre-upgrade (that is before the schema changes) and post-upgrade.

### Definition of terms used

The terms given are used throughout the rest of this section.

* **Database object**

    A schema, sequence, table, column, index, primary key or foreign key.

* **Reference schema**

    The definitive representation of a repository schema for a given schema version on a vendor specific RDBMS. The reference schema is a model for what should be present in the database after installing or upgrading a repository to a particular version. A reference schema is presented in the same XML format as a schema dump. For example, a schema reference can be produced for MySQL on version 5025 of the repository schema.

* **Target schema**

    The database schema that will be compared and validated with respect to a reference schema. For example, if installing an repository from scratch, then the newly created schema will be a target schema for comparison against the appropriate reference schema.

### Perform schema dumps

Schema dumps are XML representations of the database schema.

Schema dumps can take place in two situations:

1. The dump is triggered automatically on startup due to a difference being found between the reference and actual database schema.
2. The dump is manually triggered by using a JMX client.

Each of these scenarios is described in the following sections.

#### Automatic dumps

Schema dumps are performed automatically on server startup, if changes in database schema are detected.

Schema dumps are XML representations of the RDBMS schema. They should conform to the XSD: `http://www.alfresco.org/repo/db-schema/db-schema.xsd` The XSD file is embedded in the repository.

A schema dump is performed automatically during repository server start up, if there were changes made to the database schema. The log will indicate if any dumps were performed, and entries such as these will be present:

```text
2017-02-16 11:51:19,907 INFO  [org.alfresco.repo.domain.schema.SchemaBootstrap] [localhost-startStop-1] Normalized schema dumped to file
/tomcat/temp/Alfresco/Alfresco-schema-PostgreSQLDialect-pre-upgrade-alf_-3894930030144419413.xml.
2017-02-16 11:51:19,907 INFO  [org.alfresco.repo.domain.schema.SchemaBootstrap] [localhost-startStop-1] Normalized schema dumped to file
/tomcat/temp/Alfresco/Alfresco-schema-PostgreSQLDialect-pre-upgrade-act_-4480941923294636682.xml.
```

Similar entries for the post-upgrade files will also be present.

> **Note:** The legacy tool is still included and will create dumps of its own - the log messages look similar but should not be confused with the new format dumps.

> **Note:** JBPM has been removed from Content Services. Schema dump will ignore any JBPM tables and not treat their presence or absence as an error.

#### Trigger dumps by using JMX

Schema dumps can also be triggered manually by using a JMX client.

In addition to automatic dumping, dumps can be manually invoked by use of the JMX interface.

The JMX category **Alfresco > DatabaseInformation > SchemaExport** contains two operations:

1. `java.util.List dumpSchemaToXML()`
2. `java.util.List dumpSchemaToXML(String prefixList)`

The first operation takes no parameters and when invoked will create three dump files one for each prefix `alf_` and `act_`. The prefix means that only tables and sequences whose names begin with the prefix will be included in the dump. Related items, such as the indexes belonging to a particular table, will be dumped regardless of name.

The second variation takes a single `String` parameter and is a comma-separated list of prefixes that you wish to dump. If this operation were invoked with the parameter `alf_acl_, alf_node_` for example, then two files would be created (one for each prefix). The tables dumped in the first file would include `alf_acl_change_set` and `alf_acl_member`. Tables in the second file would include `alf_node_aspects` and `alf_node_assoc`. Neither file would include `alf_locale` or `alf_permission` since they do not carry one of the supplied prefixes.

Both of these calls will result in the log showing the location of the dumped files, but they also return a `List` of path names. JConsole will helpfully display these lists in a copy/paste friendly manner.

### Perform schema validation

Schema validation of schema dumps can happen either due to a schema change during repository start up, or can be triggered manually by using JMX.

Schema validation is performed with differencing and validation.

#### Differencing

Differencing produces similar information to that obtained by using the Unix tool `diff` against a known 'good' reference schema dump and a potentially problematic target schema dump.

However, since the tool is designed for performing a comparison between two database schemas, rather than arbitrary text, the output is more specific about the types of difference.

The types of difference that can be reported are:

* A database object appears in both the reference and target schemas, but has differences in its properties. For example if an index appears in both schemas but has a different name.
* A database object appears in the reference schema but no corresponding object has been identified in the target database.
* A database object appears in the target schema but no corresponding object has been identified in the reference database.

One advantage of the Schema Differencing Tool differencing over traditional diff tool comparisons is that an index is not recognized by the exact text appearing in a dump. Instead it is identified by which table the index belongs to, which columns are indexed and in what order. If an index has the expected name and belongs to the correct table but has the wrong columns, or the correct columns in the wrong order, then differences will be reported. Or conversely, if the correct table has an index with the correct columns in the correct order, but has the wrong index name, then this will be reported. The name can be ignored during comparisons (useful for auto-generated index names) or can be taken into account. Part of the task of producing reference schema files is to specify this behavior using `DbValidator` objects, which are explained in the following sections.

For example, suppose we have the following index defined in the reference schema:

|Index name|`permission_id`|
|Parent table|`alf_access_control_entry`|
|Columns|`permission_id`, `authority_id`, `allowed`, `applies`|

This index is specified in the schema reference file in this way (parts omitted for brevity):

```xml
<table name="alf_access_control_entry">
  <!-- column definitions, primary keys and foreign keys ommitted -->
  <indexes>
    <index name="permission_id" unique="true">
      <columnnames>
        <columnname>permission_id</columnname>
        <columnname>authority_id</columnname>
        <columnname>allowed</columnname>
        <columnname>applies</columnname>
      </columnnames>
    </index>
    <!-- further index definitions ommitted -->
  </indexes>
</table>
```

When the target schema's index is compared against this reference then firstly a list of candidate matches are produced. There can be more than one matching index in the target schema, in which case a redundant database object warning is issued.

Candidate matches are produced dependent on object type.

For indexes:

1. If the parent table is the same and the index name is the same, then it is considered the same index.
2. If the name is different but the parent table is the same and the columns indexed are the same, and in the same order, then it is is considered to be the same index.

Taking the first scenario for matching and using the `permission_id` index defined in the example, then if the `permission_id` index in the target database has the `allowed` and `applies` columns in the reverse order than is expected, the log file would notify us of validation problems:

```text
2012-01-31 11:24:24,280  WARN  [domain.schema.SchemaBootstrap] [RMI TCP Connection(11)-10.244.50.71]
Schema validation found 2 potential problems, results written to:
/tomcat/temp/Alfresco/Alfresco-PostgreSQLDialect-Validation-alf_-5903917616348258838.txt
```

The contents of the report file would look similar to the following:

```text
Difference: expected index .alf_access_control_entry.permission_id.columnNames[2]="allowed",
but was .alf_access_control_entry.permission_id.columnNames[2]="applies"
Difference: expected index .alf_access_control_entry.permission_id.columnNames[3]="applies",
but was .alf_access_control_entry.permission_id.columnNames[3]="allowed"
```

Each line shows a problem with a particular database property. Here it indicates that the property at the path `.alf_access_control_entry.permission_id.columnNames[2]` has the value `applies` but according to the reference schema should be allowed. The leading dot of the path can be ignored (the schema name would be present before the leading dot in the case of Oracle for example), then there is the table name `alf_access_control_entry`, the index name `permission_id` within that, and a zero-indexed list property within that. The third item (index 2) is the property at fault: `columnNames[2]`.

Similarly, the next line indicates that the next item in the column name list, `columnNames[3]`, has the value `allowed` but was expected to be `applies`.

#### Validation

The Schema Difference tool can use schema reference XML files to perform validation in addition to that performed by simple differencing.

Validation allows the application of more complex rules than whether there is a difference between two property values. Validation is performed by `DbValidator` objects. A chain of `DbValidator` objects is associated with each database object in the reference schema. Each of these is executed in turn and given the chance to create validation errors based on the corresponding object in the target schema.

If an index has not been given a specific name then the RDBMS will auto-generate one at creation time. This means thatthe reference schema can't specify the exact name that the index in the target database will have. This would lead to schema differences being reported if it were not for the use of validators.

A `NameValidator` can be specified for such an index:

```xml
<index name="SQL120116153558430" unique="true">
  <validators>
    <validator class="org.alfresco.util.schemacomp.validator.NameValidator">
      <properties>
        <property name="pattern">SQL[0-9]+</property>
      </properties>
    </validator>
  </validators>
  <columnnames>
    <columnname>ID</columnname>
  </columnnames>
</index>
```

This example is from a schema reference file (`Schema-Reference-ALF.xml`) and indicates that although in the original reference schema the index was named `SQL120116153558430` any index having the appropriate parent table, column names (and column order) is valid as long as the name matches the regular expression `SQL[0-9]+`.

When the validator is invoked, it checks that the name property of the index matches the supplied regular expression. In addition to this, the validator reports, when configured to, that it takes responsibility for the name property of the index. This stops the Schema Difference Tool from applying the differencing logic to the property. A `DbValidator` can choose to apply its validation in addition to the differencing logic by not taking sole responsibility for any properties. Conversely a validator can also take sole responsibility for an entire database object in which case no differencing logic is applied to any part of the object.

Perhaps a specific unsupported upgrade path has introduced an unexpected schema change - it might not be a problem, but it is important that differences are highlighted so that a decision can be made on whether the difference represents a problem and whether a fix will need to be made. On running the Schema Difference Tool, the following might be observed in the log files:

```text
2012-01-31 14:28:50,697  WARN  [domain.schema.SchemaBootstrap] [main] Schema validation found 1 potential problems, results written to:
/tomcat/temp/Alfresco/Alfresco-Oracle9Dialect-Validation-Post-Upgrade-alf_-4048062354335481885.txt
2012-01-31 14:28:54,682  INFO  [domain.schema.SchemaBootstrap] [main] Compared database schema with reference schema (all OK):
class path resource [alfresco/dbscripts/create/org.hibernate.dialect.Oracle9Dialect/Schema-Reference-ACT.xml]
```

The ACT database object is as expected, but there is a difference between the target schema and the ALF (`alf_ prefixed` database objects) schema reference. Looking at that file it can be seen that an index that is expected to have been auto-generated has been created with an explicit name:

```text
Validation: index ALFUSER.ALF_ACCESS_CONTROL_ENTRY.SQL120131142718040.name="idx_alf_ace_auth" fails to match rule: name must match pattern 'SQL[0-9]+'
```

Specifically, the error report is stating that the index defined in the schema reference having the name `SQL120131142718040` belonging to the table `ALF_ACCESS_CONTROL_ENTRY` is expected to be named in the same way: prefixed with SQL then a string of one or more digits.

A similar problem to the auto-generated name problem is when a database object is created automatically. Some databases create indexes on the fly, rather than being an explicit part of the schema declaration. It is not known whether they will exist at the time the Schema Difference Tool is run. To suppress such errors an `IgnoreObjectValidator` can be used - it takes responsibility for validation of the associated database object, but performs no actual validation

In addition to automatic validation, validation can be manually invoked by use of the JMX interface.

> **Note:** This is an enterprise only feature.

The JMX category **Alfresco > DatabaseInformation > SchemaValidator** contains one operation:

```text
void validateSchema()
```

The operation takes no parameters and returns nothing. However, if the operation is invoked then validation will be performed and the log will show the results:

```text
2012-01-31 14:51:46,770  INFO  [domain.schema.SchemaBootstrap] [RMI TCP Connection(13)-10.244.50.71] Compared database schema
with reference schema (all OK): class path resource
[alfresco/dbscripts/create/org.hibernate.dialect.PostgreSQLDialect/Schema-Reference-ALF.xml]
2012-01-31 14:51:50,910  INFO  [domain.schema.SchemaBootstrap] [RMI TCP Connection(13)-10.244.50.71] Compared database schema
with reference schema (all OK): class path resource
[alfresco/dbscripts/create/org.hibernate.dialect.PostgreSQLDialect/Schema-Reference-ACT.xml]
```

In the example there were no problems found in the target schema.
