---
author: [Alfresco Documentation, Alfresco Documentation]
audience: 
category: Customization
---

# Customizing the Activity Email Summary

The Activity Email Summary ignores certain activity types by default. Use this information to override the Spring bean definition to include these activity types.

The Spring bean definition for the ActivitiesFeed subsystem is called activities-feed-context.xml and can be downloaded from the Alfresco SVN: [activities-feed-context.xml](http://dev.alfresco.com/resource/AlfrescoOne/5.0/configuration/alfresco/subsystems/ActivitiesFeed/default/activities-feed-context.xml).

1.  Download the file and save to the <subsystems/ActivitiesFeed/default\> directory.

    The file contains the following bean override for the `file-previewed` and `file-downloaded` values:

    ```
    <?xml version='1.0' encoding='UTF-8'?>
    <beans xmlns="http://www.springframework.org/schema/beans"
     xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
     xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans-3.0.xsd">
     <bean id="feedModelBuilderPrototype" class="org.alfresco.repo.activities.feed.DefaultActivitiesFeedModelBuilder" scope="prototype">
     <property name="ignoredActivityTypes">
      <set>
       <value>org.alfresco.documentlibrary.file-previewed</value>
       <value>org.alfresco.documentlibrary.file-downloaded</value>
      </set>
     </property>
     </bean>
    </beans>
    ```

2.  Remove or comment out the following lines to include the `file-previewed` and `file-downloaded` entries in your Activity Email Summary:

    ```
    <property name="ignoredActivityTypes">
     <set>
     <value>org.alfresco.documentlibrary.file-previewed</value>
     <value>org.alfresco.documentlibrary.file-downloaded</value>
     </set>
    </property>
    ```

3.  Save your file.


**Parent topic:**[Customizing individual configuration items](../concepts/default-files-config.md)

