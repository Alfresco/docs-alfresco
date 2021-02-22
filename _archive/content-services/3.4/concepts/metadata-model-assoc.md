---
author: [Alfresco Documentation, Alfresco Documentation]
source: Professional Alfresco Book
audience: 
category: Content Modeling
keyword: Content metadata model
---

# Associations

Associations must be uniquely named and optionally labeled with a title and description.

For example:

```
<xs:complexType name="association">
  <xs:attributeGroup ref="**name**" />
  <xs:sequence>
    <xs:group ref="**TextualDescription**" />
    <xs:element name="source" maxOccurs="1" minOccurs="0">
 
  <xs:complexType>
    <xs:sequence>
      <xs:element name="mandatory" type="boolean"maxOccurs="1" minOccurs="0" />
      <xs:element name="many" type="boolean"maxOccurs="1" minOccurs="0" />
    </xs:sequence>
  </xs:complexType>
 </xs:element>
<xs:element name="target">
  <xs:complexType>
    <xs:sequence>
      <xs:element name="class" type="string" maxOccurs="1" minOccurs="1" />
      <xs:element name="mandatory" type="**mandatoryDef**"maxOccurs="1"
      minOccurs="0" />
      <xs:element name="many" type="boolean"maxOccurs="1" minOccurs="0" />
    </xs:sequence>
   </xs:complexType>
  </xs:element>
 </xs:sequence>
</xs:complexType>
```

Associations are always between two types — a source type and a target type — where the source type is inherently the type that defines the association. The only feature of an association that must be specified is its target type via the `class` element on the target end.

Fine-tune each end of the association by specifying features such as cardinality via the `mandatory` and `many` elements:

-   0 or 1 =\> mandatory = false and many = false
-   1 =\> mandatory = true and many = false
-   0 or more =\> mandatory = false and many = true
-   1 or more =\> mandatory = true and many = true

As with mandatory properties, both enforced and relaxed modes are supported for the target end, allowing control over whether a transaction can commit or not based on missing associations. In relaxed mode, the incomplete aspect is added to source nodes where associations to target nodes are missing.

Child associations are defined in the same way as peer associations, with a few additional features.

```
<xs:complexType name="childAssociation">
  <xs:complexContent>
    <xs:extension base="association">
      <xs:sequence>
        <xs:element name="duplicate" type="boolean"maxOccurs="1" minOccurs="0" />
        <xs:element name="propagateTimestamps" type="boolean"maxOccurs="1"
        minOccurs="0" />
      </xs:sequence>
     </xs:extension>
  </xs:complexContent>
</xs:complexType>
```

The `duplicate` element lets you specify the uniqueness of child-node names within the parent. If `duplicate` is true, the content repository will not allow the commit of a transaction where duplicate node names are found within a set of children for a given single parent. The `propagateTimestamps` element allows control over whether the modified timestamp of a parent should be modified if any of its children are modified.

**Parent topic:**[Content metamodel](../concepts/metadata-model-define.md)

