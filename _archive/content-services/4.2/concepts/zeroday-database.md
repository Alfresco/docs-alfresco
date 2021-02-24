---
author: [Alfresco Documentation, Alfresco Documentation, Alfresco Documentation]
---

# Database validation

This section describes how to validate your database to ensure that it meets the prerequisites for an Alfresco installation.

**Note:** Disclaimer: Alfresco is unable to provide specialized support for maintaining or tuning your relational database. You MUST have an experienced, certified DBA on staff to support your Alfresco installation\(s\). Typically this will not be a full time role once the database is configured and tuned and automated maintenance processes are in place. However an experienced, certified DBA is required to get to this point.

**Maintenance and Tuning**:

As with any application that uses a relational database, regular maintenance and tuning of the Alfresco database and schema is necessary. Specifically, all of the database servers that Alfresco supports require a minimum level of index statistics maintenance at frequent, regular intervals. Unless your DBA suggests otherwise, Alfresco recommends daily maintenance.

**Note:** Relying on your database's automated statistics gathering mechanism may not be optimal – consult an experienced, certified DBA for your database to confirm this.

**Note:** Index maintenance on most databases is an expensive, and in some cases blocking, operation that can severely impact Alfresco performance while in progress. Consult your experienced, certified DBA regarding best practices for scheduling these operations in your database.

The following table describes example commands for specific databases. These commands are for illustration only. You must validate the commands required for your environment with your DBA.

|Database|Example maintenance commands|
|--------|----------------------------|
|MySQL|ANALYZE - consult with an experienced, certified MySQL DBA who has InnoDB experience \(Alfresco cannot use a MyISAM database and hence an InnoDB-experienced MySQL DBA is required\). Refer to the following link: [http://dev.mysql.com/doc/refman/5.6/en/analyze-table.html](http://dev.mysql.com/doc/refman/5.6/en/analyze-table.html).|
|PostgreSQL|VACUUM and ANALYZE – consult with an experienced, certified PostgreSQL DBA. Refer to the following link: [http://www.postgresql.org/docs/8.4/static/maintenance.html](http://www.postgresql.org/docs/9.2/static/maintenance.html).|
|Oracle|Depends on version – consult with an experienced, certified Oracle DBA. Refer to the following link: [http://download.oracle.com/docs/cd/B19306\_01/server.102/b14211/stats.htm\#PFGRF003](http://download.oracle.com/docs/cd/B19306_01/server.102/b14211/stats.htm#PFGRF003).|
|Microsoft SQL Server|ALTER INDEX REBUILD \([http://technet.microsoft.com/en-­‐us/library/ms188388.aspx](http://technet.microsoft.com/en-­‐us/library/ms188388.aspx)\), UPDATE STATISTICS \([http://technet.microsoft.com/en-­‐us/library/ms187348.aspx](http://technet.microsoft.com/en-­‐us/library/ms187348.aspx)\) – consult with an experienced, certified MS SQL Server DBA|
|DB2|REORGCHK \(\) [http://publib.boulder.ibm.com/infocenter/db2luw/v9r7/index.jsp?topic=/com.ibm.db2.luw.admin.cmd.doc/doc/r0001971.html](http://publib.boulder.ibm.com/infocenter/db2luw/v9r7/index.jsp?topic=/com.ibm.db2.luw.admin.cmd.doc/doc/r0001971.html)RUNSTATS \(\)

[http://publib.boulder.ibm.com/infocenter/db2luw/v9r7/index.jsp?topic=/com.ibm.db2.luw.admin.cmd.doc/doc/r0001980.html](http://publib.boulder.ibm.com/infocenter/db2luw/v9r7/index.jsp?topic=/com.ibm.db2.luw.admin.cmd.doc/doc/r0001980.html)|

**Parent topic:**[Day Zero architecture validation](../tasks/zeroday-architecture.md)

**Parent topic:**[Configuring databases](../concepts/intro-db-setup.md)

