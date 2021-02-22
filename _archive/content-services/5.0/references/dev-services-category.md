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
|Deployment - App Server|Deploy as AMP or Simple Module \(JAR\) package.|
|Deployment - SDK Project|Use SDK archetypes to produce AMP or Simple Module.|
|Java API|[Java API Documentation](http://dev.alfresco.com/resource/docs/java/org/alfresco/service/cmr/search/CategoryService.html)|
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
-   [Category Manager Documentation](../tasks/admintools-catmanager.md)
-   [Java API - Access and Transaction Management documentation](dev-extension-points-public-java-api.md).

|
|Tutorials|None|
|Alfresco Developer Blogs|None|

