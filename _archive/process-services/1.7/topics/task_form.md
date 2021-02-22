# Task Form

```
GET api/enterprise/task-forms/{taskId}
```

The response is similar to the response from the Start Form.

To retrieve Form field values that are populated through a REST back-end:

```
GET api/enterprise/task-forms/{taskId}/form-values/{field}
```

Which returns a list of form field values

To complete a Task form:

```
POST api/enterprise/task-forms/{taskId}
```

with a json body that contains:

-   `values`: A json object with the form field ID - form field values. The Id of the form field is retrieved from the start form call \(see above\).

-   `outcome`: Retrieves outcome values if defined in the Start form.


To save a Task form:

```
POST api/enterprise/task-forms/{taskid}/save-form
```

**Example response**:

```
{

"values": {"formtextfield":"snicker doodle"},
"numberfield":"6",
"radiobutton":"red"

}
```

Where the json body contains:

-   `values` : A json object with the form field ID - form field values. The Id of the form field is retrieved from the Start Form call \(see above\).


To retrieve a list of variables associated with a Task form:

```
GET api/enterprise/task-forms/{taskid}/variables
```

**Example response**

```
[
  {
    "id": "initiator",
    "type": "string",
    "value": "3205"
  },
  {
    "id": "FormField2",
    "type": "string",
    "value": "TestVariable2"
  },
  {
    "id": "FormField1",
    "type": "string",
    "value": "TestVariable1"
  }
]
```

**Parent topic:**[Alfresco Process Services REST API](../topics/process_services_api.md)

