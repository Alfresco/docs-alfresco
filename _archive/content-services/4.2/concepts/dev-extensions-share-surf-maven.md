---
author: Alfresco Documentation
---

# Creating a Surf project with Maven

This topic describes creating a Surf project with Maven. Maven 3 is a requirement.

Using Maven you can create a Surf application project with the following command:

```

mvn archetype:generate -DarchetypeCatalog=https://artifacts.alfresco.com/nexus/content/groups/public-snapshots/archetype-catalog.xml

```

Enter the number corresponding to the `spring-surf-archetype` and enter suitable values for `groupId` and `artifactId` when prompted \(you can just hit enter to accept the defaults for the other options\) and a new application will be created.

Change into the new project folder that has been created and type the following to build the project:

```
mvn install
```

You can then run the application with the following command:

```

mvn jetty:run

```

If you open your browser at the URL `http://localhost:8080/<artifactId>` then you will see a sample Surf page.

This archetype provides the following benefits

1.  It can give you a head start if you want to write your own web-client for working with your Alfresco repository.
2.  As an educational tool to help you better understand Surf applications \(and therefore Alfresco Share\).

If you browse through the source of your new application you should find that the configuration files are heavily commented to explain what the settings are for.

**Parent topic:**[Share extensions](../concepts/dev-extensions-share.md)

**Related information**  


[Maven Alfresco SDK](dev-extensions-maven-sdk-intro.md)

