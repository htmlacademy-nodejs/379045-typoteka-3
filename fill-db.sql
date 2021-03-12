INSERT INTO users(email, password_hash, first_name, last_name, avatar) VALUES
('ivanov@example.com', '5f4dcc3b5aa765d61d8327deb882cf99', 'Иван', 'Иванов', 'avatar1.jpg'),
('petrov@example.com', '5f4dcc3b5aa765d61d8327deb882cf99', 'Пётр', 'Петров', 'avatar2.jpg'),
('user3@example.com', '5f4dcc3b5aa765d61d8327deb882cf99', 'Юрий', 'Козлов', 'avatar3.jpg');

INSERT INTO categories(name) VALUES
('Деревья'),
('За жизнь'),
('Без рамки'),
('Разное'),
('IT'),
('Музыка'),
('Кино'),
('Программирование'),
('Железо');

ALTER TABLE articles DISABLE TRIGGER ALL;

INSERT INTO articles(title, announce, fullText, picture, user_id) VALUES
('Самый лучший музыкальный альбом этого года', 'Ёлки — это не просто красивое дерево.Это прочная древесина.', 'Как начать действовать ? Для начала просто соберитесь. Он написал больше 30 хитов.', 'image1.jpg', 1),
('Как собрать камни бесконечности', 'Ёлки — это не просто красивое дерево.Это прочная древесина.', 'Как начать действовать ? Для начала просто соберитесь. Он написал больше 30 хитов.', 'image2.jpg', 2),
('Как достигнуть успеха не вставая с кресла', 'Ёлки — это не просто красивое дерево.Это прочная древесина.', 'Как начать действовать ? Для начала просто соберитесь. Он написал больше 30 хитов.', 'image3.jpg', 1),
('Как начать программировать', 'Ёлки — это не просто красивое дерево.Это прочная древесина.', 'Как начать действовать ? Для начала просто соберитесь. Он написал больше 30 хитов.', 'image3.jpg', 2);

ALTER TABLE articles ENABLE TRIGGER ALL;

ALTER TABLE article_categories DISABLE TRIGGER ALL;

INSERT INTO article_categories(article_id, category_id) VALUES
(1, 1),
(1, 2),
(2, 1),
(2, 2),
(3, 1),
(4, 1),
(2, 3);

ALTER TABLE article_categories ENABLE TRIGGER ALL;

ALTER TABLE comments DISABLE TRIGGER ALL;

INSERT INTO COMMENTS(text, user_id, article_id) VALUES
('Совсем немного...', 3, 1),
('Согласен с автором!', 2, 1),
('Это где ж такие красоты?', 3, 2),
('Хочу такую же футболку :-)', 1, 2),
('Плюсую, но слишком много буквы!', 1, 3),
('Отличный крокодил', 1, 3),
('Не куплю крокодила', 2, 4),
('Дрянной крокодил', 2, 4),
('Пожалей крокодила', 2, 4),
('Держать негде', 1, 3);

ALTER TABLE comments ENABLE TRIGGER ALL;
