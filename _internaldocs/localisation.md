# Alfresco localisation

## Installation

1. Place `jekyll-alfresco-localisation.rb` to the _plugins directory
2. Add basic languages config to the `_config.yml`: 
```
alfresco: 
  langs:
    en: 
        name: English
        files: ""
        url: ""
```
3. To enable adding the 🇬🇧 icon to the links that will redirect user from localised conntent to general (English), add following rule to `main.css`
```
a[localisation_redirect]::before {
  content: "🇬🇧";
  position: absolute;
  transform: translate(-1.2em, 0);

  opacity: 0.5;
}
```
4. Create at `en` directory following files
    * `glossary.yaml` - contains strings for tooltips  
    * `strings.yaml` - contains static localised strings

## Adding new language (French)
1. Add language description to the config `_config.yml`:
```
    alfresco: 
        langs:
            en: 
                name: English
                files: ""
                url: ""
+          fr: 
+               name: Français
+               files: "fr/"
+               url: "/fr"
```
2. Create language directories
```
    :
    |-- _archive
    |-- _data
    |   `-- en
+   |   `-- fr
    |   :
    |   :
    |
    |- _internaldocs
    :
+   |- fr 
    :
```
3. Create (or copy to `fr` directory) files as those exists at `_data/en/` folder
    * `glossary.yaml` - contains strings for tooltips  
    * `strings.yaml` - contains static localised strings
 
## Usage example

### Adding localisation for a specific page
1. Let's say you want to add French localisation for already existed `/sync-service/latest/index.md`
2. Just copy that file and structure to `fr/` directory, so it should be `fr/sync-service/latest/index.md`
3. Voilà, you're able to put there localised content
4. _[optional]_ To set localised title that will be reflected in `Main Menu ` and `Table of Content ` - add parameter `menutitle` to Front Matters, for example: 
```
---
title: Alfresco Sync Service
menutitle: Titre le plus français
---

Alfresco Sync Service is an add-on module that synchronizes files between the desktop and repository using web services. It's part of the Desktop Sync solution that consists of three components: Sync Service, Desktop Sync for Windows, and Desktop Sync for Mac. This documentation describes how to install, configure, and administer the Sync Service.

```
### Localise static strings 
1. In case if you need to localise static string, for example `Additional resources` string of footer section
2. Add to `fr/strings.yaml` key/value pair like 
```
Additional resources: Ressources additionnelles
```
* _note:_ if you need to add key that contains colon `:` - use qoutes  
```
"Additional: resources": Ressources additionnelles
```

## For editors
### --incremental flag
Use this flag if you work on a page's content and don't want to rebuild every time the whole project. 

### --profile flag
Use this flag to get the profile statistics

```
| Filename                                                    | Count |      Bytes |    Time |
+-------------------------------------------------------------+-------+------------+---------+
| _includes/toc_part.html                                     | 34564 |  81158.36K |  50.050 |
| _layouts/docs.html                                          |  2884 | 154439.54K |  36.201 |
| _includes/toc.html                                          |  2884 |  32080.47K |  21.262 |
| _includes/mainmenu.html                                     |  2888 |  18922.56K |   7.997 |
| _includes/submenu.html                                      |  2888 |   9263.39K |   4.486 |
| _includes/docsmenu.html                                     |  2885 |   7127.56K |   3.996 |
| _includes/submenu_small.html                                |  5776 |   3102.87K |   1.781 |
| _includes/footer.html                                       |  2889 |   6277.12K |   0.622 |
| fr/content-services/latest/using/permissions-es.md          |     1 |     31.35K |   0.520 |
| content-services/latest/using/permissions-es.md             |     1 |     31.35K |   0.517 |
| content-services/6.0/using/permissions.md                   |     1 |     30.04K |   0.510 |
| content-services/6.1/using/permissions.md                   |     1 |     30.04K |   0.508 |
...
```


## For developers

### `loc_safe_url` tag

```
{% loc_safe_url [no-transform-title] url lang other params of 'a' tag %}
    title
{%endloc_safe_url%}
```
* **no-transform-title** - _[optional]_ if set, tag will keep existing title 
* **url** - en url to the page `/content-services/latest/`
* **lang** - page in language that we're looking for
* **rest** - _[optional]_ will be copied as it is to `<a>` tag as params
* **title** - title that will be used as content of `<a>` tag. If `no-transform-title` not set, title will be used from `title` parameter of a page (from .md file)

This tag extracts title of specified page in specific language 

If the page not exists, it will use data from `en` and set `localisation_redirect` param to `<a>` tag

### `l` tag
```
{%l string%}
```
* **string** - string will be used as id to find the proper translation inside of `strings.yaml`. If key is not found, string will be used as it is

### Variables

During pages generation plugin sets following values that are accessible from Liquid: 

* **{{page.lang}}** - detected language
* **{{page.lang_config}}** - language description from `_config.yml`
* **{{page.ref_page}}** - original (en) version of the page
* **{{page.ref_page.loc_pages}}** - array of translation pages
* **{{site.url_pages_hash}}** - hash url->page



