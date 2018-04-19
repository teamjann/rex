// Fetch decks, name, score, and cardcount
exports.FETCH_BOOKS = (userId, category) => `
  SELECT r.id AS rec_id, * from recommendations r
    INNER JOIN books b on r.item_id = b.id
    AND r.category = '${category}'
    AND r.user_id = '${userId}';
  `;

// // Fetch Deck
// exports.FETCH_DECK = deckname =>
//   `SELECT * FROM decks d WHERE d.deckname = '${deckname}'`;

// // Fetch cards in each deck
// exports.FETCH_DECK_CARDS = deckName => {
//   return `SELECT c.id, c.card_front, c.card_back, d.id AS deck_id FROM cards c
// 	INNER JOIN decks d ON c.deck_id = d.id
// 	WHERE d.deckname = '${deckName}';`;
// };

exports.ADD_REC = bookInfo => {
  console.log('bookInfo Database Side~~~~~~~~~', bookInfo);
  let {
    title,
    description,
    imageUrl,
    link,
    recommender_id,
    user_id,
    firstName,
    lastName,
    item_id,
    category,
    comments
  } = bookInfo;

  let newDescription = description
    .join('\n')
    .split(' ')
    .slice(0, 100);
  newDescription.push('...');
  newDescription = newDescription.join(' ').replace(/\'/gi, "''");
  let newTitle = title.replace(/\'/gi, "''");
  let newComments = comments.replace(/\'/gi, "''");
  let recommender_name = firstName + ' ' + lastName;
  console.log(
    'bookinfo after cleaning up~~~~~~~~~~~',
    'description',
    newDescription,
    'title',
    newTitle,
    'coments',
    newComments,
    'recommender_name',
    recommender_name
  );
  return `WITH book AS 
( INSERT INTO books(id, title, thumbnail_url, description, url) 
VALUES(DEFAULT, '${newTitle}', '${imageUrl}', '${newDescription}', '${link}') RETURNING id )
INSERT INTO recommendations 
(id, recommender_id, user_id, recommender_name, comment, item_id, date_added, category) 
VALUES(DEFAULT, null, 3, '${recommender_name}', '${newComments}', 
        ( SELECT id from book ), default, '${category}');`;
};

// Delete recommendations for a book
exports.DELETE_BOOK = ({ userId, category, itemId }) => `
  DELETE FROM recommendations r
    WHERE r.user_id='${userId}'
    AND r.category='${category}'
    AND r.item_id='${itemId}';
`;

// 	DELETE FROM decks d WHERE d.id = '${id}'
// 	RETURNING *
// `;

// // Add Card to DeckID
// exports.ADD_CARD = ({ cardFront, cardBack, deckId }) => `
// 	INSERT INTO cards(id, card_front, card_back, deck_id)
// 		VALUES(DEFAULT, '${cardFront}', '${cardBack}', ${deckId})
// 		RETURNING *
// `;

// // Update Deck Quiz score
// exports.UPDATE_SCORE = ({ id, score }) => `
// 	UPDATE decks SET score = '${score}' where id = '${id}'
// `;
