import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddBaseQuestions1719284757065 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        insert into categories ("name") values ('Food'), ('Games'), ('Geek'), ('Nerd'), ('Help'), ('BR');
        `);
    await queryRunner.query(`
            insert into questions (title) values (
'What do you want to achieve here?'), 
('Whats your playstyle? What do you like todo when you play?'), 
('What quality you want your duo to have?');
            `);
    await queryRunner.query(`
insert into answers (question_id,title) values (1,'Meet new people to play together'), 
(1, 'Find a team to play the events'),
(1, 'Join the events with my team'),
(1, 'Use the gamer social media'),
(2, 'I want to climb ranks and up my account'),
(2, 'Just chill while playing'),
(2, 'Play competitively and reach the top'),
(2, 'Have fun and laugh a lot'),
(3, 'Patient, calm, tolerant'),
(3, 'Helpful,responsible'),
(3, 'Good listener, comunicative'),
(3, 'Creative, funny, joyful');
                `);
    await queryRunner.query(`
INSERT INTO answer_categories (answer_id, category_id) VALUES 
(1, 4), (2, 2), (3, 6), (4, 1), (5, 3), (6, 5), (7, 4), (8, 2), 
(9, 6), (10, 1), (11, 3), (12, 5), (1, 2), (3, 4), (6, 6), 
(9, 1), (2, 5), (8, 3), (5, 1), (11, 6);`);

    await queryRunner.query(`
    insert into games ("name", image) values ('League of legends', ''), ('Valorant', ''), 
('CS go', ''), ('World of Warcraft', '');
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    return;
  }
}
