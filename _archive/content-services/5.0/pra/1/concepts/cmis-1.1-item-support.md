---
author: Alfresco Documentation
---

# cmis:item support

You can use `cmis:item` to query some Alfresco object types and your own custom types that are outside the CMIS definitions of document, folder, relationship, or policy.

You can find a user or a set of users via a CMIS query. For example, the following query will return all information for all users:

```

SELECT * FROM cm:person

```

The following query will return the selected fields for users with names like "smith" and "smithers" all users:

```

SELECT cm:userName, cm:homeFolder FROM cm:person where cm:userName like 'smi%'

```

**Parent topic:**[CMIS 1.1](../../../pra/1/concepts/cmis-1.1-intro.md)

