# Upgrading using the WAR file

You can upgrade using the WAR file in your application server distribution. These instructions use the WAR file from the Apache Tomcat based distribution, however you can choose from different distributions for various application servers.

Review the [Supported Stacks](https://www.alfresco.com/services/subscription/supported-platforms) list to see what’s supported.

**To upgrade using the War file**:

1.  Stop the web server running the application.
2.  Deploy the new WAR file in your web server by placing it in the /webapps folder in Tomcat.
3.  Boot up the web server and start Process Services to check if it’s working as expected.

Any database upgrade changes should have now been applied.

**Note:** See the [Installing using the WAR file](installing_using_the_war_file.md) section for more details.

**Parent topic:**[Upgrading from a previous release](../topics/upgrading_from_a_previous_release.md)

