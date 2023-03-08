---
title: Work with licenses
---

Access to Content Services is licensed on a per user basis.

You can register any number of users (see [Setting up authentication and sync]({% link content-services/7.2/admin/auth-sync.md %})) and a license is only consumed when the registered user logs in and is authorized.

You can see a list of users along with their authorization states on the **Admin Console > Users and Groups > Users** page. A registered user can have any one of the following states:

* **Never Authorized**: Specifies that the user has been registered but never logged in.
* **Authorized**: Specifies that the user has successfully logged in.
* **Deauthorized**: Specifies that the Administrator has removed the user from the authorization list.

![userlicense]({% link content-services/images/userlicense.png %})

If a user attempts to login for the first time and the user license limit has been exceeded, the login attempt will fail.

## Upload new license {#uploadlicense}

The access and use of Content Services is managed by your license. The license is a file that you upload, which sets limits on the maximum number of users and a maximum number of content objects that you can use. Your limitations are set when you purchase the license. To increase the limitations, contact Alfresco to obtain a new license.

You will receive an email confirming the purchase of your license, and a license file is attached to the email. The license file has a filename of `<license-name>.lic`. You use this license file to upload the license restrictions into your system.

Before you upload a new license, ensure that Content Services is running and that you can access the [Repository Admin Console]({% link content-services/7.2/admin/admin-console.md %}). When you first run Content Services, it defaults to using a trial license. You must upload your purchased license to run the server before the trial period has expired.

1. Open the Repository **Admin Console**.

2. In the **General** section, click **License**.

3. In the **License Management** section, there are two options for applying the license:

    **Upload License** which allows you to locate a license file anywhere on your system.

    1. Click **Upload License**.

        You can then locate and select the license file from the directory structure.

    2. Select the file, and then click **Upload**.

        The new license will be applied to the repository. This will take precedence over license files on the file system. You might also need to restart the server to enable any features added in the new license.

    **Apply New License** which automatically applies a license file that is stored in the install directory. Note that these steps only work if your currently installed license is invalid.

    1. Copy the license file to the directory in which Content Services is installed.

        For example, on Windows, copy the file to the `C:\Alfresco directory`; on Linux, copy the file to `/opt/alfresco-x.x.x`.

    2. Click **Apply New License**.

        This applies a new license that is stored on the file system. This option won't apply the license if the server has a license uploaded to the repository.

When you've uploaded your license, the `.lic` file is automatically renamed to `<license-name>.lic.installed`.

When your license is about to expire, you must purchase a new license and upload it to your system. When you purchase further licenses, repeat the same steps using the new license file.

> **Note:** A license is unique to a specific version. When you upgrade to a new version of Content Services, you need to install a new license.

> **Note:** In a cluster environment, you can apply the license to a single node and restart all the other nodes to ensure they pick up the changes. If you do not want to restart your nodes you can upload the license to the nodes individually via the **Repo Admin Console**. The license is shared by all nodes of the cluster.

## Authorize users

Registered users are authorized the first time they login to Content Services unless they have `ALFRESCO_ADMINSTRATORS` permissions, in which case they're pre-authorized.

When the user first login using their username and password, the login mechanism validates the login credentials. If the system is within the license limit, the user can successfully login, otherwise the login attempt fails and the user remains in the `Never Authorized` state. Periodically, the Authorization Audit Service job runs to check usage conforms to the license limit. The period at which the Authorization Audit Service job runs is set to default values in `repository.properties` as follows:

```text
# Configuration of the Authorization Audit trigger
# By default every second day of the week at 03:00
authorization.audit.day=2
authorization.audit.hour=3
authorization.audit.minute=0
```

These properties can be overridden in `alfresco-global.properties`.

To authorize an administrative user:

1. Click Share **Admin Tools**, and then click **Groups**.

2. On the **Groups** page, click **Browse**.

    The leftmost pane shows all the top-level user groups.

3. From the user groups list, click `ALFRESCO_ADMINISTRATORS`.

4. To add a user, click the **Add User** icon. Using the search feature provided, locate the user you want to add to the selected group. Click **Add** to the right of the user.

    The individual user is added as a child to the `ALFRESCO_ADMINISTRATORS` group.

5. On the **Admin Tools** page, click **Users**.

    The **User Search** page displays a list of all users along with their authorization status. The authorization state of the user added to the `ALFRESCO_ADMINISTRATORS` group has changed from `Never Authorized` to `Authorized`.

> **Note:** To enable an administrator to perform the administrative tasks, members of the `ALFRESCO_ADMINSTRATORS` permissions group are automatically authorized, if they're not already authorized.

## Deauthorize authorized user

You can remove authorized users from the authorization list by deauthorizing them.

Users from the `ALFRESCO_ADMINSTRATORS` permissions group can't be deauthorized without being first removed from this group.

To deuathorize a user:

1. Click Share **Admin Tools**, and then click **Users**.

    You see the **User Search** page.

2. In the search box, enter the full or partial name of the user.

3. Click **Search**.

    The result table displays the user name along with its authorization status.

4. Click the deauthorization icon (![deauthorize]({% link content-services/images/deauthorize.png %}){:height="18px" width="18px"}) next to the user you want to deauthorize.

    You will be prompted to confirm your action.

5. In the prompt window, select the checkbox to confirm your action.

6. Click **Deauthorize**.

    The relevant user's authorization status changes to `Deauthorized`.

To reauthorize a previously deauthorized user, contact [Alfresco Support](https://support.alfresco.com/){:target="_blank"}.
