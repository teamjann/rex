exports.FETCH_BOOKS = (userId, category) => `
  SELECT r.id AS rec_id, * from recommendations r
    INNER JOIN books b on r.item_id = b.id
    AND r.category = '${category}'
    AND r.user_id = '${userId}';
  `;

exports.ADD_REC = bookInfo => {
  console.log("bookInfo Database Side~~~~~~~~~", bookInfo);
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
    .join("\n")
    .split(" ")
    .slice(0, 100);
  newDescription.push("...");
  newDescription = newDescription.join(" ").replace(/\'/gi, "''");
  let newTitle = title.replace(/\'/gi, "''");
  let newComments = comments.replace(/\'/gi, "''");
  let recommender_name = firstName + " " + lastName;
  console.log(
    "bookinfo after cleaning up~~~~~~~~~~~",
    "description",
    newDescription,
    "title",
    newTitle,
    "coments",
    newComments,
    "recommender_name",
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

exports.FIND_USER = (username) => {
  return `SELECT id, password FROM users
    WHERE username = '${username}';`
}

exports.ADD_USER = (username, passwordHash, firstName, lastName) => {
  return ` 
  INSERT INTO users (id, username, password, first_name, last_name)
      VALUES (DEFAULT, '${username}', '${passwordHash}', '${firstName}', '${lastName}')
      RETURNING id;`
}