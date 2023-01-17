---
title: FreeMarker reference
---

FreeMarker is a templating engine used by the Repository Web Scripts and the Surf Web Scripts.

## Default root objects 

The default model provides a number of common objects useful for most templates. These are generally known as root objects.

Most of the objects wrap the notion of a Node (such as a space or document in the repository) and are known as 
`TemplateNode` objects. This provides a rich object-oriented layer to make it easy to display common concepts, 
such as node properties, aspect values, and content.

>**Note:** Web scripts hosted within the repository tier also have access to the following template root objects. Web scripts hosted within the presentation tier (that is, within Surf) do not have direct access to these objects.

|Object|Description|
|------|-----------|
|`companyhome`|The Company Home template node.|
|`userhome`|The current user's Home Space template node.|
|`person`|The node representing the current user's `Person` object.|
|`args`|A map of any URL parameters passed by using the Template Content Servlet.|

This is a neat way to pass additional parameters to your template. FreeMarker has built-in methods to parse integers 
and check for the existence of values that can be used to make your template even more interactive and powerful. 
For example, to output the names of the arguments passed to a template:

```xml
<#assign keys = args?keys>
<#list keys as arg>      
   ${arg}
</#list>
```

|`sessionticket`|Session related information providing a single value `sessionticket.ticket` for the current authentication ticket; useful when generating some Content Services URLs for accessing outside the web client.|
|`classification`|Read access to classifications and root categories.|
|`url`|Provides a single property `url.context` that can be used to retrieve the container context path, such as `/alfresco`; useful when generating URL links to objects. This is not available when using the template as a custom view on a space.|
|`workflow`|Read access to information on `workflow` objects and the currently executing workflows for a user.|
|`people`|This object gives access to the People API.|

The various default model objects can be accessed directly from the root of a model in your FreeMarker template. 
For example, to display the name property of the `userhome` object:

```javascript
${userhome.properties.name}
```

The node model is built dynamically as you access it, enabling you to write statements such as:

```javascript
userhome.children[1].children[0].children[2].name
```

>**Note:** It should be noted that the FreeMarker template engine is very strict on the access of empty or null values. Unlike many templating or scripting languages that display empty values or assume FALSE as a default value for a missing property, the FreeMarker engine will instead throw an exception and abort the rendering of the template. To help you build stable templates, most of the TemplateNode API calls provided by the default model that return Maps or Sequences (lists) of items will return empty Maps and Sequences instead of null. Also if a null value can be returned by a call (for instance, from accessing a Map to find a value by name), you should use the FreeMarker built-in `exists` method or preferably the shortened form of `??` to check for null first. Therefore:

```xml
<#if mynode??>
  <#if mynode.assocs["cm:translations"]??>
     ${mynode.assocs["cm:translations"][0].content}
  </#if>
</#if>
```

This checks for the existence of `mynode` and then checks for the existence of a `translation` association before 
attempting to access the translation.

## FreeMarker extensibility directives in Web Script templates

Extensibility directives provide a way of dynamically editing HTML through configuration.

Surf has been enhanced so that instead of writing templates directly to the output stream, it writes to an in-memory 
model and then allows extensions to manipulate that model before the model is flushed to the output stream. The mechanism 
for updating the model is through the use of new and updated FreeMarker template directives.

Wherever an extensibility directive is used in a base template, it can be manipulated by a corresponding extension file. 
The currently supported actions include:

* `remove` - completely removes the directive contents from the model.
* `replace` - replaces the directive contents in the model.
* `before` - place contents immediately before the target directive contents.
* `after` - place new directive contents immediately after the target directive contents.

Alfresco provides two directives that support extensibility: `<@region>` and `<@markup>`.

The `<@region>` directive was used extensively in previous versions of Alfresco Share to define the Regions into which 
Components are bound. This implementation has been updated to work with the extensibility model. The `<@markup>` 
directive is new and is used to demarcate sections of HTML in a template.

The [add content]({% link content-services/7.2/tutorial/share/pages.md %}#addcontent) and 
[removing content]({% link content-services/7.2/tutorial/share/pages.md %}#removecontent) tutorials relies on there being a 
Component available that will be bound to a Region in the template.

Using this alternative mechanism makes it possible to add new regions and also completely remove regions to prevent 
Components from being bound. This is significantly different because it is a much more volatile approach but could be 
useful in certain circumstances. If you want to remove some content and prevent another module from either restoring or 
adding to it, then using this technique you can remove it entirely from the model so that it cannot be changed.
