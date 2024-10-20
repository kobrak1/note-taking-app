const mongoose = require("mongoose");

const schemaDefinition =   {
  title: {
    type: String,
    minLength: 5,
    required: true,
  },
  content: {
    type: String,
    minLength: 5,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
}

const schemaOptions =   {
  timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
  versionKey: false, // Disables the __v field
  toJSON: {
    virtuals: true, // Include virtual fields
    transform: (doc, ret) => {
      ret.id = ret._id.toString(); // Customize the JSON output
      delete ret._id;
      delete ret.__v;
    },
  },
  collection: "notes_collection", // Custom collection name
  autoIndex: true, // Automatically build indexes
}

const noteSchema = new mongoose.Schema(schemaDefinition, schemaOptions);

module.exports = mongoose.model("Note", noteSchema);
