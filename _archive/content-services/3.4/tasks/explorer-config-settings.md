---
author: [Alfresco Documentation, Alfresco Documentation]
source: 
audience: 
keyword: [Explorer, configure, configuration, customization, language]
---

# Alfresco Explorer configuration settings

You can change configuration settings to modify the behavior of Alfresco Explorer.

The default configuration settings for Explorer are defined in the <configRoot\>\\web-client-config.xml file. To override the defaults and activate the Explorer configurations, add your settings to the <extension\>\\web-client-config-custom.xml file.

1.  Open the <extension\>\\web-client-config-custom.xml.sample file.

2.  Add your preferred settings to configure Alfresco Explorer.

    Place your settings between the `<config><client>` and `</client><config>` elements.

    For example:

    ```
    <config>
        <client>
          <breadcrumb-mode>path</breadcrumb-mode> 
        </client>
    </config>     
    ```

    The sample file contains some example settings that you can activate. The following tables show the additional settings that you can use.

    |Property|Description|
    |--------|-----------|
    |`<initial-password>admin</initial-password>`|Sets the initial password for the Alfresco Administrator user \(`admin`\) to a password of `admin`.|
    |`<user-group-admin>true</user-group-admin>`|Specifies whether to allow user group administration by an admin user. You can set this to false if you only ever use external user and group control, such as synchronized LDAP.|
    |`<allow-user-config>true</allow-user-config>`|Specifies whether to allow users to modify their personal settings in the user console. Set to false to prevent users from changing their passwords or configuring their person settings.|
    |`<zero-byte-file-upload>true</zero-byte-file-upload>`|Set to false to prevent empty \(zero byte\) files from being uploaded. Set to true to be able to upload empty \(zero byte\) files.|
    |`<breadcrumb-mode>path</breadcrumb-mode>`|Sets the default `path` view or a `location` view. By default, the breadcrumbs in Explorer show the history based on where you have visited. This will show the full path to a space rather than a visit history.|
    |`<edit-link-type>http</edit-link-type>`|Sets the edit link type to use for online editing. The default is inline editable. The options are `http` or `webdav`. **Note:** Due to heightened security in recent browser versions, it is not advised to use CIFS for online editing. CIFS is not a supported value in the `<edit-link-type>` setting.

|
    |`<tasks-completed-max-results>100</tasks-completed-max-results>`|Sets the limit for the number of completed tasks to display.|
    |`<default-home-space-path>/app:company_home/app:user_homes</default-home-space-path>`|Specifies the path starting point when creating or finding home folders for new users.|
    |`<home-space-permission>Consumer</home-space-permission>`|Specifies the default permissions to apply to a new users home space when it is first created. This permission is for other users attempting to access that home space. Set to `Consumer` or an empty value to indicate a private hidden space. For the allowed values, see `org.alfresco.service.cmr.security.PermissionService`.|
    |`<initial-location>myalfresco</initial-location>`|Specifies the default location to display when the browse screen is first shown. This value can be `myalfresco`, `userhome`, `companyhome`, or `guesthome`.|
    |`<allow-guest-config>false</allow-guest-config>`|Set to true allow the Guest user to configure the start location preferences.|
    |`<clipboard-status-visible>true</clipboard-status-visible>`|Specified that a status message displays when an item is added to the clipboard.|
    |`<paste-all-and-clear>true</paste-all-and-clear>`|Specified that the paste all action clears the clipboard.|
    |`<cifs-url-suffix>.alfresco.org</cifs-url-suffix>`|Specifies the domain suffix that is appended to the CIFS URL host name. The default is `.alfresco.org`.|
    |`<from-email-address>example.email@your-domain.com</from-email-address>`|Specifies an email address that will override the "from" email.|

    Other settings that you can modify include the language selection, search controls, and the minimum length of user names, passwords, and group names. These settings are shown in the following tables.

    |Language setting|Description|
    |----------------|-----------|
    |`<language-select>true</language-select>`|Sets the language selection from the login window. Set to false to select the language from the client browser locale and the language drop-down is not displayed.

|
    |`<languages>`|Shows the list of available language files that are displayed in the login window. Add or remove language entries `<language locale="XX_YY">LangName</language>`. For example: `<language locale="ja_JP">Japanese</language>`.

|

    |Search settings|Description|
    |---------------|-----------|
    |`<search-minimum>3</search-minimum>`|Specifies the minimum number of characters required for a valid search string.

|
    |`<search-and-terms>false</search-and-terms>`|Set to true to enable `AND` text terms for simple/advanced search.

|
    |`<search-max-results>500</search-max-results>`|Specified the limit for search results. Set to -1 for unlimited results.

|
    |`<selectors-search-max-results>500</selectors-search-max-results>`|Specifies the limit for search results within selectors. Set to -1 for unlimited results.

|
    |`<invite-users-max-results>500</invite-users-max-results>`|Specifies the limit for search results within the invite users wizard. Set to -1 for unlimited results.

|

    |Minimum length settings|Description|
    |-----------------------|-----------|
    |`<username-min-length>2</username-min-length>`|Specifies the minimum length for the username.

|
    |`<password-min-length>3</password-min-length>`|Specifies the minimum length for passwords.

|
    |`<group-name-min-length>3</group-name-min-length>`|Specifies the minimum length for group names.

|

3.  Save the <extension\>\\web-client-config-custom.xml.sample file without the .sample extension.


**Parent topic:**[Customizing Alfresco Explorer](../concepts/dev-explorer.md)

