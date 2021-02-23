---
author: Alfresco Documentation
---

# Compatibility

Maven Alfresco SDK has several versions and compatibility with Alfresco versions varies.

It is recommended you use the latest version of the Maven Alfresco SDK where possible.

The following table shows compatibility between Maven Alfresco SDK and versions of Alfresco.

|Alfresco version|Maven Alfresco Lifecycle \(deprecated\)|Maven SDK 1.0.x|Maven SDK 1.1.x|
|----------------|---------------------------------------|---------------|---------------|
|3.2.2 - 4.1.1.x|Compatible \(but not supported\)|Not available|Not available|
|4.1.x \(x \>= 2\)|Not available|Compatible \(but not supported\)|Not available \(SDK 1.1.0 does not work with Alfresco 4.1.2-4.1.5 using [Solr Search Subsystem](https://code.google.com/p/maven-alfresco-archetypes/issues/detail?id=180). It is possible to use Alfresco 4.1.6 and greater, or use Lucene Search Subsystem\)|
|4.2+|Not available|Not available|Compatible and supported|

**Important:** Note that Alfresco 4.1.x requires Java 6, Alfresco 4.2.x requires Java 7.

**Parent topic:**[Maven Alfresco SDK](../concepts/dev-extensions-maven-sdk-intro.md)

