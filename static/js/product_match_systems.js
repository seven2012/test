(function () {
		// html elements
		var container = document.getElementById("slider-container-left");
		var slider = document.getElementById("slider-bar-left");
		var handle = document.getElementById("slider-handle-left");

		
		var minVal = Number(120);
		var maxVal = Number(250);
		var range = maxVal - minVal;
		var isSliding = false;


		//recalculate range
		// submitVal.onclick = function() {
			minVal = Number( 120);
			maxVal = Number( 250 );
			range = maxVal - minVal;
		// };

		// the sliding function
		var move = function(e) {

			var moveY = 0;
			var containerTop = 0;
			var newHeight = 0;
			var containerHeight = 0;
			var percentHght = 0;
			var x = 0;
			var y = 0;
			var sliderValue = 0;
			
			if (!e) var e = window.event;

			if( e.pageY ){ // all browsers except IE before version 9
				moveY = e.pageY;
				console.log('e.pageY:moveY'+moveY)

			} else if ( e.clientY ) { // IE before version 9
				moveY = e.clientY;
				console.log('e.clientY:'+moveY)
			}	

			containerTop = container.offsetTop;
			console.log('container.offsetTop===margin-top(30px)')
			console.log(containerTop)
			newHeight = moveY - containerTop;
			containerHeight = container.offsetHeight;
			console.log('containerHeight:'+containerHeight)
			percentHght = newHeight * 100 / containerHeight;//百分比的分子部分

			if( (percentHght <= 100) && (percentHght >= 0) ) {
				slider.style.height = (percentHght) + '%'; //25%
				y = 100 - percentHght; //75
				x = y * range / 100; //75% *(250-120)
				console.log('x:'+x)
				console.log('y:'+y)
			} else if( percentHght < 0 ) {
				percentHght = 0;
				slider.style.height = (percentHght) + '%';
				y = 100 - percentHght;
				x = y * range / 100;

			} else if( percentHght > 100 ) {
				percentHght = 100;
				slider.style.height = (percentHght) + '%';
				y = 100 - percentHght;
				x = y * range / 100;
			}
			sliderValue = Math.round(x);
			console.log('sliderValue:'+sliderValue)
			document.getElementById('sliderValue-left').innerHTML = sliderValue + minVal;
		};

		// adding the slide functionality
		var addSlide = function() {
			isSliding = true;
			if ( !window.addEventListener ){
				document.attachEvent('onmousemove',move);
			} else {
				document.addEventListener('mousemove', move, false);
			}
		};

		// removing the slide functionality
		var cancelSlide = function() {
			if( isSliding ) {
				if ( window.removeEventListener ) {
					document.removeEventListener('mousemove', move, false);
				} else if ( window.detachEvent ) {
					document.detachEvent('onmousemove', move );
				}
			}
		};

		// cancelling event bubbling
		// cancelling default event action
		var cancelBubble = function(e) {
			var evt = e ? e:window.event;

			if( evt.stopPropogation ){
				evt.stopPropogation();
			}

			if( evt.cancelBubble != null ){
				evt.cancelBubble = true;
			}

			if( evt.preventDefault ){
				evt.preventDefault();
			} else {
				evt.returnValue = false;
			}
		};

		// capture events
		//capturing the mousedown on the handle
		handle.onmousedown = function(e) {
			console.log(1)
			addSlide();
			cancelBubble(e);
		}		
		slider.onmouseup = function(e) {
			cancelSlide();
			cancelBubble(e);
		}

		
		slider.onmousedown = function(e) {
			move(e);
			cancelBubble(e);
		}

		
		container.onmouseup = function(e) {
			cancelSlide();
			cancelBubble(e);
		}

		
		container.onmousedown = function(e) {
			move(e);
			cancelBubble(e);
		}

		
		document.onmouseup = function(e) {
			cancelSlide();
			cancelBubble(e);
		}
        slider.onmouseout = slider.onmouseup;

	})();