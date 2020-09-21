# Deploy Alfresco Insight Zeppelin using Docker Compose

You can deploy Alfresco Insight Zeppelin by inserting the container details into the same Docker Compose file that you use for deploying Alfresco Content Services 6.2 and Alfresco Search and Insight Engine.

For details about deployment using the Docker Compose file, see [Deploying Search and Insight Engine using Docker Compose](search-insight-deploying.md).

1.  Open your `docker-compose.yml` file, and insert the following container information:

    ```
    zeppelin:
        image: quay.io/alfresco/insight-zeppelin:2.0.0
        environment:
                - REPO_HOST=alfresco
                - REPO_PORT=8080
        ports:
        - “9090:9090”
    ```

2.  Save the file.

3.  Run Alfresco Insight Zeppelin using `http://localhost:9090/zeppelin`.


**Parent topic:**[Building reports and dashboards](../concepts/installing-apache.md)

