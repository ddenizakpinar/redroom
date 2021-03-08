import React, { Component } from "react";

import CollectionModal from "../components/CollectionModal";
import NoteModal from "../components/NoteModal";
import Note from "../components/Note";
import axiosConfig from "../axiosConfig";

class MainPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      collections: [],
      collectionModal: false,
      selectedCollection: null,
      notes: [],
    };
  }

  componentDidMount() {
    axiosConfig
      .get("/category")
      .then((res) => {
        this.setState({
          collections: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
    axiosConfig
      .get("/note/")
      .then((res) => {
        this.setState({
          notes: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.selectedCollection !== this.state.selectedCollection) {
      this.getNotes();
    }
  }

  // Note

  getNotes = () => {
    axiosConfig
      .get(
        this.state.selectedCollection
          ? "/note/" + this.state.selectedCollection?.id
          : "/note/"
      )
      .then((res) => {
        this.setState({
          notes: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  openCreateNoteModal = (editingNote = null) => {
    this.setState({
      editingNote: editingNote,
      noteModal: true,
    });
  };

  closeCreateNoteModal = () => {
    this.setState({ noteModal: false });
  };

  createNote = (values) => {
    axiosConfig
      .post("/note", { ...values, categoryId: values.collection.id })
      .then((res) => {
        this.closeCreateNoteModal();
        const newNotes = this.state.notes.length ? this.state.notes : [];
        if (
          this.state.selectedCollection == null ||
          this.state.selectedCollection.id === values.collection.id
        ) {
          console.log("??");
          newNotes.push(res.data);
        }
        console.log(this.state.selectedCollection);
        this.setState((prevState) => ({
          notes: newNotes,
        }));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  editNote = (values) => {
    axiosConfig
      .put("/note/" + this.state.editingNote.id, {
        ...values,
        categoryId: values.collection.id,
      })
      .then((res) => {
        this.closeCreateNoteModal();

        let newNotes = this.state.notes;
        newNotes = newNotes.map((x) =>
          x.id === this.state.editingNote.id ? { ...x, ...values } : x
        );

        // if (values.collection.id !== this.state.editingNote.collection.id) {
        //   newNotes = newNotes.filter((x) => x.id !== this.state.editingNote.id);
        // }

        this.setState((prevState) => ({
          notes: newNotes,
        }));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  deleteNote = (values) => {
    axiosConfig
      .delete("/note/" + this.state.editingNote.id)
      .then((res) => {
        this.closeCreateNoteModal();

        let newNotes = this.state.notes;
        newNotes = newNotes.filter((x) => x.id !== this.state.editingNote.id);
        this.setState((prevState) => ({
          notes: newNotes,
        }));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // Collection

  selectCollection(collection) {
    this.setState({ selectedCollection: collection });
  }

  openCreateCollectionModal = (editingCollection = null) => {
    this.setState({
      editingCollection: editingCollection,
      collectionModal: true,
    });
  };

  closeCreateCollectionModal = () => {
    this.setState({ collectionModal: false });
  };

  createCollection = (values) => {
    axiosConfig
      .post("/category", { ...values })
      .then((res) => {
        this.closeCreateCollectionModal();
        const newCollections = this.state.collections.length
          ? this.state.collections
          : [];
        newCollections.push(res.data);
        this.setState((prevState) => ({
          collections: newCollections,
        }));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  editCollection = (values) => {
    axiosConfig
      .put("/category/" + this.state.editingCollection.id, { ...values })
      .then((res) => {
        this.closeCreateCollectionModal();
        let newCollections = this.state.collections;
        newCollections = newCollections.map((x) =>
          x.id === this.state.editingCollection.id ? { ...x, ...values } : x
        );
        this.setState((prevState) => ({
          collections: newCollections,
          selectedCollection: { ...this.state.selectedCollection, ...values },
        }));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  deleteCollection = (values) => {
    axiosConfig
      .delete("/category/" + this.state.editingCollection.id)
      .then((res) => {
        this.closeCreateCollectionModal();

        let newCollections = this.state.collections;
        newCollections = newCollections.filter(
          (x) => x.id !== this.state.editingCollection.id
        );
        this.setState((prevState) => ({
          collections: newCollections,
        }));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  render() {
    const tasks = this.state.notes.length
      ? this.state.notes?.filter((x) => !x.checked)
      : [];
    const completed = this.state.notes.length
      ? this.state.notes?.filter((x) => x.checked)
      : [];
    return (
      <div className="main-page">
        <div className="collections">
          <div className="title">Collections</div>
          {this.state.collections.length
            ? this.state.collections.map((collection) => {
                return (
                  <div
                    className={
                      this.state.selectedCollection?.id === collection.id
                        ? "collection active"
                        : "collection "
                    }
                    key={collection.id}
                    onClick={() => this.selectCollection(collection)}
                  >
                    <div className="info">
                      <div
                        className="color"
                        style={{ backgroundColor: collection.background }}
                      ></div>
                      <div>{collection.name}</div>
                    </div>
                    <div
                      className="edit"
                      onClick={() => this.openCreateCollectionModal(collection)}
                    >
                      <i className="fas fa-edit"></i>
                    </div>
                  </div>
                );
              })
            : null}
          <div
            className="create"
            onClick={() => this.openCreateCollectionModal()}
          >
            <i className="fas fa-plus"></i>
          </div>
        </div>
        <div className="notes">
          <div>
            <div className="title">
              {this.state.selectedCollection ? (
                <div
                  className="back-button mr-2"
                  onClick={() => this.setState({ selectedCollection: null })}
                >
                  <i className="fas fa-chevron-left"></i>
                </div>
              ) : null}
              {this.state.selectedCollection
                ? this.state.selectedCollection?.name
                : "Activities"}
            </div>
            <div
              className="add mt-4"
              onClick={() => this.openCreateNoteModal()}
            >
              <div
                style={{
                  backgroundColor: this.state.selectedCollection
                    ? this.state.selectedCollection?.background
                    : "white",
                }}
                className="create"
              >
                <i className="fas fa-plus"></i>
              </div>
              <div>Add a task</div>
            </div>
            <div className="notes-wrap mt-3">
              <div className="tasks">
                <div className="title">Tasks - {tasks.length}</div>
                {tasks.map((note) => (
                  <Note
                    openCreateNoteModal={this.openCreateNoteModal}
                    task
                    key={note.id}
                    note={note}
                    selectedCollection={this.state.selectedCollection}
                  />
                ))}
              </div>
              <div className="completed mt-4">
                <div className="title">Completed - {completed.length}</div>
                {completed.map((note) => (
                  <Note
                    openCreateNoteModal={this.openCreateNoteModal}
                    completed
                    key={note.id}
                    note={note}
                    selectedCollection={this.state.selectedCollection}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
        <CollectionModal
          editingCollection={this.state.editingCollection}
          show={this.state.collectionModal}
          closeCreateCollectionModal={this.closeCreateCollectionModal}
          createCollection={this.createCollection}
          editCollection={this.editCollection}
          deleteCollection={this.deleteCollection}
        />
        <NoteModal
          editingNote={this.state.editingNote}
          show={this.state.noteModal}
          closeCreateNoteModal={this.closeCreateNoteModal}
          createNote={this.createNote}
          editNote={this.editNote}
          deleteNote={this.deleteNote}
          collections={this.state.collections}
          selectedCollection={this.state.selectedCollection}
        />
      </div>
    );
  }
}

export default MainPage;
