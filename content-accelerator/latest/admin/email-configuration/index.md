---
title: Email Configuration
---

OpenContent can send email via the `IEmail` interface, commonly accessed via `RESTEmail`

## Email Configuration
Email properties are defaulted in `core-defaults.properties`.  Projects should override these properties in an `opencontent-override-placeholders.properties` **outside the war/amp**.  See [External Properties](https://github.com/tsgrp/OpenContent/wiki/External-Properties) and [OC Configuration Files](https://github.com/tsgrp/OpenContent/wiki/OC-Configuration-Files) for more information on how these properties files work.  

Email properties available to set are as follows:

```properties
oc.email.smtp.host=
oc.email.smtp.user=
oc.email.smtp.password=
# the address emails are sent from if one is not provided
oc.email.smtp.default.from=
# if true all emails are sent from the `oc.email.smtp.default.from` address above, if it is not blank
oc.email.smtp.default.from.overrideWithDefault=false
oc.email.smtp.port=
oc.email.smtp.protocol=
oc.email.smtp.auth=
oc.email.smtp.starttls.enable=
oc.email.smtp.starttls.required=
```

If your SMTP does not require authentication, the only property that you must set is the `oc.email.smtp.host`.  All other properties are available as needed.

## Configuring for GMail SMTP
If you are attempting to use `smtp.gmail.com` to send emails, the following settings should be used.  Replace the `oc.email.smtp.user` and `oc.email.smtp.password` appropriately.  You may also want to double check that the port below is correct for your Gmail server as well.

```properties
oc.email.smtp.host=smtp.gmail.com
oc.email.smtp.user=gmail-user-here
oc.email.smtp.password=@{encrypted-pwd-here}
# the address emails are sent from if one is not provided
oc.email.smtp.default.from=from-user-here
# if true all emails are sent from the `oc.email.smtp.default.from` address above, if it is not blank
oc.email.smtp.default.from.overrideWithDefault=false
oc.email.smtp.port=465
oc.email.smtp.protocol=smtps
oc.email.smtp.auth=true
oc.email.smtp.starttls.enable=true
oc.email.smtp.starttls.required=true
```

Note that depending on your GMail setup, you may need to "Less secure app access" in the security settings of the google account used for the `oc.email.smtp.user`.

** Update as of September 2022 - the above "Less secure app access" setting is no longer available. To enable Gmail access, follow these steps:

1. Enable 2 step verification on your Gmail account
1. Generate an App specific password [https://support.google.com/accounts/answer/185833#:~:text=to%2520your%2520data.-,sign%2520in%2520with%2520app%2520passwords,-Tip%253A%2520App%2520Passwords](https://support.google.com/accounts/answer/185833#:~:text=to%2520your%2520data.-,sign%2520in%2520with%2520app%2520passwords,-Tip%253A%2520App%2520Passwords) 
1. Use the app specific password

** End update

The above properties should be placed in a `project-placeholders.properties` or `override-placeholders.properties` file as appropriate.

To obtain an encrypted password see [Encrypting a Password](https://github.com/tsgrp/OpenContent/wiki/Encrypting-a-Password).
