---
author: Alfresco Documentation
---

# formdata

The `formdata` element ... The `formdata` element is optional.

The `formdata` element can have the following values:

-   **``**
-   **``**

The `formdata` element has the following attributes.

-   **`multipart-processing`**

    Specifies whether multi-part processing should be on or off. Valid values, which are optional, are as follows:

    -   `true` - turns on multi-part form data processing.
    -   `false` - turns off multi-part form data processing.

`formdata` option example:

```

<webscript>
  <shortname>Alfresco Audit Service Clear</shortname>
  <description>Delete audit entries for a given application and time range</description>
  <url>/api/audit/clear/{application}?fromTime={fromTime}&amp;toTime={toTime}</url>
  <format default="json" />
  <authentication>admin</authentication>
  <transaction>required</transaction>
  <family>Audit</family>
  <lifecycle>internal</lifecycle>
  <args>
    <arg>
      <name>application</name>
      <description>Name of the audit application (mandatory)</description>
    </arg>
    <arg>
      <name>fromTime</name>
      <description>Time, in milliseconds, of the oldest audit entry to delete (omit to assume oldest)</description>
    </arg>
    <arg>
      <name>toTime</name>
      <description>Time, in milleseconds, of the youngest audit entry to delete (omit to assume current time)</description>
    </arg>
 </args>

  **<!--  turn off the multipart formdata processing --\>
  <formdata multipart-processing="false" /\>**

</webscript>
        
```

**Parent topic:**[Web script description language reference](../references/api-wsdl-webscript-descriptor-language-reference.md)

