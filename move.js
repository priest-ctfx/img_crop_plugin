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
	if ( parseFloat(display_img.style.height) <= ENABLE_SPACE_HEIGHT) {
		return;
	}

	// 图片即将上移到的top值
	var move_to_top = parseFloat(display_img.style.top) - DELTA_MOVE_PER_CLICK;

	// 最大向上移动限制
	var display_height = parseFloat(display_img.style.height);
	if (move_to_top + display_height <= ENABLE_SPACE_HEIGHT + PADDING_SPACE_HEIGHT) { //减少bug，加上=
		// 图片下边不能在视区下边范围之内
		move_to_top = ENABLE_SPACE_HEIGHT + PADDING_SPACE_HEIGHT - display_height;
	}

	display_img.style.top = move_to_top + 'px';
});

// 下移按钮
move_down_btn.addEventListener('click', function () {
	// 图片高度小于等于可视高度，不能向上下移动
	if ( parseFloat(display_img.style.height) <= ENABLE_SPACE_HEIGHT) {
		return;
	}

	// 图片即将下移到的top值
	var move_to_top = parseFloat(display_img.style.top) + DELTA_MOVE_PER_CLICK;

	// 最大向下移动限制
	if (move_to_top >= PADDING_SPACE_HEIGHT) { // 减少bug，加上=
		// 图片上边不能在可视区上边范围之内
		move_to_top = PADDING_SPACE_HEIGHT;
	}

	display_img.style.top = move_to_top + 'px';
});

// 左移按钮
move_left_btn.addEventListener('click', function () {
	// 图片宽度小于等于可视宽度，不能向左右移动
	if ( parseFloat(display_img.style.width) <= ENABLE_SPACE_WIDTH) {
		return;
	}

	// 图片即将移动到的left值
	var move_to_left = parseFloat(display_img.style.left) - DELTA_MOVE_PER_CLICK;

	// 最大移动限制
	var display_width = parseFloat(display_img.style.width);
	if ( (move_to_left + display_width) <= (ENABLE_SPACE_WIDTH + PADDING_SPACE_WIDTH) ) { // 减少bug，加上=
		// 图片右边不能在可视区右边范围之内
		move_to_left = ENABLE_SPACE_WIDTH + PADDING_SPACE_WIDTH - display_width;
	}

	display_img.style.left = move_to_left + 'px';
});

// 右移按钮
move_right_btn.addEventListener('click', function () {
	// 图片宽度小于等于可视宽度，不能向左右移动
	if ( parseFloat(display_img.style.width) <= ENABLE_SPACE_WIDTH) {
		return;
	}

	// 图片即将移动到的left值
	var move_to_left = parseFloat(display_img.style.left) + DELTA_MOVE_PER_CLICK;

	// 最大移动限制
	if (move_to_left >= PADDING_SPACE_WIDTH) { // 减少bug，加上=
		// 图片左边不能在可视区左边范围之内
		move_to_left = PADDING_SPACE_WIDTH;
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
	} else {
		// 图片如果是瘦高型或正方形，则高度每次加一个固定值，宽度会按照比例随高度变化

		// 图片即将放大到的高度
		var scale_to_height = parseFloat(display_img.style.height) + DELTA_SCALE_PER_CLICK;
		// 图片即将放大到的宽度
		var scale_to_width = W_H_SCALE * scale_to_height;

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
});

// 缩小按钮
scale_small_btn.addEventListener('click', function () {
	if (IMAGE_TYPE == 'w') {
		// 图片如果是胖矮型，则宽度每次加一个固定值，高度会按照比例随宽度变化

		// 图片即将缩小到的宽度
		var scale_to_width = parseFloat(display_img.style.width) - DELTA_SCALE_PER_CLICK;
		// 图片即将缩小到的高度
		var scale_to_height = (1 / W_H_SCALE) * scale_to_width;

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
	} else {
		// 图片如果是瘦高型或正方形，则高度每次加一个固定值，宽度会按照比例随高度变化

		// 图片即将缩小到的高度
		var scale_to_height = parseFloat(display_img.style.height) - DELTA_SCALE_PER_CLICK;
		// 图片即将缩小到的宽度
		var scale_to_width = W_H_SCALE * scale_to_height;

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
});