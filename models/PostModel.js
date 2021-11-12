const { model, Schema } = require('mongoose');

const PostSchema = Schema(
    {
        title: {
            type: String,
            require: true,
        },
        description: {
            type: Number,
            require: true
        },
        information: {
            type: String,
            require: true
        }
    }
);

module.exports = model ('Post', PostSchema);