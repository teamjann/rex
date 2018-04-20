// FETCH BOOKS AND RECOMMENDATIONS
exports.FETCH_BOOKS = (userId, category) => `
  SELECT r.id AS rec_id, * from recommendations r
    INNER JOIN books b on r.item_id = b.id
    AND r.category = '${category}'
    AND r.user_id = '${userId}';
  `;

// DELETE RECOMMENDATIONS
// Note: Doesn't delete the actual item from db, just recommendations
exports.DELETE_BOOK = ({ userId, category, itemId }) => `
  DELETE FROM recommendations r
    WHERE r.user_id='${userId}'
    AND r.category='${category}'
    AND r.item_id='${itemId}';
`;

// UPDATE RECOMMENDATIONS - status and rating
exports.UPDATE_RECOMMENDATION = ({
  userId,
  category,
  itemId,
  status,
  rating
}) => `
  UPDATE recommendations r 
  SET status = '${status}', user_rating='${rating}' 
  WHERE r.user_id='${userId}'
  AND r.category='${category}'
  AND r.item_id='${itemId}';
`;

// ADD NEW RECOMMENDATION AND BOOK TO DB
exports.ADD_REC = bookInfo => {
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
