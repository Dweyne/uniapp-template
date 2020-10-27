let baseUrl = "";
let socketUrl = "";
let uploadUrl = ""
if (process.env.NODE_ENV === 'development') {
	// 开发环境
	baseUrl = "http://192.168.18.186:8204";
	// baseUrl = "https://learning.youngbai.com";
	socketUrl = "ws://localhost:8001/";
	uploadUrl = "https://learning.youngbai.com/load/uploadToCos"
} else if (process.env.NODE_ENV === 'production') {
	// 生产环境
	// baseUrl = "https://learning.youngbai.com";
	baseUrl = "http://31094ld435.wicp.vip/";
	socketUrl = "ws://localhost:8001/";
	uploadUrl = "https://upload.learning.youngbai.com"
}
const courtConfig = {
	//微信小程序appid=
	//微信公众号APPID
	publicAppId: "wx9e8e09ffd051154a",
	//请求接口
	baseUrl: baseUrl,
	//webSocket地址
	socketUrl: socketUrl,
	//平台名称
	platformName: "uniApp-案例",
	//项目logo
	logoUrl: "https://qn.kemean.cn/upload/201906/19/3f3b4751f3ed4a97be804450c3ec4c79",
	//页面分享配置
	share: {
		title: 'uniApp-案例',
		// #ifdef MP-WEIXIN
		path: '/pages/index/index', //小程序分享路径
		// #endif
		// #ifdef H5 || APP-PLUS
		//公众号||APP分享
		desc: "uniApp-案例", // 分享描述
		link: "https://www.kemean.com/sameCity/18031201/index.html", // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
		imgUrl: "http://qn.kemean.cn/upload/201901/28/23bedfc34597482292ecd6dc107f6342", // 分享图标
		// #endif
	}
};
//手机号验证正则表达式
const phoneRegular = /^1\d{10}$/;
//邮箱验证正则表达式
const mailRegular = /^\w+@\w+(\.[a-zA-Z]{2,3}){1,2}$/;
//密码验证正则表达式
const passwordRegular = /^[a-zA-Z0-9]{4,10}$/;
export default Object.assign({
	phoneRegular,
	mailRegular,
	passwordRegular
}, courtConfig);
