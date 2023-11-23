import { Editor, MarkdownView, Plugin, moment } from 'obsidian';

interface UpdateTimeCommandSettings {
	mySetting: string;
}

export default class UpdateTimeCommandPlugin extends Plugin {
	settings: UpdateTimeCommandSettings;

	async onload() {
		this.addCommand({
			id: 'update-time',
			name: 'Update Time',
			editorCallback: (editor: Editor, view: MarkdownView) => {
				if(view.file==null) {
					console.log("未获取到file对象");
					return;
				}
				// 获取到文件
				// 判断是否有创建时间，没有的话新增，有的话不处理
				// 判断是否有修改时间，没有的话新增，有的话更新成当前时间
				this.app.fileManager.processFrontMatter(view.file, (frontmatter)=>{
					console.log("current metadata: ", frontmatter)

					if(!frontmatter["created"]) {
						frontmatter["created"] = moment().format('YYYY-MM-DDTHH:mm')
					}
					
					frontmatter["updated"] = moment().format('YYYY-MM-DDTHH:mm')
					return
				});
			},
		});
	}

	onunload() {
		console.log("bye~")
	}
}
