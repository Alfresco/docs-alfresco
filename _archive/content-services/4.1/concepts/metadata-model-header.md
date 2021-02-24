---
author: [Alfresco Documentation, Alfresco Documentation]
source: Professional Alfresco Book
audience: 
category: Content Modeling
keyword: Content metadata model
---

# Model Header

Each content model starts with a model header, which provides an introduction to the model containing description, author, publication date, and version number. All parts of the model introduction are optional.

```
<xs:element name="model">
  <xs:attributeGroup ref="name" />
...
  <xs:complexType>
    <xs:sequence>
    <xs:element name="description" type="string"maxOccurs="1" minOccurs="0" />
    <xs:element name="author" type="string"maxOccurs="1" minOccurs="0" />
    <xs:element name="published" type="date"maxOccurs="1" minOccurs="0" />
    <xs:element name="version" type="string"maxOccurs="1" minOccurs="0" />
...
  </xs:sequence>
...
</xs:complexType>
...
  <xs:attributeGroup name="name">
    <xs:attribute name="name" type="string" use="required" />
    </xs:attributeGroup>
</xs:element>
```

A content model must be uniquely named within a given content repository. To help define unique names across all content repositories, the content metamodel supports the notion of a namespace.

**Parent topic:**[Content metamodel](../concepts/metadata-model-define.md)

