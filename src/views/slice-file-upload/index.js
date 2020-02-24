import ajax from './ajax';
import md5 from 'js-md5';
export default class SliceFlieUpload {
	constructor(parmas) {
		this.file = parmas.file;
		this.url = parmas.url
		this.unitSize = parmas.unitSize || 1 * 1024 * 1024
		this.fileSize = this.file.size
		this.total = Math.ceil(this.fileSize / this.unitSize);
		this.sendFile()
	}
	getType (file){
		
	}
	async sendFile() {
		let hash = await this.getMd5(this.file)
		const blobSlice = File.prototype.slice || File.prototype.mozSlice || File.prototype.webkitSlice;
		const fileUploads = []
		console.log(this.file,"jjjjj")
		for (let i = 0; i < this.total; i++) {
			const start = i * this.unitSize;
			const end = Math.min(this.fileSize, start + this.unitSize);

			fileUploads.push(ajax({
				url: this.url,
				data: {
					md5: hash,
					type,
					index: i,
					size: this.fileSize,
					total: this.total,
					file: blobSlice.call(this.file, start, end),
				}
			}))
		}
		Promise.all(fileUploads).then(()=>{

		})
	}
	getMd5(file) {
		return new Promise((resolve, reject) => {
			var reader = new FileReader();
			reader.readAsArrayBuffer(file);
			reader.onload = function (event) {
				let obj = event.target.result;
				resolve(md5(obj))
			}
		})
	}
}