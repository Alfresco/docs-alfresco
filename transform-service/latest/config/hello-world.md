---
title: Running hello world T-Engine standalone
---
Use this information to run the example Hello World transform engine (T-Engine).

1. Clone the [alfresco-helloworld-transformer](https://github.com/Alfresco/alfresco-helloworld-transformer/tree/master/alfresco-helloworld-transformer-engine){:target="_blank"} project.

2. Navigate to the `alfresco-helloworld-transformer-engine` folder.

3. Build the T-Engine:

    ```bash
    mvn clean install -Plocal
    ```

4. Start the T-Engine:

    ```bash
    docker run -d -p 8090:8090 --name alfresco-helloworld-transformer alfresco/alfresco-helloworld-transformer:latest
    ```

5. Create a test file named `source_file.txt` with the following content:

    ```bash
    T-Engines
    ```

6. Open your browser and go to `http://localhost:8090/`.

    For convenience, the Hello World T-Engine provides an HTML form to POST requests to the `/transform` endpoint.

7. In the HTML Form, choose `source_file.txt`.

8. Specify a language, where the supported languages are: English, Spanish, German.

9. Click `Transform` and then view the downloaded file.

T-Engines provide a `/log` endpoint out of the box. This shows information about transformations performed by the T-Engine. In addition, the T-Engine server logs can be accessed using the Docker `logs` command. For example:

```bash
docker logs alfresco-helloworld-transformer
```

See the [Docker documentation](https://docs.docker.com/engine/reference/commandline/logs/){:target="_blank"} for more.