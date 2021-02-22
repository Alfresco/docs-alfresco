---
author: Alfresco Documentation
---

# Localizing Pages

Use this information to localize pages.

## Introduction

You can provide i18n properties files with the same prefix that can then be accessed in the JavaScript controller by calling:

```
msg.get("<key>")
```

It is also possible to achieve this by calling from the FreeMarker template:

```
${msg(“<key>”)}
```

Traditionally, Share would pass all of the messages from a web script into the widgets that it instantiated by calling its `.setMessages()` function.

There are global properties files that can be used throughout Share. These are common.properties and slingshot.properties that can be found in /share/WEB-INF/classes/alfresco/messages.

The contents of all of these files will be active on the page by using the JavaScript global variable `Alfresco.messages`. This is a map with the attributes, `global` and `scope`:

-   `global` contains all the messages from the global properties files
-   `scope` is a map of widget name to messages map

The `.setMessages()` function of Share widgets adds its own name as a key into the scope map and assigns all the supplied messages as an object against that key. For example, if the `Alfresco.DocumentList` widget is instantiated then `Alfresco.messages.scope['Alfresco.DocumentList']` can be used to access its messages.

## Changes for the updated UI framework

The updated development approach in 4.2 and above is consistent with the pattern found in previous versions of Alfresco Content Services, and have intentionally not followed the standard Dojo pattern. The latest approach uses the same `Alfresco.messages` object \(although this can be reconfigured if you want to use a different root variable\) and still sets the `global` and `scope` attributes.

If you create a widget with an `i18nScope` attribute then this is the scope into which the widget's encapsulated messages will be added. If no `i18nScope` attribute is defined then the messages will go into a scope called `default` \(unless the widget extends another widget in which case it will inherit the parent's `i18nScope` attribute\).

The i18n properties from the web script that processes the JSON model will automatically be placed into a new attribute of `Alfresco.messages` called `page`.

Whenever the `.message()` function is called from `Alfresco/core/Core` all applicable scopes are searched and the most specific result will be applied. These scopes are listed here:

-   Global
-   Page
-   Default scope
-   All inherited scopes
-   Widget scopes

When creating a custom widget there is a distinction to be drawn between:

-   Labels that never change
-   Variable labels that can be selected from
-   Custom labels

For example, the label for a menu item cannot realistically be included as part of the widget, but an error message could be. When accepting configurable labels they should be passed through the `.message()` function in case a message key \(rather than a localized message\) has been provided, as if no match is found then the value supplied to the method is returned.

This means that when constructing the JSON model for a page you could provide:

```
config: {
   label: "message.key"
}
```

or

```
config: {
   label: msg.get("message.key")
}
```

At first glance these might appear identical, but if the widget defines a message with the key `message.key` then this will override any message that the web script might be able to resolve.

## Language Variations

As the widgets process locale-specific properties files in exactly the same way as web scripts, it is possible to reference a web script's properties file in the `i18nRequirements` attribute of a widget.

## Summary

You have learned how i18n properties are handled in the updated UI framework approach to page and widget construction. It follows the Alfresco Content Services approach rather than having adopted the standard Dojo approach. This has been done to achieve consistency with previous versions of Alfresco Content Services.

**Parent topic:**[Pages](../concepts/dev-extensions-share-tutorials-pages.md)

