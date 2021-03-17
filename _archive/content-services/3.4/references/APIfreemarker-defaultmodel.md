---
author: [Alfresco Documentation, Alfresco Documentation]
source: 
audience: 
category: Development
option: FreeMarker template API
---

# Default model

The default model provides a number of common objects useful for most templates. Most of the objects wrap the notion of an Alfresco Node \(such as a space or document in the repository\) and are known as `TemplateNode` objects. This provides a rich OO layer to make it easy to display common Alfresco concepts, such as node properties, aspect values, and content.

**Note:** Web scripts hosted within the Alfresco repository tier also have access to the following template root objects. Web scripts hosted within the presentation tier \(that is, within Alfresco Surf\) have their own extras.

If you are accessing a template through the Explorer client UITemplate component \(this is the common case when developers use this component directly\), the following named objects are provided by default at the root of the model.

**Note:** Web scripts hosted within the Alfresco repository tier also have access to the following template root objects. Web scripts hosted within the presentation tier \(that is, within Alfresco Surf\) have their own extras.

|Type|Description|
|----|-----------|
|`companyhome`|The Company Home template node.|
|`userhome`|The current user's Home Space template node.|
|`person`|The node representing the current user's `Person` object.|
|`template`|The node representing the template itself.|

When accessing a template through the Explorer web client using a custom view for a space, the Preview In Template action, or a URL using the template servlet, the `space` named object is also provided.

|Type|Description|
|----|-----------|
|`space`|The current space template node.|

When accessing a template through the Explorer web client using a custom view for a document, the Preview In Template action, or a URL using the template servlet, the `document` named object is also provided.

|Type|Description|
|----|-----------|
|`document`|The current document template node.|

The `company home`, `userhome`, `person`, `template`, `space`, and `document` objects are all of type `TemplateNode` object. A `TemplateNode` object represents a node in the Alfresco repository and has its own rich API for accessing common Alfresco concepts, such as properties, aspects, associations, and content.

If accessing a template via the template servlet, the `args` special object is also available.

|Type|Description|
|----|-----------|
|`args`|A map of any URL parameters passed via the Template Content Servlet.

This is a neat way to pass additional parameters to your template. FreeMarker has built-in methods to parse integers and check for the existence of values that can be used to make your template even more interactive and powerful. For example, to output the names of the arguments passed to a template:

```
<#assign keys = args?keys>
<#list keys as arg>      
   ${arg}
</#list>
```

Various other root objects are also available to provide a full set of rich functional objects to the template developer.

|

Various other root objects are also available to provide a full set of rich functional objects to the template developer:

|Type|Description|
|----|-----------|
|`session`|Session related information providing a single value `session.ticket` for the current authentication ticket; useful when generating some Alfresco URLs for accessing outside the web client.|
|`classification`|Read access to classifications and root categories.|
|`url`|Provides a single property `url.context` that can be used to retrieve the Alfresco container context path, such as /alfresco; useful when generating URL links to objects. This is not available when using the template as a custom view on a space.|
|`workflow`|Read access to information on `workflow` objects and the currently executing workflows for a user.

|

The various default model objects can be accessed directly from the root of a model in your template. For example, to display the name property of the userhome object:

```
userhome.properties.name
```

The Alfresco node model is built dynamically as you access it, enabling you to write statements such as:

```
userhome.children[1].children[0].children[2].name
```

**Note:** It should be noted that the FreeMarker template engine is very strict on the access of empty or null values. Unlike many templating or scripting languages that display empty values or assume FALSE as a default value for a missing property, the FreeMarker engine will instead throw an exception and abort the rendering of the template. To help you build stable templates, most of the TemplateNode API calls provided by the default model that return Maps or Sequences \(lists\) of items will return empty Maps and Sequences instead of null. Also if a null value may be returned by a call \(for instance, from accessing a Map to find a value by name\), you should use the FreeMarker built-in `exists` method or preferably the shortened form of `??` to check for null first. Therefore:

```
<#if mynode??>
  <#if mynode.assocs["cm:translations"]??>
     ${mynode.assocs["cm:translations"][0].content}
  </#if>
</#if>
```

This checks for the existence of `mynode` and then checks for the existence of a `translation` association before attempting to access the translation.

**Parent topic:**[Template models](../concepts/APIfreemarker-models.md)

