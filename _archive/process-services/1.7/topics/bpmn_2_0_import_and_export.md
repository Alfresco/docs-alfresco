# BPMN 2.0 Import and Export

To export a process definition model to a BPMN 2.0 XML file:

```
GET api/enterprise/models/{processModelId}/bpmn20
```

For a previous version of the model:

```
GET api/enterprise/models/{processModelId}/history/{processModelHistoryId}/bpmn20
```

To import a BPMN 2.0 xml file:

```
POST api/enterprise/process-models/import
```

With the BPMN 2.0 XML file in the body as a multipart file and the file as value for the *file* property.

**Parent topic:**[Alfresco Process Services REST API](../topics/process_services_api.md)

