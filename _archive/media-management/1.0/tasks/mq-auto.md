---
author: Alfresco Documentation
source: 
audience: [, ]
---

# Configuring ActiveMQ to run automatically

ActiveMQ can be configured to start and run automatically.

1.  Create a user named `activemq` that you will use to run the ActiveMQ automatic process:

    ```
    sudo useradd -m activemq
    ```

2.  Create an `init.d` script; for example, in /etc/init.d/activemq to run the ActiveMQ shell script under the `activemq` user:

    ```
    #!/bin/bash
    # chkconfig: 2345 80 20
    cd opt/activemq
    /bin/su activemq -c "bin/activemq $@"
    ```

3.  Make the file executable and enable the script:

    ```
    chmod +x /etc/init.d/activemq
    chkconfig --add activemq
    ```


**Parent topic:**[Running Media Management automatically](../concepts/mm-run-auto.md)

