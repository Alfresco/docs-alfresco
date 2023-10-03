---
title: Bootstrap Content Extension Point
---

For many content management solutions it is useful to have some data populated when the solution is first deployed. 
This is done by bootstrapping content.

Architecture Information: [Platform Architecture]({% link content-services/7.2/develop/software-architecture.md %}#platformarch)

## Description

When implementing a content management solution it is common to have some content, such as sites, that is part of the 
solution. To load this content into the repository when the solution is first deployed we use bootstrapping. To bootstrap 
content means to load it once into the repository. Besides bootstrapping sites, it is also common to bootstrap folders, 
files, categories, rules, permissions, users, and groups. There are two ways in which content can be boostrapped (imported) 
into the repository via an AMP or JAR module extension. There is **patch** based bootstrapping that is triggered based on 
the Alfresco schema version and is not linked to the module version. Patch bootstrapping can, for example, be used for 
database schema upgrades. But it can also be used to bootstrap Share sites and other types of content. Then we have the 
**importer module component** that is used more often as the bootstrapping happens when the module (i.e. AMP or JAR) is 
deployed into the repository. The execution of the importer component is tied to a specific version of the module, which 
is handy when a module evolves incrementally.

Both the patch approach and the importer module component approach uses a specific XML format to describe what content 
that should be imported and where it should go in the repository. When you export content from the repository it will be 
descibed in this XML format. Exported content usually comes packaged in an Alfresco Content Package (ACP), which is just 
a ZIP file, and it contains this XML file plus the binary files for the content.

>**Important:** If you mix patches and importer components when bootstrapping content it might not work in all situations as patches are executed before importer components. For example, if you have an importer component that bootstraps some groups that should later be used by a site load patch, it will not work.

The following sections will show the type of XML needed for importing different types of content and the associated 
Spring beans, in these samples we use the patch approach.

Let's start bootstrapping some users and groups as they are usually used also when bootstrapping permissions and sites. 
Normally users and groups would be imported via a directory sync, but let's just bootstrap them manually for 
demonstration purposes. Sometimes you also need special users that aren't in the directory, such as test users.

### Bootstrapping users 

Bootstrapping users into the repository involves two steps, the first takes care of bootstrapping the User Profile with 
first name, last name, email etc. This is done with an XML file looking like this:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<view:view xmlns:view="http://www.alfresco.org/view/repository/1.0"
           xmlns:cm="http://www.alfresco.org/model/content/1.0">
    <cm:person view:childName="cm:alftest1">
        <view:acl>
            <view:ace view:access="ALLOWED">
                <view:authority>alftest1</view:authority>
                <view:permission>All</view:permission>
            </view:ace>
        </view:acl>
        <view:properties>
            <cm:firstName>Alf Test</cm:firstName>
            <cm:lastName>Number 1</cm:lastName>
            <cm:email>alftest1@alfresco.com</cm:email>
            <cm:userName>alftest1</cm:userName>
            <cm:homeFolder>/app:company_home/app:user_homes/cm:alftest1</cm:homeFolder>
            <cm:organizationId>Alfresco</cm:organizationId>
            <cm:sizeQuota>-1</cm:sizeQuota>
            <cm:sizeCurrent>0</cm:sizeCurrent>
        </view:properties>
    </cm:person>
    <cm:person view:childName="cm:alftest2">
        <view:acl>
            <view:ace view:access="ALLOWED">
                <view:authority>alftest2</view:authority>
                <view:permission>All</view:permission>
            </view:ace>
        </view:acl>
        <view:properties>
            <cm:firstName>Alf Test</cm:firstName>
            <cm:lastName>Number 2</cm:lastName>
            <cm:email>alftest2@alfresco.com</cm:email>
            <cm:userName>alftest2</cm:userName>
            <cm:homeFolder>/app:company_home/app:user_homes/cm:alftest2</cm:homeFolder>
            <cm:organizationId>Alfresco</cm:organizationId>
            <cm:sizeQuota>-1</cm:sizeQuota>
            <cm:sizeCurrent>0</cm:sizeCurrent>
        </view:properties>
    </cm:person>
</view:view>
```

In this case we are bootstrapping profile information for two users, `alftest1` and `alftest2`. We can store this XML 
file as part of the Repository JAR module extension project in a file name such as `import-user-profiles.xml`.

For each user profile we bootstrap, Content Services also needs some internal account information set up, 
such as password, account expire information etc. This is also done in an XML file as follows:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<view:view xmlns:view="http://www.alfresco.org/view/repository/1.0"
           xmlns:usr="http://www.alfresco.org/model/user/1.0"
           xmlns:sys="http://www.alfresco.org/model/system/1.0">

    <!-- Load the user account information -->
    <usr:user view:childName="usr:alftest1">
        <view:aspects>
            <sys:referenceable></sys:referenceable>
        </view:aspects>
        <view:properties>
            <usr:username>alftest1</usr:username>
            <usr:password>7ce21f17c0aee7fb9ceba532d0546ad6</usr:password> <!-- 1234 -->
            <usr:accountExpires>false</usr:accountExpires>
            <usr:credentialsExpire>false</usr:credentialsExpire>
            <usr:accountLocked>false</usr:accountLocked>
            <usr:enabled>true</usr:enabled>
        </view:properties>
    </usr:user>
    <usr:user view:childName="usr:alftest2">
        <view:aspects>
            <sys:referenceable></sys:referenceable>
        </view:aspects>
        <view:properties>
            <usr:username>alftest2</usr:username>
            <usr:password>7ce21f17c0aee7fb9ceba532d0546ad6</usr:password> <!-- 1234 -->
            <usr:accountExpires>false</usr:accountExpires>
            <usr:credentialsExpire>false</usr:credentialsExpire>
            <usr:accountLocked>false</usr:accountLocked>
            <usr:enabled>true</usr:enabled>
        </view:properties>
    </usr:user>
</view:view>
```

The `password` is stored as an MD4 Hash, which can be generated following the instructions on 
[this page](https://hub.alfresco.com/t5/alfresco-content-services-hub/security-and-authentication/ba-p/290215#toc-hId-919638868){:target="_blank"}.

Note that while MD4 is the default encoding format for passwords, there is additional support for Bcrypt. For more information 
about Bcrypt support, see [Cryptographic password hashing]({% link content-services/7.2/admin/security.md %}#bcryptoverview).

We can store this XML file as part of the Repository JAR module extension project in a file name such as `import-users.xml`.

These two XML files can be loaded via Spring bean configurations as follows:

```xml
<bean id="org.alfresco.tutorial.bootstrap.patch.userProfilesLoader"
      class="org.alfresco.repo.admin.patch.impl.GenericBootstrapPatch"
      parent="basePatch" >
    <property name="id"><value>org.alfresco.tutorial.bootstrap.patch.userProfilesLoader</value></property>
    <property name="description"><value>org.alfresco.tutorial.bootstrap.patch.userProfilesLoader.description</value></property>
    <property name="fixesFromSchema"><value>0</value></property>
    <property name="fixesToSchema"><value>${version.schema}</value></property>
    <property name="targetSchema"><value>99999</value></property>
    <property name="importerBootstrap">
        <ref bean="spacesBootstrap" />
    </property>
    <property name="bootstrapView">
        <props>
            <prop key="path">/${system.system_container.childname}/${system.people_container.childname}</prop>
            <prop key="location">alfresco/module/bootstrap-content-repo/bootstrap/import-user-profiles.xml</prop>
        </props>
    </property>
</bean>

<bean id="org.alfresco.tutorial.bootstrap.patch.usersLoader"
      class="org.alfresco.repo.admin.patch.impl.GenericBootstrapPatch"
      parent="basePatch" >
    <property name="id"><value>org.alfresco.tutorial.bootstrap.patch.usersLoader</value></property>
    <property name="description"><value>org.alfresco.tutorial.bootstrap.patch.usersLoader.description</value></property>
    <property name="fixesFromSchema"><value>0</value></property>
    <property name="fixesToSchema"><value>${version.schema}</value></property>
    <property name="targetSchema"><value>99999</value></property>
    <property name="dependsOn" >
        <list>
            <ref bean="org.alfresco.tutorial.bootstrap.patch.userProfilesLoader" />
        </list>
    </property>
    <property name="importerBootstrap">
        <ref bean="userBootstrap" />
    </property>
    <property name="bootstrapView">
        <props>
            <prop key="path">/${alfresco_user_store.system_container.childname}/${alfresco_user_store.user_container.childname}</prop>
            <prop key="location">alfresco/module/bootstrap-content-repo/bootstrap/import-users.xml</prop>
        </props>
    </property>
</bean>
```

Note how the user profile needs to be bootstrapped first. This is enforced with the `dependsOn` definition above.

The `id` and `description` properties should be specified in a message resource file as follows:

> **Important:** The `id` value in the bean definition should be limited to 64 characters or less.  Using a value greater than 64 characters will cause the patch to be redeployed on every  restart.

```text
org.alfresco.tutorial.bootstrap.patch.usersLoader=Load Users
org.alfresco.tutorial.bootstrap.patch.usersLoader.description=Bootstraps users alftest1 and alftest2
org.alfresco.tutorial.bootstrap.patch.userProfilesLoader=Load User Profiles
org.alfresco.tutorial.bootstrap.patch.userProfilesLoader.description=Bootstraps first name, last name, email etc for user alftest1 and alftest2
```

### Bootstrapping groups
 
This is also done via XML files:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<view:view xmlns:view="http://www.alfresco.org/view/repository/1.0"
           xmlns:cm="http://www.alfresco.org/model/content/1.0"
           xmlns:sys="http://www.alfresco.org/model/system/1.0">

    <view:reference view:pathref="${system.authorities_container.childname}">
        <view:associations>
            <sys:children>
                <cm:authorityContainer view:childName="cm:GROUP_Knowledge Base Consumers">
                    <view:aspects>
                        <sys:referenceable />
                    </view:aspects>
                    <view:properties>
                        <sys:node-uuid>Knowledge Base Consumers</sys:node-uuid>
                        <cm:name>GROUP_Knowledge Base Consumers</cm:name>
                        <cm:authorityName>GROUP_Knowledge Base Consumers</cm:authorityName>
                    </view:properties>
                </cm:authorityContainer>
                <cm:authorityContainer view:childName="cm:GROUP_Knowledge Base Coordinators">
                    <view:aspects>
                        <sys:referenceable />
                    </view:aspects>
                    <view:properties>
                        <sys:node-uuid>Knowledge Base Coordinators</sys:node-uuid>
                        <cm:name>GROUP_Knowledge Base Coordinators</cm:name>
                        <cm:authorityName>GROUP_Knowledge Base Coordinators</cm:authorityName>
                    </view:properties>
                </cm:authorityContainer>
            </sys:children>
        </view:associations>
    </view:reference>

    <!-- Each group is also part of the AUTH.ALF and APP.DEFAULT zones -->
    <view:reference view:pathref="${system.zones_container.childname}/cm:AUTH.ALF">
        <view:associations>
            <cm:inZone>
                <view:reference view:pathref="${system.authorities_container.childname}/cm:GROUP_Knowledge_x0020_Base_x0020_Consumers"
                                view:childName="cm:GROUP_Knowledge Base Consumers" />
            </cm:inZone>
            <cm:inZone>
                <view:reference view:pathref="${system.authorities_container.childname}/cm:GROUP_Knowledge_x0020_Base_x0020_Coordinators"
                                view:childName="cm:GROUP_Knowledge Base Coordinators" />
            </cm:inZone>
        </view:associations>
    </view:reference>
    <view:reference view:pathref="${system.zones_container.childname}/cm:APP.DEFAULT">
        <view:associations>
            <cm:inZone>
                <view:reference view:pathref="${system.authorities_container.childname}/cm:GROUP_Knowledge_x0020_Base_x0020_Consumers"
                                view:childName="cm:GROUP_Knowledge Base Consumers" />
            </cm:inZone>
            <cm:inZone>
                <view:reference view:pathref="${system.authorities_container.childname}/cm:GROUP_Knowledge_x0020_Base_x0020_Coordinators"
                                view:childName="cm:GROUP_Knowledge Base Coordinators" />
            </cm:inZone>
        </view:associations>
    </view:reference>
</view:view>
```

Here we are bootstrapping two groups, one called Knowledge Base Consumers and one called Knowledge Base Coordinators. 
The last bit of the group bootstrapping adds the groups to different Zones. The `AUTH.ALF` zone is for authorities 
defined within Content Services and not synchronized from an external source, such as LDAP. The `APP.DEFAULT` 
zone is for person and group nodes to be found by a normal search. We can store this XML file as part of the Repository 
JAR module extension project in a file name such as `import-groups.xml`.

The group XML file can be loaded via a Spring bean configuration as follows:

```xml
<bean id="org.alfresco.tutorial.bootstrap.patch.groupsLoader"
      class="org.alfresco.repo.admin.patch.impl.GenericBootstrapPatch"
      parent="basePatch" >
    <property name="id"><value>org.alfresco.tutorial.bootstrap.patch.groupsLoader</value></property>
    <property name="description"><value>org.alfresco.tutorial.bootstrap.patch.groupsLoader.description</value></property>
    <property name="fixesFromSchema"><value>0</value></property>
    <property name="fixesToSchema"><value>${version.schema}</value></property>
    <property name="targetSchema"><value>99999</value></property>
    <property name="importerBootstrap">
        <ref bean="spacesBootstrap" />
    </property>
    <property name="bootstrapView">
        <props>
            <prop key="path">/${alfresco_user_store.system_container.childname}</prop>
            <prop key="location">alfresco/module/bootstrap-content-repo/bootstrap/import-groups.xml</prop>
        </props>
    </property>
</bean>
```

### Adding users to groups

This is done via XML files:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<view:view xmlns:view="http://www.alfresco.org/view/repository/1.0"
           xmlns:cm="http://www.alfresco.org/model/content/1.0">

    <view:reference view:pathref="${system.authorities_container.childname}/cm:GROUP_Knowledge_x0020_Base_x0020_Consumers">
        <view:associations>
            <cm:member>
                <view:reference view:pathref="${system.people_container.childname}/cm:admin"
                                view:childName="cm:admin" />
            </cm:member>
            <cm:member>
                <view:reference view:pathref="${system.people_container.childname}/cm:alftest1"
                                view:childName="cm:alftest1" />
            </cm:member>
        </view:associations>
    </view:reference>
    <view:reference view:pathref="${system.authorities_container.childname}/cm:GROUP_Knowledge_x0020_Base_x0020_Coordinators">
        <view:associations>
            <cm:member>
                <view:reference view:pathref="${system.people_container.childname}/cm:admin"
                                view:childName="cm:admin" />
            </cm:member>
            <cm:member>
                <view:reference view:pathref="${system.people_container.childname}/cm:alftest2"
                                view:childName="cm:alftest2" />
            </cm:member>
        </view:associations>
    </view:reference>
</view:view>
```

We add the admin user, which we get out-of-the-box, and the two users we bootstrapped previously. We can store this XML 
file as part of the Repository JAR module extension project in a file name such as `import-group-memberships.xml`.

The group membership XML file can be loaded via a Spring bean configuration as follows:

```xml
<bean id="org.alfresco.tutorial.bootstrap.patch.groupMembershipsLoader"
      class="org.alfresco.repo.admin.patch.impl.GenericBootstrapPatch"
      parent="basePatch" >
    <property name="id"><value>org.alfresco.tutorial.bootstrap.patch.groupMembershipsLoader</value></property>
    <property name="description"><value>org.alfresco.tutorial.bootstrap.patch.groupMembershipsLoader.description</value></property>
    <property name="fixesFromSchema"><value>0</value></property>
    <property name="fixesToSchema"><value>${version.schema}</value></property>
    <property name="targetSchema"><value>99999</value></property>
    <property name="dependsOn" >
        <list>
            <ref bean="org.alfresco.tutorial.bootstrap.patch.groupsLoader" />
            <ref bean="org.alfresco.tutorial.bootstrap.patch.userProfilesLoader" />
            <ref bean="org.alfresco.tutorial.bootstrap.patch.usersLoader" />
        </list>
    </property>
    <property name="importerBootstrap">
        <ref bean="spacesBootstrap" />
    </property>
    <property name="bootstrapView">
        <props>
            <prop key="path">/${system.system_container.childname}</prop>
            <prop key="location">alfresco/module/bootstrap-content-repo/bootstrap/import-group-memberships.xml</prop>
        </props>
    </property>
</bean>
```

Note how it depends on the beans that loads the users and groups.

The `id` and `description` properties for the group loading should be specified in a message resource file as follows:

```text
org.alfresco.tutorial.bootstrap.patch.groupsLoader=Load Groups
org.alfresco.tutorial.bootstrap.patch.groupsLoader.description=Bootstraps groups KB Consumer and KB Coordinator
org.alfresco.tutorial.bootstrap.patch.groupMembershipsLoader=Load Group Memberships
org.alfresco.tutorial.bootstrap.patch.groupMembershipsLoader.description=Loads the groups KB Consumer and KB Coordinator with 2 users
```

### Bootstrapping sites

We will now look at how to bootstrap a site. We can use some of the previously set up users and groups as members for 
demonstration purposes. First thing we need to do is create the site via Alfresco Share and then export it. 
We can export the site via the `GET /alfresco/s/api/sites/{shortname}/export` would use the 
`http://localhost:8080/alfresco/s/api/sites/alfresco-kb/export` URL. 
This will trigger an export of the site as a ZIP file with the following content:

* `Contents.acp`  (Contains all the content created for the site - set this up as bootstrapView "contents")
* `Groups.txt`    (User/Group -> Site Group mapping - set this up as bootstrapView "groups")
* `People.acp`    (Contains the User Profile XML - same bootstrap we did above with `import-user-profiles.xml` or set this up as bootstrapView "people")
* `Users.acp`     (Contains the User User XML - same bootstrap we did above with `import-user.xml` or set this up as bootstrapView "users")

We have already set up the users above so we need only the `Contents.acp` and `Groups.txt` files. We can then bootstrap 
the site with a special site load patch class as follows:

```xml
<bean id="org.alfresco.tutorial.bootstrap.patch.alfrescoKBsiteLoader"
      class="org.alfresco.repo.admin.patch.impl.SiteLoadPatch" parent="basePatch">
    <property name="id"><value>org.alfresco.tutorial.bootstrap.patch.alfrescoKBsiteLoader</value></property>
    <property name="description"><value>org.alfresco.tutorial.bootstrap.patch.alfrescoKBsiteLoader.description</value></property>
    <property name="fixesFromSchema"><value>0</value></property>
    <property name="fixesToSchema"><value>${version.schema}</value></property>
    <property name="targetSchema"><value>99999</value></property>
    <property name="dependsOn" >
        <list>
            <ref bean="org.alfresco.tutorial.bootstrap.patch.groupMembershipsLoader" />
        </list>
    </property>
    <property name="spacesBootstrap" ref="siteLoadBootstrap-Spaces"/>
    <property name="usersBootstrap" ref="siteLoadBootstrap-Users"/>
    <property name="siteService" ref="siteService"/>
    <property name="authorityService" ref="authorityService"/>
    <property name="behaviorFilter" ref="policyBehaviourFilter"/>
    <property name="siteName">
        <value>alfresco-kb</value>
    </property>
    <property name="bootstrapViews">
        <map>
            <entry key="contents">
                <props>
                    <prop key="location">alfresco/module/bootstrap-content-repo/bootstrap/alfresco-kb-site-contents.acp</prop>
                </props>
            </entry>
            <entry key="groups">
                <props>
                    <prop key="location">alfresco/module/bootstrap-content-repo/bootstrap/alfresco-kb-site-groups.txt</prop>
                </props>
            </entry>
        </map>
    </property>
</bean>
```

Note that the contents and groups files were renamed. The site load patch also depends on the `groupMembershipsLoader` 
so we can be sure that the users have been set up before this patch runs. If we don't want to set up the users separately 
we can have the site load patch bootstrap everything like this:

```xml
<bean id="org.alfresco.tutorial.bootstrap.patch.alfrescoKBsiteLoader"
      class="org.alfresco.repo.admin.patch.impl.SiteLoadPatch" parent="basePatch">
        ...
        <property name="bootstrapViews">
        <map>
            <entry key="contents">
                <props>
                    <prop key="location">alfresco/module/bootstrap-content-repo/bootstrap/alfresco-kb-site-contents.acp</prop>
                </props>
            </entry>
            <entry key="groups">
                <props>
                    <prop key="location">alfresco/module/bootstrap-content-repo/bootstrap/alfresco-kb-site-groups.txt</prop>
                </props>
            </entry>
            <entry key="users">
                <props>
                    <prop key="location">alfresco/module/bootstrap-content-repo/bootstrap/Users.acp</prop>
                </props>
            </entry>
            <entry key="people">
                <props>
                    <prop key="location">alfresco/module/bootstrap-content-repo/bootstrap/Users.acp</prop>
                </props>
            </entry>
        </map>
    </property>
</bean>
```

The `id` and `description` properties for the site load patch should be specified in a message resource file as follows:

```text
org.alfresco.tutorial.bootstrap.patch.groupMembershipsLoader.description=Loads the groups KB Consumer and KB Coordinator with 2 users
org.alfresco.tutorial.bootstrap.patch.alfrescoKBsiteLoader=Load Alfresco KB Site
```

### Bootstrapping folders and files

Sometimes it is also necessary to bootstrap folders and files into locations outside sites. This can also be done with 
the generic bootstrap patch as follows:

```xml
<bean id="org.alfresco.tutorial.bootstrap.patch.foldersAndFilesLoader"
      class="org.alfresco.repo.admin.patch.impl.GenericBootstrapPatch"
      parent="basePatch" >
    <property name="id"><value>org.alfresco.tutorial.bootstrap.patch.foldersAndFilesLoader</value></property>
    <property name="description"><value>org.alfresco.tutorial.bootstrap.patch.foldersAndFilesLoader.description</value></property>
    <property name="fixesFromSchema"><value>0</value></property>
    <property name="fixesToSchema"><value>${version.schema}</value></property>
    <property name="targetSchema"><value>99999</value></property>
    <property name="importerBootstrap">
        <ref bean="spacesBootstrap" />
    </property>
    <!-- Can be used to check if something already exists, if it does then the patch will not be executed -->
    <property name="checkPath">
        <value>/${spaces.company_home.childname}/cm:acmedocument.txt</value>
    </property>
    <property name="bootstrapView">
        <props>
            <prop key="path">/${spaces.company_home.childname}</prop>
            <prop key="location">alfresco/module/bootstrap-content-repo/bootstrap/import-folders-and-files.xml</prop>
        </props>
    </property>
</bean>
```

The content of the `import-folders-and-files.xml` XML file has the same structure as the XML container in the `Contents.acp` 
we get when exporting a site. So to bootstrap a file it will look like this:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<view:view xmlns:cm="http://www.alfresco.org/model/content/1.0"
		   xmlns:view="http://www.alfresco.org/view/repository/1.0"
		   xmlns:sys="http://www.alfresco.org/model/system/1.0"
		   xmlns:app="http://www.alfresco.org/model/application/1.0"
		   xmlns:acme="http://www.acme.org/model/content/1.0">
<acme:document view:childName="cm:acmedocument.txt">
	<view:aspects>
		<cm:auditable></cm:auditable>
		<sys:referenceable></sys:referenceable>
		<cm:titled></cm:titled>
		<sys:localized></sys:localized>
		<app:inlineeditable></app:inlineeditable>
	</view:aspects>
	<view:acl></view:acl>
	<view:properties>
		<cm:name>acmedocument.txt</cm:name>
		<sys:node-dbid>854</sys:node-dbid>
		<sys:store-identifier>SpacesStore</sys:store-identifier>
		<sys:locale>en_GB_</sys:locale>
		<cm:content>contentUrl=classpath:alfresco/module/bootstrap-content-repo/bootstrap/someacmedoc.txt|mimetype=text/plain|size=30|encoding=UTF-8|locale=en_GB_</cm:content>
		<acme:documentId>DOC001</acme:documentId>
		<cm:title>
			<view:mlvalue view:locale="en">SomeTitle</view:mlvalue>
		</cm:title>
		<cm:modified>2015-09-10T16:11:07.875+01:00</cm:modified>
		<sys:node-uuid>34e4a654-b45e-4be1-80db-25da1e4c82a7</sys:node-uuid>
		<app:editInline>true</app:editInline>
		<cm:created>2015-09-10T16:10:49.142+01:00</cm:created>
		<sys:store-protocol>workspace</sys:store-protocol>
		<cm:creator>admin</cm:creator>
		<cm:description>
			<view:mlvalue view:locale="en">SomeDesc</view:mlvalue>
		</cm:description>
		<cm:modifier>admin</cm:modifier>
	</view:properties>
</acme:document>
</view:view>
```

Besides using patches to bootstrap content there is also the `ImporterModuleComponent` that can be used to bootstrap/import 
content into the Repository, for more information about this see [Module Components]({% link content-services/7.2/develop/repo-ext-points/module-components.md %}).

### More info on bootstrapping folders and files

It is possible to bootstrap files and spaces (i.e. folders) by using XML files.

An alternative to the ACP import is to explicitly reference files through XML.

```xml
<bean id="customSpacesBootstrap" parent="spacesStoreImporter" singleton="true" >
  <property name="useExistingStore">
    <value>${yourmodule.bootstrap.data}</value>
  </property>
  <property name="bootstrapViews">
    <list>
      <props>
        <prop key="path">/${spaces.company_home.childname}/${spaces.dictionary.childname}/${spaces.templates.email.childname}</prop>
        <prop key="location">alfresco/module/yourmodule/bootstrap/config_email_templates.xml</prop>
      </props>
    </list>
  </property>
</bean>
```

In the code sample, `config_email_templates.xml` contains the actual file references, as well as all file and folder 
properties. All predetermined files and folders will be placed in the **Company Home/Data Dictionary/Email Templates** space.

**Property values**

|useExistingStore|If false the content will not be imported if the store exists|
|bootstrapViews|What you want to import and where it comes from|

It is convenient to use a global property value for the property `useExistingStore` in order to control bootstrapping 
on Content Services startup. If the store does not yet exist (the very first time a new Content Services 
installation starts up), the data will aways be bootstrapped, no matter the value, but from that moment on the store exists, 
and setting this to false means the next time Content Services reboots these files will not be overridden with 
those on the classpath. Set it to true again and on the next reboot the classpath files are loaded.

XML imports can only replace/update/delete files that have their UUID set.

Examples of how to bootstrap data to other stores or to see all the available options, can be found in the file 
`import-export-context.xml`.

Another example is shown here:

```xml
<view:view xmlns:view="http://www.alfresco.org/view/repository/1.0"
  xmlns:cm="http://www.alfresco.org/model/content/1.0" xmlns:app="http://www.alfresco.org/model/application/1.0"
  xmlns:emailserver="http://www.alfresco.org/model/emailserver/1.0">
  
  <cm:folder view:childName="cm:My First Folder">
    <app:uifacets />
    <cm:name>My First Folder</cm:name>
    <app:icon>space-icon-default</app:icon>
    <cm:title>My First Folder</cm:title>
    <cm:description></cm:description>
    <cm:contains>
      <cm:content view:childName="cm:custom_email_template.ftl">
        <view:aspects>
          <cm:titled />
          <cm:author />
          <app:inlineeditable />
        </view:aspects>
        <view:properties>
          <app:editInline>true</app:editInline>
          <cm:description>This is a custom email template.</cm:description>
          <cm:content>contentUrl=classpath:alfresco/module/yourmodule/bootstrap/custom_email_template.ftl|mimetype=text/plain|size=|encoding=UTF-8|locale=en_US_</cm:content>
          <cm:title>My first email template</cm:title>
          <cm:author>Me</cm:author>
          <cm:name>custom_email_template.ftl</cm:name>
        </view:properties>
        <view:associations></view:associations>
      </cm:content>
    </cm:contains>
  </cm:folder>
</view:view>
```

In the code sample, you see a folder is being added, containing a single FreeMarker template file. You can add multiple 
files and folders on the top level, or in sub-folders this way. Aspects can also be set on the new folder. 
Another example can be found in the file `config/alfresco/bootstrap/spaces.xml`. The bootstrap directory also contains 
many other examples.

### Bootstrapping categories

Categories can be bootstrapped by using an XML file.

Your categories bootstrap XML file must contain only `cm:generalclassifiable` categories. An example of the XML file 
is provided as follows:

```xml
<view:view xmlns:view="http://www.alfresco.org/view/repository/1.0"
  xmlns:sys="http://www.alfresco.org/model/system/1.0"
  xmlns:cm="http://www.alfresco.org/model/content/1.0">
  
  <cm:category>
    <cm:name>Your Root Category</cm:name>
    <cm:subcategories>
      <cm:category>
        <cm:name>Your Parent Category</cm:name>
        <cm:subcategories>
          <cm:category>
            <cm:name>Your Child Category</cm:name>
          </cm:category>
        </cm:subcategories>
      </cm:category>
    </cm:subcategories>
  </cm:category>
</view:view>
```

### Bootstrap/Import Module Data

As part of your content model and module, you can import some data that the module uses. These can be, for example, 
Categories, FTL scripts in the data dictionary, project template hierarchies, ACP files.

For many content models, it is useful to have some data populated when the model is loaded. This is done by bootstrapping 
some data. One good example is in the Records Management module.

You can import the data by using an XML file or an ACP file as part of your module's initialization.

First place your ACP or XML file somewhere in your module's classpath. Often this will be within the 
`aio/aio-platform-jar/src/main/resources/alfresco/module/aio-platform-jar/bootstrap` folder structure. Next add the 
following configuration to your `aio/aio-platform-jar/src/main/resources/alfresco/module/aio-platform-jar/context/bootstrap-context.xml` 
file, specifying either the XML or ACP file by its location on the classpath.

```xml
<bean id="myModule.bootstrap" 
  class="org.alfresco.repo.module.ImporterModuleComponent" 
  parent="module.baseComponent">
  
  <!-- Module Details -->
  <property name="moduleId" value="myModule" />
  <property name="name" value="myModuleBootstrap" />
  <property name="description" value="My Modules initial data requirements" />
  <property name="sinceVersion" value="1.0" />
  <property name="appliesFromVersion" value="1.0" />
  
  <!-- Data properties -->
  <property name="importer" ref="spacesBootstrap"/>
  <property name="bootstrapViews">
    <list>
      <props>
        <prop key="path">/${spaces.company_home.childname}</prop>
        <prop key="location">alfresco/module/myModule-123/myACP.acp</prop>
      </props>
    </list>
  </property>
  
</bean>
```

Key property values are shown in the following table:

|Property Name|Description|
|-------------|-----------|
|moduleId|The ID of the module that this import component relates to.|
|name|The name of the import component.|
|description|A description of the import component.|
|sinceVersion|The version of the module this import component was introduced.|
|appliesFromVersion|The version of the module from which this import component applies from.|
|importer|The importer to use when importing the data|
|bootstrapViews|A list of the ACP or XML files to be imported and the location in the destination repository where the data should be imported.|

### Import strategy

There are several import strategies that can be used to import module data.

If you know the UUID(s) of the spaces/files you are importing, you can choose from a number of import strategies.

If you are using XML, you will have to manually add a `sys:node-uuid` tag to that node. (Generated ACP files automatically 
contain the UUIDs.)

Example:

```xml
    <view:properties>
        <sys:node-uuid>b7c6b88a-e5fd-4ccf-b134-69a2460c3b89</sys:node-uuid>
        ...
    </view:properties>
</cm:content>
</cm:contains>
</cm:folder>
</view:view>
```

You can add the following: `CREATE_NEW`, `CREATE_NEW_WITH_UUID`, `REMOVE_EXISTING`, `REPLACE_EXISTING`, `UPDATE_EXISTING`, 
`THROW_ON_COLLISION` (`org.alfresco.service.cmr.view.ImporterBinding.UUID_BINDING`). This can be added globally for entire bean, 
or per bootstrap view.

**Global for the entire bean:**

```xml
<bean id="myModule.bootstrap" 
  class="org.alfresco.repo.module.ImporterModuleComponent" 
  parent="module.baseComponent">
  <property name="uuidBinding">
    <value>REPLACE_EXISTING</value>
  </property>
  ...
```

**Per BootstrapView:**

```xml
  <property name="bootstrapViews">
    <list>
      <props>
        <prop key="uuidBinding">UPDATE_EXISTING</prop>
        <prop key="path">/${spaces.company_home.childname}/${spaces.dictionary.childname}</prop>
        <prop key="location">alfresco/module/yourmodule/bootstrap/myimport.acp</prop>
      </props>
      ...
    </list>
  </property>
</bean>
```

**Space Names Reference**

The following are the substitution tokens that can be used for bootstrapping purposes. These tokens can be redefined in 
the configuration files if needed.

|spaces.store|workspace://SpacesStore|
|spaces.company_home.childname|Company Home|
|spaces.guest_home.childname|Guest Home|
|spaces.dictionary.childname|Data Dictionary|
|spaces.templates.childname|Space Templates|
|spaces.templates.content.childname|Content Templates|
|spaces.templates.email.childname|Email Templates|
|spaces.templates.rss.childname|RSS Templates|
|spaces.savedsearches.childname|Saved Searches|
|spaces.scripts.childname|Scripts|
|spaces.wcm.childname|WCM|
|spaces.wcm_content_forms.childname|Web Forms|
|spaces.content_forms.childname|Web Forms|
|spaces.user_homes.childname|User Homes|

## Deployment - App Server

* XML, ACP, and content files: `tomcat/shared/classes/alfresco/extension/...` (File name can be anything you like as long as you refer to it in the Spring context file)
* Spring Beans: `tomcat/shared/classes/alfresco/extension/my-content-model-context.xml` (File name has to end in -context.xml to be picked up as Spring Bean context file)

These file locations are untouched by re-deployments and upgrades.

## Deployment All-in-One SDK project

* XML, ACP, and content files: `aio/platform-jar/src/main/resources/alfresco/module/platform-jar/bootstrap`
* Spring Beans: `aio/platform-jar/src/main/resources/alfresco/module/platform-jar/context/bootstrap-context.xml`

## More Information

* [Bcrypt password encryption support]({% link content-services/7.2/admin/security.md %}#bcryptoverview)

## Sample Code

* [Sample Repo JAR that bootstraps users, groups, site, file](https://github.com/Alfresco/alfresco-sdk-samples/tree/alfresco-51/all-in-one/bootstrap-content-repo){:target="_blank"}
