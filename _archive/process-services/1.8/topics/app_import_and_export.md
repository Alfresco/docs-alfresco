# App Import And Export

It is possible to export app definitions and import them again. From the REST API point of view, this is useful to bootstrap an environment \(for users or continuous integration\).

To export an app definition, you need the `modelId` from a runtime app or the `id` of an app definition model, and call.

```
GET api/enterprise/app-definitions/{modelId}/export
```

This will return a zip file containing the app definition model and all related models \(process definitions and forms\).

To import an app again, post the zip file as multipart file to

```
POST api/enterprise/app-definitions/import
```

To import an app to an existing app definition to create a new version instead of importing a new app definition, post the zip file as multipart file to

```
POST api/enterprise/app-definitions/{modelId}/import
```

**Parent topic:**[Alfresco Process Services REST API](../topics/process_services_api.md)

