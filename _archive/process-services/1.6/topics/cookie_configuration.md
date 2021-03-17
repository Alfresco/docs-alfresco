# Cookie configuration

Alfresco Process Services uses an HTTP cookie to store a user session. You can use multiple cookies for different browsers and devices. The application uses a database table to store the cookie values \(called *tokens* internally\), to allow a shared persistent session store in a multi-node setup.

It’s possible to change the settings regarding cookies:

|Property

|description

|default

|
|----------|-------------|---------|
|`security.cookie.max-age`

|The maximum age of a cookie, expressed in seconds. The max-age determines the period in which the browser will send the cookie with the requests.

|2678400 \(31 days\)

|
|`security.cookie.refresh-age`

|To avoid that a users is suddenly logged out when using the application when reaching the max-age above, tokens are refreshed after this period \(expressed in seconds\). Refreshing means a new token will be created and a new cookie will be returned which the browser will use for subsequent requests. Setting the refresh-age low, will result in many new database rows when the user is using the application.

|86400 \(1 day\)

|

By default, cookies will have the *secure* flag set, when the request being made is HTTPS. If you only want to use the remember-me cookie over HTTPS \(i.e. make the *secure* flag mandatory\), set the following property to true:

|Property

|default

|
|----------|---------|
|`security.cookie.always-secure`

|false

|

To avoid that the persistent token table gets too full, a background job periodically removes obsolete cookie token values. Possible settings:

|Property

|description

|default

|
|----------|-------------|---------|
|`security.cookie.database-removal.max-age`

|The maximum age an entry in the database needs to have to be removed.

|Falls back to the `security.cookie.max-age` setting if not found. This effectively means that cookies which are no longer valid could be removed immediately from the database table.

|
|`security.cookie.database-removal.cronExpression`

|The cron expression determining when the obsolete database table entries for the cookie values will checked for removal.

|0 0 1 \* \* ? \(01:00 at night\)

|

**Parent topic:**[Developer guide](../topics/developmentGuide.md)

