import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'products' })
class Product {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({ name: 'product_code', unique: true })
  public productCode: string;

  @Column({ name: 'product_name' })
  public productName: string;

  @Column()
  public price: number;
}

export default Product;
