---
author: Alfresco Documentation
---

# url

The `url` element represents a URI template to which the web script is bound. Variants of the URI template which specify a format do not need to be registered, however, specifying them is useful for documentation purposes. There must be at least one `url` element, but there can be several.

The `url` element has no attributes.

`url` element example:

```

<webscript>
  <shortname>Alfresco Repo Usage</shortname>
  <description>
  JSON Returned:
  {
   "lastUpdate" : 1298463432794,
   "users" : 1,
   "documents" : 54,
   "licenseMode" : "TEAM",
   "readOnly" : false,
   "updated" : true,
   "licenseValidUntil" : null,
   "level" : 0,
   "warnings": [],
   "errors": []
  }
  level 0: nothing to report
  level 1: report warnings and errors to admin only
  level 2: report warnings and errors to all
  level 3: report warnings and errors to all; system is locked for updates
  </description>
  **<url\>/api/admin/usage</url\>**
  <format default="json"/>
  <authentication>guest</authentication>
  <transaction allow="readonly">required</transaction>
  <family>Admin</family>
  <lifecycle>internal</lifecycle>
</webscript>
      
```

**Parent topic:**[Web script description language reference](../references/api-wsdl-webscript-descriptor-language-reference.md)

