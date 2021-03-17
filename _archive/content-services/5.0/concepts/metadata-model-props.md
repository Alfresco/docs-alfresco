---
author: Alfresco Documentation
---

# Properties

A node can have multiple properties, with each property being of a specific datatype.

For example:

```

        
<xs:complexType name="property">
  <xs:attributeGroup ref="<b>name</b>" />
  <xs:sequence>
    <xs:group ref="<b>TextualDescription</b>" />
    <xs:element name="type" type="string" />
    <xs:element name="mandatory" maxOccurs="1" minOccurs="0" type="<b>mandatoryDef</b>" />
    <xs:element name="multiple" type="boolean" maxOccurs="1" minOccurs="0" />
    <xs:element name="default" type="anyType" maxOccurs="1" minOccurs="0" />
    <xs:element name="index" maxOccurs="1" minOccurs="0">
     <xs:complexType>
      <xs:sequence>
        <xs:element name="atomic" type="boolean" maxOccurs="1" minOccurs="0" />
        <xs:element name="stored" type="boolean" maxOccurs="1" minOccurs="0" />
        <xs:element name="tokenised" maxOccurs="1" minOccurs="0" >
          <xs:simpleType>
            <xs:restriction base="string">
             <xs:enumeration value="true"/>
             <xs:enumeration value="false"/>
             <xs:enumeration value="both"/>
            </xs:restriction>
          </xs:simpleType>
         </xs:element>
       </xs:sequence>
       <xs:attribute name="enabled" type="boolean" use="required" />
     </xs:complexType>
    </xs:element>
   </xs:sequence>
  </xs:complexType>

<xs:complexType name="<b>mandatoryDef</b>" mixed="true">
  <xs:attribute name="enforced" use="optional" type="boolean"/>
</xs:complexType>


```

## Data types

The only feature of a property that must be specified is its data type, of which the content repository supports a wide variety. Each data type is named.

Commonly used data types out of the box are:

-   **`d:text`**

    A text value, a character string

-   **`d:mltext`**

    A multilingual text value where many localized representations of the text value can be held

-   **`d:content`**

    An arbitrarily long text or binary stream

-   **`d:int`**

    An integer value \(java.lang.Integer equivalent\)

-   **`d:long`**

    A long value \(java.lang.Long equivalent\)

-   **`d:float`**

    A float value \(java.lang.Float equivalent\)

-   **`d:double`**

    A double value \(java.lang.Double equivalent\)

-   **`d:date`**

    A date value \(java.lang.Date equivalent\)

-   **`d:datetime`**

    A date and time value \(java.lang.Date equivalent\)

-   **`d:boolean`**

    A boolean value \(java.lang.Boolean equivalent\)

-   **`d:any`**

    Any value, regardless of type


## Property definition

By default a property supports a single value, but it can support multiple values by using the `multiple` element. Multiple values are rendered as lists in the various Alfresco APIs.

A value can also be mandated on creation of a node by using the mandatory element. That is, a transaction will not commit unless all mandatory values have been provided for nodes modified within that transaction. There are actually two forms of mandatory: enforced and relaxed. Enforced is as described but relaxed gives finer control over when mandatory values must be provided. A transaction will still commit if a relaxed mandatory value has not been specified; however, the node with the missing value will be marked as incomplete \(by using the `sys:incomplete` aspect\). This is important, as not all content creation processes \(for example, by using many of the protocols supported by Alfresco\) provide the ability to set property values. Custom solutions can then be configured or built that trigger a business process for collecting the missing values \(for example, by using workflow user-assigned tasks\).

In conjunction with mandating a value, a property definition can also specify a default value that is set automatically by the content repository if the value has not been set at transaction commit time.

To enable the content repository to query on a property value, the property must first be indexed, which is controlled by using the `index` element. Choose which properties are indexed carefully, as each property will increase the size of the index. Properties can be indexed as part of the transaction commit \(known as atomic indexing\) or indexed in the background. Typically, properties of type `d:content` are background-indexed. Control over how values are tokenized is also possible, such that only the tokenized value is stored in the index, or only the original value is stored in the index, or both. Tokenization is the process used by the query engine for recognizing words and other elements, such as punctuation, and allows for comparisons in d:date field searches.

Although the content model provides the ability to specify property definitions, the content repository supports a feature known as a residual property, where a value can be set on a node for which there is no associated property definition defined in a content model. This allows for a node to act as a property bag for an arbitrary set of named-value pairs.

**Parent topic:**[Content metamodel](../concepts/metadata-model-define.md)

