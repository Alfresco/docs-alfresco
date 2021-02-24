---
author: Alfresco Documentation
---

# Improving your Sub-Component Evaluations code

This tutorial improves your previous code by eliminating the hard-coded site name.

In the previous tutorial you conditionally displayed a component based on a hard-coded string \(the site URL\). In this tutorial you will improve your code to pass the site URL as a parameter.

1.  Update the aio/aio-share-jar/src/main/resources/alfresco/web-extension/site-data/extensions/aio-share-jar-example-widgets.xml file so that the Evaluator is configured as follows:

    ```
                                
    <evaluator type="beans.evaluator">      
       <params>
         <site>sample-site</site> 
       </params>
    </evaluator>   
    
    Note that the site to evaluate on is now passed as a parameter.
    ```

    **Note:**

    When setting Evaluator parameters, the element name is the parameter key and the element value is the parameter value. All the configured parameters will be passed as the `params` argument when the `evaluate` method is called. Parameters can also accept token substitution – so you could set a parameter of:

    ```
    <site>{site}</site>
    ```

    This would pass in whatever the name of the site was. This would cause the Evaluator to pass, regardless of the site dashboard being displayed.

2.  Modify `evaluate` method in the `SiteMembersEvaluator` class as follows:

    ```
    
                     
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


**Parent topic:**[Conditional Rendering \(Evaluators\)](../concepts/dev-extensions-share-tutorials-conditional-rendering-evaluations.md)

