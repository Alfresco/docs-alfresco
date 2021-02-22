---
author: Alfresco Documentation
---

# Compatibility matrix

Alfresco SDK has several versions and compatibility with Alfresco versions varies.

It is recommended you use the latest version of the Alfresco SDK where possible.

The following table shows compatibility between Alfresco SDK and versions of Alfresco.

|Alfresco version|Maven Alfresco Lifecycle \(deprecated\)|Maven SDK 1.0.x \(deprecated\)|Maven SDK 1.1.x|Alfresco SDK 2.0.x|Alfresco SDK 2.1.x|
|----------------|---------------------------------------|------------------------------|---------------|------------------|------------------|
|3.2.2 - 4.1.1.x|Compatible \(but not supported\)|Not available|Not available|Not available|Not available|
|4.1.x \(x \>= 2\)|Not available|Compatible \(but not supported\)|Not available \(SDK 1.1.0 does not work with Alfresco 4.1.2-4.1.5 using [Solr Search Subsystem](https://github.com/Alfresco/alfresco-sdk/issues/180). It is possible to use Alfresco 4.1.6 and greater, or use Lucene Search Subsystem\)|Not available|Not available|
|4.2.x|Not available|Not available|Compatible and supported|Not available|Not available|
|5.0 and 5.0.c|Not available|Not available|Not available|Compatible and supported|Not available|
|5.0.1+ and 5.0.d+|Not available|Not available|Not available|Compatible and supported|Compatible and supported|

**Important:** Note that Alfresco 4.1.x requires Java 6, Alfresco 4.2.x and Alfresco 5.0 require Java 7. Alfresco 5.0.1 and 5.0.d requires Java 7 or 8. Note also that Alfresco SDK works only on Linux, Windows or Mac.

**Parent topic:**[Introduction to the Alfresco SDK](../concepts/alfresco-sdk-introduction.md)

