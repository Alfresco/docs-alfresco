---
author: [Alfresco Documentation, Alfresco Documentation]
source: Professional Alfresco Book
audience: 
category: Content Modeling
keyword: Content metadata model
---

# Inheritance

A type may inherit its definition from another type. All features of the parent type are inherited, including property, association, and constraint definitions, except for the parent type name, title, and description.

```
<xs:complexType name="class">
  <xs:sequence>
...
   <xs:element name="parent" type="string" maxOccurs="1" minOccurs="0" />
...
  </xs:sequence>
</xs:complexType>
```

A type inherits from another type when its parent element is populated with the name of the parent type to inherit. The inheriting type is often referred to as the subtype, while its parent is often referred to as the super-type. Inheritance may be nested, so it is possible to inherit from a type which itself inherits from another type.

Subtypes can specify further property, association, and constraint definitions in addition to those inherited from its parent. However, it is sometimes useful to refine a definition inherited from its parent. For example, a parent type may support an optional property, which the subtype wishes to lock down by mandating its value.

It is not possible to refine all inherited definitions, as it would be very easy to define an incoherent content model. For that reason, the content metamodel provides a fixed set of refinements known as property overrides.

```
<xs:complexType name="class">
...
  <xs:element name="overrides" maxOccurs="1" minOccurs="0">
    <xs:complexType>
     <xs:sequence>
       <xs:element name="property" type="**propertyOverride**" minOccurs="1" />
    </xs:sequence>
   </xs:complexType>
  </xs:element>
...
</xs:complexType>

<xs:complexType name="**propertyOverride**">
  <xs:attributeGroup ref="**name**" />
   <xs:sequence>
    <xs:element name="mandatory" type="boolean" maxOccurs="1" minOccurs="0" />
    <xs:element name="default" type="string" maxOccurs="1" minOccurs="0" />
    <xs:element name="constraints" maxOccurs="1" minOccurs="0">
    <xs:complexType>
    <xs:sequence>
    <xs:element name="**constraint**" type="constraint" minOccurs="1" />
   </xs:sequence>
  </xs:complexType>
 </xs:element>
 </xs:sequence>
</xs:complexType>
```

Each property override has the same name as the property it wishes to override from its parent type. You can override the following property features:

-   `**mandatory**`: A subtype may enforce a property to become mandatory but it cannot relax an existing parent mandatory constraint.
-   `**default**`: A subtype may introduce a default value or change an existing parent default value.
-   **`constraints`**: Additional constraints may be applied to a parent property, but existing constraints cannot be modified.

**Parent topic:**[Content metamodel](../concepts/metadata-model-define.md)

