---
author: [Alfresco Documentation, Alfresco Documentation]
source: 
audience: 
category: Development
option: Surf platform API
---

# context

Each unit of work within the rendering pipeline is provided with a context object. This render context object is local to the currently rendering object instance but wraps the context of the original request to the page. The wrapped request context object is manufactured at the top of the request chain and is then made available to all templates, regions, components, chromes, and anything else downstream.

This object provides a single point of reference for information about the user, the current rendering page, template, and other context. It provides this information so that individual rendering pieces do not need to calculate it themselves.

The request `context` object provides the following properties.

|`contentId`|The ID of the content being rendered. Available if the dispatcher is rendering a page for a given content object ID.|
|`content`|The content being rendered. Available if the dispatcher is rendering a page for a given content object ID. For example: ```
var pageTitle = context.page.title;
var userFullName = context.user.fullName;
var contentTitle = context.content.properties["title"];
var customValue = context.properties["customValue"];

```

|
|`resource`|Returns the content resource currently being rendered.|
|`id`|The internally managed ID for the current request Each request has a unique ID available to it that is guaranteed unique for each request. It is generally only used for debugging purposes.|
|`pageId`|The ID of the page being rendered.|
|`page`|The page object being rendered.|
|`templateId`|The ID of the template being rendered.

|
|`template`|The template object being rendered.|
|`user`|The current user.|
|`themeId`|The current theme ID.|
|`theme`|The current theme object.

|
|`formatId`|The format ID for the current request.|
|`properties`|Associative array of all context values.|
|`authenticated`|Returns true if there is a non-guest current user.|
|`externalAuthentication`|Returns true if external authentication, such as NTLM, is being used to manage the user.|
|`siteConfiguration`|Returns the site configuration as a `ScriptModelObject`.|
|`linkBuilder`|Returns the `ScriptLinkBuilder` instance for the current request.|
|`websiteTitle`|Returns the website title.|
|`uri`|Returns the URI.|
|`rootPage`|Returns the root page for the site.|
|`previewWebappId`|Returns the web app ID.|
|`previewStoreId`|Returns store ID.|
|`previewUserId`|Returns user ID.|
|`frameworkTitle`|Returns the framework title.|
|`frameworkVersion`|Returns the framework version.|
|`parameters`|Returns a key-value map of parameters in the incoming request.|
|`attributes`|Returns attributes.|
|`headers`|Returns headers.|
|`properties`|The object properties. Includes: sub-component, \_alf\_request\_cache HASH surfBugEnabled false chromeless no component-chrome HASH webTemplateRendererScriptResults HASH region-scope-id page region-id component-2-1 tagLibRenderType tagLibSubComponentRendering htmlid page\_x002e\_component-2-1\_x002e\_user\_x007e\_admin\_x007e\_dashboard\_x0023\_default component HASH currentRenderer org.springframework.extensions.surf.render.bean.ChromeRenderer component-id page.component-2-1.user~admin~dashboard region-source-id user/admin/dashboard editionInfo HASH|

**Parent topic:**[Root-scoped objects](../references/APISurf-rootscoped.md)

