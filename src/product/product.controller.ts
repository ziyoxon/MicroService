import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Inject,
  NotFoundException,
} from "@nestjs/common";
import { ProductService } from "./product.service";
import { CreateProductDto } from "./dto/create-product.dto";
import { UpdateProductDto } from "./dto/update-product.dto";
import { ClientProxy } from "@nestjs/microservices";

@Controller("product")
export class ProductController {
  constructor(
    private readonly productService: ProductService,
    @Inject("PRODUCT_SERVICE") private readonly clientService: ClientProxy
  ) {}

  @Post()
  async create(@Body() createProductDto: CreateProductDto) {
    const product = await this.productService.create(createProductDto);
    this.clientService.emit("product_created", product);
    return product;
  }

  @Post(":id/like")
  async likeBoss(@Param("id") id: string) {
    const product = await this.productService.findOne(+id);
    if(!product){
      throw new NotFoundException("Bunday product not found")
    }
    product.likes++;
    this.productService.update(+id, product);
    return product;
  }

  @Get()
  findAll() {
    this.clientService
      .emit("hello", "Hello from another server ")
      .subscribe((data) => {
        console.log(data);
      });
    this.clientService
      .send("salom", "Hello from another server")
      .subscribe((data) => {
        console.log(data);
      });
    return this.productService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.productService.findOne(+id);
  }

  @Patch(":id")
  async update(
    @Param("id") id: string,
    @Body() updateProductDto: UpdateProductDto
  ) {
    await this.productService.update(+id, updateProductDto);
    const product = await this.productService.findOne(+id);
    this.clientService.emit("product_updated", product);
    return product;
  }

  @Delete(":id")
  async remove(@Param("id") id: string) {
    await this.productService.remove(+id);
    return { message: `Product ID ${id} removed successfully` };
  }
}
