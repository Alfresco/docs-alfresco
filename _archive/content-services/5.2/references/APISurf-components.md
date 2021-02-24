---
author: Alfresco Documentation
---

# components

The `components` rendering object contains root-scoped objects that are available during the rendition of a component.

## `sitedata`

Always available.

## `context`

Always available.

## `instance`

Always available.

## `user`

Always available \(‘guest’ if unauthenticated\).

## `content`

Available if content is being dispatched.

## `page`

Page model object.

## `template`

Available if a parent template is present.

## `config`

Component level XML configuration.

## `app`

Web application access.

## `theme`

The current theme ID.

## `htmlid`

The HTML ID.

## `url`

URL information object.

Custom properties of the currently rendering component can be accessed by using the properties map. Given a custom property called `mycustomproperty`, it would be accessed like this:

```
${instance.properties["mycustomproperty"]}
```

**Parent topic:**[Rendering objects](../references/APISurf-renderingobjects.md)

