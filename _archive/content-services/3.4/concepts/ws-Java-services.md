---
author: [Alfresco Documentation, Alfresco Documentation]
source: Professional Alfresco Book
audience: 
category: [Web Script, API/Script]
keyword: [java-backed web script, APi/Script, Folder Listing, services call]
---

# Calling Alfresco services

As a Java-backed web script, all services provided by the Alfresco content application server are available for use. Any Java API within the server process, subject to security controls, is accessible.

Access to services is provided through Dependency Injection \(DI\); instead of the Java-backed web script locating its dependent services, the dependent services are handed to the web script.

Alfresco employs the Spring Framework for its Dependency Injection capabilities. This means that dependencies are specified in a separate XML configuration file as part of the Java-backed web script registration. For each dependency, the Java-backed web script provides a setter method for accepting a reference to the dependent service. The Spring Framework invokes each of the setter methods with the appropriate configured dependency during the initialization of the Java-backed web script. By the time the web script is executed, all dependent services are available within the `executeImpl()` method.

Your Folder Listing web script must locate the folder within the Alfresco content repository, identified by the `folderpath` token. To accomplish this, the web script injects a Repository service that provides some simple content repository access capabilities.

```
. . .
public class JavaDir extends DeclarativeWebScript
{
  private Repository repository;
  public void setRepository(Repository repository)
  {
    this.repository = repository;
  }
  protected Map<String, Object> executeImpl(WebScriptRequest req,
    Status status, Cache cache)
  {
   . . .
   String nodePath = "workspace/SpacesStore/" + folderPath;
   NodeRef folder = repository.findNodeRef("path", nodePath.split("/"));
   . . .
   }
}
```

**Parent topic:**[Creating a Folder Listing Java-backed web script](../tasks/ws-folderListing-Java-scripting.md)

