# Start Form

When process definition has a start form \(`hasStartForm` is `true` as in the call above\), the start form can be retrieved as follows:

```
GET api/enterprise/process-definitions/{process-definition-id}/start-form
```

**Example response:**

```
{
  "processDefinitionId": "p1:2:2504",
  "processDefinitionName": "p1",
  "processDefinitionKey": "p1",
  "fields": [
    {
      "fieldType": "ContainerRepresentation",
      "id": "container1",
      "name": null,
      "type": "container",
      "value": null,
      "required": false,
      "readOnly": false,
      "overrideId": false,
      "placeholder": null,
      "optionType": null,
      "hasEmptyValue": null,
      "options": null,
      "restUrl": null,
      "restIdProperty": null,
      "restLabelProperty": null,
      "layout": null,
      "sizeX": 0,
      "sizeY": 0,
      "row": 0,
      "col": 0,
      "visibilityCondition": null,
      "fields": {
        "1": [
          {
            "fieldType": "FormFieldRepresentation",
            "id": "label1",
            "name": "Label1",
            "type": "text",
            "value": null,
            "required": false,
            "readOnly": false,
            "overrideId": false,
            "placeholder": null,
            "optionType": null,
            "hasEmptyValue": null,
            "options": null,
            "restUrl": null,
            "restIdProperty": null,
            "restLabelProperty": null,
            "layout": {
              "row": 0,
              "column": 0,
              "colspan": 1
            },
            "sizeX": 1,
            "sizeY": 1,
            "row": 0,
            "col": 0,
            "visibilityCondition": null
          }
        ],
        "2": [ ]
      }
    },
    {
      "fieldType": "DynamicTableRepresentation",
      "id": "label21",
      "name": "Label 21",
      "type": "dynamic-table",
      "value": null,
      "required": false,
      "readOnly": false,
      "overrideId": false,
      "placeholder": null,
      "optionType": null,
      "hasEmptyValue": null,
      "options": null,
      "restUrl": null,
      "restIdProperty": null,
      "restLabelProperty": null,
      "layout": {
        "row": 10,
        "column": 0,
        "colspan": 2
      },
      "sizeX": 2,
      "sizeY": 2,
      "row": 10,
      "col": 0,
      "visibilityCondition": null,
      "columnDefinitions": [
        {
          "id": "p2",
          "name": "c2",
          "type": "String",
          "value": null,
          "optionType": null,
          "options": null,
          "restUrl": null,
          "restIdProperty": null,
          "restLabelProperty": null,
          "required": true,
          "editable": true,
          "sortable": true,
          "visible": true
        }
      ]
    }
  ],
  "outcomes": [ ]
}
```

Note: To retrieve field values such as the typeahead field, use the following REST endpoint:

```
GET api/enterprise/process-definitions/{processDefinitionId}/start-form-values/{field}
```

This returns a list of form values.

**Parent topic:**[Alfresco Process Services REST API](../topics/process_services_api.md)

