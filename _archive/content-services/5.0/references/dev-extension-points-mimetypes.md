# MIME Types

Alfresco supports, and can detect, a wide range of MIME types out-of-the-box. It is also possible to add support for other custom MIME types.

|Information|MIME Types|
|-----------|----------|
|Support Status|[Full Support](http://docs.alfresco.com/support/concepts/su-product-lifecycle.html)|
|Architecture Information|[Platform Architecture](../concepts/dev-platform-arch.md)|
|Description|Alfresco is able to automatically identify most file types and establish MIME type accordingly. However, if you have custom file types it is possible to add support for these by adding custom MIME types. You will typically also need to provide custom [content transformations](dev-extension-points-content-transformer.md), and [metadata extraction](dev-extension-points-custom-metadata-extractor.md) to fully support the content type.To find out what MIME types that are currently registered and active within an Alfresco installation, you can use an admin Web Script. This is available at [http://localhost:8080/alfresco/service/mimetypes](http://localhost:8080/alfresco/service/mimetypes). This will list all the currently registered MIME types, and provide a details link for each one. Selecting the details link will then show metadata extractors, and which transformations are currently supported both to and from that MIME type, and by what transformer.

For example, you will see something like this for the ZIP MIME type:

 ```
**application/zip - zip**
   **Extractors**: org.alfresco.repo.content.metadata.TikaAutoMetadataExtracter
   **Transformable To:**
      application/xhtml+xml = org.alfresco.repo.content.transform.ArchiveContentTransformer
      text/html = org.alfresco.repo.content.transform.ArchiveContentTransformer
      text/plain = org.alfresco.repo.content.transform.ArchiveContentTransformer
      text/xml = org.alfresco.repo.content.transform.ArchiveContentTransformer
   **Transformable From:**
      *Cannot be generated from anything else*
```

 So it is quite easy to find out if a MIME type is known to the Alfresco system, if there are any metadata extractors for it, to what formats it can be transformed, and from what formats it can be generated.

 Lets say you wanted to add a transformer that can transform XML documents to PDF files based on XSL-FO \(XSL formatting objects\). Alfresco does not currently know about formatting object files \(.fo\) so we would need to add a new MIME type for this. To do this create an XML file with the following content:

 ```
<alfresco-config area="mimetype-map">
  <config evaluator="string-compare" condition="Mimetype Map">
    <mimetypes>
      <mimetype mimetype="text/xsl" display="XSL-FO">
        <extension>fo</extension>
      </mimetype>
    </mimetypes>
  </config>
</alfresco-config>
```

 Call the file custom-mimetype-map.xml and put it in tomcat/shared/classes/alfresco/extension/mimetype. If we access the mimetype Web Script we should see the following for the newly registered MIME type:

 ```
**text/xsl - fo**
   **No extractors**
   **Transformable To**:text/plain = org.alfresco.repo.content.transform.StringExtractingContentTransformer
   **Transformable From**: Cannot be generated from anything else
```

 The .fo files themselves will by default be transformable to text, which means that they will be indexed and searchable without having to add a custom transformer. But to actually use the formatting objects to transform XML files into PDF files you would have to add a [custom transformer](dev-extension-points-content-transformer.md). Out of the box it will use the following transformer:

 ```
**text/xml - xml**
   **Extractors**: org.alfresco.repo.content.metadata.TikaAutoMetadataExtracter
   **Transformable To**:
      application/eps = Complex via: application/pdf
      application/pdf = org.alfresco.repo.content.transform.TextToPdfContentTransformer
      . . .
```

|
|Deployment - App Server|-   tomcat/shared/classes/alfresco/extension/mimetype - add a custom-mimetype-map.xml file with the new MIME type definitions

|
|[Deployment - SDK Project](../tasks/alfresco-sdk-tutorials-amp-archetype.md)|-   repo-amp/src/main/amp/config/alfresco/module/repo-amp/mimetype-map-custom.xml - MIME Type definitions \(note. the file name has to be this\)

|
|More Information| |
|Sample Code|-   [Sample configuration for adding a MIME type](https://github.com/Alfresco/alfresco-sdk-samples/tree/alfresco-50/all-in-one/custom-mimetype-map-repo)

|
|Tutorials|-   [Adding a custom MIME type](../tasks/mimetype-add.md)

|
|Alfresco Developer Blogs|None|

