---
title: Metadata Extractors and Embedders Extension Point
---

Content Services performs metadata extraction on content automatically, however, you may wish to create 
custom metadata extractors to handle custom file properties and custom content models.

Architecture Information: [Platform Architecture]({% link content-services/7.2/develop/software-architecture.md %}#platformarch)

## Introduction
Every time a file is uploaded to the repository the file's MIME type is automatically detected. Based on the MIME type a 
related Metadata Extractor is invoked on the file. It will extract common properties from the file, such as author, 
and set the corresponding content model property accordingly. Each Metadata Extractor has a mapping between the 
properties it can extract and the content model properties. 

Metadata extraction is primarily based on the [Apache Tika](https://tika.apache.org/){:target="_blank"} library. This means 
that whatever [file formats](https://tika.apache.org/1.11/formats.html){:target="_blank"} Tika can extract metadata from, 
Content Services can also handle. To give you an idea of what file formats Content Services can extract metadata from, 
here is a list of the most common formats: 

* PDF
* MS Office
* Open Office
* MP3, MP4, QuickTime
* JPEG, TIFF, PNG
* DWG
* HTML
* XML
* Email

The properties that are extracted are limited to the out-of-the-box content model, which is very generic. Here are 
some example of extracted property name and what content model property it maps to:

* author -> `cm:author`
* title -> `cm:title`
* subject -> `cm:description`
* created -> `cm:created`
* description -> *NOT MAPPED* - you could map it in a custom configuration
* comments -> *NOT MAPPED* - you could map it in a custom configuration
* *If it is an image file:*
* EXIF metadata -> `exif:exif` (pixel dimensions, manufacturer, model, software, date-time etc.)
* Geo metadata -> `cm:geographic` (longitude & latitude)
* *If it is an audio file* -> `audio:audio` (album, artist, composer, engineer, genre etc.)
* *If it is an email file* -> `cm:emailed` (from, to, subject, sent date)

One thing to note though, even if an extractor can extract any of the system controlled properties, such as created date, 
it will not be used. Created date, creator, modified date, and modifier is always controlled by the Content Services 
system, unless you are using the Bulk Import tool, in which case last modified date can be preserved.

## Metadata extraction and Transform Engines
The extraction of metadata in the repository is performed in T-Engines (transform engines).
Prior to Content Services version 7, it was performed inside the repository. T-Engines provide improved scalability,
stability, security and flexibility. New extractors may be added without the need for
a new Content Services release or applying an AMP on top of the repository (i.e. `alfresco.war`).

The Content Services version 6 framework for creating metadata extractors that run as part of the repository
still exists, so existing AMPs that add extractors will still work as long as there is
not an extractor in a T-Engine that claims to do the same task. The framework is *deprecated* and could
well be removed in a future release.

This page describes how metadata extraction and embedding works, so that it is possible to add a
custom T-Engine to do other types. It also lists the various extractors that have been moved to T-Engines.

A framework for embedding metadata into a file was provided as part of the repository prior to Content Services version 7. 
This too still exists, but has been *deprecated*. Even though the content repository did not
provide any out of the box implementations, the embedding framework of metadata via T-Engines exists.

In the case of an extract, the T-Engine returns a JSON file that contains name value pairs. The names
are fully qualified QNames of properties on the source node. The values are the metadata values extracted
from the content. The transform defines the mapping of metadata values to properties. Once returned to
the repository, the properties are automatically set.

In the case of an embed, the T-Engine takes name value pairs from the transform options, maps them to
metadata values which are then updated in the supplied content. The content is then returned to the 
content repository and the node is updated. 

## Metadata extraction is just another transform
Metadata extractors and embedders are just a specialist form of transform. The `targetMediaType`
in the T-Engine `engine-config.json` is set to `"alfresco-metadata-extract"` or `"alfresco-metadata-embed"`
the following is a snippet from the 
[tika_engine_config.json](https://github.com/Alfresco/alfresco-transform-core/blob/master/alfresco-transform-tika/alfresco-transform-tika/src/main/resources/tika_engine_config.json){:target="_blank"}

```json
    {
      "transformerName": "TikaAudioMetadataExtractor",
      "supportedSourceAndTargetList": [
        {"sourceMediaType": "video/x-m4v",     "targetMediaType": "alfresco-metadata-extract"},
        {"sourceMediaType": "audio/x-oggflac", "targetMediaType": "alfresco-metadata-extract"},
        {"sourceMediaType": "application/mp4", "targetMediaType": "alfresco-metadata-extract"},
        {"sourceMediaType": "audio/vorbis",    "targetMediaType": "alfresco-metadata-extract"},
        {"sourceMediaType": "video/3gpp",      "targetMediaType": "alfresco-metadata-extract"},
        {"sourceMediaType": "audio/x-flac",    "targetMediaType": "alfresco-metadata-extract"},
        {"sourceMediaType": "video/3gpp2",     "targetMediaType": "alfresco-metadata-extract"},
        {"sourceMediaType": "video/quicktime", "targetMediaType": "alfresco-metadata-extract"},
        {"sourceMediaType": "audio/mp4",       "targetMediaType": "alfresco-metadata-extract"},
        {"sourceMediaType": "video/mp4",       "targetMediaType": "alfresco-metadata-extract"}
      ],
      "transformOptions": [
        "metadataOptions"
      ]
    },
```

If a T-Engine definition says it supports a metadata extract or embed, it will be used in preference
to any extractor or embedder using the deprecated frameworks in the content repository.

### Transform interface
Code that transforms a specific document type in a T-Engine generally implements the 
[Transformer](https://github.com/Alfresco/alfresco-transform-core/blob/master/alfresco-transformer-base/src/main/java/org/alfresco/transformer/executors/Transformer.java){:target="_blank"}
interface. In addition to the `transform` method, `extractMetadata` and `embedMetadata` methods
will be called depending on the target media type. The implementing class is called from the
[transformImpl](https://github.com/Alfresco/alfresco-transform-core/blob/master/alfresco-transformer-base/src/main/java/org/alfresco/transformer/TransformController.java){:target="_blank"}                 
method of the controller class.

```java
default void transform(String transformName, String sourceMimetype, String targetMimetype,
                       Map<String, String> transformOptions,
                       File sourceFile, File targetFile) throws Exception {
}

default void extractMetadata(String transformName, String sourceMimetype, String targetMimetype,
                             Map<String, String> transformOptions,
                             File sourceFile, File targetFile) throws Exception {
}

default void embedMetadata(String transformName, String sourceMimetype, String targetMimetype,
                           Map<String, String> transformOptions,
                           File sourceFile, File targetFile) throws Exception {
}
```

It is typical for the `extractMetadata` method to call another `extractMetadata` method on a sub class of
`AbstractMetadataExtractor` as this class provides the bulk of the functionality needed to configure metadata extraction
or embedding.

```java
    public void extractMetadata(String transformName, String sourceMimetype, String targetMimetype,
                                Map<String, String> transformOptions,
                                File sourceFile, File targetFile) throws Exception
    {
        AbstractMetadataExtractor extractor = ...
        extractor.extractMetadata(sourceMimetype, transformOptions, sourceFile, targetFile);
    }

    // Similar code for embedMetadata
```

### AbstractMetadataExtractor base class
The `AbstractMetadataExtractor` may be extended to perform metadata extract and embed tasks, by overriding two methods
in the sub classes:

```java
    public abstract Map<String, Serializable> extractMetadata(String sourceMimetype, Map<String, String> transformOptions,
                                                              File sourceFile) throws Exception;

    public void embedMetadata(String sourceMimetype, String targetMimetype, Map<String, String> transformOptions,
                              File sourceFile, File targetFile) throws Exception
    {
        // Default nothing, as embedding is not supported in most cases
    }
```

Method parameters:

* `sourceMimetype` mimetype of the source
* `transformOptions` transform options from the client
* `sourceFile` the source as a file

The `extractMetadata` should extract and return ALL available metadata from the `sourceFile`.
These values are then mapped into content repository property names and values, depending on what is defined in a 
`<classname>_metadata_extract.properties` file. Value may be discarded or a single value may even be used for multiple 
properties. The selected values are sent back to the repository as JSON as a mapping of fully qualified 
content model property names to values, where the values are applied to the source node.

### Metadata extraction configuration
The `AbstractMetadataExtractor` class reads the `<classname>_metadata_extract.properties` file, so that it knows how to
map metadata returned from the sub class `extractMetadata` method onto content model properties. The following is
an example for an email (file extension `.eml`):

```text
#
# RFC822MetadataExtractor - default mapping
#

# Namespaces
namespace.prefix.imap=http://www.alfresco.org/model/imap/1.0
namespace.prefix.cm=http://www.alfresco.org/model/content/1.0

# Mappings
messageFrom=imap:messageFrom, cm:originator
messageTo=imap:messageTo, cm:addressee
messageCc=imap:messageCc, cm:addressees
messageSubject=imap:messageSubject, cm:title, cm:description, cm:subjectline
messageSent=imap:dateSent, cm:sentdate
messageReceived=imap:dateReceived
Thread-Index=imap:threadIndex
Message-ID=imap:messageId
```

As can be seen, the email's metadata for `messageFrom` (if available) will be used to set two properties in the content
repository (if they exist): `imap:messageFrom`, `cm:originator`. The property names use namespace prefixes specified above.

### Property overwrite policy
It is possible to specify if properties in the repository will be set if the extracted values are not null or if
the properties already have a value. By default, `PRAGMATIC` is used. Generally you will not need to change this.
Other values (`CAUTIOUS`, `EAGER`, `PRUDENT`) are described in 
[OverwritePolicy](https://github.com/Alfresco/alfresco-community-repo/blob/master/repository/src/main/java/org/alfresco/repo/content/metadata/MetadataExtracter.java#L70-L318){:target="_blank"}.
To use a different policy add a `sys:overwritePolicy` value to the Map returned from
the `extractMetadata` method of the class extending `AbstractMetadataExtractor` (described above).

The following table shows which conditions must be met for overwriting the value:

![overwrite-policy]({% link content-services/images/overwrite-policy.png %})

### Aspect property policy
When a property is extracted, which is part of an aspect, it is possible to remove all other
properties in the same aspect that do not have an extracted value. In this way only extracted values will be set and
any previously set aspect properties will be cleared. By default, this does not take place and newly extracted values
are just added to the node's properties. To clear other aspect properties add `sys:carryAspectProperties`= `false` to
the Map returned from the `extractMetadata` method.

### Enable tagging
When an extracted property is taggable, it is possible to automatically extract tags from the value. By default, this is
disabled, but may be enabled by adding `sys:enableStringTagging`= `true` to the Map returned from the `extractMetadata` method.

Assuming `enableStringTagging` is `true`, it is also possible to change the default separators of the tags in the value.
The default separators are `,` `;` and `\|`. This is done by adding a `sys:stringTaggingSeparators` value to the Map
returned from the `extractMetadata` method. Please note that escaping of characters takes place in both Java and json,
so json response would look like `"sys:stringTaggingSeparators": ";,\",\",\\|"` if the code explicitly sets the default
separators.

### Overriding metadata extraction request in the repository
The request from the repository to extract metadata goes through `RenditionService2`, so will use the 
asynchronous Alfresco Transform Service if available and a synchronous Local transform if not.

Normally the only transform options are `timeout` and `sourceEncoding`, so the extractor code only has the source mimetype
and content itself to work on. Customisation of the property mapping should really be done in the T-Engine as described above.

However, it is currently possible for code running in the repository (i.e. `alfresco.war`) to override the default mapping 
of metadata to content model properties, with an `extractMapping` transform option. This approach is *deprecated* and may 
be removed in a future minor Content Services 7.x release. 

An AMP should supply a class that implements the `MetadataExtractorPropertyMappingOverride` interface and add it to the 
`metadataExtractorPropertyMappingOverrides` property of the `extractor.Asynchronous` spring bean.

```java
/**
 * Overrides the default metadata mappings for PDF documents:
 *
 * <pre>
 * author=cm:author
 * title=cm:title
 * subject=cm:description
 * created=cm:created
 * </pre>
 * with:
 * <pre>
 * author=cm:author
 * title=cm:title,cm:description
 * </pre>
 */
public class PdfMetadataExtractorOverride implements MetadataExtractorPropertyMappingOverride {
    @Override
    public boolean match(String sourceMimetype) {
        return MIMETYPE_PDF.equals(sourceMimetype);
    }

    @Override
    public Map<String, Set<String>> getExtractMapping(NodeRef nodeRef) {
        Map<String, Set<String>> mapping = new HashMap<>();
        mapping.put("author", Collections.singleton("{http://www.alfresco.org/model/content/1.0}author"));
        mapping.put("title",  Set.of("{http://www.alfresco.org/model/content/1.0}title",
                                     "{http://www.alfresco.org/model/content/1.0}description"));
        return mapping;
    }
}
```

Resulting in a request that contains the following transform options:

```json
{"extractMapping":{
   "author":["{http://www.alfresco.org/model/content/1.0}author"],
   "title":["{http://www.alfresco.org/model/content/1.0}title",
            "{http://www.alfresco.org/model/content/1.0}description"]},
 "timeout":20000,
 "sourceEncoding":"UTF-8"}
```

### Metadata extraction response
The transformed content that is returned to the repository is JSON and specifies what properties that should be updated 
on the source node. For example:

```json
{"{http://www.alfresco.org/model/content/1.0}description":"Making Bread",
 "{http://www.alfresco.org/model/content/1.0}title":"Making Bread",
 "{http://www.alfresco.org/model/content/1.0}author":"Fred"}
```

### Metadata embed request
An embed request simply contains a transform option called `metadata` that contains a map of property names to
values, resulting in transform options like the following:

```json
{"metadata":
 {"{http://www.alfresco.org/model/content/1.0}author":"Fred",
  "{http://www.alfresco.org/model/content/1.0}title":"Making Bread"
  "{http://www.alfresco.org/model/content/1.0}helpers":["Jane","Paul"]},
 "timeout":20000,
 "sourceEncoding":"UTF-8"}
```

Values are either a String, or a Collection of Strings. The mappings of these content repository
properties to metadata properties is normally the reverse of those defined in the
`<classname>_metadata_extract.properties` file in the T-Engine.

### Metadata embed response
This is simply the source content with the metadata embedded. The content repository updates
the content of the node with what is returned.

## Repository information
The repository still contains metadata extraction code.

### Framework
The Content Services version 6 framework for running metadata extractors and embedders still exists. An additional 
`AsynchronousExtractor` has been added to communicate with the `RenditionService2` from Content Services version 7. 
The `AsynchronousExtractor` handles the request and response in a generic way allowing all the content type specific 
code to be moved to a T-Engine.

### XML framework {#xmlextractors}
The following XML based extractors have NOT been removed from the content repository as custom extensions may be
using them. There are no out-of-the-box extractors that use them as part of the repository. Ideally any
custom extensions should be moved to a custom T-Engine using code based on these classes.

* [XmlMetadataExtracter](https://github.com/Alfresco/alfresco-community-repo/blob/master/repository/src/main/java/org/alfresco/repo/content/metadata/xml/XmlMetadataExtracter.java){:target="_blank"} 
* [XPathMetadataExtracter](https://github.com/Alfresco/alfresco-community-repo/blob/master/repository/src/main/java/org/alfresco/repo/content/metadata/xml/XPathMetadataExtracter.java){:target="_blank"}

## Metadata extractors that have be moved to T-Engines {#ootbextractors}
The following extractors, and their configuration (i.e. property mappings), exist now in T-Engines rather than in the 
repository (i.e. `alfresco.war`):

* [OfficeMetadataExtractor](https://github.com/Alfresco/alfresco-transform-core/blob/master/alfresco-transform-tika/alfresco-transform-tika/src/main/java/org/alfresco/transformer/metadataExtractors/OfficeMetadataExtractor.java){:target="_blank"} with [configuration](https://github.com/Alfresco/alfresco-transform-core/blob/master/alfresco-transform-tika/alfresco-transform-tika/src/main/resources/OfficeMetadataExtractor_metadata_extract.properties){:target="_blank"}
* [TikaAutoMetadataExtractor](https://github.com/Alfresco/alfresco-transform-core/blob/master/alfresco-transform-tika/alfresco-transform-tika/src/main/java/org/alfresco/transformer/metadataExtractors/TikaAutoMetadataExtractor.java){:target="_blank"} with [configuration](https://github.com/Alfresco/alfresco-transform-core/blob/master/alfresco-transform-tika/alfresco-transform-tika/src/main/resources/TikaAutoMetadataExtractor_metadata_extract.properties){:target="_blank"}
* [DWGMetadataExtractor](https://github.com/Alfresco/alfresco-transform-core/blob/master/alfresco-transform-tika/alfresco-transform-tika/src/main/java/org/alfresco/transformer/metadataExtractors/DWGMetadataExtractor.java){:target="_blank"} with [configuration](https://github.com/Alfresco/alfresco-transform-core/blob/master/alfresco-transform-tika/alfresco-transform-tika/src/main/resources/DWGMetadataExtractor_metadata_extract.properties){:target="_blank"}
* [OpenDocumentMetadataExtractor](https://github.com/Alfresco/alfresco-transform-core/blob/master/alfresco-transform-tika/alfresco-transform-tika/src/main/java/org/alfresco/transformer/metadataExtractors/OpenDocumentMetadataExtractor.java){:target="_blank"} with [configuration](https://github.com/Alfresco/alfresco-transform-core/blob/master/alfresco-transform-tika/alfresco-transform-tika/src/main/resources/OpenDocumentMetadataExtractor_metadata_extract.properties){:target="_blank"}
* [PdfBoxMetadataExtractor](https://github.com/Alfresco/alfresco-transform-core/blob/master/alfresco-transform-tika/alfresco-transform-tika/src/main/java/org/alfresco/transformer/metadataExtractors/PdfBoxMetadataExtractor.java){:target="_blank"} with [configuration](https://github.com/Alfresco/alfresco-transform-core/blob/master/alfresco-transform-tika/alfresco-transform-tika/src/main/resources/PdfBoxMetadataExtractor_metadata_extract.properties){:target="_blank"}
* [MailMetadataExtractor](https://github.com/Alfresco/alfresco-transform-core/blob/master/alfresco-transform-tika/alfresco-transform-tika/src/main/java/org/alfresco/transformer/metadataExtractors/MailMetadataExtractor.java){:target="_blank"} with [configuration](https://github.com/Alfresco/alfresco-transform-core/blob/master/alfresco-transform-tika/alfresco-transform-tika/src/main/resources/MailMetadataExtractor_metadata_extract.properties){:target="_blank"}
* [PoiMetadataExtractor](https://github.com/Alfresco/alfresco-transform-core/blob/master/alfresco-transform-tika/alfresco-transform-tika/src/main/java/org/alfresco/transformer/metadataExtractors/PoiMetadataExtractor.java){:target="_blank"} with [configuration](https://github.com/Alfresco/alfresco-transform-core/blob/master/alfresco-transform-tika/alfresco-transform-tika/src/main/resources/PoiMetadataExtractor_metadata_extract.properties){:target="_blank"}
* [TikaAudioMetadataExtractor](https://github.com/Alfresco/alfresco-transform-core/blob/master/alfresco-transform-tika/alfresco-transform-tika/src/main/java/org/alfresco/transformer/metadataExtractors/TikaAudioMetadataExtractor.java){:target="_blank"} with [configuration](https://github.com/Alfresco/alfresco-transform-core/blob/master/alfresco-transform-tika/alfresco-transform-tika/src/main/resources/TikaAudioMetadataExtractor_metadata_extract.properties){:target="_blank"}
* [MP3MetadataExtractor](https://github.com/Alfresco/alfresco-transform-core/blob/master/alfresco-transform-tika/alfresco-transform-tika/src/main/java/org/alfresco/transformer/metadataExtractors/MP3MetadataExtractor.java){:target="_blank"} with [configuration](https://github.com/Alfresco/alfresco-transform-core/blob/master/alfresco-transform-tika/alfresco-transform-tika/src/main/resources/MP3MetadataExtractor_metadata_extract.properties){:target="_blank"}
* [HtmlMetadataExtractor](https://github.com/Alfresco/alfresco-transform-core/blob/master/alfresco-transform-misc/alfresco-transform-misc/src/main/java/org/alfresco/transformer/metadataExtractors/HtmlMetadataExtractor.java){:target="_blank"} with [configuration](https://github.com/Alfresco/alfresco-transform-core/blob/master/alfresco-transform-misc/alfresco-transform-misc/src/main/resources/HtmlMetadataExtractor_metadata_extract.properties){:target="_blank"}
* [RFC822MetadataExtractor](https://github.com/Alfresco/alfresco-transform-core/blob/master/alfresco-transform-misc/alfresco-transform-misc/src/main/java/org/alfresco/transformer/metadataExtractors/RFC822MetadataExtractor.java){:target="_blank"} with [configuration](https://github.com/Alfresco/alfresco-transform-core/blob/master/alfresco-transform-misc/alfresco-transform-misc/src/main/resources/RFC822MetadataExtractor_metadata_extract.properties){:target="_blank"}

The `LibreOffice` extractor has also been moved to a T-Engine, even though Tika based extractors are now used for all
types it supported. This has been the case since ACS 6.0.1. It was moved into a T-Engine to simplify 
moving any custom code that may have extended it.

The `Tika` based classes for extractors using configuration files or spring context files have been removed from the 
repository as the preferred way to create extractors is via a T-Engine and these approaches require in process
extensions.

## Changing default property mappings for PDF metadata extraction
A common requirement is to be able to change the mapping of out-of-the-box properties, such as having the `subject` 
property mapped to `cm:title` instead of `cm:description` for a PDF file. This is quite easy to achieve, just override 
the out-of-the-box JSON configuration and re-configure the mapping. The out-of-the-box definitions for Metadata Extractors 
can be found in the places described in the [above section](#ootbextractors).

To change the `subject` property so it is mapped to content model property `cm:title` for PDF files re-define the 
`PdfBoxMetadataExtractor_metadata_extract.properties` configuration as follows:

```text
#
# PdfBoxMetadataExtracter - custom mapping
#

# Namespaces
namespace.prefix.cm=http://www.alfresco.org/model/content/1.0

# Mappings
author=cm:author
title=cm:title
subject=cm:title
```

Note that all the namespaces that the content model properties belong to have to be specified 
as in the above example with `namespace.prefix.cm`. It is also very important to know that the property names are 
case sensitive. 

## Metadata extraction debug logging
Sometimes it can be useful to know what metadata extractor that is actually used when you upload a 
document. Turning on Metadata Extraction logging is a good idea to get on top of what is happening. 
Set the following property in `log4j.properties`:

```text
log4j.logger.org.alfresco.repo.content.metadata=DEBUG
```


What about the properties? It is likely that you will struggle to figure out what properties are extracted and their names. 
You can have this logged with the following log file configuration:

```text
log4j.logger.org.alfresco.repo.content.metadata.AbstractMappingMetadataExtracter=DEBUG
```

This log configuration is set to some other log level out-of-the-box so you need to specifically re-configure it to be 
able to see something. Now when running you will also see the extracted doc properties.

## Using custom content models in property mappings for PDF metadata extraction
Next requirement is most likely to map properties to custom content models. There is an ACME content model tutorial 
where the base document type has an `acme:documentId` property. You might want to add a document identifier to the PDFs 
you are uploading and have it automatically set in the ACME content model. Start by updating the the 
`PdfBoxMetadataExtractor_metadata_extract.properties` configuration as follows:
 
```text
#
# PdfBoxMetadataExtracter - custom mapping
#

# Namespaces
namespace.prefix.cm=http://www.alfresco.org/model/content/1.0
namespace.prefix.acme=http://www.acme.org/model/content/1.0

# Mappings
author=cm:author
title=cm:title
DocumentId=acme:documentId
```

Here the custom document property `DocumentId` has been added so it is mapped to the ACME content model property 
`acme:documentId`. When doing this you also need to define the new custom namespace `acme`. For this to work you need 
to have a rule on the folder that applies the `acme:document` type to any PDF document uploaded to the folder. This 
type has the `acme:docuementId` property.

## Changing default property mappings for XML metadata extraction
Now, what if you would like to extract metadata from an XML file, how would you go about that? This can be achieved with 
the `XmlMetadataExtracter`, which in-turn uses the `XPathMetadataExtracter` to navigate the XML and extract metadata. 
These extractors are still in the repository, see this [section](#xmlextractors).

Let's say we had XML files looking like this:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<doc id="doc001">
    <project>
        <number>PX001</number>
    </project>
    <securityClassification>Company Confidential</securityClassification>
    <text>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent tincidunt luctus ante, in pulvinar ante rutrum
        quis. Etiam maximus arcu ut metus sollicitudin laoreet. Pellentesque ac purus nec massa euismod iaculis a sed
        sapien. Integer id nisi eu tellus commodo congue. In bibendum dapibus porttitor. Aenean lobortis sodales risus
         ....
    </text>
</doc>
```

And whenever we upload one we want to have the `/doc/@id` attribute set as `acme:documentId`, `/doc/project/number` 
set as `acme:projectNumber`, and `/doc/securityClassification` set as `acme:securityClassification`. This will require 
configuration like this, note these are new bean definitions, no overrides:

```xml
<bean id="org.alfresco.tutorial.metadataextracter.xml.AcmeDocXPathMetadataExtracter"
    class="org.alfresco.repo.content.metadata.xml.XPathMetadataExtracter"
    parent="baseMetadataExtracter"
    init-method="init">
  <property name="mappingProperties">
      <bean class="org.springframework.beans.factory.config.PropertiesFactoryBean">
          <property name="location">
              <value>
                  classpath:alfresco/module/${project.artifactId}/metadataextraction/acme-content-model-mappings.properties
              </value>
          </property>
      </bean>
  </property>
  <property name="xpathMappingProperties">
      <bean class="org.springframework.beans.factory.config.PropertiesFactoryBean">
          <property name="location">
              <value>
                  classpath:alfresco/module/${project.artifactId}/metadataextraction/acme-xml-doc-xpath-mappings.properties
              </value>
          </property>
      </bean>
  </property>
</bean>

<bean id="org.alfresco.tutorial.metadataextracter.xml.selector.AcmeDocXPathSelector"
    class="org.alfresco.repo.content.selector.XPathContentWorkerSelector"
    init-method="init">
  <property name="workers">
      <map>
          <entry key="/*">
              <ref bean="org.alfresco.tutorial.metadataextracter.xml.AcmeDocXPathMetadataExtracter"/>
          </entry>
      </map>
  </property>
</bean>

<bean id="org.alfresco.tutorial.metadataextracter.xml.AcmeDocXMLMetadataExtracter"
      class="org.alfresco.repo.content.metadata.xml.XmlMetadataExtracter"
      parent="baseMetadataExtracter">
  <property name="overwritePolicy">
      <value>EAGER</value> <!-- Put the extracted metadata into the content model property as long as it is not null -->
  </property>
  <property name="selectors">
      <list>
          <ref bean="org.alfresco.tutorial.metadataextracter.xml.selector.AcmeDocXPathSelector"/>
      </list>
  </property>
</bean>
```

The `acme-content-model-mappings.properties` file contains mappings from the extracted XML doc properties to the 
content model properties:

```text
# Namespaces
namespace.prefix.acme=http://www.acme.org/model/content/1.0

# Mappings - metadata property -> content model property
documentId=acme:documentId
securityClassification=acme:securityClassification
projectNumber=acme:projectNumber
```

The property mapping can always be done in .properties files if we like, and we could have used a .properties file for 
the `PDFBoxMetadataExtracter` too. The other properties file called` acme-xml-doc-xpath-mappings.properties` contains the 
XPath expression configuration for where to find the metadata in the XML file:

```text
# XPath Mappings - metadata property -> XML Document XPATH
documentId=/doc/@id
securityClassification=/doc/securityClassification
projectNumber=/doc/project/number
```

## Metadata extractor limits
Metadata extraction limits allows configurations on `AbstractMappingMetadataExtracter` for:

* control of the maximum time allowed for an extraction
* control of the maximum size (MB) of any single document that the extractor will handle
* control of the maximum number of all the documents being processed at any point in time

The default values for each of these properties are `MAX` value specified in the java code. These limits are configured 
per extractor and mimetype.

The limits configured for Content Services are:

```text
Time out configured for all extractor and all mimetypes
content.metadataExtracter.default.timeoutMs=20000

Maximum size of a document to process - configured for PdfBoxMetadataExtracter , pdf files
content.metadataExtracter.pdf.maxDocumentSizeMB=10

Maximum number of concurrent extractions - configured for PdfBoxMetadataExtracter , pdf files
content.metadataExtracter.pdf.maxConcurrentExtractionsCount=5
```

## Deployment
For XML metadata extraction you will still use the [SDK]({% link content-services/7.2/develop/sdk.md %}) and a 
JAR project applied to the Repository (i.e. `alfresco.war`).
 
To change the configuration for the majority of the metadata extractors you will have to generate a new 
Transform Core AIO Docker image with the new configuration. Another option would be to 
[create a new separate T-Engine](https://github.com/Alfresco/acs-packaging/blob/master/docs/creating-a-t-engine.md){:target="_blank"} 
that has a higher priority (lower number) for this metadata extraction. That way you can still use the standard T-Engine 
and the new one from for this one special case. 


