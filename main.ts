import { App, Editor, MarkdownView, Modal, Notice, Plugin, PluginSettingTab, Setting } from 'obsidian';
import { DraftService } from 'src/services/draft';
import { FolderService } from 'src/services/folder';
import { NoteService } from 'src/services/note';

export default class DraftGeneratorPlugin extends Plugin {

	draftService: DraftService;

	async onload() {

		this.draftService = new DraftService(this.app);

		this.addRibbonIcon('dice', 'Create text from notes', (evt: MouseEvent) => {
			new Notice('Generating a new draft...');
			this.showDraft();
		})
	}

	async showDraft() {

		const draftFile = await this.draftService.generateDraft('teste1.md');
		const activeLeaf = this.app.workspace.getLeaf();
		activeLeaf.openFile(draftFile, {state: {mode: 'source'}});

	}

	onunload() {

	}
}
