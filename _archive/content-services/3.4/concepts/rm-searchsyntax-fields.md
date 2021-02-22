---
author: [Alfresco Documentation, Alfresco Documentation, Alfresco Documentation]
source: 
audience: 
category: Getting Started
option: Search syntax
---

# Search for fields

Search specific fields rather than the default. Terms, phrases, etc. can all be preceded by a field. If not the default field TEXT is used.

```
field:term
field:"phrase"
=field:exact
~field:expand

```

Fields fall into three types: property fields, special fields, and fields for data types.

Property fields evaluate the search term against a particular property, special fields are described in the following table, and data type fields evaluate the search term against all properties of the given type.

|Description|Type|Example|
|-----------|----|-------|
|Fully qualified property|Property|\{http://www.alfresco.org/model/content/1.0\}name:apple|
|Fully qualified property|Property|@\{http://www.alfresco.org/model/content/1.0\}name:apple|
|CMIS style property|Property|cm\_name:apple|
|Prefix style property|Property|cm:name:apple|
|Prefix style property|Property|@cm:name:apple|
|TEXT|Special|TEXT:apple|
|ID|Special|ID:"NodeRef"|
|ISROOT|Special|ISROOT:T|
|TX|Special|TX:"TX"|
|PARENT|Special|PARENT:"NodeRef"|
|PRIMARYPARENT|Special|PRIMARYPARENT:"NodeRef"|
|QNAME|Special|QNAME:"app:company\_home"|
|CLASS|Special|CLASS:"qname"|
|EXACTCLASS|Special|EXACTCLASS:"qname"|
|TYPE|Special|TYPE:"qname"|
|EXACTTYPE|Special|EXACTTYPE:"qname"|
|ASPECT|Special|ASPECT:"qname"|
|EXACTASPECT|Special|EXACTASPECT:"qname"|
|ALL|Special|ALL:"text"|
|ISUNSET|Special|ISUNSET:"property-qname"|
|ISNULL|Special|ISNULL:"property-qname"|
|ISNOTNULL|Special|ISNOTNULL:"property-qname"|
|Fully qualified data type|Data Type|\{http://www.alfresco.org/model/dictionary/1.0\}content:apple|
|prefixed data type|Data Type|d:content:apple|

**Parent topic:**[Search syntax](../concepts/rm-searchsyntax-intro.md)

