---
author: [Alfresco Documentation, Alfresco Documentation]
source: 
audience: 
category: Development
option: Surf platform API
---

# ScriptModelObject

Model objects are returned from most of the query functions on `sitedata`. They are also bound to rendering contexts. A model object could be a component, a template, or any other object type.

By default, the following properties are available:

|`id`|The ID of the object.|
|`title`|The title of the object.|
|`titleId`|The title internationalization message ID of the object.|
|`description`|The description of the object.|
|`descriptionId`|The description internationalization message ID of the object.|
|`typeId`|The type ID of the underlying model object.|
|`properties`|An associative array \(map\) of all properties on the object.|
|`resources`|Returns a `ScriptResources` object.|

The following metadata properties are available:

|`timestamp`|The modification time of the object\(long\).|
|`persisterId`|The ID of the persister to which the object belongs.|
|`storagePath`|The path to the file within the persister.|

-   **[save](../references/APISurf-ScriptModelObject-save.md)**  
`save(boolean persist)` - these methods are used to persist the modified properties of an object.
-   **[remove](../references/APISurf-ScriptModelObject-remove.md)**  
`remove()` - this method removes the object.
-   **[delete](../references/APISurf-ScriptModelObject-delete.md)**  
`delete()` - this method deletes the object.
-   **[toXML](../references/APISurf-ScriptModelObject-toXML.md)**  
`toXML()` - this method returns the object as XML.
-   **[touch](../references/APISurf-ScriptModelObject-touch.md)**  
`touch()` - this method touches the object, setting the object's timestamp to the current time.
-   **[getBooleanProperty](../references/APISurf-ScriptModelObject-getBooleanProperty.md)**  
`getBooleanProperty(String propertyName)` - this method returns the value of the specified boolean property.
-   **[getProperty](../references/APISurf-ScriptModelObject-getProperty.md)**  
`getProperty(String propertyName)` - this method returns the value of the specified property.
-   **[setProperty](../references/APISurf-ScriptModelObject-setProperty.md)**  
`setProperty(String propertyName, String propertyValue)` - this method sets the value of the specified property.
-   **[removeProperty](../references/APISurf-ScriptModelObject-removeProperty.md)**  
`removeProperty(String propertyName)` - this method removes the specified property.
-   **[getModelObject](../references/APISurf-ScriptModelObject-getModelObject.md)**  
`getModelObject()` - this method returns a `ModelObject` object.
-   **[clone](../references/APISurf-ScriptModelObject-clone.md)**  
`clone()` - these methods create a clone of the model object.

**Parent topic:**[Return types](../references/APISurf-returntypes.md)

