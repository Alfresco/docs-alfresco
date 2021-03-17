---
author: [Alfresco Documentation, Alfresco Documentation]
audience: 
category: [Jive Toolkit, Extensions/Third Party]
keyword: [Jive, Toolkit]
---

# Configuring authentication for the Jive Toolkit

This section describes the configuration requirements for the Jive Toolkit authentication.

It is essential in Alfresco and Jive that both system agree on an identical set of user IDs. It is possible that you could create identical users manually; however, for large volumes of users, it is more efficient to rely on a common authentication system, like LDAP.

For more information on setting up LDAP authentication for Alfresco and Jive, refer to the Alfresco and Jive documentation.

If you are using an Alfresco authentication chain, the users in any other part of the chain will not be authorized to use the Jive Toolkit. The authentication will work using `ldap-ad` if Jive is also pointing to the same server, but both systems must still agree on the IDs.

**Parent topic:**[Alfresco Jive Toolkit installation](../concepts/jive-install-artifact.md)

