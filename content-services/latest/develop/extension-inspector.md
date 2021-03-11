---
title: Extension Inspector
---

Alfresco Extension Inspector allows you to analyse Alfresco extensions and to compare them against a particular Alfresco Content Service version. For example, it helps you to understand how customizations and extensions are affected with a newer version of Alfresco, checking for compliance with our best practices and providing recommendations for upgrade impact and safety.

Alfresco Extention Inspector scans and validates an Alfresco extension (amp or jar) against an alfresco.war file.

The main features of Alfresco Extension Inspector are:

* Parses Alfresco extensions, for example amp or jar files
* Generates a report on possible overrides
* Discourages the use of non-public APIs
* Lists Alfresco's third-party libraries

The Extension Inspector has two main modules.

> **Note:** See the Github respository for more information on the [Alfresco Extension Inspector](https://github.com/Alfresco/alfresco-extension-inspector){:target="_blank"}

|Modules|Description|
|-------|-----------|
|Inventory (`extension-inspector-inventory`)|For parsing an alfresco.war file|
|Analyser (`extension-inspector-analyser)`|For analysing custom extensions against the inventory|

## Using the Extension Inspector

Download the [alfresco-extension-inspector-1.0.0](https://artifacts.alfresco.com/nexus/service/local/repositories/releases/content/org/alfresco/extension-inspector/alfresco-extension-inspector/1.0.0/alfresco-extension-inspector-1.0.0.jar) `.jar` file.

## Running the Inventory application

The application generates a report for a `.war` file.

To run the Inventory application use the following command:

```java
java -jar alfresco-extension-inspector-<version>.jar --inventory
<alfresco_war_path> [--o=<report_file_path>]
```

Where the `--inventory <alfresco_war_path>` parameter is a path to a valid `war` file. The optional `--o` parameter is for the output of the report, a given file or a folder location where a report with the default name `<war_name>.inventory.json` is generated.

When you run the Inventory command, the output is a report in json format with the following example structure:

```java
{
  "schemaVersion" : "1.0",
  "alfrescoVersion" : "6.2.1",
  "resources" :
    {
      "ALFRESCO_PUBLIC_API" :
      [
        {
         "type" : "ALFRESCO_PUBLIC_API",
         "id" : "package.ClassName1",
         "deprecated" : false,
         "implicit" : false
        },
        {
        "type" : "ALFRESCO_PUBLIC_API",
        "id" : "package.ClassName2",
        "deprecated" : true,
        "implicit" : true
        },
        ...
      ],
      "CLASSPATH_ELEMENT" :
      [
        {
          "type" : "CLASSPATH_ELEMENT",
          "id" : "org/alfresco/package1/AClass.class",
          "definingObject" : "WEB-INF/lib/alfresco-library.jar"
        },
        {
          "type" : "CLASSPATH_ELEMENT",
          "id" : "com/3rdparty/packageA/AClass.class",
          "definingObject" : "WEB-INF/lib/3rdparty-library.jar"
        },
        ...
        ],
        "BEAN" :
        [
          {
           "type" : "BEAN",
           "id" : "beanName",
           "definingObject" : "alfresco/aContext.xml@WEB-INF/lib/alfresco-library.jar"
          },
         ...
        ],
        "FILE" :
        [
          {
            "type" : "FILE",
            "id" : "WEB-INF/classes/aFile.ext",
            "definingObject" : "WEB-INF/classes/aFile.ext"
          },
          {
            "type" : "FILE",
            "id" : "WEB-INF/lib/aLibrary.jar",
            "definingObject" : "WEB-INF/lib/aLibrary.jar"
          },
          ...
        ]
}
```

## Running the Analyser application

The application analyses custom extensions against war inventories.

To run the Analyser application use the following command:

```java
java -jar alfresco-extension-inspector-<version>.jar <extension-filename> [--
target-version=6.1.0[-7.0.0] | --target-inventory =/path/to/war_inventory.json]
[--verbose=[true | false]]
```

The following table lists the options for the application.

|Option|Description|
|------|-----------|
|`--target-version`|An Alfresco version or a range of Alfresco versions|
|`--target-inventory`|A file path of an existing WAR inventory|
|`--verbose`|Verbose output|

When running the command, `alfresco-extension-inspector` writes the conflicts directly to the console, grouped by type.

The following conflict types are detected:

* File overwrites (`FILE_OVERWRITE`)
* Bean overwrites (`BEAN_OVERWRITE`)
* Classpath conflicts (`CLASSPATH_CONFLICT`)
* Beans instantiating restricted classes (`BEAN_RESTRICTED_CLASS`)
* Usage of non @AlfrescoPublicAPI classes (`ALFRESCO_INTERNAL_USAGE`)
* Usage of 3rd party libraries (`WAR_LIBRARY_USAGE)`

The output is a report with the following example structure:

### Bean naming conflicts

The following Spring beans defined in the extension module are in conflict with
beans defined in the ACS repository:
extension_bean
Spring beans are the basic building blocks of the ACS repository. Replacing these
will alter the behaviour of the system and can lead to unexpected behaviour.
Since all these beans are subject to change between Alfresco versions and even in
service packs, these modifications are typically bound to a specific Alfresco
version.
You should avoid redefining default beans of the ACS repository in your
extensions to reduce the cost of upgrades.
It is possible that these conflicts only exist in specific ACS versions. Run this
tool with the -verbose option to get a complete list of versions where each of
these files has conflicts.

### Beans instantiating internal classes

The following Spring beans defined in the extension module instantiate internal
classes:
extension_bean (class=org.alfresco.repo.... )
These classes are considered an internal implementation detail of the ACS
repository and do not constitute a supported extension point. They might change
or completely disappear between ACS versions and even in service packs.

### Classpath conflicts

The following files and libraries in the extension module cause conflicts on the
Java classpath:
`/lib/alfresco-test.jar`
Ambiguous resources on the Java classpath render the behaviour of the JVM
undefined (see Java specification).
Although it might be possible that the repository can still start-up, you can
expect erroneous behavior in certain situations. Problems of this kind are
typically very hard to detect and trace back to their root cause.
It is possible that these conflicts only exist in specific ACS versions. Run this
tool with the -verbose option to get a complete list of versions where each of
these files has conflicts.

### Custom code using internal classes

The following classes defined in the extension module are using internal repository classes:
org.alfresco.repo...
Internal repository classes:
org.alfresco.repo...
These classes are considered an internal implementation detail of the ACS
repository and might change or completely disappear between ACS versions and even
between service packs.
For a complete usage matrix, use the -verbose option of this tool.

### Custom code using 3rd party libraries managed by the ACS repository

The code provided by the extension module is using these 3rd party libraries
brought by the ACS repository:
`/WEB-INF/lib/test-1.0.0.jar`
These 3rd party libraries are managed by the ACS repository and are subject to
constant change, even in service packs and hotfixes.
Each of these libraries has its own backward compatibility strategy, which will
make it really hard for this extension to keep up with these changes.
REPORT SUMMARY
Across the provided target versions, the following number of conflicts have been
found:

|Type|Total|
|------|-----------|
|BEAN_OVERWRITE|1|
|BEAN_RESTRICTED_CLASS|1|
|CLASSPATH_CONFLICT|1|
|ALFRESCO_INTERNAL_USAGE|2|
|WAR_LIBRARY_USAGE|1|

(use option --verbose for version details)

Alfresco extensions might hide conflicts of the following types if they contain Alfresco-specific libraries:

* `BEAN_RESTRICTED_CLASS`
* `WAR_LIBRARY_USAGE`
* `ALFRESCO_INTERNAL_USAGE`

They are hidden because these types of conflict exclude from processing all the classes in the extension's classpath.
By including a class present in both extension and war in the processing, this may partially solve the issue because:

* Two classes with the same canonical name could come from two different libraries, for example, an extension-specific library and an Alfresco library, or two different versions of the same Alfresco library. Therefore, checking the class name alone is not enough.
* Comparing their libraries would help only when the same library with the same version is used in both the extension and the war. In case of different versions of the same library, the class won't be recognized as an Alfresco internal class.
