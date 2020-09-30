---
author: Alfresco Documentation
---

# Search query templates

The FTS query language supports query templates. These are intended to help when building application specific searches.

A template is a query but with additional support to specify template substitution.

-   **%field**

    Insert the parse tree for the current `ftstest` and replace all references to fields in the current parse tree with the supplied field.

-   **%(field1, field2)%(field1 field2)**

    (The comma is optional.) Create a disjunction, and for each field, add the parse tree for the current `ftstest` to the disjunction, and then replace all references to fields in the current parse tree with the current field from the list.


|Name|Template|Example Query|Expanded Query|
|----|--------|-------------|--------------|
|t1|%cm:name|t1:n1|cm:name:n1|
|t1|%cm:name|t1:"n1"|cm:name:"n1"|
|t1|%cm:name|~t1:n1^4|~cm:name:n1^4|
|t2|%(cm:name, cm:title)|t2:"woof"|(cm:name:"woof" OR cm:title:"woof")|
|t2|%(cm:name, cm:title)|~t2:woof^4|(~cm:name:woof OR ~cm:title:woof)^4|
|t3|%cm:name AND my:boolean:true|t3:banana|(cm:name:banana AND my:boolean:true)|

Templates can refer to other templates.

```
nameAndTitle -> %(cm:name, cm:title)
nameAndTitleAndDesciption -> %(nameAndTitle, cm:description)   
```

**Parent topic:**[Alfresco Full Text Search Reference](../concepts/searchsyntax-intro.md)

