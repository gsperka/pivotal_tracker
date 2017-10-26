module ResultsHelper

	def print_if_present(var)
		var ? var : "Not Listed"
	end

	def display_from_array(var)
		all_tags = ""
		var.each {|tag| all_tags += tag + ","}
		all_tags[0..-2] if all_tags.last == ","
	end

end
