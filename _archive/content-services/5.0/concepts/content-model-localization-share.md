---
author: Alfresco Documentation
---

# Localizing models in Alfresco Share

Every type, aspect, property, association, constraint, and data type defined in a model has a title and description. Both of these values are provided in the model XML file but only one language is supported, which is the language of the values specified in the XML file.

Localization for Share can be achieved through various slingshot.properties files. For example, on a standard Alfresco installation you would see the following files:

```

./tomcat/webapps/share/WEB-INF/classes/alfresco/messages/slingshot.properties
./tomcat/webapps/share/WEB-INF/classes/alfresco/messages/slingshot_de.properties
./tomcat/webapps/share/WEB-INF/classes/alfresco/messages/slingshot_en.properties
./tomcat/webapps/share/WEB-INF/classes/alfresco/messages/slingshot_es.properties
./tomcat/webapps/share/WEB-INF/classes/alfresco/messages/slingshot_fr.properties
./tomcat/webapps/share/WEB-INF/classes/alfresco/messages/slingshot_it.properties
./tomcat/webapps/share/WEB-INF/classes/alfresco/messages/slingshot_ja.properties
./tomcat/webapps/share/WEB-INF/classes/alfresco/messages/slingshot_nb.properties
./tomcat/webapps/share/WEB-INF/classes/alfresco/messages/slingshot_nl.properties
./tomcat/webapps/share/WEB-INF/classes/alfresco/messages/slingshot_pt_BR.properties
./tomcat/webapps/share/WEB-INF/classes/alfresco/messages/slingshot_ru.properties
./tomcat/webapps/share/WEB-INF/classes/alfresco/messages/slingshot_zh_CN.properties      
    
```

Within these files the localization text can be set for various types, aspects, and other UI elements. The correct file will be loaded depending on the locale being used by Alfresco.

The following is an excerpt from the slingshot.properties file:

```

## Data Dictionary
# Aspects
aspect.cm_complianceable=Complianceable
aspect.cm_dublincore=Dublin Core
aspect.cm_effectivity=Effectivity
aspect.cm_emailed=Emailed
aspect.cm_generalclassifiable=Classifiable
aspect.cm_summarizable=Summarizable
aspect.cm_taggable=Taggable
aspect.cm_templatable=Templatable
aspect.cm_versionable=Versionable
aspect.emailserver_aliasable=Aliasable (Email)
aspect.app_inlineeditable=Inline Editable
aspect.gd_googleEditable=Google Docs Editable
aspect.cm_geographic=Geographic
aspect.exif_exif=EXIF
aspect.audio_audio=Audio
aspect.cm_indexControl=Index Control
aspect.dp_restrictable=Restrictable      
    
```

The following is the corresponding excerpt from the slingshot\_de.properties file

```

## Data Dictionary
# Aspects
aspect.cm_complianceable=Einhaltbar
aspect.cm_dublincore=Dublin Core
aspect.cm_effectivity=Effektivit\u00e4t
aspect.cm_emailed=Per E-Mail versandt
aspect.cm_generalclassifiable=Klassifizierbar
aspect.cm_summarizable=Zusammenfassbar
aspect.cm_taggable=Tag-f\u00e4hig
aspect.cm_templatable=Vorlagenf\u00e4hig
aspect.cm_versionable=Versionsf\u00e4hig
aspect.emailserver_aliasable=Alias-f\u00e4hig (E-Mail)
aspect.app_inlineeditable=Inline editierbar
aspect.gd_googleEditable=Google Docs-editierbar
aspect.cm_geographic=Geografisch
aspect.exif_exif=EXIF
aspect.audio_audio=Audio
aspect.cm_indexControl=Indexkontrolle
aspect.dp_restrictable=Beschr\u00e4nkbar      
    
```

Localizations can be added for custom aspects, types and so on.

**Parent topic:**[Content modeling](../concepts/content-modeling-about.md)

