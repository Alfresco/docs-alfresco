---
author: Alfresco Documentation
---

# responses

The `responses` element represents a collection of response types for the web script. The `responses` element is optional.

The `responses` element has the following child elements:

-   **`response`**

    Denotes a response.


The `response` element has the following attributes:

-   **`type`**

    This attribute specifies the response type.


`responses` element example:

```

<webscript kind="org.alfresco.cmiskind">
  <shortname>Get ACL (getACL)</shortname>
  <description>
  <![CDATA[
  Get the ACL currently applied to the specified document or folder object.
  ]]>
  </description>
  <!-- by object id -->
  <url>/cmis/i/{id}/acl</url>
  <url>/cmis/s/{store}/i/{id}/acl</url>
  <!-- by object path -->
  <url>/cmis/p{path}/acl</url>
  <url>/cmis/s/{store}/p{path}/acl</url>
  <!-- alfresco style -->
  <url>/api/node/{store_type}/{store_id}/{id}/acl</url>
  <url>/api/path/{store_type}/{store_id}/{nodepath}/acl</url>
  <args>
    <arg>
        <shortname>store</shortname>
        <description>the store name</description>
    </arg>
    <arg>
        <shortname>id</shortname>
        <description>the node id of the object</description>
    </arg>
    <arg>
        <shortname>path</shortname>
        <description>the path of the object (relative to CMIS root, typically "Company Home")</description>
    </arg>
    <arg>
        <shortname>nodepath</shortname>
        <description>the path of the object (relative to root of Alfresco store)</description>
    </arg>
  </args>

  <format default="cmisacl">argument</format>
  **<responses\>
    <response type="cmis.acl"/\>
  </responses\>**
  
  <authentication>guest</authentication>
  <transaction allow="readonly"/>
  <family>CMIS</family>
  <lifecycle>deprecated</lifecycle>
</webscript>
        
```

**Parent topic:**[Web script description language reference](../references/api-wsdl-webscript-descriptor-language-reference.md)

