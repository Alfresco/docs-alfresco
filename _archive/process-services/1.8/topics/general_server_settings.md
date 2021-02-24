# General Server settings

By default, the following properties are defined.

|Property

|Description

|Default

|
|`server.contextroot`

|The context root on which the user accesses the application. This is used in various places to generate URLs to correct resources.

|activiti-app

|
|`security.rememberme.key`

|Used for cookie validation. In a multi-node setup, all nodes must have the same value for this property.

|somekey

|
|`security.csrf.disabled`

|When true, the cross-site forgery \(CSRF\) protection is disabled.

|false

|
|`security.signup.disabled`

|When true, the Alfresco Process Services sign up functionality is disabled. An error message sign up is not possible will be displayed.

|false

|

**Parent topic:**[Configuring Alfresco Process Services](../topics/administration_application_config.md)

