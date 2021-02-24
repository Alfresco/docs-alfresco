---
author: [Alfresco Documentation, Alfresco Documentation]
source: 
audience: 
category: Development
option: FreeMarker template API
---

# XML Content Processing API

The FreeMarker language supports XML DOM processing using either DOM functional or macro style declarative operations. The Alfresco TemplateNode API has been extended to provide access to the FreeMarker DOM model objects.

|Type|Description|
|----|-----------|
|`xmlNodeModel`|Returns the XML DOM model object for the content of the node.If the node content is valid XML and the XML can be parsed, then this method returns the root of the DOM for this node. The DOM can be walked and processed using the syntax as per the FreeMarker XML Processing Guide.

For example, process the XML document content of the current document, assuming the node content contains the following XML:

```
<?xml version="1.0" standalone="yes"?>
<book title="Book Title">
  <chapter>
    <title>Chapter 1</title>
    <para>p1.1</para>
    <para>p1.2</para>
    <para>p1.3</para>
  </chapter>
  <chapter>
    <title>Chapter 2</title>
    <para>p2.1</para>
    <para>p2.2</para>
  </chapter>
</book>

<#if document.mimetype = "text/xml">
   <#assign dom=document.xmlNodeModel>
   <h1>${dom.book.@title}</h1>
   <#list dom.book.chapter as c>
      <h2>${c.title}</2>
   </#list>  
</#if>
```

|

**Parent topic:**[Template models](../concepts/APIfreemarker-models.md)

