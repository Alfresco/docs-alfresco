---
author: Alfresco Documentation
---

# args

The `args` element represents a list of arguments passed to the web script. This are listed for documentation purposes. The `args` element is optional.

The `args` element has the following child elements:

-   **`arg`**

    Denotes an argument to the webscript. The `arg` element can contain the following child elements:

    -   `name` - the name of the argument.
    -   `description` - the description of the argument.

The `args` element has no attributes.

`args` element example:

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
  **<args\>
    <arg\>
      <name\>application</name\>
      <description\>Name of the audit application \(mandatory\)</description\>
    </arg\>
    <arg\>
      <name\>fromTime</name\>
      <description\>Time, in milliseconds, of the oldest audit entry to delete \(omit to assume oldest\)</description\>
    </arg\>
    <arg\>
      <name\>toTime</name\>
      <description\>Time, in milleseconds, of the youngest audit entry to delete \(omit to assume current time\)</description\>
    </arg\>
 </args\>**

  <!--  turn off the multipart formdata processing -->
  <formdata multipart-processing="false" />

</webscript>
        
```

**Parent topic:**[Web script description language reference](../references/api-wsdl-webscript-descriptor-language-reference.md)

