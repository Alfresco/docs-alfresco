---
author: [Alfresco Documentation, Alfresco Documentation]
source: FreeMarker Template API
audience: 
category: FreeMarker Template API
option: message
---

# `message`

`message(id)` returns an I18N message resolved for the current locale and specified message ID.

## Parameters

-   **id**

    A string representing the message ID to display.


## Returns

Returns an I18N message resolved for the current locale and specified message ID.

## Example

```


<p>message: ${message("templates.translatable.no_document_found")}</p>                          

      
```

The preceding code snippet would return the following message:

```

message: No document found        
      
```

The message having being loaded from a properties file such as /config/alfresco/messages/templates-messages.properties. The translations being loaded from corresponding files such as:

```

./root/projects/repository/config/alfresco/messages/templates-messages.properties:templates.translatable.no_document_found=No document found
./root/projects/repository/config/alfresco/messages/templates-messages_de.properties:templates.translatable.no_document_found=Kein Dokument gefunden
./root/projects/repository/config/alfresco/messages/templates-messages_es.properties:templates.translatable.no_document_found=Ning\u00fan documento encontrado
./root/projects/repository/config/alfresco/messages/templates-messages_fr.properties:templates.translatable.no_document_found=Aucun document trouv\u00e9
./root/projects/repository/config/alfresco/messages/templates-messages_it.properties:templates.translatable.no_document_found=Nessun documento trovato
./root/projects/repository/config/alfresco/messages/templates-messages_ja.properties:templates.translatable.no_document_found=\u6587\u66f8\u304c\u898b\u3064\u304b\u308a\u307e\u305b\u3093
./root/projects/repository/config/alfresco/messages/templates-messages_nl.properties:templates.translatable.no_document_found=Kan geen document vinden
      
```

**Parent topic:**[Default Model Methods](../references/API-FreeMarker-defaultmodelmethods.md)

