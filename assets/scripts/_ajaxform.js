;( function( $ ) {
	"use strict";

	$.fn.ajaxForm = function(settings)
	{
		var options = $.extend({
            form_label: "label",
            checkbox_label: "checkbox-label",
            error_class: "error",
            error_message: "error-text"
        }, settings);

		return this.each(function() {
			
			var $form = $(this), validation, upload, form_ajax_default, callback_stack = {};

			form_ajax_default = function($form, response)
			{
			    if (response.status)
			    {
			        if (response.hasOwnProperty('redirect_url')) {
			            window.location.href = response.redirect_url;
			        }
			    }
			    else if (response.errors)
			    {
			        validation($form, response.errors);
			    }
			    
			    if (response.hasOwnProperty('message'))
			    {
			        $.popup.message(response.title, response.message);
			    }
			};

			upload = function()
			{
			    $('body').on('submit', '.form-file-upload', function(e) {
			        return AIM.submit(this, {
			            onStart: function()
			            {

			            },
			            onComplete: function(result)
			            {
			                if (typeof result === 'object' && result.status === true && result.hasOwnProperty('photo_url'))
			                {

			                }
			            }
			        });
			    });
			    
			    $(document).on('change', '.upload_button_onchange', function(){
			        if ($(this).closest('.upload_button').find('.upload_button_field').length > 0)
			        {
			            $(this).closest('.upload_button').find('.upload_button_field').html($(this).val());
			        }
			    });
			};

			validation = function($form, errors)
			{
			    $form.find('.' + options.error_class).removeClass(options.error_class);
			    $form.find('.' + options.error_message).remove();
			    
			    setTimeout(function(){
				    if (errors) {
				       	for(fieldName in errors)
				        {
				            if ($form.find('input[name="'+fieldName+'"]').length > 0)
				            {
				                $field = $form.find('input[name="'+fieldName+'"]');
				            }

				            if ($form.find('select[name="'+fieldName+'"]').length > 0)
				            {
				                $field = $form.find('select[name="'+fieldName+'"]');
				            }

				            if ($form.find('textarea[name="'+fieldName+'"]').length > 0)
				            {
				                $field = $form.find('textarea[name="'+fieldName+'"]');
				            }

				            if ($field.closest('.' + options.checkbox_label).length > 0)
				            {
				                $field = $field.closest('.' + options.checkbox_label);
				            }

				            if (typeof($field) !== 'undefined')
				            {
			                	$field.addClass(options.error_class);
			                	$field.closest('.' + options.form_label).append('<div class="' + options.error_message + '">' + errors[fieldName] + '</div>');
			                }
				        }
				    }
			    }, 10);
			};

		    $form.on('submit', function(e){
		        e.preventDefault();
				
				try {
			        var $form = $(this);
			        
			        $.ajax({
			            url: $form.attr('action'),
			            type: ($form.attr('method') || 'get'),
			            data: $form.serialize(),
			            dataType: 'JSON',
			            success: function(response)
			            {
			                if ($form.data('callback') && callback_stack.hasOwnProperty($form.data('callback')))
			                {
			                    callback_stack[$form.data('callback')]($form, response);
			                }
			                else
			                {
			                    form_ajax_default($form, response);
			                }

			                if (response.status === true)
			                {
								
			                }
			            },
			            error: function(response)
			            {
			                form_ajax_default($form, response);
			                alert("error");
			            }
					});
			    } catch(e){}
		    });
		});
	};

	$.app.ajaxForm = {
		init: function()
		{
			
		}
	};

})( jQuery );