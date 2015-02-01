##
## This Plugin enables Jade support to pages and posts.
##

require 'open3'

module Jekyll

  class JadeConverter < Converter

    def matches(ext)
      ext =~ /^\.jade$/i
    end

    def output_ext(ext)
      ".html"
    end

    def convert(content)
      begin
        o, e, s = Open3.capture3("jade", :stdin_data => content)
        puts(<<-eos
Jade Error >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
#{e}
<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< Jade Error
        eos
        ) if e.length > 0
      rescue Errno::ENOENT => e
        puts "** ERROR: Jade isn't installed or could not be found."
        puts "** ERROR: To install with NPM run: npm install jade -g"
        return nil
      end
      return o
    end

  end

end
