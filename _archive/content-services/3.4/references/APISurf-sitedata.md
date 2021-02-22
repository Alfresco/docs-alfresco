---
author: [Alfresco Documentation, Alfresco Documentation]
source: 
audience: 
category: Development
option: Surf platform API
---

# sitedata

The `sitedata` object provides the following properties. The property types include:

-   Framework properties
-   Properties that provide arrays of all objects of a given type
-   Properties that provide associative arrays \(or maps\) of all instances for a given object type. These maps are keyed by object ID

|`rootPage`|Root page object for the web site/application.|
|`siteConfiguration`|Configuration object for the web site/application.|
|`chrome`|Provides an array of all `Chrome` objects.|
|`components`|Provides an array of all `Component` objects.|
|`componentTypes`|Provides an array of all `ComponentType` objects.|
|`configurations`|Provides an array of all `Configuration` objects.|
|`contentAssociations`|Provides an array of all `ContentAssociation` objects.|
|`pages`|Returns an array of all `Page` objects.|
|`pageTypes`|Provides an array of all `PageType` objects.|
|`pageAssociations`|Provides an array of all `PageAssociation` objects.|
|`templates`|Provides an array of all `Template` objects.|
|`templateTypes`|Provides an array of all `TemplateType` objects.|
|`themes`|Provides an array of all `Theme` objects.|
|`chromeMap`|Provides an associative array of all `Chrome` objects.|
|`componentsMap`|Provides an associative array of all `Component` objects.|
|`componentTypesMap`|Provides an associative array of all `ComponentType` objects.|
|`configurationsMap`|Provides an associative array of all `Configuration` objects.|
|`contentAssociationsMap`|Provides an associative array of all `ContentAssociation` objects.|
|`pagesMap`|Provides an associative array of all `Page` objects.|
|`pageTypesMap`|Provides an associative array of all `PageType` objects.|
|`pageAssociationsMap`|Provides an associative array of all `PageAssociation` objects.|
|`templatesMap`|Provides an associative array of all `Template` objects.|
|`templateTypesMap`|Provides an associative array of all `TemplateType` objects.|
|`themesMap`|Provides an associative array of all `Theme` objects.|

The following generic lookup methods are available. When you are looking for components, it is generally much faster to use the specific `findComponents()` method.

## `getObjects(objectTypeId)`

Returns an array of all objects of the given type.

## `getObjectsMap(objectTypeId)`

Returns an associative array of all objects of the given type.

The following methods allow you to create new objects:

## `newChrome()`

Instantiates a new `Chrome`.

## `newComponent()`

Instantiates a new `Component`.

## `newComponent(componentTypeId)`

Instantiates a new `Component` with the given `ComponentType` ID.

## `newComponent(componentTypeId, title, description)`

Instantiates a new `Component` with the given `ComponentType` ID, title, and description.

## `newComponentType()`

Instantiates a new `ComponentType`.

## `newConfiguration()`

Instantiates a new `Configuration`.

## `newConfiguration(sourceId)`

Instantiates a new `Configuration` bound to the given source ID.

## `newContentAssociation()`

Instantiates a new `ContentAssociation`.

## `newPage()`

Instantiates a new `Page`.

## `newPage(title, description)`

Instantiates a new `Page` with the given title and description.

## `newPageAssociation()`

Instantiates a new `PageAssociation`.

## `newPageType(pageTypeId)`

Instantiates a new `PageType`.

## `newTemplate()`

Instantiates a new `Template`.

## `newTemplate(templateType)`

Instantiates a new `Template` instance of the given template type.

## `newTemplate(templateTypeId, title, description)`

Instantiates a new `Template` instance of the given template type, title, and description.

## `newTemplateType(templateTypeId)`

Instantiates a new `TemplateType` with the given ID.

## `newTheme(themeId)`

Instantiates a new `Theme` instance with the given ID.

## `newPreset(presetId, tokens)`

Creates model objects based on a given preset ID.

The preset is looked up and processed by the `PresetManager` bean. The various model objects found in the preset will be generated using the supplied name/value map of tokens.

The following generic object creation method is also available:

## `newObject(objectId, objectTypeId)`

Instantiates a new object of the given type.

The following methods look up objects and return arrays of results. An AND operator is applied across all supplied parameters. If a parameter is null, it is not included in the lookup.

## `findComponents(scopeId, sourceId, regionId, componentTypeId)`

Finds all `Component` instances whose bindings match the given scope, source object, region, and component type; the component type should be left as null for the fastest lookup performance.

## `findChildPageAssociations(sourceId, destId)`

Finds all `PageAssociation` instances of type child between the given source and destination pages.

## `findPageAssociations(sourceId, destId, assocType)`

Finds all `PageAssociation` instances between the given source and destination pages of the given association type \(that is, `child`\).

## `findChildPages(sourceId)`

Finds all child page objects for the given top level page ID.

## `findContentAssociations(sourceId, destId, assocType, formatId)`

Finds all `ContentAssociation` instances whose bindings match the given source ID, destination ID, association type, and format.

The following methods look up objects and return maps of results. An AND operator is applied across all supplied parameters. If a parameter is null, it is not included in the lookup.

## `findComponentsMap(scopeId, sourceId, regionId, componentTypeId)`

Finds all `Component` instances whose bindings match the given scope, source object, region, and component type; the component type should be left as null for the fastest lookup performance.

## `findPageAssociationsMap(sourceId, destId, assocType)`

Finds all `PageAssociation` instances between the given source and destination pages of the given association type \(that is, `child`\).

## `findContentAssociationsMap(sourceId, destId, assocType, formatId)`

Finds all `ContentAssociation` instances whose bindings match the given source ID, destination ID, association type, and format.

## `findTemplatesMap(pageId)`

Finds all templates that are bound to the given page.

## `findWebScripts(family)`

Searches for web script components with the given family name; returns an array of `WebScript Description` objects.

The following methods return a single object. An AND operator is applied across all supplied parameters. If a parameter is null, it is not included in the lookup. If multiple objects result from the lookup, the first one is returned.

## `findConfiguration(sourceId)`

Returns a `Configuration` instance bound to the given source ID.

## `findTemplate(pageId)`

Returns the default `Template` instance bound to a given page.

## `findTemplate(pageId, formatId)`

Returns the `Template` instance bound to a given page for a specific format.

The following methods are used to bind objects together. These are used to create association objects and to stamp binding parameters onto objects.

## `associateComponent(componentId, scopeId, sourceId, regionId)`

Binds a given component to specified scope, source object, and region.

## `associateTemplate(templateId, pageId)`

Binds the default template to a page.

## `associateTemplate(templateId, pageId, formatId)`

Binds a template to a page for a given format ID.

## `associatePage(sourceId, destId)`

Associates a source page to a child page.

## `associateContent(contentId, pageId, formatId)`

Associates a content ID to a page for a given format ID.

## `associateContentType(contentTypeId, pageId, formatId)`

Associates a content type ID to a page for a given format ID.

The following methods are used to unbind objects from one another. They are used to remove association objects and to clear binding parameters on objects.

## `unassociateComponent(componentId)`

Unbinds a given component so that it is uncoupled from a scope, source object, and region.

## `unassociateTemplate(pageId)`

Unbinds the default template from a page.

## `unassociateTemplate(pageId, formatId)`

Unbinds a template from a page for a given format ID.

## `unassociatePage(sourceId, destId)`

Unassociates a source page from a child page.

## `unassociateContent(contentId, pageId, formatId)`

Unassociates a content ID from a page for a given format ID.

## `unassociateContentType(contentTypeId, pageId, formatId)`

Unassociates a content type ID from a page for a given format ID.

The following methods can be used to look up individual objects.

## `getObject(objectTypeId, objectId)`

Returns a single object with the given object type ID and object ID.

## `getChrome(objectId)`

Returns a `Chrome` instance with the given object ID.

## `getComponent(objectId)`

Returns a `Component` instance with the given object ID.

## `getComponent(scope, regionId, sourceId)`

Returns a `Component` instance bound to the given scope, region ID, and source ID.

## `getComponentType(objectId)`

Returns a `ComponentType` instance with the given object ID.

## `getConfiguration(objectId)`

Returns a `Configuration` instance with the given object ID.

## `getContentAssociation(objectId)`

Returns a `ContentAssociation` instance with the given object ID.

## `getPage(objectId)`

Returns a `Page` instance with the given object ID.

## `getPageType(objectId)`

Returns a `PageType` instance with the given object ID.

## `getPageAssociation(objectId)`

Returns a `PageAssociation` instance with the given object ID.

## `getTemplate(objectId)`

Returns a `Template` instance with the given object ID.

## `getTemplateType(objectId)`

Returns a `TemplateType` instance with the given object ID.

## `getTheme(objectId)`

Returns a `Theme` instance with the given object ID.

A lot can be achieved in a few lines of code. For example, to generate two pages, associate them together, bind those pages to a new template instance, and bind template scoped components to the pages:

```
// create two pages
var page1 = sitedata.newPage("My First Product Page", "First Description");
var page2 = sitedata.newPage("My Second Product Page", "Second Description");

// associate both pages to the site's root page
sitedata.associatePage(sitedata.rootPage.id, page1.id);
sitedata.associatePage(sitedata.rootPage.id, page2.id);

// create a new template instance of type "product_display_template"
var template1 = sitedata.getObject("product_display_template");

// bind both pages to this template
sitedata.associateTemplate(template1.id, page1.id);
sitedata.associateTemplate(template1.id, page2.id);

// create a component instance
var component1 = sitedata.newComponent("pdfViewer", "PDF Viewer", "Description");

// bind component into both pages at once by setting to template scope
sitedata.associateComponent(component1.id, "template", template1.id, "viewer");
```

**Parent topic:**[Root-scoped objects](../references/APISurf-rootscoped.md)

