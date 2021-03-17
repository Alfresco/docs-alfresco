---
title: Configure email
---

Use this information to configure email services, including inbound and outbound email, subscriptions, and email clients.

## Configure inbound and outbound email

The **email** subsystem allows you to configure the outbound and inbound SMTP email settings to interact with Community Edition.

You can run the email server process in the same JVM context as the repository.

### Inbound SMTP configuration properties

The Inbound SMTP email subsystem type allows you to configure the behavior of the email server and service.

The following properties can be set for Inbound SMTP email in the `alfresco-global.properties` file.

| Property | Description |
| -------- | ----------- |
| email.inbound.unknownUser | Specifies the user name to authenticate as when the sender address is not recognized, for example `anonymous`. |
| email.inbound.enabled | Enables or disables the inbound email service, for example `true`. The service could be used by processes other than the email server (for example, direct RMI access), so this flag is independent of the email service. |
| email.server.enabled | Enables the email server, for example `true`. |
| email.server.port | Specifies the port number for the email server, for example `25`. |
| email.server.domain | Specifies the name or the IP address of the network to bind the email server to, for example `alfresco.com`. |
| email.server.allowed.senders | Provides a comma-separated list of email REGEX patterns of allowed senders. If there are any values in the list, then all sender email addresses must match. For example: `.*\@alfresco\.com, .*\@alfresco\.org`. |
| email.server.blocked.senders | Provides a comma-separated list of email REGEX patterns of blocked senders. If the sender email address matches this, then the message will be rejected. For example: `.*\@hotmail\.com, .*\@googlemail\.com`. |

### Outbound SMTP configuration properties

The following properties can be configured for the Outbound SMTP subsystem type.

> **Note:** You must set the Outbound email configuration for Alfresco Share invitations to work correctly. If you don't set the email configuration, when you invite a user to a site, the user will not receive the assigned task notification.

The email service is exposed as a Spring bean, `mailService`, which is contained in the Outbound SMTP subsystem.

Configure the repository to send emails to an external SMTP server by overriding the default settings. Set the email property overrides in the `alfresco-global.properties` file.

| Property | Description |
| -------- | ----------- |
| mail.host | Specifies the host name of the SMTP host, i.e. the host name or IP address of the server to which email should be sent, for example `yourmailhost.com`. |
| mail.port | Specifies the port number on which the SMTP service runs (the default is `25`). Typically, the TCP port number `25` is reserved for SMTP, but this can be changed by your email administrator. |
| mail.username | Specifies the user name of the account that connects to the SMTP server. |
| mail.password | Specifies the password for the user name used in `mail.username`. |
| mail.encoding | Specifies UTF-8 encoding for email. Set this value to `UTF-8` or similar if encoding of email messages is required. |
| mail.from.default | Specifies the email address from which email notifications are sent. This setting is for emails that aren't triggered by a user, for example, feed notification emails. If the current user doesn't have an email address, this property is used for the `from` field by the `MailActionExecutor`. |
| mail.from.enabled | If this property is set to false, then the value set in `mail.from.default` is always used. If this property is set to `true`, then the `from` field may be changed. This property may be required if your email server security settings insist on matching the `from` field with the authentication details. |
| mail.protocol | Specifies which protocol to use for sending email. The value can be either `smtp` or `smtps`. |
| mail.header | Optionally specifies the content transfer encoding for the message. If specified, the **Content-Transfer-Encoding** is set to the value you specify. |

The following properties are for SMTP:

| Property | Description |
| -------- | ----------- |
| mail.smtp.auth | Specifies if authentication is required or not. Specifies the use of SMTPS authentication. If `true`, attempt to authenticate the user using the `AUTH` command. Defaults to `false`. |
| mail.smtp.timeout | Specifies the timeout in milliseconds for SMTP. |
| mail.smtp.starttls.enable | Specifies if the transport layer security needs to be enabled or not. Specifies the use of `STARTTLS` command. Set to `true` to enable the use of the `STARTTLS` command to switch the connection to a TLS-protected connection before issuing any login commands. Defaults to `false`. |
| mail.smtp.debug | Specifies if debugging SMTP is required or not. |

The following properties are for SMTPS:

| Property | Description |
| -------- | ----------- |
| mail.smtps.starttls.enable | Specifies if the transport layer security for SMTPS needs to be enabled or not. |
| mail.smtps.auth | Specifies if authentication for SMTPS is required or not. |

The following properties can be set to define a test message when the subsystem starts:

| Property | Description |
| -------- | ----------- |
| mail.testmessage.send | Defines whether or not to send a test message. |
| mail.testmessage.to | Specifies the recipient of the test message. |
| mail.testmessage.subject | Specifies the message subject of the test message. |
| mail.testmessage.text | Specifies the message body of the test message. |

The following property is for setting the email site invitation behavior:

| Property | Description |
| -------- | ----------- |
| notification.email.siteinvite | You must set the outbound email configuration for Alfresco Share invitations to work correctly. This property allows you to control whether or not emails are sent out for site invites. If you haven't configured the outbound email properties, set this property to `false`. |

The following examples show which properties to set for two different email clients. Add these properties to the `alfresco-global.properties` file.

The following example shows the properties that you need to set to configure Gmail:

```bash
# Sample Gmail settings
mail.host=smtp.gmail.com
mail.port=465
mail.username=user@gmail.com
mail.password=password
mail.protocol=smtps
mail.smtps.starttls.enable=true
mail.smtps.auth=true
```

The following example shows the properties that you need to set to configure Zimbra:

```bash
# Sample Zimbra settings
Not authenticated.

mail.host=zimbra.<your company>
mail.port=25
mail.username=anonymous
mail.password=
# Set this value to UTF-8 or similar for encoding of email messages as required
mail.encoding=UTF-8
# Set this value to 7bit or similar for Asian encoding of email headers as required
mail.header=
mail.from.default=<default from address>
mail.smtp.auth=false
mail.smtp.timeout=30000

```

### Handle messages by target node type

Default behaviors for incoming email to different types of referenced nodes. You can modify or extend the default behaviors by adding in custom handlers.

| Property | Description |
| -------- | ----------- |
| Folder(Space) | Content added with emailed aspect. |
| Forum(Discussion) | Content specialized to Post with emailed aspect; if email subject matches a topic, then add to topic, otherwise create new topic based on subject. |
| Topic(Post) | Content specialized to Post with emailed aspect; if referenced node is a Post, add to Post’s parent Topic. |
| Document(Content) | If discussion exists, same as for forums, otherwise add discussion with email as initial topic and post. |

### Groups and permissions for email

An email arriving at the Community Edition email server is unauthenticated. An authentication group, `EMAIL_CONTRIBUTORS`, must exist to allow permissions to be handled at a high level by the administrator.

When an email comes into the system, the only identification is the sender's email address. The user is looked up based on the email address.

* If a matching user isn't found, then the current user is assumed to be unknown, if unknown exists.
* If unknown doesn't exist, then the email is rejected as authentication won't be possible.
* If the user selected isn't part of email contributor's group, then the email is rejected.

The current request's user is set and all subsequent processes are run as the authenticated user. If any type of authentication error is generated, then the email is rejected. The authentication will also imply that the authenticated user may not have visibility of the target node, in which case the email is also rejected. Effectively, this means that the target recipient of the email doesn't exist, at least not for the sender.

The current default server configuration creates the `EMAIL_CONTRIBUTORS` group and adds the `admin` user to this group.

## Configure email client with IMAP {#configure-imap}

IMAP protocol support allows email applications that support IMAP (including Outlook, Apple Mail, Thunderbird, and so on) to connect to and interact with Community Edition repositories.

Each user has their own set of mailboxes stored in Community Edition, for example, they have their own INBOX. Users can manage emails in Community Edition, and the workflow, transformation, and permissions features are available.

In addition, sites can be nominated as IMAP Favorites. This means that the site contents show as a set of IMAP folders. Non-favorite sites are not shown.

A metadata extractor for IMAP emails (RFC822 messages) can extract values from the contents of the email message and store the values as properties.

> **Note:** Be careful when deciding what mount points you provide. When an IMAP client mounts a mount point, it issues a `LSUB "" *` command. This retrieves the entire tree of folders below the mount point.

### Enable IMAP protocol using alfresco-global.properties

The IMAP protocol server is disabled by default. You need to enable the IMAP protocol server to start interaction between the email client and the repository.

1. Open the `alfresco-global.properties` file.

2. Enable the IMAP server by setting the following property to `true`:

    ```bash
    imap.server.enabled=true
    ```

3. Set the IMAP server to listen on a specific interface using the following property:

    ```bash
    imap.server.host=x.x.x.x
    ```

    where `x.x.x.x` is the IP address (or corresponding DNS address) of your external IP interface. Don't use `127.0.0.1` or `localhost`.

    By default, the IMAP server listens on all interfaces on the default IMAP port of `143`. You can set this property to use an alternative port number, for example `144`.

4. Restart the Community Edition server.

Once the server has restarted, the new configuration will take effect. Since the IMAP server has only one instance, make your configuration changes to the `<extension root>alfresco-global.properties` file. You can also make your changes to `<extension root>\alfresco\extension\subsystems\imap\default\default` for the IMAP subsystem configuration to take precedence.

### IMAP subsystem properties

The following properties can be configured for the **IMAP** subsystem.

#### Enable IMAP protocol

The following properties control the **IMAP** subsystem:

| Property | Description |
| -------- | ----------- |
| imap.server.enabled | Enables or disables the IMAP subsystem, for example `true`. |
| imap.server.port | IMAP has a reserved port number of `143`. You can change it using this property. |
| imap.server.host | Replace this value with the IP address (or corresponding DNS name) of your external IP interface, for example `<your-host-name>`. |

Configure the following properties of the **sysAdmin** subsystem:

| Property | Description |
| -------- | ----------- |
| alfresco.protocol | The protocol component of the Community Edition web application URL, for example, `http`. |
| alfresco.host | The host name of the Community Edition URL, which is externally resolved. Use `${localname}` for the locally-configured host name. |
| alfresco.port | The port number of the Community Edition URL, which is externally resolved. For example, `8080` |
| alfresco.context | The context path component of the Community Edition URL. Typically this is `alfresco`. |

To configure the IMAP Home space, which is used to store user mailboxes in ARCHIVE mode, in particular the user's INBOX, use the following properties:

| Property | Description |
| -------- | ----------- |
| imap.config.home.store | Specifies the default location for the IMAP mount point. For example, `${spaces.store}`. |
| imap.config.home.rootPath | Specifies the default location for the IMAP mount point. For example, `/${spaces.company_home.childname}`.<br><br>This property may also be configured using an `XPath` query syntax.<br>`imap.config.home.rootPath=/app:company_home`<br><br>To add your own folder to this path, add the name of your folder path using the data model names. For example: <br>`/app:company_home/cm:Houses`<br><br>If your folder has a space in the name, include `_x0020_` where the space should be. For example: <br>`/app:company_home/cm:Home_x0020_Town`<br><br>Stop and start the IMAP subsystem for the changes to take effect. |
| imap.config.home.folderPath | Specifies the QName of the default location for the IMAP mount point. For example, `cm:Imap Home`. |

#### Enable IMAPS

IMAPS is a secure IMAP that's encrypted using SSL. IMAPS is assigned to port number `993` by default. When you've enabled the IMAP subsystem, you must configure the default Java keystore, and then enable IMAPS.

To configure the default Java keystore, use the following properties:

| Property | Description |
| -------- | ----------- |
| javax.net.ssl.keyStore=mySrvKeystore | Specifies the keystore to be used |
| javax.net.ssl.keyStorePassword=123456 | Specifies the keystore password |

To enable IMAPS, use the following properties:

| Property | Description |
| -------- | ----------- |
| imap.server.imaps.enabled=true | Specifies that IMAPS is enabled |
| imap.server.imaps.port=993 | Specifies the IMAPS port number |

#### Extract attachments

An IMAP message can contain a message and a set of attachments, and the IMAP server can split the attachments into separate content nodes. Use this property with caution if you have a large repository. See [Troubleshooting IMAP]({% link content-services/community/admin/troubleshoot.md%}#troubleshooting-imap) for more information.

| Property | Description |
| -------- | ----------- |
| imap.server.attachments.extraction.enabled=true | Defines whether or not attachments are extracted. |

### IMAP mount points

IMAP mount points are used to control which folders are available using IMAP and the mode in which they are accessed. Modes are used to define the type of interaction available.

The IMAP integration offers the following access modes:

| Property | Description |
| -------- | ----------- |
| Archive | Allows emails to be written to and read from Community Edition by the IMAP client by drag and drop, copy/paste, and so on, from the email client. |
| Virtual | Documents managed by Community Edition can be viewed as emails from the IMAP client. Documents are shown as virtual emails with the ability to view metadata and trigger actions on the document, using links included in the email body. |
| Mixed | A combination of both archive and virtual modes, i.e. both document access and email management are available. |

Add the IMAP composite property, `imap.config.server.mountPoints` along with the names of your IMAP mount points to the `alfresco-global.properties` file. For each mount point specify the following settings:

* `beanName`
* `store`
* `rootPath`
* `mode`

By default, a single mount point called `AlfrescoIMAP` is defined in the `MIXED` mode for Company Home and you can change it or add more mount points.

```bash
imap.config.server.mountPoints=AlfrescoIMAP
imap.config.server.mountPoints.default.mountPointName=IMAP
imap.config.server.mountPoints.default.modeName=ARCHIVE
imap.config.server.mountPoints.default.store=${spaces.store}
imap.config.server.mountPoints.default.rootPath=/${spaces.company_home.childname}
imap.config.server.mountPoints.value.AlfrescoIMAP.mountPointName=Alfresco IMAP
imap.config.server.mountPoints.value.AlfrescoIMAP.modeName=MIXED
```

In JMX dump, the same presentation looks like this:

```bash
** Object Name Alfresco:Type=Configuration,Category=imap,id1=default,id2=imap.config.server.mountPoints,id3=AlfrescoIMAP
** Object Type imap$default$imap.config.server.mountPoints$AlfrescoIMAP
folderPath
mode           MIXED
modeName       MIXED
mountPointName Alfresco IMAP
rootPath       /app:company_home
store          workspace://SpacesStore
storeRef       workspace://SpacesStore
```

> **Note:** Be careful when deciding what mount points you provide. When an IMAP client mounts a mount point, it issues a `LSUB "" *` command. This retrieves the entire tree of folders below the mount point.

### Virtual view email format

The virtualized view uses presentation templates to generate the mail body and display document metadata, action links (for download, view, webdav, folder) and Start Workflow form (HTML view only).

The templates are stored in the repository in **Company Home > Data Dictionary > Imap Configs > Templates**. Separate templates are available to generate either a HTML or plain text body, based on the format request by the email client. The templates can be customized to change the metadata and actions available in the email body.

![IMAP virtualized view]({% link content-services/images/imap-virtualized-view.png %})

### Mark sites as IMAP favorites

To have access to Alfresco Share sites using IMAP, the site(s) need to be added to your list of sites using Share IMAP Favorites.

1. Select **IMAP Favorites** in the Share **My Sites** dashlet on your **My Dashboard** page:

    ![IMAP My Sites]({% link content-services/images/imap-mysites.png %})

2. Refresh your IMAP view to see the new sites.

    ![IMAP Sites]({% link content-services/images/imap-sites.png %})

    You can see the site added to the IMAP Sites folder.

    > **Note:** If the folders don't appear in your email client, you should confirm that:

    * The folder is in a site marked as an **IMAP favorite**.
    * Your email client is showing all folders, and not just the folders that you have subscribed to.
    * In your email client, look for a property like **Reload IMAP folders**.
    * In your email client, clear your IMAP cache.

## Configure email templates using v1 REST APIs

Use this information to configure customized email templates for your registered applications using the v1 REST APIs.

There are a number of properties for configuring customized email templates when using the v1 REST APIs. Once you have developed your custom application, add the required properties in the global properties file (alfresco-global.properties) to register your application. In this file you can also set the path to each email template and any linked assets (such as images and company logo) to use your own branding.

The [`shared-links`](https://api-explorer.alfresco.com/api-explorer/#!/shared-links/emailSharedLink){:target="_blank"} and [`request-password-reset`](https://api-explorer.alfresco.com/api-explorer/#/people){:target="_blank"} APIs provide a way to send email notifications. To view these APIs, navigate to:

One of the mandatory properties in the request body of these APIs, `client`, sets the name of your registered client application. Registering a client means you can create a unique email template for each client, and configure the required email template and assets using different properties.

The client registration is based on a predefined naming convention loaded from properties files. The naming convention must conform to the format:

```bash
repo.client-app.<client-name>.<propertyName>
```

> **Note:** The client name (`<client-name>`) and property name (`<propertyName>`) must not contain a dot (`.`).

An example implementation is provided where Alfresco Share is registered as the default client for the `shared-links` and `request-password-reset` APIs. These properties are defined in `alfresco/client/config/repo-clients-apps.properties` but you can override them in `alfresco-global.properties`:

```bash
 repo.client-app.share.templateAssetsUrl=${shareUrl}/res/components/images/
 # shared-link (quickShare) base url
 repo.client-app.share.sharedLinkBaseUrl=${shareUrl}/s
 # shared-link email template path
 repo.client-app.share.sharedLinkTemplatePath=
 # reset password request email template path
 repo.client-app.share.requestResetPasswordTemplatePath=
 # reset password UI page url
 repo.client-app.share.resetPasswordPageUrl=${shareUrl}/page/reset-password
 # reset password confirmation email template path
 repo.client-app.share.confirmResetPasswordTemplatePath=
```

> **Note:** Any property without a value is ignored, however, a client can't be registered if all the properties of that client have no values.

### Configure customized email templates

In Community Edition you can customize the emails that are sent by the v1 REST API when users share links to content and request a password change.

To customize an email template for your application, register the application as a new client, then create new email templates using your own branding by adding them to the Data Dictionary.

1. Open Share, and click **Repository** on the toolbar.

2. Click **Data Dictionary** then **Email Templates**.

    You can create a folder to store your customized email templates here.

3. Add the required properties to `alfresco-global.properties`.

    Here's an example implementation for the default Share client that uses the v1 REST APIs:

    ```bash
    repo.client-app.share.templateAssetsUrl=${shareUrl}/res/components/images/
    repo.client-app.share.sharedLinkBaseUrl=${shareUrl}/s
    repo.client-app.share.sharedLinkTemplatePath=
    repo.client-app.share.requestResetPasswordTemplatePath=
    repo.client-app.share.resetPasswordPageUrl=${shareUrl}/page/reset-password
    repo.client-app.share.confirmResetPasswordTemplatePath=
    ```

    > **Note:** Any property without a value is ignored, however, a client can't be registered if all the properties for that client have no values.

    Here's the full list of property settings that you can configure. Note that the expected format of the email template paths (`*TemplatePath`) are similar:

    | Property | Description |
    | -------- | ----------- |
    | sharedLinkTemplatePath <br><br>requestResetPasswordTemplatePath <br><br>confirmResetPasswordTemplatePath | Define the template path as an XPATH, NodeRef or classpath <br>Example: XPATH: `app:company_home/app:dictionary/app: email_templates/cm:example-email.ftl` <br><br>NodeRef: `workspace://SpacesStore/a371fc59-d5ea-4849-a45c-b00c0c0d00ab` <br><br>Class path: `alfresco/templates/quickshare-email-templates/ myapp-template.ftl` |
    | templateAssetsUrl | The URL of the assets for the email template, such as images and logos, used in the HTML template. Example: `${shareUrl}/res/components/images/` |
    | sharedLinkBaseUrl | The base URL of a page where the registered application displays the shared content. Example: `${shareUrl}/s` |

    For example, to register the application `myapp` to send customized `shared-link` emails, add the following properties to `alfresco-global.properties`:

    ```bash
    repo.client-app.myapp.sharedLinkTemplatePath=myapp email template path
    repo.client-app.myapp.templateAssetsUrl=myapp email template assets url
    repo.client-app.myapp.sharedLinkBaseUrl=myapp url
    ```

    > **Note:** If the template path isn't a valid `nodeRef` or `template`, the fallback template for Share is used.

4. Restart the Alfresco server.

You can view your registered clients by using a JMX client, located under the `ClientsAppsConfigInformation` MBean.
