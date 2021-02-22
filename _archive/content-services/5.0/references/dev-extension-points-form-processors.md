# Form Processors

Custom Form Processor implementations can be implemented and integrated via a small amount of Spring configuration. Typically you will do this to support a new "kind" of form.

|Information|Form Processors|
|-----------|---------------|
|Support Status|[Full Support](http://docs.alfresco.com/support/concepts/su-product-lifecycle.html)|
|Architecture Information|[Platform Architecture](../concepts/dev-platform-arch.md)|
|Description|Custom Form Processor implementations can be implemented and integrated via a small amount of Spring configuration. Typically you will do this to support a new "kind" of form.

 If you simply wish to add a few extra fields to a Form, or want to support a new type of field, then you should probably consider using a Filter or Field Processor rather than implementing a new Form Processor.

 Form Processors have two primary functions:

 -   To generate a Form representing Items of a certain kind. This is implemented through the `generate(Item, List<String>, List<String>, Map<String, Object>)` method.
-   To create/update an object of a certain kind, based on a Form submission. This is implemented through the `persist(Item, FormData)` method.

 The `org.alfresco.repo.forms.processor.FormProcessor` interface has two other methods that are required by the `org.alfresco.repo.formFormService`:

 -   The `isApplicable(Item)` method is used to determine whether a `FormProcessor` is able to generate or persist Forms for a given Item.
-   The `isActive()` method is used to determine if a `FormProcessor` is currently active and available to generate or persist Forms.

 Several extensible `FormProcessor` classes are provided out-of-the-box that can be used as the basis for new custom form processor implementations:

 -   AbstractFormProcessor
-   AbstractWorkflowFormProcessor
-   ActionFormProcessor
-   NodeFormProcessor
-   ContentModelFormProcessor
-   TaskFormProcessor
-   TypeFormProcessor
-   FilteredFormProcessor
-   WorkflowFormProcessor

|
|Deployment - App Server| |
|Deployment - SDK Project| |
|More Information| |
|Sample Code|-   [Link to GitHub source code goes here](https://github.com/Alfresco/alfresco-sdk-samples/tree/alfresco-50/all-in-one/xxxxxxxxxxx)

|
|Tutorials|None|
|Alfresco Developer Blogs|None|

