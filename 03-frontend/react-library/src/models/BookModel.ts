class BookModel {
    /*
        In TypeScript, appending a question mark after a variable name indicates that the variable is optional.

        This means that the variable can either have a value of its declared type, or it can have a value of undefined or null.
    */
    id: number;
    title: string;
    author?: string;
    description?: string;
    copies?: number;
    copiesAvailable?: number;
    category?: string;
    img?: string;

    constructor (id: number, title: string, author: string, description: string, 
        copies: number, copiesAvailable: number, category: string, img: string) {
            this.id = id;
            this.title = title;
            this.author = author;
            this.description = description;
            this.copies = copies;
            this.copiesAvailable = copiesAvailable;
            this.category = category;
            this.img = img;
    }
}

export default BookModel;