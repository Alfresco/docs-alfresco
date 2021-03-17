---
author: [Alfresco Documentation, Alfresco Documentation]
source: Professional Alfresco Book
audience: 
category: [Web Script, API/Script]
keyword: [java-backed web script, Folder Listing, service dependencies]
---

# Declaring service dependencies

The Spring bean is where service dependencies are declared.

The Folder Listing web script declares a single dependency on the `Repository` service as follows:

```
...
<bean id="webscript.org.example.javadir.get"
  class="org.example.JavaDir" parent="webscript">
** <property name="repository" ref="repositoryHelper"/\>**
</bean>
...
```

Each dependency is represented by a `<property>` element whose `name` attribute identifies the setter method to call and whose `ref` attribute identifies the service to depend on. The `ref` value is actually an ID of another bean. All Alfresco services are declared as beans, so can be injected in this way. In the example, repository maps to the `setRepository()` method and `repositoryHelper` maps to the bean representing the `Repository` service.

```
  ...
public class JavaDir extends DeclarativeWebScript
{
  ...
  public void **setRepository**(Repository repository)
  {
  ...
  }
}
```

Although this example only declares a single dependency, you may declare multiple dependencies. The Spring Framework calls setter methods during the initialization of the Java-backed web script, so all dependencies are resolved by the time the `executeImpl()` is invoked.

**Parent topic:**[Creating a Folder Listing Java-backed web script](../tasks/ws-folderListing-Java-scripting.md)

