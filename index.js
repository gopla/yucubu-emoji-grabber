const puppeteer = require('puppeteer-core')
const fs = require('fs')
const Path = require('path')
const { default: axios } = require('axios')

let arrLink = [
	'https://yt3.ggpht.com/nmeL1swUK46i2A_vi8QMhAEkVOdq7BfGqsIXG1i-m_JbkwUt9uT-AHU79QxISJkQY6fy8Js6fg=w1024-h1024-c-k-nd',
	'https://yt3.ggpht.com/4qW243lSrh3UaJNkSt4ozehwyr1zHza5Te_kK6e7putL5Rv-NwU2Z4ohJDxsW8j1C57r8wkr99s=w1024-h1024-c-k-nd',
	'https://yt3.ggpht.com/R4sszb4v2G6krSqq5g3HWe2WPjF7lOexKRJLSxF_6U_eQXPOaveV2yaob1a46GBL78Gg2NOxhbo=w1024-h1024-c-k-nd',
	'https://yt3.ggpht.com/qDjZlLowUEXHX0RKWlQhOD2sKQBWBc1Cmr5-DaTmGJZ6GUvzVq78q5UL0OZrRdeckIt00vPqxg=w1024-h1024-c-k-nd',
	'https://yt3.ggpht.com/1J2iq-5BnMZIXJ324iVt0zkJSv0YR85YGIBqzwOBUzsjTOHkqoTQJX090AmJnedEwtV3TkTOnA=w1024-h1024-c-k-nd',
	'https://yt3.ggpht.com/k1QdANiS9nDf3heY2AT-8y-tBuPsUOooojPlqHvoSsVTVs2LK5Xbhs7Jj3qV6zBCTmGxHufKNw=w1024-h1024-c-k-nd',
	'https://yt3.ggpht.com/mrOc_mqYYCea0AkO67LtNIO8JoneSEbahw0vAGxLYn7DZbDlcVw7rn71sEeSXjfYlfXz_5bb=w1024-h1024-c-k-nd',
	'https://yt3.ggpht.com/Dgh7NGTxGTVeqSkwG4aMVAHd4jyrwhyg-XGRZ8HCTdTfxfW8M907v6Qz68NktlSZwzyEeUBvEPI=w1024-h1024-c-k-nd',
	'https://yt3.ggpht.com/SgR_w5PVHUivd_jmhYR5GE6R4gitm8nULdev3KDUQ0MJNN9nr_w5V4liNxUGz4__VRtaz_Ul=w1024-h1024-c-k-nd',
	'https://yt3.ggpht.com/sx9-V3_07eVniX8PawQJ-SAVV5UVRgSSPuE2y4a-PykTAAi2UgdEs5SrsZCgtOmESF06Oe5o=w1024-h1024-c-k-nd',
	'https://yt3.ggpht.com/j6ohOQHiMpLpNCK4tXvQ3y7JVkp_dssVQRIfxOtPuJFuqZijcirlptxUyNTuYaWSyIK3nKqC=w1024-h1024-c-k-nd',
	'https://yt3.ggpht.com/9TnCLVw2V6kLtIA0mVFTdW3SJcNGUJ8Q2JGBS3JRn5s061SxMSHWYM15qxXsXNElc6QBrycpyA=w1024-h1024-c-k-nd',
	'https://yt3.ggpht.com/wSf-56OETO_iiz1eH0txezm5OnjwLD8nfiLdjELX94sFJSXoEGC6wYIA0Vqp_TALXCR4Rhbtsg=w1024-h1024-c-k-nd',
	'https://yt3.ggpht.com/Stfimy9QHQPqeZHMcCaGeYuH8RkErWpZ6q6ttkQk-hHixDvAM547eP_pXP8S-6i15XBuYvXXFQ=w1024-h1024-c-k-nd',
	'https://yt3.ggpht.com/PQePzspnPyIv2mcF0CU-It3TB91z7pNM0JZTrWzQnD-kO8saGxtE6v5uKIUI8uwrg11XgYX0CL8=w1024-h1024-c-k-nd',
	'https://yt3.ggpht.com/1V0S7NpxfhLju28BAlUwK4KCYYT3JppXWz19fbXYuPdSoUxzkWIxWcOLZaXFl6ZhVbsUE_GX5Q=w1024-h1024-c-k-nd',
	'https://yt3.ggpht.com/iJMt02uDL_lnJl9N183H8zc7T_RPRZCY7Q3Bb-WmROZ3bpVO-zoqDPkQrxNP0itXWG2CnOD8-Q=w1024-h1024-c-k-nd',
	'https://yt3.ggpht.com/DpNxoP9CbfQT5O6aIS5abgdYmwInFas9_qZ2SmFswzgNQBAeQUDEfzrScCHWOsi8_b40iOMNGQ=w1024-h1024-c-k-nd',
	'https://yt3.ggpht.com/JoXPC4oHKp9ByCbtfSgbqbXJBFszCtRouBRRDQ7pooNiSjvDDJ7iBLZSk73gNRq3YJt-O5r-Jw=w1024-h1024-c-k-nd',
	'https://yt3.ggpht.com/Ib1WqWv46NQTalkZ3lJqZAmpIRD-5G4xH7yB8gXgFvDmZ4YI6fuy584GdBHi60oeJ7d7ZK5L=w1024-h1024-c-k-nd',
	'https://yt3.ggpht.com/DYqTA-nzv8AeNgB6eNDpXDJSg8GLEpB3bVZ-yZkhz34XL4_r8X8nBVInBNAOJnTiI-VFiXcW=w1024-h1024-c-k-nd',
	'https://yt3.ggpht.com/zFUNCjFNTqpRcOHT9ejuZ9ghWTJb9pZjcrcYXm_gR7i69y0NHYBBUsbbec_RMka1-I6FH2788w=w1024-h1024-c-k-nd',
]

async function downloadImage(url, fileName) {
	const path = Path.resolve(__dirname, 'images', `${fileName}.png`)
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

let n = 1
arrLink.map((e) => {
	downloadImage(e, n++)
})
