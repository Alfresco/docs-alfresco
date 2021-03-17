---
author: Alfresco Documentation
source: 
audience: 
---

# Step 4. Installing PostgreSQL for Analytics

If you are using the shipped version of PostgreSQL as your Analytics database, use these instructions to setup the database.

This task is not required if you are using MySQL \(see [the initial installation topic](analytics-install-basic.md) for MySQL guidance\).

If you are using a pre-existing PostgreSQL server, review the memory guidance in this topic. For information about running PostgreSQL automatically, see [Configuring PostgreSQL to run automatically](analytics-postgres-auto.md).

1.  Review your memory requirements in work\_mem in the postgresql.conf file in your PostgreSQL directory.

    Increasing the work\_mem value increases performance and allows PostgreSQL to perform larger in-memory sorting. For more information about PostgreSQL performance, see [Tuning PostgreSQL](https://wiki.postgresql.org/wiki/Tuning_Your_PostgreSQL_Server).

2.  Create a user named `postgres` that you will use to run PostgreSQL, and ensure that this user has read permissions to the postgresql Analytics installation directory and sub directories:

    ```
    sudo useradd -m postgres
    ```

3.  As the `postgres` user, initialize a storage area for your data; for example:

    ```
    initdb -D /usr/local/pgsql/data
    ```

    where `/usr/local/pgsql/data` is the location you have chosen.

    If the `postgres` user does not have permission to create the storage area, you will need to create the directory as a root user, and change the owner to the `postgres` user, for example:

    ```
    root# mkdir /usr/local/pgsql/data
    root# chown postgres /usr/local/pgsql/data
    root# su postgres
    postgres$ initdb -D /usr/local/pgsql/data
    ```

4.  Navigate to the postgresql Analytics installation directory and as the `postgres` user, start the database server:

    ```
    postgres -D /usr/local/pgsql/data
    ```

    To run PostgreSQL in the background, use the command:

    ```
    postgres -D /usr/local/pgsql/data >logfile 2>&1 &
    ```

5.  Check that PostgreSQL is running successfully by checking the log file \(for example, postgresql.out\) in the postgresql/logs directory.

    See [PostgreSQL support](http://www.postgresql.org/docs/9.3/static/server-start.html) for more information on setting up and starting PostgreSQL.


