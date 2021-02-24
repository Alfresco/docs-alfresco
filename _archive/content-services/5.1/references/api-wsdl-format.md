---
author: Alfresco Documentation
---

# format

The `format` element controls how the content-type of the response can be specified by using the URI. The `format` element is optional.

The `format` element can have the following values:

-   **`argument`**

    The content-type is specified by using the format query string parameter, for example `/helloworld?to=dave&format=xml`.

-   **`extension`**

    The content-type is specified by using the URI extension, for example `/hello/world.xml?to=dave`.

-   **`any`**

    Either `argument` or `extension` can be used. This is the default where none is specified.


The `format` element also has the following attributes:

-   **`default` \(optional\)**

    If the caller does not specify a required content-type at all, the default content-type is taken from the `default` attribute of the `format` element. By default, if not set, the html format is assumed. In some cases, a URI might decide upon a response content-type at runtime. For these URIs, specify an empty format, for example format `default=""`.


`format` element example:

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
  <url>/api/admin/usage</url>
  **<format default="json"/\>**
  <authentication>guest</authentication>
  <transaction allow="readonly">required</transaction>
  <family>Admin</family>
  <lifecycle>internal</lifecycle>
</webscript>
        
```

**Parent topic:**[Web script description language reference](../references/api-wsdl-webscript-descriptor-language-reference.md)

