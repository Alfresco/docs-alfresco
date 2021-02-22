---
author: [Alfresco Documentation, Alfresco Documentation]
source: 
audience: 
category: Development
option: Surf platform API
---

# templates

The following root-scope objects are available during the rendition of a template:

## `sitedata`

Always available.

## `context`

Always available.

## `instance`

Always available.

## `user`

Always available \('guest' if unauthenticated\).

## `content`

Available if content is being dispatched.

## `page`

The page model object.

## `theme`

The current theme ID.

## `htmlid`

The HTML ID.

## `url`

The URL information object.

## `head`

The string of all component headers \(<script\> and <link\> dependencies\).

Custom properties of the `Template` object can be accessed via the properties map. Given a custom property called `mycustomproperty`, it would be accessed like this:

```
${context.template.properties["mycustomproperty"]}
```

Custom properties of the `Page` object can be accessed like this:

```
${context.page.properties["mycustomproperty"]}
```

The following Surf directives are available to FreeMarker Templates:

```
<@region id="regionName" scope="(global, template or page)" protected=true/false/>
<@component componentId="(id of component)" chrome="(id of chrome)" chromeless=true/false/>
```

**Parent topic:**[Rendering objects](../references/APISurf-renderingobjects.md)

