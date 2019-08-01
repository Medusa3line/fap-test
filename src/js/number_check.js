// JQuery Code

	$(document).ready(function(){

		// Max Length for fields 

		
			$('#acct_number, #customerpin, #bvn, #last_nine_digits, #phone').keydown(function(){
				var field_length = $(this).val().length;
				var max_length = $(this).attr('maxlength');
		
				if(field_length == max_length){
					$(this).attr('type', 'text').attr('maxlength', max_length);
				}
			});
		
			$('#agentpin').keyup(function(){
				var field_length = $(this).val().length;
				var max_length = $(this).attr('maxlength');	
				$(this).attr('type', 'number').attr('type', 'password');
				
				if(field_length == max_length){
					$(this).attr('type', 'password');
				}
			});
		
		//Show and Hide Passwords and Pins
		
				$('#eye').click(function(){
					type = $('#agentpin').attr('type');
		
					if (type == 'password'){
						$('#agentpin').attr('type', 'text');
					} else {
						$('#agentpin').attr('type', 'password');
					}
				});
		
		// Animations for all the pages 
		
				$('#main').addClass('animated fadeIn delay-2s').css('animation-duration', '1s');
				$('#bottom_div').addClass('animated bounceInUp delay-2s').css('animation-duration', '2s');
		
		//Thrift Page Manipulations
		
				$('.inner-item-1').css('background-color', '#E6061C').css('color', 'white');
				$('.inner-item-1 #icon-style').css('background-color', '#E6061C').css('border', '1px solid white');
				$('.inner-item-1 #icon').css('color', 'white');
		
				$('.inner-item-1, .inner-item-2, .inner-item-3, .inner-item-4').mouseover(function(){
					$('.inner-item-1, .inner-item-2, .inner-item-3, .inner-item-4').css('background-color', '').css('color', '');
					$('.inner-item-1 #icon-style').css('background-color', '').css('border', '');
					$('.inner-item-1 #icon').css('color', '');
					
					$(this).css('background-color', '#E6061C').css('color', 'white');
				}).mouseout(function(){
					$('.inner-item-1, .inner-item-2, .inner-item-3, .inner-item-4').css('background-color', '').css('color', '');
					$('.inner-item-1 #icon-style').css('background-color', '').css('border', '');
					$('.inner-item-1 #icon').css('color', '');
				});


				//Bill-Payment.js

		$('#airtime').css('display', '');
	
		$('#bill-list>li>a').click(function(){
			$('#airtime_menu, #utility_menu').css('display', 'none');
			$('#bill-list>li>a').removeClass('bill-icon');
			$(this).addClass('bill-icon');
			billtype = $(this).attr('href');
			$('#airtime, #internet, #utility, #cable, #flight').css('display', 'none');
			$(billtype).css('display', '');
		});
	
		$('#bill-list-menu>ul>div>ul.dropdown>li').click(function(){
			Gbenga = $(this).text();
			$('#airtime_menu, #utility_menu').css('display', '');
			$('#airtime_menu>ul>form>li>h3, #utility_menu>ul>form>li>h3').text(Gbenga);
		});
			});