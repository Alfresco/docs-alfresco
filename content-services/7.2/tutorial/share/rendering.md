---
title: Conditional Rendering (Evaluators) Tutorials
---

Tutorials related to conditional rendering of content and operations. We call this evaluations and implementation of evaluators.

## Sub-Component Evaluations {#subcomponentevaluation}

This tutorial explores Evaluations and introduces Evaluators, demonstrating how they are defined and used.

This tutorial assumes you have created a new [SDK All-In-One]({% link content-services/7.2/develop/sdk.md %}#workingaio) project.

This tutorial creates a module that **conditionally** renders the Site Members component on the site dashboard. If the 
site has a certain name the Site Members component will not be rendered.

1.  Open the file `aio/aio-share-jar/src/main/resources/alfresco/web-extension/site-data/extensions/aio-share-jar-example-widgets.xml` and add the following module definition:

    ```xml
    <extension>
        <modules>
        ...
            <module>
              <id>Module  (Conditionally Hide Site Members)</id>
                <components>
                   <component>
                      <region-id>component-1-1</region-id>
                      <source-id>site/{site}/dashboard</source-id>
                      <scope>page</scope>
                      <sub-components>
                         <sub-component id="default">
                            <evaluations>
                              <evaluation id="HideIfTestSite">
                                <evaluators>
                                     <evaluator type="beans.evaluator" ></evaluator>
                                 </evaluators>
                                  <render>false</render>
                              </evaluation>
                             </evaluations>
                           </sub-component>
                       </sub-components>
                    </component>
                </components>
            </module>
        </modules>
    </extension>
             
    ```

    Site dashboards are similar to user dashboards in that a new configuration is created from a preset for each new site. This means you need to target your Component using the `site` parameter.

    >**Note:** The Evaluator `type` attribute must map to a Spring bean ID defined in the application context. Therefore, you need to create this Evaluator and define it as a Spring bean.

2.  In the `aio/aio-share-jar/src/main/java/org/alfresco/tutorial` package create a new class called `SiteMembersEvaluator`.

3.  In the Package Explorer double-click the file `SiteMembersEvaluator.java` to load it into the Eclipse editor (if not already showing).

4.  Replace the code currently in `SiteMembersEvaluator.java`, with the following content:

    ```java
    package org.alfresco.tutorial;
    import java.util.Map;
    import org.springframework.extensions.surf.RequestContext;
    import org.springframework.extensions.surf.extensibility.impl.DefaultSubComponentEvaluator;
    
    public class SiteMembersEvaluator  extends DefaultSubComponentEvaluator
    {
         public boolean evaluate(RequestContext context, Map<String, String> params)
         {
                boolean result;
                String site = context.getUriTokens().get( "site" );
                if (site ==  null )
                {
                    site = context.getParameter( "site" );
                 }
                 result = (site !=  null && site.equals( "test-site" ));
                 return result;
         }
    }
    ```

    >**Note:** At this point your code will be showing compile errors. You will need to link in the required Spring Framework libraries.

    The Spring bean compares the site name with the hard-coded string “test-site” (the site URL). The returned result will be `true` if the site URL matches the hard-coded string, causing the evaluator to be true, thus preventing rendering of the Site Members component.

5.  Open the `aio/aio-share-jar/src/main/resources/alfresco/web-extension/aio-share-jar-slingshot-application-context.xml` file and add the Spring Bean configuration as follows:

    ```xml
    ...
    <beans>
    	<bean id="beans.evaluator" class="org.alfresco.tutorial.SiteMembersEvaluator" />
    </beans>
    ```

    This configuration file maps the Java class to the Spring Bean ID.

6.  Build the project with maven. For example:

    ```bash
    /all-in-one$ ./run.sh build_start                                                
    ```

7.  Log in to Share and create two new sites: **Test Site** and **Sample Site**.

    As the new module has not yet been deployed, you will see the Site Members on both sites.

8.  Now go to the Module Deployment WebScript `http://localhost:8080/share/page/modules/deploy`.

9.  Deploy the new module, Module (Conditionally Hide Site Members), as described in previous tutorials.

    When you refresh the dashboard pages for the *Test Site* and *Sample Site* sites, you will see that the Site Members component is displayed for Sample Site, but not for the Test Site.

## Improving your Sub-Component Evaluations code {#improvesubcomponenteval}

This tutorial improves your previous code by eliminating the hard-coded site name.

In the previous tutorial you conditionally displayed a component based on a hard-coded string (the site URL). In this 
tutorial you will improve your code to pass the site URL as a parameter.

1.  Update the `aio/aio-share-jar/src/main/resources/alfresco/web-extension/site-data/extensions/aio-share-jar-example-widgets.xml` file so that the Evaluator is configured as follows:

    ```xml
    <evaluator type="beans.evaluator">      
       <params>
         <site>sample-site</site> 
       </params>
    </evaluator>   
    ```

    >**Note:** The site to evaluate on is now passed as a parameter.

    When setting Evaluator parameters, the element name is the parameter key and the element value is the parameter value. All the configured parameters will be passed as the `params` argument when the `evaluate` method is called. Parameters can also accept token substitution – so you could set a parameter of:

    ```xml
    <site>{site}</site>
    ```

    This would pass in whatever the name of the site was. This would cause the Evaluator to pass, regardless of the site dashboard being displayed.

2.  Modify `evaluate` method in the `SiteMembersEvaluator` class as follows:

    ```java
    public boolean evaluate(RequestContext context, Map<String, String> params)   
    {        
        boolean result;        
        String site = context.getUriTokens().get( "site" );        
        if (site ==  null )        
        {            
           site = context.getParameter( "site" );        
         }          
         String targetSite = params.get( "site" );        
         result = (site !=  null && site.equals(targetSite));        
         return result;   
    }     
    ```

3.  Rebuild and redeploy the JAR by running the project build file.

4.  Restart the application server.

    You will now see that when you visit **Sample Site** the Site Members component is hidden and when visiting the **Test Site** site the Site Members component is displayed.

## Selecting an evaluator {#selectingevaluator}

This tutorial demonstrates how to select an evaluator.

This tutorial assumes you have at least one module deployed (it can be any of the modules you created in previous tutorials).

When a module is deployed it is evaluated before being processed. This evaluation determines whether or not the module 
is to be executed. By default the default evaluator, `default.extensibility.evaluator` is applied to determine if the 
module should be executed. However, it is possible to select a different evaluator to be applied, from a list of 
provided evaluators, or a custom coded evaluator. This can be done through configuration or through the Share 
Module Deployment user interface. This tutorial looks at how this is achieved in practice.

1.  In your browser navigate to `﻿http://localhost:8080/share/page/modules/deploy`.

    Your modules and deployed modules will be displayed.

2.  Ensure that at least one module is deployed.

3.  Click on the deployed module and the Evaluator selector will appear to the right.

4.  In the Evaluator list box select the `config.approval.evaluator` evaluator.

    The evaluator properties will be displayed. In this case the `config.approval.evaluator` evaluator has the key `apply`. For this evaluator if the `apply` key is set to `true` the module will be processed. If, however the `apply` key is set to `false` the module will not be processed.

5.  Set the `apply` key to `false`.

6.  Click **Update** to register your changes.

7.  Click **Apply Changes** to have your changes saved to the database.

8.  Now, in another tab, browse to your dashboard to see if the module is applied or not.

    You will see that the module is no longer processed.

9.  Now back in the Module Deployment tab set the evaluator apply key to true.

10. Click **Update**.

11. Click **Apply Changes**.

12. Navigate back to your dashboard tab and refresh.

    You will now see that your module is applied again.

You have seen how to use the Share Module Deployment page to set an evaluator for a module. This can also be achieved 
through configuration. In the module configuration file (`extension-modules.xml` in previous tutorials) you would add 
some XML to apply the evaluator:

```xml
...
<module>
    <id>Module (New Content)</id>
    <evaluator type="config.approval.evaluator">
        <params>
            <apply>false</apply>
        </params>
    </evaluator>
...
```

## Creating a custom evaluator {#createcustomevaluator}

This tutorial demonstrates how to create a custom evaluator. You will create a custom evaluator class, wire it into 
Alfresco as a Spring bean, and learn how to use evaluator properties.

This tutorial assumes you have completed previous tutorials. This tutorial assumes you will be using the `admin` account. 
For testing convenience it will be useful if you create another user account before starting this tutorial.

In the previous tutorial you saw that the provided evaluators can be applied to a module. Different modules can have 
different evaluators applied to them. As well as using the provided evaluators, it is possible to create your own 
custom evaluator. This tutorial shows how to create a simple custom evaluator.

1.  In the `aio/aio-share-jar/src/main/java/org/alfresco/tutorial` package create a new class called `SimpleModuleEvaluator`.

2.  Add the following code to the class:

    ```java
    package org.alfresco.tutorial;
    
    import java.util.Map;
    
    import org.springframework.extensions.surf.RequestContext;
    import org.springframework.extensions.surf.extensibility.ExtensionModuleEvaluator;
    
    public class SimpleModuleEvaluator implements ExtensionModuleEvaluator
    {
        public static final String USER_PROP = "user";
    
        public boolean applyModule(RequestContext context, Map<String, String> evaluationProperties)
        {
            String currUser = context.getUser().getId();
            String targetUser = evaluationProperties.get(USER_PROP);
            return (targetUser != null && targetUser.equals(currUser));
        }
    
        public String[] getRequiredProperties()
        {
            return new String[] { USER_PROP};
        }
    }
    ```

3.  Open the `aio/aio-share-jar/src/main/resources/alfresco/web-extension/aio-share-jar-slingshot-application-context.xml` file.

4.  Add a bean for your new evaluator:

    ```xml
    <?xml version="1.0" encoding="UTF-8"?>
    <!DOCTYPE beans PUBLIC '-//SPRING//DTD BEAN//EN' 'http://www.springframework.org/dtd/spring-beans.dtd'>
    <beans>
    	<bean id="beans.evaluator" class="beans.SiteMembersEvaluator" />
    	**<bean id="beans.simple.module.evaluator" class="org.alfresco.tutorial.SimpleModuleEvaluator" />**
    </beans>
    ```

5.  Rebuild your project using the Ant build script as done in previous tutorials.

6.  Restart your application server.

7.  In a browser tab navigate to `﻿http://localhost:8080/share/page/modules/deploy`.

8.  Click on a deployed module, to display the list of evaluators.

9.  From the list of evaluators select the evaluator, `beans.simple.module.evaluator`.

    You will see the evaluator property “user”.

    >**Important:** If you do not see the properties then try the following: close the Module Deployment tab. Create a new tab. Reload the Module Deployment page.

10. Set the `user` evaluator property to `admin`.

11. Click **Update**.

12. Click **Apply Changes**.

13. In another tab navigate to the admin dashboard.

    You will see that the module has been applied.

14. Log out from the admin account and log into another account.

    On the new user account dashboard you will see that the module is **not** applied. This is because the module was applied conditionally to the user; the module is only applied for the admin user, as was set by using the evaluator property.

