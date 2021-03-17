---
author: [Alfresco Documentation, Alfresco Documentation]
audience: 
category: [Security, Administration, Configuration]
keyword: [password, attack, migration]
---

# Mitigating brute force attack on user passwords

Alfresco Content Services 5.2.7 provides basic out-of-the-box protection against brute force attacks on password logins.

To mitigate brute force attacks on user passwords, after a few failed login attempts for any given user id, the user id is locked out and marked as `protected`. The user id stays in the `protected` mode for a six seconds protection period. During this time, even if the correct login details are specified, the user can't login. After the six seconds protection period is over, the user can login with the correct login details.

To summarize, once a user id is `protected`:

-   the schedule causes a six seconds delay between the allowed login attempts.
-   authentication requests occurring more frequently than the permitted schedule are denied.
-   next login attempt that is denied due to the rate limiting algorithm generates a WARN message in the Alfresco log file \(only once\).
-   for every consecutive failed login attempt, if the limit exceeds 10 attempts, a WARN message is shown in the Alfresco log file \(only once\).
-   details about authentication attempts, including the number of login attempts and time stamp of last login attempt, are cached.

The administrator receives one log message per protection period. To avoid username disclosure in logs, the message displays only the first two letters of the username.

![](../images/warn.png)

The user id stays as `protected` until a correct authentication request is processed after the six seconds protection period. The entry is then removed from the cache.

This login protection feature is enabled by default, and can be configured by adding the following properties to the alfresco-global.properties file.

|Property|Description|Default Value|
|--------|-----------|-------------|
|`authentication.protection.enabled`|Specifies if the login protection feature is enabled or disabled.|true|
|`authentication.protection.limit`|Specifies the number of attempts after which the user id becomes protected.|10|
|`authentication.protection.periodSeconds`|Specifies the protection period after which a valid login attempt can be done.|6|

**Note:** This feature provides some basic protections against brute force attacks by slowing down repeated logins, but it does not replace more advanced brute force attack detection and mitigation that would be done on the network level or through log analysis.

**Parent topic:**[Setting up authentication and security](../concepts/auth-intro.md)

