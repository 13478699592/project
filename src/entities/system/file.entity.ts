import * as _ from "lodash";
import {Column,Entity,PrimaryGeneratedColumn} from "typeorm";
import { UserListEntity } from ".";


@Entity({ schema: "demo", name: "DM_file" })
export class FileEntity extends UserListEntity{
  @Column("nvarchar")
  public fileName: string;

  @Column()
  public uploadTime: Date;
}
