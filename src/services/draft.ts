import { App, TFile, Vault } from "obsidian";
import { FolderService } from "./folder";
import { NoteService } from "./note";
import { ShuffleAndPick } from "./utils";

export class DraftService {

	private folderService: FolderService;
	private noteService: NoteService;

	constructor(app: App) {
		this.folderService = new FolderService(app);
		this.noteService = new NoteService(app);
	}

	async generateDraft(path: string): Promise<TFile> {
		// get random permanent note
		const folder = this.folderService.getFolder('Permanent Notes')
		let refNote = this.folderService.getRandomNoteFromFolder(folder);
		let draftContent = '';

		for (let i=0; i<5; i++) {
			// store note content
			draftContent = draftContent.concat(await this.noteService.getTextFromNote(refNote))

			// list its links
			const linksList = this.noteService.getAllLinksInNote(refNote);

			// get a random link
			const link = ShuffleAndPick(linksList);

			// got to that note
			const newNote = this.noteService.getNoteFromLink(folder, link)
			if (!newNote) {
				break;
			}

			refNote = newNote
		}

		return this.noteService.createNewNote(path, draftContent);

		// try {

/* 			const fileName = 'teste1.md'
			const filePath = `/${fileName}`
			const targetFile = await this.app.vault.create(filePath, 'Este é um teste de arquivo')

			const activeLeaf = this.app.workspace.getLeaf()
			activeLeaf.openFile(targetFile, {state: {mode: 'source'}})

		} catch (err) {
			console.warn(err)
		}
 */
	}

}