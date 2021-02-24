# Example implementation

Create a simple example synchronization service that demonstrates clearly the concepts and classes to be used. In this example, use a simple text file to represent our *external IDM source*. The *users.txt* looks as follows \(each line is a user and user data is separated by semi-colons\):

```
jlennon;John;Lennon;john@beatles.com;johnpassword;10/10/2015
rstarr;Ringo;Starr;ringo@beatles.com;ringopassword;11/10/2015
gharrison;George;Harrison;george@beatles.com;georgepassword;12/10/2015
pmccartney;Paul;McCartney;paul@beatles.com;paulpassword;13/10/2015
```

The *groups.txt* file is similar \(the group name followed by the member ids and a timestamp\):

```
beatles:jlennon;rstarr;gharrison;pmccartney:13/10/2015
singers:jlennon;pmccartney:17/10/2015
```

The application expects *one* instance implementing the **com.activiti.api.idm.ExternalIdmSourceSyncService** interface to be configured when synchronizing with an external IDM source. This interface requires a few methods to either synchronous or asynchronous do a full or differential sync. In a full sync, all data is looked at and compared. A differential sync only returns what has changed since a certain date. The latter is of course used for performance reasons. For example, the default settings for LDAP do a full sync every night and a differential sync every four hours.

You can also implement the **com.activiti.api.idm.ExternalIdmSourceSyncService** interface directly, but there is an easier way: all the logic to fetch data from the tables, compare, create, update or delete users, groups or membership is encapsulated in the **com.activiti.api.idm.AbstractExternalIdmSourceSyncService** class. It is advised to extend this class when creating a new external source synchronization service, as in that case the only logic that needs to be written is the actual fetching of the IDM data from the external source.

Create a **FileSyncService** class. Note the package, *com.activiti.extension.bean*, which is automatically component scanned. The class is annotated with *@Component* \(@Service would also work\).

```
package com.activiti.extension.bean;

@Component
public class FileSyncService extends AbstractExternalIdmSourceSyncService {

  ...

}
```

The **com.activiti.api.idm.ExternalIdmSourceSyncService** defines the different abstract methods that can be implemented. For example:

The *additionalPostConstruct\(\)* method will be called after the bean is constructed and the dependencies are injected.

```
    protected void additionalPostConstruct() {
                    // Nothing needed now
    }
```

It’s the place to add additional post construction logic, like reading properties from the configuration file. Note the *env* variable is available for that, which is a standard *org.springframework.core.env.Environment* instance:

```
    protected void additionalPostConstruct() {
        myCustomConfig = env.getProperty("my.custom.property");
    }
```

The *getIdmType\(\)* method simply returns a String identifying the external source type. It is used in the logging that is produced when the synchronization is happening.

```
    protected String getIdmType() {
      return "FILE";
    }
```

The *isFullSyncEnabled\(Long tenantId\)* and *isDifferentialSyncEnabled\(Long tenantId\)* configures whether or not respectively the *full* and/or the *differential* synchronization is enabled.

```
  protected boolean isFullSyncEnabled(Long tenantId) {
      return true;
  }

  protected boolean isDifferentialSyncEnabled(Long tenantId) {
      return false;
  }
```

**Note that the tenantId is passed here. In a non-multitenant setup, this parameter can simply be ignored. All methods of this superclass have the tenantId parameter. In a multi-tenant setup, one should write logic to loop over all the tenants in the system and call the sync methods for each of the tenants separately.**

The following two methods will configure when the synchronizations will be scheduled \(and executed asynchronously\). The return value of these methods should be a \(Spring-compatible\) cron expression. Note that this typically will be configured in a configuration properties file rather than hardcoded. When nulll is returned, that particular synchronization won’t be scheduled.

```
    protected String getScheduledFullSyncCronExpression() {
        return "0 0 0 * * ?"; // midnight
    }

    protected String getScheduledDifferentialSyncCronExpression() {
        return null;
    }
```

Now we get to the important part of the implementation: the actual fetching of users and groups. This is the method that is used during a **full synchronization**.

```
protected ExternalIdmQueryResult getAllUsersAndGroupsWithResolvedMembers(Long tenantId) {
    try {
      List<ExternalIdmUserImpl> users = readUsers();
      List<ExternalIdmGroupImpl> groups = readGroups(users);
      return new ExternalIdmQueryResultImpl(users, groups);
    } catch (Exception e) {
      e.printStackTrace();
    }
    return null;
  }
```

The return result, an instance of **com.activiti.domain.sync.ExternalIdmQueryResult**, which has a list of users in the form of **com.activiti.domain.sync.ExternalIdmUser** instances and a list of groups in the form of **com.activiti.domain.sync.ExternalIdmGroup** instances.

Note that each group has its members and child groups in it. Also note that these are all *interfaces*, so you are free to return any instance that implements these interfaces. By default there are simple POJO implementations of said interfaces: **com.activiti.domain.sync.ExternalIdmQueryResultImpl**, **com.activiti.domain.sync.ExternalIdmUserImpl** and **com.activiti.domain.sync.ExternalIdmGroupImpl**. These POJOs are also used in the example implementation above.

**Important note**: the *ExternalIdmUser* interface also defines a *getPassword\(\)* method. Only return the actual password here if you want the user to authenticate against the default tables. The returned password will be securily hashed and stored that way. Return null if the authentication is done against an external system \(LDAP is such an example\). See further down to learn more about custom authentication.

The *readUsers\(\)* and *readGroups\(\)* methods will read the .txt mentioned above from the classpath and create instances of user and groups classes using the information in those files. For example:

```
protected List<ExternalIdmUserImpl> readUsers() throws IOException, ParseException {

                List<ExternalIdmUserImpl> users = new ArrayList<ExternalIdmUserImpl>();

            InputStream inputStream = this.getClass().getClassLoader().getResourceAsStream("users.txt");
            BufferedReader bufferedReader = new BufferedReader(new InputStreamReader(inputStream));
            String line = bufferedReader.readLine();
            while (line != null) {

                String[] parsedLine = line.split(";");

                ExternalIdmUserImpl user = new ExternalIdmUserImpl();
                user.setId(parsedLine[0]);
                user.setOriginalSrcId(parsedLine[0]);
                user.setFirstName(parsedLine[1]);
                user.setLastName(parsedLine[2]);
                user.setEmail(parsedLine[3]);
                user.setPassword(parsedLine[4]);
                user.setLastModifiedTimeStamp(dateFormat.parse(parsedLine[5]));

                users.add(user);
                line = bufferedReader.readLine();
            }

            inputStream.close();
            return users;
    }

        protected List<ExternalIdmGroupImpl> readGroups(List<ExternalIdmUserImpl> users) throws IOException, ParseException {

                List<ExternalIdmGroupImpl> groups = new ArrayList<ExternalIdmGroupImpl>();

            InputStream inputStream = this.getClass().getClassLoader().getResourceAsStream("groups.txt");
            BufferedReader bufferedReader = new BufferedReader(new InputStreamReader(inputStream));
            String line = bufferedReader.readLine();
            while (line != null) {

                String[] parsedLine = line.split(":");
                String groupId = parsedLine[0];

                ExternalIdmGroupImpl group = new ExternalIdmGroupImpl();
                group.setOriginalSrcId(groupId);
                group.setName(groupId);

                List<ExternalIdmUserImpl> members = new ArrayList<ExternalIdmUserImpl>();
                String[] memberIds = parsedLine[1].split(";");
                for (String memberId : memberIds) {
                        for (ExternalIdmUserImpl user : users) {
                                if (user.getId().equals(memberId)) {
                                        members.add(user);
                                }
                        }
                }
                group.setUsers(members);

                group.setLastModifiedTimeStamp(dateFormat.parse(parsedLine[2]));

                groups.add(group);
                line = bufferedReader.readLine();
            }

            inputStream.close();
            return groups;
    }
```

For the **differential synchronization** a similar implementation could be made. Note that now a timestamp is passed, which indicates that the method should only return user/groups that are changed since that timestamp.

```
  protected List<? extends ExternalIdmUser> getUsersModifiedSince(Date latestSyncDate, Long tenantId) {

    ...​

  }

  protected List<? extends ExternalIdmGroup> getGroupsModifiedSince(Date latestSyncDate, Long tenantId) {

    ....

  }
```

The last two methods we need to implement are to indicate which users should become a tenant admin \(or a tenant manager in a multi-tenant setup\). This method should return an array of string with the **id used in the external IDM store**. More specifically, the strings in this array will be compared with the value in the **ExternalIdmUser.getOriginalSrcId\(\)** method. Note that in practice these strings often will come from a configuration file rather than being hardcoded.

```
  protected String[] getTenantManagerIdentifiers(Long tenantId) {
    return null; // No tenant manager
  }

  protected String[] getTenantAdminIdentifiers(Long tenantId) {
      return new String[] { "jlennon" };
  }
```

That’s all there is to it. As shown, no actual synchronization logic needs to be written when extending from the **AbstractExternalIdmSourceSyncService** class. The implementation should only worry about configuration and the actual fetching of the user and group information.

**Parent topic:**[Custom identity synchronization](../topics/custom_identity_synchronization.md)

