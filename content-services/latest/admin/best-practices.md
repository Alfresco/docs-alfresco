---
title: Best practices
---

Best practice guidelines for Content Services administrators.

## Tips for getting the most out of Content Services

Use these tips to improve your experience of Content Services:

1.  Allow sufficient time to plan your project and identify the most optimal path for you.
2.  Benchmark the system you want to use to ensure you can tune it for best performance and high availability before you go live.
3.  Ensure customizations occur using the `<extensions>` and `<web-extensions>` directories, and/or AMP files to help smooth upgrade and debugging processes.
4.  Discover more about FreeMarker templates. You can create custom views for your spaces, and email templates to fit your organization, among other things.
5.  Discover more about web scripts. This requires some, but not extensive, technical knowledge, and is very powerful.
6.  Use [File and Folder Templates]({% link content-services/latest/admin/filefolder-templates.md %}) to create reusable components and enable business processes.
7.  Microsoft Office integration makes adoption of Content Services seamless.
8.  Email integration provides simple and safe way to store emails inside the repository.
9.  Coordinate with Alfresco on short-term consulting. This allows you and/or your System Integrator to work with Alfresco on architecture and planning.
10. Take advantage of the support for multiple security protocols, which makes it suitable for large enterprises.
11. Use the [Support Portal](http://support.alfresco.com){:target="_blank"}, a subscription site that provides downloads, further documentation, and a Knowledge Base.
12. Take advantage of Content Services training. Get the knowledge and information you need to make your implementation successful.

Also, use these tips to help you manage your environment:

1.  Make sure you use a transactional database.
2.  Keep your Search indexes on your fastest local disk.
3.  Version only what and when you need to.
4.  If you find yourself constantly creating the same space hierarchy as well as rules and aspects to them, consider creating [File and Folder Templates]({% link content-services/latest/admin/filefolder-templates.md %}) instead.
5.  Increase the database connection pool size for large numbers of concurrent users or sessions.
6.  Use the System Information to view system properties, such as schema and server versions.
7.  Use the Node Browser (searchable by node reference, xpath, or lucene) to view all properties, parent and child nodes, aspects applied, permissions, and associations.

## Common mistakes 

Avoid these common mistakes when administering an Content Services environment.

1.  Not keeping extended configurations and customizations separate in the `shared` directory. Do not put them in the configuration root. If you do, you will lose them during upgrades.
2.  Not ensuring that the database driver is copied to the application server `lib` directory when installing.
3.  Not testing the backup strategy.
4.  Making changes to the system without testing them thoroughly on a test and pre-production machine first.
5.  Failing to set the `dir.root` property to an absolute path location.
6.  Not fully shutting down a running instance of Content Services, so the next time you try and start it, Content Services says: `Address already in use: JVM_Bind:8080` (especially on Linux).

 