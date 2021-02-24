---
author: [Alfresco Documentation, Alfresco Documentation]
---

# CategoryService

Provides an API for creating and managing categories of nodes.

|Information|CategoryService|
|-----------|---------------|
|Support Status|[Full Support](http://docs.alfresco.com/support/concepts/su-product-lifecycle.html)|
|Architecture Information|[Platform Architecture](../concepts/dev-platform-arch.md)|
|Description|Categories provide a system for organizing content. Unlike tags, which have no hierarchical structure, and which can be created and applied by anyone, categories are created by the Administrator, and are hierarchical in nature. For example, You might have a Europe category, and then sub-categories such as France, Germany, Spain, and so on. The top Category in the hierarchical structure is known as the Root Category. The CategoryService API provides methods to perform actions such as the following:

 -   Create a Category
-   Create a root Category
-   Delete a Category
-   Create a Classification \(a grouping of Categories\)
-   Delete a Classification
-   Get most popular Categories

|
|Deployment - App Server|It is not likely that you will deploy Java extensions directly into a Tomcat application server as classes and Spring context files. Use an SDK build project instead.|
|[Deployment All-in-One SDK project](../concepts/sdk-getting-started.md).|-   Java source code: aio/platform-jar/src/main/java/\{domain specific package path\}
-   Spring beans: aio/platform-jar/src/main/resources/alfresco/module/platform-jar/context/service-context.xml

|
|Java API|[Java API documentation](http://dev.alfresco.com/resource/AlfrescoOne/5.1/PublicAPI/org/alfresco/service/cmr/search/CategoryService.html)|
|Java example|```

                  
// To create a root category:
NodeRef newRootCat = categoryService.createRootCategory(
      spacesStore, 
      ContentModel.ASPECT_GEN_CLASSIFIABLE, 
      "newRootCat");

// To create a category
NodeRef newCategory = categoryService.createCategory(newRootCat, "newCategory");

               
```

|
|More Information|-   [Tagging and Categorizing Content](../tasks/site-content-tag.md)
-   [Category Manager documentation](../tasks/admintools-catmanager.md)
-   [Java API - Access and Transaction Management documentation](dev-extension-points-public-java-api.md).

|

**Parent topic:**[Public Java API services](../concepts/dev-services.md)

