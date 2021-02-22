---
author: Alfresco Documentation
---

# Setting up ElasticSearch for development

You can set up an external instance of ElasticSearch 1.7.3 on your machine and configure Process Services to connect to it.

If you want to configure ElasticSearch in embedded mode within Process Services, see [Administering](adminGuide.md)

The following section describes the steps in more detail.

1.  Download and set up ElasticSearch

    ElasticSearch provides downloads in multiple formats, however the ZIP download is recommended for general development usage. As mentioned above, you must use ElasticSearch 1.7.3 with the Java client embedded in Process Services. The same can be downloaded from the [ElasticsSearch releases archive](https://www.elastic.co/downloads/past-releases/elasticsearch-1-7-4).

    Once you have extracted this to a local directory, configure to ensure the ElasticSearch Java client is able to find the cluster in *config/elasticsearch.yml*. In general, you can leave the ElasticSearch default settings as-is.

    ```
    network.host: 127.0.0.1
    ```

    Now you can run ElasticSearch from a terminal, e.g.

    ```
    ./bin/elasticsearch
    ```

    Or on Windows

    ```
    bin/elasticsearch.bat
    ```

    The logging output to the console should indicate that ElasticSearch is running successfully on ports 9200 and 9300, e.g.

    ```
    [2016-03-15 16:43:50,117][INFO ][node                     ] [Bird-Brain] version[1.7.5], pid[2674], build[00f95f4/2016-02-02T09:55:30Z]
    [2016-03-15 16:43:50,117][INFO ][node                     ] [Bird-Brain] initializing ...
    [2016-03-15 16:43:50,171][INFO ][plugins                  ] [Bird-Brain] loaded [], sites []
    [2016-03-15 16:43:50,198][INFO ][env                      ] [Bird-Brain] using [1] data paths, mounts [[/ (/dev/disk1)]], net usable_space [112.9gb], net total_space [464.7gb], types [hfs]
    [2016-03-15 16:43:51,831][INFO ][node                     ] [Bird-Brain] initialized
    [2016-03-15 16:43:51,832][INFO ][node                     ] [Bird-Brain] starting ...
    [2016-03-15 16:43:51,922][INFO ][transport                ] [Bird-Brain] bound_address {inet[/127.0.0.1:9300]}, publish_address {inet[/127.0.0.1:9300]}
    [2016-03-15 16:43:51,936][INFO ][discovery                ] [Bird-Brain] elasticsearch/Txeg7JYVTE6H4314aQEoZA
    [2016-03-15 16:43:55,710][INFO ][cluster.service          ] [Bird-Brain] new_master [Bird-Brain][Txeg7JYVTE6H4314aQEoZA][MacBook-Pro.local][inet[/127.0.0.1:9300]], reason: zen-disco-join (elected_as_master)
    [2016-03-15 16:43:55,729][INFO ][http                     ] [Bird-Brain] bound_address {inet[/127.0.0.1:9200]}, publish_address {inet[/127.0.0.1:9200]}
    [2016-03-15 16:43:55,729][INFO ][node                     ] [Bird-Brain] started
    [2016-03-15 16:43:55,751][INFO ][gateway                  ] [Bird-Brain] recovered [2] indices into cluster_state
    [2016-03-15 16:44:41,023][INFO ][cluster.service          ] [Bird-Brain] added {[activiti-client][wKX2Tj1CR2-WesIRKKE1iQ][MacBook-Pro.local][inet[/127.0.0.1:9301]]{client=true, data=false},}, reason: zen-disco-receive(join from node[[activiti-client][wKX2Tj1CR2-WesIRKKE1iQ][MacBook-Pro.local][inet[/127.0.0.1:9301]]{client=true, data=false}])
    ```

2.  Setting up Sense

    Sense is a simple Kibana plugin which allows you to send requests to a running ElasticSearch node and see the results displayed in its console. It is especially helpful when you are developing your queries as it allows you to to try these out without any coding, but it also defines a basic cURL-like syntax for requests which is used in all the code examples in the ElasticSearch docs.

    You must install the latest version of [Kibana](https://www.elastic.co/products/kibana) in order to be able to use the Sense plugin. This version of Kibana supports ElasticSearch 1.7.x but in order to use it you must add the following lines to the end of your `config/kibana.yml` file in order to turn off the core Kibana functionality which will not work with older versions of ElasticSearch. This does not matter, since the Sense plugin runs standalone and connects to ElasticSearch directly.

    ```
    kibana.enabled: false        # disable the standard kibana discovery, visualize & dashboard plugins
    elasticsearch.enabled: false # do not require a running Elasticsearch 2.0 instance
    ```

    After this we can install the Sense plugin and start Kibana

    ```
    ./bin/kibana plugin --install elastic/sense
    ./bin/kibana
    ```

    You should see some information output to the console to indicate that Kibana is running and you can navigate to Sense by pointing your browser to [http://localhost:5601/app/sense](http://localhost:5601/app/sense)

    To test that everything is working and to start getting a feel for the data mappings defined in the Process Services indexes, enter the following query into the Sense UI and hit the green execute button.

    ```
    GET _mapping 
    ```

3.  Configuring Alfresco Process Services

    For some events to show up in the Elasticsearch indexes, you must first turn on event generation and processing for your installation and also enable Elasticsearch itself.

    To turn on event generation and processing, add the following to the tomcat/lib/activiti-app.properties file.

    ```
    event.generation.enabled=true
    event.processing.enabled=true
    ```

    The most straightforward configuration for Elasticsearch is to use the embedded mode, which will start a new local, standalone node within the webapp itself. Don’t forget to turn on HTTP access also for development \(do not do this in production!\) so that you can use cURL or Sense to send queries to Elasticsearch directly.

    ```
    elastic-search.server.type=embedded
    elastic-search.enable.http=true
    ```

    Alternatively you can install an external instance of Elasticsearch.

4.  Using unicast

    By default, ElasticSearch will use multicast to find other nodes. You configure ElasticSearch to use unicast to reach the local ElasticSearch node that you have started. The following configuration, added to the `activiti-app.properties` file, will configure client mode and unicast discovery in addition to turning on event generation and processing so that these get sent to ElasticSearch.

    ```
    elastic-search.server.type=client
    elastic-search.cluster.name=elasticsearch
    elastic-search.discovery.type=unicast
    elastic-search.discovery.hosts=127.0.0.1[9300-9400]
    ```

    Once you have completed this setup you should restart Process Services to ensure that the settings are applied. The console logging output should contain some information indicating that the ElasticSearch client has successfully connected to the cluster.


**Parent topic:**[Custom reports](../topics/custom_reports.md)

