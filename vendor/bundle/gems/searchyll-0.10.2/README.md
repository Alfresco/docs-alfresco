# Searchyll

Search for Jekyll apps. A plugin for indexing your pages into a search engine.

Currently supports Elasticsearch, we're also considering modular support for
Apache Solr in a future release.

## Installation

Add this line to your application's Gemfile:

```ruby
gem 'searchyll'
```

In your Jekyll Gemfile:

```
gems:
  - searchyll
```

## Configuration

```
elasticsearch:
  url: "http://localhost:9200/" # Required. Supports auth and SSL: https://user:pass@someurl.com
                                # Can also read URLs stored in environment variable named
                                # BONSAI_URL and ELASTICSEARCH_URL.
  number_of_shards: 1           # Optional. Default is 1 primary shard.
  number_of_replicas: 1         # Optional. Default is 1 replica.
  index_name: "jekyll"          # Optional. Default is "jekyll".
  default_type: "post"          # Optional. Default type is "post".
```

## Development

After checking out the repo, run `bin/setup` to install dependencies. Then, run
`rake spec` to run the tests. You can also run `bin/console` for an interactive
prompt that will allow you to experiment.

## Contributing

Bug reports and pull requests are welcome on GitHub at
https://github.com/omc/searchyll
