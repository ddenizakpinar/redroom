const { admin, db } = require("../util/admin");

const firebase = require("firebase");

exports.newCategory = (request, response) => {
  if (!request.body) {
    return response.status(400);
  }
  console.log(request.user);

  const newCategory = {
    name: request.body.name,
    background: request.body.background,
    createdAt: new Date().toISOString(),
    userId: request.user.user_id,
  };

  db.collection("categories")
    .add(newCategory)
    .then((doc) => {
      return response.json(newCategory);
    })
    .catch((err) => {
      response.status(500);
      console.log(err);
    });
};

exports.getCategories = async (request, response) => {
  if (!request.body) {
    return response.status(400);
  }

  const categoriesRef = db.collection("categories");
  const snapshot = await categoriesRef
    .where("userId", "==", request.user.user_id)
    .get();
  if (snapshot.empty) {
    return response.status(204).json({});
  }

  let resArray = [];

  snapshot.forEach((doc) => {
    resArray.push({ ...doc.data(), id: doc.id });
  });

  response.json(resArray);
};

exports.deleteCategory = async (request, response) => {
  const document = db.doc(`/categories/${request.params.categoryId}`);
  document
    .get()
    .then((doc) => {
      if (!doc.exists) {
        return response.status(404).json({ error: "Category not found" });
      }
      if (doc.data().userId != request.user.user_id) {
        return response.status(401).json({ error: "No permission" });
      }
      return document.delete();
    })
    .then(() => {
      response.json({ message: "Delete successfull" });
    })
    .catch((err) => {
      return response.status(500);
    });
};

exports.updateCategory = async (request, response) => {
  if (request.body.categoryId) {
    response.status(403).json({ message: "Not allowed to edit" });
  }
  let document = db
    .collection("categories")
    .doc(`${request.params.categoryId}`);
  document
    .update(request.body)
    .then(() => {
      response.json({ message: "Updated successfully" });
    })
    .catch((err) => {
      console.error(err);
      return response.status(500).json({
        error: err.code,
      });
    });
};
