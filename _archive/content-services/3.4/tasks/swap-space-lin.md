---
author: [Alfresco Documentation, Alfresco Documentation]
audience: 
---

# Adding swap space in Linux

When running Alfresco in a Linux environment, in some circumstances, it may be necessary to add extra swap space.

There are two ways in which you can add swap space in Linux.

1.  Create a swap space using a file.

    1.  Create a swap file using the `dd` command.

        For example, to create a file named linuxswapfile in the root directory use the following command:

        ```
        dd if=/dev/zero of=/root/myswapfile bs=1M count=1024
        ```

        This example creates a swap file with the name linuxswapfile under the root directory with a size of 1024MB \(1GB\).

    2.  Change the permission of the swap file using the `chmod` command so that only root can access it.

        ```
        # chmod 600 /root/linuxswapfile
        ```

    3.  Make this file a swap file using the `mkswap` command.

        ```
        # mkswap /root/linuxswapfile
        Setting up swapspace version 1, size = 1073737 kB 
        ```

    4.  Enable the newly created swapfile using the `swapon` command.

        ```
        # swapon /root/linuxswapfile
        ```

    5.  Ensure that the swap file is available as a swap area even after the reboot by adding the following line to the /etc/fstab file.

        ```
        # cat /etc/fstab
        /root/linuxswapfile               swap                    swap    defaults        0 0 
        ```

    6.  Verify that the newly created swap area is available to you by using the `swapon -s` command.

        ```
         # swapon -s
        Filename                        Type            Size    Used    Priority
        /dev/sda2                       partition       4192956 0       -1
        /root/linuxswapfile                file            1048568 0       -2
        
        # free -k
                     total       used       free     shared    buffers     cached
        Mem:       3082356    3022364      59992          0      52056    2646472
        -/+ buffers/cache:     323836    2758520
        Swap:      5241524          0    5241524
         
        ```

        **Note:** The output of the `swapon -s` command will contain the value `file` in the `Type` column if the swap area is available to you.

2.  If you have an additional hard disk \(or space available in an existing disk\) you can create a partition using the `fdisk` command and use this partition for additional swap space. To set up a partition called /dev/sdc1 as swap area:

    1.  Make this file a swap file using the `mkswap` command.

        ```
        # mkswap /dev/sdc1 
        Setting up swapspace version 1, size = 1073737 kB 
        ```

    2.  Enable the newly created swap file using the swapon command.

        ```
        # swapon /dev/sdc1
        ```

    3.  Ensure that the swap file is available as a swap area even after the reboot by adding the following line to the /etc/fstab file.

        ```
        # cat /etc/fstab
        /dev/sdc1              swap                    swap    defaults        0 0 
        ```

    4.  Verify that the newly created swap area is available to you by using the `swapon -s` command.

        ```
        # swapon -s
        Filename                        Type            Size    Used    Priority
        /dev/sda2                       partition       4192956 0       -1
        /dev/sdc1                       partition       1048568 0       -2
        
        # free -k
                     total       used       free     shared    buffers     cached
        Mem:       3082356    3022364      59992          0      52056    2646472
        -/+ buffers/cache:     323836    2758520
        Swap:      5241524          0    5241524
         
         
        ```

        **Note:** The output of the `swapon -s` command will contain the value `file` in the `Type` column if the swap area is available to you.


**Parent topic:**[Troubleshooting](../concepts/ch-troubleshoot.md)

