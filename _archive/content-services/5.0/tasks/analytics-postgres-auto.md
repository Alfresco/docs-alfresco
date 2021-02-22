---
author: Alfresco Documentation
source: 
audience: 
---

# Configuring PostgreSQL to run automatically

PostgreSQL with Alfresco Analytics can be configured to start and run automatically.

1.  Create a user named `postgres` that you will use to run the PostgreSQL automatic process:

    ```
    sudo useradd -m postgres
    ```

2.  Create an `init.d` script; for example, in /etc/init.d/postgres to run the PostgreSQL shell script under the `postgres` user:

    ```
    #!/bin/bash
    # chkconfig: 2345 75 25
    pgdir=opt/alfresco-analytics-1.1.0.1/postgresql
    pgctl=$pgdir/bin/pg_ctl
    datadir=$pgdir/data
    logfile=$pgdir/serverlog
    pguser=postgres
    cd $pgdir
    if  [ "$1" == "init" ]; then
        su $pguser -c "$pgctl init -D $datadir"
    elif [ "$1" == "start" ]; then
        su $pguser -c "$pgctl start -D $datadir -l $logfile"
    elif  [ "$1" == "stop" ]; then
        su $pguser -c "$pgctl stop -D $datadir"
    elif  [ "$1" == "force" ]; then
        su $pguser -c "$pgctl stop -D $datadir -m fast"
    elif  [ "$1" == "restart" ]; then
        su $pguser -c "$pgctl restart -D $datadir -l $logfile"
    elif  [ "$1" == "reload" ]; then
        su $pguser -c "$pgctl reload -D $datadir"
    elif  [ "$1" == "status" ]; then
        su $pguser -c "$pgctl status -D $datadir"
    elif  [ "$1" == "promote" ]; then
        su $pguser -c "$pgctl promote -D $datadir"
    else
        echo "Usage: $0 init|start|stop|force|restart|reload|status|promote"
    fi
    
    ```

3.  Make the file executable and enable the script:

    ```
    chmod +x /etc/init.d/postgres
    chkconfig --add postgres
    ```


