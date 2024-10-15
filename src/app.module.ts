import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ProductModule } from "./product/product.module";
import { Product } from "./product/entities/product.entity";
import { BookModule } from './book/book.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "mysql",
      host: "localhost",
      port: 3306,
      username: "root",
      password: "Ziyoxon1060",
      database: "backend1",
      entities: [Product],
      synchronize: true,
    }),
    ProductModule,
    BookModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
