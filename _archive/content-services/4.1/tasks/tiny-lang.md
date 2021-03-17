---
author: [Alfresco Documentation, Alfresco Documentation]
audience: 
category: [Installation, Administration, Extensions/Third Party Tools]
keyword: [TinyMCE, Extensions/Third Party Tools]
---

# Installing TinyMCE language packs

Alfresco is localized using the language packs supplied in the default install. Alfresco supports the following language packs: German \(de\), English \(en\), Spanish \(es\), French \(fr\), Italian \(it\), Japanese \(ja\), Dutch \(nl\), and Russian \(ru\).

The language in which Alfresco displays switches depending on the locale selected for the browser. Set your browser to your most appropriate locale. This will make sure that the special characters for each language display correctly.

The source-localized files are encoded in ASCII, and the special and accented characters are displayed using escape sequences. The source files have been renamed using the corresponding locale for each language. For example, site-welcome.properties is called sitewelcome\_ fr.properties for the French version.

If you wish to use a translation that is not supplied with Alfresco, then you must add the appropriate TinyMCE language pack for the translation to work correctly.

If you installed Alfresco using one of the setup wizards, the default language packs are already installed. If you have installed Alfresco manually, you must install the supported language pack manually.

1.  Browse to the TinyMCE website: [TinyMCE](http://tinymce.moxiecode.com/download_i18n.php).

2.  Download the required TinyMCE language pack.

    **Note:** The next step makes configuration changes to the Share application to configure the additional language packs for TinyMCE. This step can only be performed after Alfresco has been installed.

3.  Unpack the language file:

    -   For Share, unpack to: <TOMCAT\_HOME\>/webapps/share/modules/editors/tiny\_mce/langs
    -   For Explorer, unpack to: <TOMCAT\_HOME\>/webapps/alfresco/scripts/tiny\_mce/langs
4.  Ensure that the browser cache is cleared or refresh the page.


**Parent topic:**[Installing software required for Alfresco](../concepts/prereq-opt-install.md)

**Related information**  


[Alfresco Explorer configuration settings](explorer-config-settings.md)

