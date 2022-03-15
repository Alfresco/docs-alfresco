# -*- encoding: utf-8 -*-
# stub: searchyll 0.10.2 ruby lib

Gem::Specification.new do |s|
  s.name = "searchyll".freeze
  s.version = "0.10.2"

  s.required_rubygems_version = Gem::Requirement.new(">= 0".freeze) if s.respond_to? :required_rubygems_version=
  s.require_paths = ["lib".freeze]
  s.authors = ["Nick Zadrozny".freeze, "Allison Zadrozny".freeze, "Rob Sears".freeze]
  s.bindir = "exe".freeze
  s.date = "2018-06-30"
  s.email = ["nick@bonsai.io".freeze, "allison@bonsai.io".freeze, "rob@bonsai.io".freeze]
  s.homepage = "https://github.com/omc/searchyll".freeze
  s.licenses = ["GPL-3.0".freeze]
  s.rubygems_version = "3.0.6".freeze
  s.summary = "A gem to index your Jekyll pages into Elasticsearch.".freeze

  s.installed_by_version = "3.0.6" if s.respond_to? :installed_by_version

  if s.respond_to? :specification_version then
    s.specification_version = 4

    if Gem::Version.new(Gem::VERSION) >= Gem::Version.new('1.2.0') then
      s.add_development_dependency(%q<bundler>.freeze, ["~> 1.10"])
      s.add_development_dependency(%q<rake>.freeze, ["~> 10.0"])
      s.add_development_dependency(%q<rspec>.freeze, [">= 0"])
      s.add_development_dependency(%q<guard-rspec>.freeze, [">= 0"])
      s.add_runtime_dependency(%q<jekyll>.freeze, [">= 3.0"])
      s.add_runtime_dependency(%q<nokogiri>.freeze, [">= 0"])
    else
      s.add_dependency(%q<bundler>.freeze, ["~> 1.10"])
      s.add_dependency(%q<rake>.freeze, ["~> 10.0"])
      s.add_dependency(%q<rspec>.freeze, [">= 0"])
      s.add_dependency(%q<guard-rspec>.freeze, [">= 0"])
      s.add_dependency(%q<jekyll>.freeze, [">= 3.0"])
      s.add_dependency(%q<nokogiri>.freeze, [">= 0"])
    end
  else
    s.add_dependency(%q<bundler>.freeze, ["~> 1.10"])
    s.add_dependency(%q<rake>.freeze, ["~> 10.0"])
    s.add_dependency(%q<rspec>.freeze, [">= 0"])
    s.add_dependency(%q<guard-rspec>.freeze, [">= 0"])
    s.add_dependency(%q<jekyll>.freeze, [">= 3.0"])
    s.add_dependency(%q<nokogiri>.freeze, [">= 0"])
  end
end
