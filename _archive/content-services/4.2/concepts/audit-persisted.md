---
author: [Alfresco Documentation, Alfresco Documentation]
source: 
audience: 
category: Administration
option: audit
---

# Persisted audit data

The default audit configuration file alfresco-audit-access.xml only copies the following audit data elements. It also adds `login`, `loginFailure` and `logout` persisted data.

The default structure of the persisted audit data is shown as follows:

```
/alfresco-access
  /login/user=<usergt
  /loginFailure/user=<usergt
  /logout/user=<usergt
  /transaction/
   /action=<actionNamegt
   /sub-actions=<sub action listgt
   /path=<prefixPathgt
   /type=<prefixTypegt
   /user=<usergt
   /version=<versiongt
   /copy/from/path=<prefixPathgt
   /move
     /from/path=<prefixPathgt
   /properties
      /from=<mapOfValuesgt
      /to=<mapOfValuesgt
      /add=<mapOfValuesgt
      /delete=<mapOfValuesgt
      /fromName=<oldNamegt
      /toName=<newNamegt
    /aspects
      /add=<mapOfNamesgt
      /delete=<mapOfNamesgt
```

The `version` value is sourced from either the `add/cm:versionLabel` or `to/cm:versionLabel` values.

The exception is the property `name`, individual property and aspect changes are not included, as it is not possible to know all possible names. The map values of all changes is however included. The individual property `name` value is included as it is a well known property, which changes if content or a folder is renamed within the same parent folder.

**Parent topic:**[Content auditing technical overview](../concepts/audit-content-techdesc.md)

