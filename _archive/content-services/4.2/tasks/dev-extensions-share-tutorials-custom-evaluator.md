---
author: Alfresco Documentation
---

# Creating a custom evaluator

This tutorial demonstrates how to create a custom evaluator. You will create a custom evaluator class, wire it into Alfresco as a Spring bean, and learn how to use evaluator properties.

This tutorial assumes you have completed previous tutorials. This tutorial assumes you will be using the `admin` account. For testing convenience it will be useful if you create another user account before starting this tutorial.

In the previous tutorial you saw that the provided evaluators can be applied to a module. Different modules can have different evaluators applied to them. As well as using the provided evaluators, it is possible to create your own custom evaluator. This tutorial shows how to create a simple custom evaluator.

1.  In Eclipse Package Explorer create a new class in the `beans` package called `SimpleModuleEvaluator`.

2.  Add the following code to the class:

    ```
    
    ﻿package beans;
    
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

3.  In Package Explorer expand the org/springframework/extensions/surf folder to locate your spring-surf-extensibility-context.xml file.

4.  Add a bean for your new evaluator:

    ```
    
    ﻿<?xml version="1.0" encoding="UTF-8"?>
    <!DOCTYPE beans PUBLIC '-//SPRING//DTD BEAN//EN' 'http://www.springframework.org/dtd/spring-beans.dtd'>
    <beans>
    	<bean id="beans.evaluator" class="beans.SiteMembersEvaluator" />
    	**<bean id="beans.simple.module.evaluator" class="beans.SimpleModuleEvaluator" /\>**
    </beans>
    
    ```

5.  Rebuild your project using the Ant build script as done in previous tutorials.

6.  Restart your application server.

7.  In a browser tab navigate to `﻿http://localhost:8080/share/page/modules/deploy`.

8.  Click on a deployed module, to display the list of evaluators.

9.  From the drop-down list of evaluators select the evaluator, `beans.simple.module.evaluator`.

    You will see the evaluator property “user”.

    **Attention:** If you do not see the properties then try the following: close the Module Deployment tab. Create a new tab. Reload the Module Deployment page.

10. Set the `user` evaluator property to `admin`.

11. Click **Update**.

12. Click **Apply Changes**.

13. In another tab navigate to the admin dashboard.

    You will see that the module has been applied.

14. Log out from the admin account and log into another account.

    On the new user account dashboard you will see that the module is **not** applied. This is because the module was applied conditionally to the user - the module is only applied for the admin user, as was set via the evaluator property.

15. 
**Parent topic:**[Tutorials](../concepts/dev-extensions-share-tutorials.md)

