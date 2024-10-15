import { Module } from '@nestjs/common';
import { BookService } from './book.service';
import { BookController } from './book.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Book } from './entities/book.entity';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    TypeOrmModule.forFeature([Book]),
    ClientsModule.register([
      {
        name: "BOOK_SERVICE",
        transport: Transport.RMQ,
        options: {
          urls: [
            "amqps://gedwbsdj:5On6Wact8Y8_PN0tPMkxHeTB3QUun6Yi@goose.rmq2.cloudamqp.com/gedwbsdj",
          ],
          queue: "main_products_queue",
          queueOptions: {
            durable: false,
          },
        },
      },
    ]),
  ],
  controllers: [BookController],
  providers: [BookService],
})
export class BookModule {}
