---
title: Using Grafana
---

## Visualize metrics with Grafana

Grafana is one of many tools that allows you to pull data from Graphite, and allows you to create more customizable, and attractive charts and graphs. You may find your own preferred tool. Here are a couple of Sync Service metrics displayed in Grafana:

![Sync Service metrics in Grafana]({% link sync-service/images/grafana-metrics.png %})

You can create your own dashboard view with various charts and graphs in Grafana by using the following steps.

## Add a Graphite data source

Use these instructions to add a data source from Graphite to use with Grafana.

1. Open your browser and enter `http://<Grafana-host>:3000`.

2. Click **+ Add data source**.

3. Enter a **Name** for this data source.

4. Select **Graphite** from the **Type** menu.

5. Input the **URL** of the Graphite server.

    If you're using a **proxy**, input an IP address that's accessible from the Grafana backend. For example, use the subnet private IP when deployed in AWS:

    ```bash
    http://10.0.2.243:80
    ```

    If you have a **direct** connection, enter a publicly accessible IP:

    ```bash
    http://34.240.113.207:80
    ```

6. Use `Basic Auth` to start with. Graphite's default user and password are `root:root`.

7. Click **Save & Test**.

    You should see the message: `Data source is working`.

## Create your first dashboard

Use these instructions to create your first dashboard in Grafana, and start creating graphs/charts.

1. Open your browser and enter `http://<Grafana-host>:3000`.

2. Click **Create your first dashboard**.

3. Add a new graph by selecting a graph type:

    ![Add new graph]({% link sync-service/images/grafana-dash-new.png %})

4. Click **Panel Title** > **Edit** to select the metric to display in this graph:

    ![Edit dashboard]({% link sync-service/images/grafana-edit.png %})

5. In the **Metrics** tab, select the Graphite **Data Source**, and the value of the metric to display (such as the mean, 99th percentile, etc.).

    ![Metrics]({% link sync-service/images/grafana-dash-data.png %})

6. Click the disk icon ![Disk icon]({% link sync-service/images/disk-icon.png %}) to save the dashboard.

If you've previously saved a dashboard, you can import it using the following steps.

## Import an existing dashboard

Use these instructions to import an existing dashboard into Grafana.

You can import a dashboard that you saved as part of [creating your first dashboard](#create-your-first-dashboard).

1. Open your browser and enter `http://<Grafana-host>:3000`.

2. Click **Dashboards** then **Import**:

    ![Import dashboard]({% link sync-service/images/grafana-dash-import.png %})

3. Find the file you saved in step 6 of [Create your first dashboard](#create-your-first-dashboard) then import it.
