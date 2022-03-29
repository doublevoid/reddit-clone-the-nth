import { Migration } from '@mikro-orm/migrations';

export class Migration20220329212330 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table `user` (`id` int unsigned not null auto_increment primary key, `name` varchar(255) not null, `email` varchar(255) not null, `password` varchar(255) not null, `posts_id` int unsigned null, `created_at` datetime not null, `updated_at` datetime not null) default character set utf8mb4 engine = InnoDB;');
    this.addSql('alter table `user` add index `user_posts_id_index`(`posts_id`);');

    this.addSql('create table `post` (`id` int unsigned not null auto_increment primary key, `title` varchar(255) not null, `body` text not null, `owner_id` int unsigned not null, `created_at` datetime not null, `updated_at` datetime not null) default character set utf8mb4 engine = InnoDB;');
    this.addSql('alter table `post` add index `post_owner_id_index`(`owner_id`);');

    this.addSql('create table `user_token` (`id` int unsigned not null auto_increment primary key, `user_id` int unsigned not null, `token` text not null) default character set utf8mb4 engine = InnoDB;');
    this.addSql('alter table `user_token` add index `user_token_user_id_index`(`user_id`);');

    this.addSql('create table `comment` (`id` int unsigned not null auto_increment primary key, `body` text not null, `owner_id` int unsigned not null, `post_id` int unsigned not null, `created_at` datetime not null, `updated_at` datetime not null) default character set utf8mb4 engine = InnoDB;');
    this.addSql('alter table `comment` add index `comment_owner_id_index`(`owner_id`);');
    this.addSql('alter table `comment` add index `comment_post_id_index`(`post_id`);');

    this.addSql('create table `upvote` (`id` int unsigned not null auto_increment primary key, `positive` tinyint(1) not null, `user_id` int unsigned not null, `post_id` int unsigned null, `comment_id` int unsigned null) default character set utf8mb4 engine = InnoDB;');
    this.addSql('alter table `upvote` add index `upvote_user_id_index`(`user_id`);');
    this.addSql('alter table `upvote` add index `upvote_post_id_index`(`post_id`);');
    this.addSql('alter table `upvote` add index `upvote_comment_id_index`(`comment_id`);');

    this.addSql('alter table `user` add constraint `user_posts_id_foreign` foreign key (`posts_id`) references `post` (`id`) on delete cascade;');

    this.addSql('alter table `post` add constraint `post_owner_id_foreign` foreign key (`owner_id`) references `user` (`id`) on update cascade;');

    this.addSql('alter table `user_token` add constraint `user_token_user_id_foreign` foreign key (`user_id`) references `user` (`id`) on update cascade;');

    this.addSql('alter table `comment` add constraint `comment_owner_id_foreign` foreign key (`owner_id`) references `user` (`id`) on update cascade;');
    this.addSql('alter table `comment` add constraint `comment_post_id_foreign` foreign key (`post_id`) references `post` (`id`) on update cascade;');

    this.addSql('alter table `upvote` add constraint `upvote_user_id_foreign` foreign key (`user_id`) references `user` (`id`) on update cascade;');
    this.addSql('alter table `upvote` add constraint `upvote_post_id_foreign` foreign key (`post_id`) references `post` (`id`) on delete cascade;');
    this.addSql('alter table `upvote` add constraint `upvote_comment_id_foreign` foreign key (`comment_id`) references `comment` (`id`) on delete cascade;');
  }

}
