---
author: Alfresco Documentation
---

# Aspects

Aspects allow property and association definitions to be shared across many types of nodes. This means a cross-cutting feature of an ECM domain model can be encapsulated and applied throughout the rigid part of the model represented by types. It is the equivalent of multiple inheritance.

A node in the repository must be of a single type, but might be attached to one or more aspects. The aspects are either inherited from its type \(as defined in the content model\), or can be attached or detached at runtime, allowing a node to dynamically inherit features and capabilities.

Each content model can define one or more aspects.

```


<xs:element name="model">
...
  <xs:element name="aspects" maxOccurs="1"minOccurs="0">
    <xs:complexType>
      <xs:sequence>
        <xs:element name="aspect" type="<b>aspect</b>"maxOccurs="unbounded"
         minOccurs="1"/>
      </xs:sequence>
    </xs:complexType>
  </xs:element>
...
</xs:element></codeblock></p>
    <p>Aspects support all the same features as types, and therefore are defined in the same way as
      types.</p>
    <p>
      <codeblock><xs:complexType name="<b>aspect</b>">
  <xs:complexContent>
    <xs:extension base="<b>class</b>" />
  </xs:complexContent>
</xs:complexType>


```

As with the type definition, an aspect definition is simply a derivation of the schema definition named class. This means that an aspect shares all the same features as a class, including property, association, and constraint definitions. Aspects can inherit from parent aspects and support property overrides.

An aspect can be attached to one or more types. This means that a node created of that type automatically inherits the attached aspects.

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

**Parent topic:**[Content Model metadata](../concepts/metadata-model-define.md)

