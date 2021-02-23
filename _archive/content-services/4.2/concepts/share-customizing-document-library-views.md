---
author: [Alfresco Documentation, Tony Bedford]
audience: 
category: Alfresco Share
option: [Alfresco Share, Customizing Document Library Views]
---

# Customizing document library views

Within the document library it is possible to select from a number of views. It is also possible to add custom views to the document library through configuration in the share-documentlibrary-config.xml file.

When browsing content in the document library it is possible to select from a variety of views including:

-   Simple
-   Detailed
-   Gallery
-   Filmstrip
-   Table
-   Audio
-   Media

These views are selected from the **Options** button.

The share-documentlibrary-config.xml file controls what views will be available as options when browsing the DocumentLibrary, My Files, Shared Files, and Repository pages. It is also possible to use a module that provides evaluated configuration to have the options change based on criteria such as site name, site preset, user group, and so on.

It is possible to customize these views, and also add additional view types through configuration in the share-documentlibrary-config.xml file. These views are also present in the My Files, Shared Files and Repository pages.

The views are rendered by view renderers, which have various attributes and also a block of configuration \(in JSON\) associated with them. For example:

```

  
<view-renderer id="email" iconClass="table" label="button.view.email" index="50" widget="Alfresco.DocumentListTableViewRenderer">
     <dependencies>
        <js src="components/documentlibrary/documentlist-view-detailed.js" />
        <js src="components/documentlibrary/documentlist-view-table.js" />
        <css src="components/documentlibrary/documentlist-view-table.css" />
     </dependencies>
     <json-config>
        {
           "actions": {
              "show": "true"
           },
           "indicators": {
              "show": "true"
           },
           "selector": {
              "show": "true"
           },
           "thumbnail": {
              "show": "false"
           },
           "propertyColumns": [
              {
                 "property": "cm:originator",
                 "label": "table.email.label.originator",
                 "link": "true"
              },
              {
                 "property": "cm:subjectline",
                 "label": "table.email.label.subjectline",
                 "link": "true"
              },
              {
                 "property": "cm:sentdate",
                 "label": "table.email.label.sentdate"
              },
              {
                 "property": "cm:addressee",
                 "label": "table.email.label.addressee"
              },
              {
                 "property": "cm:addressees",
                 "label": "table.email.label.addressees"
              },
              {
                 "property": "cm:attachments",
                 "label": "table.email.label.attachments"
              }
           ]
        }
     </json-config>
  </view-renderer>  
  

```

For example the following snippet shows a custom simplified view called “minimalist”:

```

      
    <view-renderer id="minimalist" iconClass="table" label="button.view.minimalist" index="60" widget="Alfresco.DocumentListTableViewRenderer">
      <dependencies>
        <js src="components/documentlibrary/documentlist-view-simple.js" />
        <js src="components/documentlibrary/documentlist-view-table.js" />
        <css src="components/documentlibrary/documentlist-view-table.css" />
      </dependencies>
      <json-config>
        {
           "actions": {
              "show": "false"
           },
           "indicators": {
              "show": "false"
           },
           "selector": {
              "show": "true"
           },
           "thumbnail": {
              "show": "false"
           },
           "propertyColumns": [
              {
                 "property": "cm:name",
                 "label": "table.minimalist.label.name",
                 "link": "true"
              }
           ]
        }
      </json-config>
    </view-renderer>      
      
    
```

Note that the value of labels such as `table.minimalist.label.name` are set in properties files, so that multiple translations can be provided.

The minimalist custom view uses the Table View renderer.

There are four columns that are always present in the table, which can be hidden if required:

-   actions - the drop-down menu of actions that can be peformed on the document
-   indicators - the set of icons that visually communicate information about the document
-   selector - the checkbox to use when selecting multiple documents
-   thumbnail - the thumbnail-sized preview of the document

All other columns must be defined in the `propertyColumns` array. The property attribute can be set to either a document property, such as `cm:name` or a metadata template renderer such as `size`, `tags` or `date`.

**Parent topic:**[Extending the Alfresco Share Document Library](../concepts/Share-Doclib-Extend-Intro.md)

