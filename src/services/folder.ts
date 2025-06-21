import { App, TFile, TFolder, Vault } from "obsidian";
import { ShuffleAndPick } from "./utils";

export class FolderService {

	private app: App;

	constructor(app: App) {
		this.app = app
	}

	public getRandomNoteFromFolder(folder: TFolder): TFile {

		const filesInFolder = this.app.vault.getFiles().filter(file => file.parent === folder);

		const randomFile = ShuffleAndPick(filesInFolder);
		if (!randomFile) {
			throw new Error('Error: Empty folder.');
		}

		return randomFile;

	}
	
	public getFolder(folderName: string): TFolder {
		
		const folder = this.app.vault.getFolderByPath(folderName);
		if (!folder) {
			throw new Error('Error: Folder not found.');
		}

		return folder;

	}

}