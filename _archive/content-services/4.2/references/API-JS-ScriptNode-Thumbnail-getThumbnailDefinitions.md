---
author: Alfresco Documentation
---

# `getThumbnailDefinitions`

`getThumbnailDefinitions()` this method returns the names of the thumbnail definitions that can be applied to the content property of this node.

Thumbnail definitions only appear in this list if they can produce a thumbnail for the content found in the content property. This is determined by looking at the MIME type of the content and the destination MIME type of the thumbnail.

## Returns

Returns an array of thumbnail names that are valid for the current content type.

**Parent topic:**[Thumbnail API](../references/API-JS-Thumbnail.md)

