---
author: Alfresco Documentation
source: 
audience: 
category: Administration
keyword: [monitoring, grafana, graphite]
---

# Adding a Graphite data source in Grafana

Use these instructions to add a data source from Graphite to use with Grafana.

1.  Open your browser and enter `http://<Grafana-host>:3000`.

2.  Click **+ Add data source**.

3.  Enter a **Name** for this data source.

4.  Select **Graphite** from the **Type** menu.

5.  Input the **URL** of the Graphite server.

    If you're using a **proxy**, input an IP address that's accessible from the Grafana backend. For example, use the subnet private IP when deployed in AWS:

    ```
    http://10.0.2.243:80
    ```

    If you have a **direct** connection, enter a publically accessible IP:

    ```
    http://34.240.113.207:80
    ```

6.  Use `Basic Auth` to start with. Graphite's default user and password are `root:root`.

7.  Click **Save & Test**.

    You should see the message: `Data source is working`.


**Parent topic:**[Monitoring Sync Service](../concepts/desktop-sync-monitor.md)

