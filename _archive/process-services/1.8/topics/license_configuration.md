# License configuration

If you start up the application without a license, it will enter read only mode; however, you can upload a license from the user interface at a later stage. In this situation, use the following configuration properties to configure the license.

|Property

|Description

|Default

|
|`license.multi-tenant`

|If no license is available on first bootstrap this property decides if system will go into single or multi-tenant mode.

|false

|
|`license.default-tenant`

|If no license is available on first bootstrap this property decides the name of the default tenant.

|tenant

|
|`license.allow-upload`

|Decides if license uploads should be allowed in the system or not.

|true

|

**Parent topic:**[Configuring Alfresco Process Services](../topics/administration_application_config.md)

