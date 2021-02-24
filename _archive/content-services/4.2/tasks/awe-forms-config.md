---
author: Alfresco Documentation
---

# Configuring Web Editor forms

The Alfresco Web Editor \(AWE\) uses a form to edit the node referenced by a `markContent` tag. By default, the form displayed will contain the `cm:title`, `cm:description`, and `cm:content` fields. An alternative form can be used by providing the `markContent` tag with a `formId` attribute.

Out of the box, only two other forms are configured: a form with an identifier of `title`, and one with an identifier of `description`. As the identifiers indicate, the forms display a single property: `cm:title` and `cm:description`, respectively. The node type is presumed to be `cm:content`.

If you have custom types or wish to specify other properties, you can use the forms configuration techniques.

When starting up, the AWE looks for a configuration file on the classpath named shared/classes/alfresco/web-extension/awe-config-custom.xml. Place any custom form definitions in this file.

**Parent topic:**[Configuring Alfresco Web Editor](../concepts/awe-config.md)

