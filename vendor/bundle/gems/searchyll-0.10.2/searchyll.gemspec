# coding: utf-8
lib = File.expand_path('../lib', __FILE__)
$LOAD_PATH.unshift(lib) unless $LOAD_PATH.include?(lib)
require 'searchyll/version'

Gem::Specification.new do |spec|
  spec.name          = "searchyll"
  spec.version       = Searchyll::VERSION
  spec.authors       = [ "Nick Zadrozny", "Allison Zadrozny", "Rob Sears"]
  spec.email         = [ "nick@bonsai.io", "allison@bonsai.io", "rob@bonsai.io" ]

  spec.summary       = %q{A gem to index your Jekyll pages into Elasticsearch.}
  spec.homepage      = "https://github.com/omc/searchyll"
  spec.licenses      = "GPL-3.0"

  spec.files         = `git ls-files -z`.split("\x0").reject { |f| f.match(%r{^(test|spec|features)/}) }
  spec.bindir        = "exe"
  spec.executables   = spec.files.grep(%r{^exe/}) { |f| File.basename(f) }
  spec.require_paths = ["lib"]

  spec.add_development_dependency "bundler", "~> 1.10"
  spec.add_development_dependency "rake", "~> 10.0"
  spec.add_development_dependency "rspec"
  spec.add_development_dependency "guard-rspec"

  spec.add_dependency "jekyll", ">= 3.0"
  spec.add_dependency "nokogiri"

end
