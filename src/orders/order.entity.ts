import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'orders' })
class Order {
    @PrimaryGeneratedColumn()
    public id: number;

    @Column({ name: 'order_code', unique: true })
    public orderCode: string;

    @Column({ name: 'order_type' })
    public orderType: string;

    @Column("text", { array: true })
    public products: string[];

    @Column({ name: 'order_status' })
    public orderStatus: string;

    @Column()
    public quantity: number;

    @Column({ name: 'total_price' })
    public totalPrice: number;
}

export default Order;
