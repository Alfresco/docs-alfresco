---
author: Alfresco Documentation
---

# Constraints

Define constraints in one of two ways: “standalone” allows for the reuse of constraints across many properties; “inline” defines the constraint specifically for a single property.

```

        
<xs:complexType name="constraint">
  <xs:attribute name="name" use="optional" type="string" />
  <xs:attribute name="type" type="string" use="optional"/>
  <xs:sequence>
    <xs:element name="parameter" maxOccurs="unbounded" type="<b>namedValue</b>"
    minOccurs="0"/>
  </xs:sequence>
  <xs:attribute name="ref" use="optional" type="string" />
</xs:complexType>

<xs:complexType name="<b><b>namedValue</b></b>">
  <xs:attributeGroup ref="<b>name</b>" />
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

Custom constraint types can be developed and registered with the content repository. Each constraint type is parameterized by using zero or more `parameter` elements, where the parameter names are specific to each type:

-   **REGEX**: Expression
-   **LENGTH**: `minLength` and `maxLength`
-   **MINMAX**: `minValue` and `maxValue`
-   **LIST**: `allowedValues` and `caseSensitive`

A content model can define one or more standalone constraints.

```


<xs:element name="model">
...
  <xs:element name="constraints" maxOccurs="1" minOccurs="0">
    <xs:complexType>
      <xs:sequence>
        <xs:element name="constraint" type="<b>constraint</b>" maxOccurs="unbounded"
        minOccurs="1" />
      </xs:sequence>
    </xs:complexType>
  </xs:element>
...
</xs:element>


```

Each property can support one or more constraints either by referencing an existing standalone constraint definition or defining one inline by using the constraint element.

```

        
<xs:complexType name="property">
...
  <xs:element name="constraints" maxOccurs="1" minOccurs="0">
    <xs:complexType>
      <xs:sequence>
        <xs:element name="constraint" type="<b>constraint</b>" maxOccurs="unbounded"
        minOccurs="1" />
      </xs:sequence>
    </xs:complexType>
  </xs:element>
...
</xs:complexType>


```

An existing constraint is referenced by using the `ref` element, whose value is the name of the constraint to reference. Otherwise, an inline constraint is defined in the same manner as a standalone constraint.

**Parent topic:**[Content Model metadata](../concepts/metadata-model-define.md)

