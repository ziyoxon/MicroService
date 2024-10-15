import { Body, Controller, Delete, Get, Inject, Param, Patch, Post } from '@nestjs/common';
import { ClientProxy, MessagePattern, Payload } from '@nestjs/microservices';
import { BookService } from './book.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';

@Controller()
export class BookController {
  constructor(
    private readonly bookService: BookService,
    @Inject("BOOK_SERVICE") private readonly clientService: ClientProxy
  ) {}

  @Post()
  async create(@Body() createBookDto: CreateBookDto) {
    const book = await this.bookService.create(createBookDto);
    this.clientService.emit("book_created", book);
    return book;
  }

  @Get()
  findAll() {
    this.clientService
      .emit("hello", "Hello from another server")
      .subscribe((data) => {
        console.log(data);
      });
    this.clientService
      .send("salom", "Salom from another server")
      .subscribe((data) => {
        console.log(data);
      });
    return this.bookService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.bookService.findOne(+id);
  }

  @Patch(":id")
  async update(
    @Param("id") id: string,
    @Body() updateBookDto: UpdateBookDto
  ) {
    await this.bookService.update(+id, updateBookDto);
    const book = await this.bookService.findOne(+id);
    this.clientService.emit("book_updated", book);
    console.log(book);

    return book;
  }

  @Delete(":id")
  async remove(@Param("id") id: string) {
    await this.bookService.remove(+id);
    this.clientService.emit("book_deleted", id);
    console.log(id);

    return id;
  }
}
