---
author: [Alfresco Documentation, Alfresco Documentation]
source: 
audience: 
category: [Authentication and Security, Authentication, Administration]
keyword: [configuration, Kerberos, Active Directory, authentication]
---

# CIFS clustering through load balancer

This topic describes the steps to configure CIFS clustering through the load balancer.

Setting up a CIFS cluster involves configuring the Balance application and the HAProxy load balancer.

Balance is a load balancing solution for simple TCP proxy with round robin load balancing and fail over mechanisms.

1.  Configure Balance.

    For Linux from Source:

    1.  Download Balance from the [Balance download page](http://www.inlab.de/balance.html).

        Ensure that building toolchains specific to your OS version are installed. For example, GNU Compiler Collection \(GCC\), GNU make, or any other related packages.

    2.  Run the following commands to install Balance:

        ```
        make
        make install
        ```

        This installs Balance at /usr/sbin/ and the man page at /usr/man/man1.

    3.  Enable Balance to bind on port `445` of the local IPv4 IP address and distribute connections to `<host1_IP>, port 445`, and `<host2_IP>, port 445`.

        ```
        #balance -fb ::ffff:<IP>  445 <host1_IP>:445 % <host2_IP>:445
        ```

        where `<IP>` is the local IPv4 IP address, `<host1_IP>` is the IPv4 address of the first server hostname, and `<host2_IP>` is the IPv4 address of the second server hostname.

2.  Configure HAProxy.

    1.  To configure HAProxy on Solaris 11.2, [download the appropriate version of HAProxy](http://www.haproxy.org/download/) in accordance to your server \(x86 or Sparc\).

        For example, `haproxy-1.4.18-pcre-solaris10-x86.stripped.gz`.

    2.  Get Perl Compatible Regular Expressions \(PCRE\) and its dependencies from [http://www.pcre.org/](http://www.pcre.org/).

        1.  Unzip the PCRE library.

            ```
            gunzip prce-x.x.tar.gz
             tar xf prce-x-x.tar
            cd prce-x.x
            ```

        2.  Run the following commands:

            ```
            ./configure --enable-static --enable-shared --prefix=/usr/local--enable-unicode-properties
            make && make install
            ```

    3.  Create a new user and group with name `haproxy`.

    4.  Run the following commands:

        ```
        gunzip haproxy-1.4.x-pcre-solaris10-x86.stripped.gz
        mv haproxy-1.4.x-pcre-solaris10-x86.stripped haproxy
        mv haproxy /usr/bin/
        chmod +x /usr/bin/haproxy
        mkdir -p /etc/haproxy
        ```

    5.  Create and edit the /etc/haproxy/haproxy.cfg configuration file by adding the configuration shown below:

        ```
        global
            log 127.0.0.1  local0 notice
            user haproxy
            group  haproxy
            chroot /etc/haproxy #directory
            daemon
            nbproc  7
            pidfile /var/run/haproxy.pid
        
        defaults
              log global
              option tcplog
              option redispatch
              contimeout     3000
              clitimeout     5000
              srvtimeout     5000
        
        listen hostname  <IP>:445
              mode tcp
              balance roundrobin
              server hostname <host1_IP>:445 weight  77
              server hostname <host2_IP>:445 weight 179
        ```

        **Note:** Make sure you have /usr/bin in your environment path.

    6.  Run HAProxy with the following command:

        ```
        haproxy -f /etc/haproxy/haproxy.cfg -D
        ```


When a proxy is used for mapping the CIFS drive, CIFS clients from multiple IP addresses access Alfresco CIFS through the same IP address. To ensure that Alfresco CIFS is aware that all client IP addresses used for accessing CIFS will use the same IP address \(address of your proxy/load balancer\), set the following property in the alfresco-global.properties file, on all Alfresco nodes in the cluster:

```
cifs.loadBalancerList = <IP address of the Load Balancer>
```

**Parent topic:**[Setting up clustering](../concepts/ha-intro.md)

