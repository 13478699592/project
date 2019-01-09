import * as _ from "lodash";
import {Column,Entity,PrimaryGeneratedColumn} from "typeorm";

@Entity({ schema: "demo", name: "DM_users" })
export class UserEntity{
  @PrimaryGeneratedColumn()
  public id: number;

  @Column("nvarchar")
  public username: string;

  @Column("nvarchar")
  public password: string;

  @Column("nvarchar")
  public confirm_password: string;

  @Column("nvarchar")
  public nickname: string;

  @Column("varchar")
  public phone: string;

  // @Column()
  // public regist_time:Date;
}
