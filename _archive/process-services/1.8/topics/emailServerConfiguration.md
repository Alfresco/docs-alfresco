# Email Server configuration

The application sends out emails to users on various events. For example, when a task is assigned to the user.

Set the following properties to configure the email server.

|Property

|Description

|
|`email.enabled`

|Enables or disables the email functionality as a whole. By default, it is set to false, therefore make sure to set it to true when you require the email functionality.

|
|`email.host`

|The host address of the email server.

|
|`email.port`

|The port on which the email server is running.

|
|`email.useCredentials`

|Boolean value. Indicates if the email server needs credentials to make a connection. If so, both username and password need to be set.

|
|`email.username`

|The username used as credentials when *email.useCredentials* is *true*.

|
|`email.password`

|The password used as credentials when *email.useCredentials* is *true*.

|
|`email.ssl`

|Defines if SSL is needed for the connection to the email server.

|
|`email.tls`

|Defines if TLS is needed for the connection to the email server. This needs to be true when Google mail is used as the mail server for example.

|
|`email.from.default`

|The email address that is used in the *from* field of any email sent.

|
|`email.from.default.name`

|The name that is used in the *from* field of the email sent.

|
|`email.feedback.default`

|Some emails will have a feedback email address that people can use to send feedback. This property defines this.

|

Emails are created by a template engine. The emails can contain various links to the runtime system to bring the user straight to the correct page in the web application.

Set the following property to correct the links. The example in the following table uses *'localhost'* as host address and *'activiti-app'* as the context root:

|Property

|Example

|
|`email.base.url`

|[http://localhost:8080/activiti-app](http://localhost:8080/activiti-app)

|

**Parent topic:**[Configuring Alfresco Process Services](../topics/administration_application_config.md)

