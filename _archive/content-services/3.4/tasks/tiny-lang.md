---
author: [Alfresco Documentation, Alfresco Documentation]
source: 
audience: 
category: [Installation, Administration, Extensions/Third Party Tools]
keyword: [TinyMCE, Extensions/Third Party Tools]
---

# Installing TinyMCE language packs

Translations in Alfresco use the language pack supplied in the default install. This default includes English, Catalan, Croatian, Czech, Danish, German, Spanish, Greek, Finnish, French, Italian, Japanese, Dutch, Polish, Portuguese, Portuguese \(Brazilian\), Russian, Swedish, Turkish, Simplified Chinese. The language used switches according to the browser locale.

If you have a translation that is not supplied with Alfresco, then you must add the appropriate TinyMCE language pack for the translation to work correctly.

If you installed Alfresco using one of the installation wizards, the default language packs are already installed.

1.  Browse to the TinyMCE website: http://tinymce.moxiecode.com/download\_i18n.php

2.  Download the required TinyMCE language pack.

3.  Unpack the language file:

    -   For Share, unpack to: <TOMCAT\_HOME\>/webapps/share/modules/editors/tiny\_mce
    -   For Explorer, unpack to: <TOMCAT\_HOME\>/webapps/alfresco/scripts/tiny\_mce
4.  Ensure that the browser cache is cleared or refresh the page.


**Parent topic:**[Installing software required for Alfresco](../concepts/prereq-opt-install.md)

**Related information**  


[Alfresco Explorer configuration settings](explorer-config-settings.md)

