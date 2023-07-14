import { Model } from "mongoose";
import { BookService } from "./book.service";
import { Book, Category } from "./schemas/book.schema";
import { Test, TestingModule } from "@nestjs/testing";
import { getModelToken } from "@nestjs/mongoose";
import exp from "constants";


describe('BookService', () => {
    let bookService :  BookService;
    let model : Model<Book>;

    const mockBook = {
    _id: "64b0eb94c4ccb4e31b7327e1",
    user: "64aa60be0b0bededd11333c22",
    title: "New Book",
    description: "Book Description",
    author: "Autor",
    price: 1100,
    category: Category.FANTASY,
    };

    const mockBookService = {
        findById : jest.fn()
    };

    beforeEach(async () => {
        const module :  TestingModule = await Test.createTestingModule({
            providers : [
                BookService,
                {
                    provide : getModelToken(Book.name),
                    useValue : mockBookService,
                },
            ],
        }).compile();

        bookService = module.get<BookService>(BookService);
        model = module.get<Model<Book>>(getModelToken(Book.name));

    });
    describe('findById', () => {
        it('should find and return a book by ID', async () => {
            jest.spyOn(Model, 'findById').mockResolvedValue(mockBook);

            const result = await bookService.findById(mockBook._id);

            expect(model.findById).toHaveBeenCalledWith(mockBook._id);
            expect(result).toEqual(mockBook);
        });
    });
}); 