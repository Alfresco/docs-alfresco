---
author: [Alfresco Documentation, Alfresco Documentation]
source: JavaScript API
audience: 
category: API
option: getFeedControls
---

# `getFeedControls`

`getFeedControls()` this method gets feed control objects for the current user.

## Returns

Returns an array of `FeedControl` objects.

## Example

The following code snippet would return a list of feed controls for the current user:

```

      model.feedControls = activities.getFeedControls();        
      
```

The following FreeMarker code could then be used to enumerate these objects:

```

  
    <#list feedControls as fc>  
      <p>${fc.siteId}</p>
      <p>${fc.appToolId}</p>
    </#list>
  

```

**Parent topic:**[Activities service](../references/API-JS-Activities.md)

