---
author: [Alfresco Documentation, Alfresco Documentation]
source: JavaScript API
audience: 
category: [API/Script, JavaScript, Services]
option: [save, Site object, Services]
---

# `save`

`save\(\)` saves any outstanding updates to the site detail. Those changes will be lost if properties of the site change and the save method is not called.

## Example

```

      var site = siteService.getSite("simple-site");
      
      if(site){
      
        var oldDescription = site.description;
        site.description = "A new description";
        site.save();
        
        model.oldDescription = oldDescription;
        model.newDescription = site.description;
      }
      
```

**Parent topic:**[Site object](../references/API-JS-Site.md)

