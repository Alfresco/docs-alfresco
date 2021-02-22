---
author: Alfresco Documentation
---

# Transformation service

The Transformation service lets you convert content between different file formats, such as generating PDF files from Microsoft Office formats and converting between image formats. This service is extensible to allow the use of additional transformers.

Changes were made to Alfresco 3.4.8 and 4.0.1 to allow an AMP \(or a properties file\) to set the initial 'average transform times' for the standard transformers, rather than having to override them in order to ensure they are not called.

If an AMP that includes a new transformer provides the following Alfresco global properties, this will cause the new transformer to be given priority over the OpenOffice and JOD transformers. If a new transformer returns false from its `isTransformable` method when their transformer is not available, transformations will fall back to the OpenOffice and JOD transformers.

```

        transformer.OpenOffice=3600000
        transformer.complex.OpenOffice.Image.time=3600000
        transformer.complex.OpenOffice.Pdf2swf.time=3600000
        transformer.complex.OpenOffice.PdfBox.time=3600000
        
        transformer.JodConverter.time=3600000
        transformer.complex.JodConverter.Image.time=3600000
        transformer.complex.JodConverter.Pdf2swf.time=3600000
        transformer.complex.JodConverter.PdfBox.time=3600000
 
```

If an initial 'XXX.time' global property is supplied for a transformer, the number of transformations performed may also be supplied with a '.count' value. The default being 10,000. This avoids the average time reducing too fast if transformations are requested \(because the new transformer is not available\). A higher number ensures it reduces at a slower rate. For example, 1,000,000:

```

        transformer.OpenOffice.count=1000000
        transformer.complex.OpenOffice.Image.count=1000000
        transformer.complex.OpenOffice.Pdf2swf.count=1000000
        transformer.complex.OpenOffice.PdfBox.count=1000000
        
        transformer.JodConverter.count=1000000
        transformer.complex.JodConverter.Image.count=1000000
        transformer.complex.JodConverter.Pdf2swf.count=1000000
        transformer.complex.JodConverter.PdfBox.count=1000000
 
```

**Parent topic:**[Content services](../concepts/serv-content-about.md)

