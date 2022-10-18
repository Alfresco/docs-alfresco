---
title: Localization
---

OpenAnnotate supports localization throughout the user-facing side of the application. This article will explain how to localize text in OpenAnnotate, as well as how to add support for new languages. Text can be localized in both the front-end using the L10N.js library, as well as the back-end Controllers using Resource Bundles. The process for localization varies slightly in each case.

## Front-end localization with L10N.js

The L10N.js library allows us to dynamically set the text that appears in the browser, based on the user's browser language. L10N uses Json files with string keys that determine the output that will be displayed. The name of these files is `<language>.json`, and they are located in `src\main\webapp\localizations\locales`.

For example, `en.json` might contain the following key-value pair:

```json
"viewer.toolbar.tools.accepted" : "Accepted",
```

while `fr.json` might contain:

```json
"viewer.toolbar.tools.accepted" : "Accepté",
```

`viewer.toolbar.tools.accepted` when set in an english browser will appear as `Accepted`, but will appear as `Accepté` in a french browser. When adding a new localization key, they must be added along with the correct translation to each Json file.

String values can be localized in HTML partials and javascript files. To localize in HTML, we use a Handlebars helper:

```handlebars

{% raw %}{{localize "viewer.toolbar.tools.accepted"}}{% endraw %}
```

This will be rendered as the correct string value according to the browser language.

To localize in javascript we use the localize function of LocalizationService, which is placed on the OA window object.

```javascript
var myString = OA.LocalizationService.localize("viewer.toolbar.tools.accepted");
```

This will return the same string value as the Handlebars helper.

## Back-end localization with Resource Bundles

Localization in the back-end can be achieved with similar results with the concept of Java Resource Bundles. These bundles have the name `LocalizationBundle_<language>.properties.` However there is no english bundle, it is simply the default `LocalizationBundle.properties`. These files are located in `src\main\webapp\WEB-INF\classes\localizationBundles`.

These files follow a very similar format to the L10N.js Json files, but as property files they look something like

```javascript
login.licenseExpired.title=License Expired.
```

Localization works in the same way as L10N, each key refers to a string value in a certain language. To localize text in the Java files, we use an OAUtil method:

```java
String myString = OAUtil.localize(context.getLanguageBundle(), "login.licenseExpired.title");
```

The language bundle refers to the correct bundle per the browser locale, which should already be configured on the OAContext object for our various Controllers. This will perform the same function as L10N.js, returning the string localized in the correct browser language. When adding a new localization key, they must be added along with the correct translation to each properties file.

## Adding a new language

The following steps must be performed to add a new language to OpenAnnotate:

1. Add a new `<language>.json` file to `\localizations\locales`, translating all values from the other json files to your given language.

1. Add the new json file to `\localizations\localizations.json`, following the format of previous languages.

1. Add a new `LocalizationBundle_<language>.properties.` file to `\WEB-INF\classes\localizationBundles`, translating all values from the other properties files to your given language.

1. Override the `configuredLocales` Spring property in `\WEB-INF\classes\override-placeholders.properties`, which defaults to `en,fr`, to add in the additional language.

OpenAnnotate will now be configured to localize in that language.
