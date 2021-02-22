# App Definitions List

To retrieve all App definitions including ones that were not deployed at runtime:

```
GET api/enterprise/models?filter=myApps&modelType=3&sort=modifiedDesc
```

The request parameters

-   `filter` : Possible values: `myApps`, `sharedWithMe`, `sharedWithOthers`, `favorite`.

-   `modelType` : Must be `3` for App definition models.

-   `sort` : `modifiedDesc`, `modifiedAsc`, `nameAsc`, `nameDesc` \(default `modifiedDesc`\).


**Parent topic:**[Alfresco Process Services REST API](../topics/process_services_api.md)

