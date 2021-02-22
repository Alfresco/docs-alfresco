---
author: [Alfresco Documentation, Alfresco Documentation]
source: 
audience: 
category: Development
option: FreeMarker template API
---

# Advanced TemplateNode API

The following values are available but are required only for special use cases.

|Type|Description|
|----|-----------|
|`qnamePath`|QName-based path to the node; useful for building Lucene PATH: style queries that constrain to a path location.|
|`primaryParentAssoc`|`ChildAssociationRef` instance for the node.|
|`auditTrail`|Returns a sequence of `AuditInfo` objects representing the Audit Trail for a node; available only if auditing is active for the repository.|
|`isTemplateContent(object)`|Returns true if the given object is a `TemplateContentData` instance; useful to determine if a value returned from a property is of the `d:content` datatype.|
|`isTemplateNodeRef(object)`|Returns true if the given object is a `TemplateNodeRef` instance; useful to determine if a value returned from a property is a `d:noderef` datatype.|

**Parent topic:**[Template models](../concepts/APIfreemarker-models.md)

