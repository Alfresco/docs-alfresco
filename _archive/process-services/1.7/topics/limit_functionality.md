# Limit functionality

The following validators don’t disable a task as a whole, but rather a feature:

**validator.editor.bpmn.disable.startevent.timecycle**: Allows the usage of a timer start event, but not with a *timeCycle* attribute, as it could be used to create process instances or tasks for many people very quickly, or simply to stress the system resources.

**validator.editor.bpmn.limit.servicetask.only-class**: Limits the service task to only be configured with a class attribute \(so no expression or delegate expression is allowed\). Since the available classes are restricted by what is on the classpath, there is a strict control over which logic is exposed.

**validator.editor.bpmn.limit.usertask.assignment.only-idm**: Limits the user task assignment to only the values that can be selected using the *Identity Store* option in the assignment pop-up. The reasoning to do this, is that this is the only way *safe* values can be selected. Otherwise, by allowing fixed values like expression, a random bean could be invoked or used to get system information.

**validator.editor.bpmn.disable.loopback**: Disables looping back with a sequence flow from an element to itself. If enabled, it is possible this way to create infinite loops \(if not applied correctly\).

**validator.editor.bpmn.limit.multiinstance.loop**: Limits the loop functionality of a multi-instance: only a loop cardinality between 1 and 10 is allowed and a collection nor completion condition is allowed. So basically, only very simple loops are permitted. Currently applied to call activities, sub processes and service tasks.

**validator.editor.dmn.expression**: Validates the expressions in the decision tables to be correct according to the DMN specification. **By default this is *true* \(unlike the others!\)**. This means that by default, the DMN decision tables are checked for correctness. If using the structured expression editor to fill in the decision tables, the resulting expressions will be valid. However,if you want to type any MVEL expressions, this property needs to be set to *\_false*.

**Parent topic:**[Validator configuration](../topics/validator_configuration.md)

