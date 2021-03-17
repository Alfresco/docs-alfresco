---
author: [Alfresco Documentation, Alfresco Documentation]
audience: 
category: Alfresco Share
option: [extending, Share, Document library, EXIF renderer source code]
---

# EXIF renderer source code

The EXIF renderer source code is as follows.  

```
/*************************************************************************************                                  EXIF
                                           EXTENSION                                         
*************************************************************************************/
(function()
{
   /**
    * Alfresco Slingshot aliases
    */
   var $html = Alfresco.util.encodeHTML,
      $isValueSet = Alfresco.util.isValueSet;

   if (Alfresco.DocumentList)
   {     
        YAHOO.Bubbling.fire("registerRenderer",
        {
           propertyName: "exposure",
           renderer: function exif_renderer(record, label)
           {
              var jsNode = record.jsNode,              
                 properties = jsNode.properties,
                 html = "";
                 
              var expTime = properties["exif:exposureTime"] || 0,
                 exifObj =              
                 {                 
                     exposureFraction: expTime > 0 ? "1/" + Math.ceil(1/expTime) : expTime,                 
                     fNumber: properties["exif:fNumber"] || 0,                 
                     isoSpeedRatings: properties["exif:isoSpeedRatings"] || 0              
                 };
                 
              html = '<span class="item">' + label + '<b>' +
YAHOO.lang.substitute(this.msg("exif.metadata.exposure"), exifObj) + '</b></span>';
              
              return html;
          }
      });
   }
})();
```

**Parent topic:**[Reference](../concepts/doclib-reference.md)

