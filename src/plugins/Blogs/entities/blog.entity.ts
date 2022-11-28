import { DeepPartial, SoftDeletable, User, VendureEntity, Asset } from "@vendure/core";
import { Entity, ManyToOne, Column } from "typeorm";

@Entity({name: 'blog'})
export class Blog extends VendureEntity implements SoftDeletable {
  constructor(input?: DeepPartial<Blog>) {
    super(input);
  }

  @Column({ type: Date, nullable: true })
  deletedAt: Date | null;

  @Column({ type: String, nullable: false })
  name: string | null;

  @Column({ type: String, nullable: true })
  metaName: string | null;

  @Column({ type: String, length: 255, nullable: true })
  type: string | null;

  @Column({ type: String, length: 255, nullable: true })
  sortDescription: string | null;

  @Column({ type: "longtext", nullable: true })
  body: string | null;
  
  @Column({ type: String, unique: true, nullable: false })
  slug: string | null;

  @ManyToOne((type) => Asset)
  image: Asset;

  @Column({ type: Boolean, default: false })
  published: boolean | null;

  @ManyToOne((type) => User)
  user!: User;
}
