---
title: Evaluators Extension Point
---

Component visibility in the Share user interface can be controlled by Evaluators.

Architecture Information: [Share Architecture]({% link content-services/7.2/develop/software-architecture.md %}#sharearchitecture)

## Description

An evaluator is used by other extension points, such as Document Library Actions and Surf Extension Modules, to control 
when they should display or hide something. Custom evaluators are either configured or coded in Java. The following is 
an example of an evaluator that is configured as a Spring Bean:

```xml
<bean id="evaluator.doclib.metadata.hasExposure"
      parent="evaluator.doclib.action.propertyNotNull">  
   <property name="property" value="exif:exposureTime"/>
</bean>   
```

In this case a new custom evaluator with ID `evaluator.doclib.metadata.hasExposure` is created. It is based on the 
out-of-the-box `propertyNotNull` evaluator, which takes a `property` parameter with the content model property that 
should be checked for `null`. This evaluator is now ready to use in for example a Document Library Action definition.

If the evaluator is a bit more complex, and there is no existing evaluator that it can be based on, then we can implement 
the evaluator in Java as in the following example:

```java
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

```xml
<bean id="org.alfresco.training.evaluator.doclib.action.isEmailed"
          class="org.alfresco.training.documentlibrary.action.evaluator.CheckIfDocIsEmailedEvaluator" />
```

An evaluator is used by referring to it via the Spring Bean ID, as in the following example when declaring a Document Library Action:

```xml
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

Note here how you can `negate` the outcome of the evaluation. Which means that in this case we want to show the 
Send As Email document library action in the UI if an email has not been sent.

## Deployment - App Server

* `tomcat/shared/classes/alfresco/web-extension/custom-slingshot-application-context.xml` - the Spring Bean definition goes into this file

Custom evaluator implementations in Java does not lend themselves to be manually deployed into the application server. 

Use a Share JAR SDK project instead.

## Deployment All-in-One SDK project

* `aio/share-jar/src/main/resources/alfresco/web-extension/share-jar-slingshot-application-context.xml` - the Spring Bean definition goes into this file
* `aio/share-jar/src/main/java/{custom package path}` - the Java implementation of the evaluator goes into this directory

## More Information

* [See the Rating Extension Point for example evaluator]({% link content-services/7.2/develop/repo-ext-points/ratings.md %})
* [Predefined evaluators for Document Library]({% link content-services/7.2/develop/reference/share-document-library-ref.md %}#predefinedevaluatorsref)
* [Extension Module Deployment and Evaluators]({% link content-services/7.2/develop/share-ext-points/surf-extension-modules.md %}#moduledeployandevaluators)

## Tutorials

* [Creating a Custom Evaluator]({% link content-services/7.2/tutorial/share/rendering.md %}#createcustomevaluator)
* [Selecting an Evaluator for an Extension Module]({% link content-services/7.2/tutorial/share/rendering.md %}#selectingevaluator)
* [Sub-Component Evaluation]({% link content-services/7.2/tutorial/share/rendering.md %}#subcomponentevaluation)
* [Improving Sub-Component Evaluation]({% link content-services/7.2/tutorial/share/rendering.md %}#improvesubcomponenteval)

## Alfresco Developer Blogs

* [Sub component evaluations](https://hub.alfresco.com/t5/alfresco-content-services-blog/sub-component-evaluations/ba-p/292691){:target="_blank"}
