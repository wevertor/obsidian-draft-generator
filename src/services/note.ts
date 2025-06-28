import { App, LinkCache, MetadataCache, TFile, TFolder, Vault } from "obsidian";

export class NoteService {

	private app: App;

	constructor(app: App) {
		this.app = app;
	}

	public createNewNote(path: string, content: string): Promise<TFile> {

		return this.app.vault.create(path, content);

	}

	public getNoteFromLink(folder: TFolder, link: LinkCache) {

		return this.app.vault.getFileByPath(`${folder.path}/${link.link}.md`);

	}

	public getAllLinksInNote(note: TFile): LinkCache[] {
		
		const fileCache = this.app.metadataCache.getFileCache(note);

		const links = fileCache?.links;
		if (!links) {
			console.warn("No link found in note.");
			return [];
		}

		return links.filter(this.isNotInternalLink);

	}

	private isNotInternalLink(link: LinkCache) {
		const regex = /^#/;
		return !(regex.test(link.link))
	}

	public getTextFromNote(note: TFile): Promise<string> {

		return this.app.vault.cachedRead(note);
		
	} 

}