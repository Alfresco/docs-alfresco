---
author: [Alfresco Documentation, Alfresco Documentation]
source: 
audience: 
category: [Alfresco Server, Administration, Configuration]
keyword: [solr, search, lucene]
---

# Aggregating content store

An Aggregating content store \(`AggregatingContentStore`\) is a content store implementation that aggregates a set of stores.

**Note:** The Aggregating content store is based upon the Replicating content store that was included in prior releases of Alfresco, but supports specifically the content aggregation use case, not content replication.

The Aggregating content store contains a primary store and a set of secondary stores. The order in which the stores appear in the list of participating stores is important. The first store in the list is known as the primary store. Content can be read from any of the stores, as if it were a single store. When the replicator goes to fetch content, the stores are searched from first to last. The stores should therefore, be arranged in order of speed.

For example, if you have a fast \(and expensive\) local disk, you can use this as your primary store for best performance. The old infrequently used files may be stored on lower cost, slower storage.

When replication is disabled, content is written to the primary store only. The other stores are used to retrieve content and the primary store is not updated with the content.

**Example configuration for tiered storage**

The following configuration defines an additional tiered storage solution. The default content store is not changed. An additional set of secondary stores is defined \(`tier1`, `tier2` and `tier3`\). As content ages \(old infrequently used files\), it can be moved to lower tiers. If the tiered storage is slow, a Caching content store can be placed in front.

1.  In your alfresco-global.properties file, define three new folder locations:
    -   dir.contentstore1=$\{dir.root\}/tier1
    -   dir.contentstore2=$\{dir.root\}/tier2
    -   dir.contentstore3=$\{dir.root\}/tier3
2.  Locate the <TOMCAT\_HOME\>/shared/classes/alfresco/extension/aggregating-store-context.xml.sample file.
3.  Remove the .sample extension from this file.

    The aggregating-store-context.xml file enables Aggregating content store. The content of this file is shown below. Place the aggregating-store-context.xml file in your <TOMCAT\_HOME\>/shared/classes/alfresco/extension folder.


```
<?xml version='1.0' encoding='UTF-8'?>
<!DOCTYPE beans PUBLIC '-//SPRING//DTD BEAN//EN' 'http://www.springframework.org/dtd/spring-beans.dtd'>

<!-- This file enables an aggregating content store. It should be placed in shared/classes/alfresco/extension -->

<beans>

  <bean id="defaultContentStore" class="org.alfresco.repo.content.filestore.FileContentStore">
      <constructor-arg>
         <value>${dir.contentstore}</value>
      </constructor-arg>
      
      <!-- Uncomment the property below to add content filesize limit.
      <property name="contentLimitProvider" ref="defaultContentLimitProvider"/>
      -->
  </bean>


  <bean id="tier1ContentStore" class="org.alfresco.repo.content.filestore.FileContentStore">
      <constructor-arg>
         <value>${dir.contentstore1}</value>
      </constructor-arg>
      
      <!-- Uncomment the property below to add content filesize limit.
      <property name="contentLimitProvider" ref="defaultContentLimitProvider"/>
      -->
  </bean>

  <bean id="tier2ContentStore" class="org.alfresco.repo.content.filestore.FileContentStore">
      <constructor-arg>
         <value>${dir.contentstore2}</value>
      </constructor-arg>
      
      <!-- Uncomment the property below to add content filesize limit.
      <property name="contentLimitProvider" ref="defaultContentLimitProvider"/>
      -->
  </bean>

  <bean id="tier3ContentStore" class="org.alfresco.repo.content.filestore.FileContentStore">
      <constructor-arg>
         <value>${dir.contentstore3}</value>
      </constructor-arg>
      
      <!-- Uncomment the property below to add content filesize limit.
      <property name="contentLimitProvider" ref="defaultContentLimitProvider"/>
      -->
  </bean>


  <!-- this is the aggregating content store - the name fileContentStore overrides the alfresco default store -->
  <bean id="fileContentStore"
       class="org.alfresco.repo.content.replication.AggregatingContentStore" >

      <property name="primaryStore" ref="defaultContentStore" />
      
      <property name="secondaryStores">
          <list>
              <ref bean="tier1ContentStore" />
              <ref bean="tier2ContentStore" />
              <ref bean="tier3ContentStore" />
          </list>
      </property>
      
  </bean>
</beans>
```

**Parent topic:**[Content store types](../concepts/cs-types.md)

