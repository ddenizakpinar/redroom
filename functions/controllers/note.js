const { admin, db } = require("../util/admin");

const firebase = require("firebase");

exports.newNote = async (request, response) => {
  if (!request.body) {
    return response.status(400);
  }

  const categoriesRef = await db.collection("categories");

  let category;
  if (request.body.categoryId) {
    category = await categoriesRef.doc(request.body.categoryId).get();
  }

  const newNote = {
    title: request.body.title,
    checked: request.body.checked,
    content: request.body.content,
    createdAt: new Date().toISOString(),
    date: request.body.date,
    userId: request.user.user_id,
    categoryId: request.body.categoryId ? request.body.categoryId : "",
    collection: request.body.categoryId ? category.data() : "",
  };

  db.collection("notes")
    .add(newNote)
    .then((doc) => {
      return response.json({ ...newNote, id: doc.id });
    })
    .catch((err) => {
      response.status(500);
      console.log(err);
    });
};

exports.getNotesByCategory = async (request, response) => {
  if (!request.body) {
    return response.status(400);
  }

  const notesRef = await db.collection("notes");
  const snapshot = await notesRef
    .where("userId", "==", request.user.user_id)
    .where("categoryId", "==", request.params.categoryId)
    .get();
  if (snapshot.empty) {
    return response.status(204).json({});
  }

  const categoriesRef = await db.collection("categories");

  let resArray = [];
  let data = [];

  snapshot.forEach(async (doc) => {
    const noteData = doc.data();
    resArray.push({ ...noteData, id: doc.id });
  });

  var promise = Promise.all(
    resArray.map(async (res) => {
      var temp = {};
      const category = await categoriesRef.doc(res.categoryId).get();
      temp = res;
      temp.collection = category.data();
      data.push(temp);
    })
  );
  promise.then((r) => {
    response.json(resArray);
  });
};

exports.getNotes = async (request, response) => {
  if (!request.body) {
    return response.status(400);
  }

  const notesRef = await db.collection("notes");
  const snapshot = await notesRef
    .where("userId", "==", request.user.user_id)
    .get();
  if (snapshot.empty) {
    return response.status(204).json({});
  }

  const categoriesRef = await db.collection("categories");

  let resArray = [];
  let data = [];

  snapshot.forEach(async (doc) => {
    const noteData = doc.data();
    resArray.push({ ...noteData, id: doc.id });
  });

  var promise = Promise.all(
    resArray.map(async (res) => {
      var temp = {};
      const category = await categoriesRef.doc(res.categoryId).get();
      temp = res;
      temp.collection = category.data();
      data.push(temp);
    })
  );
  promise.then((r) => {
    response.json(resArray);
  });
};

exports.deleteNote = async (request, response) => {
  const document = db.doc(`/notes/${request.params.noteId}`);
  document
    .get()
    .then((doc) => {
      if (!doc.exists) {
        return response.status(404).json({ error: "Note not found" });
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

exports.updateNote = async (request, response) => {
  if (request.body.noteId) {
    response.status(403).json({ message: "Not allowed to edit" });
  }
  let document = db.collection("notes").doc(`${request.params.noteId}`);
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
