---
author: [Alfresco Documentation, Alfresco Documentation]
audience: 
category: 
---

# Smart Folders global properties settings

Use this information to understand the full list of alfresco-global.properties settings available for Smart Folders.

Settings for Smart Folders are listed in the <tomcat\>/shared/classes/alfresco-global.properties.sample file:

```
#Smart Folders Config Properties

smart.folders.enabled=true
smart.folders.model=alfresco/model/smartfolder-model.xml
smart.folders.model.labels=alfresco/messages/smartfolder-model

#Smart reference config

#smart.reference.classpath.hash=${smart.folders.config.vanilla.processor.classpath}->1,${smart.folders.config.system.templates.classpath}->2

#Smart store config

#Company home relative download associations of smart entries 
#smart.download.associations.folder=${spaces.dictionary.childname}/${spaces.smartdownloads.childname}

#Generic virtualization methods config

#Vanilla JSON templates javascript processor classpath. A java script processor used to 
#covert JSON templates to internal smart folder definitions.

#smart.folders.config.vanilla.processor.classpath=/org/alfresco/repo/virtual/node/vanilla.js

#System virtualization method config

#System virtualization method aspect.
#smart.folders.config.system.aspect=smf:systemConfigSmartFolder
#System virtualization method aspect defined template location property.
#smart.folders.config.system.aspect.template.location.property=smf:system-template-location
#Classpath to be explored for *.json entries defining system templates.
#smart.folders.config.system.templates.classpath=/org/alfresco/repo/virtual/node
#A company home relative name or qname path location of repository system templates.
#smart.folders.config.system.templates.path=${spaces.dictionary.childname}/${spaces.smartfolders.childname}
#Content sub type of repository system templates.
#smart.folders.config.system.templates.template.type=smf:smartFolderTemplate

#Custom virtualization method config

#Custom virtualization method aspect.
#smart.folders.config.custom.aspect=smf:customConfigSmartFolder
#Custom virtualization method aspect template content association.
#smart.folders.config.custom.aspect.template.association=smf:custom-template-association


#Type virtualization method config

#A company home relative name or qname path location of the type mapped templates.
#smart.folders.config.type.templates.path=${spaces.dictionary.childname}/${spaces.smartfolders.childname}
#Type and aspect qname regular expression filter. 
#smart.folders.config.type.templates.qname.filter=none
```

The different sections are used in the following ways:

1.  Smart Folders config properties: these are the basic mandatory settings for Smart Folders.

    ```
    smart.folders.enabled=false
    ```

    is the default, and must be set to `true` to enable Smart Folders.

2.  Smart reference config: reduces the length of NodeRefs
3.  Smart store config: If you use the Download as Zip function in Share for a folder that contains Smart Folders, a temporary file is created in the Data Dictionary/Smart Folder Downloads folder that contains information about the Smart Folder contents \(an association folder\). Use this variable to change where the association folder lives.
4.  Generic virtualization methods config: defines overall Smart Folder Template classpath. By default, templates live in <configRootShare\>\\classes\\org\\alfresco\\repo\\virtual\\node
5.  System virtualization method config: defines the configuration for System Smart Folders. See [System Smart Folders](sf-folder-system.md) for more information.
6.  Custom virtualization method config: defines the configuration for Custom Smart Folders. See [Custom Smart Folders](sf-folder-custom.md) for more information.
7.  Type virtualization method config: defines the configuration for Type-based Smart Folders. See [Type-based Smart Folders](sf-folder-type.md) for more information.

**Parent topic:**[Configuring Smart Folders](../concepts/sf-intro.md)

