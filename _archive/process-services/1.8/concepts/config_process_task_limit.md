# Process and Task Query lists

Alfresco Process Services provides REST API operations that allow you to query tasks, process instances, historic tasks and historic process instances. You can also request to include task and process variables by using the parameters includeTaskLocalVariables and includeProcessVariables and setting their values to 'True'. When executing REST API calls that include these variables, the result sets could be quite large and you may wish to limit or control the list size provided in the response. The following table shows the properties you can set in the activiti-app.properties file to configure this.

|Property name|Description|
|-------------|-----------|
|`query.task.limit`|Limits the number of tasks returned from the query GET /runtime/tasks.|
|`query.execution.limit`|Limits the number of process instances returned from the query GET /runtime/process-instances.|
|`query.historic.task.limit`|Limits the number of historic tasks returned from the query POST /enterprise/historic-tasks/query.|
|`query.historic.process.limit`|Limits the number of historic process instances returned from the query POST /enterprise/historic-process-instances/query.|

**Note:** Note the following points:

-   You cannot specify the includeTaskLocalVariables parameter when using the process and historic process query operations. This is only available for GET /runtime/tasks and POST /enterprise/historic-tasks/query. You can use the includeProcessVariables parameter for all queries specified in the table and apply the corresponding property configuration.
-   If the property configuration for a query limit is not enabled in activiti-app.properties, the default limit for the number of instances returned is 20000.
-   If you omit the includeTaskLocalVariables and includeProcessVariables parameters or set them to false, the request excludes the variables from the response and does not apply the query limit configurations.
-   Setting higher limits for the process or task query properties results in more records fetched from the database. This is likely to mean that you experience slower REST API response times.

**Parent topic:**[Configuring Alfresco Process Services](../topics/administration_application_config.md)

