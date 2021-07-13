---
title: Indexing recommendations
---

When upgrading from a previous Search Services version you should review these indexing considerations:

* Enabling or disabling Cross Locale configuration
* Impact of the restrictions of the Exact Term Search implementation in environments with Cross Locale configuration disabled
* Enabling or disabling Fingerprint feature

## Cross Locale

By default, Search Services is provided with cross-language search support disabled. This default configuration affects to all the deployment artifacts: ZIP Distribution file and Docker Images.

If you use several languages across your organization, you must enable cross-language search support in all text fields. To do this update the `alfresco-search-services/solrhome/conf/shared.properties` file:

```bash
 alfresco.cross.locale.datatype.0={http://www.alfresco.org/model/dictionary/1.0}text
 alfresco.cross.locale.datatype.1={http://www.alfresco.org/model/dictionary/1.0}content
 alfresco.cross.locale.datatype.2={http://www.alfresco.org/model/dictionary/1.0}mltext
```

> **Note:** A reindex of Search Services is required after applying this configuration.

## Exact Term considerations

To [search for an exact term](https://docs.alfresco.com/search-services/latest/using/#search-for-an-exact-term) you must prefix it with `=`.

Exact term search will not work correctly unless [Cross Locale](cross-locale) configuration is enabled. There are some limitations if deploy Search Services with Cross Locale configuration **disabled**.

* The Equals operator (=) mus not be used from within the user search boxes within the user interface (Share, ACA and ADW applications), because it will always produce 0 results and the following error will show in the SOLR Logs:

```bash
java.lang.UnsupportedOperationException:
Exact Term search is not supported unless you configure the field
<{http://www.alfresco.org/model/content/1.0}title> for cross locale search
```

* Facet labels may be shown incorrectly in the user interface because they include the localization prefix in addition to the original value. For instance `{en}value` instead of `value`.

* Queries used in Alfresco Search REST API only accepts the equals operator (=) for content model properties with tokenization `false`. The other tokenization options (`true` and `both`) raise an exception when being used with the equals operator. Changing the tokenization option for a property requires re-indexing all those values in SOLR, so design your custom content model carefully before deploying it to a production environment.

```bash
<property name="cm:sample">
    <type>d:text</type>
    <index enabled="true">
        <tokenised>false</tokenised>
    </index>
</property>
```

All these features are working as expected in Search Services 2.0 deployments with Cross Locale configuration **enabled**:

* Equals operator can be used from UI search boxes and the results are expected
* Facet labels are returned without the localisation prefix, so they are shown consistently in the UI
* Queries used in Alfresco Search REST API are accepting equals operator (=) for properties with every tokenisation option: `false`, `true` and `both`

## Fingerprint

For information on FIngerprint see