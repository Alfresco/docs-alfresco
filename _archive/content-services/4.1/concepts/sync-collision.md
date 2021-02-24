---
author: [Alfresco Documentation, Alfresco Documentation]
source: 
audience: 
category: Administration
option: authentication subsystem synchronization collision resolution
---

# Collision resolution

If there are overlaps between the contents of two user registries in the authentication chain \(for example, where two user registries both contain a user with the same user name\), then the registry that occurs earlier in the authentication chain will be given precedence. This means that exactly the same order of precedence used during authentication will be used during synchronization.

For example, if user `A` is queried from zone `Z1` but already exists in Alfresco in zone `Z2`:

-   `A` is ignored if `Z1` is later in the authentication chain than `Z2`
-   `A` is moved to `Z1` if `Z2` does not exist in the authentication chain or `Z1` is earlier in the authentication chain and the `synchronization.allowDeletions` property is `false`.
-   `A` is deleted from `Z2` and recreated in `Z1`if `Z1` is earlier in the authentication chain and the `synchronization.allowDeletions` property is `true`.

**Parent topic:**[Configuring synchronization](../concepts/sync-intro.md)

