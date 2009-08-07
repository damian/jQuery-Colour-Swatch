(function($) {
    $.fn.colourPicker = function(options) {
        var defaults = {
            colours: ['red', 'blue', 'yellow', 'green', 'purple', 'orange', 'grey', 'magenta'],
			colourInput : true,
			columns: 4
        };
		
		if (options) {
			if (options.colours) {
				if (options.colours.length < defaults.columns) {
					options.columns = options.colours.length;
				}
			}
			
			if (options.columns) {
				if (options.columns % 2 != 0 && defaults.colours.length % 2 == 0) {
					options.columns = options.columns - 1;
				}
			}
		}

        var options = $.extend(defaults, options);
        return this.each(function() {
            obj = $(this);
			var _flag = false;
			var _append = false
			obj.bind('focus', function(){
				if (!_append) {
					$('div#colour-swatch').fadeIn('slow').append(createTable(defaults.colours, defaults.columns));
					$('div#colour-swatch table tbody tr#colour-preview').css({ 'width' : $('div#colour-swatch table thead').width()-4 })
					_append = true;
					_flag = true;
				}
				if (!_flag) {
					$('div#colour-swatch').fadeIn('slow');
					_flag = true;
				} 
			});

			obj.bind('blur', function(){
				if (_flag) {
					$('div#colour-swatch').fadeOut('slow');
					_flag = false;
				}
			});
			
			$('div#colour-swatch table thead td').live('click', function(){
				rel = $(this).attr('value');
				obj.val(rel);
				if (defaults.colourInput) {
					obj.css({ 'background-color' : rel });
				}
				$('div#colour-swatch').fadeOut('slow');
				_flag = false;
			});
			
			$('div#colour-swatch table thead td').live('mouseover', function(){
				$('div#colour-swatch table tbody tr#colour-preview').css({ 'background-color' : $(this).attr('value') });
			});
						
			function createTable(array, columns) {
				var html = '<table><thead><tr>';
				for (var i=0; i < array.length; i++) {
					if (i!=0 && i%columns==0) {
						html += '</tr><tr>';
					}
					html += '<td style="background-color: ' + array[i] + ';" value="' + array[i] +'">&nbsp;</td>'
				};
				html += '</tr></thead><tbody><tr id="colour-preview"></tr></tbody></table>';
				return html;
			}
			
        });
    }
})(jQuery);