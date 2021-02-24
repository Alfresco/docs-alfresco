---
author: [Alfresco Documentation, Alfresco Documentation]
source: Professional Alfresco Book
audience: 
category: Content Modeling
keyword: [Content metadata model, content model types]
---

# Model types

A content model may define one or more types.

```
<xs:element name="model">
...
  <xs:element name="types" maxOccurs="1" minOccurs="0">
    <xs:complexType>
     <xs:sequence>
      <xs:element name="type" type="type" maxOccurs="unbounded" minOccurs="1" />
     </xs:sequence>
   </xs:complexType>
  </xs:element>
...
</xs:element>
```

Each type is uniquely named and optionally labeled with a title and description. A type may declare any number of properties to represent metadata associated with the type and any number of associations to other types.

```
<xs:complexType name="type">
  <xs:complexContent>
    <xs:extension base="class"/>
  </xs:complexContent>
</xs:complexType>

<xs:complexType name="class">
...
<xs:attributeGroup ref="name" />
...
<xs:sequence>
...
 <xs:group ref="**TextualDescription**"/>
  <xs:element name="properties" maxOccurs="1" minOccurs="0">
    <xs:complexType>
      <xs:sequence>
        <xs:element name="property" type="property"maxOccurs="unbounded"
         minOccurs="0" />
      </xs:sequence>
     </xs:complexType>
   </xs:element>

<xs:element name="associations" maxOccurs="1" minOccurs="0">
  <xs:complexType>
    <xs:sequence>
      <xs:element name="association" type="association"
      maxOccurs="unbounded" />
   </xs:sequence>
  </xs:complexType>
 </xs:element>
...
</xs:sequence>
</xs:complexType>

<xs:group name="**TextualDescription**">
   <xs:sequence>
     <xs:element name="title" type="string" maxOccurs="1" minOccurs="0" />
     <xs:element name="description" type="string" maxOccurs="1" minOccurs="0" />
  </xs:sequence>
</xs:group>
```

The schema definition of a type is simply a derivation of the schema definition named class.

A type definition also allows control over whether nodes of that type are archived when deleted.

```
<xs:complexType name="class">
...
  <xs:element name="archive" type="boolean" maxOccurs="1" minOccurs="0" />
...
</xs:complexType>
```

Archived nodes may be restored just like the recycle bin of many operating systems.

**Parent topic:**[Content metamodel](../concepts/metadata-model-define.md)

