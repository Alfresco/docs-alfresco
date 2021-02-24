---
author: Alfresco Documentation
---

# Custom rule expression functions

The rule engine uses MVEL as an expression language. In addition to the build in MVEL expression functions there are some additional custom expression functions provided. These are accessible through the structured expression editor within the decision table editor.

The provided custom methods can be overridden by your own custom expression functions or custom methods can be added. This is possible via a hook point in the rule engine configuration \(see [Rule engine configuration configurer](rule_engine_configuration_configurer.md)\).

You can configure the Engine with additional expression functions by implementing *CustomExpressionFunctionRegistry*.

**interface**: com.activiti.dmn.engine.impl.mvel.config.CustomExpressionFunctionRegistry

**Maven module**: activiti-dmn-engine

Example:

```
import com.activiti.dmn.engine.CustomExpressionFunctionRegistry;
import org.springframework.stereotype.Component;

import java.lang.reflect.Method;
import java.util.HashMap;
import java.util.Map;

@Component
public class MyCustomExpressionFunctionsRegistry implements CustomExpressionFunctionRegistry {

    public Map<String, Method> getCustomExpressionMethods() {
        Map<String,Method> myCustomExpressionMethods = new HashMap<>();

        try {
            String expressionToken = "dosomething";
            Method customExpressionMethod = SomeClass.class.getMethod("someMethod", String.class);
            myCustomExpressionMethods.put(expressionToken, customExpressionMethod);
        } catch (NoSuchMethodException e) {
            // handle exception
        }

        return myCustomExpressionMethods;
    }
}
```

This registry must be provided to the rule engine configuration using the hook point \(see [Rule engine configuration configurer](rule_engine_configuration_configurer.md)\).

This example adds the expression function from the example above to the default custom expression functions.

Example:

```
import com.activiti.dmn.engine.DmnEngineConfiguration;
import org.springframework.beans.factory.annotation.Autowired;

public class MyDmnEngineCfgConfigurer implements DmnEngineConfigurationConfigurer {

    @Autowired
    MyCustomExpressionFunctionsRegistry myExpressionFunctionRegistry;

    public void dmnEngineConfigurationInitialized(DmnEngineConfiguration dmnEngineConfiguration) {

        dmnEngineConfiguration.setPostCustomExpressionFunctionRegistry(
            myExpressionFunctionRegistry);
    }
}
```

Overriding the default custom expression functions can be done by:

```
dmnEngineConfiguration.setCustomExpressionFunctionRegistry(
    myExpressionFunctionRegistry);
```

**Parent topic:**[Custom Logic](../topics/custom_logic.md)

