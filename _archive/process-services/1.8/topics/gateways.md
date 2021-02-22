# Gateways

You use gateways to control the flow of execution in your process.

In order to explain how Sequence Flows are used within a Process, BPMN 2.0 uses the concept of a token. Tokens traverse sequence flows and pass through the elements in the process. The token is a theoretical concept used to explain the behavior of Process elements by describing how they interact with a token as it “traverses” the structure of the Process. Gateways are used to control how tokens flow through sequence flows as they converge and diverge in a process.

As the term gateway suggests, it is a gating mechanism that either allows or prevents passage of a token through the gateway. As tokens arrive at a gateway, they can be merged together on input and/or split apart on output from the gateway.

A gateway is displayed as a diamond, with an icon inside. The icon depicts the type of gateway.

-   **[Exclusive gateway](../topics/exclusive_gateway.md)**  
You use an exclusive gateway to model a decision in your process. When execution arrives at an exclusive gateway, the outgoing sequence flows are evaluated in the order in which they are defined. The first sequence flow whose condition evaluates to true, or which does not have a condition set, is selected and the process continues.
-   **[Parallel gateway](../topics/parallel_gateway.md)**  
You use a parallel gateway to model concurrency in a process. It allows you to fork multiple outgoing paths of execution or join multiple incoming paths of execution.
-   **[Inclusive gateway](../topics/inclusive_gateway.md)**  
You use an inclusive to join and fork multiple sequence flows based on conditions.
-   **[Event based gateway](../topics/event_based_gateway.md)**  
You use an event gateway to route process flow based on events.

**Parent topic:**[BPMN editor](../topics/bpmn_editor.md)

