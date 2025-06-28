import { App, LinkCache, TFile, Vault } from "obsidian";
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
		const visitedNotes: string[] = [];

		for (let i=0; i<5; i++) {
			// store note content
			draftContent = draftContent
			.concat('\n')
			.concat(await this.noteService.getTextFromNote(refNote))

			// store visited note
			visitedNotes.push(refNote.basename)
			//console.log(`i = ${i}\n-----------------------`)
			//console.log(`visited notes: ${visitedNotes}`)

			// list its links
			const linksList = this.noteService.getAllLinksInNote(refNote);

			// get a random link
			const link = this.getUnrepeatedRandomLink(linksList, visitedNotes)
			//console.log(`link chosen: ${link.link}`)

			// got to that note
			const newNote = this.noteService.getNoteFromLink(folder, link)
			if (!newNote) {
				//console.log(`tentei acessar: ${folder.path}/${link.link}`)
				break;
			}

			refNote = newNote
		}

		return this.noteService.createNewNote(path, draftContent);

	}

	private getUnrepeatedRandomLink(linksList: LinkCache[], visitedNotes: string[]): LinkCache {
		
		let link = ShuffleAndPick(linksList);
		while (visitedNotes.find(visitedNote => visitedNote === link.link)) {
			link = ShuffleAndPick(linksList);
		}

		return link;
	
	}

}