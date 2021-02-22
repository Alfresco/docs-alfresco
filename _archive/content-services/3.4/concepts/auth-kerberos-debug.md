---
author: [Alfresco Documentation, Alfresco Documentation]
source: 
audience: 
category: [Authentication and Security, Authentication, Administration]
keyword: [configuration, Kerberos, authentication]
---

# Debugging Kerberos

You can debug Kerberos issues using the log4j properties in the alfresco.log file.

For example:

```
log4j.logger.org.alfresco.web.app.servlet.KerberosAuthenticationFilter=debug
log4j.logger.org.alfresco.repo.webdav.auth.KerberosAuthenticationFilter=debug

```

The following is a sample login output:

```
18:46:27,915 DEBUG [app.servlet.KerberosAuthenticationFilter] New Kerberos auth request from 192.168.4.95 (192.168.4.95:38750)
18:46:28,063 DEBUG [app.servlet.KerberosAuthenticationFilter] User user1 logged on via Kerberos

```

**Parent topic:**[Configuring Kerberos](../concepts/auth-kerberos-intro.md)

