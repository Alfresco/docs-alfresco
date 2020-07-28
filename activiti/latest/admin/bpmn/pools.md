---
title: Pools and lanes
---

Pools are used to model different participants in a process definition such as different organizations or different business personas such as a customer and a manufacturer. Lanes are used to graphically represent different roles within an organization such as by different departments.

## Pools

Pools allow multiple processes to be modeled in a single process definition. The scope of process variables are restricted to each process itself. Only message events can be used to communicate between the two processes.

An example of using two pools would be for a customer to fill out an order in one process that sends a message on order completion triggering a second process for a warehouse team to action. The two processes would have different process instance IDs at runtime but would both be using the same process definition.

### Properties

When a pool is added to a process definition a `collaboration` is created in the XML with each pool being referenced by a `participant` each of which reference the process ID of the process they contain using the `processRef` attribute.

```xml
<bpmn2:collaboration id="Collaboration_0kgbwi1">
	<bpmn2:participant id="Participant_1i6u1my" processRef="Process_1d9yxsm" />
	<bpmn2:participant id="Participant_10umhbc" processRef="Process_1piiyp4" />
</bpmn2:collaboration>
```

Each element of a pool contains the same set of basic properties: 

{% capture table1 %}

| Property | Description | Example |
| -------- | ----------- | ------- |
| `id` | *Required.* The unique identifier for the element. This is system generated and cannot be altered. | Participant_1i6u1my |
| `name` | *Optional.* The name of the element. This will display on the element in the process diagram. | Flavor order |
| `documentation` | *Optional.* A free text description of what the element is. | A pool modeling the customer journey. |

{% endcapture %}

{% include table.html table=table1 %}

## Lanes

Lanes are used to display the different personas affecting a process to the modeler. Lanes have no impact on a process at runtime. Lanes can also be nested for example to show different teams within a department.

When lanes are added to a pool, a `laneSet` is added within the process itself which in turn contains multiple `lane` elements. The `flowNodeRef` is used to reference which BPMN elements are contained in each lane using their `id`.

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

### Properties

The basic properties for a lane are:

{% capture table2 %}

| Property | Description | Example |
| -------- | ----------- | ------- |
| `id` | *Required.* The unique identifier for the lane. This is system generated and cannot be altered. | UserTask_0gpdh83 |
| `name` | *Optional.* The name of the lane. This will display in the lane on the process diagram. | HR Department |
| `documentation` | *Optional.* A free text description of what the lane does | The HR Department receive the form and take appropriate action.  |

{% endcapture %}

{% include table.html table=table2 %}
