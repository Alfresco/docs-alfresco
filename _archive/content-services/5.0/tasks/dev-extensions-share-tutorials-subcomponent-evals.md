---
author: Alfresco Documentation
---

# Sub-Component Evaluations

This tutorial explores Evaluations and introduces Evaluators, demonstrating how they are defined and used.

This tutorial assumes you have completed the previous two tutorials. This tutorial also assumes you have downloaded and installed the [Spring Framework](http://projects.spring.io/spring-framework/), and have access to the library files included with the distribution.

This tutorial creates a module that **conditionally** renders the Site Members component on the site dashboard. If the site has a certain name the Site Members component will not be rendered.

1.  Load the file config/alfresco/site-data/extensions/extension-modules.xml into the Eclipse editor and add the following module definition:

    ```
    
     
    <extension>
        <modules>
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

2.  In the Eclipse Package Explorer, right-click on the `src/java` folder and create a new package called `beans`.

3.  In the `beans` package create a new class called `SiteMembersEvaluator`.

4.  In the Package Explorer double-click the file SiteMembersEvaluator.java to load it into the Eclipse editor \(if not already showing\).

5.  Replace the code currently in SiteMembersEvaluator.java, with the following content:

    ```
    
    
    package beans;
    import java.util.Map;
    import org.springframework.extensions.surf.RequestContext;
    import org.springframework.extensions.surf.extensibility.impl.
      DefaultSubComponentEvaluator;
    
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

6.  Right-click on the `ShareExtensions` folder in the Package Explorer and select **Build Path** \> **Configure Build Path**.

7.  Click on the **Libraries** tab.

8.  Click **Add External JARS...**

9.  Browse to the directory that contains the Spring Framework.

10. Browse to the libs sub-folder.

11. Select all JARs.

12. Click OK.

    You will be returned to the ShareExtensions Properties dialog.

13. Click OK again.

    You project will now compile cleanly, and will not show any errors.

14. In the Package Explorer navigate to your `src/main/amp/config` folder and create the following folder hierarchy:

    ```
    
    org/springframework/extensions/surf                        
                        
    ```

15. In the newly created folder org/springframework/extensions/surf create a new file called spring-surf-extensibility-context.xml

    Any file that fits the pattern **org/springframework/extensions/surf/\*-context\*** will get processed so that it will be included in the application context.

16. Ensure this file contains the following:

    ```
    
    
    ﻿<?xml version="1.0" encoding="UTF-8"?>
    <!DOCTYPE beans PUBLIC '-//SPRING//DTD BEAN//EN' 'http://www.springframework.org/dtd/spring-beans.dtd'>
    <beans>
    	<bean id="beans.evaluator" class="beans.SiteMembersEvaluator" />
    </beans>
    
                            
    ```

    This configuration file maps the Java class to the Spring Bean ID.

17. Build the project with maven. For example:

    ```
    
    /all-in-one$ mvn clean install -Prun                                                
                        
    ```

18. Log in to Alfresco Share and create two new sites: **Test Site** and **Sample Site**.

    As the new module has not yet been deployed, you will see the Site Members on both sites.

19. Now go to the Module Deployment WebScript **http://localhost:8080/share/page/modules/deploy**.

20. Deploy the new module, Module \(Conditionally Hide Site Members\), as described in previous tutorials.

    When you refresh the dashboard pages for the *Test Site* and *Sample Site* sites, you will see that the Site Members component is displayed for Sample Site, but not for the Test Site.


**Parent topic:**[Conditional Rendering \(Evaluators\)](../concepts/dev-extensions-share-tutorials-conditional-rendering-evaluations.md)

