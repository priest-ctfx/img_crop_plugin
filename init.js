// 余白宽度
var PADDING_SPACE_WIDTH = 30;
// 余白高度
var PADDING_SPACE_HEIGHT = 30;
// 总宽度/高度
var ALL_SPACE = 400;

// 可视区域宽度/高度
var ENABLE_SPACE_WIDTH = ALL_SPACE - (PADDING_SPACE_WIDTH * 2);
var ENABLE_SPACE_HEIGHT = ALL_SPACE - (PADDING_SPACE_HEIGHT * 2);

// 图片宽高比例
var W_H_SCALE = imageData.origin_width / imageData.origin_height;

// 图片类型:  h 瘦高型或正方形，w胖矮型
var IMAGE_TYPE = W_H_SCALE > 1 ? 'w' : 'h';

var display_img = document.getElementById('display_img');
display_img.src = imageData.img_url;

// 计算实际宽高
var display_width = 0;
var display_height = 0;

if (IMAGE_TYPE == 'w') {
	display_width = ENABLE_SPACE_WIDTH;
	display_height = (1 / W_H_SCALE) * display_width;

	var display_left =  PADDING_SPACE_WIDTH;
	var display_top = (400 - display_height) / 2;
} else {
	display_height = ENABLE_SPACE_HEIGHT;
	display_width = W_H_SCALE * display_height;

	var display_top = PADDING_SPACE_HEIGHT;
	var display_left =  (400 - display_width) / 2;
}

display_img.style.width = display_width + 'px';
display_img.style.height = display_height + 'px';

display_img.style.top = display_top + 'px';
display_img.style.left = display_left + 'px';