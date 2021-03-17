# Process engine configuration configurer

**interface**: com.activiti.api.engine.ProcessEngineConfigurationConfigurer

**Maven module**: activiti-app-logic

An implementation of this class will get called when the Activiti process engine configuration is initialized, but before the process engine is built. This allows for customization to the process engine configuration.

Example:

```
@Component
public class MyProcessEngineCfgConfigurer implements ProcessEngineConfigurationConfigurer {

        public void processEngineConfigurationInitialized( SpringProcessEngineConfiguration springProcessEngineConfiguration) {
                ...​ // Tweaking the process engine configuration
        }

}
```

**Parent topic:**[Hook points](../topics/hook_points.md)

