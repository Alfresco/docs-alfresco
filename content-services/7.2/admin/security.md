---
title: Set up security authorization
---

Content Services security comprises a combination of authentication and authorization.

[Authentication]({% link content-services/7.2/admin/auth-sync.md %}) is about validating that a user or principal is who or what they claim to be. A user’s credentials can take many forms and can be validated in a number ways. For example, a password validated against an LDAP directory, or a Kerberos ticket validated against a Microsoft Active Directory Server.

Content Services includes:

* An internal, password-based, authentication implementation
* Support to integrate with many external authentication environments
* The option to write your own authentication integration and to use several of these options simultaneously

Content Services can integrate with LDAP, Microsoft Active Directory Server, the Java Authentication and Authorization Service (JAAS) and Kerberos. A user ID can also be presented as an HTML attribute over HTTPS to integrate with web-based single-sign-on solutions.

Authorization determines what operations an authenticated user is allowed to perform. There are many authorization models. Popular ones include: Role Based Access Control (RBAC), UNIX-style Access Control Lists (ACLs) and extended ACLs, Windows-style ACLs, and many more. Authorization requirements for the management of records are more detailed and include additional requirements, for example, enforcing access based on security clearance or record state.

Authorization is based on UNIX-extended ACLs. Each node in the repository has an ACL that is used to assign permissions to users and groups. Operations, such as creating a new node, describe what permissions are required to carry out the operation. ACLs are then used to determine if a given user can execute the operation based on the permissions that have been assigned directly to the user or indirectly through a group. An operation is invoking a method on a public service bean. For example, creating a user’s home folder requires invoking methods on several public services; to create the folder, set permissions, disable permission inheritance, and so on. Each public service method invocation will check that the user is allowed to execute the method.

By convention, public service beans are the beans whose names start with capital letters, such as the `NodeService`. You configure the security requirements for public service beans in XML. A given method on a particular service might be available to all users, all users in a specified group, all users with a specified role, or users who have particular permissions on specified arguments to the method or its return value. In addition, for methods that return collections or arrays, their content can be filtered based on user permissions. If the authorization requirements for a method call are not met, the method call will fail and it'll throw an `AccessDeniedException`. Non-public beans, such as `nodeService`, do not enforce security; use these only when the enforcement of authorization is not required.

Permission assignments are made in Access Control Lists (ACLs), which are lists of Access Control Entries (ACEs). An ACE associates an authority (group or user) with a permission or set of permissions, and defines whether the permission is denied or allowed for the authority. Every node has a related ACL. When you create a node, it automatically inherits an ACL from its parent. You can alter this behavior after node creation by breaking inheritance or modifying the ACL.

The XML configuration for permissions also defines a context-free ACL for ACEs that apply to all nodes. For example, you could use this to assign everyone Read access to all nodes regardless of what individual ACLs any node has set. (See the Permissions section in this chapter for more details on how to modify the permission model.)

```xml
<!-- Extension to alfresco\model\permissionDefinitions.xml -->
<globalPermission permission="Read" authority="GROUP_EVERYONE" />
```

A check that a user has Read permission for a node is done in two stages. First, the context-free ACL is checked to see if it allows access. If not, the ACL assigned or inherited by the node is checked. A user might be allowed to perform an operation because of permissions assigned to the context-free ACL, assigned to the node’s ACL, inherited by the node from its parent, or a combination of all three.

## Mitigate brute force attack on user passwords {#mitigatebruteforceattackpwd}

Content Services provides basic out-of-the-box protection against brute force attacks on password logins.

To mitigate brute force attacks on user passwords, after a few failed login attempts for any given user id, the user id is locked out and marked as `protected`. The user id stays in the `protected` mode for a six seconds protection period. During this time, even if the correct login details are specified, the user can't login. After the six seconds protection period is over, the user can login with the correct login details.

To summarize, once a user id is `protected`:

* the schedule causes a six seconds delay between the allowed login attempts.
* authentication requests occurring more frequently than the permitted schedule are denied.
* next login attempt that is denied due to the rate limiting algorithm generates a WARN message in the Alfresco log file (only once).
* for every consecutive failed login attempt, if the limit exceeds 10 attempts, a WARN message is shown in the Alfresco log file (only once).
* details about authentication attempts, including the number of login attempts and time stamp of last login attempt, are cached.

The administrator receives one log message per protection period. To avoid username disclosure in logs, the message displays only the first two letters of the username.

![warn]({% link content-services/images/warn.png %})

The user id stays as `protected` until a correct authentication request is processed after the six seconds protection period. The entry is then removed from the cache.

This login protection feature is enabled by default, and can be configured by adding the following properties to the `alfresco-global.properties` file.

| Property | Description |
| -------- | ----------- |
| authentication.protection.enabled | Specifies if the login protection feature is enabled or disabled, for example `true`. |
| authentication.protection.limit | Specifies the number of attempts after which the user id becomes protected, for example `10`. |
| authentication.protection.periodSeconds | Specifies the protection period after which a valid login attempt can be done, for example `6`. |

> **Note:** This feature provides some basic protections against brute force attacks by slowing down repeated logins, but it does not replace more advanced brute force attack detection and mitigation that would be done on the network level or through log analysis.

## Manage Alfresco keystores {#managealfkeystores}
This section brings you up-to-speed on Alfresco keystores and truststores.

### What is a Keystore and a Truststore?
In Alfresco both the keystore and truststore file types are Java Keystores stored in one of the formats JKS, JCEKS, or PKCS12.
We use a keystore and a truststore when Alfresco needs to communicate over SSL/TLS.

Usually, these are password-protected files that sit on the same file system as a running Alfresco instance.
The default format used for these files is JKS until Java 8.

Since Java 9, though, the default keystore format is PKCS12. The biggest difference between JKS and PKCS12 is that JKS
is a format specific to Java, while PKCS12 is a standardized and language-neutral way of storing encrypted private keys
and certificates.

#### Java KeyStore
A Java keystore stores private key entries, certificates with public keys or just secret keys that we may use for
various cryptographic purposes. It stores each by an alias for ease of lookup.

Generally speaking, keystores hold keys that Alfresco owns, or you as a customer owns, that we can use to prove the
integrity of a message and the authenticity of the sender, say by signing payloads.

Usually, we'll use a keystore when we are a server and want to use HTTPS, such as the Repository (i.e. `alfresco.war`).
During an SSL handshake, the server looks up the private key from the keystore and presents its corresponding public key
and certificate to the client.

Correspondingly, if the client also needs to authenticate itself (a situation called mutual authentication), such as with Solr,
then the client also has a keystore and also presents its public key and certificate.

There's no default keystore, so if we want to use an encrypted channel, we'll have to set `javax.net.ssl.keyStore` and
`javax.net.ssl.keyStorePassword`. If our keystore format is different than the default, we could use `javax.net.ssl.keyStoreType`
to customize it.

Of course, we can use these keys to service other needs as well. Private keys can sign or decrypt data, and public keys
can verify or encrypt data (i.e. node property/metadata encryption). Secret keys can perform these functions as well.
A keystore is a place that we can hold onto these keys.

We can also interact with the keystore programmatically.

#### Java TrustStore
A truststore is the opposite, while a keystore typically holds onto certificates that identify us (i.e the Alfresco Repository server),
a truststore holds onto certificates that identify others (such as the Alfresco Solr client).

In Java, we use it to trust the third party we're about to communicate with (i.e. Solr).

If the Solr client talks to the Repository server over HTTPS, the Repository server will look up the associated key from
its keystore and present the public key and certificate to the Solr client.

We, the Solr client, then look up the associated certificate in our truststore. If the certificate or
Certificate Authorities (CA) presented by the external server is not in our truststore, we'll get an `SSLHandshakeException`
and the connection won't be set up successfully.

Java has bundled a truststore called `cacerts` and it resides in the `$JAVA_HOME/lib/security` directory.

It contains default, trusted Certificate Authorities (CA):

```bash
$ keytool -list -keystore $JAVA_HOME/lib/security/cacerts
Warning: use -cacerts option to access cacerts keystore
Enter keystore password:

*****************  WARNING WARNING WARNING  *****************
* The integrity of the information stored in your keystore  *
* has NOT been verified!  In order to verify its integrity, *
* you must provide your keystore password.                  *
*****************  WARNING WARNING WARNING  *****************

Keystore type: JKS
Keystore provider: SUN

Your keystore contains 93 entries

verisignclass2g2ca [jdk], 13 Jun 2018, trustedCertEntry,
Certificate fingerprint (SHA-256): 3A:43:E2:20:FE:7F:3E:A9:65:3D:1E:21:74:2E:AC:2B:75:C2:0F:D8:98:03:05:BC:50:2C:AF:8C:2D:9B:41:A1
...
```

Here, we can override the default truststore location via the `javax.net.ssl.trustStore` property. Similarly, we can set
`javax.net.ssl.trustStorePassword` and `javax.net.ssl.trustStoreType` to specify the truststore's password and type.

#### Creating Java Keystores and Certificates
This is done from command line with the `keytool`, which provides the ability to create keystores and truststores of the
different types, including private and public certificates.

### Introduction to Alfresco keystores an truststores
When there is secure communication (i.e. HTTPS) between different Alfresco services, the following relationships must
be satisfied:

* **The Repository is a client of Solr**:
    * A Repository key must be generated and must be included in the Repository keystore (`ssl.keystore`)
    * A Repository public certificate must be included in the Solr truststore (`ssl.repo.client.truststore`)
* **Solr is a client of the Repository and Solr**:
    * A Solr key must be generated and must be included in the Solr keystore (`ssl.repo.client.truststore`)
    * A Solr public certificate must be included in the Repository truststore (`ssl.truststore`) and Solr truststore (`ssl.repo.client.truststore`)
* **Zeppelin is client of Repository** (Zeppelin is a product only available for Insight Engine Enterprise):
    * A Zeppelin key must be generated and must be included in the Zeppelin keystore (`ssl.repo.client.keystore`)
    * A Zeppelin public certificate must be included in the Repository truststore (`ssl.truststore`)
    * Note. the same key certificates is used for both Solr and Zeppelin, as both are clients of the Repository
* **When accessing Solr from a browser, the browser is client of Solr**:
    * A Browser key must be installed in the web browser in order to access Solr Web Console

The following picture illustrates:

![secure-comms-repo-solr-keystores]({% link content-services/images/acs-secure-comms-repo-solr-keystores.png %}){:height="500px" width="700px"}

Additionally, to support Alfresco encryption feature, a metadata cyphering key is generated and included on a keystore
to be used by the Repository when encrypting node properties.

These keystore and truststore files can be generated manually but it's easier to use the
[https://github.com/Alfresco/alfresco-ssl-generator](https://github.com/Alfresco/alfresco-ssl-generator) GitHub project.
Follow the [Search Services security documentation]({% link search-services/latest/config/keys.md %}) for information
on how to set this up on Windows or Linux.

### Alfresco default keystore and backup keystore
The out-of-the-box Content Services installation has a pre-configured main keystore, which contains a secret key generated
by Content Services. If you want to use encrypted properties, you should create your own keystore with your own password,
and update the metadata file appropriately.

The default keystore configuration protects the keys by using two levels of passwords - a keystore password and a password
for each key. Currently, the keystore contains only a metadata secret key that is used for encrypting and decrypting node
properties that are of type `d:encrypted`.

You can also configure a backup keystore. This is useful in case the keys need to be changed. The user can back up the
main keystore to the backup keystore location and create a new keystore in its place.

If both the main and backup keystores are configured, the repository encryption works in the *fallback* mode. In this mode,
the node properties are decrypted with the main keystore's metadata key first. If that fails, the backup keystore's metadata
key is tried. This allows the keystores to be changed on the disk and reloaded without affecting the running of the repository.

Keystores are also used to protect the communication between the Repository and Solr using encryption and mutual
authentication. The keystores store RSA keys and certificates in this case. For more information on how to turn on
HTTPS between the Repository and Solr, and how to re-generate the default certificate,
see [Solr security]({% link search-services/latest/config/security.md %}).

### Alfresco Keystore configuration
The way you configure keystores in Content Services has changed. Previously the configuration was stored in properties
files like `keystore-passwords.properties` with passwords in plain text. The following properties that were used to
configure the keystores have been *deprecated*.

```text
encryption.keystore.keyMetaData.location
encryption.ssl.keystore.keyMetaData.location
encryption.ssl.truststore.keyMetaData.location
encryption.keystore.backup.keyMetaData.location
```

The new way of specifying the configuration is to use JVM system properties:

```text
JAVA_TOOL_OPTIONS: "
    -Dencryption.keystore.type=JCEKS
    -Dencryption.cipherAlgorithm=DESede/CBC/PKCS5Padding
    -Dencryption.keyAlgorithm=DESede
    -Dencryption.keystore.location=/usr/local/tomcat/shared/classes/alfresco/extension/keystore/keystore
    -Dmetadata-keystore.password=mp6yc0UD9e
    -Dmetadata-keystore.aliases=metadata
    -Dmetadata-keystore.metadata.password=oKIWzVdEdA
    -Dmetadata-keystore.metadata.algorithm=DESede
    "
```

>**Note:** The old way of configuring keystores will still work for backwards compatibility but it's not recommended for
security reasons. If the old approach is used you'll see a warning in the logs.

You can configure the main and backup keystores using the `alfresco-global.properties` file.

To configure the main keystore, set the following properties in the `alfresco-global.properties` file:

> **Note:** The "metadata-keystore" properties need to be specified in the `JAVA_TOOL_OPTIONS` property in
`<TOMCAT_HOME>/bin/catalina.sh` for Linux based users and `<TOMCAT_HOME>/bin/catalina.bat` for Microsoft Windows users.
The old keystore file can be found in the distribution zip `keystore/metadata-keystore`.

Main keystore and backup:

| Property | Description |
| -------- | ----------- |
| encryption.keystore.location | Specifies the location of the main keystore.`encryption.keystore.location=${dir.keystore}/keystore`|
| encryption.keystore.provider | Specifies the main keystore provider.|
| encryption.keystore.type | Specifies the main keystore type.`encryption.keystore.type=JCEKS`|
| encryption.keystore.backup.location | Specifies the location of the backup keystore.`encryption.keystore.backup.location=${dir.keystore}/backup-keystore`|
| encryption.keystore.backup.provider | Specifies the backup keystore provider.|
| encryption.keystore.backup.type | Specifies the backup keystore type. `encryption.keystore.backup.type=JCEKS`|

Keys for secure communication (HTTPS) between Repository and Solr:

| Property | Description |
| -------- | ----------- |
| ssl-keystore.password|The keystore password.|
| ssl-keystore.aliases=ssl-alfresco-ca,ssl-repo|Key data bytes in base64.|
| ssl-keystore.ssl-alfresco-ca.password|Key password.|
| ssl-keystore.ssl-repo.password|Key password.|
| ssl-truststore.password|The keystore password|
| ssl-truststore.aliases=alfresco-ca,ssl-repo-client|A comma separated list of aliases for the keys in the keystore.|
| ssl-truststore.alfresco-ca.password=|Key password.|
| ssl-truststore.ssl-repo-client.password=|Key password.|

Keys for node property (metadata) encryption keystore:

| Property | Description |
| -------- | ----------- |
| metadata-keystore.password|The keystore password|
| metadata-keystore.aliases=metadata|A comma separated list of aliases for the keys in the keystore.|
| metadata-keystore.metadata.password|Key password.|
| metadata-keystore.metadata.algorithm|Key algorithm.|

The new keystore properties use the following format:

```text
[keystore-id].password - keystore password
[keystore-id].aliases - comma separated list of aliases for the keys in the keystore
[keystore-id].[alias].keyData - key data bytes in base64
[keystore-id].[alias].algorithm - key algorithm
[keystore-id].[alias].password - key password
```

The **keystore-id** can be one of the predefined IDs: `metadata-keystore`, `metadata-backup-keystore`, `ssl-keystore`, `ssl-truststore`.

> **Note:** The default configuration of Content Services contained a "metadata" keystore, but it was insecure if you did not regenerate it with your own password. This default keystore has been removed. To ensure your installation is secure you need to regenerate the keystore and configure the new one with the properties above.

The default algorithm used to generate keys does not have acceptable strength (DES). We recommend you use AES which has been reflected in the default configuration. The recommended property values for this will be:

```text
encryption.keystore.type=pkcs12
encryption.cipherAlgorithm=AES/CBC/PKCS5Padding
encryption.keyAlgorithm=AES
metadata-keystore.password=<password>
metadata-keystore.aliases=metadata
metadata-keystore.metadata.password=<password>
metadata-keystore.metadata.algorithm=AES
```

And the keys can be generated using

```bash
keytool -genseckey -dname "$CERT_DNAME" -validity ${CERT_VALIDITY} -alias metadata -keyalg AES -keysize 256 -keystore ${TOMCAT_DIR}/shared/classes/alfresco/keystore/keystore -storetype pkcs12 -storepass ${KEYSTORE_PASSWORD}
```

> **Important:** Currently it's not possible to upgrade the key in keystore to a new one which means during the upgrade process you'll need to specify your configuration in a more secure way and use the old keystore file. The configuration for this upgrade scenario will be:
>
> ```text
> encryption.keystore.type=JCEKS
> encryption.cipherAlgorithm=DESede/CBC/PKCS5Padding
> encryption.keyAlgorithm=DESede
> encryption.keystore.location=<path-to-keystore-file>
> metadata-keystore.password=mp6yc0UD9e
> metadata-keystore.aliases=metadata
> metadata-keystore.metadata.password=oKIWzVdEdA
> metadata-keystore.metadata.algorithm=DESede
> ```

Some other general encryption properties are:

```text
encryption.keySpec.class=org.alfresco.encryption.DESEDEKeyGenerator
encryption.keyAlgorithm=DESede
encryption.cipherAlgorithm=DESede/CBC/PKCS5Padding
```

Because of these encryption properties, the keystores and metadata files can be easily located. Also, the metadata file uses a clear text password to access the keystore. For this reason, appropriate operating system permissions should be applied so that the files can't be accidentally changed nor read by anyone other than an administrator and the username running the repository.

Each keystore must have a corresponding keystore metadata file. This file contains the passwords, its keys, and other metadata relevant to the keystore. The metadata file must contain three entries:

* `aliases=<active key aliases in the key store>`
* `keystore.password=<key store password>`
* `metadata.password=<metadata key password>`

At bootstrap, the repository checks if the metadata key in the main keystore has been changed (unless running in the fallback mode, in which case the backup keystore is checked instead). This prevents accidental changes to the keystore. If it detects that the metadata key has been changed, an exception will occur and the bootstrap will stop.

### Keystore generation

Keystore generation can be automatic or manual.

**Automatic keystore generation**

During bootstrap, if the repository detects a missing secret key keystore, it'll dynamically create a keystore containing a single metadata secret key. In order to do this, the repository assumes the existence of a keystore metadata file containing information about the metadata key. Specifically, it expects the following properties to be set:

|Property|Description|
|--------|-----------|
|[keystore-id].password|The keystore password.|
|[keystore-id].aliases|A comma separated list of aliases for the keys in the keystore.|
|[keystore-id].[alias].keyData|Key data bytes in base64.|
|[keystore-id].[alias].algorithm | Specifies the key algorithm used to generate the secret key.Each Java environment may support a different set of algorithms. For the list of algorithm names that can be specified, see [SecretKeyFactory Algorithms](https://docs.oracle.com/javase/8/docs/technotes/guides/security/StandardNames.html#SecretKeyFactory).<br><br>For `keytool` defaults specific to the secret key generation, see the [Oracle documentation - keytool](https://docs.oracle.com/javase/8/docs/technotes/tools/windows/keytool.html#CHDGIGAE).|
|[keystore-id].[alias].password|Key password.|

The `keyData` can be generated by executing the class `org.alfresco.encryption.GenerateSecretKey` as shown below:

```bash
java -classpath "projects/3rd-party/lib/commons/commons-codec-1.4.jar:projects/core/build/dist/alfresco-core-4.0.a.jar"
 org.alfresco.encryption.GenerateSecretKey
```

**Manual keystore generation**

A new keystore can be generated using the Java `keytool` command as shown below:

```bash
keytool -genseckey -alias metadata -keypass <metadata key password> -storepass <key store password> -keystore keystore
 -storetype JCEKS -keyalg DESede
```

> **Note:** Make sure the keystore is placed in the location specified by the property `encryption.keystore.location` and that the passwords you've used in the `keytool` commands are placed in the file specified by the property `encryption.keystore.keyMetaData.location`.

### Keystore key registration

The keystore keys are registered with the repository to ensure that they're not accidentally changed.

During bootstrap and JMX keystore reload and re-encryption operations, the repository checks if the main keystore's keys and the metadata key have changed. If they have changed, the repository throws an exception.

### secure credentials store {#secure-credentials-store}

Alfresco uses a secure store for credentials it needs to maintain for user accounts. This data encryption uses secret keys which are stored in the Java keystore. It is possible to rotate the keys used for credentials encryption.

During bootstrap, the repository checks whether the keys in the main encrypted properties keystore have been changed in order to detect any accidental keystore changes.

However if you purposely want to change your keys, you can do so and the repository will re-encrypt any existing encrypted node properties for you. The newly encrypted node properties will be encrypted using the new keys.

Changing your keys involves backing up your keystore to a specific location and creating a new keystore in its place. This can be done in two ways:

-   During bootstrap
-   During runtime (not in Alfresco Community Edition)

**Bootstrap Re-encryption**

Re-encryption occurs during the repository bootstrap. For bootstrap re-encryption, follow the steps below:

1.  Stop the Alfresco Content Services server.
2.  Set the following property in the `alfresco-global.properties` file.

    ```
    encryption.bootstrap.reencrypt=true 
    ```

3.  Backup the current keystore to backup-keystore as shown below:

    ```
    mv keystore backup-keystore
    mv keystore-passwords.properties backup-keystore-passwords.properties
    ```

4.  Copy your new keystore over the old keystore.
5.  Update keystore-passwords.properties with the passwords you used to create the keystore. In other words, update the `keystore.password` property with the keystore password and the `metadata.password` property with the metadata key password.
6.  Restart the server.

**Runtime Re-encryption**

Re-encryption occurs while the repository is running. For runtime re-encryption, follow the steps below:

1.  Backup the current keystore to backup-keystore.

    ```
    mv keystore backup-keystore
    mv keystore-passwords.properties backup-keystore-passwords.properties
    ```

2.  Copy your new keystore over the old keystore.
3.  In your JMX console, execute the operation **Encryption** > **Operations** > **Encrypt**.

    This will re-read the main and backup keystores and re-encrypt the encrypted properties. The repository can continue to run during this operation; any newly-created encrypted properties will be encrypted with the new key.

    > **Note:** Only a single re-encryption can be done at a particular time. If a re-encrypt is already running then subsequent requests have no effect.

## Cryptographic password hashing {#bcryptoverview}

Content Services uses cryptographic password hashing technique to securely store passwords.

All versions prior to Alfresco One 5.1.5 used the MD4 (Message Digest 4) and SHA256 hash algorithms (mainly to support NTLM) to store critical data. But this is no longer considered a secure approach as the hashed password is very easy to decrypt. You now have the option to configure Content Services to use Bcrypt to store passwords. By default, the system uses MD4 to allow users to use MD4 hashed passwords for `alfrescoNTLM` authentication.

Bcrypt is an adaptive hash function based on the Blowfish symmetric block cipher cryptographic algorithm. It is incredibly slow to hash input compared to other functions, but this results in a much better output hash. Content Services is configured to use a strength of `10` to provide a good compromise of speed and strength.

With Bcrypt, the hashing algorithm (also called an encoder) can be configured by setting the `system.preferred.password.encoding` property in the `alfresco-global.properties` file. The supported values for this property are:

* `md4`
* `sha256`
* `bcrypt10`

If you provide a different value, the repository won't start.

To maintain backwards compatibility with previous versions, the default setting for this property is:

```text
system.preferred.password.encoding=md4
```

After upgrading to the latest Content Services version, when the user logs in or changes the password, the system rehashes the password using the preferred encoding mechanism and stores the mechanism being used. If the preferred encoding is set to `md4`, the system moves the current hashed passwords for that user.

> **Note:** If SAML SSO is enabled, cryptographic password rehashing won't work at login.

You can run a background job to completely remove all the old hashed passwords for those users that have not logged in yet. If the system is still set to `md4`, all user objects will be upgraded. However, the background job will maintain the current hash.

If the background job is executed after the `system.preferred.password.encoding` property has been changed, it'll double-hash all the user objects in the system (unless they have already been upgraded by the user logging in). As a result, the system will temporarily hash (until the user logs in) the current hashed password, store the list of encoders used, and clean out the old hashes.

The background job uses the repository's `BatchProcessor` to execute the job. The execution of the job can be controlled if necessary via the following properties:

| Property | Description |
| -------- | ----------- |
| system.upgradePasswordHash.jobBatchSize | Specifies the number of user objects to process in each batch. |
| system.upgradePasswordHash.jobQueryRange | Specifies the `nodeId` range to search for in each iteration. |
| system.upgradePasswordHash.jobThreadCount | Specifies the number of threads the batch processor uses. |

Out of the box, this background job is enabled but set to a future date. To configure it, set the `system.upgradePasswordHash.jobCronExpression` property in the `alfresco-global.properties` file. For example, the following setting runs the job every 10 minutes:

```text
system.upgradePasswordHash.jobCronExpression=0 0/10 * * * ?
```

Alternatively, the job can be executed immediately via a JMX console. The job makes use of `JobLockService` so it is safe to run in a clustered environment.

If the password upgrade job is enabled, make sure you enable the `log4j.logger.org.alfresco.repo.security.authentication.UpgradePasswordHashWorker` logging in `log4j.properties`.

You can either set it to `trace` or `debug` as shown below:

```text
log4j.logger.org.alfresco.repo.security.authentication.UpgradePasswordHashWorker=trace
```

OR

```text
log4j.logger.org.alfresco.repo.security.authentication.UpgradePasswordHashWorker=debug
```

`Trace` displays a list of all the processed users. `Debug` is a slightly less verbose output; it displays a list of only those users whose password was changed.

To monitor users that have their passwords upgraded when they log in, add the following in `log4j.properties`:

```text
log4j.logger.org.alfresco.repo.security.authentication.HashPasswordTransactionListener=debug
```

## Encrypting properties {#encryptconfigprops}

The `alfresco-global.properties` file (and other subsystem properties file) holds configuration properties that contain sensitive information or passwords, such as `db.password`. All the properties that can be specified in Content Services under the `alfresco-global.properties` file can be encrypted.

Use this information to encrypt any property using the Alfresco Encrypted Properties Management Tool. This tool uses the RSA/ECB/PKCS1PADDING encryption algorithm.

> **Note:** This functionality is not related to [cryptographic password hashing](#bcryptoverview).

> **Important:** Boolean properties, number properties, and properties that contain expressions can't be encrypted.

The values for some of the properties that may contain sensitive data (see the list below) is hidden from JMX whereas other values, including non-sensitive values are shown in JMX. The administrator can set new values for the security-sensitive properties in JMX but they can't see the old value.

Here is the list of protected attributes (the value for these will be masked in the JMX console and Admin Console UI):

* `alfresco_user_store.adminpassword`
* `db.password`
* `mail.password`
* `solr.solrPassword`
* `cryptodoc.jce.key.passwords`
* `cryptodoc.jce.keystore.password`
* `ldap.synchronization.java.naming.security.credentials`

### Encrypting configuration properties

You can encrypt sensitive properties in the `alfresco-global.properties` configuration file.

1. Run the Alfresco Encrypted Properties Management Tool.

    1. Navigate to `<ALFRESCO_HOME>/bin` directory.

    2. Locate the Alfresco Encrypted Properties Management Tool, `alfresco-spring-encryptor.jar`.

    3. Run the executable jar file.

        ```bash
        java -jar alfresco-spring-encryptor.jar
        ```

    ![tool]({% link content-services/images/tool.png %})

2. Generate the public and private keys using the `initkey` function. The public and private key pair is stored in the enterprise directory.

    ```bash
    java -jar alfresco-spring-encryptor.jar initkey c:/alfresco/tomcat/shared/classes
    ```

    ![init]({% link content-services/images/init.png %})

    You now have a public key (`alfrescoSpringKey.pub`) and a private key (`alfrescoSpringKey.pri`) in your `<ALFRESCO_HOME>/tomcat/shared/classes/alfresco/extension/enterprise` directory.

    > **Note:** The private key file should be secured with the operating system permissions so that only the Content Services process can read it.

    > **Note:** Anyone can encrypt new values with the public key but only the Alfresco process can read the plain text value with the private key.

3. Generate the encrypted string for your password/value using the `encrypt` function.

    ```bash
    java -jar alfresco-spring-encryptor.jar encrypt c:/alfresco/tomcat/shared/classes <password>
    ```

    > **Note:** In the above command, remember to replace `<password>` with the actual password that you want to encrypt.

    ![encrypt]({% link content-services/images/encrypt.png %})

4. Validate that the encrypted value obtained in Step 3 will decrypt the password.

    1. Run the `validate` function.

        ```bash
        java -jar alfresco-spring-encryptor.jar validate c:/alfresco/tomcat/shared/classes <encrypted value>
        ```

        > **Note:** In the above command, remember to replace `<encrypted value>` with encrypted string value obtained in Step 3.

    2. You will be prompted to specify the value. Enter the password/value you want to encrypt.

    3. You will be prompted to specify the value again. Enter the password/value you want to encrypt.

    ![validate]({% link content-services/images/validate.png %})

5. Add the encrypted password to `<ALFRESCO_HOME>/tomcat/shared/classes/alfresco-encrypted.properties` file.

    ```text
    db.password.enc=ENC(<enter encrypted password here>)
    ```

    For example:

    ```text
    db.password.enc=ENC(QcAf1Lr81meuP2p6Lu9ZQqFY1AsCfoWd)
    ```

    > **Note:** Uncomment the `db.password.enc` property by removing the "#" character.

6. Set the value of the `db.password` property in the `alfresco-global.properties` file to point to the `db.password.enc` property in the `alfresco-encrypted.properties` file.

    ```text
    db.password=${db.password.enc}
    ```

    > **Note:** Uncomment the `db.password` property by removing the "#" character.

## Authorities

Authorities are people (or persons) or groups.

A group can contain people or other groups as members. The authorities assigned to a user at any time are the `userName` from their associated `Person` node, all of the groups in which the user is a direct or indirect member, and any appropriate dynamic authorities. Dynamic authorities are used for internal roles.

### Dynamic authorities and roles

Content Services uses some custom roles. To implement a custom role, you create a dynamic authority for that role and assign global permissions to it. The internal roles have not been assigned any object-specific rights.

The internal roles are:

* `ROLE_ADMINISTRATOR` is assigned to the default administrators for the configured authentication mechanisms or members of the administration groups defined on the `AuthorityServiceImpl` bean. This role has all rights.
* `ROLE_OWNER` is assigned to the owner of a node. If there is no explicit owner, this role is assigned to the creator. This role has all rights on the owned node.
* `ROLE_LOCK_OWNER` is assigned to the owner of the lock on a locked node. This supports a lock owner’s right to check in, cancel a check out, or unlock the node.

Alfresco Share supports the assignment of permissions only to the owner role. You can use such things as the Java API and scripting to make other assignments.

> **Note:** Hierarchical and zoned roles can be added in the future to avoid the hidden group implementation for true roles.

### People and users

When a user logs in, Content Services validates the user’s identifier and password. It uses the identifier to look up the appropriate person details for the user, using the `userName` property on the Person type. You can configure this look-up to be case sensitive or case insensitive. The `userName` property on the matching Person node is used as the actual user authority; it might differ in case from the user identifier presented to the authentication system. After the `Person` node look-up, Content Services is case sensitive when matching authorities to permissions, group membership, roles, and for all other authorization tests.

Any user, who authenticates by any mechanism, must have an associated person node. `Person` nodes can be:

* Explicitly created
* Created on demand with some default entries
* Created from LDAP synchronization

Person nodes are explicitly created when using Alfresco Share to manage users.

By default, person nodes are auto-created if not present. If an external authentication system is configured, when any user authenticates, an appropriate person node might not exist. If a person node does not exist and auto-creation is enabled, a person node will then be created using the identifier exactly as presented by the user and validated by the authentication system. The auto-created Person node’s userName will have the same case as typed by the user. LDAP synchronization will create person nodes with the userName, as provided from the LDAP server.

It is possible that LDAP synchronization can change the `userName` associated with a `Person` node. This can happen with a system that uses LDAP synchronization, or a system that creates person nodes on demand, or uses case-insensitive authentication. For example, Andy could log in as “Andy” and the associated Person node is created with the `userName` “Andy.” Later, the LDAP synchronization runs and changes the `userName` to “andy”.

Changes to `Person` node `userName`s will cause updates to other related data, such as ACL assignment.

### Groups

Groups are collections of authorities with a name and display name.

Groups can include other groups or people. You can include a group in one or more other groups, as long as this inclusion does not create any cyclic relationships.

### Zones

All person and group nodes are in one or more zones. You can use zones for any partitioning of authorities. For example, synchronization uses zones to record from which LDAP server users and groups have been synchronized. Zones are used to hide some groups that provide Role Based Access Control (RBAC) role-like functionality from the administration pages of Alfresco Share. Examples of hidden groups are the roles used in Share and Alfresco Records Management. Only users and groups in the default zone are shown for normal group and user selection on the group administration pages. Zones can't be managed from the administration pages of Share.

Zones are intended to have a tree structure defined by naming convention. Zones are grouped into two areas: *Application-related* zones and *authentication-related* zones.

Within a zone, a group is considered to be a root group if it's not contained by another group in the same zone.

Content Services uses a model for persisting people, groups, and zones. A Person node represents each person, and an `AuthorityContainer` represents groups, which can be used for other authority groupings such as roles. AuthorityContainer and Person are sub-classes of Authority and as such can be in any number of Zones.

![secur-model]({% link content-services/images/secur-model.png %})

#### Application-related zones

Application-related zones, other than the default, hide groups that implement RBAC like roles. Application zones, by convention, start APP. and include:

* `APP.DEFAULT` is for person and group nodes to be found by a normal search. If no zone is specified for a person or group node, they will be a member of this default zone.
* `APP.SHARE` is for hidden authorities related to Alfresco Share.
* `APP.RM` will be added for authorities related to RM.

#### Authorization-related zones

Zones are also used to record the primary source of person and group information. They can be held within Content Services or some external source. While authorities can be in many zones, it makes sense for an authority to be in only one authentication-related zone.

* `AUTH.ALF` is for authorities defined within Content Services and not synchronized from an external source. This is the default zone for authentication.
* `AUTH.EXT.<ID>` is for authorities defined externally, such as in LDAP.

## Define permissions

Permissions and their groupings are defined in an XML configuration file.

The default file is found in the distribution configuration directory as [permissionDefinitions.xml](https://github.com/Alfresco/alfresco-repository/blob/af2e069b2eabcd5433cee39d83ec06bad6fc69a0/src/main/resources/alfresco/model/permissionDefinitions.xml){:target="_blank"}. This configuration can be replaced or extended.

The following example uses the permission definitions related to the `Ownable` aspect.

```xml
<!-- ============================================== -->
   <!-- Permissions associated with the Ownable aspect -->
   <!-- ============================================== -->

   <permissionSet type="cm:ownable" expose="selected">

      <!-- Permission control to allow ownership of the node to be taken from others -->
      <permissionGroup name="TakeOwnership" requiresType="false" expose="false">
        <includePermissionGroup permissionGroup="SetOwner" type="cm:ownable" />
      </permissionGroup>

      <permissionGroup name="SetOwner" requiresType="false" expose="false"/>

      <!-- The low level permission to control setting the owner of a node -->
      <permission name="_SetOwner" expose="false" requiresType="false">
        <grantedToGroup permissionGroup="SetOwner" />
        <requiredPermission on="node" type="sys:base" name="_WriteProperties" />
      </permission>

</permissionSet>
```

Permissions and permission groups are defined in a permission set, which is a sub-element of the permissions root element. A permission set is associated with a type or aspect and applies only to that type and sub-types, or aspect and sub-aspects.

A permission has a name. By convention, the names of permissions start with an underscore character. A permission, in its definition, can be granted to any number of permission groups. This means that those permission groups will include the permission. The permission might require that the type or aspect specified on the permission set be present on the node. If a permission is associated with an aspect and the requiresType property is set to true then if that aspect is not applied to a node, the permission does not apply to that node either. If an aspect-related permission definition has the requiresType property set to false, the permission applies to any node, even if the aspect has not been applied to the node.

An aspect can be applied at any time and there are no restrictions as to which aspects can be applied to a type. A permission might also require other permissions be tested on the same node, its children, or its parent. In the example, `_SetOwner` requires `_WriteProperties`. This means you can't set ownership on a node if you're not allowed to write to its properties. You can also use this to check that all children can be deleted before deleting a folder, or to enforce that you can only read nodes for which you can read all the parents; neither are normally required. The configuration to do this is present in the standard configuration file but is commented out. The `_DeleteNode` permission definition (as shown in the following code snippet) is an example. If permission `A` requires permission `B` and this requirement is implied (by setting the implies attribute of the `requiredPermission`element to `true`), assigning an authority permission `A` will also give them permission `B` (as opposed to checking they have permission `B`).

```xml
<permission name="_DeleteNode" expose="false" >
    <grantedToGroup permissionGroup="DeleteNode" />
    <!-- Commented out parent permission check ...
    <requiredPermission on="parent" name="_ReadChildren" implies="false"/>
    <requiredPermission on="parent" name="_DeleteChildren" implies="false"/>
    <requiredPermission on="node" name="_DeleteChildren" implies="false"/>
     -->
    <!-- Recursive delete check on children -->
    <!--  <requiredPermission on="children" name="_DeleteNode" implies="false"/>  -->
</permission>
```

Permissions are normally hidden inside permission groups. Permission groups are made up of permissions and other permission groups. By convention, each permission has a related permission group. Permission groups can then be combined to make other permission groups. As for permissions, a permission group can be exposed by the administration pages of Alfresco Share and might require the presence of a type or aspect to apply to a particular node. In addition, a permission group can allow full control, which grants all permissions and permission groups. As a type or aspect can extend another, a permission group defined for a type or aspect can extend one defined for one of its parent types and be assigned more permissions, include more permission groups, or change what is exposed in the administration pages of the Alfresco Share web clients.

It is unusual to extend or change the default permission model unless you're adding your own types, aspects, and related public services or you wish to make minor modifications to the existing behavior. The following code snippets show how to extend and replace the default permission model.

```xml
<bean id='permissionsModelDAO'
class="org.alfresco.repo.security.permissions.impl.model.PermissionModel" init-method="init">
        <property name="model">
<-- <value>alfresco/model/permissionDefinitions.xml</value> -->
<value>alfresco/extension/permissionDefinitions.xml</value>
        </property>
        <property name="nodeService">
            <ref bean="nodeService" />
        </property>
        <property name="dictionaryService">
            <ref bean="dictionaryService" />
        </property>
</bean>
```

The preceding code example shows how to replace the default permission model with one located in the `alfresco/extension` directory. The following code snippet shows how to extend the existing model.

```xml
<bean id="extendPermissionModel" parent="permissionModelBootstrap">
   <property name="model" value="alfresco/extension/permissionModelExtension.xml" />
</bean>
```

### Control site creation permissions

By default, any authenticated user can create sites in Share. The creator of the new site is given the `Site Manager` role and they control who has access to the site and in what role.

The beans that enforce security to the repository services based on the currently authenticated user are defined in the [public-services-security-context.xml](https://github.com/Alfresco/alfresco-repository/blob/alfresco-repository-6.8/src/main/resources/alfresco/public-services-security-context.xml) file.

1. **Copy** the following code and add it to the `<extension>/custom-model-context.xml` file.

    ```xml
    <?xml version='1.0' encoding='UTF-8'?>
    <!DOCTYPE beans PUBLIC '-//SPRING//DTD BEAN//EN' 'http://www.springframework.org/dtd/spring-beans.dtd'>
    <beans>
        <bean id="SiteService_security" class="org.alfresco.repo.security.permissions.impl.acegi.MethodSecurityInterceptor">
            <property name="authenticationManager"><ref bean="authenticationManager"/></property>
            <property name="accessDecisionManager"><ref bean="accessDecisionManager"/></property>
            <property name="afterInvocationManager"><ref bean="afterInvocationManager"/></property>
            <property name="objectDefinitionSource">
                <value>
                   org.alfresco.service.cmr.site.SiteService.cleanSitePermissions=ACL_NODE.0.sys:base.ReadProperties
                   org.alfresco.service.cmr.site.SiteService.createContainer=ACL_ALLOW,AFTER_ACL_NODE.sys:base.ReadProperties
                   org.alfresco.service.cmr.site.SiteService.createSite=ACL_METHOD.GROUP_SITE_CREATORS
                   org.alfresco.service.cmr.site.SiteService.deleteSite=ACL_ALLOW
                   org.alfresco.service.cmr.site.SiteService.findSites=ACL_ALLOW,AFTER_ACL_NODE.sys:base.ReadProperties
                   org.alfresco.service.cmr.site.SiteService.getContainer=ACL_ALLOW,AFTER_ACL_NODE.sys:base.ReadProperties
                   org.alfresco.service.cmr.site.SiteService.listContainers=ACL_ALLOW,AFTER_ACL_NODE.sys:base.ReadProperties
                   org.alfresco.service.cmr.site.SiteService.getMembersRole=ACL_ALLOW
                   org.alfresco.service.cmr.site.SiteService.getMembersRoleInfo=ACL_ALLOW
                   org.alfresco.service.cmr.site.SiteService.resolveSite=ACL_ALLOW
                   org.alfresco.service.cmr.site.SiteService.getSite=ACL_ALLOW,AFTER_ACL_NODE.sys:base.ReadProperties
                   org.alfresco.service.cmr.site.SiteService.getSiteShortName=ACL_ALLOW,AFTER_ACL_NODE.sys:base.ReadProperties
                   org.alfresco.service.cmr.site.SiteService.getSiteGroup=ACL_ALLOW
                   org.alfresco.service.cmr.site.SiteService.getSiteRoleGroup=ACL_ALLOW
                   org.alfresco.service.cmr.site.SiteService.getSiteRoles=ACL_ALLOW
                   org.alfresco.service.cmr.site.SiteService.getSiteRoot=ACL_ALLOW,AFTER_ACL_NODE.sys:base.ReadProperties
                   org.alfresco.service.cmr.site.SiteService.hasContainer=ACL_ALLOW
                   org.alfresco.service.cmr.site.SiteService.hasCreateSitePermissions=ACL_ALLOW
                   org.alfresco.service.cmr.site.SiteService.hasSite=ACL_ALLOW
                   org.alfresco.service.cmr.site.SiteService.isMember=ACL_ALLOW
                   org.alfresco.service.cmr.site.SiteService.listMembers=ACL_ALLOW
                   org.alfresco.service.cmr.site.SiteService.listMembersInfo=ACL_ALLOW
                   org.alfresco.service.cmr.site.SiteService.listMembersPaged=ACL_ALLOW
                   org.alfresco.service.cmr.site.SiteService.listSiteMemberships=ACL_ALLOW
                   org.alfresco.service.cmr.site.SiteService.listSites=ACL_ALLOW,AFTER_ACL_NODE.sys:base.ReadProperties
                   org.alfresco.service.cmr.site.SiteService.listSitesPaged=ACL_ALLOW,AFTER_ACL_NODE.sys:base.ReadProperties
                   org.alfresco.service.cmr.site.SiteService.removeMembership=ACL_ALLOW
                   org.alfresco.service.cmr.site.SiteService.canAddMember=ACL_ALLOW
                   org.alfresco.service.cmr.site.SiteService.setMembership=ACL_ALLOW
                   org.alfresco.service.cmr.site.SiteService.updateSite=ACL_ALLOW
                   org.alfresco.service.cmr.site.SiteService.countAuthoritiesWithRole=ACL_ALLOW
                   org.alfresco.service.cmr.site.SiteService.isSiteAdmin=ACL_ALLOW
                   org.alfresco.service.cmr.site.SiteService.*=ACL_DENY
                </value>
            </property>
        </bean>
    </beans>
    ```

2. **Modify** the inserted `SiteService_security` bean to match your requirements. For example:

    To give permission to only Administrators to create site, change:

    ```text
    org.alfresco.service.cmr.site.SiteService.createSite=ACL_ALLOW
    ```

    to

    ```text
    org.alfresco.service.cmr.site.SiteService.createSite=ACL_METHOD.ROLE_ADMINISTRATOR
    ```

    where, `ACL_ALLOW` executes a method that allows access to all users and `ACL_METHOD.ROLE_ADMINISTRATOR` executes a method that allows access to users who are members of the administrator group.

3. **Save** the file.

4. **Restart** Content Services.

## Access Control Lists

An Access Control List (ACL) is an ordered list of one or more Access Control Entries (ACE). An ACE associates a single authority to a single permission group or permission, and states whether the permission is to be allowed or denied. All nodes have an associated ACL.

There is one special, context-free, ACL defined in the XML configuration to support global permissions. An ACL specifies if it should inherit ACEs from a parent ACL. The parent ACL is associated with the primary parent node. When a new node is created it automatically inherits all ACEs defined on the parent within which it is created. Linking a node to a secondary parent has no effect on ACE inheritance; the node will continue to inherit permission changes from its primary parent (defined when it was first created).

By default, ACL inheritance is always from the primary parent. The underlying design and implementation does not mandate this. ACL inheritance does not have to follow the parent child relationship. It is possible to change this through the Java API.

There are several types of ACL defined in ACLType. The main types are:

* `DEFINING`
* `SHARED`
* `FIXED`
* `GLOBAL`

A node will be associated with an ACL. It will have a DEFINING ACL if any ACE has been set on the node. DEFINING ACLs include any ACEs inherited from the node’s primary parent and above, if inheritance is enabled. All DEFINING ACLs are associated with one SHARED ACL. This SHARED ACL includes all the ACEs that are inherited from the DEFINING ACL. If the primary children of a node with a DEFINING ACL do not themselves have any specific ACEs defined then they can be assigned the related SHARED ACL. For the primary children of a node with a SHARED ACL that also have no specific ACEs set they can use the same SHARED ACL. A single SHARED ACL can be associated with many nodes. When a DEFINING ACL is updated, it'll cascade update any related ACLs by using the ACL relationships rather than walk the node structure. If a DEFINING ACL inherits ACEs, then these will come from the SHARED ACL related to another DEFINING ACL.

ACLs and nodes have two linked tree structures.

FIXED ACLs are not associated with a node but found by name. A node ACL could be defined to inherit from a fixed ACL. A GLOBAL ACL is a special case of a FIXED ACL with a well known name. It will be used to hold the global ACE currently defined in XML.

ACEs comprise an authority, a permission, and a deny/allow flag. They are ordered in an ACL.

### ACL ordering and evaluation

The ACEs within an ACL are ordered and contain positional information reflecting how an ACE was inherited. DEFINING ACLs have entries at even positions; SHARED ACLs have entries at odd positions. For a DEFINING ACL, any ACEs defined for that ACL have position 0, any inherited from the parent ACL have position two, and so on. For a SHARED ACL, ACEs defined on the ACL from which it inherits will have position one.

When Content Services makes permission checks, ACEs are considered in order with the lowest position first. Deny entries take precedence over allow entries at the same position. Once a deny entry is found for a specific authority and permission combination, any matching ACE, at a higher position from further up the inheritance chain, is denied. A deny for one authority does not deny an assignment for a different authority. If a group is denied `Read` permission, a person who is a member of that group can still be assigned `Read` permission using another group or directly with their person `userName`. However, if an authority is granted `Read` (made up of `ReadContent` and `ReadProperties`) and the same authority denied `ReadContent`, they will just be granted `ReadProperties` permission. The administration pages of Alfresco Share do not expose deny.

The default configuration is `any deny denies`. This is set by adding the following property to the `alfresco-global.properties` file:

```text
security.anyDenyDenies=true
```

You can alter the configuration to support `any allow allows`. This is set by adding the following property to the `alfresco-global.properties` file:

```text
security.anyDenyDenies=false
```

### An ACL example

This example relates a tree of nodes to two corresponding trees of ACLs. The nodes in the node tree are identified by number and are shown filled in black if they have any ACEs set, or white/clear if not. Primary child relationships are drawn as black lines and secondary child relationships as dashed lines. ACLs in the ACL trees are identified by letter, DEFINING ACLs are shown filled in black, and SHARED ACLs are shown as clear. Under each node on the node tree the related ACL is referenced.

![secur-acl-example]({% link content-services/images/secur-acl-example.png %})

The table describes the ACEs in each ACL and their position.

|ACL format|Authority|Permission|Allow/Deny|Position|
|----------|---------|----------|----------|--------|
|ACL A (Defining, no inheritance)|All|Read|Allow|0|
|ACL B (Shared, inherits from ACL A)|All|Read|Allow|1|
|ACL C (Defining, inherits from ACL B)|All|Read|Allow|2|
|ROLE_OWNER|All|Allow|0|
|GROUP_A|Write|Allow|0|
|GROUP_A|CreateChildren|Allow|0|
|ACL D (Shared, inherits from ACL C)|ALL|Read|Allow|3|
|ROLE_OWNER|All|Allow|1|
|GROUP_A|Write|Allow|1|
|GROUP_A|CreateChildren|Allow|1|
|ACL E (Defining, inherits from ACL B)|All|Read|Allow|2|
|Andy|All|Allow|0|
|Bob|Write|Allow|0|
|Bob|WriteContent|Deny|0|
|ACL F (Shared, inherits from ACL E)|All|Read|Allow|3|
|Andy|All|Allow|1|
|Bob|Write|Allow|1|
|Bob|WriteContent|Deny|1|
|ACL G (Defining, no inheritance)|Bob|All|Allow|0|
|ACL H (Shared, inherits from ACL G)|Bob|All|Allow|1|

ACL A, and any ACL that inherits from it, allows `Read` for everyone (All) unless permissions are subsequently denied for everyone (All). If ACL A is changed, all the ACLs that inherit from ACL A in the ACL tree will reflect this change. In the example, nodes 1-12 would be affected by such a change. Nodes 13 and 14 would not inherit the change due to the definition of ACL G.

ACL C adds `Contributor` and `Editor` permissions for any authority in `GROUP_A`.

> **Note:** The `GROUP_` prefix is normally hidden by the administration pages of Alfresco Share.

Anyone in `GROUP_A` can edit existing content or create new content. The owner ACE means that anyone who creates content then has full rights to it. The ACE assignment for owner is not normally required as all rights are given to node owners in the context-free ACL defined in the default permission configuration.

ACL E adds some specific user ACEs in addition to those defined in ACL A. As an example, it allows Bob `Write` but also denies `WriteContent`. `Write` is made up of `WriteContent` and `WriteProperties`. Bob will only be allowed `WriteProperties`.

ACL G does not inherit and starts a new ACL tree unaffected by any other ACL tree unless an inheritance link is subsequently made.

If a new node was created beneath node 13 or 14 it would inherit ACL H. If a new node was created beneath nodes 1, 6, 7, or 8 it would inherit ACL B.

If a node that has a shared ACL has an ACE set, a new defining ACL and a related shared ACL are inserted in the ACL tree. If a defining ACL has all its position 0 ACEs removed, it still remains a defining ACL: There is no automatic clean up of no-op defining ACLs.

## Modify access control

Modifying access control can involve changing definitions, adding services, defining types and aspects, or adding definitions to new or existing security interceptors.

Main functions include:

* Changing the definition of existing security interceptors to check for different conditions
* Adding new public services and related security interceptors
* Defining new types and aspects and their related permissions
* Adding new definitions to the security interceptor by implementing an ACEGI `AccessDecisionVoter` and/or `AfterInvocationProvider` (in extreme cases)

A few constraints and design patterns should be observed when modifying access control. Permissions apply to the node as whole. In particular, the same Read rights apply to all properties and content. You should check that methods can be executed and not that a user has a particular permission. The access control restrictions for a public service method can change. Follow the design pattern to implement RBAC roles.

When modifying access control, do not try to split `ReadProperties` and `ReadContent`. This does not make sense for search. A node and all of its properties, including content, are indexed as one entity. Splitting the evaluation of access for content and properties is not possible. Search would have to apply both criteria so as to not leak information. Other services, such as copy, might not behave as expected or might produce nodes in an odd state.

Permissions are assigned at the node level, not at the attribute level. Again, this makes sense with the search capabilities. Search results need to reflect what the user performing the search can see. It makes sense that all properties have the same `Read` access as the node, as nodes are indexed for searching and not individual properties. Applying `Read` ACLs at the property level would require a change to the indexing implementation or a complex post analysis to work out how nodes were found by the search. If not, the values of properties could be deduced by how a readable node was found from a search on restricted properties.

Fine grain attribute permissions could be implemented by using children nodes to partition metadata. Queries would have to be done in parts and joined by hand, as there is no native support for SQL-like join.

Check that method execution is allowed and not that the user has a fixed permission. Rather than checking for `Read` permission in code, check that the appropriate method can be called using the `PublicServiceAccessService` bean. This avoids hard coding to a specific permission implementation and is essential if you intend to mix records management and the content repository. The access restrictions for public service methods can change. The `PublicServiceAccessService` bean allows you to test if any public service method can be invoked successfully with a given set of arguments. It checks all the entry criteria for the method and, assuming these have not changed, the method can be called successfully. The method call can still fail if the conditions for the returned object are not met or some security configuration has changed, such as an ACE is removed, a user is removed from a group, or the method fails for a non-authorization reason.

For those coming from an RBAC background, Content Services has roles in the RBAC sense only for limited internal use. To implement RBAC use zoned groups. These groups won't appear in the administration pages of Alfresco Share as normal groups (unless you also add them to the `APP.DEFAULT` zone) but can be used to assign users and groups to roles. This approach has been taken to support roles in Alfresco Share. To map RBAC terminology to Content Services: operations map to method calls on public service beans, objects map to method arguments including nodes (folders, documents, and so on). Users and permissions/privileges map directly. Content Services allows the assignment of permissions to users or groups.

By default, the owner of an object can manage any aspect of its ACL. Users with `ChangePermissions` rights for a node can also change its ACL. If users have the ability to alter the ACL associated with an object, they can allow other users to do the same. There is no restriction on the permissions they can assign. The Content Services model supports liberal discretionary access control with multi-level grant. A user who can grant access can pass on this right without any restriction. In addition, anyone who can change permissions can carry out the revocation of rights: it's not restricted to the original granter. Normally, when someone can perform an operation you would not expect it is because they own the node and therefore have all permissions for that node.

## Public services

Security is enforced around public services. Web services, web scripts, Alfresco Share, WebDAV, FTP, CMIS, and more, all use public services, and therefore include security enforcement.

Public services are defined in [public-services-context.xml](https://github.com/Alfresco/alfresco-repository/blob/af2e069b2eabcd5433cee39d83ec06bad6fc69a0/src/main/resources/alfresco/public-services-context.xml).

Access control allows or prevents users or processes acting on behalf of a user, from executing service methods on a particular object by checking if the current user, or any of the authorities granted to the current user, has a particular permission or permission group, or that the user has a particular authority.

For example, on the `NodeService` bean, the `readProperties` method checks that the current user has `Read` permission for the node before invoking the method and returning the node’s properties. On the `SearchService`, the `query` method results are restricted to return only the nodes for which a user has `Read` permission.

### Public services configuration

Security is enforced in the Spring configuration by defining proxies for each internal service implementation and adding a method interceptor to enforce security for each public service proxy. These interceptors also have other roles. When a method is called on a public service, the security interceptor is called before the method it wraps. At this stage, the interceptor can examine the function arguments to the method and check that the user has the appropriate rights for each argument in order to invoke the method. For example, a method `delete(NodeRef nodeRef)` exists on the node service. The security interceptor can see the `nodeRef` argument before the underlying `delete(...)` method is called. If configured correctly, the interceptor could check that the current user has `Delete` permission for the node. If they do not have the permission, a security exception is raised. If all the entry criteria are met, the method goes ahead.

In a similar manner, after a method has executed the interceptor can examine the returned object and decide if it should return it to the caller. For example, a search method could return a list of nodes. The security interceptor could filter this list for only those nodes for which the current user has `Read` permission.

It is also possible to configure a method so that it can be called by all users, only by users with the admin role, or only by specific users or groups. This can also be enforced by the security method interceptor.

Access control interceptor definitions for public services are included in `<installLocation>\tomcat\webapps\alfresco\WEB-INF\classes\alfresco\public-services-security-context.xml` along with any other supporting beans. This configuration file also defines the location from which the permission model is loaded. The interceptors are wired up to the public services in `<installLocation>\tomcat\webapps\alfresco\WEB-INF\classes\alfresco\public-services-context.xml`. The public services are the only Spring beans to have access control.

### Method-level security definition

Method access is defined in the normal ACEGI manner with some additions.

The beans required to support Spring ACEGI-based security around method invocation are defined in [public-services-security-context.xml](https://github.com/Alfresco/alfresco-repository/blob/alfresco-repository-6.8/src/main/resources/alfresco/public-services-security-context.xml). This configures two specific beans: A voter that can authorize method execution based on the permissions granted to the current user for specific arguments to the method, and an after invocation provider to apply security to objects returned by methods.

For the following information detailing pre-conditions and post-conditions, these factors are all relevant:

* `<authority>`

    Represents an authority (user name or group).

* `<#>`

    Represents a method argument index.

* `<permission>`

    Represents the string representation of a permission.

Pre-conditions take one of the following forms:

* `ACL_METHOD.<authority>`

    Restricts access to the method to those with the given authority. This could be a user name, role or group. Dynamic authorities are not supported.

* `ACL_NODE.<#>.<permission>`

    Restricts access control to users who have the specified permission for the node at the identified argument. If the argument is a `NodeRef`, it'll be used; if it is a `StoreRef`, the root node for the store will be used; if it is a `ChildAssociationRef`, the child node will be used.

* `ACL_PARENT.<#>.<permission>`

    Restricts access control to users who have the specified permission for the parent of the node on the identified argument. If the argument is a `NodeRef`, the parent of the node will be used; if it is a `ChildAssociationRef`, the parent node will be used.

* `ROLE`

    Checks for an authority starting with `ROLE_`.

* `GROUP`

    Checks for an authority starting with `GROUP_`.

Here are some examples of method level security parameters:

* `ACL_METHOD.ROLE_ADMINISTRATOR`: Executes a method that allows access to users who are members of the administrator group.
* `ACL_ALLOW`: Executes a method that allows access to all users.

If more than one `ACL_NODE.<#>.<permission>` , `ACL_PARENT.<#>.<permission>`, or `ACL_METHOD.<permission>` entry is present, then all of the `ACL_NODE` and `ACL_PARENT` permissions must be present and any one of the `ACL_METHOD` restrictions, if present, for the method to execute.

Post-conditions take the forms:

* `AFTER_ACL_NODE.<permission>`

    Similar to `ACL_NODE.<#>.<permission>` but the restriction applies to the return argument.

* `AFTER_ACL_PARENT.<permission>`

    Similar to `ACL_PARENT.<#>.<permission>` but the restriction applies to the return argument.

The support return types are:

* `StoreRef`
* `ChildAssociationRef`
* Collections of `StoreRef`, `NodeRef`, `ChildAssociationRef`, and `FileInfo`
* `FileInfo`
* `NodeRef`
* Arrays of `StoreRef`, `NodeRef`, `ChildAssociationRef`, and `FileInfo`
* `PagingLuceneResultSet`
* `QueryEngineResults`
* `ResultSet`

The post-conditions will create access denied exceptions for return types such as `NodeRef`, `StoreRef`, `ChildAssociationRef`, and `FileInfo`. For collections, arrays, and result sets, their members will be filtered based on the access conditions applied to each member.

Continuing the example from the permissions defined for the `Ownable` aspect, the definition for the security interceptor for the related `OwnableService` is shown in the following code snippet.

```xml
<bean id="OwnableService_security"
  class="org.alfresco.repo.security.permissions.impl.acegi.MethodSecurityInterceptor">
   <property name="authenticationManager"><ref bean="authenticationManager"/></property>
   <property name="accessDecisionManager"><ref local="accessDecisionManager"/></property>
   <property name="afterInvocationManager"><ref local="afterInvocationManager"/></property>
   <property name="objectDefinitionSource">
     <value>
      org.alfresco.service.cmr.security.OwnableService.getOwner=ACL_NODE.0.sys:base.ReadProperties
    org.alfresco.service.cmr.security.OwnableService.setOwner=ACL_NODE.0.cm:ownable.SetOwner
     org.alfresco.service.cmr.security.OwnableService.takeOwnership=ACL_NODE.0.cm:ownable.TakeOwnership
      org.alfresco.service.cmr.security.OwnableService.hasOwner=ACL_NODE.0.sys:base.ReadProperties
      org.alfresco.service.cmr.security.OwnableService.*=ACL_DENY
      </value>
    </property>
</bean>

```

Security for the four methods on the `OwnableService` is defined. To invoke the `OwnableService getOwner()` method on a node, the invoker must have permission to read the properties of the target node. To set the owner of a node, a user must have been explicitly assigned the `SetOwner` permission or have all rights to the node. A user can have all rights to a node by using the context-free ACL or be assigned a permission, which grants all permission or includes `SetOwner`. With the default configuration, a user will own any node they create and therefore be able to give ownership to anyone else and possibly not have the right to take ownership back.

The last entry catches and denies access for any other method calls other than those listed. If any additional methods were added to this service and no security configuration explicitly defined for the new methods, these methods would always deny access.

## Implementation and services

Content Services enforces security services for managing authentication information.

The following key services are involved in access control:

* `AuthenticationService`: responsible for authenticating user name and password.
* `PersonService`: responsible for obtaining a reference to the `Person` node for a given user name. It also creates, deletes and updates personal information.
* `AuthorityService`: responsible for managing authorities.
* `PermissionService`: responsible for managing ACLs and ACEs, and for checking if a user has been assigned a permission for a particular node.
* `OwnableService`: manages object ownership and is used in evaluation the dynamic `ROLE_OWNER` authority.

Let's consider a possible scenario to understand how the security services work. A user logs in using the *authentication service*, which determines the user's authorities, such as their user name (which is a `USER` authority). The *authority service* adds and manages the relevant groups and roles. The *permission service* maps those users, groups and roles to operations on particular nodes. It also controls the inheritance of permissions and provides a common set of default permissions. The *owner service* is related to the special `OWNER` role and it determines the owner of a node. The *person service* deals with the special case of person nodes, which identify users.

The protection of public services methods is implemented using the Spring method interceptors defined as part of the related ACEGI 0.8.2 security package. The Content Services implementation adds new implementations of the ACEGI interfaces `AccessDecisionVoter` and `AfterInvocationProvider`, which support the configuration elements that have already been described (for example, `ACL_NODE.<#>.<permission>`). These extension classes make use of the key services.

### Authentication service

Use this information to understand and configure authentication service.

The authentication service provides an API for:

* Authenticating using a user name and password
* Authenticating using a ticket
* Creating, updating and deleting authentication information
* Clearing the current authentication
* Invalidating a ticket
* Getting the user name for currently authenticated users
* Getting a ticket for subsequent re-authentication

The authenticated user name is used as the key to obtain other security information, such as group membership, the details about the person or to record a user as the owner of an object. It is one of the identifiers against which permissions can be assigned.

The authentication service does not provide any details about a user other than authentication. It stores authentication information on the calling thread. Application developers should ensure that this information is cleared.

The authentication service brings together three components:

* authentication component, which supports authentication;
* authentication DAO, which provides an API to create, delete and update authentication information; and
* ticket component, which manages and stores tickets that can be obtained after authentication and used in place of authentication.

The implementation and configuration for this service can be found in the `authentication-services-context.xml` file. This default implementation coordinates two service providers for `AuthenticationComponent` and `MutableAuthenticationDAO`. It also uses the permission service provider interface to clear up permissions as users are deleted. Tickets are supported using the ticket component.

#### Configure multiple tickets for authentication

For each authentication attempt, Content Services returns a different session ID, but the same ticket for each user. You can configure multiple tickets using the `authentication.ticket.useSingleTicketPerUser` option.

The `TicketComponent` configuration setting, in `alfresco-global.properties`, has an option called `authentication.ticket.useSingleTicketPerUser`. This option has a default setting of `true`, which means that only one ticket is created for each user, and this ticket is returned for every authentication attempt by that user. If the ticket is invalidated, the user is required to re-authenticate before using the repository.

To set multiple tickets for each user, set `authentication.ticket.useSingleTicketPerUser=false`.

### Person service

Use this information to understand and configure of person service.

The `PersonService` interface is the API by which nodes of the person type, as defined in [contentModel.xml](https://github.com/Alfresco/alfresco-repository/blob/af2e069b2eabcd5433cee39d83ec06bad6fc69a0/src/main/resources/alfresco/model/contentModel.xml), should be accessed.

The `PersonService` is responsible for all of the following:

* Obtaining a reference to the Person node for a given user name
* Determining if a person entry exists for a user
* Potentially creating missing people entries with default settings on demand
* Supplying a list of mutable properties for each person
* Creating, deleting, and altering personal information

The beans to support the `PersonService` and its configuration can be found in [authentication-services-context.xml](https://github.com/Alfresco/alfresco-repository/blob/af2e069b2eabcd5433cee39d83ec06bad6fc69a0/src/main/resources/alfresco/authentication-services-context.xml). The principle configuration options are around how people are created on demand if users are managed by using LDAP or some other external user repository.

### Authority service

Use this information to understand and configure authority service, using the `authority-services-context.xml` file.

The authority service is responsible for:

* Creating and deleting authorities
* Querying for authorities
* Structuring authorities into hierarchies
* Supporting queries for membership
* Finding all the authorities that apply to the current authenticated user
* Determining if the current authenticated user has admin rights
* Managing zones and the assignment of authorities to zones

The default implementation allows a list of group names to define both administration groups and guest groups. Each authentication component defines its own default administrative user(s), which can also be set explicitly. The default service is defined in the [authority-services-context.xml](https://github.com/Alfresco/alfresco-repository/blob/alfresco-repository-6.8/src/main/resources/alfresco/authority-services-context.xml) file.

#### Using guestGroups and adminGroups properties

The `authority-services-context.xml`, bean id `authorityService` provides the property configuration of the Authority Service implementation. This configuration also allows the designation of specific groups with `admin` or `guest` permissions in the system.

By listing a group under the `guestGroups` property (case insensitive), the users in that group will only be allowed `guest` permission. Likewise, by listing a group under the `adminGroups` property (case insensitive), the users in that group will be provided `admin` permission.

For example, assume that you're synchronizing users into Content Services and you specifically want to specify some groups as only guest users in the system. You would override the `authority-services-context.xml` file adding those groups to the `guestGroups` list (case insensitive). As a result, users in those groups will have authenticated logins but limited to guest authorization.

**Configure `guestGroups` and `adminGroups` properties**

Use this information to configure the `guestGroups` and `adminGroups` properties.

1. Download the [authority-services-context.xml](https://github.com/Alfresco/alfresco-repository/blob/alfresco-repository-6.8/src/main/resources/alfresco/authority-services-context.xml) file.

2. Paste this file into the `<extension>` directory.

3. Open the `authority-services-context.xml` file.

    1. To specify some groups as only guest users, add them to the `guestGroups` property list.

        ```xml
        <!-- A list of groups with guest rights.   -->
        <!-*                                      -->
                <property name="guestGroups">
                    <set>
                    </set>
                </property>
        ```

    2. To assign admin rights to some groups, add them to the `adminGroups` property list.

        ```xml
        <!-- A list of groups with admin rights.   -->
        <!-*                                      -->
                <property name="adminGroups">
                    <set>
                        <value>ALFRESCO_ADMINISTRATORS</value>
                    </set>
                </property>
        ```

4. Save the file and then restart the server.

### Permission service

Use this information to understand and configure permission service.

The permission service is responsible for:

* Providing well known permissions and authorities
* Providing an API to read, set, and delete permissions for a node
* Providing an API to query, enable, and disable permission inheritance for a node
* Determining if the current, authenticated user has a permission for a node

The `PermissionService` interface defines constants for well-known permissions and authorities.

The default implementation coordinates implementations of two service provider interfaces: a `ModelDAO` and a `PermissionsDAO`. A permission is simply a name scoped by the fully qualified name of the type or aspect to which it applies. The beans are defined and configured in [public-services-security-context.xml](https://github.com/Alfresco/alfresco-repository/blob/alfresco-repository-6.8/src/main/resources/alfresco/public-services-security-context.xml). This file also contains the configuration for security enforcement.

The `ModelDAO` interface defines an API to access a permissions model. The default permission model is in XML and defines permission sets, and their related permission groups and permissions. Global permissions are part of the permission model. There can be more than one permission model defined in XML; they're in practice merged into one permission model. A module can extend the permission model.

The available permissions are defined in the permission model. This is defined in [permissionDefinitions.xml](https://github.com/Alfresco/alfresco-repository/blob/af2e069b2eabcd5433cee39d83ec06bad6fc69a0/src/main/resources/alfresco/model/permissionDefinitions.xml). This configuration is loaded in a bean definition in [public-services-security-context.xml](https://github.com/Alfresco/alfresco-repository/blob/alfresco-repository-6.8/src/main/resources/alfresco/public-services-security-context.xml). This file also defines global permissions. The definition file is read once at application start-up. If you make changes to this file, you'll have to restart the repository in order to apply the changes.

### Ownable service

Use this information to understand and configure ownable service.

The idea of file ownership is present in both UNIX and Windows. In Content Services, the repository has the concept of node ownership. This ownership is optional and is implemented as an aspect.

The owner of a node can have specific ACLs granted to them. Ownership is implemented as the dynamic authority, `ROLE_OWNER`, and is evaluated in the context of each node for which an authorization request is made. The `Ownable` aspect, if present, defines a node’s owner by storing a userName; if the `Ownable` aspect is not present, the creator is used as the default owner. If the `userName` of the current user matches, including case, the `userName` stored as the owner of the node, the current user will be granted all permissions assigned to the authority `ROLE_OWNER`.

The `OwnableService` is responsible for all of the following:

* Determining the owner of a node
* Setting the owner of a node
* Determining if a node has an owner
* Allowing the current user to take ownership of a node

The `OwnableService` is supported by an `Ownable` aspect defined in `<installLocation>\tomcat\webapps\alfresco\WEB-INF\classes\alfresco\model\contentModel.xml`.

There are permissions and permission groups associated with the Ownable aspect in the permission model and related access controls applied to the methods on the public `OwnableService`.

## Admin password in default authentication {#adminpwddefaultauth}

The Admin user password is used by the default authentication system.

The Admin password for default authentication is set as a part of the initial bootstrap. This is located in `config\alfresco\bootstrap\alfrescoUserStore.xml`. The password is MD4 encoded, as required by `alfrescoNTLM`.

> **Note:** Choose a strong, unique password for your admin account, and consider changing it regularly.

**How to reset the Admin password?**

If you lose or forget the password for the Admin user, you can reset the password in the database using one of the following methods:

* If you know the password of at least one user, then:

    1. Assign Admin rights to this known user by adding the following line in the `alfresco-global.properties` file.

        ```text
        alfresco_user_store.adminusername=username
        ```

        where, `username` is the user name of the user whose password is known.

    2. Restart the repository.
    3. Login as the known user.
    4. Reset the Admin user's password.
    5. Reset the configuration.

* Reset the Admin password without knowing any user password:

    1. Configure the authentication component to accept all logins using `org.alfresco.repo.security.authentication.SimpleAcceptOrRejectAllAuthenticationComponentImpl`.
    2. Login as a user with Admin rights.
    3. Reset the Admin user's password.
    4. Revert the configuration.

* Change the password directly in the database:

    > **Note:** These steps works only for Content Services version 3.1 to 5.0.

    1. Run the following command to find out the identifying parameters for how the Admin password is stored. Check that you've only one row in the output.

        ```sql
        SELECT anp1.node_id,
               anp1.qname_id,
               anp1.string_value
        FROM alf_node_properties anp1
           INNER JOIN alf_qname aq1 ON aq1.id = anp1.qname_id
           INNER JOIN alf_node_properties anp2 ON anp2.node_id = anp1.node_id
           INNER JOIN alf_qname aq2 ON aq2.id = anp2.qname_id
        WHERE aq1.local_name = 'password'
        AND aq2.local_name = 'username'
        AND anp2.string_value = 'admin'
        ```

        The output shows the current MD4 hashed password for the Admin user. Here's an example output:

        ```sql
        +---------+----------+----------------------------------+
        | node_id | qname_id | string_value |
        +---------+----------+----------------------------------+
        | 4 | 10 | 209c6174da490caeb422f3fa5a7ae634 |
        +---------+----------+----------------------------------+
        1 row in set (0.00 sec)
        ```

    2. To update the password, use the following command:

        ```sql
        UPDATE alf_node_properties
         SET string_value='209c6174da490caeb422f3fa5a7ae634'
         WHERE
         node_id=THENODEIDABOVE
         and
         qname_id=THEQNAMEVALUEABOVE
        ```

        Replace `THENODEIDABOVE` and `THEQNAMEVALUEABOVE` with the result values of `node_id` and `qname_id`, obtained in the previous step. In this example, it is `4` and `10`, respectively.

        > **Note:** Ensure that you use appropriate `AND` conditions in the `UPDATE` query.

    3. Restart Content Services.

* Change the password directly in the database:

    > **Note:** These steps works only for Content Services version 5.1 onwards.

    1. Run the following query to find out which encoder is being used to store the Admin password. Check that you've only one row in the output.

        > **Note:** You must encode the password using the result of the query.

        ```sql
        SELECT anp1.node_id,
               anp1.qname_id,
               anp1.string_value
        FROM alf_node_properties anp1
           INNER JOIN alf_qname aq1 ON aq1.id = anp1.qname_id
           INNER JOIN alf_node_properties anp2 ON anp2.node_id = anp1.node_id
           INNER JOIN alf_qname aq2 ON aq2.id = anp2.qname_id
        WHERE aq1.local_name = '**hashIndicator**'
        AND aq2.local_name = 'username'
        AND anp2.string_value = 'admin';
        ```

        The output shows the current password encoding being used.

        ```sql
        +---------+----------+--------------+
        | node_id | qname_id | string_value |
        +---------+----------+--------------+
        |       4 |       94 | **bcrypt10**   |
        +---------+----------+--------------+
        1 row in set (0.01 sec)
        ```

        If no rows are returned, set the password using the instructions shown above (md4 encoding).

        If a row is returned, encode the password using the result of the query, which can either be md4 or sha256 or bcrypt10 encoding.

        Run the following query to find the identifying parameters for how the Admin password is stored.

        ```sql
        SELECT anp1.node_id,
               anp1.qname_id,
               anp1.string_value
        FROM alf_node_properties anp1
           INNER JOIN alf_qname aq1 ON aq1.id = anp1.qname_id
           INNER JOIN alf_node_properties anp2 ON anp2.node_id = anp1.node_id
           INNER JOIN alf_qname aq2 ON aq2.id = anp2.qname_id
        WHERE aq1.local_name = '**passwordHash**'
        AND aq2.local_name = 'username'
        AND anp2.string_value = 'admin';
        ```

        The output shows the current hashed password for the Admin user. Here's an example output:

        ```sql
        +---------+----------+--------------------------------------------------------------+
        | node_id | qname_id | string_value                                                 |
        +---------+----------+--------------------------------------------------------------+
        |       4 |       93 |**$2a$10$dq/2zNUA.MmECYipl1WMoOyGHYbaygh23PUa3Ox5xDHH7Z0guqF42**|
        +---------+----------+--------------------------------------------------------------+
        1 row in set (0.00 sec)
        ```

    2. To update the password, use the following command:

        ```sql
        UPDATE alf_node_properties
         SET string_value='209c6174da490caeb422f3fa5a7ae634'
         WHERE
         node_id=THENODEIDABOVE
         and
         qname_id=THEQNAMEVALUEABOVE
        ```

        Replace `THENODEIDABOVE` and `THEQNAMEVALUEABOVE` with the result values of `node_id` and `qname_id`, obtained in the previous step. In this example, it is `4` and `93`, respectively.

        > **Note:** Ensure that you use appropriate `AND` conditions in the `UPDATE` query.

    3. Restart Content Services.

## Security policies and filters

You can configure a number of policies and filters in Alfresco Share to mitigate security attacks. You can also configure filters in Alfresco Repository to mitigate security attacks when the Content Services ReST API is accessed externally.

The Open Web Application Security Project (OWASP) describes **Cross-Site Request Forgery (CSRF)** as a type of attack that occurs when a malicious web site, email, blog, instant message, or program causes a user's web browser to perform an unwanted action on a trusted site for which the user is currently authenticated (see the [Cross-Site_Request_Forgery Prevention_Cheat_Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Cross-Site_Request_Forgery_Prevention_Cheat_Sheet.html){:target="_blank"}).

The Share application must be accessible on the network to be available to users, and so it is protected with a CSRF filter. You should then also ensure that `/alfresco` is protected behind a firewall. If another user interface client is used (that is, not Share), such as an ADF application that directly accesses the Content Services ReST API, then `/alfresco` needs to be protected with a CSRF filter.

If you want to protect those areas against CSRF attacks, then you'll need to implement a solution similar to one of those listed in the [CSRF prevention cheat sheet](https://cheatsheetseries.owasp.org/cheatsheets/Cross-Site_Request_Forgery_Prevention_Cheat_Sheet.html){:target="_blank"}. Of particular interest is a solution based on Apache with `mod_csrf` because of efficiency and its loose coupling with the applications to protect.

### Alfresco Share Security policies and filters

You can configure a number of policies and filters in Alfresco Share to mitigate security attacks.

The Share application must be accessible on the network to be available to users, and so it should be protected with a CSRF filter. You should then also ensure that `/alfresco` is protected behind a firewall. If another user interface client is used (that is, not Share), such as an ADF application, then you need to also protect the Alfresco Repository with a CSRF filter.

#### Cross-Site Request Forgery (CSRF) filters for Share

You can configure `CSRFPolicy` in Alfresco Share to prevent CSRF attacks that allow malicious requests to be unknowingly loaded by a user.

You can configure the CSRF filter to run with third party plugins and to stop specific repository services from being accessible directly through the Share proxy.

The filter is implemented in the `org.alfresco.web.site.servlet.CSRFFilter` that reads the `CSRFPolicy` configuration section in `share-security-config.xml`.

`CSRFPolicy` describes how and when the filter mitigates CSRF attacks:

* Each logged in user receives a secret CSRF token
* The token is communicated to the browser using a `Alfresco-CSRF-Token` cookie
* When a logged in user performs a POST, PUT or DELETE HTTP request against Share the token must be passed in the request using one of the following methods:
  * As a custom HTTP request header called `Alfresco-CSRF-Token`
  * As a URL parameter called `Alfresco-CSRF-Token`
        > **Note:** Usually the header is required, but in some circumstances a header can't be used and in this case the token can be passed using a URL parameter. The default configuration only accepts the URL parameter when the `Content-Type` header starts with `multipart/`.
* Every time the logged in user visits a new Share page the token is renewed
* The filter checks that the referrer and original HTTP request headers match the current domain (if this is present in the request)

**Do I need to alter my custom code?**

Generally, you should not need to alter your custom code, for example, the following cases need no code alteration:

* You are reading data using GET requests only
* You are using the standard `Alfresco.util.Ajax`, `alfresco/core/CoreXhr` or `Alfresco.forms.Form` JavaScript classes when creating, updating or deleting data
* You are writing a non-browser client (for example, a mobile application)

However, in these situations you'll need to alter your code:

1. You are making an `XMLHttpRequest` with POST, PUT or DELETE methods without using the `Alfresco.util.Ajax` or `alfresco/core/CoreXhr` classes. If you're using the native `XMLHttpRequest` object or a third party library such as jQuery, add code to pass the token, for example:

    ```java
    if (Alfresco.util.CSRFPolicy && Alfresco.util.CSRFPolicy.isFilterEnabled())
    {
       xhrHeadersObject[Alfresco.util.CSRFPolicy.getHeader()] = Alfresco.util.CSRFPolicy.getToken();
    }
    ```

    If you're using `YAHOO.util.DataSource` to load data with POST requests, add code similar to this example:

    ```java
    if (Alfresco.util.CSRFPolicy && Alfresco.util.CSRFPolicy.isFilterEnabled())
    {
       yuiDataSource.connMgr.initHeader(Alfresco.util.CSRFPolicy.getHeader(), Alfresco.util.CSRFPolicy.getToken(), false);
    }
    ```

2. You are making a form upload with enctype `multipart/form-data` without using `Alfresco.forms.Form`.

    When you upload a file by submitting a form with enctype `multipart/form-data` it's not possible to set a header on the request because it's not possible to set a header on any form submission in the browser. Pass the token as a URL parameter instead. If you're using the `Alfresco.forms.Form` class, this is handled for you automatically, otherwise add the token as a URL parameter, for example:

    ```java
     if (Alfresco.util.CSRFPolicy && Alfresco.util.CSRFPolicy.isFilterEnabled())
    {
       url += "?" + Alfresco.util.CSRFPolicy.getParameter() + "=" + encodeURIComponent(Alfresco.util.CSRFPolicy.getToken());
    }
    ```

3. You are using a Flash movie inside Share to send HTTP requests with method POST.

    If you're using a Flash movie to upload files, using the `flash.net.FileReference ActionScript` class to perform a multipart/form-data request, add the token as a URL parameter in your Javascript before passing in the URL to the Flash movie. If your Flash movie is performing application/json or other text based POST requests, using the `flash.net.URLRequest and/or flash.net.navigateToURL` ActionScript classes and methods, pass the token and the name of the header so that it can be set from the Flash movie.

**When else might I need to make code updates**

If servers from other domains are allowed to POST requests to your system, then you need to reconfigure `CSRFPolicy` in your `share-config-custom.xml` file so that the token or header is not checked:

1. Copy the `CSRFPolicy` configuration in `share-security-config.xml`.
2. Paste the configuration into your `share-config-custom.xml` file, ensuring that it is replacing the old configuration section:

    ```xml
     <config evaluator="string-compare"
          condition="CSRFPolicy" **replace="true"**>
    ```

3. Copy the following code and add it as the first child of the `<filter>` element:

    ```xml
    <rule>
       <request>
          <method>POST</method>
          <path>/page/trusted/call/1|/page/trusted/call/2</path>
       </request>
       <action name="assertReferer">
          <param name="always">false</param>
          <param name="referer">https://www.trustedserver.com/.*</param>
       </action>
       <action name="assertOrigin">
          <param name="always">false</param>
          <param name="origin">https://www.trustedserver.com</param>
       </action>
    </rule>
    ```

The CSRF filter compares the incoming request with the rule request elements to find one that matches and then invokes
the defined actions for that rule before normal Share processing begins.

If you want to completely block certain services in the repository, you can add these URLs to the CSRF filter:

1. Copy the `CSRFPolicy` configuration in `share-security-config.xml`.
2. Paste the configuration into your `share-config-custom.xml` file, ensuring that it is *replacing* the old configuration section:

    ```xml
     <config evaluator="string-compare"
          condition="CSRFPolicy" replace="true">
    ```

3. Copy the following code and add it as the first child of the `<filter>`  element:

    ```xml
    <rule>
       <request>
          <path>/proxy/alfresco/acme/special/services/.*</path>
       </request>
       <action name="throwError">
          <param name="message">It is not allowed to access this url from your browser</param>
       </action>
    </rule>
    ```

#### Iframes and phishing attack mitigation

You can configure `IFramePolicy` to protect users against a phishing attack, which attempts to acquire information such as user names or passwords by simulating a trustworthy entity.

Content Services allows you to control which domain pages or content are included in Alfresco Share to create a whitelist of allowed domains. A whitelist is a list of email addresses or IP addresses that are considered to be safe for use within your organization.

This `IFramePolicy` is applied when Share includes an `<iframe>` tag while constructing the Web View dashlet. The dashlet will allow only those URLs that have been added to the whitelist. Developers can use the `Alfresco.util.IFramePolicy.isUrlAllowed()` method to check if a URL is allowed for custom implementations of a Web View or `<iframe>` tag is included.

> **Note:** If you have a previous installation which includes a URL from a third-party domain, you'll get an error message in your production environment prompting you to configure your `IFramePolicy` configuration by adding the domain to the whitelist.

> **Note:** URLs pointing to the same domain, such as documents or wiki pages inside Share, will continue to work as usual by default.

The whitelist of allowed domains is set in the `<configRootShare>/classes/alfresco/share-security-config.xml` configuration file:

```xml
<config evaluator="string-compare" condition="IFramePolicy">
 <same-domain>allow</same-domain>
  <cross-domain>
    <url>*</url>
  </cross-domain>
</config>
```

To deny URLs from the current domain, override the existing code in the `share-config-custom.xml` file with the following code:

```xml
<config evaluator="string-compare" condition="IFramePolicy" replace="true">
  <same-domain>deny</same-domain>
</config>
```

To allow all cross domain URLs, override the existing code in the `share-config-custom.xml` file with the following code:

```xml
<config evaluator="string-compare" condition="IFramePolicy" replace="true">
 <cross-domain>
   <url>*</url>
 </cross-domain>
</config>
```

To allow specific cross domain URLs, override the existing code in the `share-config-custom.xml` file with the following code:

```xml
<config evaluator="string-compare" condition="IFramePolicy" replace="true">
 <cross-domain>
   <url>https://www.owasp.org/</url>
 </cross-domain>
</config>
```

#### Security filters and clickjacking mitigation

You can configure a security filter, `SecurityHeadersPolicy`, that mitigates *clickjacking* attacks in Alfresco Share.

`SecurityHeadersPolicy` is a Java Servlet filter that applies HTTP response headers to incoming requests in Share. The headers that are returned are defined in a configuration section called `SecurityHeadersPolicy` in `alfresco-security-config.xml`.

Three headers are added by default; `X-Frame-Options`, `X-Content-Type-Options` and `X-XSS-Protection`:

```xml
<config evaluator="string-compare" condition="SecurityHeadersPolicy">
  <headers>
    <header>
      <name>**X-Frame-Options**</name>
      <value>SAMEORIGIN</value>
    </header>
    <header>
      <name>**X-Content-Type-Options**</name>
      <value>nosniff</value>
    </header>
    <header>
      <name>**X-XSS-Protection**</name>
      <value>1; mode=block</value>
    </header>
  </headers>
</config>
```

**X-Frame-Options header**

Adding this header to an HTTP response tells the browser whether Share pages are permitted inside iframes. In our default configuration we have set this to `SAMEORIGIN` which means that Share pages are only permitted inside iFrames inside Share or in other web applications that live under the same domain. For example, it is possible to include `http://www.acme.com/share` inside an iframe on `http://www.acme.com/portal`.

You can override the configuration and set the header to return `DENY` instead, by placing the following configuration in your `share-config-custom.xml` file:

```xml
<config evaluator="string-compare" condition="SecurityHeadersPolicy">
  <headers>
    <header>
      <name>X-Frame-Options</name>
      <value>**DENY**</value>
    </header>
  </headers>
</config>
```

**X-Content-Type-Options**

This header is valid for Internet Explorer (IE) only. Older versions of IE (8 and below) sniff the content of a returned resource and then execute the content as the content type that IE thinks the resource has, instead of the content type that the server returned. To stop IE from doing this, `nosniff` is returned in the header.

**X-XSS-Protection**

This header is provided by Internet Explorer (IE) to rectify *sanitization* logic that can be used by an attacker to introduce an XSS flaw on your site.

By default Share returns `1; mode=block` for this header, which stops IE from executing sanitized code.

It is also possible to set the value to `0` which stops IE from inspecting the code for XSS attacks.

**Adding other headers**

Content Services supports adding other headers to the configuration, for example, the `Strict-Transport-Security` header forces the browser to allow only `https` communication. This header is not provided by Share, but can be added by using this code:

```xml
<config evaluator="string-compare" condition="SecurityHeadersPolicy">
  <headers>
    <header>
      <name>**Strict-Transport-Security**</name>
      <value>**max-age=31536000**</value>
    </header>
  </headers>
</config>
```

### Alfresco repository security policies and filters {#reposecuritypolicyandfilters}

You can configure filters in the repository to mitigate security attacks when the Content Services ReST API is accessed externally.

The Content Services ReST API must be accessible on the network when the user interface is implemented with the Alfresco Application Development Framework (ADF). The `/alfresco` URL path then needs to be protected with a CSRF filter.

#### Cross-Site Request Forgery (CSRF) filters for Repository

You can configure the repository in Content Services with a filter to prevent CSRF attacks that allow malicious requests to be unknowingly loaded by a user.

> **Note:** The CSRF filter will work correctly only if the Content Services server is configured to use HTTPS.

The CSRF filter can be configured in the `web-client-security-config.xml` file, which is located in the `alfresco.war` file. In most cases the only thing that needs to be modified is a regular expression that checks the [Origin](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Origin) and [Referer](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Referer) headers. This regular expression can be configured using the `alfresco-global.properties` file. The property configuration then overrides the values in `web-client-security-config.xml`. The following is an example configuration where Content Services runs on the `mydomain.com` host and port `80`:

```text
# CSRF filter overrides
csrf.filter.enabled=true
csrf.filter.referer=https://mydomain.com/.*
csrf.filter.referer.always=false
csrf.filter.origin=https://mydomain.com
csrf.filter.origin.always=false
```

The `Origin` header will be present in HTTP requests that originate from an HTTPS URL and it'll tell you from where the application (such as an ADF application) was loaded. If a non-standard port is used, such as `8443`, then you'll have to include the port number, such as `https://mydomain.com:8443/`. If the `Origin` header is present, then it's checked to make sure it matches the target origin (`csrf.filter.origin`). If the `Origin` header isn't present, verify that the hostname in the `Referer` header matches the target origin (that is, `csrf.filter.referer`).

The `csrf.filter.origin.always` property is a boolean that controls whether the referer/origin header must be present when validated. Some browsers don't set referer due to privacy issues. Some old browsers don't set origin.

To disable the CSRF filter all together set the `csrf.filter.enabled` property to `false`.
