# App Publish and Deploy

Before an app model can be used, it needs to be published. This can be done through following call:

```
POST api/enterprise/app-definitions/{modelId}/publish
```

A JSON body is required for the call. You can either use an empty one or the following example:

```
{
    "comment": "",
    "force": false
}
```

To add it to your landing page, `deploy` the published app:

```
POST api/enterprise/runtime-app-definitions
```

Where, `appDefinitions` is an array of IDs, for example:

```
{
    "appDefinitions" : [{"id" : 1}, {"id" : 2}]
}
```

**Parent topic:**[Alfresco Process Services REST API](../topics/process_services_api.md)

