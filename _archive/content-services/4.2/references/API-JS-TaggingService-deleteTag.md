---
author: Alfresco Documentation
---

# `deleteTag`

`deleteTag(store, tag)` deletes the specified tag.

## Parameters

-   **store**

    A store reference string designating the store in which the tag is located.

-   **tag**

    A string designating the tag to delete.


## Returns

void

## Example

```

    if(taggingService.getTag("workspace://SpacesStore", "cloud")){

        taggingService.deleteTag("workspace://SpacesStore", "cloud");
        model.message1 = "Tag successfully deleted!";

    }
    else {
        model.message1 = "Tag does not exist!";
    }

    // ensure deleted

    if(taggingService.getTag("workspace://SpacesStore", "cloud")){
        model.message2 = "Tag found!";
    }
    else {
        model.message2 = "Tag does not exist!";
    }
        
      
```

The preceding code snippet would result in the following messages if the tag was found and deleted:

```

Message1: Tag successfully deleted!

Message2: Tag does not exist!        
        
```

CAUTION:

Using `deleteTag` can leave behind invalid tag scopes, containing non-existent tags. In order to refresh tag scopes correctly it is necessary to do this manually. This can be done through a simple script that can be run in the JavaScript console or via a stand-alone web script. The code for the script is as follows:

```

        
var refresh = actions.create("refresh-tagscope");
refresh.execute(companyhome.childByNamePath("Sites/<site-name>"));
refresh.execute(companyhome.childByNamePath("Sites/<site-name>/documentLibrary"));        
        
      
```

Replace `site-name` with a valid site name for your installation.

**Parent topic:**[Tagging service](../references/API-JS-TaggingService.md)

