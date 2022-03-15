require "searchyll/version"
require "jekyll/hooks"
require "jekyll/plugin"
require "jekyll/generator"
require "searchyll/configuration"
require "searchyll/indexer"
require "nokogiri"

begin
  indexers = {}

  Jekyll::Hooks.register(:site, :pre_render) do |site|
    config = Searchyll::Configuration.new(site)
    indexers[site] = Searchyll::Indexer.new(config)
    indexers[site].start
  end

  Jekyll::Hooks.register :site, :post_render do |site|
    indexers[site].finish
  end

  # gets random pages like your home page
  Jekyll::Hooks.register :pages, :post_render do |page|
    # strip html
    nokogiri_doc = Nokogiri::HTML(page.output)

    # puts %(        indexing page #{page.url})

    indexer = indexers[page.site]
    indexer << page.data.merge({
      id:     page.name,
      url:    page.url,
      text:   nokogiri_doc.xpath("//article//text()").to_s.gsub(/\s+/, " ")
    })
  end

  # gets both posts and collections
  Jekyll::Hooks.register :documents, :post_render do |document|
    # strip html
    nokogiri_doc = Nokogiri::HTML(document.output)

    # puts %(        indexing document #{document.url})

    indexer = indexers[document.site]
    indexer << document.data.merge({
      id:     document.id,
      url:    document.url,
      text:   nokogiri_doc.xpath("//article//text()").to_s.gsub(/\s+/, " ")
    })
  end

rescue => e
  puts e.message
end
