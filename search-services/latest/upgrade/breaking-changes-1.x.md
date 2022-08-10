---
title: Breaking changes from Search Services 1.x
---

Use this information when upgrading from Search Services 1.x to Search Services 2.x.

## Text indexation for properties of type `d:content`

Search Services 1.x indexed the content of secondary `d:content` properties defined for a custom Content Model Type. This feature is unsupported by Search Services 2.x, so it's required to re-design your Content Model before upgrading.

The following sample Content Model describes a secondary `d:content` property named `doc:attachment`:

```xml
<type name="doc:sample">
   <parent>cm:content</parent>
   <properties>
      <property name="doc:identifier">
         <type>d:text</type>
      </property>
      <property name="doc:attachment">
         <type>d:content</type>
      </property>
   </properties>
</type>
```

When using Search Services 1.x, the content stored in `doc:attachment` is indexed and searchable. From Search Services 2.x, the property `doc:attachment` is indexed but the content is not. So searching by content of the property is not working.

In order to support this Content Model from Search Services 2.x, secondary `d:content` fields must be converted to `associations` with `cm:content` nodes. The following sample Content Model applies this conversion to the previous model:

```xml
<type name="doc:sample">
   <parent>cm:content</parent>
   <properties>
      <property name="doc:identifier">
         <type>d:text</type>
      </property>
   </properties>
   <mandatory-aspects>
      <aspect>cm:attachable</aspect>
   </mandatory-aspects>
</type>


<aspect name="cm:attachable">
   <associations>
      <association name="cm:attachments">
         <source>
            <mandatory>false</mandatory>
            <many>true</many>
         </source>
         <target>
            <class>cm:content</class>
            <mandatory>false</mandatory>
            <many>true</many>
         </target>
      </association>
   </associations>
</aspect>
```

> **Note:** This Content Model modification may also affect custom integrations, since the results are returned with a different structure.
