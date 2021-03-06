import * as _ from "lodash";
import {Column,Entity,PrimaryGeneratedColumn} from "typeorm";


@Entity({ schema: "demo", name: "DM_userList" })
export class UserListEntity{
  @PrimaryGeneratedColumn()
  public id: number;

  @Column("nvarchar")
  public name: string;

  @Column("int")
  public age: number;

  @Column("nvarchar")
  public address: string;
}
