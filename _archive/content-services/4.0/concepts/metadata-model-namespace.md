---
author: [Alfresco Documentation, Alfresco Documentation]
source: Professional Alfresco Book
audience: 
category: Content Modeling
keyword: [Content metadata model, namespace]
---

# Model namespaces

Namespaces provide a way to specify globally unique names for definitions within content models.

A namespace is composed of a URI \(a unique string often prefixed with an HTTP address associated with the author\) and a Prefix \(a shorthand code for the URI\). Alfresco has defined several namespaces for the models provided out of the box with the content repository. The prefix for those namespace URIs is `www.alfresco.org`.

To associate a name with a namespace, prefix the name with the relevant namespace prefix. For example, if the namespace URI `http://example.org/contentmodels` and associated prefix `ex` are defined, then the name e`x:customtype` means that `customtype` is a name defined within the namespace `http://example.org/contentmodels`.

Each content model must define at least one namespace for the names defined in that content model.

```
<xs:element name="model">
...
  <xs:element name="namespaces">
    <xs:complexType>
     <xs:sequence>
       <xs:element name="namespace" maxOccurs="unbounded" minOccurs="1">
      <xs:complexType>
        <xs:attributeGroup ref="namespaceDefinition" />
        </xs:complexType>
    </xs:element>
   </xs:sequence>
  </xs:complexType>
 </xs:element>
...
 <xs:attributeGroup name="namespaceDefinition">
    <xs:attribute name="uri" type="string" use="required" />
    <xs:attribute name="prefix" type="string" use="required" />
 </xs:attributeGroup>
...
</xs:element>
```

A content model may need to refer to definitions that reside in another content model. For example, a type may inherit from a type defined in another content model. To refer to names defined outside of the content model, import the namespace within which that name is defined. Once imported, the name can be used just as if the content model itself defined it.

```
<xs:element name="model">
...
  <xs:element name="imports" maxOccurs="1" minOccurs="0">
   <xs:complexType>
    <xs:sequence>
   <xs:element name="import" maxOccurs="unbounded" minOccurs="1">
     <xs:complexType>
      <xs:attributeGroup ref="namespaceDefinition" />
    </xs:complexType>
   </xs:element>
   </xs:sequence>
  </xs:complexType>
 </xs:element>
...
</xs:element>
```

On import of a namespace URI, it is possible to remap the namespace prefix defined in the originating content model in case there are prefix clashes between imported namespaces. The content repository does not allow a content model to reference names that do not exist.

**Parent topic:**[Content metamodel](../concepts/metadata-model-define.md)

