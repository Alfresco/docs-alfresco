---
author: [Alfresco Documentation, Alfresco Documentation]
source: Professional Alfresco Book
audience: 
category: [Knowledge Base, Developer]
option: knowledge base
---

# Applying property constraints

Property constraints let you specify checks that must pass before the property value is considered valid and safe for persistence. Constraints fire when the property values change. A content item must have all of its constraints pass before it can be created or saved.

Default constraint types to use in your content model include regular expression evaluators and value lists. You can also write your own constraint implementations. Large projects use custom constraints to perform complex lookups in third-party databases or services to assert the correctness of property values.

This example uses default out-of-the-box constraints to ensure the validity of any content marked with your aspects.

1.  Declare two constraints that specify the valid values for `kb:status` and `kb:articletype`.

    ```
    <constraints>
       <constraint name="kb:status_constraint" type="LIST">
          <parameter name="allowedValues">
             <list>
                <value>Draft</value>
                <value>Pending Approval</value>
                <value>Current</value>
                <value>Archived</value>
             </list>
          </parameter>
       </constraint>
       <constraint name="kb:articletype_constraint" type="LIST">
          <parameter name="allowedValues">
             <list>
                <value>Any</value>
                <value>Article</value>
                <value>FAQ</value>
                <value>White Paper</value>
             </list>
          </parameter>
       </constraint>
    </constraints>
    ```

2.  Modify the property declarations on your aspects to tell your properties to use these as property constraints.

    ```
    <property name="kb:status">
       <title>Status</title>
       <type>d:text</type>
       <default>Draft</default>
       <constraints>
          <constraint ref="kb:status_constraint" />
       </constraints>
    </property>
    <property name="kb:articletype">
       <title>Article Type</title>
       <type>d:text</type>
       <default>Article</default>
       <constraints>
          <constraint ref="kb:articletype_constraint" />
       </constraints>
    </property>
    ```

    By putting the content model together, you effectively inform the Alfresco repository how to manage the interaction and persistence of Knowledge Base assets.


**Parent topic:**[Defining a content model for metadata](../tasks/kb-model-define.md)

