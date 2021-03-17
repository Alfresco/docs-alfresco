---
author: Alfresco Documentation
---

# sitedata

The sitedata object provides information about a site such as its configuration and root page.

The `sitedata` object provides the following properties. The property types include:

-   Framework properties.
-   Properties that provide arrays of all objects of a given type.
-   Properties that provide associative arrays \(or maps\) of all instances for a given object type. These maps are keyed by object ID.

|`rootPage`|Root page object for the web site/application.|
|`siteConfiguration`|Configuration object for the web site/application.|
|`objectTypeIds`|Return a string array of object type IDs.|
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
|`pageAssociationsMap`|Provides an associative array of all `PageAssociation` objects.|
|`templatesMap`|Provides an associative array of all `Template` objects.|
|`templateTypesMap`|Provides an associative array of all `TemplateType` objects.|
|`themesMap`|Provides an associative array of all `Theme` objects.|

-   **[getObjectTypeName](../references/APISurf-ScriptSiteData-getObjectTypeName.md)**  
`getObjectTypeName(String objectTypeId)` - this method returns the object type name, given the object type ID.
-   **[getObjectTypeDescription](../references/APISurf-ScriptSiteData-getObjectTypeDescription.md)**  
`getObjectTypeDescription(String objectTypeId)` - this method returns the object type description, given the object type ID.
-   **[getObjects](../references/APISurf-ScriptSiteData-getObjects.md)**  
`getObjects(String objectTypeId)` - this method returns an array of objects of the given object type ID.
-   **[getObjectsMap](../references/APISurf-ScriptSiteData-getObjectsMap.md)**  
`getObjectsMap(String objectTypeId)` - this method returns a map of all instances of the given type. The map is keyed on object ID.
-   **[newObject](../references/APISurf-ScriptSiteData-newObject.md)**  
`newObject()` - these methods return a newly created `ScriptModelObject`.
-   **[newChrome](../references/APISurf-ScriptSiteData-newChrome.md)**  
`newChrome` - this method creates and returns a new Chrome object instance.
-   **[newComponent](../references/APISurf-ScriptSiteData-newComponent.md)**  
`newComponent` - these methods create and return a new Component object instance. The scope, region and sourceId parameters should be set before the object is persisted.
-   **[newComponentType](../references/APISurf-ScriptSiteData-newComponentType.md)**  
`newComponentType` - this method returns a ScriptModelObject representing a new ComponentType instance of the specified type.
-   **[newConfiguration](../references/APISurf-ScriptSiteData-newConfiguration.md)**  
`newConfiguration` - these methods create and return a new Configuration object instance.
-   **[newContentAssociation](../references/APISurf-ScriptSiteData-newContentAssociation.md)**  
`newContentAssociation` - this method creates and returns a new ContentAssociation object instance.
-   **[newPage](../references/APISurf-ScriptSiteData-newPage.md)**  
`newPage` - these methods create and return a new Page object instance.
-   **[newPageAssociation](../references/APISurf-ScriptSiteData-newPageAssociation.md)**  
`newPageAssociation` - this method creates and returns a new PageAssociation object instance.
-   **[newPageType](../references/APISurf-ScriptSiteData-newPageType.md)**  
`newPageType` - this method creates and returns a new Chrome object instance.
-   **[newTemplate](../references/APISurf-ScriptSiteData-newTemplate.md)**  
`newTemplate` - these methods create and return a new Template object instance.
-   **[newTemplateType](../references/APISurf-ScriptSiteData-newTemplateType.md)**  
`newTemplateType` - this method creates and returns a new TemplateType object instance.
-   **[newTheme](../references/APISurf-ScriptSiteData-newTheme.md)**  
`newTheme(String objectId)` - this method returns a newly created `ScriptModelObject` representing a new Theme.
-   **[newPreset](../references/APISurf-ScriptSiteData-newPreset.md)**  
`newPreset(String presetId, Scriptable tokens)` - creates model objects based on a given preset id. The preset is looked up and processed by the PresetManager bean. The various objects found in the preset will be generated using the supplied name/value map of tokens.
-   **[findComponents](../references/APISurf-ScriptSiteData-findComponents.md)**  
`findComponents(String scope, String regionId, String sourceId, String componentTypeId)` - searches for Component instances within the Web Application that match the provided constraints. If a constraint is set to null, it is not considered as part of the search.
-   **[findWebScripts](../references/APISurf-ScriptSiteData-findWebScripts.md)**  
`findWebScripts(String family)` - returns an array of webscripts that match the goven family name.
-   **[findChildPageAssociations](../references/APISurf-ScriptSiteData-findChildPageAssociations.md)**  
`findChildPageAssociations(String sourceId, String destId)` - searches for PageAssociation instances within the Web Application that are of association type 'child' and which match the specified constraints. If a constraint is set to null, it is not considered as part of the search.
-   **[findPageAssociations](../references/APISurf-ScriptSiteData-findPageAssociations.md)**  
`findPageAssociations(String sourceId, String destId, String associationType)` - searches for PageAssociation instances within the Web Application that are of the specified association type and which match the specified constraints. If a constraint is set to null, it is not considered as part of the search.
-   **[findChildPages](../references/APISurf-ScriptSiteData-findChildPages.md)**  
`findChildPages(String sourceId)` - searches for child pages of the given page.
-   **[findParentPages](../references/APISurf-ScriptSiteData-findParentPages.md)**  
`findParentPages(String pageId)` - searches for parent pages of the given page.
-   **[findContentAssociations](../references/APISurf-ScriptSiteData-findContentAssociations.md)**  
`findContentAssociations(String sourceId, String sourceType, String destId, String assocType, String formatId)` - searches for ContentAssociation instances within the Web Application that match the specified constraints. If a constraint is set to null, it is not considered as part of the search.
-   **[findComponentsMap](../references/APISurf-ScriptSiteData-findComponentsMap.md)**  
`findComponentsMap(String scope, String regionId, String sourceId, String componentTypeId)` - provides a map of `ScriptModelObjects` that wrap Component instances. The map is keyed by Component object id.
-   **[findPageAssociationsMap](../references/APISurf-ScriptSiteData-findPageAssociationsMap.md)**  
`findPageAssociationsMap(String sourceId, String destId, String associationType)` - Provides a map of ScriptModelObjects that wrap PageAssociation instances. The map is keyed by PageAssociation object id.
-   **[findContentAssociationsMap](../references/APISurf-ScriptSiteData-findContentAssociationsMap.md)**  
`findContentAssociationsMap(String sourceId, String sourceType, String destId, String assocType, String formatId)` - provides a map of ScriptModelObjects that wrap ContentAssociation instances. The map is keyed by ContentAssociation object id.
-   **[findTemplatesMap](../references/APISurf-ScriptSiteData-findTemplatesMap.md)**  
`findTemplatesMap(String pageId)` - provides a map of `ScriptModelObjects` that wrap Template instances. The map is keyed by format id.
-   **[findConfiguration](../references/APISurf-ScriptSiteData-findConfiguration.md)**  
`findConfiguration(String pageId)` - looks up Configuration instances and returns the first instance that is found for the matching constraints.
-   **[findTemplate](../references/APISurf-ScriptSiteData-findTemplate.md)**  
`findTemplate()` - these methods look up template instances and return the first instance that is found for the matching constraints.
-   **[removeTemplate](../references/APISurf-ScriptSiteData-removeTemplate.md)**  
`removeTemplate(String pageId, String formatId)` - looks up the given Page and unbinds any Template instances that are bound to the page \(keyed by formatId\). If you would like to remove the default Template instance, set formatId to null.
-   **[bindComponent](../references/APISurf-ScriptSiteData-bindComponent.md)**  
`bindComponent()` - these methods bind components.
-   **[unbindComponent](../references/APISurf-ScriptSiteData-unbindComponent.md)**  
`unbindComponent()` - these methods unbind components.
-   **[associateTemplate](../references/APISurf-ScriptSiteData-associateTemplate.md)**  
`associateTemplate()` - these methods associate a template.
-   **[unassociateTemplate](../references/APISurf-ScriptSiteData-unassociateTemplate.md)**  
`unassociateTemplate()` - these methods unassociate a template.
-   **[associatePage](../references/APISurf-ScriptSiteData-associatePage.md)**  
`associatePage` - associates a page.
-   **[unassociatePage](../references/APISurf-ScriptSiteData-unassociatePage.md)**  
`unassociatePage` - unassociates a page.
-   **[associateContent](../references/APISurf-ScriptSiteData-associateContent.md)**  
The `associateContent` method associates content.
-   **[unassociateContent](../references/APISurf-ScriptSiteData-unassociateContent.md)**  
`unassociateContent` - unassociates content.
-   **[associateContentType](../references/APISurf-ScriptSiteData-associateContentType.md)**  
`associateContentType` - associates content type.
-   **[unassociateContentType](../references/APISurf-ScriptSiteData-unassociateContentType.md)**  
`unassociateContentType` - unassociates content type.
-   **[Helper methods](../references/APISurf-ScriptSiteData-Helper-helper.md)**  
`Helper methods` - A collection of helper methods to support the SiteData object.

**Parent topic:**[Surf root objects](../references/APISurf-rootscoped.md)

