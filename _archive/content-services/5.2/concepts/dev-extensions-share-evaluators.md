---
author: Alfresco Documentation
---

# Evaluators

Component visibility in the Share user interface can be controlled by Evaluators.

|Extension Point|Evaluators|
|---------------|----------|
|Support Status|[Full Support](http://docs.alfresco.com/support/concepts/su-product-lifecycle.html)|
|Architecture Information|[Share Architecture](dev-extensions-share-architecture-extension-points.md).|
|Description|An evaluator is used by other extension points, such as Document Library Actions and Surf Extension Modules, to control when they should display or hide something. Custom evaluators are either configured or coded in Java. The following is an example of an evaluator that is configured as a Spring Bean:

 ```
<bean id="evaluator.doclib.metadata.hasExposure"
      parent="evaluator.doclib.action.propertyNotNull">  
   <property name="property" value="exif:exposureTime"/>
</bean>   
```

In this case a new custom evaluator with ID `evaluator.doclib.metadata.hasExposure` is created. It is based on the out-of-the-box `propertyNotNull` evaluator, which takes a `property` parameter with the content model property that should be checked for `null`. This evaluator is now ready to use in for example a Document Library Action definition.

If the evaluator is a bit more complex, and there is no existing evaluator that it can be based on, then we can implement the evaluator in Java as in the following example:

 ```
import org.alfresco.error.AlfrescoRuntimeException;
import org.alfresco.web.evaluator.BaseEvaluator;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;

public class CheckIfDocIsEmailedEvaluator extends BaseEvaluator {
    private static Log logger = LogFactory.getLog(CheckIfDocIsEmailedEvaluator.class);
    private static final String ASPECT_EMAILED = "cm:emailed";

    @Override
    public boolean evaluate(JSONObject jsonObject) {
        try {
            JSONArray nodeAspects = getNodeAspects(jsonObject);
            if (nodeAspects == null) {
                logger.info("No aspects found");
                return false;
            } else {
                if (nodeAspects.contains(ASPECT_EMAILED)) {
                    logger.info("Has been emailed");
                    return true;
                } else {
                    logger.info("Has NOT been emailed");
                    return false;
                }
            }
        } catch (Exception err) {
            throw new AlfrescoRuntimeException("JSONException whilst running action evaluator: " + err.getMessage());
        }
    }
}
```

This evaluator needs to be declared as a Spring bean too as follows:

 ```
<bean id="org.alfresco.training.evaluator.doclib.action.isEmailed"
          class="org.alfresco.training.documentlibrary.action.evaluator.CheckIfDocIsEmailedEvaluator" />
    
```

 An evaluator is used by referring to it via the Spring Bean ID, as in the following example when declaring a Document Library Action:

 ```
<action id="org.alfresco.training.doclib.action.sendAsEmail"
        icon="email"
        type="javascript"
        label="actions.training.alfresco.sendAsEmail">
    <param name="function">onActionFormDialog</param>
    <param name="itemKind">action</param>
    <param name="itemId">send-as-email</param>
    <param name="mode">create</param>
    <param name="destination">{node.nodeRef}</param>
    <param name="successMessage">message.send-as-email.success</param>
    <param name="failureMessage">message.send-as-email.failure</param>
    <evaluator negate="true">org.alfresco.training.evaluator.doclib.action.isEmailed</evaluator>
</action>    
```

Note here how you can `negate` the outcome of the evaluation. Which means that in this case we want to show the Send As Email document library action in the UI if an email has not been sent.

|
|Deployment - App Server|tomcat/shared/classes/alfresco/web-extension/custom-slingshot-application-context.xml - the Spring Bean definition goes into this fileCustom evaluator implementations in Java does not lend themselves to be manually deployed into the application server. Use a Share JAR project instead.

|
|[Deployment All-in-One SDK project](sdk-getting-started.md).|-   aio/share-jar/src/main/resources/alfresco/web-extension/share-jar-slingshot-application-context.xml - the Spring Bean definition goes into this file
-   aio/share-jar/src/main/java/\{custom package path\} - the Java implementation of the evaluator goes into this directory

|
|More Information|-   [See the Rating Extension Point for example evaluator](../references/dev-extension-points-ratings.md)
-   [Predefined evaluators for Document Library](doclib-predefined-evaluators-reference.md)
-   [Configuring Evaluators for the Document Library](doclib-override-extension-examples.md)
-   [Extension Module Deployment and Evaluators](dev-extensions-share-module-deployment.md)

|
|Tutorials|-   [Creating a Custom Evaluator](../tasks/dev-extensions-share-tutorials-custom-evaluator.md)
-   [Selecting an Evaluator for an Extension Module](../tasks/dev-extensions-share-tutorials-select-evaluator.md)
-   [Sub-Component Evalution](../tasks/dev-extensions-share-tutorials-subcomponent-evals.md)
-   [Improving Sub-Component Evalution](../tasks/dev-extensions-share-tutorials-subcomponent-evals-improving.md)

|
|Alfresco Developer Blogs|-   [Sub component evaluations](https://hub.alfresco.com/t5/alfresco-content-services-blog/sub-component-evaluations/ba-p/292691)

|

**Parent topic:**[Share Extension Points](../concepts/dev-extensions-share-extension-points-introduction.md)

