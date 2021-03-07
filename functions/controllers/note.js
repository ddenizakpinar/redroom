const { admin, db } = require("../util/admin");

const firebase = require("firebase");

exports.newNote = (request, response) => {
  if (!request.body) {
    return response.status(400);
  }

  const newNote = {
    title: request.body.title,
    checked: false,
    content: request.body.content,
    createdAt: new Date().toISOString(),
    userId: request.user.user_id,
    categoryId: request.body.categoryId,
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

exports.getNotes = async (request, response) => {
  if (!request.body) {
    return response.status(400);
  }

  const notesRef = db.collection("notes");
  const snapshot = await notesRef
    .where("userId", "==", request.user.user_id)
    .where("categoryId", "==", request.body.categoryId)
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
