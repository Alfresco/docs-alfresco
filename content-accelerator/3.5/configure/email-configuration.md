---
title: Email Configuration
---

ACA has the ability to send emails to users and groups as a part of certains actions and workflows.

### Email Properties

Email properties available for overriding via OC properties are as follows:

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

If your SMTP does not require authentication, the only property that you must set is the `oc.email.smtp.host`.

### Example for Configuring GMail SMTP

If you are attempting to use `smtp.gmail.com` to send emails, the following settings should be used.  Replace the `oc.email.smtp.user` and `oc.email.smtp.password` appropriately.  You may also want to double check that the port below is correct for your Gmail server as well.

```properties
oc.email.smtp.host=smtp.gmail.com
oc.email.smtp.user=gmail-user-here
oc.email.smtp.password=@{encrypted-pwd-here}
oc.email.smtp.default.from=from-user-here
oc.email.smtp.default.from.overrideWithDefault=false
oc.email.smtp.port=465
oc.email.smtp.protocol=smtps
oc.email.smtp.auth=true
oc.email.smtp.starttls.enable=true
oc.email.smtp.starttls.required=true
```

To enable Gmail access, follow these steps:

1. Enable 2-step verification on your Gmail account.

2. Generate an App specific password [Create & use App Passwords](https://support.google.com/accounts/answer/185833#:~:text=to%2520your%2520data.-,sign%2520in%2520with%2520app%2520passwords,-Tip%253A%2520App%2520Passwords){:target="_blank"}.

3. Use the app specific password.

To override these properties and see how to encrypt a password refer to the [OpenContent Property Overrides]({% link content-accelerator/3.5/configure/oc-property-overrides.md %}) page.
