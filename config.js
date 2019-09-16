// Path
const src = 'src',
	dev = 'dev',
	srcPath = {
		html: `${src}/html/*.html`,
		scss: `${src}/scss/**/*.scss`,
		font: `${src}/font/*`,
		js: `${src}/js/*.js`,
		img: `${src}/img/**/*.{png,jpg,jpeg,gif,svg}`,
		include: `${src}/inc/`
	},
	devPath = {
		html: `${dev}/html`,
		css: `${dev}/css/`,
		font: `${dev}/font/`,
		js: `${dev}/js/`,
		img: `${dev}/img/`
	};

module.exports = {
	src,
	dev,
	srcPath,
	devPath
}