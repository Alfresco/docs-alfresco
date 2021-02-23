---
author: [Alfresco Documentation, Alfresco Documentation]
source: Professional Alfresco Book
audience: 
category: Content Modeling
keyword: Content metadata model
---

# Constraints

Define constraints in one of two ways: “standalone” allows for the reuse of constraints across many properties; “inline” defines the constraint specifically for a single property.

```
<xs:complexType name="constraint">
  <xs:attribute name="name" use="optional" type="string" />
  <xs:attribute name="type" type="string" use="optional"/>
  <xs:sequence>
    <xs:element name="parameter" maxOccurs="unbounded" type="**namedValue**"
    minOccurs="0"/>
  </xs:sequence>
  <xs:attribute name="ref" use="optional" type="string" />
</xs:complexType>

<xs:complexType name="****namedValue****">
  <xs:attributeGroup ref="**name**" />
  <xs:choice>
    <xs:element name="value" type="string" maxOccurs="1"minOccurs="0" />
    <xs:element name="list" maxOccurs="1" minOccurs="0">
      <xs:complexType>
        <xs:sequence>
          <xs:element name="value" type="string"maxOccurs="unbounded"
          minOccurs="0"/>
        </xs:sequence>
     </xs:complexType>
   </xs:element>
  </xs:choice>
</xs:complexType>
```

A standalone constraint must specify a unique name and a type. There are several constraint types provided out of the box; the commonly used types are:

-   **REGEX**; Property value matches regular expression.
-   **LENGTH**: Text property value length must reside within minimum and maximum length limits.
-   **MINMAX**: Numeric property value must reside within minimum and maximum range limits.
-   **LIST**: Property value must be one of those specified in the list of values.

Custom constraint types may be developed and registered with the content repository. Each constraint type is parameterized via zero or more `parameter` elements, where the parameter names are specific to each type:

-   **REGEX**: Expression
-   **LENGTH**: `minLength` and `maxLength`
-   **MINMAX**: `minValue` and `maxValue`
-   **LIST**: `allowedValues` and `caseSensitive`

A content model may define one or more standalone constraints.

```
<xs:element name="model">
...
  <xs:element name="constraints" maxOccurs="1" minOccurs="0">
    <xs:complexType>
      <xs:sequence>
        <xs:element name="constraint" type="**constraint**" maxOccurs="unbounded"
        minOccurs="1" />
      </xs:sequence>
    </xs:complexType>
  </xs:element>
...
</xs:element>
```

Each property may support one or more constraints either by referencing an existing standalone constraint definition or defining one inline via the constraint element.

```
<xs:complexType name="property">
...
  <xs:element name="constraints" maxOccurs="1" minOccurs="0">
    <xs:complexType>
      <xs:sequence>
        <xs:element name="constraint" type="**constraint**" maxOccurs="unbounded"
        minOccurs="1" />
      </xs:sequence>
    </xs:complexType>
  </xs:element>
...
</xs:complexType>
```

An existing constraint is referenced via the `ref` element, whose value is the name of the constraint to reference. Otherwise, an inline constraint is defined in the same manner as a standalone constraint.

**Parent topic:**[Content metamodel](../concepts/metadata-model-define.md)

