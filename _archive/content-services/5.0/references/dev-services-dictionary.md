# DictionaryService

This service represents the Repository Data Dictionary. The dictionary provides access to content meta-data such as Type and Aspect descriptions. Content meta-data is organised into models where each model is given a qualified name. This means that it is safe to develop independent models and bring them together into the same Repository without name clashes \(as long their namespace is different\).

|Information|DictionaryService|
|-----------|-----------------|
|Support Status|[Full Support](http://docs.alfresco.com/support/concepts/su-product-lifecycle.html)|
|Architecture Information|[Platform Architecture](../concepts/dev-platform-arch.md)|
|Description|The DictionaryService provides access to the entire content meta-model. The content meta-model contains information of Types, DataTypes, Properties, Aspects, Associations and Constraints. Operations supported include: -   Get DataTypes, Types, Associations, Properties, Constraints, Classes from a Content Model.
-   Check if a class is a sub-class.
-   Get SubTypes and SubAspects.

|
|Deployment - App Server|Deploy as AMP or Simple Module \(JAR\) package.|
|Deployment - SDK Project|Use SDK archetypes to produce AMP or Simple Module.|
|Java API|[Java API Documentation](http://dev.alfresco.com/resource/docs/java/org/alfresco/service/cmr/dictionary/DictionaryService.html)|
|Java example|```

                  
/**
     * Determines whether one class is a sub type of an other.  Returns true if it is, false otherwise.
     * 
     * @param clazz         the class to test
     * @param subTypeOf     test whether the class is a sub-type of this class
     * @return boolean      true if it is a sub-class, false otherwise
     */
    public boolean isSubTypeOf(final String clazz, final String subTypeOf)
    {
    	Boolean result = this.session.doSessionWork(new SessionWork<Boolean>()
    	{
			public Boolean doWork() 
			{
		        // Convert to full names if required
		        String fullClazz = DataDictionary.this.session.getNamespaceMap().getFullName(clazz);
		        String fullSubTypeOf = DataDictionary.this.session.getNamespaceMap().getFullName(subTypeOf);
		        
		        // Create the QNames for the passes classes
		        QName className = QName.createQName(fullClazz);
		        QName ofClassName = QName.createQName(fullSubTypeOf);
		        
		        // Return the result
		        return new Boolean(DataDictionary.this.dictionaryService.isSubClass(className, ofClassName));
			}
    	});
    	
    	return result.booleanValue();
    }                  

               
```

|
|More Information|-   [Content Model Extension Point](dev-extension-points-content-model.md)
-   [Java API - Access and Transaction Management documentation](dev-extension-points-public-java-api.md).

|
|Tutorials|None|
|Alfresco Developer Blogs|None|

