import mongoose, { Model } from "mongoose";
import { BookService } from "./book.service";
import { Book, Category } from "./schemas/book.schema";
import { Test, TestingModule } from "@nestjs/testing";
import { getModelToken } from "@nestjs/mongoose";
import { BadRequestException, NotFoundException } from "@nestjs/common";
import { createBookDto } from "./dto/create-book-dto";
import { User } from "../auth/schema/user.schema";



describe('BookService', () => {
    let bookService: BookService;
    let model: Model<Book>;

    const mockBook = {
        _id: "64b0eb94c4ccb4e31b7327e2",
        user: "64aa60be0b0bededd11333c22",
        title: "New Book",
        description: "Book Description",
        author: "Autor",
        price: 1100,
        category: Category.FANTASY,
    };

    const mockUser = {
        _id: "64b0eb94c4ccb4e31b7327e2",
        name: 'Abdul',
        email: 'abdul@gmail.com'
    }

    const mockBookService = {
        find: jest.fn(),
        create: jest.fn(),
        findById: jest.fn()
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                BookService,
                {
                    provide: getModelToken(Book.name),
                    useValue: mockBookService,
                },
            ],
        }).compile();

        bookService = module.get<BookService>(BookService);
        model = module.get<Model<Book>>(getModelToken(Book.name));
    });

    describe('findAll', () => {
        it('should return an array of books', async () => {
            const query = { page: "1", keyword: 'test' }

            jest.spyOn(model, 'find').mockImplementation(() => ({
                limit: () => ({
                    skip: jest.fn().mockResolvedValue([mockBook]),
                }),
            } as any),
            );

            const result = await bookService.findAll(query);

            expect(model.find).toHaveBeenCalledWith({
                title: { $regex: 'test', $options: 'i' },
            });

            expect(result).toEqual([mockBook]);
        });
    });
    

    describe('create', () => {
        it('should create and return a book', async () => {
        const newBook ={
            title: "New Book",
        description: "Book Description",
        author: "Autor",
        price: 1100,
        category: Category.FANTASY
    };

   jest
      .spyOn(model, 'create')
      .mockImplementationOnce(() =>  Promise.resolve({mockBook}));
            
      const result = await bookService.create(
        newBook as createBookDto,
        mockUser as User,
      );

       expect(result).toEqual(mockBook)
        })
    })

   
    describe('findById', () => {
        it('should find and return a book by ID', async () => {
            jest.spyOn(model, 'findById').mockResolvedValue(mockBook);

            const result = await bookService.findById(mockBook._id);

            expect(model.findById).toHaveBeenCalledWith(mockBook._id);
            expect(result).toEqual(mockBook);
        });

        it('should throw badRequestException if invalid ID is provided', async () => {
            const id = 'invalid-id';

            const isValidObjectIDMock = jest
                .spyOn(mongoose, 'isValidObjectId')
                .mockReturnValue(false);

            await expect(bookService.findById(id)).rejects.toThrow(
                BadRequestException
            );

            expect(isValidObjectIDMock).toHaveBeenLastCalledWith(id);
            isValidObjectIDMock.mockRestore()
        });

        it('should throw notFoundException if book not found', async () => {
            jest.spyOn(model, 'findById').mockResolvedValue(null);
            await expect(bookService.findById(mockBook._id)).rejects.toThrow(
                NotFoundException
            );
            expect(model.findById).toHaveBeenCalledWith(mockBook._id);
        });

    });
}); 