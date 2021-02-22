---
author: Alfresco Documentation
---

# Surf dependency aggregation

There are additional FreeMarker template directives related to aggregate dependencies.

## Introduction

This information expands on FreeMarker template attributes and directives.

## The group attribute

The documentlist.get.html.ftl template uses the `group` attribute in the `<@link>`, `<@script>`, `<@inlineScript>` and `<@createWidgets>` directives. This attribute determines the order in which dependency requests and JavaScript code are output into the rendered HTML page.

Surf supports the ability to aggregate multiple files into a single resource to reduce the number of HTTP requests made by the client, in order to increase page loading performance. The `group` attribute is used to determine how dependencies are aggregated into the generated resources. Managing the groups is important because once generated a resource is cached on the server to improve response times for subsequent requests. If a single group were to be used then only one HTTP request would be made per page, but the performance gained through reduced requests would be lost to server side aggregation for each request.

In order for the same Share code to be able to support different Surf operation modes the `group` attribute is also applied when processing individual dependency requests. Groups are output in the order they are requested and all the dependency requests and code are output for each group in turn.

By way of example, for the following HTML:

```

<@script src="/aaa.js" group="1"/>
<@script src="/bbb.js" group="2"/>
<@script src="/ccc.js" group="3"/>
<@script src="/ddd.js" group="2"/>
<@script src="/eee.js" group="1"/>
```

The output is:

```

<script src="/aaa.js"></script>
<script src="/eee.js"></script>
<script src="/bbb.js"></script>
<script src="/ddd.js"></script>
<script src="/ccc.js"></script>
```

Note that `/eee.js` is the second requested import despite appearing last in the list and that `/ccc.js` is last despite it appearing 3rd. This is because all of group "1" is output before any of group "2", and all of group "2" is output before group "3".

## Mixing `<@script>` and `<@inlineScript>`

Given files A.js and `B.js` and a WebScript template containing the following:

```

<@script src="${url.context}/res/A.js" group="calc"/>
   <@inlineScript group="calc">
      // A comment between imports
   </@>
<@script src="${url.context}/res/B.js" group="calc">
```

When the final page is rendered in the source you would see an import like this:

```

   
&lt;script type=&quot;text/javascript&quot; src=&quot;/share/res/A.js&quot;&gt;&lt;/script&gt;
&lt;script type=&quot;text/javascript&quot;&gt;//&lt;![CDATA[
   // A comment between imports
//]]&gt;&lt;/script&gt;
&lt;script type=&quot;text/javascript&quot; src=&quot;/share/res/B.js&quot;&gt;&lt;/script&gt;
      
```

Note that the JavaScript from the `<@inlineScript>` directive is placed between the two imports because they are in the same group. The same is true for any custom directive that outputs JavaScript, for example the `<@createWidgets>` directive.

## Configuring Surf to Aggregate Dependencies

To enable the use of aggregate dependencies you will need to make a Surf configuration change. By default the capability is disabled in Surf and is unlikely to ever enabled by default in future releases of Alfresco.

To enable it you set the following line within the Surf configuration file, webapps/share/WEB-INF/surf.xml:

```

            
      <web-framework>
         …
         <aggregate-dependencies>true</aggregate-dependencies>
         …
      </web-framework>
      
      
```

CAUTION:

Any third-party modules or add-ons that have been applied might not support this feature.

## Aggregated Dependency Output

If you do enable dependency aggregation then you can expect the following behaviour to occur. If the file A.js contains:

```
   
var a = 1;

```

and the file B.js contains:

```

var c = a + b;
```

and you have a WebScript template containing the following:

```

<@script src="${url.context}/res/A.js" group="calc"/>
   <@inlineScript group="calc">
      var b = 1;
   </@>
<@script src="${url.context}/res/B.js" group="calc">
```

When the final page is rendered in the source you would see an import like this:

```

<script type="text/javascript" src="/share/res/20146f7250123ea2437a0d16d5c323.js"></script> <!-- Group Name: "calc" -->
```

The source of that file would contain:

```

var a = 1;
var b = 1;
var c = a + b;
```

The resource name is an MD5 checksum generated from the combined source code. The generated resource is cached on the server so that it doesn't need to be generated each time. If extra content is added to the group \(even dynamically by a module\) then the resource will be regenerated and the checksum will naturally change to ensure that the browser requests a different file.

## Debugging

The `<client-debug>` setting located in webapps/share/WEB-INF/classes/alfresco/share-config.xml, will work when enabled, even when using aggregation. An aggregated resource will still be produced but each aggregated file will be separated by a comment similar to the following:

```

/*Path=A.js*/
```

This will allow you to determine the source file in which errors occur when debugging.

## The Output Directives

Previous versions of Alfresco Share relied on the use of the `${head}` FreeMarker model property to output all the dependency requests generated on the first pass of all the web script \*.head.ftl files. This property is populated during this first pass and then output in `<head>` HTML element defined in the alfresco-template.ftl template. Current code also contains a reference to that property, as this is used to support legacy \*.head.ftl files and dependencies defined through any `<dependencies>` elements in extension module configuration. There are also two new directives: `<@outputJavaScript/>` and `<@outputCSS/>`.

As their names suggest these directives are used to output the JavaScript and CSS dependency requests made by using the `<@link>`, `<@script>`, `<@inlineScript>`, and `<@createWidgets>` directives. The `output` directives act as placeholders in extensibility model and accumulate requests to output content as the remainder of the Surf page is processed - only when the page has completely been processed is their final content rendered into the output stream.

Towards the end of the alfresco-template.ftl file you will also see a commented out directive <@relocateJavaScript\>. The purpose of this directive is to change the location in the page where JavaScript output is rendered. It is suggested to move JavaScript to the end of a page to increase page performance. It is only possible to use this directive if there is no hard-coded `<script>` elements on the page that depend on imported files or JavaScript dependencies output by using the `${head}` property. When uncommented though you will see that it produces a very clean source file for your page with all the JavaScript located at the end. The `<@relocateJavaScript>` directive is available should you wish to use to in custom Surf pages.

**Parent topic:**[Advanced Surf Topics](../concepts/dev-extensions-share-advanced-surf-topics.md)

