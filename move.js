var move_top_btn = document.getElementById('move_top_btn');
var move_right_btn = document.getElementById('move_right_btn');
var move_down_btn = document.getElementById('move_down_btn');
var move_left_btn = document.getElementById('move_left_btn');

var scale_big_btn = document.getElementById('scale_big_btn');
var scale_small_btn = document.getElementById('scale_small_btn');

var export_btn = document.getElementById('export_btn');

// 每次点击移动的距离
var DELTA_MOVE_PER_CLICK = 10;
// 每次点击放大的像素
var DELTA_SCALE_PER_CLICK = 10;

// 上移按钮
move_top_btn.addEventListener('click', function () {
	// 图片高度小于等于可视高度，不能向上下移动
	if ( parseFloat(display_img.style.height) <= enable_space_height) {
		return;
	}

	// 图片即将上移到的top值
	var move_to_top = parseFloat(display_img.style.top) - DELTA_MOVE_PER_CLICK;

	// 最大向上移动限制
	var display_height = parseFloat(display_img.style.height);
	if (move_to_top + display_height <= enable_space_height + padding_space_top_bottom) { //减少bug，加上=
		// 图片下边不能在视区下边范围之内
		move_to_top = enable_space_height + padding_space_top_bottom - display_height;
	}

	display_img.style.top = move_to_top + 'px';
});

// 下移按钮
move_down_btn.addEventListener('click', function () {
	// 图片高度小于等于可视高度，不能向上下移动
	if ( parseFloat(display_img.style.height) <= enable_space_height) {
		return;
	}

	// 图片即将下移到的top值
	var move_to_top = parseFloat(display_img.style.top) + DELTA_MOVE_PER_CLICK;

	// 最大向下移动限制
	if (move_to_top >= padding_space_top_bottom) { // 减少bug，加上=
		// 图片上边不能在可视区上边范围之内
		move_to_top = padding_space_top_bottom;
	}

	display_img.style.top = move_to_top + 'px';
});

// 左移按钮
move_left_btn.addEventListener('click', function () {
	// 图片宽度小于等于可视宽度，不能向左右移动
	if ( parseFloat(display_img.style.width) <= enable_space_width) {
		return;
	}

	// 图片即将移动到的left值
	var move_to_left = parseFloat(display_img.style.left) - DELTA_MOVE_PER_CLICK;

	// 最大移动限制
	var display_width = parseFloat(display_img.style.width);
	if ( (move_to_left + display_width) <= (enable_space_width + padding_space_left_right) ) { // 减少bug，加上=
		// 图片右边不能在可视区右边范围之内
		move_to_left = enable_space_width + padding_space_left_right - display_width;
	}

	display_img.style.left = move_to_left + 'px';
});

// 右移按钮
move_right_btn.addEventListener('click', function () {
	// 图片宽度小于等于可视宽度，不能向左右移动
	if ( parseFloat(display_img.style.width) <= enable_space_width) {
		return;
	}

	// 图片即将移动到的left值
	var move_to_left = parseFloat(display_img.style.left) + DELTA_MOVE_PER_CLICK;

	// 最大移动限制
	if (move_to_left >= padding_space_left_right) { // 减少bug，加上=
		// 图片左边不能在可视区左边范围之内
		move_to_left = padding_space_left_right;
	}

	display_img.style.left = move_to_left + 'px';
});

// 放大按钮
scale_big_btn.addEventListener('click', function () {
	if (IMAGE_TYPE == 'w') {
		// 图片如果是胖矮型，则宽度每次加一个固定值，高度会按照比例随宽度变化

		// 图片即将放大到的宽度
		var scale_to_width = parseFloat(display_img.style.width) + DELTA_SCALE_PER_CLICK;
		// 图片即将放大到的高度
		var scale_to_height = (1 / W_H_SCALE) * scale_to_width;

		// 当高度放大到区域总高度，就不能再放大了
		// if (scale_to_height >= ALL_SPACE) {
		if (false) {
			scale_to_height = ALL_SPACE;
			scale_to_width = W_H_SCALE * scale_to_height;

			display_img.style.height = scale_to_height + 'px';
			display_img.style.width = scale_to_width + 'px';

			display_img.style.top = '0px';
			display_img.style.left = (ALL_SPACE - parseFloat(display_img.style.width)) / 2 + 'px';
		} else {
			// 图片宽度的增量
			var delta_width = DELTA_SCALE_PER_CLICK;

			// 图片高度的增量
			var delta_height = scale_to_height - parseFloat(display_img.style.height);

			// 图片即将放大到的尺寸生效
			display_img.style.width = scale_to_width + 'px';
			display_img.style.height = scale_to_height + 'px';

			// 设置宽度放大后的left值
			display_img.style.left = parseFloat(display_img.style.left) - (delta_width / 2) + 'px';

			// 设置宽度放大后的top值
			display_img.style.top = parseFloat(display_img.style.top) - (delta_height / 2) + 'px';
		}
	} else {
		// 图片如果是瘦高型或正方形，则高度每次加一个固定值，宽度会按照比例随高度变化

		// 图片即将放大到的高度
		var scale_to_height = parseFloat(display_img.style.height) + DELTA_SCALE_PER_CLICK;
		// 图片即将放大到的宽度
		var scale_to_width = W_H_SCALE * scale_to_height;

		// 当宽度放大到区域总高度，就不能再放大了
		// if (scale_to_width >= ALL_SPACE) {
		if (false) {
			scale_to_width = ALL_SPACE;
			scale_to_height = (1 / W_H_SCALE) * scale_to_width;

			display_img.style.width = scale_to_width + 'px';
			display_img.style.height = scale_to_height + 'px';

			display_img.style.left = '0px';
			display_img.style.top = ( ALL_SPACE - parseFloat(display_img.style.height) ) / 2 + 'px';
		} else {
			// 图片高度的增量
			var delta_height = DELTA_SCALE_PER_CLICK;

			// 图片宽度的增量
			var delta_width = scale_to_width - parseFloat(display_img.style.width);

			// 图片即将放大到的尺寸生效
			display_img.style.height = scale_to_height + 'px';
			display_img.style.width = scale_to_width + 'px';
			
			// 设置宽度放大后的left值
			display_img.style.left = parseFloat(display_img.style.left) - (delta_width / 2) + 'px';

			// 设置宽度放大后的top值
			display_img.style.top = parseFloat(display_img.style.top) - (delta_height / 2) + 'px';
		}
	}
});

// 缩小按钮
scale_small_btn.addEventListener('click', function () {
	if (IMAGE_TYPE == 'w') {
		// 图片如果是胖矮型，则宽度每次加一个固定值，高度会按照比例随宽度变化

		// 图片即将缩小到的宽度
		var scale_to_width = parseFloat(display_img.style.width) - DELTA_SCALE_PER_CLICK;
		// 图片即将缩小到的高度
		var scale_to_height = (1 / W_H_SCALE) * scale_to_width;

		// 当宽度缩小到区域总宽度，就不能再缩小了
		if ( scale_to_width <= (ALL_SPACE - (padding_space_left_right * 2)) ) {
			scale_to_width = ALL_SPACE - (padding_space_left_right * 2);
			scale_to_height = (1 / W_H_SCALE) * scale_to_width;

			display_img.style.width = scale_to_width + 'px';
			display_img.style.height = scale_to_height + 'px';

			display_img.style.left = padding_space_left_right + 'px';
			display_img.style.top = ( ALL_SPACE - parseFloat(display_img.style.height) ) / 2 + 'px';
		} else {
			// 图片宽度的增量
			var delta_width = DELTA_SCALE_PER_CLICK;

			// 图片高度的增量
			var delta_height = parseFloat(display_img.style.height) - scale_to_height;

			// 图片即将缩小到的尺寸生效
			display_img.style.width = scale_to_width + 'px';
			display_img.style.height = scale_to_height + 'px';

			// 设置宽度缩小后的left值
			display_img.style.left = parseFloat(display_img.style.left) + (delta_width / 2) + 'px';

			// 设置宽度缩小后的top值
			display_img.style.top = parseFloat(display_img.style.top) + (delta_height / 2) + 'px';	
		}
	} else {
		// 图片如果是瘦高型或正方形，则高度每次加一个固定值，宽度会按照比例随高度变化

		// 图片即将缩小到的高度
		var scale_to_height = parseFloat(display_img.style.height) - DELTA_SCALE_PER_CLICK;
		// 图片即将缩小到的宽度
		var scale_to_width = W_H_SCALE * scale_to_height;

		// 当高度缩小到区域总高度，就不能再缩小了
		if ( scale_to_height <= (ALL_SPACE - (padding_space_top_bottom * 2)) ) {
			scale_to_height = ALL_SPACE - (padding_space_top_bottom * 2);
			scale_to_width = W_H_SCALE * scale_to_height;

			display_img.style.width = scale_to_width + 'px';
			display_img.style.height = scale_to_height + 'px';

			display_img.style.top = padding_space_top_bottom + 'px';
			display_img.style.left = ( ALL_SPACE - parseFloat(display_img.style.width) ) / 2 + 'px';
		} else {
			// 图片高度的增量
			var delta_height = DELTA_SCALE_PER_CLICK;

			// 图片宽度的增量
			var delta_width = parseFloat(display_img.style.width) - scale_to_width;

			// 图片即将缩小到的尺寸生效
			display_img.style.height = scale_to_height + 'px';
			display_img.style.width = scale_to_width + 'px';
			
			// 设置宽度缩小后的left值
			display_img.style.left = parseFloat(display_img.style.left) + (delta_width / 2) + 'px';

			// 设置宽度缩小后的top值
			display_img.style.top = parseFloat(display_img.style.top) + (delta_height / 2) + 'px';
		}
	}
});

var cut_big_top_bottom_btn = document.getElementById('cut_big_top_bottom_btn');
cut_big_top_bottom_btn.addEventListener('click', function () {
	padding_space_top_bottom = padding_space_top_bottom - 10;

	crop_area.style.boxShadow =	'0px ' + padding_space_top_bottom + 'px 0px 0px rgb(255,255,255) inset,' + 	// top
							'0px -' + padding_space_top_bottom + 'px 0px 0px rgb(255,255,255) inset,' + // bottom
							padding_space_left_right + 'px 0px 0px 0px rgb(255,255,255) inset,' +  		// left
							'-' + padding_space_left_right + 'px 0px 0px 0px rgb(255,255,255) inset'; 	// right

	// 设置有效编辑区域的宽度/高度
	// enable_space_width = ALL_SPACE - (padding_space_left_right * 2);
	enable_space_height = ALL_SPACE - (padding_space_top_bottom * 2);
});

var cut_big_top_bottom_btn = document.getElementById('cut_small_top_bottom_btn');
cut_small_top_bottom_btn.addEventListener('click', function () {
	padding_space_top_bottom = padding_space_top_bottom + 10;

	crop_area.style.boxShadow =	'0px ' + padding_space_top_bottom + 'px 0px 0px rgb(255,255,255) inset,' + 	// top
							'0px -' + padding_space_top_bottom + 'px 0px 0px rgb(255,255,255) inset,' + // bottom
							padding_space_left_right + 'px 0px 0px 0px rgb(255,255,255) inset,' +  		// left
							'-' + padding_space_left_right + 'px 0px 0px 0px rgb(255,255,255) inset'; 	// right

	// 设置有效编辑区域的宽度/高度
	// enable_space_width = ALL_SPACE - (padding_space_left_right * 2);
	enable_space_height = ALL_SPACE - (padding_space_top_bottom * 2);
});

var cut_big_left_right_btn = document.getElementById('cut_big_left_right_btn');
cut_big_left_right_btn.addEventListener('click', function () {
	padding_space_left_right = padding_space_left_right - 10;

	crop_area.style.boxShadow =	'0px ' + padding_space_top_bottom + 'px 0px 0px rgb(255,255,255) inset,' + 	// top
							'0px -' + padding_space_top_bottom + 'px 0px 0px rgb(255,255,255) inset,' + // bottom
							padding_space_left_right + 'px 0px 0px 0px rgb(255,255,255) inset,' +  		// left
							'-' + padding_space_left_right + 'px 0px 0px 0px rgb(255,255,255) inset'; 	// right

	// 设置有效编辑区域的宽度/高度
	enable_space_width = ALL_SPACE - (padding_space_left_right * 2);
	// enable_space_height = ALL_SPACE - (padding_space_top_bottom * 2);
});

var cut_small_left_right_btn = document.getElementById('cut_small_left_right_btn');
cut_small_left_right_btn.addEventListener('click', function () {
	padding_space_left_right = padding_space_left_right + 10;

	crop_area.style.boxShadow =	'0px ' + padding_space_top_bottom + 'px 0px 0px rgb(255,255,255) inset,' + 	// top
							'0px -' + padding_space_top_bottom + 'px 0px 0px rgb(255,255,255) inset,' + // bottom
							padding_space_left_right + 'px 0px 0px 0px rgb(255,255,255) inset,' +  		// left
							'-' + padding_space_left_right + 'px 0px 0px 0px rgb(255,255,255) inset'; 	// right

	// 设置有效编辑区域的宽度/高度
	enable_space_width = ALL_SPACE - (padding_space_left_right * 2);
	// enable_space_height = ALL_SPACE - (padding_space_top_bottom * 2);
});

export_btn.addEventListener('click', function () {
	// 获得原图与现在图的比例
	var scale_origin_current = 1;
	if (IMAGE_TYPE == 'w') {
		scale_origin_current = imageData.origin_image.origin_image_width / parseFloat(display_img.style.width);
	} else {
		scale_origin_current = imageData.origin_image.origin_image_height / parseFloat(display_img.style.height);
	}

	// 相对于现在的图，获得剪切范围
	// 剪切开始x y坐标
	var current_crop_startX = padding_space_left_right - parseFloat(display_img.style.left);
	var current_crop_startY = padding_space_top_bottom - parseFloat(display_img.style.top);

	// 剪切的尺寸
	var currnet_crop_width = enable_space_width;
	var currnet_crop_height = enable_space_height;

	// 影射到原图片的尺寸
	var origin_crop_startX = current_crop_startX * scale_origin_current;
	var origin_crop_startY = current_crop_startY * scale_origin_current;
	var origin_crop_width = currnet_crop_width * scale_origin_current;
	var origin_crop_height = currnet_crop_height * scale_origin_current;

	console.info(origin_crop_startX);
	console.info(origin_crop_startY);
	console.info(origin_crop_width);
	console.info(origin_crop_height);
});