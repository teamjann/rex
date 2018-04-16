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

// // Add Deck
// exports.ADD_DECK = deckName => `
// 	INSERT INTO decks(id, deckname, score)
// 		VALUES(DEFAULT, '${deckName}', 0)
// 		RETURNING *
// `;

// // Delete deck from db
// exports.DELETE_DECK = id => `
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
