const { Schema, model } = require ('mongoose');

const reactionSchema = new Schema(
    {
        reactionId: {
            type: Schema.Types.ObjectID,
            default: () => new Types.ObjectId(),
        },
        reactionBody: {
            type: String,
            required: true,
            maxlength: 200,
            minlength: 1,
        },
        username: {
            type: String,
            required: true,
        },
        createdAt: {
            type: Date,
            default: Date.now(),
            get: dateFormat,
        },
    },
    {
        toJSON: {
            virtuals: true,
            // difference between?
            // toJSON: {
            //     getters: true,
            // },
            // id: false,
        },
    },
);

reactionSchema
    .virtual('getReactionTime')
    //  Getter
    .get(function () {
        return `posted at: ${this.createdAt}`;
    });

const Reaction = model('reaction', reactionSchema);

function dateFormat(date){
    return date.toDateString()
}

module.exports = { reactionSchema, Reaction}

// * `reactionId`
//   * Use Mongoose's ObjectId data type
//   * Default value is set to a new ObjectId

// * `reactionBody`
//   * String
//   * Required
//   * 280 character maximum

// * `username`
//   * String
//   * Required

// * `createdAt`
//   * Date
//   * Set default value to the current timestamp
//   * Use a getter method to format the timestamp on query

// **Schema Settings**:

// This will not be a model, but rather will be used as the `reaction` field's subdocument schema in the `Thought` model.
