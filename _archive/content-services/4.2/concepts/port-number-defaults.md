---
author: [Alfresco Documentation, Alfresco Documentation, Alfresco Documentation]
source: 
audience: 
---

# Default port numbers and services

This summary gives you a list of the port numbers relevant to the services that Alfresco runs, and where to change them.

-   **Tomcat settings and ports**

    If you are running Alfresco on Tomcat then tomcat itself may be listening on some ports. These ports are configured in the tomcat/conf/server.xml file.

    HTTP 8080

    HTTPS 8443

    Shutdown Port 8005

    AJP 8009

    This port is configured in the tomcat/bin/catalina.sh file:

    JPDA 8000

-   **Alfresco context inside Alfresco configuration**

    These ports are configured in the <classpathRoot\>/alfresco-global.properties file.

    alfresco.port=8080

-   **Share context inside Alfresco configuration**

    This port is configured in the <classpathRoot\>/alfresco-global.properties file. If repository ports are changed, you can change the Alfresco Share connection ports in the <web-extension\>/share-config-custom.xml file.

    share.port=8080

-   **Alfresco SharePoint Protocol**

    These ports are configured in the <classpathRoot\>/alfresco-global.properties file.

    vti.server.port=7070

    vti.server.external.port=7070

-   **OpenOffice – LibreOffice**

    This port is configured in the <classpathRoot\>/alfresco-global.properties file.

    ooo.port=8100

-   **JodConverter**

    This port is configured in the <classpathRoot\>/alfresco-global.properties file.

    jodconverter.portNumbers=8100

-   **FTP**

    This port is configured in the <classpathRoot\>/alfresco-global.properties file. It can be mapped to non-privileged ports, then use firewall rules to forward requests from the standard ports.

    ftp.port=21

-   **CIFS – SMB shared drive**

    These ports are configured in the <classpathRoot\>/alfresco-global.properties file. Can be mapped to non-privileged ports, then use firewall rules to forward requests from the standard ports.

    cifs.tcpipSMB.port=445

    cifs.netBIOSSMB.sessionPort=139

    cifs.netBIOSSMB.namePort=137

    cifs.netBIOSSMB.datagramPort=138

-   **IMAP**

    This port is configured in the <classpathRoot\>/alfresco-global.properties file. Can be mapped to non-privileged ports, then use firewall rules to forward requests from the standard ports.

    imap.server.port=143

-   **Inbound Email \(SMTP\)**

    This port is configured in the <classpathRoot\>/alfresco-global.properties file. Can be mapped to non-privileged ports, then use firewall rules to forward requests from the standard ports.

    email.server.port=25

-   **NFS server**

    These ports are configured in the <classpathRoot\>/alfresco-global.properties file. Mount/NFS server ports, 0 will allocate next available port

    nfs.mountServerPort=0

    nfs.nfsServerPort=2049

-   **RPC registration port**

    A setting of 0 will allocate next available port. Some portmapper/rpcbind services require a privileged port to be used

    nfs.rpcRegisterPort=0

-   **Disable NFS and mount server registering with a portmapper set**

    These ports are configured in the <classpathRoot\>/alfresco-global.properties file.

    nfs.portMapperPort to -1

    nfs.portMapperPort=111

-   **Cluster with Hazelcast**

    This port is configured in the <classpathRoot\>/alfresco-global.properties file.

    alfresco.hazelcast.port=5701

-   **From Solr to Alfresco workspace queries**

    These ports are configured in the ./alf\_data/solr/workspace-SpacesStore/conf/solrcore.properties file.

    alfresco.port=8080

    alfresco.port.ssl=8443

-   **From Solr to Alfresco archive queries**

    These ports are configured in the ./alf\_data/solr/archive-SpacesStore/conf/solrcore.properties file.

    alfresco.port=8080

    alfresco.port.ssl=8443

-   **From Alfresco to Solr queries**

    These ports are configured in the <classpathRoot\>/alfresco-global.properties file.

    solr.port=8080

    solr.port.ssl=8443

-   **RMI service JMX ports**

    These ports are configured in the <classpathRoot\>/alfresco-global.properties file.

    alfresco.rmi.services.port=50500

    avm.rmi.service.port=0

    avmsync.rmi.service.port=0

    attribute.rmi.service.port=0

    authentication.rmi.service.port=0

    repo.rmi.service.port=0

    action.rmi.service.port=0

    deployment.rmi.service.port=0

-   **Monitoring RMI**

    This port is configured in the <classpathRoot\>/alfresco-global.properties file.

    monitor.rmi.service.port=50508


**Parent topic:**[Day Zero configuration](../concepts/zeroday-config.md)

