// 刚载入

// 图片原始url
var IMG_URL = imageData.origin_image.origin_img_url;

// 原始图片宽高比例
var W_H_SCALE = imageData.origin_image.origin_image_width / imageData.origin_image.origin_image_height;

// 根据原始图片宽高比例，计算出图片类型:  h 瘦高型或正方形，w胖矮型
var IMAGE_TYPE = W_H_SCALE > 1 ? 'w' : 'h';

// 总宽度/高度
var ALL_SPACE = 400;

// 阴影余白宽度和高度，默认左右上下都有30的阴影余白
var padding_space_left_right = 0;
var padding_space_top_bottom = 0;

// 默认图片实际显示的宽高
var display_width = 0;
var display_height = 0;

// 默认图片实际显示位置
var display_left = 0;
var display_top = 0;

// 计算阴影余白，图片显示大小，位置
if (IMAGE_TYPE = 'w') {
	// 如果是胖矮型图片

	// 左右余白阴影为30
	padding_space_left_right = 30;

	// 计算图片实际显示的宽 = 总宽度 - 阴影余白（左右2个）
	display_width = ALL_SPACE - (padding_space_left_right * 2);

	// 计算图片实际显示的高 = 1/原始图片宽高比例 * 图片实际显示的宽
	display_height = (1 / W_H_SCALE) * display_width;

	// 上下余白阴影 = (总高度 - 图片实际显示的高) / 2
	padding_space_top_bottom = (ALL_SPACE - display_height) / 2;

	// 计算图片实际显示位置
	display_left =  padding_space_left_right;
	display_top = (ALL_SPACE - display_height) / 2;
} else {
	// 如果是瘦高型或正方形图片

	//上下余白阴影为30
	padding_space_top_bottom = 30;

	// 计算图片实际显示的高 = 总高度 - 阴影余白（上下2个）
	display_height = ALL_SPACE - (padding_space_top_bottom * 2);

	// 计算图片实际显示的宽 = 原始图片宽高比例 * 图片实际显示的高
	display_width = W_H_SCALE * display_height;

	// 左右余白阴影 = (总宽度 - 图片实际显示的宽) / 2
	padding_space_left_right = (ALL_SPACE - display_width) / 2;

	// 计算图片实际显示位置
	display_top = padding_space_top_bottom;
	display_left =  (ALL_SPACE - display_width) / 2;
}

// 设置有效编辑区域的宽度/高度
var enable_space_width = ALL_SPACE - (padding_space_left_right * 2);
var enable_space_height = ALL_SPACE - (padding_space_top_bottom * 2);

// 如果有改动
if (imageData.changeFlag) {
	display_width = imageData.origin_image.origin_image_width / imageData.scale_origin_current;
	display_height = imageData.origin_image.origin_image_height / imageData.scale_origin_current;

	enable_space_width = imageData.image_width / imageData.scale_origin_current;
	enable_space_height = imageData.image_height / imageData.scale_origin_current;

	padding_space_left_right = (ALL_SPACE - enable_space_width) / 2;
	padding_space_top_bottom = (ALL_SPACE - enable_space_height) / 2;

    var crop_startX = imageData.crop_origin_startX / imageData.scale_origin_current;
    var crop_startY = imageData.crop_origin_startY / imageData.scale_origin_current;

	display_left = 0 - (crop_startX - padding_space_left_right);
	display_top = 0 - (crop_startY - padding_space_top_bottom);
}

// 余白阴影div
var crop_area = document.getElementById('crop_area');

// 设置剪裁区域阴影
crop_area.style.boxShadow =	'0px ' + padding_space_top_bottom + 'px 0px 0px rgb(255,255,255) inset,' + 	// top
							'0px -' + padding_space_top_bottom + 'px 0px 0px rgb(255,255,255) inset,' + // bottom
							padding_space_left_right + 'px 0px 0px 0px rgb(255,255,255) inset,' +  		// left
							'-' + padding_space_left_right + 'px 0px 0px 0px rgb(255,255,255) inset'; 	// right



var display_img = document.getElementById('display_img');
display_img.src = IMG_URL;

display_img.style.width = display_width + 'px';
display_img.style.height = display_height + 'px';

display_img.style.top = display_top + 'px';
display_img.style.left = display_left + 'px';