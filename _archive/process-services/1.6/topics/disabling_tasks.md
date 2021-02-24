# Disabling tasks

The following validators disable the usage of certain tasks. The various validators are configured through the regular Alfresco Process Services properties. The default value for these validators is **false'*. Set the property to '*true** to enable the validator.

-   ****validator.editor.bpmn.disable.startevent.timer\|signal\|message\|error****

    Disables the usage of the timer, signal, message or error start event in a process definition.

-   ****validator.editor.bpmn.disable.scripttask****

    Disables the usage of the *script task* in a process definition. Disabling script tasks is typically something you’ll want to do when exposing the modeling tools to end users. Scripts, contrary to the service tasks, don’t need any class on the classpath to be executed. As such, it’s very easy with scripts to execute code with bad intentions.

-   ****validator.editor.bpmn.disable.servicetask****

    Disables the usage of the *service task* in a process definition. Service tasks are used to call custom logic when the process instance executes the service task. A service task is configured to either use a class that needs to be put on the classpath or an expression. This setting disables the usage of service tasks completely.

-   ****validator.editor.bpmn.disable.executionlistener****

    Disables the possibility to define execution listeners in a BPMN process definition. Execution listeners allow to add custom logic to the process diagram that is not visible in the diagram. This setting also disables task listeners on tasks.

-   ****validator.editor.bpmn.disable.mailtask****

    Disables the *mail task* that is used for sending emails.

-   ****validator.editor.bpmn.disable.intermediatethrowevent****

    Disables the usage of all intermediate throw events: none, signal, message, error. They can be used to create infinite loops in processes.

-   ****validator.editor.bpmn.disable.manualtask****

    Disables the usage of the *manual task* task in a process definition.

-   ****validator.editor.bpmn.disable.businessruletask****

    Disables the usage of the *business rule task* in a process definition.

-   ****validator.editor.bpmn.disable.cameltask****

    Disables the usage of the *Camel task* in a process definition. Camel tasks can interact with Apache Camel for various system integrations and have, like regular *JavaDelegate* classes access to the whole engine.

-   ****validator.editor.bpmn.disable.muletask****

    Disables the usage of the *Mule task* in a process definition. Mule tasks are used to interact with a Mule server.


**Parent topic:**[Validator configuration](../topics/validator_configuration.md)

