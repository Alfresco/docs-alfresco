---
author: [Alfresco Documentation, Alfresco Documentation]
source: Professional Alfresco Book
audience: 
category: [Web Script, API/Script]
keyword: [java-backed web script, Folder Listing, Spring framework registration]
---

# Registering a Java-backed web script

You must register a Java-backed web script with the Web Script Framework through Spring Framework configuration, which supports the notion of a bean: a declaration of a Java class instance.

Each Java-backed web script is defined by its own bean declaration. For example, the Java Folder Listing web script is declared as follows:

```
...
  <beans>
...
  <bean id="webscript.org.example.javadir.get"
   class="org.example.JavaDir" parent="webscript">
...
  </bean>
...
</beans>
```

Spring beans have a unique identifier through their `id` attribute and construct an instance of the Java class as named through their `class` attribute. The Web Script Framework uses the following bean `id` naming convention for locating Java-backed web scripts:

`webscript.<web script package>.<web script id>.<http method>`

The `<web script package>`, `<web script id>`, and `<http method>` bind the Java class to the associated web script. The `class` attribute refers to the Java class implementing the Java-backed web script. Finally, all web script bean declarations must have the parent `‘webscript’`.

**Parent topic:**[Creating a Folder Listing Java-backed web script](../tasks/ws-folderListing-Java-scripting.md)

