---
author: [Alfresco Documentation, Alfresco Documentation]
source: 
audience: 
category: [Alfresco Server, Administration, Configuration]
keyword: [solr, search, lucene]
---

# Cryptographic password hashing

Alfresco Content Services uses cryptographic password hashing technique to securely store passwords.

All versions Alfresco Content Services 5.2.7 used the MD4 \(Message Digest 4\) and SHA256 hash algorithms \(mainly to support NLTM and CIFS\) to store critical data. But this is no longer considered a secure approach as the hashed password is very easy to decrypt. You now have the option to configure Alfresco Content Services 5.2.7 to use Bcrypt to store passwords. By default, the system uses MD4 to allow users to use MD4 hashed passwords for NTLM and CIFS authentication.

Bcrypt is an adaptive hash function based on the Blowfish symmetric block cipher cryptographic algorithm. It is incredibly slow to hash input compared to other functions, but this results in a much better output hash. Alfresco Content Services 5.2.7 is configured to use a strength of `10` to provide a good compromise of speed and strength.

With Bcrypt, the hashing algorithm \(also called an encoder\) can be configured by setting the `system.preferred.password.encoding` property in the alfresco-global.properties file. The supported values for this property are:

-   `md4`
-   `sha256`
-   `bcrypt10`

If you provide a different value, the repository won't start.

To maintain backwards compatibility with previous versions, the default setting for this property is:

```
system.preferred.password.encoding=md4
```

After upgrading to Alfresco Content Services 5.2.7, when the user logs in or changes the password, the system rehashes the password using the preferred encoding mechanism and stores the mechanism being used. If the preferred encoding is set to `md4`, the system moves the current hashed passwords for that user.

**Note:** If SAML SSO is enabled, cryptographic password rehashing will not work at login.

You can run a background job to completely remove all the old hashed passwords for those users that have not logged in yet. If the system is still set to `md4`, all user objects will be upgraded. However, the background job will maintain the current hash.

If the background job is executed after the `system.preferred.password.encoding` property has been changed, it will double-hash all the user objects in the system \(unless they have already been upgraded by the user logging in\). As a result, the system will temporarily hash \(until the user logs in\) the current hashed password, store the list of encoders used, and clean out the old hashes.

The background job uses the repository's `BatchProcessor` to execute the job. The execution of the job can be controlled if necessary via the following properties:

-   `system.upgradePasswordHash.jobBatchSize`: Specifies the number of user objects to process in each batch.
-   `system.upgradePasswordHash.jobQueryRange`: Specifies the `nodeId` range to search for in each iteration.
-   `system.upgradePasswordHash.jobThreadCount`: Specifies the number of threads the batch processor uses.

Out of the box, this background job is enabled but set to a future date. To configure it, set the `system.upgradePasswordHash.jobCronExpression` property in the alfresco-global.properties file. For example, the following setting runs the job every 10 minutes:

```
system.upgradePasswordHash.jobCronExpression=0 0/10 * * * ?
```

Alternatively, the job can be executed immediately via a JMX console. The job makes use of `JobLockService` so it is safe to run in a clustered environment.

**Note:** Once you change the preferred encoding from `md4`, the NTLM SSO authentication will no longer function. Also, the CIFS authentication will only work if the Kerberos authentication is enabled.

If the password upgrade job is enabled, make sure you enable the `log4j.logger.org.alfresco.repo.security.authentication.UpgradePasswordHashWorker` logging in log4j.properties.

You can either set it to `trace` or `debug` as shown below:

```
log4j.logger.org.alfresco.repo.security.authentication.UpgradePasswordHashWorker=trace

OR

log4j.logger.org.alfresco.repo.security.authentication.UpgradePasswordHashWorker=debug
```

`Trace` displays a list of all the processed users. `Debug` is a slightly less verbose output; it displays a list of only those users whose password was changed.

To monitor users that have their passwords upgraded when they log in, add the following in log4j.properties:

```
log4j.logger.org.alfresco.repo.security.authentication.HashPasswordTransactionListener=debug

```

**Parent topic:**[Setting up authentication and security](../concepts/auth-intro.md)

