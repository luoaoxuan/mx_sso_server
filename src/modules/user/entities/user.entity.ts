import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({name:'mx_user'})
export class User {
    @PrimaryGeneratedColumn()
    id:string
    @Column()
    email:string
    @Column()
    phone:string
    @Column()
    password:string
    @Column()
    wx_openid:string
    @Column()
    wx_unionid:string
    @Column({nullable:true,comment:'创建时间',default:()=>"CURRENT_TIMESTAMP"})
    create_time:Date
}
