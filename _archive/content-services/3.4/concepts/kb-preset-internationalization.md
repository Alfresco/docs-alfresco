---
author: [Alfresco Documentation, Alfresco Documentation, Alfresco Documentation]
source: Professional Alfresco Book
audience: 
category: [Knowledge Base, Alfresco Share]
keyword: [knowledge base, message bundle, developing]
---

# Overriding the default message bundle

To quickly provision your site for many different countries and languages, you can provide a message bundle for the Alfresco Share configuration. To do so, you need to wire in your own message bundle to Alfresco Share that overrides Alfresco Share’s default message bundle values.

1.  Define a Spring bean that overrides Alfresco Share's default message bundle so it includes your custom bundle.

```
<?xml version='1.0' encoding='UTF-8'?>
<!DOCTYPE beans PUBLIC '-//SPRING//DTD BEAN//EN' 
   'http://www.springframework.org/dtd/spring-beans.dtd'>

<beans>

   <bean id="webscripts.resources"   
         class="org.alfresco.i18n.ResourceBundleBootstrapComponent">

      <property name="resourceBundles">
         <list>
            <value>alfresco.messages.webscripts</value>
            <value>alfresco.messages.slingshot</value>
            **<value\>alfresco.web-extension.messages.kbsite</value\>**
         </list>
      </property>
   </bean>

</beans>
```

This Spring bean adds support for an additional message bundle called `kbsite.properties` located under web-extension/messages. In this message bundle, you might define the following key/value pairs:

```
page.kbSiteDashboard.title=Knowledge Base Site Dashboard
page.kbSiteDashboard.description=Knowledge Base site's dashboard page
title.kbSite=Knowledge Base Site
```

These are the same keys that the preset configuration and drop-down list web script were looking for. You can now fully internationalize your new site preset. You can provide bundles so that the Create Site wizard works for languages such as Spanish or Mandarin Chinese.

**Parent topic:**[Configuring custom site pages](../concepts/custom-site-about.md)

**Parent topic:**[Internationalization \(I18N\)](../concepts/ws-I18N.md)

