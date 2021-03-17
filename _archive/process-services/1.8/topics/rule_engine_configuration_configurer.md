# Rule engine configuration configurer

**interface**: com.activiti.api.engine.DmnEngineConfigurationConfigurer

**Maven module**: activiti-app-logic

An implementation of this class will get called when the Process Services rule engine configuration is initialized, but before the process engine is built. This allows for customization to the rule engine configuration.

Example:

```
@Component
public class MyDmnEngineCfgConfigurer implements DmnEngineConfigurationConfigurer {

        public void dmnEngineConfigurationInitialized(DmnEngineConfiguration dmnEngineConfiguration) {
                ... // Tweaking the rule engine configuration
        }

}
```

**Parent topic:**[Hook points](../topics/hook_points.md)

