/*! Form validations */
/*global $, translate, console */
jQuery(window).load(function(){
	if (jQuery.isFunction(jQuery.validator)) {
		jQuery('form[name=sign_up]').validate({
			
			rules: {
				full_name: {
					required: true
				},
				email: {
					required: true,
					email: true
				},
				sex: {
					required: true
				},
				country: {
					required: true
				},
				language: {
					required: true
				},
				agree: {
					required: true
				}
			},
			messages: {
				full_name: {
					required: "Please insert your name"
				},
				email: {
					required: "Insert your email address",
					email: "Incorrect email address"
				},
				sex: {
					required: "Please select your sex"
				},
				country: {
					required: "Please select your country"
				},
				language: {
					required: "Please select your language"
				},
				agree: {
					required: "You must be agree width Terms of Use"
				}
			},
			errorPlacement: function(error, element) {
		       if (element.attr("name") == "agree") 
		        error.insertAfter(".css-checkbox-label");
		       else 
		        error.insertAfter(element);
		   }
		});
		jQuery('form[name=contact_us]').validate({
			
			rules: {
				full_name: {
					required: true
				},
				email: {
					required: true,
					email: true
				},
				message: {
					required: true
				}
			},
			messages: {
				full_name: {
					required: "Please insert your name"
				},
				email: {
					required: "Insert your email address",
					email: "Incorrect email address"
				},
				message: {
					required: "Please insert your message"
				}
			}
		});
		jQuery('form[name=sign_me_up]').validate({
			
			rules: {
				full_name: {
					required: true
				},
				email: {
					required: true,
					email: true
				},
				phone: {
					required: true,
					digits: true,
					minlength: 10
				},
				company: {
					required: true
				},
				company_website: {
					required: true
				},
				message: {
					required: true
				},
				agree: {
					required: true
				}
			},
			messages: {
				full_name: {
					required: "Please insert your name"
				},
				email: {
					required: "Insert your email address",
					email: "Incorrect email address"
				},
				phone: {
					required: "Please insert your phone number",
					digits: "Only digits",
                    minlength: "Min length 10 numbers"
				},
				company: {
					required: "Please insert your company"
				},
				company_website: {
					required: "Please insert your company website"
				},
				message: {
					required: "Please insert your message"
				},
				agree: {
					required: "You must be agree width Terms of Use"
				}
			},
			errorPlacement: function(error, element) {
		       if (element.attr("name") == "agree") 
		        error.insertAfter(".css-checkbox-label");
		       else 
		        error.insertAfter(element);
		   }
		});
	} else {
		console.log('Validation plugin is missing from the job!');
	}
});