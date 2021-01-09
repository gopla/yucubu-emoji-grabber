const fs = require('fs')
const Path = require('path')
const { default: axios } = require('axios')
const srcDir = './link/'

async function downloadImage(url, dir, fileName) {
	const path = Path.resolve(dir, `${fileName}.png`)
	if (!fs.existsSync(path)) {
		const writer = fs.createWriteStream(path)

		const response = await axios({
			url,
			method: 'GET',
			responseType: 'stream',
		})

		response.data.pipe(writer)

		return new Promise((resolve, reject) => {
			writer.on('finish', resolve)
			writer.on('error', reject)
		})
	}
}

if (!fs.existsSync(srcDir)) {
	console.log("Folder Not Found")
} else {
	fs.readdirSync(srcDir).map(file => {
		const dirName = file.replace(".txt", "")
		const dir = `./images/${dirName}`
		if (!fs.existsSync(dir)) {
			fs.mkdirSync(dir)
		}
		const data = fs.readFileSync(srcDir.concat(file)).toString().replace(/\r\n/g, "\n").split("\n")
		let n = 1
		data.map((e) => {
			downloadImage(e, dir, n++)
		})
	})
}