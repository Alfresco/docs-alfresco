---
author: Alfresco Documentation
---

# Surf Checksums

Checksums can be applied to JavaScript and CSS resources to facilitate efficient upgrading of Alfresco Content Services.

One of the problems that has affected upgrades of Alfresco Content Services in the past is that the end-user's browser can end up using cached copies of JavaScript and CSS files that have been updated during the upgrade. Surf has a service called the “DependencyHandler” which solves this specific problem.

The approach taken is to append a unique checksum to the end of each requested JavaScript and CSS dependency, where the checksum is generated from the contents of the file. If file content is changed the checksum generated will be different. The checksum associated with the file is cached for the lifecycle of the web server - this means that it does not need to be generated for each request. Surf performance has actually been enhanced by this mechanism because Surf also caches the location from which the dependency was retrieved Surf can retrieve dependencies from a number of different locations, for example, JAR files, class path, file system, remote location, and so on.

This feature is enabled by default in the webapps/share/WEB-INF/surf.xml file:

```
<web-framework>
  ...
   <use-checksum-dependencies>true</use-checksum-dependencies>
  ...
</web-framework>
```

**Important:** Note that this value should not be changed for Alfresco version 4.2 and later, or Alfresco 3.4 and earlier. It can however be changed for Share in Alfresco versions 4.0 and 4.1.

In order to make use of the Dependency Handler you will need to use the <@script\>, <@link\> and <@checksumResource\> FreeMarker directives in your template instance and web script files, for example:

```
<@script src="${url.context}/res/yui/yahoo/yahoo.js"></@script>
<@link rel="stylesheet" type="text/css" href="${url.context}/res/css/base.css" />
<@checksumResource src="${url.context}/res/css/ipad.css"/>
```

These examples are taken from the `resources.get.html.ftl` file where the `${url.context}` is a FreeMarker variable set to the application context, for example `share`.

-   **<@script\>**

    Generates JavaScript script import declarations.

-   **<@link\>**

    Rolls up multiple CSS requests into a style declaration using a separate `@import` statement for each usage of <@link\>.

-   **<@checksumResource\>**

    Generates just the URL, that is without being specific to CSS or JavaScript and can therefore be used with images or even web script requests. One additional feature of the <@checksumResource\> directive is that you can specify the attribute `parameter` which makes the checksum appear as the value of a request parameter of the supplied name \(rather than as part of the file name itself\).


## Debug and production suffices

The Dependency Handler is capable of dealing with production \(minified\) and debug versions of files. The Spring application context configuration for the bean allows you to specify the different file suffices that can be used for both production and debug versions and the Dependency Handler will work through the different suffices until it finds a matching file. This means that Surf will always be able to fall back to the debug version of the code if a minified version does not exist. By default the debug suffices are:

-   No suffix
-   \_src
-   -debug

The production suffices are:

-   -min
-   -minified
-   no suffix

You can change these suffices by overriding the definition for the `dependency.handler` bean in the Spring application context in case you want to add, remove or re-order the default entries.

## Current limitations

The current limitation of this solution is that it only works with static requests from the page and not dynamic requests made from a script. However, many JavaScript libraries provide their own solution to this problem \(for example TinyMCE\).

**Parent topic:**[Advanced Surf Topics](../concepts/dev-extensions-share-advanced-surf-topics.md)

