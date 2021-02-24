---
author: [Alfresco Documentation, Alfresco Documentation]
source: Professional Alfresco Book
audience: 
category: Content Modeling
keyword: Content metadata model
---

# Aspects

Aspects allow property and association definitions to be shared across many types of nodes. This means a cross-cutting feature of an ECM domain model may be encapsulated and applied throughout the rigid part of the model represented by types. It is the equivalent of multiple inheritance.

A node in the content repository must be of a single type, but may be attached to one or more aspects. The aspects are either inherited from its type \(as defined in the content model\), or can be attached or detached at runtime, allowing a node to dynamically inherit features and capabilities.

Each content model may define one or more aspects.

```
<xs:element name="model">
...
  <xs:element name="aspects" maxOccurs="1"minOccurs="0">
    <xs:complexType>
      <xs:sequence>
        <xs:element name="aspect" type="**aspect**"maxOccurs="unbounded"
         minOccurs="1"/>
      </xs:sequence>
    </xs:complexType>
  </xs:element>
...
</xs:element>
```

Aspects support all the same features as types, and therefore are defined in the same way as types.

```
<xs:complexType name="**aspect**">
  <xs:complexContent>
    <xs:extension base="**class**" />
  </xs:complexContent>
</xs:complexType>
```

As with the type definition, an aspect definition is simply a derivation of the schema definition named class. This means that an aspect shares all the same features as a class, including property, association, and constraint definitions. Aspects may inherit from parent aspects and support property overrides.

An aspect may be attached to one or more types. This means that a node created of that type automatically inherits the attached aspects.

```
<xs:complexType name="class">
...
  <xs:element name="mandatory-aspects" maxOccurs="1" minOccurs="0">
    <xs:complexType>
      <xs:sequence>
        <xs:element name="aspect" type="string" maxOccurs="unbounded"
         minOccurs="1"/>
      </xs:sequence>
    </xs:complexType>
   </xs:element>
...
</xs:complexType>
```

To attach an aspect, specify the name of the aspect to attach in the aspect element of the source type. This feature is available at the class level, allowing aspects to be attached to other aspects as well as types.

**Parent topic:**[Content metamodel](../concepts/metadata-model-define.md)

