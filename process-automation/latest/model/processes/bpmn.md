---
title: BPMN
---

BPMN elements are used to model processes and include other models created within a project into a process definition.

## Start events

A process must always contain at least one start event as they define how a process begins.

The types of start event are:

* [Start events](#start-event)
* [Error start events](#error-start-event)
* [Message start events](#message-start-event)
* [Signal start events](#signal-start-event)
* [Timer start events](#timer-start-event)

### Start event

Start events are where the trigger is unspecified for starting a process. The trigger can be using a form, manually through the Digital Workspace, using the REST API or from a [trigger]({% link process-automation/latest/model/triggers.md %}).

{% capture start-prop %}

#### Basic properties

The basic properties for a start event are:

| Property | Description |
| -------- | ----------- |
| ID | *Required.* The unique identifier for the start event. This is system generated and cannot be altered, for example `StartEvent_1w29b3h`. |
| Name | *Optional.* The name of the start event. This will be displayed on the canvas. |
| Documentation | *Optional.* A free text description of what the start event does. |

#### Form name

An optional [form]({% link process-automation/latest/model/forms.md %}) can be used to begin a process. The form must exist within the same project as the process definition to be selected. Select a form from the dropdown, else create a new form using the **+** symbol.

Once a form has been selected, it can be edited using the **Open Form** symbol.

#### Mapping type

The mapping type sets how data is passed between the start event and the process. There are [five options]({% link process-automation/latest/model/processes/index.md %}#process-variable-mapping) for how to send this data. The default value is **Don't map variables**. For form widgets and form variables you can add static values. For example you can pass a form variable called `path` which can be a file location or URL.

{% endcapture %}
{% capture start-img %}

Start events are displayed as a single thin circle without an icon inside.

{% endcapture %}
{% capture start-xml %}

An example of the XML of a start event without a form defined is:

```xml
<bpmn2:startEvent id="StartProcess_1" name="FormStart_4">
	<bpmn2:outgoing>SequenceFlow_1</bpmn2:outgoing>
</bpmn2:startEvent>
```

An example of the XML of a start event with a form defined is:

```xml
<bpmn2:startEvent id="StartProcess_1" name="FormStart_4" activiti:formKey="form-4ccd023b-d607-4cab-8623-da4c87dd9611">
	<bpmn2:outgoing>SequenceFlow_1</bpmn2:outgoing>
</bpmn2:startEvent>
```

> **Note**: The `activiti:formKey` is the `id` of the form used to start the process.

{% endcapture %}

{% include tabs.html tableid="start" opt1="Properties" content1=start-prop opt2="Appearance" content2=start-img opt3="XML" content3=start-xml %}

### Error start event

Error start events can only be used in [event sub-processes](#event-sub-processes). They begin an event sub-processes when a named error is received.

{% capture error-start-prop %}

#### Basic properties

The basic properties for an error start event are:

| Property | Description |
| -------- | ----------- |
| ID | *Required.* The unique identifier for the error start event. This is system generated and cannot be altered, for example `StartEvent_1w29b3h`. |
| Name | *Optional.* The name of the error start event. This will be displayed on the canvas. |
| Documentation | *Optional.* A free text description of what the error start event does. |

#### Form name

An optional [form]({% link process-automation/latest/model/forms.md %}) can be used to begin a process. The form must exist within the same project as the process definition to be selected. Select a form from the dropdown, else create a new form using the **+** symbol.

Once a form has been selected, it can be edited using the **Open Form** symbol.

#### Mapping type

The mapping type sets how data is passed between the error start event and the process. There are [five options]({% link process-automation/latest/model/processes/index.md %}#process-variable-mapping) for how to send this data. The default value is **Send no variables**.

#### Error

An error needs to be defined for the error start event to catch. A previously created **Error** can be selected from the dropdown in its properties, or a new one created using the **+** symbol. An **Error name** and **Error code** can then be set.

{% endcapture %}
{% capture error %}

Error events are used to model an exception in a business process. Errors are thrown by error end events and caught by error start events and error boundary events.

The `errorRef` property in the `errorEventDefinition` of an error event element will match against the `id` of an error when viewing the **XML Editor**.

Error events are displayed as a lightning bolt icon inside different shapes that differentiate between the event types. A solid lightning bolt represents a throwing event, whilst a hollow lightning bolt represents a catching event.

To create a new error use the **+** symbol against an error event such as a start error event, or make sure no BPMN element is selected by clicking on a blank section of the process canvas and the **Edit Errors** button will be visible in the right-hand properties panel.

{% endcapture %}
{% capture error-start-img %}

Error start events are displayed as a single thin circle with a hollow lightning bolt icon inside.

{% endcapture %}
{%capture error-start-xml %}

An example of the XML of an error start event is:

```xml
<bpmn2:startEvent id="StartEvent3">
	<bpmn2:errorEventDefinition errorRef="Error_0vbkbeb" />
</bpmn2:startEvent>
```

An example of the XML of an error is:

```xml
<bpmn2:error id="Error_0vbkbeb" name="payment-failed-error" errorCode="404" />
```

{% endcapture %}

{% include tabs.html tableid="error-start" opt1="Properties" content1=error-start-prop opt2="Error" content2=error opt3="Appearance" content3=error-start-img opt4="XML" content4=error-start-xml %}

### Message start event

Message start events begin a process instance when a named message is received.

{% capture message-start-prop %}

#### Basic properties

The basic properties for a message start event are:

| Property | Description |
| -------- | ----------- |
| ID | *Required.* The unique identifier for the message start event. This is system generated and cannot be altered, for example `StartEvent_1w29b3h`. |
| Name | *Optional.* The name of the message start event. This will be displayed on the canvas. |
| Documentation | *Optional.* A free text description of what the message start event does. |

#### Form name

An optional [form]({% link process-automation/latest/model/forms.md %}) can be used to begin a process. The form must exist within the same project as the process definition to be selected. Select a form from the dropdown, else create a new form using the **+** symbol.

Once a form has been selected, it can be edited using the **Open Form** symbol.

#### Mapping type

The mapping type sets how data is passed between the message start event and the process. There are [five options]({% link process-automation/latest/model/processes/index.md %}#process-variable-mapping) for how to send this data. The default value is **Send no variables**.

#### Message

A message needs to be defined for the message start event to catch when it is thrown. A previously created **Message** can be selected from the dropdown in its properties, or a new one created using the **+** symbol. A **Message name** and payload can then be set.

{% endcapture %}
{% capture message %}

#### Message

Messages have a name and contain a payload. They are sent by message throwing events and received by message catching events in a 1:1 relationship between throw events and catch events. Messages contain a payload known as a message payload and can be passed between scopes, for example between two different process definitions within the same diagram that are separated by different [pools](#pools-and-lanes).

The message `id` property of a message is matched against the `messageRef` property in the corresponding throw and catch message elements when viewing the **XML Editor**.

To create a new message use the **+** symbol against a message event such as a message boundary event, or make sure no BPMN element is selected by clicking on a blank section of the process canvas and the **Edit Messages** button will be visible in the right-hand properties panel.

Message events are displayed as an envelope icon inside different shapes that differentiate between the event types. A solid envelope represents a throwing event, whilst a hollow envelope represents a catching event.

#### Message payloads

Message payloads contain a set of values that are sent from a throwing event and received by a catching event.

Message payloads can only be created on a message throw event and contain one or more properties that have a `name`, `type` and `value`. The property types for payloads are:

| Type | Description |
| ---- | ----------- |
| String | A sequence of characters, for example `#Mint-Ice-Cream-4!` |
| Integer | A positive whole number, for example `642` |
| Boolean | A value of either `true` or `false` |
| Date | A specific date in the format `YYYY-MM-DD`, for example `2020-04-22` |
| Variable | A value passed from a [process variable]({% link process-automation/latest/model/processes/index.md %}#process-variables). |

The receiving message catch event is then used to map the received values in the payload to process variables in its own scope.

Message payload mappings can be viewed in the **Extensions Editor** of a process diagram. Throwing events are mapped as `inputs` and catching events are mapped as `outputs` from an event.

#### Correlation keys

Message events can optionally contain a correlation key. If a correlation key is present then when a message is thrown it uses the `activiti:correlationKey` value and the `messageRef` of the throwing event to match against the same two properties in a catching event. If only one property is matched then the message will not be caught.

Using a [process variable]({% link process-automation/latest/model/processes/index.md %}#process-variables) for the correlation key in a throwing event and a static value for its corresponding catching event allows for the message to only be caught in specific circumstances.

> **Note**: Message start events cannot contain a correlation key unless they are used in a [sub process](#sub-processes-and-call-activities).

#### Message flows

When messages are used between two different [pools](#pools-and-lanes) the sequence flow that connects them is a dotted line called a message flow. The message flow is part of the `collaboration` element in the XML created by introducing a pool. Message flows reference the throwing message event as the `sourceRef` and the catching message event as the `targetRef`.

{% endcapture %}
{% capture message-start-img %}

Message start events are displayed as a single thin circle with a hollow envelope icon inside.

{% endcapture %}
{% capture message-start-xml %}

An example of the XML of a message start event is:

```xml
<bpmn2:startEvent id="StartEvent2">
	<bpmn2:outgoing>SequenceFlow_1</bpmn2:outgoing>
	<bpmn2:messageEventDefinition messageRef="Message_15xakkk" />
</bpmn2:startEvent>
```

An example of the XML of a message is:

```xml
<bpmn2:message id="Message_15xakkk" name="Message_15xakkk" />
```

An example of the XML of a message payload is:

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
```

An example of the XML of a message with a correlation key is:

```xml
<bpmn2:endEvent id="EndEvent_1">
	<bpmn2:incoming>SequenceFlow_8</bpmn2:incoming>
	<bpmn2:messageEventDefinition messageRef="Message_1hxecs2" activiti:correlationKey="${userId}" />
```

In this example the message will only be caught if a catching event has a `messageRef` of `Message_1hxecs2` and an `activiti:correlationKey` that matches the value of `userId`.

An example of the XML of a message flow is:

```xml
<bpmn2:collaboration id="Collaboration_0kgbwi1">
	<bpmn2:participant id="Participant_1i6u1my" processRef="Process_1d9yxsm" />
	<bpmn2:participant id="Participant_10umhbc" processRef="Process_1piiyp4" />
	<bpmn2:messageFlow id="MessageFlow_0vh4zdb" sourceRef="Event_00acemq" targetRef="Event_13u5jtf" />
</bpmn2:collaboration>
```

{% endcapture %}

{% include tabs.html tableid="message-start" opt1="Properties" content1=message-start-prop opt2="Message" content2=message opt3="Appearance" content3=message-start-img opt4="XML" content4=message-start-xml %}

### Signal start event

Signal start events begin a process instance using a caught, named signal.

{% capture signal-start-prop %}

#### Basic properties

The basic properties for a signal start event are:

| Property | Description |
| -------- | ----------- |
| ID | *Required.* The unique identifier for the signal start event. This is system generated and cannot be altered, for example `StartEvent_1w29b3h`. |
| Name | *Optional.* The name of the signal start event. This will be displayed on the canvas. |
| Documentation | *Optional.* A free text description of what the signal start event does. |

#### Signal

A signal needs to be defined for the signal start event to catch. A previously used **Signal** can be selected from the dropdown in its properties, or a new one created using the **+** symbol. A **Signal name** can then be set.

Signals can be restricted to the process instance they are thrown in, or be global in scope. The scope of a global signal is restricted to the project they are used in.

{% endcapture %}
{% capture signal %}

Signal events can be either catching or throwing. A throwing signal event will emit a signal when it is reached in a process instance that will be picked up by any catching signal event with a matching signal name. Signals can be restricted to the process instance they are thrown in, or be global in scope. The scope of a global signal is restricted to the project they are used in.

The `id` of a signal will match against the `signalRef` of a catching or throwing event.

Signal events are displayed as a triangle icon inside different shapes that differentiate between the event types. A solid triangle represents a throwing event, whilst a hollow triangle represents a catching event.

{% endcapture %}
{% capture signal-start-img %}

Signal start events are displayed as a single thin circle with a hollow triangle icon inside.

{% endcapture %}
{% capture signal-start-xml %}

An example of the XML of a signal start event is:

```xml
<bpmn2:startEvent id="StartEvent1">
	<bpmn2:outgoing>SequenceFlow_1</bpmn2:outgoing>
 	<bpmn2:signalEventDefinition signalRef="Signal_0hnsd2r" />
</bpmn2:startEvent>
```

An example of the XML of a signal with a global scope is:

```xml
<bpmn2:signal id="Signal_0hnsd2r" name="Signal_0hnsd2r" />
```

An example of the XML of a signal with a process instance scope is:

```xml
<bpmn2:signal id="Signal_0hnsd2r" name="Signal_0hnsd2r" activiti:scope="processInstance" />
```

{% endcapture %}

{% include tabs.html tableid="signal-start" opt1="Properties" content1=signal-start-prop opt2="Signal" content2=signal opt3="Appearance" content3=signal-start-img opt4="XML" content4=signal-start-xml %}

### Timer start event

Timer start events begin a process at a specific time once or repeatedly at intervals.

{% capture timer-start-prop %}

#### Basic properties

The basic properties for a timer start event are:

| Property | Description |
| -------- | ----------- |
| ID | *Required.* The unique identifier for the timer start event. This is system generated and cannot be altered, for example `StartEvent_1w29b3h`. |
| Name | *Optional.* The name of the timer start event. This will be displayed on the canvas. |
| Documentation | *Optional.* A free text description of what the timer start event does. |

### Form name

An optional [form]({% link process-automation/latest/model/forms.md %}) can be used to begin a process. The form must exist within the same project as the process definition to be selected. Select a form from the dropdown, else create a new form using the **+** symbol.

Once a form has been selected, it can be edited using the **Open Form** symbol.

#### Mapping type

The mapping type sets how data is passed between the timer start event and the process. There are [five options]({% link process-automation/latest/model/processes/index.md %}#process-variable-mapping) for how to send this data. The default value is **Send no variables**.

#### Timer

A choice of timer must be set for timer start events, based on a **Cycle**, **Date** or **Duration**.

{% endcapture %}
{% capture timer %}

Timer events are used to influence events at specific times, after a set amount of time has passed or at intervals. All timer events use the international standard [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601){:target="_blank"} for specifying time formats.

> **Note**: All properties within `timerEventDefinition` can accept process variables as their values as long as they are in ISO 8601 or cron expression format.

Timer events are displayed as a clock icon inside different shapes that differentiate between the event types.

#### timeDate

The `timeDate` property for timer events defines a specific date and time in ISO 8601 format for when the trigger will be fired and can include a specified time zone.

The following is an example of the `timerEventDefinition` using a `timeDate`:

* `2017-05-17` represents the 17th May 2017 in *YYYY-MM-DD* format
* `T12:42:23` represents the time of 12:42:23 in *hh:mm:ss* format
* `Z` represents that the time format is in UTC (Coordinated Universal Time). The time can also contain UTC offsets such as `+01` for an hour ahead of UTC. When an offset is defined the `Z` is not required, for example: `T12:42:23+01`

#### timeDuration

The `timeDuration` property for timer events defines how long a timer should wait in ISO 8601 format before the trigger is fired.

The following are the letters used to refer to duration:

| Letter | Description |
| ------ | ----------- |
| `P` | Designates that the following letters and numbers represent a duration. Must always be present |
| `Y` | Represents a year and follows the number of years, for example `P2Y` is 2 years |
| `M` | Represents a month and follows the number of months when preceded by a `P`, for example `P3Y4M` is 2 years and 4 months |
| `W` | Represents a week and follows the number of weeks, for example `P10W` for 10 weeks |
| `D` | Represents a day and follows the number of days, for example `P1Y1M1D` for 1 year, 1 month and 1 day |
| `T` | Designates that the following letters represent a duration of hours to seconds. Must always be present to refer to hours, minutes and seconds |
| `H` | Represents an hour and follows the number of hours, for example `P1DT0.5H` for 1 day and half an hour |
| `M` | Represents a minute and follows the number of minutes when preceded by a `T`, for example `PT1M` for 1 minute |
| `S` | Represents a second and follows the number of seconds, for example `P2Y3M4DT5H6M7S` for 2 years, 3 months, 4 days, 5 hours, 6 minutes and 7 seconds |

#### timeCycle

The `timeCycle` property for timer events defines intervals for the trigger to fire at. Intervals can be defined using the time intervals that adhere to the ISO 8601 standard or by using cron expressions.

##### Time intervals

Time intervals use the syntax `R/` to set a number of repetitions, for example `R5/` would repeat five times. 

Following the repetition, a duration can be set for when the repetition occurs, for example `R5/PT10H` would repeat every 10 hours, five times.

> **Note** The duration uses the same format as for `timeDuration`.

An optional end date can also be set after the duration and separated by a `/`.

> **Note**: The end date uses the same format as for `timeDate`.

##### Cron expression intervals

[Cron expressions](https://en.wikipedia.org/wiki/Cron#CRON_expression){:target="_blank"} can also be used to define repeating triggers for timer events.  

{% endcapture %}
{% capture timer-start-img %}

Timer start events are displayed as a single thin circle with a clock icon inside.

{% endcapture %}
{% capture timer-start-xml %}

An example of the XML of a timer start event is:

```xml
<bpmn2:startEvent id="StartEvent3">
    <bpmn2:outgoing>SequenceFlow_1</bpmn2:outgoing>
    <timerEventDefinition>
        <timeCycle xsi:type="bpmn2:tFormalExpression">R10/2020-12-10T13:00/PT12H</timeCycle>
    </timerEventDefinition>
</bpmn2:startEvent>
```

> **Note**: This will start the process 10 times, at 12 hour intervals starting on the 10th December 2020.

An example of the XML for `timeDate` is:

```xml
<bpmn2:timerEventDefinition> 
  <bpmn2:timeDate xsi:type="bpmn2:tFormalExpression">2017-05-17T12:42:23Z</bpmn2:timeDate>
</bpmn2:timerEventDefinition>
```

An example of the XML for `timeDuration` is:

```xml
<bpmn2:timerEventDefinition>
  <bpmn2:timeDuration xsi:type="bpmn2:tFormalExpression">P5D</bpmn2:timeDuration>
</bpmn2:timerEventDefinition>
```

> **Note**: This represents a duration of 5 days.

An example of the XML for `timeCycle` using time interval syntax is:

``` xml
<bpmn2:timerEventDefinition>
  <bpmn2:timeCycle xsi:type="bpmn2:tFormalExpression">R3/PT30M</bpmn2:timeCycle>
</bpmn2:timerEventDefinition> 
```

> **Note**: This represents three repetitions every 30 minutes.

An example of the XML for `timeCycle` using a cron expression is:

```xml
<bpmn2:timerEventDefinition>
  <bpmn2:timeCycle>0 0/5 * * * ?</bpmn2:timeCycle>
</bpmn2:timerEventDefinition>
```

> **Note**: This represents a trigger firing every 5 minutes beginning at the top of the hour.

{% endcapture %}

{% include tabs.html tableid="timer-start" opt1="Properties" content1=timer-start-prop opt2="Timer" content2=timer opt3="Appearance" content3=timer-start-img opt4="XML" content4=timer-start-xml %}

## End events

End events indicate where the current process flow ends, therefore there can be no outgoing [sequence flow](#sequence-flow) from an end event. Different types of end event can have have actions other than just ending the process flow execution path.

The types of end event are:

* [End events](#end-event)
* [Error end events](#error-end-event)
* [Message end events](#message-end-event)
* [Terminate end events](#terminate-end-event)

### End event

End events complete the process flow with no additional behavior.

{% capture end-prop %}

#### Basic properties

The basic properties for an end event are:

| Property | Description |
| -------- | ----------- |
| ID | *Required.* The unique identifier for the end event. This is system generated and cannot be altered, for example `EndEvent_00ln22h`. |
| Name | *Optional.* The name of the end event. This will be displayed on the canvas. |
| Documentation | *Optional.* A free text description of what the end event does. |

{% endcapture %}
{% capture end-img %}

End events are displayed as a single thick circle without an icon inside.

{% endcapture %}
{% capture end-xml %}

An example of the XML of an end event is:

```xml
<bpmn2:endEvent id="EndEvent_1">
    <bpmn2:incoming>SequenceFlow_1</bpmn2:incoming>
</bpmn2:endEvent>
```

{% endcapture %}

{% include tabs.html tableid="end" opt1="Properties" content1=end-prop opt2="Appearance" content2=end-img opt3="XML" content3=end-xml %}

### Error end event

Error end events throw an error when the process flow reaches them.

{% capture error-end-prop %}

#### Basic properties

The basic properties for an error end event are:

| Property | Description |
| -------- | ----------- |
| ID | *Required.* The unique identifier for the error end event. This is system generated and cannot be altered, for example `EndEvent_00ln22h`. |
| Name | *Optional.* The name of the error end event. This will be displayed on the canvas. |
| Documentation | *Optional.* A free text description of what the error end event does. |

#### Error

An error needs to be defined for the error end event to throw. A previously created **Error** can be selected from the dropdown in its properties, or a new one created using the **+** symbol. An **Error name** and **Error code** can then be set.

{% endcapture %}
{% capture error-end-img %}

Error end events are displayed as a single thick circle with a solid lightning bolt icon inside.

{% endcapture %}
{% capture error-end-xml %}

An example of the XML of an error end event is:

```xml
<bpmn2:endEvent id="EndEvent_1">
    <bpmn2:incoming>SequenceFlow_8</bpmn2:incoming>
    <bpmn2:errorEventDefinition errorRef="Error_3vbkafg" />
</bpmn2:endEvent>
```

An example of the XML of an error is:

```xml
<bpmn2:error id="Error_3vbkafg" name="payment-failed-error" errorCode="404" />
```

{% endcapture %}

{% include tabs.html tableid="error-end" opt1="Properties" content1=error-end-prop opt2="Error" content2=error opt3="Appearance" content3=error-end-img opt4="XML" content4=error-end-xml %}

### Message end event

Message end events complete the process flow and send a message event.

{% capture message-end-prop %}

#### Basic properties

The basic properties for a message end event are:

| Property | Description |
| -------- | ----------- |
| ID | *Required.* The unique identifier for the message end event. This is system generated and cannot be altered, for example `EndEvent_00ln22h`. |
| Name | *Optional.* The name of the message end event. This will be displayed on the canvas. |
| Documentation | *Optional.* A free text description of what the message end event does. |

#### Message

A message needs to be defined for the message end event to send. A previously created **Message** can be selected from the dropdown in its properties, or a new one created using the **+** symbol. A **Message name** and payload can then be set.

{% endcapture %}
{% capture message-end-img %}

Message end events are displayed as a single thick circle with a solid envelope icon inside.

{% endcapture %}
{% capture message-end-xml %}

An example of the XML of a message end event is:

```xml
<bpmn2:endEvent id="EndEvent_1">
	<bpmn2:incoming>SequenceFlow_1</bpmn2:incoming>
	<bpmn2:messageEventDefinition messageRef="Message_45sdihj" />
</bpmn2:endEvent>
```

An example of the XML of a message is:

```xml
<bpmn2:message id="Message_15xakkk" name="Message_15xakkk" />
```

An example of the XML of a message payload is:

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
```

An example of the XML of a message with a correlation key is:

```xml
<bpmn2:endEvent id="EndEvent_1">
	<bpmn2:incoming>SequenceFlow_8</bpmn2:incoming>
	<bpmn2:messageEventDefinition messageRef="Message_1hxecs2" activiti:correlationKey="${userId}" />
```

In this example the message will only be caught if a catching event has a `messageRef` of `Message_1hxecs2` and an `activiti:correlationKey` that matches the value of `userId`.

An example of the XML of a message flow is:

```xml
<bpmn2:collaboration id="Collaboration_0kgbwi1">
	<bpmn2:participant id="Participant_1i6u1my" processRef="Process_1d9yxsm" />
	<bpmn2:participant id="Participant_10umhbc" processRef="Process_1piiyp4" />
	<bpmn2:messageFlow id="MessageFlow_0vh4zdb" sourceRef="Event_00acemq" targetRef="Event_13u5jtf" />
</bpmn2:collaboration>
```

{% endcapture %}

{% include tabs.html tableid="message-end" opt1="Properties" content1=message-end-prop opt2="Message" content2=message opt3="Appearance" content3=message-end-img opt4="XML" content4=message-end-xml %}

### Terminate end event

Terminate end events cause the current process scope to be immediately ended, including any parallel process flows. The scope is determined by the location of the terminate end event. If the terminate end event is in a [sub-process](#expanded-and-collapsed-sub-processes) or [call activity](#call-activity), only the sub-process or call activity instance will be ended, not the parent or originating process instance. In the case of a multi-instance sub-process or call activity only a single instance will be ended.

{% capture terminate-end-prop %}

#### Basic properties

The basic properties for a terminate end event are:

| Property | Description |
| -------- | ----------- |
| ID | *Required.* The unique identifier for the terminate end event. This is system generated and cannot be altered, for example `EndEvent_00ln22h`. |
| Name | *Optional.* The name of the terminate end event. This will be displayed on the canvas. |
| Documentation | *Optional.* A free text description of what the terminate end event does. |

{% endcapture %}
{% capture terminate-end-img %}

Terminate end events are displayed as a single thick circle with a solid circle inside.

{% endcapture %}
{% capture terminate-end-xml %}

An example of the XML of a terminate end event is:

```xml
<bpmn2:endEvent id="EndEvent_1">
	<bpmn2:incoming>SequenceFlow_1</bpmn2:incoming>
	<bpmn2:terminateEventDefinition id="TerminateEventDefinition_0j911ut"/>
</bpmn2:endEvent>
```

{% endcapture %}

{% include tabs.html tableid="terminate-end" opt1="Properties" content1=terminate-end-prop opt2="Appearance" content2=terminate-end-img opt3="XML" content3=terminate-end-xml %}

## Intermediate events

Intermediate events can be used at any point throughout a process. They always provide additional behavior such as throwing a signal or catching a timer.

The types of intermediate event are:

* [Message intermediate catch events](#message-intermediate-catch-event)
* [Message intermediate throw events](#message-intermediate-throw-event)
* [Signal intermediate catch events](#signal-intermediate-catch-event)
* [Signal intermediate throw events](#signal-intermediate-throw-event)
* [Timer intermediate catch events](#timer-intermediate-catch-event)

### Message intermediate catch event

Message intermediate catching events cause the process flow to wait until the message named in the `messageRef` property is received before it proceeds.

{% capture message-int-cat-prop %}

#### Basic properties

The basic properties for a message intermediate catch event are:

| Property | Description |
| -------- | ----------- |
| ID | *Required.* The unique identifier for the message intermediate catch event. This is system generated and cannot be altered, for example `IntermediateThrowEvent_1yohpmt`. |
| Name | *Optional.* The name of the message intermediate catch event. This will be displayed on the canvas. |
| Documentation | *Optional.* A free text description of what the message intermediate catch event does. |

#### Message

A message needs to be defined for the message intermediate catch event to catch. A previously created **Message** can be selected from the dropdown in its properties, or a new one created using the **+** symbol. A **Message name** and payload can then be set.

{% endcapture %}
{% capture message-int-cat-img %}

Message intermediate catching events are displayed as two thin concentric circles with a hollow envelope icon inside.

{% endcapture %}
{% capture message-int-cat-xml %}

An example of the XML of a message intermediate catch events is:

```xml
<bpmn2:intermediateCatchEvent id="IntermediateCatchEvent2">
	<bpmn2:incoming>SequenceFlow_5</bpmn2:incoming>
	<bpmn2:outgoing>SequenceFlow_6</bpmn2:outgoing>
    <bpmn2:messageEventDefinition messageRef="Message_6" />
</bpmn2:intermediateCatchEvent>
```

An example of the XML of a message is:

```xml
<bpmn2:message id="Message_15xakkk" name="Message_15xakkk" />
```

An example of the XML of a message payload is:

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
```

An example of the XML of a message with a correlation key is:

```xml
<bpmn2:endEvent id="EndEvent_1">
	<bpmn2:incoming>SequenceFlow_8</bpmn2:incoming>
	<bpmn2:messageEventDefinition messageRef="Message_1hxecs2" activiti:correlationKey="${userId}" />
```

In this example the message will only be caught if a catching event has a `messageRef` of `Message_1hxecs2` and an `activiti:correlationKey` that matches the value of `userId`.

An example of the XML of a message flow is:

```xml
<bpmn2:collaboration id="Collaboration_0kgbwi1">
	<bpmn2:participant id="Participant_1i6u1my" processRef="Process_1d9yxsm" />
	<bpmn2:participant id="Participant_10umhbc" processRef="Process_1piiyp4" />
	<bpmn2:messageFlow id="MessageFlow_0vh4zdb" sourceRef="Event_00acemq" targetRef="Event_13u5jtf" />
</bpmn2:collaboration>
```

{% endcapture %}

{% include tabs.html tableid="message-int-cat" opt1="Properties" content1=message-int-cat-prop opt2="Message" content2=message opt3="Appearance" content3=message-int-cat-img opt4="XML" content4=message-int-cat-xml %}

### Message intermediate throw event

Message intermediate throw events send the message event named in the `messageRef` property when the process flow reaches them.

{% capture message-int-thro-prop %}

#### Basic properties

The basic properties for a message intermediate throw event are:

| Property | Description |
| -------- | ----------- |
| ID | *Required.* The unique identifier for the message intermediate throw event. This is system generated and cannot be altered, for example `IntermediateThrowEvent_1yohpmt`. |
| Name | *Optional.* The name of the message intermediate throw event. This will be displayed on the canvas. |
| Documentation | *Optional.* A free text description of what the message intermediate throw event does. |

#### Message

A message needs to be defined for the message intermediate throw event to catch. A previously created **Message** can be selected from the dropdown in its properties, or a new one created using the **+** symbol. A **Message name** and payload can then be set.

{% endcapture %}
{% capture message-int-thro-img %}

Message intermediate throwing events are displayed as two thin concentric circles with a solid envelope icon inside.

{% endcapture %}
{% capture message-int-thro-xml %}

An example of the XML of a message intermediate throw events is:

```xml
<bpmn2:intermediateThrowEvent id="IntermediateThrowEvent1">
	<bpmn2:incoming>SequenceFlow_5</bpmn2:incoming>
	<bpmn2:outgoing>SequenceFlow_6</bpmn2:outgoing>
    <bpmn2:messageEventDefinition messageRef="Message_6" />
</bpmn2:intermediateThrowEvent>
```

An example of the XML of a message is:

```xml
<bpmn2:message id="Message_15xakkk" name="Message_15xakkk" />
```

An example of the XML of a message payload is:

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
```

An example of the XML of a message with a correlation key is:

```xml
<bpmn2:endEvent id="EndEvent_1">
	<bpmn2:incoming>SequenceFlow_8</bpmn2:incoming>
	<bpmn2:messageEventDefinition messageRef="Message_1hxecs2" activiti:correlationKey="${userId}" />
```

In this example the message will only be caught if a catching event has a `messageRef` of `Message_1hxecs2` and an `activiti:correlationKey` that matches the value of `userId`.

An example of the XML of a message flow is:

```xml
<bpmn2:collaboration id="Collaboration_0kgbwi1">
	<bpmn2:participant id="Participant_1i6u1my" processRef="Process_1d9yxsm" />
	<bpmn2:participant id="Participant_10umhbc" processRef="Process_1piiyp4" />
	<bpmn2:messageFlow id="MessageFlow_0vh4zdb" sourceRef="Event_00acemq" targetRef="Event_13u5jtf" />
</bpmn2:collaboration>
```

{% endcapture %}

{% include tabs.html tableid="message-int-thro" opt1="Properties" content1=message-int-thro-prop opt2="Message" content2=message opt3="Appearance" content3=message-int-thro-img opt4="XML" content4=message-int-thro-xml %}

### Signal intermediate catch event

Signal intermediate catching events cause the process flow to wait until the signal named in the `signalRef` property is received before it proceeds.

{% capture signal-int-cat-prop %}

#### Basic properties

The basic properties for a signal intermediate catch event are:

| Property | Description |
| -------- | ----------- |
| ID | *Required.* The unique identifier for the signal intermediate catch event. This is system generated and cannot be altered, for example `IntermediateThrowEvent_1yohpmt`. |
| Name | *Optional.* The name of the signal intermediate catch event. This will be displayed on the canvas. |
| Documentation | *Optional.* A free text description of what the signal intermediate catch event does. |

#### Signal

A signal needs to be defined for the signal intermediate catch event to catch. A previously used **Signal** can be selected from the dropdown in its properties, or a new one created using the **+** symbol. A **Signal name** can then be set.

Signals can be restricted to the process instance they are thrown in, or be global in scope. The scope of a global signal is restricted to the project they are used in.

{% endcapture %}
{% capture signal-int-cat-img %}

Signal intermediate catching events are displayed as two thin concentric circles with a hollow triangle icon inside.

{% endcapture %}
{% capture signal-int-cat-xml %}

An example of the XML of a signal intermediate catch events is:
	
```xml
<bpmn2:intermediateCatchEvent id="IntermediateCatchEvent2">
	<bpmn2:incoming>SequenceFlow_5</bpmn2:incoming>
	<bpmn2:outgoing>SequenceFlow_6</bpmn2:outgoing>
    <bpmn2:signalEventDefinition signalRef="Signal_0hnsd2r" />
</bpmn2:intermediateCatchEvent>
```

An example of the XML of a signal with a global scope is:

```xml
<bpmn2:signal id="Signal_0hnsd2r" name="Signal_0hnsd2r" />
```

An example of the XML of a signal with a process instance scope is:

```xml
<bpmn2:signal id="Signal_0hnsd2r" name="Signal_0hnsd2r" activiti:scope="processInstance" />
```

{% endcapture %}

{% include tabs.html tableid="signal-int-cat" opt1="Properties" content1=signal-int-cat-prop opt2="Signal" content2=signal opt3="Appearance" content3=signal-int-cat-img opt4="XML" content4=signal-int-cat-xml %}

### Signal intermediate throw event

Signal intermediate throw events are events that emit a signal when they are reached in the process flow. The signal that is emitted is then caught by any catching signal events with a name matching the signal that was thrown.

{% capture signal-int-thro-prop %}

#### Basic properties

The basic properties for a signal intermediate throw event are:

| Property | Description |
| -------- | ----------- |
| ID | *Required.* The unique identifier for the signal intermediate throw event. This is system generated and cannot be altered, for example `IntermediateThrowEvent_1yohpmt`. |
| Name | *Optional.* The name of the signal intermediate throw event. This will be displayed on the canvas. |
| Documentation | *Optional.* A free text description of what the signal intermediate throw event does. |

#### Signal

A signal needs to be defined for the signal intermediate throw event to emit when it is reached. A previously used **Signal** can be selected from the dropdown in its properties, or a new one created using the **+** symbol. A **Signal name** can then be set.

Signals can be restricted to the process instance they are thrown in, or be global in scope. The scope of a global signal is restricted to the project they are used in.

{% endcapture %}
{% capture signal-int-thro-img %}

Signal intermediate throw events are displayed as two thin concentric circles with a solid triangle icon inside.

{% endcapture %}
{% capture signal-int-thro-xml %}

An example of the XML of a signal intermediate catch events is:

```xml
<bpmn2:intermediateThrowEvent id="IntermediateThrowEvent1">
	<bpmn2:incoming>SequenceFlow_3</bpmn2:incoming>
	<bpmn2:outgoing>SequenceFlow_4</bpmn2:outgoing>
   <bpmn2:signalEventDefinition signalRef="Signal_1jiw9tp" />
</bpmn2:intermediateThrowEvent>
```

An example of the XML of a signal with a global scope is:

```xml
<bpmn2:signal id="Signal_0hnsd2r" name="Signal_0hnsd2r" />
```

An example of the XML of a signal with a process instance scope is:

```xml
<bpmn2:signal id="Signal_0hnsd2r" name="Signal_0hnsd2r" activiti:scope="processInstance" />
```

{% endcapture %}

{% include tabs.html tableid="signal-int-thro" opt1="Properties" content1=signal-int-thro-prop opt2="Signal" content2=signal opt3="Appearance" content3=signal-int-thro-img opt4="XML" content4=signal-int-thro-xml %}

### Timer intermediate catch event

Timer intermediate catching events cause the process flow to wait until a specific time or interval is reached. The time to wait is defined in the `timerEventDefinition` property.

{% capture timer-int-cat-prop %}

#### Basic properties

The basic properties for a timer intermediate catch event are:

| Property | Description |
| -------- | ----------- |
| ID | *Required.* The unique identifier for the timer intermediate catch event. This is system generated and cannot be altered, for example `IntermediateThrowEvent_1yohpmt`. |
| Name | *Optional.* The name of the timer intermediate catch event. This will be displayed on the canvas. |
| Documentation | *Optional.* A free text description of what the timer intermediate catch event does. |

#### Timer

A choice of timer must be set for timer start events, based on a **Cycle**, **Date** or **Duration**.

{% endcapture %}
{% capture timer-int-cat-img %}

Timer intermediate catch events are displayed as two thin concentric circles with a clock icon inside.

{% endcapture %}
{% capture timer-int-cat-xml %}

An example of the XML of a signal intermediate catch events is:

```xml
<bpmn2:intermediateCatchEvent id="IntermediateCatchEvent5">
	<bpmn2:incoming>SequenceFlow_3</bpmn2:incoming>
	<bpmn2:outgoing>SequenceFlow_4</bpmn2:outgoing>
	<bpmn2:timerEventDefinition>
  		<bpmn2:timeDuration xsi:type="bpmn2:tFormalExpression">P5D</bpmn2:timeDuration>
	</bpmn2:timerEventDefinition>
</bpmn2:intermediateCatchEvent>
```

> **Note**: This will wait five days before continuing the process.

An example of the XML for `timeDate` is:

```xml
<bpmn2:timerEventDefinition> 
  <bpmn2:timeDate xsi:type="bpmn2:tFormalExpression">2017-05-17T12:42:23Z</bpmn2:timeDate>
</bpmn2:timerEventDefinition>
```

An example of the XML for `timeDuration` is:

```xml
<bpmn2:timerEventDefinition>
  <bpmn2:timeDuration xsi:type="bpmn2:tFormalExpression">P5D</bpmn2:timeDuration>
</bpmn2:timerEventDefinition>
```

> **Note**: This represents a duration of 5 days.

An example of the XML for `timeCycle` using time interval syntax is:

``` xml
<bpmn2:timerEventDefinition>
  <bpmn2:timeCycle xsi:type="bpmn2:tFormalExpression">R3/PT30M</bpmn2:timeCycle>
</bpmn2:timerEventDefinition> 
```

> **Note**: This represents three repetitions every 30 minutes.

An example of the XML for `timeCycle` using a cron expression is:

```xml
<bpmn2:timerEventDefinition>
  <bpmn2:timeCycle>0 0/5 * * * ?</bpmn2:timeCycle>
</bpmn2:timerEventDefinition>
```

> **Note**: This represents a trigger firing every 5 minutes beginning at the top of the hour.

{% endcapture %}

{% include tabs.html tableid="timer-int-cat" opt1="Properties" content1=timer-int-cat-prop opt2="Timer" content2=timer opt3="Appearance" content3=timer-int-cat-img opt4="XML" content4=timer-int-cat-xml %}

## Boundary events

Boundary events are assigned to other BPMN elements such as service tasks and user tasks. They are used by dragging the selected boundary type onto the BPMN element to influence and using the spanner icon to select the type of boundary event to use.

Whilst the element that the boundary event is attached to is being executed within a process instance, the boundary event is waiting for its trigger event. Once that event occurs the behavior can follow one of two paths:

* Interrupting behavior where the element's execution is terminated by the boundary event and the sequence flow out of the boundary event is followed. Interrupting boundary events are displayed as solid lines.

* Non-interrupting behavior where the element's execution continues and a new sequence flow is followed from the boundary event in parallel to the main sequence flow. Non-interrupting boundary events are displayed as dashed lines.

> **Note**: Depending on the boundary type, a trigger may never reach the attached boundary event. For example a signal may not be thrown for a signal boundary event to catch.

Boundary events use the `attachedToRef` property to indicate the `id` of the element they are attached to. Interrupting behavior is the default for boundary events. Non-interrupting events contain the `cancelActivity=false` property.

The types of boundary event are:

* [Error boundary events](#error-boundary-event)
* [Message boundary events](#message-boundary-event)
* [Signal boundary events](#signal-boundary-event)
* [Timer boundary events](#timer-boundary-event)

### Error boundary event

Error boundary events catch error events on the boundary of another element. Error boundary events are always interrupting, so as soon as an error is caught all process execution within the element they are attached to ceases.

{% capture error-bound-prop %}

#### Basic properties

The basic properties for an error boundary event are:

| Property | Description |
| -------- | ----------- |
| ID | *Required.* The unique identifier for the error boundary event. This is system generated and cannot be altered, for example `IntermediateThrowEvent_1yohpmt`. |
| Name | *Optional.* The name of the error boundary event. This will be displayed on the canvas. |
| Documentation | *Optional.* A free text description of what the error boundary event does. |

#### Error

An error needs to be defined for the error boundary event to catch. A previously created **Error** can be selected from the dropdown in its properties, or a new one created using the **+** symbol. An **Error name** and **Error code** can then be set.

{% endcapture %}
{% capture error-bound-img %}

Error boundary events are displayed as two thin concentric circles with a hollow lightning bolt icon inside attached to the border of another BPMN element.

{% endcapture %}
{% capture error-bound-xml %}

An example of the XML of an error boundary events is:

```xml
<bpmn2:boundaryEvent id="BoundaryEvent2" attachedToRef="ServiceTask1">
	<bpmn2:errorEventDefinition errorRef="Error_0vbkbeb" />
</bpmn2:boundaryEvent>
```

An example of the XML of a signal is:

```xml
<bpmn2:error id="Error_0vbkbeb" name="payment-failed-error" errorCode="404" />
```

{% endcapture %}

{% include tabs.html tableid="error-bound" opt1="Properties" content1=error-bound-prop opt2="Error" content2=error opt3="Appearance" content3=error-bound-img opt4="XML" content4=error-bound-xml %}

### Message boundary event

Message boundary events are attached to the boundary of another element. When a named message is received by the message boundary event, the process flow will be interrupted or a concurrent flow will be created depending on whether the event is interrupting or non-interrupting.

{% capture message-bound-prop %}

#### Basic properties

The basic properties for a message boundary event are:

| Property | Description |
| -------- | ----------- |
| ID | *Required.* The unique identifier for the message boundary event. This is system generated and cannot be altered, for example `IntermediateThrowEvent_1yohpmt`. |
| Name | *Optional.* The name of the message boundary event. This will be displayed on the canvas. |
| Documentation | *Optional.* A free text description of what the message boundary event does. |

#### Message

A message needs to be defined for the message boundary event to catch when it is thrown. A previously created **Message** can be selected from the dropdown in its properties, or a new one created using the **+** symbol. A **Message name** and payload can then be set.

{% endcapture %}
{% capture message-bound-img %}

Message boundary events are displayed as two thin concentric circles, or two thin dashed concentric circles, with a hollow envelope icon inside attached to the border of another BPMN element.

{% endcapture %}
{% capture message-bound-xml %}

An example of the XML of an interrupting message boundary events is:

```xml
<bpmn2:boundaryEvent id="BoundaryEvent1" attachedToRef="UserTask2">
	<bpmn2:outgoing>SequenceFlow5</bpmn2:outgoing>
	<bpmn2:messageEventDefinition messageRef="Message_15xakkk" />
</bpmn2:boundaryEvent>
```

An example of the XML of a non-interrupting message boundary events is:

```xml
<bpmn2:boundaryEvent id="BoundaryEvent3" cancelActivity="false" attachedToRef="SubProcess2">
	<bpmn2:outgoing>SequenceFlow8</bpmn2:outgoing>
	<bpmn2:messageEventDefinition messageRef="Message_02satcd" />
</bpmn2:boundaryEvent>
```

The XML representation of a message is:

```xml
<bpmn2:message id="Message_02satcd" name="Message_02satcd" />
```

An example of the XML of a message payload is:

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
```

An example of the XML of a message with a correlation key is:

```xml
<bpmn2:endEvent id="EndEvent_1">
	<bpmn2:incoming>SequenceFlow_8</bpmn2:incoming>
	<bpmn2:messageEventDefinition messageRef="Message_1hxecs2" activiti:correlationKey="${userId}" />
```

In this example the message will only be caught if a catching event has a `messageRef` of `Message_1hxecs2` and an `activiti:correlationKey` that matches the value of `userId`.

An example of the XML of a message flow is:

```xml
<bpmn2:collaboration id="Collaboration_0kgbwi1">
	<bpmn2:participant id="Participant_1i6u1my" processRef="Process_1d9yxsm" />
	<bpmn2:participant id="Participant_10umhbc" processRef="Process_1piiyp4" />
	<bpmn2:messageFlow id="MessageFlow_0vh4zdb" sourceRef="Event_00acemq" targetRef="Event_13u5jtf" />
</bpmn2:collaboration>
```

{% endcapture %}

{% include tabs.html tableid="message-bound" opt1="Properties" content1=message-bound-prop opt2="Message" content2=message opt3="Appearance" content3=message-bound-img opt4="XML" content4=message-bound-xml %}

### Signal boundary event

Signal boundary events can be considered catching events as they always wait to receive a named signal from a throwing event.

{% capture signal-bound-prop %}

#### Basic properties

The basic properties for a signal boundary event are:

| Property | Description |
| -------- | ----------- |
| ID | *Required.* The unique identifier for the signal boundary event. This is system generated and cannot be altered, for example `IntermediateThrowEvent_1yohpmt`. |
| Name | *Optional.* The name of the signal boundary event. This will be displayed on the canvas. |
| Documentation | *Optional.* A free text description of what the signal boundary event does. |

#### Signal

A signal needs to be defined for the signal boundary event to catch. A previously used **Signal** can be selected from the dropdown in its properties, or a new one created using the **+** symbol. A **Signal name** can then be set.

Signals can be restricted to the process instance they are thrown in, or be global in scope. The scope of a global signal is restricted to the project they are used in.

{% endcapture %}
{% capture signal-bound-img %}

Signal boundary events are displayed as two thin concentric circles with a hollow triangle icon inside attached to the border of another BPMN element.

{% endcapture %}
{% capture signal-bound-xml %}

An example of the XML of a signal boundary events is:

```xml
<bpmn2:boundaryEvent id="BoundaryEvent1" attachedToRef="ServiceTask3">
      <bpmn2:signalEventDefinition signalRef="Signal_0iikg75" />
</bpmn2:boundaryEvent>
```

An example of the XML of a signal with a global scope is:

```xml
<bpmn2:signal id="Signal_0hnsd2r" name="Signal_0hnsd2r" />
```

An example of the XML of a signal with a process instance scope is:

```xml
<bpmn2:signal id="Signal_0hnsd2r" name="Signal_0hnsd2r" activiti:scope="processInstance" />
```

{% endcapture %}

{% include tabs.html tableid="signal-bound" opt1="Properties" content1=signal-bound-prop opt2="Signal" content2=signal opt3="Appearance" content3=signal-bound-img opt4="XML" content4=signal-bound-xml %}

### Timer boundary event

Timer boundary events can be interrupting or non-interrupting. They wait for a specified time before triggering and can also be set to trigger at multiple intervals.

{% capture timer-bound-prop %}

#### Basic properties

The basic properties for a timer boundary event are:

| Property | Description |
| -------- | ----------- |
| ID | *Required.* The unique identifier for the timer boundary event. This is system generated and cannot be altered, for example `IntermediateThrowEvent_1yohpmt`. |
| Name | *Optional.* The name of the timer boundary event. This will be displayed on the canvas. |
| Documentation | *Optional.* A free text description of what the timer boundary event does. |

#### Timer

A choice of timer must be set for timer start events, based on a **Cycle**, **Date** or **Duration**.

{% endcapture %}
{% capture timer-bound-img %}

Timer boundary events are displayed as two thin concentric circles, or two thin dashed concentric circles, with a clock icon inside attached to the border of another BPMN element.

{% endcapture %}
{% capture timer-bound-xml %}

An example of the XML of an interrupting timer boundary events is:

```xml
<bpmn2:boundaryEvent id="BoundaryEvent3" attachedToRef="UserTask1">
	<bpmn2:outgoing>SequenceFlow5</bpmn2:outgoing>
	<bpmn2:timerEventDefinition>
		<bpmn2:timeDuration xsi:type="bpmn2:tFormalExpression">PT10M</bpmn2:timeDuration>
	</bpmn2:timerEventDefinition>
</bpmn2:boundaryEvent>
```

An example of the XML of a non-interrupting timer boundary events is:

```xml
<bpmn2:boundaryEvent id="BoundaryEvent4" cancelActivity="false" attachedToRef="SubProcess1">
	<bpmn2:outgoing>SequenceFlow8</bpmn2:outgoing>
	<bpmn2:timerEventDefinition>
		<bpmn2:timeDuration xsi:type="bpmn2:tFormalExpression">P5D</bpmn2:timeDuration>
	</bpmn2:timerEventDefinition>
</bpmn2:boundaryEvent>
```

An example of the XML for `timeDate` is:

```xml
<bpmn2:timerEventDefinition> 
  <bpmn2:timeDate xsi:type="bpmn2:tFormalExpression">2017-05-17T12:42:23Z</bpmn2:timeDate>
</bpmn2:timerEventDefinition>
```

An example of the XML for `timeDuration` is:

```xml
<bpmn2:timerEventDefinition>
  <bpmn2:timeDuration xsi:type="bpmn2:tFormalExpression">P5D</bpmn2:timeDuration>
</bpmn2:timerEventDefinition>
```

> **Note**: This represents a duration of 5 days.

An example of the XML for `timeCycle` using time interval syntax is:

``` xml
<bpmn2:timerEventDefinition>
  <bpmn2:timeCycle xsi:type="bpmn2:tFormalExpression">R3/PT30M</bpmn2:timeCycle>
</bpmn2:timerEventDefinition> 
```

> **Note**: This represents three repetitions every 30 minutes.

An example of the XML for `timeCycle` using a cron expression is:

```xml
<bpmn2:timerEventDefinition>
  <bpmn2:timeCycle>0 0/5 * * * ?</bpmn2:timeCycle>
</bpmn2:timerEventDefinition>
```

> **Note**: This represents a trigger firing every 5 minutes beginning at the top of the hour.

{% endcapture %}

{% include tabs.html tableid="timer-bound" opt1="Properties" content1=timer-bound-prop opt2="Timer" content2=timer opt3="Appearance" content3=timer-bound-img opt4="XML" content4=timer-bound-xml %}

## Gateways

Gateways are used to deal with convergence and divergence of the process flow. They allow for more than one fork of a process to be followed, or they can evaluate conditions so that a different route may be followed for each specific set of circumstances.

The types of gateway are:

* [Exclusive gateways](#exclusive-gateway)
* [Inclusive gateways](#inclusive-gateway)
* [Parallel gateways](#parallel-gateway)

### Exclusive gateway

Exclusive gateways represent a decision within a process.

Once the process flow reaches an exclusive gateway, all of the outgoing sequence flow options are evaluated in the order they are defined. The first option that evaluates to true is the sequence flow that is followed. A default sequence flow can be set incase none of the outgoing sequence flows evaluate to true.

{% capture excl-gate-prop %}

#### Basic properties

The basic properties for an exclusive gateway are:

| Property | Description |
| -------- | ----------- |
| ID | *Required.* The unique identifier for the exclusive gateway. This is system generated and cannot be altered, for example `Gateway_1ppp31l`. |
| Name | *Optional.* The name of the exclusive gateway. This will be displayed on the canvas. |
| Documentation | *Optional.* A free text description of what the exclusive gateway does. |

#### Default sequence flow

The name of a [sequence flow](#sequence-flow) can be used to select a default flow for the gateway to take. This path will be followed if none of the other sequence flows evaluate to true. Conditional expressions can be configured on sequence flows to select which path is taken.

{% endcapture %}
{% capture excl-gate-img %}

Exclusive gateways are displayed as a single thin diamond shape with an X icon inside.

> **Note**: A single thin diamond on its own defaults to an exclusive gateway, however the BPMN specification does not allow diamonds with, and without, an X in the same process definition.

{% endcapture %}
{% capture excl-gate-xml %}

An example of the XML of an exclusive gateway is:

```xml
<bpmn2:exclusiveGateway id="ExclusiveGateway_1" name="Content Accepted?" default="SequenceFlow_2">
	<bpmn2:incoming>SequenceFlow_1</bpmn2:incoming>
	<bpmn2:outgoing>SequenceFlow_2</bpmn2:outgoing>
	<bpmn2:outgoing>SequenceFlow_3</bpmn2:outgoing>
</bpmn2:exclusiveGateway>
    <bpmn2:sequenceFlow id="SequenceFlow_1" sourceRef="Task_1" targetRef="ExclusiveGateway_1" />
    <bpmn2:sequenceFlow id="SequenceFlow_2" name="yes" sourceRef="ExclusiveGateway_1" targetRef="Task_2">
		<bpmn2:conditionExpression xsi:type="bpmn:tFormalExpression">${content.approved == true}</bpmn2:conditionExpression>
	</bpmn2:sequenceFlow>
    <bpmn2:sequenceFlow id="SequenceFlow_3" name="no" sourceRef="ExclusiveGateway_1" targetRef="Task_3">
		<bpmn2:conditionExpression xsi:type="bpmn:tFormalExpression">${content.approved == false}</bpmn2:conditionExpression>
    </bpmn2:sequenceFlow>
```

{% endcapture %}

{% include tabs.html tableid="excl-gate" opt1="Properties" content1=excl-gate-prop opt2="Appearance" content2=excl-gate-img opt3="XML" content3=excl-gate-xml %}

### Inclusive gateway

Inclusive gateways allow for convergence and divergence in a process, however they also allow for conditional sequence flows.

Once the process flow reaches an inclusive gateway, all of the outgoing sequence flows are evaluated and all flows that evaluate to true are followed for divergent behavior. A default sequence flow can be set incase none of the outgoing sequence flows evaluate to true.

For a converging inclusive gateway, the process waits until all active sequence flows reach the gateway before continuing.

{% capture incl-gate-prop %}

#### Basic properties

The basic properties for an inclusive gateway are:

| Property | Description |
| -------- | ----------- |
| ID | *Required.* The unique identifier for the inclusive gateway. This is system generated and cannot be altered, for example `Gateway_1ppp31l`. |
| Name | *Optional.* The name of the inclusive gateway. This will be displayed on the canvas. |
| Documentation | *Optional.* A free text description of what the inclusive gateway does. |

#### Default sequence flow

The name of a [sequence flow](#sequence-flow) can be used to select a default flow for the gateway to take. This path will be followed if none of the other sequence flows evaluate to true. Conditional expressions can be configured on sequence flows to select which path is taken.

{% endcapture %}
{% capture incl-gate-img %}

Inclusive gateways are displayed as a single thin diamond shape with a circle inside.

{% endcapture %}
{% capture incl-gate-xml %}

An example of the XML of an inclusive gateway is:

```xml
<bpmn2:inclusiveGateway id="InclusiveGateway_1" name="Content Metadata" default="SequenceFlow_2">
	<bpmn2:incoming>SequenceFlow_1</bpmn2:incoming>
	<bpmn2:outgoing>SequenceFlow_2</bpmn2:outgoing>
	<bpmn2:outgoing>SequenceFlow_3</bpmn2:outgoing>
</bpmn2:inclusiveGateway>
    <bpmn2:sequenceFlow id="SequenceFlow_1" sourceRef="Task_1" targetRef="InclusiveGateway_1" />
    <bpmn2:sequenceFlow id="SequenceFlow_2" name="yes" sourceRef="InclusiveGateway_1" targetRef="Task_2">
		<bpmn2:conditionExpression xsi:type="bpmn:tFormalExpression">${content.size == "A4"}</bpmn2:conditionExpression>
	</bpmn2:sequenceFlow>
    <bpmn2:sequenceFlow id="SequenceFlow_3" name="no" sourceRef="InclusiveGateway_1" targetRef="Task_3">
		<bpmn2:conditionExpression xsi:type="bpmn:tFormalExpression">${content.origin == "Email"}</bpmn2:conditionExpression>
    </bpmn2:sequenceFlow>
```

{% endcapture %}

{% include tabs.html tableid="incl-gate" opt1="Properties" content1=incl-gate-prop opt2="Appearance" content2=incl-gate-img opt3="XML" content3=incl-gate-xml %}

### Parallel gateway

Parallel gateways represent a concurrent convergence or divergence in a process.

Divergence means that all sequence flows exiting a parallel gateway are executed concurrently. A converging parallel gateway waits for all concurrent sequence flows to arrive at the gateway, before continuing with the process.

Parallel gateways do not evaluate conditions. Any conditions set on a sequence flow will be ignored by the parallel gateway.

> **Note**: It is possible for a single parallel gateway to execute both converging and diverging behavior.

{% capture para-gate-prop %}

#### Basic properties

The basic properties for a parallel gateway are:

| Property | Description |
| -------- | ----------- |
| ID | *Required.* The unique identifier for the parallel gateway. This is system generated and cannot be altered, for example `Gateway_1ppp31l`. |
| Name | *Optional.* The name of the parallel gateway. This will be displayed on the canvas. |
| Documentation | *Optional.* A free text description of what the parallel gateway does. |

{% endcapture %}
{% capture para-gate-img %}

Parallel gateways are displayed as a single thin diamond shape with a + icon inside.

{% endcapture %}
{% capture para-gate-xml %}

An example of the XML of a parallel gateway is:

```xml
<bpmn2:parallelGateway id="Fork_1">
	<bpmn2:sequenceFlow id="SequenceFlow_1" sourceRef="Fork_1" targetRef="UserTask_1" />
 	</bpmn2:sequenceFlow>
 	<bpmn2:sequenceFlow id="SequenceFlow_2" sourceRef="Fork_1" targetRef="ServiceTask_1" />
 	</bpmn2:sequenceFlow>
</bpmn2:parallelGateway>
```

{% endcapture %}

{% include tabs.html tableid="para-gate" opt1="Properties" content1=para-gate-prop opt2="Appearance" content2=para-gate-img opt3="XML" content3=para-gate-xml %}

## Tasks

Tasks are used in a process to include other models from a project in a process.

The types of task are:

* [Business rule tasks](#business-rule-task)
* [Script tasks](#script-task)
* [Service tasks](#service-task)
* [User tasks](#user-task)

### Business rule task

Business rule tasks are used to include [decision tables]({% link process-automation/latest/model/decisions.md %}) in a process definition.

Business rule tasks are essentially treated as service tasks and will always have the `implementation` value of `dmn-connector.EXECTUTE_TABLE`. The `name` of the decision table that is associated to the business rule task is used as the `value` under `_activiti_dmn_table_` when viewing the **Extensions Editor**.

{% capture business-prop %}

#### Basic properties

The basic properties for a business rule task are:

| Property | Description |
| -------- | ----------- |
| ID | *Required.* The unique identifier for the business rule task. This is system generated and cannot be altered, for example `ServiceTask_0a1cgxd`. |
| Name | *Optional.* The name of the business rule task. This will be displayed on the canvas. |
| Documentation | *Optional.* A free text description of what the business rule task does. |

#### Multi-instance type

Business rule tasks can be set to repeat sequentially or in parallel when the process flow reaches them.

#### Decision table name

The name of the [decision table]({% link process-automation/latest/model/decisions.md %}) to use. The decision table must exist within the same project as the process definition to be selected. Select a decision table from the dropdown, else create a new one using the **+** symbol.

#### Mapping type

The mapping type sets how data is passed between the decision table and the process. There are [five options]({% link process-automation/latest/model/processes/index.md %}#process-variable-mapping) for how to send this data. The default value is **Send no variables**.

{% endcapture %}
{% capture multi %}

Multi-instance allows for the element to be repeated within a process. There are two options for how to execute multi-instance elements: sequentially or in parallel.

* Sequential executions only ever have a single instance running at any one time. The next instance will only start after the previous one has been completed.

* Parallel executions start all instances at once, meaning they are all active and can all be worked on at the same time.

Multi instance elements are displayed as three parallel lines at the bottom of the original element. Sequential lines are horizontal and parallel lines are vertical.

#### Variables

Each multi-instance execution has three variables:

| Variable | Description |
| -------- | ----------- |
| nrOfInstances | The total number of instances |
| nrOfActiveInstances | The number of currently active instances. For sequential multi-instances the value will always be 1 |
| nrOfCompletedInstances | The number of instances that have already been completed |

> **Note**: These variables can be used in multi-instance expressions without having to be declared as [process variables]({% link process-automation/latest/model/processes/index.md %}#process-variables).

Each instance in the multi-instance execution also has an instance-local variable that is not visible to other instances, nor to the process instance:

| Variable | Description |
| -------- | ----------- |
| loopCounter | The index in the for-each loop of that particular instance |

#### Cardinality

Cardinality sets the number of instances to be executed by the multi-instance element. This can be set as a static value, a [process variable]({% link process-automation/latest/model/processes/index.md %}#process-variables) or calculated as an expression.

#### Collection

A collection can be used to set the number of instances to be executed by referencing a list of items.

An element variable can optionally be used with a collection. An element variable is used to create a variable for each instance of the multi-instance element and each variable created by the element variable is assigned one value from the collection.

#### Completion condition

A completion condition can optionally be included for multi-instances. When the completion condition evaluates to `true`, all remaining instances are cancelled and the multi-instance activity ends.

#### Results

A result collection can be set to aggregate the results from each instance into a variable. The result collection is created as a process variable after instance execution has finished.

The result element variable is used to select the field or variable from the BPMN element to aggregate into the result collection.

{% endcapture %}
{% capture business-img %}

Business rule tasks are displayed as a single, thin rounded rectangle with a table icon inside.

{% endcapture %}
{% capture business-xml %}

An example of the XML of a business rule task is:

```xml
<bpmn2:serviceTask id="ServiceTask_4" implementation="dmn-connector.EXECUTE_TABLE" />
```

An example of the **Extensions Editor** JSON of a process containing a business rule task is:

```json
"constants": {
	"ServiceTask_2f85xew": {
		"_activiti_dmn_table_": {
			"value": "my-decision-table-1"
            }
        }
    },
```

An example of the XML for an element that contains sequential multi-instance elements is:

```xml
<bpmn2:multiInstanceLoopCharacteristics isSequential="true" />
```

An example of the XML for an element that contains parallel multi-instance elements is:

```xml
<bpmn2:multiInstanceLoopCharacteristics  isSequential="false" />
```

or

```xml
<bpmn2:multiInstanceLoopCharacteristics />

```

An example of the XML of multi-instance cardinality is:

```xml
<bpmn2:multiInstanceLoopCharacteristics>
	<bpmn2:loopCardinality>5</bpmn2:loopCardinality>
</bpmn2:multiInstanceLoopCharacteristics>
```

An example of the XML of a multi-instance collection is:

```xml
<bpmn2:userTask id="UserTask_1n1uk4a" activiti:assignee="${user}">
	<bpmn2:incoming>SequenceFlow_5</bpmn2:incoming>
	<bpmn2:multiInstanceLoopCharacteristics activiti:collection="${userList.users}" activiti:elementVariable="user">
	</bpmn2:multiInstanceLoopCharacteristics>
</bpmn2:userTask>
```

> **Note**: The `activiti:collection` references a process variable called `userList` that contains the following JSON:
>
>```json
>{"users":["user1", "user2", "user3"]}
>```
>
>In the example:
>
>* Three user tasks will be created because there are three items in the process variable that `activiti:collection` uses.
>* A variable will be created for each instance called `users` with the values `user1`, `user2` and `user3` because the `activiti:elementVariable` is set to `"users"`.
>* A user tasks will be assigned to each of the users because the `activiti:assignee` is set to `{users}` which is the name of the variable created in each instance by the element variable.

An example of the XML of a multi-instance completion condition is:

```xml
<bpmn2:multiInstanceLoopCharacteristics>
	<bpmn2:loopCardinality>10</bpmn2:loopCardinality>
	<bpmn2:completionCondition>${nrOfCompletedInstances/nrOfInstances >= 0.6 }</bpmn2:completionCondition>
</bpmn2:multiInstanceLoopCharacteristics>
```

> **Note**: The completion condition will be met when 60% of instances have been completed and the remaining 4 instances will be cancelled.

An example of the XML of a multi-instance element is:

```xml
<bpmn2:userTask id="UserTask_1n1uk4a" activiti:assignee="${users}">
	<bpmn2:multiInstanceLoopCharacteristics isSequential="true">
		<bpmn2:loopCardinality>4</bpmn2:loopCardinality>
		<bpmn2:loopDataOutputRef>choices</bpmn2:loopDataOutputRef>
		<bpmn2:outputDataItem name="flavor" />
	</bpmn2:multiInstanceLoopCharacteristics>
</bpmn2:userTask>
```

> **Note**: The user task will run 4 times sequentially and the values of `flavor` from the form will be stored as a JSON object in the variable `choices`. The process variable `choices` will contain a list of results similar to the following:
>
>```json
>["chocolate", "mint", "strawberry"]
>```

{% endcapture %}

{% include tabs.html tableid="business" opt1="Properties" content1=business-prop opt2="Multi-instance" content2=multi opt3="Appearance" content3=business-img opt4="XML" content4=business-xml %}

### Script task

Script tasks are used to include [scripts]({% link process-automation/latest/model/scripts.md %}) in a process definition.

Script tasks are essentially treated as service tasks and will always have the `implementation` value of `script.EXECUTE`. The `name` of the script that is associated to the script task is used as the `value` under `_activiti_script_` when viewing the **Extensions Editor**.

{% capture script-prop %}

#### Basic properties

The basic properties for a script task are:

| Property | Description |
| -------- | ----------- |
| ID | *Required.* The unique identifier for the script task. This is system generated and cannot be altered, for example `ServiceTask_0a1cgxd`. |
| Name | *Optional.* The name of the script task. This will be displayed on the canvas. |
| Documentation | *Optional.* A free text description of what the script task does. |

#### Multi-instance type

Script tasks can be set to repeat sequentially or in parallel when the process flow reaches them.

#### Script name

The name of the [script]({% link process-automation/latest/model/scripts.md %}) to use. The script must exist within the same project as the process definition to be selected. Select a script from the dropdown, else create a new one using the **+** symbol.

#### Mapping type

The mapping type sets how data is passed between the script and the process. There are [five options]({% link process-automation/latest/model/processes/index.md %}#process-variable-mapping) for how to send this data. The default value is **Send no variables**.

{% endcapture %}
{% capture script-img %}

Script tasks are displayed as a single thin, rounded rectangle with a script icon inside.

{% endcapture %}
{% capture script-xml %}

An example of the XML of a script task is:

```xml
<bpmn2:serviceTask id="Task_0gpdh83" name="Order script" implementation="script.EXECUTE">
	<bpmn2:documentation>A script to loop and update the list of orders.</bpmn2:documentation>
</bpmn2:serviceTask>
```

An example of the **Extensions Editor** JSON of a process containing a script task is:

```json
    "constants": {
        "Task_0ykbcv0": {
            "_activiti_script_": {
                "value": "order-script"
            }
        }
    }
```

An example of the XML for an element that contains sequential multi-instance elements is:

```xml
<bpmn2:multiInstanceLoopCharacteristics isSequential="true" />
```

An example of the XML for an element that contains parallel multi-instance elements is:

```xml
<bpmn2:multiInstanceLoopCharacteristics  isSequential="false" />
```

or

```xml
<bpmn2:multiInstanceLoopCharacteristics />

```

An example of the XML of multi-instance cardinality is:

```xml
<bpmn2:multiInstanceLoopCharacteristics>
	<bpmn2:loopCardinality>5</bpmn2:loopCardinality>
</bpmn2:multiInstanceLoopCharacteristics>
```

An example of the XML of a multi-instance collection is:

```xml
<bpmn2:userTask id="UserTask_1n1uk4a" activiti:assignee="${user}">
	<bpmn2:incoming>SequenceFlow_5</bpmn2:incoming>
	<bpmn2:multiInstanceLoopCharacteristics activiti:collection="${userList.users}" activiti:elementVariable="user">
	</bpmn2:multiInstanceLoopCharacteristics>
</bpmn2:userTask>
```

> **Note**: The `activiti:collection` references a process variable called `userList` that contains the following JSON:
>
>```json
>{"users":["user1", "user2", "user3"]}
>```
>
>In the example:
>
>* Three user tasks will be created because there are three items in the process variable that `activiti:collection` uses.
>* A variable will be created for each instance called `users` with the values `user1`, `user2` and `user3` because the `activiti:elementVariable` is set to `"users"`.
>* A user tasks will be assigned to each of the users because the `activiti:assignee` is set to `{users}` which is the name of the variable created in each instance by the element variable.

An example of the XML of a multi-instance completion condition is:

```xml
<bpmn2:multiInstanceLoopCharacteristics>
	<bpmn2:loopCardinality>10</bpmn2:loopCardinality>
	<bpmn2:completionCondition>${nrOfCompletedInstances/nrOfInstances >= 0.6 }</bpmn2:completionCondition>
</bpmn2:multiInstanceLoopCharacteristics>
```

> **Note**: The completion condition will be met when 60% of instances have been completed and the remaining 4 instances will be cancelled.

An example of the XML of a multi-instance element is:

```xml
<bpmn2:userTask id="UserTask_1n1uk4a" activiti:assignee="${users}">
	<bpmn2:multiInstanceLoopCharacteristics isSequential="true">
		<bpmn2:loopCardinality>4</bpmn2:loopCardinality>
		<bpmn2:loopDataOutputRef>choices</bpmn2:loopDataOutputRef>
		<bpmn2:outputDataItem name="flavor" />
	</bpmn2:multiInstanceLoopCharacteristics>
</bpmn2:userTask>
```

> **Note**: The user task will run 4 times sequentially and the values of `flavor` from the form will be stored as a JSON object in the variable `choices`. The process variable `choices` will contain a list of results similar to the following:
>
>```json
>["chocolate", "mint", "strawberry"]
>```

{% endcapture %}

{% include tabs.html tableid="script" opt1="Properties" content1=script-prop opt2="Multi-instance" content2=multi opt3="Appearance" content3=script-img opt4="XML" content4=script-xml %}

### Service task

Service tasks are used to include [connectors]({% link process-automation/latest/model/connectors/index.md %}), business rule tasks and script tasks in a process.

> **Note**: Service tasks do not emit the `TASK_CREATED` and `TASK_COMPLETED` events. The `INTEGRATION_REQUESTED` and `INTEGRATION_RESULT_RECEIVED` events should be monitored to report or track service tasks instead.

{% capture service-prop %}

#### Basic properties

The basic properties for a service task are:

| Property | Description |
| -------- | ----------- |
| ID | *Required.* The unique identifier for the service task. This is system generated and cannot be altered, for example `ServiceTask_0a1cgxd`. |
| Name | *Optional.* The name of the service task. This will be displayed on the canvas. |
| Documentation | *Optional.* A free text description of what the service task does. |

#### Multi-instance type

Script tasks can be set to repeat sequentially or in parallel when the process flow reaches them.

#### Implementation

The implementation value is used to associate a connector with a service task. For business rule tasks and script tasks this value is set by default and cannot be changed. The format is `<connector-name>.<connector-action>`.

#### Action

An action selects which of the connector actions that service task should execute, for example whether to send a message or create a new channel in Slack when using the [Slack connector]({% link process-automation/latest/model/connectors/slack.md %}).

#### Mapping type

The mapping type sets how data is passed between the connector and the process. There are [five options]({% link process-automation/latest/model/processes/index.md %}#process-variable-mapping) for how to send this data. The default value is **Send no variables**.

{% endcapture %}
{% capture service-img %}

Service tasks are displayed as a single, thin rounded rectangle with a cog icon inside.

{% endcapture %}
{% capture service-xml %}

An example of the XML of a service task is:

```xml
<bpmn2:serviceTask id="Task_19x7wuh" name="send-email" implementation="email-connector.SEND">
	<bpmn2:documentation>A connector that sends an email.</bpmn2:documentation>
	<bpmn2:incoming>SequenceFlow_19fgs1w</bpmn2:incoming>
	<bpmn2:outgoing>SequenceFlow_64jaw7e</bpmn2:outgoing>
</bpmn2:serviceTask>
```

An example of the XML for an element that contains sequential multi-instance elements is:

```xml
<bpmn2:multiInstanceLoopCharacteristics isSequential="true" />
```

An example of the XML for an element that contains parallel multi-instance elements is:

```xml
<bpmn2:multiInstanceLoopCharacteristics  isSequential="false" />
```

or

```xml
<bpmn2:multiInstanceLoopCharacteristics />

```

An example of the XML of multi-instance cardinality is:

```xml
<bpmn2:multiInstanceLoopCharacteristics>
	<bpmn2:loopCardinality>5</bpmn2:loopCardinality>
</bpmn2:multiInstanceLoopCharacteristics>
```

An example of the XML of a multi-instance collection is:

```xml
<bpmn2:userTask id="UserTask_1n1uk4a" activiti:assignee="${user}">
	<bpmn2:incoming>SequenceFlow_5</bpmn2:incoming>
	<bpmn2:multiInstanceLoopCharacteristics activiti:collection="${userList.users}" activiti:elementVariable="user">
	</bpmn2:multiInstanceLoopCharacteristics>
</bpmn2:userTask>
```

> **Note**: The `activiti:collection` references a process variable called `userList` that contains the following JSON:
>
>```json
>{"users":["user1", "user2", "user3"]}
>```
>
>In the example:
>
>* Three user tasks will be created because there are three items in the process variable that `activiti:collection` uses.
>* A variable will be created for each instance called `users` with the values `user1`, `user2` and `user3` because the `activiti:elementVariable` is set to `"users"`.
>* A user tasks will be assigned to each of the users because the `activiti:assignee` is set to `{users}` which is the name of the variable created in each instance by the element variable.

An example of the XML of a multi-instance completion condition is:

```xml
<bpmn2:multiInstanceLoopCharacteristics>
	<bpmn2:loopCardinality>10</bpmn2:loopCardinality>
	<bpmn2:completionCondition>${nrOfCompletedInstances/nrOfInstances >= 0.6 }</bpmn2:completionCondition>
</bpmn2:multiInstanceLoopCharacteristics>
```

> **Note**: The completion condition will be met when 60% of instances have been completed and the remaining 4 instances will be cancelled.

An example of the XML of a multi-instance element is:

```xml
<bpmn2:userTask id="UserTask_1n1uk4a" activiti:assignee="${users}">
	<bpmn2:multiInstanceLoopCharacteristics isSequential="true">
		<bpmn2:loopCardinality>4</bpmn2:loopCardinality>
		<bpmn2:loopDataOutputRef>choices</bpmn2:loopDataOutputRef>
		<bpmn2:outputDataItem name="flavor" />
	</bpmn2:multiInstanceLoopCharacteristics>
</bpmn2:userTask>
```

> **Note**: The user task will run 4 times sequentially and the values of `flavor` from the form will be stored as a JSON object in the variable `choices`. The process variable `choices` will contain a list of results similar to the following:
>
>```json
>["chocolate", "mint", "strawberry"]
>```

{% endcapture %}

{% include tabs.html tableid="service" opt1="Properties" content1=service-prop opt2="Multi-instance" content2=multi opt3="Appearance" content3=service-img opt4="XML" content4=service-xml %}

### User task

User tasks represent a stage in the process where human action is required.

Human action is handled by a task being assigned to specific users or groups. The task that is assigned can be modeled using a [form]({% link process-automation/latest/model/forms.md %}). Once a task is completed, the process flow continues on to the next element in the process. When a new user task is added to a process diagram, it is automatically assigned to the process initiator.

{% capture user-prop %}

#### Basic properties

The basic properties for a user task are:

| Property | Description |
| -------- | ----------- |
| ID | *Required.* The unique identifier for the user task. This is system generated and cannot be altered, for example `UserTask_0w526j8`. |
| Name | *Optional.* The name of the user task. This will be displayed on the canvas. |
| Description | *Optional.* A free text description of what the user task does.<br><br>The description can be made dynamic by writing an expression, for example: `${workflowType} for ${dealNumber} Closing Coordinator Task - Review Document`. In the Digital Workspace and the Admin app, the expression is dynamically rendered as a user-friendly task description. For example, the previous expression might render as: **Commitment and Policy for DEA1235385 Closing Coordinator Task - Review Document**. |

#### Assignment

The users or groups that are able to complete a task. A single user can be assigned or candidates can be set. Candidates are a list of users or groups that may claim a task at runtime. A single user or candidates must be set for a user task.  

A single assignee is set in the XML attribute `activiti:assignee` and candidates in the attribute `activiti:candidateGroups`. On the **Task Assignment** window use the dropdown menu on the top right to set if the assignment is for a single user or for candidates. If for candidates, from the **Assignment type** dropdown list, select either **Sequential** or **Manual** assignment types. Assigning a task manually means a user is assigned the task by another user or themselves. Assigning tasks sequentially means tasks are assigned automatically in a 'round-robin' scenario.

Users and groups can be set from three different sources:

* **Static** values are a free text field that has no validation as to whether a user exists or not. The text entered will require an exact match to a `username` in the product environment for the user task to be correctly assigned at runtime.

* **Identity** allows for [users and groups]({% link process-automation/latest/admin/users.md %}) to be searched for and selected for the assignment. The users and groups must exist whilst modeling to display in this list.

* **Expression** allows for an expression using [process variables]({% link process-automation/latest/model/processes/index.md %}#process-variables) to be used to select users and groups for the assignment. Expressions can be a simple process variable such as `${userToAssign}` or an expression such as `${userDetails.username}` that uses a process variable of type JSON. A JSON editor is provided for creating expressions for assignment, however the editor will only be displayed if there are process variables in the process.

    > **Note**: The value `"assignee": "${initiator}"` can be set as an expression without creating a process variable. This will assign the task to the user that started the process instance.  

The assignments for user tasks are stored in the `assignments` property of the **Extensions Editor**.

> **Note**: Users and groups that are selected as assignees or candidates in a user task are automatically added as [users]({% link process-automation/latest/admin/release.md %}#deploy-steps/user) when deploying an application if they are set using the static or identity options. Setting an assignee or candidate using the expression source will require the potential users or groups to be manually assigned users when deploying an application.

#### Due date

An optional date and time for a user task to be completed by in [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601){:target="_blank"} format. There are three different ways of adding a due date:

* Select **Use static date** then choose the time and date using the date picker.

* Select **Use time duration** then enter a time in Months, Days, Hours, and Minutes.

* Select **Use process variable** then choose a process variable from the dropdown list. This option uses a process variable that must use the type `datetime`.

Checking the **Use process variable** box for due date allows a [process variable]({% link process-automation/latest/model/processes/index.md %}#process-variables) to be used to generate the date. The process variable must be of type `datetime`.

#### Multi-instance type

Script tasks can be set to repeat sequentially or in parallel when the process flow reaches them.

#### Priority

An optional priority for the user task between 0 and 4. The priority property is to aid end users in their task management.  

#### Form name

A [form]({% link process-automation/latest/model/forms.md %}) can be assigned to the user task. The form must exist within the same project as the process definition to be selected. Select a form from the dropdown, else create a new form using the **+** symbol.

Once a form has been selected, it can be edited using the **Open Form** symbol.

#### Mapping type

The mapping type sets how data is passed between the user task and the process. There are [five options]({% link process-automation/latest/model/processes/index.md %}#process-variable-mapping) for how to send this data. The default value is **Send no variables**.

{% endcapture %}
{% capture user-img %}

User tasks are displayed as a single thin, rounded rectangle with a user icon inside.

{% endcapture %}
{% capture user-xml %}

An example of the XML of a user task is:

```xml
<bpmn2:userTask id="UserTask_0gpdh83" name="Order" activiti:formKey="form-38098a3e-bff1-46cb-ba0f-0c94fdb287ed" activiti:assignee="${userDetails.username}" activiti:dueDate="2020-01-01T01:00:00" activiti:priority="2">
	<bpmn2:documentation>A form to choose the flavor of ice cream.</bpmn2:documentation>
	<bpmn2:incoming>SequenceFlow_02eaofe</bpmn2:incoming>
	<bpmn2:outgoing>SequenceFlow_14ma5mo</bpmn2:outgoing>
</bpmn2:userTask>
```

An example of the XML for an element that contains sequential multi-instance elements is:

```xml
<bpmn2:multiInstanceLoopCharacteristics isSequential="true" />
```

An example of the XML for an element that contains parallel multi-instance elements is:

```xml
<bpmn2:multiInstanceLoopCharacteristics  isSequential="false" />
```

or

```xml
<bpmn2:multiInstanceLoopCharacteristics />

```

An example of the XML of multi-instance cardinality is:

```xml
<bpmn2:multiInstanceLoopCharacteristics>
	<bpmn2:loopCardinality>5</bpmn2:loopCardinality>
</bpmn2:multiInstanceLoopCharacteristics>
```

An example of the XML of a multi-instance collection is:

```xml
<bpmn2:userTask id="UserTask_1n1uk4a" activiti:assignee="${user}">
	<bpmn2:incoming>SequenceFlow_5</bpmn2:incoming>
	<bpmn2:multiInstanceLoopCharacteristics activiti:collection="${userList.users}" activiti:elementVariable="user">
	</bpmn2:multiInstanceLoopCharacteristics>
</bpmn2:userTask>
```

> **Note**: The `activiti:collection` references a process variable called `userList` that contains the following JSON:
>
>```json
>{"users":["user1", "user2", "user3"]}
>```
>
>In the example:
>
>* Three user tasks will be created because there are three items in the process variable that `activiti:collection` uses.
>* A variable will be created for each instance called `users` with the values `user1`, `user2` and `user3` because the `activiti:elementVariable` is set to `"users"`.
>* A user tasks will be assigned to each of the users because the `activiti:assignee` is set to `{users}` which is the name of the variable created in each instance by the element variable.

An example of the XML of a multi-instance completion condition is:

```xml
<bpmn2:multiInstanceLoopCharacteristics>
	<bpmn2:loopCardinality>10</bpmn2:loopCardinality>
	<bpmn2:completionCondition>${nrOfCompletedInstances/nrOfInstances >= 0.6 }</bpmn2:completionCondition>
</bpmn2:multiInstanceLoopCharacteristics>
```

> **Note**: The completion condition will be met when 60% of instances have been completed and the remaining 4 instances will be cancelled.

An example of the XML of a multi-instance element is:

```xml
<bpmn2:userTask id="UserTask_1n1uk4a" activiti:assignee="${users}">
	<bpmn2:multiInstanceLoopCharacteristics isSequential="true">
		<bpmn2:loopCardinality>4</bpmn2:loopCardinality>
		<bpmn2:loopDataOutputRef>choices</bpmn2:loopDataOutputRef>
		<bpmn2:outputDataItem name="flavor" />
	</bpmn2:multiInstanceLoopCharacteristics>
</bpmn2:userTask>
```

> **Note**: The user task will run 4 times sequentially and the values of `flavor` from the form will be stored as a JSON object in the variable `choices`. The process variable `choices` will contain a list of results similar to the following:
>
>```json
>["chocolate", "mint", "strawberry"]
>```

{% endcapture %}

{% include tabs.html tableid="user" opt1="Properties" content1=user-prop opt2="Multi-instance" content2=multi opt3="Appearance" content3=user-img opt4="XML" content4=user-xml %}

## Sub-processes and call activities

Sub-processes and call activities are used to define separate processes. Sub-processes are defined and executed within the same process definition as the parent process, whilst call activities start a completely separate process.

The types of sub-process are:

* [Call activities](#call-activity)
* [Expanded and collapsed sub-processes](#expanded-and-collapsed-sub-processes)
* [Event sub-processes](#event-sub-processes)

### Call activity

Call activities are used to start an instance of another process definition. The original process waits until the called process is complete before continuing with its own process flow.

The `calledElement` property uses a `processDefinitionId` to define which process to start.

> **Note**: When a call activity element is executed it receives its own `processInstanceId`. The [process variables]({% link process-automation/latest/model/processes/index.md %}#process-variables) of a call activity are also completely separate to those in the parent process.

> **Note**: Call activities can only be used to start a process instance of a process definition that exists in the same application as the process that is calling it.

{% capture call-prop %}

#### Basic properties

The basic properties for a call activity are:

| Property | Description |
| -------- | ----------- |
| ID | *Required.* The unique identifier for the call activity. This is system generated and cannot be altered, for example `CallActivity_1kb3t8n`. |
| Name | *Optional.* The name of the call activity. This will be displayed on the canvas. |
| Documentation | *Optional.* A free text description of what the call activity does. |

#### Multi-instance type

Sub-processes can be set to repeat sequentially or in parallel when the process flow reaches them.

#### Called element

The process definition the call activity should start is set using the called element property.

The called element can be set in two ways:

* **Static** values select a process definition name from a dropdown list.

* **Expression** values allow an expression to be set to dynamically call a process definition based on an expression or process variable.

#### Mapping type

The mapping type sets how data is passed between the parent process and the process being started by the call activity. There are [five options]({% link process-automation/latest/model/processes/index.md %}#process-variable-mapping) for how to send this data. The default value is **Send no variables**.

> **Note**: if an **Expression** is used to set which process definition to call in the call element property, it is not possible to explicitly map the variable exchange in the mapping type.

{% endcapture %}
{% capture call-img %}

Call activities are displayed as a single, thick rounded rectangle without an icon inside.

{% endcapture %}
{% capture call-xml %}

An example of the XML of a call activity is:

```xml
<bpmn2:callActivity id="Task_5" name="Start request process" calledElement="process-a6d6ca00-cbb6-45d6-ae24-50ef53d37cc4">
	<bpmn2:incoming>SequenceFlow_8</bpmn2:incoming>
	<bpmn2:outgoing>SequenceFlow_9</bpmn2:outgoing>
</bpmn2:callActivity>
```

An example of the XML for an element that contains sequential multi-instance elements is:

```xml
<bpmn2:multiInstanceLoopCharacteristics isSequential="true" />
```

An example of the XML for an element that contains parallel multi-instance elements is:

```xml
<bpmn2:multiInstanceLoopCharacteristics  isSequential="false" />
```

or

```xml
<bpmn2:multiInstanceLoopCharacteristics />

```

An example of the XML of multi-instance cardinality is:

```xml
<bpmn2:multiInstanceLoopCharacteristics>
	<bpmn2:loopCardinality>5</bpmn2:loopCardinality>
</bpmn2:multiInstanceLoopCharacteristics>
```

An example of the XML of a multi-instance collection is:

```xml
<bpmn2:userTask id="UserTask_1n1uk4a" activiti:assignee="${user}">
	<bpmn2:incoming>SequenceFlow_5</bpmn2:incoming>
	<bpmn2:multiInstanceLoopCharacteristics activiti:collection="${userList.users}" activiti:elementVariable="user">
	</bpmn2:multiInstanceLoopCharacteristics>
</bpmn2:userTask>
```

> **Note**: The `activiti:collection` references a process variable called `userList` that contains the following JSON:
>
>```json
>{"users":["user1", "user2", "user3"]}
>```
>
>In the example:
>
>* Three user tasks will be created because there are three items in the process variable that `activiti:collection` uses.
>* A variable will be created for each instance called `users` with the values `user1`, `user2` and `user3` because the `activiti:elementVariable` is set to `"users"`.
>* A user tasks will be assigned to each of the users because the `activiti:assignee` is set to `{users}` which is the name of the variable created in each instance by the element variable.

An example of the XML of a multi-instance completion condition is:

```xml
<bpmn2:multiInstanceLoopCharacteristics>
	<bpmn2:loopCardinality>10</bpmn2:loopCardinality>
	<bpmn2:completionCondition>${nrOfCompletedInstances/nrOfInstances >= 0.6 }</bpmn2:completionCondition>
</bpmn2:multiInstanceLoopCharacteristics>
```

> **Note**: The completion condition will be met when 60% of instances have been completed and the remaining 4 instances will be cancelled.

An example of the XML of a multi-instance element is:

```xml
<bpmn2:userTask id="UserTask_1n1uk4a" activiti:assignee="${users}">
	<bpmn2:multiInstanceLoopCharacteristics isSequential="true">
		<bpmn2:loopCardinality>4</bpmn2:loopCardinality>
		<bpmn2:loopDataOutputRef>choices</bpmn2:loopDataOutputRef>
		<bpmn2:outputDataItem name="flavor" />
	</bpmn2:multiInstanceLoopCharacteristics>
</bpmn2:userTask>
```

> **Note**: The user task will run 4 times sequentially and the values of `flavor` from the form will be stored as a JSON object in the variable `choices`. The process variable `choices` will contain a list of results similar to the following:
>
>```json
>["chocolate", "mint", "strawberry"]
>```

{% endcapture %}

{% include tabs.html tableid="call" opt1="Properties" content1=call-prop opt2="Multi-instance" content2=multi opt3="Appearance" content3=call-img opt4="XML" content4=call-xml %}

### Expanded and collapsed sub-processes

Sub-processes are also known as embedded sub-processes and can be expanded or collapsed. Elements for the sub-process can only be dragged into an expanded sub-process. Use the spanner icon against a sub-process to toggle between a collapsed and expanded state.

A sub-process requires a start and an end event. Only a [standard start event](#start-event) can be used in embedded sub-processes. The sequence flow within a sub-process cannot cross its boundary without the sub-process completing. The advantage of a sub-process is that it creates its own scope within a process. This allows for boundary events to be attached to the sub-process.

> **Note**: When a sub-process is executed as part of a process instance, it does not receive a new `processInstanceId`. The elements within the sub-process will be executed under the ID of the parent process. [Process variables]({% link process-automation/latest/model/processes/index.md %}#process-variables) are also shared between a sub-process and its parent with no additional mapping required.

{% capture sub-prop %}

#### Basic properties

The basic properties for a sub-process are:

| Property | Description |
| -------- | ----------- |
| ID | *Required.* The unique identifier for the sub-process. This is system generated and cannot be altered, for example `CallActivity_1kb3t8n`. |
| Name | *Optional.* The name of the sub-process. This will be displayed on the canvas. |
| Documentation | *Optional.* A free text description of what the sub-process does. |

#### Multi-instance type

Sub-processes can be set to repeat sequentially or in parallel when the process flow reaches them.

{% endcapture %}
{% capture sub-img %}

Whilst expanded, sub-processes are displayed as a single, thin rounded rectangle with the other BPMN elements they contain visible.

Whilst collapsed, sub-processes are displayed as a single, thin rounded rectangle with a `+` symbol. The BPMN elements they contain are not visible in this state.

{% endcapture %}
{% capture sub-xml %}

An example of the XML of a sub-process is:

```xml
<bpmn2:subProcess id="SubProcess1">
	<bpmn2:incoming>SequenceFlow_8</bpmn2:incoming>
	<bpmn2:outgoing>SequenceFlow_9</bpmn2:outgoing>
	...
</bpmn2:subProcess>
```

An example of the XML for an element that contains sequential multi-instance elements is:

```xml
<bpmn2:multiInstanceLoopCharacteristics isSequential="true" />
```

An example of the XML for an element that contains parallel multi-instance elements is:

```xml
<bpmn2:multiInstanceLoopCharacteristics  isSequential="false" />
```

or

```xml
<bpmn2:multiInstanceLoopCharacteristics />

```

An example of the XML of multi-instance cardinality is:

```xml
<bpmn2:multiInstanceLoopCharacteristics>
	<bpmn2:loopCardinality>5</bpmn2:loopCardinality>
</bpmn2:multiInstanceLoopCharacteristics>
```

An example of the XML of a multi-instance collection is:

```xml
<bpmn2:userTask id="UserTask_1n1uk4a" activiti:assignee="${user}">
	<bpmn2:incoming>SequenceFlow_5</bpmn2:incoming>
	<bpmn2:multiInstanceLoopCharacteristics activiti:collection="${userList.users}" activiti:elementVariable="user">
	</bpmn2:multiInstanceLoopCharacteristics>
</bpmn2:userTask>
```

> **Note**: The `activiti:collection` references a process variable called `userList` that contains the following JSON:
>
>```json
>{"users":["user1", "user2", "user3"]}
>```
>
>In the example:
>
>* Three user tasks will be created because there are three items in the process variable that `activiti:collection` uses.
>* A variable will be created for each instance called `users` with the values `user1`, `user2` and `user3` because the `activiti:elementVariable` is set to `"users"`.
>* A user tasks will be assigned to each of the users because the `activiti:assignee` is set to `{users}` which is the name of the variable created in each instance by the element variable.

An example of the XML of a multi-instance completion condition is:

```xml
<bpmn2:multiInstanceLoopCharacteristics>
	<bpmn2:loopCardinality>10</bpmn2:loopCardinality>
	<bpmn2:completionCondition>${nrOfCompletedInstances/nrOfInstances >= 0.6 }</bpmn2:completionCondition>
</bpmn2:multiInstanceLoopCharacteristics>
```

> **Note**: The completion condition will be met when 60% of instances have been completed and the remaining 4 instances will be cancelled.

An example of the XML of a multi-instance element is:

```xml
<bpmn2:userTask id="UserTask_1n1uk4a" activiti:assignee="${users}">
	<bpmn2:multiInstanceLoopCharacteristics isSequential="true">
		<bpmn2:loopCardinality>4</bpmn2:loopCardinality>
		<bpmn2:loopDataOutputRef>choices</bpmn2:loopDataOutputRef>
		<bpmn2:outputDataItem name="flavor" />
	</bpmn2:multiInstanceLoopCharacteristics>
</bpmn2:userTask>
```

> **Note**: The user task will run 4 times sequentially and the values of `flavor` from the form will be stored as a JSON object in the variable `choices`. The process variable `choices` will contain a list of results similar to the following:
>
>```json
>["chocolate", "mint", "strawberry"]
>```

{% endcapture %}

{% include tabs.html tableid="sub" opt1="Properties" content1=sub-prop opt2="Multi-instance" content2=multi opt3="Appearance" content3=sub-img opt4="XML" content4=sub-xml %}

### Event sub-processes

Event sub-processes are triggered by an event such as a signal or error and require a start and end event. As they are triggered by events an event sub-process can't be started by a standard start event. Instead start events such as error start events or message start events are used.

Event sub-processes are not connected to the main process flow as they can only be triggered by an event. The XML for an event sub-process contains the `triggeredByEvent` property set to `true`.  

Event sub-processes can be placed at the process level or inside a sub-process.

> **Note**: When an event sub-process is executed as part of a process instance, it does not receive a new `processInstanceId`. The elements within the event sub-process will be executed under the ID of the parent process. [Process variables]({% link process-automation/latest/model/processes/index.md %}#process-variables) are also shared between an event sub-process and its parent with no additional mapping required.

{% capture event-prop %}

#### Basic properties

The basic properties for an event sub-process are:

| Property | Description |
| -------- | ----------- |
| ID | *Required.* The unique identifier for the event sub-process. This is system generated and cannot be altered, for example `CallActivity_1kb3t8n`. |
| Name | *Optional.* The name of the event sub-process. This will be displayed on the canvas. |
| Documentation | *Optional.* A free text description of what the event sub-process does. |

#### Multi-instance type

Sub-processes can be set to repeat sequentially or in parallel when the process flow reaches them.

{% endcapture %}
{% capture event-img %}

Event sub-processes are displayed as a single, thin dotted rectangle.

{% endcapture %}
{% capture event-xml %}

An example of the XML of an event sub-process is:

```xml
<bpmn2:subProcess id="EventSubProcess2" triggeredByEvent="true">
	...
</bpmn2:subProcess>
```

An example of the XML for an element that contains sequential multi-instance elements is:

```xml
<bpmn2:multiInstanceLoopCharacteristics isSequential="true" />
```

An example of the XML for an element that contains parallel multi-instance elements is:

```xml
<bpmn2:multiInstanceLoopCharacteristics  isSequential="false" />
```

or

```xml
<bpmn2:multiInstanceLoopCharacteristics />

```

An example of the XML of multi-instance cardinality is:

```xml
<bpmn2:multiInstanceLoopCharacteristics>
	<bpmn2:loopCardinality>5</bpmn2:loopCardinality>
</bpmn2:multiInstanceLoopCharacteristics>
```

An example of the XML of a multi-instance collection is:

```xml
<bpmn2:userTask id="UserTask_1n1uk4a" activiti:assignee="${user}">
	<bpmn2:incoming>SequenceFlow_5</bpmn2:incoming>
	<bpmn2:multiInstanceLoopCharacteristics activiti:collection="${userList.users}" activiti:elementVariable="user">
	</bpmn2:multiInstanceLoopCharacteristics>
</bpmn2:userTask>
```

> **Note**: The `activiti:collection` references a process variable called `userList` that contains the following JSON:
>
>```json
>{"users":["user1", "user2", "user3"]}
>```
>
>In the example:
>
>* Three user tasks will be created because there are three items in the process variable that `activiti:collection` uses.
>* A variable will be created for each instance called `users` with the values `user1`, `user2` and `user3` because the `activiti:elementVariable` is set to `"users"`.
>* A user tasks will be assigned to each of the users because the `activiti:assignee` is set to `{users}` which is the name of the variable created in each instance by the element variable.

An example of the XML of a multi-instance completion condition is:

```xml
<bpmn2:multiInstanceLoopCharacteristics>
	<bpmn2:loopCardinality>10</bpmn2:loopCardinality>
	<bpmn2:completionCondition>${nrOfCompletedInstances/nrOfInstances >= 0.6 }</bpmn2:completionCondition>
</bpmn2:multiInstanceLoopCharacteristics>
```

> **Note**: The completion condition will be met when 60% of instances have been completed and the remaining 4 instances will be cancelled.

An example of the XML of a multi-instance element is:

```xml
<bpmn2:userTask id="UserTask_1n1uk4a" activiti:assignee="${users}">
	<bpmn2:multiInstanceLoopCharacteristics isSequential="true">
		<bpmn2:loopCardinality>4</bpmn2:loopCardinality>
		<bpmn2:loopDataOutputRef>choices</bpmn2:loopDataOutputRef>
		<bpmn2:outputDataItem name="flavor" />
	</bpmn2:multiInstanceLoopCharacteristics>
</bpmn2:userTask>
```

> **Note**: The user task will run 4 times sequentially and the values of `flavor` from the form will be stored as a JSON object in the variable `choices`. The process variable `choices` will contain a list of results similar to the following:
>
>```json
>["chocolate", "mint", "strawberry"]
>```

{% endcapture %}

{% include tabs.html tableid="event" opt1="Properties" content1=event-prop opt2="Multi-instance" content2=multi opt3="Appearance" content3=event-img opt4="XML" content4=event-xml %}

## Sequence flows, pools and lanes

Sequence flows represent the direction of flow in a process, whilst pools and lanes are used to model different participants, personas and process definitions in the same diagram.

### Sequence flow

Sequence flows represent the direction of flow in a process. The can be drawn between BPMN elements using the **Global connect tool**.

{% capture sequence-prop %}

#### Basic properties

The basic properties for a sequence flow are:

| Property | Description |
| -------- | ----------- |
| ID | *Required.* The unique identifier for the sequence flow. This is system generated and cannot be altered, for example `SequenceFlow_1y8xkql`. |
| Name | *Optional.* The name of the sequence flow. This will be displayed on the canvas. |
| Documentation | *Optional.* A free text description of what the sequence flow does. |

#### Condition expression

A condition expression can be set when a sequence flow is connected to an inclusive or exclusive gateway. Conditions will be evaluated to decide whether a path is taken or not. The expression syntax can reference process variables using expressions such as `${content.approved} == false}` where that path will be taken if the `approved` attribute of the variable `content` is set to `false`.

Another example of conditional expressions when evaluating a sequence flow is using amounts, for example `${amount>500}` will take the sequence flow if the process variable `amount` is greater than 500 at the point the gateway is reached.

{% endcapture %}
{% capture sequence-img %}

Sequence flows are displayed as single black lines with an arrow indicating the direction of flow.

{% endcapture %}
{% capture sequence-xml %}

An example of the XML of a sequence flow is:

```xml
<bpmn2:incoming>SequenceFlow_1</bpmn2:incoming>
<bpmn2:outgoing>SequenceFlow_2</bpmn2:outgoing>
```

An example of the XML of a sequence flow with a condition expression set is:

```xml
<bpmn2:sequenceFlow id="SequenceFlow_1" name="no" sourceRef="ExclusiveGateway_1" targetRef="Task_1">
	<bpmn2conditionExpression xsi:type="bpmn:tFormalExpression">${content.approved == false}</bpmn2:conditionExpression>
</bpmn2:sequenceFlow>
```

{% endcapture %}

{% include tabs.html tableid="sequence" opt1="Properties" content1=sequence-prop opt2="Appearance" content2=sequence-img opt3="XML" content3=sequence-xml %}

### Pools and lanes

Pools allow multiple process definitions to be modeled in a single diagram, or to utilize lanes to show the personas interacting with a process defintion. An example of using two pools would be for a customer to fill out an order in one process definition that sends a message on order completion triggering a second process defintion for a warehouse team to action. The two processes would have two completely different process instance IDs at runtime but can be modeled on the same diagram to capture the business process in a single location.

Lanes are used to display different personas interacting with a process definition to the modeler. They have no impact on a process at runtime. Lanes are sub-divisions of pools and cannot exist without them. They can also be nested for example to show different teams within a department.

> **Important**: The scope of [process variables]({% link process-automation/latest/model/processes/index.md %}#process-variables) are restricted to each process definition.

{% capture pool-prop %}

#### Basic properties

The basic properties for a pool are:

| Property | Description |
| -------- | ----------- |
| ID | *Required.* The unique identifier for the pool. This is system generated and cannot be altered, for example `Participant_0efla7f`. |
| Documentation | *Optional.* A free text description of what the pool does. |

> **Note**: Pools use the process definition name rather than having an additional name property.

{% endcapture %}
{% capture lane-prop %}

#### Basic properties

The basic properties for a lane are:

| Property | Description |
| -------- | ----------- |
| ID | *Required.* The unique identifier for the lane. This is system generated and cannot be altered, for example `Lane_1ikh7j5`. |
| Name | *Optional.* The name of the lane. This will be displayed on the canvas. |
| Documentation | *Optional.* A free text description of what the lane does. |

{% endcapture %}
{% capture pool-xml %}

An example of the XML of a pool is:

```xml
<bpmn2:collaboration id="Collaboration_0kgbwi1">
	<bpmn2:participant id="Participant_1i6u1my" processRef="Process_1d9yxsm" />
	<bpmn2:participant id="Participant_10umhbc" processRef="Process_1piiyp4" />
</bpmn2:collaboration>
```

An example of the XML of a lane is:

```xml
<bpmn2:process id="Process_1d9yxsm">
	<bpmn2:laneSet id="LaneSet_1b8nhx7">
		<bpmn2:lane id="Lane_104t61m" name="HR Department">
			<bpmn2:flowNodeRef>Event_0b61hqt</bpmn2:flowNodeRef>
			<bpmn2:flowNodeRef>Gateway_1dmrhcn</bpmn2:flowNodeRef>
		</bpmn2:lane>
		<bpmn2:lane id="Lane_1i3x8rz" name="Finance Department">
			<bpmn2:flowNodeRef>Task_16ju082</bpmn2:flowNodeRef>
			<bpmn2:flowNodeRef>Event_00acemq</bpmn2:flowNodeRef>
		</bpmn2:lane>
</bpmn2:laneSet>
```

{% endcapture %}

{% include tabs.html tableid="pools" opt1="Pools" content1=pool-prop opt2="Lanes" content2=lane-prop opt3="XML" content3=pool-xml %}
