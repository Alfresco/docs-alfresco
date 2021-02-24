# Process Definition Models List

To retrieve a list of process definition models:

```
GET api/enterprise/models?filter=myprocesses&modelType=0&sort=modifiedDesc
```

The request parameters

-   `filter` : Possible values: `myprocesses`, `sharedWithMe`, `sharedWithOthers`, `favorite`.

-   `modelType` : Must be `0` for process definition models.

-   `sort` : Possible values: `modifiedDesc`, `modifiedAsc`, `nameAsc`, `nameDesc` \(default `modifiedDesc`\).


**Parent topic:**[Alfresco Process Services REST API](../topics/process_services_api.md)

