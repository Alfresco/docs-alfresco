---
author: [Alfresco Documentation, Alfresco Documentation]
source: 
audience: 
category: Administration
option: authentication subsystem chain
---

# Chained functions

Chained functions combine together functions of more than one subsystem.

For example, when a user logs in, Alfresco tries to match the user's credentials against each of the subsystems in the chain in order.

-   If a chain member accepts the credentials, the login succeeds
-   If no chain member accepts, the login fails

User registry export is also chained. During a synchronize operation, users and groups are exported from each member of the chain supporting user registry export \(that is, those of type LDAP\) and imported into Alfresco. Ordering in the chain is used to resolve conflicts between users and groups existing in the same directory.

**Parent topic:**[Authentication chain functions](../concepts/auth-chain-functions.md)

