---
author: Alfresco Documentation
---

# Preparing the file system

There are a number of things you must do to prepare the file system before you do the bulk import.

## File encoding

Only file names that are UTF-8 encoded can be imported using the Bulk Import tool. To import file names with a different encoding, you must convert them to UTF-8 before running the import.

For example, to import file names that are Latin 1 encoded, firstly convert them to UTF-8 and then you can import the files using the Bulk Import tool. If you try to import file names that are Latin 1 encoded, the import will fail.

## Metadata files

The Bulk Import tool has the ability to load metadata \(types, aspects, and their properties\) into the repository. Metadata is loaded into the repository using *shadow* Java property files in XML format, which has good support for Unicode characters.

Shadow properties files must have exactly the same name and extension as the file for which it describes the metadata, but with the suffix .metadata.properties.xml. For example, if there is a file called IMG\_1967.jpg, the shadow metadata file is called IMG\_1967.jpg.metadata.properties.xml.

Shadow files can also be used for directories. For example, if you have a directory called MyDocuments, the shadow metadata file is called MyDocuments.metadata.properties.xml.

The metadata file itself follows the usual syntax for Java XML properties files:

```
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE properties SYSTEM "http://java.sun.com/dtd/properties.dtd">
<properties>
   <entry key="key1">value1</entry>
    entry key="key2">value2</entry>
    ...
</properties>
```

There are two special keys:

-   type - contains the qualified name of the content type to use for the file or folder
-   aspects - contains a comma-delimited list of the qualified names of the aspect\(s\) to attach to the file or folder

The remaining entries in the file are treated as metadata properties, with the key being the qualified name of the property and the value being the value of that property. Multi-valued properties are comma-delimited. However, these values are not trimmed so it's recommended you do not place a space character either before or after the comma, unless you want that in the value of the property.

The following snippet shows an example using the IMG\_1967.jpg.metadata.properties.xml file:

```
 <?xml version="1.0" encoding="UTF-8"?>
 <!DOCTYPE properties SYSTEM "http://java.sun.com/dtd/properties.dtd">
 <properties>
    <entry key="type">cm:content</entry>
    <entry key="aspects">cm:versionable,cm:dublincore</entry>
    <entry key="cm:title">A photo of a flower.</entry>
    <entry key="cm:description">A photo I took of a flower while walking around Bantry Bay.</entry>
    <entry key="cm:created">1901-01-01T12:34:56.789+10:00</entry>
    <!-- cm:dublincore properties -->
    <entry key="cm:author">Peter Monks</entry>
    <entry key="cm:publisher">Peter Monks</entry>
    <entry key="cm:contributor">Peter Monks</entry>
    <entry key="cm:type">Photograph</entry>
    <entry key="cm:identifier">IMG_1967.jpg</entry>
    <entry key="cm:dcsource">Canon Powershot G2</entry>
    <entry key="cm:coverage">Worldwide</entry>
    <entry key="cm:rights">Copyright (c) Peter Monks 2002, All Rights Reserved</entry>
    <entry key="cm:subject">A photo of a flower.</entry>
  </properties>
```

Additional notes on metadata loading:

-   You cannot create a new node based on metadata only, you must have a content file \(even if zero bytes\) for the metadata to be loaded. That said, you can "replace" an existing node in the repository with nothing but metadata. Despite the confusing name, this won't replace the content; it will simply be decorated with the new metadata.
-   The metadata must conform to the type and aspect definitions configured in Alfresco \(including mandatory fields, constraints, and data types\). Any violations will terminate the bulk import process.
-   Associations between content items loaded by the tool are not yet nicely supported. Associations to objects that are already in the repository can be created using the NodeRef of the target object as the value of the property.
-   Non-string data types \(including numeric and date types\) have not been exhaustively tested. Date values have been tested and do work when specified using ISO8601 format.
-   Updating the aspects or metadata on existing content will not remove any existing aspects not listed in the new metadata file; this tool is not intended to provide a full filesystem synchronisation mechanism.
-   The metadata loading facility can be used to decorate content that's already in the Alfresco repository, without having to upload that content again. To use this, create a "naked" metadata file in the same path as the target content file. The tool will match it up with the file in the repository and decorate that existing file with the new aspect\(s\) and/or metadata

## Version History files

The import tool also supports loading a version history for each file. To do this, create a file with the same name as the main file, but append it with a "v\#" extension. For example:

```
  IMG_1967.jpg.v1   <- version 1 content
  IMG_1967.jpg.v2   <- version 2 content
  IMG_1967.jpg      <- "head" (latest) revision of the content
```

This also applies to metadata files if you want to capture metadata history as well. For example:

```
  IMG_1967.jpg.metadata.properties.xml.v1   <- version 1 metadata
  IMG_1967.jpg.metadata.properties.xml.v2   <- version 2 metadata
  IMG_1967.jpg.metadata.properties.xml      <- "head" (latest) revision of the metadata
```

Additional notes on version history loading:

-   You cannot create a new node based on a version history only. You must have a head revision of the file.
-   Version numbers don't have to be contiguous. You can number your version files however you want, provided you use whole numbers \(integers\).
-   The version numbers in your version files will not be used in Alfresco. The version numbers in Alfresco will be contiguous, starting at 1.0 and increasing by 1.0 for every version \(so 1.0, 2.0, 3.0, etc. etc.\). Alfresco doesn't allow version labels to be set to arbitrary values, and currently the bulk import doesn't provide any way to specify whether a given version should have a major or minor increment.
-   Each version can contain a content update, a metadata updat,e or both - you are not limited to updating everything for every version. If not included in a version, the prior version's content or metadata will remain in place for the next version.

The following example shows all possible combinations of content, metadata, and version files:

```
  IMG_1967.jpg.v1                           <- version 1 content
  IMG_1967.jpg.metadata.properties.xml.v1   <- version 1 metadata
  IMG_1967.jpg.v2                           <- version 2 content
  IMG_1967.jpg.metadata.properties.xml.v2   <- version 2 metadata
  IMG_1967.jpg.v3                           <- version 3 content (content only version)
  IMG_1967.jpg.metadata.properties.xml.v4   <- version 4 metadata (metadata only version)
  IMG_1967.jpg.metadata.properties.xml      <- "head" (latest) revision of the metadata
  IMG_1967.jpg                              <- "head" (latest) revision of the content
```

**Parent topic:**[Using the Bulk Import tool](../concepts/Bulk-Import-Tool.md)

