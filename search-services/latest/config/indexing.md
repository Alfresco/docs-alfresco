---
title: Indexing recommendations
---

When upgrading from a previous Search Services version you should review these indexing considerations:

* [Cross Locale](#cross-locale) Enabling or disabling
* [Exact term search](#exact-term-search)
* [Document fingerprints]({% link search-services/latest/config/performance.md %}#disable-document-fingerprints) Enabling or disabling

## Cross Locale

By default, Search Services is provided with cross-language search support disabled. This default configuration affects all the deployment artifacts, i.e. using a zip file or Docker image.

If you use several languages across your organization, you must enable cross-language search support in all text fields. To do this update the `alfresco-search-services/solrhome/conf/shared.properties` configuration file:

```bash
 alfresco.cross.locale.datatype.0={http://www.alfresco.org/model/dictionary/1.0}text
 alfresco.cross.locale.datatype.1={http://www.alfresco.org/model/dictionary/1.0}content
 alfresco.cross.locale.datatype.2={http://www.alfresco.org/model/dictionary/1.0}mltext
```

> **Note:** A reindex of Search Services is required after applying the configuration.

## Exact term search

To [Search]({% link content-services/latest/using/search.md %}) you must prefix it with `=`.

> **Note:** Exact term search will not work correctly unless the [Cross Locale](cross-locale) configuration is enabled. There are some limitations if you deploy Search Services with Cross Locale configuration **disabled**.

* The Equals operator `=` must not be used in the user search boxes within the user interface i.e Share, ACS and Digital Workspace, because it will produce 0 results and the following error will show in the SOLR Logs:

```bash
java.lang.UnsupportedOperationException:
Exact Term search is not supported unless you configure the field
<{http://www.alfresco.org/model/content/1.0}title> for cross locale search
```

* Facet labels may be shown incorrectly in the user interface because they include the localization prefix in addition to the original value. For instance `{en}value` instead of `value`.

* Queries used in Alfresco Search REST API only accept the equals operator `=` for content model properties when the tokenization is set to `false`. **Note:** If the tokenization is set to `false` then the `=` operator will perform an *exact field* search, rather than an *exact term* search. The other tokenization options `true` and `both` will raise an exception when being used with the equals operator. Changing the tokenization option for a property requires re-indexing all those values in SOLR, this means you must design your custom content model carefully before deploying it to a production environment. For example:

```xml
<property name="cm:sample">
    <type>d:text</type>
    <index enabled="true">
        <tokenised>false</tokenised>
    </index>
</property>
```

The following features are working as expected in Search Services 2.0 and above deployments with Cross Locale configuration **enabled**:

* Equals operator can be used from the user interface search boxes and the results are as expected
* Facet labels are returned without the localization prefix, so they are shown consistently in the user interface
* Queries used in Alfresco Search REST API accept the equals operator `=` for properties with every tokenisation option: `false`, `true` and `both`.
