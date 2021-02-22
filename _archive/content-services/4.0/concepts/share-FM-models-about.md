---
author: Alfresco Documentation
---

# About FreeMarker extensibility directives

Extensibility directives provide a way of dynamically editing HTML through configuration.

Spring Surf has been enhanced so that instead of writing templates directly to the output stream, it writes to an in-memory model and then allow extensions to manipulate that model before the model is flushed to the output stream. The mechanism for updating the model is through the use of new and updated FreeMarker template directives.

Wherever an extensibility directive is used in a base template, it can be manipulated by a corresponding extension file. The currently supported actions include:

-   `remove` - completely removes the directive contents from the model.

-   `replace` - replaces the directive contents in the model.

-   `before` - place contents immediately before the target directive contents.

-   `after` - place new directive contents immediately after the target directive contents.


Alfresco provides two directives that support extensibility: `<@region>` and `<@markup>`.

The `<@region>` directive was used extensively in previous versions of Alfresco Share to define the Regions into which Components are bound. This implementation has been updated to work with the extensibility model. The `<@markup>` directive is new and is used to demarcate sections of HTML in a template.

In the first two tutorials, you learned how to add and remove content from Alfresco Share by modifying the Components \(and their Sub-Components\). This approach relies on there being a Component available that will be bound to a Region in the template.

Using this alternative mechanism makes it possible to add new regions and also completely remove regions to prevent Components from being bound. This is significantly different because it is a much more volatile approach but could be useful in certain circumstances. If you want to remove some content and prevent another module from either restoring or adding to it, you can remove it entirely from the model so that it cannot be changed using this approach.

**Parent topic:**[6. Customize Alfresco Share FreeMarker templates](../tasks/tu-share-FM-temp-customize.md)

