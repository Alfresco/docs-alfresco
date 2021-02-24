# AttributeService

This provides services for reading, writing, and querying global attributes.

|Information|AttributeService|
|-----------|----------------|
|Support Status|[Full Support](http://docs.alfresco.com/support/concepts/su-product-lifecycle.html)|
|Architecture Information|[Platform Architecture](../concepts/dev-platform-arch.md)|
|Description|Attributes are a system-wide storage system. Attributes typically have up to three keys \(known as a key set\) and a value. Attributes are stored in the database \(rather than the repository\). An example of use is for persisting system-wide JMX configuration properties in Alfresco Enterprise.The AttributeService provides a Java interface for creating and managing Attributes, including such operations as:

 -   Getting a collection of Attributes
-   Getting a single Attribute
-   Creating an Attribute
-   Removing an Attribute
-   Removing a collection of Attributes

 Collections of Attributes can be processed on retrieval by implementing a callback handler object. The callback handler object's `handleAttribute` method is invoked for each Attribute retrieved.

|
|Deployment - App Server|Deploy as AMP or Simple Module \(JAR\) package.|
|Deployment - SDK Project|Use SDK archetypes to produce AMP or Simple Module.|
|Java API|[Java API Documentation](http://dev.alfresco.com/resource/docs/java/org/alfresco/service/cmr/attributes/AttributeService.html)|
|Java example|For examples see how [email aliases are stored](https://github.com/Alfresco/community-edition/blob/master/projects/repository/source/java/org/alfresco/email/server/AliasableAspect.java) and also [here](https://github.com/Alfresco/community-edition/blob/master/projects/repository/source/java/org/alfresco/email/server/EmailServiceImpl.java). You can also see an [example in the Repo Usage Component](https://github.com/Alfresco/community-edition/blob/master/projects/repository/source/java/org/alfresco/repo/usage/RepoUsageComponentImpl.java) implementation.|
|More Information|-   [Tech Talk Live video](https://www.youtube.com/watch?v=obQ_89MFtRs)
-   [AttributeService Primer video](https://vimeo.com/67580571)
-   [Java API - Access and Transaction Management documentation](dev-extension-points-public-java-api.md).

|
|Tutorials|None|
|Alfresco Developer Blogs|None|

