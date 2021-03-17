---
author: Alfresco Documentation
---

# Configuring access to Alfresco Private Repository

In order to be able to utilize Enterprise artifacts, it is necessary to allow Maven access to the Alfresco Private Artifacts Repository, where the Enterprise artifacts are maintained.

You need to have permission to access the Alfresco private repository. Enterprise customers can obtain access credentials from Alfresco.

In order to allow Maven access to the Alfresco Private Repository, you must add your credentials to the Maven configuration. This is usually done by adding an entry to the settings.xml file, located in your .m2 directory.

1.  Obtain access credentials for the Alfresco Private Repository from Alfresco. This is only available for Enterprise-level customers.

2.  Change into your Maven configuration directory. For Linux and Mac OS X that will most likely be ~/.m2 for a configuration on a per-user basis, or for global configuration in <maven\_install\>/conf/. On Windows this would be located in %USER\_HOME%/.m2/ for a per-user configuration, and %M2\_HOME%/conf for a global configuration.

3.  Load settings.xml into your editor. Add the following new server configuration in the `<servers>` section:

    ```
    <server>
       <id>alfresco-private-repository</id>
       <username>username</username>
       <password>password</password>
     </server>
    ```

    **Important:** You will need to replace the place-holder text with your real username and password as allocated by Alfresco. The `id` value should not be changed as it is used in the Alfresco SDK project build files to specify the Enterprise artifacts Maven repository.

    **Attention:** It is possible to use encrypted passwords here. See the official [Maven documentation](http://maven.apache.org/guides/mini/guide-encryption.html) for details on how to do this.

    At this point you have configured Maven to have access to the Alfresco Private Repository.


**Parent topic:**[Using Alfresco Enterprise Edition \(Optional\)](../concepts/alfresco-sdk-using-enterprise-edition.md)

