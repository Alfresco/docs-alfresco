---
author: [Alfresco Documentation, Alfresco Documentation]
source: 
audience: 
---

# Configuring CIFS on Windows Server 2008 R2

The following instructions describe how to configure the Alfresco CIFS server on Windows Server 2008 R2.

**Important:** Alfresco does **not** recommend that you use the CIFS file Server on an Alfresco installation running on Windows. Due to limitations and workarounds necessary for the operating system, it requires a complicated setup and provides poor performance compared to non-Windows systems.

1.  Install Windows Server 2008 R2 out-of-the box.

    **Important:** To use these instructions, you must not have altered the hosts file on the server or client. Also, you must not have modified the Windows Registry either on the server or client. You do not need to change the hosts file or File and Printer Sharing configuration.

2.  Configure a WINS server.

    1.  If the server is a domain controller or already part of a domain, this may already be controlled by a Domain Policy.

        To install one on Windows Server 2008 R2, see the following article: [http://technet.microsoft.com/en-us/library/ff710463%28WS.10%29.aspx](http://technet.microsoft.com/en-us/library/ff710463%28WS.10%29.aspx).

    2.  To manually configure an existing WINS server: 

        1.  Go to **Control Panel\\Network and Internet\\Network and Sharing Center \> Change Adapter Settings \> Local Area Connection \> Properties**.
        2.  Select **Internet Protocol Version 4 \(TCP/IPv4\)** and then select **Properties**.
        3.  On the **General** tab, select **Advanced** and then select the **WINS** tab.
        4.  Click **Add** and then add the IP address of the WINS server in your network and select **Enable NetBIOS over TCP/IP**.
        5.  Click **OK \> OK \> Close**.
3.  Ensure that you install Alfresco using the x64 setup wizard.

    See [Installing Alfresco Enterprise on Windows](simpleinstall-enterprise-win.md).

4.  Configure the Windows Server 2008 R2 firewall to create a rule to block 445.

    1.  Open **Control Panel\\Network and Internet\\Network and Sharing Center \> Windows Firewall \> Advanced Settings**.

    2.  Select **Inbound Rules**.

    3.  On the right-side of the window, click **New Rule**.

    4.  Follow the instructions on the wizard:

        1.  Rule Type \> Port, Next.
        2.  Rule apply to "TCP", Specific Local Ports \> 445, Next,
        3.  Action \> Block the connection, Next,
        4.  Profile \> Select ALL network types \(Domain, Public, Private\)
        5.  Name \> "Alfresco CIFS \(Block 445\)", Description the same.
    5.  Select **Finish**.

5.  Configure the Windows Server 2008 R2 firewall to create a rule to allow 137,138,139.

    1.  Open the **Control Panel\\Network and Internet\\Network and Sharing Center \> Windows Firewall \> Advanced Settings**.

    2.  Select **Inbound Rules**.

    3.  On the right-side of the window, click **New Rule**.

    4.  Follow the instructions on the wizard:

        1.  Rule Type \> Port, Next.
        2.  Rule apply to "TCP", Specific Local Ports \> 137,138,139, Next,
        3.  Action \> Allow the connection, Next,
        4.  Profile \> Select ALL network types \(Domain, Public, Private\)
        5.  Name \> "Alfresco CIFS \(Allow 137,138,139\)", Description the same.
    5.  Select **Finish**.

6.  Configure the client \(Windows XP and Windows 7\)

    1.  Go to **Control Panel\\Network and Internet\\Network and Sharing Center \> Change Adapter Settings \> Local Area Connection \> Properties**. 

    2.  Select **Internet Protocol Version 4 \(TCP/IPv4\)** and click **Properties**.

    3.  On the **General** tab, select **Advanced** and then select the **WINS** tab.

    4.  Click **Add** and then add the IP address of the WINS server in your network and select **Enable NetBIOS over TCP/IP**.

    5.  Click **OK \> OK \> Close**. 

    6.  Use the `net use R: \\{HOSTNAME}A\Alfresco * /USER:admin` command to check your connection.

        If the WINS server works correctly, you are then connected to Alfresco CIFS successfully.


**Parent topic:**[Configuring SMB/CIFS server](../concepts/fileserv-subsystem-CIFS.md)

