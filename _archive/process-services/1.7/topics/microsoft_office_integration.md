# Microsoft Office integration

The Microsoft Office integration \(opening an Office document directly from the browser\) doesn’t need any specific configuration. However, the protocol used for the integration mandates the use of **HTTPS** servers by default. This means that Alfresco Process Services must run on a server that has HTTPS and its certificates are correctly configured.

If this is not possible for some reason, change the setting on the machines for **each** user to make this feature work.

For Windows, see:

[http://support.microsoft.com/kb/2123563](http://support.microsoft.com/kb/2123563)

For OS X, execute following terminal command:

```
defaults -currentHost write com.microsoft.registrationDB hkey_current_user\\hkey_local_machine\\software\\microsoft\\office\\14.0\\common\\internet\\basicauthlevel -int 2
```

Note that this is not a recommended approach from a security point of view.

**Parent topic:**[Configuring Alfresco Process Services](../topics/administration_application_config.md)

