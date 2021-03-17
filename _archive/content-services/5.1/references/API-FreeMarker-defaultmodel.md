---
author: Alfresco Documentation
---

# Default model objects

The default model provides a number of common objects useful for most templates. These are generally known as root objects.

Most of the objects wrap the notion of an Alfresco Node \(such as a space or document in the repository\) and are known as `TemplateNode` objects. This provides a rich object-oriented layer to make it easy to display common Alfresco concepts, such as node properties, aspect values, and content.

**Note:** Web scripts hosted within the Alfresco repository tier also have access to the following template root objects. Web scripts hosted within the presentation tier \(that is, within Alfresco Surf\) do not have direct access to these objects.

|Type|Description|
|----|-----------|
|`companyhome`|The Company Home template node.|
|`userhome`|The current user's Home Space template node.|
|`person`|The node representing the current user's `Person` object.|
|`args`|A map of any URL parameters passed by using the Template Content Servlet.

This is a neat way to pass additional parameters to your template. FreeMarker has built-in methods to parse integers and check for the existence of values that can be used to make your template even more interactive and powerful. For example, to output the names of the arguments passed to a template:

```

            
<#assign keys = args?keys>
<#list keys as arg>      
   ${arg}
</#list>


```

|
|`sessionticket`|Session related information providing a single value `sessionticket.ticket` for the current authentication ticket; useful when generating some Alfresco URLs for accessing outside the web client.|
|`classification`|Read access to classifications and root categories.|
|`url`|Provides a single property `url.context` that can be used to retrieve the Alfresco container context path, such as /alfresco; useful when generating URL links to objects. This is not available when using the template as a custom view on a space.|
|`workflow`|Read access to information on `workflow` objects and the currently executing workflows for a user.

|
|`people`|This object gives access to the People API.

|

The various default model objects can be accessed directly from the root of a model in your FreeMarker template. For example, to display the name property of the userhome object:

```
${userhome.properties.name}
```

The Alfresco node model is built dynamically as you access it, enabling you to write statements such as:

```
userhome.children[1].children[0].children[2].name
```

**Note:** It should be noted that the FreeMarker template engine is very strict on the access of empty or null values. Unlike many templating or scripting languages that display empty values or assume FALSE as a default value for a missing property, the FreeMarker engine will instead throw an exception and abort the rendering of the template. To help you build stable templates, most of the TemplateNode API calls provided by the default model that return Maps or Sequences \(lists\) of items will return empty Maps and Sequences instead of null. Also if a null value can be returned by a call \(for instance, from accessing a Map to find a value by name\), you should use the FreeMarker built-in `exists` method or preferably the shortened form of `??` to check for null first. Therefore:

```


<#if mynode??>
  <#if mynode.assocs["cm:translations"]??>
     ${mynode.assocs["cm:translations"][0].content}
  </#if>
</#if>


```

This checks for the existence of `mynode` and then checks for the existence of a `translation` association before attempting to access the translation.

**Parent topic:**[FreeMarker API](../references/API-FreeMarker-intro.md)

