import { Injectable } from "@nestjs/common";
import { CreateProductDto } from "./dto/create-product.dto";
import { UpdateProductDto } from "./dto/update-product.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Product } from "./entities/product.entity";
import { Repository } from "typeorm";

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product) private readonly productRepo: Repository<Product>
  ) {}
  create(createProductDto: CreateProductDto) {
    return this.productRepo.save(createProductDto);
  }

  findAll() {
    return this.productRepo.find();
  }

  findOne(id: number) {
    return this.productRepo.findOneBy({id})
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return this.productRepo.update({id} , updateProductDto);
  }

  remove(id: number) {
    return this.productRepo.delete({id})
  }
}
