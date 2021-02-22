# Validator configuration

By default, Alfresco Process Services is configured in a way that process modelers have access to all powerful features of the Process Engine. In many organizations this is not a problem, as the people who are modeling are trusted IT people or business analysts.

However, some organizations may expose the modeling tools of Alfresco Process Services directly to all end users giving them access to the full array of its capabilities. In such a scenario, some users may gather sensitive data or swamp the resources of the servers. Therefore, various *validators* are introduced that can be enabled or disabled, when required. These validators are run before a process model is deployed to the engine and will block deployment in case of a validation error.

-   **[Disabling tasks](../topics/disabling_tasks.md)**  
 The following validators disable the usage of certain tasks. The various validators are configured through the regular Alfresco Process Services properties. The default value for these validators is **false'*. Set the property to '*true** to enable the validator.
-   **[Limit functionality](../topics/limit_functionality.md)**  
 The following validators don’t disable a task as a whole, but rather a feature:

**Parent topic:**[Configuring Alfresco Process Services](../topics/administration_application_config.md)

