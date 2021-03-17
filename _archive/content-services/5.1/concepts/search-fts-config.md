---
author: [Alfresco Documentation, Alfresco Documentation]
source: 
audience: 
category: [Alfresco Server, Administration, Configuration]
keyword: [solr, search]
---

# Full text search configuration properties for Solr index

The Solr index's full text search properties influence the behaviour of Solr indexes.

The main index and deltas all use the same configuration. The data dictionary settings for properties determine how individual properties are indexed.

If you wish to change the default value of a property, add the relevant property to the alfresco-global.properties file and then make the changes.

**Solr index properties**

-   **solr.host=localhost**

    The host name where the Solr instance is located.

-   **solr.port=8080**

    The port number on which the Solr instance is running.

-   **solr.port.ssl=8443**

    The port number on which the Solr SSL support is running.

-   **solr.solrUser=solr**

    The Solr user name.

-   **solr.solrPassword=solr**

    The Solr password.

-   **solr.secureComms=https**

    The HTTPS connection.

-   **solr.solrConnectTimeout=5000**

    The Solr connection timeouts in ms.

-   **solr.solrPingCronExpression=0 0/5 \* \* \* ? \***

    The cron expression defining how often the Solr Admin client \(used by JMX\) pings Solr if it goes away.


**Data dictionary options**

The indexing behavior of each property can be set in the content model. By default, they are indexed atomically. The property value is not stored in the index, and the property is tokenized when it is indexed.

The following example shows how indexing can be controlled.

-   **Enabled="false"**

    If this is false, there will be no entry for this property in the index.


-   **Atomic="true"**

    If this is true, the property is indexed in the transaction, if not the property is indexed in the background.


-   **facetable="true"**

    If true, the property will be used for faceting and if false, you cannot use it for faceting.


-   **Tokenised="true"**

    If "true", the string value of the property is tokenized before indexing.

    if "false", it is indexed "as is" as a single string.

    if "both" then both specified forms are in the index.


The tokenizer is determined by the property type in the data dictionary. This is locale sensitive as supported by the data dictionary, so you could switch to tokenize all your content in German. At the moment you cannot mix German and English tokenization.

```
<type name="cm:content">
   <title>Content</title>
     <parent>cm:cmobject</parent>
      <properties>
        <property name="cm:content">
          <type>d:content</type>
          <mandatory>false</mandatory>
           <index enabled="true">
             <facetable>true</facetable>
             <atomic>false</atomic>
             <tokenised>true</tokenised>
           </index>
        </property>
      </properties>
</type>
```

**Indexing defaults**

The effective indexing defaults for all properties are as follows:

```
<index enabled="true">
  <atomic>true</atomic>
  <stored>false</stored>
  <tokenised>true</tokenised>
</index>
...
```

**Indexing options**

If you want archive or zip files to be unzipped and the files included in the index, set the following property:

```
transformer.Archive.includeContents=true
```

The default setting is false.

**Parent topic:**[Configuring search](../concepts/solr-home.md)

