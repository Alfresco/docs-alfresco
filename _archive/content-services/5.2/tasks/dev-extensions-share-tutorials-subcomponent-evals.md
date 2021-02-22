---
author: Alfresco Documentation
---

# Sub-Component Evaluations

This tutorial explores Evaluations and introduces Evaluators, demonstrating how they are defined and used.

This tutorial assumes you have generated an [All-In-One SDK 3.0 Project](../concepts/sdk-getting-started.md).

This tutorial creates a module that **conditionally** renders the Site Members component on the site dashboard. If the site has a certain name the Site Members component will not be rendered.

1.  Open the file aio/aio-share-jar/src/main/resources/alfresco/web-extension/site-data/extensions/aio-share-jar-example-widgets.xml and add the following module definition:

    ```
    
    
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

    **Attention:** The Evaluator `type` attribute must map to a Spring bean ID defined in the application context. Therefore, you need to create this Evaluator and define it as a Spring bean.

2.  In the `aio/aio-share-jar/src/main/java/org/alfresco/tutorial` package create a new class called `SiteMembersEvaluator`.

3.  In the Package Explorer double-click the file SiteMembersEvaluator.java to load it into the Eclipse editor \(if not already showing\).

4.  Replace the code currently in SiteMembersEvaluator.java, with the following content:

    ```
    
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

    **Attention:** At this point your code will be showing compile errors. You will need to link in the required Spring Framework libraries.

    The Spring bean compares the site name with the hard-coded string “test-site” \(the site URL\). The returned result will be `true` if the site URL matches the hard-coded string, causing the evaluator to be true, thus preventing rendering of the Site Members component.

5.  Open the aio/aio-share-jar/src/main/resources/alfresco/web-extension/aio-share-jar-slingshot-application-context.xml file and add the Spring Bean configuration as follows:

    ```
    
    ...
    <beans>
    	<bean id="beans.evaluator" class="org.alfresco.tutorial.SiteMembersEvaluator" />
    </beans>
    
                            
    ```

    This configuration file maps the Java class to the Spring Bean ID.

6.  Build the project with maven. For example:

    ```
    
    /all-in-one$ mvn clean install alfresco:run                                                
                        
    ```

7.  Log in to Share and create two new sites: **Test Site** and **Sample Site**.

    As the new module has not yet been deployed, you will see the Site Members on both sites.

8.  Now go to the Module Deployment WebScript **http://localhost:8080/share/page/modules/deploy**.

9.  Deploy the new module, Module \(Conditionally Hide Site Members\), as described in previous tutorials.

    When you refresh the dashboard pages for the *Test Site* and *Sample Site* sites, you will see that the Site Members component is displayed for Sample Site, but not for the Test Site.


**Parent topic:**[Conditional Rendering \(Evaluators\)](../concepts/dev-extensions-share-tutorials-conditional-rendering-evaluations.md)

