# Email Bean \(`emailBean`\)

The `emailBean` can be used to retrieve the email of the current user or the process initiator.

To get the email of the current user use the following expression where 123 is the `userId`:

`${emailBean.getEmailByUserId(123, execution)}`

To get the email of the process initiator use the following expression:

`${emailBean.getProcessInitiator(execution)}`

**Parent topic:**[Default Spring Beans](../topics/default_spring_beans.md)

