---
author: Alfresco Documentation
---

# Bootstrapping Files/Spaces using XML

It is possible to bootstrap files and spaces by using XML files.

An alternative to the ACP import is to explicitly reference files through XML.

```

  
    <bean id="customSpacesBootstrap" parent="spacesStoreImporter" singleton="true" >
      <property name="useExistingStore">
        <value>${yourmodule.bootstrap.data}</value>
      </property>
      <property name="bootstrapViews">
        <list>
          <props>
            <prop key="path">/${spaces.company_home.childname}/${spaces.dictionary.childname}/${spaces.templates.email.childname}</prop>
            <prop key="location">alfresco/module/yourmodule/bootstrap/config_email_templates.xml</prop>
          </props>
        </list>
      </property>
    </bean>
    

```

In the code sample, config\_email\_templates.xml contains the actual file references, as well as all file and folder properties. All predetermined files and folders will be placed in the **Company Home/Data Dictionary/Email Templates** space.

**Property values**

|useExistingStore|If false the content will not be imported if the store exists|
|bootstrapViews|What you want to import and where it comes from|

It is convenient to use a global property value for the property `useExistingStore` in order to control bootstrapping on Alfresco Content Services startup. If the store does not yet exist \(the very first time a new Alfresco Content Services installation starts up\), the data will aways be bootstrapped, no matter the value, but from that moment on the store exists, and setting this to false means the next time Alfresco Content Services reboots these files will not be overridden with those on the classpath. Set it to true again and on the next reboot the classpath files are loaded.

XML imports can only replace/update/delete files that have their UUID set.

Examples of how to bootstrap data to other stores or to see all the available options, can be found in the file import-export-context.xml.

Another example is shown here:

```
 
 
    <view:view xmlns:view="http://www.alfresco.org/view/repository/1.0"
      xmlns:cm="http://www.alfresco.org/model/content/1.0" xmlns:app="http://www.alfresco.org/model/application/1.0"
      xmlns:emailserver="http://www.alfresco.org/model/emailserver/1.0">
      
      <cm:folder view:childName="cm:My First Folder">
        <app:uifacets />
        <cm:name>My First Folder</cm:name>
        <app:icon>space-icon-default</app:icon>
        <cm:title>My First Folder</cm:title>
        <cm:description></cm:description>
        <cm:contains>
          <cm:content view:childName="cm:custom_email_template.ftl">
            <view:aspects>
              <cm:titled />
              <cm:author />
              <app:inlineeditable />
            </view:aspects>
            <view:properties>
              <app:editInline>true</app:editInline>
              <cm:description>This is a custom email template.</cm:description>
              <cm:content>contentUrl=classpath:alfresco/module/yourmodule/bootstrap/custom_email_template.ftl|mimetype=text/plain|size=|encoding=UTF-8|locale=en_US_</cm:content>
              <cm:title>My first email template</cm:title>
              <cm:author>Me</cm:author>
              <cm:name>custom_email_template.ftl</cm:name>
            </view:properties>
            <view:associations></view:associations>
          </cm:content>
        </cm:contains>
      </cm:folder>
    </view:view>


```

In the code sample, you see a folder is being added, containing a single Freemarker template file. You can add multiple files and folders on the top level, or in sub-folders this way. Aspects can also be set on the new folder. Another example can be found in the file config/alfresco/bootstrap/spaces.xml. The bootstrap directory also contains many other examples.

**Parent topic:**[Bootstrap content](../references/dev-extension-points-bootstrap.md)

