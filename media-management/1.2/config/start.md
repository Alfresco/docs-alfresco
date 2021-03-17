---
title: Start Media Management
---

You need to start up ActiveMQ, your content services node, the repository and Alfresco Share.

Ensure that you have installed the required external and internal software before installing Alfresco Media Management. See [Prerequisites for using Media Management]({% link media-management/1.2/install/index.md %}#prerequisites-for-media-management) for more information.

For information on how to set up ActiveMQ and the content services node to start automatically, see [Running Media Management automatically](#running-media-management-automatically).

For more information on advanced ActiveMQ settings, see [Configure ActiveMQ]({% link content-services/6.0/config/activemq.md %}).

1. Navigate to the `activemq/bin` directory where `activemq` is the name of the directory where you installed ActiveMQ. Start ActiveMQ using the command:

    ```bash
    ./activemq start
    ```

    ```bash
    activemq start
    ```

    ActiveMQ is used by the repository to queue event notifications as they are generated.

    You can check that ActiveMQ is working correctly through the ActiveMQ web interface here: `http://localhost:8161/admin/index.jsp`, where localhost is the Alfresco server.

2. From the remote-node directory, launch your content services node using the following command:

    ```bash
    java -jar content-services-node-x.x.x.jar server config.yml
    ```

    where `x.x.x` is the version of the JAR file. If there is no command line output or error messages, then the node has started successfully. If ImageMagick or FFmpeg are not correctly installed, the node will not start.

3. Start your Alfresco server, and log in to Share.

## Running Media Management automatically

You can configure the Media Management components (Apache ActiveMQ and content services nodes) to suit your specific requirements.

These topics explain how to configure Media Management to run automatically in a production environment.

> **Note:** These instructions are for a Unix environment only.

These topics use `init.d` scripts. For more information on using these scripts, see [Init scripts](https://www.linux.com/training-tutorials/managing-linux-daemons-init-scripts/){:target="_blank"}.

Make sure you have set the correct permissions before configuring Media Management to run automatically.

## Configuring ActiveMQ to run automatically

ActiveMQ can be configured to start and run automatically.

1. Create a user named `activemq` that you will use to run the ActiveMQ automatic process:

    ```bash
    sudo useradd -m activemq
    ```

2. Create an `init.d` script, for example, in `/etc/init.d/activemq` to run the ActiveMQ shell script under the `activemq` user:

    ```bash
    #!/bin/bash
    # chkconfig: 2345 80 20
    cd opt/activemq
    /bin/su activemq -c "bin/activemq $@"
    ```

3. Make the file executable and enable the script:

    ```bash
    chmod +x /etc/init.d/activemq
    chkconfig --add activemq
    ```

## Configuring the content services node to run automatically

A content services node in Media Management can be configured to start and run automatically.

Review the recommended [architecture]({% link media-management/1.2/index.md %}) for guidance on setup of your Alfresco server and remote server.

These instructions are for a Unix environment only and use an `init.d` script. For more information on using these scripts, see [Init scripts](https://www.linux.com/training-tutorials/managing-linux-daemons-init-scripts/){:target="_blank"}.

1. Create a new directory, `/opt/contentservices`, and move the files from the `remote-node` installation directory to the new directory.

    See [Installing Media Management]({% link media-management/1.2/install/index.md %}) for more information on the shipped Media Management installation files.

2. Create a user named `contentservices` that you will use to run the automatic process, with a home set to `/opt/contentservices`:

    ```bash
    sudo useradd -m contentservices
    ```

3. Create an `init.d` script, for example, in `/etc/init.d/contentservices` to run the content services node under the `contentservices` user:

    ```bash
    #!/bin/bash
    # chkconfig: 345 91 9
    # description: Alfresco Content Service
    ### BEGIN INIT INFO # Provides: Alfresco MM Module Content Service
    # Required-Start: $local_fs $network $activemq
    # Required-Stop: $local_fs $network $activemq
    # Default-Start: 3 4 5
    # Default-Stop: 0 1 6
    # Description: Start the program
    ### END INIT INFO

    ### Fill in these bits:
    USER="contentservices"
    JAR_LOCATION=/opt/contentservices
    PID_FILE="/var/run/contentservices/contentservices.pid"
    JAR_VERSION=0.3-SNAPSHOT
    JAR_FILE=content-services-node-$JAR_VERSION.jar
    START_CMD="\"cd $JAR_LOCATION;java -jar $JAR_FILE server config.yml > /dev/null 2>&1 &\""
    NAME="alfresco-contentservices"
    PGREP_STRING="$JAR_FILE"

    ### No Changes required below this point

    CUR_USER=`whoami`

    killproc() {
      pkill -u $USER -f $PGREP_STRING
    }

    start_daemon() {
      eval "$*"
    }

    log_success_msg() {
      echo "$*"
      logger "$_"
    }

    log_failure_msg() {
      echo "$*"
      logger "$_"
    }

    check_proc() {
      pgrep -u $USER -f $PGREP_STRING
          >/dev/null
    }

    start_script() {
      if [ "${CUR_USER}" != "root" ] ; then
        log_failure_msg "$NAME can only
          be started as 'root'."
        exit -1
      fi

      check_proc
      if [ $? -eq 0 ]; then
        log_success_msg "$NAME is
          already running."
        exit 0
      fi

      [ -d /var/run/$NAME ] || (mkdir /var/run/$NAME )

      # For SELinux we need to use 'runuser' not 'su'
      if [ -x "/sbin/runuser" ]; then
         SU="/sbin/runuser -s /bin/sh"
      else
         SU="/bin/su -s /bin/sh"
      fi
      start_daemon $SU $USER -c "$START_CMD"

      # Sleep for a while to see if anything cries
      sleep 5
      check_proc

      if [ $? -eq 0 ]; then
        log_success_msg "Started $NAME."
       else
        log_failure_msg "Error starting $NAME."
        exit -1
      fi
    }

     stop_script() {
      if [ "${CUR_USER}" != "root" ] ; then
        log_failure_msg "You do not have permission to stop $NAME."
        exit -1
      fi

      check_proc
      if [ $? -eq 0 ]; then
        killproc -p $PID_FILE >/dev/null

        # Make sure it's dead before we return
        until [ $? -ne 0 ]; do
          sleep 1
          check_proc
        done

        check_proc
        if [ $? -eq 0 ]; then
          log_failure_msg "Error stopping $NAME."
          exit -1
        else
          log_success_msg "Stopped $NAME."
        fi
      else
        log_failure_msg "$NAME is not running or you don't have permission to stop it"
      fi
    }

    check_status() {
      check_proc
      if [ $? -eq 0 ]; then
        log_success_msg "$NAME is running."
      else
        log_failure_msg "$NAME is stopped."
        exit -1
      fi
    }

    case "$1" in
      start)
        start_script
        ;;
      stop)
        stop_script
        ;;
      restart)
        stop_script
        start_script
        ;;
      status)
        check_status
        ;;
      *)
        echo "Usage: $0 {start|stop|restart|status}"
        exit 1
    esac

    exit 0
    ```

4. Make the file executable and enable the script:

    ```bash
    chmod +x /etc/init.d/contentservices
    chkconfig --add alfresco-contentservices
    ```

5. Modify the `config.yml` file to specify your environment settings, for example, your ActiveMQ host name if it is on a different server:

    ```yaml
    messaging:
    broker:
      url: tcp://localhost:61616
    ```

    The content services node uses ImageMagick and FFmpeg and requires that the executable directories are available on the system PATH variable.

    For more information about the content services framework, see [Content services node architecture]({% link media-management/1.2/index.md %}).

6. Ensure that the target server port is open and not blocked by a firewall.
