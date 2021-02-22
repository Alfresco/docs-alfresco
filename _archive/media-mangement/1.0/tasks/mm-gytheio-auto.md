---
author: Alfresco Documentation
source: 
audience: [, ]
---

# Configuring the content services node to run automatically

A content services node in Media Management can be configured to start and run automatically.

Ensure that you have installed the required external software before installing Alfresco Media Management. See [Prerequisites for using Media Management](../concepts/mm-prereqs.md) for information on what you require before you start the Media Management installation.

Review the recommended [architecture for Media Management](../concepts/mm-architecture.md) for guidance on setup of your Alfresco server and remote server.

These instructions are for a Unix environment only and use an `init.d` script. For more information on using these scripts, see [Init scripts](http://www.linux.com/learn/tutorials/442412-managing-linux-daemons-with-init-scripts).

1.  Create a new directory, /opt/contentservices, and move the files from the remote-node installation directory to the new directory.

    See [Installing Media Management](mm-install.md) for more information on the shipped Media Management installation files.

2.  Create a user named `contentservices` that you will use to run the automatic process, with a home set to /opt/contentservices:

    ```
    sudo useradd -m contentservices
    ```

3.  Create an `init.d` script; for example, in /etc/init.d/contentservices to run the content services node under the `contentservices` user:

    ```
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

4.  Make the file executable and enable the script:

    ```
    chmod +x /etc/init.d/contentservices
    chkconfig --add alfresco-contentservices
    ```

5.  Modify the config.yml file to specify your environment settings; for example, your ActiveMQ host name if it is on a different server:

    ```
    messaging:
    broker:
      url: tcp://localhost:61616
    ```

    The content services node uses ImageMagick and FFmpeg and requires that the executable directories are available on the system PATH variable.

    For more information about the content services framework, see [Content services node architecture](../concepts/mm-gytheio.md).

6.  Ensure that the target server port is open and not blocked by a firewall.


**Parent topic:**[Running Media Management automatically](../concepts/mm-run-auto.md)

