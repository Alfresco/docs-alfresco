# Application Access and default example app

It is possible to configure whether users get access to the model editors \(the **App Designer** application\) and the analytics application.

Access to the default application is configured through *capabilities*. In the admin UI, it is possible to create *system groups*. These groups have a set of capabilities. All users part of that group have those capabilities.

The following settings configure app access when a new user is created in the system \(manual or through LDAP sync\). To enable access, set the property *app.\[APP-NAME\].default.enabled* to *true*. If *true*, a newly created user will be given access to this app.

The access is configured by adding the user to a group with a certain capability that enabled the app. The name of that group can be configured using the *app.\[APP-NAME\].default.capabilities.group* property. If this property is set, and the *app.\[APP-NAME\].default.enabled property* is set to *true*, the group with this name will be used to add the user to and provide access to the app. If the group does not exist, it is created. If the property is commented, and *app.\[APP-NAME\].default.enabled property*, a default name is used.

Currently possible app names: \{ analytics \| kickstart \}

|Property

|default

|
|----------|---------|
|`app.analytics.default.enabled`

|true

|
|`app.analytics.default.capabilities.group`

|analytics-users

|
|`app.kickstart.default.enabled`

|true

|
|`app.kickstart.default.capabilities.group`

|kickstart-users

|

The following setting, if set to *true*, will create a default example app with some simple review and approve processes for every newly created user.

|Property

|default

|
|----------|---------|
|`app.review-workflows.enabled`

|false

|

**Parent topic:**[Configuring Alfresco Process Services](../topics/administration_application_config.md)

