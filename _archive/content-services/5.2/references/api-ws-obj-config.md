---
author: Alfresco Documentation
---

# config

The `config` root object provides access to web script configuration.

Configuration is accessed by using the `config` root object, which is available during both controller script and template execution.

There are three types of configuration, 'script', 'scoped' and 'global'. Script configuration is defined in an XML document with an arbitary structure stored locally with the Web Script. Global and Scoped configuration are specified in Alfresco Content Services configuration files.

## Script configuration

Script configuration is read from an XML file packaged with the web script. By way of example a 'Hello World' service would have the following file is created and placed in the same folder as the web script description document helloworld.get.config.xml.

Again, naming conventions apply where configuration file names have the following structure:

```
<serviceId>.<httpMethod>.config.xml
```

The content of the configuration can be any valid XML, such as the following:

```
<helloworld>
  <greeting>hello</greeting>
  <fromproperty>userName</fromproperty>
</helloworld>
```

Within a Controller Script, access to the configuration is by using E4X which is essentially "ECMAScript For XML". Tutorials can be found at [WSO2](http://wso2.org/library/1050) and [PHPForms](http://phpforms.net/tutorial/tutorial.html).

The controller script example can be updated to determine how to display "who" the greeting is from:

```
model.toWho = (args.to != null) ? args.to : person.properties.userName;
var s = new XML(config.script);
model.fromWho = person.properties[s.fromproperty];
```

FreeMarker has built-in support for processing XML data allowing response templates direct access to configuration too. The template example to extract the greeting from the configuration could be as follows:

```
<html>
  <body>
    At ${date?datetime}, ${fromWho?html} says ${config.script.helloworld.greeting?html} to ${toWho?html}
  </body>
</html>
```

## Global and scoped configuration

Global and scoped configuration is read by the Alfresco Content Services Configuration Service.

Repository tier web script configuration locations are set via the file webapps/alfresco/WEB-INF/classes/alfresco/web-scripts-application-context.xml as follows:

-   alfresco/web-scripts-config.xml on the classpath
-   alfresco/extension/web-scripts-config-custom.xml on the classpath

For Share \(UI tier\) web scripts configuration locations are set via the file webapps/share/WEB-INF/classes/alfresco/slingshot-application-context.xml as follows:

-   org/springframework/extensions/webscripts/spring-webscripts-config.xml on the classpath
-   META-INF/spring-webscripts-config-custom.xml on the classpath
-   META-INF/spring-webscripts-config-custom.xml in a web script JAR file found on the classpath

Configuration sections that do not have an evaluator or condition are known as 'global' config sections. These will always appear in a configuration lookup, a typical global configuration section has the following appearance:

```
<config>
  <server>
    <errorpage>/jsp/error.jsp</errorpage>
    <loginpage>/jsp/login.jsp</loginpage>
    <guesthome enabled="true">/jsp/guesthome.jsp</guesthome>
    <url>/</url>
    <url>/alf</url>
    <url>/alfresco</url>
  </server>
</config>
```

Scoped configuration, on the other hand, is a configuration section that does have an evaluator and condition, for example:

```
<config evaluator="string-compare" condition="Remote">
  <remote>
    <endpoint>http://localhost:8080/alfresco</endpoint>
  </remote>
</config>
```

## Accessing Global and Scoped Configuration

Accessing the configuration specified is achieved using the same techniques and syntax as any other model data, the global configuration is exposed by using the `config.global` root object and the scoped config is exposed by using the `config.scoped` root object.

For example, to access the server configuration from the example given the following syntax would be used in a JavaScript:

```
var serverCfg = config.global.server;
```

and the following syntax would be used in a FreeMarker template:

```
<#assign serverCfg=config.global.server>
```

Accessing scoped configuration is slightly different in that some context is required \(to perform the scoped lookup against\). This is achieved using the syntax to access a Map. For example to access the remote config in the scoped "Remote" section from the example given the following syntax would be used in a JavaScript:

```
var remote = config.scoped["Remote"].remote;
```

and the following syntax would be used in a FreeMarker template:

```
<#assign remoteCfg=config.scoped["Remote"].remote> 
```

**Parent topic:**[Root objects reference](../references/api-ws-root-ref.md)

