---
author: [Alfresco Documentation, Alfresco Documentation]
source: 
audience: 
category: Development
option: Surf platform API
---

# Model objects

Model objects are returned from most of the query functions on `sitedata`. They are also bound to rendering contexts. A model object could be a component, a template, or any other object type.

By default, the following properties are available:

|`id`|The ID of the object.|
|`title`|The title of the object.|
|`titleId`|The title internationalization message ID of the object.|
|`description`|The description of the object.|
|`descriptionId`|The description internationalization message ID of the object.|
|`typeId`|The type ID of the underlying model object.|
|`properties`|An associative array \(map\) of all properties on the object.|

The following metadata properties are available:

|`timestamp`|The modification time of the object\(long\).|
|`persisterId`|The ID of the persister to which the object belongs.|
|`storagePath`|The path to the file within the persister.|

The following persistence methods are available:

## `save()`

Persists the model object to the store.

## `reload()`

Reloads the model object from the store.

## `remove()`

Removes the model object from the store.

The following methods are also available:

## `toXML()`

Generates a human readable XML serialization of the object.

## `touch()`

Touches the model file, updating its modification timestamp.

## `getProperty(key)`

Returns the property directly from the model object.

## `getBooleanProperty(key)`

Returns a boolean value for a property directly from the model.

## `setProperty(key, value)`

Sets a property directly onto the model object.

## `removeProperty(key)`

Removes a property from the model object.

**Parent topic:**[Return types](../references/APISurf-returntypes.md)

