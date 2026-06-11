<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20260611100256 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $avatar = 'https://upload.wikimedia.org/wikipedia/commons/1/1e/Default-avatar.jpg';
        $hashedPassword = '$2y$13$25idxGDzRdcFZfbFhlhzresllyn3c9z8QPD8J2kFmWWvMTd3AM7fO';
        $roles = json_encode(['ROLE_USER']);

        $this->addSql("INSERT INTO \"user\" (email, firstname, lastname, date_of_birth, created_at, avatar, password, roles)
                           VALUES ('user1@test.com', 'User1', 'USERNAME_1', '1970-01-01', '2026-01-01', '$avatar', '$hashedPassword', '$roles')");

        $this->addSql("INSERT INTO \"user\" (email, firstname, lastname, date_of_birth, created_at, avatar, password, roles)
                           VALUES ('user2@test.com', 'User2', 'USERNAME_2', '1970-01-01', '2026-01-01', '$avatar', '$hashedPassword', '$roles')");

        $this->addSql("INSERT INTO \"user\" (email, firstname, lastname, date_of_birth, created_at, avatar, password, roles)
                           VALUES ('user3@test.com', 'User3', 'USERNAME_3', '1970-01-01', '2026-01-01', '$avatar', '$hashedPassword', '$roles')");

        $this->addSql("INSERT INTO \"user\" (email, firstname, lastname, date_of_birth, created_at, avatar, password, roles)
                           VALUES ('user4@test.com', 'User4', 'USERNAME_4', '1970-01-01', '2026-01-01', '$avatar', '$hashedPassword', '$roles')");

        $this->addSql("INSERT INTO \"user\" (email, firstname, lastname, date_of_birth, created_at, avatar, password, roles)
                           VALUES ('user5@test.com', 'User5', 'USERNAME_5', '1970-01-01', '2026-01-01', '$avatar', '$hashedPassword', '$roles')");

    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql("DELETE FROM \"user\" WHERE email IN ('user1@test.com', 'user2@test.com', 'user3@test.com', 'user4@test.com', 'user5@test.com')");
    }
}
