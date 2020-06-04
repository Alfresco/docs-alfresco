---
title: Code blocks
---

This page is for testing code blocks. 

## XML
The following is an XML code block: 

```xml
<bpmn2:endEvent id="EndEvent_1">
	<bpmn2:incoming>SequenceFlow_8</bpmn2:incoming>
	<bpmn2:messageEventDefinition messageRef="Message_1hxecs2" activiti:correlationKey="${userId}"
```


## JSON
The following is a JSON code block: 

```json
    "mappings": {
        "EndEvent_0ss2fp3": {
            "inputs": {
                "name": {
                    "type": "variable",
                    "value": "username"
                },
                "order-number": {
                    "type": "value",
                    "value": 1459283
                }
            }
        }
    },
    "properties": {
        "426ea9f7-7049-4a4c-b235-960144b483de": {
            "id": "426ea9f7-7049-4a4c-b235-960144b483de",
            "name": "username",
            "type": "string",
            "value": "",
            "required": false
        }
    }
```


## SQL

```sql
SELECT * FROM test_tab WHERE group_id != 10 ORDER BY ASC
```