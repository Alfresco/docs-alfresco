# Generic Synchronization settings

These are settings that are generic or shared between user and group objects. For each property, an example setting of a *regular* LDAP system \(that is, ApacheDS\) and Active Directory is shown.

|Property|Description|LDAP Example|Active Directory Example|
|--------|-----------|------------|------------------------|
|*ldap.synchronization.distinguishedNameAttributeName*

|The attribute that is the *disinguished name* in the system.

|dn

|dn

|
|*ldap.synchronization.modifyTimestampAttributeName*

|The name of the *operational* attribute recording the last update time for a group or user. Important for the differential query.

|modifyTimestamp

|whenChanged

|
|*ldap.synchronization.createTimestampAttributeName*

|The name of the operational attribute recording the create time for a group or user. Important for the differential query.

|createTimestamp

|whenCreated

|
|*ldap.synchronization.timestampFormat*

|The timestamp format. This is specific to the directory servers and can vary.

|yyyyMMddHHmmss.SSS’Z'

|yyyyMMddHHmmss'.0Z'

|
|*ldap.synchronization.timestampFormat.locale.language*

|The timestamp format locale language for parsing. Follows the java.util.Locale semantics.

|en

|en

|
|*ldap.synchronization.timestampFormat.locale.country*

|The timestamp format locale country. Follows the java.util.Locale semantics.

|GB

|GB

|
|*ldap.synchronization.timestampFormat.timezone*

|The timestamp format timezone. Follows the java.text.SimpleDateFormat semantics.

|GMT

|GMT

|

**Parent topic:**[Synchronization](../topics/synchronization.md)

