---
author: Alfresco Documentation
---

# Customizing Share targeting existing files

You can customize existing files through templates or web scripts. This allows you to extend FreeMarker templates, JavaScript Controllers, and i18n properties,

This enables you to:

-   Modify Surf templates to add, remove, and modify Component bindings
-   Change display labels
-   Modify the content displayed by updating the model

**Parent topic:**[Share Extensibility](../concepts/Share-Extensibility-Intro.md)

## FreeMarker extensions

For FreeMarker extensions, this means:

-   Existing <@region\> directive updated
-   No need to change existing Share template instances
-   Can remove, replace existing regions, or add new regions
-   New <@markup\> directive updated
-   Existing web scripts templates will require updates
-   HTML can be removed, replaced, or added
-   Scope for future directives

### Advantages over Region Extension

-   Regions do not become volatile:
-   IDs do not change
-   One extension cannot remove a region required by another
-   Increased control over output through fine grained multiple evaluations
-   Ability to customize existing component content via properties overrides

## JavaScript controllers

For JavaScript controllers, this means:

-   JavaScript controllers \(server side\) update a model used by the template
-   Extension controllers can change the default model to alter how the template is rendered

## i18n properties

When you create a “customization”, you are creating a mapping from a package that you want to update to a package that you are providing. When any file is processed in that package, all mapped extension module packages are searched for a matching file name. Typically, a web script might be represented by a JavaScript controller, an i18n properties file, and a FreeMarker template. They must all be defined in the same package with a similar file name prefix as the web script descriptor file to which they are related. This package mapping allows you to target multiple files in a single customization rather than specifying every file individually. It also allows you to broaden our target. For example, you could have targeted “org.alfresco” – but it is important to note that the remainder of the package will be applied to the source \(so the extensibility framework would be looking for a matching file in the “**blog.demo.customization.components.title**” package\).

When you provide an i18n properties file extension, the properties in the extension file are merged into the “base” file \(any duplicates are replaced with those from the extension file\). If multiple modules extend the same properties file, the last module in the deployment list will “win”.

It is not necessary to provide an extension file for every base in the web script – only those that you wish to extend. For example – if a web script has controller, properties, and template files, you don’t need to provide extensions to all three if you just want to override some i18n properties.

It’s also possible to provide an extension file to a web script that does not have that base file. For example, it is entirely possible to extend a web script with a JavaScript controller or i18n properties file, even if those files are not in the base.

