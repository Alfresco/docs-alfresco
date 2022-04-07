module Jekyll
  module Alfresco
    class AlfrescoLocalisation < Jekyll::Generator
      safe true
      priority :lowest

      def generate(site)
        # configuration
        @config = Jekyll.configuration({})['alfresco']
        @langs = @config['langs']
        reglangs = /^(#{@langs.map{|i,l| i}.join('|')})\//.freeze

        puts "Searching for localisation"
        @site = site

        starting = Process.clock_gettime(Process::CLOCK_MONOTONIC)

        lang_hash = { }
        url_pages_hash = { }
        site.data['url_pages_hash'] = url_pages_hash;

        pages_orig = []
        pages_loc = []

        # separate en articles
        @site.pages.each do |page|
          page.relative_path =~ reglangs

          lang = $1 ? $1 : "en"
          page.data['lang'] = lang
          page.data['lang_config'] = @langs[lang]

          url_pages_hash[page.url] = page

          if lang == 'en' 
            pages_orig << page
            page.data['ref_page'] = page
            page.data['loc_pages'] = [page]
          else
            pages_loc << page
          end 
          
        end

        # detect relations
        pages_loc.each do |page|
          lang = page.data['lang']  


          lang_hash[lang] ||= 0;
          lang_hash[lang] = lang_hash[lang]+1

          ref_url = page.url[3..-1]
          ref_page = pages_orig.find{|p| p.url == ref_url}

          defs = site.frontmatter_defaults.all(ref_page.relative_path, :page)
          page.data = defs.merge(page.data)   
          
          page.data['ref_page'] = ref_page

          ref_page.data['loc_pages'] << page
          
        end

        

        ending = Process.clock_gettime(Process::CLOCK_MONOTONIC)
        elapsed = ending - starting

        puts "Localisation relations defined in #{elapsed}s"
        puts lang_hash.inspect


      end

      private

      
    end

    class AlfrescoLocString < Liquid::Tag
      def initialize(tag_name, markup, tokens)
        super
        @markup  = markup.strip
      end

      def render(context)
        site = context.registers[:site]
        lang = context['page']['lang']
        str = Liquid::Template.parse(@markup).render context
        locdict = site.data[lang]['strings']
        locdict[str] ? locdict[str] : str
      end

    end

    class AlfrescoLocSafeUrl < Liquid::Block
      def initialize(tag_name, markup, tokens)
        super
        @markup  = markup.strip
      end

      def syntax_example
        "{% #{@tag_name} [no-transform-title] /url/to/check lang_code other params of 'a' tag %}"
      end

      IF_FLAG_NO_TRANSFORM_CONTENT = /no-transform-title/
      IF_FLAG_GET_TOC_TITLE = /get-toc-title/

      def render(context)
        content = super
        site = context.registers[:site]
        
        @url, @lang, *rest_params = parse_parameters(context);
        @rest_params = rest_params.join(" ")

        @redirect = false

        url = @url
        resolved_url = url;
        url = "/" + @lang + @url if @lang != 'en'
        existed_page = site.data['url_pages_hash'][url]

        unless existed_page 
          existed_page = site.data['url_pages_hash'][@url]
          @redirect = existed_page != nil
        end 

        if existed_page 
          # raise ScriptError.new("loc_safe_url: can't resolve url '#{@url}'")
          resolved_url = existed_page.url
          titlesource = @get_toc_title ? 'tocmenutitle' : 'menutitle'
          content = existed_page.data[titlesource] if existed_page.data[titlesource] && !@protect_content
        end 
        
        
        <<-HTML.gsub /^\s+/, '' # remove whitespaces
        <a href="#{resolved_url}" #{"localisation_redirect" if @redirect} #{@rest_params}>#{content}</a>
        HTML
      end

      def parse_parameters(context)
        parameters = Liquid::Template.parse(@markup).render context

        @protect_content = (parameters =~ IF_FLAG_NO_TRANSFORM_CONTENT) != nil
        parameters = parameters.gsub(IF_FLAG_NO_TRANSFORM_CONTENT, "") if @protect_content

        @get_toc_title = (parameters =~ IF_FLAG_GET_TOC_TITLE) != nil
        parameters = parameters.gsub(IF_FLAG_GET_TOC_TITLE, "") if @get_toc_title

        parameters.strip!
  
        parameters.split(/\s+/)
      end  

      def render_class(redirect, class_list)
        result = ' class="' 
        result += class_list.split(',').join(' ') if class_list
        result += " localisation_redirect" if redirect
        result += '"'
      end
    end
  end
end

Liquid::Template.register_tag('loc_safe_url', Jekyll::Alfresco::AlfrescoLocSafeUrl)
Liquid::Template.register_tag('l', Jekyll::Alfresco::AlfrescoLocString)

